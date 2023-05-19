import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import styles from './groupItemStyles.js';

const useStyles = makeStyles(styles)

const GroupItem = ({group,clickHandler})=>{
    const classes = useStyles();
    return(
        <div className={classes.group_item_container} onClick={()=>{clickHandler(group.id)}}  >
            <div className={classes.group_icon}>
                <div className={` ${group.selected ? classes.group_icon_selected:null} `} >
                </div>
                    {
                        group.selected &&
                        <CheckCircleIcon className={classes.selected_icon}  />
                    }
            </div>
            <div className={classes.group_name}>
                {group.title} {group.selected}
            </div>
        </div>
    )
}

export default GroupItem;