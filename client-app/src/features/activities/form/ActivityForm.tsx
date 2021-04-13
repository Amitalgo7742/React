import React, { useState, FormEvent, useEffect } from 'react';
import { Segment, Button, FormField, Label, Header } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { v4 as uuid } from 'uuid';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, useHistory, useParams } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOption';
import MyDateInput from '../../../app/common/form/MyDateInput';




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
    date: null,
    city: '',
    venue: ''
  });

  const validationSchema = Yup.object({
    title: Yup.string().required("Title of activity is required"),
    category: Yup.string().required("Category of activity is required"),
    description: Yup.string().required("Description of activity is required"),
    date: Yup.string().required("Date of activity is required").nullable(),
    city: Yup.string().required("City of activity is required"),
    venue: Yup.string().required("Venu of activity is required"),

  })
  const handleFormSubmit = (activity:Activity) => {
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


  useEffect(() => {
    if (id) loadActivity(id).then(activity => setActivity(activity!));

  }, [id, loadActivity])





  if (loadingInitial) return <LoadingComponent content="Loading activity .." />
  return (
    <Segment clearing>
     <Header content="Activity Details" sub color="teal"/>
      <Formik validationSchema={validationSchema}
        enableReinitialize initialValues={activity} onSubmit={value => handleFormSubmit(value)}>
        {({ handleSubmit,isValid,isSubmitting,dirty }) =>
        (
          <Form className="ui form" onSubmit={handleSubmit}>
           <MyTextInput name="title" placeholder="Title"/>
           <MyTextArea rows={3} name="description" placeholder="Description"/>
           <MySelectInput options={categoryOptions} name="category" placeholder="Category"/>
           <MyDateInput name="date" 
           placeholderText="Date"
           showTimeSelect
           timeCaption='time'
           dateFormat='MMMM d, yyyy h:mm aa'
           />
           <Header content="Location Details" sub color="teal"/>
           <MyTextInput name="city" placeholder="City"/>
           <MyTextInput name="venue" placeholder="Venue"/>

            <Button 
            disabled={isSubmitting||!dirty|| !isValid}
            loading={loading} floated='right' positive type='submit' content='Submit' />
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