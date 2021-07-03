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
    <div data-aos="flip-left" className="rankShow ml-2">
      <p className="rankShow__rank font-weight-bold my-auto">{rank}</p>
      <img className="rankShow__img" src={img} />
      <h1 className="rankShow__name font-weight-bold">{name}</h1>
    </div>
  );
}

export default RankShow;
