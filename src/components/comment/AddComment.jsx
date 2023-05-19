import React, { useEffect } from "react";
import axios from "axios";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputBase from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';
import Popper from '@material-ui/core/Popper';
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import ThumbUp from "@material-ui/icons/ThumbUp";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import Comment from "@material-ui/icons/Comment";
import Share from "@material-ui/icons/Share";
import SendSharp from "@material-ui/icons/SendSharp";
import Mood from "@material-ui/icons/Mood";

// core components
import styles from "./addcommentstyles";
import pic from "static/img/face.jpg";
import config from "../../../config.json"
import DisplayComment from "./DisplayComment";

const useStyles = makeStyles(styles);


const AddComment = ({postId}) => {
    const classes = useStyles();
    const [state, setState] = React.useState({
      text: '',
      comments: [],
      postId: postId
    });
    const handleChange = (prop) => (event) => {
      setState({ ...state, [prop]: event.target.value });
    };

    async function onCreateCommentClicked(e){
      event.preventDefault();
      const newcomment = {
        body: state.text,
        postId: state.postId
      }
      axios.post(config.createNewComment,newcomment)
          .then(res => {
              if(res.status == "201"){
                  var temp = state.comments;
                  temp.push(newcomment);
                  setState({...state, comments: temp, text: ''})
                  console.log(state.comments)
              }
              else {
                console.log(res.data);
              }
            }
          )
          .catch(err => console.log(err))
    }

    var newComments = state.comments.map(comment => {
      return <DisplayComment key={Math.random()} postId={comment.postId} isDeleted={false} id={state.comments.length} text={comment.body} name={"Avinash"} likes= "3 likes" replies="4 replies"/>
      //name should be user name
    });

    return (<div>
        {newComments}
        <div className={classes.addcommentsection}>
            <div style={{
                backgroundImage: "url(" + pic + ")",
                backgroundSize: "cover"
                }} 
                className={classes.displaypostpic}>
            </div>
            <div className={classes.addcommentinput}>
                <InputBase
                id="standard-textarea"
                placeholder="Add a comment ..."
                multiline
                fullWidth
                onChange={handleChange('text')}
                value={state.text}
                inputProps={{"aria-label": "Add a comment" }}
                className={classes.addcommentfield}
                endAdornment ={(
                    <InputAdornment position="end">
                        <Mood className={classes.icons}/>
                        <SendSharp className={classes.icons} onClick={onCreateCommentClicked}/>
                    </InputAdornment>
                  )}
                />
            </div>
        </div>
        </div>
    )
  }

export default AddComment;