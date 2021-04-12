import { observer } from 'mobx-react-lite';
import { group } from 'node:console';

import React, { Fragment } from 'react';
import { Header, Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityListItem from './ActivityListItem';


const ActivityList: React.FC = ({


}) => {
  const { activityStore } = useStore();

  const { groupedActivities } = activityStore;

  return (

    <>
      {groupedActivities.map(([group, activities]) => (
        <Fragment key={group}>
          <Header sub color="teal">
            {group}
          </Header>
          
              {activities.map(activity => (
                <ActivityListItem key={activity.id} activity={activity} />
              ))}
            
        </Fragment>
      ))}
    </>

  );
};

export default observer(ActivityList);

