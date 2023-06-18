import {React, useEffect, useMemo, useState, useContext} from "react";
import { useNavigate, Link } from "react-router-dom";
import { ApplicationContext } from "../contexts/ApplicationContext";


import Header from "../layout/Header";
import MetricCard from "../components/dashboard/MetricCard";
import Charts from "../components/dashboard/Charts";
import HistoryTable from "../components/dashboard/HistoryTable";
import TopicViewWidget from "../components/dashboard/TopicViewWidget";
import CensoredDataWidget from "../components/dashboard/CensoredDataPieChart";
import SmartWidget from "../components/dashboard/SmartWidget";
import InputMetricsWidget from "../components/dashboard/InputMetricsWidget";
import { getBrowsingHistory, getUserInputMetrics, getUserTweets, readFullDatabase } from "../utils/databaseUtils";
import { SlBadge, SlSpinner } from "@shoelace-style/shoelace/dist/react";

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
        uuid: user_data.user.id,
      };

    }
  } 
  else {
    navigate("/login");
  }

  const [customHeight, setCustomHeight] = useState(0);
  const [user_session, setUserSession] = useState(null)
  const { supabaseClient } = useContext(ApplicationContext);
  
  const [websiteVisited, setWebsiteVisited] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [userInputMetrics, setUserInputMetrics] = useState(0);

  const [userTweets, setUserTweets] = useState(null);

  const getSession = async () => {
    let session = await supabaseClient?.auth?.getSession();
    if (session) {
      // check if session has expired
      // const expire_at = 
      setUserSession(session.data.session)
    }
  }

  const getBrowsingData = async () => {
    // fetch database objects
  //  let {statusCode, body} = await getBrowsingHistory()
    if (user !== null){
      let { statusCode, body } = await getBrowsingHistory(user.uuid);

      if (statusCode === 200){
        body.data.map((item) => {
          let item_created_at = new Date(item.created_at)
          // parse into date object
          item.created_at = item_created_at.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          return setWebsiteVisited((websiteVisited) => [...websiteVisited, {url: item.website_url, last_visited: item.created_at, topics: item.topics, time_spent: item.time_spent}])
        })
        setLoaded(true);
      }
      else if (statusCode === 404){
        setLoaded(true);
      }
    }

  }

  const userReccomendedTextsMetrics = async () => {
    if (user !== null){
      let {statusCode, body} = await getUserInputMetrics(user.uuid)
      if (statusCode === 200){
        return setUserInputMetrics(body.percentage.toFixed(1))
      }
      else{
        return setUserInputMetrics(0)
      }
    }
  }

  const userCensoredData_TopicData = async () => {
    if (user !== null){
      let {statusCode, body} = await getUserTweets(user.uuid)
      if (statusCode === 200){
        return setUserTweets(body)
      }
      else{
        return setUserTweets({
          data: null,
          payload: null,
          percentage: 0,
          top3: null
        })
      }
    }
      
  }

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    getBrowsingData();
    userReccomendedTextsMetrics();
    userCensoredData_TopicData()

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
          beta="true"
          extra="px-6 lg:col-span-3 sm:auto-cols-auto row-span-1"
        >
          <SmartWidget />
        </MetricCard>
        <MetricCard
          title="Topic most Viewed"
          extra="px-6 lg:col-span-3 sm:auto-cols-auto row-span-1"
        >
          <TopicViewWidget
            topics={userTweets == null ? null : userTweets.top3}
          />
        </MetricCard>
        <MetricCard
          title="(%) Censored Data"
          extra="px-6 lg:col-span-3 sm:auto-cols-auto row-span-1"
        >
          <CensoredDataWidget
            censored_content_count={
              userTweets == null ? 0 : userTweets.percentage?.toFixed(1)
            }
          />
        </MetricCard>
        <MetricCard
          title="Your texts were"
          extra="px-6 lg:col-span-3 sm:auto-cols-auto row-span-1"
        >
          <InputMetricsWidget recommended_phrases_used={userInputMetrics} />
        </MetricCard>

        {/* second tier metrics */}
        <MetricCard
          title="Recent Site History"
          extra="px-6 lg:col-span-5 sm:auto-cols-auto row-span-4"
          child_attrs="overflow-y-scroll"
        >
          <HistoryTable
            websiteVisited={websiteVisited}
            isLoaded={loaded}
          ></HistoryTable>
        </MetricCard>
        <MetricCard
          title=""
          extra="px-6 lg:col-span-7 sm:auto-cols-auto row-span-4"
        >
          {userTweets === null || userTweets.data.length <= 0 ? (
            <div className="flex justify-center items-center h-full w-full">
              <div className="flex flex-col justify-center items-center">
                <SlSpinner style={{ fontSize: "3rem" }} />
                <p className="text-gray-900 text-lg font-semibold mt-4">
                  Loading...
                </p>
              </div>
            </div>
          ) : (
            <Charts data={userTweets === null ? [] : userTweets.data} />
          )}
        </MetricCard>
      </section>
    </div>
  );
}

export default DashboardPage;