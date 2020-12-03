import "./App.css";
import React, {useState, useEffect} from "react";
import facade from "./apiFacade";

export default function ProfilePage() {
    const [data, setData] = useState(null);
    const userName = localStorage.getItem("username");

    useEffect(() => {
        setData(null);
        facade.getSavedList(userName).then((res) => setData(res)).catch((err) => {
            if (err.status) {
                console.log(err.message);
            }
        });
    }, []);

    const toShow = data ? (
        <div className="SearchResults">
            <div className="SearchRes1">
                brugernavn blabla
            </div>
            <div className="SearchRes2">
                 <h1 className="h3">Your favorite movies:</h1>
                {
                data.map((x) => (
                    <h3 className="h3"
                        key={
                            x.Title
                    }>
                        <b>{
                            x.Title
                        }</b>
                    </h3>
                ))
            } </div>
        </div>
    ) : ("Loading...");

    return (
        <div>
            <div className="ProfilePageHeadline">
                <h2>{userName}'s profilepage</h2>
            </div>
            <div>
               
                {toShow} </div>
        </div>
    );
}
