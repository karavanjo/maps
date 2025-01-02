import "./styles.css";
import * as d3 from "d3";

const data = [
  { country: "Austria", value: 1195 },
  { country: "Belgium", value: -4843 },
  { country: "Bulgaria", value: -1906 },
  { country: "Croatia", value: -2337 },
  { country: "Cyprus", value: -126 },
  { country: "Czech Republic", value: -2706 },
  { country: "Denmark", value: 1309 },
  { country: "Estonia", value: -851 },
  { country: "Finland", value: 840 },
  { country: "France", value: 9386 },
  { country: "Germany", value: 20296 },
  { country: "Greece", value: -3986 },
  { country: "Hungary", value: -4371 },
  { country: "Ireland", value: 1426 },
  { country: "Italy", value: 5802 },
  { country: "Latvia", value: -1114 },
  { country: "Lithuania", value: -1587 },
  { country: "Luxembourg", value: -1806 },
  { country: "Malta", value: -154 },
  { country: "Netherlands", value: 6345 },
  { country: "Poland", value: -7464 },
  { country: "Portugal", value: -2152 },
  { country: "Romania", value: -5867 },
  { country: "Slovakia", value: -2487 },
  { country: "Slovenia", value: -278 },
  { country: "Spain", value: 985 },
  { country: "Sweden", value: 1730 },
];

// Создание SVG
const svg = d3.select("#chart");
const width = +svg.attr("width");
const height = +svg.attr("height");
const margin = { top: 40, right: 150, bottom: 40, left: 80 };
const legendHeight = height - margin.top - margin.bottom;

// Создание цветовой шкалы
const colorScale = d3
  .scaleDiverging()
  .domain([-25000, 0, 25000])
  .interpolator(d3.interpolatePiYG);

// Создание модифицированной вертикальной шкалы
const yScale = d3
  .scaleSymlog()
  .domain([-25000, 25000])
  .range([legendHeight, 0])
  .constant(300); // Настройка поведения около нуля

// Создание градиента
const defs = svg.append("defs");
const linearGradient = defs
  .append("linearGradient")
  .attr("id", "legend-gradient")
  .attr("x1", "0%")
  .attr("y1", "100%")
  .attr("x2", "0%")
  .attr("y2", "0%");

// Определение диапазонов значений и цветов
const ranges = [
  // { value: -25000, label: "-25000", color: "#d73027" },
  // { value: -20000, label: "-20000", color: "#ff3333" },
  // { value: -15000, label: "-15000", color: "#ff6666" },
  { value: -10000, label: "-10000", color: "#ff9999" },
  { value: -5000, label: "-5000", color: "#ffcccc" },
  { value: -100, label: "-100", color: "#ffcccc" },
  { value: 0, label: "0", color: "#ffffff" },
  { value: 100, label: "100", color: "#ccd0ff" },
  { value: 5000, label: "5000", color: "#ccd0ff" },
  { value: 10000, label: "10000", color: "#99a0ff" },
  { value: 15000, label: "15000", color: "#6771ff" },
  { value: 20000, label: "20000", color: "#3441ff" },
  { value: 25000, label: "25000", color: "#0112ff" },
];

// Добавление цветовых стопов
linearGradient
  .selectAll("stop")
  .data(ranges)
  .enter()
  .append("stop")
  .attr("offset", (d) => `${((d.value + 25000) / 50000) * 100}%`)
  .attr("stop-color", (d) => d.color);

// Создание легенды
const legend = svg
  .append("g")
  .attr("class", "legend")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Добавление прямоугольника с градиентом
legend
  .append("rect")
  .attr("width", 20)
  .attr("height", legendHeight)
  .style("fill", "url(#legend-gradient)")
  .style("stroke", "#ccc")
  .style("stroke-width", 1);

// Создание оси с кастомными тиками
const yAxis = d3
  .axisLeft(yScale)
  .tickValues(ranges.map((d) => d.value))
  .tickFormat(d3.format(",.0f"));

// Добавление оси
legend
  .append("g")
  .attr("class", "y-axis")
  .attr("transform", "translate(-5,0)")
  .call(yAxis);

// Добавление точек стран
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

// Добавление подписей стран справа
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

// Добавление заголовка
legend
  .append("text")
  .attr("class", "legend-title")
  .attr("x", -5)
  .attr("y", -10)
  .attr("text-anchor", "start")
  .text("Net balance");

// Добавьте кнопку экспорта в HTML
const exportButton = d3
  .select("body")
  .append("button")
  .attr("id", "exportSVG")
  .text("Export to SVG");

// Добавьте функцию экспорта
exportButton.on("click", function () {
  // Получаем SVG элемент
  const svgElement = document.querySelector("#chart");

  // Создаем копию SVG для экспорта
  const svgCopy = svgElement.cloneNode(true);

  // Добавляем необходимые атрибуты
  svgCopy.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svgCopy.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");

  // Конвертируем SVG в строку
  const svgString = new XMLSerializer().serializeToString(svgCopy);

  // Создаем Blob
  const blob = new Blob([svgString], { type: "image/svg+xml" });

  // Создаем ссылку для скачивания
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "legend-chart.svg";

  // Запускаем скачивание
  link.click();

  // Очищаем URL
  URL.revokeObjectURL(link.href);
});

// Добавьте стили для кнопки
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
