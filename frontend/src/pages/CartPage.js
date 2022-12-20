import React from "react";
import "./CartPage.css";
import { useSelector } from "react-redux";
import { Alert, Container, Row } from "react-bootstrap";
const CartPage = () => {
    const user = useSelector((state) => state.user);
    const products = useSelector((state) => state.products.data);
    console.log(products);
    const userCartObj = user.cart;

    let cart = products.filter((product) => userCartObj[product._id] !== null);
    return (
        <Container style={{ minHeight: "95vh" }} className="cart_container">
            <Row>
                <h1 className="pt-2 ">Shopping Cart</h1>

                {cart.length === 0 ? (
                    <Alert variant="info">
                        Shopping Cart is empty.Please add products to your cart
                    </Alert>
                ) : (
                    <div>Click Here</div>
                )}
            </Row>
        </Container>
    );
};

export default CartPage;
