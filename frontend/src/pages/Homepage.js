import React from 'react';
import Carousel from '../components/Carousel';
import HowItWorks from '../components/HowItWorks';
import Competitions from './Competitons';
import Winners from '../components/Winners';
import CustomerSatisfation from '../components/CustomerSatisfation';
import GiftShop from '../components/GiftShop';

const Homepage = () => {
  return (
    <>
      <Carousel />
      <HowItWorks />
      <Competitions />
      <Winners />
      <CustomerSatisfation />
      <GiftShop />
    </>
  );
}

export default Homepage;
