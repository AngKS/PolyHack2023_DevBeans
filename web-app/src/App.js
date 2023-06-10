import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

import { useContext, useState } from "react";
import { ApplicationContext } from "./contexts/ApplicationContext";

function App() {
    const [user, setUser] = useState('abc12345');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <Router>
            <ApplicationContext.Provider
                value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
            >
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                </Routes>
            </ApplicationContext.Provider>
        </Router>
    );
}

export default App;
