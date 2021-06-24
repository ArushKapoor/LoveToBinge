import React from "react";
import "./Home.css";
import CompareShows from "./CompareShows";

function Home() {
  return (
    <div className="home">
      <h3>Which show would you binge?</h3>
      <h2>Choose Your Show</h2>
      <CompareShows />
    </div>
  );
}

export default Home;
