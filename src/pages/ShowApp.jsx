import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { Carousel } from "flowbite-react";
import { AiFillStar } from "react-icons/ai";
import Footer from "../components/home/Footer";
import TopHeader from "../components/home/TopHeader";
import Swal from "sweetalert2";

function ShowApp() {
  const [app, setApp] = useState({});
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const initialCart = storedCart ? JSON.parse(storedCart) : [];
    setCart(initialCart);
    setLoading(true);
    axios
      .get(`https://lirixstore.onrender.com/api/app/${id}`)
      .then((res) => {
        setApp(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", options);
  }

  const handleAddToCart = async (appId) => {
    const TOKEN = localStorage.getItem("access_token");
    if (!TOKEN) {
      return Swal.fire({
        icon: "error",
        title: "Parece que no haz iniado sesion",
        text: "Inicia Sesion para obetener esta aplicacion",
      });
    }
    try {
      if (cart.includes(appId)) {
        await axios.delete(
          `https://lirixstore.onrender.com/api/delete/${appId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${TOKEN}`,
            },
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
            // const b = Swal.getHtmlContainer().querySelector("b");
            // timerInterval = setInterval(() => {
            //   b.textContent = Swal.getTimerLeft();
            // }, 100);
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
        // const newCart = cart.filter((id) => id !== appId);
        setCart((prevCart) => prevCart.filter((id) => id !== appId));
        localStorage.setItem(
          "cart",
          JSON.stringify(cart.filter((id) => id !== appId))
        );
      } else {
        await axios.post(
          "https://lirixstore.onrender.com/api/add",
          { appId: appId },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${TOKEN}`,
            },
          }
        );

        let timerInterval;
        Swal.fire({
          title: `Descargando aplicacion`,
          // html: "I will close in <b></b> milliseconds.",
          timer: 25000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            // const b = Swal.getHtmlContainer().querySelector("b");
            // timerInterval = setInterval(() => {
            //   b.textContent = Swal.getTimerLeft();
            // }, 100);
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
        setCart((prevCart) => [...prevCart, appId]);
        localStorage.setItem("cart", JSON.stringify([...cart, appId]));
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="flex bg-[#171717] w-full h-screen text-white">
      <TopHeader />
      {loading ? (
        <div className="flex justify-center items-center content-center">
          <Spinner />
        </div>
      ) : (
        <>
          {/* side Left */}
          <div className="w-1/2 p-4 overflow-y-auto h-auto flex flex-col gap-6 mt-7">
            <div className="flex flex-row justify-center items-center gap-4">
              <img width={300} className="rounded-2xl" src={app.logo} alt="" />
              <div className="flex flex-col">
                <span>{app.program}</span>
                <span>{app.company}</span>
                <div className="flex items-center">
                  {app.rating}
                  <AiFillStar className="fill-yellow-300" />
                </div>
                <ul className="text-white">
                  {app.programType.map((type) => (
                    <li key={type._id}>
                      <p>{type.name}</p>
                    </li>
                  ))}
                </ul>
                <button
                  className="text-white rounded-md bg-blue-700 cursor-pointer"
                  onClick={() => handleAddToCart(app._id)}
                >
                  {cart.includes(app._id) ? (
                    <button className="cursor-pointer" onClick={() => handleAddToCart(app._id)}>
                      Desinstalar
                    </button>
                  ) : (
                    <button className="cursor-pointer" onClick={() => handleAddToCart(app._id)}>
                      Instalar
                    </button>
                  )}
                </button>
              </div>
            </div>

            <div key={app._id} className="flex flex-col rounded-sm gap-3">
              <h2 className="text-2xl font-bold text-white sm:text-2xl">
                Descripcion
              </h2>
              <hr className="border-gray-200" />
              <p className="text-justify">{app.description}</p>
            </div>

            {/* <div className="flex flex-col rounded-sm border gap-3">
                <h5>Opiniones</h5>
                <hr />
                <ul>
                  {app.comments.map((comment) => (
                    <li key={comment._id}>
                      <p className="text-white">{comment.comment}</p>
                      <p className="text-white">
                        @{comment.name}, {formatDate(comment.date)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div> */}

            <div>
              <h2 className="text-2xl font-bold text-white sm:text-2xl">
                Opiniones
              </h2>
              <div className="text-white mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-2 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {app.comments.map((comment) => (
                  <>
                    <article
                      key={comment._id}
                      className="flex border max-w-xl flex-col items-start justify-between"
                    >
                      <div className="flex items-center gap-x-4 text-xs">
                        <time dateTime={comment.date}>
                          {formatDate(comment.date)}
                        </time>
                        <div>@{comment.name}</div>
                      </div>
                      <div>{comment.comment}</div>
                    </article>
                  </>
                ))}
              </div>
            </div>

            <div className="px-4 sm:px-0">
              <h2 className="text-2xl mb-2 font-bold text-white sm:text-2xl">
                Informacion General
              </h2>
              <hr className="border-gray-200" />
              <h3 className="mt-1 max-w-2xl text-sm leading-6 text-white">
                Detalles de la aplicacion
              </h3>
            </div>
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-white">
                    Nombre de la Aplicacion
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-white sm:col-span-2 sm:mt-0">
                    {app.program}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-white">
                    Desarrollador
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-white sm:col-span-2 sm:mt-0">
                    {app.company}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-white">
                    Fecha de publicacion
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-white sm:col-span-2 sm:mt-0">
                    <time dateTime={app.published}>
                      {formatDate(app.published)}
                    </time>
                  </dd>
                </div>
              </dl>
            </div>

            {/* <div className="flex flex-col rounded-sm border gap-3">
                <h5>Requisitos del sistema</h5>
                <hr />
                <span>
                  <strong>Disponible en:</strong> PC
                </span>
                <span>
                  <strong>SO:</strong> Windows 10 version 16299.0 o posterior
                </span>
                <span>
                  <strong>Arquitectura: </strong>x86, x64
                </span>
              </div>

              <div>
                <h5>Informacion adicional</h5>
                <hr />
                <span>publicado por</span>
              </div> */}
          </div>

          {/* Side Right */}
          <div className="w-1/2 p-4 overflow-y-auto flex flex-col gap-4 mt-7">
            {app.gallery.map((image) => (
              <img src={image.link} alt={image.name} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ShowApp;
