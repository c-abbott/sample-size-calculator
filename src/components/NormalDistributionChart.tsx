import React, { useEffect, useRef, useState, useMemo } from "react";
import useDrawChart from "../hooks/useDrawChart";
import { debounce } from "../utils/debounce";
import {
  generateData,
  normalizeData,
  height,
  ChartData,
} from "../utils/chartUtils";

interface NormalDistributionChartProps {
  mean?: number;
  variance?: number;
  alternativeMean?: number;
  alpha?: number;
}

// Component
const NormalDistributionChart: React.FC<NormalDistributionChartProps> = ({
  mean = 7000,
  variance = 1,
  alternativeMean = 1,
  alpha = 0.05,
}) => {
  const d3Container = useRef<SVGSVGElement | null>(null);
  const [chartData, setChartData] = useState<ChartData>({
    data: [],
    altData: [],
  });

  const memoizedChartData = useMemo(() => {
    const standardDeviation = Math.sqrt(variance);
    const xRange = 4 * standardDeviation;

    let data = normalizeData(
      generateData(mean, standardDeviation, xRange),
      height
    );
    let altData =
      alternativeMean !== undefined
        ? normalizeData(
            generateData(alternativeMean, standardDeviation, xRange),
            height
          )
        : [];

    return { data, altData };
  }, [mean, variance, alternativeMean]);

  const draw = useDrawChart(
    d3Container,
    chartData.data,
    chartData.altData,
    mean,
    variance,
    alternativeMean,
    alpha,
  );

  useEffect(() => {
    setChartData(memoizedChartData);
  }, [memoizedChartData]);

  useEffect(() => {
    draw();
    const handleResize = debounce(() => draw(), 500); // Debounce with a 500ms delay
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [chartData, draw]);

  return (
    <div className="py-4 bg-dark-900 text-primary">
      <div className="bg-dark-800 p-4 shadow-md rounded-md relative overflow-hidden">
        <svg className="w-full" ref={d3Container} />
      </div>
    </div>
  );
};

export default NormalDistributionChart;
