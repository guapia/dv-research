/// <reference path="../../base.ts" />

namespace android.test.cartesian {
    import Context = android.app.Context;
    import MeasureSpec = android.view.MeasureSpec;
    import Canvas = android.graphics.Canvas;
    import Size = android.graphics.Size;
    import Point = android.graphics.Point;
    import Rect = android.graphics.Rect;
    import Default = android.device.Default;
    import Animation = android.view.animation.Animation;
    import MotionEvent = android.view.event.MotionEvent;
    import BounceAnimationEase = android.view.animation.BounceAnimationEase;

    export class CartesianPlot extends BasePlot {

        private __shapeList: Shape[] = [];
        private _layouts: CartesianBaseLayout[];
        protected __scalePairs: {
            series: string[],
            filed: Field, scale: Scale
        }[];
        private _datamodel: DataModel;
        constructor(context: Context, datamodel: DataModel) {
            super(context);

            this._datamodel = datamodel;

            this._layouts = []
            this.__scalePairs = [];
            this._animation = new Animation();
            this._animation.duration = 500;
            this._animation.ease = new BounceAnimationEase();

        }


        onMeasure(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size {
            return super.onMeasure(width, height, canvas);
        }
        onLayout(l: number, t: number, r: number, b: number, canvas: Canvas): void {
            super.onLayout(l, t, r, b, canvas);

            if (this.islayoutChanged) {
                this.removeAllViews();
                this.__shapeList = [];
                this.__scalePairs = [];
                this._layouts.length = 0;
                let isradial: boolean = this._datamodel.encoding._radial;
                for (let type of this._datamodel.chartTypes) {
                    switch (type) {
                        case ChartType.Bar:
                            if (isradial) {
                                let barlayout: RadialBarLayout = new RadialBarLayout(this.getContext());
                                let cx: number = (l + r) / 2;
                                let cy: number = (b + t) / 2;
                                let radius: number = ((r - l) < (b - t) ? (r - l) : (b - t)) / 2;
                                let innerRadius: number = 0;
                                let startAngle: number = StartAngle;
                                let endAngle: number = Math.PI * 2 + startAngle;
                                barlayout.convert(this._datamodel.getSeriesByType(ChartType.Bar), this._datamodel.encoding, cx, cy, innerRadius, radius, startAngle, endAngle);
                                this.__shapeList = this.__shapeList.concat(barlayout.shapeList);
                                this._layouts.push(barlayout);
                            } else {
                                let barlayout: BarLayout = new BarLayout(this.getContext());
                                barlayout.convert(this._datamodel.getSeriesByType(ChartType.Bar), this._datamodel.encoding, new Rect(l, t, r, b), canvas);
                                this.__shapeList = this.__shapeList.concat(barlayout.shapeList);
                                this._layouts.push(barlayout);
                            }
                            break;
                        case ChartType.Line:
                            if (isradial) {

                                let linelayout: RadialLineLayout = new RadialLineLayout(this.getContext());
                                let cx: number = (l + r) / 2;
                                let cy: number = (b + t) / 2;
                                let radius: number = ((r - l) < (b - t) ? (r - l) : (b - t)) / 2;
                                let innerRadius: number = 0;
                                let startAngle: number = StartAngle;
                                let endAngle: number = Math.PI * 2 + startAngle;
                                linelayout.convert(this._datamodel.getSeriesByType(ChartType.Line), this._datamodel.encoding, cx, cy, innerRadius, radius, startAngle, endAngle);
                                this.__shapeList = this.__shapeList.concat(linelayout.shapeList);
                                this._layouts.push(linelayout);
                            }
                            else {
                                let linelayout: LineLayout = new LineLayout(this.getContext());
                                linelayout.convert(this._datamodel.getSeriesByType(ChartType.Line), this._datamodel.encoding, new Rect(l, t, r, b), canvas);
                                this.__shapeList = this.__shapeList.concat(linelayout.shapeList);
                                this._layouts.push(linelayout);
                            }
                            break;
                        case ChartType.Scatter:
                            if (isradial) {

                                let scatterlayout: RadialScatterLayout = new RadialScatterLayout(this.getContext());
                                let cx: number = (l + r) / 2;
                                let cy: number = (b + t) / 2;
                                let radius: number = ((r - l) < (b - t) ? (r - l) : (b - t)) / 2;
                                let innerRadius: number = 0;
                                let startAngle: number = StartAngle;
                                let endAngle: number = Math.PI * 2 + startAngle;
                                scatterlayout.convert(this._datamodel.getSeriesByType(ChartType.Scatter), this._datamodel.encoding, cx, cy, innerRadius, radius, startAngle, endAngle);
                                this.__shapeList = this.__shapeList.concat(scatterlayout.shapeList);
                                this._layouts.push(scatterlayout);
                            } else {
                                let scatterLayout: ScatterLayout = new ScatterLayout(this.getContext());
                                scatterLayout.convert(this._datamodel.getSeriesByType(ChartType.Scatter), this._datamodel.encoding, new Rect(l, t, r, b), canvas);
                                this.__shapeList = this.__shapeList.concat(scatterLayout.shapeList);
                                this._layouts.push(scatterLayout);
                            }
                            break;
                        case ChartType.Area:
                            if (isradial) {

                                let arealayout: RadialAreaLayout = new RadialAreaLayout(this.getContext());
                                let cx: number = (l + r) / 2;
                                let cy: number = (b + t) / 2;
                                let radius: number = ((r - l) < (b - t) ? (r - l) : (b - t)) / 2;
                                let innerRadius: number = 0;
                                let startAngle: number = StartAngle;
                                let endAngle: number = Math.PI * 2 + startAngle;
                                arealayout.convert(this._datamodel.getSeriesByType(ChartType.Area), this._datamodel.encoding, cx, cy, innerRadius, radius, startAngle, endAngle);
                                this.__shapeList = this.__shapeList.concat(arealayout.shapeList);
                                this._layouts.push(arealayout);
                            } else {
                                let arealayout: AreaLayout = new AreaLayout(this.getContext());
                                arealayout.convert(this._datamodel.getSeriesByType(ChartType.Area), this._datamodel.encoding, new Rect(l, t, r, b), canvas);
                                this.__shapeList = this.__shapeList.concat(arealayout.shapeList);
                                this._layouts.push(arealayout);
                            }
                            break;
                    }
                }
                if (this.layouts.length > 1) {
                    for (let i = 0; i < this._layouts.length; ++i) {
                        let scalesPairs = this.layouts[i].scalePairs;
                        for (let pair of scalesPairs) {
                            let result = _.find(this.scalePairs, (p: { series: string[], filed: Field, scale: Scale }) => {
                                return p.filed.equals(pair.filed) && p.scale.equal(pair.scale);
                            });
                            if (result == null) {
                                this.__scalePairs.push({ series: [].concat(pair.series), filed: pair.filed, scale: pair.scale });
                            } else {
                                result.series = result.series.concat(pair.series);
                            }

                        }
                    }
                } else if (this._layouts.length === 1) {
                    this.__scalePairs = this._layouts[0].scalePairs;
                }
                if (!this._datamodel.encoding._radial) {
                    this._layoutLine(l, r);
                }
                // if(this.comparedAniamtionCache != null){
                //     if(!this.comparedAniamtionCache.isempty){
                //         this.comparedAniamtionCache.preparing();
                //     }
                //     setTimeout(() => {
                //         this.comparedAniamtionCache.startCompare(this.__shapeList);
                //     });
                // }
                for (let shape of this.__shapeList) {
                    this.addViewWithOutReLayout(shape);
                    if (shape instanceof PlotShape && shape.label != null) {
                        this.addViewWithOutReLayout(shape.label);
                    }
                }
            }
        }
        protected _layoutLine(l: number, r: number) {
            let ys: number[] = [];
            for (let layout of this.layouts) {
                for (let pair of layout.scalePairs) {
                    if (pair.filed.name == 'y') {
                        let y: number = pair.scale.getScaleValue(0);
                        if (ys.indexOf(y) < 0) {
                            ys.push(y);
                            let axisline: AxisLineShape = new AxisLineShape(this.getContext(),l, y, r, y, Default.strokestyle);
                            this.__shapeList.push(axisline);
                        }
                    }
                }
            }
        }

        public beginLoadingAnimation() {
            let step = 500 / this.children.length;

            for (let i = 0; i < this.children.length; ++i) {
                let shape = this.children[i];
                if (shape instanceof ScatterShape) {
                    setTimeout(() => {
                        console.log("index  " + i);
                        let animation: ScatterAnimation = new ScatterAnimation(null);
                        animation.duration = 500;
                        animation.from = 0.2;
                        animation.to = 1;
                        animation.fillAfter = false;
                        shape.startAnimation(animation);
                    }, step * i);
                } else if (shape instanceof BarShape) {
                    setTimeout(() => {
                        let animation: BarAnimation = new BarAnimation(null);
                        animation.duration = 1000;
                        animation.from = 0.3;
                        animation.to = 1;
                        animation.fillAfter = false;
                        shape.startAnimation(animation);
                    }, step * i);
                }
                else if (shape instanceof AreaShape || shape instanceof LinesShape) {
                    setTimeout(() => {
                        let animation: AreaAnimation = new AreaAnimation(null);
                        animation.duration = 1000;
                        animation.from = 0;
                        animation.to = 1;
                        animation.fillAfter = false;
                        shape.startAnimation(animation);
                    }, step * i);
                } else if (shape instanceof RadialBarShape) {

                    setTimeout(() => {
                        let animation: SweepAnimation = new SweepAnimation();
                        animation.duration = 1000;
                        animation.from = 0;
                        animation.to = 1;
                        animation.fillAfter = false;
                        shape.startAnimation(animation);
                    }, step * i);
                }
            }
        }

        /**
         * merage the scales which is  x / y 
         */
        private __merageScale() {

        }
        onDraw(canvas: Canvas): void {
            super.onDraw(canvas);
            // for (let shape of this.__shapeList) {
            //     shape.draw(canvas);
            // }
        }
        get layouts(): CartesianBaseLayout[] {
            return this._layouts;
        }
        get scalePairs(): { series: string[], filed: Field, scale: Scale }[] {
            return this.__scalePairs;
        }
    }
}