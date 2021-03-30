import { action, makeAutoObservable, makeObservable, observable, observe } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";

export default class ActivityStore
{
    activities:Activity[]=[];
    selectedActivity:Activity|undefined=undefined;
    editMode=false;
    loading=false;
    loadingInitial=false;

    constructor()
    {
        makeAutoObservable(this)
    }
  loadActivities= async ()=>
  {
     this.setLoadingState(true);
      try{
          const activities=await agent.Activities.list();
        
            activities.forEach((activity) => {
                activity.date = activity.date.split('T')[0]
                this.activities.push(activity);
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
   
  selectActivity = (id: string) => {
  this.selectedActivity=this.activities.find(a=>a.id===id);
    
  };
  cancelSelectedActivity=()=>
  {
      this.selectedActivity=undefined;
  }

  openForm=(id?:string)=>
  {
      id ? this.selectActivity(id):this.cancelSelectedActivity();
      this.editMode=true;

  }

  closeForm=()=>
  {
      this.editMode=false;
  }

}