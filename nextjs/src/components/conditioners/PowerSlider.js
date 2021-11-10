import * as React from 'react';
import Slider from '@mui/material/Slider';

function valuetext(value) {
    return `${value}°C`;
}

const minDistance = 1;

export default function PowerSlider(props) {
    const [value1, setValue1] = React.useState([props.minpower, props.maxpower]);

    const handleChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
            props.handleRange(newValue,'minpower','maxpower')
        } else {
            setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
            props.handleRange(newValue,'minpower','maxpower')
        }
    };

    return (
        <Slider
            getAriaLabel={() => 'Minimum distance'}
            min={props.initData.digits.minpower}
            max={props.initData.digits.maxpower}
            value={value1}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            disableSwap
        />
    );
}