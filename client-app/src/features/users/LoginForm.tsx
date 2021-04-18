import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Button, Form } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';
import { useStore } from '../../app/stores/store';

export default observer(function LoginForm()
{
    const {userStore}=useStore();
    return(
        <Formik initialValues={{email:'',password:''}}
        onSubmit={values=>userStore.login(values)}
        >
         
         {({handleSubmit,isSubmitting})=>(
             <Form className='ui form' onSubmit={handleSubmit} autcomplete="off">
             <MyTextInput name="email" placeholder="Email"/>
             <MyTextInput name="password" placeholder="Password" type="password"/>
             <Button type="submit" loading={isSubmitting} positive content="Login" fluid/>
             </Form>
         )

         }
        </Formik>
    )
})