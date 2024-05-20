import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CreateNewRow = () => {
  const { tablename } = useParams();
  const [columns, setColumns] = useState([]);
  const [formData, setFormData] = useState([]);
  const [response, setResponse] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/columns/${tablename}`)
      .then((result) => result.json())
      .then((res) => {
        setColumns(res);
        setFormData(new Array(res.length).fill(""));
      });
  }, [tablename]);

  const handleChange = (index, value) => {
    let newdata = [...formData];
    newdata[index] = value;
    setFormData(newdata);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/insert/${tablename}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: formData,
      }),
    })
      .then((result) => result.json())
      .then((res) => {
        setResponse(res.message);
        setTimeout(() => {
          navigate(`/all-entities/${tablename}`);
        }, 300);
      })
      .catch((e) => {
        console.log("error", e);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Create New Row in '{tablename}'
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        {columns.map((column, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {column}:
            </label>
            <input
              type="text"
              value={formData[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
              placeholder={`Enter ${column}`}
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-white hover:text-black border border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
      {response && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded">
          {response}
        </div>
      )}
    </div>
  );
};

export default CreateNewRow;
