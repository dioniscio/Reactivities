import React from 'react';
import {  Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../feautes/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router';
import HomePage from '../../feautes/routers/home/HomePage';
import ActivityForm from '../../feautes/activities/form/ActivityForm';
import ActivityDetails from '../../feautes/activities/details/ActivityDetails';
import TestErrors from '../../feautes/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../feautes/errors/NotFound';


function App() {
  const location = useLocation();
  
      return (
        <>
        <ToastContainer position="bottom-right" hideProgressBar />
        <Route exact path='/' component={HomePage} />
        <Route 
          path={'/(.+)'}
          render ={()=>(
            <>
            <NavBar/>
          <Container style={{marginTop:'7em'}}>
            <Switch>
              <Route exact path='/activities' component={ActivityDashboard} />
              <Route path='/activities/:id' component={ActivityDetails} />
              <Route key={location.key} path={['/createActivity','/manage/:id']} component={ActivityForm} />
              <Route path='/errors' component={TestErrors} />
              <Route component={NotFound} />
            </Switch>
          </Container>
          
            </>
          )}
        />
      

          </>
      );
}

export default observer(App);
