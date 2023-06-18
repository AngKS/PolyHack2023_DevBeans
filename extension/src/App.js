import "./index.css";
import { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import logo from "../public/icons/logo128.png";
import { FaCrown } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { RxDashboard } from "react-icons/rx";

const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpcHBua2hpanRxbXdud25ueXB6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NjM4ODMyNiwiZXhwIjoyMDAxOTY0MzI2fQ.6zRD9gLScuHIPy7k2R0F6z1jdY9wJcRN6esn0oF4DLk";

function App() {
  const [authorized, setAuthorized] = useState(false);
  const [username, setUsername] = useState("");
  const [contentFilter, setContentFilter] = useState(false);
  const [inputPurification, setInputPurification] = useState(false);
  const [currentWebsite, setCurrentWebsite] = useState("");
  const [currentTimeSpent, setCurrentTimeSpent] = useState("");
  const [topWebsite, setTopWebsite] = useState("");
  const [topTimeSpent, setTopTimeSpent] = useState("");
  const [filteredContentCount, setFilteredContentCount] = useState(0);

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

  function formatTime(milliseconds) {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);

    const totalMinutes = minutes + Math.floor(seconds / 60);
    const formattedMinutes = String(totalMinutes).padStart(2, '0');
    const formattedSeconds = String(seconds % 60).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  }


  useEffect(() => {
    chrome.storage.local.get(null, function (result) {
      if ("sb-uippnkhijtqmwnwnnypz-auth-token" in result) {
        const userInfo = JSON.parse(result["sb-uippnkhijtqmwnwnnypz-auth-token"]);
        // Get top website
        const apiUrl = `https://uippnkhijtqmwnwnnypz.supabase.co/rest/v1/Browsing Activities Table?user_id=eq.${userInfo.user.id}&select=*`;
        fetch(apiUrl, {
          headers: {
            'apikey': apiKey,
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal',
          },
        })
          .then(response => response.json())
          .then(data => {
            const groupedData = data.reduce((result, item) => {
              const { website_url, time_spent } = item;
              if (!result[website_url]) {
                result[website_url] = { website_url, time_spent: 0 };
              }
              result[website_url].time_spent += time_spent;
              return result;
            }, {});

            const groupedArray = Object.values(groupedData);
            const highestTimeSpentData = groupedArray.reduce((maxItem, currentItem) => {
              if (currentItem.time_spent > maxItem.time_spent) {
                return currentItem;
              }
              return maxItem;
            }, { time_spent: 0 });
            setTopTimeSpent(formatTime(highestTimeSpentData.time_spent));
            setTopWebsite(highestTimeSpentData.website_url);
          })
          .catch(error => {
            console.error(error);
          });
        // Get filteredContentCount
        const now = new Date();
        const currentDate = now.toISOString().split('T')[0];
        const apiUrl2 = `https://uippnkhijtqmwnwnnypz.supabase.co/rest/v1/Tweets Table?user_id=eq.${userInfo.user.id}&select=*`;
        fetch(apiUrl2, {
          headers: {
            'apikey': apiKey,
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal',
          },
        })
          .then(response => response.json())
          .then(data => {
            let count = data.filter(item => item.tweet_sentiment.labels.length > 0 && item.created_at.split('T')[0] == currentDate).length;
            setFilteredContentCount(count);
          })
          .catch(error => {
            console.error(error);
          });
        // Check if logged in
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

      if ("currentTimeSpent" in result) {
        let time = formatTime(result.currentTimeSpent);
        setCurrentTimeSpent(time);
      }

      if ("currentTabUrl" in result) {
        setCurrentWebsite(result.currentTabUrl);
      };
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
          <div className="text-sm ">Hi, {username}</div>
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
            <div className="font-bold text-xl">Content Filter</div>
            <div className="text-slate-500">
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
            <div className="font-bold text-xl">
              Input Purification
            </div>
            <div className="text-slate-500">
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
          {filteredContentCount} harmful contents filtered today
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
            <div className="font-semibold">{topWebsite}</div>
          </div>
          <div className="w-2/12 flex items-center justify-center font-bold">
            {topTimeSpent}
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
              {currentWebsite}
            </div>
          </div>
          <div className="w-2/12 flex items-center justify-center font-bold">
            {currentTimeSpent}
          </div>
        </div>
      </div>
      <div className="w-11/12 mx-auto mt-2">
        <div onClick={navigateToDashboard} className="flex justify-center items-center text-white px-3 w-full rounded-xl py-2 bg-gradient-to-r from-blue-500 to-teal-400 font-medium cursor-pointer mx-auto">
          <RxDashboard className="text-white" />&nbsp;Go to Dashboard
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
