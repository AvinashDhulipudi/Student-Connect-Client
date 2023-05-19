import React from "react";
import Router from "next/router";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import Card from '@material-ui/core/Card';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
//icons
import SearchIcon from "@material-ui/icons/Search";
import Notifications from "@material-ui/icons/Notifications";
import Face from "@material-ui/icons/Face";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import pic from "static/img/face.jpg";

import InviteModal from '../invite/invite'

import styles from "./chatstyles";
import ChatPerson from "./chatperson";
import { useUser } from '../../services/hooks'

const useStyles = makeStyles(theme => ({
  root: {
    padding: "2px",
    display: "flex",
    alignItems: "center",
    borderRadius: "10px",
    backgroundColor: "#EEECEC",
    margin: "auto"
  },
  rootoverride: {
    backgroundColor: "#EEECEC",
    padding: "2px",
    display: "flex",
    alignItems: "center",
  },
  input: {
    marginLeft: theme.spacing(5),
    flex: 1
  },
  iconButton: {
    padding: "10px"
  },
  ...styles
}));

const Chat = ({customprop, selected, setSelected}) => {
  const classes = useStyles();
  const user = useUser()


  const [isInviteOpened, setInviteOpened] = React.useState(false);
  const openInviteModal = ()=>{setInviteOpened(true)}
  const closeInviteModal = ()=>{setInviteOpened(false)}

  return (
      <div className={customprop?classes.chatcontaineroverride:classes.chatcontainer}>
        <div className={classes.searchbox}>
            <Paper component="form" className={customprop?classes.rootoverride:classes.root}>
              <InputBase
                className={classes.input}
                placeholder="Search chat"
                inputProps={{ "aria-label": "search for groups and classes" }}
              />
              <IconButton
                type="submit"
                className={classes.iconButton}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            </Paper>
        </div>
        <div className={classes.people}>
            <ChatPerson
                name="Avinash"
                message="Happy Birthday"
                time="10 mins ago"
                newmessages="9"
                pic= {pic}
                isonline={true}
                customstyle={customprop}
                selected={selected}
                setSelected={setSelected}
            />
            <ChatPerson
                name="Aman"
                message="Happy Birthday"
                time="10 mins ago"
                pic= {pic}
                isonline={true}
                customstyle={customprop}
                selected={selected}
                setSelected={setSelected}
            />
            <ChatPerson
                name="Amit"
                message="Happy Birthday"
                time="10 mins ago"
                newmessages="4"
                pic= {pic}
                customstyle={customprop}
                selected={selected}
                setSelected={setSelected}
            />
            <ChatPerson
                name="Joy"
                message="Happy Birthday"
                time="10 mins ago"
                pic= {pic}
                isonline={true}
                customstyle={customprop}
                selected={selected}
                setSelected={setSelected}
            />
            <ChatPerson
                name="John"
                message="Happy Birthday"
                time="10 mins ago"
                newmessages="2"
                pic= {pic}
                isonline={true}
                customstyle={customprop}
                selected={selected}
                setSelected={setSelected}
            />
            <ChatPerson
                name="Avinash"
                message="Happy Birthday"
                time="10 mins ago"
                pic= {pic}
                customstyle={customprop}
                selected={selected}
                setSelected={setSelected}
            />
        </div>
        <InviteModal opened={isInviteOpened} closeModal={closeInviteModal}  />
        {customprop ? undefined :
          <div className={classes.buttons}>
            <div className={classes.buttonstyle}>
                <div className={classes.buttontext}>
                  New Message
                </div>
            </div>
            <div className={classes.buttonstyle}>
                <div className={classes.buttontext} onClick={openInviteModal}>
                  New Video Call
                </div>
            </div>
          </div>
        }
      </div>
  )
}

export default Chat;