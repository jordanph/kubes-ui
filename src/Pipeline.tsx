import React, { useEffect, useState } from 'react';
import useFetch from 'use-http'
import { Typography, ListSubheader, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import PipelineProgress from './components/PipelineProgress';
// @ts-ignore
import styled from 'styled-components';
// @ts-ignore
import { useParams, Link } from "react-router-dom";


interface Run {
  status: String,
  commit: String
}

interface Pipeline {
  name: String,
  runs: Run[]
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

const Pipeline = () => {
  const { pipelineName } = useParams();

  const [pipelines, setPipelines] = useState<Pipeline[]>([])

  const [request, response] = useFetch("http://localhost:3030")

  useEffect(() => {
    initializePipelines()
  }, [])
  
  async function initializePipelines() {
    const initialPipelines = await request.get(`/pipelines/${pipelineName}`)
    if (response.ok) setPipelines(initialPipelines)
  }

  return (
    <div>
        <PaddedHeader variant="h6" align="left">{pipelineName.replace(".", "/")}</PaddedHeader>
        {request.loading && 'Loading!'}
        {request.error && 'Error :('}

        {pipelines.map(pipeline => {
          let runs = pipeline.runs.map(run => {
            let to = `/${pipelineName}/${run.commit}`

            return <Link to={to} style={{ textDecoration: 'none'}}>
              <BorderedListItem button>
                <ListItemIcon>
                  <PipelineProgress status={run.status}></PipelineProgress>
                </ListItemIcon>
                <ListItemText primary={run.commit} />
              </BorderedListItem>
            </Link> 
          })

          return  <BorderedList
                      component="nav"
                      aria-labelledby="nested-list-subheader"
                      align="left"
                      subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                          {pipeline.name}
                        </ListSubheader>
                      }>
                        {runs}
                      </BorderedList>
        })}
    </div>
  );
}

export default Pipeline;
