import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { select } from "d3-selection";

const NormalDistributionChart: React.FC = () => {
  const d3Container = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (d3Container.current) {
      const svg = select(d3Container.current);
      const margin = { top: 2, right: 30, bottom: 30, left: 40 };
      const width = 450 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;

      // Set up the SVG with proper margins
      svg
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Create the X-axis scale
      const x = d3.scaleLinear().domain([-5, 5]).range([0, width]);

      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

      // Calculate normal distribution data
      const data = d3.range(-4, 4, 0.01).map((x) => {
        return {
          x: x,
          y: (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x),
        };
      });

      // Update the line generator
      const lineGenerator = d3
        .line<{ x: number; y: number }>()
        .x((d) => x(d.x))
        .y((d) => height - d.y * 1000); // Scale the y value

      // Add the line
      svg
        .append("path")
        .datum(data) // Bind data to the path
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 6)
        .attr("d", lineGenerator); // Use the updated line generator
    }
  }, []);

  return (
    <div className="container mx-auto">
      <svg className="m-4" ref={d3Container} />
    </div>
  );
};

export default NormalDistributionChart;
