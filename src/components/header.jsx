import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useUser from "../hooks/useUser";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const location = useLocation();
  const { actualizarStadoUsuario, stadoUsuario } = useUser();

  const SignOut = () => {
    let initialState = {
      usuario: {
        id: "",
        name: "",
        email: "",
        telefono: "",
        permissionId: "",
        permission: {
          id: "",
          type: "",
        },
      },
      token: "",
    };
    actualizarStadoUsuario(initialState);
  };

  return (
    <>
      <nav className="bg-white border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center">
            <img src="/centralFileLogo.jpg" className="h-8 mr-3" alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              Central File
            </span>
          </a>
          <div
            className="flex items-center md:order-2 relative"
            onClick={() => setMenu(!menu)}
          >
            <button
              type="button"
              className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 active:ring-4 active:ring-gray-300"
              id="user-menu-button"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src="/Mindastic.png"
                alt="user photo"
              />
            </button>

            <div
              className="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow"
              style={{
                top: "20px",
                position: "absolute",
                right: "0",
                display: menu ? "block" : "none",
              }}
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900">
                  {stadoUsuario.usuario.name}
                </span>
                <span className="block text-sm  text-gray-500 truncate">
                  {stadoUsuario.usuario.email}
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                {stadoUsuario.usuario.permission.type === "ADMIN" ? (
                  <li>
                    <Link
                      to="/dashboard/tabla"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Tabla
                    </Link>
                  </li>
                ) : null}

                <li>
                  <Link
                    to="/dashboard/perfil"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Mi Perfil
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/contactos"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Contactos
                  </Link>
                </li>
                <li>
                  <div
                    onClick={() => SignOut()}
                    className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-red-300 active:bg-red-600 active:text-white"
                  >
                    Sign out
                  </div>
                </li>
              </ul>
            </div>
            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 active:outline-none active:ring-2 active:ring-gray-200"
              aria-controls="navbar-user"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
              {stadoUsuario.usuario.permission.type === "ADMIN" ? (
                <li>
                  <Link
                    to="/dashboard/tabla"
                    className="block py-2 pl-3 pr-4 bg-blue-700 rounded md:bg-transparent hover:text-blue-700 md:p-0"
                    style={{
                      color:
                        location.pathname === "/dashboard" ? "#1d4ed8" : "",
                    }}
                  >
                    Tabla
                  </Link>
                </li>
              ) : null}

              <li>
                <Link
                  to="/dashboard/perfil"
                  className="block py-2 pl-3 pr-4 bg-blue-700 rounded md:bg-transparent hover:text-blue-700 md:p-0"
                  style={{
                    color: location.pathname === "/perfil" ? "#1d4ed8" : "",
                  }}
                >
                  Mi Perfil
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/contactos"
                  className="block py-2 pl-3 pr-4 bg-blue-700 rounded md:bg-transparent hover:text-blue-700 md:p-0"
                  style={{
                    color: location.pathname === "/contactos" ? "#1d4ed8" : "",
                  }}
                >
                  Contactos
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
