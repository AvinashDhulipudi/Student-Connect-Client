import React, { useEffect } from "react";
import axios from "axios";
import Router from "next/router";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card"
import Radio from "@material-ui/core/Radio"
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { TextareaAutosize } from "@material-ui/core";
// @material-ui/icons
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Comment from "@material-ui/icons/Comment";
import Share from "@material-ui/icons/Share";
import Close from "@material-ui/icons/Close";
import SpeakerNotesOff from "@material-ui/icons/SpeakerNotesOff";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import Report from "@material-ui/icons/Report";
// core components
import styles from "./creategroupstyles";
import pic from "static/img/face.jpg";
import AddComment from "../comment/AddComment";
import DisplayComment from "../comment/DisplayComment";
import config from "../../../config.json"

const useStyles = makeStyles(styles);

const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: '#795993',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#795993',
        },
        '&:hover fieldset': {
          borderColor: '#795993',
        }
      },
      '& .MuiOutlinedInput-input': {
        padding: "15px !important",
        fontFamily: "poppins",
        fontWeight: "500",
        fontSize: "12px",
        lineHeight: "18px",
        color: "rgba(37, 40, 43, 0.7)",
        width: "350px"
      },
      '& .Mui-disabled':{
          color: "#795993"
      }
    },
  })(TextField);

const CreateGroup = () => {
    const classes = useStyles();
    const [state,setState] = React.useState({
      name: "",
      visibility: ""
    })

    const handleChange = (prop) => (event) => {
      setState({ ...state, [prop]: event.target.value });
    };
    
    async function handleCreateGroup(e){
      event.preventDefault();
      const body = {
        title: state.name,
        type: state.visibility,
        category: state.name
        // category to be checked
      }
  
      axios.post(config.createGroup, body)
      .then(res => {
          if(res.status == "201"){
              Router.push('/groups/viewall');
          }
          else {
            console.log(res);
          }
        }
      )
      .catch(err => console.log(err))
      }


    return (
            <div className={classes.Dialogcontent}>
            <div className={classes.textbox}>
                <div className={classes.textboxtitle}> Name : </div>
                <div className={classes.textfield}>
                    <CssTextField
                    variant="outlined"
                    placeholder="Group Name"
                    value= {state.name}
                    id="name"
                    type="string"
                    onChange={handleChange('name')}
                    />
                </div>
            </div>
            <div className={classes.textbox}>
                <div className={classes.textboxtitle}> Type Group : </div>
                <div className={classes.textfieldbox}>
                    <div className={classes.visibilityitem}>
                      <Radio value="Public" checked={state.visibility === "Public"} onChange={() => setState({...state, visibility: "Public"})} className={classes.radiobutton}/>
                      <Visibility className={classes.Visibilityicon}/>
                      <div className={classes.visibilityfont}>Public</div>
                    </div>
                    <div className={classes.visibilityitem}>
                      <Radio value="Private" checked={state.visibility === "Private"} onChange={() => setState({...state, visibility: "Private"})} className={classes.radiobutton}/>
                      <VisibilityOff className={classes.Visibilityicon}/>
                      <div className={classes.visibilityfont}>Private</div>
                    </div>
                </div>
                <div onClick={handleCreateGroup} className={classes.savebutton}><div className={classes.savebuttontext}>Save</div></div>
            </div>
            </div>
    )
  }

export default CreateGroup;