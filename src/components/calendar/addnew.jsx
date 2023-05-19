import { useState } from 'react';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AddNewEvent from './addnewevent';
import AddReminder from './addreminder'
import styles from './addnewstyle'

import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', 
        overflowY : 'scroll'
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      width: "668px",
      height: "auto",
      fontFamily: "Poppins",
      fontSize: "16px",
      fontWeight: "500",
      borderRadius: "12px",
      boxShadow: "0px 2px 15px rgba(0, 0, 0, 0.08)",
    },
    picker: {
        fontFamily: "Poppins",
    },
  ...styles
}));

const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: '#795993',
        height: "30px",
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
      }
    },
})(TextField);

const ColorButton = withStyles((theme) => ({
    root: {
        width: "190px",
        height: "40px",
        fontFamily: "poppins",
        fontSize: "14px",
        fontWeight: "500",
        textTransform: "none",
        
        borderColor: "#795993",
      color: theme.palette.getContrastText("#E2EDF1"),
      backgroundColor: "#E2EDF1",
      '&:hover': {
        backgroundColor: "#E2EDF1",
      },
    },
  }))(Button);

const Addnew = (props) =>{
   
    const classes = useStyles();
    const [eventBool, setEventBool] = useState(true);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return(
        <div>
            <div className={classes.addnewbutton} onClick={handleOpen}>
                <div className={classes.addnewtext}>
                    <div className={classes.addicon}><AddIcon fontSize="small"/></div>Add New
                </div>
            </div>
            <Modal
                disableEnforceFocus
                disableAutoFocus
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}>
                <Fade in={open}>
                    <div className={classes.paper}>
                        <div className={classes.addpopup}>
                            <div className={classes.addpopuptexthead}>
                                <div style={{padding:"10px"}}>Add new</div>
                                <div className={classes.addpopupcloseicon}>
                                    <IconButton onClick={handleClose}>
                                        <CloseIcon />
                                    </IconButton>   
                                </div>
                            </div>
                            <div className={classes.addpopupmain}>
                                <div style={{display: "flex", paddingTop: "5px"}}>
                                    <div>
                                        <ColorButton variant={eventBool?"outlined":"contained"} color="primary" onClick={()=> setEventBool(true)} disableElevation>
                                            Event
                                        </ColorButton>
                                    </div>   
                                    <div style={{marginLeft: "auto", marginRight: "0px"}}>
                                        <ColorButton variant={!eventBool?"outlined":"contained"} color="primary" onClick={()=> setEventBool(false)} disableElevation>
                                            Reminder
                                        </ColorButton>
                                    </div>
                                </div>
                                {eventBool? <AddNewEvent counter={props.counter} setCounter={props.setCounter}/>: <AddReminder counter={props.counter} setCounter={props.setCounter}/>}
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
export default Addnew;