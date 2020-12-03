import "./App.css";
import React, { useState, useEffect } from "react";
import facade from "./apiFacade";

export default function TopMovies() {
    const [data, setData] = useState(null);
  
    useEffect(() => {
      setData(null);
      facade
        .getTopMovies()
        .then((res) => setData(res))
        .catch((err) => {
          if (err.status) {
            console.log(err.message);
          }
        });
    }, []);
    const toShow = data ? (
      <div>
        {data.map((x) => (
          <h3 key={x.Title}>
            <b>{x.Title}</b>
          </h3>
        ))}
      </div>
    ) : (
        "Loading..."
      );
  
    return (
      <div className="App">
        <h1>Top 5 Movies</h1>
        {toShow}
      </div>
    );
  }