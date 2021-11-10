import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider"
import PictureSlider from "../PictureSlider";
import Typography from '@mui/material/Typography';
import React from 'react';
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import FileUpload from "../FileUpload";

export default function BigCamCard(props){
    const handleBrand = (event, newSection) => {
        if (newSection !== null && newSection!==props.initialState) {
            props.handleBrand(newSection);
        }
    }
    let card=0;
    let slider=null;
    let fetchButton=null;
    if(props.mode==='edit'){
        card=props.card.newData.cardData;
        slider=<PictureSlider addDeletedPic={props.addDeletedPic} card={props.card.prevData}/>
        fetchButton=<Box sx={{paddingTop:'10px',display:'flex', justifyContent:'space-around', flexDirection:'row', width:'100%', marginTop:'10px',marginBottom:'10px'}}>
                        <Button onClick={props.fetchCardSaveOrChange}>Сохранить изменения</Button>
                    </Box>;
    }
    else{
        card=props.card.data;
        fetchButton=<Box sx={{paddingTop:'10px',display:'flex', justifyContent:'space-around', flexDirection:'row', width:'100%', marginTop:'10px',marginBottom:'10px'}}>
            <Button onClick={props.fetchCardSaveOrChange}>Добавить изделие</Button>
        </Box>;
    }
    return(
        <Paper component={'div'} elevation={2} sx={{marginTop:'10px',display:'flex', justifyContent:'flex-start', flexDirection:'column', maxWidth:'1024px', height:'100%', width:'100%'}}>
            {slider}
            <Box sx={{paddingTop:'10px',display:'flex', justifyContent:'center', flexDirection:'row', width:'100%'}}>
                <Typography variant={'h5'}>Бренд:&nbsp;</Typography>
                <Box>
                    <ToggleButtonGroup  sx={{'background':'#fff'}} color='secondary' exclusive orientation={'vertical'} value={card.Brand} onChange={handleBrand}>
                        {props.Brands.map((i,j)=>{return(<ToggleButton key={j}  value={i.id}>{i.name}</ToggleButton>)})}
                    </ToggleButtonGroup>
                </Box>
            </Box>
            <Divider orientation={'horizontal'}/>
            <Box sx={{display:'flex', marginLeft:'5%',marginRight:'5%', justifyContent:'flex-start', flexDirection:'row', width:'90%'}}>
                <Typography variant={'h5'}>Наличие:&nbsp;</Typography>
                <Switch onChange={()=>props.changeSwitch('presence')} checked={card.presence}/>
            </Box>
            <Divider orientation={'horizontal'}/>
            <Box sx={{paddingTop:'10px',display:'flex', justifyContent:'flex-start',marginLeft:'5%',marginRight:'5%', flexDirection:'row', width:'90%'}}>
                <TextField
                    label="Название"
                    type="text"
                    value={card.name}
                    onChange={(e)=>{props.handleNumberChange(e.target.value,'name')}}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Box>
            <Box sx={{paddingTop:'10px',display:'flex', justifyContent:'flex-start',marginLeft:'5%',marginRight:'5%', flexDirection:'row', width:'90%'}}>
                <TextField
                    label="Цена"
                    type="number"
                    value={card.price}
                    onChange={(e)=>{props.handleNumberChange(e.target.value,'price')}}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Box>
            <Box sx={{paddingBottom:'10px',paddingTop:'10px',display:'flex', justifyContent:'flex-start',marginLeft:'5%',marginRight:'5%', flexDirection:'row', width:'90%'}}>
                <TextField
                    label="Мощность"
                    type="number"
                    value={card.power}
                    onChange={(e)=>{props.handleNumberChange(e.target.value,'power')}}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Box>
            <Divider orientation={'horizontal'}/>
            <Box sx={{paddingTop:'10px',display:'flex', justifyContent:'flex-start',marginLeft:'5%',marginRight:'5%', flexDirection:'row', width:'90%'}}>
                <Typography sx={{display:'flex',maxWidth:'70%',flexDirection:'column',justifyContent:'space-around'}}  variant={'h5'}>Инвертор:&nbsp;</Typography>
                <Switch onChange={()=>props.changeSwitch('inverter')} checked={card.inverter}/>
            </Box>
            <Box sx={{paddingTop:'10px',display:'flex', justifyContent:'flex-start',marginLeft:'5%',marginRight:'5%', flexDirection:'row', width:'90%'}}>
                <Typography sx={{display:'flex',maxWidth:'70%',flexDirection:'column',justifyContent:'space-around'}}  variant={'h5'}>Охлаждение:&nbsp; </Typography>
                <Switch onChange={()=>props.changeSwitch('freezing')} checked={card.freezing}/>
            </Box>
            <Box sx={{paddingTop:'10px',display:'flex', justifyContent:'flex-start',marginLeft:'5%',marginRight:'5%', flexDirection:'row', width:'90%'}}>
                <Typography sx={{display:'flex',maxWidth:'70%',flexDirection:'column',justifyContent:'space-around'}}  variant={'h5'}>Отопление:&nbsp; </Typography>
                <Switch onChange={()=>props.changeSwitch('heating')} checked={card.heating}/>
            </Box>
            <Box sx={{paddingTop:'10px',display:'flex', justifyContent:'flex-start',marginLeft:'5%',marginRight:'5%', flexDirection:'row', width:'90%'}}>
                <Typography sx={{display:'flex',maxWidth:'70%',flexDirection:'column',justifyContent:'space-around'}}  variant={'h5'}>Вентиляция:&nbsp; </Typography>
                <Switch onChange={()=>props.changeSwitch('winding')} checked={card.winding}/>
            </Box>
            <Box sx={{paddingTop:'10px',display:'flex', justifyContent:'flex-start',marginLeft:'5%',marginRight:'5%', flexDirection:'row', width:'90%'}}>
                <Typography sx={{display:'flex',maxWidth:'70%',flexDirection:'column',justifyContent:'space-around'}}  variant={'h5'}>Осушение:&nbsp; </Typography>
                <Switch onChange={()=>props.changeSwitch('drying')} checked={card.drying}/>
            </Box>
            <Box sx={{paddingTop:'10px',display:'flex', justifyContent:'space-around', flexDirection:'row', width:'100%'}}>
                <Typography variant={'h5'}>{props.card.info}</Typography>
            </Box>
            <FileUpload handleFileEvent={props.handleFileEvent} delFromFiles={props.delFromFiles} files={props.card.files} />
            <Divider orientation={'horizontal'}/>
            {fetchButton}
        </Paper>
        )
}