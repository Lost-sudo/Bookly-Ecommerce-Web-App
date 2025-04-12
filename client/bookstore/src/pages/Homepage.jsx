import React from "react"
import { Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const Homepage = () => {
    const {logout} = useAuth();
    return (
        <>
            <h1>Hello, World</h1>
            <Button onClick={logout} variant="danger">Logout</Button>
        </>
    )
}

export default Homepage;