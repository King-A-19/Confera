// App.jsx

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Planner from "./components/Planner";
import MyEvents from "./pages/MyEvents";
import EventDetails from "./pages/EventDetails";
import ProtectedRoute from "./components/ProtectedRoute";

function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Planner />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
          <Route path="/planner" element={<Planner />} />
            <Route path="/my-events" element={<MyEvents />} />
            <Route path="/my-events/:id" element={<EventDetails />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
