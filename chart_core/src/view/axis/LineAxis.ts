/// <reference path="../../base.ts" />

namespace android.test.cartesian {
    'use strict';
    import View = android.view.View;
    import MeasureSpec = android.view.MeasureSpec;
    import Canvas = android.graphics.Canvas;
    import Size = android.graphics.Size;
    import Context = android.app.Context;
    import Rect = android.graphics.Rect;
    import Gravity = android.graphics.Gravity;
    import Font = android.graphics.Font;
    import LayoutParams = android.view.LayoutParams;
    import Point = android.graphics.Point;
    import Util = android.graphics.Util;
    import LayoutInfo = android.view.LayoutInfo;

    export class LineAxis extends BaseAxis {
        private _maxLabelSize: Size;
        constructor(context: Context) {
            super(context);
            this._maxLabelSize = new Size(0, 0);
        }

        set near(value: boolean) {
            this._near = value;
            if (value) {
                if (this.type == AxisType.X) {
                    this.gravity = Gravity.Bottom;
                } else if (this.type == AxisType.Y) {
                    this.gravity = Gravity.Left;
                }
            } else {
                if (this.type == AxisType.X) {
                    this.gravity = Gravity.Top;
                } else if (this.type == AxisType.Y) {
                    this.gravity = Gravity.Right;
                }
            }
        }
        get id():string{
            return Util.HashCode(Util.HashCode(this._axisType)+ Util.HashCode(this.near) + Util.HashCode(this.title));
        }

        get near(): boolean {
            return this._near;
        }

        protected _createTicks(): any[] {
            let ticks: number[] = [];
            if (this.scale instanceof LinearScale) {
                ticks = LinearTicks.create(this.scale).createTicks(10);
            } else if (this.scale instanceof LogScale) {
                ticks = LogTicks.create(this.scale).createTicks(10);
            } else if (this.scale instanceof OrdinalScale) {
                ticks = OrdinalTicks.create(this.scale).createTicks();
                if (ticks.length > 30) {
                    ticks = OrdinalTicks.create(this.scale).createTicks(30);
                }
            }
            // else if(this.scale instanceof Timescale)

            return ticks;
        }
        _layoutXAxis(canvas: Canvas): void {
            let ticks = this._ticks;
            this._children = [];
            let lastShape: AxisShape;
            for (let i = 0; ticks && i < ticks.length; ++i) {
                let value: number = ticks[i];
                let nextValue: number = i >= ticks.length ? null : ticks[i + 1];
                let tickheight: number = Math.max(this._majorTickHeight, this._minorTickHeight);
                let label = this._format(value);
                let labelSize: Size = canvas.measureString(label, this.labelFont);
                let x: number = this.scale.getScaleValue(value);
                let y: number = this.layoutInfo.innerrect.top;
                let nx: number = NaN;
                let ny: number = NaN;
                if (nextValue != null) {
                    nx = this.scale.getScaleValue(nextValue);
                    ny = y;
                }
                let labelX: number = x;
                let labelY: number = y + tickheight + LABEL_PADDING + labelSize.height / 2;
                let shape: AxisShape = new AxisShape(this.getContext());
                shape._lableRect = new RotateRect(labelX, labelY, labelSize.width, labelSize.height, 0);
                shape._majorTick = new RotateLine(x, y, this._majorTickHeight, 0, 0);
                shape._label = label;
                shape._lableFont = this._labelFont;
                shape._major = this.majorStyle;
                shape._minor = this.minorStyle;
                let minorx = NaN;
                if (!isNaN(nx)) {
                    minorx = (x + nx) / 2;
                }
                shape._minorTick = new RotateLine(minorx, y, this._minorTickHeight, 0, 0);


                if (lastShape != null && Utility.isMixedRotatedRect(shape._lableRect, lastShape._lableRect)) {
                    shape._showLabel = false;
                } else {
                    shape._showLabel = true;
                    lastShape = shape;
                }
                this._children.push(shape);
            }
        }

