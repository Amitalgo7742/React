import React, { useState, FormEvent, useEffect } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import {v4 as uuid} from 'uuid';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, useHistory, useParams } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';




const ActivityForm: React.FC = ({
 
}) => {
  const {activityStore}=useStore();
  const history=useHistory();
  const {createActivity,updateActivity,loading,loadActivity,loadingInitial}=activityStore;
  const{id}=useParams<{id:string}>();
  const [activity, setActivity] = useState<Activity>({

    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: ''
  });
 

  useEffect(() => {
   if(id) loadActivity(id).then(activity=>setActivity(activity!)); 
   
  },[id,loadActivity] )

  

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid()
      }; 
      createActivity(newActivity).then(()=>history.push(`/activities/${newActivity.id}`));
    } else {
      updateActivity(activity).then(()=>history.push(`/activities/${activity.id}`));;
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  if(loadingInitial) return <LoadingComponent content="Loading activity .."/>
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name='title'
          placeholder='Title'
          value={activity.title}
        />
        <Form.TextArea
          onChange={handleInputChange}
          name='description'
          rows={2}
          placeholder='Description'
          value={activity.description}
        />
        <Form.Input
          onChange={handleInputChange}
          name='category'
          placeholder='Category'
          value={activity.category}
        />
        <Form.Input
          onChange={handleInputChange}
          name='date'
          type='datetime-local'
          placeholder='Date'
          value={activity.date}
        />
        <Form.Input
          onChange={handleInputChange}
          name='city'
          placeholder='City'
          value={activity.city}
        />
        <Form.Input
          onChange={handleInputChange}
          name='venue'
          placeholder='Venue'
          value={activity.venue}
        />
        <Button loading={loading} floated='right' positive type='submit' content='Submit' />
        <Button
         as={Link}
         to='/activities'
          floated='right'
          type='button'
          content='Cancel'
        />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);