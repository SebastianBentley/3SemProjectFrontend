import "./App.css";
import React, {useState, useEffect} from "react";
import facade from "./apiFacade";
import image1 from "./images/fsposter.png";
import image2 from "./images/gotposter.png";


export default function FeaturedMovies() {
    const [data, setData] = useState(null);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    useEffect(() => {
        setData(null);
        facade.getFeaturedMovies().then((res) => setData(res)).catch((err) => {
            if (err.status) {
                console.log(err.message);
            }
        });
    }, []);

    function rollover() {
        setShow(!show);
    }

    function rollover2() {
        setShow2(!show2);
    }

    const toShow1 = data ? (
        <div>
            <h1>Movie description:
                <br/></h1><h2>{
                data.description2
            }</h2><br/>
            <h1>Name:</h1><h2>{
                data.fsName
            }</h2> <br/>
            <h1>Status:</h1>
            <h2>{
                data.fsStatus
            }</h2><br/>
            <h1>Species:</h1>
            <h2>{
                data.fsSpecies
            }</h2><br/>
            <h1>Gender:</h1>
            <h2>{
                data.fsGender
            }</h2> <br/>
            <h1>Haircolor:</h1>
            <h2>{
                data.fsHair
            }</h2><br/>
        </div>
    ) : ("Loading...");
    const toShow2 = data ? (
        <div>
            <h1>Series description:</h1>
            <h2>{
                data.description1
            }</h2><br/>
            <h1>House information:</h1>
            <h2>{
                data.gotName
            }</h2><br/>
            <h1>{
                data.gotRegion
            }</h1>
            <h1>{
                data.gotCoat
            }</h1>
            <h1>{
                data.gotFounded
            }</h1>
            <h1>{
                data.gotFounder
            }</h1>
            <h1>{
                data.gotDiedout
            }</h1>
        </div>
    ) : ("Loading...");

    const realToShow1 = show ? (
        <div>{toShow1}</div>
    ) : ""
    const realToShow2 = show2 ? (
        <div>{toShow2}</div>
    ) : ""


    return (
        <div className={"featuredMovieDiv"}>
            <div className={"featuredMovie1"}>
                <div className={"movieData"}>
                    {realToShow1}</div>
                <img className={"movieImg"}
                    alt="tomstreng"
                    onMouseEnter={rollover}
                    onMouseOut={rollover}
                    src={image1}></img>
            </div>
            <div className={"featuredMovie2"}>
                <div className={"movieData"}>
                    {realToShow2}</div>
                <img className={"movieImg"}
                    alt="tomstreng2"
                    onMouseEnter={rollover2}
                    onMouseOut={rollover2}
                    src={image2}></img>
            </div>
        </div>
    );
}
