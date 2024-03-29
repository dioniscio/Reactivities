import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Header, Item, Segment } from "semantic-ui-react";
import ActivityListItem from "../../../app/layout/ActivityListItem";
import { useStore } from "../../../app/stores/store";


export default observer (function ActivityList(){
    
    const {activityStore} = useStore();
    const {groupedActivities} = activityStore;
    return (

        <>
            {groupedActivities.map(([group,activities])=>(
                <Fragment key={group}>
                    <Header sub color="teal">
                        {group}
                    </Header>
                    <Segment>
            <Item.Group divided>
                {activities.map(activity =>(
                   <ActivityListItem key={activity.id} activity={activity} />
                ))}
            </Item.Group>
        </Segment>
                </Fragment>
            ))}
        </>

    )

})