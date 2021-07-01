import React, { useState } from "react";
import { db } from "./firebase.js";
import "./Feedback.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function Feedback() {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");

  const sendFeedback = (event) => {
    event.preventDefault();
    if (feedback) {
      db.collection("feedback").doc().set({ name, feedback });
      alert("Submitted Successfully. Thank you for your feedback.");
    } else {
      alert("No Feedback is given");
    }
    setName("");
    setFeedback("");
  };

  return (
    <div className="feedback">
      <div className="feedback__container container">
        <p className="feedback__question font-weight-bold">
          Any other show or changes you would like to see?
        </p>
        <form className="feedback__form">
          <div className="feedback__name">
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

export default Feedback;
