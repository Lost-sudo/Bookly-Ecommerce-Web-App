import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-black text-light py-3">
      <Container>
        <Row>
          <Col className="text-center">
            <p className="mb-0 text-secondary">
              &copy; {new Date().getFullYear()} Bookly. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
