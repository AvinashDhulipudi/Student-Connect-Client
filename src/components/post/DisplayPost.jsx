import React, { useEffect } from "react";
import axios from "axios";
import Router from "next/router";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card"
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { TextareaAutosize } from "@material-ui/core";
// @material-ui/icons
import ThumbUp from "@material-ui/icons/ThumbUp";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import Comment from "@material-ui/icons/Comment";
import Share from "@material-ui/icons/Share";
import Close from "@material-ui/icons/Close";
import SpeakerNotesOff from "@material-ui/icons/SpeakerNotesOff";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import Report from "@material-ui/icons/Report";
// core components
import styles from "./displaypoststyles";
import pic from "static/img/face.jpg";
import AddComment from "../comment/AddComment";
import DisplayComment from "../comment/DisplayComment";
import config from "../../../config.json"

const useStyles = makeStyles(styles);


const DisplayPost = ({content,postedIn,name,role,time,comments,attachments,id,disabledComment,userpost,loggedInId}) => {
    const classes = useStyles();
    const size=2;
    const [state,setState] = React.useState({
      page:1,
      displayingComments: [...comments],
      postText: content,
      anchorEl: null,
      commentsDisabled: disabledComment,
      likes: null,
      editPost: false,
      reportPost: false,
      moreCommentsAvailable: comments.length>0?true:false
    })

    const fetchMoreComments = ()=>{
      axios.get(config.getCommentsByPostId+`${id}?page=${state.page}&size=${size}`)
      .then(res=>{
        console.log(res.data)
        if(res.data.length>0) setState({...state,displayingComments:state.displayingComments.concat(res.data),page:state.page+1})
        else setState({...state, moreCommentsAvailable:false})
      })
      .catch(err=>console.log("Error fetching more comments",err.response))
    }

    const handleClick = (event) => {
      setState({...state, anchorEl: event.currentTarget});
    };
  
    const handleClose = () => {
      setState({...state, anchorEl: null});
    };

    //report post
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const handleReportPost = () => {
      setState({...state, reportPost: true});
    };
    const handleCloseReport = () => {
      setState({...state, reportPost: false, anchorEl: null});
    };

    function handleTextChange(e){
      setState({...state, postText: e.currentTarget.value});
    }

    async function handleDeletePost(e){
        event.preventDefault();
        axios.delete(config.deletePost + id)
            .then(res => {
                if(res.status == "200"){
                  Router.push("/");
                }
                else {
                  console.log(res.data);
                }
              }
            )
            .catch(err => console.log(err))
    }

    async function handleLikeClicked(e){
        event.preventDefault();
        axios.post(config.likePost + id)
            .then(res => {
                if(res.status == "200"){
                  Router.push("/");
                }
                else {
                  console.log(res.data);
                }
              }
            )
            .catch(err => console.log(err))
    }

    async function handleCommentClicked(e){
        event.preventDefault();
    }

    async function handleDisableCommentsPost(e){
        event.preventDefault();
        const body = {
            content: content,
            disabledComments: !disabledComment
        }
        axios.put(config.disableComments + id,body)
            .then(res => {
                if(res.status == "200"){
                  setState({...state, commentsDisabled: true});
                }
                else {
                  console.log(res.data);
                }
              }
            )
            .catch(err => console.log(err))
    }

    async function handleEditPost(e){
      event.preventDefault();
      const body = {
          content: state.postText
      }
      axios.put(config.editPost + id,body)
          .then(res => {
              if(res.status == "200"){
                setState({...state, editPost: false});
                content = state.postText
              }
              else {
                console.log(res.data);
                state.postText = content
              }
            }
          )
          .catch(err => console.log(err))
    }

    useEffect(() => {
        axios.get(config.getLikesPost + id)
        .then(res => {
          setState({...state, likes: res?.data});
        })
        .catch(err => console.log(err))
      },[])

    useEffect(() => {
        if(state.load<comments.length){
        const item = comments.slice(state.load-10,state.load)
        setState({...state, displayingComments: state.displayingComments.concat(item)})
        }
    },[state.load])

    const getDisplayingComments = state.displayingComments.map(function(comment){
        if(comment.isDeleted=="false")
        return <DisplayComment key={comment.id} usercomment={loggedInId == comment.userCommentRef.id} postId={id} isDeleted={comment.isDeleted} id={comment.id} text={comment.body} name={comment.userCommentRef.name} likes= "3 likes" replies="4 replies"/>
    })     

    return (
        <div className={classes.displaypost}>
            <Card className={classes.displaypostcontainer}>
                <div className={classes.displaypostcenter}>
                    <div style={{
                        backgroundImage: "url(" + pic + ")",
                        backgroundSize: "cover"
                        }} 
                        className={classes.displaypostpic}>
                    </div>
                    <div className={classes.displaypostheadernames}>
                        <div style={{display: "flex"}}>
                            <div className={classes.displaypostpersonname}>{name + " " + "-" + " "} </div>
                            <div className={classes.displaypostgroupname}>{postedIn}</div>
                        </div>
                        <div className={classes.rolechip}>
                            <div className={classes.rolechiptext}>{role}</div>
                        </div>
                    </div>
                    <div className={classes.displaypostleftlinks}>
                        <MoreHoriz onClick={handleClick} className={classes.headerdropdown}/>
                            {userpost? 
                            <Menu
                                id="my-posts"
                                anchorEl={state.anchorEl}
                                keepMounted
                                open={Boolean(state.anchorEl)}
                                onClose={handleClose}
                            >
                              <MenuItem className={classes.dropdowntext} onClick={handleDisableCommentsPost}>{state.commentsDisabled? <Comment className={classes.dropdownicons}/>:<SpeakerNotesOff className={classes.dropdownicons}/>}{state.commentsDisabled? "Enable Comments" : "Disable Comments"}</MenuItem>
                              <MenuItem className={classes.dropdowntext} onClick={() => setState({...state, editPost: true})}><Edit className={classes.dropdownicons}/>Edit Post</MenuItem>
                              <MenuItem className={classes.dropdowntext} onClick={handleDeletePost}><Delete className={classes.dropdownicons}/>Delete Post</MenuItem>
                            </Menu>:
                            <Menu 
                              id="others-post"
                              anchorEl={state.anchorEl}
                              keepMounted
                              open={Boolean(state.anchorEl)}
                              onClose={handleClose}
                            >
                              <MenuItem className={classes.dropdowntext} onClick={handleReportPost}><Report className={classes.dropdownicons}/>Report Post</MenuItem>
                            </Menu>
                            }
                        <div className={classes.displayposttime}>{time}</div>
                    </div>
                </div>
                <div className={classes.textboxcontainer}>
                    {!state.editPost? <div className={classes.displaytextcontent}> {state.postText} </div>
                    :
                    <div>
                        <TextareaAutosize placeholder="Edit Post.." value={state.postText} rowsMax={6} rowsMin={6} className={classes.textbox} onChange={handleTextChange}/>
                        <div onClick={handleEditPost} className={classes.postbutton}>
                          <div className={classes.postbuttontext}>
                            Edit Post
                          </div>
                        </div>
                    </div>
                    }
                    {attachments && 
                        <div className={classes.showimages}>
                            <Close onClick={() => setState({...state,attachments: null})} className={classes.closeimage}/>
                            <img src={state.attachments}/>
                        </div>
                    }
                </div>
                <div className={classes.displaypostinfocontainer}>
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
                        <div className={classes.likednormaltext}>
                            Liked by {" "}<div className={classes.likedboldtext}> {state.likes && state.likes[0]?.userPostLikeRef?.name} </div>{" "} and {state.likes && state.likes.length -1} others
                        </div>
                    </div>
                    <div className={classes.commentsshare}>
                        {comments.length > 0 && 
                        <div className={classes.infotext}>
                            {comments.length}{" "} comments
                        </div>
                        }
                        <div className={classes.infotext}>
                            10 shares
                        </div>
                    </div>
                </div>
                <Divider variant="fullWidth" orientation="horizontal"/>
                <div className={classes.buttonscontainer}>
                    <div onClick={handleLikeClicked} className={classes.buttondiv}>
                      <ThumbUp className={classes.iconstyles}/> 
                      <div className={classes.buttonstext}>like</div>
                    </div>
                    <div className={classes.buttondiv}>
                      <Comment onClick={handleCommentClicked} className={classes.iconstyles}/>
                      <div className={classes.buttonstext}>comment</div>
                    </div>
                    <div className={classes.buttondiv}>
                      <Share className={classes.iconstyles}/>
                      <div className={classes.buttonstext}>share</div>
                    </div>
                </div>
                <Divider variant="fullWidth" orientation="horizontal"/>
                <div>
                {state.displayingComments.map(function(comment){
                    // if(!comment.isDeleted==null || comment.isDeleted=="false")
                    return <DisplayComment key={comment.id} usercomment={loggedInId == comment.userCommentRef.id} postId={id} isDeleted={comment.isDeleted} id={comment.id} text={comment.body} name={comment.userCommentRef.name} likes= "3 likes" replies="4 replies"/>
                })     
                }           
                {state.moreCommentsAvailable && <div onClick={fetchMoreComments} className={classes.seemore}>see more comments</div>}
                </div>
                {!state.commentsDisabled && <AddComment postId={id}/>}
            </Card>
            {state.reportPost && 
              <Dialog
                fullScreen={fullScreen}
                open={state.reportPost}
                onClose={handleCloseReport}
                aria-labelledby="report-post"
              >
                <div className={classes.dialogtitle} id="report-post">{"Report this post"}<Close style={{float: "right", cursor: "pointer"}} onClick={handleCloseReport}/></div>
                <DialogContent>
                  <DialogContentText className={classes.dialogcontent}>
                    Hello {loggedInId}, help us to understand why you want to report this post
                  </DialogContentText>
                </DialogContent>
                <div className={classes.reportbuttondiv}>
                    <div className={classes.reportbuttons} autoFocus onClick={handleCloseReport}>
                        <div className={classes.reportbuttontext}>
                        hate speech
                        </div>
                    </div>
                    <div className={classes.reportbuttons} autoFocus onClick={handleCloseReport}>
                        <div className={classes.reportbuttontext}>
                        spam
                        </div>
                    </div>
                    <div className={classes.reportbuttons} autoFocus onClick={handleCloseReport}>
                        <div className={classes.reportbuttontext}>
                        cut throat
                        </div>
                    </div>
                </div>
              </Dialog>            
              }
        </div>
    )
  }

export default DisplayPost;