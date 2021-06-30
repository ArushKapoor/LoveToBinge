import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import { useStateValue } from "./StateProvider";
import { db } from "./firebase.js";
import Ranking from "./Ranking";
import Feedback from "./Feedback";

function App() {
  // Calling in the data layer/ global variable
  const [{ filter }, dispatch] = useStateValue();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log("Filter in App.js ", filter);
    db.collection(filter)
      .get()
      .then((querySnapshot) => {
        var entries = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
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
  }, [filter]);

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/ranking">
            <Header />
            <Ranking />
          </Route>
          <Route path="/feedback">
            <Header showOptions={false} />
            <Feedback />
          </Route>
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
