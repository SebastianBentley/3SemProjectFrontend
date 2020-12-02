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

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  let history = useHistory();
  const goHome = () => {
    history.push("/");
  };
  return (
    <div>
      <Header
        loginMsg={isLoggedIn ? "Logout" : "Login"}
        isLoggedIn={isLoggedIn}
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
        {isLoggedIn && (
          <React.Fragment>
            <Route exact path="/profilePage">
              <ProfilePage />
            </Route>
          </React.Fragment>
        )}
        <Route exact path="/topMovies">
          <TopMovies />
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
        <NavLink activeClassName="active" to="/login">
          {loginMsg}
        </NavLink>
      </li>
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
          <b>Extern API</b> use five different extern REST API endpoints through
          backend.
        </li>
        <li>
          Make sure to have backend running locally or delpoyet, and adjust
          link(s) in <b>settings.js</b>
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

function MovieSearch({ isLoggedIn }) {
  const [data, setData] = useState(null);
  const [votes, setVotes] = useState({ upvotes: 0, downvotes: 0 });
  const { strategy } = useParams();
  const [movieTitle, setMovieTitle] = useState("");
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  function handleChange(event) {
    const value = event.target.value;
    setMovieTitle(value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setData(null);
    setVotes({ upvotes: 0, downvotes: 0 });

    facade
      .fetchMovieData(movieTitle)
      .then((res) => setData(res))
      .then()
      .catch((err) => {
        if (err.status) {
          console.log(err.message);
        }
      });

    facade
      .getVotes(movieTitle)
      .then((res) => setVotes(res))
      .then()
      .catch((err) => {
        if (err.status) {
          console.log(err.message);
        }
      });
  }

  function upvote(event) {
    event.preventDefault();
    facade
      .upvote(data.Title)
      .then()
      .catch((err) => {
        if (err.status) {
          console.log(err.message);
        }
      });
    setVotes({ upvotes: votes.upvotes + 1, downvotes: votes.downvotes });
    setIsUpvoted(true);
  }

  function downvote(event) {
    event.preventDefault();
    facade
      .downvote(data.Title)
      .then()
      .catch((err) => {
        if (err.status) {
          console.log(err.message);
        }
      });
    setVotes({ upvotes: votes.upvotes, downvotes: votes.downvotes + 1 });
    setIsDownvoted(true);
  }

  function addToSaved(event) {
    event.preventDefault();
    facade
      .saveMovie(localStorage.getItem("username"), movieTitle)
      .then()
      .catch((err) => {
        if (err.status) {
          console.log(err.message);
        }
      });
    setIsSaved(true);
  }

  const upVoteButton = isUpvoted ? (
    <button
      disabled="disabled"
      style={{ backgroundColor: "lightgreen" }}
      onClick={upvote}
    >
      Upvote
    </button>
  ) : (
    <button onClick={upvote}>Upvote</button>
  );

  const downVoteButton = isDownvoted ? (
    <button disabled="disabled" onClick={downvote}>
      Upvote
    </button>
  ) : (
    <button onClick={downvote}>Downvote</button>
  );

  const savedMovie = isSaved ? (
    <button disabled="disabled" onClick={addToSaved}>
      Saved
    </button>
  ) : (
    <button onClick={addToSaved}> Save </button>
  );

  const toShow = data ? (
    <div className="SearchResults">
      <h3>{data.Title}</h3>
      <div className="SearchRes1">
        <p>
          <b>Year:</b> {data.Year}
        </p>
        <p>
          <b>Genre:</b> {data.Genre}
        </p>
        <p>
          <b>Directors:</b> {data.Director}
        </p>
        <p>
          <b>Writers:</b> {data.Writer}
        </p>
        <p>
          <b>Actors:</b> {data.Actors}
        </p>
        <p>
          <b>Description:</b> {data.Plot}
        </p>
      </div>
      <div className="SearchRes2">
        <img src={data.Poster}></img>
        <p>
          <b>User Rating: </b> yay: {votes.upvotes} nay: {votes.downvotes}
        </p>
        {isLoggedIn && (
          <React.Fragment>
            {upVoteButton}
            {downVoteButton}
            {savedMovie}
          </React.Fragment>
        )}

        <p>
          <b>Ratings:</b>{" "}
        </p>
        {data.Ratings.map((x) => (
          <p key={x.Source}>
            <b>{x.Source}</b> : {x.Value}
          </p>
        ))}
        <p>
          <b>Metascore:</b> {data.Metascore}
        </p>
        <p>
          <b>imdbRating:</b> {data.imdbRating}
        </p>
        <p>
          <b>imdbVotes:</b> {data.imdbVotes}
        </p>
        <p>
          <b>imdbID:</b> {data.imdbID}
        </p>
      </div>
    </div>
  ) : (
    ""
  );

  return (
    <div>
      <form className="Search">
        <h2>Movie Search</h2>
        <input
          placeholder="Movie title"
          id="movieSearch"
          value={movieTitle}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Search</button>
      </form>
      {toShow}
    </div>
  );
}

function ProfilePage() {
  return <div></div>;
}
function TopMovies() {
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
