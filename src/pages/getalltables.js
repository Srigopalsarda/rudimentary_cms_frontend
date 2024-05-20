import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

const GetAllTables = () => {
  const [data, setData] = useState([]);

  const getAllTables = async () => {
    fetch("http://localhost:8000/getalltables")
      .then((results) => results.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllTables();
  }, []);

  return (
    <div className="container mx-auto p-4 flex flex-col gap-3">
      <h1 className="text-2xl font-bold mb-4">Tables</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Table Name
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Edit
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-3 px-4 text-gray-800">{item.TABLE_NAME}</td>
                <td className="py-3 px-4">
                  <button className="text-blue-500 hover:text-blue-700">
                    <Link to={`/all-entities/${item.TABLE_NAME}`}>Edit</Link>
                  </button>
                </td>
                <td className="py-3 px-4">
                  <button className="text-red-500 hover:text-red-700">
                    <Link to={`/delete/${item.TABLE_NAME}`}>Delete</Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link to="/create-new-table">
        <Button className="">Create New Table</Button>
      </Link>
    </div>
  );
};

export default GetAllTables;
