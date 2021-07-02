import React from "react";
import "./Home.css";
import CompareShows from "./CompareShows";
import { useStateValue } from "./StateProvider";
import { Link } from "react-router-dom";
import Filters from "./Filters";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function Home() {
  // Calling in the data layer/ global variable

  // skipShow contains a boolean value just to recall useEffect
  // everytime skip button is clicked
  const [{ skipShow }, dispatch] = useStateValue();

  // method which dispatches new value of skip to trigger
  // useEffect
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
        {/* Link is similar to href but there is no need to reload */}
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

// Anything that we have to use outside of this file, we export it
export default Home;
