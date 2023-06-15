import {React, useEffect, useState} from "react";
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
                  <SlButton variant="text" size="small" onClick={() => {}}>
                    <SlIcon slot="prefix" name="globe"></SlIcon>
                    {item.url}
                  </SlButton>
                </td>
                <td className="py-2 px-1 text-slate-700 font-medium ">
                  {item.topics.map((topic, key) => {
                    return (
                      <SlBadge key={key} variant="primary" pill>
                        {topic}
                      </SlBadge>
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