import {React, useEffect, useRef, useState} from 'react'

function MetricCard(props) {
  const { extra, title, children, ...attr } = props;

  // calculate the rendered height of the card and set it as the max-height
  // this is to prevent the card from jumping around when the content changes

  const cardRef = useRef(null);
  const [ogHeight, setOgHeight] = useState(0);

  useEffect(() => {
    const card = cardRef.current;
    const height = card.getBoundingClientRect().height;
    setOgHeight(height + " px");
  }, []);


  return (
    <div
      className={`!z-5 h-full max-h-inherit relative flex flex-col py-4 rounded-[20px] bg-slate-100 bg-clip-border shadow ${extra}`}
      {...attr}
    >
      <div className="relative flex items-center justify-between">
        <div className="text-md font-medium text-navy-600 dark:text-white">
          {title}
        </div>
      </div>
      <></>
      <div ref={cardRef}  className={`flex-grow bg-red-500 max-h-[${ogHeight}] h-full overflow-y-scroll`}>{children}</div>
    </div>
  );
}

export default MetricCard