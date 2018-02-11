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
    export class FlightShape extends PlotShape {
        private __xs: number[];
        private __ys: number[];
        get xs(): number[] {
            return this.__xs;
        }
        get ys(): number[] {
            return this.__ys;
        }
        private __renderXs: number[];
        private __renderYs: number[];
        set renderXs(value: number[]) {
            this.__renderXs = value;
        }
        set renderYs(value: number[]) {
            this.__renderYs = value;
        }
        static LinesPrority: number = PlotShape.PRIORITY * 4;
        constructor(c:Context,xs: number[], ys: number[], style?: Style, strokeStyle?: StrokeStyle) {
            super(c);
            this.priority = ++LinesShape.LinesPrority;
            this.__xs = xs;
            this.__ys = ys;

            let l: number = Utility.min(xs);
            let t: number = Utility.min(ys);
            let r: number = Utility.max(xs);
            let b: number = Utility.max(ys);
            this.__renderXs = [];
            this.__renderYs = [];
            this.layoutInfo.reset(l, t, r, b, this.padding, 0);
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

        get strokeStyle(): StrokeStyle {
            return this._strokeStyle;
        }
        set strokeStyle(value: StrokeStyle) {
            this._strokeStyle = value;
        }

        onDrawShape(canvas: Canvas): void {
            // canvas.save();
            // canvas.clip(this.layoutInfo.innerrect);
            // canvas.drawLines(this.__xs,this.__ys,this._strokeStyle);
            // canvas.restore();
            
            canvas.drawLines(this.__renderXs, this.__renderYs, this._strokeStyle);
            
            // let context = canvas.canvas;
            // context.fillStyle = 'rgba(0,0,0,0.05)';
            // context.beginPath();
			// context.fillStyle = '#ac6318';
			// context.strokeStyle = '#ac6318';
			// context.lineWidth = 6;
			// context.moveTo(this.__renderXs[0], this.__renderYs[0]);
			// context.lineTo(this.__renderXs[1], this.__renderYs[1]);
			// context.stroke();
			// context.arc(this.__renderXs[0], this.__renderYs[0], 3, 0, Math.PI*2, true);
			// context.fill();
        }
    }
    export class FlightAnimationTo extends Animation {

        constructor() {
            super();
            this.ease = new android.view.animation.AnimationEase();
        }
        applyTransformation(interpolatedTime: number, canvas: Canvas, view: View) {
            if (view instanceof FlightShape) {
                let xs: number[] = view.xs;
                let ys: number[] = view.ys;
                let last: number = xs.length - 1;
                // console.log("interpolated Time  "+ interpolatedTime);

                let txs: number[] = [(xs[last] - xs[0]) * interpolatedTime + xs[0], (xs[last] - xs[0]) * (interpolatedTime + 0.1) + xs[0]]
                let tys: number[] = [(ys[last] - ys[0]) * interpolatedTime + ys[0], (ys[last] - ys[0]) * (interpolatedTime + 0.1) + ys[0]]
                view.renderXs = txs;
                view.renderYs = tys;
            }

        }
        onStartAniamtion(canvas: Canvas, view: View): void {
            super.onStartAniamtion(canvas, view);
        }
        onEndAnimation(canvas: Canvas, view: View): void {
            super.onEndAnimation(canvas, view);
            // console.log("onEndAnimation ");
        }

    }
    export class FlightAnimationBack extends Animation {

        constructor() {
            super();
            this.ease = new android.view.animation.AnimationEase();
        }
        applyTransformation(interpolatedTime: number, canvas: Canvas, view: View) {
            if (view instanceof FlightShape) {
                let xs: number[] = view.xs;
                let ys: number[] = view.ys;
                let last: number = xs.length - 1;
                // console.log("interpolated Time  "+ interpolatedTime);
                let txs: number[] = [xs[last] - (xs[last] - xs[0]) * (interpolatedTime), xs[last] - (xs[last] - xs[0]) * (interpolatedTime + 0.1)];
                let tys: number[] = [ys[last] - (ys[last] - ys[0]) * (interpolatedTime), ys[last] - (ys[last] - ys[0]) * (interpolatedTime + 0.1)];
                view.renderXs = txs;
                view.renderYs = tys;
            }

        }
        onStartAniamtion(canvas: Canvas, view: View): void {
            super.onStartAniamtion(canvas, view);
        }
        onEndAnimation(canvas: Canvas, view: View): void {
            super.onEndAnimation(canvas, view);
        }

    }
}
