import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import "./App.css";
import Cards from "./components/Cards/Cards";
import Menu from "./components/Menu/Menu";
import Avenger from "./components/Avenger/Avenger";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    loginStatus();
  }, [isLoggedIn]);

  const loginStatus = () => {
    axios
      .get("http://localhost:3001/logged_in", { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in) {
          handleLogin(response.data.user);
        } else {
          handleLogout();
        }
      })
      .catch((error) => console.log("erreurs api:", error));
  };

  const handleLogin = (data) => {
    setIsLoggedIn(true);
    setUser(data);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({});
  };

  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Header />
            <Home loggedInStatus={isLoggedIn} />
            <Footer />
          </Route>

          <Route exact path="/login">
            <Header />
            <Login handleLogin={handleLogin} loggedInStatus={isLoggedIn} />
            <Footer />
          </Route>

          <Route exact path="/signup">
            <Header />
            <Signup handleLogin={handleLogin} loggedInStatus={isLoggedIn} />
            <Footer />
          </Route>

          {isLoggedIn ? (
            <Route exact path="/avengers/:id">
              <Menu user={user} handleLogout={handleLogout} />
              <Avenger />
            </Route>
          ) : (
            <Redirect to="/" from="/avengers/:id" />
          )}

          {isLoggedIn ? (
            <Route exact path="/avengers">
              <Menu user={user} handleLogout={handleLogout} />
              <Cards />
            </Route>
          ) : (
            <Redirect to="/" from="/avengers" />
          )}

          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
