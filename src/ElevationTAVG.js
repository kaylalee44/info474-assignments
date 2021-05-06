import React from "react";
import { useFetch } from "./hooks/useFetch";
import { scaleLinear } from "d3-scale";
import { max } from "d3-array";
import * as d3 from "d3";

// Elevation vs. Avg temperature
export default function ElevationTAVG() {
    const [data, loading] = useFetch(
        "https://raw.githubusercontent.com/kaylalee44/info474-assignments/a2/data/elevation_avgtemp.csv"
    );
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


        data.forEach(function (d) { //parse values to int so that d3 can process them
        d.elevation = +d.elevation;
        d.TAVG = +d.TAVG;
    });
    const xScale = scaleLinear() //elevation
        .domain([0, max(data, function (d) { return d.elevation; })]).nice()
        .range([0, width])
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScale));

    const yScale = scaleLinear() //avg temp
        .domain([0, max(data, function (d) { return d.TAVG; })]).nice()
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
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 1.5)
        .attr("d", valueline);

    return (
        <div>
            <p>{loading && "Loading elevation & average temp data!"}</p>
            <h3>Elevation vs. Average Temperature</h3>
            {/* <script src="https://d3js.org/d3.v4.js"></script> */}
            <div id="elevation-temp-line" ></div>
        </div>
    );
}