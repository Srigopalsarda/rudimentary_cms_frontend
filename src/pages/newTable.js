import { useState } from "react";
import "../index.css";
import { Button } from "../components/ui/button";

const NewTable = () => {
  const types = [
    {
      value: "VARCHAR(255)",
      label: "string",
    },
    {
      value: "INT",
      label: "integer",
    },
    {
      value: "DATE",
      label: "date",
    },
  ];

  const [attributekey, setAttributeKey] = useState("");
  const [attributevalue, setAttributeValue] = useState(types[0]?.value || "");
  const [attributes, setAttributes] = useState([]);
  const [tablename, setTableName] = useState("");
  const [response, setResponse] = useState("");

  const addAttribute = () => {
    if (attributekey && attributevalue) {
      setAttributes([
        ...attributes,
        { key: attributekey, value: attributevalue },
      ]);
      alert(`Attribute "${attributekey}" of type "${attributevalue}" added.`);
      // Clear input fields after adding attribute
      setAttributeKey("");
      setAttributeValue(types[0]?.value || "");
    } else {
      alert("Please enter both attribute name and type.");
    }
  };

  const createNewTable = () => {
    fetch("http://localhost:8000/create-new-table", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Tablename: tablename,
        attributes: attributes.reduce((acc, attr) => {
          acc[attr.key] = attr.value;
          return acc;
        }, {}),
      }),
    }).then((result) => {
      result.json().then((res) => {
        console.log(res);
        setResponse(res);
        setAttributes([]);
        setTableName("");
      });
    });
  };

  return (
    <div className="container mx-auto p-4">
      <label
        htmlFor="tablename"
        className="block text-sm font-medium text-gray-700"
      >
        Table Name
      </label>
      <input
        className="border-2 border-gray-300 p-2 w-full mt-2 mb-2"
        name="tablename"
        id="tablename"
        type="text"
        placeholder="Name of table"
        value={tablename}
        onChange={(e) => setTableName(e.target.value)}
      />

      <label
        htmlFor="attributekey"
        className="block text-sm font-medium text-gray-700"
      >
        Attribute Name
      </label>
      <input
        className="border-2 border-gray-300 p-2 w-full mt-2 mb-2"
        placeholder="Name of attribute"
        value={attributekey}
        onChange={(e) => setAttributeKey(e.target.value)}
      />

      <label
        htmlFor="attributevalue"
        className="block text-sm font-medium text-gray-700"
      >
        Attribute Type
      </label>
      <select
        id="attributevalue"
        className="border-2 border-gray-300 p-2 w-full mt-2 mb-2"
        value={attributevalue}
        onChange={(e) => setAttributeValue(e.target.value)}
      >
        {types.map((type) => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>

      <Button onClick={addAttribute}>Add attribute</Button>
      <Button onClick={createNewTable}>Create New Table</Button>

      <h1>{response.message ? response.message : response.error}</h1>

      <ul>
        {attributes.map((attribute, index) => (
          <li key={index}>
            {attribute.key}: {attribute.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewTable;
