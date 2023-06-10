import React from "react";
import Header from "../layout/Header";
import Content from "../components/main/Content";

function HomePage() {
  return (
    <div className="h-screen bg-[#F1FCFE]">
        <Header />
        <Content />
    </div>
  );
}

export default HomePage;