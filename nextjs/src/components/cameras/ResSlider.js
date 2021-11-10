import * as React from 'react';
import Slider from '@mui/material/Slider';

function valuetext(value) {
    return Number(value)/10;
}

const minDistance = 1;

export default function ResSlider(props) {
    const [value1, setValue1] = React.useState([Number(props.minres)*10, Number(props.maxres)*10]);

    const handleChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
            props.handleRange([newValue[0]/10,newValue[1]/10],'minres','maxres')
        } else {
            setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
            props.handleRange([newValue[0]/10,newValue[1]/10],'minres','maxres')
        }
    };

    return (
        <Slider
            getAriaLabel={() => 'Minimum distance'}
            min={Number(props.initData.digits.minres)*10}
            max={Number(props.initData.digits.maxres)*10}
            value={value1}
            onChange={handleChange}
            valueLabelDisplay="auto"
            scale={valuetext}
            disableSwap
        />
    );
}