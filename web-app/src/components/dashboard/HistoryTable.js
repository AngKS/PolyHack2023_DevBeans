import {React, useEffect, useState} from "react";
import { Navigate, Link } from "react-router-dom";
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
        return data?.url?.includes(site.name.toLowerCase());
    });

    let url = data.url
    //  

    // convert time spent from miliseconds to appropriate format
    let time_spent = data.time_spent
    let hours = Math.floor(time_spent / 3600000);
    let minutes = Math.floor((time_spent % 3600000) / 60000);
    let seconds = Math.floor(((time_spent % 3600000) % 60000) / 1000);
    let time_spent_formatted = `${hours}h ${minutes}m ${seconds}s`




    if (site) {
      
        return (
          <tr key={key} className="border-b border-slate-200 px-3 py-2">
            <td className="py-2 px-1 text-slate-500 font-medium ">
              <a
                href={url}
                className="bg-white p-2 text-black text-xs font-regular flex items-center gap-2 rounded-lg w-fit"
              >
                <SlIcon slot="prefix" name={site.name.toLowerCase()}></SlIcon>
                {site.name}
              </a>
            </td>
            <td
              className={`py-2 px-1 text-slate-700 font-medium text-sm overflow-x-scroll max-w-[${
                data_full ? "100%" : "170px"
              }] w-[${data_full ? "100%" : "170px"}]`}
            >
              {time_spent_formatted}
            </td>
            <td className="py-2 px-1 w-fit">
              <span className=" text-slate-500 text-xs no-wrap">
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
                className="bg-white p-2 text-black text-xs font-regular flex items-center gap-2 rounded-lg w-fit"
              >
                <SlIcon slot="prefix" name="globe"></SlIcon>
                {data.url}
              </a>
            </td>
            <td
              className={`py-2 px-1 text-slate-700 font-medium text-sm overflow-x-scroll max-w-[${
                data_full ? "100%" : "170px"
              }] w-[${data_full ? "100%" : "170px"}]`}
            >
              
              {time_spent_formatted}
            </td>
            <td className="py-2 px-1 w-fit">
              <span className=" text-slate-500 text-xs no-wrap">
                {data.last_visited}
              </span>
            </td>
          </tr>
        );
    }


}

const HistoryTable = ({websiteVisited, isLoaded}) => {

    const [topicExpanded, setTopicExpanded] = useState(false);
    const [isLoadedState, setIsLoadedState] = useState(false);
    console.log(websiteVisited)

    useEffect(() => {
      setIsLoadedState(isLoaded);
    }, [isLoaded]);

    if (websiteVisited.length === 0) {
      return (
        <div className="w-full h-full flex-grow">
          <div className="flex h-full flex-col items-center justify-center">
            <span>No Data found</span>
          </div>
        </div>
      );
    }

    return (
      <table className="table-auto w-full">
        <thead className="">
          <tr className="">
            <th className="pt-2 w-fit px-1 text-start text-slate-700 text-sm font-medium">
              Site URL
            </th>
            <th
              onClick={() => {
                setTopicExpanded(!topicExpanded);
              }}
              className="pt-2  w-fit px-1 text-slate-700 text-start text-sm font-medium hover:cursor-pointer"
            >
              <span>Topics</span>
            </th>
            <th className="pt-2  w-fit px-1 text-start text-slate-700 text-sm font-medium">
              Last visited
            </th>
          </tr>
        </thead>

        <tbody>
          {isLoadedState ? (
            websiteVisited.map((item, key) => {
              return tableRow(item, topicExpanded, key);
            })
          ) : isLoadedState && websiteVisited.length === 0 ? (
            <tr className="border-b border-slate-200 px-3 py-2">
              <td className="py-2 px-1 text-slate-500 font-medium ">
                <div className="bg-white p-2 text-black text-xs font-regular flex items-center gap-2 rounded-lg w-fit">
                  <SlIcon slot="prefix" name="globe"></SlIcon>
                  <span className="">-</span>
                </div>
              </td>
              <td
                className={`py-2 px-1 text-slate-700 font-medium overflow-x-scroll max-w-[${
                  topicExpanded ? "100%" : "170px"
                }] w-[${topicExpanded ? "100%" : "170px"}]`}
              >
                <span className=" font-medium text-xs">
                  -
                </span>
              </td>
              <td className="py-2 px-1 w-fit">
                <span className=" font-medium text-xs">
                  -
                </span>
              </td>
            </tr>
          ) : (
            <tr className="border-b border-slate-200 px-3 py-2">
              <td className="py-2 px-1 text-slate-500 font-medium ">
                <div className="bg-white p-2 text-black text-xs font-regular flex items-center gap-2 rounded-lg w-fit">
                  <SlIcon slot="prefix" name="globe"></SlIcon>
                  <span className="animate-pulse">Loading...</span>
                </div>
              </td>
              <td
                className={`py-2 px-1 text-slate-700 font-medium overflow-x-scroll max-w-[${
                  topicExpanded ? "100%" : "170px"
                }] w-[${topicExpanded ? "100%" : "170px"}]`}
              >
                <span className="animate-pulse font-medium text-xs">
                  Loading...
                </span>
              </td>
              <td className="py-2 px-1 w-fit">
                <span className="animate-pulse font-medium text-xs">
                  Loading...
                </span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
}
export default HistoryTable;