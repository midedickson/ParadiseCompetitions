import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import Image from "../assets/imgs/bottle.jpg";
import { connect } from 'react-redux'
import { getFeatured } from '../Redux/competitions/competitionAction'


const image = [ Image, Image, Image, Image ]

const LandCarousel = ({ featured, getFeatured }) => {
  const [ index, setIndex ] = useState(0);


  useEffect(() => {
    getFeatured()
  }, [])
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {
        featured.map((val, i) => (
          <Carousel.Item key={i}>
            <img
              className="d-block w-100"
              src={val.associated_product.image}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>{val.title}</h3>
              <p>{val.description}</p>
            </Carousel.Caption>
          </Carousel.Item>

        ))
      }
    </Carousel>
  );
};

const mapStateToProps = (state) => {
  return {
    featured: state.competition.featuredCompetition || []
  }
}

const mapDispatchToProps = {
  getFeatured
}

export default connect(mapStateToProps, mapDispatchToProps)(LandCarousel);