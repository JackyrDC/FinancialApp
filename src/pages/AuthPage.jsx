import React from "react";
import { Link } from "react-router-dom";


export const AuthPage = () => {
  return (
    <>
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-6">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
            Bienvenido
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Por favor, inicia sesión para continuar.
          </p>
          <div className="flex justify-center">
            <button
              onClick=""
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Iniciar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};