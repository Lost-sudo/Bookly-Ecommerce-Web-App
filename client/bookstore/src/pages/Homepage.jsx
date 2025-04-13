import React from "react"
import { Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import HeroSection from "../components/HeroSection";
import TrendingBooks from "../components/TrendingBooks";

const Homepage = () => {
    const {logout} = useAuth();
    return (
      <>
        <div className="homepage bg-dark text-light">
          <HeroSection />
          <TrendingBooks />
        </div>
        <Button onClick={logout} variant="danger">
          Logout
        </Button>
      </>
    );
}

export default Homepage;