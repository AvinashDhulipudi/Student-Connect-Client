import React, { useEffect } from "react";
import axios from "axios";
import Router from "next/router";
import { Scrollbars } from 'react-custom-scrollbars';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Divider from '@material-ui/core/Divider';
// @material-ui/icons
// core components
import styles from "static/styles/groupstyles";
import Header from "../../components/header/header.jsx"
import Navbar from "../../components/navbar/navbar"
import Chat from "../../components/chat/chat";
import setAuthToken from "../../services/setAuthToken"
import config from "../../../config.json"
import AddPost from "../../components/post/AddPost" 
import DisplayPost from "../../components/post/DisplayPost" 
import DisplayGroup from "../../components/group/DisplayGroup" 
import IncomingCall from '../../components/IncomingCall'

import { useUser } from '../../services/hooks'
import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = makeStyles(styles);

const ClassViewAll = () => {
    const classes = useStyles();
    const user = useUser();
    useEffect(()=> {
        if(!!!localStorage.getItem('LoginToken')){
            Router.push('/')
        }
    })
    const [state, setState] = React.useState({
        groups: [],
        logintoken: '',
        allGroups: true
    });

    useEffect(() => {
      setState({...state,logintoken: localStorage.getItem('LoginToken')})
    }, [])
    setAuthToken(state.logintoken);
    
    //Check for All and My groups

    useEffect(() => {
        if(state.logintoken){
            axios.get(state.allGroups? config.getAllGroups: config.getMyGroups)
            .then(res => {
                setState({...state, groups: res?.data})
            })
            .catch(err => console.log(err))
          }
    },[state.logintoken,state.allGroups])

    return (
      <div>
        <Header loggedIn={true}/>
        <div id="scrollableDiv" className={classes.profilecontainer}>
            <div className={classes.leftbar}>
                <Navbar  click="home"/>
            </div>
            <div className={classes.centergroupcontainer}>
                <div style={{display: "flex"}}>
                    <div onClick={() => setState({...state, allGroups: false})} className={classes.feedtext}>
                        Your Classes
                        {!state.allGroups && <div className={classes.underline}/>}
                    </div>
                    <div onClick={() => setState({...state, allGroups: true})} className={classes.feedtext}>
                        All Classes
                        {state.allGroups && <div className={classes.underline}/>}
                    </div>
                    <div style={{display: "flex", marginLeft: "auto"}}>
                        <div className={classes.lightbutton}>
                            <div className={classes.lightbuttontext}>
                                Sort
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{width: "100%"}}>
                {state.groups.map(function(group){
                    return <DisplayGroup id={group.id} userId={user} name={group.title} memberscount={state.groups.length} description={group.about}/>
                })
                }
                </div>
            </div>
            <div className={classes.rightbar}>
                <Chat/>
            </div>
        </div>
        <IncomingCall/>
      </div>
    )
  }

export default ClassViewAll;