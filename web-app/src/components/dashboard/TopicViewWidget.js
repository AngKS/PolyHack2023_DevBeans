import { React, useEffect, useState } from "react";
import { SlBadge, SlButton, SlIcon } from "@shoelace-style/shoelace/dist/react";

const TopicViewWidget = (props) => {


    return (
      <div className="flex flex-col w-full h-full">
        <ol type="1" className="h-full overflow-y-scroll w-ful mt-2">
          {props.topics.map((topic, index) => {
            return (
              <div className="flex justify-between text-slate-700">
                <div className="">
                  <span className="text-sm font-sans">{index + 1}.</span>
                  <span className="ml-2 font-medium">{topic.name}</span>
                </div>
                <SlBadge type="info">{topic.count} views</SlBadge>
              </div>
            );
          })}
        </ol>
      </div>
    );
};
export default TopicViewWidget;
