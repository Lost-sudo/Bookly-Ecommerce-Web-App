import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../public/css/Footer.css";

const Footer = () => {
  return (
    <footer
      className="footer py-3"
      style={{
        background: "var(--color-bg-secondary)",
        color: "var(--color-muted)",
        borderTop: "1px solid var(--color-border)",
        transition: "background 0.3s, color 0.3s",
      }}
    >
      <Container>
        <Row>
          <Col className="text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Bookly. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
