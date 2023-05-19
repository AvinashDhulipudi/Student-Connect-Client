import React from "react";
import Router from "next/router";
// @material-ui/core components
// core components

import setAuthToken from "../services/setAuthToken"
import { Component } from "react";

export default class LoginOutPage extends Component{
    componentDidMount(){
        localStorage.removeItem('LoginToken');
        setAuthToken(false);
        Router.push('/login');
    }
    render(){
        return <div/>;
    }
}
