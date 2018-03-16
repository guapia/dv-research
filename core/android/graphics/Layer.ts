namespace android.graphics {
    'use strict';
    
    export class Layer {
        private __index:number = 0;
        private __id:string;
        private __canvas:Canvas;
        public set id(val:string){
            if(val != null && val != this.__id){
                this.__id = val;
            }
        }
        public get id():string{
            return this.__id;
        }
        
        constructor(layerindex:number,id:string){
            this.__id = id;
            this.__index = layerindex;
        }
    
        
    

    }
}