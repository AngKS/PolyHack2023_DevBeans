import {React, } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useContext } from "react";
import { ApplicationContext } from "../contexts/ApplicationContext";
import Logo from '../assets/logo.png';

function Header({userInfo}) {

  const { supabaseClient } = useContext(ApplicationContext);

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
      // refresh the page
      window.location.reload();
    }
  };



  return (
    <nav className='flex items-center justify-between relative container mx-auto p-6'>
      <div className='flex items-center'>
        <div className='font-bold text-2xl cursor-pointer flex items-center gap-1' onClick={() => navigate('/')}>
          <img src={Logo} alt='logo' className='w-10 h-10 mr-1' />
          <span>Mindful Beans</span>
        </div>
        <div className='space-x-6 flex ml-10 mt-1'>
          {
            Links.map((link) => (
              <div className='my-0 font-semibold text-xl' key={link.name}>
                <Link to={link.link} className='text-gray-800 hover:text-blue-400 duration-500'>{link.name}</Link>
              </div>
            ))
          }
        </div>
      </div>
      {
        userInfo ? (
          <div className='flex items-center'>
            <div className='flex items-center gap-2'>
              <img src={userInfo.image_url} alt='avatar' className='w-10 h-10 rounded-full' />
              <span className='text-gray-800 font-semibold cursor-pointer' onClick={() => {handleLogout()}}>{userInfo.name}</span>
            </div>

            <div className='ml-4'>

              <button className='bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-full'>
                <Link to='/dashboard'>Dashboard</Link>

              </button>

            </div>
          </div>
        ) : (
          <Link className='py-3 px-6 text-white text-md bg-black rounded-full baseline hover:bg-gray-600 md:block' to="/login">
        Log in
      </Link>
        )
      }
    </nav>
  );
};

export default Header;