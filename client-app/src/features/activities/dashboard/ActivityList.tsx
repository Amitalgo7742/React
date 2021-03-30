import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Item, Button, Label, Segment } from 'semantic-ui-react';
import { setSyntheticTrailingComments } from 'typescript';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';


const ActivityList: React.FC = ({

 
}) => {
  const {activityStore}=useStore();
  const[target,setTarget]=useState('');
  const {deleteActivity,activities,loading}=activityStore;
  function handleActivityDelete(e:SyntheticEvent<HTMLButtonElement>, id: string)
    {
      setTarget(e.currentTarget.name);
      deleteActivity(id);
    }
  return (
    
    
    <Segment clearing>
      <Item.Group divided>
        {activities.map(activity => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as='a'>{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => activityStore.selectActivity(activity.id)}
                  floated='right'
                  content='View'
                  color='blue'
                />
                <Button
                  name={activity.id}
                  loading={target === activity.id && loading}
                  onClick={(e) => handleActivityDelete(e, activity.id)}
                  floated='right'
                  content='Delete'
                  color='red'
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(ActivityList);

