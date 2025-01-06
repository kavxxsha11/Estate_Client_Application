import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Container className="mt-5 text-center">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Button variant="primary" as={Link} to="/">Go Back Home</Button>
    </Container>
  );
};



export default NotFoundPage;
