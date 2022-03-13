import React, { useState } from 'react';

import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Stack, Form, Row, Col, Card } from 'react-bootstrap';
import './App.css';
import axios from 'axios';


const App = () => {

  const [results, setResults] = useState([])
  
  const cleanAll = () => {
    setResults([])
    cleanInput()
    document.getElementById("error").innerHTML = ''
  }
  const cleanInput = () => {
    document.getElementById("input").value = null
  }
  
  const handleSubmit = (event) => {
    document.getElementById("error").innerHTML = ''

    const input = document.getElementById("input").value
    if (input.length == 0) {
      document.getElementById("error").innerHTML = 'Please add input'
    } else if (input < 0) {
      document.getElementById("error").innerHTML = 'Please provide a valid input.'
    } else {
      axios.get(`http://127.0.0.1:8000/tpd/${input}`)
        .then(res => {
          if (res.data == 'no data') {
            document.getElementById("error").innerHTML = 'No result'
          } else {
            cleanInput()
            setResults(results => [...results, res.data])
          }
        })
        .catch(error => {
          document.getElementById("error").innerHTML = 'No result'
        })
    }
  };
  
  return (
<Container>
<br/>

  <Row className="justify-content-md-center">
    <Card style={{ width: '28rem' }}>
      <Card.Header as="h5">Title</Card.Header>
      <Card.Body>
        <Card.Title>Special title treatment</Card.Title>
        <Form>
        <Row className="mb-3">
          <Form.Group as={Col} md="8" controlId="validationCustom03">
            <Form.Control id="input" type="number" placeholder="Add your input here..." required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid input.
            </Form.Control.Feedback>
            <p id="error" style={{ color: '#FF0000' }}>
            </p>
          </Form.Group>
          </Row>
          <Stack direction="horizontal" gap={3}>
          <Button variant="secondary" onClick={handleSubmit}>Submit</Button>
          <Button variant="outline-danger" onClick={cleanAll}>Reset</Button>
          </Stack>
        </Form>
      </Card.Body>
    </Card>
  </Row>
  <br/>
  <Row className="justify-content-md-center">
    <Card style={{ width: '48rem' }}>
        <Card.Header as="h5">Result:</Card.Header>
        <Card.Body>
          <Row>
              <Col sm>Train 1 ARL</Col>
              <Col sm>Train 2 ARL</Col>
              <Col sm>Train 3 ARL</Col>
            </Row>
            {results.map((result) => 
              <Row>
              <Col sm>{result['Train 1 ARL']}</Col>
              <Col sm>{result['Train 2 ARL']}</Col>
              <Col sm>{result['Train 3 ARL']}</Col>
            </Row>
            )}
      </Card.Body>
    </Card>
</Row>
</Container>
  
);
    }
export default App;
