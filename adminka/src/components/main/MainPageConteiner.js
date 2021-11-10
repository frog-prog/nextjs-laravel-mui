import Box from '@mui/material/Box';
import Paper from "@mui/material/Paper";
import theme from "../../theme";
import Button from "@mui/material/Button";
import React from 'react';
import TextField from "@mui/material/TextField";
import FileUpload from "../FileUpload";
import {BallTriangle} from "svg-loaders-react";


export default function MainPageConteiner(props){
    const demo=()=>{
        document.querySelector('.textConteiner').innerHTML=props.text;
    }
    if(props.isFetching){
        return(<BallTriangle stroke={'#000'}/>)
    }
    else{
        return(<>
            <Box sx={{display:'flex', justifyContent:'flex-start',flexDirection:'column',marginTop:'10px',marginBottom:'10px',width:'100%'}}>
                {props.uploadedFiles.map((i)=>{
                    return (<Box sx={{display:'flex', justifyContent:'flex-start',width:'100%',marginTop:'10px',marginBottom:'10px'}}>{i}</Box>)
                })}
            </Box>
            <TextField
                id="outlined-textarea"
                label="Ваш HTML"
                fullWidth
                value={props.text}
                sx={{marginTop:'25px'}}
                onChange={(e)=>{props.changeText(e.target.value)}}
                multiline/>
            <FileUpload handleFileEvent={props.handleFileEvent} delFromFiles={props.delFromFiles} files={props.files}/>
            <Button sx={{marginTop:'10px'}} onClick={props.sendFiles}>добавить файлы</Button>
            <Button sx={{marginTop:'10px'}} onClick={demo}>Продемонстрировать</Button>
            <Button sx={{marginTop:'10px'}} onClick={props.saveText}>Сохранить</Button>
            <Paper sx={{display:'flex',flexDirection:'column',marginBottom:'10px', width:'100%', marginTop: 3, paddingBottom: 3, background: theme.palette.secondary.light}}  elevation={2}>
                <Box sx={{display:'flex', justifyContent:'space-around',width:'100%',flexWrap:'wrap'}}>
                    <div className={'textConteiner'} style={{display:'flex', width:'100%'}} dangerouslySetInnerHTML={props.text}/>
                </Box>
            </Paper>
        </>);
    }
}