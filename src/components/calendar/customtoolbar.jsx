import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import RightArrowIcon from '@material-ui/icons/ChevronRight';
import LeftArrowIcon from '@material-ui/icons/ChevronLeft';

const CalendarToolBar = (props) =>  {
 
  const [clicked, setClicked] = useState("day");

  const { onView, view, views, onNavigate, label } = props;
  return (
    <Toolbar style={{padding: "0px", display:"block", fontFamily: "Poppins"}}>
      <div style={{display: "flex"}}>
        <div style={{ width: '100%', display: "flex",fontSize: "16px",fontWeight: "600" }}>
          <div style={{ padding: "3px", paddingBottom: "0px", margin: "10px", cursor: "pointer", borderBottom: clicked === "day" ? "5px solid #69B5EE" : undefined}} 
                onClick={()=> {onView('day'), setClicked("day")}}>Day
          </div>
          <div style={{ padding: "3px", paddingBottom: "0px", margin: "10px", cursor: "pointer", borderBottom: clicked === "week" ? "5px solid #69B5EE" : undefined}} 
                onClick={()=> {onView('week'), setClicked("week")}}>Week
          </div>
          <div style={{ padding: "3px", paddingBottom: "0px", margin: "10px", cursor: "pointer", borderBottom: clicked === "month" ? "5px solid #69B5EE" : undefined}} 
                onClick={()=> {onView('month'), setClicked("month")}}>Month
          </div>
        </div>
        
      </div>
      <div style={{ background:"#ffffff", width: '100%', textAlign: 'left', fontFamily: "Poppins", fontWeight: "600", marginTop: "45px",paddingTop:"20px", fontSize: "24px", lineHeight: "36px", 
                      borderTopLeftRadius: "20px", borderTopRightRadius: "20px"}}><div style={{marginLeft: "30px", marginRight: "20px", borderBottom: "1px solid #F3F3F3",paddingBottom: "20px", color: "#25282B", fontStyle: "normal"}}>{label}</div></div>
    </Toolbar>
  );
}

CalendarToolBar.propTypes = {
  onView: PropTypes.func,
  onNavigate: PropTypes.func,
  label: PropTypes.string,
  view: PropTypes.string,
  views: PropTypes.array,

};

export default CalendarToolBar;