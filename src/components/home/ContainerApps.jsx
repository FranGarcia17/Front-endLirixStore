import React from "react";
import { BsInfoCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import Footer from "./Footer";

function ContainerApps({ apps, title }) {
  return (
    <div className="bg-[#171717]">
      <div className="mx-auto max-w-full px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-white">
          {title}
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {apps.map((app) => (
            <div className="group max-w-sm rounded overflow-hidden shadow-lg" key={app._id}>
              <Link to={`/lirixstore/${app._id}`} className="group-hover:opacity-75">
                <img width={350} className="image-library" src={app.logo} alt={app.program}/> 
              </Link>
              <div className="px-6 py-4 flex justify-between">
                <div className="font-bold text-xl mb-2">
                  {app.program}
                </div>
                <div className="font-bold text-xl mb-2">
                  <p>{app.cost == 0 ? "Gratis" : app.cost}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContainerApps;
