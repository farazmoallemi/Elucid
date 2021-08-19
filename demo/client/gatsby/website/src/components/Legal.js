import React from 'react'
import Fade from 'react-reveal/Fade'

const Legal = props => (
  <section id="five" className="wrapper style2 special fade inactive">
    <Fade duration={2500}>
      <div className="container">
        <header>
          <h2>This project is licensed under the ISC License.</h2>
        </header>
        <a href="https://www.npmjs.com/package/elucid.js" className="button">
          Get Elucid
        </a>
      </div>
    </Fade>
  </section>
)
export default Legal
