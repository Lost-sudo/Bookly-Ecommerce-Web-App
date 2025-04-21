import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { getUser } from "../api/user";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { authTokens } = useAuth();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const data = await getUser(authTokens?.access);
        console.log(data);
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    if (authTokens?.access) {
      getProfile();
    }
  }, [authTokens]);

  return (
    <Container className="py-5 text-light">
      <h2 className="mb-4 text-primary">Your Profile</h2>
      {user && (
        <Row>
          <Col md={4}>
            <Card className="bg-dark border border-primary text-light rounded-3 shadow-sm">
              <Card.Body className="text-center">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                  className="rounded-circle mb-3"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
                <h5 className="fw-bold">{user.full_name}</h5>
                <p className="text-muted mb-1">{user.email}</p>
                <Button variant="outline-primary" className="mt-3 w-100">
                  Edit Profile
                </Button>
                <Button variant="outline-secondary" className="mt-2 w-100">
                  Change Password
                </Button>
              </Card.Body>
            </Card>
          </Col>

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
                      value={user.full_name}
                      className="bg-dark text-light border border-light"
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      value={user.email}
                      className="bg-dark text-light border border-light"
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      value={user.phone_number || ""}
                      className="bg-dark text-light border border-light"
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={user.address || "N/A"}
                      className="bg-dark text-light border border-light"
                      readOnly
                    />
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProfilePage;
