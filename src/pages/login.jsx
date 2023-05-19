import React from "react";
import Router,{ useRouter } from "next/router";
import axios from "axios";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import InputAdornment from "@material-ui/core/InputAdornment";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
// @material-ui/icons
import Phone from "@material-ui/icons/Phone";
import LockOutlined from "@material-ui/icons/LockOutlined";
// core components
import config from "../../config.json"
import styles from "static/styles/loginPageStyles";
import Header from "../components/header/header.jsx"
import setAuthToken from "../services/setAuthToken"
import { useUser } from '../services/hooks'
import AppContext from '../components/contexts/AppContext'

const useStyles = makeStyles(styles);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
  }
})(TextField);

export default function LoginPage(props) {
  const classes = useStyles();
  const user = useUser();
  const { forceURL, setForceURL } = React.useContext(AppContext)
  if(user){
      Router.push("/home");
  }
  const [body, setBody] = React.useState({
    phone: '',
    password: '',
    error: ''
  });

  const handleClose = (e) => {
    e.preventDefault();
    setBody({...body, error: null});
  };

  const handleChange = (prop) => (event) => {
    setBody({ ...body, [prop]: event.target.value });
  };

  async function onLoginClicked(e){
    e.preventDefault();
    const data = {
      phone: body.phone,
      password: body.password
    }
    axios.post(config.loginURL,data)
        .then(res => {
            if(res.status == "200"){
              var token = res.headers['x-auth-token'];
              localStorage.setItem("LoginToken",token);
              setAuthToken(token);
              if(forceURL){ 
                let url = forceURL;
                setForceURL('')
                Router.push(forceURL)
              }
              else Router.push('/home')
            }
            else {
              setBody({...body, error: res?.data})
              console.log(body.error)
            }
          }
        )
        .catch(err => setBody({...body, error: err.length}))
  }

  return (
    <div>
        <Header loggedIn={false}/>
        <Snackbar open={body.error} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {body.error}
          </Alert>
        </Snackbar>
        <div className={classes.container}>
            Sign in to Amphi using :
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
              <div style={{paddingTop: "40px",paddingBottom: "40px"}}>
                <CssTextField
                  id="pass"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><LockOutlined/></InputAdornment>,
                  }}
                  onChange={handleChange('password')}
                />
              </div>
                <div className={classes.signinbutton} onClick={onLoginClicked}><div className={classes.signintext}> Sign in </div>
              </div>
          <div onClick={()=>Router.push("/forgetpassword")} className={classes.forgetpassword}>Forgot Password</div>
          <div className={classes.signupline}>Don't have a account?
            <div onClick={() => Router.push("/signup")} className={classes.signupbutton}> Sign up </div>
          </div>
          </div>
        </div>
    </div>
  );
}
