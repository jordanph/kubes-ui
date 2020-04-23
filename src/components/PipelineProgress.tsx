import React, { FunctionComponent } from 'react';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
// @ts-ignore
import styled from 'styled-components';

const SpinningLoad = styled(AutorenewIcon)`
  animation-name: spin;
  animation-duration: 2000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  @keyframes spin {
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
  }
`

interface IPipelineProgress {
  status: String
}

const PipelineProgress: FunctionComponent<IPipelineProgress> = ({ status }) => {
  switch(status) {
    case "Succeeded":
      return <CheckCircleOutlineIcon fontSize="large" style={{ color: "green"}} />
    case "Failed":
      return <HighlightOffIcon fontSize="large" color="secondary" />
    case "Running":
      return <SpinningLoad fontSize="large" color="primary" />
    case "Pending":
      return <RadioButtonUncheckedIcon fontSize="large" color="disabled" />
    default:
      return <div/>
  }
}

export default PipelineProgress;
