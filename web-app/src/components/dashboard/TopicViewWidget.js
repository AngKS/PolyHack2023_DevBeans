import { React, useEffect, useState } from "react";
import { SlBadge, SlButton, SlIcon } from "@shoelace-style/shoelace/dist/react";

const TopicViewWidget = (props) => {

    const [numTopics, setNumTopics] = useState(3)

    return (
      <div className="flex flex-col w-full h-full">
        <ol type="1" className="h-full overflow-y-scroll w-ful mt-1">
          {props.topics.map((topic, index) => {
            return (
              <div key={index} className="flex justify-between mb-1 text-slate-700">
                <div className="">
                  <span className="text-sm font-sans">{index + 1}.</span>
                  <span className="ml-2 font-medium">{topic.name}</span>
                </div>
                <span className="text-xs px-2 py-1 bg-blue-500 text-slate-200 rounded-lg">{topic.count} views</span>
              </div>
            );
          })}
        </ol>
      </div>
    );
};
export default TopicViewWidget;
