import React from 'react';
import Router from "next/router";
import { useState, useEffect } from 'react';
import axios from "axios";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import config from '../../../config.json'
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import DateFnsUtils from '@date-io/date-fns'; 
import { MuiPickersUtilsProvider, DateTimePicker, DateTimePickericker } from '@material-ui/pickers';

import RemoveIcon from '@material-ui/icons/Remove';

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

const ColorButtonMore = withStyles((theme) => ({
    root: {
        width: "190px",
        height: "40px",
        fontFamily: "poppins",
        fontSize: "14px",
        fontWeight: "500",
        textTransform: "none",
        border: "2px solid #795993",
      color: theme.palette.getContrastText("#E2EDF1"),
      backgroundColor: "#FFFFF",
      '&:hover': {
        background: "none",
      },
    },
}))(Button);

const ColorButtonSubmit = withStyles((theme) => ({
    root: {
        width: "190px",
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

const AddNewEvent = (props) =>{
    
    const [startDate, handleStartDateChange] = useState(new Date());
    const [endDate, handleEndDateChange] = useState(new Date())
    const [isOpenStart, setIsOpenStart] = useState(false); 
    const [isOpenEnd, setIsOpenEnd] = useState(false); 
    const bgColor = 'rgba(61, 131, 249, 0.15)';
    
    const [state, setState] = useState({
        color: bgColor,
        title: "",
        timeStart: startDate,
        timeEnd: endDate,
        guest: "",
        location: "",
        recurType: 0,
        isCreated: false,
    });

    const handleChange = (props) => (event) => {
        setState({...state, [props]: event.target.value});
    };

    const  handleSubmit = (event) =>{
        event.preventDefault();
        const body = {
            color: state.color,
            title: state.title,
            timeStart: startDate,
            timeEnd: endDate,  
            guest: state.guest,
            location: state.location, 
            recurType: state.recurType
        }
        axios.post(config.createEvent, body)
            .then(res => {
                if(res.status == "201"){ 
                    setState({...state, isCreated: true});
                    props.setCounter(!props.counter)
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
        {state.isCreated ? <div style={{paddingTop: "10px", textAlign: "center", fontFamily: "Poppins", fontSize: "20px"}}>Event created successfully</div> : undefined}
        <div style={{paddingTop: "10px"}}>Title</div>
            <div style={{paddingTop: "5px",}}>
            <CssTextField
                placeholder="Example - Maths Quiz"
                variant="outlined"
                type="string"
                size="small"
                fullWidth
                onChange={handleChange('title')}
                />
            </div>
        <div style={{paddingTop: "10px"}}>Date</div>
        <div style={{paddingTop: "5px", display: "flex"}}>
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
        <span style={{marginRight: "10px"}}><RemoveIcon/></span>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <ThemeProvider theme={defaultMaterialTheme}>
                <DateTimePicker                                     
                    InputProps={{
                        disableUnderline: true
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
        <div style={{paddingTop: "10px"}}>Guest</div>
        <div style={{paddingTop: "5px"}}><CssTextField
            placeholder="Example - Guest"
            variant="outlined"
            type="string"
            size="small"
            fullWidth
            onChange={handleChange('guest')}
        />
        </div>
        <div style={{paddingTop: "10px"}}>Location</div>
        <div style={{paddingTop: "5px"}}><CssTextField
            placeholder="Example - Harvard University"
            variant="outlined"
            type="string"
            size="small"
            fullWidth
            onChange={handleChange('location')}
        />
        </div>
        <div style={{display: "flex", paddingTop: "20px"}}>
            <div>
                <ColorButtonMore variant="text" color="primary" onClick={() => {Router.push({pathname: "/calendarpage/moreoptions", query: state})}}>
                    More Options
                </ColorButtonMore>
            </div>   
            <div style={{marginLeft: "auto", marginRight: "0px"}}>
                <ColorButtonSubmit variant="contained" color="primary" onClick={handleSubmit}>
                    Save
                </ColorButtonSubmit>
            </div>
        </div>
    </div>
    );
}
export default AddNewEvent;