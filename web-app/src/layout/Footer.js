import React from "react";
import Logo from "../assets/logo.png";
import {Link} from "react-router-dom";

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
    <div className="h-full w-full bg-white flex flex-col justify-start items-center pt-8 ">
      <div className="grid grid-cols-10 mt-2 place-content-center gap-1 w-full">
        <div className=""></div>
        <div className=""></div>
        <div className="col-span-2 flex flex-col gap-1 justify-start items-start mr-3">
          <div className="flex justify-start gap-2 items-center">
            <img src={Logo} alt="logo" className="w-10 h-10 mr-1" />
            <span className="font-extrabold text-2xl">Mindful Beans</span>
          </div>
          <p className="text-gray-500 mt-2 font-medium text-lg">
            Serenity with every click.
          </p>
        </div>
        {Object.keys(data).map((key) => (
          <div className="flex flex-col justify-start" key={key}>
            <h1 className="font-medium text-md capitalize text-gray-500">
              {key}
            </h1>
            {data[key].map((item) => (
              <Link
                to={Object.values(item)}
                className="text-gray-500 text-md text-black font-medium hover:text-blue-400 duration-500 my-1"
              >
                {Object.keys(item)}
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className="w-full h-fit mx-auto flex justify-center items-center border-t border-gray-300">
        <div className="font-medium text-sm h-fit my-2">
          Made with <span className="text-red-500 text-lg">♥️</span> from{" "}
          <a
            href="https://github.com/AngKS/PolyHack2023_DevBeans"
            target="_blank"
            rel="noopener noreferrer"
            className="appearance-none underline font-bold"
          >
            Singapore
          </a>
        </div>
        
      </div>
    </div>
  );
}

export default Footer;