import React from "react";
import { useFetch } from "./hooks/useFetch";
import { scaleLinear, scaleBand } from "d3-scale";
import { max } from "d3-array";
import * as d3 from "d3";

// Month vs. Precipitation
export default function MonthPrecip() {
    const [data, loading] = useFetch(
        "https://raw.githubusercontent.com/kaylalee44/info474-assignments/a2/data/month_precip.csv"
    );
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
  

      data.forEach(function (d) { //parse values to int so that d3 can process them
      d.PRCP = +d.PRCP;
    });
    const xScale = scaleBand()
      .rangeRound([0, width]).padding(1)
      .domain(data.map(function(d) { return d.month; }));
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    const yScale = scaleLinear() //precipitation
      .domain([0, max(data, function (d) { return d.PRCP; })]).nice()
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
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 1.5)
      .attr("d", valueline);

    return (
        <div>
            <p>{loading && "Loading month & precipitation data!"}</p>
            <h3>Month vs. Precipitation</h3>
            <div id="month-precip-line"></div>
        </div>
    );
}