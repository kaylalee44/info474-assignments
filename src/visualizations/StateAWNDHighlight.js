import React from "react";
import { useFetch } from "../hooks/useFetch";
import { scaleLinear, scaleBand } from "d3-scale";
import { max } from "d3-array";
import * as d3 from "d3";

// State vs. Average Wind Speed & Colored by Average Temperature
export default function StateAWNDBarHighlight() {
    const [data, loading] = useFetch(
        "https://raw.githubusercontent.com/kaylalee44/info474-assignments/a2/data/windspeed_state.csv"
    );

    if (loading === true) {
        // the dimensions of our svg
        const margin = { top: 20, right: 20, bottom: 40, left: 60 }, //size
            width = 1000 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        var svg = d3.select("#state_awnd_h_bar")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        data.forEach(function (d) { //parse values to int so that d3 can process them
            d.AWND = +d.AWND;
        });

        // X axis
        var x = scaleBand()
            .range([ 0, width ])
            .domain(data.map(function(d) { return d.state; }))
            .padding(0.2);

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        // Add Y axis
        var y = scaleLinear()
            .domain([0, max(data, function (d) { return d.AWND; })]).nice()
            .range([ height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));

        // Bars
        svg.selectAll("mybar")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", function(d) { return x(d.state); })
            .attr("y", function(d) { return y(d.AWND); })
            .attr("width", x.bandwidth())
            .attr("height", function(d) { return height - y(d.AWND); })
            .attr("fill", function(d) {
                if (d.state === "GU") { //highlight
                    return "red";
                }
                return "black";
            })

        // x-axis lable
        svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom)
        .attr('fill', '#000')
        .style('font-size', '20px')
        .style('text-anchor', 'middle')
        .text('State');

        // y-axis lable
        svg.append("text")
            .attr("x", 0)
            .attr("y", 0)
            .attr('transform', `translate(-40, ${height/2}) rotate(-90)`)
            .attr('fill', '#000')
            .style('font-size', '20px')
            .style('text-anchor', 'middle')
            .text('Average Daily Wind Speed (mi/hr)');  
    }
    return (
        <div>
            <p>{loading && "Loading state & awnd data!"}</p>
            <p>The highest average temperature is GU, but the average wind speed is pretty low. This aligns with how NM 
                and CO have high wind speeds but low temperatures. This might mean that the lower the wind speed, the higher the temperature, and vice versa.
            </p>
            <div id="state_awnd_h_bar" className="viz"></div>
        </div>
    );
}