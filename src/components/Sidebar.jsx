import React, { useState } from "react";
import { useContext } from "react";
import PocketBaseContext from "../pages/PocketBaseContext";

// Icons
import {
  RiHome3Line,
  RiFileCopyLine,
  RiPieChartLine,
  RiMore2Fill,
  RiCloseFill,
  RiShutDownLine
} from "react-icons/ri";

const Sidebar = () => {

  // Base de Datos
  const pb = useContext(PocketBaseContext);
  const [url, setUrl] = useState('');

  const [showMenu, setShowMenu] = useState(false);  // Responsive

  // Contactanos 
  const emailAddress = 'djackyrcalix@gmail.com'; 
  const handleClick = () => {
    window.location.href = `mailto:${emailAddress}`;
  };

  const handleLogout = () => {
    pb.authStore.clear();
  };

  return (
    <>
      <div
        className={`bg-primary-900 h-full fixed lg:static w-[80%] md:w-[40%] lg:w-full transition-all z-50 duration-300 ${
          showMenu ? "left-0" : "-left-full"
        }`}
      >
        {/* Profile */}
        <div className="flex flex-col items-center justify-center p-8 gap-2 h-[30vh]">
          <img
            src= {pb.authStore.model.picture}
            className="w-20 h-20 object-cover rounded-full ring-2 ring-gray-300"
          />
          <h1 className="text-xl text-white font-bold">{pb.authStore.model.name}</h1>
        </div>
        {/* Nav */}
        <div className="bg-primary-300 p-8 rounded-tr-[100px] h-[70vh] flex flex-col justify-between gap-8">
          <nav className="flex flex-col gap-8">
            <a
              href="/"
              className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-900/50 transition-colors"
            >
              <RiHome3Line /> Dashboard
            </a>
            <a
              href="/history"
              className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-900/50 transition-colors"
            >
              <RiFileCopyLine /> Historial
            </a>
            <a
              href="" onClick={() => handleLogout()}
              className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-900/50 transition-colors"
            >
              <RiShutDownLine /> Cerrar Sesión
            </a>
          </nav>
          <div className="bg-primary-900/50 text-white p-4 rounded-xl">
            <p className="text-gray-400">¿Tienes Problemas?</p>
            <a href="" onClick={handleClick}>Contactanos</a>
          </div>
        </div>
      </div>
      {/* Button mobile */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="lg:hidden fixed right-4 bottom-4 text-2xl bg-primary-900 p-2.5 rounded-full text-white z-50"
      >
        {showMenu ? <RiCloseFill /> : <RiMore2Fill />}
      </button>
    </>
  );
};

export default Sidebar;