import React, { useRef, useState } from "react";
import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import { FaBell, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout, resetNotifications } from "../features/userSlice";
import axios from "../apiApi";
import "./Navigation.css";

const Navigation = ({ notificationBar, toggleNotifications }) => {
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

    const handleToggleNotifications = (e) => {
        e.preventDefault();
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
        <Navbar bg="light" expand="lg" className="position-sticky" fixed="top">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>Ecommerce</Navbar.Brand>
                </LinkContainer>

                <input
                    type="search"
                    placeholder="Search"
                    className="search-input mx-auto"
                />

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/about">
                            <Nav.Link>About</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/contact">
                            <Nav.Link>Contact</Nav.Link>
                        </LinkContainer>

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
                                    {user?.cart?.count > 0 && (
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
                                        ref={bellRef}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleNotifications();
                                        }}
                                        data-count={unreadNotifications || null}
                                    />
                                    {notificationBar && (
                                        <div
                                            className="notifications_container"
                                            ref={notificationsRef}
                                        >
                                            {user?.notifications.length > 0 ? (
                                                user?.notifications.map(
                                                    (notification, i) => (
                                                        <p
                                                            className={`notification-${notification.status}`}
                                                            key={i}
                                                        >
                                                            {
                                                                notification.message
                                                            }
                                                            <br />
                                                            <span>
                                                                {notification.time.split(
                                                                    "T"
                                                                )[0] +
                                                                    " " +
                                                                    notification.time.split(
                                                                        "T"
                                                                    )[1]}
                                                            </span>
                                                        </p>
                                                    )
                                                )
                                            ) : (
                                                <p>No notifications</p>
                                            )}
                                        </div>
                                    )}
                                </Nav.Link>
                                <NavDropdown
                                    title={`${user.name}`}
                                    id="basic-nav-dropdown"
                                >
                                    {user.isAdmin && (
                                        <>
                                            <LinkContainer to="/profile">
                                                <NavDropdown.Item>
                                                    Profile
                                                </NavDropdown.Item>
                                            </LinkContainer>
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
                                        size="sm"
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
        </Navbar>
    );
};

export default Navigation;
