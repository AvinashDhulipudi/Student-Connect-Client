import React, { Component } from "react";
import Router from "next/router";

export default class Index extends Component {
  componentDidMount = () => {
      if(localStorage.getItem('LoginToken')){
          Router.push('/home');
      } else {
          Router.push('/landing');
      }
    };

  render() {
    return (
      <div/>
    ); 
  }
}
