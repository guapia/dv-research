namespace android.app{
    export class Intent{
         private context:Context;
         private targetActivityClass:any;
         public setClass(c:Context, activityClass:any):void{
            this.context =c;
            this.targetActivityClass = activityClass;
         }
         public getClass(){
             return this.targetActivityClass;
         }
         public getContext(){
             return this.context;
         }
    }
}