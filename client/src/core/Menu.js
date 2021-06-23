import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";
import Search from './Search';

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#ff9900" };
    } else {
        return { color: "#ffffff" };
    }
};


const Menu = ({ history }) => (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">  
        <Link className="navbar-brand "  to="/">Bango</Link>
        <ul className="navbar-nav navbar-link">
        {!isAuthenticated()  && ( 
            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/")}
                    to="/"
                >
                    Home
                </Link>
            </li>
         )}
         {!isAuthenticated()  && ( 
           
            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/shop")}
                    to="/shop"
                >
                    Shop
                </Link>
            </li>
         )}
         {isAuthenticated()  &&  isAuthenticated().user.role === 0  && ( 
            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/")}
                    to="/"
                >
                    Home
                </Link>
            </li>
         )}
         {isAuthenticated() &&  isAuthenticated().user.role === 0  && ( 
           
            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/shop")}
                    to="/shop"
                >
                    Shop
                </Link>
            </li>
         )}
       
            
        </ul>
        <div className='nav-site-search'>
        {!isAuthenticated()  && (    
        <Search /> 
        )}
        {isAuthenticated()  &&  isAuthenticated().user.role === 0  && (       
        <Search /> 
        )}
        </div>
        <ul className="navbar-nav navbar-login" >
         {!isAuthenticated() || isAuthenticated().user.role === 0 && (
            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/cart")}
                    to="/cart"
                >
                    Cart{" "}
                    <sup>
                        <small className="cart-badge">{itemTotal()}</small>
                    </sup>
                </Link>
            </li>
           )}
            {!isAuthenticated()  && (       
               <li className="nav-item">
               <Link
                   className="nav-link"
                   style={isActive(history, "/cart")}
                   to="/cart"
               >
                   Cart{" "}
                   <sup>
                       <small className="cart-badge">{itemTotal()}</small>
                   </sup>
               </Link>
              </li>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={isActive(history, "/user/dashboard")}
                        to="/user/dashboard"
                    >
                        Dashboard
                    </Link>
                </li>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={isActive(history, "/admin/dashboard")}
                        to="/admin/products"
                    >
                        Dashboard
                    </Link>
                </li>
            )}

             {!isAuthenticated() &&  (
                <Fragment>
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/signin")}
                            to="/signin"
                        >
                            Signin
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/signup")}
                            to="/signup"
                        >
                            Signup
                        </Link>
                    </li>
                </Fragment>
            )} 

            {isAuthenticated() && (
                <li className="nav-item">
                    <span
                        className="nav-link"
                        style={{ cursor: "pointer", color: "#ffffff" }}
                        onClick={() =>
                            signout(() => {
                                history.push("/");
                            })
                        }
                    >
                        Signout
                    </span>
                </li>
            )}
        </ul>
    </nav>
);

export default withRouter(Menu);
