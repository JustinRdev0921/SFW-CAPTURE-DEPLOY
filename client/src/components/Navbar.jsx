import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-zinc-700  flex justify-between py-5 px-10">
      <Link to="/" className="font-bold text-white">
        <h1 className="text-2xl font-bold text-white">CaptureSoft</h1>
      </Link>
      <ul className="flex gap-x-2">
        {isAuthenticated && user.Admin === 1 ? (
          <>
            <li className="font-bold text-white">
              Bienvenid@ {user.nombreUsuario} |
            </li>
            <li>
              <Link
                to="/cargaDocs"
                className="font-bold text-white bg-slate-600 px-4 py-1 rounded-sm"
              >
                Captura
              </Link>
            </li>
            <li>
              <Link
                to="/users"
                className="font-bold text-white bg-slate-600 px-4 py-1 rounded-sm"
              >
                Usuarios
              </Link>
            </li>
            <li>
              <Link
                to="/add-user"
                className="font-bold text-white  bg-slate-600 px-4 py-1 rounded-sm"
              >
                Nuevo Usuario
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="font-bold text-white  bg-slate-600 px-4 py-1 rounded-sm"
              >
                Perfil
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => {
                  logout();
                }}
                className="font-bold text-white bg-slate-600 px-4 py-1 rounded-sm"
              >
                Salir
              </Link>
            </li>
          </>
        ) : (
          <>
            {isAuthenticated ? (
              <>
                <li className="font-bold text-white">
                  Bienvenid@ {user.nombreUsuario}
                </li>
                <li>
                  <Link
                    to="/cargaDocs"
                    className="font-bold text-white bg-slate-600 px-4 py-1 rounded-sm"
                  >
                    Captura
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="font-bold text-white  bg-slate-600 px-4 py-1 rounded-sm"
                  >
                    Perfil
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    onClick={() => {
                      logout();
                    }}
                    className="font-bold text-white bg-slate-600 px-4 py-1 rounded-sm"
                  >
                    Salir
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="font-bold text-white bg-slate-600 px-4 py-1 rounded-sm"
                  >
                    Iniciar sesión
                  </Link>
                </li>
              </>
            )}
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
