import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function SignUp() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { _, setCookies } = useCookies(["access_token"]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://lirixstore.onrender.com/api/register", {
        username,
        email,
        password,
      });
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'usuario registrado correctamente',
        showConfirmButton: false,
        timer: 1500
      });
      // alert("Usuario registrado exitosamente");
      navigate("/signing");
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo salio mal intenta de nuevo',
        // footer: '<a href="">Why do I have this issue?</a>'
      });
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full overflow-hidden">
      <div className="bg-black flex flex-row">
        <img
          className="w-auto h-auto ml-24"
          src={"/src/assets/Lirix Store Banner Login.png"}
          alt=""
        />
      </div>

      <div className="bg-[#171717] flex flex-col justify-center">
        <form
          onSubmit={handleSubmit}
          className="max-w-[400px] w-full mx-auto bg-white p-4"
        >
          <h2 className="text-4xl font-bold text-center py-6">Bienvenido</h2>
          <div className="flex flex-col py-2">
            <label htmlFor="username">Username</label>
            <input
              className="border p-2"
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              autoComplete="name"
              required
            />
          </div>

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
            Sign Up
          </button>
          <div className="flex justify-between items-center">
            {/* Enlace a signing en caso de que ya cuentes con una cuenta */}
            <p className="mt-10 text-center text-sm text-gray-500">
              Ya tienes cuenta Incia Sesion aqui
            </p>
            <Link to={"/signing"}>
                <a className="mt-10 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">Signing</a>
              </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;