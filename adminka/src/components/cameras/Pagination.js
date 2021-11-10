import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import theme from "../../theme";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";
import React from "react";

export default function Pagination(props){
    let thisPage=props.page;
    let nextPage=Number(thisPage)+1;
    let prevPage=Number(thisPage)-1;
    if(props.count===0){
        return (<Paper elevation={2} sx={{display:'flex',marginLeft:'5px',marginRight:'5px', justifyContent:'space-around', width:'200px',flexWrap:'wrap'}}>
            <Typography sx={{marginTop:'15px'}} color={theme.palette.primary.main} align={'center'} variant={'h6'}>Ничего не найдено</Typography>
        </Paper>)
    }
    if(props.count===1){
        return (<Paper elevation={2} sx={{display:'flex',marginLeft:'5px',marginRight:'5px', justifyContent:'space-around', width:'70px',flexWrap:'wrap'}}>
            <Typography sx={{marginTop:'15px'}} color={theme.palette.primary.main} align={'center'} variant={'h5'}>{thisPage}</Typography>
        </Paper>)
    }
    if(props.page>1&&props.page<props.count){
        return(<>
            <Paper elevation={2} sx={{display:'flex', justifyContent:'space-around', width:'80px',flexWrap:'wrap'}}>
                <IconButton onClick={()=>props.PagFunc(prevPage)} >
                        <FirstPageIcon  color={'primary'} fontSize={'large'}/>
                </IconButton>

            </Paper>
            <Paper elevation={2} sx={{display:'flex',marginLeft:'5px',marginRight:'5px', justifyContent:'space-around', width:'70px',flexWrap:'wrap'}}>
                <Typography sx={{marginTop:'15px'}} color={theme.palette.primary.main} align={'center'} variant={'h5'}>{thisPage}</Typography>
            </Paper>
            <Paper elevation={2} sx={{display:'flex', justifyContent:'space-around', width:'80px',flexWrap:'wrap'}}>
                <IconButton onClick={()=>props.PagFunc(nextPage)}>
                        <LastPageIcon color={'primary'} fontSize={'large'}/>
                </IconButton>
            </Paper>
        </>)
    }
    if(props.count>1&&props.page===props.count){
        return(<>
            <Paper elevation={2} sx={{display:'flex', justifyContent:'space-around', width:'80px',flexWrap:'wrap'}}>
                <IconButton onClick={()=>props.PagFunc(prevPage)}>
                        <FirstPageIcon color={'primary'} fontSize={'large'}/>
                </IconButton>
            </Paper>
            <Paper elevation={2} sx={{display:'flex',marginLeft:'5px',marginRight:'5px', justifyContent:'space-around', width:'70px',flexWrap:'wrap'}}>
                <Typography sx={{marginTop:'15px'}} color={theme.palette.primary.main} align={'center'} variant={'h5'}>{thisPage}</Typography>
            </Paper>
            <Paper elevation={2} sx={{display:'flex', justifyContent:'space-around', width:'80px',flexWrap:'wrap'}}>
            </Paper>
        </>)
    }
    if(props.count>1&&props.page===1){
        return(<>
            <Paper elevation={2} sx={{display:'flex', justifyContent:'space-around', width:'80px', flexWrap:'wrap'}}>
            </Paper>
            <Paper elevation={2} sx={{display:'flex',marginLeft:'5px',marginRight:'5px', justifyContent:'space-around', width:'70px',flexWrap:'wrap'}}>
                <Typography sx={{marginTop:'15px'}} color={theme.palette.primary.main} align={'center'} variant={'h5'}>{thisPage}</Typography>
            </Paper>
            <Paper elevation={2} sx={{display:'flex', justifyContent:'space-around', width:'80px',flexWrap:'wrap'}}>
                <IconButton onClick={()=>props.PagFunc(nextPage)}>
                        <LastPageIcon color={'primary'}  fontSize={'large'}/>
                </IconButton>
            </Paper>
        </>)
    }
}