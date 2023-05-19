import React,{ useState,useEffect } from 'react'
import Router from 'next/router'
import styles from 'static/styles/videoCallStyles'
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios'
import config from '../../../config'
import setAuthToken from '../../services/setAuthToken'
import InviteModal from '../invite/invite'

import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import CallEndIcon from '@material-ui/icons/CallEnd';
import AddIcon from '@material-ui/icons/Add';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import FullscreenIcon from '@material-ui/icons/Fullscreen';

const useStyles = makeStyles(styles);

const VideoCall = ({roomId,name,children})=>{
    const classes = useStyles();
    let [jitsiClient,setClient] = useState()
    let [isMicOn,setMic] = useState(true)
    let [isCameraOn,setCamera] = useState(true)
    let [isTileViewOn,setTileView] = useState(false)
    let [state,setState] = useState({
        logintoken:'',
    })
    const [isInviteOpened, setInviteOpened] = useState(false);
    const openInviteModal = ()=>{setInviteOpened(true)}
    const closeInviteModal = ()=>{setInviteOpened(false)}

    const toggleAudio = ()=>{
        if(jitsiClient){
            jitsiClient.executeCommand('toggleAudio')
            setMic(!isMicOn)
        }
        else console.log("Audio not toggled")
    }
    const toggleVideo = ()=>{
        if(jitsiClient){
            jitsiClient.executeCommand('toggleVideo')
            setCamera(!isCameraOn)
        }
        else console.log("Video not toggled")
    }
    const toggleTileView = ()=>{
        if(jitsiClient){
            jitsiClient.executeCommand('toggleTileView')
            setTileView(!isTileViewOn)
        }
        else console.log("Video not toggled")
    }


    const leaveCall = async () => {
        const payload = {roomId}
        return axios.post(config.leaveVideoCall,payload)
        .then(res=>{
            console.log(`Meeting Left ${res}`)
            jitsiClient.dispose()
            Router.push('/home')
        }).catch(err=>{
            console.log(`Meeting Left ${err.response}`)
            jitsiClient.dispose()
            Router.push('/home')
        })
    }
    const startCall = ()=>{
        const domain = 'meet.jit.si';
        const options = {
            roomName: roomId,
            width: '100%',
            height: '100%',
            userInfo:{
                displayName:name
            },
            parentNode: document.querySelector('#video-call-container'),
            configOverwrite:{
                enableClosePage: true,
                SHOW_PROMOTIONAL_CLOSE_PAGE: true,
                enableWelcomePage: false,
                prejoinPageEnabled: false,
                subject:"Amphi Conference",
            },
            interfaceConfigOverwrite:{
                GENERATE_ROOMNAMES_ON_WELCOME_PAGE: false,
                DISPLAY_WELCOME_PAGE_CONTENT: false,
                HIDE_INVITE_MORE_HEADER: true,
                MOBILE_APP_PROMO: false,
                SHOW_CHROME_EXTENSION_BANNER: false,
                TOOLBAR_BUTTONS: [
                    // 'microphone', 'camera', 'desktop', 'fullscreen',
                    // 'fodeviceselection', 'hangup', 'chat', 'recording',
                    // 'sharedvideo', 'settings', 'raisehand',
                    // 'videoquality', 'filmstrip', 'shortcuts',
                    // 'tileview', 'mute-everyone',
                ],
            }    
        };
        let jitsiClient = new JitsiMeetExternalAPI(domain, options)
        
        return jitsiClient
    }

    useEffect(()=>{
        setState({...state, logintoken : localStorage.getItem('LoginToken') })
    },[state.logintoken])
    
    setAuthToken(state.logintoken)



    useEffect(()=>{
        if (window.JitsiMeetExternalAPI) setClient(startCall());
        else alert('Jitsi Meet API script not loaded');

    },[])

    return (
        <div id="video-call-container" className={classes.video_call_container} >
             <InviteModal opened={isInviteOpened} closeModal={closeInviteModal} roomId={roomId}  />
            <div className={classes.bottom_navigation_toggler} >
                <div className={classes.bottom_navigation} >
                    {children}        
                    <div className={classes.call_controls}>
                        <div className={`${classes.control} ${classes.right_border}`} onClick={openInviteModal} >
                            <AddIcon/>
                        </div>
                        <div className={`${classes.control} ${classes.right_border}`} onClick={toggleAudio} >
                            {
                                isMicOn &&
                                <MicIcon /> ||
                                <MicOffIcon/>
                            }
                        </div>
                        <div className={`${classes.control} ${classes.right_border} ${classes.red}`} onClick={leaveCall}  >
                            <CallEndIcon/>
                        </div>
                        <div className={`${classes.control} ${classes.right_border}`} onClick={toggleVideo} >
                            {
                                isCameraOn &&
                                <VideocamIcon/> ||
                                <VideocamOffIcon/>
                            }
                        </div>
                        <div className={classes.control} onClick={toggleTileView} >
                            {
                                isTileViewOn &&
                                <FullscreenIcon/> ||
                                <ViewModuleIcon/> 
                                
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default VideoCall