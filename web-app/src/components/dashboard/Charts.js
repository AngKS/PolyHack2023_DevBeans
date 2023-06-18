import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import {
  SlBadge,
  SlSpinner,
  SlTab,
  SlTabGroup,
  SlTabPanel,
} from "@shoelace-style/shoelace/dist/react";
import { Line } from "react-chartjs-2";

import PieChart from "./PieChart";
import {chartOptions} from "./options/ChartOptions"

const Charts = (props) => {


  // console.log(props.data)
  const [parsedData, setParseData] = useState({
    labels: [],
    datasets: []
  })

  const aggregateData = () => {

    parsedData.labels.forEach((item) => {
      

      

    })




  }

  useEffect(() => {
    if (props.data.length < 0 || props.data == null) {
      return;
    }
    let labels = [];
    let datasets = [];
    for (let item of props.data) {
      if (item.tweet_sentiment.labels.length > 0) {
        datasets.push(item.tweet_sentiment.labels.length);
        // parse created_at

        let date = new Date(item.created_at);
        let date_string = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        labels.push(date_string);
      }
    }
    let parsedData_body = {
      labels: labels,
      datasets: [
        {
          label: "Censored Topics",
          backgroundColor: (context) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 180);
            gradient.addColorStop(0, "#84ADFF");
            gradient.addColorStop(1, "rgba(132, 173, 255, 0)");
            return gradient;
          },
          borderColor: "rgb(0,0,255)",
          data: datasets,
        },
      ],
    };
    setParseData(parsedData_body);
    

  }, [props])

  return (
    <SlTabGroup>
      <SlTab active slot="nav" panel="topics-censored">
        Topics Censored over time
      </SlTab>
      <SlTab slot="nav" panel="content-breakdown">
        <span className="">Content Breakdown</span>
      </SlTab>
      <SlTab slot="nav" panel="site-most-visited" disabled>
        Frequently Visited Sites
      </SlTab>

      <sl-tab-panel
        active
        name="topics-censored"
        className="flex items-center justify-center h-full w-full"
      >
        
        {
          parsedData.labels.length > 0 ?
          <Line data={parsedData} options={chartOptions} />
          :
          <div className="flex items-center justify-center h-full w-full">
            {/* show no data available */}
            <span className="text-xl font-medium text-slate-500">
              No data available.
            </span>
          </div>
        }
      </sl-tab-panel>
      <sl-tab-panel name="site-most-visited">
        <span>Panel under Construction</span>
      </sl-tab-panel>
      <sl-tab-panel name="content-breakdown"></sl-tab-panel>
    </SlTabGroup>
  );
};
export default Charts;
