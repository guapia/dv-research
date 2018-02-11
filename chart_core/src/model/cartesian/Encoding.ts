/// <reference path="./Field.ts" />

namespace android.test.cartesian {
    
    export class Encoding {
        public x: Field;
        public y: Field;
        public geoposition:Field;
        public color: Field;
        public size: Field;
        public shape: Field;
        public group: Field;
        public text:Field;
        public tooltip:Field;
        public values:Field[];
        public _stack:boolean = false;
        public _radial:boolean = false;
        constructor(encoding: any) {
            if (encoding.x) {
                this.x = new Field(encoding.x, 'x');
            }
            if(encoding.geoposition){
                this.geoposition = new Field(encoding.geoposition,'geoposition');
            }
            if (encoding.y) {
                this.y = new Field(encoding.y, 'y');
            }
            if (encoding.color) {
                this.color = new Field(encoding.color, 'color');
            }
            if (encoding.shape) {
                this.shape = new Field(encoding.shape, 'shape');
            }
            if (encoding.size) {
                this.size = new Field(encoding.size, 'size');
            }
            if(encoding.tooltip){
                this.tooltip = new Field(encoding.tooltip,'tooltip');
            }
            if(encoding.text){
                this.text = new Field(encoding.text,'text');
            }
            if (encoding.group) {
                this.group = new Field(encoding.group, 'group');
            }
            if (encoding.values && encoding.values instanceof Array){
                this.values =[];
                for(var i = 0; i <encoding.values.length; ++i){
                    var value = encoding.values[i];
                    this.values.push(new Field(value,value.name));
                }
            }
            if(encoding.stack != null){
                this._stack = encoding.stack ;
            }
            if(encoding.radial != null){
                this._radial = encoding.radial;
            }
        }
    }
}