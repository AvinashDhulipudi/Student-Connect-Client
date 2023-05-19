import axios from 'axios';

const setAuthToken = token => {
    if(token){
        //apply to every request
        axios.defaults.headers['x-auth-token'] = token;
    } else {
        //delete
        delete axios.defaults.headers['x-auth-token']   
    }
}

export default setAuthToken;