/// <reference path="../../../base.ts" />

namespace android.test.hierarchical {
    'use strict';
    import ViewGroup = android.view.ViewGroup;
    import MeasureSpec = android.view.MeasureSpec;
    import Canvas = android.graphics.Canvas;
    import Size = android.graphics.Size;
    import Context = android.app.Context;
    import LayoutParams = android.view.LayoutParams;
    import FrameLayout = android.widget.FrameLayout;
    import Gravity = android.graphics.Gravity;
    // export const StartAngle:number = Math.PI;
    // import ScrollLayout = android.widget.ScrollLayout
    
    export class HierarchicalChart extends FrameLayout {

        private _dataModel: DataModel;
        private _chartType: ChartType;
        private _option: any;
        private _plot: BasePlot;

        constructor(context: Context, option?: any, chartType?: ChartType) {
            super(context);
            this._option = option;
            this._chartType = chartType;

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
            this._loadView();
        }
        get datamodel(): DataModel {
            return this._dataModel;
        }
        private _loadView() {
            
            let plot: BasePlot = new HierarchicalPlot(this.getContext(), this.datamodel);
            plot.layoutParams.width = LayoutParams.MATCH_PARENT;
            plot.layoutParams.height = LayoutParams.MATCH_PARENT;
            this._plot = plot;
            this.addView(plot);
           
        }
        public beginLoadingAnimation() {
            this.plot.beginLoadingAnimation();
        }
      

        onMeasure(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size {
            // return super.onMeasure(width,height,canvas);
            let maxsize: Size = new Size(0, 0);
            
                let loff = 0, toff = 0, roff = 0, boff = 0;
               
                for (let view of this.children) {
                    let size: Size = new Size(0, 0);

                     if (view instanceof BasePlot) {
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
            
            return super.onMeasure(width, height, canvas);
        }


        onLayout(l: number, t: number, r: number, b: number, canvas: Canvas): void {
            this.layoutInfo.reset(l, t, r, b, this.padding, 0);

            this.layoutItem(this.plot, l, t, r, b, canvas);


        


        }

        get plot(): BasePlot {
            for (let plot of this.children) {
                if (plot instanceof BasePlot) {
                    return plot;
                }
            }
        }

        public dispatchDraw(canvas: Canvas): void {
            super.dispatchDraw(canvas);
        }

    }
}