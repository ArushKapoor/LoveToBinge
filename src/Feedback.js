import React, { useState } from "react";
import { db } from "./firebase.js";
import "./Feedback.css";

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
      <h2>Any other show or changes you would like to see?</h2>
      <form className="feedback__form">
        <div className="feedback__name">
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={"Name"}
          />
          <span style={{ color: "grey", fontSize: "13px", marginLeft: "5px" }}>
            *Optional
          </span>
        </div>
        <div className="feedback__feedback">
          <textarea
            value={feedback}
            onChange={(event) => setFeedback(event.target.value)}
            placeholder={"Your feedback..."}
          />
          <span style={{ color: "red", fontSize: "13px", marginLeft: "5px" }}>
            *Required
          </span>
        </div>
        <button
          className="feedback__submit"
          onClick={sendFeedback}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Feedback;
