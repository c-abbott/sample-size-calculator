import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { select } from "d3-selection";

interface NormalDistributionChartProps {
  mean?: number;
  variance?: number;
}

const NormalDistributionChart: React.FC<NormalDistributionChartProps> = ({ mean = 7000, variance = 1 }) => {
  const d3Container = useRef<SVGSVGElement | null>(null);

  const drawChart = () => {
    if (d3Container.current && d3Container.current.parentElement) {
      select(d3Container.current).selectAll("*").remove();

      const containerWidth = d3Container.current.parentElement.offsetWidth;
      const margin = { top: 16, right: 48, bottom: 24, left: 48 };
      const width = containerWidth - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;
      const standardDeviation = Math.sqrt(variance);
      const xRange = 4 * standardDeviation;  // Adjust this range based on visualization needs

      const svg = select(d3Container.current)
        .attr("width", containerWidth)
        .attr("height", height + margin.top + margin.bottom);

      const chartGroup = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const x = d3.scaleLinear()
        .domain([mean - xRange, mean + xRange])
        .range([0, width]);

        const data = d3.range(mean - xRange, mean + xRange, standardDeviation / 100).map((x) => {
          return {
            x: x,
            y: (1 / (standardDeviation * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * ((x - mean) / standardDeviation) ** 2),
          };
        });
    
        const maxY = d3.max(data, (d) => d.y) || 0;
        const normalizedData = data.map(d => ({ x: d.x, y: d.y / maxY * height * 0.95 })); // Normalize y-values
    
        const lineGenerator = d3.line<{ x: number; y: number }>()
          .x((d) => x(d.x))
          .y((d) => height - d.y);  // Adjust for normalized y-values

      chartGroup
        .append("path")
        .datum(normalizedData)
        .attr("fill", "none")
        .attr("stroke", "#bcfd49")
        .attr("stroke-width", 3)
        .attr("d", lineGenerator);

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
  }, [mean, variance]);

  return (
    <div className="py-4 bg-dark-900 text-primary">
      <div className="bg-dark-800 p-4 shadow-md rounded-md relative overflow-hidden">
        <svg className="w-full" ref={d3Container} />
      </div>
    </div>
  );
};

export default NormalDistributionChart;
