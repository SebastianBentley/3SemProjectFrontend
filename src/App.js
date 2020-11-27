import './App.css';
import React, { useState, useEffect } from "react";
import DoLogin from "./login.js"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink,
    useParams,
    useLocation,
    useHistory
} from "react-router-dom";
import facade from './apiFacade';

function App() {
    const [isLoggedIn, setLoggedIn] = useState(false)
    let history = useHistory();
    const goHome = () => {
        history.push("/");
    }
    return (
        <div>
            <Header loginMsg={
                isLoggedIn ? "Logout" : "Login"
            }
                isLoggedIn={isLoggedIn} />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/login">
                    <DoLogin loggedIn={isLoggedIn} setLoggedIn={setLoggedIn} goHome={goHome} />
                </Route>
                <Route exact path="/movieSearch">
                    <MovieSearch />
                </Route>
                <Route>
                    <NoMatch />
                </Route>
            </Switch>
        </div>

    );
}

function Header({ isLoggedIn, loginMsg }) {
    return (
        <ul className="header">
            <li>
                <NavLink exact activeClassName="active" to="/">Home</NavLink>
            </li>
            <li>
                <NavLink activeClassName="active" to="/movieSearch">Movie Surge</NavLink>
            </li>
            <li>
                <NavLink activeClassName="active" to="/login">
                    {loginMsg}</NavLink>
            </li>

        </ul>

    )
}


function Home() {
    return (
        <div>
            <h2>Home</h2>
            <h3>How to use:</h3>
            <ul>
                <li>Login as User or Admin using username and password made in backend process</li>
                <li>User and Admin use different endpoints for login</li>
                <li><b>Extern API</b> use five different extern REST API endpoints through backend.</li>
                <li>Make sure to have backend running locally or delpoyet, and adjust link(s) in <b>settings.js</b></li>
                <li>Link to backend startcode: <a href="https://github.com/SebastianBentley/3SemProject">Backend Startcode</a> </li>
            </ul>
        </div>
    )
}

function MovieSearch() {
    const [data, setData] = useState(null);
    const { strategy } = useParams();
    const [movieTitle, setMovieTitle] = useState("");

    function handleChange(event) {
        const value = event.target.value;
        setMovieTitle(value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        setData(null);
        facade.fetchMovieData(movieTitle).then(res => setData(res))
            .catch(err => {
                if (err.status) {
                    console.log(err.message);
                }
            });
    }

    const toShow = data ? (

        <div className="SearchResults">
            <h3>{data.Title}</h3>
            <div className="SearchRes1">
                <p><b>Year:</b> {data.Year}</p>
                <p><b>Genre:</b> {data.Genre}</p>
                <p><b>Directors:</b> {data.Director}</p>
                <p><b>Writers:</b> {data.Writer}</p>
                <p><b>Actors:</b> {data.Actors}</p>
                <p><b>Description:</b> {data.Plot}</p>
            </div>
            <div className="SearchRes2">
                <img src={data.Poster}></img>
                <p>Ratings: brug map</p>
                <p><b>Metascore:</b> {data.Metascore}</p>
                <p><b>imdbRating:</b> {data.imdbRating}</p>
                <p><b>imdbVotes:</b> {data.imdbVotes}</p>
                <p><b>imdbID:</b> {data.imdbID}</p>
            </div>
        </div>
    ) : ""

    return (
        <div>
            <form className="Search">
                <h2>Movie Search</h2>
                <input placeholder="Movie title" id="movieSearch" value={movieTitle} onChange={handleChange} />
                <button onClick={handleSubmit}>Search</button>
            </form>
            {toShow}
        </div>
    )
}


function NoMatch() {
    let location = useLocation();
    return (
        <div>
            <h3>No match for
                <code>{
                    location.pathname
                }</code>
            </h3>
        </div>
    )
}

export default App;
