namespace android.util{
    export class ArrayList<T> {
        private _array:T[] = [];
        constructor(){

        }
        public add(value:T):void{
            this._array.push(value);
        }
        public remove<T>(value:any):void{
            if(typeof(value) === 'number'){
                this._array.splice(value);
            }else {
                var index = this._array.indexOf(value);
                if(index >0){
                    this._array.splice(index,1);
                }
            }
        }
        public clear(){
            this._array.length = 0;
        }
        public size():number{
            return this._array.length;
        }
        public get(index:number){
            return this._array[index];
        }
    }
}