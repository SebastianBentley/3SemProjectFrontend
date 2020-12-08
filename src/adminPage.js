import "./App.css";
import React, { useState, useEffect } from "react";
import facade from "./apiFacade";

export default function AdminPage() {
  const [data, setData] = useState(null);
  const [table, setTable] = useState(null);

  useEffect(() => {
    setData(null);
    facade
      .getAllUsers()
      .then((res) => setData(res))
      .catch((err) => {
        if (err.status) {
          console.log(err.message);
        }
      });
  }, []);

  const showTable = () => {
    console.log("lol")
    setTable(data.map(x =>
      <tr key={x.username}>
        <td>{x.username}</td>
        <td><a href="#" id={x.username} onClick={deleteUser}>Delete</a></td>
      </tr>
    ))
  }

  const deleteUser = (event) => {
    var value = event.target.id;
    facade.deleteUser(value).catch((err) => {
      if (err.status) {
        console.log(err.message);
      }
    })
  }



  const toShow = data ? (
    <div className="container" >
      <table className="table" >
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {table}
        </tbody>
      </table>
    </div>
  ) : (
      "Loading..."
    );

  return (
    <div >
      <h2> Info </h2>
      <div> {toShow} </div>
    </div>
  );
}
