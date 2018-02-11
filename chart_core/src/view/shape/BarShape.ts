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
    import Context = android.app.Context;
    export class BarShape extends PlotShape {
        static BarPrority:number =Shape.PRIORITY*2;
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
            this.priority = ++BarShape.BarPrority;
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
        }
        onDrawShape(canvas: Canvas): void {
            window['renderTimes']++;
            canvas.drawRect(this.layoutInfo.innerrect.startPoint, this.layoutInfo.innerrect.endPoint, true, this._style);
        }

        onMouseEvent(event: MotionEvent): boolean {
            switch (event.action) {
                case MotionEvent.ACTION_MOUSE_ON:
                    let animation_on: BarWidthAnimation = new BarWidthAnimation(this.layoutInfo.innerrect);
                    animation_on.duration = 400;
                    animation_on.from = 1;
                    animation_on.to = 1.3;
                    animation_on.fillAfter = true;
                    animation_on.id="mouseOn Animation ";

                    this.startAnimation(animation_on);
                    
                    break;
                case MotionEvent.ACTION_MOUSE_OUT:
                    let animation_out: BarWidthAnimation = new BarWidthAnimation(this.layoutInfo.innerrect);
                    animation_out.duration = 200;
                    animation_out.from = 1.3;
                    animation_out.to = 1;
                    animation_out.id="mouseOut Animation ";
                    
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

    export class BarAnimation extends Animation {
        private rect: Rect;
        constructor(rect: Rect) {
            super();
            this.ease = new android.view.animation.BounceAnimationEase();
        }


        applyTransformation(interpolatedTime: number, canvas: Canvas, view: View) {
            if (view instanceof BarShape) {
                let scale: number = this.from + (this.to - this.from) * interpolatedTime;
                let rect: Rect = this.rect.clone();
                view.layoutInfo.innerrect.top = this.rect.top +this.rect.height-this.rect.height *scale;
                view.layoutInfo.innerrect.height = this.rect.height *scale;
            }
        }
        onStartAniamtion(canvas: Canvas, view: View): void {
            this.rect = view.layoutInfo.innerrect.clone();
        }
        onEndAnimation(canvas: Canvas, view: View): void {
        }


    }
    export class BarWidthAnimation extends Animation {
        id:string="";
        private rect: Rect;
        constructor(rect: Rect) {
            super();
            this.ease = new android.view.animation.BounceAnimationEase();
        }


        applyTransformation(interpolatedTime: number, canvas: Canvas, view: View) {
            if (view instanceof BarShape) {
                let scale: number = this.from + (this.to - this.from) * interpolatedTime;
                let rect: Rect = this.rect.clone();
                // scale = scale - 1;
                view.layoutInfo.innerrect.left = this.rect.left +(this.rect.width-this.rect.width *scale)/2;
                view.layoutInfo.innerrect.width = this.rect.width *scale;
            }
        }
        onStartAniamtion(canvas: Canvas, view: View): void {
            // console.log("onStartAniamtion ");
            super.onStartAniamtion(canvas,view);
            
            this.rect = view.layoutInfo.innerrect.clone();
        }
        onEndAnimation(canvas: Canvas, view: View): void {
            super.onEndAnimation(canvas,view);
            // view.layoutInfo.innerrect = this.rect;
            // console.log("onAnimationEnd " + view.layoutInfo.innerrect.width + "  ");

        }


    }
}
