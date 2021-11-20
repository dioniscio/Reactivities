import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { IActivity } from "../layout/activity";
import {v4 as uuid} from 'uuid';

export default class ActivityStore {
    activityRegistry = new Map<string,IActivity>();
    selectedActivity: IActivity | undefined =undefined;
    editMode:boolean = false;
    loading:boolean = false;
    loadingInitial:boolean = true;
    
    constructor(){
        makeAutoObservable(this)
    }

    get activitiesByDate(){
        return Array.from(this.activityRegistry.values()).sort((a,b)=>
            Date.parse(a.date) - Date.parse(b.date));
    }

    loadActivies = async() =>{
        try {
            const activies = await agent.Activities.list();
            activies.forEach(activity =>{
                activity.date = activity.date.split('T')[0];
                this.activityRegistry.set(activity.id,activity);
            });
            this.setLoadingInital(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInital(false);
        }
    }

    setLoadingInital =(state:boolean) =>{
        this.loadingInitial = state;
    }

    selectActivity =(id: string) =>{
        this.selectedActivity = this.activityRegistry.get(id);
    }

    cancelSelectActivity =() =>{
        this.selectedActivity = undefined;
    }
    
    openForm =(id?: string) =>{
        id ? this.selectActivity(id) : this.cancelSelectActivity();
        this.editMode = true;
    }

    closeForm =() =>{
        this.editMode = false;
    }

    createActivity = async(activity:IActivity) => {
        this.loading = true;
        activity.id = uuid();

        try {
            await agent.Activities.create(activity);
            runInAction(()=>{
                this.activityRegistry.set(activity.id,activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(()=>{
                this.loading = false;
            })
        }


    }

    updateActivity = async(activity:IActivity) =>{
        this.loading = true;

        try {
            await agent.Activities.update(activity);
            runInAction(()=>{
                this.activityRegistry.set(activity.id,activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })

        } catch (error) {
            console.log(error);
            runInAction(()=>{
                this.loading = false;
            })
        }

    }


    deleteActivity = async(id: string) =>{
        this.loading = true;

        try {
            await agent.Activities.delete(id);
            runInAction(()=>{
                this.activityRegistry.delete(id);
                if(this.selectedActivity?.id ===id) this.cancelSelectActivity();
                this.loading = false;

            })
            
        } catch (error) {
            console.log(error);
            runInAction(()=>{
                this.loading = false;
            })
        }
    }




    
}