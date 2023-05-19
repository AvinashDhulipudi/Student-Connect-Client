import React, { useEffect } from "react";
import axios from "axios";
import Router from "next/router";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import InputBase from '@material-ui/core/InputBase';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import { Checkbox } from "@material-ui/core";
// @material-ui/icons
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import Delete from "@material-ui/icons/Delete";
import Report from "@material-ui/icons/Report";
// core components
import styles from "./displayoptionstyles";
import pic from "static/img/face.jpg";
import config from "../../../config.json"

const useStyles = makeStyles(styles);
const PurpleCheckBox = withStyles({
  root: {
    color: purple[400],
    '&$checked': {
      color: purple[600],
    },
  },
  checked: {},
})((props) => <Checkbox color = "default" {...props} />);

const DisplayOption = ({text, percentage, id, votes, replies, useroption}) => {
    const classes = useStyles();

    //check box states
    const [checked, setChecked] = React.useState(false)
    const handleCheckboxClicked = (event) => {
        checked? setChecked(false) : setChecked(true);
        // Route to add/remove vote
    }

    //Option states and variables
    const [reportOption, setReportOption] = React.useState(false);

    //menu variables
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    //report option varaiables
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const handleReportOption = () => {
      setReportOption(true);
    };
    const handleCloseReport = () => {
      setReportOption(false);
      setAnchorEl(null);
    };

    // async function handleDeleteOption(e){
    //     event.preventDefault();
    //     axios.delete(config.deleteComment + id)
    //         .then(res => {
    //             if(res.status == "200"){
    //               Router.push("/");
    //             }
    //             else {
    //               console.log(res.data);
    //             }
    //           }
    //         )
    //         .catch(err => console.log(err))
    //   }

    return (
        <div className={classes.optionssection}>
            <div className={classes.displayoptionsection}>
                <div style={{display: "flex", width: "100%"}}>
                <div className={classes.optioncontent}>
                    <div className={classes.optiontextcontent}>
                    <FormControlLabel
                        control={<PurpleCheckBox checked={checked} onChange={handleCheckboxClicked} name="options" />}
                    />                    
                      <div className={classes.optioncontainer} onClick={handleCheckboxClicked}>
                        <div style={{width: percentage}} className={classes.votepercentagediv}>
                          <div> {text} </div>
                        </div>
                      </div>
                    </div>
                </div>
                <div className={classes.optionsinfotext}>
                  <div className={classes.optionsinfo}>
                    <div style={{
                        backgroundImage: "url(" + pic + ")",
                        backgroundSize: "cover"
                        }} 
                        className={classes.displaypostpic}>
                    </div>
                    <div style={{
                        backgroundImage: "url(" + pic + ")",
                        backgroundSize: "cover"
                        }} 
                        className={classes.displaypostpic}>
                    </div>
                    <div style={{
                        backgroundImage: "url(" + pic + ")",
                        backgroundSize: "cover"
                        }} 
                        className={classes.displaypostpic}>
                    </div>
                  </div>
                10 votes
                </div>
                <MoreHoriz className={classes.morehorizoptions} onClick={handleClick}/>
                {useroption?
                <Menu
                    id="my-option"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem className={classes.dropdowntext} onClick={null}><Delete className={classes.dropdownicons}/>Delete Option</MenuItem>
                </Menu>:
                <Menu
                    id="others-option"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem className={classes.dropdowntext} onClick={handleReportOption}><Report className={classes.dropdownicons}/>Report Option</MenuItem>
                </Menu>
                }
                </div>
            </div>
            {reportOption && 
              <Dialog
                fullScreen={fullScreen}
                open={reportOption}
                onClose={handleCloseReport}
                aria-labelledby="report-option"
              >
                <div className={classes.dialogtitle} id="report-option">{"Report this option"}</div>
                <DialogContent>
                  <DialogContentText className={classes.dialogcontent}>
                    Hello {"Asbhi"}, help us to understand why you want to report this option
                  </DialogContentText>
                </DialogContent>
                <div className={classes.reportbuttondiv}>
                    <div className={classes.reportbuttons} autoFocus onClick={handleCloseReport}>
                        <div className={classes.reportbuttontext}>
                        hate speech
                        </div>
                    </div>
                    <div className={classes.reportbuttons} autoFocus onClick={handleCloseReport}>
                        <div className={classes.reportbuttontext}>
                        spam
                        </div>
                    </div>
                    <div className={classes.reportbuttons} autoFocus onClick={handleCloseReport}>
                        <div className={classes.reportbuttontext}>
                        cut throat
                        </div>
                    </div>
                </div>
              </Dialog>            
            }
        </div>
    )
  }

export default DisplayOption;