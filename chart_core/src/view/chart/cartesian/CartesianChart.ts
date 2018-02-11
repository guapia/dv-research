/// <reference path="../../../base.ts" />

namespace android.test.cartesian {
    'use strict';
    import ViewGroup = android.view.ViewGroup;
    import MeasureSpec = android.view.MeasureSpec;
    import Canvas = android.graphics.Canvas;
    import Size = android.graphics.Size;
    import Context = android.app.Context;
    import LayoutParams = android.view.LayoutParams;
    import FrameLayout = android.widget.FrameLayout;
    import Gravity = android.graphics.Gravity;
    import StrokeStyle = android.graphics.StrokeStyle;
    export const StartAngle:number = Math.PI;
    export class CartesianChart extends FrameLayout {

        private _dataModel: DataModel;
        private _chartType: ChartType;
        private _option: any;
        private _axisList: BaseAxis[];
        private _plot: BasePlot;

        constructor(context: Context, option?: any, chartType?: ChartType) {
            super(context);
            this._option = option;
            this._chartType = chartType;
            this._axisList = [];
        }
        set option(value: any) {
            this._option = value;
        }
        get option(): any {
            return this._option;
        }
        set chartType(value: ChartType) {
            if (value != null && value != this._chartType) {
                this._chartType = value;
            }
        }
        get chartType(): ChartType {
            return this._chartType;
        }

        set datamodel(value: DataModel) {
            this._dataModel = value;
            if(this._dataModel.encoding._radial){
                this._loadRadialView();
            }else{
                this._loadView();
            }
        }
        get datamodel(): DataModel {
            return this._dataModel;
        }
        private _loadView() {
            for (let pair of this.datamodel.scalePairs) {
                if (pair.filed.name == 'y') {
                    let axisY: LineAxis = new LineAxis(this.getContext());
                    axisY.type = AxisType.Y;
                    axisY.layoutParams.height = LayoutParams.MATCH_PARENT;
                    axisY.layoutParams.width = 100;
                    axisY.near = true;
                    axisY.majorStyle = new StrokeStyle(1,'black');
                    axisY.series = [].concat(pair.series);
                    axisY.lineStyle = new StrokeStyle(1,'black');
                    this._axisList.push(axisY);
                    this.addView(axisY);
                }
            }
            if (this._axisList.length > 1) {
                this._axisList[this._axisList.length - 1].near = false;
            }
            let plot: BasePlot = new CartesianPlot(this.getContext(), this.datamodel);
            plot.layoutParams.width = LayoutParams.MATCH_PARENT;
            plot.layoutParams.height = LayoutParams.MATCH_PARENT;
            this._plot = plot;
            this.addView(plot);
            let axisX: LineAxis = new LineAxis(this.getContext());
            axisX.type = AxisType.X;
            axisX.layoutParams.width = LayoutParams.MATCH_PARENT;
            axisX.layoutParams.height = 100;
            axisX.majorStyle = new StrokeStyle(1,'black');
            axisX.near = true;
            axisX.lineStyle = new StrokeStyle(1,'black');
            this._axisList.push(axisX);
            this.addView(axisX);
        }
        public beginLoadingAnimation(){
            this.plot.beginLoadingAnimation();
        }
        private _loadRadialView() {
            for (let pair of this.datamodel.scalePairs) {
                if (pair.filed.name == 'y') {
                    let axisY: RadialLineAxis = new RadialLineAxis(this.getContext());
                    axisY.type = AxisType.Y;
                    axisY.layoutParams.height = LayoutParams.MATCH_PARENT;
                    axisY.layoutParams.width = LayoutParams.MATCH_PARENT;
                    axisY.near = true;
                    axisY.series = [].concat(pair.series);
                    axisY.lineStyle = new StrokeStyle(1,'black');
                    axisY.majorStyle = new StrokeStyle(1,'black');
                    this._axisList.push(axisY);
                    this.addView(axisY);
                }
            }
            if (this._axisList.length > 1) {
                this._axisList[this._axisList.length - 1].near = false;

            }
            let plot: BasePlot = new CartesianPlot(this.getContext(), this.datamodel);
            plot.layoutParams.width = LayoutParams.MATCH_PARENT;
            plot.layoutParams.height = LayoutParams.MATCH_PARENT;
            this._plot = plot;
            this.addView(plot);
            let axisX: RadialLineAxis = new RadialLineAxis(this.getContext());
            axisX.type = AxisType.X;
            axisX.gravity = Gravity.Center;
            axisX.layoutParams.width = LayoutParams.MATCH_PARENT;
            axisX.layoutParams.height = LayoutParams.MATCH_PARENT;
            axisX.majorStyle = new StrokeStyle(1,'black');
            axisX.near = true;
            axisX.lineStyle = new StrokeStyle(1,'black');
            this._axisList.push(axisX);
            this.addView(axisX);
        }

