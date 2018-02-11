/// <reference path="../../base.ts" />

namespace android.test.hierarchical{
    'use strict';
    export class Encoding{
        public color:Field;
        public size:Field;
        public tooltip:Field;
        public text:Field;
        public children:Field;
        constructor(encoding:any){
            if(encoding.color != null){
                this.color = new Field(encoding.color,'color');
            }
            if(encoding.size != null){
                this.size = new Field(encoding.size,'size');
            }
            if(encoding.tooltip != null){
                this.tooltip = new Field(encoding.tooltip,'tooltip');
            }
            if(encoding.text != null){
                this.text = new Field(encoding.text,'text');
            }
            if(encoding.children != null){
                this.children = new Field(encoding.children,'children');
            }
        }

    }
}