import React, { useState, useEffect } from "react";
import "./Ranking.css";
import { useStateValue } from "./StateProvider";
import { db } from "./firebase.js";
import RankShow from "./RankShow";
import Filters from "./Filters";
import { Carousel } from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Aos from "aos";
import Loading from "./Loading";

function Ranking() {
  // Creating a variable array to store all the shows from collection
  const [shows, setShows] = useState([]);

  // Creating a variable array to store the top 2 shows from shows
  const [topShows, setTopShows] = useState([]);

  // Calling in the data layer/ global variable
  // filter contains either "anime" or "shows"
  const [{ filter, loading }] = useStateValue();

  // useEffect <<<<<<<< POWERFUL
  // Piece of code which runs based on a given condition...
  useEffect(() => {
    Aos.init({ delay: 500 });
    // console.log("Ranking.js has been called");
    // fetching all the show data from firebase
    db.collection(filter)
      .get()
      .then((querySnapshot) => {
        var entries = [];
        // console.log("Ranking.js Started Fetching data from firebase");
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots

          // storing the shows data inside entries
          entries.push(doc.data());
        });

        // console.log("Ranking.js has completely fetched entries");

        // Sorting the entries in decending order
        entries.sort(function (a, b) {
          return b.rating - a.rating;
        });

        // console.log("Ranking.js has sorted the entries");

        // setting the value of entries to shows
        setShows(entries);

        // creating a temporary variable to copy top 2 shows data
        var temp = [];
        for (var i = 0; i < 5; i++) {
          temp.push(entries[i]);
        }
        // console.log("Ranking.js has completed the job");

        // setting the value of temp to topShows
        setTopShows(temp);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });

    // Everytime the value of the variable(s) changes inside these
    // square brackets, useEffect will be called again.
  }, [filter]);

  return (
    <div className="ranking">
      {(shows.length == 0 || loading) && <Loading />}
      {/* Only show the carousel when shows array is not empty */}
      {shows.length != 0 && !loading && (
        // Carousel attributes-
        // label - to show text on the right or left side
        // icon - to show the right arrow aur left arrow
        // interval - time interval between each image
        // slide - to give sliding animation on image change
        // wrap - to wrap the image? (no idea, copied from Vivek)
        <div>
          <Carousel
            className="ranking__carousel"
            nextLabel={""}
            prevLabel={""}
            interval={4000}
            prevIcon={""}
            nextIcon={""}
            slide={true}
            wrap={true}
          >
            {/* Traversing through each show in topShows and displaying it 
            in Carousel Item */}
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
          <Filters />
          {shows.map((show, index) => (
            <div data-aos="flip-left">
              <RankShow rank={index + 1} name={show?.name} img={show?.url} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Anything that we have to use outside of this file, we export it
export default Ranking;
