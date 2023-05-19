import React, { useEffect } from "react";
import axios from "axios";
import Router from "next/router";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card"
// @material-ui/icons
import Save from "@material-ui/icons/Save";
import Edit from "@material-ui/icons/Edit";
// core components
import styles from "./displaygroupstyles";
import config from "../../../config.json"
import class1 from "static/img/class1.jpeg";



const useStyles = makeStyles(styles);

const SingleGroup = ({name, memberscount, description, id, userId}) => {
    const classes = useStyles();
    async function handleJoinGroupClicked(e){
        e.preventDefault();
        const body = {
          groupId: id,
          role: "ADMIN" //to be seen
        }
        axios.post(config.addMember + userId, body)
            .then(res => {
                if(res.status == "200"){
                  Router.push("/groups/viewall");
                }
                else {
                  console.log(res.data);
                }
              }
            )
            .catch(err => console.log(err))
      }

    return (
        <Card className={classes.firstclass}>
            <img src={class1} className={classes.classimage}/>
            <div onClick={() => Router.push({pathname:"/groups/feed", query: {groupId: id}})} className={classes.classtitle}>
                {name}
            </div>
            <div className={classes.membersnotext}>
                {memberscount}  Members            
            </div>
            <div className={classes.membersnotext}>
            {description}
            </div>
            <div onClick={handleJoinGroupClicked} className={classes.darkbutton}>
                <div className={classes.darkbuttontext}>
                    {/* //check for member */}
                    {"Join Group"}
                </div>
            </div>
        </Card>
    )
  }

export default SingleGroup;