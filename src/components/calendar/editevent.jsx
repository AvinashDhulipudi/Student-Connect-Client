import React, { useState, useEffect } from 'react';
import axios from "axios";
import Router from "next/router";
import moment from 'moment';
import config from '../../../config.json';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import DateFnsUtils from '@date-io/date-fns'; 
import { MuiPickersUtilsProvider, DateTimePicker, DateTimePickericker } from '@material-ui/pickers';
import RemoveIcon from '@material-ui/icons/Remove';
import { makeStyles, withStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
    root: {
      fontFamily: "Poppins",
      fontSize: "16px",
      fontWeight: "500",
    },
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
      }
    },
  });


const Editevent = (props) =>{
    const classes = useStyles();
    const { initial } = props
    useEffect(()=> {
        if(!!!localStorage.getItem('LoginToken')){
            Router.push('/')
        }
    })
  
    const [state, setState] = useState({
        color: initial.color,
        title: initial.title,
        guest: initial.guest,
        location: initial.location,
        description: initial.description || undefined,
        reminderType: "",
        recurType: ``,
        recurInterval: 0,
    });

    const handleChange = (props) => (event) => {
        setState({...state, [props]: event.target.value});
    };

    const [startDate, handleStartDateChange] = useState(new Date(initial.start));
    const [endDate, handleEndDateChange] = useState(new Date(initial.end))
    const [isOpenStart, setIsOpenStart] = useState(false); 
    const [isOpenEnd, setIsOpenEnd] = useState(false); 


    const  handleSubmit = (event) =>{
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
            description: state.description
        }
        axios.put(config.updateEvent+initial.id, body)
            .then(res => {
                if(res.status == "200"){ 
                 props.setCounter(!props.counter);
                 props.setOpen(false);
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
            <div>
                <div style={{fontWeight: "500"}}>
                    <div>Title</div>
                    <div style={{paddingTop: "3px",}}>
                        <CssTextField
                            placeholder="Example - Maths Quiz"
                            value={state.title}
                            variant="outlined"
                            type="string"
                            size="small"
                            fullWidth
                            onChange={handleChange('title')}
                            />
                    </div>
                    <div style={{paddingTop: "5px"}}>Date</div>
                    <div style={{paddingTop: "3px", marginLeft: "10px", display: "flex"}}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <ThemeProvider theme={defaultMaterialTheme}>
                            <DateTimePicker  
                                InputProps={{
                                    disableUnderline: true
                                }}  
                                inputProps={{style: {fontFamily:"Poppins"}}}                                       
                                variant="inline"
                                value={startDate} 
                                onChange={handleStartDateChange}
                                onClose={() => setIsOpenStart(false)}  
                            />
                        </ThemeProvider>
                    </MuiPickersUtilsProvider>
                    <span style={{marginRight: "10px"}}><RemoveIcon/></span>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <ThemeProvider theme={defaultMaterialTheme}>
                            <DateTimePicker  
                                InputProps={{
                                    disableUnderline: true
                                }}
                                inputProps={{style: {fontFamily:"Poppins"}}}                                         
                                variant="inline"
                                size="small"
                                value={endDate} 
                                onChange={handleEndDateChange}
                                onClose={() => setIsOpenEnd(false)}  
                            />
                        </ThemeProvider>
                    </MuiPickersUtilsProvider>
                    </div>
                    <div style={{paddingTop: "5px"}}>Guest</div>
                    <div style={{paddingTop: "3px"}}>
                        <CssTextField
                            placeholder="Example - Guest"
                            value={state.guest}
                            variant="outlined"
                            type="string"
                            size="small"
                            fullWidth
                            onChange={handleChange('guest')}
                        />
                    </div>
                    <div style={{paddingTop: "5px"}}>Location</div>
                    <div style={{paddingTop: "3px"}}>
                        <CssTextField
                            placeholder="Example - Harvard University"
                            value={state.location}
                            variant="outlined"
                            type="string"
                            size="small"
                            fullWidth
                            onChange={handleChange('location')}
                        />
                    </div>
                    <div style={{paddingTop: "5px"}}>Reminder</div>
                    <div style={{paddingTop: "3px"}}>
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
                    <div style={{paddingTop: "5px"}}>Description</div>
                    <div style={{paddingTop: "3px"}}> 
                    <TextareaAutosize placeholder="Description..." rowsMin={2} value={state.description} onChange={handleChange('description')} style={{fontFamily: "Poppins", width: "100%", border: "solid 1px #795993", borderRadius: "4px"}}/> 
                    </div>
                    <div style={{paddingTop: "10px", marginLeft: "33%", marginRight: "auto"}}>
                        <ColorButtonSubmit variant="contained" color="primary" onClick={handleSubmit}>
                            Save
                        </ColorButtonSubmit>
                    </div>
                </div>
            </div>  
        </div>
    )
}
export default Editevent;