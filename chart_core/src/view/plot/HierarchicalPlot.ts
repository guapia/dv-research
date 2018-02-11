/// <reference path="../../base.ts" />

namespace android.test.hierarchical {
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
    import View = android.view.View;
    import LayoutParams = android.view.LayoutParams;
    import Util = android.graphics.Util;
    export class HierarchicalPlot extends BasePlot {
        private _currentRect: Rect;
        private __comparedAnimationCache: ComparedAnimationCache;
        // private __shapeList: Shape[] = [];
        private _layouts: BaseLayout[];
        protected __scalePairs: {
            series: string[],
            filed: Field, scale: Scale
        }[];
        private _datamodel: DataModel;
        constructor(context: Context, datamodel: DataModel) {
            super(context);
            this.__comparedAnimationCache = new ComparedAnimationCache();
            this._datamodel = datamodel;
            this._layouts = []
            this.__scalePairs = [];
            this._currentRect = new Rect(0, 0, 0, 0);
        }

        public scaleCallBack(rect: Rect): void {
            if (rect.width * rect.height < this.layoutInfo.innerrect.width * this.layoutInfo.innerrect.height / 4) {
                if (this._datamodel.chartType === ChartType.TreeMap) {
                    setTimeout(() => {
                        let treemapLayout: TreeMapLayout = new TreeMapLayout(this.getContext(),this.layoutInfo.innerrect);
                        let rect: Rect = this._currentRect;
                        this._currentRect = new Rect(rect.left - rect.width / 2, rect.top - rect.height / 2, rect.right + rect.width / 2, rect.bottom + rect.height / 2);
                        treemapLayout.convert(this._datamodel.root, this._datamodel.encoding, this._currentRect, this._canvas);
                        let shapeList = [];//(treemapLayout.shapeList);
                        for (let item of treemapLayout.shapeList) {
                            if (Util.isMixed(item.layoutInfo.innerrect, this.layoutInfo.innerrect)) {
                                shapeList.push(item);
                            }
                        }
                        console.log("after shapelist size  " + shapeList.length);
                        this.removeAllViews();
                        for (let shape of shapeList) {
                            this.addViewWithOutReLayout(shape);
                            if (shape instanceof PlotShape && shape.label != null) {
                                this.addViewWithOutReLayout(shape.label);
                            }
                        }
                        this.__comparedAnimationCache.startCompare(shapeList);
                    }, 100);
                }
            } else if (rect.width * rect.height > this.layoutInfo.innerrect.width * this.layoutInfo.innerrect.height / 4) {
                if (this._datamodel.chartType === ChartType.TreeMap) {
                    setTimeout(() => {
                        let treemapLayout: TreeMapLayout = new TreeMapLayout(this.getContext(),this.layoutInfo.innerrect);
                        let rect: Rect = this._currentRect;
                        this._currentRect = new Rect(rect.left + rect.width / 4, rect.top + rect.height / 4, rect.right - rect.width / 4, rect.bottom - rect.height / 4);
                        treemapLayout.convert(this._datamodel.root, this._datamodel.encoding, this._currentRect, this._canvas);
                        // let shapeList =(treemapLayout.shapeList);
                        let shapeList = [];//(treemapLayout.shapeList);
                        for (let item of treemapLayout.shapeList) {
                            if (Util.isMixed(item.layoutInfo.innerrect, this.layoutInfo.innerrect)) {
                                shapeList.push(item);
                            }
                        }
                        console.log("after shapelist size  " + shapeList.length);
                        this.removeAllViews();
                        for (let shape of shapeList) {
                            this.addViewWithOutReLayout(shape);
                            if (shape instanceof PlotShape && shape.label != null) {
                                this.addViewWithOutReLayout(shape.label);
                            }
                        }
                        this.__comparedAnimationCache.startCompare(shapeList);
                    }, 100);
                }
            }
        }

