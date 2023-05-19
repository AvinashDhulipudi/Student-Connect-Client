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
import Divider from '@material-ui/core/Divider';
import ProfilePic from "../../components/home/ProfilePic";
import InfiniteScroll from "react-infinite-scroll-component";
import AddPost from "../../components/post/AddPost" 
import DisplayPost from "../../components/post/DisplayPost" 
import setAuthToken from "../../services/setAuthToken"
import config from "../../../config.json"

const useStyles = makeStyles(styles);

const ClassFeed = () => {
    const classes = useStyles();
    const router = useRouter();
    const ClassId = router.query?.ClassId;

    useEffect(()=> {
        if(!!!localStorage.getItem('LoginToken')){
            Router.push('/')
        }
    })

    const [state, setState] = React.useState({
        posts: [],
        logintoken: ''
      });
  
      useEffect(() => {
        setState({...state,logintoken: localStorage.getItem('LoginToken')})
      }, [])
      setAuthToken(state.logintoken);
  
      useEffect(() => {
        if(state.logintoken){
            axios.get(config.getGroupPosts)
            .then(res => {
                setState({...state, posts: res?.data})
            })
            .catch(err => console.log(err))
          }
      },[state.logintoken])
    
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
                        class feed
                        <div className={classes.underline}/>
                    </div>
                    <div onClick={() => Router.push({pathname:"/classes/about", query: {classId: ClassId}})} className={classes.feedtext}>
                        about
                    </div>
                    <div onClick={() => Router.push({pathname:"/classes/calender", query: {classId: ClassId}})} className={classes.feedtext}>
                        calender
                    </div>
                </div>
                <div style={{display: "flex", marginLeft: "auto"}}>
                    <div className={classes.lightbutton}>
                        <div className={classes.lightbuttontext}>
                            View Pending
                        </div>
                    </div>
                    <div className={classes.darkbutton}>
                        <div className={classes.darkbuttontext}>
                            + Add members
                        </div>
                    </div>
                </div>
            </div>
            <Divider className={classes.divider} orientation="horizontal" variant="fullWidth"/>
            <div id="scrollableDivGroup" style={{width: "60%"}} className={classes.centercontainer}>
                <InfiniteScroll
                    dataLength="100"
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                    scrollableTarget="scrollableDivGroup"
                >
                    <AddPost/>
                    {state.posts.map(function(post){
                        var toTime = new Date();
                        var fromTime = new Date(post.createdAt);
                        var differenceTravel = toTime.getTime() - fromTime.getTime();
                        var hours = Math.floor((differenceTravel) / (60*60*1000));
                        var time = hours + "hrs ago"
                        return <DisplayPost key={post.id} id={post.id} content={post.content} disabledComment={post.disabledComments} visibility={post.PostedIn} name={post.createdBy.name} role={post.createdBy.role} time={time} comments={post.comments}/>;
                    })
                    }                
                </InfiniteScroll>
            </div>
            </div>
        </div>
      </div>
    )
  }

export default ClassFeed;