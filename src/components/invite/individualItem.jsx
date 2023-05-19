import React from 'react';

import Button from '@material-ui/core/Button';

import { makeStyles, withStyles } from "@material-ui/core/styles";
import styles from './individualItemStyles.js';

const useStyles = makeStyles(styles)


const ColorButtonSubmit = withStyles((theme) => ({
    root: {
        height: "40px",
        fontFamily: "poppins",
        fontSize: "14px",
        fontWeight: "500",
        textTransform: "none",
        color: theme.palette.getContrastText("#795993"),
        backgroundColor: "#795993",
        '&:hover': {
            backgroundColor: "#795993",
        },
    },
}))(Button);

const ColorButtonCancel = withStyles((theme) => ({
    root: {
        height: "40px",
        fontFamily: "poppins",
        fontSize: "14px",
        fontWeight: "500",
        textTransform: "none",
        border: "2px solid #795993",
      color: theme.palette.getContrastText("#E2EDF1"),
      backgroundColor: "#FFFFF",
      '&:hover': {
        background: "none",
      },
    },
}))(Button);



const IndividualItem = ({user,clickHandler})=>{
    const classes = useStyles();
    return(
        <div className={classes.user_item_container} onClick={()=>{clickHandler(user.userModelRef.id)}}  >
            <div className={classes.user_icon}>
            </div>
            <div className={classes.user_info} >
                <div className={classes.user_name}>
                    {user.userModelRef.name}
                </div>
                <div className={classes.user_college}>
                    {user.userModelRef.college}
                </div>
            </div>
            <div className={classes.invite}>
                {
                    user.selected &&
                    <ColorButtonCancel className={classes.invite_btn}>
                         Cancel
                    </ColorButtonCancel> ||
                    <ColorButtonSubmit className={classes.invite_btn}>
                        + Invite
                    </ColorButtonSubmit>
                }
            </div>
        </div>
    )
}

export default IndividualItem;