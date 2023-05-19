const groupItemStyles = {
    group_item_container:{
        width:'125px',
    },
    group_icon_selected:{

        width:'75px',
        height:'75px',
        margin:'0 auto',
        borderRadius:'50%',
        backgroundColor:'rgba(0,0,0,0.6)',
        zIndex:'10'
        
    },
    group_icon:{
        position:'relative',
        width:'75px',
        height:'75px',
        margin:'0 auto',
        backgroundColor:'#afafaf',
        borderRadius:'50%'
    },
    selected_icon:{
        position: 'absolute',
        top:'50%',
        left:'50%',
        fontSize:'30px',
        color:"#795993",
        padding:0,
        transform:'translate(-50%,-50%)'
        
        
    },
    group_name:{
        marginTop:'5px',
        textAlign:'center',
        fontSize:'14px',
    }
}

export default groupItemStyles