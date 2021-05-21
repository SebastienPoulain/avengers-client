import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";

const Login = ({ loggedInStatus, handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btn, setBtn] = useState(false);
  const [errors, setErrors] = useState("");
  let history = useHistory();

  useEffect(() => {
    loggedInStatus && redirect();
  }, [loggedInStatus]);

  useEffect(() => {
    if (password !== "" && email !== "") {
      setBtn(true);
    } else if (btn) {
      setBtn(false);
    }
  }, [password, email, btn]);

  const handleChange = (setFunction, event) => {
    const { value } = event.target;
    setFunction(value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let user = {
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:3001/login", { user }, { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in) {
          handleLogin(response.data.user);
          redirect();
        } else {
          setErrors(response.data.errors);
        }
      })
      .catch((error) => console.log("erreurs api: ", error));
  };
  const redirect = () => {
    history.push("/avengers");
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__left"></div>
        <div className="login__right">
          <div className="login__content">
            {errors && <span>{errors}</span>}
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
              <div className="login__inputBox">
                <input
                  onChange={(e) => handleChange(setEmail, e)}
                  name="email"
                  value={email}
                  type="email"
                  required
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="login__inputBox">
                <input
                  onChange={(e) => handleChange(setPassword, e)}
                  name="password"
                  value={password}
                  type="password"
                  required
                />
                <label htmlFor="password">Mot de passe</label>
              </div>

              {btn ? (
                <button type="submit">Connexion</button>
              ) : (
                <button disabled>Connexion</button>
              )}
            </form>
            <div className="login__linkContainer">
              <Link className="login__link" to="/signup">
                Vous voulez devenir un Avenger ? Inscrivez-vous maintenant.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
