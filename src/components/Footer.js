import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center" aria-label="Footer">
      <Container>
        <Row>
          <Col>
            <p>&copy; {new Date().getFullYear()} EstateAgent. All Rights Reserved.</p>
            <p>1234 Real Estate Ave, London, UK | Phone: +44 11 1111 1111 | Email: myinfo@gmail.com</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
