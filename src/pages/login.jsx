import { useState } from "react";
import { Link } from "react-router-dom";
import LayoutPage from "../components/layoutPage";
import { login } from "../api/login";
import { useMutation } from "@tanstack/react-query";

import useUser from "../hooks/useUser";
import { Helmet } from "react-helmet";
import Spiner from "../components/spiner";

const Login = () => {
  const { stadoUsuario, actualizarStadoUsuario } = useUser();
  const [enviar, setEnviar] = useState({
    email: "",
    password: "",
  });

  // Login con react query
  const { isLoading, data, isError, error, mutate } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setEnviar({
        email: "",
        password: "",
      });
      actualizarStadoUsuario(data.data);
    },
  });

  const sesion = (e) => {
    setEnviar({ ...enviar, [e.target.name]: e.target.value });
  };

  const enviarLogin = (e) => {
    e.preventDefault();
    mutate(enviar);
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta
          name="description"
          content="Logearse en la plataforma CentralFile"
        />
      </Helmet>
      <LayoutPage>
        <div className="flex w-screen h-screen">
          <section className="h-screen w-screen md:w-1/2">
            <section className="bg-gray-50 h-full w-full">
              <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                  <div className="p-6 space-y-4 md:space-y-6 sm:p-8 relative">
                    {/* loader */}
                    {isLoading && <Spiner />}

                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                      Iniciar sesión en su cuenta
                      <div>{stadoUsuario.usuario.name}</div>
                    </h1>
                    <form
                      className="space-y-4 md:space-y-6"
                      onSubmit={(e) => enviarLogin(e)}
                    >
                      <div>
                        <label
                          htmlhtmlFor="email"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Email
                        </label>
                        <input
                          onChange={(e) => sesion(e)}
                          value={enviar.email}
                          type="email"
                          name="email"
                          id="email"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                          placeholder="name@gmail.com"
                          required=""
                        />
                      </div>
                      <div>
                        <label
                          htmlhtmlFor="password"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Password
                        </label>
                        <input
                          onChange={(e) => sesion(e)}
                          value={enviar.password}
                          type="password"
                          name="password"
                          id="password"
                          placeholder="••••••••"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                          required=""
                        />
                      </div>
                      {isError && (
                        <div className="text-white bg-red-700 font-medium text-sm px-5 text-center mr-2 mb-2 ">
                          {error.response.data.msg}
                        </div>
                      )}
                      <button
                        // to="/dashboard"
                        type="submit"
                        className="w-full text-white bg-blue-600 hover:bg-blue-700 active:ring-2 active:outline-none active:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      >
                        Iniciar sesión
                      </button>
                      <Link
                        to="/registrarse"
                        className="w-full text-white bg-red-600 hover:bg-red-700 active:ring-2 active:outline-none active:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center block"
                      >
                        Registrarse
                      </Link>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </section>
          <section className="hidden md:block md:h-screen md:w-1/2 p-10">
            <div className="h-full w-full">
              <img
                src="centralFile.jpg"
                alt="horno1"
                className="h-full w-full object-contain"
              />
            </div>
          </section>
        </div>
      </LayoutPage>
    </>
  );
};

export default Login;
