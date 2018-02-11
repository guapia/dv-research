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
    export class AxisLineShape extends Shape {
        private startPoint: Point;
        private endPoint: Point;
        constructor(c:Context,x: number, y: number, ex: number, ey: number, strokeStyle?: StrokeStyle) {
            super(c);
            this.startPoint = new Point(x, y);
            this.endPoint = new Point(ex, ey);
            this._strokeStyle = strokeStyle;
            if (strokeStyle == null) {
                this._strokeStyle = Default.strokestyle;
            }

        }
        onDrawShape(canvas: Canvas): void {
            canvas.drawLine(this.startPoint, this.endPoint,
                this._strokeStyle);
        }
        public refresh() { }
    }
}
