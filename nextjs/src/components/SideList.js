import ToggleButton from '@material-ui/core/ToggleButton';
import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup';
import React, {useRef, useState} from "react";
import {useRouter} from 'next/router';
import Drawer from "@material-ui/core/Drawer";
import Link from 'next/link'
import theme from "../theme";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    paper: {
        background: theme.palette.secondary.light
    }
})
export default function SideList(props) {
    const styles = useStyles();
    const [section,setSection]=useState(props.initialState)
    const handleChange = (event, newSection) => {
            if (newSection !== null && newSection!==section) {
                setSection(newSection);
                props.handleDrawer();
            }
    }
        return(
            <Drawer classes={{ paper: styles.paper }} variant={"persistent"}  anchor={'left'} open={props.open}>
            <ToggleButtonGroup sx={{background: theme.palette.primary.dark, width:"250px",marginTop:"40px"}}  orientation={"vertical"} exclusive value={section} onChange={handleChange}>
                <ToggleButton  sx={{color:'#fff'}} onClick={handleChange} value="main"><Link href={'http://localhost:3000/'}><a className={'pagination-buttons-main pagination-tab-main'}>Главная</a></Link></ToggleButton>
                <ToggleButton  sx={{color:'#fff'}} onClick={handleChange} value="conditioners"><Link href={'http://localhost:3000/conditioners/1'}><a className={'pagination-buttons-conditioners pagination-tab-conditioners'}>Кондиционеры</a></Link></ToggleButton>
                <ToggleButton  sx={{color:'#fff'}} onClick={handleChange} value="cameras"><Link href={'http://localhost:3000/cameras/1'}><a className={'pagination-buttons-cameras pagination-tab-cameras'}>Камеры</a></Link></ToggleButton>
            </ToggleButtonGroup>
            </Drawer>
        )
}