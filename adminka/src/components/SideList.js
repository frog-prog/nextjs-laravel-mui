import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import React from "react";
import Drawer from "@mui/material/Drawer";

export default function SideList(props) {
    const handleChange = (event, newSection) => {
        if (newSection !== null && newSection!==props.initialState) {
            props.changeSection(newSection);
        }
    }
    if(!props.tokenCheck && props.role!==0) {
        if(props.role===1){
            return (<Drawer variant={"persistent"}  anchor={'left'} open={props.open}>
                <ToggleButtonGroup  sx={{'background':'#fff'}} color='secondary' orientation={'vertical'} exclusive value={props.initialState} onChange={handleChange}>
                    <ToggleButton key={1}  value="main">Главная</ToggleButton>
                    <ToggleButton key={2}  value="auth">Безопасность</ToggleButton>
                </ToggleButtonGroup>
                </Drawer>
            )
        }
        if(props.role===2){
            return (
                <Drawer variant={"persistent"}  anchor={'left'} open={props.open}>
                <ToggleButtonGroup  sx={{'background':'#fff'}} color='secondary' exclusive orientation={'vertical'} value={props.initialState} onChange={handleChange}>
                    <ToggleButton key={1}  value="main">Главная</ToggleButton>
                    <ToggleButton key={2}  value="conditioners">Кондиционеры</ToggleButton>
                    <ToggleButton key={3}  value="cameras">Камеры</ToggleButton>
                    <ToggleButton key={4}  value="auth">Безопасность</ToggleButton>
                </ToggleButtonGroup>
                </Drawer>
            )
        }
    }
    else {
        return null
    }
}