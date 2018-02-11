/// <reference path="../../../base.ts" />

namespace android.test.map {
    'use strict';
    import ViewGroup = android.view.ViewGroup;
    import MeasureSpec = android.view.MeasureSpec;
    import Canvas = android.graphics.Canvas;
    import Size = android.graphics.Size;
    import Context = android.app.Context;
    import LayoutParams = android.view.LayoutParams;
    import FrameLayout = android.widget.FrameLayout;
    import Gravity = android.graphics.Gravity;
    import View = android.view.View;
    import Style = android.graphics.Style;
    import Default = android.device.Default;
    import MotionEvent = android.view.event.MotionEvent;
    import Point = android.graphics.Point;
    import Rect = android.graphics.Rect;
    export class GeoPlot extends BasePlot {
        private _layouts: BaseLayout[] = [];
        private __shapeList: Shape[] = [];


        private _dataModel: DataModel | relation.DataModel;
        private _style: Style;
        constructor(context: Context) {
            super(context);
            this._style = Default.style;
            this._style.background='#333';
        }

        set datamodel(value: DataModel | relation.DataModel) {
            this._dataModel = value;
        }
        get datamodel(): DataModel | relation.DataModel {
            return this._dataModel;
        }

        private _startPt: Point
        private _ofx: number = 0;
        private _ofy: number = 0;
        public onMouseEvent(event: MotionEvent): boolean {
            // if(event.action == MotionEvent.ACTION_MOUSE_MOVE){

            //     return true;
            // }
            switch (event.action) {
                case MotionEvent.ACTION_MOUSE_DOWN:
                    this._startPt = new Point(event.x, event.y);
                    return true;

                case MotionEvent.ACTION_MOUSE_UP:
                case MotionEvent.ACTION_CANCEL:
                case MotionEvent.ACTION_MOUSE_OUT:
                    this._startPt = null;
                    return true;
                case MotionEvent.ACTION_MOUSE_MOVE:
                    if (this._startPt != null) {
                        let ofx = event.x - this._startPt.x;// - this.datamodel.config.translate.x;
                        let ofy =   this._startPt.y-event.y;// - this.datamodel.config.translate.y;
                        this._startPt.x = event.x;
                        this._startPt.y = event.y;
                        // this._ofx += ofx;
                        // this._ofy -= ofy;
                        if (this.datamodel.projection == null) {
                            this.datamodel.projection = new MercatorProjection();
                        }
                        console.log("ofx " + ofx + " , ofy " + ofy);
                        this.datamodel.projection.translate(ofx, ofy);
                        this.datamodel.refresh();
                        // this.offset(this._ofx,this._ofy);
                        // this.cleanAnimation();
                        this.requestLayout();
                        // this.invalidate(false);

                        return true;
                    }
            }
            return false;
        }
        onInterceptMouseEvent(event: MotionEvent): boolean {
            return true;
        }
        beginLoadingAnimation() {
            let step = 500 / this.children.length;
            for (let i = 0; i < this.children.length; ++i) {
                let view = this.children[i];
                let animation: FlightAnimationTo = new FlightAnimationTo();
                animation.duration = Math.random()*1000+1500;
                animation.from = 0;
                animation.to = 1;
                animation.repeate = true;
                setTimeout(() => {

                    if (view instanceof FlightShape) {
                        view.startAnimation(animation);

                    }
                }, step * i);
            }
        }

        // onMeasure(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size {
        //     let w: number = width.getMeasureValue();
        //     let h: number = height.getMeasureValue();
        //     let radius: number = w < h ? w : h;
        //     return super.onMeasure(new MeasureSpec(radius, width.mode), new MeasureSpec(radius, height.mode), canvas);
        // }

        onLayout(l: number, t: number, r: number, b: number, canvas: Canvas): void {
            super.onLayout(l, t, r, b, canvas);
            if (this.islayoutChanged) {
                this.removeAllViews();
                this.__shapeList = [];
                this._layouts = [];
                let geolayout: GeoLayout = new GeoLayout(this.getContext());
                geolayout.convert(this._dataModel.featureList,
                    new Rect(l, t, r, b), canvas);

                this.__shapeList = this.__shapeList.concat(geolayout.shapeList);
                let namescale:MapOrdinalScale = null;
                if(this.datamodel instanceof DataModel){
                    namescale =this.datamodel.nameScale;
                }
                if(namescale == null){
                    namescale = geolayout.nameScale;
                }
                if (this._dataModel instanceof map.DataModel) {
                    for (let type of this._dataModel.chartTypes) {
                        switch (type) {
                            case ChartType.Scatter:
                                let scatterLayout: MapScatterLayout = new MapScatterLayout(this.getContext());
                                scatterLayout.convert(this._dataModel.getSeriesByType(ChartType.Scatter), this._dataModel.projection, namescale, this._dataModel.encoding, new Rect(l, t, r, b), canvas);
                                this.__shapeList = this.__shapeList.concat(scatterLayout.shapeList);
                                this._layouts.push(scatterLayout);
                                break;
                        }
                    }
                } else if (this._dataModel instanceof map.relation.DataModel) {
                    let relationlayout: relation.MapRelationLayout = new relation.MapRelationLayout(this.getContext());
                    relationlayout.convert(this._dataModel.points, new Rect(l, t, r, b), canvas);
                    this.__shapeList = this.__shapeList.concat(relationlayout.shapeList);
                    this._layouts.push(relationlayout);
                }

                for (let shape of this.__shapeList) {
                    this.addViewWithOutReLayout(shape);
                    if (shape instanceof PlotShape && shape.label != null) {
                        this.addViewWithOutReLayout(shape.label);
                    }
                }
            }
        }

        onDraw(canvas: Canvas): void {
            super.onDraw(canvas);
        }

    }

}