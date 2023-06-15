import {React, useEffect, useState} from "react";
import { useNavigate, Link } from "react-router-dom";

import Header from "../layout/Header";
import Footer from "../layout/Footer";
import MetricCard from "../components/dashboard/MetricCard";
import PieChart from "../components/dashboard/PieChart";
import LineChart from "../components/dashboard/LineChart";
import Widgets from "../components/dashboard/Widgets";
import { SlBadge, SlButton, SlIcon } from "@shoelace-style/shoelace/dist/react";
import Charts from "../components/dashboard/Charts";

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
          title="Smart Analytics"
          extra="px-6 lg:col-span-3 sm:auto-cols-auto row-span-1"
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia
          reiciendis similique expedita adipisci ut, veniam omnis quae unde
          dignissimos? Nulla nihil dolore, blanditiis nisi a laudantium facere
          commodi recusandae dolor!
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia
          reiciendis similique expedita adipisci ut, veniam omnis quae unde
          dignissimos? Nulla nihil dolore, blanditiis nisi a laudantium facere
          commodi recusandae dolor!
        </MetricCard>
        <MetricCard
          title="% Censored Data"
          extra="px-6 lg:col-span-3 sm:auto-cols-auto row-span-1"
        ></MetricCard>

        <MetricCard
          title="Topics most Viewed"
          extra="px-6 lg:col-span-3 sm:auto-cols-auto row-span-1"
        ></MetricCard>
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
          <table
            className="table-auto w-full"
          >
            <thead>
              <tr className="">
                <th className="py-2 w-fit px-1 text-start text-slate-700 text-sm font-medium ">Site URL</th>
                <th className="py-2 w-fit px-1 text-start text-slate-700 text-sm font-medium ">Topic</th>
                <th className="py-2 w-fit px-1 text-start text-slate-700 text-sm font-medium ">Last visited</th>
              </tr>
            </thead>
            <tbody>
              {
                websiteVisited.map((item, key) => {
                  return (
                    <tr key={key} className="border-b border-slate-200 px-3 py-2">
                      <td className="py-2 px-1 text-slate-500 font-medium ">
                        <SlButton
                          variant="text"
                          size="small"
                          onClick={() => {}}
                        >
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

                })
              }
            </tbody>
          </table>
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