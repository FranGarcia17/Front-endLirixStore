import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";

function Signing() {
  const [_, setCookies] = useCookies(["access_token"]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    debugger;
    e.preventDefault();

    try {
      const result = await axios.post(
        "https://lirixstore.onrender.com/api/login",
        {
          email,
          password,
        }
      );
      setCookies("access_token", result.data.token);
      window.localStorage.setItem("userID", result.data.userID);
      window.localStorage.setItem("access_token", result.data.token);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Haz iniciado sesion correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/lirixstore");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se pudo iniciar sesion intenta de nuevo",
        // footer: '<a href="">Why do I have this issue?</a>'
      });
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full overflow-hidden">
      <div className="bg-[#171717] flex flex-col justify-center">
        <form
          onSubmit={handleSubmit}
          className="max-w-[400px] w-full mx-auto bg-white p-4"
        >
          <h2 className="text-4xl font-bold text-center py-6">Bienvenido</h2>
          <div className="flex flex-col py-2">
            <label htmlFor="email">email</label>
            <input
              type="email"
              id="email"
              name="emai"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="flex flex-col py-2">
            <label htmlFor="password">Password</label>
            <input
              className="border p-2"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white"
          >
            Ingresar
          </button>
          <div className="flex justify-between items-center">
            {/* Enlace a signing en caso de que ya cuentes con una cuenta */}
            <span className="mt-10 text-center text-sm text-gray-500">
              No tienes cuenta aun?
            </span>
            <Link to={"/sign-up"}>
                <a className="mt-10 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                  Registrate Aqui
                </a>
              </Link>
          </div>
        </form>
      </div>

      <div className="flex flex-row bg-black">
        <img
          className="w-auto h-auto ml-24"
          src={"/src/assets/Lirix Store Banner Login.png"}
          alt=""
        />
      </div>
    </div>
  );
}

export default Signing;
