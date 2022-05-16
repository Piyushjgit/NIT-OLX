import React from "react";
import { Col, Container, Row, Navbar, NavbarBrand } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        // <footer
        //     style={{
        //         width: "100%",
        //         position: "relative",
        //         bottom: 0,
        //         display: "flex",
        //         justifyContent: "center",
        //     }}
        // >
        //     <Container>
        //         <Row>
        //             <Col className="text-center py-3">Copyright &copy; NIT-OLX</Col>
        //         </Row>
        //     </Container>
        // </footer>
        <footer className='fixed-bottom'
            style={{
                backgroundColor: '#24292F',
                color: '#fff'
            }}
        >
            <Container>
                <Row>
                    <Col className='text-center py-2 contactUs'><a href="https://www.veed.io/view/45ce7486-5c51-4d90-b13c-5bbda423a440?sharing" target="_blank">User Manual</a></Col>
                    <Col className="text-center py-2">
                        Copyright &copy; NIT-OLX, 2022. All rights reserved.
                    </Col>
                    <Col className='text-center py-2 contactUs'><Link to="/contactus">Contact Us</Link></Col>
                    {/* <Col></Col> */}
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;