import React, { useEffect } from "react";
import axios from "axios";
import Router from "next/router";
import { Scrollbars } from 'react-custom-scrollbars';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Divider from '@material-ui/core/Divider';
// @material-ui/icons
// core components
import styles from "static/styles/profilepagestyles";
import Header from "../../components/header/header.jsx"
import Navbar from "../../components/navbar/navbar"
import Chat from "../../components/chat/chat";
import setAuthToken from "../../services/setAuthToken"
import config from "../../../config.json"
import AddPost from "../../components/post/AddPost" 
import DisplayPost from "../../components/post/DisplayPost" 
import DisplayPoll from "../../components/poll/DisplayPoll" 
import IncomingCall from '../../components/IncomingCall'

import { useUser } from '../../services/hooks'
import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = makeStyles(styles);

const Home = () => {
    const classes = useStyles();
    const user = useUser();
    useEffect(()=> {
        if(!!!localStorage.getItem('LoginToken')){
            Router.push('/')
        }
    })
    const size=5;
    const [state, setState] = React.useState({
      posts: [],
      displayingposts: [],
      page:0,
      polls: [{name:"Dad", options: ["avinashd", "haritha", "shiva"], content: "This is my first poll", time: "10 hr ago", role: "student",id: "1234"}],
      logintoken: '',
      hasMore:true,
    });

    const fetchPosts = async () => {
      return axios.get(config.getAllPosts+`?page=${state.page}&size=${size}`)
          .then(res => {
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
      if(state.logintoken) fetchPosts() 
    },[state.logintoken])


    return (
      <div>
        <Header loggedIn={true}/>
        <div id="scrollableDiv" className={classes.profilecontainer}>
            <div className={classes.leftbar}>
                <Navbar  click="home"/>
            </div>
            <div className={classes.centercontainer}>
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
                      <DisplayPoll id={state.polls[0].id} content={state.polls[0].content} options={state.polls[0].options} name = {state.polls[0].name} role = {state.polls[0].role} time={state.polls[0].time} userpoll={true}/>
                      {state.posts.map(function(post){
                          var toTime = new Date();
                          var fromTime = new Date(post.createdAt);
                          var differenceTravel = toTime.getTime() - fromTime.getTime();
                          var hours = Math.floor((differenceTravel) / (60*60*1000));
                          var time = hours + "hrs ago"
                          return <DisplayPost key={post.id} loggedInId={user} userpost={user == post.createdBy.id} id={post.id} content={post.content} disabledComment={post.disabledComments} postedIn={post.postedIn} name={post.createdBy.name} role={post.createdBy.role} time={time} comments={post.comments}/>;
                        })
                      }                    
                  </div>
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

export default Home;