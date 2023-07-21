import { useState } from "react";
import { Link } from "react-router-dom";
import LayoutPage from "../components/layoutPage";
import { login } from "../api/login";
import { useMutation } from "@tanstack/react-query";

import useUser from "../hooks/useUser";
import { Helmet } from "react-helmet";

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
                    {isLoading && (
                      <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center backdrop-blur-sm bg-white/30">
                        <svg
                          aria-hidden="true"
                          className="w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                    )}

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
