namespace android.app{
    export class Bundle{
        private map:any = {};
        public put(key:string,value:any){
            this.map[key]= value;
        }
        public putDefault(value:any){
            this.map['default']=value;
        }
        public getDefault(){
            return this.map['default'];
        }
    }
}