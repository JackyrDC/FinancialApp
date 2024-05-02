import React from "react";
import { useContext } from "react";
import PocketBaseContext from "../pages/PocketBaseContext";


const Header = () => {
  const pb = useContext(PocketBaseContext);
  return (
    <header className="flex flex-col md:flex-row items-center justify-between gap-4">
      <h1 className="text-2xl md:text-3xl font-bold">
        🌞 Buenos dias, <span className="text-primary-100">{getFirstName(user.name)}</span>
      </h1>
    </header>
  );
};

export default Header;