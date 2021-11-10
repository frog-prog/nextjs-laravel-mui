import Box from '@mui/material/Box';
import Paper from "@mui/material/Paper";
import theme from "../../theme";
import CondCard from "./CondCard";
import React from 'react';
import {BallTriangle} from 'svg-loaders-react';
import Pagination from "./Pagination";


export default function CondConteiner(props){
    const cardRend=()=>{
        if(props.state.conditioners.isFetching){
            return(<BallTriangle/>)
        }
        else{
            return (props.state.conditioners.cards.map((item,key)=>{
                return(<CondCard key={key}
                                 section={props.section}
                                 makeCardDataRequest={props.makeCardDataRequest}
                                 check={props.check}
                                 card={item}
                                 addToDeleted={props.addToDeleted}/>)
            }))
        }
    }

    return(
        <Paper sx={{display:'flex',flexDirection:'column', width:'100%', marginTop: 3, paddingBottom: 3, background: theme.palette.secondary.light}}  elevation={2}>
            <Box sx={{display:'flex', justifyContent:'space-around',width:'100%',flexWrap:'wrap'}}>
                {cardRend()}
            </Box>
            <Box sx={{display:'flex', marginTop:'7px', justifyContent:'center',width:'100%',flexWrap:'wrap'}}>
                <Pagination count={props.state.conditioners.count} PagFunc={props.PagFunc} page={props.state.conditioners.page}/>
            </Box>
        </Paper>
    );
}