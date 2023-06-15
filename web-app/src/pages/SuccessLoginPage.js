import {React, useEffect} from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

function SuccessLoginPage() {

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);
  return (
    <div className="flex flex-col justify-between items-center h-full min-h-screen bg-[#F1FCFE]">
      <Header />

      <section className="text-center">
        <h1>You've successfully logged in.</h1>
      </section>
    </div>
  );
}

export default SuccessLoginPage;