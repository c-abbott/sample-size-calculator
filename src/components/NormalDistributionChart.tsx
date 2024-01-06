import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { select } from "d3-selection";

const NormalDistributionChart: React.FC = () => {
  const d3Container = useRef<SVGSVGElement | null>(null);

  const drawChart = () => {
    if (d3Container.current && d3Container.current.parentElement) {
      select(d3Container.current).selectAll("*").remove();

      const containerWidth = d3Container.current.parentElement.offsetWidth;
      const margin = { top: 8, right: 48, bottom: 30, left: 48 }; // Increased bottom margin
      const width = containerWidth - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;

      const svg = select(d3Container.current)
        .attr("width", containerWidth)
        .attr("height", height + margin.top + margin.bottom);

      const chartGroup = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const x = d3.scaleLinear().domain([-2, 2]).range([0, width]);
      const y = d3.scaleLinear().domain([0, 0.5]).range([height, 0]); // y-scale

      chartGroup
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

      const data = d3.range(-2, 2, 0.01).map((x) => {
        return {
          x: x,
          y: (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x),
        };
      });

      const lineGenerator = d3
        .line<{ x: number; y: number }>()
        .x((d) => x(d.x))
        .y((d) => y(d.y)); // Use y-scale for y values

      chartGroup
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#bcfd49")
        .attr("stroke-width", 3)
        .attr("d", lineGenerator);
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
