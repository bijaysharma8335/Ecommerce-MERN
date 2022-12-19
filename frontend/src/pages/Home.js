import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import categories from "../Categories";
import "./Home.css";
import axios from "../apiApi";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../features/productSlice";
import ProductPreview from "../components/ProductPreview";

const Home = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const lastProducts = products.data;

    useEffect(() => {
        axios.get("/products").then((data) => dispatch(updateProducts(data)));
    }, []);

    return (
        <div>
            <img
                src=" https://res.cloudinary.com/learn-code-10/image/upload/v1653947013/yqajnhqf7usk56zkwqi5.png"
                className="home_banner"
                alt=""
            />
            <div className="featured-products-container container mt-4">
                <h3>Last Products</h3>
                {/* last products here */}
                <div className="d-flex justify-content-center flex-wrap">
                    {lastProducts.length > 0 &&
                        lastProducts.map((product, i) => (
                            <ProductPreview {...product} key={i} />
                        ))}
                </div>

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
                            key={i}
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
