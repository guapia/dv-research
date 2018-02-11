/// <reference path="../../../base.ts" />


namespace android.test.map.relation {
    'use strict';
    import Field = android.test.cartesian.Field;
    export class Encoding {
        public start: Field[] | Field;
        public end: Field[] | Field;
        public color: Field;
        public text: Field;
        public tooltip: Field;
        public values: Field[];


        constructor(encoding: any) {
            // if (encoding.start&& encoding.start.field != null) {
            //     if (encoding.start.field.includes(',')) {
            //         this.start = [];
            //         let start: any[] = encoding.start.split(',');
            //         for (let i = 0; i < start.length; ++i) {
            //             this.start.push(new Field(start[i], 'start', i));
            //         }
            //     } else {
            //         this.start = new Field(encoding.start, "start");
            //     }
            // }
            // if (encoding.end && encoding.end.field != null) {
            //     if (encoding.end.field.includes(',')) {
            //         this.end = [];
            //         let end: any[] = encoding.end.split(',');
            //         for (let i:number = 0; i < end.length; ++i) {
            //             this.end.push(new Field(end[i], 'start',i));
            //         }
            //     } else {
            //         this.end = new Field(encoding.shape, 'end');
            //     }
            // }
            if (encoding.color) {
                this.color = new Field(encoding.color, 'color');
            }
            if (encoding.tooltip) {
                this.tooltip = new Field(encoding.tooltip, 'tooltip');
            }
            if (encoding.text) {
                this.text = new Field(encoding.text, 'text');
            }
            if (encoding.values && encoding.values instanceof Array) {
                this.values = [];
                for (var i = 0; i < encoding.values.length; ++i) {
                    var value = encoding.values[i];
                    this.values.push(new Field(value, value.name));
                }
            }

        }
    }
}