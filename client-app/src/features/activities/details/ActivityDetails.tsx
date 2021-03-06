import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Card, Image, Button, Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';



const ActivityDetails: React.FC = () => {
  const {activityStore}=useStore();
  const {selectedActivity:activity,loadActivity,loadingInitial}=activityStore;
  const{id}=useParams<{id:string}>();

 useEffect(() => {
  
  if(id) loadActivity(id);
 },[id,loadActivity])

  if(loadingInitial||!activity) return <LoadingComponent/>;
  return (
   <Grid>
     <Grid.Column width={10}>
    <ActivityDetailedHeader activity={activity}/>
    <ActivityDetailedInfo activity={activity}/>
    <ActivityDetailedChat/>
    </Grid.Column>
    <Grid.Column width={6}>
   <ActivityDetailedSidebar/>
    </Grid.Column>
   </Grid>
  );
};

export default observer(ActivityDetails);