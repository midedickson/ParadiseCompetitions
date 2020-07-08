import React from 'react';
import Header from './/Heading'
import Image from '../assets/imgs/bottle.jpg'
import {
  Row,
  Card,
  Col,
} from "react-bootstrap";

const images = [ Image, Image, Image, ]

const GiftShop = () => {
  return (
    <>
      <Header
        text="Gift Shop"
      />
      <Row style={{ border: '1px solid gray', padding: '10px' }}>
        {
          images.map((val, i) => (
            <Col md="6" lg="4">
              <Card style={{}}>
                <Card.Img variant="top" src={val} width="180" />
                <Card.Body>
                  <Card.Title>eCard Mother's Day</Card.Title>
                </Card.Body>
              </Card></Col>
          ))
        }
      </Row>


    </>
  )
};

export default GiftShop;