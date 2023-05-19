import React, { useEffect } from "react";
import axios from "axios";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card"
// @material-ui/icons
import AddAPhoto from "@material-ui/icons/AddAPhoto";
// core components
import styles from "./profilepicstyles";
import setAuthToken from "../../services/setAuthToken"
const useStyles = makeStyles(styles);

const ProfilePic = () => {
    const classes = useStyles();
    const profilepicture = React.useRef(null);
    const coverpicture = React.useRef(null);
    const [state, setState] = React.useState({
      name: '',
      email: '',
      degree: '',
      batch: '',
      logintoken: ''
    });

    function handleProfileClick(e) {
        profilepicture.current.click();
    }

    function handleCoverClick(e) {
      coverpicture.current.click();
    }

    useEffect(() => {
      setState({...state,logintoken: localStorage.getItem('LoginToken')})
    }, [])
    setAuthToken(state.logintoken);

    return (
        <Card className={classes.coverpic}>
            <input type="file" id="file" ref={coverpicture} style={{display: "none"}}/>
            <AddAPhoto onClick={handleCoverClick} className={classes.addcovericon}/>
            <input type="file" id="file" ref={profilepicture} style={{display: "none"}}/>
            <div className={classes.profilepic}><AddAPhoto onClick={handleProfileClick} className={classes.addprofileicon}/></div>
        </Card>
    )
  }

export default ProfilePic;