import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "../apiApi";
import Loading from "./Loading";
const ClientsAdminPage = () => {
    const [users, setusers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get("/users")
            .then((res) => {
                setLoading(false);
                setusers(res.data);
            })
            .catch((e) => {
                setLoading(false);
                console.log(e);
            });
    }, []);
    if (loading) return <Loading />;
    if (users.length === 0) {
        return <h1 className="py-2 text-center">No Users yet</h1>;
    }
    return (
        <Table responsive striped bordered hover>
            <thead>
                <tr>
                    <th>Client Id</th>
                    <th>Client Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {users.length > 0 &&
                    users.map((user, i) => (
                        <tr key={i}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
            </tbody>
        </Table>
    );
};

export default ClientsAdminPage;
