import Switch from '@mui/material/Switch';
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

export default function Options(props){
    return(
        <Box>
            <Box sx={{padding:'5px', display:'flex',width:'100%',justifyContent:'flex-start'}}><Switch checked={props.inverter} onChange={()=>props.handleSwitch('inverter')}/><Box sx={{paddingTop:'8px'}}>{'Инвертор'}</Box></Box>
            <Box sx={{padding:'5px', display:'flex',width:'100%',justifyContent:'flex-start'}}><Switch checked={props.freezing} onChange={()=>props.handleSwitch('freezing')}/><Box sx={{paddingTop:'8px'}}>{'Режим охлаждения'}</Box></Box>
            <Box sx={{padding:'5px', display:'flex',width:'100%',justifyContent:'flex-start'}}><Switch checked={props.heating} onChange={()=>props.handleSwitch('heating')}/><Box sx={{paddingTop:'8px'}}>{'Режим обогрева'}</Box></Box>
            <Box sx={{padding:'5px', display:'flex',width:'100%',justifyContent:'flex-start'}}><Switch checked={props.winding} onChange={()=>props.handleSwitch('winding')}/><Box sx={{paddingTop:'8px'}}>{'Режим проветривания'}</Box></Box>
            <Box sx={{padding:'5px', display:'flex',width:'100%',justifyContent:'flex-start'}}><Switch checked={props.drying} onChange={()=>props.handleSwitch('drying')}/><Box sx={{paddingTop:'8px'}}>{'Режим осушения'}</Box></Box>
        </Box>)
}