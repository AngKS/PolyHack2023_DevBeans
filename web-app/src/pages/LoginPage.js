import React from "react";
import { useContext } from "react";
import { ApplicationContext } from "../contexts/ApplicationContext";


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
    <div>
      <h1>Login Page</h1>
      <p>welcome back:{user}</p>
      <div className="max-w-sm">
        {/* create a login button */}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleLogin}
        >
          Login with Google
        </button>

      </div>
    </div>
  );
}

export default LoginPage;