namespace android.test.map{
    'use strict';
    export class MapOrdinalScale extends OrdinalScale{
        getScaleValue(v:any){
            let index:number = this._domainCache[v];
            if(isNaN(index)){
                index = 0;
            }
            return this.__ranges[index];
        }
        get ranges():any[]{
            return this.__ranges;
        }
    }
}