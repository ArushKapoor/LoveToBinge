import React, {useEffect} from "react";
import "./RankShow.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Aos from "aos";
import "aos/dist/aos.css";

function RankShow({ rank, name, img }) {
  useEffect(()=> {
    Aos.init({delay: 500});
  },[]);

  return (
    // Creating the layout of the cards on Ranking page
    <div data-aos="flip-left" className="rankShow">
      <p className="rankShow__rank font-weight-bold my-auto">{rank}</p>
      <img className="rankShow__img" src={img} />
      <h1 className="rankShow__name font-weight-bold">{name}</h1>
    </div>
  );
}

// Anything that we have to use outside of this file, we export it
export default RankShow;
