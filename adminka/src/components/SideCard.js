import React from "react";
import Drawer from "@mui/material/Drawer";
import BigCamCard from "./cameras/BigCamCard";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import {BallTriangle} from 'svg-loaders-react';
import Button from '@mui/material/Button';
import BigCondCard from "./conditioners/BigCondCard";


export default function SideCard(props) {
    let child='';
    if(props.isFetching===true){
        child=<BallTriangle  stroke={'#000'}/>
    }
    else{
        if(props.card!==0) {
            if(props.section==='cameras') {
                child = <BigCamCard card={props.card}
                                    isFetching={props.isFetching}
                                    resetCardData={props.resetCardData}
                                    handleBrand={props.handleBrand}
                                    handleFileEvent={props.handleFileEvent}
                                    delFromFiles={props.delFromFiles}
                                    fetchCardSaveOrChange={props.fetchCardSaveOrChange}
                                    changeSwitch={props.changeSwitch}
                                    handleNumberChange={props.handleNumberChange}
                                    addDeletedPic={props.addDeletedPic}
                                    shadowState={props.shadowState}
                                    mode={props.mode}
                                    section={props.section}
                                    Brands={props.camerasBrands}/>
            }
            if(props.section==='conditioners'){
                child = <BigCondCard  card={props.card}
                                      isFetching={props.isFetching}
                                      resetCardData={props.resetCardData}
                                      handleBrand={props.handleBrand}
                                      handleFileEvent={props.handleFileEvent}
                                      delFromFiles={props.delFromFiles}
                                      fetchCardSaveOrChange={props.fetchCardSaveOrChange}
                                      changeSwitch={props.changeSwitch}
                                      handleNumberChange={props.handleNumberChange}
                                      addDeletedPic={props.addDeletedPic}
                                      shadowState={props.shadowState}
                                      mode={props.mode}
                                      section={props.section}
                                      Brands={props.conditionersBrands}/>
            }
        }
    }
    return(
        <Drawer  variant={"persistent"}  anchor={'bottom'} open={props.open}>
            <Box sx={{display:'flex',flexDirection:'column',justifyContent:'flex-start',width:'100%',minHeight:'100vh'}}>
                <Paper elevation={2} sx={{display:'flex',position:'fixed', zIndex:'1000', top:'0', left:'0',flexDirection:'row',justifyContent:'flex-start',width:'100%', padding:'5px'}}>
                    <Button onClick={props.resetCardData}>
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