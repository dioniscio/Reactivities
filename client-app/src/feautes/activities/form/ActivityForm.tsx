import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Button, Form, FormField, Header, Label, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import {v4 as uuid} from 'uuid';
import { Link } from "react-router-dom";
import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from 'yup';
import MyTexInput from "../../../app/common/form/MyTexInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MyselectInput from "../../../app/common/form/MyselectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { IActivity } from "../../../app/models/activity";

export default observer( function ActivityForm(){
    const history = useHistory();
    const   {activityStore} = useStore();
    const   {createActivity,updateActivity,loading,loadActivity,loadingInitial} = activityStore;
    const   {id} = useParams<{id: string}>();

    const [activity, setActivity] = useState<IActivity>({
        id:'',
        title:'',
        category:'',
        description:'',
        date: null,
        city:'',
        venue:''
    });
    const validationSchema = Yup.object({
        title : Yup.string().required('The activity title is required'),
        description : Yup.string().required('The activity description is required'),
        category : Yup.string().required(),
        date : Yup.string().required(),
        venue : Yup.string().required(),
        city : Yup.string().required(),
    });
    useEffect(()=>{
        if(id) loadActivity(id).then(activity => setActivity(activity!));
    },[id,loadActivity]);


     function handleFormSubmit(activity:IActivity){
        
        if(activity.id.length ===0){
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity).then(()=> history.push(`/activities/${newActivity.id}`));
        }else{
            updateActivity(activity).then(()=> history.push(`/activities/${activity.id}`));
        }

     }


     if(loadingInitial) return <LoadingComponent content='Loading' />

    return (

        <Segment clearing>
            <Header content='Activity Details' sub color="teal" />
            <Formik
                validationSchema={validationSchema} 
                enableReinitialize 
                initialValues={activity} onSubmit ={values => handleFormSubmit(values)}>
                {({handleSubmit,isValid, isSubmitting,dirty})=>(
                    <Form className='ui form' onSubmit ={handleSubmit} autoComplete='off'>
                    <MyTexInput name="title"placeholder="Title" />
                    <MyTextArea placeholder ='Description' name='description' rows={3}/>
                    <MyselectInput options={categoryOptions} placeholder ='Category' name='category' />
                    <MyDateInput 
                        placeholderText ='Date' 
                        name='date'
                        showTimeSelect
                        timeCaption="time"
                        dateFormat='MMMM d, yyyy h:mm aa' 
                    />
                    <Header content='Location Details' sub color="teal" />
                    <MyTexInput placeholder ='City' name='city' />
                    <MyTexInput placeholder ='Venue' name='venue' />
                    <Button
                        disabled ={isSubmitting || !dirty || !isValid}  
                        loading ={loading} floated="right" positive type="submit" content='Submit' />
                    <Button  as={Link} to="/activities" floated="right" type="button" content='Cancel' />
                </Form>
                )}
            </Formik>   

        </Segment>


    )


})