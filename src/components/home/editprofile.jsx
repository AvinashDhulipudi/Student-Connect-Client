import React, { useEffect } from "react";
import axios from "axios";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Card from "@material-ui/core/Card"
// @material-ui/icons
// core components
import styles from "./editprofilestyles";
import config from "../../../config.json"
import setAuthToken from "../../services/setAuthToken"
import Router from "next/router";

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

const useStyles = makeStyles({
  root:{
      borderColor: '#795993',
      paddingTop: "8px",
      paddingBottom: "8px"
  },
  disabled: {
    color: "purple"
  },
  MuiInputBase:{
    padding: 0,
  },
  ...styles
});

const elements = ['2020','2019','2018','2017','2016','2015','2014','2013','2012','2011']

const EditProfile = () => {
    const classes = useStyles();
    const years = [];
    const [state, setState] = React.useState({
      name: '',
      email: '',
      degree: '',
      batch: '',
      logintoken: ''
    });

    const handleChange = (prop) => (event) => {
      setState({ ...state, [prop]: event.target.value });
    };

    useEffect(() => {
      setState({...state,logintoken: localStorage.getItem('LoginToken')})
    }, [])
    setAuthToken(state.logintoken);

    async function handleInfoSubmit(e){
      event.preventDefault();
      const body = {
        degree: state.degree,
        batch: state.batch,
        name: state.name,
        email: state.email
      }
  
        axios.put(config.addinfo,body)
        .then(res => {
            if(res.status == "200"){
                Router.push('/profile');
            }
            else {
              console.log(res);
            }
          }
        )
        .catch(err => console.log(err))
      }

    return (
        <Card className={classes.completeprofilecontainer}>
            {elements.map((item)=>{
                years.push(<option key ={item} value={item}>{item}</option>)
            })}
            <div className={classes.centertitle}>Complete your profile :</div>:
            <div className={classes.form}>
                <div className={classes.textbox}>
                <div className={classes.textboxtitle}> Name : </div>
                <div className={classes.textfield}>
                    <CssTextField
                    variant="outlined"
                    value= {state.name}
                    id="name"
                    type="string"
                    onChange={handleChange('name')}
                    />
                </div>
                </div>
                <div className={classes.textbox}>
                <div className={classes.textboxtitle}> Email : </div>
                    <div className={classes.textfield}>
                        <CssTextField
                        variant="outlined"
                        value= {state.email}
                        id="email"
                        type="string"
                        onChange={handleChange('email')}
                        />
                    </div>
                </div>
                <div className={classes.textbox}>
                    <div className={classes.textboxtitle}> Degree : </div>
                    <div className={classes.textfield}>
                        <CssTextField
                        variant="outlined"
                        value= {state.degree}
                        id="degree"
                        type="string"
                        onChange={handleChange('degree')}
                        />
                    </div>
                    </div>
                <div className={classes.textbox}>
                    <div className={classes.textboxtitle}> Batch : </div>
                    <div className={classes.textfield}>
                    <FormControl style={{paddingRight:"5px"}} variant="outlined" className={classes.formControl}>
                        <Select
                        id="batch"
                        native
                        value={state.batch}
                        onChange={handleChange('batch')}
                        classes={{
                            outlined: classes.outlined,
                            root: classes.root,
                            disabled: classes.disabled
                        }}
                        >
                            {years}
                        </Select>
                    </FormControl>
                    <div style={{padding:"5px"}}>to</div>
                    <FormControl style={{paddingLeft:"5px"}} variant="outlined" className={classes.formControl}>
                        <Select
                        id="batch"
                        native
                        onChange={null}
                        classes={{
                            outlined: classes.outlined,
                            root: classes.root,
                            disabled: classes.disabled
                        }}
                        >
                            {years}
                        </Select>
                        </FormControl>
                    </div>
                </div>
                  <div className={classes.buttons}>
                  <div onClick={() => handleInfoSubmit()} className={classes.submitbutton}><div className={classes.buttontext}> submit </div></div>
                  </div>
            </div>
        </Card>
    )
  }

export default EditProfile;