import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiLibrary } from "react-icons/bi";
import { GoHomeFill } from "react-icons/go";
import { Button, Navbar, Dropdown } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { BsArrowUpCircleFill } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { DropdownItem } from "flowbite-react/lib/esm/components/Dropdown/DropdownItem";

function TopHeader() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    //Verificar si el usuario ha iniciado sesion al cargar el componente
    const accessToken = localStorage.getItem("access_token");
    const userID = localStorage.getItem("userID");
    setIsLoggedIn(accessToken && userID);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleScroll() {
    if (window.scrollY > 100) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  }

  function handleLogout() {
    //Eliminar el Token de autenticacion
    localStorage.removeItem("access_token");
    localStorage.removeItem("userID");
    localStorage.removeItem("cart");
    setIsLoggedIn(false);
    navigate("/lirixstore")
    // navigate("/")
    // navigate("/signing");
  }

  function scrollTopTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <>
      <div className="bg-black fixed top-0 w-full z-50">
        <Navbar className="bg-[#171717]" fluid rounded>
          <Navbar.Brand className="w-48">
            <img
              src="/public/assets/LirixICO3.png"
              className="mr-3 sm:h-9 bg-[#202020] w-12"
              alt="Flowbite React Logo"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
              <p>LIRIX STORE</p>
            </span>
          </Navbar.Brand>
          <div className="bg-[#171717] flex md:order-2">
            {isLoggedIn ? (
              <Dropdown dismissOnClick={false} >
                <DropdownItem>
                  <Link to={"/lirixstore/library"}>
                    Biblioteca
                  </Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to={"/profile"}>
                    <span>Perfil</span>
                  </Link>
                </DropdownItem>
                <DropdownItem>
                  <Button onClick={handleLogout}>Cerrar Sesion</Button>
                </DropdownItem>
              </Dropdown>
            ) : (
              <Link to={"/signing"}>
                <Button>Iniciar Sesion</Button>
              </Link>
            )}
          </div>
          <Navbar.Collapse>
            <Navbar.Link>
              <Link style={{ color: "white" }} to={"/lirixstore"}>
                Inicio
              </Link>
            </Navbar.Link>
            <Navbar.Link>
              <Link style={{ color: "white" }} to={"/mostrating"}>
                Mejor Valoradas
              </Link>
            </Navbar.Link>
            <Navbar.Link>
              <Link style={{ color: "white" }} to={"/fromhouse"}>
                Hechas en casa
              </Link>
            </Navbar.Link>
            <Navbar.Link>
              <Link style={{ color: "white" }} to={"/lastweek"}>
                Ultima semana
              </Link>
            </Navbar.Link>
            <Navbar.Link>
              <Link style={{ color: "white" }} to={"/allapps"}>
                Todas
              </Link>
            </Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
      </div>
      {showScrollButton && (
        <div className="fixed bottom-5 right-5 z-50">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full"
            onClick={scrollTopTop}
          >
            ↑
          </button>
        </div>
      )}
    </>
  );
}

export default TopHeader;
