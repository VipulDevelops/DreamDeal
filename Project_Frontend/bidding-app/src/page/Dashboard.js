import React, { useEffect } from "react";
import Button from "../component/Button";
import { Navigate, useNavigate } from "react-router-dom";
import dashboardImage from "./Dashboard.jpg";

function Dashboard() {
  const navigate = useNavigate();
  // useEffect(() => {
  //   const opcionesConDesplegable = document.querySelectorAll(".opcion-con-desplegable");

  //   opcionesConDesplegable.forEach((opcion) => {
  //     opcion.addEventListener("click", () => {
  //       const desplegable = opcion.querySelector(".desplegable");
  //       desplegable.classList.toggle("hidden");
  //     });
  //   });
  // }, []);

  const handleCart = () => {
    navigate("/cart");
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleUpdate = () => {
    navigate("/update");
  };

  return (
    <>
      <nav className="bg-blue-500 p-4 flex items-center justify-between">
        <div>
          <h1 className="text-white text-xl font-semibold ml-4">DreamDeal</h1>
        </div>
        <div className="flex items-center space-x-4">
          <i className="fas fa-user-circle text-white text-2xl"></i>
        </div>
      </nav>
      <div className="flex h-screen">
        <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
          <nav>
            <ul className="space-y-2">
              <li className="opcion-con-desplegable">
                <div className="flex items-center justify-between p-2 hover:bg-gray-700">
                  <div className="flex items-center">
                    <i className="fas fa-calendar-alt mr-2"></i>
                    <button onClick={handleUpdate}>Update Profile</button>
                  </div>
                  <i className="fas fa-chevron-down text-xs"></i>
                </div>
                {/* <ul className="desplegable ml-4 hidden">
                <li>
                  <a href="#" className="block p-2 hover:bg-gray-700 flex items-center">
                    <i className="fas fa-chevron-right mr-2 text-xs"></i>
                    Gestion de citas
                  </a>
                </li>
                <li>
                  <a href="#" className="block p-2 hover:bg-gray-700 flex items-center">
                    <i className="fas fa-chevron-right mr-2 text-xs"></i>
                    Polizas
                  </a>
                </li>
              </ul> */}
              </li>
              <li className="opcion-con-desplegable">
                <div className="flex items-center justify-between p-2 hover:bg-gray-700">
                  <div className="flex items-center">
                    <i className="fas fa-money-bill-wave mr-2"></i>
                    <button onClick={handleCart}>My Cart</button>
                  </div>
                  <i className="fas fa-chevron-down text-xs"></i>
                </div>
              </li>
              <li className="opcion-con-desplegable">
                <div className="flex items-center justify-between p-2 hover:bg-gray-700">
                  <div className="flex items-center">
                    <i className="fas fa-chart-bar mr-2"></i>
                    <button onClick={handleSignOut}>Sign Out</button>
                  </div>
                  <i className="fas fa-chevron-down text-xs"></i>
                </div>
              </li>
              <li className="opcion-con-desplegable">
                <div className="flex items-center justify-between p-2 hover:bg-gray-700">
                  <div className="flex items-center">
                    <i className="fas fa-file-alt mr-2"></i>
                    <span>Guidelines</span>
                  </div>
                  <i className="fas fa-chevron-down text-xs"></i>
                </div>
              </li>
            </ul>
          </nav>
        </aside>
        <div className="flex-grow p-4">
          {/* Dashboard content */}

          <div class="flex items-center h-screen w-full justify-center">
            <div class="max-w-xs ">
              <div class="bg-white shadow-xl rounded-lg py-3">
                <div class="p-2">
                  <img src={dashboardImage} alt="Dashboard" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
