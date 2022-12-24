import React from "react";
import "./Footer.css";
import { GrLocation } from "react-icons/gr";
import { IoCall } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { FaFax } from "react-icons/fa";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <>
            <div className="py-5  bg-light footer_container">
                <div className="footer_1">
                    <Link to="/" className="link ">
                        <h4 className="text-black fw-bold">ECOMMERCE</h4>
                    </Link>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Nostrum, aspernatur iure! Sequi consectetur
                        aspernatur repellat neque. Nulla laborum modi molestiae.
                    </p>
                </div>

                <div className="footer_2">
                    <h4 className="text-black "> Privacy</h4>
                    <ul>
                        <li>
                            <Link className="link" to='/'>Privacy Policy</Link>
                        </li>
                        <li>
                            <Link className="link" to='/'>Terms & Conditions</Link>
                        </li>
                        <li>
                            <Link className="link" to='/'>Refund Policy</Link>
                        </li>
                    </ul>
                </div>

                <div className="footer_3">
                    <h4 className="text-black ">INFORMATION</h4>
                    <ul>
                        <li>
                            <Link className="link" to="/">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link className="link" to="/about">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link className="link" to="/contact">
                                Contact Us
                            </Link>
                        </li>
                        <li>
                            <Link className="link"to="/faq">FAQ</Link>
                        </li>
                    </ul>
                </div>

                <div className="footer_4">
                    <h4 className="text-black ">Contact Us</h4>
                    <div className="permalinks">
                        <p>
                            <GrLocation className="me-1" />
                            Location: 2750 Quadra Street, Canada
                        </p>
                        <p>
                            <IoCall className="me-1" />
                            Call Us: (+123) 456-7898
                        </p>
                        <p>
                            <AiOutlineMail className="me-1" />
                            Email Us:support@novine.com
                        </p>
                        <p>
                            <FaFax className="me-1" />
                            Fax: +123456
                        </p>
                    </div>
                </div>
            </div>

            <Row style={{ background: " rgb(224, 220, 220)" }}>
                <div className="copyright">
                    <p>copyright@2022Novine.All Rights reserved by Bijay</p>
                    <div className="img-pay">
                        <img
                            src="https://us.123rf.com/450wm/kornienko/kornienko1810/kornienko181000092/kornienko181000092.jpg?ver=6"
                            alt=""
                        />
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2560px-MasterCard_Logo.svg.png"
                            alt=""
                        />
                        <img
                            src="https://i.pcmag.com/imagery/reviews/068BjcjwBw0snwHIq0KNo5m-15..v1602794215.png"
                            alt=""
                        />
                    </div>
                </div>
            </Row>
        </>
    );
};

export default Footer;
