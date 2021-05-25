import React from "react";
import ElevationTAVG from "./visualizations/ElevationTAVG";
import MonthPrecip from "./visualizations/MonthPrecip";
import StateTAVG from "./visualizations/StateTAVG";
import CountOfStates from "./visualizations/StateCount";
import AWNDBarplot from "./visualizations/AWNDBarplot";
import StateAWNDBar from "./visualizations/StateAWND";
import StateAWNDBarHighlight from "./visualizations/StateAWNDHighlight";
import MonthSnow from "./visualizations/MonthSnow";

// https://observablehq.com/@jermspeaks/async-await

const App = () => {
  return (
    <div>
      <h1>Exploratory Data Analysis, Assignment 2, INFO 474 SP 2021</h1>
      <h2>By: Kayla Lee</h2>
      <p>
        The data set that I decided to use is the “Daily Weather in the U.S., 2017” CSV file. First look at this data, it contains:
      </p>
      <ul>
        <li>Station</li>
        <li>State</li>
        <li>Latitude</li>
        <li>Longitude</li>
        <li>Elevation</li>
        <li>Date</li>
        <li>PRCP = Precipitation (inch)</li>
        <li>SNOW = Snowfall (inch)</li>
        <li>SNWD = Snow depth (inch)</li>
        <li>TMAX = Maximum temperature (F)</li>
        <li>TMIN = Minimum temperature (F)</li>
        <li>TAVG = Average temperature (F)</li>
        <li>AWND = Average daily wind speed (miles / hour)</li>
        <li>WSF5 = Fastest 5-second wind speed (miles / hour)</li>
        <li>WDF5 = Direction of fastest 5-second wind (degrees)</li>
      </ul>
      <p>
        To conduct initial exploratory analysis, I used what we did in lecture to look at the distribution of max temperature as a barcode plot. I also used Python to look at the summary statistics of the data like the averages, medians, etc. Then, I utilized Tableau to conduct further exploratory analysis since I was more familiar with it and could create more visualizations quicker.  The questions that I initially thought of just by looking at the data were:
      </p>
      <ul>
        <li>How does elevation affect the weather (rain, snow, temperature)?</li>
        <li>Which month does it rain / snow the most? What month is the hottest?</li>
        <li>How does wind speed affect rain / snowfall / temperature?</li>
        <li>Which state has the most snowfall / rainfall? What is the hottest / coldest state?</li>
      </ul>
      <p>
        With these questions, I created visualizations in Tableau to begin my investigation. As I was creating the visualizations and looking at the data, two other questions came to mind:
      </p>
      <ul>
        <li>How does the wind speed compare for the hottest and least hot state?</li>
        <li>How does snowfall compare to snow depth in different states for different months?</li>
      </ul>
      <p>
        After creating my visualizations in Tableau, I began thinking of which visualizations I wanted to create in JavaScript and how to translate them from Tableau to JavaScript. After looking through my visualizations, I decided to create a line graph for elevation vs. average temperature, a line graph for month vs. precipitation, a bar graph of average temperature by state to find out what the hottest and coldest states are, a bar graph of the count of the states to make sure there was an understanding of where most of the weather data was coming from, a barcode plot of average wind speed with the hottest and coldest state’s wind speed highlighted, a bar graph of wind speed vs. state that has different shades by average temperature, and a dual line graph of snowfall vs. snow depth vs. month. I chose to create these particular visualizations from my questions since I thought they were the most interesting and appeared to be somewhat related to each other. 
      </p>
      <p>Going through the process for each of my visualizations:</p>
      <ul>
        <li>Line Graph: Elevation vs. Average Temperature
          <ul>
            <li>This graph would help me answer the question of how elevation affects the weather.</li>
            <li>Creating this visualization, I had to look up how to create a line graph using d3, and found that there is a d3 graph gallery that provides starter code on how to create a basic line graph. I used this code as a template and was able to create a line graph using the weather data. However, when I first created the line graph the lines seemed to be connected to many different data points, which made the graph completely unreadable and dense. To fix this, I had to figure out how to organize my data to display on the graph properly. I decided to use Python to clean up the data and created a new csv file with the manipulated data.</li>
          </ul>
        </li>
        <li>Line Graph: Month vs. Precipitation
          <ul>
            <li>This graph would help me answer the question of which month it rains the  most.</li>
            <li>Since I already created a line graph for the elevation and average temperature, I was able to use that code and just replace the data with the month and precipitation. The main difference was the date scale since I had to pull out the month from the dates using d3’s timeParse and then used scaleTime to put the months on the x scale.</li>
          </ul>
        </li>
        <li>Bar Graph: State vs. Average Temperature
          <ul>
            <li>This graph would help me answer the question of which state is the hottest and coldest.</li>
            <li>Creating this visualization, I utilized the example bar graph from the d3 gallergy site from the Internet. To show the highlight, I made the hottest and coldest states red to make it stand out.</li>
          </ul>
        </li>
        <li>Bar Graph: Count of States
          <ul>
            <li>This graph would help me understand the data and why some states might have high or low values due to the amount of data there is for a specific state.</li>
            <li>I used the same method as the state and average temperature bar graph to create this one, except I had to create a new column of data for the count of states.</li>
          </ul>
        </li>
        <li>Barcode Plot: Average Wind Speed 
          <ul>
            <li>This plot would help me see the distribution of the average wind speeds and help answer the question of how wind speed affets temperature.</li>
            <li>To create this visualization, I used the barplot code from the d3 gallery as a template.</li>
          </ul>
        </li>
        <li>Bar Graph: State vs. Average Wind Speed
          <ul>
            <li>This graph would help me answer the question of which state has the highest wind speed and how wind speed affects temperature.</li>
            <li>I used my bar graph code as a template to create the graph.</li>
          </ul>
        </li>
        <li>Dual Line Graph: Month vs. Snowfall and Snow Depth
          <ul>
            <li>This graph would help me answer the question of how snowfall compares to snow depth for different months.</li>
            <li>Creating this graph, I had to look up how to do this and found starter code from d3’s API.</li>
          </ul>
        </li>
      </ul>
      <p>For all of my plots, I organized the data in Python and created a new csv file.</p>

      <ElevationTAVG />
      <MonthPrecip />
      <StateTAVG />
      <CountOfStates />
      <AWNDBarplot />
      <StateAWNDBar />
      <StateAWNDBarHighlight />
      <MonthSnow />

      <h2>Main Lessons Learned:</h2>
      <p>One of the main lessons I learned from analyzing this data, is that it’s important to understand the tools that you are using to create the visualizations. With an understanding, you are able to better manipulate the data and create polished graphics. Through this assignment, I was able to learn and gain experience with using d3 and vega in JavaScript. I’ve never created visualizations in JavaScript before, so this was a bit of a learning curve for me. It was initially difficult for me to even create a basic line graph, but by reading through the APIs and getting help from the Internet, I was able to create a graph using the weather data. Another lesson I learned was that it’s important to have clean data and transform your data before attempting to create any visualization. This makes the process much easier and smoother. Additionally, one more lesson I learned was how important initial investigation is. It’s important because through the process, you encounter interesting statistics and comparisons, which leads to more complex questions.</p>

      <h2>Feedback Given:</h2>
      <ul>
        <li>Use different shades of the same color (different shades of grey)</li>
        <li>Make the visualization bigger</li>
        <li>Change the shape of points to indicate a different variable on the same graph</li>
        <li>Add labels to x and y + a title</li>
      </ul>
    </div>
  );
};

export default App;