import {React, useEffect} from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import MetricCard from "../components/dashboard/MetricCard";
import PieChart from "../components/dashboard/PieChart";

function DashboardPage() {

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);
  return (
    <div className="flex flex-col justify-between items-center h-full min-h-screen bg-[#F1FCFE]">
      <Header />
      <MetricCard title="Testing" extra="px-6">
        <div className="w-full">
          <PieChart />
        </div>
      </MetricCard>
      <Footer />
    </div>
  );
}

export default DashboardPage;