        _layoutYAxis(canvas: Canvas): void {
            let ticks = this._ticks;
            this._children = [];
            for (let i = 0; ticks && i < ticks.length; ++i) {
                let value: number = ticks[i];

                let nextValue: number = i >= ticks.length ? null : ticks[i + 1];
                let tickheight: number = Math.max(this._majorTickHeight, this._minorTickHeight);
                let label = this._format(value);
                let labelSize: Size = canvas.measureString(label, this.labelFont);
                let y: number = this.scale.getScaleValue(value);
                let x: number = this.layoutInfo.innerrect.right;
                if (!this.near) {
                    x = this.layoutInfo.innerrect.left;
                }
                let nx: number = NaN;
                let ny: number = NaN;
                if (nextValue != null) {
                    ny = this.scale.getScaleValue(nextValue);
                    nx = x;
                }
                let labelX: number = x - labelSize.width / 2 - LABEL_PADDING - tickheight;
                let labelY: number = y;
                if (!this.near) {
                    labelX = x + labelSize.width / 2 + LABEL_PADDING + tickheight;
                }
                let shape: AxisShape = new AxisShape(this.getContext());
                shape._lableRect = new RotateRect(labelX, labelY, labelSize.width, labelSize.height, 0);
                shape._majorTick = new RotateLine(x, y, this._majorTickHeight, 0, this.near ? Math.PI / 2 : -Math.PI / 2);
                shape._label = label;
                shape._lableFont = this.labelFont;
                shape._major = this.majorStyle;
                shape._minor = this.minorStyle;
                let minory = NaN;
                if (!isNaN(ny)) {
                    minory = (y + ny) / 2;

                }
                shape._minorTick = new RotateLine(x, minory, this._minorTickHeight, 0, this.near ? Math.PI / 2 : -Math.PI / 2);
                this._children.push(shape);
            }
        }

        onMeasure(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size {
            let size: Size = null;
            if (this._axisType == AxisType.X) {
                size = new Size(width.value, this._measureX(canvas));
                this.setMeasuredDimension(new MeasureSpec(size.width, LayoutParams.EXACTLY), new MeasureSpec(size.height, LayoutParams.EXACTLY));
                return size;
            } else if (this._axisType == AxisType.Y) {
                size = new Size(this._measureY(canvas), height.value);
                this.setMeasuredDimension(new MeasureSpec(size.width, LayoutParams.EXACTLY), new MeasureSpec(size.height, LayoutParams.EXACTLY));
                return size;
            } else {
                return super.onMeasure(width, height, canvas);
            }
        }
        protected _measureX(canvas: Canvas): number {
            let titleSize: Size = canvas.measureString(this.title, this.titleFont);
            let tickHeght: number = Math.max(this._majorTickHeight, this._minorTickHeight);
            let labelSize: Size = new Size(0, 0);
            let ticks: any[] = this._ticks;
            for (let t of ticks) {
                let sz: Size = canvas.measureString(this._format(t), this.labelFont);
                labelSize.width = Math.max(sz.width, labelSize.width);
                labelSize.height = Math.max(sz.height, labelSize.height);
            }
            this._maxLabelSize = labelSize.clone();
            return labelSize.height + titleSize.height + tickHeght;
        }

        protected _measureY(canvas: Canvas): number {

            let titleSize: Size = canvas.measureString(this.title, this.titleFont);
            let tickHeght: number = Math.max(this._majorTickHeight, this._minorTickHeight);
            let labelSize: Size = new Size(0, 0);
            let ticks: any[] = this._ticks;
            for (let t of ticks) {
                let sz: Size = canvas.measureString(this._format(t), this.labelFont);
                labelSize.width = Math.max(sz.width, labelSize.width);
                labelSize.height = Math.max(sz.height, labelSize.height);
            }
            this._maxLabelSize = labelSize.clone();

            return labelSize.width + titleSize.height + tickHeght;
        }

        onLayout(l: number, t: number, r: number, b: number, canvas: Canvas): void {
            super.onLayout(l, t, r, b, canvas);
            if (this.scale != null) {
                if (this._axisType === AxisType.X) {
                    this._layoutXAxis(canvas);
                } else if (this._axisType == AxisType.Y) {
                    this._layoutYAxis(canvas);
                }
            }
            if(this._children !=null){
                for(let child of this._children){
                    if(child instanceof AxisShape){
                        child.onLayout(child._lableRect.leftTop.x,child._lableRect.leftTop.y,child._lableRect.width,child._lableRect.height,canvas);
                        child.id = Util.HashCode(Util.HashCode(child._label) + Util.HashCode(this.id));
                    }
                }
            }
        }

        onDraw(canvas: Canvas): void {
            super.onDraw(canvas);
            this._drawLine(canvas);
            if (this._children != null) {
                for (let shape of this._children) {
                    shape.onDraw(canvas);
                }
            }
        }
        private _drawLine(canvas: Canvas): void {
            let rect: Rect = this.layoutInfo.innerrect;
            if (this._axisType == AxisType.X) {
                if (this._near) {
                    canvas.drawLine(new Point(rect.left, rect.top), new Point(rect.right, rect.top), this.lineStyle);
                } else {
                    canvas.drawLine(new Point(rect.left, rect.bottom), new Point(rect.right, rect.bottom), this.lineStyle);
                }
            } else if (this._axisType == AxisType.Y) {
                if (this._near) {
                    canvas.drawLine(new Point(rect.right, rect.top), new Point(rect.right, rect.bottom), this.lineStyle);
                } else {
                    canvas.drawLine(new Point(rect.left, rect.top), new Point(rect.left, rect.bottom), this.lineStyle);
                }
            }
        }

    }
}