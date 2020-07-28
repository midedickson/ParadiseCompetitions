import React, { useEffect } from 'react';
import  { Link } from 'react-router-dom';
import Header from '../components/Heading'
import {
  Row,
  Card,
  Col,
} from "react-bootstrap";
import { getCompetitions } from '../Redux/competitions/competitionAction'
import { connect } from 'react-redux'

const Competitions = ({ competitions, getCompetitions }) => {

  useEffect(() => {
    getCompetitions()
  }, [])

  return (
    <>
      <Header
        text="Active Competitions"
      />
      <Row>
        {
          competitions.map((val, i) => (
            <Col md="6" lg="3" key={val.id}>
            <Link to={`/competitions/${val.id}`}>
              <Card className="competition">
                <Card.Img variant="top" src={val.associated_product.image} height="100" width="180" />
                <Card.Body>
                  <Card.Title>{val.title}</Card.Title>
                    <Card.Text>
                      {val.price}
                    </Card.Text>
                </Card.Body>
              </Card>
            </Link>
            </Col>
          ))
        }
      </Row>

    </>
  )
};

const mapStateToProps = (state) => {
  return {
    competitions: state.competition.all || []
  }
}

const mapDispatchToProps = {
  getCompetitions
}

export default connect(mapStateToProps, mapDispatchToProps)(Competitions);
