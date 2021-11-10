import Box from '@mui/material/Box';
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider"
import PictureSlider from "../PictureSlider";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import React from 'react';
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Switch from "@mui/material/Switch";
import FileUpload from "../FileUpload";
import Button from "@mui/material/Button";

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
                        id="outlined-number"
                        label="Цена"
                        type="number"
                        value={card.price}
                        onChange={(e)=>{props.handleNumberChange(e.target.value,'price')}}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box>
                <Box sx={{paddingTop:'10px',display:'flex', justifyContent:'flex-start',marginLeft:'5%',marginRight:'5%', flexDirection:'row', width:'90%'}}>
                    <TextField
                        id="outlined-number"
                        label="Разрешение"
                        type="number"
                        value={card.resolution}
                        onChange={(e)=>{props.handleNumberChange(e.target.value,'resolution')}}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box>
                <Box sx={{paddingTop:'10px',display:'flex', justifyContent:'flex-start',marginLeft:'5%',marginRight:'5%', flexDirection:'row', width:'90%'}}>
                    <TextField
                        id="outlined-number"
                        label="Угол обзора"
                        type="number"
                        value={card.angle}
                        onChange={(e)=>{props.handleNumberChange(e.target.value,'angle')}}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box>
                <Box sx={{paddingBottom:'10px',paddingTop:'10px',display:'flex', justifyContent:'flex-start',marginLeft:'5%',marginRight:'5%', flexDirection:'row', width:'90%'}}>
                    <TextField
                        id="outlined-number"
                        label="Дальность IK подсветки"
                        type="number"
                        value={card.IK_far}
                        onChange={(e)=>{props.handleNumberChange(e.target.value,'IK_far')}}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box>
                <Divider orientation={'horizontal'}/>
                <Box sx={{paddingTop:'10px',display:'flex', justifyContent:'flex-start',marginLeft:'5%',marginRight:'5%', flexDirection:'column', width:'90%'}}>
                    <Typography sx={{display:'flex',maxWidth:'70%',flexDirection:'column',justifyContent:'space-around'}}  variant={'h5'}>Доступные протоколы:&nbsp; </Typography>
                    <Box sx={{paddingTop:'10px',display:'flex', justifyContent:'flex-start',marginLeft:'5%',marginRight:'5%', flexDirection:'row', width:'90%'}}>
                        <Typography sx={{display:'flex',maxWidth:'70%',flexDirection:'column',justifyContent:'space-around'}}  variant={'h5'}>AHD:&nbsp; </Typography>
                        <Switch onChange={()=>props.changeSwitch('AHD')} checked={card.AHD}/>
                    </Box>
                    <Box sx={{paddingTop:'10px',display:'flex', justifyContent:'flex-start',marginLeft:'5%',marginRight:'5%', flexDirection:'row', width:'90%'}}>
                        <Typography sx={{display:'flex',maxWidth:'70%',flexDirection:'column',justifyContent:'space-around'}}  variant={'h5'}>TVI:&nbsp; </Typography>
                        <Switch onChange={()=>props.changeSwitch('TVI')} checked={card.TVI}/>
                    </Box>
                    <Box sx={{paddingTop:'10px',display:'flex', justifyContent:'flex-start',marginLeft:'5%',marginRight:'5%', flexDirection:'row', width:'90%'}}>
                        <Typography sx={{display:'flex',maxWidth:'70%',flexDirection:'column',justifyContent:'space-around'}}  variant={'h5'}>CVI:&nbsp; </Typography>
                        <Switch onChange={()=>props.changeSwitch('CVI')} checked={card.CVI}/>
                    </Box>
                    <Box sx={{paddingTop:'10px',display:'flex', justifyContent:'flex-start',marginLeft:'5%',marginRight:'5%', flexDirection:'row', width:'90%'}}>
                        <Typography sx={{display:'flex',maxWidth:'70%',flexDirection:'column',justifyContent:'space-around'}}  variant={'h5'}>CVBS:&nbsp; </Typography>
                        <Switch onChange={()=>props.changeSwitch('CVBS')} checked={card.CVBS}/>
                    </Box>
                    <Box sx={{paddingTop:'10px',display:'flex', justifyContent:'flex-start',marginLeft:'5%',marginRight:'5%', flexDirection:'row', width:'90%'}}>
                        <Typography sx={{display:'flex',maxWidth:'70%',flexDirection:'column',justifyContent:'space-around'}}  variant={'h5'}>PAL:&nbsp; </Typography>
                        <Switch onChange={()=>props.changeSwitch('PAL')} checked={card.PAL}/>
                    </Box>
                </Box>
                <Divider orientation={'horizontal'}/>
                <Box sx={{paddingTop:'10px',display:'flex', justifyContent:'flex-start',marginLeft:'5%',marginRight:'5%', flexDirection:'row', width:'90%'}}>
                    <Typography sx={{display:'flex',maxWidth:'70%',flexDirection:'column',justifyContent:'space-around'}}  variant={'h5'}>Датчик движения:&nbsp;</Typography>
                    <Switch onChange={()=>props.changeSwitch('move_check')} checked={card.move_check}/>
                </Box>
                <Box sx={{paddingTop:'10px',display:'flex', justifyContent:'flex-start',marginLeft:'5%',marginRight:'5%', flexDirection:'row', width:'90%'}}>
                    <Typography sx={{display:'flex',maxWidth:'70%',flexDirection:'column',justifyContent:'space-around'}}  variant={'h5'}>Работа при низкой температуре:&nbsp; </Typography>
                    <Switch onChange={()=>props.changeSwitch('low_temp')} checked={card.low_temp}/>
                </Box>
                <Box sx={{paddingTop:'10px',display:'flex', justifyContent:'flex-start',marginLeft:'5%',marginRight:'5%', flexDirection:'row', width:'90%'}}>
                    <Typography sx={{display:'flex',maxWidth:'70%',flexDirection:'column',justifyContent:'space-around'}}  variant={'h5'}>Защита от вандализма:&nbsp; </Typography>
                    <Switch onChange={()=>props.changeSwitch('AV')} checked={card.AV}/>
                </Box>
                <Box sx={{paddingTop:'10px',display:'flex', justifyContent:'flex-start',marginLeft:'5%',marginRight:'5%', flexDirection:'row', width:'90%'}}>
                    <Typography sx={{display:'flex',maxWidth:'70%',flexDirection:'column',justifyContent:'space-around'}}  variant={'h5'}>Зашита от воды:&nbsp; </Typography>
                    <Switch onChange={()=>props.changeSwitch('water_protect')} checked={card.water_protect}/>
                </Box>
                <Box sx={{paddingTop:'10px',display:'flex', justifyContent:'flex-start',marginLeft:'5%',marginRight:'5%', flexDirection:'row', width:'90%'}}>
                    <Typography sx={{display:'flex',maxWidth:'70%',flexDirection:'column',justifyContent:'space-around'}}  variant={'h5'}>Дистанционное управление:&nbsp; </Typography>
                    <Switch onChange={()=>props.changeSwitch('remote_control')} checked={card.remote_control}/>
                </Box>
                <Box sx={{paddingTop:'10px',display:'flex', justifyContent:'flex-start',marginLeft:'5%',marginRight:'5%', flexDirection:'row', width:'90%'}}>
                    <Typography sx={{display:'flex',maxWidth:'70%',flexDirection:'column',justifyContent:'space-around'}}  variant={'h5'}>Беспроводная:&nbsp; </Typography>
                    <Switch onChange={()=>props.changeSwitch('wireless')} checked={card.wireless}/>
                </Box>
                <Box sx={{paddingTop:'10px',display:'flex', justifyContent:'space-around', flexDirection:'row', width:'100%'}}>
                    <Typography variant={'h5'}>{props.card.info}</Typography>
                </Box>
                <FileUpload handleFileEvent={props.handleFileEvent} delFromFiles={props.delFromFiles} files={props.card.files}/>
                <Divider orientation={'horizontal'}/>
                {fetchButton}
            </Paper>
        )
}