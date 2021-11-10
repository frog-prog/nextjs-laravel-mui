import Switch from '@mui/material/Switch';
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

export default function Options(props){
    return(
        <Box>
            <Box sx={{padding:'5px', display:'flex',width:'100%',justifyContent:'flex-start'}}><Switch checked={props.AHD} onChange={()=>props.handleSwitch('AHD')}/><Box sx={{paddingTop:'8px'}}>{'AHD'}</Box></Box>
            <Box sx={{padding:'5px', display:'flex',width:'100%',justifyContent:'flex-start'}}><Switch checked={props.TVI} onChange={()=>props.handleSwitch('TVI')}/><Box sx={{paddingTop:'8px'}}>{'TVI'}</Box></Box>
            <Box sx={{padding:'5px', display:'flex',width:'100%',justifyContent:'flex-start'}}><Switch checked={props.CVI} onChange={()=>props.handleSwitch('CVI')}/><Box sx={{paddingTop:'8px'}}>{'CVI'}</Box></Box>
            <Box sx={{padding:'5px', display:'flex',width:'100%',justifyContent:'flex-start'}}><Switch checked={props.CVBS} onChange={()=>props.handleSwitch('CVBS')}/><Box sx={{paddingTop:'8px'}}>{'CVBS'}</Box></Box>
            <Box sx={{padding:'5px', display:'flex',width:'100%',justifyContent:'flex-start'}}><Switch checked={props.PAL} onChange={()=>props.handleSwitch('PAL')}/><Box sx={{paddingTop:'8px'}}>{'PAL'}</Box></Box>
            <Box sx={{padding:'5px', display:'flex',width:'100%',justifyContent:'flex-start'}}><Switch checked={props.move_check} onChange={()=>props.handleSwitch('move_check')}/><Box sx={{paddingTop:'8px'}}>{'Датчик движения'}</Box></Box>
            <Box sx={{padding:'5px', display:'flex',width:'100%',justifyContent:'flex-start'}}><Switch checked={props.water_protect} onChange={()=>props.handleSwitch('water_protect')}/><Box sx={{paddingTop:'8px'}}>{'Защита от воды'}</Box></Box>
            <Box sx={{padding:'5px', display:'flex',width:'100%',justifyContent:'flex-start'}}><Switch checked={props.low_temp} onChange={()=>props.handleSwitch('low_temp')}/><Box sx={{paddingTop:'8px'}}>{'Низкотемпературность'}</Box></Box>
            <Box sx={{padding:'5px', display:'flex',width:'100%',justifyContent:'flex-start'}}><Switch checked={props.AV} onChange={()=>props.handleSwitch('AV')}/><Box sx={{paddingTop:'8px'}}>{'Защита от вандализма'}</Box></Box>
            <Box sx={{padding:'5px', display:'flex',width:'100%',justifyContent:'flex-start'}}><Switch checked={props.remote_control} onChange={()=>props.handleSwitch('remote_control')}/><Box sx={{paddingTop:'8px'}}>{'Дистанционное управление'}</Box></Box>
            <Box sx={{padding:'5px', display:'flex',width:'100%',justifyContent:'flex-start'}}><Switch checked={props.wireless} onChange={()=>props.handleSwitch('wireless')}/><Box sx={{paddingTop:'8px'}}>{'Беспроводное управление'}</Box></Box>
        </Box>)
}
