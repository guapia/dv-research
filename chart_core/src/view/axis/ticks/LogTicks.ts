/// <reference path="../../../base.ts" />
namespace android.test {
    'use strict';
    export class LogTicks extends Ticks {
        static create(scale: Scale) {
            Debug.assert(scale instanceof LogScale, " scale must be LinearScale");
            return new LogTicks(scale);
        }
        createTicks(count?: number) {

            if(count == null || isNaN(count)){
                count = 10;
            }
            this._ticks = this._createTicks(this._scale.max,this._scale.min,count);
            return this._ticks;
        }
    }
}
