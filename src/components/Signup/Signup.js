import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import "./Signup.css";

const Signup = ({ handleLogin, loggedInStatus }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [errors, setErrors] = useState("");
  let history = useHistory();

  useEffect(() => {
    loggedInStatus && redirect();
  }, [loggedInStatus]);

  const handleChange = (setFunction, event) => {
    const { value } = event.target;
    setFunction(value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let user = {
      email: email,
      password: password,
      password_confirmation: password_confirmation,
    };
    axios
      .post("http://localhost:3001/users", { user }, { withCredentials: true })
      .then((response) => {
        if (response.data.status === "created") {
          handleLogin(response.data.user);
          redirect();
        } else {
          if (response.data.errors[0] === "Email has already been taken")
            setErrors("L'adresse courriel existe déjà");
          else setErrors(response.data.errors);
        }
      })
      .catch((error) => console.log("erreurs api:", error));
  };
  const redirect = () => {
    history.push("/avengers");
  };

  const btn =
    email === "" || password === "" || password !== password_confirmation ? (
      <button disabled>Inscription</button>
    ) : (
      <button type="submit">Inscription</button>
    );

  return (
    <div className="signup">
      <div className="signup__container">
        <div className="signup__left"></div>
        <div className="signup__right">
          <div className="signup__content">
            {errors && <span>{errors}</span>}

            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
              <div className="signup__inputBox">
                <input
                  onChange={(e) => handleChange(setEmail, e)}
                  value={email}
                  type="email"
                  id="email"
                  name="email"
                  required
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="signup__inputBox">
                <input
                  onChange={(e) => handleChange(setPassword, e)}
                  value={password}
                  type="password"
                  id="password"
                  name="password"
                  required
                />
                <label htmlFor="password">Mot de passe</label>
              </div>

              <div className="signup__inputBox">
                <input
                  onChange={(e) => handleChange(setPassword_confirmation, e)}
                  name="password_confirmation"
                  value={password_confirmation}
                  type="password"
                  id="confirmPassword"
                  required
                />
                <label htmlFor="confirmPassword">
                  Confirmer le mot de passe
                </label>
              </div>
              {btn}
            </form>
            <div className="signup__linkContainer">
              <Link className="signup__link" to="/login">
                Déjà membre des Avengers ? Connectez-vous.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
