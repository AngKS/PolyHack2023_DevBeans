import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PricingPage from "./pages/PricingPage";
import DashboardPage from "./pages/DashboardPage";

import { useState, useEffect } from "react";
import { ApplicationContext } from "./contexts/ApplicationContext";

function App() {
    const [user, setUser] = useState('abc12345');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [supabaseClient, setSupabaseClient] = useState(null);

    const initSupabase = () => {
        const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
        const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
        const supabase = createClient(supabaseUrl, supabaseKey);
        console.log(supabase)
        setSupabaseClient(supabase);
    }

    useEffect(() => {
        initSupabase()
    }, [])

    return (
        <Router>
            <ApplicationContext.Provider
                value={{ user, setUser, isAuthenticated, setIsAuthenticated, supabaseClient }}
            >
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                </Routes>
            </ApplicationContext.Provider>
        </Router>
    );
}

export default App;
