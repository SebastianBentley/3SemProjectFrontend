import "./App.css";
import React, {useState, useEffect} from "react";
import facade from "./apiFacade";

export default function ProfilePage() {
    const [data, setData] = useState(null);
    const [passwordChanged, setPasswordChanged] = useState(null);
    const userName = localStorage.getItem("username");
    const [newPassword, setNewPassword] = useState("");

    useEffect(() => {
        setData(null);
        facade.getSavedList(userName).then((res) => setData(res)).catch((err) => {
            if (err.status) {
                console.log(err.message);
            }
        });
    }, []);

    const handleSubmitChangePassword = (event) => {
        event.preventDefault();
        setNewPassword(newPassword)
        facade.changeUserPassword(userName, newPassword).then((res) => setPasswordChanged(res)).catch((err) => {
            if (err.status) {
                console.log(err.message);
            }
        });
    }
    function handleChangePassword(event) {
        const value = event.target.value;
        setNewPassword(value);
    }

    const toShowPasswordChanged = passwordChanged ? (<div> {
        passwordChanged.msg
    }</div>) : ("");

    const toShow = data ? (<div className="SearchResults">
        <div className="SearchRes1">
            <br/>
            Change password:
            <br/>
            <input placeholder="New password" id="passwordChange"
                value={newPassword}
                onChange={handleChangePassword}/>
            <button onClick={handleSubmitChangePassword}>Submit</button>
            {toShowPasswordChanged} </div>
        <div className="SearchRes2">
            <h1 className="h3">Your favorite movies:</h1>
            {
            data.map((x) => (<h3 className="h3"
                key={
                    x.Title
            }>
                <b> {
                    x.Title
                }</b>
            </h3>))
        } </div>
    </div>) : ("Loading...");


    return (<div>
        <div className="ProfilePageHeadline">
            <h2> {userName}'s profilepage</h2>
        </div>
        <div> {toShow} </div>
    </div>);
}
