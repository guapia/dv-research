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
    import Context = android.app.Context;
    export class SunburstShape extends PlotShape {
        protected _cx:number;
        protected _cy:number;
        public _innerRadius:number;
        public _radius:number;
        public _startAngle:number;
        public _sweep:number;
        public text:string;

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
        onDrawShape(canvas: Canvas): void {
            canvas.drawDonut(this._cx,this._cy,this._radius,this._innerRadius,this._startAngle,this._sweep,this._style);

        }


    }

    
    export class RadiusAnimation extends Animation {
        private _radius:number;
        private _sweep:number;
        constructor() {
            super();
            this.ease = new android.view.animation.BounceAnimationEase();
        }

        applyTransformation(interpolatedTime: number, canvas: Canvas, view: View) {
            if (view instanceof SunburstShape || view instanceof RadialBarShape) {
                let scale: number = this.from + (this.to - this.from) * interpolatedTime;

                  view._radius = scale * this._radius;
                // console.log('bar height === ' + view.layoutInfo.innerrect.height +" scale " + scale +"  interpolatedTime "+interpolatedTime);
            }
        }
        onStartAniamtion(canvas: Canvas, view: View): void {
            // console.log("onStartAniamtion ");
            super.onStartAniamtion(canvas, view);
            if (view instanceof SunburstShape || view instanceof RadialBarShape) {
                this._radius = view._radius;
                this._sweep = view._sweep;
            }

        }
        onEndAnimation(canvas: Canvas, view: View): void {
            super.onEndAnimation(canvas, view);
            // view.layoutInfo.innerrect = this.rect;
            // console.log("onAnimationEnd " + view.layoutInfo.innerrect.width + "  ");
            if (view instanceof SunburstShape || view instanceof RadialBarShape) {
                view._radius = this._radius;
                view._sweep = this._sweep;
            }
        }

    }
    export class SweepAnimation extends Animation {
        private _radius:number;
        private _sweep:number;
        constructor() {
            super();
            this.ease = new android.view.animation.BounceAnimationEase();
        }

        applyTransformation(interpolatedTime: number, canvas: Canvas, view: View) {
            if (view instanceof SunburstShape || view instanceof RadialBarShape) {
                let scale: number = this.from + (this.to - this.from) * interpolatedTime;

                  view._sweep = scale * this._sweep;
                // console.log('bar height === ' + view.layoutInfo.innerrect.height +" scale " + scale +"  interpolatedTime "+interpolatedTime);
            }
        }
        onStartAniamtion(canvas: Canvas, view: View): void {
            // console.log("onStartAniamtion ");
            super.onStartAniamtion(canvas, view);
            if (view instanceof SunburstShape || view instanceof RadialBarShape) {
                this._radius = view._radius;
                this._sweep = view._sweep;
            }

        }
        onEndAnimation(canvas: Canvas, view: View): void {
            super.onEndAnimation(canvas, view);
            // view.layoutInfo.innerrect = this.rect;
            // console.log("onAnimationEnd " + view.layoutInfo.innerrect.width + "  ");
            if (view instanceof SunburstShape || view instanceof RadialBarShape) {
                view._radius = this._radius;
                view._sweep = this._sweep;
            }
        }

    }
}
