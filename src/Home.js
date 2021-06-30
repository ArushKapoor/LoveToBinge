import React from "react";
import "./Home.css";
import CompareShows from "./CompareShows";
import { useStateValue } from "./StateProvider";
import { Link } from "react-router-dom";

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
      <h3>Which show would you binge?</h3>
      <h2>Choose Your Show</h2>
      <CompareShows />
      <div className="home__options">
        <button onClick={skip}>Skip</button>
        <Link to="/ranking">
          <button>Ranking</button>
        </Link>
        <Link to="/feedback">
          <button>Feedback Form</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
