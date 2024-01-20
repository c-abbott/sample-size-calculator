import React, { useEffect, useRef, useState, useMemo } from "react";
import * as d3 from "d3";
import { select } from "d3-selection";
import {
  DataPoint,
  generateData,
  normalizeData,
  calculateCriticalValues,
  margin,
  height,
} from "../utils/chartUtils";

interface NormalDistributionChartProps {
  mean?: number;
  variance?: number;
  alternativeMean?: number;
}

interface ChartData {
  data: DataPoint[];
  altData: DataPoint[];
}

// Component
const NormalDistributionChart: React.FC<NormalDistributionChartProps> = ({
  mean = 7000,
  variance = 1,
  alternativeMean = 1,
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

  // Draw Chart Function
  const drawChart = (data: DataPoint[], altData: DataPoint[]) => {
    if (d3Container.current && d3Container.current.parentElement) {
      select(d3Container.current).selectAll("*").remove();

      const containerWidth = d3Container.current.parentElement.offsetWidth;
      const width = containerWidth - margin.left - margin.right;
      const standardDeviation = Math.sqrt(variance);
      const xRange = 4 * standardDeviation;
      let minX = mean - xRange;
      let maxX = mean + xRange;

      if (alternativeMean !== undefined) {
        minX = Math.min(minX, alternativeMean - xRange);
        maxX = Math.max(maxX, alternativeMean + xRange);
      }

      const x = d3.scaleLinear().domain([minX, maxX]).range([0, width]);
      const svg = select(d3Container.current)
        .attr("width", containerWidth)
        .attr("height", height + margin.top + margin.bottom);
      const chartGroup = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Function to calculate proportional padding
      const calculatePadding = (
        containerWidth: number,
        containerHeight: number
      ) => {
        return {
          horizontalPadding: containerWidth * 0.01, // 2% of container width
          verticalPadding: containerHeight * 0.01, // 4% of container height
        };
      };

      // Calculate dynamic padding based on the container's dimensions
      const { horizontalPadding, verticalPadding } = calculatePadding(
        containerWidth,
        height
      );

      const drawDistribution = (
        distributionData: DataPoint[],
        color: string
      ) => {
        const lineGenerator = d3
          .line<DataPoint>()
          .x((d) => x(d.x))
          .y((d) => height - d.y);
        const path = chartGroup
          .append("path")
          .datum(distributionData)
          .attr("fill", "none")
          .attr("stroke", color)
          .attr("stroke-width", 3)
          .attr("d", lineGenerator);
        const totalLength = path.node()?.getTotalLength() ?? 0;

        path
          .attr("stroke-dasharray", totalLength + " " + totalLength)
          .attr("stroke-dashoffset", totalLength)
          .transition()
          .duration(1500)
          .attr("stroke-dashoffset", 0);
      };

      const drawCriticalLines = (criticalValues: number[]) => {
        criticalValues.forEach((criticalValue: number) => {
          // Drawing the line
          chartGroup
            .append("line")
            .attr("x1", x(criticalValue))
            .attr("y1", 0)
            .attr("x2", x(criticalValue))
            .attr("y2", height)
            .attr("stroke", "#d6fd91") // Lighter shade for the line
            .attr("stroke-width", 2)
            .attr("stroke-dasharray", "5,5");

          // Adding labels
          chartGroup
            .append("text")
            .attr("x", x(criticalValue) - 1.5 * horizontalPadding)
            .attr("y", 20) // Adjust this value to position the label appropriately
            .attr("text-anchor", "end") // Align the end of the text to the x position
            .style("font-size", "12px")
            .style("fill", "#d6fd91") // Text color
            .text(`X`); // Label text

          chartGroup
            .append("text")
            .attr("x", x(criticalValue) - 1.5 * horizontalPadding) // Position slightly to the right of the main text
            .attr("y", 25) // Position slightly below the main text
            .attr("text-anchor", "start") // Align the start of the text to the new x position
            .style("font-size", "9px") // Smaller font size for subscript
            .style("fill", "#d6fd91") // Text color
            .text("crit"); // Subscript text
        });
      };

      drawDistribution(data, "#bcfd49");
      if (alternativeMean !== undefined) {
        drawDistribution(altData, "#a970fd");
      }

      // Example: Drawing critical lines for a 95% confidence level
      const criticalValues = calculateCriticalValues(
        0.05,
        mean,
        Math.sqrt(variance)
      );
      drawCriticalLines(criticalValues);

      chartGroup
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("font-size", "16px");
    }
  };

  useEffect(() => {
    setChartData(memoizedChartData);
  }, [memoizedChartData]);

  useEffect(() => {
    drawChart(chartData.data, chartData.altData);
    const handleResize = () => drawChart(chartData.data, chartData.altData);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [chartData]);

  return (
    <div className="py-4 bg-dark-900 text-primary">
      <div className="bg-dark-800 p-4 shadow-md rounded-md relative overflow-hidden">
        <svg className="w-full" ref={d3Container} />
      </div>
    </div>
  );
};

export default NormalDistributionChart;
