import React from "react";
import Router from "next/router";
import axios from "axios";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Phone from "@material-ui/icons/Phone";
import LockOutlined from "@material-ui/icons/LockOutlined";
// core components
import styles from "static/styles/loginPageStyles";
import Header from "../components/header/header.jsx"

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
  },
})(TextField);

export default function ForgetPasswordPage(props) {
  const classes = useStyles();
  const [body, setBody] = React.useState({
    phone: '',
    otp: '',
    password: '',
    password2: '',
    otpsent: false,
    setpassword: false
  });

  const handleChange = (prop) => (event) => {
    setBody({ ...body, [prop]: event.target.value });
  };

  async function onSendOtpClicked(e){
    event.preventDefault();
    setBody({...body,otpsent: true});
      //send route to backend
  }

  async function onVerifyOtpClicked(e){
    event.preventDefault();
    setBody({...body, setpassword: true});
  }

  async function onSetPasswordClicked(e){
    event.preventDefault();
    //Route to update password of the user
    if(body.password == body.password2){
        Router.push("/login");
    }
  }

  return (
    <div>
        <Header/>
        <div className={classes.container}>
            Forgot Password?
            <div className={classes.subtitleline}>{body.setpassword? "Please enter your new Password" :body.otpsent? "Enter the OTP code that we sent to your number": "Enter your mobile number and we will send the OTP code"}</div>
            <div className={classes.formcontainer}>
                {body.setpassword?
                    <div>
                        <div style={{paddingTop: "40px"}}>
                        <CssTextField
                            id="pass"
                            placeholder="Enter your password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><LockOutlined/></InputAdornment>,
                            }}
                            onChange={handleChange('password')}
                            />
                        </div>
                        <div style={{paddingTop: "40px",paddingBottom: "40px"}}>
                            <CssTextField
                            id="pass2"
                            placeholder="Re-enter your password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><LockOutlined/></InputAdornment>,
                            }}
                            onChange={handleChange('password2')}
                            />
                        </div>
                    </div>
                    :<div style={{paddingTop: "40px",paddingBottom: "40px"}}>
                            {body.otpsent?
                                <CssTextField
                                id="otp"
                                placeholder="Enter OTP"
                                variant="outlined"
                                value={body.otp}
                                type="number"
                                fullWidth
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><LockOutlined/></InputAdornment>,
                                }}
                                onChange={handleChange('otp')}  
                                />
                                :
                                <CssTextField
                                id="phone"
                                placeholder="Enter your phone number"
                                variant="outlined"
                                type="number"
                                fullWidth
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><Phone/><div style={{paddingLeft: "5px"}}>+91</div></InputAdornment>,
                                }}
                                onChange={handleChange('phone')}  
                                />
                            }
                    </div>
                }
                {body.setpassword? 
                <div className={classes.signinbutton} onClick={onSetPasswordClicked}><div className={classes.signintext}> Submit </div></div>
                :
                body.otpsent? 
                    <div className={classes.signinbutton} onClick={onVerifyOtpClicked}><div className={classes.signintext}> Verify OTP </div></div>
                    :
                    <div className={classes.signinbutton} onClick={onSendOtpClicked}><div className={classes.signintext}> Send OTP </div></div>}
          </div>
        </div>
    </div>
  );
}
