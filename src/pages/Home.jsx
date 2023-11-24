import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import ContainerApps from "../components/home/ContainerApps";
import Banner from "../components/home/Banner";
import TopHeader from "../components/home/TopHeader"
import Footer from "../components/home/Footer";
import GeneralApps from "../components/home/GeneralApps";
import "./home.css"
import Buttons from "../components/home/Buttons";

function Home() {
  const [apps, setApps] = useState([]);
  const [ratingApps, setRetingApps] = useState([]);
  const [fromHouseApps, setFromHouseApps] = useState([]);
  const [newDevelopersApps, setNewDevelopersApps] = useState([]);
  const [lastWeekApps, setLastWeekApps] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   axios
  //     .get("https://lirixstore.onrender.com/api/apps")
  //     .then((res) => {
  //       setApps(res.data.data);
  //       //console.log(res.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setLoading(false);
  //     });
  // }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://lirixstore.onrender.com/api/mostrating")
      .then((res) => {
        setRetingApps(res.data);
        //console.log(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://lirixstore.onrender.com/api/fromhouse")
      .then((res) => {
        setFromHouseApps(res.data);
        //console.log(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://lirixstore.onrender.com/api/newdevelopers")
      .then((res) => {
        setNewDevelopersApps(res.data);
        //console.log(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    axios.get("https://lirixstore.onrender.com/api/lastweek")
    .then((res) => {
      setLastWeekApps(res.data.data);
      // console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
  }, [])

  return (
    <>
      {loading ? (
        <div className="bg-[#171717] w-full h-screen flex justify-center items-center content-center">
          <Spinner />
        </div>
      ) : (
        <div className="container-apps text-white">
          <TopHeader />
          <Banner />
          <ContainerApps title={"Mejores Apps"} apps={ratingApps}/>
          <ContainerApps title={"Nuevos Desarrolladores"} apps={newDevelopersApps}/>
          <ContainerApps title={"Hechas de Casa"} apps={fromHouseApps}/>
          <ContainerApps title={"Aplicaciones Ultima semana"} apps={lastWeekApps}/>
          <ContainerApps title={"Mejor Valoradas"} apps={ratingApps}/>
        </div>
      )}
    </>
  );
}

export default Home;
