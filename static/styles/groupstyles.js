import styles from "static/styles/selfviewstyles";
 const groupstyles = {
    lightbutton :{
        width: "150px",
        height: "40px",
        marginLeft: "15px",
        marginRight: "15px",
        border: "1px solid #795993",
        boxSizing: "border-box",
        filter: "drop-shadow(2px 2px 20px rgba(0, 0, 0, 0.15))",
        borderRadius: "5px",
        cursor: "pointer"
    },
    darkbutton: {
        width: "150px",
        height: "40px",
        marginLeft: "15px",
        marginRight: "15px",
        background: "#795993",
        boxShadow: "2px 2px 20px rgba(0, 0, 0, 0.15)",
        borderRadius: "5px",
        cursor: "pointer"
    },
    lightbuttontext: {
        textAlign: "center",
        fontFamily: "Poppins",
        fontWeight: "normal",
        fontSize: "12px",
        padding: "10px",
        lineHeight: "18px",
        color: "#795993",
        curosr: "pointer"
    },
    darkbuttontext: {
        fontFamily: "Poppins",
        fontWeight: "normal",
        textAlign: "center",
        fontSize: "12px",
        padding: "10px",
        lineHeight: "18px",
        color: "#FFFFFF"
    },
    profilecontainer: {
        backgroundColor: "#F9F7F7",
        display: "flex",
        height: "850px",
        overflow: "auto"
    },
    centergroupcontainer: {
        width: "45%",
        padding: "40px",
        paddingTop: "70px"
    },
    leftbar: {
        width: "20%",
    },
    rightbar: {
        width: "20%",
        padding: "20px",
        paddingLeft: "100px"
    },
    centeraboutcontainer: {
        padding: "50px",
        width: "60%"
    },
    titletext: {
        fontFamily: "Poppins",
        fontWeight: "600",
        fontSize: "22px",
        lineHeight: "33px",
        color: "#25282B",
        cursor: "pointer"
    },
    normaltext: {
        fontFamily: "Poppins",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "21px",
        color: "rgba(37, 40, 43, 0.9)",
        padding: "30px",
        paddingLeft: "0px"
    },
    purpletext: {
        fontFamily: "Poppins",
        fontWeight: "500",
        fontSize: "15px",
        lineHeight: "22px",
        color: "#795993",
        padding: "5px",
        marginLeft: "auto",
        cursor: "pointer"
    },
    purpleicon: {
        padding: "3px",
        color: "#795993",
        cursor: "pointer"
    },
    subtitle: {
        fontFamily: "Poppins",
        fontWeight: "600",
        fontSize: "16px",
        lineHeight: "24px",
        color: "#25282B",
        cursor: "pointer",
        padding: "10px"
    },
    likedimages: {
        display: "flex",
        padding: "30px"
    },
    displaypostlikedpic: {
        height: "50px",
        width: "50px",
        backgroundBlendmode: "normal",
        border: "1.2px solid #FFFFFF",
        boxsizing: "border-box",
        borderRadius: "50%",
        marginLeft: "-12px"
    },
    addnewtext: {
        fontFamily: "Poppins",
        fontWeight: "normal",
        fontSize: "12px",
        lineHeight: "18px",
        color: "#795993",
        padding: "12px",
        cursor: "pointer",
        marginLeft: "Auto"
    },
    ...styles
 }

 export default groupstyles;