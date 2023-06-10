import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

// import clientID from .env

const { REACT_APP_GOOGLE_AUTH_CLIENT_ID } = process.env;

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
        <GoogleOAuthProvider clientId={REACT_APP_GOOGLE_AUTH_CLIENT_ID}>
          <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
}

export default LoginPage;