import React from "react";
import ReactDOM from "react-dom";
import App from './App';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './user/Signup';


ReactDOM.render(
<BrowserRouter>   
<App />
</BrowserRouter> , 
document.getElementById("root"));
