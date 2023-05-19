import React, { useState, useEffect, useContext } from 'react';
import Router from 'next/router';
import AppContext from '../contexts/AppContext'

import io from 'socket.io-client'
import config from '../../../config'
import setAuthToken from '../../services/setAuthToken'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import AES256 from 'aes256'
import { useUser } from '../../services/hooks'

import CallIcon from '@material-ui/icons/Call';
import CallEndIcon from '@material-ui/icons/CallEnd';
import styles from './incomingCallStyles';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(styles)




const IncomingCall = ()=>{
    const classes = useStyles()
    const userId = useUser()
    const { socket, setSocket } = useContext(AppContext);
    const [ state,setState ] = useState({
        logintoken:'',
        groups:[]
    });
    const [callIncoming,setCallIncoming] = useState(false)
    const [caller,setCaller] = useState()
    const [room,setRoom] = useState()
    const fetchGroups = async () => {
      return axios.get(config.getAllGroups)
      .then(res=>{
          setState({...state,groups:res.data})
          return true
      })
      .catch(err=>{
          console.log("error" ,err)
          return false
      })  
    }

    const handleIncomingCall = ({caller,room})=>{
        console.log("room incoppming \n\n\n",room)
        if(userId == caller.id) return //Dont send call to Caller
        setCaller(caller)
        setRoom(room)
        setCallIncoming(true)
    }
    const acceptCall = ()=>{
        Router.push({
            pathname:'/call/group',
            query:{r:room.encrypted_id}
        })
        setCallIncoming(false)
    }
    const declineCall = async ()=>{
        const payload={roomId:room.id}
        axios.post(config.declineVideoCall,payload)
        .then(res=>{
            console.log("Decline call response ",res)
        })
        .catch(err=>console.log("Error declining call ",err))
        setCaller(null)
        setRoom(null)
        setCallIncoming(false)
        

    }
    const initialiseSocket = ()=>{
            
        setSocket(io('ws://localhost:8080/'))
        socket.on('connect',()=>{
            console.log("Connected : ",socket.id)
        })
        if( userId && socket.id) {
            socket.emit('userid',userId)
        }
        console.log("SOCKET ",socket.id)
        state.groups.forEach(group=>{
            console.log("Joined Group : ",group.title)
            socket.emit('joinGroup',{groupName:group.id})
        })
        socket.on('incomingCall',handleIncomingCall)
        socket.on('callReplied',()=>{
            setCaller(null)
            setRoom(null)
            setCallIncoming(false)
        })
    }

    useEffect(()=>{
        setState({...state, logintoken : localStorage.getItem('LoginToken') })
    },[state.logintoken])
    
    setAuthToken(state.logintoken)
    
    useEffect(()=>{
        const setupSocket = async ()=>{
            console.log("Setting up socket now")
            let isGroupFetched = await fetchGroups()
            if(!isGroupFetched) console.log("Cant fetch groups ",isGroupFetched)
        }
        console.log("State ",state)
        if(state.logintoken) setupSocket()

        return ()=>{
            socket.close()
        }
    },[state.logintoken])

    useEffect(()=>{
        initialiseSocket()
    },[state.groups])
    return (
        <div className={`${classes.call_container} ${callIncoming?classes.show_call:null}`}>
            <div className={classes.caller_info_container} >
                <div className={classes.caller_icon} ></div>
                <div className={classes.caller_info} >
                    <div className={classes.caller_name} > {caller?caller.name:''} </div>
                    <div className={classes.caller_role} >{caller?caller.role:''}</div>
                </div>
            </div>
            <div className={classes.call_controls} >
                <div className={classes.call_accept} onClick={acceptCall} >
                    <CallIcon className={classes.control_icon} />
                </div>
                <div className={classes.call_reject} onClick={declineCall} >
                    <CallEndIcon className={classes.control_icon}/>
                </div>
            </div>
        </div>
    )
}

export default IncomingCall;