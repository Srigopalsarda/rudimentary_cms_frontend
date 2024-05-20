import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditRow = () => {
  const { tablename, rowid } = useParams();
  const [formData, setFormData] = useState({});
  const [columns, setColumns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the row data to be edited
    const fetchRowData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/get-row/${tablename}/${rowid}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch row data");
        }
        const rowData = await response.json();
        setFormData(rowData);
      } catch (error) {
        console.error("Error fetching row data:", error);
      }
    };

    // Fetch the table columns
    const fetchColumns = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/columns/${tablename}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch columns");
        }
        const columnsData = await response.json();
        setColumns(columnsData);
      } catch (error) {
        console.error("Error fetching columns:", error);
      }
    };

    fetchRowData();
    fetchColumns();
  }, [tablename, rowid]);

  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8000/update/${tablename}/${rowid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update row");
      }
      console.log("Row updated successfully");
      navigate(`/all-entities/${tablename}`); // Redirect to the table view after successful update
    } catch (error) {
      console.error("Error updating row:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Edit Row in '{tablename}'
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {columns.map((column, index) => (
          <div key={index} className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">{column}:</label>
            <input
              type="text"
              value={formData[column] || ""}
              onChange={(e) => handleChange(column, e.target.value)}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-black   text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditRow;
