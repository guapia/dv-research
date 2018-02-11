/// <reference path="../../base.ts" />

namespace android.test.hierarchical {
    'use strict';

    export class Value {
        __val: any;
        __dataType: DataType;
        __scaleType: ScaleType;
        constructor(v: any, scaleType: ScaleType) {
            this.__val = v;
            this.__scaleType = scaleType;
            this.__dataType = Utility.getType(v);
            if(this.__scaleType == null){
                switch(this.__dataType){
                    case DataType.Number:
                    case DataType.Date:
                    this.__scaleType = ScaleType.Linear;
                    break;
                    case DataType.String:
                    case DataType.Boolean:
                    default:
                    this.__scaleType = ScaleType.Ordinal;
                    break;
                    
                }
            }
        }
        get scaleType(): ScaleType {
            return this.__scaleType;
        }
        get dataType(): DataType {
            return this.__dataType;
        }

        get value(): any {
            return this.__val;
        }

    }
}