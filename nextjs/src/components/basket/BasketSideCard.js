import React, { useState} from "react";
import Drawer from "@material-ui/core/Drawer";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import ToggleButton from "@material-ui/core/ToggleButton";
import ToggleButtonGroup from "@material-ui/core/ToggleButtonGroup";
import theme from "../../theme";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CondCard from "../conditioners/CondCard";
import CamCard from "../cameras/CamCard";

const useStyles = makeStyles({
    paper: {
        background: theme.palette.primary.light
    }
})
export default function BasketSideCard(props) {
    const styles = useStyles();
    const [section,setSection]=useState('cameras');
    const handleChange = (event, newSection) => {
        if (newSection !== null && newSection!==section) {
                setSection(newSection);
        }
    }
    const cardRend=()=>{
        if(props.open) {
            if (section === 'conditioners') {
                if (props.basket.conditioners.length !== 0) {
                    return (props.basket.conditioners.map((item, key) => {
                        return (<CondCard key={key}
                                          section={section}
                                          makeCardDataRequest={props.makeCardDataRequest}
                                          check={props.check}
                                          setCardData={props.setCardData}
                                          card={item}
                                          addToBasket={props.addToBasket}/>)
                    }))
                } else {
                    return <Box>Пока пусто</Box>
                }
            }
            if (section === 'cameras') {
                if (props.basket.cameras.length !== 0) {
                    return (props.basket.cameras.map((item, key) => {
                        return (<CamCard key={key}
                                         section={section}
                                         makeCardDataRequest={props.makeCardDataRequest}
                                         check={props.check}
                                         setCardData={props.setCardData}
                                         card={item}
                                         addToBasket={props.addToBasket}/>)
                    }))
                } else {
                    return <Box>Пока пусто</Box>
                }
            }
        }
    }
    return(
        <Drawer classes={{ paper: styles.paper }} variant={"persistent"}  anchor={'bottom'} open={props.open}>
            <Box sx={{display:'flex',flexDirection:'column',justifyContent:'flex-start',width:'100%',minHeight:'100vh'}}>
                <Paper elevation={2} sx={{display:'flex', position:'fixed', zIndex:'1000', top:'0', left:'0',flexDirection:'row',justifyContent:'flex-start',width:'100%', padding:'5px'}}>
                    <Button onClick={()=>{
                        props.openBasket()
                    }}>
                        Закрыть корзину
                    </Button>
                </Paper>
                <Box sx={{display:'flex', marginTop:'45px',flexDirection:'row',justifyContent:'space-around',width:'100%'}}>
                    <Paper component={'div'} elevation={2} sx={{marginTop:'10px', backgroundColor:theme.palette.secondary.light,display:'flex', justifyContent:'flex-start', flexDirection:'column', maxWidth:'1024px', height:'100%', width:'100%'}}>
                        <Box sx={{width:'90%', paddingTop:'10px', marginLeft:'5%'}}>
                        <ToggleButtonGroup sx={{'background':'#fff',width:'100%'}} color='secondary' exclusive value={section} onChange={handleChange}>
                            <ToggleButton sx={{width:'50%'}} value="conditioners">Кондиционеры</ToggleButton>
                            <ToggleButton sx={{width:'50%'}} value="cameras">Камеры</ToggleButton>
                        </ToggleButtonGroup>
                        </Box>
                        <Box sx={{display:'flex', justifyContent:'space-around',width:'100%',flexWrap:'wrap'}}>
                            {cardRend()}
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </Drawer>
    )
}