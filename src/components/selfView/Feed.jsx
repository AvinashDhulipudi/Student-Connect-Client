import React, { useEffect } from "react";
import axios from "axios";
import Router from "next/router";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card"
import Select from "@material-ui/core/Select"
import Radio from "@material-ui/core/Radio"
import { Scrollbars } from 'react-custom-scrollbars';

// @material-ui/icons
import PhotoLibrary from "@material-ui/icons/PhotoLibrary";
import Poll from "@material-ui/icons/Poll";
import Mood from "@material-ui/icons/Mood";
import AddCircle from "@material-ui/icons/AddCircle";
// core components
import styles from "static/styles/selfviewstyles";
import Header from "../header/header.jsx"
import Navbar from "../navbar/navbar"
import Chat from "../chat/chat";
import setAuthToken from "../../services/setAuthToken"
import Divider from '@material-ui/core/Divider';
import config from "../../../config.json"
import ProfilePic from "../home/ProfilePic";
const useStyles = makeStyles(styles);
import pic from "static/img/face.jpg";
import AddPost from "../post/AddPost" 
import DisplayPost from "../post/DisplayPost" 
import InfiniteScroll from "react-infinite-scroll-component";

const SelfFeedView = () => {
    const classes = useStyles();
    useEffect(()=> {
        if(!!!localStorage.getItem('LoginToken')){
            Router.push('/')
        }
    })
    const size=5;
    const [state, setState] = React.useState({
      posts: [],
      page:0,
      hasMore:true,
      logintoken: ''
    });

    const fetchPosts = async () => {
      return axios.get(config.getSelfPosts+`?page=${state.page}&size=${size}`)
      .then(res => {
        console.log()
        if(res.data.length>0) setState({...state, posts: state.posts.concat(res?.data),page:state.page+1})
        else setState({...state,hasMore:false})
      })
      .catch(err => console.log(err))
    }

    useEffect(() => {
      setState({...state,logintoken: localStorage.getItem('LoginToken')})
    }, [])
    setAuthToken(state.logintoken);

    useEffect(() => {
      if(state.logintoken){
          fetchPosts()
        }
    },[state.logintoken])

    var toTime = new Date();
    const getSelfPosts = state.posts.map(function(post){
      var fromTime = new Date(post.createdAt);
      var differenceTravel = toTime.getTime() - fromTime.getTime();
      var hours = Math.floor((differenceTravel) / (60*60*1000));
      var time = hours + "hrs ago"
      return <DisplayPost key={post.id} id={post.id} content={post.content} disabledComment={post.disabledComments} visibility={post.PostedIn} name={post.createdBy.name} role={post.createdBy.role} time={time} comments={post.comments}/>;
    });

    return (
        <div>
            <InfiniteScroll
                    dataLength={state.posts.length}
                    next={fetchPosts}
                    hasMore={state.hasMore}
                    loader={<h4>Loading...</h4>}
                    scrollableTarget="scrollableDiv"
                    endMessage={
                      <p style={{textAlign: 'center'}}>
                        <b>Yay! You have seen it all</b>
                      </p>
                    }
                 >
                  <AddPost/>
                  <Divider className={classes.divider} orientation="horizontal" variant="fullWidth"/>
                  <div className={classes.feedcontainer}>
                    {getSelfPosts}                      
                  </div>
                </InfiniteScroll>
        </div>
    )
  }

export default SelfFeedView;