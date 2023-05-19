import React,{ useRef,useState,useEffect,useContext } from 'react'
import Router from 'next/router'
import { useRouter } from 'next/router'
import VideoCall from '../../components/videocall/videocall.jsx'
import config from '../../../config'
import setAuthToken from '../../services/setAuthToken'
import axios from 'axios'
import base64 from 'base64-url'
import { useUser } from '../../services/hooks'
import io from 'socket.io-client'
import { makeStyles } from "@material-ui/core/styles";
import styles from 'static/styles/videoCallStyles'
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

import AppContext from '../../components/contexts/AppContext'
const useStyles = makeStyles(styles);

const GroupCall = ()=>{
    const classes = useStyles();
    const { invites, forceURL, setForceURL } = useContext(AppContext)
    let [state,setState] = useState({
        roomAvailable:false,
        logintoken:'',
        name: ''
    })
    let [name, setName] = useState("")
    let [currentRoom, setCurrentRoom] = useState()
    const router = useRouter();
    const encrypted_room = router.query.r;
    const user = useUser()
    const linkRef = useRef(null);
    const copyLink = () => {
        linkRef.current.select();
        document.execCommand('copy');
    }
    const getRoomIfExists = async () => {
        let b64_encoded_id = base64.encode(encrypted_room)
        // let payload={encrypted_id:b64_encoded_id}
        return new Promise(async (resolve,reject)=>{
            return axios.get(config.getRoomByEncryptedId+b64_encoded_id).then(res=>{
                if(res.data) return resolve({exist:true,room:res.data})
                else return reject("Unexpected Error") 
            }).catch(err=>{
                return resolve({exist:false,error:err})
            })
        })
    }

    const joinCall = async (room) => {
        const payload = {roomId:room.id}
        return new Promise(async (resolve,reject)=>{
            return axios.post(config.joinVideoCall,payload).then(res=>{
                return resolve(res)
            }).catch(err=>{
                if(!!err.response) return reject(err)
                return reject(err.response)
            })
        })
    }
    useEffect(()=>{
        if(!localStorage.getItem("LoginToken")){
            alert("Login To Join Call")
            setForceURL(`/call/group?r=${encrypted_room}`)
            Router.push({
                pathname:'/login',
            }) 
        }else{
            let ws = io("ws://localhost:8080/");
            ws.on('connect',()=>{
                console.log("Connected : ",ws.id)
                //Register User on Socket
                ws.emit('userid',user)
            })
            ws.on('participantAdded',(participant)=>{
                alert("Participant Added : "+participant.name)
            })
            ws.on('participantLeft',(participant)=>{
                alert("Participant Left : "+participant.name)
            })
            ws.on('callDeclined',(participant)=>{
                alert("Call Rejected by  "+participant.name)
            })
            window.onbeforeunload = ()=>{
                ws.emit('close',user)
                ws.close()
            } 
        }
    },[currentRoom,user])


    useEffect(()=>{
        setState({...state, logintoken : localStorage.getItem('LoginToken') })
    },[state.logintoken])
    
    setAuthToken(state.logintoken)
    
    useEffect(()=>{
        const startVideoCall = async ()=>{
            if(state.logintoken){ 
                try{
                    let { exist, room, error } = await getRoomIfExists()
                    console.log("Room Exists? : ",exist)
                    if(exist){
                        setCurrentRoom(room)
                        if(room.status=="EXPIRED"){
                            alert("The meeting has beend ended")
                            Router.push("/home")
                            return
                        }
                        //Join user
                        let status = await joinCall(room) 
                        setState({...state,roomAvailable: true})
                    }
                    else{
                        console.log("Room Status : ",error.response)
                    }
                    
                }catch (e){
                    console.log("Error Initialising Call => ",e)
                }
                
            }
        }

        startVideoCall()
            
    },[state.logintoken])

    useEffect(()=>{
        if(state.logintoken){
            axios.get(config.getInfo)
            .then(res=>{
                if(!!!res.data.name)  setName("Anonymous")
                else setName(res.data.name)
            }).catch(err=>console.log("Error Fetching Name",err))
        }
    },[state.logintoken])


    return (
        <div>
            
            { 
                state.roomAvailable && 
                <div>
                    <VideoCall roomId={currentRoom.id} name={name}>
                        <div className={classes.link_container} onClick={copyLink}>
                            <div className={classes.link_title}>Copy Link to Share</div>
                            <div className={classes.link_box}>
                                <input readOnly={true} className={classes.link_text} ref={linkRef} value={window.location.href}></input>
                                <div className={classes.link_icon} > <FileCopyOutlinedIcon style={{fontSize:'20px'}}/> </div>
                            </div>
                        </div>
                    </VideoCall>
                </div>
            }
        </div>
    )
}


export default GroupCall;