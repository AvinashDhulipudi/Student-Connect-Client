import React from "react";
import Router from "next/router";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "static/styles/landingpagestyles.js";
import landing from "static/img/landing.png";
import { useUser } from '../services/hooks'

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const classes = useStyles();
  const user = useUser();
  if(user){
      Router.push("/profile");
  }
  return (
    <div>
        <div className={classes.headercontainer}>
            <div onClick={()=>Router.push("/landing")} className={classes.headertext}> amphi </div>
            <div className={classes.signinbutton} onClick={()=>Router.push("/login")}><div className={classes.signintext}> Sign In </div></div>
            <div className={classes.signupbutton} onClick={()=>Router.push("/signup")}><div className={classes.signuptext}> Sign Up </div></div>
        </div>
        <div className={classes.container}>
            <div style={{width: "40%"}}>
            <div className={classes.title}>The modern platform</div>
            <div className={classes.text}>Amphi helps universities build a digital learning environment to increase student engagement improve pedagogy and manage course curriculum</div>
            <div className={classes.signupbutton} onClick={() => Router.push("/landing")}><div className={classes.signuptext}> Explore </div></div>
            </div>
            <div style={{
                backgroundImage: "url(" + landing + ")",
                backgroundSize: "cover",
                height: "450px",
                width: "700px"
            }}>
            </div>
        </div>
    </div>
  );
}
