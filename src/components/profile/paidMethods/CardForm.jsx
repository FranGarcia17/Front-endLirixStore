import React, { useState } from "react";
import axios from "axios";

function CardForm() {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://lirixstore.onrender.com/api/", formData);

      console.log("Created card Succesfully:", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
  <form onSubmit={handleSubmit}>
    <label>Numero de tarjeta:</label>
    <input type="text" onChange={handleChange}/>
    <button type="submit">Crear Tarjeta</button>
  </form>
  )
}

export default CreateCard;
