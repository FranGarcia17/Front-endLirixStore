import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";
import TopHeader from "./TopHeader";
import { AiFillStar } from "react-icons/ai";

function GeneralApps() {
  const [loading, setLoading] = useState(false);
  const [apps, setApps] = useState([]);
  const [filter, setFilter] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://lirixstore.onrender.com/api/apps")
      .then((res) => {
        setApps(res.data.data || []);
        setLoading(false);
        console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filterApps = apps.filter((app) =>
    app.program.toLowerCase().includes(filter.toLowerCase())
  );

  // const handleAddToCart = async (appId) => {
  //   debugger;
  //   const token = localStorage.getItem("access_token");

  //   if(!token) {
  //     setError("token not found");
  //     return;
  //   }

  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };

  //   try {
  //     await axios.post("http://localhost:4000/api/add", {
  //       appId: appId
  //     }, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${TOKEN}`,
  //       },
  //     });
  //     const updateApps = apps.map((app) => {
  //       app._id === appId ? { ...app, addedToCart: true} : app
  //     });
  //     setApps(updateApps);

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <>
      {loading ? (
        <div className="bg-[#171717] w-full">
          <Spinner />
        </div>
      ) : (
        <div className="bg-[#171717] w-full h-full text-white">
          <TopHeader />
          <div className="mx-auto max-w-full px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <input
              type="text"
              placeholder="Buscar aplicaciones..."
              value={filter}
              onChange={handleFilterChange}
              className="text-black"
            />

            <h2 className="text-2xl font-bold tracking-tight text-white">
              Todas las Apps
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {filterApps.map((app) => (
                <div key={app._id} className="group relative cursor-pointer">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-black lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      width={300}
                      src={app.logo}
                      alt={app.company}
                      className="h-full w-full object-cover lg:h-full lg:w-full rounded-2xl"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-white">
                        <Link to={`/lirixstore/${app._id}`}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {app.program}
                        </Link>
                      </h3>
                      {/* <div className="flex items-center">
                        {app.rating}
                        <AiFillStar className="fill-yellow-300"/>
                      </div> */}
                    </div>
                    {/* {app.addedToCart ? (
                      <p>Agregado</p>
                    ): 
                    (
                      <button onClick={() => handleAddToCart(app._id)}>
                        Agregar al carrito
                      </button>
                    )} */}
                    <p>{app.cost == 0 ? "Gratis" : app.cost}</p>
                  </div>
                </div>
              ))}
              {/* {apps.map((app) => (
                <div key={app._id} className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-black lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      src={app.logo}
                      alt={app.company}
                      className="h-full w-full object-cover lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <Link to={`/lirixstore/${app._id}`}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {app.program}
                        </Link>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{app.rating}</p>
                    </div>
                    <p>{app.cost == 0 ? "Free" : app.cost}</p>
                  </div>
                </div>
              ))} */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GeneralApps;