        onMeasure(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size {
            // return super.onMeasure(width,height,canvas);
            let maxsize: Size = new Size(0, 0);
            if (this.datamodel.encoding._radial) {
                let offset: number = 0;
                for (let axis of this._axisList) {
                    let size: Size = axis.onMeasure(width, height, canvas);
                    if (axis.type == AxisType.Y) {
                        offset = size.width;
                    }
                }
                let w :number = width.getMeasureValue();
                let h :number = height.getMeasureValue();
                let radius:number = w<h?w/2:h/2 ;
                radius = radius - offset;
                let startAngle:number = StartAngle;
                let sweep:number = Math.PI * 2;
                for (let view of this.children) {
                    let size: Size = new Size(0, 0);
                    if (view instanceof BaseAxis) {
                        if (view.type == AxisType.Y) {
                            size = view.onMeasure(new MeasureSpec(width.getMeasureValue(), LayoutParams.EXACTLY), new MeasureSpec(height.getMeasureValue(), LayoutParams.EXACTLY), canvas);
                        }else if(view.type == AxisType.X){
                            view.onMeasure(width, height, canvas);
                        }
                        (<RadialLineAxis>view)._innerRadius = 0;
                        (<RadialLineAxis>view)._startAngle = startAngle;
                        (<RadialLineAxis>view)._sweep = sweep;
                        (<RadialLineAxis>view)._radius = radius;
                        
                    } else if (view instanceof BasePlot) {
                        view.layoutParams.margin.marginLeft = offset;
                        view.layoutParams.margin.marginTop = offset;
                        view.layoutParams.margin.marginRight = offset;
                        view.layoutParams.margin.marginBottom = offset;
                        view.onMeasure(width, height, canvas);
                    }
                }
            } else {
                let loff = 0, toff = 0, roff = 0, boff = 0;
                let axisYPositiveoffset:number[]=[];
                let axisYNegativeoffset:number[]=[];
                for (let axis of this._axisList) {
                    let size: Size = axis.onMeasure(width, height, canvas);
                    if (axis.type == AxisType.X) {
                        if (axis.near) {
                            boff = size.height;
                        } else {
                            toff = size.height;
                        }
                    } else if (axis.type == AxisType.Y) {
                        if (axis.near) {
                            loff += size.width;
                            axisYPositiveoffset.push(size.width);
                        } else {
                            roff += size.width;
                            axisYPositiveoffset.push(size.width);
                        }
                    }
                }
                let leftPadding = 0;
                let rightPadding =0;
                for (let view of this.children) {
                    let size: Size = new Size(0, 0);

                    if (view instanceof BaseAxis) {
                        if (view.type == AxisType.X) {
                            view.layoutParams.margin.marginLeft = loff;
                            view.layoutParams.margin.marginRight = roff;
                            size = view.onMeasure(new MeasureSpec(width.getMeasureValue() - loff - roff, width.mode), height, canvas);
                        } else if (view.type == AxisType.Y) {
                            if (view.near) {
                                view.layoutParams.margin.marginTop = toff;
                                view.layoutParams.margin.marginBottom = boff;
                                view.layoutParams.margin.marginLeft = leftPadding;
                                leftPadding+=view.width;
                                size = view.onMeasure(width, new MeasureSpec(height.getMeasureValue() - toff - boff, LayoutParams.EXACTLY), canvas);
                            } else {
                                view.layoutParams.margin.marginTop = toff;
                                view.layoutParams.margin.marginBottom = boff;                                
                                view.layoutParams.margin.marginRight = rightPadding;
                                rightPadding+=view.width;
                                size = view.onMeasure(width, new MeasureSpec(height.getMeasureValue() - toff - boff, LayoutParams.EXACTLY), canvas);
                            }
                        }
                    } else if (view instanceof BasePlot) {
                        view.layoutParams.margin.marginLeft = loff;
                        view.layoutParams.margin.marginRight = roff;
                        view.layoutParams.margin.marginTop = toff;
                        view.layoutParams.margin.marginBottom = boff;
                        size = view.onMeasure(width, height, canvas);
                    } else {
                        size = view.onMeasure(width, height, canvas);
                    }
                    if (size.width > maxsize.width) {
                        maxsize.width = size.width;
                    }
                    if (size.height > maxsize.height) {
                        maxsize.height = size.height;
                    }
                }
            }
            return super.onMeasure(width, height, canvas);
        }


        onLayout(l: number, t: number, r: number, b: number, canvas: Canvas): void {
            this.layoutInfo.reset(l, t, r, b, this.padding, 0);

            for (let axis of this._axisList) {
                axis.scale = null;
            }
            // super.onLayout(l, t, r, b, canvas); 
            this.layoutItem(this.plot, l, t, r, b, canvas);


            for (let axis of this._axisList) {
                if (axis instanceof BaseAxis) {
                    if(axis instanceof RadialLineAxis){
                        axis._cx = (l +r)/2;
                        axis._cy = (t+b)/2;
                    }
                    if (axis.type === AxisType.X) {
                        for (let pair of this.plot.scalePairs) {
                            if (pair.filed.name == 'x') {
                                axis.scale = pair.scale;

                            }
                        }
                    } else {
                        for (let pair of this.plot.scalePairs) {
                            if (pair.filed.name == 'y' && _.xor(pair.series, axis.series).length == 0) {
                                axis.scale = pair.scale;
                            }
                        }
                    }
                }
                this.layoutItem(axis, l, r, t, b, canvas);

            }


        }

        get plot(): CartesianPlot {
            for (let plot of this.children) {
                if (plot instanceof CartesianPlot) {
                    return plot;
                }
            }
        }

        public dispatchDraw(canvas: Canvas): void {
            super.dispatchDraw(canvas);
        }

    }
}