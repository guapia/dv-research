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
    import MotionEvent = android.view.event.MotionEvent;
    import Context = android.app.Context;
    import Util = android.graphics.Util;

    export class LinesShape extends PlotShape {
        private __xs:number[];
        private __ys:number[];
        static LinesPrority:number = PlotShape.PRIORITY *4;
        constructor(context:Context,xs:number[],ys:number[],style?:Style,strokeStyle?:StrokeStyle){
            super(context);
            this.priority = ++LinesShape.LinesPrority;
            this.__xs = xs;
            this.__ys = ys;

            let l: number = Utility.min(xs);
            let t: number = Utility.min(ys);
            let r: number = Utility.max(xs);
            let b: number = Utility.max(ys);
            this.layoutInfo.reset(l, t,r, b, this.padding, 0);
            this._oldLayoutInfo = this.layoutInfo.clone();
            this._style = style;
            if(style == null){
                this._style = Default.style;
            }
            this._strokeStyle =strokeStyle;
            if(strokeStyle == null){
                this._strokeStyle = Default.strokestyle;
            }
        }
            
        get strokeStyle():StrokeStyle{
            return this._strokeStyle;
        }
        set strokeStyle(value:StrokeStyle){
            this._strokeStyle = value;
        }
    
        getpts(size:number):{xs:number[],ys:number[]}{
            if(this._pts == null){
                this._pts = {xs:this.__xs,ys:this.__ys};
            }
            return this._pts;
        }

        trace(x:number,y:number):boolean{
            if(this.layoutInfo.outterrect.contains(x,y)){
                for(let i = 0; i < Math.min(this.__xs.length,this.__ys.length); ++i){
                    if(Util.Point2Line(this.__xs[i],this.__ys[i],this.__xs[i+1],this.__ys[i+1],x,y)< 10){
                        return true;
                    }
                }
            }
            return  false;
        }

        onMouseEvent(event: MotionEvent): boolean{
            return super.onMouseEvent(event);
        }

        onDrawShape(canvas: Canvas): void {
            canvas.save();
            canvas.clip(this.layoutInfo.innerrect);
            canvas.drawLines(this.__xs,this.__ys,this._strokeStyle);
            canvas.restore();
        }

        protected _drawAnimation(canvas:Canvas):void{
            console.log('drawAnimation ')
            canvas.drawLines(this.animationXs,this.animationYs,this._strokeStyle);
        }
    }
}
