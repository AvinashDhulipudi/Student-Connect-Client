import React, { useState, useEffect } from 'react';
import axios from "axios";
import Router, { useRouter } from "next/router";
import Header from '../../components/header/header';
import Navbar from "../../components/navbar/navbar";
import config from '../../../config.json';
import styles from "static/styles/calendarpagestyle";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import RemoveIcon from '@material-ui/icons/Remove';
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import DateFnsUtils from '@date-io/date-fns'; 
import { MuiPickersUtilsProvider, DateTimePicker, DateTimePickericker } from '@material-ui/pickers';


import { makeStyles, withStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
    root: {
      fontFamily: "Poppins",
      fontSize: "16px",
      fontWeight: "500",
    },
    ...styles
}))

const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: '#795993',
        height: "30px",
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#795993'
        },
        '&:hover fieldset': {
          borderColor: '#795993'
        }
      },
      '& .MuiOutlinedInput-input': {
          fontFamily: "poppins"
      },
      '& .MuiFormLabel-root': {
        fontFamily: "poppins"
      }
    },
})(TextField);

const CssTextFieldInt = withStyles({
    root: {
      '& label.Mui-focused': {
        height: "30px",
      },
      '& .MuiOutlinedInput-input': {
          fontFamily: "poppins"
      },
      '& .MuiFormLabel-root': {
        fontFamily: "poppins"
      }
    },
})(TextField);
const ColorButtonSubmit = withStyles((theme) => ({
    root: {
        width: "50%",
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

const defaultMaterialTheme = createMuiTheme({
    palette: {
      primary: {
        main: "#795993",
        fontFamily: "Poppins"
      }
    },
  });


const MoreOptions = () =>{
    const classes = useStyles();
    const router = useRouter();


    useEffect(()=> {
        if(!!!localStorage.getItem('LoginToken')){
            Router.push('/')
        }
    })

    //for random color
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var bgColor = "rgba(" + x + "," + y + "," + z +","+ 0.5 + ")";

    const [startDate, handleStartDateChange] = useState(new Date());
    const [endDate, handleEndDateChange] = useState(new Date())
    const [isOpenStart, setIsOpenStart] = useState(false); 
    const [isOpenEnd, setIsOpenEnd] = useState(false); 
    
    const [state, setState] = useState({
        color: bgColor,
        title: router.query.title,
        timeStart: startDate,
        timeEnd: endDate,
        guest: router.query.guest,
        location: router.query.location,
        reminderType: "",
        recurType: ``,
        recurInterval: 0,
        description: "",
        attachment: null,
        isCreated: false,
    });

    const handleChange = (props) => (event) => {
        setState({...state, [props]: event.target.value});
    };


    const  handleSubmit = async (event) =>{
        event.preventDefault();
        
        const body = {
            color: state.color,
            title: state.title,
            timeStart: startDate,
            timeEnd: endDate,  
            location: state.location, 
            guest: state.guest,
            recurType: state.recurType,
            recurInterval: state.recurInterval,
            description: state.description,
        }
        console.log(body)
        await axios.post(config.createEvent, body)
            .then(res => {
                if(res.status == "201"){ 
                    setState({...state, isCreated: true});
                    Router.push('/calendarpage');
                }
                else {
                console.log(res.data);
                }
            }
            )
            .catch(err => console.log(err))
    }
    
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
                        <Navbar/>
                    </div>
                </div>
                <div className={classes.moreoptions}>
                <div style={{fontSize: "18px", fontWeight: "600", padding: "30px"}}>More Options</div>
                    <div className={classes.options}>
                        <div style={{fontWeight: "500"}}>
                            <div>Title</div>
                            <div style={{paddingTop: "5px",}}>
                                <CssTextField
                                    value={state.title}
                                    placeholder="Example - Maths Quiz"
                                    variant="outlined"
                                    type="string"
                                    size="small"
                                    fullWidth
                                    onChange={handleChange('title')}
                                    />
                            </div>
                            <div style={{paddingTop: "20px"}}>Date</div>
                            <div style={{paddingTop: "5px",display: "flex"}}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <ThemeProvider theme={defaultMaterialTheme}>
                                    <DateTimePicker  
                                        InputProps={{
                                            disableUnderline: true
                                        }}  
                                        inputProps={{style: {fontFamily:"Poppins"}}}
                                        autoOk                                  
                                        variant="inline"
                                        value={startDate} 
                                        onChange={handleStartDateChange}
                                        onClose={() => setIsOpenStart(false)}  
                                    />
                                </ThemeProvider>
                            </MuiPickersUtilsProvider>
                            <span style={{marginRight: "15px"}}><RemoveIcon/></span>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <ThemeProvider theme={defaultMaterialTheme}>
                                    <DateTimePicker  
                                        InputProps={{
                                            disableUnderline: true,
                                        }}
                                        inputProps={{style: {fontFamily:"Poppins"}}}  
                                        autoOk                                
                                        variant="inline"
                                        value={endDate} 
                                        onChange={handleEndDateChange}
                                        onClose={() => setIsOpenEnd(false)}  
                                    />
                                </ThemeProvider>
                            </MuiPickersUtilsProvider>
                            </div>
                            <div style={{paddingTop: "20px"}}>Guest</div>
                            <div style={{paddingTop: "5px"}}>
                                <CssTextField
                                    value={state.guest}
                                    placeholder="Example - Guest"
                                    variant="outlined"
                                    type="string"
                                    size="small"
                                    fullWidth
                                    onChange={handleChange('guest')}
                                />
                            </div>
                            <div style={{paddingTop: "20px"}}>Location</div>
                            <div style={{paddingTop: "5px"}}>
                                <CssTextField
                                    value={state.location}
                                    placeholder="Example - Harvard University"
                                    variant="outlined"
                                    type="string"
                                    size="small"
                                    fullWidth
                                    onChange={handleChange('location')}
                                />
                            </div>
                            <div style={{paddingTop: "20px"}}>Reminder</div>
                            <div style={{paddingTop: "5px"}}>
                                <FormControl variant="outlined" style={{width: "40%"}} size="small">
                                <InputLabel className={classes.root}>Reminder type</InputLabel>
                                    <Select
                                        className={classes.root}
                                        value={state.reminderType}
                                        onChange={handleChange('reminderType')}
                                        label="Reminder Type"
                                    >
                                        <MenuItem value={"notification"} className={classes.root}>Notification</MenuItem>
                                    </Select>
                                </FormControl>
                                <CssTextFieldInt
                                    style={{width:"20%"}}
                                    size="small"
                                    id="recurInterval"
                                    label="Interval"
                                    variant="outlined"
                                    type="number"
                                    onChange={handleChange('recurInterval')}
                                /> 
                                <FormControl variant="outlined" style={{width: "40%"}} size="small">  
                                <InputLabel className={classes.root}>Reccurance type</InputLabel>
                                    <Select
                                        className={classes.root}
                                        value={state.recurType}
                                        onChange={handleChange('recurType')}
                                        label="Recurrance Type"
                                    >
                                        <MenuItem value={0} className={classes.root}>No Reccurance</MenuItem>
                                        <MenuItem value={1} className={classes.root}>Daily</MenuItem>
                                        <MenuItem value={2} className={classes.root}>weekly</MenuItem>
                                        <MenuItem value={3} className={classes.root}>Monthly</MenuItem>
                                        <MenuItem value={4} className={classes.root}>Yearly</MenuItem>
                                        <MenuItem value={5} className={classes.root}>Hourly</MenuItem>
                                        <MenuItem value={6} className={classes.root}>Minute</MenuItem>
                                        
                                    </Select>
                                </FormControl>
                            </div>
                            <div style={{paddingTop: "20px"}}>Description</div>
                            <div style={{paddingTop: "5px"}}> 
                            <TextareaAutosize placeholder="Description..." rowsMin={5} value={state.description} onChange={handleChange('description')} style={{fontFamily: "Poppins", width: "100%", border: "solid 1px #795993", borderRadius: "4px"}}/> 
                            </div>
                            <div style={{paddingTop: "30px",paddingBottom: "30px", marginLeft: "33%", marginRight: "auto"}}>
                                <ColorButtonSubmit variant="contained" color="primary" onClick={handleSubmit}>
                                    Save
                                </ColorButtonSubmit>
                            </div>
                            {state.isCreated ? <div style={{fontSize: "18px", textAlign: "center"}}>Event created successfully</div> : undefined}
                        </div>
                    </div>  
                </div>
            </div>      
        </div>
    )
}
export default MoreOptions;