import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { AiOutlineMail } from "react-icons/ai";
import { FaFax } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { IoCall } from "react-icons/io5";
import { BsFacebook, BsPinterest, BsSkype, BsTwitter, BsYoutube } from "react-icons/bs";
import { FiInstagram } from "react-icons/fi";
import "./Contact.css";
import "../components/Footer.css";
const Contact = () => {
    return (
        <Container>
            <h1 className="text-center my-3">Contact Us</h1>
            <Row>
                <Col md={6}>
                    <h5>HERE TO HELP</h5>
                    <p className="text-secondary">
                        Have a question? You may find an answer in our FAQs. But you can also
                        contact us.
                    </p>
                    <div className="contact-add">
                        <ul className="my-2">
                            <li>
                                <GrLocation className="icon me-1" />
                                Location: 2750 Quadra Street Victoria, Canada
                            </li>
                            <li>
                                <IoCall className="icon me-1" />
                                Call Us: (+123) 456-7898
                            </li>
                            <li>
                                <AiOutlineMail className="icon me-1" />
                                Email Us: support@novine.com
                            </li>
                            <li>
                                <FaFax className="icon me-1" />
                                Fax: +123456
                            </li>
                        </ul>
                    </div>
                    <h6 className="my-3 fw-bold">FOLLOW US ON</h6>
                    <div className="social-icons ">
                        <BsFacebook className="fa" />
                        <BsTwitter className="fa" />
                        <FiInstagram className="fa" />
                        <BsPinterest className="fa" />
                        <BsSkype className="fa" />
                        <BsYoutube className="fa" />
                    </div>
                </Col>
                <Col md={6}>
                    <h5>Drop Us A Line</h5>
                    <p className="text-secondary">
                        We’re happy to answer any questions you have or provide you with an
                        estimate. Just send us a message in the form below with any questions you
                        may have.
                    </p>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name(required)*</Form.Label>
                            <Form.Control type="text" placeholder="Enter Your Name" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email(required)*</Form.Label>
                            <Form.Control type="text" placeholder="Enter Your Email" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone Number(required)*</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Your Phone Number"
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Your Message</Form.Label>
                            <Form.Control as="textarea" placeholder="Enter Your Message" required />
                        </Form.Group>
                        <button className="btn-1 my-2">Send Message</button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Contact;
