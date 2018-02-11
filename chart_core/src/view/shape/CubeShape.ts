/// <reference path="../../base.ts" />
namespace android.test {
    'use strict';

    import View = android.view.View;
    import ViewState = android.view.ViewState;
    import Rect = android.graphics.Rect;
    import Canvas = android.graphics.Canvas;
    import Style = android.graphics.Style;
    import StrokeStyle = android.graphics.StrokeStyle;
    import Default = android.device.Default;
    import Animation = android.view.animation.Animation;
    import MotionEvent = android.view.event.MotionEvent;
    import Context = android.app.Context;
    import Debug = android.Debug;
    export class CubeShape extends PlotShape {
        static CubePrority: number = Shape.PRIORITY * 1;
        private __oldColor: any = null;
        public scaleCallBack: (rect: Rect) => void;
        public text: string;

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
            this.priority = ++CubeShape.CubePrority;
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
            this.background = null;
        }
        onDrawShape(canvas: Canvas): void {
            window['renderTimes']++;
            canvas.drawRect(this.layoutInfo.innerrect.startPoint, this.layoutInfo.innerrect.endPoint, true, this._style);
            if (this.animation == null || this.animation.isAniamtionEnd) {
                canvas.drawText(this.text, this.layoutInfo.innerrect.startPoint, Default.font);
            }
        }


        public invalidate(flg: boolean) {
            super.invalidate(flg);
            // console.log("cubeinvalidate  " +( window['cubeinvalidate'] ==null? window['cubeinvalidate']=0: window['cubeinvalidate']++));
            Debug.logstack("cubeinvalidate  " + (window['cubeinvalidate'] == null ? window['cubeinvalidate'] = 0 : window['cubeinvalidate']++));
        }


        onMouseEvent(event: MotionEvent): boolean {
            switch (event.action) {
                case MotionEvent.ACTION_MOUSE_ON:

                    if (typeof this.style.background == 'string') {
                        if (this.__oldColor == null) {
                            this.__oldColor = this.style.background;
                        }
                        let colors: any[] = ColorUtils.gradientColor(this.__oldColor, '#ffffff', 3);
                        this.style.background = colors[1];
                    }
                    console.log("mouse on ");
                    this.invalidate(true);
                    break;
                case MotionEvent.ACTION_MOUSE_OUT:
                    this.style.background = this.__oldColor;
                    this.invalidate(true);
                    console.log("mouse out ");
                    break;
                case MotionEvent.ACTION_MOUSE_MOVE:
                    break;
                case MotionEvent.ACTION_CLICK:
                    console.log("click ");
                    if (this.scaleCallBack != null) {
                        this.scaleCallBack(this.layoutInfo.innerrect);
                    }
                    break;
            }
            return true;
        }

        getComparedAnimation(fromview: ComparedView): Animation {
            let animation = new _Animation(fromview.layoutInfo.innerrect.clone(), this.layoutInfo.innerrect.clone());
            animation.duration = 500;
            animation.fillAfter = true;
            animation.from = 0;
            animation.to = 1;
            return animation;
        }

    }

    class _Animation extends Animation {
        private fromrect: Rect;
        private torect: Rect;
        constructor(fromrect: Rect, torect: Rect) {
            super();
            this.ease = new android.view.animation.AnimationEase();
            this.fromrect = fromrect;
            this.torect = torect;
        }

        applyTransformation(interpolatedTime: number, canvas: Canvas, view: View) {

            let scale: number = this.from + (this.to - this.from) * interpolatedTime;

            view.layoutInfo.innerrect.left = this.fromrect.left + (this.torect.left - this.fromrect.left) * scale;
            view.layoutInfo.innerrect.top = this.fromrect.top + (this.torect.top - this.fromrect.top) * scale;
            view.layoutInfo.innerrect.width = this.fromrect.width + (this.torect.width - this.fromrect.width) * scale;
            view.layoutInfo.innerrect.height = this.fromrect.height + (this.torect.height - this.fromrect.height) * scale;

        }
        onStartAniamtion(canvas: Canvas, view: View): void {
            super.onStartAniamtion(canvas, view);

        }
        onEndAnimation(canvas: Canvas, view: View): void {
            super.onEndAnimation(canvas, view);
            view.layoutInfo.innerrect = view._oldLayoutInfo.innerrect.clone();
        }
    }

    export class CubeAnimation extends Animation {
        private rect: Rect;

        constructor(rect: Rect) {
            super();
            this.ease = new android.view.animation.BounceAnimationEase();
        }

        applyTransformation(interpolatedTime: number, canvas: Canvas, view: View) {
            if (view instanceof CubeShape) {
                let scale: number = this.from + (this.to - this.from) * interpolatedTime;
                let rect: Rect = this.rect.clone();
                // scale = scale - 1;
                view.layoutInfo.innerrect.left = this.rect.left + (this.rect.width - this.rect.width * scale) / 2;
                view.layoutInfo.innerrect.width = this.rect.width * scale;
                view.layoutInfo.innerrect.top = this.rect.top + (this.rect.height - this.rect.height * scale) / 2;
                view.layoutInfo.innerrect.height = this.rect.height * scale;
                // console.log('bar height === ' + view.layoutInfo.innerrect.height +" scale " + scale +"  interpolatedTime "+interpolatedTime);
            }
        }
        onStartAniamtion(canvas: Canvas, view: View): void {
            // console.log("onStartAniamtion ");
            super.onStartAniamtion(canvas, view);
            this.rect = view.layoutInfo.innerrect.clone();
        }
        onEndAnimation(canvas: Canvas, view: View): void {
            super.onEndAnimation(canvas, view);
            // view.layoutInfo.innerrect = this.rect;
            // console.log("onAnimationEnd " + view.layoutInfo.innerrect.width + "  ");
        }

    }
}
