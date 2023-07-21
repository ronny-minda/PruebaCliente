import { useState } from "react";
import LayoutPage from "../components/layoutPage";
import { Link } from "react-router-dom";
import { crearUsuario } from "../api/usuario";
import useUser from "../hooks/useUser";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Helmet } from "react-helmet";
import Spiner from "../components/spiner";

const Registrarse = () => {
  const { stadoUsuario, actualizarStadoUsuario } = useUser();
  const [datos, setDatos] = useState({
    name: "",
    email: "",
    telefono: "",
    password: "",
  });

  // registrarse con react query
  const { isLoading, data, isError, error, mutate } = useMutation({
    mutationFn: crearUsuario,
    onSuccess: (data) => {
      setDatos({
        name: "",
        email: "",
        telefono: "",
        password: "",
      });
      actualizarStadoUsuario(data.data);
      toast.success("Usuario Creado");
    },
  });

  const cambios = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const enviar = (e) => {
    e.preventDefault();
    mutate(datos);
  };

  return (
    <>
      <Helmet>
        <title>Registrarse</title>
        <meta
          name="description"
          content="Registrarse en la plataforma CentralFile"
        />
      </Helmet>

      <LayoutPage>
        <Link
          to="/login"
          className="w-32 text-white bg-blue-600 hover:bg-blue-700 active:ring-2 active:outline-none active:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center block fixed top-5 left-5"
        >
          Login
        </Link>

        <div className="h-screen w-screen flex justify-center items-center">
          <section className="bg-white w-full relative">
            {/* loader */}
            {isLoading && <Spiner />}
            <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Crear Cuenta
              </h2>
              <form onSubmit={(e) => enviar(e)}>
                <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                  <div className="sm:col-span-2">
                    <label
                      htmlhtmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      value={datos.name}
                      placeholder="Nombre"
                      required=""
                      onChange={(e) => cambios(e)}
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlhtmlFor="Email"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      name="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      value={datos.email}
                      placeholder="Email"
                      required=""
                      onChange={(e) => cambios(e)}
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlhtmlFor="Telefono"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Telefono
                    </label>
                    <input
                      type="number"
                      name="telefono"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      value={datos.telefono}
                      placeholder="telefono"
                      required=""
                      onChange={(e) => cambios(e)}
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlhtmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      password
                    </label>
                    <input
                      type="text"
                      name="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      value={datos.password}
                      placeholder="password"
                      required=""
                      onChange={(e) => cambios(e)}
                    />
                  </div>
                </div>
                {isError && (
                  <div className="text-white bg-red-700 font-medium text-sm px-5 text-center mr-2 mb-2 ">
                    {error.response.data.msg}
                  </div>
                )}
                <div className="flex items-center space-x-4">
                  <button
                    type="submit"
                    className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors"
                  >
                    Crear Cuenta
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </LayoutPage>
    </>
  );
};

export default Registrarse;
