import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography'
import Paper from "@material-ui/core/Paper";
import theme from "../../theme";
import React from 'react';


export default function MainPageConteiner(props){
    React.useEffect( ()=>{
        props.setIsRouteChanging(false);
        document.querySelector('.content').style.display='flex';
        document.querySelector('.indicator').style.display='none';
        document.querySelectorAll('.pagination-tab-conditioners').forEach((i) => {
            i.addEventListener('click', (event) => {
                event.preventDefault();
            })
        })
    },[])

    return(
        <Paper sx={{display:'flex',flexDirection:'column', width:'100%', marginTop: 3, paddingBottom: 3, background: theme.palette.secondary.light}}  elevation={2}>
            <Box sx={{display:'flex', justifyContent:'space-around',width:'100%',flexWrap:'wrap'}}>
                {props.text}
            </Box>
        </Paper>
    );
}