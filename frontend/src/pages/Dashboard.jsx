import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/trips");
  };
  return (
    <>
      <h1 className="text-3xl font-bold text-center mt-10">
        Welcome to the Dashboard
      </h1>
      <button
        className="bg-blue-500 text-white p-2 rounded-md"
        onClick={handleClick}
      >
        Trips
      </button>
    </>
  );
};

export default Dashboard;
