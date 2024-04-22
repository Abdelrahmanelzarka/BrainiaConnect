import * as React from 'react';
import wheelChair from "../assets/photos/wheelChair.png";
import "./howtoUse.css";


import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const steps = [
  {
    label: 'Wear The Headset',
    description: `Place the Unicorn Hybrid Black Headset carefully on the Patient's Head,
     you may lubricate the pateint's head before starting for better signals readability by the Electrodes.`,
  },
  {
    label: 'Login / Sign Up',
    description:'If you already have an account Login to  the website, otherwise Sign Up and create an account to use our product BrainiaConnect.',
  },
  {
    label: 'Start gazing at the Letters',
    description: `For the patient to start to communicate with people smoothly start gazing
     at the flickering letteres required to complete the word tha needs to be pronounced.
        1.	A touchable button will be provided to return to the home page.
        2.	The website will have a white text area for the user to write their message.
        3.	There will be 36 buttons for English letters and numbers.
        4.	A button for white-space will be provided.
        5.	A speak button will be available to start pronouncing the sentence the user has written till now.
        6.	A NO button will be provided to remove the last character or decline the suggestion from the auto-complete API.
        7.	A YES button will be available to approve the suggestion from the auto-complete API.`,
  },
  {
    label: 'Auto-Complete',
    description: `Auto-Complete feature is added in our product to speed up the sentence / word prediction,
    that will be displayed on the Progress Bar to smoothen the patient experience.`,
  },
  {
    label: 'Stopping the process / Snooze',
    description: `To stop writing, the confirmation button can be used as a snooze button. 
    After 2 continuous periods of focusing on it will turn the screen off/on except for it.`,
  },
];

export default function HowToUse() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div>
        <h1 className="titleHowToUse"> How To Use BrainiaConnect ?</h1>
        <div className="HowToUseContainer">
            <Box sx={{ maxWidth: 400 }} className="StepperContent" >
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                        optional={
                            index === 4 ? (
                            <Typography variant="caption">Last step</Typography>
                            ) : null
                        }
                        >
                        {step.label}
                        </StepLabel>
                        <StepContent>
                        <Typography>{step.description}</Typography>
                        <Box sx={{ mb: 4 }}>
                            <div>
                            <Button
                                variant="contained"
                                onClick={handleNext}
                                sx={{ mt: 1, mr: 1 }}
                            >
                                {index === steps.length - 1 ? 'Finish' : 'Continue'}
                            </Button>
                            <Button
                                disabled={index === 0}
                                onClick={handleBack}
                                sx={{ mt: 1, mr: 1 }}
                            >
                                Back
                            </Button>
                            </div>
                        </Box>
                        </StepContent>
                    </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length && (
                    <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                        Reset
                    </Button>
                    </Paper>
                )}
                </Box>
                <img src={wheelChair} alt="How To Use BrainiaConnect" className="HowToUseImage" />
        </div>
    </div>

   
  );
}