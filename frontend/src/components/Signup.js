import React, { useState } from 'react';
import { connect } from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import { authRegister } from '../Redux/auth/authAction'

const SignupForm = ({ authRegister, auth }) => {
  const history = useHistory()
  const [ data, setData ] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setData({
      ...data,
      [ e.target.name ]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    authRegister(data)
    history.push('/dashboard')
  }

  return (
    <div>
      <Row>
        <Col lg={4}></Col>
        <Col lg={4}>
          <Form>
            <Form.Group>
              <Form.Label>First name</Form.Label>
              <Form.Control placeholder='first name' name='first_name' type='text' onChange={handleChange} value={data.first_name} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last name</Form.Label>
              <Form.Control placeholder='last name' name='last_name' type='text' onChange={handleChange} value={data.last_name} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control placeholder='username' name='username' type='text' onChange={handleChange} value={data.username} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control placeholder='email' name='email' type='text' onChange={handleChange} value={data.email} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control name='password' type='password' onChange={handleChange} value={data.password} placeholder="Password" />
            </Form.Group>
            <Button variant="primary" onClick={handleSubmit} type="submit">
              Submit
        </Button>
          </Form>
        </Col>
        <Col lg={4}></Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = {
  authRegister
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm)