
/// <reference path="../../../base.ts" />

namespace android.test.hierarchical{
    'use strict';

    import Rect = android.graphics.Rect;
    import Style = android.graphics.Style;
    import Default = android.device.Default;
    import StrokeStyle = android.graphics.StrokeStyle;
    import Canvas = android.graphics.Canvas;
    import Context = android.app.Context;
    export abstract class HierarchicalLayout extends BaseLayout{

        protected _rect: Rect = null;
        protected _encoding: Encoding;
        protected _depth:number=0;
        protected _offset:number=1;
        public style: Style = Default.style;
        public lineStyle: StrokeStyle = Default.strokestyle;
        
        public constructor(c:Context){
            super(c);
            this._depth = 0;
        }
        
        protected _calcDeep(roots:Item[]){
            this._depth =0;
            this._depth = this.__calcDeep(roots)+1;
        }

        private __calcDeep(items:Item[]):number{
            if(items != null && items.length >0){
                let deep=0;
                for(let item of items ){
                    var currdeep = this.__calcDeep(item.children);
                    item._hidden=false;
                    if(deep < currdeep){
                        deep = currdeep;
                    }
                }
                return ++deep;
            }
            return 0;
        }

        abstract convert(roots:Item[],encoding:Encoding,rect:Rect,canvas:Canvas):PlotShape[];

    }
}