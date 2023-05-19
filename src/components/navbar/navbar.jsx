import React from "react";
import Router from "next/router";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
//icons
import Close from "@material-ui/icons/Close";
import Notifications from "@material-ui/icons/Notifications";
import Face from "@material-ui/icons/Face";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import CreateGroup from "../group/CreateGroup";
import CreateClass from "../class/CreateClass";

import styles from "./navbarstyles";
import Dialog from '@material-ui/core/Dialog';
const useStyles = makeStyles(styles);

export default function Navbar(props) {
  const classes = useStyles();
  const { click } = props;
  const [clicked, setClicked] = React.useState(click);
  const [state, setState] = React.useState({
      classes: ["Maths","History","Biology","Computer","Social"],
      groups: ["ML Team","Team A","BB","Robotics"],
      creategroupclicked: false,
      createclassclicked: false,
      logintoken: ""
  })

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const getClasses = state.classes.map(function(item){
    return <div key={item} className={classes.text}><div className={classes.notification}/>{item}</div>
  });
  const getGroups = state.groups.map(function(group){
    return <div key={group} className={classes.text}><div className={classes.notification}/>{group}</div>
  });


  return (
        <div className={classes.navbar}>
          <div className={classes.navcontainer}>

            <div className={classes.hometext} onClick={() => Router.push("/home")}> Home {clicked==="home" && <div className={classes.homeUnderline}></div>}</div>
            <div className={classes.hometext} onClick={() => Router.push('/calendarpage')}> Calendar {clicked==="calendar" && <div className={classes.homeUnderline}></div>}</div>

            <div className={classes.classsection}> Classes
              <div className={classes.classgroup}>
                  {getClasses}
                  <div onClick={() => setState({...state, createclassclicked: true})} className={classes.addtext}>+ Add class</div>
                  <div onClick={() => Router.push("/classes/viewall")} className={classes.viewall}>View all</div>
              </div> 
            </div>
            <div className={classes.classsection}> Groups
                  {getGroups}
                  <div onClick={() => setState({...state, creategroupclicked: true})} className={classes.addtext}>+ Add group</div> 
                  <div onClick={() => Router.push("/groups/viewall")} className={classes.viewall}>View all</div>
            </div>
          </div>
          {state.creategroupclicked &&
           <Dialog
           fullScreen={fullScreen}
           open={true}
           onClose={null}
           aria-labelledby="create-group"
           >
           <div className={classes.dialogtitle} id="create-group">{"Create a new group"}<Close style={{float: "right", cursor: "pointer"}} onClick={() => setState({...state, creategroupclicked: false})}/></div> 
              <CreateGroup/>
          </Dialog>
          }
          {state.createclassclicked &&
           <Dialog
           fullScreen={fullScreen}
           open={true}
           onClose={null}
           aria-labelledby="create-class"
           >
           <div className={classes.dialogtitle} id="create-class">{"Create a new class"}<Close style={{float: "right", cursor: "pointer"}} onClick={() => setState({...state, createclassclicked: false})}/></div> 
              <CreateClass/>
          </Dialog>
          }
        </div>
  )
  }
