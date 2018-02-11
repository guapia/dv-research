/// <reference path="../../base.ts" />
namespace android.test {
    'use strict';

    import View = android.view.View;
    import Canvas = android.graphics.Canvas;
    import ViewState = android.view.ViewState;
    import Rect = android.graphics.Rect;
    import Style = android.graphics.Style;
    import StrokeStyle = android.graphics.StrokeStyle;
    import Default = android.device.Default;
    import Point = android.graphics.Point;
    import Context = android.app.Context;
    import Util = android.graphics.Util;
    export class RadialBarShape extends PlotShape {
        protected _cx:number;
        protected _cy:number;
        public _innerRadius:number;
        public _radius:number;
        public _startAngle:number;
        public _sweep:number;
        constructor(c:Context,cx:number,cy:number,innerRadius:number,radius:number,startAngle:number,sweep:number,style?:Style,strokeStyle?:StrokeStyle){
            super(c);
            this.layoutInfo.reset(cx-radius,cy-radius,cx+radius,cy+radius,this.padding,0);
            this._oldLayoutInfo= this.layoutInfo.clone();
            this._cx = cx;
            this._cy = cy;
            this._innerRadius = innerRadius;
            this._radius = radius;
            this._startAngle = startAngle;
            this._sweep = sweep;
            this._style = style;
            if(style == null){
                this._style = Default.style;
            }
            this._strokeStyle =strokeStyle;
            if(strokeStyle == null){
                this._strokeStyle = Default.strokestyle;
            }
            if(this._sweep < 0){
                this._startAngle = this._startAngle + this._sweep;
                this._sweep = this._sweep *-1;
            }
        }
        getpts(size:number):{xs:number[],ys:number[]}{
            if(this._pts == null){
                this._pts = Util.createPtsFromRadialBar(this._startAngle,this._startAngle+this._sweep,this._radius,this._innerRadius,new Point(this._cx,this._cy),this.ptcount);
            }
            return this._pts;
        }
        onDrawShape(canvas: Canvas): void {
            canvas.drawDonut(this._cx,this._cy,this._radius,this._innerRadius,this._startAngle,this._sweep,this._style);
        }
    }
}
