import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const NewCrud = () => {
  const { tablename } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/all-new-entities/${tablename}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      console.log(jsonData);
      setData(jsonData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [tablename]);

  const handleEdit = (rowId) => {
    console.log("Edit Button Clicked for row:", rowId);
    navigate(`/edit-row/${tablename}/${rowId}`);
  };

  const handleDelete = async (rowId) => {
    console.log("Delete Button Clicked for row:", rowId);
    try {
      const response = await fetch(
        `http://localhost:8000/delete/${tablename}/${rowId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete row");
      }
      console.log("Row deleted successfully");
      fetchData(); // Refresh data after deletion
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Entities of '{tablename}'</h1>
      {data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 border-b">
                {data[0].map((field, index) => (
                  <th
                    key={index}
                    className="py-3 px-4 font-medium text-gray-700"
                  >
                    {field.Field}
                  </th>
                ))}
                <th className="py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data[1].length > 0 ? (
                data[1].map((entity, index) => (
                  <tr key={index} className="border-b">
                    {Object.values(entity).map((value, index) => (
                      <td key={index} className="py-3 px-4 text-gray-800">
                        {value}
                      </td>
                    ))}
                    <td className="py-3 px-4">
                      <button
                        className="text-blue-500 hover:text-blue-700 mr-2"
                        onClick={() => handleEdit(entity.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(entity.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={data[0].length + 1}
                    className="py-3 px-4 text-center text-gray-500"
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No data available</p>
      )}
      <div className="mt-4">
        <Link
          to={`/create-new-row/${tablename}`}
          className="text-white bg-black hover:bg-white hover:text-black hover:outline px-4 py-2 rounded"
        >
          + Create new row
        </Link>
      </div>
    </div>
  );
};

export default NewCrud;
