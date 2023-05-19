import React, { useEffect } from "react";
import axios from "axios";
import Router from "next/router";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
// @material-ui/icons
import PhotoLibrary from "@material-ui/icons/PhotoLibrary";
import Poll from "@material-ui/icons/Poll";
import Mood from "@material-ui/icons/Mood";
import AddCircle from "@material-ui/icons/AddCircle";
// core components
import styles from "static/styles/selfviewstyles";
import Header from "../../components/header/header.jsx"
import Navbar from "../../components/navbar/navbar"
import Chat from "../../components/chat/chat";
import Divider from '@material-ui/core/Divider';
import ProfilePic from "../../components/home/ProfilePic";
import SelfFeedView from "../../components/selfView/Feed" 
import InfiniteScroll from "react-infinite-scroll-component";
import IncomingCall from "../../components/IncomingCall/index.jsx";

const useStyles = makeStyles(styles);

const Profile = () => {
    const classes = useStyles();
    useEffect(()=> {
        if(!!!localStorage.getItem('LoginToken')){
            Router.push('/')
        }
    })
    
    return (
      <div>
        <Header loggedIn={true}/>
        <div className={classes.profilecontainer}>
            <div className={classes.leftbar}>
                <Navbar/>
            </div>
            <div id="scrollableDivProfile" className={classes.centercontainer}>
                <InfiniteScroll
                    dataLength="100"
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                    scrollableTarget="scrollableDivProfile"
                >
                    <ProfilePic/>
                    <div className={classes.infocontainer}>
                        <div style={{display: "flex"}}>
                            <div onClick={() => Router.push("/profile/feed")} className={classes.feedtext}>
                                feed
                                <div className={classes.underline}/>
                            </div>
                            <div onClick={() => Router.push("/profile/about")} className={classes.feedtext}>
                                about
                            </div>
                        </div>
                    </div>
                    <Divider className={classes.divider} orientation="horizontal" variant="fullWidth"/>
                    <SelfFeedView/>
                </InfiniteScroll>
            </div>
            <div className={classes.rightbar}>
                <Chat/>
            </div>
        </div>
        <IncomingCall/>
      </div>
    )
  }

export default Profile;