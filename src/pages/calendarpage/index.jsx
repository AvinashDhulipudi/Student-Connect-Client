import React, { useState, useEffect } from 'react';

import Router from "next/router";
import Header from '../../components/header/header';
import Navbar from '../../components/navbar/navbar';
import Calendarslist from '../../components/calendar/calendarslist';

import Addnew from '../../components/calendar/addnew';
import EventCalendar from '../../components/calendar/eventcalendar';
import styles from 'static/styles/calendarpagestyle';
import Calendar from 'react-calendar';
import '../../components/calendar/stylessmallcalendar.css';

import IncomingCall from '../../components/IncomingCall'
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(styles);

const Calendarpage = () =>{
    const classes = useStyles();
    useEffect(()=> {
        if(!!!localStorage.getItem('LoginToken')){
            Router.push('/')
        }
    })
    
    const [date, setDate] = useState(new Date());
    const handleChange = (date) =>{
        setDate(date);
    };
    const [counter, setCounter] = useState(true);

    return(
        <div>
            <style jsx global>{`
                body {
                margin: 0px;
                padding: 0px;
                padding-top: 8px;
                }`}
            </style>
            <Header loggedIn={true}></Header>
            <div className={classes.calendarcontainer}>
                <div className={classes.leftbar}>
                    <div className={classes.navbar}>
                        <Navbar  click="calendar"/>
                    </div>
                </div>
                <div className={classes.centercontainer}>
                    
                    <div className={classes.timetablecontainer}> 
                         
                        <div>
                            <EventCalendar counter={counter} setCounter={setCounter} selectedDate={date}/>
                        </div>  
                    </div>
                </div>
                <div className={classes.rightbar}>
                    <div className={classes.buttons}>
                        <Addnew counter={counter} setCounter={setCounter}/>  
                    </div>
                    <div className={classes.calendarview}>
                        <Calendar tileClassName={classes.calendartile} onChange={handleChange} value={date}/>
                    </div>
                    <div className={classes.syncedandclasscalendar}>
                        <Calendarslist  listName="Class Calender" 
                            listItems={[
                                {name:"Maths", color: "rgba(133, 118, 237, 0.7)"},
                                {name:"Physics", color:"rgba(61, 131, 249, 0.7)"},
                                {name:"Computer", color:"rgba(238, 165, 124, 0.7)"}, 
                                {name:"Robotics", color:"rgba(65, 249, 61, 0.7)"}
                            ]} addButton={false}/>
                    </div>  
                </div>
            </div>      
            <IncomingCall/>
        </div>
    )
}
export default Calendarpage;