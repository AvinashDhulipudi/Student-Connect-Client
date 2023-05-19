import React from "react";
import Router from "next/router";
import axios from "axios";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import InputAdornment from "@material-ui/core/InputAdornment"
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// @material-ui/icons
import Phone from "@material-ui/icons/Phone";
import LockOutlined from "@material-ui/icons/LockOutlined";
import SchoolOutlined from "@material-ui/icons/SchoolOutlined";
import AccountCircle from "@material-ui/icons/AccountCircle";
// core components
import config from "../../config.json"
import styles from "static/styles/loginPageStyles";
import Header from "../components/header/header.jsx"
import { useUser } from '../services/hooks'
import { MenuItem } from "@material-ui/core";

const useStyles = makeStyles(styles);

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#795993',
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
    },
    '& .MuiSelect-root': {
      textAlign: "left",
      fontFamily: "poppins"
    },
    '& .MuiSvgIcon-root': {
      color: "black"
    }
  },
})(TextField);

export default function SignupPage(props) {
  const classes = useStyles();
  const user = useUser();
  if(user){
      Router.push("/profile");
  }
  const [body, setBody] = React.useState({
    phone: '',
    role: '',
    college: '',
    password: '',
    password2: '',
    success: false
  });

  const handleChange = (prop) => (event) => {
    setBody({ ...body, [prop]: event.target.value });
  };

  async function onSignUpClicked(e){
    event.preventDefault();
    var data = {
        phone: body.phone,
        role: body.role,
        college: body.college,
        password: body.password
    }
    axios.post(config.regsiterURL,data)
    .then(res => {
        if(res.status == "200"){
            setBody({...body,success:true});
            Router.push("/login");
        }
        else {
            console.log(res.data);
        }
        }
    )
    .catch(err => console.log(err))
  }

  return (
    <div>
        <Header loggedIn={false}/>
        <div className={classes.container}>
            Sign up to Amphi using :
            <div className={classes.formcontainer}>
              <div style={{paddingTop: "40px"}}>
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
              </div>
              <div style={{paddingTop: "40px"}}>
                <CssTextField
                  id="college"
                  placeholder="School"
                  variant="outlined"
                  type="string"
                  fullWidth
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><SchoolOutlined/></InputAdornment>,
                  }}
                  onChange={handleChange('college')}
                />
              </div>
              <div style={{paddingTop: "40px"}}>
                <CssTextField
                    id="role"
                    fullWidth
                    select
                    variant="outlined"
                    SelectProps={{
                      displayEmpty: true
                    }}
                    value={body.role}
                    onChange={handleChange('role')}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><AccountCircle/></InputAdornment>,
                    }}
                  >
                  <MenuItem aria-label="None" value="" disabled><em style={{fontFamily: "poppins", fontWeight: "normal", fontStyle: "normal", color:"rgba(37, 40, 43, 0.7)"}}>Profile type</em></MenuItem>
                  <MenuItem value={"student"}>Student</MenuItem>
                  <MenuItem value={"teacher"}>Teacher</MenuItem>
                </CssTextField >
              </div>
              <div style={{paddingTop: "40px"}}>
                <CssTextField
                  id="password"
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
                  id="password2"
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
              <div className={classes.signinbutton} onClick={onSignUpClicked}><div className={classes.signintext}> Sign up for free </div>
            </div>
          <div className={classes.signupline}>Already have a account?
            <div onClick={() => Router.push("/login")} className={classes.signupbutton}> Sign In </div>
          </div>
          </div>
        </div>
    </div>
  );
}
