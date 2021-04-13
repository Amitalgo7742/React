import React, { useState, FormEvent, useEffect } from 'react';
import { Segment,  Button } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { v4 as uuid } from 'uuid';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, useHistory, useParams } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Formik,Form,Field } from 'formik';




const ActivityForm: React.FC = ({

}) => {
  const { activityStore } = useStore();
  const history = useHistory();
  const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;
  const { id } = useParams<{ id: string }>();
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
    if (id) loadActivity(id).then(activity => setActivity(activity!));

  }, [id, loadActivity])





  if (loadingInitial) return <LoadingComponent content="Loading activity .." />
  return (
    <Segment clearing>

      <Formik enableReinitialize initialValues={activity} onSubmit={value=>console.log(value)}>
       {({values:activity,handleChange,handleSubmit})=>
       (
        <Form className="ui form" onSubmit={handleSubmit}>
        <Field
         
          name='title'
          placeholder='Title'
         
        />
        <Field
         
          name='description'
          rows={2}
          placeholder='Description'
         
        />
        <Field
         
          name='category'
          placeholder='Category'
         
        />
        <Field
          
          name='date'
          type='datetime-local'
          placeholder='Date'
         
        />
        <Field
         
          name='city'
          placeholder='City'
         
        />
        <Field
         
          name='venue'
          placeholder='Venue'
         
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
       )}
      </Formik>

    
    </Segment>
  );
};

export default observer(ActivityForm);