import {React, useEffect, useState} from "react";
import { Navigate } from "react-router-dom";
import { SlBadge, SlButton, SlIcon } from "@shoelace-style/shoelace/dist/react";


const HistoryTable = ({websiteVisited}) => {

    return (
      <table className="table-auto w-full">
        <thead>
          <tr className="">
            <th className="py-2 w-fit px-1 text-start text-slate-700 text-sm font-medium ">
              Site URL
            </th>
            <th className="py-2 w-fit px-1 text-start text-slate-700 text-sm font-medium ">
              Topic
            </th>
            <th className="py-2 w-fit px-1 text-start text-slate-700 text-sm font-medium ">
              Last visited
            </th>
          </tr>
        </thead>
        <tbody>
          {websiteVisited.map((item, key) => {
            return (
              <tr key={key} className="border-b border-slate-200 px-3 py-2">
                <td className="py-2 px-1 text-slate-500 font-medium ">
                  <a href={item.url} rel="noreferrer" target="_blank">
                    <SlButton variant="text" className="text-black" size="small">
                      <SlIcon slot="prefix" name="globe"></SlIcon>
                      {item.url}
                    </SlButton>
                  </a>
                </td>
                <td className="py-2 px-1 text-slate-700 font-medium ">
                  {item.topics.map((topic, key) => {
                    return (
                      <span key={key} className="px-3 py-2 rounded-lg text-sm text-blue-500">
                        {topic}
                      </span>
                    );
                  })}
                </td>
                <td className="py-2 px-1 text-slate-500 text-sm ">
                  {item.last_visited}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
}
export default HistoryTable;