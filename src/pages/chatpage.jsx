import React, { useState, useEffect } from 'react';
import axios from "axios";
import Router, { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import styles from 'static/styles/chatpagestyles';
import ChatList from '../components/chatpage/chatlist';
import ChatBody from '../components/chatpage/chatbody';

const useStyles = makeStyles(styles);
const ChatPage = () =>{
    const classes = useStyles();
    const router = useRouter();
    console.log(router.query);
    useEffect(()=> {
        if(!!!localStorage.getItem('LoginToken')){
            Router.push('/')
        }
    })
    const [selected, setSelected] = useState({
        name:router.query.name,
        message:"",
        time:router.query.time,
        newmessages:"",
        pic: router.query.pic,
        isonline: router.query.isonline
    })
    return(
        <div className={classes.pagecontainer}>
            <style jsx global>{`
                body {
                margin: 0px;
                padding: 0px;
                padding-top: 8px;
                }`}
            </style>
            <div className={classes.leftcontainer}>
                <ChatList selected={selected} setSelected={setSelected}/>
            </div>
            <div className={classes.rightcontainer}>
                <ChatBody selected={selected} setSelected={setSelected}/>
            </div>
        </div>
    )
}
export default ChatPage;