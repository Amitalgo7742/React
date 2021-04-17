import { Formik } from 'formik';
import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';

export default function LoginForm()
{
    return(
        <Formik initialValues={{email:'',password:''}}
        onSubmit={values=>console.log(values)}
        >
         
         {({handleSubmit})=>(
             <Form className='ui form' onSubmit={handleSubmit} autcomplete="off">
             <MyTextInput name="email" placeholder="Email"/>
             <MyTextInput name="password" placeholder="Password" type="password"/>
             <Button type="submit" positive content="Login" fluid/>
             </Form>
         )

         }
        </Formik>
    )
}