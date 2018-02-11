namespace android.test.cartesian {
    'use strict';
    export class AggregateCache {
        private __domains: any;
        private __agg:Agg;

        constructor(agg:Agg){
            this.__agg = agg;
        }

        put(key: any, value: any): void {
            if (this.__domains[key] == null) {
                this.__domains[key] = [];
            }
            this.__domains[key].push(value);
        }
        get(key: any): any {
            let list: any[] = this.__domains[key];
            if (list != null) {
                let count: number = 0;
                let sum: number = 0;
                for (let item of list) {
                    if (typeof item == 'number') {
                        sum += item;
                        count++;
                    }
                }
                switch (this.__agg) {
                    case Agg.AVERAGE:
                        return sum/count;
                    case Agg.COUNT:
                        return count;
                    case Agg.SUM:
                        return sum;
                    case Agg.NONE:
                        return list[0];
                }
            }
            return 0;
        }

    }
}