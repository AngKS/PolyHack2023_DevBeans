import React from "react";
import Header from "../layout/Header";
import Pricing from "../components/pricing/Pricing";

function PricingPage() {
  return (
    <div className="min-h-screen h-full bg-[#F1FCFE]">
      <Header />
      <div className="flex flex-col items-center">
        <div className="mb-2 mt-12 text-center">
          <h1 className="mb-4 text-6xl">Pricing</h1>
          <p className="text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          </p>
        </div>

        <Pricing />

      </div>
    </div>
  );
}

export default PricingPage;