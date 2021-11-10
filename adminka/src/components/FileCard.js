import React from 'react';
import Button from '@mui/material/Button'
import Box from "@mui/material/Box";

export default function FileCard(props){
    return (<Box sx={{display:'flex', width:'100%', marginTop:'10px',justifyContent:'flex-start', flexDirection:'row'}}>
        <Button onClick={()=>{props.delFromFiles(props.index)}} variant={'outlined'}>Удалить файл</Button>
        <Box sx={{display:'flex'}}>&nbsp;{props.name}</Box>
    </Box>)
}