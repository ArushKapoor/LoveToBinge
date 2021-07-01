import React from "react";
import "./Home.css";
import CompareShows from "./CompareShows";
import { useStateValue } from "./StateProvider";
import { Link } from "react-router-dom";
import Filters from "./Filters";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const [{ skipShow }, dispatch] = useStateValue();

  const skip = () => {
    dispatch({
      type: "CHANGE_SHOW",
      skipShow: !skipShow,
    });
  };

  return (
    <div className="home">
      <p className="home__question">What would you binge?</p>
      <div className="home__filters">
        <Filters />
      </div>
      <CompareShows />
      <div className="home__options">
        <button className="home__skip" onClick={skip}>
          Skip
        </button>
        <Link to="/ranking">
          <button className="home__ranking">Ranking</button>
        </Link>
        <Link to="/feedback">
          <button className="home__feedback">Feedback</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
