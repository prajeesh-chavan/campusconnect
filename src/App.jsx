// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import EventsFeed from "./components/EventsFeed";
import ChatBot from "./components/ChatBot";
import AcademicInsights from "./components/AcademicInsights";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Dashboard />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Login />} />
        <Route path="/events" element={user ? <EventsFeed /> : <Login />} />
        <Route path="/chat" element={user ? <ChatBot /> : <Login />} />
        <Route
          path="/insights"
          element={user ? <AcademicInsights /> : <Login />}
        />
        <Route path="/" element={user ? <Dashboard /> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;
