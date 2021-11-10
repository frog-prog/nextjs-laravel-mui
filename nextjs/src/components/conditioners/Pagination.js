import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import theme from "../../theme";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";
import Link from 'next/link';
import React from "react";

export default function Pagination(props){
    let thisPage=props.page;
    let nextPage=Number(thisPage)+1;
    let prevPage=Number(thisPage)-1;
    if(props.count==0){
        return (<Paper elevation={2} sx={{display:'flex',marginLeft:'5px',marginRight:'5px', justifyContent:'space-around', width:'200px',flexWrap:'wrap'}}>
            <Typography sx={{marginTop:'15px'}} color={theme.palette.primary.main} align={'center'} variant={'h6'}>Ничего не найдено</Typography>
        </Paper>)
    }
    if(props.count==1){
        return (<Paper elevation={2} sx={{display:'flex',marginLeft:'5px',marginRight:'5px', justifyContent:'space-around', width:'70px',flexWrap:'wrap'}}>
            <Typography sx={{marginTop:'15px'}} color={theme.palette.primary.main} align={'center'} variant={'h5'}>{thisPage}</Typography>
        </Paper>)
    }
    if(props.page>1&&props.page<props.count){
        return(<>
            <Paper elevation={2} sx={{display:'flex', justifyContent:'space-around', width:'80px',flexWrap:'wrap'}}>
                <IconButton onClick={()=>props.PagFunc(prevPage)} >
                    <a className={'pagination'} href={'http://localhost:3000/conditioners/' + prevPage}/>
                        <FirstPageIcon  color={'primary'} fontSize={'large'}/>
                </IconButton>

            </Paper>
            <Paper elevation={2} sx={{display:'flex',marginLeft:'5px',marginRight:'5px', justifyContent:'space-around', width:'70px',flexWrap:'wrap'}}>
                <Typography sx={{marginTop:'15px'}} color={theme.palette.primary.main} align={'center'} variant={'h5'}>{thisPage}</Typography>
            </Paper>
            <Paper elevation={2} sx={{display:'flex', justifyContent:'space-around', width:'80px',flexWrap:'wrap'}}>
                <IconButton onClick={()=>props.PagFunc(nextPage)}>
                    <a className={'pagination'} href={'http://localhost:3000/conditioners/' + nextPage}/>
                        <LastPageIcon color={'primary'} fontSize={'large'}/>
                </IconButton>
            </Paper>
        </>)
    }
    if(props.count>1&&props.page==props.count){
        return(<>
            <Paper elevation={2} sx={{display:'flex', justifyContent:'space-around', width:'80px',flexWrap:'wrap'}}>
                <IconButton onClick={()=>props.PagFunc(prevPage)}>
                    <a className={'pagination'} href={'http://localhost:3000/conditioners/' + prevPage}/>
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
    if(props.count>1&&props.page==1){
        return(<>
            <Paper elevation={2} sx={{display:'flex', justifyContent:'space-around', width:'80px', flexWrap:'wrap'}}>
            </Paper>
            <Paper elevation={2} sx={{display:'flex',marginLeft:'5px',marginRight:'5px', justifyContent:'space-around', width:'70px',flexWrap:'wrap'}}>
                <Typography sx={{marginTop:'15px'}} color={theme.palette.primary.main} align={'center'} variant={'h5'}>{thisPage}</Typography>
            </Paper>
            <Paper elevation={2} sx={{display:'flex', justifyContent:'space-around', width:'80px',flexWrap:'wrap'}}>
                <IconButton onClick={()=>props.PagFunc(nextPage)}>
                    <a className={'pagination'} href={'http://localhost:3000/conditioners/' + nextPage}/>
                        <LastPageIcon color={'primary'}  fontSize={'large'}/>
                </IconButton>
            </Paper>
        </>)
    }
}