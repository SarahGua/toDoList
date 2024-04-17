import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ListComponent from './components/ListComponent';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Container >
      <ListComponent />
    </Container>
  );
}

export default App;
