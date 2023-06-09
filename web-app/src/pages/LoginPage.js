import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

function LoginPage() {
  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
      console.log(error);
  };

  return (
    <div>
      <h1>Login Page</h1>
      <div className="max-w-sm">
        <GoogleOAuthProvider clientId="">
          <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
}

export default LoginPage;