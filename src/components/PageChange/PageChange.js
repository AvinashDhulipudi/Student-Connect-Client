import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/LinearProgress";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles({
  progress: {
    color: "#795993",
    width: "100vw"
  },
  wrapperDiv: {
    position: "absolute",
    zIndex: "9999",
    marginTop: "0px"
  },
  iconWrapper: {
    display: "block"
  },
  title: {
    color: "#FFFFFF"
  }
});

export default function PageChange(props) {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.wrapperDiv}>
        <div className={classes.iconWrapper}>
          <LinearProgress className={classes.progress} />
        </div>
      </div>
    </div>
  );
}
