const profilePicStyle = {
    coverpic: {
        background: "#383D40",
        borderRadius: "10px",
        backgroundSize: "cover",
        backgroundPosition: "top center",
        fontFamily: "Roboto",
        height: "300px"
    },
    profilepic: {
        width: "130px",
        height: "130px",
        borderRadius: "50%",
        backgroundColor: "white",
        textAlign: "center",
        margin: "auto",
        marginTop: "80px"
    },
    addcovericon: {
        color: "white",
        position: "relative",
        padding: "30px",
        float: "right",
        cursor: "pointer",
        "&:hover,&:focus": {
          color: "#DADADA"
        }
    },
    addprofileicon: {
        color: "#DADADA",
        position: "relative",
        padding: "53px",
        cursor: "pointer",
        "&:hover,&:focus": {
          color: "#383D40"
        }
    }
}
export default profilePicStyle;