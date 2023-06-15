import React, { useState } from "react";

const SmartWidget = ({type}) => {

  const mindful_quotes = [
    // create a list of mindful quotes with less than 150 characters each
    {
      quote: "Pause, breathe, and be present. Mindfulness nurtures wellness.",
      author: "Jon Kabat-Zinn",
    },
    {
      quote:
        "Let go, embrace now, create a brighter future. Mindfulness empowers.",
      author: "James Baraz",
    },
    {
      quote: "Unplug, find stillness, discover the beauty of the present.",
      author: "Sylvia Boorstein",
    },
    {
      quote: "Self-care starts with self-awareness. Nurture yourself with mindfulness.",
      author: "Jon Kabat-Zinn",
    },
  ];

  const generateRandomQuote = () => {
    return mindful_quotes[Math.floor(Math.random() * mindful_quotes.length)];
  }

  const [quote, setQuote] = useState(generateRandomQuote())

  return (
    <div className="w-full h-full py-4 flex flex-col text-slate-700">
        <p className="text-sm">
          {quote.quote}
        </p>
        <p className="text-right mt-2 italic font-medium">
          - {quote.author}
        </p>
    </div>
  );
};
export default SmartWidget;
