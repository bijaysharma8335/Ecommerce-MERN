import React from "react";
import {  Container, Row } from "react-bootstrap";
import "../components/Footer.css";
const Subscribe = () => {
    return (
        <Container>
            <>
                <div className="subscribe">
                    <div className="subscribe_header">
                        <h2>Subscribe To Our Newsletter</h2>
                        <p className="text-secondary">
                            A short sentence describing what someone will
                            receive by subscribing
                        </p>
                    </div>

                    <input
                        type="email"
                        placeholder="Enter Your Email Address"
                        className="input"
                        required
                    />
                    <button className="btn-1">Subscribe</button>
                </div>
            </>
        </Container>
    );
};

export default Subscribe;
