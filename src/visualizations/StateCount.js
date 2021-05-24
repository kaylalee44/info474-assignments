import React from "react";
import { useFetch } from "../hooks/useFetch";
import { scaleLinear, scaleBand } from "d3-scale";
import { max } from "d3-array";
import * as d3 from "d3";

// Count of States
export default function CountOfStates() {
    const [data, loading] = useFetch(
        "https://raw.githubusercontent.com/kaylalee44/info474-assignments/a2/data/state_count.csv"
    );

    if (loading === true) {
        // the dimensions of our svg
        const margin = { top: 20, right: 20, bottom: 40, left: 60 }, //size
            width = 1000 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        var svg = d3.select("#state_count_bar")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        data.forEach(function (d) { //parse values to int so that d3 can process them
            d.count = +d.count;
        });

        // sort data
        data.sort(function(b, a) {
            return a.count - b.count;
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
            .domain([0, max(data, function (d) { return d.count; })]).nice()
            .range([ height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));

        // Bars
        svg.selectAll("mybar")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", function(d) { return x(d.state); })
            .attr("y", function(d) { return y(d.count); })
            .attr("width", x.bandwidth())
            .attr("height", function(d) { return height - y(d.count); })
            .attr("fill", "#000")

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
            .text('Count');  
    }
    return (
        <div>
            <p>{loading && "Loading state count data!"}</p>
            <h3>Count of Data by State</h3>
            <p>It appears that Utah has the highest count of data and MP has the lowest.</p>
            <div id="state_count_bar" className="viz"></div>
        </div>
    );
}