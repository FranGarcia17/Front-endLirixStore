import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="grid h-screen min-h-full place-items-center bg-[#171717] px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-white">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Pagina no encontrada
        </h1>
        <p className="mt-6 text-base leading-7 text-white">
          Lo sentimos no hemos encontrado la pagina que buscabas
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to={"/lirixstore"}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Regresar a la Pagina Principal
          </Link>
          <Link to={"/lirixstore"} className="text-sm font-semibold text-white">
            Contact support <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFound;
