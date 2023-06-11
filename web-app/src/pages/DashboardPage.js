import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { SlButton } from "@shoelace-style/shoelace/dist/react";

function DashboardPage() {
  return (
    <div className="flex flex-col justify-between items-center h-full min-h-screen bg-[#F1FCFE]">
      <Header />
      <SlButton variant="primary">Click me</SlButton>;
      <Footer />
    </div>
  );
}

export default DashboardPage;