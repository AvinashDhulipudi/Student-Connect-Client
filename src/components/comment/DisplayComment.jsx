import React, { useEffect } from "react";
import axios from "axios";
import Router from "next/router";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import InputBase from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
// @material-ui/icons
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import Report from "@material-ui/icons/Report";
import Mood from "@material-ui/icons/Mood";
import SendSharp from "@material-ui/icons/SendSharp";
import Close from "@material-ui/icons/Close";
// core components
import styles from "./displaycommentstyles";
import pic from "static/img/face.jpg";
import config from "../../../config.json"

const useStyles = makeStyles(styles);


const DisplayComment = ({text, id, name, likes, replies, postId, usercomment}) => {
    const classes = useStyles();

    //Comment states and variables
    const [editClicked, setEditClicked] = React.useState(false);
    const [reportComment, setReportComment] = React.useState(false);
    const [comment, setComment] = React.useState(text);
    // menu variables
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleEditClose = () => {
      setComment(text);
      setEditClicked(false);
      setAnchorEl(null);
    };

    //report comment varaiables
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const handleReportComment = () => {
      setReportComment(true);
    };
    const handleCloseReport = () => {
      setReportComment(false);
      setAnchorEl(null);
    };

    const handleEditing = (event) => {
      setComment(event.target.value);
    };

    async function handleEditComment(e){
      event.preventDefault();
      const body = {
        text: comment,
        postId: postId
      }
      axios.put(config.editComment+id, body)
            .then(res => {
                if(res.status == "200"){
                    setEditClicked(false);
                    setAnchorEl(null);
                }
                else {
                  console.log(res.data);
                }
              }
            )
            .catch(err => console.log(err))
    }

    async function handleDeleteComment(e){
        event.preventDefault();
        axios.delete(config.deleteComment + id)
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

    return (
        <div className={classes.commentsection}>
            <div className={classes.displaycommentsection}>
                <div style={{
                    backgroundImage: "url(" + pic + ")",
                    backgroundSize: "cover"
                    }} 
                    className={classes.displaypostpic}>
                </div>
                {editClicked && 
                <div className={classes.addcommentinput}>
                  <InputBase
                  id="standard-textarea"
                  value= {comment}
                  multiline
                  fullWidth
                  onChange={handleEditing}
                  inputProps={{"aria-label": "Editing a comment" }}
                  className={classes.addcommentfield}
                  endAdornment ={(
                      <InputAdornment position="end">
                          <Mood className={classes.icons}/>
                          <SendSharp className={classes.icons} onClick={handleEditComment}/>
                      </InputAdornment>
                    )}
                  />
                  <div className={classes.canceledit} onClick={handleEditClose}>cancel</div>
                </div>
                }
                {!editClicked &&
                <div style={{display: "flex", width: "100%"}}>
                <div className={classes.commentcontent}>
                    <div className={classes.commenttextcontent}>
                    <div className={classes.commenttext}>
                        <p><span style={{color: "#795993", fontWeight: "bold", paddingRight: "5px"}}> {name} </span>{comment}</p>
                    </div>
                    </div>
                    <div className={classes.commentsinfo}>
                    <div className={classes.commentsinfotext}>
                        {likes}
                    </div>
                    <div className={classes.dotseperator}></div>
                    <div className={classes.commentsinfotext}>
                        {replies}
                    </div>
                    </div>
                </div>
                <MoreHoriz className={classes.morehorizcomment} onClick={handleClick}/>
                {usercomment?
                <Menu
                    id="my-comment"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem className={classes.dropdowntext} onClick={() => setEditClicked(true)}><Edit className={classes.dropdownicons}/>Edit Comment</MenuItem>
                    <MenuItem className={classes.dropdowntext} onClick={handleDeleteComment}><Delete className={classes.dropdownicons}/>Delete Comment</MenuItem>
                </Menu>:
                <Menu
                    id="others-comment"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem className={classes.dropdowntext} onClick={handleReportComment}><Report className={classes.dropdownicons}/>Report Comment</MenuItem>
                </Menu>
                }
                </div>
                }
            </div>
            {reportComment && 
              <Dialog
                fullScreen={fullScreen}
                open={reportComment}
                onClose={handleCloseReport}
                aria-labelledby="report-comment"
              >
                <div className={classes.dialogtitle} id="report-comment">{"Report this comment"}<Close style={{float: "right", cursor: "pointer"}} onClick={handleCloseReport}/></div>
                <DialogContent>
                  <DialogContentText className={classes.dialogcontent}>
                    Hello {"Asbhi"}, help us to understand why you want to report this comment
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

export default DisplayComment;