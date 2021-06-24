import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import { useStateValue } from "./StateProvider";
import { db } from "./firebase.js";

function App() {
  // Calling in the data layer/ global variable
  const [{}, dispatch] = useStateValue();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // db.collection("anime").onSnapshot((snapshot) => {
    //   setPosts(snapshot.docs.map((doc) => doc.data()));
    // });

    db.collection("anime")
      .get()
      .then((querySnapshot) => {
        var entries = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          entries.push(doc.data().name);
        });
        console.log("These are entries", entries);
        dispatch({
          type: "CREATE_POSTS",
          item: {
            posts: entries,
          },
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    // db.collection("anime")
    //   .get()
    //   .then(
    //     dispatch({
    //       type: "CREATE_POSTS",
    //       item: {
    //         posts: posts,
    //       },
    //     })
    //   )
    //   .catch((error) => {
    //     console.log("Found error: ", error);
    //   });
  }, []);
  useEffect(() => {}, [posts]);
  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   db.collection("anime").onSnapshot((snapshot) => {
  //     setPosts(snapshot.docs.map((doc) => doc.data()));
  //   });
  // }, []);

  // console.log(posts);
  //   var cityRef = db.collection('anime').doc(posts[1]?.name);

  //   var setWithMerge = cityRef.update({
  //       rating: 1000,
  //   }, { merge: true }).then(() => {
  //     console.log("Worked fine");
  //   }).catch((error) => {
  //     console.log("Caught error:", error)
  //   });

  // var docRef = db.collection("anime").doc(posts[0]?.name);

  // docRef
  //   .get()
  //   .then((doc) => {
  //     if (doc.exists) {
  //       console.log("Document data:", doc.data().rating);
  //     } else {
  //       // doc.data() will be undefined in this case
  //       console.log("No such document!");
  //     }
  //   })
  //   .catch((error) => {
  //     console.log("Error getting document:", error);
  //   });

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
