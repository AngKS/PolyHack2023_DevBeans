import React from "react";


const CensoredDataWidget = ({ censored_content_count, total_count }) => {
  return (
    <div className="h-full w-auto flex justify-end items-end">
        <span className="text-7xl font-bold text-blue-500">{censored_content_count}%</span>
        <span className="text-lg ml-2 font-medium text-slate-500">contents censored.</span>
    </div>
  );
};
export default CensoredDataWidget;
