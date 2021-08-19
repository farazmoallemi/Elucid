import React from 'react'
import Elucid_Logo from '../assets/images/Elucid_Logo1.jpg'
import { Link as ScrollLink } from 'react-scroll'

// first part of the home page component
const Banner = props => (
  <section id="banner">
    <div className="content">
      <header>
        <h2>ELUCID</h2>
        <p>
        Improved GraphQL error messaging & handling in a lightweight library.
          <br />
        </p>
      </header>
      <span className="image" id="home-lantern">
        <img src={Elucid_Logo} alt="intro" />
      </span>
    </div>
    <ScrollLink
      to="one"
      className="goto-next"
      activeClass="active"
      smooth={true}
      offset={50}
      duration={1500}
      spy={true}
    >
      Next
    </ScrollLink>
  </section>
);

export default Banner