        public addViewWithOutReLayout(view: View, index?: number, layoutParams?: LayoutParams): number {
            if (view instanceof CubeShape) {
                view.scaleCallBack = this.scaleCallBack.bind(this);
            }

            return super.addViewWithOutReLayout(view, index, layoutParams);
        }
        // public onInterceptMouseEvent(event: MotionEvent): boolean {
        //     if(event.action === MotionEvent.ACTION_CLICK){
        //         return true;
        //     }
        //     return super.onInterceptMouseEvent(event);
        // }
        // public onMouseEvent(event: MotionEvent): boolean {
        //     // return false;
        //     if(this._datamodel.chartType == ChartType.TreeMap){

        //     }else{
        //         return true;
        //     }
        // }

        onMeasure(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size {
            return super.onMeasure(width, height, canvas);
        }
        onLayout(l: number, t: number, r: number, b: number, canvas: Canvas): void {
            super.onLayout(l, t, r, b, canvas);

            if (this.islayoutChanged) {
                this.removeAllViews();
                let shapeList = [];
                this.__scalePairs = [];
                this._layouts.length = 0;

                if (this._datamodel.chartType == ChartType.Sunburst) {
                    let sunburstLayout: SunburstLayout = new SunburstLayout(this.getContext(),0, Math.PI * 2, 0);
                    this._currentRect = new Rect(l, t, r, b);

                    sunburstLayout.convert(this._datamodel.root, this._datamodel.encoding, this._currentRect, canvas);
                    shapeList = (sunburstLayout.shapeList);

                } else if (this._datamodel.chartType == ChartType.TreeMap) {
                    let treemapLayout: TreeMapLayout = new TreeMapLayout(this.getContext(),this.layoutInfo.innerrect);
                    this._currentRect = new Rect(l, t, r, b);
                    treemapLayout.convert(this._datamodel.root, this._datamodel.encoding, this._currentRect, canvas);
                    // let rect: Rect = this.layoutInfo.innerrect;
                    // treemapLayout.convert(this._datamodel.root, this._datamodel.encoding, new Rect(rect.left - rect.width / 2, rect.top - rect.height / 2, rect.right + rect.width / 2, rect.bottom + rect.height / 2), this._canvas);
                    shapeList = (treemapLayout.shapeList);
                    console.log("before shape list size " + shapeList.length);
                    if(this.__comparedAnimationCache != null){
                        setTimeout(() => {
                            this.__comparedAnimationCache.startCompare(shapeList);
                        });
                    }

                }
                for (let shape of shapeList) {
                    this.addViewWithOutReLayout(shape);
                    if (shape instanceof PlotShape && shape.label != null) {
                        this.addViewWithOutReLayout(shape.label);
                    }
                }
            }
        }


        public beginLoadingAnimation() {
            let step = 500 / this.children.length;

            for (let i = 0; i < this.children.length; ++i) {
                let shape = this.children[i];
                if (shape instanceof CubeShape) {
                    setTimeout(() => {
                        // console.log("index  " + i);
                        let animation: CubeAnimation = new CubeAnimation(null);
                        animation.duration = 500;
                        animation.from = 0.2;
                        animation.to = 1;
                        animation.fillAfter = false;
                        shape.startAnimation(animation);
                    }, step * i);
                } else if (shape instanceof SunburstShape) {

                    // console.log("index  " + i);
                    let animation: SweepAnimation = new SweepAnimation();
                    animation.duration = 1500;
                    animation.from = 0.2;
                    animation.to = 1;
                    animation.fillAfter = false;
                    shape.startAnimation(animation);

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

        }

        dispatchDraw(canvas: Canvas): void {

            canvas.save();
            canvas.clip(this.layoutInfo.innerrect);
            super.dispatchDraw(canvas);
            canvas.restore();
        }
        get layouts(): BaseLayout[] {
            return this._layouts;
        }
        get scalePairs(): { series: string[], filed: Field, scale: Scale }[] {
            return this.__scalePairs;
        }
    }
}