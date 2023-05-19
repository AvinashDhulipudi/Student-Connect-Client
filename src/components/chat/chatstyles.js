const chatstyles = {
    searchbox: {
        margin: "auto",
        padding: "15px"
    },
    chatcontainer: {
        backgroundColor: "#FFFFFF",
        borderRadius: "10px",
        backgroundSize: "cover",
        backgroundPosition: "top center",
        fontFamily: "poppins",
        marginTop: "30px",
        height: "875px",
        borderRadius: "10px",
        padding: "0px"
    },
    chatcontaineroverride: {

        fontFamily: "poppins",
        marginTop: "20px",
        height: "auto",   
    },
    people: {
        overflowY: "auto",
        height: "700px"
    },
    personcontainer: {
        height: "60px",
        cursor: "pointer",
        background: "#FFFFFF",
        borderTop: "0.6px solid #E2E2E2",
        boxSizing: "border-box",
        padding: "10px",
        display: "flex",
        '&:hover': {
            backgroundColor: 'rgba(121, 89, 147, 0.1) !important',
        }
    },
    personcontainernew: {
        height: "60px",
        width: "100%",
        cursor: "pointer",
        background: "#FFFFFF",
        boxSizing: "border-box",
        padding: "5px",
        display: "flex",
        justifyContent:"start",
        '&:hover': {
            backgroundColor: 'rgba(121, 89, 147, 0.1) !important',
        }
    },
    imagecontainer: {
        marginLeft: "5px",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        backgroundBlendMode: "normal"
    },
    textcontainer: {
        overflow: "hidden",
        paddingLeft: "25px",
        fontFamily: "Poppins",
        fontStyle: "normal"
    },
    namecontainer: {
        overflow: "hidden",
        display: "flex",
        width: "180px",
        height: "21px",
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "14px",
        lineHeight: "21px",
        color: "rgba(37, 40, 43, 0.9)"  
    },
    messagecontainer: {
        height: "18px",
        fontFamily: "Poppins",
        fontStyle: "normal",
        width: "180px",
        fontWeight: "normal",
        fontSize: "12px",
        lineHeight: "18px",
        color: "rgba(0, 0, 0, 0.8)"
    },
    timecontainer: {
        width: "60px",
        height: "15px",
        fontWeight: "normal",
        fontSize: "10px",
        lineHeight: "15px",
        color: "rgba(117, 117, 117, 0.5)"
    },
    isonline: {
        width: "12px",
        height: "12px",
        float: "right",
        borderRadius: "50%",
        marginTop: "30px",
        background: "#59B82B",
        border: "1.5px solid #FFFFFF",
        boxSizing: "border-box"
    },
    notificationtext: {
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "10px",
        lineHeight: "15px",
        marginLeft: "4px",
        marginRight: "4px",
        color: "#FFFFFF"
    },
    nametext: {
        paddingRight: "3px"
    },
    notification: {
        width: "14px",
        height: "14px",
        marginTop: "3px",
        borderRadius: "50%",
        background: "#DA4D7D"
    },
    buttonstyle: {
        width: "110px",
        height: "36px",
        background: "#795993",
        borderRadius: "6px",
        margin: "auto",
        cursor: "pointer"
    },
    buttontext: {
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "12px",
        lineHeight: "18px",
        color: "#FFFFFF",
        padding: "10px"
    },
    buttons: {
        display: "flex",
        padding: "30px"
    }
}

export default chatstyles;
