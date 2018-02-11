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
    import Animation = android.view.animation.Animation;
    import MotionEvent = android.view.event.MotionEvent;
    import Point = android.graphics.Point;
    import Context = android.app.Context;
    import Util = android.graphics.Util;
    export class MapItemShape extends PlotShape {
        private __xs: number[];
        private __ys: number[];
        private __center:Point;
        private __area :number;
        get center():Point{
            return this.__center;
        }
        set center(value:Point){
            this.__center = value;
        }
        get area():number{
            return this.__area;
        }
        constructor(c:Context,xs: number[], ys: number[], style?: Style, strokeStyle?: StrokeStyle) {
            super(c);
            this.priority = Shape.PRIORITY + 1;
            this.__xs = xs;
            this.__ys = ys;
            this._style = style;
            let l: number = Math.min(...xs);
            let t: number = Math.min(...ys);
            let r: number = Math.max(...xs);
            let b: number = Math.max(...ys);
            this.layoutInfo.reset(l, t, r, b, this.padding, 0);
            this._oldLayoutInfo = this.layoutInfo.clone();
            this.__center = Util.CenterOfPolygon(this.__xs,this.__ys);
            this.__area = Util.Area(this.__xs,this.__ys);
            if (style == null) {
                this._style = Default.style;
            }
            this._strokeStyle = strokeStyle;
            if (strokeStyle == null) {
                this._strokeStyle = Default.strokestyle;
            }
        }

        get strokeStyle(): StrokeStyle {
            return this._strokeStyle;
        }
        set strokeStyle(value: StrokeStyle) {
            this._strokeStyle = value;
        }



        onDrawShape(canvas: Canvas): void {
            canvas.save();

            canvas.clip(this.layoutInfo.innerrect);
            canvas.drawPolygon(this.__xs,this.__ys,this.style);
            canvas.restore();
        }


        onMouseEvent(event: MotionEvent): boolean {
            switch (event.action) {
                case MotionEvent.ACTION_MOUSE_ON:
                    console.log("mouse on ");
                    break;
                case MotionEvent.ACTION_MOUSE_OUT:

                    console.log("mouse out ");
                    break;
                case MotionEvent.ACTION_MOUSE_MOVE:
                    break;
                case MotionEvent.ACTION_MOUSE_OUT:
                    break;
            }
            return true;
        }
    }

    // export class MapItemShapeAnimation extends Animation {
    //     private rect: Rect;
    //     constructor(rect: Rect) {
    //         super();
    //         this.ease = new android.view.animation.AnimationEase();
    //     }


    //     applyTransformation(interpolatedTime: number, canvas: Canvas, view: View) {

    //         let scale: number = this.from + (this.to - this.from) * interpolatedTime;
    //         let rect: Rect = this.rect.clone();
    //         view.layoutInfo.innerrect.width = this.rect.width * scale;

    //     }
    //     onStartAniamtion(canvas: Canvas, view: View): void {
    //         this.rect = view.layoutInfo.innerrect.clone();
    //     }
    //     onEndAnimation(canvas: Canvas, view: View): void {
    //     }


    // }
}
