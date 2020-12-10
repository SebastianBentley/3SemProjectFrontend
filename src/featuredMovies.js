import "./App.css";
import React, { useState, useEffect } from "react";
import facade from "./apiFacade";
import image1 from "./images/fsposter.png";
import image2 from "./images/gotposter.png";

export default function FeaturedMovies() {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(null);
    facade
      .getFeaturedMovies()
      .then((res) => setData(res))
      .catch((err) => {
        if (err.status) {
          console.log(err.message);
        }
      });
  }, []);
  const toShow1 = data ? (
    <div>
      <h1>{data.description2}</h1>
      <h1>{data.fsName}</h1>
      <h1>{data.fsStatus}</h1>
      <h1>{data.fsSpecies}</h1>
      <h1>{data.Gender}</h1>
      <h1>{data.fsHair}</h1>
    </div>
  ) : (
    "Loading..."
  );
  const toShow2 = data ? (
    <div>
      <h1>{data.description1}</h1>
      <h1>{data.gotName}</h1>
      <h1>{data.gotRegion}</h1>
      <h1>{data.gotCoat}</h1>
      <h1>{data.gotFounded}</h1>
      <h1>{data.gotFounder}</h1>
      <h1>{data.gotDiedout}</h1>
    </div>
  ) : (
    "Loading..."
  );

  return (
    <div>
      <h3>Featured Movies</h3>
      <div class="container">
        <div style={{ position: "relative" }} class="row">
          <div style={{ position: "absolute" }} class="col-lg">
            <div>{toShow1}</div>
            <img src={image1}></img>
          </div>
          <div style={{ position: "absolute" }} class="col-lg">
            <div>{toShow2}</div>
            <img src={image2}></img>
          </div>
        </div>
      </div>
    </div>
  );
}
