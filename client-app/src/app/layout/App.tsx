import React, { useState, useEffect, Fragment, SyntheticEvent } from 'react';
import {  Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from '../layout/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';


const App = () => {
  const {activityStore}=useStore();
  
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading activities' />
  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        
        <ActivityDashboard
        
        />
      </Container>
    </Fragment>
  );
};

export default observer(App);