import React, { useEffect } from "react";
import axios from "axios";
import Router from "next/router";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card"
import Radio from "@material-ui/core/Radio"
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { TextareaAutosize, useRadioGroup } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
// @material-ui/icons
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Comment from "@material-ui/icons/Comment";
import Share from "@material-ui/icons/Share";
import Close from "@material-ui/icons/Close";
import SpeakerNotesOff from "@material-ui/icons/SpeakerNotesOff";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import Report from "@material-ui/icons/Report";
// core components
import styles from "./createclassstyles";
import pic from "static/img/face.jpg";
import AddComment from "../comment/AddComment";
import DisplayComment from "../comment/DisplayComment";
import config from "../../../config.json"
import { DatePicker, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  MuiPickersUtilsProvider,
  DateTimePicker,
} from '@material-ui/pickers';
import { useUser } from '../../services/hooks'

const useStyles = makeStyles(styles);

const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: '#795993',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#795993',
        },
        '&:hover fieldset': {
          borderColor: '#795993',
        }
      },
      '& .MuiOutlinedInput-input': {
        padding: "15px !important",
        fontFamily: "poppins",
        fontWeight: "500",
        fontSize: "12px",
        lineHeight: "18px",
        color: "rgba(37, 40, 43, 0.7)",
        width: "350px"
      },
      '& .Mui-disabled':{
          color: "#795993"
      }
    },
})(TextField);

const CssDatePicker = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#795993',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#795993',
        height: "48px"
      },
      '&:hover fieldset': {
        borderColor: '#795993'
      }
    },
    '& .MuiOutlinedInput-input': {
        fontFamily: "poppins",
        padding: "14px",
        fontSize: "12px",
        fontWeight: "500",
        lineHeight: "21px"
    },
    '& .MuiFormLabel-root': {
      fontFamily: "poppins"
    },
    '& .MuiSelect-root': {
      textAlign: "left",
      fontFamily: "poppins"
    },
    '& .MuiSvgIcon-root': {
      color: "#DADADA"
    }
  },
})(KeyboardDatePicker);

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#795993"
    }
  }
});

const CreateClass = () => {
    const classes = useStyles();
    const user = useUser();
    const [selectedDate, handleDateChange] = React.useState(new Date());
    const [state,setState] = React.useState({
      name: "",
      startdate: new Date(),
      enddate: new Date()
    })

    const handleChange = (prop) => (event) => {
      setState({ ...state, [prop]: event.target.value });
    };

    async function handleCreateClass(e){
      e.preventDefault();
      const body = {
        title: state.name,
        startTiming: state.startdate,
        teacherId: user,
        endTiming: state.enddate
      }
  
      axios.post(config.createClass, body)
      .then(res => {
          if(res.status == "201"){
              Router.push('/classes/viewall');
          }
          else {
            console.log(res);
          }
        }
      )
      .catch(err => console.log(err))
      }


    return (
            <div className={classes.Dialogcontent}>
            <div className={classes.textbox}>
                <div className={classes.textboxtitle}> Name : </div>
                <div className={classes.textfield}>
                    <CssTextField
                    variant="outlined"
                    placeholder="class Name"
                    value= {state.name}
                    id="name"
                    type="string"
                    onChange={handleChange('name')}
                    />
                </div>
                <div className={classes.textboxtitle}> Begin : </div>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <ThemeProvider theme={defaultMaterialTheme}>
                      <CssDatePicker
                        variant="inline"
                        autoOk
                        inputVariant="outlined"
                        value={state.startdate}
                        format="dd/MM/yyyy"
                        className={classes.customcalender}
                        InputAdornmentProps={{ position: "start" }}
                        onChange={date => setState({...state, startdate: date})}
                        />
                    </ThemeProvider>
                  </MuiPickersUtilsProvider>
                <div className={classes.textboxtitle}> End : </div>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <ThemeProvider theme={defaultMaterialTheme}>
                      <CssDatePicker
                        variant="inline"
                        autoOk 
                        inputVariant="outlined"
                        value={state.enddate}
                        format="dd/MM/yyyy"
                        className={classes.customcalender}
                        InputAdornmentProps={{ position: "start" }}
                        onChange={date => setState({...state, enddate: date})}
                        />
                    </ThemeProvider>
                  </MuiPickersUtilsProvider>
                </div>
            <div onClick={handleCreateClass} className={classes.savebutton}><div className={classes.savebuttontext}>Submit</div></div>
            </div>
    )
  }

export default CreateClass;