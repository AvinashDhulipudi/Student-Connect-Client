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
import styles from "static/styles/selfviewstyles";
import Header from "../../components/header/header.jsx"
import Navbar from "../../components/navbar/navbar"
import Chat from "../../components/chat/chat";
import setAuthToken from "../../services/setAuthToken"
import Divider from '@material-ui/core/Divider';
import config from "../../../config.json"
import ProfilePic from "../../components/home/ProfilePic";
import InfiniteScroll from "react-infinite-scroll-component";
import class1 from "static/img/class1.jpeg";
import { TextareaAutosize } from "@material-ui/core";
import IncomingCall from "../../components/IncomingCall/index.jsx";



const useStyles = makeStyles(styles);

const About = () => {
    const classes = useStyles();
    useEffect(()=> {
        if(!!!localStorage.getItem('LoginToken')){
            Router.push('/')
        }
    })

    const [state, setState] = React.useState({
        name: '',
        phone: '',
        role: '',
        email: '',
        degree: '',
        batch: '',
        description: "Hi I'm Asbi, a student from Harvard University with a medical study program. Apart from like the world of health, I also really like playing music and participating in charity activities. My favorite music is blues and I'm good play piano blues.",
        logintoken: '',
        descriptionedit: false,
        batchedit: false,
        emailedit: false,
        degreeedit: false
    });

    //Custom change of state handler
    const handleChange = (prop) => (event) => {
        setState({ ...state, [prop]: event.target.value });
    };

    useEffect(() => {
        setState({...state,logintoken: localStorage.getItem('LoginToken')})
      }, [])
      setAuthToken(state.logintoken);
  
    useEffect(() => {
    if(state.logintoken){
        axios.get(config.getInfo)
        .then(res => {
            setState({...state, name: res?.data.name, phone: res?.data.phone, role: res?.data.role, email: res?.data.email, degree: res?.data.degree, batch: res?.data.batch})
        })
        .catch(err => console.log(err))
        }
    },[state.logintoken])


    //Router for updating profile data
    async function handleSaveClicked(e){
        event.preventDefault();
        const body = {
          description: state.description,
          email: state.email,
          degree: state.degree,
          batch: state.batch,
          name: state.name
        }
        axios.put(config.addinfo, body)
            .then(res => {
                if(res.status == "200"){
                  Router.push("/profile/about");
                }
                else {
                  console.log(res.data);
                }
              }
            )
            .catch(err => console.log(err))
      }
    

    return (
      <div>
        <Header loggedIn={true}/>
        <div className={classes.profilecontainer}>
            <div className={classes.leftbar}>
                <Navbar/>
            </div>
            <div id="scrollableDivProfile" className={classes.centercontainer}>
                <InfiniteScroll
                    dataLength="100"
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                    scrollableTarget="scrollableDivProfile"
                >
                    <ProfilePic/>
                    <div className={classes.infocontainer}>
                        <div style={{display: "flex"}}>
                            <div onClick={() => Router.push("/profile/feed")} className={classes.feedtext}>
                                feed
                            </div>
                            <div onClick={() => Router.push("/profile/abput")} className={classes.feedtext}>
                                about
                                <div className={classes.underline}/>
                            </div>
                        </div>
                        <div onClick={handleSaveClicked} className={classes.sendmessagebutton}>
                            <div className={classes.sendmessage}>
                                Save
                            </div>
                        </div>
                    </div>
                    <Divider className={classes.divider} orientation="horizontal" variant="fullWidth"/>
                    <div className={classes.descriptiontitle}>
                        Description
                    </div>
                    <Card className={classes.descriptioncard}>
                        {!state.descriptionedit && 
                        <div onClick={() => setState({...state, descriptionedit: true})} className={classes.editdivdescription}>
                            <Edit className={classes.editicon}/>
                        </div>
                        }
                        {state.descriptionedit && 
                        <div style={{display: "block", width: "40px", float: "right"}}>
                        <div onClick={() => setState({...state, descriptionedit: false})} className={classes.editdivdescription}>
                            <Save className={classes.editicon}/>
                        </div>
                        </div>
                        }
                        <div className={classes.descriptiontext}>
                        {!state.descriptionedit && state.description}
                        {state.descriptionedit && <TextareaAutosize placeholder="Type question..." value={state.description} rowsMax={6} className={classes.textbox} onChange={handleChange('description')}/>}
                        </div>
                    </Card>
                    <div className={classes.groupcontainer}>
                        <div className={classes.descriptiontitle}>
                            Classes
                        </div>
                        <div className={classes.classesdiv}>
                            <div className={classes.oneclass}>
                                <img src={class1} className={classes.classimage}/>
                                <div className={classes.classtitle}>
                                    Math Class
                                </div>
                            </div>
                            <div className={classes.oneclass}>
                                <img src={class1} className={classes.classimage}/>
                                <div className={classes.classtitle}>
                                    History Class
                                </div>
                            </div>
                            <div className={classes.oneclass}>
                                <img src={class1} className={classes.classimage}/>
                                <div className={classes.classtitle}>
                                    Computer Class
                                </div>
                            </div>
                            <div className={classes.oneclass}>
                                <img src={class1} className={classes.classimage}/>
                                <div className={classes.classtitle}>
                                    Biology Class
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.groupcontainer}>
                        <div className={classes.descriptiontitle}>
                            Groups
                        </div>
                        <div className={classes.classesdiv}>
                            <div className={classes.oneclass}>
                                <img src={class1} className={classes.classimage}/>
                                <div className={classes.classtitle}>
                                    Blues Piano
                                </div>
                            </div>
                            <div className={classes.oneclass}>
                                <img src={class1} className={classes.classimage}/>
                                <div className={classes.classtitle}>
                                    Team A
                                </div>
                            </div>
                            <div className={classes.oneclass}>
                                <img src={class1} className={classes.classimage}/>
                                <div className={classes.classtitle}>
                                    Cricket
                                </div>
                            </div>
                            <div className={classes.oneclass}>
                                <img src={class1} className={classes.classimage}/>
                                <div className={classes.classtitle}>
                                    Robotics
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.descriptiontitle}>
                        Profile
                    </div>
                    <Card className={classes.profilecard}>
                        <div className={classes.profileinfo}>
                        {state.phone}
                        </div>
                        <div className={classes.profileinfo}>
                            {!state.emailedit && state.email}
                            {state.emailedit && <TextareaAutosize value={state.email} className={classes.textbox} onChange={handleChange('email')}/>}
                            {!state.emailedit && 
                            <div onClick={() => setState({...state, emailedit: true})} className={classes.editdiv}>
                                <Edit className={classes.editicon}/>
                            </div>
                            }
                            {state.emailedit &&
                            <div onClick={() => setState({...state, emailedit: false})} className={classes.editdiv}>
                                <Save className={classes.editicon}/>
                            </div>
                            }
                        </div>
                        <div className={classes.profileinfo}>
                            {!state.degreeedit && state.degree}
                            {state.degreeedit && <TextareaAutosize value={state.degree} className={classes.textbox} onChange={handleChange('degree')}/>}
                            {!state.degreeedit && 
                            <div onClick={() => setState({...state, degreeedit: true})} className={classes.editdiv}>
                                <Edit className={classes.editicon}/>
                            </div>
                            }
                            {state.degreeedit &&
                            <div onClick={() => setState({...state, degreeedit: false})} className={classes.editdiv}>
                                <Save className={classes.editicon}/>
                            </div>
                            }
                        </div>
                        <div className={classes.profileinfo}>
                            {!state.batchedit && state.batch}
                            {state.batchedit && <TextareaAutosize value={state.batch} className={classes.textbox} onChange={handleChange('batch')}/>}
                            {!state.batchedit && 
                            <div onClick={() => setState({...state, batchedit: true})} className={classes.editdiv}>
                                <Edit className={classes.editicon}/>
                            </div>
                            }
                            {state.batchedit &&
                            <div onClick={() => setState({...state, batchedit: false})} className={classes.editdiv}>
                                <Save className={classes.editicon}/>
                            </div>
                            }
                        </div>
                    </Card>
                </InfiniteScroll>
            </div>
            <div className={classes.rightbar}>
                <Chat/>
            </div>
        </div>
        <IncomingCall/>
      </div>
    )
  }

export default About;