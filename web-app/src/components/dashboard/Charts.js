import React from "react";
import Chart from "chart.js/auto";
import {
  SlTab,
  SlTabGroup,
  SlTabPanel,
} from "@shoelace-style/shoelace/dist/react";
import LineChart from "./LineChart";
import PieChart from "./PieChart";

const Charts = () => {
  return (
    <SlTabGroup
        
    >
      <SlTab active slot="nav" panel="topics-censored">
        Topics Censored over time
      </SlTab>
      <SlTab slot="nav" panel="site-most-visited">
        Frequently Visited Sites
      </SlTab>

      <sl-tab-panel active name="topics-censored">
        <LineChart />
      </sl-tab-panel>
      <sl-tab-panel name="site-most-visited">
        <PieChart />
      </sl-tab-panel>
    </SlTabGroup>
  );
};
export default Charts;
