import { useState } from 'react';


import { makeStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';


const useStyles = makeStyles(theme => ({
    root: {
        fontSize:"16px",
        fontWeight: "600"
      },
      nested: {
        fontSize:"14px",
        fontWeight: "500"
      },

}));

const Calendarslist = (props) =>{
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    
    const handleClick = () => {
        setOpen(!open);
    };
    return(
        <div>
            <List>
                <ListItem button onClick={handleClick} className={classes.root}>
                    <div >{props.listName}</div>
                    <div style={{marginLeft: "auto", marginRight: "0px"}}>{open ? <ExpandLess /> : <ExpandMore />}</div>
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {props.listItems.map((data,index) =>{
                            return (
                                <ListItem button className={classes.nested} key={index}>
                                    <ListItemIcon>
                                        <CheckCircleTwoToneIcon style={{ color: `${data.color}`, paddingLeft:"10px", fontSize:"30px" }}/>
                                    </ListItemIcon>
                                    {data.name}
                                </ListItem>
                                )
                            })}
                        {props.addButton? <div  style={{color: "rgba(66, 139, 193, 0.7)", padding: "10px", textAlign:"center",cursor: "pointer"}}> 
                        + Sync a new calendar</div>
                        : undefined}
                    </List>
                </Collapse>
            </List>
        </div>
    );
}
export default Calendarslist;


