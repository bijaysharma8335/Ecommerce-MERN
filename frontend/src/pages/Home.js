import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import categories from "../Categories";
import "./Home.css";
const Home = () => {
    return (
        <div>
            <img
                src=" https://res.cloudinary.com/learn-code-10/image/upload/v1653947013/yqajnhqf7usk56zkwqi5.png"
                className="home_banner"
                alt=""
            />
            <div className="featured-products-container container mt-4">
                <h3>Last Products</h3>
                {/* last products here */}{" "}
                <div>
                    <Link
                        to="/category/all"
                        style={{
                            textAlign: "right",
                            display: "block",
                            textDecoration: "none",
                        }}
                    >
                        See More
                    </Link>
                </div>
            </div>
            {/* banner */}
            <div className="sale_banner-container mt-4">
                <img
                    src="https://res.cloudinary.com/learn-code-10/image/upload/v1654093280/xkia6f13xxlk5xvvb5ed.png"
                    alt=""
                />
            </div>
            <div className="recent_products-container mt-4">
                <h2>Categories</h2>
                <Row>
                    {categories.map((category, i) => (
                        <LinkContainer
                            to={`/category/${category.name.toLocaleLowerCase()}`}
                        >
                            <Col md={4}>
                                <div
                                    key={i}
                                    style={{
                                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`,
                                        gap: "10px",
                                    }}
                                    className="category_tile"
                                >
                                    {category.name}
                                </div>
                            </Col>
                        </LinkContainer>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default Home;
