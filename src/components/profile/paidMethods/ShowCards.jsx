import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../Spinner";
import TopHeader from "../../home/TopHeader";
import { FaCcMastercard } from "react-icons/fa";
import BackButton from "../../BackButton";

function ShowCards() {
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCards = async () => {
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
      setUser(response.data.user.cardSave);
      console.log(response.data.user.cardSave);
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

  const deleteCard = async (id) => {
    console.log(id);
    try {
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

      await axios.delete(`https://lirixstore.onrender.com/api/cards/${id}`, config);
      fetchCards();
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);
  return (
    <>
      {user.length == 0 ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div>
          <BackButton />
          <h4>Metodos de Pago</h4>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Numero de Tarjeta</th>
                <th>Tipo de Tarjeta</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {user.map((item) => (
                <tr key={item._id}>
                  <th>{item.nameProperty}</th>
                  <th>{item.numCard}</th>
                  <th>{item.type}</th>
                  <th>
                    <button>Edit</button>
                    <button onClick={() => deleteCard(item._id)}>Delete</button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default ShowCards;
