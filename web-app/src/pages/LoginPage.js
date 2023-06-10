import React from "react";
import { useContext } from "react";
import { ApplicationContext } from "../contexts/ApplicationContext";
import Google from '../assets/google.png'


function LoginPage() {

  const { user, supabaseClient } = useContext(ApplicationContext)

  const handleLogin = async (event) => {

    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://localhost:3000/dashboard",
      },
    });
    console.log(data)
    console.log(error)
  }


  return (
    <div className="h-full min-h-screen bg-[#F1FCFE]">
      <h1>Login Page</h1>
      <p>welcome back:{user}</p>
      <div className="max-w-sm">
        <button 
          className="flex items-center justify-center max-w-xs mx-auto font-bold text-md w-full py-1 rounded-xl outline-1 outline outline-gray-200 bg-white"
          onClick={handleLogin}
        >
          <img src={Google} alt='google' className='w-4 h-4 mr-2' />
          Login with Google
        </button>
      </div>
    </div>
  );
}

export default LoginPage;