import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import './stylesbigcalendar.css';
import CalendarToolBar from './customtoolbar';
import axios from 'axios';
import config from '../../../config.json';
import setAuthToken from '../../services/setAuthToken';
import styles from './eventcalendarstyle.js'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles , withStyles } from "@material-ui/core/styles";
import Editevent from './editevent';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import Tooltip from '@material-ui/core/Tooltip'
import ScheduleIcon from '@material-ui/icons/Schedule';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DescriptionIcon from '@material-ui/icons/Description';
import CloseIcon from '@material-ui/icons/Close';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles(theme => ({
    modal: {
      display:"flex",
      alignItems: 'center',
      justifyContent: 'center', 
      overflowY: 'scroll',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      width: "500px",
      height: "auto",
      fontFamily: "Poppins",
      fontSize: "16px",
      fontWeight: "500",
      borderRadius: "2px",
      boxShadow: "0px 2px 15px rgba(0, 0, 0, 0.08)",
    },
    ...styles
}));

const EventCalendar = (props) =>{
    const { counter, setCounter,selectedDate} = props;
    const localizer = momentLocalizer(moment);
    const classes = useStyles();
    const [state, setState] = React.useState({
        listEvent: [],
        listReminder: [],
        logintoken:'', 
        selected: {},
        buttonClicked: "view",
        deletepop: false,
    });
  
    useEffect(() => {
    setState({...state,logintoken: localStorage.getItem('LoginToken')})
    }, [])
    setAuthToken(state.logintoken);

    useEffect(() =>{
        if(state.logintoken){
        const fetchData = async () =>{
            try{
                const [resEvent, resReminder] = await Promise.all([axios.get(config.getAllEvents), axios.get(config.getAllReminders)]);
                setState({...state, listEvent: resEvent.data, listReminder: resReminder.data})
            }
            catch(error) {
                console.log(error);
            }
        }
        fetchData();
        }
    }, [state.logintoken, props.counter])

    // binding data to events and reminders
    const eventList = [];
    state.listEvent.forEach((event) => {
    let type = "event";
    let start_at = (new Date(event.timeStart));
    let end_at = (new Date(event.timeEnd));
    eventList.push({ type: type, id: event.id, title: event.title, start: start_at, end: end_at, color: event.color, allDay: false, location: event.location, guest:event.guest, description: event.description })
    })

    const reminderList = [];
    state.listReminder.forEach((reminder) => {
        let type = "reminder";
        let remind_at;
        let dt = new Date();
        
        if(reminder.frequency === "CUSTOM"){
            remind_at = (new Date(reminder.remindAt));
        }
        if(reminder.frequency === "DAILY"){
            remind_at = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), reminder.recurringTime.slice(0,2), reminder.recurringTime.slice(3,5));;
        }
        if(reminder.frequency === "WEEKEND" && (dt.getDay() == 6 || dt.getDay() == 0)){
            remind_at = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), reminder.recurringTime.slice(0,2), reminder.recurringTime.slice(3,5));;
            console.log("weekend")
        }
        if(reminder.frequency === "WEEKDAY" && (dt.getDay() == 1 || dt.getDay() == 2 || dt.getDay() == 3 || dt.getDay() == 4 || dt.getDay() == 5)){
            remind_at = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), reminder.recurringTime.slice(0,2), reminder.recurringTime.slice(3,5));;
        }
    
    reminderList.push({ type: type, id: reminder.id, title: reminder.title, start: remind_at,end: remind_at, color: "rgba(65, 249, 61, 0.15)", allDay: false, activated: reminder.activated})
    
    })

    const list = [...eventList, ...reminderList];

    //styles for event and reminder
    const eventstyle = (event) =>{
        const eventData = list.find(ot => ot.id === event.id);
        if(eventData.type === "event"){
            const backgroundColor = eventData.color;
            const borderLeft = `solid 6px ${eventData.color}`;
            return { style: { 
                        color: "black",
                        backgroundColor,
                        border: "none", 
                        borderLeft,
                        borderTopLeftRadius: "0px", 
                        borderBottomLeftRadius: "0px" 
                        } 
                    }
        };
        if(eventData.type === "reminder"){
            const backgroundColor = eventData.color;
            const borderLeft = `solid 6px ${eventData.color}`;
            if(eventData.activated === "TRUE"){
                var textDecoration = "none";
            }
            else{
                var textDecoration = "line-through";
            }
            
            return{style: { color: "black",
                            backgroundColor,
                            border: "none", 
                            borderLeft,
                            borderTopLeftRadius: "0px", 
                            borderBottomLeftRadius: "0px",
                            textDecoration,
                          }
                  }
            };
    };

    const handleDelete = () =>{
        setState({...state, buttonClicked:"delete"})
        event.preventDefault();
        if(state.selected.type === "event"){
            axios.delete(config.removeEvent+state.selected.id)
            .then(res => {
                if(res.status == "200"){
                  props.setCounter(!props.counter);
                  handleClose();
                  console.log("deleted");
                }
                else {
                  console.log(res.data);
                }
              }
            )
            .catch(err => console.log(err))
        }
        else{
            axios.post(config.doneReminder+state.selected.id)
            .then(res => { 
                if(res.status == "200"){
                    props.setCounter(!props.counter);
                    handleClose();
                    console.log("done");
                }
                else {
                    console.log(res.data)
                }
              }
            )
            .catch(err => console.log(err))
        }
    }

    //Popup on clicking event or reminder        
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleEvent = (event) => {
        setState({...state, selected: event, buttonClicked: "view", deletepop: false})
        handleOpen(); 
    }

    return(
        <div style={{height: 'fit-content', margin: '10px'}}>
            <Calendar
                selectable
                localizer={localizer}
                events={list}
                startAccessor="start"
                endAccessor="end"
                defaultView="day" 
                popup
                onSelectEvent={handleEvent}
                components={
                    {
                        toolbar: CalendarToolBar
                    }
                }
                date={selectedDate}
                onNavigate={(date)=>console.log(date)}
                eventPropGetter={eventstyle}
                     
            />
            <Modal
                disableEnforceFocus
                disableAutoFocus
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}>
                <Fade in={open}>
                    <div className={classes.paper}>
                        {state.deletepop?
                            <div style={{padding: "20px"}}>
                                <div style={{fontSize: "18px",fontWeight: "500", textAlign: "center"}}>Are you sure you want to delete this event?</div>
                                <div style={{display:"flex", paddingTop: "10px"}}>
                                    <div onClick={handleClose} className={classes.cancelbutton}>Cancel</div>
                                    <div onClick={handleDelete} className={classes.confirmbutton}>Confirm</div>
                                </div>
                            </div>
                            :
                            <div>
                                <div style={{display:"flex",alignItems: "center",}}>
                                <div className={classes.buttonscontainer}>
                                        <div style={{fontSize:"20px", fontWeight:"600"}}>{state.selected.title}</div>
                                        <div>
                                            {state.selected.type === "event" && <Tooltip title="Edit" placement="top"><IconButton  onClick={()=>{setState({...state, buttonClicked:"update"})}}><EditIcon/></IconButton></Tooltip>}
                                            {state.selected.type === "event" ?<IconButton onClick={()=>{setState({...state, deletepop: true})}}> <Tooltip title="Delete" placement="top"><DeleteIcon/></Tooltip></IconButton> : <IconButton onClick={handleDelete}> <Tooltip title="Mark as done" placement="top"><DoneIcon/></Tooltip></IconButton>}
                                            <IconButton onClick={handleClose}><CloseIcon/></IconButton>
                                        </div>    
                                </div>
                                </div>
                                {state.buttonClicked === "view" ? 
                                <div className={classes.detailscontainer}>
                                    <div> </div>
                                    {state.selected.type === "event" 
                                    ?<div><div className={classes.details}><ScheduleIcon style={{fontSize:"20px"}}/><div style={{paddingLeft:"15px"}}>{new Date(state.selected.start).toDateString() +", "+ new Date(state.selected.start).toLocaleTimeString()} - 
                                                        {new Date(state.selected.end).toDateString() +", "+ new Date(state.selected.end).toLocaleTimeString()}</div></div> 
                                    
                                        <div className={classes.details}><LocationOnIcon style={{fontSize:"20px"}}/><div style={{paddingLeft:"15px"}}>{state.selected.location}</div></div>
                                        <div className={classes.details}><PersonIcon style={{fontSize:"20px"}}/><div style={{paddingLeft:"15px"}}>{state.selected.guest}</div></div>
                                        <div className={classes.details}><DescriptionIcon style={{fontSize:"20px"}}/><div style={{paddingLeft:"15px"}}>{state.selected.description}</div></div>
                                    </div>
                                    : <div className={classes.details}><ScheduleIcon style={{fontSize:"20px"}}/><div style={{paddingLeft: "15px"}}>{new Date(state.selected.start).toDateString() +", "+ new Date(state.selected.start).toLocaleTimeString()}</div></div>}
                                </div>
                                : undefined
                                } 
                                {state.buttonClicked === "update" ? 
                                <div className={classes.updatecontainer}>
                                    <div>
                                        <div style={{padding:"20px"}}>
                                            <Editevent initial={state.selected} counter={counter} setCounter={setCounter} setOpen={setOpen}/>
                                        </div>
                                    </div>
                                     
                                </div>
                                :undefined}
                            </div>}
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}
export default EventCalendar;


