import React, { useState, useEffect } from "react";
import Show from "./Show";
import "./CompareShows.css";
import { useStateValue } from "./StateProvider";
import { db } from "./firebase.js";

function CompareShows() {
  // Calling in the data layer/ global variable
  const [{ posts }] = useStateValue();

  console.log(posts);

  const [firstShow, setFirstShow] = useState([]);
  const [secondShow, setSecondShow] = useState([]);

  useEffect(() => {
    console.log("These are posts", posts[0]);

    console.log(Math.random());

    db.collection("anime")
      .doc(posts[0])
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
      .doc(posts[1])
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
  }, [posts]);

  const showName = (name) => {
    console.log("Clicked", name);
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
