/// <reference path="../base.ts" />

namespace android.test {

    export abstract class Scale implements IScale {
        private __id: string;
        protected __start: any;
        protected __end: any;
        protected __bound: boolean = false;
        protected _order: Order;
        readonly max: number;
        readonly min: number;
        constructor(id?: string) {
            this.id = id;
            this._order = Order.None;
        }

        protected __domains: any[] = [];
        protected __ranges: any[] = [];

        set id(value: string) {
            this.__id = value;
        }
        get id(): string {
            return this.__id;
        }
        public domain(domains: any[]): IScale {
            this.__domains = domains;
            return this;
        }
        public range(ranges: any[]) {
            this.__ranges = ranges;
            return this.refresh();
        }
        rangeBounds(ranges: any[]): IScale {
            return this;
        }

        refresh(): IScale {
            return this;
        }

        getScaleValue(value: any): any {
            return 0;
        }

        get startPosition() {
            return this.__start;
        }
        get endPosition() {
            return this.__end;
        }
        get order(): Order {
            return this._order;
        }
        set order(value: Order) {
            this._order = value;
        }
        public equal(value: Scale) {
            if(value != null){
                return this.id == value.id;
            }
            return false;
        }
        public clone(): Scale{
            return _.cloneDeep(this);
        }
    }
}