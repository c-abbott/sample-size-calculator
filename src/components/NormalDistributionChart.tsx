import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { select } from "d3-selection";

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

  const drawChart = () => {
    if (d3Container.current && d3Container.current.parentElement) {
      select(d3Container.current).selectAll("*").remove();

      const containerWidth = d3Container.current.parentElement.offsetWidth;
      const margin = { top: 16, right: 48, bottom: 24, left: 48 };
      const width = containerWidth - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;
      const standardDeviation = Math.sqrt(variance || 1);
      const xRange = 4 * standardDeviation;

      // Calculate the extremes for both distributions
      let minX = mean ? mean - xRange : -xRange;
      let maxX = mean ? mean + xRange : xRange;
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

      // Function to generate data for a normal distribution
      const generateData = (meanValue: number) => {
        return d3
          .range(
            meanValue - xRange,
            meanValue + xRange,
            standardDeviation / 100
          )
          .map((xVal) => ({
            x: xVal,
            y:
              (1 / (standardDeviation * Math.sqrt(2 * Math.PI))) *
              Math.exp(-0.5 * ((xVal - meanValue) / standardDeviation) ** 2),
          }));
      };

      // Function to normalize data
      const normalizeData = (data: { x: number; y: number }[]) => {
        const maxY = d3.max(data, (d) => d.y) || 0;
        return data.map((d) => ({
          x: d.x,
          y: (d.y / maxY) * height * 0.95,
        }));
      };

      // Function to draw a distribution
      // Function to draw a distribution with animation
      const drawDistribution = (
        data: { x: number; y: number }[],
        color: string
      ) => {
        const lineGenerator = d3
          .line<{ x: number; y: number }>()
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
      if (mean !== undefined) {
        const data = normalizeData(generateData(mean));
        drawDistribution(data, "#bcfd49"); // Original distribution color
      }

      // Draw the alternative distribution if alternativeMean is provided
      if (alternativeMean !== undefined) {
        const altData = normalizeData(generateData(alternativeMean));
        drawDistribution(altData, "#a970fd"); // lavender
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
    drawChart();

    const handleResize = () => {
      drawChart();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mean, variance, alternativeMean]);

  return (
    <div className="py-4 bg-dark-900 text-primary">
      <div className="bg-dark-800 p-4 shadow-md rounded-md relative overflow-hidden">
        <svg className="w-full" ref={d3Container} />
      </div>
    </div>
  );
};

export default NormalDistributionChart;
