import React, { useState, useEffect } from 'react';
import axios from "axios";
import Router from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import styles from 'static/styles/chatpagestyles';
import Chat from '../chat/chat';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(styles);
const ChatList = ({selected, setSelected}) =>{
    const classes = useStyles();
    return(
        <div>
            <div className={classes.head}>
                <div>Chats</div>
                <div className={classes.addbutton}><AddCircleIcon style={{color:"#987CC5",fontSize:"40px"}}/></div>
            </div>
            <div className={classes.filter}>Recent Chats <ExpandMoreIcon/></div>
            <Chat customprop={true} selected={selected} setSelected={setSelected}/>
        </div>
    )
}
export default ChatList;