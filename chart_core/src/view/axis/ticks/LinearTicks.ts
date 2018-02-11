/// <reference path="../../../base.ts" />
namespace android.test {
    'use strict';
    export class LinearTicks extends Ticks {
        static create(scale: Scale) {
            Debug.assert(scale instanceof LinearScale, " scale must be LinearScale");
            return new LinearTicks(scale);
        }
        createTicks(count?: number) {
            // let step:number, start:number,stop:number;
            // step = this._tickIncrement(this._start, this._end, count);
            // if (step > 0) {
            //     start = Math.floor(this._start/step) * step;
            //     stop = Math.floor(this._end/step) * step;
            //     step = this._tickIncrement(start,stop,count);
            // }else if(step < 0){
            //     start = Math.ceil(start * step) / step;
            //     stop = Math.floor(stop * step) / step;
            //     step = this._tickIncrement(start, stop, count);
            // }
            if (count == null || isNaN(count)) {
                count = 10;
            }
            this._ticks = this._createTicks(this._scale.max, this._scale.min, count);
            return this._ticks;
        }
        niceScale(): LinearScale {
            let scale = <LinearScale>this._scale;
            let step: number = this._tickStep(scale.min, scale.max, 10);
            if (step == 0) {
                step = 1;
            }
            let niceMin: number = scale.min === 0 ? 0 : (Math.floor(scale.min / step)) * step;
            let niceMax: number = (Math.floor(scale.max / step) + 1) * step;
            scale.domain([niceMin, niceMax]).refresh();
            return scale;
        }
    }
}
