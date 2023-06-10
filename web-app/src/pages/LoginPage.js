import React, { useState } from "react";
import { useContext } from "react";
import { ApplicationContext } from "../contexts/ApplicationContext";

import Header from "../layout/Header";
import Footer from "../layout/Footer";

import Google from '../assets/google.png'
import Logo from '../assets/logo.png'
import Video from '../assets/login.mp4'


function LoginPage() {

  const { supabaseClient } = useContext(ApplicationContext)

  const handleLogin = async (event) => {

    supabaseClient.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: process.env.REACT_APP_PUBLIC_URL+"/pricing",
      },
    }).then(async(data) => {
      
    })
    .catch((error) => {
      console.log(error)
    })

  }


  return (
    <div className="flex flex-col justify-between items-center h-full min-h-screen bg-[#F1FCFE]">
      <Header />
      <section className="min-h-screen h-full w-full flex items-center justify-center">
        <div className="flex min-h-[428px] w-1/2 flex-col justify-center align-center outline outline-1 outline-gray-300 rounded-2xl bg-white mx-auto px-10 py-8">
          <span className="text-3xl font-bold text-center">Welcome Back</span>
          <div className="flex items-center justify-center">
            <div>
              <video src={Video} autoPlay loop muted className="w-96 h-96" />
            </div>
            <div className="flex flex-col items-center justify-between gap-5">
              <div className="font-bold text-4xl cursor-pointer flex items-center gap-1 pb-2">
                <img src={Logo} alt="logo" className="w-12 h-12 mr-1" />
                <span>Mindful Beans</span>
              </div>

              <div className="flex-grow-1"></div>

              <button
                className="flex items-center justify-center max-w-xs mx-auto font-bold text-md w-full py-2 rounded-xl outline-1 outline outline-gray-200 bg-white"
                onClick={handleLogin}
              >
                <img src={Google} alt="google" className="w-4 h-4 mr-2" />
                Sign in with Google
              </button>

              <p className="text-slate-300 text-sm text-center w-3/4">
                If you do not have an account, it will automatically be created
                once you sign in.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default LoginPage;