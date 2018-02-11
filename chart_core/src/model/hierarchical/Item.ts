namespace android.test.hierarchical{
    'use strict';
    import Util = android.graphics.Util;
    export class Item{
        public get id():string{
            // return Util.HashCode(this);
            return Util.HashCode(Util.HashCode(this.size)+Util.HashCode(this.color)+Util.HashCode(this.text)+Util.HashCode(this.depth)+Util.HashCode(this.count));
        }
        public children:Item[];
        public size:Value;
        public color:Value;
        public text:Value;

        public depth:Value;
        public count:Value;
        
        public _hidden:boolean=false;
    }
}