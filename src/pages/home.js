import React from "react";
import { Link } from "react-router-dom";
import "../index.css";
import { Button } from "../components/ui/button";
import illustration from "../images/1.jpg";
const Home = () => {
  return (
    <div className="flex w-full justify-center items-center h-screen p-3 gap-3">
      <div className="flex flex-col justify-center w-2/4 items-start">
        <h1 className="lg:text-6xl md:text-4xl text-3xl p-3">
          Content Management System
        </h1>
        <div className="text-md p-3 mx-2">
          Experience the simplicity of a headless CMS designed for easy data
          management. Create entities with customizable attributes, and perform
          seamless CRUD operations: Create, Read, Update, and Delete entries.
          Automatically generate and manage database tables in MySQL or
          PostgreSQL based on your entities. Enjoy a user-friendly frontend
          interface that empowers you to control your data without complexity.
          Streamline your data management process today.
        </div>
        <div className="flex items-center justify-center gap-3 w-11/12   ">
          <div>
            <Link to="/create-new-table">
              <button className="bg-black hover:bg-black-700 outline-black text-white font-bold py-2 px-4 rounded-3xl ">
                + Create new table
              </button>
            </Link>
          </div>
          <div>
            <Link to="/getalltables">
              <button className=" bg-white hover:bg-black hover:text-white text-black outline font-bold py-2 px-4 rounded-3xl">
                View All Tables
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-2/4 ">
        <img className="rounded-3-xl" src={illustration} alt="" />
      </div>
    </div>
  );
};

export default Home;
