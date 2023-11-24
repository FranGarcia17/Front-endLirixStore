import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../Spinner";
import TopHeader from "../home/TopHeader";
import { FaCcMastercard } from "react-icons/fa";
import { AiOutlineCreditCard } from "react-icons/ai";
import { MdCurrencyExchange } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import "./profile.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function Profile() {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // const token = localStorage.getItem("access_token");
  const fetchProfile = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("token not found");
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      setLoading(true);
      const response = await axios.get(
        "https://lirixstore.onrender.com/api/profile",
        config
      );
      setUser(response.data.user);
      console.log(response.data.user);
      // console.log(setUser);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setError(error.response.data.message);
      } else if (error.request) {
        setError("No se recibio respuesta del servidor");
      } else {
        setError("Error al realizar la solicitud");
      }
    }
  };

  function showAlert() {
    Swal.fire({
      icon: "error",
      title: "Lamentamos las molestias...",
      text: "Nos encontramos en mantenimiento",
      // footer: '<a href="">Why do I have this issue?</a>'
    });
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      {/* <TopHeader /> */}
      {loading ? (
        <div className="bg-[#171717]">
          <Spinner />
        </div>
      ) : (
        <div className="container-title">
          <TopHeader />
          <div className="container-profile">
            <div className="side-left">
              <img
                style={{ borderRadius: "250px", width: "400px" }}
                src="https://i.pinimg.com/736x/95/fd/d1/95fdd145269f0c005e13ca25c0146aa2.jpg"
                alt="imageperfil"
              />
            </div>
            <div className="side-right">
              <div className="information">
                <h3 style={{ fontWeight: "bold" }}>Informacion</h3>
                <label>
                  <span style={{ fontWeight: "bold" }}>Nombre: </span>{" "}
                  {user.username}
                </label>
                <label>
                  <span style={{ fontWeight: "bold" }}>
                    Correo Electronico:{" "}
                  </span>
                  {user.email}
                </label>
                <label>
                  <span style={{ fontWeight: "bold" }}>Password: </span>
                  {user.password}
                </label>
              </div>
              <div className="container-icons">
                <div>
                  <button onClick={showAlert}>
                    <FaCcMastercard size={50} />
                    <p style={{ textAlign: "center" }}>Ver</p>
                  </button>
                </div>
                <div>
                  <button onClick={showAlert}>
                    <AiOutlineCreditCard size={50} />
                    <p style={{ textAlign: "center" }}>Agregar</p>
                  </button>
                </div>
                <div>
                  <button onClick={showAlert}>
                    <MdCurrencyExchange size={50} />
                    <p style={{ textAlign: "center" }}>Cambiar</p>
                  </button>
                </div>
                <div>
                  <button onClick={showAlert}>
                    <RxUpdate size={50} />
                    <p style={{ textAlign: "center" }}>Actualizar</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
