/// <reference path="../../../base.ts" />
namespace android.test {
    'use strict';
    const e10: number = Math.sqrt(50);
    const e5: number = Math.sqrt(10);
    const e2: number = Math.sqrt(2);
    export abstract class Ticks {
        protected _scale: Scale;
        protected _ticks: any[];
        constructor(scale: Scale) {
            this._scale = scale;

            this._ticks = [];
        }

        static create(scale: Scale, start: number, end: number): Ticks {
            return null;
        }

        abstract createTicks(count?:number): void;

        protected _createTicks(start: number, stop: number, count: number) {

            var reverse = stop < start,
                i = -1,
                n,
                ticks,
                step;

            if (reverse) n = start, start = stop, stop = n;

            if ((step = this._tickIncrement(start, stop, count)) === 0 || !isFinite(step)) return [];

            if (step > 0) {
                start = Math.ceil(start / step);
                stop = Math.floor(stop / step);
                ticks = new Array(n = Math.ceil(stop - start + 1));
                while (++i < n) ticks[i] = (start + i) * step;
            } else {
                start = Math.floor(start * step);
                stop = Math.ceil(stop * step);
                ticks = new Array(n = Math.ceil(start - stop + 1));
                while (++i < n) ticks[i] = (start - i) / step;
            }

            if (reverse) ticks.reverse();

            return ticks;
        }

        protected _tickIncrement(start: number, stop: number, count: number) {
            let step: number = (stop - start) / Math.max(0, count),
                power: number = Math.floor(Math.log(step) / Math.LN10),
                error: number = step / Math.pow(10, power);
            return power >= 0
                ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power)
                : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
        }

        public  _tickStep(start: number, stop: number, count: number) {
            let step0: number = Math.abs(stop - start) / Math.max(0, count),
                step1: number = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
                error: number = step0 / step1;
            if (error >= e10) step1 *= 10;
            else if (error >= e5) step1 *= 5;
            else if (error >= e2) step1 *= 2;
            return stop < start ? -step1 : step1;
        }

    }
}
