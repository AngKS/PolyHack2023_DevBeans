import React from "react";
import Logo from "../assets/logo.png";
import Chrome from "../assets/chrome.png";

function Footer() {

    let data = {
        product: [
            {"Overview": "/"},
            {"Downloads": "/"},
            {"Features": "/"},
            {"Pricing": "/pricing"},
        ] ,
        company: [
            {"About Us": "/"},
            {"Careers": "/"},
            {"Press": "/"},
            {"Media kit": "/"},
            {"Contact": "/"}
        ],
        resources: [
            {"Blog": "/"},
            {"Newsletter": "/"},
            {"Events": "/"},
            {"Help center": "/"},
            {"Support": "/"}
        ],
        legal: [
            {"Terms": "/"},
            {"Privacy": "/"},
            {"Cookies": "/"},
            {"Settings": "/"}
        ]
    }

  return (
    <div className="h-full w-full bg-white flex justify-center py-8 ">
      <div className="grid grid-cols-10 mt-2 place-content-center gap-1 w-full">
        <div className=""></div>
        <div className=""></div>
        <div className="col-span-2 flex flex-col gap-1 justify-start items-start mr-3">
          <div className="flex justify-start gap-2 items-center">
            <img src={Logo} alt="logo" className="w-10 h-10 mr-1" />
            <span className="font-extrabold text-2xl">Mindful Beans</span>
          </div>
          <p class="text-gray-500 mt-2 font-medium text-lg">
            Serenity with every click.
          </p>
          <button className="flex items-center justify-center max-w-xs text-white text-md bg-blue-500 w-fit px-2 py-1 mt-3 rounded-lg">
            <img src={Chrome} alt="chrome" className="w-5 h-5 mr-2" />
            Download Now
          </button>
        </div>
        {Object.keys(data).map((key) => (
          <div className="flex flex-col justify-start" key={key}>
            <h1 className="font-medium text-md capitalize text-gray-500">
              {key}
            </h1>
            {data[key].map((item) => (
              <a
                href={Object.values(item)}
                className="text-gray-500 text-md text-black font-medium hover:text-blue-400 duration-500 my-1"
              >
                {Object.keys(item)}
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Footer;