/// <reference path="../../base.ts" />

namespace android.test.cartesian {
    'use strict';
    import Util = android.graphics.Util;
    export class Item {
        public geoposition:Value;
        public x: Value;
        public y: Value;
        public shape: Value;
        public color: Value;
        public size: Value;
        public text: Value;
        public tooltip: Value;
        public group:Value;
        public get id():string{
            // return Utility.HashCode(this);
            return Util.HashCode(Util.HashCode(this.x)+Util.HashCode(this.group));
            // return this.x.value +" " + this.group.value;
        }
    }
}