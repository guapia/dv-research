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
    import Default = android.device.Default;
    export class RadialLineAxis extends BaseAxis {
        private __innerRadius: number = 0;
        private __startAngle: number = 0;
        private __sweep: number = 0;
        private __radius: number = 0;
        private __cx: number = 0;
        private __cy: number = 0;
        constructor(context: Context) {
            super(context);
            this.__innerRadius = 0;
            this._lineStyle = Default.strokestyle;
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

        get near(): boolean {
            return this._near;
        }

        get _cx(): number {
            return this.__cx;
        }
        get _cy(): number {
            return this.__cy;
        }
        set _cx(value: number) {
            this.__cx = value;
        }
        set _cy(value: number) {
            this.__cy = value;
        }


        get _radius(): number {
            return this.__radius;
        }

        set _radius(value: number) {
            this.__radius = value;
        }
        set _innerRadius(value: number) {
            this.__innerRadius = value;
        }
        get _innerRadius(): number {
            return this.__innerRadius;
        }

        set _startAngle(value: number) {
            this.__startAngle = value;
        }
        get _startAngle(): number {
            return this.__startAngle;
        }

        set _sweep(value: number) {
            this.__sweep = value;
        }
        get _sweep(): number {
            return this.__sweep;
        }



        protected _createTicks(): any[] {
            let ticks: number[] = [];
            if (this.scale instanceof LinearScale) {
                ticks = LinearTicks.create(this.scale).createTicks(10);
            } else if (this.scale instanceof LogScale) {
                ticks = LogTicks.create(this.scale).createTicks(10);
            } else if (this.scale instanceof OrdinalScale) {
                ticks = OrdinalTicks.create(this.scale).createTicks();
            }
            // else if(this.scale instanceof Timescale)

            return ticks;
        }
        _layoutXAxis(canvas: Canvas): void {
            let ticks = this._ticks;
            this._children = [];
            for (let i = 0; ticks && i < ticks.length; ++i) {
                let value: number = ticks[i];
                let nextValue: number = i >= ticks.length ? null : ticks[i + 1];
                let tickheight: number = Math.max(this._majorTickHeight, this._minorTickHeight);
                let label = this._format(value);
                let labelSize: Size = canvas.measureString(label, this.labelFont);
                let radius: number = this.scale.getScaleValue(value);
                let x: number = this._cx + Math.cos(this._startAngle) * radius;
                let y: number = this._cy + Math.sin(this._startAngle) * radius;
                let nx: number = NaN;
                let ny: number = NaN;
                if (nextValue != null) {
                    let nextRadius = this.scale.getScaleValue(nextValue);
                    nx = this._cx + Math.cos(this._startAngle) * nextRadius;
                    ny = this._cy + Math.sin(this._startAngle) * nextRadius;
                }

                let labelx = x + (Math.sin(this._startAngle) * (tickheight + LABEL_PADDING + labelSize.height / 2));
                let labely = y - (Math.cos(this._startAngle) * (tickheight + LABEL_PADDING + labelSize.height / 2));

                let labelX: number = x;
                let labelY: number = y + tickheight + LABEL_PADDING + labelSize.height / 2;
                let shape: AxisShape = new AxisShape(this.getContext());
                shape._lableRect = new RotateRect(labelX, labelY, labelSize.width, labelSize.height, 0);
                shape._majorTick = new RotateLine(x, y, this._majorTickHeight, 0, this._startAngle);
                shape._label = label;
                shape._lableFont = this._labelFont;
                shape._major = this.majorStyle;
                shape._minor = this.minorStyle;
                let minorx = NaN;
                let minory = NaN;

                let minorRadius: number = NaN;
                if (!isNaN(nx)) {

                    minorRadius = this.scale.getScaleValue((value + nextValue) / 2);
                    minorx = this._cx + Math.cos(this._startAngle) * minorRadius;
                    minory = this._cy + Math.sin(this._startAngle) * minorRadius;
                }
                shape._minorTick = new RotateLine(minorx, minory, this._minorTickHeight, 0, this._startAngle);
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
                let angle: number = this.scale.getScaleValue(value);

                let x: number = this._cx + Math.cos(angle) * this._radius;
                let y: number = this._cy + Math.sin(angle) * this._radius;

                let nx: number = NaN;
                let ny: number = NaN;
                if (nextValue != null) {
                    let nAngle = this.scale.getScaleValue(nextValue);
                    nx = this._cx + Math.cos(nAngle) * this._radius;
                    ny = this._cy + Math.sin(nAngle) * this._radius;
                }

                let lableX = this._cx + Math.cos(angle) * (this._radius + tickheight + LABEL_PADDING + labelSize.height / 2);
                let lableY = this._cy + Math.sin(angle) * (this._radius + tickheight + LABEL_PADDING + labelSize.height / 2);

                let shape: AxisShape = new AxisShape(this.getContext());
                shape._lableRect = new RotateRect(lableX, lableY, labelSize.width, labelSize.height, 0);
                shape._majorTick = new RotateLine(x, y, this._majorTickHeight, 0, angle - Math.PI / 2);
                shape._label = label;
                shape._lableFont = this.labelFont;
                shape._major = this.majorStyle;
                shape._minor = this.minorStyle;
                let minory: number = NaN;
                let minorx: number = NaN;
                let minorAngle: number = NaN;

                if (!isNaN(ny)) {
                    minorAngle = this.scale.getScaleValue((nextValue + value) / 2);
                    minorx = this._cx + Math.cos(minorAngle) * this._radius;
                    minory = this._cy + Math.sin(minorAngle) * this._radius;

                }
                shape._minorTick = new RotateLine(minorx, minory, this._minorTickHeight, 0, minorAngle - Math.PI / 2);
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
                let endx: number = this._cx + Math.cos(this.__startAngle) * this._radius;
                let endy: number = this._cy + Math.sin(this.__startAngle) * this._radius;
                let sx: number = this._cx + Math.cos(this.__startAngle) *
                    this.__innerRadius * this._radius;
                let sy: number = this._cy + Math.sin(this.__startAngle) * this._innerRadius * this._radius;
                canvas.drawLine(new Point(sx, sy), new Point(endx, endy), this.lineStyle);
            } else if (this._axisType == AxisType.Y) {
                let s = Default.style;
                s.strokeStyle =this.lineStyle;
                canvas.drawDonut(this._cx, this._cy, this._radius, this._radius - this.lineStyle.strokeWidth, this._startAngle / Math.PI * 180, this._sweep * 180 / Math.PI, s);
            }
        }

    }
}