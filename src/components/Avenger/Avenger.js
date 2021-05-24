import React, { useState, useEffect } from "react";
import "./Avenger.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Footer from "../Footer/Footer";
import CircularProgress from "@material-ui/core/CircularProgress";
import InfosAvenger from "../InfosAvenger/InfosAvenger";

const Avenger = () => {
  let { id } = useParams();
  const [footer, setFooter] = useState("");
  const [avenger, setAvenger] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_KEY = process.env.REACT_APP_API_PUBLIC_KEY.replace(";", "")
    .replace('"', "")
    .replace('"', "");
  const HASH = process.env.REACT_APP_HASH.replace(";", "")
    .replace('"', "")
    .replace('"', "");

  useEffect(() => {
    axios
      .get(
        `https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_KEY}&hash=${HASH}`
      )
      .then((response) => {
        console.log(response);
        setFooter(response.data.attributionText);
        setAvenger(response.data.data.results[0]);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="avenger">
      {loading ? (
        <CircularProgress className="avenger__loader" />
      ) : (
        <InfosAvenger infos={avenger} />
      )}
      <Footer footer={footer} />
    </div>
  );
};

export default Avenger;
