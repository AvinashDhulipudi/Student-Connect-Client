import React, { useEffect } from "react";
import axios from "axios";
import Router, { useRouter } from "next/router";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
// @material-ui/icons
import ArrowRightAlt from "@material-ui/icons/ArrowRightAlt";
import Poll from "@material-ui/icons/Poll";
import Mood from "@material-ui/icons/Mood";
import AddCircle from "@material-ui/icons/AddCircle";
// core components
import styles from "static/styles/groupstyles";
import Header from "../../components/header/header.jsx"
import Navbar from "../../components/navbar/navbar"
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import ProfilePic from "../../components/home/ProfilePic";
import pic from "static/img/face.jpg";

const useStyles = makeStyles(styles);

const GroupAbout = () => {
    const classes = useStyles();
    const router = useRouter();
    const groupId = router.query?.groupId;
    const [state,setState] = React.useState({
        isAdmin: true,
        isMember: true
    })

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
                        <div className={classes.underline}/>
                    </div>
                    <div onClick={() => Router.push({pathname:"/groups/calender", query: {groupId: groupId}})} className={classes.feedtext}>
                        calender
                    </div>
                </div>
                <div style={{display: "flex", marginLeft: "auto"}}>
                    <div className={classes.darkbutton}>
                        <div className={classes.darkbuttontext}>
                            {state.isMember? "Leave group" : "Join Group"}
                        </div>
                    </div>
                </div>
            </div>
            <Divider className={classes.divider} orientation="horizontal" variant="fullWidth"/>
            <Card className={classes.centeraboutcontainer}>
                <div className={classes.titletext}>
                    Mission
                </div>
                <div className={classes.normaltext}>
                Linux is a great open source. With this group we can share anything about linux. We 
                can share setup templates, commands, distro reviews, or even more. For all 
                members are advised not to share anything that harms others, and it is strictly 
                forbidden to sell
                </div>
                <div style={{display: "flex"}}>
                <div className={classes.titletext}>
                    Members
                </div>
                {state.isAdmin && <div className={classes.purpletext}>
                    View pending requests
                </div>
                }         
                <ArrowRightAlt className={classes.purpleicon}/>
                </div>
                <div style={{display: "flex", paddingTop: "50px", width: "50%"}}>
                <div className={classes.subtitle}>
                    Core Team
                </div>
                {state.isAdmin && <div className={classes.addnewtext}>
                    + Add new
                </div>
                }
                </div>
                <div className={classes.likedimages}>
                    {/* //should change by Routes */}
                    <div style={{
                        backgroundImage: "url(" + pic + ")",
                        backgroundSize: "cover"
                        }} 
                        className={classes.displaypostlikedpic}>
                    </div>
                    <div style={{
                    backgroundImage: "url(" + pic + ")",
                    backgroundSize: "cover"
                    }} 
                    className={classes.displaypostlikedpic}>
                    </div>
                    <div style={{
                    backgroundImage: "url(" + pic + ")",
                    backgroundSize: "cover"
                    }} 
                    className={classes.displaypostlikedpic}>
                    </div>
                </div>
                <div style={{display: "flex", paddingTop: "50px", width: "50%"}}>
                <div className={classes.subtitle}>
                    Members
                </div>
                {state.isAdmin && <div className={classes.addnewtext}>
                    + Add new
                </div>
                }
                </div>
                <div className={classes.likedimages}>
                    {/* //should change by Routes */}
                    <div style={{
                        backgroundImage: "url(" + pic + ")",
                        backgroundSize: "cover"
                        }} 
                        className={classes.displaypostlikedpic}>
                    </div>
                    <div style={{
                    backgroundImage: "url(" + pic + ")",
                    backgroundSize: "cover"
                    }} 
                    className={classes.displaypostlikedpic}>
                    </div>
                    <div style={{
                    backgroundImage: "url(" + pic + ")",
                    backgroundSize: "cover"
                    }} 
                    className={classes.displaypostlikedpic}>
                    </div>
                </div>
            </Card>
            </div>
        </div>
      </div>
    )
  }

export default GroupAbout;