import React from "react";
import "./Home.css";
import CompareShows from "./CompareShows";
import { useStateValue } from "./StateProvider";

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
      <button onClick={skip}>Skip</button>
    </div>
  );
}

export default Home;
