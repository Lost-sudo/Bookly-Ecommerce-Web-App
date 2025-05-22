import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import HeroSection from "../components/HeroSection";
import TrendingBooks from "../components/TrendingBooks";
import FilterSidebar from "../components/FilterSidebar";
import AllBooks from "../components/AllBooks";

const Homepage = () => {
  return (
    <>
      <div className="homepage bg-dark text-light pb-5 mb-5">
        <HeroSection />
        <TrendingBooks />

        <Container fluid className="mt-4">
          <AllBooks />
        </Container>
      </div>
    </>
  );
};

export default Homepage;
