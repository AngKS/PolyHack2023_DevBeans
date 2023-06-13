import React from 'react'

function MetricCard(props) {
  const { extra, title, children, ...attr } = props;
  return (
    <div
      className={`!z-5 relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow ${extra}`}
      {...attr}
    >
      <div className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          {title}
        </div>
      </div>
      {children}
    </div>
  );
}

export default MetricCard