import "./App.css";
import React, { useState, useEffect } from "react";
import DoLogin from "./login.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useParams,
  useLocation,
  useHistory,
} from "react-router-dom";
import facade from "./apiFacade";
import MovieSearch from "./movieSearch.js";
import TopMovies from "./topMovies.js";
import ProfilePage from "./profilePage.js";
import AdminPage from "./adminPage.js";
import FeaturedMovies from "./featuredMovies.js";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  let history = useHistory();
  const goHome = () => {
    history.push("/");
  };
  useEffect(() => {
    if (isLoggedIn) {
      setIsAdmin(facade.checkRole());
    }
  }, [isLoggedIn]);

  return (
    <div>
      <Header
        loginMsg={isLoggedIn ? "Logout" : "Login"}
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
      />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <DoLogin
            loggedIn={isLoggedIn}
            setLoggedIn={setLoggedIn}
            goHome={goHome}
          />
        </Route>
        <Route exact path="/movieSearch">
          <MovieSearch isLoggedIn={isLoggedIn} />
        </Route>
        <Route exact path="/topMovies">
          <TopMovies />
        </Route>

        {isLoggedIn && (
          <Route exact path="/profilePage">
            <ProfilePage />
          </Route>
        )}

        {isAdmin && (
          <Route exact path="/adminPage">
            <AdminPage />
          </Route>
        )}
        <Route exact path="/featuredMovies">
          <FeaturedMovies />
        </Route>
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}

function Header({ isLoggedIn, loginMsg, isAdmin }) {
  return (
    <ul className="header">
      <li>
        <NavLink exact activeClassName="active" to="/">
          Home
        </NavLink>
      </li>
      {isLoggedIn && (
        <li>
          <NavLink activeClassName="active" to="/profilePage">
            Profile Page
          </NavLink>
        </li>
      )}
      <li>
        <NavLink activeClassName="active" to="/movieSearch">
          Movie Search
        </NavLink>
      </li>

      <li>
        <NavLink activeClassName="active" to="/topMovies">
          Top Movies
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/featuredMovies">
          Featured Movies
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/login">
          {loginMsg}{" "}
        </NavLink>
      </li>
      {isAdmin && isLoggedIn && (
        <li>
          <NavLink activeClassName="active" to="/adminPage">
            Admin Page
          </NavLink>
        </li>
      )}
    </ul>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
      <h3>How to use:</h3>
      <ul>
        <li>
          Login as User or Admin using username and password made in backend
          process
        </li>
        <li>User and Admin use different endpoints for login</li>
        <li>
          <b>Extern API</b>
          use five different extern REST API endpoints through backend.
        </li>
        <li>
          Make sure to have backend running locally or deployed, and adjust
          link(s) in
          <b>settings.js</b>
        </li>
        <li>
          Link to backend startcode:{" "}
          <a href="https://github.com/SebastianBentley/3SemProject">
            Backend Startcode
          </a>{" "}
        </li>
      </ul>
    </div>
  );
}

function NoMatch() {
  let location = useLocation();
  return (
    <div>
      <h3>
        No match for
        <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

export default App;
