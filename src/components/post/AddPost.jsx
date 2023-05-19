import React, { useEffect, useState } from "react";
import axios from "axios";
import Router from "next/router";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card"
import Radio from "@material-ui/core/Radio"
import purple from "@material-ui/core/colors/purple";
import pink from "@material-ui/core/colors/pink";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Popper from '@material-ui/core/Popper';
import Paper from "@material-ui/core/Paper";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  MuiPickersUtilsProvider,
  DateTimePicker,
} from '@material-ui/pickers';

// @material-ui/icons
import PhotoLibrary from "@material-ui/icons/PhotoLibrary";
import Poll from "@material-ui/icons/Poll";
import Mood from "@material-ui/icons/Mood";
import AddCircle from "@material-ui/icons/AddCircle";
import Close from "@material-ui/icons/Close";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import ChevronRight from '@material-ui/icons/ChevronRight';
// core components
import styles from "./addpoststyles";
import pic from "static/img/face.jpg";
import config from "../../../config.json"
import { MenuList } from "@material-ui/core";

const useStyles = makeStyles(styles);
const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#795993',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#795993',
      },
      '&:hover fieldset': {
        borderColor: '#795993',
      }
    },
    '& .MuiOutlinedInput-input': {
      padding: "8px !important",
      fontFamily: "poppins"
    },
    '& .Mui-disabled':{
        color: "#795993"
    }
  },
})(TextField);

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#795993",
    }
  },
});


