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
import styles from "static/styles/groupstyles";
import Header from "../../components/header/header.jsx"
import Navbar from "../../components/navbar/navbar"
import Chat from "../../components/chat/chat";
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import ProfilePic from "../../components/home/ProfilePic";
import SelfFeedView from "../../components/selfView/Feed" 
import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = makeStyles(styles);

const ClassAbout = () => {
    const classes = useStyles();
    const router = useRouter();
    const ClassId = router.query?.classId;

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
                    <div onClick={() => Router.push({pathname:"/classes/feed", query: {classId: ClassId}})} className={classes.feedtext}>
                        group feed
                    </div>
                    <div onClick={() => Router.push({pathname:"/classes/about", query: {classId: ClassId}})} className={classes.feedtext}>
                        about
                        <div className={classes.underline}/>
                    </div>
                    <div onClick={() => Router.push({pathname:"/classes/calender", query: {classId: ClassId}})} className={classes.feedtext}>
                        calender
                    </div>
                </div>
                <div style={{display: "flex", marginLeft: "auto"}}>
                    <div className={classes.darkbutton}>
                        <div className={classes.darkbuttontext}>
                            Leave group
                        </div>
                    </div>
                </div>
            </div>
            <Divider className={classes.divider} orientation="horizontal" variant="fullWidth"/>
            <Card>
                <div>
                    Mission
                </div>
                <div>

                </div>
            </Card>
            </div>
        </div>
      </div>
    )
  }

export default ClassAbout;