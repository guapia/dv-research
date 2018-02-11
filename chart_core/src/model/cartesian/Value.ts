/// <reference path="../../base.ts" />

namespace android.test.cartesian {
    'use strict';

    export class Value {
        __preVal: any;
        __val: any;
        __dataType: DataType;
        __nextVal: any;
        __scaleType: ScaleType;
        __isMultiple: boolean;
        
        constructor(v: any, scaleType: ScaleType) {
            this.__val = v;
            if(v instanceof Array){
                this.__isMultiple= true;
            }else{
                this.__isMultiple = false;
            }
            this.__scaleType = scaleType;
            this.__dataType = Utility.getType(v);
        }



        get scaleType(): ScaleType {
            return this.__scaleType;
        }
        get dataType(): DataType {
            return this.__dataType;
        }
        /**
         * for what ?
         * array value for high low open close?
         */
        get isMultiple(): boolean {
            return this.__isMultiple;
        }
        get value(): any {
            return this.__val;
        }

    }
}