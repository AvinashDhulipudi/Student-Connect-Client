import React, { useEffect } from "react";
import axios from "axios";

import config from "../../config.json"
import setAuthToken from "../services/setAuthToken"
import jwt_decode from 'jwt-decode';
import Router from "next/router";

export function useUser({redirectTo} = {}) {
  const [key, setKey] = React.useState(undefined)
  const [logged, setLogged] = React.useState(false)
  const [decoded, setDecoded] = React.useState(false)
    // set header token
    useEffect(() => {
      setKey(localStorage.getItem('LoginToken'))
    }, [logged])
    setAuthToken(key);

    // axios request for backend data
    useEffect(() => {
      if(key){
        setDecoded(jwt_decode(key));
      }
    },[key])
    return decoded.id;
}
