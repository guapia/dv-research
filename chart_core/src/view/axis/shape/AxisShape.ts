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
        public _showLabel:boolean;

        constructor(context:Context) {
            super(context);
            this._major = Default.strokestyle.clone();
            this._minor = Default.strokestyle.clone();
            this._lableFont = Default.font.clone();
            this._showLabel = true;

        }

        onDrawShape(canvas: Canvas): void {
            canvas.save();
            // canvas.clip(rect);
            let xs:number[]=[];
            let ys:number[]=[];
            let pts:Point[] = this._lableRect.points;
            for (var j = 0; j < 4; ++j) {
                xs.push(pts[j].x);
                ys.push(pts[j].y);
            }
            // canvas.drawPolygon(xs,ys,"blue");
            // this._lableFont.fontColor ='red';
            canvas.drawLine(this._majorTick.startPoint, this._majorTick.endPoint, this._major);
            if(this._showLabel){
                canvas.drawText(this._label, this._lableRect.leftTop,this._lableFont,this._lableRect.leftTop,this._lableRect.angle * 180 /Math.PI);
            }
            canvas.drawLine(this._minorTick.startPoint, this._minorTick.endPoint, this._minor);

            canvas.restore();
        }

        refresh(): void {

        }

    }
}