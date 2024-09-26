import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Check from '@mui/icons-material/Check';
import { styled } from '@mui/material';

// Custom connector that adapts based on orientation
const QontoConnector = styled(StepConnector)(({ theme, ownerState }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: ownerState.orientation === 'horizontal' ? 10 : 0,
    left: ownerState.orientation === 'horizontal' ? 'calc(-50% + 16px)' : undefined,
    right: ownerState.orientation === 'horizontal' ? 'calc(50% + 16px)' : undefined,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: 'eaeaf0',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: 'lightGreen',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderTopWidth: ownerState.orientation === 'horizontal' ? 3 : undefined,
    borderLeftWidth: ownerState.orientation === 'vertical' ? 3 : undefined,
    borderColor: '#eaeaf0',
    minHeight: ownerState.orientation === 'vertical' ? 40 : undefined,
    marginLeft: ownerState.orientation === 'vertical' ? 1 : 0,
  },
}));

// Custom step icon that works for both orientations
const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: ownerState.active ? 'lightGreen' : '#eaeaf0',
  display: 'flex',
  justifyContent:'center',
  height: 22,
  alignItems: 'center',
  '& .QontoStepIcon-completedIcon': {
    color: 'white',
    zIndex: 1,
    fontSize: 30,
    backgroundColor: 'lightGreen',
    borderRadius: '50%',
  },
  '& .QontoStepIcon-circle': {
    width: 30,
    height: 30,
    borderRadius: '50%',
    backgroundColor: '#eaeaf0',
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

export default function Timeline({ steps, activeStep, orientation = 'horizontal' }) {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper
        sx={{
            '.MuiStepLabel-root': {
              paddingTop: 0, paddingBottom: 0
            },
          }} 
        alternativeLabel={orientation == 'horizontal' ? true : false}
        activeStep={activeStep}
        orientation={orientation}
        connector={<QontoConnector ownerState={{ orientation }} />} // Pass orientation to connector styles
      >
        {steps.map((step) => (
          <Step key={step.title}>
            <StepLabel StepIconComponent={QontoStepIcon}>
              <div className='text-xs md:text-sm'>{step.title}</div>
              <div className="text-lightText text-xs md:text-sm">{step.date}</div>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
