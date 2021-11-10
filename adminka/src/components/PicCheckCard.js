import Box from "@mui/material/Box";
import React from "react";

export default function PicCheckCard(props){
    return(
        <Box sx={{display:'flex', flexDirection:'column',justifyContent:'flex-start', width:'100%', maxHeight:'600px'}}>
            <Box sx={{display:'flex', flexDirection:'row',justifyContent:'space-around', width:'100%', height:'90%'}}>
            <img src={props.pic} style={{height:'100%',width:'auto'}} alt={'pic'}/>
            </Box>
            <Box sx={{display:'flex', flexDirection:'row',justifyContent:'flex-start', width:'100%', height:'10%'}}>
                Удалить&nbsp;<input onChange={()=>{props.addDeletedPic(props.pic)}} type={'checkbox'} checked={props.delPics.findIndex((n) => n === props.pic) >= 0}/>
            </Box>
        </Box>
    )
}