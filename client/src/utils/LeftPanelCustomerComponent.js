import React, { Component } from 'react';
import './leftpanelcomponent.css';
import { NavLink } from "react-router-dom";

export default class LeftPanelComponent extends Component {
    constructor(props){
        super(props)

    }
    render() {
        return (
    <div>
       <div className="nav-side-menu">
         <div className="menu-list">
          <h4>User Dashboard</h4>
          <ul id="menu-content" className="menu-content collapse out">
            <li data-toggle="collapse" data-target="#products" className="collapsed">
                        <NavLink className="nav-NavLink" activeClassName="active" to={`/profile/${this.props.user}`}>
                        <i className="fa fa-shopping-bag fa-lg" /> 
                              Profile Update
                        </NavLink>
            </li>
            <li data-toggle="collapse" data-target="#products" className="collapsed ">       
                        <NavLink className="nav-NavLink"  activeClassName="active" to="/cart">   <i className="fa fa-cart-arrow-down fa-lg" /> 
                            View cart
                        </NavLink>
            </li>
            <li data-toggle="collapse" data-target="#products" className="collapsed ">
                    <NavLink className="nav-NavLink" activeClassName="active" to="/home"> <i className="fa fa-gift fa-lg" /> 
                           All Category
                    </NavLink>
            </li> 
            
            <li data-toggle="collapse" data-target="#products" className="collapsed ">
                    <NavLink className="nav-NavLink" activeClassName="active" to="/home"> <i className="fa fa-gift fa-lg" /> 
                           Purchase History
                    </NavLink>
            </li> 
            <li data-toggle="collapse" data-target="#products" className="collapsed ">
                    <NavLink className="nav-NavLink" to="/home"> <i className="fa fa-gift fa-lg" /> 
                            Account Details
                    </NavLink>
            </li> 
            <li data-toggle="collapse" data-target="#products" className="collapsed ">
                    <NavLink className="nav-NavLink" to="/home"> <i className="fa fa-gift fa-lg" /> 
                           Bango Cash
                    </NavLink>
            </li> 
            <li data-toggle="collapse" data-target="#products" className="collapsed ">
                    <NavLink className="nav-NavLink" to="/home"> <i className="fa fa-gift fa-lg" /> 
                           Your Notification
                    </NavLink>
            </li> 
            <li data-toggle="collapse" data-target="#products" className="collapsed ">
                    <NavLink className="nav-NavLink" to="/home"> <i className="fa fa-gift fa-lg" /> 
                          Help Center
                    </NavLink>
            </li> 
            <li data-toggle="collapse" data-target="#products" className="collapsed ">
                    <NavLink className="nav-NavLink" to="/home"> <i className="fa fa-gift fa-lg" /> 
                        Privacy Policy
                    </NavLink>
            </li> 
            <li data-toggle="collapse" data-target="#products" className="collapsed ">
                    <NavLink className="nav-NavLink" to="/home"> <i className="fa fa-gift fa-lg" /> 
                       Legal
                    </NavLink>
            </li> 

          </ul>
        </div>
      </div>
            </div>
        )
    }
}
