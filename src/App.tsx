import React from 'react';
import './App.css';
import { AppBar, Toolbar, Typography, Container } from '@material-ui/core';
// @ts-ignore
import styled from 'styled-components';
// @ts-ignore
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Pipelines from './Pipelines';
import Pipeline from './Pipeline';
import PipelineSteps from './PipelineSteps';

const MarginTopContainer = styled(Container)`
  margin-top: 2rem;
`;

function App() {
  return (
    <div className="App">
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
              <Typography variant="h6">
                Kubes CD
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
        <MarginTopContainer>
            <Switch>
              <Route path="/:pipelineName/:commit">
                <PipelineSteps />
              </Route>
              <Route path="/:pipelineName">
                <Pipeline />
              </Route>
              <Route path="/">
                <Pipelines />
              </Route>
            </Switch>
        </MarginTopContainer>
      </Router>
    </div>
  );
}

export default App;
