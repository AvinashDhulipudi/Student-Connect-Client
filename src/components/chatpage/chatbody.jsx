import React, { useState, useEffect } from 'react';
import axios from "axios";
import Router from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import styles from 'static/styles/chatpagestyles';
import IconButton from '@material-ui/core/IconButton'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import VideocamIcon from '@material-ui/icons/Videocam';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles(styles);
const ChatBody = ({selected, setSelected}) =>{
    const classes = useStyles();
    const [state, setState] = useState({
        message: ""
    })

    const handleChange = (event) =>{
        setState({message:event.target.value})
    }
    return(
        <div>
            <div className={classes.chatheader}>
                <div className={classes.nameandimgcontainer}>
                    <div className={classes.imagecontainer}>
                        <div style={{
                            backgroundImage: "url(" + selected.pic + ")",
                            backgroundSize: "cover"
                        }} className={classes.imagecontainer}>
                        {selected.isonline && <div className={classes.isonline}></div>}
                        </div>
                    </div>
                    <div className={classes.namecontainer}>
                        <div className={classes.nametext}>{selected.name}</div>
                        {selected.name && <div className={classes.lastseen}>Last seen 5 min ago</div>}
                    </div>
                    <div className={classes.buttons}>
                        <IconButton><AddCircleOutlineIcon style={{fontSize: "30px", color:"#DADADA"}}/></IconButton>
                        <IconButton><VideocamIcon style={{fontSize: "30px", color:" #707C97"}}/></IconButton>
                        <IconButton onClick={()=>Router.push('/home')}><FullscreenExitIcon style={{fontSize: "30px", color:" #707C97"}}/></IconButton>
                    </div>
                </div>
            </div> 
            <div className={classes.messagescontainer}></div>
            <div className={classes.newmsgcontainer}>
                <div className={classes.inputcontainer}>
                    <AddCircleIcon style={{color:"#987CC5",fontSize:"38px"}}/>
                    <input value={state.message} onChange={handleChange} type="string" className={classes.input} placeholder="Type your text here"></input>
                    <SentimentSatisfiedIcon style={{fontSize:"28px", color: "rgba(112, 124, 151, 0.5)",paddingTop: "5px"}}/>
                    <div className={classes.sendbutton}><SendIcon style={{fontSize:"22px", color: "#FFFFFF", padding: "5px 5px 5px 7px"}}/></div>
                </div>
            </div>
        </div>
        
    )
}
export default ChatBody;