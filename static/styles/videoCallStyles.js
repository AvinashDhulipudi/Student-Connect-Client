const videocallStyles = {
    video_call_container:{
        margin:0,
        padding:0,
        height:'100vh',
        width:"100%",
        bckgroundColor:"#ff00ff",
        position:'relative'
    },
    jitsi_container:{
        height:'100%'
    },
    bottom_navigation:{
        position:'fixed',
        bottom:0,
        textAlign:'center',
        height:'10%',
        width:'100%',
        minHeight:'150px',
        transform:'translateY(100%)',
        transition:'0.7s transform'
    },
    bottom_navigation_toggler:{
        position:'fixed',
        bottom:0,
        height:'10%',
        width:'100%',
        minHeight:'150px',
        '&:hover':{
            '& $bottom_navigation':{
                transform:'translateY(0)',
                transition:'0.7s transform'
            }
        }
    },
    link_container:{
        position:'absolute',
        top:'50%',
        left:'20px',
        transform: 'translateY(-50%)',
        width:'20%',
        minWidth:'250px',
        padding:'8px 16px',
        backgroundColor:'#efefef',
        borderRadius:'5px',
        boxShadow:'5px 5px 10px #1c1c1c'

    },
    link_title:{
        textAlign:'left',
        color:'#707070',
        padding:'8px 0',
        fontWeight:'700'
    },
    link_box:{
        position:'relative',
        width:'95%',
        height:'30px',
        // outline:'2px solid red',
        borderRadius:'5px',
        border:'1px solid #707070',
        boxSizing:'border-box'
    },
    link_text:{
        position: 'absolute',
        left:'0',
        padding:'4px',
        width:'calc(100% - 40px)',
        color:'#707070',
        whiteSpace:'nowrap',
        border:'none',
        outline:'none',
        lineHeight:'1.3',
        overflow:'hidden',
        resize:'none',
        backgroundColor:"#efefef",
    },
    link_icon:{
        backgroundColor:'#795993',
        // fontSize:'10px',
        position:'absolute',
        padding:'2px',
        right:'0',
        width:'30px',
        height:'100%',
        boxSizing:'border-box',
        color:'#efefef',
        // transform:'translateY(-50%)'
    },
    call_controls:{
        position: 'absolute',
        top:'50%',
        left:'50%',
        transform: 'translate(-50%,-50%)',
        width:'max-content',
        backgroundColor:'#1c1c1c',
        display:'flex',
        borderRadius:'5px'
    },
    control:{
        color:'#efefef',
        padding:'7.5px 15px',
        '&:hover':{
            cursor:'pointer'
        }
    },
    red:{color:'red'},
    right_border:{
        position: 'relative',
        '&::before':{
            content:'""',
            backgroundColor:'#707070',
            position: 'absolute',
            width:'1px',
            height:'75%',
            top:'10%',
            right:'0'
        }
    }
}

export default videocallStyles;