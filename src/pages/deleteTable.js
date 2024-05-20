import React, { useEffect } from 'react'
import { useParams,useNavigate, Navigate } from 'react-router-dom';

const DeleteTable = () => {
    const navigate = useNavigate();
  const { tablename } = useParams();
  const deleteentity = () =>{
    console.log(tablename);
    fetch(`http://localhost:8000/delete-table/${tablename}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((result) => {
        result.json().then((res) => {
          navigate(`/getalltables`);
          console.log(res, "response");
        });
      })
      .catch((e) => {
        console.log("error");
      });
  }

  useEffect(() => {
    deleteentity();
  },[])
    return (
    <div>

    </div>
  )
}

export default DeleteTable
