import React, { useState } from 'react';
import { connect } from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { authLogin } from '../Redux/auth/authAction'
import { useHistory } from "react-router-dom";

const LoginForm = ({ authLogin, auth }) => {
  const history = useHistory()
  const [ data, setData ] = useState({
    username: '',
    password: ''
  })

  const handleChange = (e) => {
    setData({
      ...data,
      [ e.target.name ]: e.target.value
    })
    console.log(data)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    authLogin(data)
    history.push('/dashboard')
  }

  return (
    <div>
      <Row>
        <Col lg={4}></Col>
        <Col lg={4}>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control name='username' type="email" placeholder="Enter email" onChange={handleChange} value={data.username} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control name='password' type='password' onChange={handleChange} value={data.password} placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
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
  authLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)