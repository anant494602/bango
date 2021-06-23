import React from "react";
import './coreStyle/layout.css'
import "../styles.css";
import SearchResult from './SearchResult';

const Layout = ({
    title = "Title",
    description = "Description",
    className,
    children
}) => (
    <div className="layout-app"> 
        <div className={className}>
            <SearchResult/> 
            {children}
        </div>
    </div>
);

export default Layout;
