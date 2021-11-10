import React, {useRef, useState} from "react";
import {useRouter} from 'next/router';
import Drawer from "@material-ui/core/Drawer";
import BigCamCard from "./cameras/BigCamCard";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import { BallTriangle } from 'svg-loaders-react';
import theme from "../theme";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import BigCondCard from "./conditioners/BigCondCard";

const useStyles = makeStyles({
    paper: {
        background: theme.palette.secondary.light
    }
})
export default function SideCard(props) {
    const styles = useStyles();
    let section=props.navSection;
    let child='';
    if(props.isFetching===true){
        child=<BallTriangle/>
    }
    else{
        if(props.card!==0) {
            if(props.card.section==='cameras') {
                child = <BigCamCard card={props.card}
                                    isFetching={props.isFetching}
                                    check={props.check}
                                    addToBasket={props.addToBasket}/>
            }
            if(props.card.section==='conditioners'){
                child = <BigCondCard  card={props.card}
                                      basket={props.basket}
                                      isFetching={props.isFetching}
                                      check={props.check}
                                      addToBasket={props.addToBasket}/>
            }
        }
    }
    return(
        <Drawer classes={{ paper: styles.paper }} variant={"persistent"}  anchor={'bottom'} open={props.open}>
            <Box sx={{display:'flex',flexDirection:'column',justifyContent:'flex-start',width:'100%',minHeight:'100vh'}}>
                <Paper elevation={2} sx={{display:'flex',position:'fixed', zIndex:'1000', top:'0', left:'0',flexDirection:'row',justifyContent:'flex-start',width:'100%', padding:'5px'}}>
                    <Button onClick={()=>{
                        props.resetCardData()
                        let historyObject={};
                        historyObject.mainState=props.shadowState;
                        historyObject.section=props.navSection;
                        if(props.navSection!=='main') {
                            history.pushState(historyObject, '', 'http://localhost:3000/' + props.navSection + '/' + props.shadowState[props.navSection].page);
                        }
                        else{
                            history.pushState(historyObject, '', 'http://localhost:3000/');
                        }
                        }
                    }>
                        Назад к списку
                    </Button>
                </Paper>
                <Box sx={{display:'flex', marginTop:'45px',flexDirection:'row',justifyContent:'space-around',width:'100%'}}>
                    {child}
                </Box>
            </Box>
        </Drawer>
    )
}