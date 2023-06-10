import React from "react";

function Plancard({ name, description, price, features, color, btnText}) {

  return (
    <div
      style={{ backgroundColor: color }}
      className={
        "flex min-h-[428px] w-[350px] flex-col rounded-3xl p-8" +
        (name === "Premium" ? " shadow-2xl shadow-cyan-500/50" : " shadow-md")
      }
    >
      <h2
        className={
          "mb-5 text-2xl font-bold" +
          (name === "Premium"
            ? " bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400"
            : "")
        }
      >
        {name}
      </h2>
      <div className="mb-5 flex items-end text-6xl">
        {!price && name !== "Free" ? (
          "Custom"
        ) : price ? (
          <>
            <div>${price}</div>
          </>
        ) : (
          "Free"
        )}
      </div>
      <p className="mb-5">{description}</p>
      <ul className="mb-10 flex flex-col gap-y-2">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-3 h-7 w-7"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
                clipRule="evenodd"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <button
        className={
          "mt-auto rounded-xl bg-black py-3 px-6 text-lg font-medium text-white" +
          (name === "Premium"
            ? "bg-clip-text text-white bg-gradient-to-r from-blue-500 to-teal-400"
            : "")
        }
      >
        {btnText}
      </button>
    </div>
  );
}

export default Plancard;