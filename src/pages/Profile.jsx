import React, { useEffect } from "react";
import { UserAuth } from "../context/AuthContext";

export const Profile = () => {
  const { user, logOut } = UserAuth();

  const cerrarSesion = async()=>{
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  }

  return (
      <div>
        <h1>Bienvenido, {user.displayName}</h1>
        <button onClick={cerrarSesion}>Cerra Sesión</button>
        <img src={user.photoURL} alt="Foto de perfil" />
      </div>
  );
};