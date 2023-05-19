import React, { useEffect } from "react";
import axios from "axios";
import Router, { useRouter } from "next/router";
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

const useStyles = makeStyles(styles);

const GroupCalender = () => {
    const classes = useStyles();
    const router = useRouter();
    const groupId = router.query?.groupId;

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
            <div style={{width: "100%", padding: "60px"}}>
            <ProfilePic/>
            <div className={classes.infocontainer}>
                <div style={{display: "flex"}}>
                    <div onClick={() => Router.push({pathname:"/groups/feed", query: {groupId: groupId}})} className={classes.feedtext}>
                        group feed
                    </div>
                    <div onClick={() => Router.push({pathname:"/groups/about", query: {groupId: groupId}})} className={classes.feedtext}>
                        about
                    </div>
                    <div onClick={() => Router.push({pathname:"/groups/calender", query: {groupId: groupId}})} className={classes.feedtext}>
                        calender
                        <div className={classes.underline}/>
                    </div>
                </div>
            </div>
            <Divider className={classes.divider} orientation="horizontal" variant="fullWidth"/>
            {"Group Calender"}
            </div>
        </div>
      </div>
    )
  }

export default GroupCalender;