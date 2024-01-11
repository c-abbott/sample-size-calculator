import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { select } from "d3-selection";

interface DataPoint {
  x: number;
  y: number;
}

interface ChartData {
  data: DataPoint[];
  altData: DataPoint[];
}

interface NormalDistributionChartProps {
  mean?: number;
  variance?: number;
  alternativeMean?: number;
}

const NormalDistributionChart: React.FC<NormalDistributionChartProps> = ({
  mean = 7000,
  variance = 1,
  alternativeMean = 1,
}) => {
  const d3Container = useRef<SVGSVGElement | null>(null);
  const [chartData, setChartData] = useState<ChartData>({ data: [], altData: [] });
  const margin = { top: 16, right: 48, bottom: 24, left: 48 };
  const height = 500 - margin.top - margin.bottom;
  const standardDeviation = Math.sqrt(variance || 1);
  const xRange = 4 * standardDeviation;


  const generateChartData = (
    mean: number,
    variance: number,
    alternativeMean?: number
  ): ChartData => {
    const standardDeviation = Math.sqrt(variance);
    const xRange = 4 * standardDeviation;

    const generateData = (meanValue: number): DataPoint[] => {
      return d3
        .range(meanValue - xRange, meanValue + xRange, standardDeviation / 100)
        .map((xVal) => ({
          x: xVal,
          y:
            (1 / (standardDeviation * Math.sqrt(2 * Math.PI))) *
            Math.exp(-0.5 * ((xVal - meanValue) / standardDeviation) ** 2),
        }));
    };

    const normalizeData = (data: DataPoint[], height: number): DataPoint[] => {
      const maxY = d3.max(data, (d) => d.y) || 1;
      return data.map((d) => ({
        x: d.x,
        y: (d.y / maxY) * height * 0.95, // height needs to be defined or passed as a parameter
      }));
    };

    let data = normalizeData(generateData(mean), height);
    let altData =
      alternativeMean !== undefined
        ? normalizeData(generateData(alternativeMean), height)
        : [];

    return { data, altData };
  };

  const drawChart = (data: DataPoint[], altData: DataPoint[]) => {
    if (d3Container.current && d3Container.current.parentElement) {
      select(d3Container.current).selectAll("*").remove();
  
      const containerWidth = d3Container.current.parentElement.offsetWidth;
      const margin = { top: 16, right: 48, bottom: 24, left: 48 };
      const width = containerWidth - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;
      const standardDeviation = Math.sqrt(variance);
      const xRange = 4 * standardDeviation;
  
      // Calculate the extremes for both distributions
      let minX = mean - xRange;
      let maxX = mean + xRange;
      if (alternativeMean !== undefined) {
        minX = Math.min(minX, alternativeMean - xRange);
        maxX = Math.max(maxX, alternativeMean + xRange);
      }
  
      // Set the x-axis to accommodate both distributions
      const x = d3.scaleLinear().domain([minX, maxX]).range([0, width]);
  
      const svg = select(d3Container.current)
        .attr("width", containerWidth)
        .attr("height", height + margin.top + margin.bottom);
  
      const chartGroup = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
  
      const chartData = generateChartData(mean, variance, alternativeMean);
  
      // Function to draw a distribution with animation
      const drawDistribution = (
        data: DataPoint[],
        color: string
      ) => {
        const lineGenerator = d3
          .line<DataPoint>()
          .x((d) => x(d.x))
          .y((d) => height - d.y);
  
        const path = chartGroup
          .append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", color)
          .attr("stroke-width", 3)
          .attr("d", lineGenerator);
  
        const totalLength = path.node()?.getTotalLength() ?? 0;
  
        path
          .attr("stroke-dasharray", totalLength + " " + totalLength)
          .attr("stroke-dashoffset", totalLength)
          .transition() // Initialize a transition
          .duration(1500) // Transition duration
          .attr("stroke-dashoffset", 0); // Animate the stroke-dashoffset to zero
      };
  
      // Draw the original distribution
      drawDistribution(chartData.data, "#bcfd49"); // Original distribution color
  
      // Draw the alternative distribution if alternativeMean is provided
      if (alternativeMean !== undefined) {
        drawDistribution(chartData.altData, "#a970fd"); // Alternative distribution color
      }
  
      // Append X-axis
      chartGroup
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("font-size", "16px");
    }
  };


  useEffect(() => {
    const newData = generateChartData(mean, variance, alternativeMean);
    setChartData(newData);
  
    const handleResize = () => {
      drawChart(newData.data, newData.altData);
    };
  
    window.addEventListener("resize", handleResize);
  
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mean, variance, alternativeMean]); // This useEffect is for generating new data and handling resize
  
  useEffect(() => {
    // Redraw chart on data change
    drawChart(chartData.data, chartData.altData);
  }, [chartData]); // This useEffect is for redrawing the chart when chartData changes
  

  return (
    <div className="py-4 bg-dark-900 text-primary">
      <div className="bg-dark-800 p-4 shadow-md rounded-md relative overflow-hidden">
        <svg className="w-full" ref={d3Container} />
      </div>
    </div>
  );
};

export default NormalDistributionChart;