/// <reference path="../base.ts" />
namespace android.test {

    import Point = android.graphics.Point;
    export class OrdinalScale extends Scale {
        protected _domainCache: { [name: string]: number } = {};
        private _size: number = 0;
        constructor(id?: any) {
            super(id);
        }
        refresh(): IScale {

            if (this.order === Order.Asc) {
                this.__domains.sort(function (a: any, b: any) {
                    return a - b;
                });
            } else if (this.order === Order.Desc) {
                this.__domains.sort(function (a: any, b: any) {
                    return b - a;
                });
            }
            this._domainCache = {};
            // for(let i = 0; i < this.__domains.length; ++i){
            //     if(this._domainCache[this.__domains[i]] == null){
            //         this._domainCache[this.__domains[i]]=i;
            //     }
            // }
            let index: number = 0;
            for (let ds of this.__domains) {
                if (this._domainCache[ds] == null) {
                    this._domainCache[ds] = index;
                    index++;
                }
            }
            this._size = index;
            Debug.assert(this.__ranges != null, "");
            // Debug.assert(this.__ranges.length == 2);
            if (this.__ranges.length == 2) {
                this.__start = this.__ranges[0];
                this.__end = this.__ranges[1];
            }

            return this;
        }
        get max(): number {
            return this._size;
        }
        get min(): number {
            return 0;
        }

        get domains(): any[] {
            return this.__domains;
        }
        get ranges(): any[] {
            return this.__ranges;
        }

        range(ranges: any[]) {
            this.__ranges = ranges;
            this.__bound = false;
            return (this.refresh(), this);
        }
        rangeBounds(ranges: any[]) {
            this.__ranges = ranges;
            this.__bound = true;
            return (this.refresh(), this);
        }
        public domain(domains: any[]): IScale {
            this.__domains = domains;

            return this;
        }
        getScaleValue(v: any) {
            // var index = this.__domains.indexOf(v);
            // var index = _.indexOf(this.__domains,v);
            let index = this._domainCache[v];
            if (isNaN(index)) {
                index = 0;
            }
            var value = 0;
            let size = this._size;
            if (size < 2) {
                size = 2;
            }
            if (typeof (this.__end) == 'number' && typeof (this.__start) == 'number') {
                if (this.__bound) {
                    value = (index + 0.5) * (this.__end - this.__start) / size + this.__start;
                } else {
                    value = index * (this.__end - this.__start) / (size - 1) + this.__start;
                }
            }
            return value;
        }

        // public clone():OrdinalScale{
        //     let scale =  new OrdinalScale(this.id);
        //     let domains:any[] =[];
        //      for(let i = 0; i < this.__domains.length; ++i){
        //          domains.push(this.__domains[i]);
        //      }
        //     //  let ranges :any[] =[];
        //     //  for(let i = 0; i < this.ranges.length; ++i){
        //     //      ranges.push(this.ranges[i]);
        //     //  }
        //     scale.domain(domains);//.range(ranges).refresh();
        //     return scale;
        // }

    }

}