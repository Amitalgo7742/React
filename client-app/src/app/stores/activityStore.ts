import { action, makeAutoObservable, makeObservable, observable, observe, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import {v4 as uuid} from 'uuid';

export default class ActivityStore
{
   
    activityRegistry= new Map<string,Activity>();
    selectedActivity:Activity|undefined=undefined;
    editMode=false;
    loading=false;
    loadingInitial=true;

    constructor()
    {
        makeAutoObservable(this)
    }

    get activitiesByDate()
    {
        return Array.from(this.activityRegistry.values()).sort((a,b)=>Date.parse(a.date)- Date.parse(b.date));
    }

    get groupedActivities()
    {
      return Object.entries(
        this.activitiesByDate.reduce((activities,activity)=>{
          const date=activity.date;
          activities[date]=activities[date]?[...activities[date],activity]:[activity];
          return activities;

        },{}as{[key:string]:Activity[]})
      )
    }

  loadActivities= async ()=>
  {
      this.loadingInitial=true;
     
      try{
          const activities=await agent.Activities.list();
        
            activities.forEach((activity:Activity) => {
                this.setActivity(activity);
              })
              this.setLoadingState(false);
       

         

      }catch(error)
      {
        this.setLoadingState(false);
        
      }
  }

  setLoadingState=(state:boolean)=>{
    this.loadingInitial=state;
  }
   
  

  createActivity=async (activity:Activity)=>
  {
      this.loading=true;
     
      try
      {
        await agent.Activities.create(activity);
        runInAction(()=>{
            this.activityRegistry.set(activity.id,activity);
            this.selectedActivity=activity;
            this.editMode=false;
            this.loading=false;
        })
      }
      catch(error)
      {
        runInAction(()=>{
            
            this.loading=false;
        })

      }

  }

  loadActivity=async(id:string)=>
  {
    let activity=this.getActivity(id);
      if(activity)
      {
          this.selectedActivity=activity;
          return activity;
      }
      else
      {
          this.loadingInitial=true;
          try{
              activity=await agent.Activities.details(id);
              this.setActivity(activity);
              runInAction(()=>{
                this.selectedActivity=activity;
              })
            
              this.setLoadingState(false);
              return activity;

          }
          catch(error)
          {
            console.log(error);
            this.setLoadingState(false);
          }
      }

  }

  private setActivity=(activity:Activity|undefined)=>
  {
      if(activity!=undefined)
      {
    activity.date = activity.date.split('T')[0]
    this.activityRegistry.set(activity.id,activity);
      }

  }

  private getActivity=(id:string)=>
  {
      return this.activityRegistry.get(id);
  }

  updateActivity= async (activity:Activity)=>
  {
    this.loading=true;
    try{
        await agent.Activities.update(activity);
        runInAction(()=>{
          this.activityRegistry.set(activity.id,activity);
           this.selectedActivity=activity;
           this.editMode=false;
            
            this.loading=false;
        })
    }
    catch (error)
    {
        runInAction(()=>{
            
            this.loading=false;
        })

    }
  }

  deleteActivity= async(id:string)=>
  {
       this.loading=true;
       try
       {
           await agent.Activities.delete(id);
           runInAction(()=>{
              this.activityRegistry.delete(id);
              
               this.loading=false;
           })

       }
       catch(error)
       {
        runInAction(()=>{
            
            this.loading=false;
        })

       }
  }
}