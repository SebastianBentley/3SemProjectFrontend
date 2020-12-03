import "./App.css";
import React, {useState, useEffect} from "react";
import facade from "./apiFacade";
export default function MovieSearch({isLoggedIn}) {
    const [data, setData] = useState(null);
    const [votes, setVotes] = useState({upvotes: 0, downvotes: 0});
    const [movieTitle, setMovieTitle] = useState("");
    const [isUpvoted, setIsUpvoted] = useState(false);
    const [isDownvoted, setIsDownvoted] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [title, setTitle] = useState("");


    function handleChange(event) {
        const value = event.target.value;
        setMovieTitle(value);
        setIsUpvoted(false);
        setIsDownvoted(false);
        setIsSaved(false);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setData(null);
        setVotes({upvotes: 0, downvotes: 0});

        facade.fetchMovieData(movieTitle).then((res) => setData(res)).then(res => setTitle(res.Title)).catch((err) => {
            if (err.status) {
                console.log(err.message);
            }
        })

    }

    useEffect(() => {
        facade.getVotes(title).then((res) => setVotes(res)).then().catch((err) => {
            if (err.status) {
                console.log(err.message);
            }
        });
    }, [title]);

    function upvote(event) {
        event.preventDefault();
        facade.upvote(data.Title).then().catch((err) => {
            if (err.status) {
                console.log(err.message);
            }
        });
        setVotes({
            upvotes: votes.upvotes + 1,
            downvotes: votes.downvotes
        });
        setIsUpvoted(true);
    }

    function downvote(event) {
        event.preventDefault();
        facade.downvote(data.Title).then().catch((err) => {
            if (err.status) {
                console.log(err.message);
            }
        });
        setVotes({
            upvotes: votes.upvotes,
            downvotes: votes.downvotes + 1
        });
        setIsDownvoted(true);
    }

    function addToSaved(event) {
        event.preventDefault();
        facade.saveMovie(localStorage.getItem("username"), data.Title).then().catch((err) => {
            if (err.status) {
                console.log(err.message);
            }
        });
        setIsSaved(true);
    }

    const upVoteButton = isUpvoted ? (
        <button disabled="disabled"
            style={
                {backgroundColor: "lightgreen"}
            }
            onClick={upvote}>
            Upvote
        </button>
    ) : (
        <button onClick={upvote}>Upvote</button>
    );

    const downVoteButton = isDownvoted ? (
        <button disabled="disabled"
            onClick={downvote}>
            Upvote
        </button>
    ) : (
        <button onClick={downvote}>Downvote</button>
    );

    const savedMovie = isSaved ? (
        <button disabled="disabled"
            onClick={addToSaved}>
            Saved
        </button>
    ) : (
        <button onClick={addToSaved}>
            Save
        </button>
    );

    const toShow = data ? (
        <div className="SearchResults">
            <h3>{
                data.Title
            }</h3>
            <div className="SearchRes1">
                <p>
                    <b>Year:</b>
                    {
                    data.Year
                } </p>
                <p>
                    <b>Genre:</b>
                    {
                    data.Genre
                } </p>
                <p>
                    <b>Directors:</b>
                    {
                    data.Director
                } </p>
                <p>
                    <b>Writers:</b>
                    {
                    data.Writer
                } </p>
                <p>
                    <b>Actors:</b>
                    {
                    data.Actors
                } </p>
                <p>
                    <b>Description:</b>
                    {
                    data.Plot
                } </p>
            </div>
            <div className="SearchRes2">
                <img src={
                    data.Poster
                }></img>
                <p>
                    <b>User Rating:
                    </b>
                    yay: {
                    votes.upvotes
                }
                    nay: {
                    votes.downvotes
                } </p>
                {
                isLoggedIn && (
                    <React.Fragment> {upVoteButton}
                        {downVoteButton}
                        {savedMovie} </React.Fragment>
                )
            }

                <p>
                    <b>Ratings:</b>
                    {" "} </p>
                {
                data.Ratings.map((x) => (
                    <p key={
                        x.Source
                    }>
                        <b>{
                            x.Source
                        }</b>
                        : {
                        x.Value
                    } </p>
                ))
            }
                <p>
                    <b>Metascore:</b>
                    {
                    data.Metascore
                } </p>
                <p>
                    <b>imdbRating:</b>
                    {
                    data.imdbRating
                } </p>
                <p>
                    <b>imdbVotes:</b>
                    {
                    data.imdbVotes
                } </p>
                <p>
                    <b>imdbID:</b>
                    {
                    data.imdbID
                } </p>
            </div>
        </div>
    ) : ("");

    return (
        <div>
            <form className="Search">
                <h2>Movie Search</h2>
                <input placeholder="Movie title" id="movieSearch"
                    value={movieTitle}
                    onChange={handleChange}/>
                <button onClick={handleSubmit}>Search</button>
            </form>
            {toShow} </div>
    );
}
