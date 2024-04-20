import React from "react";
// Icons
import { RiSearch2Line } from "react-icons/ri";

const Header = () => {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between gap-4">
      <h1 className="text-2xl md:text-3xl font-bold">
        🌞 Buenos dias, <span className="text-primary-100">Miguel</span>
      </h1>
    </header>
  );
};

export default Header;