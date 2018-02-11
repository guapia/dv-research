/// <reference path="../../base.ts" />
/// <reference path="../enum/Agg.ts" />


namespace android.test.cartesian {
    import Util = android.graphics.Util;
    'use strict';
    export class Field {
        public aggregate: Agg;
        public bind: string|string[];
        public name: string;
        public type: ScaleType;
        public logBase: number;
        public range: any[];
        public band: boolean;
        public index: number = 0;
        get isMultiple(): boolean {
            return this.bind instanceof Array;
        }
        constructor(bind: any, name: string, index: number = 0) {
            this.aggregate = Util.asEnum(bind.aggregate, Agg, true);
            if (this.aggregate == null) {
                this.aggregate = Agg.NONE;
            }
            let binds:string[]=bind.field.split(',');
            if(binds != null && binds.length >1){
                this.bind = binds;              
            }else{
                this.bind = bind.field;
            }
            this.type = Util.asEnum(bind.type, ScaleType, true);
            if (this.type == null) {
                this.type = ScaleType.Ordinal;
            }
            this.logBase = bind.logBase;
            this.name = name;
            this.range = bind.range;

            this.band = bind.band;

            if (index != null && !isNaN(index)) {
                this.index = index;
            }
        }
        equals(field: Field): boolean {
            return _.isEqual(this, field);
        }
    }
}
