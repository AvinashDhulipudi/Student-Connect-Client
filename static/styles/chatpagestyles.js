const ChatPageStyles = {
    pagecontainer: {
        backgroundColor: "#FFFFFF",
        display: "flex",
        height:"auto",
        fontFamily: "Poppins",
    },
    leftcontainer: {
        width: "30%",
        padding: "20px 0px 20px 0px",
        borderRight: "2px solid rgba(217, 217, 217, 0.3)"
    },
    rightcontainer: {
        width: "70%"
    },
    head: {
        display: "flex",
        justifyContent: "space-between",
        marginRight: "10px",
        fontSize: "24px",
        fontWeight: "600",
        paddingLeft: "15px"
    },
    filter: {
        paddingLeft: "15px",
        color: "#707C97",
        fontSize: "16px",
        display: "flex",
        alignItems: "center"
    },
    chatheader: {
        height: "110px",
        width: "100%",
        borderBottom: "2px solid rgba(217, 217, 217, 0.3)",
    },
    messagescontainer: {
        height: "450px",
        width: "100%",
        
    },
    newmsgcontainer: {
        height: "85px",
        marginLeft: "60px",
        marginRight: "60px",
        paddingTop: "10px",
        borderTop: "2px solid rgba(217, 217, 217, 0.3)",
    },
    nameandimgcontainer: {
        paddingTop:"25px",
        paddingLeft: "25px",
        display: "flex",
    },
    imagecontainer: {
        marginLeft: "5px",
        width: "52px",
        height: "52px",
        borderRadius: "50%",
        backgroundBlendMode: "normal"
    },
    textcontainer: {
        paddingLeft: "25px",
        fontFamily: "Poppins",
        fontStyle: "normal"
    },
    namecontainer: {
        
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "18px",
        lineHeight: "27px",
        marginLeft: "20px",
        color: "rgba(37, 40, 43, 0.9)"  
    },
    lastseen: {
        fontWeight: "500",
        fontSize: "14px",
        color: "#428BC1",
    },
    isonline: {
        width: "14px",
        height: "14px",
        float: "right",
        borderRadius: "50%",
        marginTop: "35px",
        background: "#59B82B",
        border: "1.5px solid #FFFFFF",
        boxSizing: "border-box"
    },
    nametext: {
        paddingRight: "3px"
    },
    buttons: {
        paddingTop: "10px",
        marginLeft: "auto",
        marginRight: "0px"
    },
    inputcontainer: {
        display: "flex",
    },
    input: {
        width: "85%",
        height: "35px",
        borderWidth: "0px",
        marginLeft: "20px",
        fontFamily: "Poppins",
        '&:focus': {
            outline: 'none !important',
        }
    },
    sendbutton: {
        marginTop: "2px",
        marginLeft: "20px",
        height: "33px",
        width: "33px",
        borderRadius: "50%",
        backgroundColor: "#987CC5"
    }
    
    
}
export default ChatPageStyles;