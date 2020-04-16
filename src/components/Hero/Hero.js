import React from "react";
import "./Hero.css";
import Aspens from "../../assets/aspens.jpg";
import Down from "../../assets/down.png";
import * as Scroll from "react-scroll";
import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";

const Hero = () => {
  return (
    <div>
      <div className="hero">
        <div className="hero-text">
          <p>
            It's <code>65</code> degrees and <code>sunny</code> in Vail today.
          </p>
          <p>A great day to ride a bike!</p>
        </div>
        <div className="nav-down">
          <Link to="trails" spy={true} smooth={true} className="circle-button">
            <img className="arrow" src={Down}></img>
          </Link>
          <Link className="explore-trails" to="trails" spy={true} smooth={true}>
            Explore trails
          </Link>
        </div>
      </div>
      <Element className="trails" name="trails"></Element>
    </div>
  );
};

export default Hero;
