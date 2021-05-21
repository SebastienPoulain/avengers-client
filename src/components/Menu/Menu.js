import React from "react";
import "./Menu.css";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

const Menu = ({ user, loggedInStatus, handleLogout }) => {
  let history = useHistory();
  const handleClick = () => {
    axios
      .delete("http://localhost:3001/logout", { withCredentials: true })
      .then(() => {
        handleLogout();
        history.push("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <p>{user?.email}</p>
      {loggedInStatus && (
        <Link to="/logout" onClick={handleClick}>
          Déconnecter
        </Link>
      )}
    </div>
  );
};

export default Menu;
