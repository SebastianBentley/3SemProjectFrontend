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
import AppFile from "./app-debug.apk";
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
      <li style={{ float: "right", margin: "10px" }}>
        <form method="get" action={AppFile}>
          <button className="btn-primary" type="submit">
            Get the app here!
          </button>
        </form>
      </li>
    </ul>
  );
}

function Home() {
  return (
    <div>
      <h3>Welcome to our Movie Fetching Database</h3>
      <br></br>
      <ul>
        Upon this homepage you get the possibility to search for whichever movie
        you fancy, you can see the toprated movies based on user reviews. You
        can even see some of our favorites, where we've added our
        recommendations. Furthermore upon registration of a user or logging into
        your already existing one, you can even like or dislike a movie{" "}
        <b>AND</b> even adding the movies to your favorites so you will never
        forget them.
      </ul>
      <br></br>
      <ul>
        But <b>HEY</b>, that isn't even it! You can even download our outsourced
        app, mirroring some of the key features from the homepage, except now
        you can always have it in your pocket, with you, at all times!{" "}
        <b>WIN!</b>
      </ul>
      <br></br>
      <br></br>
      <br></br>
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
