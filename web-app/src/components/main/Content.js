import React from "react";
import Logo from "../../assets/logo.png";
import Landing from "../../assets/landing.png";
import Chrome from "../../assets/chrome.png";

function Content() {
  return (
    <>
      <div className="absolute left-1/2 transform -translate-x-1/2 mt-10 pointer-events-none -z-1" aria-hidden="true">
        <svg width="1360" height="578" viewBox="0 0 1360 578" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="illustration-01">
              <stop stopColor="#FFF" offset="0%" />
              <stop stopColor="#EAEAEA" offset="77.402%" />
              <stop stopColor="#DFDFDF" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="1232" cy="128" r="128" />
            <circle cx="155" cy="443" r="64" />
          </g>
        </svg>
      </div>

      <div className="pt-12">

          <div className="text-center">
            <div className='flex items-center justify-center font-extrabold text-6xl cursor-pointer flex items-center gap-1 mb-5'>
              <img src={Logo} alt='logo' className='w-16 h-16 mr-1' />
              <span>Mindful Beans</span>
            </div>
            <h1 className="text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">Serenity with every <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">click</span></h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">Combatting Social Media's Impact on Mental Health and Creating a Safer Community with the <strong>Power of AI</strong></p>
              <button className="flex items-center justify-center max-w-xs mx-auto text-white text-lg bg-blue-500 w-full py-1 rounded-lg">
                <img src={Chrome} alt='chrome' className='w-5 h-5 mr-2' />
                Download Chrome Extension
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center mt-12">
            <img src={Landing} alt="landing" className="w-1/2 h-1/2" />
          </div>

      </div>
    </>
  )
}

export default Content;