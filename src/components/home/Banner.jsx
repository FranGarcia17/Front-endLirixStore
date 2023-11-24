import React from "react";
import { Carousel } from "flowbite-react";
import "./banner.css";

function Banner() {
  return (
    <div className="bg-[#171717] w-full flex flex-row justify-center h-96 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel className="w-3/4 h-96">
        <img
          className="object-contain"
          src="/src/assets/Fondo Menu K.png"
          alt="..."
        />
        <img
          className="object-contain"
          src="/src/assets/Fondo Menu KI.png"
          alt="..."
        />
        <img
          className="object-contain"
          src="/src/assets/Fondo Menu OTS.png"
          alt="..."
        />
        <img
          src="https://images-eds-ssl.xboxlive.com/image?url=7flt5HU26ZSS3Tgted_TMty0wzqMQYpm03yD7eAPRtQBYO5dMlD18uZxNDuKXvpqK9ZCswhscSV0mui2BO7d5LbjsBaMgvwJN.0g2UOe6jYp2qCW2_QnfB_DQgOfXDObCMyK73l3.lyz0bE18bfW2Kt1YXSE2qAF7wmHMuMyb6slX7v9A8EMWKdPtdQfO9jsYMaUGOZaFkS86jVPVB.tHg--&h=576"
          alt="..."
        />
        <img
          src="https://images-eds-ssl.xboxlive.com/image?url=7flt5HU26ZSS3Tgted_TMty0wzqMQYpm03yD7eAPRtQBYO5dMlD18uZxNDuKXvpq.KSX_tTGGReELh5kCswnT..EuaTa_bdtX6Bt7yXc8mDTZU76j69k6OWF3CZezfRBRye.G9L6xkoIfMSskVi7NOyWmfEv_B69pAP0Uzd81mWjmC1VMAYce5NXHFiLLPflplKrOr7EK38scMkyI2_M2UngQu40BIw6rsg.UWCirgA-&h=576"
          alt="..."
        />
        <img
          src="https://images-eds-ssl.xboxlive.com/image?url=7flt5HU26ZSS3Tgted_TMty0wzqMQYpm03yD7eAPRtQBYO5dMlD18uZxNDuKXvpq6EfCL5ERZrqYueqrdQsxXlGSCTM8lirYXuY68ZzsVqip5gAopXjbGfbgPx8DsEniOqupz00gKh6zTASVYo961cr6Bes2pDrW.PBCQHihNPHOxicLXqVStWLT9UzsQLjO8aq7f6Ve28UhEq2Oo9.p2g--&h=576"
          alt="..."
        />
        <img src="/src/assets/Fondo Cardinal de DyX.png" alt="..." />
      </Carousel>
    </div>
  );
}

export default Banner;
