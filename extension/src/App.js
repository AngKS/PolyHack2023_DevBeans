import "./index.css";
import { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import logo from "../public/icons/logo128.png";
import { FaCrown } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { RxDashboard } from "react-icons/rx";

function App() {
  const [authorized, setAuthorized] = useState(false);
  const [username, setUsername] = useState("");
  const [contentFilter, setContentFilter] = useState(false);
  const [inputPurification, setInputPurification] = useState(false);

  const signIn = () => {
    chrome.tabs.create({ url: 'https://uippnkhijtqmwnwnnypz.supabase.co/auth/v1/authorize?provider=google' });
  };

  const navigateToDashboard = () => {
    const link = "https://mindful-beans.netlify.app/dashboard";
    window.open(link, "_blank");
  };

  const signOut = () => {
    chrome.storage.local.clear();
    setAuthorized(false);
  };

  const onChangeContentFilter = (e) => {
    setContentFilter(e.target.checked);
    chrome.storage.local.set({ contentFilter: e.target.checked }, function () {
    });
  };

  const onChangeInputPurification = (e) => {
    setInputPurification(e.target.checked);
    chrome.storage.local.set({ inputPurification: e.target.checked }, function () {
    });
  };

  useEffect(() => {
    chrome.storage.local.get(null, function (result) {
      if ("sb-uippnkhijtqmwnwnnypz-auth-token" in result) {
        setAuthorized(true);
        let user_data = JSON.parse(result["sb-uippnkhijtqmwnwnnypz-auth-token"]);
        if (user_data.user.aud === "authenticated") {
          setUsername(user_data.user.user_metadata.full_name);
        }
      } else {
        setAuthorized(false);
      }

      if (result.contentFilter) {
        setContentFilter(true);
      } else {
        setContentFilter(false);
      }

      if (result.inputPurification) {
        setInputPurification(true);
      } else {
        setInputPurification(false);
      }
    });
  }, []);

  const Default_Page = (
    <>
      <div className="topNav w-11/12 mx-auto py-4 px-3 flex">
        <div className="basis-1/6 flex items-center">
          <div className="rounded-full h-10 w-10 bg-white flex items-center justify-center">
            <img src={logo} alt="Logo" />
          </div>
        </div>
        <div
          id="login"
          className="basis-4/6 text-lg flex-col items-center ml-3 cursor-default font-semibold"
        >
          <div>Mindful Beans</div>
          <div className="text-sm">Hi, {username} <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">LITE</span></div>
        </div>
        <div className="flex justify-end gap-2 basis-1/6 items-center">
          <div onClick={signOut} className="cursor-pointer hover:bg-gradient-to-l duration-200 whitespace-nowrap w-fit mx-auto p-2 rounded-xl bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold">
            Sign Out
          </div>
        </div>
      </div>
      <div className="w-11/12 mx-auto px-3 mt-">
        <div className="flex justify-between mb-2">
          <div>
            <div className="font-bold text-2xl">Content Filter</div>
            <div>
              Take Control Of Your Online Experience, Filter Out
              The Noise.
            </div>
          </div>
          <div className="flex items-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={contentFilter}
                className="sr-only peer"
                onChange={onChangeContentFilter}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-400"></div>
            </label>
          </div>
        </div>
        <div className="flex justify-between my-2">
          <div>
            <div className="font-bold text-2xl">
              Input Purification
            </div>
            <div>
              Sanitize Your Input, Refine Your Digital Voice.
            </div>
          </div>
          <div className="flex items-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={inputPurification}
                className="sr-only peer"
                onChange={onChangeInputPurification}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-400"></div>
            </label>
          </div>
        </div>
      </div>
      <div className="w-11/12 mx-auto px-3">
        <div className="font-semibold text-lg flex justify-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
          30 harmful contents
        </div>
        <div className="font-semibold text-lg flex justify-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
          has been filtered
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
            <div className="text-website-section-head font-semibold text-xs">
              TOP WEBSITE
            </div>
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
            <div className="text-website-section-head font-semibold text-xs">
              CURRENT WEBSITE
            </div>
            <div className="font-semibold">
              www.mindful-beans.com
            </div>
          </div>
          <div className="w-2/12 flex items-center justify-center font-bold">
            17:28
          </div>
        </div>
      </div>
      <div className="w-11/12 mx-auto mt-2 px-3">
        <div onClick={navigateToDashboard} className="flex justify-center items-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 font-medium cursor-pointer w-fit mx-auto">
          <RxDashboard className="text-blue-500" />&nbsp;Go to Dashboard
        </div>
        <div className="flex justify-center items-center font-medium mt-3">
          Made with<span className="text-red-500 text-lg">&nbsp;♥️&nbsp;</span>from Singapore
        </div>
      </div>
    </>
  );

  const Login_Page = (
    <>
      <div className="my-8">
        <div className="w-24 h-24 rounded-full mx-auto">
          <img src={logo} alt="Logo" />
        </div>
        <div className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 text-3xl mt-2 font-bold text-center">
          Mindful Beans
        </div>
        <div className="text-center text-xl font-bold">
          Serenity with every{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
            click
          </span>
        </div>
      </div>
      <div className="my-16">
        <div
          className="flex items-center w-4/5 mx-auto justify-center bg-gradient-to-r from-blue-500 to-teal-400 border-gradient-to-r border from-blue-500 to-teal-400 p-0.5 cursor-pointer"
          onClick={signIn}
        >
          <div className="w-full h-full bg-white flex items-center justify-center py-2 px-4 text-xl">
            <div className="flex items-center">
              <FcGoogle /> &nbsp; Sign in with Google
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-3 w-full">
        <div className="flex items-center justify-center">
          Made with{" "}
          <span className="text-red-500 text-lg">&nbsp;♥️&nbsp;</span>{" "}
          from Singapore{authorized ? "true" : "false"}
        </div>
      </div>
    </>
  );

  return (
    <div className="w-ext h-ext bg-background relative">
      {authorized ? (
        Default_Page
      ) : (
        Login_Page
      )}
    </div>
  );
}

export default App;
