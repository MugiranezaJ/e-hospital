import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PatientDashboardPage from "./pages/PatientDasboard";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-full bg-gray-200 text-gray-700">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<PatientDashboardPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
