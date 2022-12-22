import React, { useRef, useState } from "react";
import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import { FaBell, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout, resetNotifications } from "../features/userSlice";
import axios from "../apiApi";
import "./Navigation.css";

const Navigation = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const bellRef = useRef(null);
    const notificationsRef = useRef(null);
    const [bellPos, setBellPos] = useState({});

    const handleLogout = () => {
        dispatch(logout());
    };
    const unreadNotifications = user?.notifications.reduce((acc, current) => {
        if (current.status === "unread") return acc + 1;
        return acc;
    }, 0);

    const handleToggleNotifications = () => {
        const position = bellRef.current.getBoundingClientRect();
        setBellPos(position);
        notificationsRef.current.style.display =
            notificationsRef.current.style.display === "block"
                ? "none"
                : "block";
        dispatch(resetNotifications());
        if (unreadNotifications > 0)
            axios.post(`/users/${user._id}/updateNotifications`);
    };

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>Ecommerce</Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {/* {if no user} */}
                        {!user && (
                            <LinkContainer to="/login">
                                <Nav.Link>Login</Nav.Link>
                            </LinkContainer>
                        )}
                        {user && !user.isAdmin && (
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <FaShoppingCart
                                        style={{ fontSize: "20px" }}
                                    />
                                    {user?.cart.count > 0 && (
                                        <span
                                            className="badge badge-warning"
                                            id="cartcount"
                                        >
                                            {user.cart.count}
                                        </span>
                                    )}
                                </Nav.Link>
                            </LinkContainer>
                        )}

                        {user && (
                            <>
                                <Nav.Link
                                    style={{ position: "relative" }}
                                    ref={bellRef}
                                    onClick={handleToggleNotifications}
                                >
                                    <FaBell
                                        className="fas fa-bell"
                                        data-count={unreadNotifications || null}
                                    />
                                </Nav.Link>
                                <NavDropdown
                                    title={`${user.email}`}
                                    id="basic-nav-dropdown"
                                >
                                    {user.isAdmin && (
                                        <>
                                            <LinkContainer to="/admin">
                                                <NavDropdown.Item>
                                                    Dashboard
                                                </NavDropdown.Item>
                                            </LinkContainer>
                                            <LinkContainer to="/new-product">
                                                <NavDropdown.Item>
                                                    Create Product
                                                </NavDropdown.Item>
                                            </LinkContainer>
                                        </>
                                    )}
                                    {!user.isAdmin && (
                                        <>
                                            <LinkContainer to="/cart">
                                                <NavDropdown.Item>
                                                    Cart
                                                </NavDropdown.Item>
                                            </LinkContainer>
                                            <LinkContainer to="/orders">
                                                <NavDropdown.Item>
                                                    My Orders
                                                </NavDropdown.Item>
                                            </LinkContainer>
                                        </>
                                    )}
                                    <NavDropdown.Divider />
                                    <Button
                                        variant="danger"
                                        onClick={handleLogout}
                                        className="logout-btn"
                                    >
                                        Logout
                                    </Button>
                                </NavDropdown>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
            {/* notifications */}
            <div
                className="notifications_container"
                ref={notificationsRef}
                style={{
                    top: Number(bellPos.top + 50),
                    left: bellPos.left,
                    display: "none",
                }}
            >
                {user?.notifications.length > 0 ? (
                    user?.notifications.map((notification) => (
                        <p className={`notification-${notification.status}`}>
                            {notification.message}
                            <br />
                            <span>
                                {notification.time.split("T")[0] +
                                    " " +
                                    notification.time.split("T")[1]}
                            </span>
                        </p>
                    ))
                ) : (
                    <p>No notifications</p>
                )}
            </div>
        </Navbar>
    );
};

export default Navigation;
