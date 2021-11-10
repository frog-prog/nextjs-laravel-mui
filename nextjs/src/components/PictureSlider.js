import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';


export default function PictureSlider(props) {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = props.card.pics.length;
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return (
        <Box sx={{width:'100%', maxWidth: '1024px', display:'flex',flexDirection:'column'  }}>
            <Paper
                square
                elevation={0}
                sx={{
                    display: 'flex',
                    justifyContent:'space-around',
                    height: 50,
                    bgcolor: 'background.default',
                    paddingTop:'10px'
                }}
            >
                <Typography variant={'h4'}>{props.card.name}</Typography>
            </Paper>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {props.card.pics.map((step, index) => (
                    <Box key={index} sx={{width:'100%', height:'100%', backgroundColor:'#000', display: 'flex', flexDirection: 'column', justifyContent:'space-around'}}>
                    <Box sx={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'space-around'}} key={index}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <img className={'sliderImage'} src={step} alt={props.name}/>
                        ) : null}
                    </Box>
                    </Box>
                ))}
            </SwipeableViews>
            <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                    >
                        Next
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                        Back
                    </Button>
                }
            />
        </Box>
    );
}

