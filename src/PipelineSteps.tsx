import React, { useEffect, useState } from 'react';
import useFetch from 'use-http'
import { Typography, ListSubheader, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import PipelineProgress from './components/PipelineProgress';
// @ts-ignore
import styled from 'styled-components';
// @ts-ignore
import { useParams } from "react-router-dom";


interface Run {
  name: String,
  status: Status
}

interface Status {
  status: String,
  startedAt: String,
  finishedAt: String,
  exitCode: String
}

const BorderedList = styled(List)`
  border: solid 1px #ddd;
  border-radius: 4px;
  margin-bottom: 20px;
  padding-bottom: 0px;
`;

const BorderedListItem = styled(ListItem)`
  border-bottom: 1px solid #F0F0F0;
  border-top: 1px solid #F0F0F0;
`;

const PaddedHeader = styled(Typography)`
  margin-bottom: 20px;
`

const PipelineSteps = () => {
  const { pipelineName, commit } = useParams();

  const [steps, setSteps] = useState<Run[]>([])

  const [request, response] = useFetch("http://localhost:3030")

  useEffect(() => {
    initializeSteps()
  }, [])
  
  async function initializeSteps() {
    const initialSteps = await request.get(`/pipelines/${pipelineName}/${commit}`)
    if (response.ok) setSteps(initialSteps)
  }

  return (
    <div>
        <PaddedHeader variant="h6" align="left">{pipelineName.replace(".", "/")}</PaddedHeader>
        {request.loading && 'Loading!'}
        {request.error && 'Error :('}
        <BorderedList
          component="nav"
          aria-labelledby="nested-list-subheader"
          align="left"
        >
          {steps.map(step => {
            return <BorderedListItem button>
            <ListItemIcon>
              <PipelineProgress status={step.status.status}></PipelineProgress>
            </ListItemIcon>
            <ListItemText primary={step.name} />
          </BorderedListItem>
          })}
        </BorderedList>
    </div>
  );
}

export default PipelineSteps;
