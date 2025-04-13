import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import HeroSection from "../components/HeroSection";
import TrendingBooks from "../components/TrendingBooks";
import SidebarFilter from "../components/FilterSidebar";
import AllBooks from "../components/AllBooks";

const Homepage = () => {
  const { logout } = useAuth();

  return (
    <>
      <div className="homepage bg-dark text-light pb-5">
        <HeroSection />
        <TrendingBooks />

        <Container fluid className="mt-4">
          <Row>
            <Col md={3} className="mb-4">
              <SidebarFilter />
            </Col>

            <Col md={9}>
              <AllBooks />
            </Col>
          </Row>
        </Container>
      </div>

      <Button onClick={logout} variant="danger" className="m-3">
        Logout
      </Button>
    </>
  );
};

export default Homepage;
