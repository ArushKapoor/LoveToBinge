import React, { useState, useEffect } from "react";
import Show from "./Show";
import "./CompareShows.css";
import { useStateValue } from "./StateProvider";
import { db } from "./firebase.js";

function CompareShows() {
  // Calling in the data layer/ global variable
  const [{ posts }] = useStateValue();

  const [nextShow, setNextShow] = useState(false);

  console.log(posts);

  const [firstShow, setFirstShow] = useState([]);
  const [secondShow, setSecondShow] = useState([]);

  useEffect(() => {
    console.log("These are posts", posts[0]);

    let firstIndex = Math.floor(Math.random() * posts.length);
    let secondIndex = Math.floor(Math.random() * posts.length);

    while (typeof posts[0] != "undefined" && firstIndex == secondIndex) {
      secondIndex = Math.floor(Math.random() * posts.length);
    }

    console.log(
      `FirstIndex: ${firstIndex} ${posts[firstIndex]}, SecondIndex: ${secondIndex} ${posts[secondIndex]}`
    );

    db.collection("anime")
      .doc(posts[firstIndex])
      .get()
      .then((doc) => {
        if (doc.exists) {
          // console.log("Document data:", doc.data().url);
          setFirstShow(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });

    db.collection("anime")
      .doc(posts[secondIndex])
      .get()
      .then((doc) => {
        if (doc.exists) {
          // console.log("Document data:", doc.data().url);
          setSecondShow(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, [posts, nextShow]);

  const showName = (name) => {
    console.log("Clicked", name);

    let ratingFirst, ratingSecond;

    db.collection("anime")
      .doc(firstShow?.name)
      .get()
      .then((doc) => {
        if (doc.exists) {
          // console.log("Document data:", doc.data().url);
          // setFirstShow(doc.data());
          // console.log("This is data ", doc.data().rating);
          ratingFirst = doc.data().rating;
          db.collection("anime")
            .doc(secondShow?.name)
            .get()
            .then((doc) => {
              if (doc.exists) {
                // console.log("Document data:", doc.data().url);
                // setFirstShow(doc.data());
                // console.log("This is data ", doc.data().rating);
                ratingSecond = doc.data().rating;

                // ELO Rating
                let expectedRatingFirst =
                  1.0 /
                  (1.0 + Math.pow(10, (ratingSecond - ratingFirst) / 400));
                expectedRatingFirst = +(
                  Math.round(expectedRatingFirst + "e+2") + "e-2"
                );

                let expectedRatingSecond =
                  1.0 /
                  (1.0 + Math.pow(10, (ratingFirst - ratingSecond) / 400));
                expectedRatingSecond = +(
                  Math.round(expectedRatingSecond + "e+2") + "e-2"
                );

                let scoreFirst, scoreSecond;
                if (firstShow?.name == name) {
                  scoreFirst = 1;
                  scoreSecond = 0;
                } else {
                  scoreFirst = 0;
                  scoreSecond = 1;
                }

                let newRatingFirst =
                  ratingFirst + 32 * (scoreFirst - expectedRatingFirst);
                let newRatingSecond =
                  ratingSecond + 32 * (scoreSecond - expectedRatingSecond);

                newRatingFirst = +(Math.round(newRatingFirst + "e+2") + "e-2");

                newRatingSecond = +(
                  Math.round(newRatingSecond + "e+2") + "e-2"
                );

                console.log(
                  `newRatingFirst: ${newRatingFirst}, newRatingSecond: ${newRatingSecond}`
                );
                setNextShow(!nextShow);
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
              }
            })
            .catch((error) => {
              console.log("Error getting document:", error);
            });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  };

  return (
    <div className="compare">
      <span onClick={() => showName(firstShow?.name)}>
        <Show img={firstShow?.url} name={firstShow?.name} />
      </span>
      <h1>OR</h1>
      <span onClick={() => showName(secondShow?.name)}>
        <Show img={secondShow?.url} name={secondShow?.name} />
      </span>
    </div>
  );
}

export default CompareShows;
