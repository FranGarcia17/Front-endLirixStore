import React, { useEffect, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
import TopHeader from "../home/TopHeader";

function MostRating() {
  const [loading, setLoading] = useState(false);
  const [appsRating, setAppsRating] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://lirixstore.onrender.com/api/mostrating")
      .then((res) => {
        setAppsRating(res.data);
        //console.log(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <div className="bg-[#171717] w-full">
          <Spinner />
        </div>
      ) : (
        <div className="bg-[#171717] w-full h-screen text-white">
          <TopHeader />
          <br />
          <br />
          <br />
          <br />
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Mejor valoradas
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {appsRating.map((app) => (
              <div
                className="group max-w-sm rounded overflow-hidden shadow-lg"
                key={app._id}
              >
                <Link
                  to={`/lirixstore/${app._id}`}
                  className="group-hover:opacity-75"
                >
                  <img
                    width={350}
                    className="image-library"
                    src={app.logo}
                    alt={app.program}
                  />
                </Link>
                <div className="px-6 py-4 flex justify-between">
                  <div className="font-bold text-xl mb-2">{app.program}</div>
                  <div className="font-bold text-xl mb-2">
                    <p>{app.cost == 0 ? "Gratis" : app.cost}</p>
                  </div>
                </div>
              </div>
              // <div key={app._id} className="group relative">
              //   <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              //     <img
              //       src={app.logo}
              //       alt={app.company}
              //       className="h-20 w-20 object-contain lg:h-full lg:w-full"
              //     />
              //   </div>
              //   <div className="mt-4 flex justify-between">
              //     <div>
              //       <h3 className="text-sm text-white">
              //         <Link to={`/lirixstore/${app._id}`}>
              //           <span aria-hidden="true" className="absolute inset-0" />
              //           {app.program}
              //         </Link>
              //       </h3>
              //       <p className="mt-1 text-sm text-white">{app.rating}</p>
              //     </div>
              //     <p>{app.cost == 0 ? "Free" : app.cost}</p>
              //   </div>
              // </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default MostRating;
