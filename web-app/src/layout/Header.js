import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';

function Header() {
  const navigate = useNavigate();
  const Links = [
    { name: "Features", link: "/" },
    { name: "Pricing", link: "/pricing" },
  ];

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
                <a href={link.link} className='text-gray-800 hover:text-blue-400 duration-500'>{link.name}</a>
              </div>
            ))
          }
        </div>
      </div>
      <button className='py-3 px-6 text-white text-md bg-black rounded-full baseline hover:bg-gray-600 md:block' onClick={() => navigate('/login')}>
        Log in
      </button>
    </nav>
  );
};

export default Header;