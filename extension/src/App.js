import './index.css';
import { useEffect, useState } from 'react';
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineCloseCircle, AiOutlineHome } from "react-icons/ai";
import logo from "../public/icons/logo128.png";
import { FaCrown } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

function App() {

  const [page, setPage] = useState("Login");

  return (
    <div className="w-ext h-ext bg-background relative">
      {page == "Default" ?
        <>
          <div className="topNav w-11/12 mx-auto py-4 px-3 flex">
            <div className="basis-1/6">
              <div className="rounded-full h-10 w-10 bg-white flex items-center justify-center">
                <img src={logo} alt="Logo" />
              </div>
            </div>
            <div id="login" className="basis-4/6 text-lg flex items-center ml-3 cursor-default font-semibold">
              Mindful Beans
            </div>
            <div className="flex gap-2 basis-1/6 items-center">
              <IoSettingsOutline className="text-xl cursor-pointer hover:text-gray-400 duration-200" onClick={() => setPage("Settings")} />
              <AiOutlineCloseCircle className="text-xl cursor-pointer hover:text-gray-400 duration-200" onClick={() => setPage("Login")} />
            </div>
          </div>
          <div className="w-11/12 mx-auto px-3">
            <div className="font-semibold text-lg flex justify-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
              3 harmful contents has been filtered
            </div>
          </div>
          <div className="w-11/12 mx-auto mt-2">
            <div className="bg-website-section rounded-md flex w-full py-1">
              <div className="w-2/12 flex items-center justify-center">
                <div className="w-1/2 h-2/3 rounded-md bg-white flex items-center justify-center">
                  <img src={logo} alt="logo" />
                </div>
              </div>
              <div className="w-8/12">
                <div className="text-website-section-head font-semibold text-xs">TOP WEBSITE</div>
                <div className="font-semibold">www.twitter.com</div>
              </div>
              <div className="w-2/12 flex items-center justify-center font-bold">
                58:43
              </div>
            </div>
          </div>
          <div className="w-11/12 mx-auto mt-3">
            <div className="bg-website-section rounded-md flex w-full py-1">
              <div className="w-2/12 flex items-center justify-center">
                <div className="w-1/2 h-2/3 rounded-md bg-white flex items-center justify-center">
                  <img src={logo} alt="logo" />
                </div>
              </div>
              <div className="w-8/12">
                <div className="text-website-section-head font-semibold text-xs">CURRENT WEBSITE</div>
                <div className="font-semibold">www.mindful-beans.com</div>
              </div>
              <div className="w-2/12 flex items-center justify-center font-bold">
                17:28
              </div>
            </div>
          </div>
          <div className="w-11/12 mx-auto mt-2 px-3">
            <div className="text-[15px] font-semibold mb-2">
              Topic Breakdown
            </div>
            <div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                <div className="font-bold">Technology</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="w-[70%] bg-progress-bar rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full w-[38%]"></div>
                </div>
                <div className="text-website-section-head font-bold">
                  2 hr 50 min
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                <div className="font-bold">Sports</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="w-[70%] bg-progress-bar rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full w-[25%]"></div>
                </div>
                <div className="text-website-section-head font-bold">
                  1 hr 52 min
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                <div className="font-bold">Pornography</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="w-[70%] bg-progress-bar rounded-full h-2">
                  <div className="bg-red-600 h-2 rounded-full w-[17%]"></div>
                </div>
                <div className="text-red-600 font-bold">
                  1 hr 16 min
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                <div className="font-bold">Education</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="w-[70%] bg-progress-bar rounded-full h-2">
                  <div className="bg-yellow-400 h-2 rounded-full w-[12%]"></div>
                </div>
                <div className="text-website-section-head font-bold">
                  53 min
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                <div className="font-bold">Negativity</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="w-[70%] bg-progress-bar rounded-full h-2">
                  <div className="bg-red-600 h-2 rounded-full w-[8%]"></div>
                </div>
                <div className="text-red-600 font-bold">
                  35 min
                </div>
              </div>
            </div>
          </div>
        </>
        : page == "Settings" ?
          <>
            <div className="topNav w-11/12 mx-auto py-4 px-3 flex">
              <div className="basis-1/6">
                <div className="rounded-full h-10 w-10 bg-white flex items-center justify-center">
                  <img src={logo} alt="Logo" />
                </div>
              </div>
              <div className="basis-4/6 text-lg flex items-center ml-3 cursor-default font-semibold">
                Mindful Beans
              </div>
              <div className="flex gap-2 basis-1/6 items-center">
                <AiOutlineHome className="text-xl cursor-pointer hover:text-gray-400 duration-200" onClick={() => setPage("Default")} />
                <AiOutlineCloseCircle className="text-xl cursor-pointer hover:text-gray-400 duration-200" onClick={() => setPage("Login")} />
              </div>
            </div>
            <div className="w-11/12 mx-auto px-3 mt-2">
              <div className="flex h-fit">
                <div className="w-1/3"></div>
                <div className="w-1/3 text-center font-bold flex items-center">
                  <div className="">
                    <div className="text-[15px]">Choon Wei</div>
                    <div className="text-[15px] bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">LITE</div>
                  </div>
                </div>
                <div className="w-1/3 flex justify-end">
                  <div className="w-fit h-full text-white p-2 bg-gradient-to-r from-blue-500 to-teal-400 rounded-xl cursor-pointer">
                    <div className="flex justify-center text-xl text-amber-400"><FaCrown /></div>
                    <div className="font-semibold">Upgrade</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-11/12 mx-auto px-3 mt-6">
              <div className="flex justify-between mb-2">
                <div>
                  <div className="font-bold text-2xl">
                    Content Filter
                  </div>
                  <div>
                    Take Control Of Your Online Experience, Filter Out The Noise.
                  </div>
                </div>
                <div className="flex items-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-400"></div>
                  </label>
                </div>
              </div>
              <div className="flex justify-between my-2">
                <div>
                  <div className="font-bold text-2xl">
                    Input Purification
                  </div>
                  <div>Sanitize Your Input, Refine Your Digital Voice.</div>
                </div>
                <div className="flex items-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-400"></div>
                  </label>
                </div>
              </div>
            </div>
          </>
          :
          <>
            <div className="my-8">
              <div className="w-24 h-24 rounded-full mx-auto">
                <img src={logo} alt="Logo" />
              </div>
              <div className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 text-3xl mt-2 font-bold text-center">Mindful Beans</div>
              <div className="text-center text-xl font-bold">Serenity with every <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">click</span></div>
            </div>
            <div className="my-16">
              <div className="flex items-center w-4/5 mx-auto justify-center bg-gradient-to-r from-blue-500 to-teal-400 border-gradient-to-r border from-blue-500 to-teal-400 p-0.5 cursor-pointer" onClick={() => setPage("Default")}>
                <div className="w-full h-full bg-white flex items-center justify-center py-2 px-4 text-xl">
                  <div className="flex items-center"><FcGoogle /> &nbsp;
                    Sign in with Google</div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-3 w-full">
              <div className="flex items-center justify-center">
                Made with <span className="text-red-500 text-lg">&nbsp;♥️&nbsp;</span> from Singapore
              </div>
            </div>
          </>
      }
    </div>
  );
}

export default App;
