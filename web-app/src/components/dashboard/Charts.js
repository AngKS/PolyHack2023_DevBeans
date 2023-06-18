import React from "react";
import Chart from "chart.js/auto";
import {
  SlBadge,
  SlTab,
  SlTabGroup,
  SlTabPanel,
} from "@shoelace-style/shoelace/dist/react";
import LineChart from "./LineChart";
import PieChart from "./PieChart";

const Charts = () => {
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

      <sl-tab-panel active name="topics-censored" className="">
        <LineChart />
      </sl-tab-panel>
      <sl-tab-panel name="site-most-visited">
        <PieChart />
      </sl-tab-panel>
      <sl-tab-panel name="content-breakdown"></sl-tab-panel>
    </SlTabGroup>
  );
};
export default Charts;
