import React, { Component } from 'react';
import './leftpanelcomponent.css';
import { NavLink } from "react-router-dom";

export default class LeftPanelComponent extends Component {
    render() {
        return (
    <div>
       <div className="nav-side-menu">
         <div className="menu-list">
          <h4>Admin Dashboard</h4>
          <ul id="menu-content" className="menu-content collapse out">
            <li data-toggle="collapse" data-target="#products" className="collapsed">
                        <NavLink className="nav-NavLink" activeClassName="active" to="/admin/products">
                        <i className="fa fa-shopping-bag fa-lg" /> 
                               Manage Products
                        </NavLink>
            </li>
            <li data-toggle="collapse" data-target="#products" className="collapsed ">       
                        <NavLink className="nav-NavLink"  activeClassName="active" to="/admin/orders">   <i className="fa fa-cart-arrow-down fa-lg" /> 
                            View Orders
                        </NavLink>
            </li>
            <li data-toggle="collapse" data-target="#products" className="collapsed ">
           
                        <NavLink className="nav-NavLink"  activeClassName="active" to="/create/category"> <i className="fa fa-gift fa-lg" /> 
                            Create Category
                        </NavLink>
            </li>
            <li data-toggle="collapse" data-target="#products" className="collapsed ">
                    <NavLink className="nav-NavLink" activeClassName="active" to="/create/product"> <i className="fa fa-user fa-lg" /> 
                            Create Product
                    </NavLink>
            </li> 
            <li data-toggle="collapse" data-target="#products" className="collapsed ">
                    <NavLink className="nav-NavLink" activeClassName="active" to="/admin/dashboard" > <i className="fa fa-cog fa-lg" /> 
                           Setting
                    </NavLink>
                    
            </li> 
            <li data-toggle="collapse" data-target="#products" className="collapsed ">
                    <NavLink className="nav-NavLink" activeClassName="active" to='/admin/dashboard'> <i className="fa fa-gift fa-lg" /> 
                            Add Your Shop 
                    </NavLink>
            </li> 
            <li data-toggle="collapse" data-target="#products" className="collapsed ">
                    <NavLink className="nav-NavLink" activeClassName="active"  to='/admin/dashboard'> <i className="fa fa-gift fa-lg" /> 
                            Account Details
                    </NavLink>
            </li> 
          </ul>
        </div>
      </div>
            </div>
        )
    }
}
