import React from "react";
import Logo from "../assets/logo.png";

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
    <div className="h-full w-screen bg-white flex justify-center py-8 ">
      <div className="grid grid-cols-10 mt-2 place-content-center gap-1 w-full">
        <div className=""></div>
        <div className=""></div>
        <div className="col-span-2 flex flex-col justify-start items-center mr-3">
          <div className="flex justify-start gap-2 items-center">
            <img src={Logo} alt="logo" className="w-10 h-10 mr-1" />
            <span className="font-extrabold text-2xl">Mindful Beans</span>
          </div>
          <p class="text-gray-500 mt-2 font-medium text-md">Serenity with every click.</p>
        </div>
        {
            Object.keys(data).map((key) => (
                <div className="flex flex-col justify-start" key={key}>
                    <h1 className="font-medium text-md capitalize text-gray-500">{key}</h1>
                    {
                        
                        data[key].map((item) => (
                            <a href={Object.values(item)} className="text-gray-500 text-md text-black font-medium hover:text-blue-400 duration-500 my-1">{Object.keys(item)}</a>
                        ))

                    }
                </div>
            ))
        }
      </div>
    </div>
  );
}

export default Footer;