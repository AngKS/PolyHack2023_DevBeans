import React from "react";
import Header from "../layout/Header";
import Pricing from "../components/pricing/Pricing";
import Footer from "../layout/Footer";
import Chrome from "../assets/chrome.png";
import bg from "../assets/bg-pattern.png";

function PricingPage() {
  return (
    <div className="h-full min-h-screen bg-[#F1FCFE]">
      <Header />
      <div className="flex flex-col items-center ">
        <div className="mb-2 mt-8 text-center">
          <h1 className="mb-4 text-6xl">Pricing</h1>
          <p className="text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          </p>
        </div>
        <div className="min-h-screen flex flex-col gap-24 justify-around">
          <Pricing />
          <section
            style={{
              backgroundImage: bg
                ? `url(${bg})`
                : "linear-gradient(135deg, hsl(192, 100%, 67%), hsl(280, 87%, 65%))",
              // align the background image
              backgroundPosition: "center",

            }}
            className="w-full h-96 flex flex-col justify-center items-center mb-3"
          >
            <h1 className="text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">Serenity with every <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">click.</span></h1>

            <button className="flex items-center justify-center max-w-xs mx-auto text-white text-lg bg-blue-500 w-fit px-3 py-2 rounded-lg">
              <img src={Chrome} alt="chrome" className="w-5 h-5 mr-2" />
              Download Now
            </button>
          </section>
          <></>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PricingPage;