import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {useTheme} from "@mui/material/styles";
import React, {useState} from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from "@mui/material/IconButton";
import MenuIcon from '@material-ui/icons/Menu';

export default function Tabs(props) {
    const theme=useTheme();
    const handleChange = (event, newSection) => {
            if (newSection !== null && newSection!==props.initialState) {
                    props.changeSection(newSection);
            }
    }


if(useMediaQuery(theme.breakpoints.up('md'))){
    if(!props.tokenCheck && props.role!==0) {
        if(props.role===1){
            return (<ToggleButtonGroup  sx={{'background':'#fff'}} color='secondary' exclusive value={props.initialState} onChange={handleChange}>
                    <ToggleButton key={1}  value="main">Главная</ToggleButton>
                    <ToggleButton key={2}  value="auth">Безопасность</ToggleButton>
                </ToggleButtonGroup>
            )
        }
        if(props.role===2){
            return (<ToggleButtonGroup  sx={{'background':'#fff'}} color='secondary' exclusive value={props.initialState} onChange={handleChange}>
                    <ToggleButton key={1}  value="main">Главная</ToggleButton>
                    <ToggleButton key={2}  value="conditioners">Кондиционеры</ToggleButton>
                    <ToggleButton key={3}  value="cameras">Камеры</ToggleButton>
                    <ToggleButton key={4}  value="auth">Безопасность</ToggleButton>
                </ToggleButtonGroup>
            )
        }
    }
    else {
        return null
    }
}
else {
    if(!props.tokenCheck && props.role!==0) {
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
    else {
        return null
    }
}
}