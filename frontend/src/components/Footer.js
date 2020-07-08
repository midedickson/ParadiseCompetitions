import React from 'react'
import youtube from "../assets/imgs/youtube-brands.svg";
import telegram from "../assets/imgs/telegram-brands.svg";
import facebook from "../assets/imgs/facebook-brands.svg";
import paradise from "../assets/imgs/palmtree.png";
import Button from 'react-bootstrap/Button'

const Footer = () => {
  return (
    <div className="footer">
      <div className="find-us">
        <h3>
          Find us on
        </h3>

        <div className="">
          <img
            src={youtube}
            alt="youtube"
            width="40px"
            height="40px"
          />
          <img
            src={telegram}
            alt="youtube"
            width="40px"
            height="40px"
          />
          <img
            src={facebook}
            alt="youtube"
            width="40px"
            height="40px"
          />
        </div>
        <div>
          <img
            src={paradise}
            alt="paradise"
            height="90px"
          />
        </div>
        <Button variant="light" style={{ padding: '0 9rem', fontWeight: 'bold', borderRadius: '30px' }}>FAQ</Button>
        <h3>
          Payment methods
        </h3>
        <div>
          payments icon here
        </div>
        <div>Dummy lorem text here</div>
        <div> footer credit here </div>
      </div>
    </div>
  )
}

export default Footer;