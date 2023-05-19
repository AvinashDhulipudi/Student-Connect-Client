import React from "react";
import ReactDOM from "react-dom";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import io from 'socket.io-client'

import PageChange from "../components/PageChange/PageChange.js";
import AppContext from '../components/contexts/AppContext'

Router.events.on("routeChangeStart", url => {
  console.log(`Loading: ${url}`);
  document.body.classList.add("body-page-transition");
  ReactDOM.render(
    <PageChange path={url} />,
    document.getElementById("page-transition")
  );
});
Router.events.on("routeChangeComplete", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});
Router.events.on("routeChangeError", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

    state = {
      invites:{
        groupInvites:[],
        individualInvites:[],
      }, 
      
      ws:io('ws://localhost:8080/'),
      forceURL:'',
    }
    setForceURL = url => this.setState({...this.state,forceURL:url})
    setSocket = socket => this.setState({...this.state,ws:socket})
    setInvites = invites => this.setState({...this.state,invites:invites})
  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>Amphi</title>
          <script src='https://meet.jit.si/external_api.js'></script>     
        </Head>
        <AppContext.Provider value={
            {
              socket:this.state.ws,
              invites:this.state.invites,
              forceURL:this.state.forceURL,
              setInvites:this.setInvites,
              setSocket:this.setSocket,
              setForceURL:this.setForceURL
            }
          }>
          <Component {...pageProps} />
        </AppContext.Provider>
        <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
        }
      `}</style>
      </React.Fragment>
    );
  }
}
