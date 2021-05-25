import React from "react";
import { useFetch } from "../hooks/useFetch";
import { scaleLinear, scaleBand } from "d3-scale";
import { max } from "d3-array";
import * as d3 from "d3";

// Average Wind Speed 
export default function AWNDBarplot() {
    const [data, loading] = useFetch(
        "https://raw.githubusercontent.com/kaylalee44/info474-assignments/a2/data/windspeed_state.csv"
    );

    if (loading === true) {
        var margin = {top: 10, right: 30, bottom: 30, left: 60},
            width = 400 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        const svg = d3 // create the svg box for the viz
            .select("#awnd_barplot")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        let awnd = [];
        
        data.forEach(function (d) { //parse values to int so that d3 can process them
            d.AWND = +d.AWND;
            awnd.push(d.AWND);
        });

        var data1 = [12,19,11,13,12,22,13,4,15,16,18,19,20,12,11,9]

        // Compute summary statistics used for the box:
        let data_sorted = awnd.sort(d3.ascending)
        let q1 = d3.quantile(data_sorted, .25)
        let median = d3.quantile(data_sorted, .5)
        let q3 = d3.quantile(data_sorted, .75)
        let interQuantileRange = q3 - q1
        let min = q1 - 1.5 * interQuantileRange
        let max1 = q1 + 1.5 * interQuantileRange

        // Show the Y scale
        let y = scaleLinear()
            .domain([0, 12])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));

        // a few features for the box
        let center = 200

        // Show the main vertical line
        svg
            .append("line")
            .attr("x1", center)
            .attr("x2", center)
            .attr("y1", y(min) )
            .attr("y2", y(max1) )
            .attr("stroke", "black")

        // Show the box
        svg
            .append("rect")
            .attr("x", center - 100/2)
            .attr("y", y(q3) )
            .attr("height", (y(q1)-y(q3)) )
            .attr("width", 100 )
            .attr("stroke", "black")
            .style("fill", "grey")

        // show median, min and max horizontal lines
        svg
            .selectAll("toto")
            .data([min, median, max1])
            .enter()
            .append("line")
            .attr("x1", center-100/2)
            .attr("x2", center+100/2)
            .attr("y1", function(d){ return(y(d))} )
            .attr("y2", function(d){ return(y(d))} )
            .attr("stroke", "black")

        // // y-axis lable
        // svg.append("text")
        //     .attr("x", 0)
        //     .attr("y", 0)
        //     .attr('transform', `translate(-40, ${height/2}) rotate(-90)`)
        //     .attr('fill', '#000')
        //     .style('font-size', '20px')
        //     .style('text-anchor', 'middle')
        //     .text('Average Daily Wind Speed (mi/hr)');  
    }
    return (
        <div>
            <p>{loading && "Loading average wind speed data!"}</p>
            <h3>Average Wind Speed (mi/hr)</h3>
            <p>
                Looking at this barplot, it appears that the mean average wind speed is around 7.5 mi/hr for all states. 
                The max appears to be around 10 mi/hr and the min is around 3 mi/hr. This plot can help understand how wind speed 
                affects other weathers.
            </p>
            <div id="awnd_barplot" className="viz"></div>
        </div>
    );
}