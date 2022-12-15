import React, { useState } from "react";
import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../features/userSlice";

const Navigation = () => {
    // const user = useSelector((state) => state.user);
    const [user, setuser] = useState(false)
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout);
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
                        {!user && (
                            <NavDropdown
                                title={`${user.email}`}
                                id="basic-nav-dropdown"
                            >
                                {/* {user.isAdmin && ( */}
                                    <>
                                        <LinkContainer to="/dashboard">
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
                                {/* )} */}
                                {!user.isAdmin && (
                                    <>
                                        <LinkContainer to="/cart">
                                            <NavDropdown.Item>
                                                Cart
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/orders">
                                            <NavDropdown.Item>
                                                Orders
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
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
