import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getPurchaseHistory } from "./apiUser";
import moment from "moment";
import LeftPanelCustomerComponent from '../utils/LeftPanelCustomerComponent';
import { setUserId } from "../redux/action";
import {useDispatch} from 'react-redux';
import '../user/userCSS/admindasboard.css'

const Dashboard = () => {
    const [history, setHistory] = useState([]);
    const dispatch = useDispatch();

    const {
        user: { _id, name, email, role }
    } = isAuthenticated();
    const token = isAuthenticated().token;

    const init = (userId, token) => {
        getPurchaseHistory(userId, token).then(data => {
            try{
            if (data.error) {
                console.log(data.error);
            } else {
                setHistory(data);
            }
        }catch(error){
            throw console.error('error');
        }
        });
    };

    useEffect(() => {
        init(_id, token);
        
    }, []);

    const userLinks = () => {
        return (
            <LeftPanelCustomerComponent user={_id}/>
        );
    };

    const userInfo = () => {
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

    const purchaseHistory = history => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">Purchase history</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        {history.map((h, i) => {
                            return (
                                <div>
                                    <hr />
                                    {h.products.map((p, i) => {
                                        return (
                                            <div key={i}>
                                                <h6>Product name: {p.name}</h6>
                                                <h6>
                                                    Product price: ${p.price}
                                                </h6>
                                                <h6>
                                                    Purchased date:{" "}
                                                    {moment(
                                                        p.createdAt
                                                    ).fromNow()}
                                                </h6>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </li>
                </ul>
            </div>
        );
    };

    return (
        <Layout
            title="Dashboard"
            description={`G'day ${name}!`}
            className="container-fluid"
        >
            <div className="row">
                <div className="col-3">{userLinks()}</div>
                <div className="col-9 admin-dashboard">
                    {userInfo()}
                    {/* {purchaseHistory(history)} */}
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
