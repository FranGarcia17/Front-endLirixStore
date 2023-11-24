import React from "react";
import "./buttons.css";
import { VscLibrary } from "react-icons/vsc";
import { AiOutlineAppstore } from "react-icons/ai";
import { Link } from "react-router-dom";

function Buttons() {
  return (
    <div className="container-buttons">
      <div>
        <Link to={'/lirixstore/library'}>
          <button>
            <VscLibrary />
            Biblioteca
          </button>
        </Link>
      </div>
      <div>
        <Link>
          <button>
            <AiOutlineAppstore />
            Apps
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Buttons;
