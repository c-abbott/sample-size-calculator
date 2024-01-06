import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { select } from "d3-selection";

const NormalDistributionChart: React.FC = () => {
  const d3Container = useRef<SVGSVGElement | null>(null);

  const drawChart = () => {
    if (d3Container.current && d3Container.current.parentElement) {
      // Clear existing SVG content
      select(d3Container.current).selectAll("*").remove();

      // Dynamically calculate width
      const svg = select(d3Container.current);
      const containerWidth = d3Container.current.parentElement.offsetWidth;
      const margin = { top: 8, right: 24, bottom: 8, left: 24 };
      const width = containerWidth - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;

      // Set up the SVG with proper margins
      svg
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Create the X-axis scale
      const x = d3.scaleLinear().domain([-2, 2]).range([0, width]);

      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

      // Calculate normal distribution data
      const data = d3.range(-2, 2, 0.01).map((x) => {
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
        .attr("stroke", "#bcfd49")
        .attr("stroke-width", 3)
        .attr("d", lineGenerator); // Use the updated line generator
    }
  };

  useEffect(() => {
    drawChart(); // Initial draw

    // Function to handle window resize
    const handleResize = () => {
      drawChart(); // Redraw chart on resize
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="py-4 bg-dark-900 text-primary">
      <div className="bg-dark-800 p-4 shadow-md rounded-md relative overflow-hidden">
        <svg className="w-full" ref={d3Container} />
      </div>
    </div>
  );
};

export default NormalDistributionChart;
