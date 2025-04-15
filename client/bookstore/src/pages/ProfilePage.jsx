import React from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

const ProfilePage = () => {
  return (
    <Container className="py-5 text-light">
      <h2 className="mb-4 text-primary">Your Profile</h2>
      <Row>
        {/* Profile Picture & Basic Info */}
        <Col md={4}>
          <Card className="bg-dark border border-primary text-light rounded-3 shadow-sm">
            <Card.Body className="text-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Profile"
                className="rounded-circle mb-3"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
              <h5 className="fw-bold">John Doe</h5>
              <p className="text-muted mb-1">johndoe@example.com</p>
              <Button variant="outline-primary" className="mt-3 w-100">
                Edit Profile
              </Button>
              <Button variant="outline-secondary" className="mt-2 w-100">
                Change Password
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Profile Details */}
        <Col md={8}>
          <Card className="bg-dark border border-primary text-light rounded-3 shadow-sm">
            <Card.Body>
              <h5 className="fw-semibold text-primary mb-3">
                Personal Information
              </h5>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    value="John Doe"
                    className="bg-dark text-light border border-light"
                    readOnly
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    value="johndoe@example.com"
                    className="bg-dark text-light border border-light"
                    readOnly
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    value="+63 912 345 6789"
                    className="bg-dark text-light border border-light"
                    readOnly
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value="123 Example St, Cantilan, Surigao del Sur"
                    className="bg-dark text-light border border-light"
                    readOnly
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
