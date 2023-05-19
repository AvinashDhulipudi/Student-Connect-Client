import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../../config.json';
import setAuthToken from '../../services/setAuthToken';
import moment from 'moment';

import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import DateFnsUtils from '@date-io/date-fns'; 
import { MuiPickersUtilsProvider, KeyboardDateTimePicker, KeyboardTimePicker } from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
    root: {
      fontFamily: "Poppins",
      fontSize: "16px",
      fontWeight: "500",
    },
    custom: {
      fontFamily: "Poppins",
      fontSize: "16px",
      fontWeight: "500",
      color: "#428BC1"
    }
}));

const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: '#795993',
        height: "30px",
        fontFamily: "poppins"
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#795993',
          fontFamily: "poppins"
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

const AddReminder = (props) => {
    const classes = useStyles();
    
    
    
    const [remindAt, handleDateChange] = useState(Date.now());
    const [isOpen, setIsOpen] = useState(false); 
    
    
    const [recurringTime, handleTimeChange] = useState(Date.now());
    const [isOpenTime, setIsOpenTime] = useState(false); 

   
    

    const [state, setState] = useState({
        title: "",
        frequency: "CUSTOM",
        isCreated: false
    });
    const handleChange = (props) =>(event) => {
        setState({...state, [props]: event.target.value});
    };


    const handleSubmit = (event) =>{
        event.preventDefault();
        if(state.frequency === "CUSTOM"){
          var body ={
            title: state.title, 
            frequency: state.frequency,
            remindAt: remindAt
          }
        }
        else {
          var body ={
            title: state.title,
            frequency: state.frequency,
            recurringTime : recurringTime.toTimeString().slice(0,5)
          }
        }
        
        console.log(body)

        axios.post(config.addNewReminder, body)
        .then(res => {
            if(res.status == "201"){
            setState({...state, isCreated: true});
            props.setCounter(!props.counter);
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
          <div style={{paddingTop: "10px"}}>Frequency</div>   
          <div style={{paddingTop: "5px"}}>
              <FormControl variant="outlined" fullWidth size="small">
                <Select
                    className={classes.root}
                    value={state.frequency}
                    onChange={handleChange('frequency')}
                >
                <MenuItem value={'DAILY'} className={classes.root}>Daily</MenuItem>
                <MenuItem value={'WEEKDAY'} className={classes.root}>Every weekday (Monday to Friday)</MenuItem>
                <MenuItem value={'WEEKEND'} className={classes.root}>Every weekend (Saturday and Sunday)</MenuItem>
                <MenuItem value={'CUSTOM'} className={classes.custom}>Custom</MenuItem>
                </Select>
              </FormControl>
          </div>
          {state.frequency === "CUSTOM" ?
            <div>
              <div style={{paddingTop: "10px"}}>Date & time</div>
              <div style={{paddingTop: "5px"}}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <ThemeProvider theme={defaultMaterialTheme}>
                  <KeyboardDateTimePicker  
                    fullWidth 
                    autoOk                                          
                    variant="inline"
                    inputProps={{style: {fontFamily:"Poppins"}}}
                    inputVariant="outlined"
                    size="small"
                    value={remindAt} 
                    onChange={handleDateChange}
                    onClose={() => setIsOpen(false)}  
                  />
                </ThemeProvider>
              </MuiPickersUtilsProvider>   
              </div>
            </div> : 
            <div>
              <div style={{paddingTop: "10px"}}>Time</div>
              <div style={{paddingTop: "5px"}}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <ThemeProvider theme={defaultMaterialTheme}>
                <KeyboardTimePicker    
                  fullWidth                                           
                  variant="inline"
                  inputProps={{style: {fontFamily:"Poppins"}}}
                  autoOk
                  inputVariant="outlined"
                  size="small"
                  value={recurringTime} 
                  onChange={handleTimeChange}
                  onClose={() => setIsOpenTime(false)}  
                />
              </ThemeProvider>
            </MuiPickersUtilsProvider>
              </div>
            </div>}
        
          <div style={{paddingTop: "20px", display: "flex", justifyContent: "center"}}>
            <ColorButtonSubmit variant="contained" color="primary" onClick={handleSubmit}>
                Save
             </ColorButtonSubmit>
          </div>         
      </div>
    );
}
export default AddReminder;