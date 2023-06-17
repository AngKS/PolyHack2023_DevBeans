import { React, useEffect } from "react";
import Header from "../layout/Header";
import Features from "../components/features/features";
import bg from "../assets/bg-pattern.png";
import {useNavigate} from "react-router-dom";

function FeaturesPage() {
    let navigate = useNavigate();
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="h-full min-h-screen bg-[#F1FCFE] flex flex-col">
      <Header />
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
        <span className="px-3 py-2 text-6xl font-bold rounded-full bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 mb-3">
          Product Features
        </span>
      </section>
      <Features />
      <section
        style={{
          backgroundImage: bg
            ? `url(${bg})`
            : "linear-gradient(135deg, hsl(192, 100%, 67%), hsl(280, 87%, 65%))",
          // align the background image
          backgroundPosition: "center",
        }}
        className="w-full h-56 flex flex-col justify-center items-center mb-3"
      >
        <h1
          className="text-3xl font-bold text-blue-500 leading-tighter cursor-pointer tracking-tighter mb-4 after:content-['_↗']"
          onClick={() => navigate("/pricing")}
        >
          View Pricing
        </h1>
      </section>
    </div>
  );
}

export default FeaturesPage;
