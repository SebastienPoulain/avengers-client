import React, { useState, useEffect } from "react";
import "./Cards.css";
import FlipMove from "react-flip-move";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

const Cards = () => {
  const [avengers, setAvengers] = useState([]);
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
        `https://gateway.marvel.com/v1/public/series/9085/characters?ts=1&apikey=${API_KEY}&hash=${HASH}&limit=100`
      )
      .then((response) => {
        setAvengers(response.data.data.results);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="cards">
      <h1>Catalogue des avengers</h1>
      {loading ? (
        <CircularProgress className="cards__loader" />
      ) : (
        <FlipMove>
          {avengers.map((avenger) => (
            <Link key={avenger.id} to={`/avengers/${avenger.id}`}>
              <Card avenger={avenger} />
            </Link>
          ))}
        </FlipMove>
      )}
    </div>
  );
};

export default Cards;
