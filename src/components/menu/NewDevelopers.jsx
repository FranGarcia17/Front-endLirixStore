import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
import TopHeader from "../home/TopHeader";

function NewDevelopers() {
  const [loading, setLoading] = useState(false);
  const [appNewDevelopers, setNewDevelopers] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://lirixstore.onrender.com/api/newDevelopers")
      .then((res) => {
        setNewDevelopers(res.data);
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
        <div>
          <Spinner />
        </div>
      ) : (
        <div className="bg-[#171717] text-white max-w-full py-16 sm:py-24 lg:max-w-7xl">
          <TopHeader />
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Apps New developers
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {appNewDevelopers.map((app) => (
              <div key={app._id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={app.logo}
                    alt={app.company}
                    className="h-20 w-20 object-contain lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm">
                      <Link to={`/lirixstore/${app._id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {app.program}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm">{app.rating}</p>
                  </div>
                  <p>{app.cost == 0 ? "Free" : app.cost}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default NewDevelopers;
