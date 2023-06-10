import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Content from "../components/main/Content";

function HomePage() {
  return (
    <div className="h-full min-h-screen bg-[#F1FCFE]">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default HomePage;