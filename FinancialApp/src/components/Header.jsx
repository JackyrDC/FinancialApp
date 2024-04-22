import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
// Icons
import { RiSearch2Line } from "react-icons/ri";

const Header = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();
  const getFirstName = (fullName) => {
    // Divide el nombre completo en palabras usando el espacio como separador
    const words = fullName.split(" ");
    // El primer elemento en la matriz de palabras es el primer nombre
    return words[0];
  };

  return (
    <header className="flex flex-col md:flex-row items-center justify-between gap-4">
      <h1 className="text-2xl md:text-3xl font-bold">
        🌞 Buenos dias, <span className="text-primary-100">{getFirstName(user.name)}</span>
      </h1>
    </header>
  );
};

export default Header;