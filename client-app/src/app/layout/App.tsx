import React, { useEffect, useState } from 'react';

import axios  from 'axios';
import { Activity } from '../models/activity';
import { Header, List } from 'semantic-ui-react';

function App() {
const[activities,setActivities]= useState<Activity[]>([]);

useEffect(() => {
  axios.get<Activity[]>('http://localhost:5000/api/activities').then(response=>{
    setActivities(response.data);
  })
}, [])

  return (
    <div className="App">
     <Header as="h2" icon="users" content="Reactiviness"/>
      <List>
        {
          activities.map((activity)=>(
            <List.Item key={activity.id}>{activity.title}</List.Item>
          ))
        }
        </List>
    </div>
  );
}

export default App;
