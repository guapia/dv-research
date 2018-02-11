namespace android.util{
    export class Message{
        public what :number =0;
        public args:{[key:string]:any}={};
        constructor(what?:number){
            this.what =what;
        }

        public static obtain(what?:number):Message{
            return new Message(what);
        }

    }



}