const incomingCallStyles = {
    call_container:{
        position:"fixed",
        bottom:'15px',
        right:0,
        width:'350px',
        height:'125px',
        transform:'translateX(100%)',
        backgroundColor:'#795993',
        background: 'linear-gradient(315deg, #23074d 0%,#cc5333 100%)',
        boxShadow:'0 5px 15px 1px #28292d',
        visibility: 'hidden',
        transition:'.4s all'
        
    },
    show_call:{
        visibility: 'visible',
        transform:'translateX(0)',
        transition:'.7s all'
    },
    caller_info_container:{
        display:'flex',
        gap:'15px',
        alignItems: 'center',
        padding:' 7.5px 15px',
    },
    caller_icon:{
        width:'50px',
        height:'50px',
        backgroundColor:'#afafaf',
        borderRadius:'50%',
    },
    caller_info:{
        alignSelf:'baseline',
    },
    caller_name:{
        fontSize:'20px',
        color:"#efefef"
    },
    caller_role:{
        fontSize:'16px',
        color:'#d3d3d3',
        textTransform:'lowercase'
    },
    call_controls:{
        display:'flex',
        justifyContent:'space-evenly',
        alignItems: 'center',
        marginLeft:'15px',
    },
    call_accept:{
        position:'relative',
        width:'50px',
        height:'50px',
        backgroundColor:'green',
        borderRadius:'50%',
        boxShadow: '0 0 10px 0px #24ff14',
        transition:'.3s box-shadow ease-in-out',
        '&:hover':{
            cursor:'pointer',
            boxShadow: '0 0 20px 2px #24ff14',
            transition:'.3s box-shadow ease-out',
        }
        
        
    },
    call_reject:{
        position:'relative',
        width:'50px',
        height:'50px',
        backgroundColor:'red',
        borderRadius:'50%',
        boxShadow: '0 0 10px 0px #ff0000',
        transition:'.3s box-shadow ease-in-out',
        '&:hover':{
            cursor:'pointer',
            boxShadow: '0 0 20px 2px #ff0000',
            transition:'.3s box-shadow ease-out',
        }
    },
    control_icon:{
        color:'#fff',
        fontSize:'30px',
        position:'absolute',
        top:'50%',
        left:'50%',
        transform:'translate(-50%,-50%)'
    }
}

export default incomingCallStyles;