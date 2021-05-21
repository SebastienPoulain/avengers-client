import React, { useRef, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Home.css";
const Home = ({ loggedInStatus }) => {
  const [btn, setBtn] = useState(false);
  const refWolverine = useRef(null);
  let history = useHistory();

  useEffect(() => {
    refWolverine?.current?.classList.add("home__startingImg");
    setTimeout(() => {
      refWolverine?.current?.classList.remove("home__startingImg");
      setBtn(true);
    }, 1000);
  }, []);

  useEffect(() => {
    loggedInStatus && redirect();
  }, [loggedInStatus]);

  const redirect = () => {
    history.push("/avengers");
  };

  const setLeftImg = () => {
    refWolverine.current.classList.add("home__leftImg");
  };

  const setRightImg = () => {
    refWolverine.current.classList.add("home__rightImg");
  };

  const clearImg = () => {
    if (refWolverine.current.classList.contains("home__leftImg")) {
      refWolverine.current.classList.remove("home__leftImg");
    } else if (refWolverine.current.classList.contains("home__rightImg")) {
      refWolverine.current.classList.remove("home__rightImg");
    }
  };

  const displayBtn = btn && (
    <>
      <div
        onMouseOver={setLeftImg}
        onMouseOut={clearImg}
        className="home__leftBox"
      >
        <Link className="home__btns" to="/signup">
          Inscription
        </Link>
      </div>
      <div
        onMouseOver={setRightImg}
        onMouseOut={clearImg}
        className="home__rightBox"
      >
        <Link className="home__btns" to="/login">
          Connexion
        </Link>
      </div>
    </>
  );

  return (
    <main ref={refWolverine} className="home">
      {displayBtn}
    </main>
  );
};

export default Home;
