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
    import Animation = android.view.animation.Animation;
    import ScaleAnimation = android.view.animation.ScaleAnimation;
    import Context = android.app.Context;
    import Point = android.graphics.Point;
    import Util = android.graphics.Util;
    export class ScatterShape extends PlotShape {
        static ScatterPrority:number =Shape.PRIORITY*3;
        
        constructor(c:Context,x: number, y: number, w: number, h: number, style?: Style, strokeStyle?: StrokeStyle) {
            super(c);

            let top: number = y;
            let left: number = x;
            let height: number = h;
            let width: number = w;
            if (height < 0) {
                top = top + height;
                height = Math.abs(height);
            }
            this.layoutInfo.reset(left, top, left + width, top + height, this.padding, 0);
            this._oldLayoutInfo = this.layoutInfo.clone();
            this._style = style;
            if (style == null) {
                this._style = Default.style;
            }
            this._strokeStyle = strokeStyle;
            if (strokeStyle == null) {
                this._strokeStyle = Default.strokestyle;
            }
            this.priority = ++ScatterShape.ScatterPrority;

        }
        onDrawShape(canvas: Canvas): void {
            canvas.drawArc(this.layoutInfo.innerrect, 0, 2 * 180, this.style);
        }

        getpts(size:number):{xs:number[],ys:number[]}{
            if(this._pts == null){
                let radius:number = (this.layoutInfo.innerrect.width<this.layoutInfo.innerrect.height?this.layoutInfo.innerrect.width:this.layoutInfo.innerrect.height)/2;
                let center :Point = this.layoutInfo.innerrect.center;
                this._pts = Util.createPtsFromCircle(this.layoutInfo.innerrect.width/2,center,this.ptcount);
            }
            return this._pts;

        }


        onMouseEvent(event: MotionEvent): boolean {
            console.log("shape ==== " + event.toString());
            switch (event.action) {
                case MotionEvent.ACTION_MOUSE_ON:
                    let animation: ScatterAnimation = new ScatterAnimation(this.layoutInfo.innerrect);
                    animation.duration = 400;
                    animation.from = 1;
                    animation.to = 1.2;
                    animation.fillAfter = true;
                    this.startAnimation(animation);
                    break;
                case MotionEvent.ACTION_MOUSE_OUT:
                    let animation_out: ScatterAnimation = new ScatterAnimation(this.layoutInfo.innerrect);
                    animation_out.duration = 200;
                    animation_out.from = 1.2;
                    animation_out.to = 1;
                    animation_out.fillAfter = false;
                    this.startAnimation(animation_out);
                    break;
                case MotionEvent.ACTION_MOUSE_MOVE:
                    break;
                case MotionEvent.ACTION_MOUSE_OUT:
                    break;
            }
            return true;
        }

    }
    export class ScatterAnimation extends Animation {
        private rect: Rect;
        constructor(rect: Rect) {
            super();
            this.ease = new android.view.animation.BounceAnimationEase();
        }


        applyTransformation(interpolatedTime: number, canvas: Canvas, view: View) {
            // if (view instanceof ScatterShape) {

                let scale: number = this.from + (this.to - this.from) * interpolatedTime;
                // let dx :number=-view.layoutInfo.innerrect.left;
                // let dy :number=-view.layoutInfo.innerrect.top;
                // canvas.translate(dx,dy);
                // canvas.scale(scale,scale);
                // canvas.translate(view.layoutInfo.innerrect.width,view.layoutInfo.innerrect.height);
                let rect: Rect = this.rect.clone();
                scale = scale - 1;
                view.layoutInfo.innerrect.left = this.rect.left - (scale * view.layoutInfo.innerrect.width / 2);
                view.layoutInfo.innerrect.top = this.rect.top - (scale * view.layoutInfo.innerrect.height / 2);
                view.layoutInfo.innerrect.width = this.rect.width + (scale * view.layoutInfo.innerrect.width);
                view.layoutInfo.innerrect.height = this.rect.height + (scale * view.layoutInfo.innerrect.height);
                // console.log("scatter width  " + view.layoutInfo.innerrect.width + " rect.width " + rect.width + " scale " + scale);
            // }
        }
        onStartAniamtion(canvas: Canvas, view: View): void {
            // console.log("onStartAniamtion ");
            this.rect = view.layoutInfo.innerrect.clone();
        }
        onEndAnimation(canvas: Canvas, view: View): void {
            // view.layoutInfo.innerrect = this.rect;
            // console.log("onAnimationEnd " + view.layoutInfo.innerrect.width + "  ");

        }


    }
}
