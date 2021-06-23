import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import LeftPanelComponent from "../utils/LeftPanelComponent";
import '../user/userCSS/admindasboard.css'

const AdminDashboard = () => {
    const {
        user: { _id, name, email, role }
    } = isAuthenticated();

    const adminLinks = () => {
        return (
            <LeftPanelComponent />
        );
    };

    const adminInfo = () => {
        return (
            <>
                <h2 className="card-header">User Information</h2>
                <ul className="list-group">
                    <li className="list-group-item">User Name : {name}</li>
                    <li className="list-group-item">User Email: {email}</li>
                    <li className="list-group-item">
                        User Role {role === 1 ? "Admin" : "Registered User"}
                    </li>
                    <li className="list-group-item">
                        User Phone Number: 8981865587
                    </li>
                    <li className="list-group-item">User Status: Active</li>
                    <li className="list-group-item">User Address: 14.7 KM to Netaji Subhash Chandra Bose International Airport</li>
                </ul>
                <button className="btn btn-site-button">Update Profile</button>
            </>
          
        );
    };

    return (
        <Layout
            title="Dashboard"
            description={`G'day ${name}!`}
            className="container-fluid"
        >
            <div className="row">
                <div className="col-3">{adminLinks()}</div>
                <div className="col-9 admin-dashboard">{adminInfo()}</div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;
