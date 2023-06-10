import React from "react";
import PlanCard from "./PlanCard";

function Pricing() {

  return (
    <div className="flex flex-row gap-8 p-10">
      <PlanCard 
        // color="#78E3FC"
        color="#FFFFFF" 
        name="Free" 
        description="Get started with the basic plan" 
        features={
          ['Basic Tracking/AI',
           'Basic Analytics', 
           'Limited Websites Most Visited', 
           'Limited Topics Most Viewed', 
           'Limited Content Summary', 
           'Basic Sentiment Analysis', 
           'Basic Text Suggestions'
          ]
        }
        btnText="Start Free Plan"
      />
      <PlanCard 
        // color="#FCD638"
        color="#FFFFFF"
        name="Basic" 
        description="Improved features from the free plan" 
        price="2.99"
        features={
          ['Basic Tracking/AI',
           'Basic Analytics',
           'Unlimited Websites Most Visited', 
           'Unlimited Topics Most Viewed', 
           'Limited Content Summary', 
           'Basic Sentiment Analysis', 
           'Basic Text Suggestions'
          ]
        }
        btnText="Start Basic Plan"
      />
      <PlanCard 
        // color="#FFB5BA"
        color="#FFFFFF" 
        name="Premium" 
        description="Advanced features for premium users"
        price="5.99"
        features={
          ['Faster Advanced Tracking/AI',
           'Premium Analytics',
           'Unlimited Dashboard Features', 
           'Advanced Sentiment Analysis', 
           'Advanced Text Suggestions'
          ]
        }
        btnText="Start Premium Trial"
      />
      <PlanCard 
        // color="#F1FCFE"
        color="#FFFFFF"
        name="Corporate" 
        description="Email us for pricing and custom features" 
        features={
          ['Custom Tracking/AI',
           'Premium Analytics',
           'Unlimited Dashboard Features', 
           'Custom Sentiment Analysis', 
           'Custom Text Suggestions'
          ]
        }
        btnText="Contact Us"
      />
    </div>
  )
}

export default Pricing;