import React from 'react';
import Slider from '@mui/material/Slider';

function valuetext(value) {
    return `${value}°C`;
}

const minDistance = 1;

export default function AngleSlider(props) {
    const [value1, setValue1] = React.useState([props.minangle, props.maxangle]);

    const handleChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
            props.handleRange(value1,'minangle','maxangle')
        } else {
            setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
            props.handleRange(value1,'minangle','maxangle')
        }
    };

    return (
        <Slider
            getAriaLabel={() => 'Minimum distance'}
            min={props.initData.digits.minangle}
            max={props.initData.digits.maxangle}
            value={value1}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            disableSwap
        />
    );
}