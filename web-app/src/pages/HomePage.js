import {React, useEffect} from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Content from "../components/main/Content";

function HomePage() {

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);
  return (
    <div className="h-full min-h-screen bg-[#F1FCFE]">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default HomePage;