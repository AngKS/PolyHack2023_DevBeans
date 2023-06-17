import {React, useEffect, useState} from "react";
import { Navigate } from "react-router-dom";
import { SlBadge, SlButton, SlIcon } from "@shoelace-style/shoelace/dist/react";

const tableRow = (data, data_full, key) => {
    const knownSites = [
      {
        name: "Google",
        icon: "https://www.google.com/favicon.ico",
      },
      {
        name: "Facebook",
        icon: "https://www.facebook.com/favicon.ico",
      },
      {
        name: "Twitter",
        icon: "https://www.twitter.com/favicon.ico",
      },
      {
        name: "Instagram",
        icon: "https://www.instagram.com/favicon.ico",
      },
      {
        name: "Github",
        icon: "https://www.github.com/favicon.ico",
      },
      {
        name: "Youtube",
        icon: "https://www.youtube.com/favicon.ico",
      },
    ];

    // check if data.url is in knownSites
    const site = knownSites.find((site) => {
        return data.url.includes(site.name.toLowerCase());
    });

    if (site) {
        return (
          <tr key={key} className="border-b border-slate-200 px-3 py-2">
            <td className="py-2 px-1 text-slate-500 font-medium ">
              <a
                href={data.url}
                rel="noreferrer"
                target="_blank"
                className="bg-white p-2 text-black text-xs font-regular flex items-center gap-2 rounded-lg w-fit"
              >
                <SlIcon slot="prefix" name={site.name.toLowerCase()}></SlIcon>
                {site.name}
              </a>
            </td>
            <td
              className={`py-2 px-1 text-slate-700 font-medium overflow-x-scroll max-w-[${data_full ? "100%" : "170px"}] w-[${data_full ? "100%" : "170px"}]`}
            >
              {data.topics.map((topic, key) => {
                return (
                  <span
                    key={key}
                    className="p-2 rounded-lg text-xs text-blue-500 bg-white mx-2"
                  >
                    {topic}
                  </span>
                );
              })}
            </td>
            <td className="py-2 px-1 w-fit">
              <span  className=" text-slate-500 text-xs no-wrap">
                {data.last_visited}
              </span>
            </td>
          </tr>
        );
    }
    else {
        return (
          <tr key={key} className="border-b border-slate-200 px-3 py-2">
            <td className="py-2 px-1 text-slate-500 font-medium ">
              <a
                href={data.url}
                rel="noreferrer"
                target="_blank"
                className="bg-white p-2 text-black text-xs font-regular flex items-center gap-2 rounded-lg w-fit"
              >
                <SlIcon slot="prefix" name="globe"></SlIcon>
                {data.url}
              </a>
            </td>
            <td
              className={`py-2 px-1 text-slate-700 font-medium overflow-x-scroll max-w-[${data_full ? "100%" : "170px"}] w-[${data_full ? "100%" : "170px"}]`}
            >
              {data.topics.map((topic, key) => {
                return (
                  <span
                    key={key}
                    className="p-2 rounded-lg text-xs text-blue-500 bg-white mx-2"
                  >
                    {topic}
                  </span>
                );
              })}
            </td>
            <td className="py-2 px-1 w-fit">
              <span className=" text-slate-500 text-xs no-wrap">{data.last_visited}</span>
            </td>
          </tr>
        );
    }


}

const HistoryTable = ({websiteVisited, data_full}) => {

    const [topicExpanded, setTopicExpanded] = useState(false);
    return (
      <table className="table-auto w-full">
        <thead className="">
          <tr className="">
            <th className="pt-2 w-fit px-1 text-start text-slate-700 text-sm font-medium">
              Site URL
            </th>
            <th onClick={() => {setTopicExpanded(!topicExpanded)}} className="pt-2  w-fit px-1 text-slate-700 text-start text-sm font-medium hover:cursor-pointer">
              <span>Topics</span>
            </th>
            <th className="pt-2  w-fit px-1 text-start text-slate-700 text-sm font-medium">
              Last visited
            </th>
          </tr>
        </thead>
        <tbody>
          {websiteVisited.map((item, key) => {
            return tableRow(item, topicExpanded, key);
          })}
        </tbody>
      </table>
    );
}
export default HistoryTable;