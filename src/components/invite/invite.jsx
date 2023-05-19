import React, { useState,useEffect,useContext } from 'react'
import Router from 'next/router';
import { makeStyles, withStyles } from "@material-ui/core/styles";

import axios from 'axios'
import config from '../../../config'
import setAuthToken from '../../services/setAuthToken'
import AppContext from '../contexts/AppContext'
import { useUser } from '../../services/hooks'

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import GroupItem from "./groupItem"
import IndividualItem from "./individualItem"

import styles from "./invitestyles";

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', 
        overflowY : 'scroll'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        width: "668px",
        height: "auto",
        padding:' 30px 15px',
        fontFamily: "Poppins",
        fontSize: "16px",
        fontWeight: "500",
        borderRadius: "12px",
        boxShadow: "0px 2px 15px rgba(0, 0, 0, 0.08)",
        outline:'none'
    },
    picker: {
        fontFamily: "Poppins",
    },
    root: {
        display: "flex",
        alignItems: "center",
        borderRadius: "50px",
        backgroundColor: "#EEECEC",
        margin: "auto",
        
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

const ColorButtonSubmit = withStyles((theme) => ({
    root: {
        height: "40px",
        fontFamily: "poppins",
        fontSize: "14px",
        fontWeight: "500",
        textTransform: "none",
        color: theme.palette.getContrastText("#795993"),
        backgroundColor: "#795993",
        '&:hover': {
            backgroundColor: "#795993",
        },
    },
}))(Button);


const InviteModal = ({opened,openModal,closeModal,roomId})=>{
    const classes = useStyles();
    let [state,setState] = useState({
        logintoken:'',
        allGroups:[],
        allIndividuals:[],
    })
    const { invites,setInvites } = useContext(AppContext)
    const currentUserId = useUser()
    const individualInvites=[],groupInvites=[]

    const selectGroupToInvite = (groupId)=>{
        let groups = [...state.allGroups]
        for(let i=0;i<groups.length;i++){
            if(groups[i].id == groupId){
                groups[i].selected = !groups[i].selected
                break
            }
        }
        console.log("Groups ",groups)
        setState({...state,allGroups:groups})
    }
    const selectIndividualToInvite = (userId)=>{
        console.log("Userid selection",userId)
        let individuals = [...state.allIndividuals]
        for(let i=0;i<individuals.length;i++){
            if(individuals[i].userModelRef.id == userId){
                individuals[i].selected = !individuals[i].selected
                break
            }
        }
        console.log("Individuals ",individuals)
        setState({...state,allIndividuals:individuals})
    }

    const sendInvites = async () => {
        // let groupInvites = []
        // let individualInvites = []
        state.allGroups.forEach(group=>{
            if(group.selected) groupInvites.push(group.id)
        })
        state.allIndividuals.forEach(user=>{
            if(user.selected) individualInvites.push(user.userModelRef.id)
        })
        console.log("Sending invite to",groupInvites,individualInvites)
        setInvites({groupInvites,individualInvites})
        if(!roomId) return startVideoCall()
        let payload = {roomId,individuals:individualInvites}
        axios.post(config.sendInvites,payload)
        .then(res=>{
            console.log('Invitations sent',res )
            closeModal()
        })
        .catch(err=>{
            console.log("Error inviting ",err)
        })
    }

    const createRoom = async ()=>{
        console.log("Invites array ",invites)
        const payload = {title:"VideoCall from Amphi",groups:groupInvites,individuals:individualInvites}
        return new Promise(async (resolve,reject)=>{
            return axios.post(config.videoCallWithLink,payload)
            .then(res=>{
                console.log("Room Created ",res) 
                return resolve(res.data) 
            })
            .catch(err=>{
                if(!!err.response) return reject(err)
                console.log("Error creating room",err.response)
                return resolve()
            })
        })
    }


    const startVideoCall = async () => {
        let { _, encrypted_id } = await createRoom()
        console.log("Enc rom",encrypted_id)
        Router.push({
            pathname:'/call/group',
            query:{r:encrypted_id}
        })
    }
    const fetchMembers = async (groupId)=>{
        return axios.get(config.getAllMembers+groupId)
        .then(res=> res.data)
        .catch(err=>false)
    }

    useEffect(()=>{
        setState({...state, logintoken : localStorage.getItem('LoginToken') })
    },[state.logintoken])
    
    setAuthToken(state.logintoken)

    useEffect(()=>{
        if(state.logintoken){
            axios.get(config.getAllGroups)
            .then(res=>{
                console.log("Res of groups ",res)
                let groups = res.data.map(group=> ({...group, selected:false}))
                setState({...state,allGroups:groups})
            })
            .catch(err=>{
                console.log("error" ,err)
            })
        }
    },[state.logintoken])

    const removeDuplicateUsers = (users)=>{
        let userSet = []
        const searchInSet = (memberId)=>{
            for(let member of userSet ){
                if(member.memberId == memberId) return true
            }
            return false
        }
        for(let user of users){
            //Remove duplicates and current loggedin user from invite list
            if(!searchInSet(user.memberId) && user.memberId!=currentUserId) userSet.push(user)
        }
        return userSet
        
    }

    useEffect(()=>{
        if(state.allGroups.length>0){
            let allmembers=[]
            state.allGroups.forEach(async group=>{
                let res = await fetchMembers(group.id)
                let members = res.map(user=> ({...user, selected:false}))
                if(members){
                    allmembers=removeDuplicateUsers([...members,...allmembers])
                    setState({...state,allIndividuals:allmembers})
                }
            })
        }
    },[state.allGroups.length])

    return (
        <div>
            <Modal
                disableEnforceFocus
                disableAutoFocus
                className={classes.modal}
                open={opened}
                onClose={closeModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}>
                <Fade in={opened}>
                    <div className={classes.paper}>
                        <div className={classes.searchbox_container}>
                            <Paper  elevation={0} component="form" className={classes.root}>
                            <InputBase
                                className={classes.input}
                                placeholder="Search participants, groups or individuals"
                                inputProps={{ "aria-label": "Invite participants, groups or individuals" }}
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
                        <div className={classes.scroll}>

                        {
                            !roomId &&
                            <div className={classes.groups_container} >
                                {
                                    state.allGroups.map(group => <GroupItem group={group} clickHandler={selectGroupToInvite} key={group.id}/>)
                                }
                            </div>
                        }
                            <div className={classes.individuals_container}>
                                {
                                    state.allIndividuals.map(user => <IndividualItem user={user} clickHandler={selectIndividualToInvite}  key={user.id}/>)
                                }
                            </div>

                        </div>
                        <div className={classes.buttons}>
                            
                            <ColorButtonSubmit onClick={sendInvites}>
                               {
                                   roomId &&
                                   'Send Invites' ||
                                   'Start Video Call'
                               }
                            </ColorButtonSubmit>
                        </div>
                    </div>
                </Fade>
            </Modal>

        </div>
    )

}

export default InviteModal;