import React, { useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ApplicationContext } from "../contexts/ApplicationContext";
import Logo from '../assets/logo.png';
import { createClient } from "@supabase/supabase-js";


import {
  SlDivider,
  SlDropdown,
  SlIcon,
  SlMenu,
  SlMenuItem,
  SlAvatar,
} from "@shoelace-style/shoelace/dist/react";

function Header() {
  const { supabaseClient, setSupabaseClient } = useContext(ApplicationContext);

  const navigate = useNavigate();
  const Links = [
    { name: "Features", link: "/" },
    { name: "Pricing", link: "/pricing" },
  ];

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      console.log(error);
    } else {
      localStorage.removeItem(process.env.REACT_APP_SUPABASE_AUTH_TOKEN_KEY);
      window.location.reload();
    }
  };

  const user_item = localStorage.getItem(
    process.env.REACT_APP_SUPABASE_AUTH_TOKEN_KEY
  );

  let user = null;

  if (user_item) {
    let user_data = JSON.parse(user_item);
    if (user_data.user.aud === "authenticated") {
      user = {
        image_url: user_data.user.user_metadata.avatar_url,
        name: user_data.user.user_metadata.full_name,
      };
    }
  }

  return (
    <nav className="flex items-center justify-between relative container mx-auto p-6">
      <div className="flex items-center">
        <div
          className="font-bold text-2xl cursor-pointer flex items-center gap-1"
          onClick={() => navigate("/")}
        >
          <img src={Logo} alt="logo" className="w-10 h-10 mr-1" />
          <span>Mindful Beans</span>
        </div>
        <div className="space-x-6 flex ml-10 mt-1">
          {Links.map((link) => (
            <div className="my-0 font-semibold text-xl" key={link.name}>
              <Link
                to={link.link}
                className="text-gray-800 hover:text-blue-400 duration-500"
              >
                {link.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
      {user !== null ? (
        <div className="flex items-center cursor-pointer">
          <SlDropdown
            placement="bottom-end"
            className="w-full"
            onHover={() => {
              let input = document.querySelector("sl-dropdown");
              input.show();
            }}
          >
            <SlAvatar
              image={user.image_url}
              label="avatar"
              slot="trigger"
            ></SlAvatar>

            <SlMenu className="font-medium text-lg">
              <SlMenuItem onClick={() => navigate("/dashboard")}>
                Dashboard
                <SlIcon slot="prefix" name="activity" />
              </SlMenuItem>
              <SlMenuItem>
                Settings
                <SlIcon slot="prefix" name="gear-wide-connected" />
              </SlMenuItem>
              <SlDivider />
              <SlMenuItem
                onClick={() => {
                  handleLogout();
                }}
              >
                Log Out
                <SlIcon slot="prefix" name="box-arrow-in-left" />
              </SlMenuItem>
            </SlMenu>
          </SlDropdown>

        </div>
      ) : (
        <Link
          className="py-2 px-6 text-white text-md bg-black rounded-full baseline hover:bg-gray-600 md:block"
          to="/login"
        >
          Login
        </Link>
      )}
    </nav>
  );
};

export default Header;