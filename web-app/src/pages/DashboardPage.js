import {React, useEffect, useState} from "react";
import { useNavigate, Link } from "react-router-dom";

import Header from "../layout/Header";
import MetricCard from "../components/dashboard/MetricCard";
import Widgets from "../components/dashboard/Widgets";
import Charts from "../components/dashboard/Charts";
import HistoryTable from "../components/dashboard/HistoryTable";
import TopicViewWidget from "../components/dashboard/TopicViewWidget";

function DashboardPage() {
  const navigate = useNavigate();
  let user = null;
  const user_item = localStorage.getItem(
    process.env.REACT_APP_SUPABASE_AUTH_TOKEN_KEY
  );

  if (user_item) {
    let user_data = JSON.parse(user_item);
    if (user_data.user.aud === "authenticated") {
      user = {
        image_url: user_data.user.user_metadata.avatar_url,
        name: user_data.user.user_metadata.full_name,
      };
    }
    else{
      navigate("/login")
    }
  }


  const [customHeight, setCustomHeight] = useState(0);
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
    }
  ]
  const [websiteVisited, setWebsiteVisited] = useState([
    {
      url: "https://github.com/supabase/supabase/issues/2984",
      topics: ["politics", "sports"],
      last_visited: "2021-09-01",
    },
    {
      url: "https://huggingface.co/pricing#endpoints",
      topics: ["politics", "sports"],
      last_visited: "2021-09-01",
    },
    {
      url: "https://www.twitter.com",
      topics: ["politics", "sports"],
      last_visited: "2021-09-01",
    },
    {
      url: "https://www.instagram.com",
      topics: ["politics", "sports"],
      last_visited: "2021-09-01",
    },
    {
      url: "https://www.youtube.com",
      topics: ["politics", "sports"],
      last_visited: "2021-09-01",
    },
    {
      url: "https://www.reddit.com",
      topics: ["politics", "sports"],
      last_visited: "2021-09-01",
    },
    {
      url: "https://www.netflix.com",
      topics: ["politics", "sports"],
      last_visited: "2021-09-01",
    },
    {
      url: "https://www.twitter.com",
      topics: ["politics", "sports"],
      last_visited: "2021-09-01",
    },
    {
      url: "https://www.instagram.com",
      topics: ["politics", "sports"],
      last_visited: "2021-09-01",
    },
    {
      url: "https://www.youtube.com",
      topics: ["politics", "sports"],
      last_visited: "2021-09-01",
    },
    {
      url: "https://www.reddit.com",
      topics: ["politics", "sports"],
      last_visited: "2021-09-01",
    },
    {
      url: "https://www.netflix.com",
      topics: ["politics", "sports"],
      last_visited: "2021-09-01",
    },
    {
      url: "https://www.twitter.com",
      topics: ["politics", "sports"],
      last_visited: "2021-09-01",
    },
    {
      url: "https://www.instagram.com",
      topics: ["politics", "sports"],
      last_visited: "2021-09-01",
    },
    {
      url: "https://www.youtube.com",
      topics: ["politics", "sports"],
      last_visited: "2021-09-01",
    },
    {
      url: "https://www.reddit.com",
      topics: ["politics", "sports"],
      last_visited: "2021-09-01",
    },
    {
      url: "https://www.netflix.com",
      topics: ["politics", "sports"],
      last_visited: "2021-09-01",
    },
  ]);


  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    const header_height = document.getElementById("navbar").clientHeight;
    // get screenHeigh
    const screenHeight = window.innerHeight;
    setCustomHeight(screenHeight - header_height);

  }, []);



  return (
    <div className="flex flex-col justify-start items-center h-full min-h-screen bg-[#F1FCFE]">
      <Header dashboard={true} />
      <section
        style={{ maxHeight: `${customHeight}px` }}
        className={`container flex-grow w-full h-[${customHeight}px] grid grid-cols-12 grid-rows-5 gap-2 pb-8`}
      >
        {/* top level insights/metrics */}
        <MetricCard
          title="Smart Recommendations"
          extra="px-6 lg:col-span-3 sm:auto-cols-auto row-span-1"
        >
          <p className="text-slate-700">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia
            reiciendis similique expedita adipisci ut, veniam omnis quae unde
            dignissimos? Nulla nihil dolore, blanditiis nisi a laudantium facere
            commodi recusandae dolor! Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Mollitia reiciendis similique expedita adipisci
            ut, veniam omnis quae unde dignissimos? Nulla nihil dolore,
            blanditiis nisi a laudantium facere commodi recusandae dolor!
          </p>
        </MetricCard>
        <MetricCard
          title="% Censored Data"
          extra="px-6 lg:col-span-3 sm:auto-cols-auto row-span-1"
        ></MetricCard>

        <MetricCard
          title="Topic most Viewed"
          extra="px-6 lg:col-span-3 sm:auto-cols-auto row-span-1"
        >
            <TopicViewWidget topics={[
              {
                name: "Politics",
                count: 10
              },
              {
                name: "Sports",
                count: 10
              },
              {
                name: "Entertainment",
                count: 10
              },
            ]}/>
        </MetricCard>
        <MetricCard
          title="Kind'O Matic"
          extra="px-6 lg:col-span-3 sm:auto-cols-auto row-span-1"
        >
          <span>Shows amount of emphathetic/positive recommendations used</span>
        </MetricCard>
        {/* second tier metrics */}
        <MetricCard
          title="Recent Site History"
          extra="px-6 lg:col-span-5 sm:auto-cols-auto row-span-4"
        >
          <HistoryTable 
            websiteVisited={websiteVisited}

          >
          </HistoryTable>
        </MetricCard>
        <MetricCard
          title=""
          extra="px-6 lg:col-span-7 sm:auto-cols-auto row-span-4"
        >
          <Charts />
        </MetricCard>
      </section>
    </div>
  );
}

export default DashboardPage;