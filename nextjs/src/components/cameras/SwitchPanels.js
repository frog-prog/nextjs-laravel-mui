import * as React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Brands from "./Brands";
import Container from "@material-ui/core/Container";
import Options from "./Options";

export default function SwitchPanels(props) {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    let panel='';
    if(value===0){
        panel=<Brands Brands={props.Brands} addedBrands={props.addedBrands} handleBrands={props.handleBrands}/>;
    }
    else{
        panel=<Options
            AHD={props.AHD}
            TVI={props.TVI}
            CVI={props.CVI}
            CVBS={props.CVBS}
            PAL={props.PAL}
            move_check={props.move_check}
            water_protect={props.water_protect}
            low_temp={props.low_temp}
            AV={props.AV}
            remote_control={props.remote_control}
            wireless={props.wireless}
            handleSwitch={props.handleSwitch}/>;
    }
    let params=[];
    if(props.thirdLevelMatches){
        params[0]='48%';
        params[1]="fullWidth";
    }
    else {
        if (props.matches) {
            params[0] = '48%';
            params[1] = "scrollable";
        }
        if (!props.secondLevelMatches) {
            params[0] = '100%';
            params[1] = "scrollable";
        } else {
            params[0] = '100%';
            params[1] = "fullWidth";
        }
    }
    return (
        <Box sx={{minWidth: '196px', width:params[0]}}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant={params[1]}
                scrollButtons="auto"
                aria-label="scrollable auto tabs example">
                <Tab label="Торговые марки" value={0}/>
                <Tab label="Дополнительно" value={1}/>
            </Tabs>
            <Container>
                {panel}
            </Container>
        </Box>
    )
}