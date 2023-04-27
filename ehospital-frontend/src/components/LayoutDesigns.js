import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("euser");

    dispatch(authActions.setLoginResponse({})) && navigate("/");
  };
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white border-b-2 border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800">Patient Dashboard</h1>
      <button
        onClick={handleLogout}
        className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Logout
      </button>
    </header>
  );
}

function Footer() {
  return (
    <footer className="flex items-center justify-center px-6 py-3 bg-white border-t-2 border-gray-200">
      <p className="text-sm font-medium text-gray-500">© 2023 Medical Unit</p>
    </footer>
  );
}

function SideBar() {
  return (
    <div className="fixed h-[calc(100%-110px)] bg-white text-black w-40 rounded-md flex flex-col items-center py-4 z-10">
      <div className=" h-32 w-32 flex flex-col justify-center items-center">
        <div className="bg-slate-200 w-12 h-12 rounded-lg"></div>
        <h1 className="font-thin xtext-2xl mb-6">Dashboard</h1>
      </div>
    </div>
  );
}

export { Header, Footer, SideBar };
