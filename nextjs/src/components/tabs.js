import ToggleButton from '@material-ui/core/ToggleButton';
import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup';
import {useTheme} from "@material-ui/core/styles";
import React, {useRef, useState} from "react";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import {useRouter} from 'next/router'
import Link from 'next/link'

export default function Tabs(props) {
    const theme=useTheme();
    const [section,setSection]=useState(props.initialState)
    const handleChange = (event, newSection) => {
            if (newSection !== null && newSection!==section) {
                    setSection(newSection);
            }
    }

if(useMediaQuery(theme.breakpoints.up('md'))){
return(
    <ToggleButtonGroup  sx={{'background':'#fff'}} color='secondary' exclusive value={section} onChange={handleChange}>
        <ToggleButton sx={{'padding':0}} value="main"><Link href={'http://localhost:3000/'}><a className={'pagination-tabs-main pagination-tab-main'}>Главная</a></Link></ToggleButton>
        <ToggleButton sx={{'padding':0}} value="conditioners"><Link href={'http://localhost:3000/conditioners/1'}><a className={'pagination-tabs-conditioners pagination-tab-conditioners'}>Кондиционеры</a></Link></ToggleButton>
        <ToggleButton sx={{'padding':0}} value="cameras"><Link href={'http://localhost:3000/cameras/1'}><a className={'pagination-tabs-cameras pagination-tab-cameras'}>Камеры</a></Link></ToggleButton>
    </ToggleButtonGroup>)
}
else {
    return (
        <IconButton size="medium"
                    edge="start"
                    color="secondary"
                    aria-label="menu"
                    onClick={props.handleDrawer}>
            <MenuIcon/>
        </IconButton>
    )
}
}