import "./styles.css";
import * as d3 from "d3";

import {
  dataEu,
  dataEuPerCapita,
  dataEuRanges,
  dataEuPerCapitaRanges,
} from "./data.mjs";

let data = dataEu;
let ranges = dataEuRanges;

// Create SVG
const svg = d3.select("#chart");
const width = +svg.attr("width");
const height = +svg.attr("height");
const margin = { top: 40, right: 150, bottom: 40, left: 80 };
const legendHeight = height - margin.top - margin.bottom;

// Create color scale
const colorScale = d3
  .scaleDiverging()
  .domain([-25000, 0, 25000])
  .interpolator(d3.interpolatePiYG);

// Create modified vertical scale
const yScale = d3
  .scaleSymlog()
  .domain([-25000, 25000])
  .range([legendHeight, 0])
  .constant(300); // Adjust behavior around zero

// Create gradient
const defs = svg.append("defs");
const linearGradient = defs
  .append("linearGradient")
  .attr("id", "legend-gradient")
  .attr("x1", "0%")
  .attr("y1", "100%")
  .attr("x2", "0%")
  .attr("y2", "0%");

// Add color stops
linearGradient
  .selectAll("stop")
  .data(ranges)
  .enter()
  .append("stop")
  .attr("offset", (d) => `${((d.value + 25000) / 50000) * 100}%`)
  .attr("stop-color", (d) => d.color);

// Create legend
const legend = svg
  .append("g")
  .attr("class", "legend")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Add rectangle with gradient
legend
  .append("rect")
  .attr("width", 20)
  .attr("height", legendHeight)
  .style("fill", "url(#legend-gradient)")
  .style("stroke", "#ccc")
  .style("stroke-width", 1);

// Create axis with custom ticks
const yAxis = d3
  .axisLeft(yScale)
  .tickValues(ranges.map((d) => d.value))
  .tickFormat(d3.format(",.0f"));

// Add axis
legend
  .append("g")
  .attr("class", "y-axis")
  .attr("transform", "translate(-5,0)")
  .call(yAxis);

// Add country points
legend
  .selectAll(".country-point")
  .data(data)
  .enter()
  .append("circle")
  .attr("class", "country-point")
  .attr("cx", 10)
  .attr("cy", (d) => yScale(d.value))
  .attr("r", 4)
  .attr("fill", (d) => colorScale(d.value))
  .attr("stroke", "black")
  .attr("stroke-width", 1);

// Add country labels on the right
legend
  .selectAll(".country-label")
  .data(data)
  .enter()
  .append("text")
  .attr("class", "country-label")
  .attr("x", 25)
  .attr("y", (d) => yScale(d.value))
  .attr("dy", "0.3em")
  .text((d) => `${d.country}`);

// Add title
legend
  .append("text")
  .attr("class", "legend-title")
  .attr("x", -5)
  .attr("y", -10)
  .attr("text-anchor", "start")
  .text("Net balance");

// Add export button to HTML
const exportButton = d3
  .select("body")
  .append("button")
  .attr("id", "exportSVG")
  .text("Export to SVG");

// Add export function
exportButton.on("click", function () {
  // Get SVG element
  const svgElement = document.querySelector("#chart");

  // Create a copy of SVG for export
  const svgCopy = svgElement.cloneNode(true);

  // Add necessary attributes
  svgCopy.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svgCopy.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");

  // Convert SVG to string
  const svgString = new XMLSerializer().serializeToString(svgCopy);

  // Create Blob
  const blob = new Blob([svgString], { type: "image/svg+xml" });

  // Create download link
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "legend-chart.svg";

  // Trigger download
  link.click();

  // Clean up URL
  URL.revokeObjectURL(link.href);
});

// Add styles for the button
const buttonStyles = document.createElement("style");
buttonStyles.textContent = `
#exportSVG {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

#exportSVG:hover {
  background-color: #45a049;
}
`;
document.head.appendChild(buttonStyles);
