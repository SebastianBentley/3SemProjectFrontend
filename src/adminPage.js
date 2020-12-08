import "./App.css";
import React, { useState, useEffect } from "react";
import facade from "./apiFacade";

export default function AdminPage() {
  const [data, setData] = useState(null);

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

  const toShow = data ? (
    <div class="container">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </div>
  ) : (
    "Loading..."
  );
  console.log("Henrik er gay");
  return (
    <div>
      <h2> Info </h2>
      <div> {toShow} </div>
    </div>
  );
}
