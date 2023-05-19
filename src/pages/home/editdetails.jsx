import React, { useEffect } from "react";
import axios from "axios";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card"
// @material-ui/icons
import AddAPhoto from "@material-ui/icons/AddAPhoto";
// core components
import styles from "static/styles/profilepagestyles";
import Header from "../../components/header/header.jsx"
import Navbar from "../../components/navbar/navbar"
import Chat from "../../components/chat/chat";
import setAuthToken from "../../services/setAuthToken"
import Router from "next/router";
import EditProfile from "../../components/home/editprofile"
import ProfilePic from "../../components/home/ProfilePic";
const useStyles = makeStyles(styles);

const EditDetails = () => {
    const classes = useStyles();
    useEffect(()=> {
        if(!!!localStorage.getItem('LoginToken')){
            Router.push('/')
        }
    })
    const [state, setState] = React.useState({
      name: '',
      email: '',
      degree: '',
      batch: '',
      logintoken: '',
      newuser: ''
    });

    useEffect(() => {
      setState({...state,logintoken: localStorage.getItem('LoginToken')})
    }, [])
    setAuthToken(state.logintoken);

    return (
      <div>
        <Header loggedIn={true}/>
        <div className={classes.profilecontainer}>
            <div className={classes.leftbar}>
                <Navbar click="home"/>
            </div>
            <div className={classes.centercontainer}>
                <ProfilePic/>
                <EditProfile/>
            </div>
            <div className={classes.rightbar}>
                <Chat/>
            </div>
        </div>
      </div>
    )
  }

export default EditDetails;