import React from "react";
import { useFetch } from "../hooks/useFetch";
import { scaleLinear, scaleBand } from "d3-scale";
import { max } from "d3-array";
import * as d3 from "d3";

// Month vs. Snowfall & Snow Depth
export default function MonthSnow() {
    const [data, loading] = useFetch(
        "https://raw.githubusercontent.com/kaylalee44/info474-assignments/a2/data/snow_snwd_month.csv"
    );

    if (loading === true) {
      const margin = { top: 20, right: 50, bottom: 40, left: 60 }, //size
        width = 1000 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

      const svg = d3 // create the svg box for the viz
        .select("#month-snow-lines")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
      data.forEach(function (d) { //parse values to int so that d3 can process them
        d.SNOW = +d.SNOW;
        d.SNWD = +d.SNWD;
      });

      const xScale = scaleBand()
        .rangeRound([0, width]).padding(1)
        .domain(data.map(function(d) { return d.month; }));
      svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScale));

      const yScale = scaleLinear() 
        .domain([0, max(data, function (d) { return d.SNOW; })]).nice()
        .range([height, 0]);
      svg.append("g")
        .call(d3.axisLeft(yScale));

    const yScale2 = scaleLinear() 
        .domain([0, max(data, function (d) { return d.SNWD; })]).nice()
        .range([height, 0]);
    svg.append("g")
        .attr("transform", "translate(" + width + ",0)")
        .call(d3.axisRight(yScale2));
      
    const snowLine = d3.line() //create the line for snow
        .x(function (d) {
          return xScale(d.month);
        })
        .y(function (d) {
          return yScale(d.SNOW);
        });

    const snwdLine = d3.line() //create the line for snwd
        .x(function (d) {
          return xScale(d.month);
        })
        .y(function (d) {
          return yScale2(d.SNWD);
        });
    
    svg.append("path") // add the line to svg
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 1.5)
        .attr("d", snowLine);

    svg.append("path") // add the line to svg
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 1.5)
        .attr("d", snwdLine);

      // x-axis lable
      svg.append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom)
      .attr('fill', '#000')
      .style('font-size', '20px')
      .style('text-anchor', 'middle')
      .text('Month');

      // y-axis lable
      svg.append("text")
          .attr("x", 0)
          .attr("y", 0)
          .attr('transform', `translate(-40, ${height/2}) rotate(-90)`)
          .attr('fill', '#000')
          .style('font-size', '20px')
          .style('text-anchor', 'middle')
          .text('Snowfall (inch)');  

      svg.append("text")
        .attr("x", 0)
        .attr("y", 0)
        .attr('transform', `translate(` + (width + 35) + `, ${height/2}) rotate(90)`)
        .attr('fill', '#000')
        .style('font-size', '20px')
        .style('text-anchor', 'middle')
        .text('Snow Depth (inch)');  
    }
    return (
        <div>
            <p>{loading && "Loading month & snow data!"}</p>
            <h3>Month vs. Snowfall and Snow Depth</h3>
            <p>
              It appears that both the snowfall and depth decline as the months go by, which makes sense since the season 
              is moving towards summer. It’s interesting how the greatest snowfall is in January but the snow depth in January 
              is not the largest. As the snowfall declines, the snow depth increases until it hits March, where it then begins to decrease. 
              This might be due to the snow not sticking or maybe just building up.</p>
            <div id="month-snow-lines" className="viz"></div>
        </div>
    );
}