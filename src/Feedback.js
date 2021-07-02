import React, { useState } from "react";
import { db } from "./firebase.js";
import "./Feedback.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function Feedback() {
  // Creating a variable to store the name and feedback of the user
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");

  // Method to send the feedback to firebase
  const sendFeedback = (event) => {
    event.preventDefault(); // this stops the refresh

    // if feedback is not empty, send it to firebase
    if (feedback) {
      db.collection("feedback").doc().set({ name, feedback });
      alert("Submitted Successfully. Thank you for your feedback.");
    } else {
      alert("No Feedback is given");
    }

    // resetting name and feedback to blank
    setName("");
    setFeedback("");
  };

  return (
    // Setting up the feedback form
    <div className="feedback">
      <div className="feedback__container container">
        <p className="feedback__question font-weight-bold">
          Any other show or changes you would like to see?
        </p>
        <form className="feedback__form">
          <div className="feedback__name">
            {/* We are listening to when the input is changed to set the value as name as it changes
            and finally when the submit button is clicked we set the input value as name */}
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder={"Name"}
            />
          </div>
          <div className="feedback__feedback">
            <textarea
              value={feedback}
              onChange={(event) => setFeedback(event.target.value)}
              placeholder={"Your feedback..."}
            />
            <span>*</span>
          </div>
          <div className="feedback__submit">
            <button onClick={sendFeedback} type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Anything that we have to use outside of this file, we export it
export default Feedback;
