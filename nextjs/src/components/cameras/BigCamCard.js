import CamcardButton from "./CamcardButton";
import Box from '@material-ui/core/Box';
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider"
import PictureSlider from "../PictureSlider";
import Typography from '@mui/material/Typography';
import theme from "../../theme";
import Image from 'next/image'
import yes from "../../yes.svg";
import no from "../../No.svg";
import React, {Component} from 'react';

export default class BigCamCard extends Component{
    constructor(props) {
        super(props);
        this.state={
        }
        this.presence=this.presence.bind(this)
        this.checkState=this.checkState.bind(this)
        this.protocols=this.protocols.bind(this)
    }

    presence(){
        if(this.props.card.presence===true){
            return (<Typography variant="h6" color={'#2e7d32'}>
                Есть в наличии
            </Typography>)
        }
        else{
            return (<Typography variant="h6" color={'#d32f2f'}>
                Нет в наличии
            </Typography>)
        }
    }

    checkState(state){
        if(state===true){
            return (<Box sx={{display:'flex', marginLeft:'30px',justifyContent:'space-around',flexDirection:'column'}}><Image src={yes} priority={true} height={25} width={25} alt={'да'}/></Box>)
        }
        else{
            return (<Box sx={{display:'flex',marginLeft:'30px',justifyContent:'space-around',flexDirection:'column'}}><Image src={no} priority={true} height={25} width={25} alt={'нет'} /></Box>)
        }
    }
    protocols(){
        let protocols='';
        if(this.props.card.AHD===true){
            protocols=protocols+'AHD ';
        }
        if(this.props.card.TVI===true){
            protocols=protocols+'TVI ';
        }
        if(this.props.card.CVI===true){
            protocols=protocols+'CVI ';
        }
        if(this.props.card.CVBS===true){
            protocols=protocols+'CVBS ';
        }
        if(this.props.card.PAL===true){
            protocols=protocols+'PAL';
        }
        return protocols;
    }
    render(){
        return(
            <Paper component={'div'} elevation={2} sx={{marginTop:'10px',display:'flex', justifyContent:'flex-start', flexDirection:'column', maxWidth:'1024px', height:'100%', width:'100%'}}>
                <PictureSlider card={this.props.card}/>
                <Box sx={{paddingTop:'10px',display:'flex', justifyContent:'center', flexDirection:'row', width:'100%'}}>
                    <Typography variant={'h5'}>Бренд:&nbsp;</Typography>
                    <Typography color={theme.palette.secondary.main} variant={'h6'}>{this.props.card.camera_maker.name}</Typography>
                </Box>
                <Divider orientation={'horizontal'}/>
                <Box sx={{display:'flex', marginLeft:'5%',marginRight:'5%', justifyContent:'flex-start', flexDirection:'row', width:'90%'}}>
                    <Box sx={{display:'flex',paddingTop:'15px',height:'100%', justifyContent:'flex-start', flexDirection:'row'}}>
                    {this.presence()}
                    </Box>
                    <Box sx={{display:'flex',paddingTop:'7px',paddingBottom:'7px',height:'100%', paddingLeft:'7px', flexDirection:'column', justifyContent:'space-around'}}>
                        <CamcardButton
                            addToBasket={this.props.addToBasket}
                            selected={this.props.check(this.props.card.littleCard,'cameras')}
                            card={this.props.card.littleCard}
                            section={'cameras'}
                        />
                    </Box>
                </Box>
                <Divider orientation={'horizontal'}/>
                <Box sx={{paddingTop:'10px',display:'flex', justifyContent:'flex-start',marginLeft:'5%',marginRight:'5%', flexDirection:'row', width:'90%'}}>
                    <Typography sx={{display:'flex',maxWidth:'70%',flexDirection:'column',justifyContent:'space-around'}} variant={'h5'}>Цена:&nbsp;</Typography>
                    <Typography color={theme.palette.secondary.main}  sx={{display:'flex',maxWidth:'25%',flexDirection:'column',justifyContent:'space-around'}}  variant={'h6'}>{this.props.card.price}руб.</Typography>
                </Box>
                <Box sx={{paddingTop:'10px',display:'flex', justifyContent:'flex-start',marginLeft:'5%',marginRight:'5%', flexDirection:'row', width:'90%'}}>
                    <Typography sx={{display:'flex',maxWidth:'70%',flexDirection:'column',justifyContent:'space-around'}}  variant={'h5'}>Разрешение:&nbsp; </Typography>
                    <Typography color={theme.palette.secondary.main}  sx={{display:'flex',maxWidth:'25%',flexDirection:'column',justifyContent:'space-around'}}  variant={'h6'}>{this.props.card.resolution}МгП.</Typography>
                </Box>
                <Box sx={{paddingTop:'10px',display:'flex', justifyContent:'flex-start',marginLeft:'5%',marginRight:'5%', flexDirection:'row', width:'90%'}}>
                    <Typography sx={{display:'flex',maxWidth:'70%',flexDirection:'column',justifyContent:'space-around'}}  variant={'h5'}>Угол обзора:&nbsp; </Typography>
                    <Typography color={theme.palette.secondary.main}  sx={{display:'flex',maxWidth:'25%',flexDirection:'column',justifyContent:'space-around'}}  variant={'h6'}>{this.props.card.angle}°</Typography>
                </Box>
                <Box sx={{paddingTop:'10px',display:'flex', justifyContent:'flex-start',marginLeft:'5%',marginRight:'5%', flexDirection:'row', width:'90%'}}>
                    <Typography sx={{display:'flex',maxWidth:'70%',flexDirection:'column',justifyContent:'space-around'}}  variant={'h5'}>Дальность IK подсветки:&nbsp; </Typography>
                    <Typography color={theme.palette.secondary.main}  sx={{display:'flex',maxWidth:'25%',flexDirection:'column',justifyContent:'space-around'}}  variant={'h6'}>{this.props.card.IK_far}м</Typography>
                </Box>
                <Box sx={{paddingTop:'10px',display:'flex', justifyContent:'flex-start',marginLeft:'5%',marginRight:'5%', flexDirection:'row', width:'90%'}}>
                    <Typography sx={{display:'flex',maxWidth:'70%',flexDirection:'column',justifyContent:'space-around'}}  variant={'h5'}>Доступные протоколы:&nbsp; </Typography>
                    <Typography color={theme.palette.secondary.main}  sx={{display:'flex',maxWidth:'25%',flexDirection:'column',justifyContent:'space-around'}}  variant={'h6'}>{this.protocols()}</Typography>
                </Box>
                <Divider orientation={'horizontal'}/>
                <Box sx={{paddingTop:'10px',display:'flex', justifyContent:'flex-start',marginLeft:'5%',marginRight:'5%', flexDirection:'row', width:'90%'}}>
                    <Typography sx={{display:'flex',maxWidth:'70%',flexDirection:'column',justifyContent:'space-around'}}  variant={'h5'}>Датчик движения:&nbsp;</Typography>
                    {this.checkState(this.props.card.move_check)}
                </Box>
                <Box sx={{paddingTop:'10px',display:'flex', justifyContent:'flex-start',marginLeft:'5%',marginRight:'5%', flexDirection:'row', width:'90%'}}>
                    <Typography sx={{display:'flex',maxWidth:'70%',flexDirection:'column',justifyContent:'space-around'}}  variant={'h5'}>Работа при низкой температуре:&nbsp; </Typography>
                    {this.checkState(this.props.card.low_temp)}
                </Box>
                <Box sx={{paddingTop:'10px',display:'flex', justifyContent:'flex-start',marginLeft:'5%',marginRight:'5%', flexDirection:'row', width:'90%'}}>
                    <Typography sx={{display:'flex',maxWidth:'70%',flexDirection:'column',justifyContent:'space-around'}}  variant={'h5'}>Защита от вандализма:&nbsp; </Typography>
                    {this.checkState(this.props.card.AV)}
                </Box>
                <Box sx={{paddingTop:'10px',display:'flex', justifyContent:'flex-start',marginLeft:'5%',marginRight:'5%', flexDirection:'row', width:'90%'}}>
                    <Typography sx={{display:'flex',maxWidth:'70%',flexDirection:'column',justifyContent:'space-around'}}  variant={'h5'}>Зашита от воды:&nbsp; </Typography>
                    {this.checkState(this.props.card.water_protect)}
                </Box>
                <Box sx={{paddingTop:'10px',display:'flex', justifyContent:'flex-start',marginLeft:'5%',marginRight:'5%', flexDirection:'row', width:'90%'}}>
                    <Typography sx={{display:'flex',maxWidth:'70%',flexDirection:'column',justifyContent:'space-around'}}  variant={'h5'}>Дистанционное управление:&nbsp; </Typography>
                    {this.checkState(this.props.card.remote_control)}
                </Box>
                <Box sx={{paddingTop:'10px',display:'flex', justifyContent:'flex-start',marginLeft:'5%',marginRight:'5%', flexDirection:'row', width:'90%'}}>
                    <Typography sx={{display:'flex',maxWidth:'70%',flexDirection:'column',justifyContent:'space-around'}}  variant={'h5'}>Беспроводная:&nbsp; </Typography>
                    {this.checkState(this.props.card.wireless)}
                </Box>

            </Paper>
        )
    }
}