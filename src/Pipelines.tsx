import React, { useEffect, useState } from 'react';
import useFetch from 'use-http'
import './App.css';
import { Paper, Typography, Container, Grid } from '@material-ui/core';
import PipelineProgress from './components/PipelineProgress';
// @ts-ignore
import styled from 'styled-components';
// @ts-ignore
import { Link } from "react-router-dom";


interface Run {
  status: String
}

interface Pipeline {
  name: String,
  runs: Run[]
}

const PaddedPaper = styled(Paper)`
  margin-top: 1rem;
  padding: 1.5rem 1rem;
  &:hover {
    cursor: pointer;
    background: rgb(248, 248, 248);
  }
`;

function Pipelines() {
  const [pipelines, setPipelines] = useState<Pipeline[]>([])

  const [request, response] = useFetch("http://localhost:3030")

  useEffect(() => {
    initializePipelines()
  }, [])
  
  async function initializePipelines() {
    const initialPipelines = await request.get('/pipelines')
    if (response.ok) setPipelines(initialPipelines)
  }

  return (
    <div>
      <Typography color="textSecondary" align="left" variant="h6">Repos ran in the last ten days...</Typography>
        {request.loading && 'Loading!'}
        {request.error && 'Error :('}
        {pipelines.map(pipeline => {
          let to = `/${pipeline.name}`

          return <Link to={to} style={{ textDecoration: 'none'}}>
            <PaddedPaper elevation={3}>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <PipelineProgress status={pipeline.runs[0].status}></PipelineProgress>
                </Grid>
                <Grid item>
                  <Typography variant="h6">{pipeline.name.replace(".", "/")}</Typography>
                </Grid>
              </Grid>
            </PaddedPaper>
          </Link>
        })}
    </div>
  );
}

export default Pipelines;
