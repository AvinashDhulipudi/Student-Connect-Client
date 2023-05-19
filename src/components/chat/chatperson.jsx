import React from "react";
import Router, { useRouter } from "next/router";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';

import styles from "./chatstyles";

const useStyles = makeStyles(styles);

const ChatPerson = ({name, message, pic, time, isonline, newmessages, customstyle, setSelected}) => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <div className={customstyle?classes.personcontainernew:classes.personcontainer} 
    onClick={()=>(Router.push({pathname:"/chatpage", query: {name, pic, time, isonline, message, newmessages}}), customstyle?setSelected({name:name, message:message, pic: pic, time:time, isonline:isonline, newmessages:newmessages}):undefined)}>
        <div className={classes.imagecontainer}>
        <div style={{
            backgroundImage: "url(" + pic + ")",
            backgroundSize: "cover"
        }} className={classes.imagecontainer}>
        {isonline && <div className={classes.isonline}></div>}
        </div>
        </div>
        <div className={classes.textcontainer}>
        <div className={classes.namecontainer}>
            <div className={classes.nametext}>{name}</div>
            {newmessages && <div className={classes.notification}><div className={classes.notificationtext}> {newmessages} </div></div>}
        </div>
        <div className={classes.messagecontainer}>
            {message}
        </div>
        </div>
        <div className={classes.timecontainer}>
            {time}
        </div>
    </div>
  )
}

ChatPerson.propTypes = { 
    name: PropTypes.string.isRequired, 
    isonline: PropTypes.bool, 
    message: PropTypes.string, 
    pic: PropTypes.string.isRequired,
    time: PropTypes.string,
    newmessages: PropTypes.string,
    customstyle: PropTypes.bool 
}

export default ChatPerson;