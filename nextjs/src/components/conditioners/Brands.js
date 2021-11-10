import Switch from '@mui/material/Switch';
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

export default function Brands(props){
    return(
        <Box>
            {props.Brands.map((i,j)=>{
                return(
                    <Box sx={{padding:'5px', display:'flex',width:'100%',justifyContent:'flex-start'}} key={j}>
                    <Switch onChange={()=>props.handleBrands(i.id)} checked={props.addedBrands.indexOf(i.id)>=0}/>
                    <Box sx={{paddingTop:'8px'}}>
                        {i.name}
                    </Box>
                </Box>)
            })}
        </Box>)
}
