import React from "react";
import { useFetch } from "./hooks/useFetch";
import { scaleLinear, scaleBand, scaleTime } from "d3-scale";
import { extent, max, min, bin } from "d3-array";
import { scale } from "vega";
import * as d3 from "d3";
import { useEffect } from "react";

// https://observablehq.com/@jermspeaks/async-await

const App = () => {
  const [data, loading] = useFetch(
    "https://raw.githubusercontent.com/kaylalee44/info474-assignments/main/weather.csv"
  );

  const dataSmallSample = data.slice(0, 5000);
  // console.log(dataSmallSample);

  const TMAXextent = extent(dataSmallSample, (d) => {
    return +d.TMAX;
  });

  const size = 500;
  const margin = 20;
  const axisTextAlignmentFactor = 3;
  const yScale = scaleLinear()
    .domain(TMAXextent) // unit: km
    .range([size - margin, size - 350]); // unit: pixels

  _bins = bin().thresholds(30);
  tmaxBins = _bins(
    data.map((d) => {
      return +d.TMAX;
    })
  );

  const histogramLeftPadding = 20;

  /*
    binning https://observablehq.com/@d3/d3-bin  
    geo https://observablehq.com/@d3/world-airports?collection=@d3/d3-geo https://github.com/d3/d3-geo
    auto axes / ticks https://observablehq.com/@uwdata/scales-axes-and-legends?collection=@uwdata/visualization-curriculum
    means https://danfo.jsdata.org/
    line graph with d3 https://observablehq.com/@d3/line-chart?collection=@d3/d3-shape https://github.com/d3/d3-shape 
    dotplots 
    ordinal data, legends
    componetization 
  */

  {
    /* <rect x={index * 11} y={size} width="10" height={bin.length} /> */
  }

  // Elevation vs. Avg temperature
  const [elevationTempData, elevationTempLoading] = useFetch(
    "https://raw.githubusercontent.com/kaylalee44/info474-assignments/a2/data/elevation_avgtemp.csv"
  );
  const createElevationAvgTempLineChart = () => {
    const margin = { top: 20, right: 20, bottom: 30, left: 50 }, //size
      width = 1500 - margin.left - margin.right,
      height = 550 - margin.top - margin.bottom;

    const svg = d3 // create the svg box for the viz
      .select("#elevation-temp-line")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  

    elevationTempData.forEach(function (d) { //parse values to int so that d3 can process them
      d.elevation = +d.elevation;
      d.TAVG = +d.TAVG;
    });
    const xScale = scaleLinear() //elevation
      .domain([0, max(elevationTempData, function (d) { return d.elevation; })]).nice()
      .range([0, width])
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    const yScale = scaleLinear() //avg temp
      .domain([0, max(elevationTempData, function (d) { return d.TAVG; })]).nice()
      .range([height, 0]);
    svg.append("g")
      .call(d3.axisLeft(yScale));
    
    const valueline = d3.line() //create the line
      .x(function (d) {
        return xScale(d.elevation);
      })
      .y(function (d) {
        return yScale(d.TAVG);
      });
  
    svg.append("path") // add the line to svg
      .datum(elevationTempData)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 1.5)
      .attr("d", valueline);
  };

  // Month vs. Precipitation
  const [monthPrecipData, monthPrecipLoading] = useFetch(
    "https://raw.githubusercontent.com/kaylalee44/info474-assignments/a2/data/month_precip.csv"
  );
  const createMonthPrecipitationLineChart = () => {
    const margin = { top: 20, right: 20, bottom: 30, left: 50 }, //size
      width = 1500 - margin.left - margin.right,
      height = 550 - margin.top - margin.bottom;

    const svg = d3 // create the svg box for the viz
      .select("#month-precip-line")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  

    monthPrecipData.forEach(function (d) { //parse values to int so that d3 can process them
      d.PRCP = +d.PRCP;
    });
    const xScale = scaleBand()
      .rangeRound([0, width]).padding(1)
      .domain(monthPrecipData.map(function(d) { return d.month; }));
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    const yScale = scaleLinear() //precipitation
      .domain([0, max(monthPrecipData, function (d) { return d.PRCP; })]).nice()
      .range([height, 0]);
    svg.append("g")
      .call(d3.axisLeft(yScale));
    
    const valueline = d3.line() //create the line
      .x(function (d) {
        return xScale(d.month);
      })
      .y(function (d) {
        return yScale(d.PRCP);
      });
  
    svg.append("path") // add the line to svg
      .datum(monthPrecipData)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 1.5)
      .attr("d", valueline);
  };

  useEffect(() => {
    createElevationAvgTempLineChart();
    createMonthPrecipitationLineChart();
  }, []);

  return (
    <div>
      <h1>Exploratory Data Analysis, Assignment 2, INFO 474 SP 2021</h1>

      <p>{elevationTempLoading && "Loading elevation & average temp data!"}</p>
      <h3>Elevation vs. Average Temperature</h3>
      <script src="https://d3js.org/d3.v4.js"></script>
      <div id="elevation-temp-line" ></div>
      {/* <script>{createElevationAvgTempLineChart()}</script> */}
      {console.log("render")}

      <p>{monthPrecipLoading && "Loading month & precipitation data!"}</p>
      <h3>Month vs. Precipitation</h3>
      <div id="month-precip-line"></div>

      <p>{loading && "Loading weather data!"}</p>
      <h3> Binning </h3>
      <svg width={size} height={size} style={{ border: "1px solid black" }}>
        {tmaxBins.map((bin, i) => {
          return (
            <rect
              y={size - 50 - bin.length}
              width="10"
              height={bin.length}
              x={histogramLeftPadding + i * 11}
            />
          );
        })}
      </svg>

      <h3>Temperatures</h3>
      <svg width={size} height={size} style={{ border: "1px solid black" }}>
        <text
          x={size / 2 - 12}
          y={yScale(0) + axisTextAlignmentFactor}
          textAnchor="end"
          style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}
        >
          0
        </text>
        <text
          x={size / 2 - 12}
          y={yScale(100) + axisTextAlignmentFactor}
          textAnchor="end"
          style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}
        >
          100
        </text>
        <line
          x1={size / 2 - 10}
          y1={yScale(100)}
          x2={size / 2 - 5}
          y2={yScale(100)}
          stroke={"black"}
        />
        <line
          x1={size / 2 - 10}
          y1={yScale(0)}
          x2={size / 2 - 5}
          y2={yScale(0)}
          stroke={"black"}
        />

        {dataSmallSample.map((measurement, index) => {
          const highlight = measurement.station === "KALISPELL GLACIER AP";
          return (
            <line
              key={index}
              x1={size / 2}
              y1={yScale(measurement.TMAX)}
              x2={size / 2 + 20}
              y2={yScale(measurement.TMAX)}
              stroke={highlight ? "red" : "steelblue"}
              strokeOpacity={highlight ? 1 : 0.1}
            />
          );
        })}
      </svg>

      <h3>Scatterplot</h3>
      <svg width={size} height={size} style={{ border: "1px solid black" }}>
        {dataSmallSample.map((measurement, index) => {
          const highlight = measurement.station === "KALISPELL GLACIER AP";
          return (
            <circle
              key={index}
              cx={100 - measurement.TMIN}
              cy={size - margin - measurement.TMAX}
              r="3"
              fill="none"
              stroke={highlight ? "red" : "steelblue"}
              strokeOpacity="0.2"
            />
          );
        })}
      </svg>
      <h3>

        Barcode plot TMAX at Kalispell Glacier (sounds cold, expect it to be
        lower than average)
      </h3>
      <svg width={size} height={size} style={{ border: "1px solid black" }}>
        <text
          x={size / 2 - 12}
          textAnchor="end"
          y={size - margin + axisTextAlignmentFactor}
          style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}
        >
          0
        </text>
        <text
          x={size / 2 - 12}
          textAnchor="end"
          y={size - margin - 100 + axisTextAlignmentFactor}
          style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}
        >
          100
        </text>
        <line
          x1={size / 2 - 10}
          y1={size - margin - 100}
          x2={size / 2 - 5}
          y2={size - margin - 100}
          stroke={"black"}
        />
        <line
          x1={size / 2 - 10}
          y1={size - margin}
          x2={size / 2 - 5}
          y2={size - margin}
          stroke={"black"}
        />

        {data.slice(0, 1000).map((measurement, index) => {
          const highlight = measurement.station === "KALISPELL GLACIER AP";
          return (
            <line
              key={index}
              x1={size / 2}
              y1={size - margin - measurement.TMAX}
              x2={size / 2 + 20}
              y2={size - margin - measurement.TMAX}
              stroke={highlight ? "red" : "steelblue"}
              strokeOpacity={highlight ? 1 : 0.1}
            />
          );
        })}
      </svg>
      <h3>
        TMAX at Kalispell Glacier (sounds cold, expect it to be lower than
        average)
      </h3>
      <svg width={size} height={size} style={{ border: "1px solid black" }}>
        {data.slice(0, 300).map((measurement, index) => {
          const highlight = measurement.station === "KALISPELL GLACIER AP";
          return (
            <circle
              key={index}
              cx={highlight ? size / 2 : size / 2 - 20}
              cy={size - margin - measurement.TMAX}
              r="3"
              fill="none"
              stroke={highlight ? "red" : "steelblue"}
              strokeOpacity="0.2"
            />
          );
        })}
      </svg>
      <h3>Rendering circles :) this shows a distribution of TMAX</h3>
      <svg width={size} height={size} style={{ border: "1px solid black" }}>
        {data.slice(0, 300).map((measurement, index) => {
          return (
            <circle
              key={index}
              cx={size / 2}
              cy={size - margin - measurement.TMAX}
              r="3"
              fill="none"
              stroke={"steelblue"}
              strokeOpacity="0.2"
            />
          );
        })}
      </svg>
    </div>
  );
};

export default App;