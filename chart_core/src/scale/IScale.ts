/// <reference path="../base.ts" />

namespace android.test {
    export interface IScale {
        domain(domains: any[]): IScale;
        refresh(): IScale;
        range(ranges: any[]): IScale;
        rangeBounds(ranges: any[]): IScale;
        getScaleValue(value: any);
        order: Order;
        max: number;
        min: number;
        clone():IScale;
         equal(value:IScale);
            
    }
}