import URL from "./settings.js";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

function apiFacade() {
  /* Insert utility-methods from a latter step (d) here (REMEMBER to uncomment in the returned object when you do)*/

  const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
  };
  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };
  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
  };

  const login = (user, password) => {
    const options = makeOptions("POST", true, {
      username: user,
      password: password,
    });
    return fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token);
      });
  };

  const registerUser = (user, password) => {
    const options = makeOptions("POST", true, {
      username: user,
      password: password,
    });
    return fetch(URL + "/api/login/createUser", options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token);
      });
  };

  const fetchData = () => {
    const options = makeOptions("GET", true); // True add's the token
    var base64Url = getToken().split(".")[1];
    var base64 = base64Url.replace("-", "+").replace("_", "/");
    if (JSON.parse(atob(base64)).roles === "user") {
      return fetch(URL + "/api/info/user", options).then(handleHttpErrors);
    } else {
      return fetch(URL + "/api/info/admin", options).then(handleHttpErrors);
    }
  };

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };
  const checkRole = () => {
    var base64Url = getToken().split(".")[1];
    var base64 = base64Url.replace("-", "+").replace("_", "/");
    if (JSON.parse(atob(base64)).roles === "admin") {
      return true;
    } else {
      return false;
    }
  };

  const fetchMovieData = (title) => {
    const options = makeOptions("GET", true); // True add's the token
    return fetch(URL + "/api/movie/search/" + title, options).then(
      handleHttpErrors
    );
  };

  const upvote = (title) => {
    const options = makeOptions("POST", true, { Title: title });
    return fetch(URL + "/api/movie/rating/upvote", options).then(
      handleHttpErrors
    );
  };

  const downvote = (title) => {
    const options = makeOptions("POST", true, { Title: title });
    return fetch(URL + "/api/movie/rating/downvote", options).then(
      handleHttpErrors
    );
  };

  const getVotes = (title) => {
    const options = makeOptions("GET", true);
    return fetch(URL + "/api/movie/rating/getrating/" + title, options).then(
      handleHttpErrors
    );
  };

  const saveMovie = (user, title) => {
    const options = makeOptions("POST", true, {
      username: user,
      Title: title,
    });
    return fetch(URL + "/api/info/user/addtosaved/", options).then(
      handleHttpErrors
    );
  };
  const getTopMovies = () => {
    const options = makeOptions("GET", true);
    return fetch(URL + "/api/movie/top5", options).then(handleHttpErrors);
  };
  const getSavedList = (username) => {
    const options = makeOptions("GET", true);
    return fetch(URL + "/api/info/user/getsavedlist/" + username, options).then(
      handleHttpErrors
    );
  };

  const changeUserPassword = (user, newPassword) => {
    const options = makeOptions("POST", true, {
      username: user,
      password: newPassword,
    });
    return fetch(URL + "/api/info/user/changepassword/", options).then(
      handleHttpErrors
    );
  };
  const getAllUsers = () => {
    const options = makeOptions("GET", true);
    return fetch(URL + "/api/admin/allUsers/", options).then(handleHttpErrors);
  };

  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    registerUser,
    logout,
    fetchData,
    fetchMovieData,
    upvote,
    downvote,
    getVotes,
    saveMovie,
    getTopMovies,
    getSavedList,
    changeUserPassword,
    getAllUsers,
    checkRole,
  };
}
const facade = apiFacade();
export default facade;
