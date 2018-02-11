namespace android.util{
     export class Log{
         static d(message:string,tag?:string){
             console.log(message);
         }
         static w(message:string,tag?:string){
            console.warn(message);
         }
         static e(message:string,tag?:string){
             console.error(message);
         }
     }   
}