/// <reference path="../../../base.ts" />
namespace android.test {
    'use strict';
    export class OrdinalTicks extends Ticks {
        static create(scale: Scale) {
            Debug.assert(scale instanceof OrdinalScale, " scale must be OrdinalScale");
            return new OrdinalTicks(scale);
        }
        createTicks(count?: number) {

            // this._ticks = this._createTicks(this._scale.max,this._scale.min,count);
            if(count != null){
                this._ticks = [];
                let domains:string[] =  (<OrdinalScale>this._scale).domains;
                if(domains.length/count<2){
                    this._ticks = (<OrdinalScale>this._scale).domains;
                }else{
                    let step:number = Math.floor(domains.length/count);
                    for(let i =0; i < domains.length; i+=step){
                        this._ticks.push(domains[i]);
                    }
                }
            }else{
                this._ticks = (<OrdinalScale>this._scale).domains;
            }
            return this._ticks;
        }
    }
}
