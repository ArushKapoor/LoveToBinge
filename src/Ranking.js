import React, { useState, useEffect } from "react";
import "./Ranking.css";
import { useStateValue } from "./StateProvider";
import { db } from "./firebase.js";
import RankShow from "./RankShow";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function Ranking() {
  const [shows, setShows] = useState([]);

  const [{ posts, filter }] = useStateValue();

  useEffect(() => {
    db.collection(filter)
      .get()
      .then((querySnapshot) => {
        var entries = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          entries.push(doc.data());
        });
        entries.sort(function (a, b) {
          return b.rating - a.rating;
        });
        setShows(entries);
        console.log("Entries: ", entries);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, [filter]);

  return (
    <div className="ranking">
      {shows.map((show, index) => (
        <RankShow rank={index + 1} name={show?.name} img={show?.url} />
      ))}
    </div>
  );
}

export default Ranking;
