import React from "react";

import { useSelector } from "react-redux";
import { Alert, Col, Container, Row, Table } from "react-bootstrap";
import { FaMinusCircle, FaPlusCircle, FaTimes } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./CartPage.css";
import {
    useIncreaseCartProductMutation,
    useDecreaseCartProductMutation,
    useRemoveFromCartMutation,
} from "../services/appApi";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(
    "pk_test_51Ld5jYSIyhZkpeatyL0wvVR4aHTOy8U6GauGjkRHPY1sX5c023YUiN5KKwFjSm8Zwskh7XjwOeMutJwpQO1XbWZa00o8jd4Urt"
);
const CartPage = () => {
    const user = useSelector((state) => state.user);
    // console
    // console.log(user._id);
    const products = useSelector((state) => state.products.data);

    console.log("Products", products);

    const userCartObj = user.cart;
    // const cart = products.filter(
    //     (product) => userCartObj[product._id] !== null
    // );
    const cart = products.filter((product) => !!userCartObj[product._id]);

    // console.log(cart);
    const [increaseCart] = useIncreaseCartProductMutation();
    const [decreaseCart] = useDecreaseCartProductMutation();
    const [removeFromCart, { isLoading }] = useRemoveFromCartMutation();

    function handleDecrease(product) {
        const quantity = user.cart.count;

        if (quantity <= 0) return alert("Cannot proceed");
        decreaseCart(product);
    }

    const removeCartProduct = () => {};
    return (
        <Container style={{ minHeight: "95vh" }}>
            <Row>
                <Col>
                    <h1 className="pt-2 h3">Shopping Cart</h1>
                    {cart.length === 0 ? (
                        <Alert variant="info">
                            Shopping Cart is empty. Add products to your cart
                        </Alert>
                    ) : (
                        <Elements stripe={stripePromise}>
                            <CheckoutForm />
                        </Elements>
                    )}
                </Col>
                {cart.length > 0 && (
                    <Col md={5}>
                        <>
                            <Table responsive="sm" className="cart-table">
                                <thead>
                                    <tr>
                                        <th>&nbsp;</th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>SubTotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((item, i) => (
                                        <tr key={i}>
                                            <td>&nbsp;</td>
                                            <td>
                                                {!isLoading && (
                                                    <FaTimes
                                                        style={{
                                                            marginRight: 10,

                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() =>
                                                            removeFromCart({
                                                                productId:
                                                                    item._id,
                                                                price: item.price,
                                                                userId: user._id,
                                                            })
                                                        }
                                                    />
                                                )}

                                                <img
                                                    src={item.pictures[0].url}
                                                    alt=""
                                                    style={{
                                                        width: 100,
                                                        height: 100,
                                                        objectFit: "cover",
                                                    }}
                                                />
                                            </td>
                                            <td>${item.price}</td>
                                            <td>
                                                <span className="quantity-indicator">
                                                    <FaMinusCircle
                                                        className="icon"
                                                        style={{
                                                            marginRight: "5px",
                                                        }}
                                                        onClick={() =>
                                                            handleDecrease({
                                                                productId:
                                                                    item._id,
                                                                price: item.price,
                                                                userId: user._id,
                                                            })
                                                        }
                                                    />
                                                    <span>
                                                        {user.cart[item._id]}
                                                    </span>
                                                    <FaPlusCircle
                                                        style={{
                                                            marginLeft: "5px",
                                                        }}
                                                        className="icon"
                                                        onClick={() =>
                                                            increaseCart({
                                                                productId:
                                                                    item._id,
                                                                price: item.price,
                                                                userId: user._id,
                                                            })
                                                        }
                                                    />
                                                </span>
                                            </td>
                                            <td>
                                                $
                                                {item.price *
                                                    user.cart[item._id]}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <div>
                                <h3 className="h4 pt-4">
                                    Total: ${user.cart.total}
                                </h3>
                            </div>
                        </>
                    </Col>
                )}
            </Row>
        </Container>
    );
};

export default CartPage;
