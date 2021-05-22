import React from "react";
import "./Menu.css";
import axios from "axios";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import InfoIcon from "@material-ui/icons/Info";
import HomeIcon from "@material-ui/icons/Home";

const Menu = ({ user, handleLogout }) => {
  let history = useHistory();
  let location = useLocation();
  let { id } = useParams();

  const logout = () => {
    axios
      .delete("http://localhost:3001/logout", { withCredentials: true })
      .then(() => {
        handleLogout();
        history.push("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="menu">
      <div className="menu__icons">
        <div
          className={
            location.pathname === "/avengers"
              ? "menu__icon menu__icon--active"
              : "menu__icon"
          }
        >
          <Link to={location.pathname === "/avengers" ? "#" : "/avengers"}>
            <HomeIcon />
            <p>Accueil</p>
          </Link>
        </div>
        <div
          className={
            id ? "menu__icon menu__icon--active " : "menu__icon menu__infoIcon"
          }
        >
          <div className="menu__info">
            <InfoIcon />
            <p>Détails</p>
          </div>
        </div>
      </div>
      <p>{user?.email}</p>
      <ExitToAppIcon onClick={logout} />
    </div>
  );
};

export default Menu;
