/// <reference path="../../../base.ts" />
namespace android.test {

    'use strict';

    import View = android.view.View;
    import Canvas = android.graphics.Canvas;
    import ViewState = android.view.ViewState;
    import StrokeStyle = android.graphics.StrokeStyle;
    import Font = android.graphics.Font;
    import Default = android.device.Default;
    import Rect = android.graphics.Rect;
    import Point = android.graphics.Point;
    import Context = android.app.Context;
    export class AxisShape extends Shape {

        public _label: string;
        public _major: StrokeStyle;
        public _minor: StrokeStyle;
        public _lableRect: RotateRect;
        public _lableFont: Font;
        public _majorTick: RotateLine;
        public _minorTick: RotateLine;
        public _showLabel: boolean;

        constructor(context: Context) {
            super(context);
            this._major = Default.strokestyle.clone();
            this._minor = Default.strokestyle.clone();
            this._lableFont = Default.font.clone();
            this._showLabel = true;

        }

        onDrawShape(canvas: Canvas): void {
            canvas.save();
            canvas.drawLine(this._majorTick.startPoint, this._majorTick.endPoint, this._major);
            if (this._showLabel) {
                canvas.drawText(this._label, this._lableRect.leftTop, this._lableFont, this._lableRect.leftTop, this._lableRect.angle * 180 / Math.PI);
            }
            canvas.drawLine(this._minorTick.startPoint, this._minorTick.endPoint, this._minor);
            canvas.restore();
        }

        protected _drawAnimation(canvas: Canvas): void {
            let offsetx = this.animationXs[0] - this._lableRect.points[0].x;
            let offsety = this.animationYs[0] - this._lableRect.points[0].y;
            let _majorTickStartpt: Point = this._majorTick.startPoint.clone();
            let _majorTickEndpt: Point = this._majorTick.endPoint.clone();
            _majorTickStartpt.offset(offsetx, offsety);
            _majorTickEndpt.offset(offsetx, offsety);
            let lt: Point = this._lableRect.leftTop.clone();
            lt.offset(offsetx, offsety);
            canvas.drawLine(_majorTickStartpt, _majorTickEndpt, this._major);
            if (this._showLabel) {
                canvas.drawText(this._label, lt, this._lableFont, lt, this._lableRect.angle * 180 / Math.PI);
            }
            let _minorTickStartpt: Point = this._minorTick.startPoint.clone();
            let _minorTickEndpt: Point = this._minorTick.endPoint.clone();
            _minorTickStartpt.offset(offsetx, offsety);
            _minorTickEndpt.offset(offsetx, offsety);
            canvas.drawLine(_minorTickStartpt, _minorTickEndpt, this._minor);
        }

        getpts(size: number): { xs: number[], ys: number[] } {
            if (this._pts == null) {
                this._pts = { xs: [], ys: [] };
                let pts: Point[] = this._lableRect.points;
                for (var j = 0; j < 4; ++j) {
                    this._pts.xs.push(pts[j].x);
                    this._pts.ys.push(pts[j].y);
                }
            }
            return this._pts;
        }

        refresh(): void {

        }

    }
}