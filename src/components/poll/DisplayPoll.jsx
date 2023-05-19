import React, { useEffect } from "react";
import axios from "axios";
import Router from "next/router";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card"
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
// @material-ui/icons
import ThumbUp from "@material-ui/icons/ThumbUp";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import Comment from "@material-ui/icons/Comment";
import Close from "@material-ui/icons/Close";
import Delete from "@material-ui/icons/Delete";
import Report from "@material-ui/icons/Report";
// core components
import styles from "./displaypollstyles";
import pic from "static/img/face.jpg";
import DisplayOption from "./DisplayOptions"
import config from "../../../config.json"

const useStyles = makeStyles(styles);


const DisplayPoll = ({content, options, name, role, time, comments,attachments, id, disabledComment, userpoll, loggedInId}) => {
    const classes = useStyles();
    const [likes, setLikes] = React.useState(null)
    const [reportPoll, setReportPoll] = React.useState(false)

    //menu options
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    //report poll
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const handleReportPoll = () => {
      setReportPoll(true);
    };
    const handleCloseReport = () => {
      setReportPoll(false);
      setAnchorEl(null);
    };

    // async function handleDeletePoll(e){
    //     event.preventDefault();
    //     axios.delete(config.deletePoll + id)
    //         .then(res => {
    //             if(res.status == "200"){
    //               Router.push("/");
    //             }
    //             else {
    //               console.log(res.data);
    //             }
    //           }
    //         )
    //         .catch(err => console.log(err))
    // }

//     async function handleLikeClicked(e){
//         event.preventDefault();
//         axios.post(config.likePost + id)
//             .then(res => {
//                 if(res.status == "200"){
//                   Router.push("/");
//                 }
//                 else {
//                   console.log(res.data);
//                 }
//               }
//             )
//             .catch(err => console.log(err))
//     }

//     async function handleCommentClicked(e){
//         event.preventDefault();
//     }


//     useEffect(() => {
//         axios.get(config.getLikesPoll + id)
//         .then(res => {
//             setLikes(res?.data)
//         })
//         .catch(err => console.log(err))
//       },[])

    const getAllOptions = options.map(function(option){
      return <DisplayOption key={option.length} id={option.length} percentage={"50%"} name={"Avinash"} text ={option} useroption={true}/> 
    });

    return (
        <div className={classes.displaypoll}>
            <Card className={classes.displaypollcontainer}>
                <div className={classes.displaypollcenter}>
                    <div style={{
                        backgroundImage: "url(" + pic + ")",
                        backgroundSize: "cover"
                        }} 
                        className={classes.displaypollpic}>
                    </div>
                    <div className={classes.displaypollheadernames}>
                        <div style={{display: "flex"}}>
                            <div className={classes.displaypollpersonname}>{name} </div>
                            <div className={classes.displaypollcreatedtext}>{"created a poll"}</div>
                        </div>
                        <div className={classes.rolechip}>
                            <div className={classes.rolechiptext}>{role}</div>
                        </div>
                    </div>
                    <div className={classes.displaypollleftlinks}>
                        <MoreHoriz onClick={handleClick} className={classes.headerdropdown}/>
                            {userpoll? 
                            <Menu
                                id="my-posts"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                              <MenuItem className={classes.dropdowntext} onClick={null}><Delete className={classes.dropdownicons}/>Delete Poll</MenuItem>
                            </Menu>:
                            <Menu 
                              id="others-post"
                              anchorEl={anchorEl}
                              keepMounted
                              open={Boolean(anchorEl)}
                              onClose={handleClose}
                            >
                              <MenuItem className={classes.dropdowntext} onClick={handleReportPoll}><Report className={classes.dropdownicons}/>Report Poll</MenuItem>
                            </Menu>
                            }
                        <div className={classes.displaypolltime}>{time}</div>
                    </div>
                </div>
                <div className={classes.textboxcontainer}>
                    <div className={classes.displaytextcontent}> {content} </div>
                    {getAllOptions}
                    {attachments && 
                        <div className={classes.showimages}>
                            <Close onClick={() => setState({...state,attachments: null})} className={classes.closeimage}/>
                            <img src={state.attachments}/>
                        </div>
                    }
                </div>
                <div className={classes.displaypollinfocontainer}>
                    <div className={classes.likedimages}>
                        {/* //should change by Routes */}
                        <div style={{
                            backgroundImage: "url(" + pic + ")",
                            backgroundSize: "cover"
                            }} 
                            className={classes.displaypolllikedpic}>
                        </div>
                        <div style={{
                        backgroundImage: "url(" + pic + ")",
                        backgroundSize: "cover"
                        }} 
                        className={classes.displaypolllikedpic}>
                        </div>
                        <div style={{
                        backgroundImage: "url(" + pic + ")",
                        backgroundSize: "cover"
                        }} 
                        className={classes.displaypolllikedpic}>
                        </div>
                        <div className={classes.likednormaltext}>
                            Liked by {" "}<div className={classes.likedboldtext}> {"Avinash"} </div>{" "} and {"10"} others
                        </div>
                    </div>
                    <div className={classes.commentsshare}>
                        <div className={classes.infotext}>
                            {"10"}{" "} comments
                        </div>
                    </div>
                </div>
                <Divider variant="fullWidth" orientation="horizontal"/>
                <div className={classes.buttonscontainer}>
                    <div onClick={null} className={classes.buttondiv}>
                      <ThumbUp className={classes.iconstyles}/> 
                      <div className={classes.buttonstext}>like</div>
                    </div>
                    <div className={classes.buttondiv}>
                      <Comment onClick={null} className={classes.iconstyles}/>
                      <div className={classes.buttonstext}>comment</div>
                    </div>
                </div>
                <Divider variant="fullWidth" orientation="horizontal"/>
                <div>
                {/* {getAllComments} */}
                </div>
                {/* {!commentsDisabled && <AddComment postId={id}/>} */}
            </Card>
            {reportPoll && 
              <Dialog
                fullScreen={fullScreen}
                open={handleReportPoll}
                onClose={handleCloseReport}
                aria-labelledby="report-post"
              >
                <div className={classes.dialogtitle} id="report-post">{"Report this post"}</div>
                <DialogContent>
                  <DialogContentText className={classes.dialogcontent}>
                    Hello {loggedInId}, help us to understand why you want to report this Poll
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

export default DisplayPoll;