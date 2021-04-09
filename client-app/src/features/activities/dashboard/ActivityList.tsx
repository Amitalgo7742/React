import { observer } from 'mobx-react-lite';

import React, {  } from 'react';
import { Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityListItem from './ActivityListItem';


const ActivityList: React.FC = ({

 
}) => {
  const {activityStore}=useStore();
  
  const {activitiesByDate}=activityStore;
 
  return (
    
    
    <Segment clearing>
      <Item.Group divided>
        {activitiesByDate.map(activity => (
         <ActivityListItem activity={activity}/>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(ActivityList);

