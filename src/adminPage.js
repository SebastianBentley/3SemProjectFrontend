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



  /*   const showTable = () => {
      facade
        .getAllUsers()
        .then((res) => setData(res))
        .catch((err) => {
          if (err.status) {
            console.log(err.message);
          }
        });
    } */

    function sleep(ms){
      return new Promise(
        resolve => setTimeout(resolve, ms)
      );
    }

  async function deleteUser(event) {
    event.preventDefault();
    var value = event.target.id;
    facade.deleteUser(value).catch((err) => {
      if (err.status) {
        console.log(err.message);
      }
    })

    await(sleep(500))
    facade
      .getAllUsers()
      .then((res) => setData(res))
      .catch((err) => {
        if (err.status) {
          console.log(err.message);
        }
      });
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
          {data.map(x =>
            <tr key={x.username}>
              <td>{x.username}</td>
              <td><a href="#" id={x.username} onClick={deleteUser}>Delete</a></td>
            </tr>)}
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