const AddPost = () => {
    const classes = useStyles();
    //Popper variables
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handlePopClick = (event) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    //Post and poll states and variables
    const [state, setState] = React.useState({
      content: '',
      attachments: null,
      postedIn: 'public',
      isAnonymous: false  ,
      includeTeacher: false,
      pollclicked: false,
      options: [{index: 1, text: ""},{index: 2,text: ""},{index: 3, text: ""}]
    });

    //handle File chnages
    const attachmentfile = React.useRef(null);
    const handleFileChange = (event) => {
      setState({ ...state, attachments: URL.createObjectURL(event.target.files[0]) });
      console.log(state.attachments)
    };

    function handleAttachmentClick(e) {
      attachmentfile.current.click();
    }

    //Handle Date duration Chanage
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, handleDateChange] = useState(Date.now());

    //dropdown Varaibles and states
    const [classClicked, setClassClicked] = React.useState(false);
    const [groupClicked, setGroupClicked] = React.useState(false);
    const [anchorEldropdown, setAnchorEldropdown] = React.useState(null);
    const handleDropdownClick = (event) => {
      setAnchorEldropdown(anchorEldropdown ? null : event.currentTarget);
    };
    const opendropdown = Boolean(anchorEldropdown);
    const dropdownid = opendropdown ? 'simple-popper' : undefined;

    const handleGroupOpen = () => {
        setGroupClicked(true);
        setClassClicked(false);
    }

    const handleClassOpen = () => {
      setGroupClicked(false);
      setClassClicked(true);
  }
    //Dropdown vibility setter
    const setPostedIn = (value) => {
      setState({...state, postedIn: value})
    }

    //Custom change of state handler
    const handleChange = (prop) => (event) => {
      setState({ ...state, [prop]: event.target.value });
    };

    //Poll options handlers
    const addoption = () => {
      var temp = state.options
      temp.push({index: Date.now(),text: ""})
      setState({...state, options: temp})
    }
    const deleteOption = (index) => {
      var temp = state.options.filter(arrayItem => arrayItem.index !== index);
      setState({...state, options: temp})
    }
    const handleOptionChange = (index) => (event) => {
        var temp = state.options
        temp.forEach(arrayItem => {
          if(arrayItem.index == index)
              arrayItem.text = event.target.value;
        });
        setState({...state, options: temp})
    }

    //Router for getting and posting Data
    async function onCreatePostClicked(e){
      event.preventDefault();
      const body = {
        content: state.content,
        postedIn: state.postedIn,
        isAnonymous: false  
      }
      axios.post(config.createNewPost,body)
          .then(res => {
              if(res.status == "201"){
                Router.push("/");
              }
              else {
                console.log(res.data);
              }
            }
          )
          .catch(err => console.log(err))
    }

    async function onCreatePollClicked(e){
      event.preventDefault();
      const temp = [];
      state.options.forEach(item => {
          temp.push(item.text)
      })
      const body = {
        title: state.content,
        options: temp,
        expiresAt: selectedDate  
      }
      console.log(body)
      axios.post(config.createNewPoll, body)
          .then(res => {
              if(res.status == "201"){
                Router.push("/");
              }
              else {
                console.log(res.data);
              }
            }
          )
          .catch(err => console.log(err))
    }

    //Render component
    return (
        <div className={classes.addpost}>
                <Card className={classes.addpostcontainer}>
                    <div onClick={handlePopClick} className={classes.addpostcenter}>
                      <div style={{
                        backgroundImage: "url(" + pic + ")",
                        backgroundSize: "cover"
                        }} 
                        className={classes.addpostpic}>
                      </div>
                      <div className={classes.addposttext}>{state.content? state.content :"Type Post"}</div>
                      <div className={classes.addpostleftlinks}>
                        <div className={classes.attachments}>
                          <PhotoLibrary onClick={() => setAnchorEl()} className={classes.attachimage}/>
                          <div className={classes.attachtext}>attachment</div>
                        </div>
                        <div className={classes.attachments}>
                          <Poll onClick={() => setState({...state, pollclicked: !state.pollclicked})} className={classes.attachimage}/>
                          <div className={classes.attachtext}>{state.pollclicked? "post" : "poll"}</div>
                        </div>
                        <div className={classes.attachments}>
                          <AddCircle className={classes.attachimage}/>
                          <div className={classes.attachtext}>tag</div>
                        </div>
                      </div>
                    </div>
                </Card>
                <Popper id={id} open={open} anchorEl={anchorEl} transition>{({ TransitionProps, placement }) => (
                    <Grow {...TransitionProps} style={{ transformOrigin: placement === 'center' }}>
                      <Paper style={{opacity: "0.25"}}>
                        <div className={classes.postpopper}>
                          <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
                            <Popper id={id} open={open} anchorEl={anchorEl} transition >{({ TransitionProps, placement }) => (
                              <Grow {...TransitionProps} style={{ transformOrigin: placement === 'center' }}>
                                <Paper style={{opacity: "1", marginTop: "-100px"}}>
                                  <Card className={classes.addpostpopcontainer}>
                                      <div className={classes.addpostcenter}>
                                        <div style={{
                                          backgroundImage: "url(" + pic + ")",
                                          backgroundSize: "cover"
                                          }} 
                                          className={classes.addpostpic}>
                                        </div>
                                        <div className={classes.addposttext}>Avinash Dhulipudi</div>
                                        <div className={classes.addpostleftlinks}>
                                          <div className={classes.attachments}>
                                          <input type="file" id="file" onChange={handleFileChange} ref={attachmentfile} style={{display: "none"}}/>
                                            <PhotoLibrary onClick={handleAttachmentClick} className={classes.attachimage}/>
                                            <div className={classes.attachtext}>attachment</div>
                                          </div>
                                          <div className={classes.attachments}>
                                            <Poll onClick={() => setState({...state, pollclicked: !state.pollclicked})} className={classes.attachimage}/>
                                            <div className={classes.attachtext}>{state.pollclicked? "post" : "poll"}</div>
                                          </div>
                                          <div className={classes.attachments}>
                                            <AddCircle className={classes.attachimage}/>
                                            <div className={classes.attachtext}>tag</div>
                                          </div>
                                        </div>
                                      </div>
                                      {state.pollclicked ?
                                      <div className={classes.pollcontainer}>
                                        <TextareaAutosize placeholder="Type question..." value={state.content} rowsMax={6} className={classes.textbox} onChange={handleChange('content')}/>
                                        <div className={classes.options}>
                                          {state.options.map((option) => (
                                            <div key={option.index} className={classes.polloption}>
                                                <CssTextField
                                                variant="outlined"
                                                placeholder= "add option"
                                                value= {option.text}
                                                type="string"
                                                onChange={handleOptionChange(option.index)}
                                                />                                            
                                                <Close onClick={() => deleteOption(option.index)} className={classes.closeimage}/>
                                            </div>
                                          ))}
                                          <div onClick={addoption} className={classes.addmoreoptions}> 
                                            + Add more options
                                          </div>
                                        </div>
                                        <div onClick={() => setIsOpen(true)} className={classes.timepicker}>
                                          <div className={classes.timetext}> Duration </div>
                                          <ArrowDropDown className={classes.timedropdown}/>
                                        </div>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <ThemeProvider theme={defaultMaterialTheme}>
                                          <DateTimePicker
                                              InputProps={{
                                                disableUnderline: true
                                              }}                                              
                                              autoOk
                                              ampm={true}
                                              value={selectedDate} 
                                              onChange={handleDateChange}
                                              open={isOpen}
                                              disablePast
                                              onClose={() => setIsOpen(false)}
                                              showTodayButton
                                              variant="inline"
                                              className={classes.customdatepicker}
                                           />
                                          </ThemeProvider>
                                        </MuiPickersUtilsProvider>
                                      </div>
                                      :
                                      <div className={classes.textboxcontainer}>
                                        <TextareaAutosize placeholder="Type Post.." value={state.content} rowsMax={6} rowsMin={6} className={classes.textbox} onChange={handleChange('content')}/>
                                        {state.attachments && 
                                            <div className={classes.showimages}>
                                              <Close onClick={() => setState({...state,attachments: null})} className={classes.closeimage}/>
                                              <img className={classes.showimages} src={state.attachments}/>
                                            </div>
                                        }
                                      </div>
                                      }
                                      <div className={classes.addpostfooter}>
                                          <div className={classes.posttotext}>
                                            Post to:
                                          </div>
                                          {/* //select drop down */}
                                          <div className={classes.selectdropdown}>
                                            <div className={classes.dropdownText} onClick={handleDropdownClick}>{state.postedIn}<ArrowDropDown className={classes.dropdownicon}/></div>
                                                <Popper id={dropdownid} anchorEl={anchorEldropdown} open={opendropdown} transition>
                                                    <ClickAwayListener onClickAway={() => setAnchorEldropdown(null)}>
                                                      <div className={classes.dropdowns}>
                                                        <Paper className={classes.sidedropdownmain}>                                                
                                                          <MenuList>
                                                            <MenuItem className={classes.menuitem} onClick={() => {setAnchorEldropdown(null), setPostedIn("public")}}>Public</MenuItem>
                                                            <MenuItem className={classes.menuitem} onClick={handleClassOpen}>Class<ChevronRight className={classes.menuicon}/></MenuItem>
                                                            <MenuItem className={classes.menuitem} onClick={handleGroupOpen}>Group<ChevronRight className={classes.menuicon}/></MenuItem>
                                                          </MenuList>
                                                        </Paper>
                                                        {classClicked &&
                                                          <Paper className={classes.sidedropdownclasses}>
                                                            <MenuList onMouseLeave={() => setClassClicked(false)} onClick={() => setAnchorEldropdown(null)}>
                                                              <MenuItem className={classes.menuitem} onClick={() => setPostedIn("Physics")}>Physics</MenuItem>
                                                              <MenuItem className={classes.menuitem} onClick={() => setPostedIn("Electronics")}>Electronics</MenuItem>
                                                              <MenuItem className={classes.menuitem} onClick={() => setPostedIn("Chemistry")}>Chemistry</MenuItem>
                                                            </MenuList>
                                                          </Paper>
                                                        }
                                                        {groupClicked &&
                                                          <Paper className={classes.sidedropdowngroups}>
                                                            <MenuList onMouseLeave={() => setGroupClicked(false)} onClick={() => setAnchorEldropdown(null)}>
                                                              <MenuItem className={classes.menuitem} onClick={()=> setPostedIn("Cricket")}>Cricket</MenuItem>
                                                              <MenuItem className={classes.menuitem} onClick={()=> setPostedIn("Baseball")}>BaseBall</MenuItem>
                                                              <MenuItem className={classes.menuitem} onClick={()=> setPostedIn("Music")}>Music</MenuItem>
                                                            </MenuList>
                                                          </Paper>
                                                        }
                                                      </div>
                                                    </ClickAwayListener>
                                                </Popper>                                          
                                              </div>
                                          {/* //RADIO BUTTON */}
                                          <div className={classes.radiocontainer}>
                                            <FormControlLabel value="Include teacher" control={<Radio onChange={handleChange('includeTeacher')}/>} label = "Include Teacher" />
                                          </div>
                                        <div className={classes.addpostfooterleftlinks}>
                                          <div>
                                            <Mood className={classes.emotionimage}/>
                                          </div>
                                          <div onClick={state.pollclicked? onCreatePollClicked: onCreatePostClicked} className={classes.postbutton}>
                                            <div className={classes.postbuttontext}>
                                              Post
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                  </Card>
                                </Paper>
                              </Grow>)}
                            </Popper>
                          </ClickAwayListener>
                        </div>
                      </Paper>
                    </Grow>
                )}</Popper>
            </div>
    )
  }

export default AddPost;