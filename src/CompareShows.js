import React, { useState, useEffect } from "react";
import Show from "./Show";
import "./CompareShows.css";
import { useStateValue } from "./StateProvider";
import { db } from "./firebase.js";

function CompareShows() {
  // Calling in the data layer/ global variable

  // posts is an array containing data about all the shows in
  // selected collection
  // (posts[i].name - Name of the show)
  // (posts[i].rating - Current rating of the show)
  // (posts[i].url - Image url of the show)

  // skipShow contains a boolean value just to recall useEffect
  // everytime skip button is clicked

  // filter contains either "anime" or "shows"
  const [{ posts, skipShow, filter }] = useStateValue();

  // Creating a boolean variable and method to set its value
  const [nextShow, setNextShow] = useState(false);

  // firstShow will contain first show called...
  const [firstShow, setFirstShow] = useState([]);
  const [secondShow, setSecondShow] = useState([]);

  // useEffect <<<<<<<< POWERFUL
  // Piece of code which runs based on a given condition...
  useEffect(() => {
    // getting a random index between 0 and posts.length
    let firstIndex = Math.floor(Math.random() * posts.length);
    let secondIndex = Math.floor(Math.random() * posts.length);

    // if posts data has not been fetched, wait
    // else makes sure the firstIndex is not equal to the secondIndex
    while (typeof posts[0] != "undefined" && firstIndex == secondIndex) {
      secondIndex = Math.floor(Math.random() * posts.length);
    }

    // fetching the data of the show at firstIndex from firebase
    // filter collection
    db.collection(filter)
      .doc(posts[firstIndex])
      .get()
      .then((doc) => {
        if (doc.exists) {
          // storing the show data in firstShow
          setFirstShow(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });

    // fetching the data of the show at secondIndex from firebase
    // filter collection
    db.collection(filter)
      .doc(posts[secondIndex])
      .get()
      .then((doc) => {
        if (doc.exists) {
          // storing the show data in secondShow
          setSecondShow(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });

    // Everytime the value of the variable(s) changes inside these
    // square brackets, useEffect will be called again.
  }, [posts, nextShow, skipShow]);

  // this method
  const showName = (name) => {
    console.log("Clicked", name);

    let ratingFirst, ratingSecond;

    // console.log("Document data:", doc.data().url);
    // setFirstShow(doc.data());
    // console.log("This is data ", doc.data().rating);
    ratingFirst = firstShow?.rating;

    // console.log("Document data:", doc.data().url);
    // setFirstShow(doc.data());
    // console.log("This is data ", doc.data().rating);
    ratingSecond = secondShow?.rating;

    // Using elo rating system to update ranking based upon
    // which show was selected by the user

    // ELO Rating
    // Formula Ea = 1 / (1 + 10 ^ ((Rb - Ra) / 400))
    // Ea = Expected score of a, Ra = Current rating of a
    let expectedRatingFirst =
      1.0 / (1.0 + Math.pow(10, (ratingSecond - ratingFirst) / 400));
    expectedRatingFirst = +(Math.round(expectedRatingFirst + "e+2") + "e-2");

    let expectedRatingSecond =
      1.0 / (1.0 + Math.pow(10, (ratingFirst - ratingSecond) / 400));
    expectedRatingSecond = +(Math.round(expectedRatingSecond + "e+2") + "e-2");

    let scoreFirst, scoreSecond;

    // Check which show was selected by the user
    if (firstShow?.name == name) {
      scoreFirst = 1;
      scoreSecond = 0;
    } else {
      scoreFirst = 0;
      scoreSecond = 1;
    }

    // Formula new rating = rating + 32 / (score - expected score)
    // score = 1 - Win, 0 - Lose
    let newRatingFirst = ratingFirst + 32 * (scoreFirst - expectedRatingFirst);
    let newRatingSecond =
      ratingSecond + 32 * (scoreSecond - expectedRatingSecond);

    // Rounding off the rating to 2 decimal places
    newRatingFirst = +(Math.round(newRatingFirst + "e+2") + "e-2");

    newRatingSecond = +(Math.round(newRatingSecond + "e+2") + "e-2");

    // updating the value of rating in the firebase
    db.collection(filter)
      .doc(firstShow?.name)
      .update({
        rating: newRatingFirst,
      })
      .then(() => {
        console.log("Rating successfully updated for ", firstShow?.name);
      })
      .catch((error) => {
        console.log("Caught error:", error);
      });

    db.collection(filter)
      .doc(secondShow?.name)
      .update({
        rating: newRatingSecond,
      })
      .then(() => {
        console.log("Rating successfully updated for ", secondShow?.name);
      })
      .catch((error) => {
        console.log("Caught error:", error);
      });

    // changing the shows
    setNextShow(!nextShow);
  };

  return (
    <div className="compare">
      {/* Dont use span directly in css styles because it will affect other span
      tags in other js files as well */}
      <span className="compare__show" onClick={() => showName(firstShow?.name)}>
        <Show img={firstShow?.url} name={firstShow?.name} />
      </span>
      <p className="compare__or">OR</p>
      {/* () => showName("") used to send argument for the show that was
      chosen by the user to showName method */}
      <span
        className="compare__show"
        onClick={() => showName(secondShow?.name)}
      >
        <Show img={secondShow?.url} name={secondShow?.name} />
      </span>
    </div>
  );
}

// Anything that we have to use outside of this file, we export it
export default CompareShows;
