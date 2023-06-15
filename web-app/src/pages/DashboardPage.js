import {React, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";

import Header from "../layout/Header";
import Footer from "../layout/Footer";
import MetricCard from "../components/dashboard/MetricCard";
import PieChart from "../components/dashboard/PieChart";
import LineChart from "../components/dashboard/LineChart";
import Widgets from "../components/dashboard/Widgets";

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

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});


  }, []);
  return (
    <div className="flex flex-col justify-start items-center h-full min-h-screen bg-[#F1FCFE]">
      <Header dashboard={true} />
      <section className="container flex-grow w-full h-full grid grid-cols-12 grid-rows-5 gap-2 pb-8">
        {/* top level insights/metrics */}
        <MetricCard title="Smart Analytics" extra="px-6 col-span-3 row-span-1">
          
          <Widgets></Widgets>
        </MetricCard>
        <MetricCard title="% Censored Data" extra="px-6 col-span-3 row-span-1">
          
        </MetricCard>

        <MetricCard
          title="Topics most Viewed"
          extra="px-6 col-span-3 row-span-1"
        >
          
        </MetricCard>
        <MetricCard title="Kind'O Matic" extra="px-6 col-span-3 row-span-1">
          <span>Shows amount of emphathetic/positive recommendations used</span>
        </MetricCard>
        {/* second tier metrics */}
        <MetricCard
          title="Recent Site History"
          extra="px-6 col-span-4 row-span-4"
        >
          <section className="overflow-y-scroll flex flex-col ">
            <h1>Something</h1>
            <h1>Something</h1>
            <h1>Something</h1>
            <h1>Something</h1>
            <h1>Something</h1>
            <h1>Something</h1>
            <h1>Something</h1>
            <h1>Something</h1>
            <h1>Something</h1>
            <h1>Something</h1>
            <h1>Something</h1>
            <h1>Something</h1>
            <h1>Something</h1>
            <h1>Something</h1>
            <h1>Something</h1>
            <h1>Something</h1>
            <h1>Something</h1>
            <h1>Something</h1>
          </section>
        </MetricCard>
        <MetricCard
          title="Amount of harmful contents censored"
          extra="px-6 col-span-8 row-span-4"
        >
          <span className="font-semibold">This is a Graph Metric card!</span>
          <LineChart />
        </MetricCard>
      </section>
    </div>
  );
}

export default DashboardPage;