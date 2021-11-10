import Box from '@mui/material/Box';
import Paper from "@mui/material/Paper";
import theme from "../../theme";
import React from 'react';
import {BallTriangle} from 'svg-loaders-react';
import Pagination from "./Pagination";
import CamCard from "./CamCard";

export default function CamConteiner(props) {
    const cardRend=()=>{
        if(props.state.cameras.isFetching){
            return(<BallTriangle/>)
        }
        else{
            return (props.state.cameras.cards.map((item,key)=>{
                return(<CamCard key={key}
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
                <Pagination count={props.state.cameras.count} PagFunc={props.PagFunc} page={props.state.cameras.page}/>
            </Box>
        </Paper>
    );
}