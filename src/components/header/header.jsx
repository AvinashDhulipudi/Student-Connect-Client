import React from "react";
import Router from "next/router";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Menu from '@material-ui/core/Menu';
import Fade from '@material-ui/core/Fade';
//icons
import SearchIcon from "@material-ui/icons/Search";
import Notifications from "@material-ui/icons/Notifications";
import Face from "static/img/face.jpg";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Settings from "@material-ui/icons/Settings";
import FaceOutlined from "@material-ui/icons/FaceOutlined";


import styles from "./headerstyles";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "4px",
    display: "flex",
    alignItems: "center",
    borderRadius: "30px",
    backgroundColor: "#EEECEC",
    width: "600px"
  },
  input: {
    marginLeft: theme.spacing(5),
    flex: 1
  },
  iconButton: {
    padding: "10px"
  },
  ...styles
}));

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

export default function Header(props) {
  const classes = useStyles();
  const { loggedIn } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
      <div>
        {!loggedIn && <div className={classes.headercontainer}>
          <div onClick={() => Router.push("/landing")} className={classes.headertext}> amphi </div>
        </div>
        }
        {loggedIn && <div className={classes.headercontainer}>
          <div className={classes.loggedtext}> amphi </div>
          <div className={classes.searchbox}>
              <Paper component="form" className={classes.root}>
                <InputBase
                  className={classes.input}
                  placeholder="Search ..."
                  inputProps={{ "aria-label": "search for groups and classes" }}
                />
                <IconButton
                  type="submit"
                  className={classes.iconButton}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
          </div>
          <Notifications className={classes.notificationicon}/>
          <div className={classes.selfcontainer}>
            <div onClick={handleClick} style={{
              background: "url(" + Face + ")",
              backgroundSize: "cover"
              }} 
              className={classes.faceicon}
            />
            <div className={classes.dropdowncontainer}>
              <ArrowDropDown onClick={handleClick} className={classes.dropdown}></ArrowDropDown>
              <StyledMenu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                <MenuItem className={classes.menuitem} onClick={() => Router.push("/profile/about")}><FaceOutlined className={classes.menuicon}/> Profile </MenuItem>
                <MenuItem className={classes.menuitem} onClick={null}><Settings className={classes.menuicon}/> Settings </MenuItem>
                <MenuItem className={classes.menuitem} onClick={() => Router.push("/logout")}><ExitToApp className={classes.menuicon}/> Logout </MenuItem>
              </StyledMenu>
          </div>
          </div>
        </div>
        }
      </div>
  );
}
