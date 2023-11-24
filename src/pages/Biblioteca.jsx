import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import Footer from "../components/home/Footer";
import TopHeader from "../components/home/TopHeader";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./biblioteca.css";

function Biblioteca() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const TOKEN = localStorage.getItem("access_token");

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const initialCart = storedCart ? JSON.parse(storedCart) : [];
    setCart(initialCart);
    setLoading(true);
    axios
      .get("https://lirixstore.onrender.com/api/profile", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => {
        console.log(res.data.user.cart);
        setCart(res.data.user.cart);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const removeAppFromCart = async (appId) => {
    debugger;
    try {
      const response = await axios.delete(
        `https://lirixstore.onrender.com/api/delete/${appId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
          // data: { appId },
          cache: "no-cache,",
        }
      );
      let timerInterval;
      Swal.fire({
        title: `Desinstalando aplicacion`,
        // html: "I will close in <b></b> milliseconds.",
        timer: 25000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const b = Swal.getHtmlContainer().querySelector("b");
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft();
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
        }
      });

      setCart((prevCart) => prevCart.filter((id) => id !== appId));
      localStorage.setItem(
        "cart",
        JSON.stringify(cart.filter((id) => id !== appId))
      );
      const updatedCart = await axios.get(
        "https://lirixstore.onrender.com/api/profile",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      setCart(updatedCart.data.user.cart);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <div className="bg-[#171717]">
          <Spinner />
        </div>
      ) : (
        <div className="p-4 bg-[#171717] h-screen text-white">
          <div>
            <TopHeader />
            <br />
            <br />
            <br />
            <br />
            <br />
            <h4 className="styleTitle">Aplicaciones descargadas</h4>
            {cart.length === 0 ? (
              <p className="styleTitle">Aun no haz descargado apps</p>
            ) : (
              <div className="flex justify-center gap-10">
                {cart.map((item) => (
                  <div
                    className="max-w-sm rounded overflow-hidden shadow-lg"
                    key={item._id}
                  >
                    <Link to={`/lirixstore/${item._id}`}>
                      <img
                        className="image-library"
                        src={item.logo}
                        alt={item.program}
                      />
                    </Link>
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2">
                        {item.program}
                      </div>
                      <button
                        onClick={() => removeAppFromCart(item._id)}
                        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                      >
                        Desinstalar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Biblioteca;
