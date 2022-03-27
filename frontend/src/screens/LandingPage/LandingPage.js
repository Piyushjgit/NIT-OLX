import React, { useEffect } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./LandingPage.css";
function LandingPage({ history }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      // console.log(userInfo);
      history.push("/home");
    }
  }, [history])

  return (
    <div className="main">
      <Container>
        <Row>
            <div className="buttonContainer">
              <Link to="/login">
                <Button size="lg" className="landingbutton">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  variant="outline-primary"
                  size="lg"
                  className="landingbutton"
                >
                  Signup
                </Button>
              </Link>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default LandingPage;