/// <reference path="../base.ts" />

namespace android.test {


    export class LogScale extends Scale {

        protected _max: number;
        protected _min: number;
        protected _niceTick: number;
        protected _niceMaxValue: number;
        private _ticksize:number = 6;

        protected _logBase: number;

        constructor(logbase: number, id?: any) {
            super(id);
            this._logBase = logbase;
        }
        
        domain(domains:any[]){
            super.domain(domains);
            this._min = this.__domains[0];
            this._max = this.__domains[1];
            return this;
        }
        get logBase(){
            return this._logBase;
        }
        set tickSize(value:number){
            this._ticksize = value;
        }
        get max(): number {
            return this._max;
        }
        get min(): number {
            return this._min;
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
            if (this._logBase > 0) {
                var base = this._logBase;
                var k = Math.log(base);

                var imax = Math.ceil(Math.log(this._max) / k);
                this._max = Math.pow(base, imax);
                var imin = Math.floor(Math.log(this._min) / k);
                this._min = Math.pow(base, imin);

                if (this._min <= 0 || isNaN(this._min)) {
                    this._min = 1;
                }
                if (this._max < this._min) {
                    this._max = this._min + 1;
                }
            }
            return this;
        }

        range(ranges: any[]) {
            this.__ranges = ranges;
            return (this.refresh(), this);
        }

        get ticks(): any[] {
            var ticks: any[] = new Array(this._ticksize);
            for (var i = 0; i <= this._ticksize; ++i) {
                ticks[i] = i * this._niceTick;
            }
            return ticks;
        }

        getScaleValue(v: any) {
            if (v < this._min) {
                v = this._min;
            }
            var maxl = Math.log(this._max / this._min);
            var value = Math.log(v / this._min) / maxl * (this.__end - this.__start) + this.__start;
            return value;
        }
        // public clone():LogScale{
        //     Debug.assert(false,"LogScale clone has not been implemented  ");
        //     return null;
        // }
    }



}