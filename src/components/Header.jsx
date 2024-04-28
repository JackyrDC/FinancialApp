import React from "react";
import { UserAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logOut } = UserAuth();
  let firstName = "";
  if (user && user.displayName) {
    firstName = user.displayName.split(' ')[0];
  }

  return (
    <header className="flex flex-col md:flex-row items-center justify-between gap-4">
      <h1 className="text-2xl md:text-3xl font-bold">
        🌞 Buenos dias, <span className="text-primary-100">{firstName}</span>
      </h1>
    </header>
  );
};

export default Header;