import { capitalize } from "@material-ui/core";

const Eventcalendarstyles = {

    detailscontainer: {
        padding: "10px",
        fontSize: "14px" 
    },
    details: {
        display: "flex", 
        alignItems: "center", 
        marginBottom:"5px"
    },
    buttonscontainer: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "10px",
        borderRadius: "8px",
        textTransform: "capitalize",
        marginLeft: "15px"
    },
    cancelbutton: {
        lineHeight: "30px",
        height: "30px",
        width: "80px",
        color: "#795993",
        border: "1px solid #795993",
        textAlign: "center",
        marginLeft: "auto",
        cursor: "pointer",
        borderRadius: "6px"
        

    },
    confirmbutton: {
        lineHeight: "30px",
        height: "30px",
        width: "80px",
        color: "#FFFFFF",
        backgroundColor: "#795993",
        border: "1px solid #795993",
        textAlign: "center",
        marginLeft: "10px",
        marginRight: "40px",
        cursor: "pointer",
        borderRadius: "6px"
    }
}
export default Eventcalendarstyles;