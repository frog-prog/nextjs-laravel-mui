import React from 'react';
import Button from '@mui/material/Button'
import Box from "@mui/material/Box";
import FileCard from "./FileCard";

export default function FileUpload(props){

    return (<Box sx={{display:'flex',width:'100%',flexDirection:'column',justifyContent:'flex-start', marginTop:'10px',marginBottom:'10px'}}>
            <Button onClick={()=>{document.querySelector('.fileInput').click();}} variant={'outlined'}>Добавить файл</Button>
            <input className={'fileInput'} style={{display:'none'}} type={'file'} onChange={props.handleFileEvent}/>
            {props.files.map((i,j)=>{return(<FileCard delFromFiles={props.delFromFiles} name={i.name} key={j} index={j}/>)})}
            </Box>)
}
