import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { TrendingUp, ShieldAlert, ShieldCheck, AlertTriangle, Calendar, Info, Filter } from 'lucide-react';
import { ScanResult, VerdictType } from '../types';

interface ThreatTimelineChartProps {
  scans: ScanResult[];
  onSelectScan?: (scan: ScanResult) => void;
  selectedScanId?: string | null;
}

interface ChartPoint {
  id: string;
  url: string;
  displayUrl: string;
  timestamp: Date;
  rawTimestamp: string;
  threatScore: number;
  verdict: VerdictType;
  brand: string | null;
  scan: ScanResult;
}

export const ThreatTimelineChart: React.FC<ThreatTimelineChartProps> = ({
  scans,
  onSelectScan,
  selectedScanId,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredPoint, setHoveredPoint] = useState<ChartPoint | null>(null);
  const [filterMode, setFilterMode] = useState<'ALL' | 'THREATS_ONLY'>('ALL');
  const [containerWidth, setContainerWidth] = useState<number>(800);

  // Resize observer to ensure responsive rendering
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setContainerWidth(entry.contentRect.width);
        }
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Process data points chronologically (oldest to newest)
  const chartData: ChartPoint[] = useMemo(() => {
    const points = scans.map((s) => {
      // Calculate realistic 0-100% threat index
      let score = s.confidenceScore;
      if (s.verdict === 'CLEAN') {
        score = Math.max(0.5, s.scoreBreakdown.heuristicScore || (100 - s.confidenceScore));
      }
      
      const parsedDate = new Date(s.timestamp.replace(' UTC', 'Z'));
      return {
        id: s.id,
        url: s.url,
        displayUrl: s.displayUrl,
        timestamp: isNaN(parsedDate.getTime()) ? new Date() : parsedDate,
        rawTimestamp: s.timestamp,
        threatScore: score,
        verdict: s.verdict,
        brand: s.impersonatedBrand?.name || null,
        scan: s,
      };
    });

    // Sort ascending by time for a proper timeline
    const sorted = [...points].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

    if (filterMode === 'THREATS_ONLY') {
      return sorted.filter((p) => p.verdict === 'MALICIOUS' || p.verdict === 'SUSPICIOUS');
    }
    return sorted;
  }, [scans, filterMode]);

  // Aggregate telemetry
  const peakThreat = useMemo(() => {
    if (chartData.length === 0) return 0;
    return Math.max(...chartData.map((d) => d.threatScore)).toFixed(1);
  }, [chartData]);

  const avgThreat = useMemo(() => {
    if (chartData.length === 0) return 0;
    const sum = chartData.reduce((acc, curr) => acc + curr.threatScore, 0);
    return (sum / chartData.length).toFixed(1);
  }, [chartData]);

  const maliciousRate = useMemo(() => {
    if (scans.length === 0) return 0;
    const maliciousCount = scans.filter((s) => s.verdict === 'MALICIOUS').length;
    return Math.round((maliciousCount / scans.length) * 100);
  }, [scans]);

  // D3 Rendering effect
  useEffect(() => {
    if (!svgRef.current || chartData.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const height = 280;
    const margin = { top: 30, right: 30, bottom: 40, left: 45 };
    const width = containerWidth;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    if (innerWidth <= 0 || innerHeight <= 0) return;

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Define Gradients and Filters
    const defs = svg.append('defs');

    // Area fill gradient
    const areaGradient = defs
      .append('linearGradient')
      .attr('id', 'threat-area-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');

    areaGradient
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#EF4444')
      .attr('stop-opacity', 0.35);

    areaGradient
      .append('stop')
      .attr('offset', '50%')
      .attr('stop-color', '#F59E0B')
      .attr('stop-opacity', 0.15);

    areaGradient
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#10B981')
      .attr('stop-opacity', 0.02);

    // Line stroke gradient
    const strokeGradient = defs
      .append('linearGradient')
      .attr('id', 'threat-stroke-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%');

    strokeGradient.append('stop').attr('offset', '0%').attr('stop-color', '#10B981');
    strokeGradient.append('stop').attr('offset', '60%').attr('stop-color', '#F59E0B');
    strokeGradient.append('stop').attr('offset', '100%').attr('stop-color', '#EF4444');

    // Glow filter
    const filter = defs.append('filter').attr('id', 'neon-glow').attr('x', '-50%').attr('y', '-50%').attr('width', '200%').attr('height', '200%');
    filter.append('feGaussianBlur').attr('stdDeviation', '3').attr('result', 'coloredBlur');
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Scales
    // If only 1 point, pad domain so line renders properly
    const xExtent = d3.extent(chartData, (d) => d.timestamp) as [Date, Date];
    let xDomain = xExtent;
    if (chartData.length === 1 || xExtent[0]?.getTime() === xExtent[1]?.getTime()) {
      const now = chartData[0].timestamp.getTime();
      xDomain = [new Date(now - 3600000), new Date(now + 3600000)];
    }

    const xScale = d3.scaleTime().domain(xDomain).range([0, innerWidth]);
    const yScale = d3.scaleLinear().domain([0, 100]).range([innerHeight, 0]);

    // Grid lines
    const yAxisGrid = d3.axisLeft(yScale).tickSize(-innerWidth).tickFormat(() => '').ticks(5);
    g.append('g')
      .attr('class', 'grid')
      .call(yAxisGrid)
      .selectAll('line')
      .attr('stroke', '#1E293B')
      .attr('stroke-dasharray', '3 3')
      .attr('stroke-opacity', 0.6);
    g.select('.grid .domain').remove();

    // Critical and Suspicious Threshold guideline annotations
    // Critical (85%)
    g.append('line')
      .attr('x1', 0)
      .attr('x2', innerWidth)
      .attr('y1', yScale(85))
      .attr('y2', yScale(85))
      .attr('stroke', 'rgba(239, 68, 68, 0.4)')
      .attr('stroke-dasharray', '4 4')
      .attr('stroke-width', 1);

    g.append('text')
      .attr('x', innerWidth - 6)
      .attr('y', yScale(85) - 4)
      .attr('text-anchor', 'end')
      .attr('fill', '#EF4444')
      .attr('font-size', '10px')
      .attr('font-family', 'JetBrains Mono, monospace')
      .attr('font-weight', '600')
      .text('CRITICAL PHISHING THRESHOLD (85%)');

    // Warning (50%)
    g.append('line')
      .attr('x1', 0)
      .attr('x2', innerWidth)
      .attr('y1', yScale(50))
      .attr('y2', yScale(50))
      .attr('stroke', 'rgba(245, 158, 11, 0.35)')
      .attr('stroke-dasharray', '4 4')
      .attr('stroke-width', 1);

    // Area Generator
    const areaGenerator = d3
      .area<ChartPoint>()
      .x((d) => xScale(d.timestamp))
      .y0(innerHeight)
      .y1((d) => yScale(d.threatScore))
      .curve(chartData.length > 2 ? d3.curveMonotoneX : d3.curveLinear);

    g.append('path')
      .datum(chartData)
      .attr('fill', 'url(#threat-area-gradient)')
      .attr('d', areaGenerator);

    // Line Generator
    const lineGenerator = d3
      .line<ChartPoint>()
      .x((d) => xScale(d.timestamp))
      .y((d) => yScale(d.threatScore))
      .curve(chartData.length > 2 ? d3.curveMonotoneX : d3.curveLinear);

    // Glow line (underneath)
    g.append('path')
      .datum(chartData)
      .attr('fill', 'none')
      .attr('stroke', 'url(#threat-stroke-gradient)')
      .attr('stroke-width', 4)
      .attr('filter', 'url(#neon-glow)')
      .attr('opacity', 0.6)
      .attr('d', lineGenerator);

    // Main sharp line
    g.append('path')
      .datum(chartData)
      .attr('fill', 'none')
      .attr('stroke', 'url(#threat-stroke-gradient)')
      .attr('stroke-width', 2.5)
      .attr('d', lineGenerator);

    // Interactive Data Nodes / Circles
    chartData.forEach((point) => {
      const cx = xScale(point.timestamp);
      const cy = yScale(point.threatScore);
      const isSelected = selectedScanId === point.id;

      const nodeGroup = g
        .append('g')
        .attr('class', 'chart-node cursor-pointer')
        .on('mouseenter', () => setHoveredPoint(point))
        .on('mouseleave', () => setHoveredPoint(null))
        .on('click', () => {
          if (onSelectScan) onSelectScan(point.scan);
        });

      // Outer ripple ring if selected
      if (isSelected) {
        nodeGroup
          .append('circle')
          .attr('cx', cx)
          .attr('cy', cy)
          .attr('r', 10)
          .attr('fill', 'none')
          .attr('stroke', '#10B981')
          .attr('stroke-width', 1.5)
          .attr('stroke-dasharray', '2 2')
          .attr('class', 'animate-spin');
      }

      // Outer glow circle
      nodeGroup
        .append('circle')
        .attr('cx', cx)
        .attr('cy', cy)
        .attr('r', isSelected ? 7 : 5)
        .attr('fill', point.verdict === 'MALICIOUS' ? '#EF4444' : point.verdict === 'SUSPICIOUS' ? '#F59E0B' : '#10B981')
        .attr('stroke', '#0B0F19')
        .attr('stroke-width', 2)
        .attr('filter', 'url(#neon-glow)');
    });

    // X Axis
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(Math.max(3, Math.floor(innerWidth / 120)))
      .tickFormat((d) => d3.timeFormat('%H:%M:%S')(d as Date));

    const xAxisGroup = g
      .append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis);

    xAxisGroup.selectAll('text').attr('fill', '#64748B').attr('font-size', '10px').attr('font-family', 'JetBrains Mono, monospace');
    xAxisGroup.select('.domain').attr('stroke', '#1E293B');
    xAxisGroup.selectAll('line').attr('stroke', '#1E293B');

    // Y Axis
    const yAxis = d3
      .axisLeft(yScale)
      .ticks(5)
      .tickFormat((d) => `${d}%`);

    const yAxisGroup = g.append('g').call(yAxis);
    yAxisGroup.selectAll('text').attr('fill', '#64748B').attr('font-size', '10px').attr('font-family', 'JetBrains Mono, monospace');
    yAxisGroup.select('.domain').attr('stroke', '#1E293B');
    yAxisGroup.selectAll('line').attr('stroke', '#1E293B');
  }, [chartData, containerWidth, selectedScanId, onSelectScan]);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/95 p-5 shadow-2xl backdrop-blur-xl">
      {/* Chart Top Header & KPI Indicators */}
      <div className="flex flex-col gap-4 border-b border-slate-800 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-950 text-emerald-400">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">Threat Level Telemetry</h3>
              <span className="rounded bg-slate-800 px-1.5 py-0.2 font-mono text-[10px] text-slate-300">
                D3 Real-time Graph
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Temporal progression of threat confidence scores across inspected targets
            </p>
          </div>
        </div>

        {/* Filter Toggle Buttons */}
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-slate-800 bg-slate-950 p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setFilterMode('ALL')}
              className={`rounded px-2.5 py-1 text-[11px] font-medium transition-colors ${
                filterMode === 'ALL'
                  ? 'bg-slate-800 text-emerald-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Scans ({scans.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('THREATS_ONLY')}
              className={`rounded px-2.5 py-1 text-[11px] font-medium transition-colors ${
                filterMode === 'THREATS_ONLY'
                  ? 'bg-slate-800 text-red-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Flagged Only
            </button>
          </div>
        </div>
      </div>

      {/* KPI Metric Strip */}
      <div className="my-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
            Peak Threat Index
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="font-mono text-xl font-bold text-red-400 tabular-nums">
              {peakThreat}%
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Max</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
            Average Risk Level
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="font-mono text-xl font-bold text-amber-400 tabular-nums">
              {avgThreat}%
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Mean</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
            Interception Rate
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="font-mono text-xl font-bold text-emerald-400 tabular-nums">
              {maliciousRate}%
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Malicious</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
            Sample Points
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="font-mono text-xl font-bold text-slate-200 tabular-nums">
              {chartData.length}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Inspected</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas Container */}
      <div ref={containerRef} className="relative w-full overflow-hidden">
        <svg
          ref={svgRef}
          width={containerWidth}
          height={280}
          className="w-full select-none"
        />

        {/* Hover Tooltip Overlay */}
        {hoveredPoint && (
          <div
            className="pointer-events-none absolute z-20 rounded-xl border border-slate-700 bg-slate-950/95 p-3 shadow-xl backdrop-blur-md transition-all duration-75 text-xs max-w-xs"
            style={{
              left: `${Math.min(containerWidth - 220, Math.max(10, 100))}px`,
              top: '10px',
            }}
          >
            <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1.5 mb-1.5">
              <span className="font-mono text-[10px] text-slate-400">
                {hoveredPoint.rawTimestamp}
              </span>
              <span
                className={`rounded px-1.5 py-0.2 font-mono text-[10px] font-bold uppercase border ${
                  hoveredPoint.verdict === 'MALICIOUS'
                    ? 'bg-red-950 text-red-400 border-red-800/60'
                    : hoveredPoint.verdict === 'SUSPICIOUS'
                    ? 'bg-amber-950 text-amber-400 border-amber-800/60'
                    : 'bg-emerald-950 text-emerald-400 border-emerald-800/60'
                }`}
              >
                {hoveredPoint.verdict}
              </span>
            </div>

            <div className="space-y-1">
              <div className="font-mono font-medium text-slate-200 truncate">
                {hoveredPoint.url}
              </div>
              <div className="flex items-center justify-between text-[11px] pt-1">
                <span className="text-slate-400">Threat Score:</span>
                <span className="font-mono font-bold text-white">
                  {hoveredPoint.threatScore.toFixed(1)}%
                </span>
              </div>
              {hoveredPoint.brand && (
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Impersonating:</span>
                  <span className="font-semibold text-red-300 truncate max-w-[120px]">
                    {hoveredPoint.brand}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-2 border-t border-slate-800/80 pt-1 text-[10px] text-emerald-400 font-mono">
              Click node to load scan details
            </div>
          </div>
        )}
      </div>

      {/* Chart Footer Guide */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800/80 pt-3 text-[11px] text-slate-500 font-mono">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            <span>Malicious Threat</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span>Suspicious Anomaly</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>Clean / Safe</span>
          </div>
        </div>
        <span>Interactive: Hover & click points to inspect</span>
      </div>
    </div>
  );
};
