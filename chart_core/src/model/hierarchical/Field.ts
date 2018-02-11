/// <reference path="../../base.ts" />

namespace android.test.hierarchical {
    import Util = android.graphics.Util;
    'use strict';
    export class Field {
        public aggregate: Agg;
        public bind: string;
        public name:string;
        public range:any[];
        public band:boolean;
        public type:ScaleType;

        constructor(bind: any,name:string) {
            this.aggregate = Util.asEnum(bind.aggregate,Agg,true);
            if(this.aggregate == null){
                this.aggregate = Agg.NONE;
            }
            this.bind = bind.field;
            this.name = name;
            this.range = bind.range;
            this.band = bind.band;
            this.type = Util.asEnum(bind.type,ScaleType,true);
        }
        equals(field:Field):boolean{
            return _.isEqual(this,field);
        }
    }
}
