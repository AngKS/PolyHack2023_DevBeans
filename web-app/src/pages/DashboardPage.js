import {React, useEffect} from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { SlButton } from "@shoelace-style/shoelace/dist/react";

function DashboardPage() {

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);
  return (
    <div className="flex flex-col justify-between items-center h-full min-h-screen bg-[#F1FCFE]">
      <Header />
      <SlButton variant="primary">Click me</SlButton>;
      <Footer />
    </div>
  );
}

export default DashboardPage;