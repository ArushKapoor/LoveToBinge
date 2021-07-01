import React, { useState, useEffect } from "react";
import "./Ranking.css";
import { useStateValue } from "./StateProvider";
import { db } from "./firebase.js";
import RankShow from "./RankShow";
import Filters from "./Filters";
import { Carousel } from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function Ranking() {
  const [shows, setShows] = useState([]);
  const [topShows, setTopShows] = useState([]);

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
        var temp = [];
        setShows(entries);
        for (var i = 0; i < 2; i++) {
          temp.push(entries[i]);
        }
        setTopShows(temp);
        console.log("Entries: ", entries);
        // console.log("Top Entries: ", topShows);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, [filter]);

  return (
    <div className="ranking">
      <div className="ranking__container container">
        {shows.length != 0 && (
          <Carousel
            className="ranking__carousel"
            nextLabel={""}
            prevLabel={""}
            interval={4000}
            prevIcon={""}
            nextIcon={""}
            slide={true}
            wrap={true}
            ref={React.createRef()}
          >
            {topShows?.map((show, index) => (
              <Carousel.Item>
                <img
                  className="carousel__img"
                  src={show?.url}
                  alt={show?.name}
                  key={index}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        )}
        <Filters />
        {shows.map((show, index) => (
          <RankShow rank={index + 1} name={show?.name} img={show?.url} />
        ))}
      </div>
    </div>
  );
}

export default Ranking;
