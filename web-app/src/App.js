import "./App.css";
import React from "react";
import "@shoelace-style/shoelace/dist/themes/light.css";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PricingPage from "./pages/PricingPage";
import DashboardPage from "./pages/DashboardPage";
import SuccessLoginPage from "./pages/SuccessLoginPage";

// import Header from "./layout/Header";
import Footer from "./layout/Footer";


import { useState, useEffect } from "react";
import { ApplicationContext } from "./contexts/ApplicationContext";

function App() {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [supabaseClient, setSupabaseClient] = useState(null);

    const initSupabase = () => {
        const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
        const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
        const supabase = createClient(supabaseUrl, supabaseKey);
        // console.log(supabase)
        setSupabaseClient(supabase);
    }

    useEffect(() => {
        initSupabase()
        setBasePath(
          "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.4.0/dist/"
        );

        const user_item = localStorage.getItem(
          process.env.REACT_APP_SUPABASE_AUTH_TOKEN_KEY
        );

        if (user_item) {
          let user_data = JSON.parse(user_item);
          if (user_data.user.aud === "authenticated") {
            setUser({
              image_url: user_data.user.user_metadata.avatar_url,
              name: user_data.user.user_metadata.full_name,
            });
          }
        }
    }, [])

    return (
      <Router className="min-h-screen">
        <ApplicationContext.Provider
          value={{
            user,
            setUser,
            isAuthenticated,
            setIsAuthenticated,
            supabaseClient,
          }}
        >
            <Routes>
              <Route path="/" default element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/success" element={<SuccessLoginPage />} />
            </Routes>
            <Footer />
        </ApplicationContext.Provider>
      </Router>
    );
}

export default App;
