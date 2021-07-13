import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import { useStateValue } from "./StateProvider";
import { db } from "./firebase.js";
import Ranking from "./Ranking";
import Feedback from "./Feedback";
import Loading from "./Loading";

// Everthing in React is put in a components to make it easy to reuse
// the code.

// This is a function based component.
function App() {
  // Calling in the data layer/ global variable
  // filter contains either "anime" or "shows"
  const [{ filter }, dispatch] = useStateValue();

  const [loading, setLoading] = useState(false);

  // useEffect <<<<<<<< POWERFUL
  // Piece of code which runs based on a given condition...
  useEffect(() => {
    setLoading(true);
    // fetching all the data inside collection(filter) from firebase
    db.collection(filter)
      .get()
      .then((querySnapshot) => {
        var entries = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots

          // pushing the show name into the entries array.
          entries.push(doc.data().name);
        });
        // console.log("These are entries", entries);

        // dispatch is the action that we call to fire off items in or out
        // of the data layer.
        dispatch({
          type: "CREATE_POSTS",
          item: {
            posts: entries,
          },
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });

    // Everytime the value of the variable(s) changes inside these
    // square brackets, useEffect will be called again.
  }, [filter]);

  return (
    <div className="app">
      {/* Router component keeps the UI in sync with the URL */}
      <Router>
        {/* Switch component is similar to swtich case used in react 
          but here it uses Route instead of case */}
        <Switch>
          <Route path="/loading">
            <Header />
            <Loading />
          </Route>
          {/* Route component is where we define the url path */}
          <Route path="/ranking">
            {/* These components load the ranking page */}
            <Header />
            <Ranking />
          </Route>
          <Route path="/feedback">
            {/* These components load the feedback page */}
            <Header />
            <Feedback />
          </Route>
          {/* This is the default route */}
          <Route path="/">
            <Header />
            {loading ? <Loading /> : <Home />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

// Anything that we have to use outside of this file, we export it
export default App;
