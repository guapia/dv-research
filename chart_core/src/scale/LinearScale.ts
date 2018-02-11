/// <reference path="../base.ts" />

namespace android.test {
    'use strict'
    export class LinearScale extends Scale {
        protected _max: number;
        protected _min: number;
        protected niceMaxValue: number;
        
        get max(): number {
            return this._max;
        }
        get min(): number {
            return this._min;
        }
        constructor(id?: any) {
            super(id);
        }

        domain(domains:any[]){
            super.domain(domains);
            this._min = this.__domains[0];
            this._max = this.__domains[1];
            return this;
        }

        refresh(): IScale {
            if (this.order === Order.Asc) {
                this.__start = this.__ranges[0];
                this.__end = this.__ranges[1];
            } else if (this.order === Order.Desc) {
                this.__start = this.__ranges[1];
                this.__end = this.__ranges[0];
            } else {
                this.__start = this.__ranges[0];
                this.__end = this.__ranges[1];
            }
            this._min = this.__domains[0];
            this._max = this.__domains[1];
            return this;
        }
        range(ranges: any[]) {
            this.__ranges = ranges;
            return (this.refresh(), this);
        }

        getScaleValue(v: any) {
            let value;
            if (this._max == this._min) {
                value = (this.__end - this.__start) / 2 + this.__start;
            } else {
                value = (this.__end - this.__start) / (this._max - this._min) * (v - this._min) + this.__start;
            }
            return value;
        }
      

        public equal(value: Scale) {
            if(value != null){
                return value.id == this.id && value.max == this.max && value.min == this.min ;
            }
            return false;
        }            
    //    public clone():LinearScale{
    //        let scale =  new LinearScale(this.id);
    //        let domains:any[] =[];
    //         for(let i = 0; i < this.__domains.length; ++i){
    //             domains.push(this.__domains[i]);
    //         }
    //         // let ranges :any[] =[];
    //         // for(let i = 0; i < this.ranges.length; ++i){
    //         //     ranges.push(this.ranges[i]);
    //         // }
    //        scale.domain(domains);//.range(ranges).refresh();
    //        return scale;
    //    }
    }
}