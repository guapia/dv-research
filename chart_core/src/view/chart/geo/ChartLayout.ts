
/// <reference path="../../../base.ts" />
namespace android.test.map{
    import Padding = android.graphics.Padding;
    import Align = android.graphics.Align;
    import Gravity = android.graphics.Gravity;
    import AlignElement = android.graphics.AlignElement;
    import Margin = android.graphics.Margin;
    import Size = android.graphics.Size;
    import Canvas = android.graphics.Canvas;
    import ViewGroup = android.view.ViewGroup;
    import View = android.view.View;
    import Point = android.graphics.Point;
    import MeasureSpec = android.view.MeasureSpec;
    import LayoutParams = android.view.LayoutParams;
    import MotionEvent = android.view.event.MotionEvent;
    import FrameLayout = android.widget.FrameLayout;
    import LineaerLayout = android.widget.LinearLayout;
    import RenderType = android.graphics.RenderType;
    import Context = android.app.Context;
    import Device = android.device.Device;
    import Orientation = android.graphics.Orientation;
    import RootView = android.widget.RootView;
    import Util = android.graphics.Util;

    export class ChartLayout extends RootView {

        private _chart: GeoPlot;


        private _dataModel: DataModel|relation.DataModel;
        constructor(context: Context) {
            super(context);
            this.clip = false;
            let EventHandler = (pt: Point, types: ElementType, info: any) => {
                console.log(" " + pt.toString() + ", type " + types + " , info " + info);
             

            }
            window['EventHandler'] = EventHandler;
            this.background.background="#333";
            
        }
        

        attachElement(element: HTMLElement, renderType:RenderType,datamodel?: DataModel) {
            super.attachElement(element,Util.asEnum(renderType,RenderType));
            this.padding = new Padding(20);
            this._dataModel = datamodel;
            this.setChart();
        }

        public beginLoadingAnimation() {
            this._chart.beginLoadingAnimation();
        }

        setChart() {
            this.removeAllViews();
            this._chart = new GeoPlot(this.getContext());
            this._chart.layoutParams.width = LayoutParams.MATCH_PARENT;
            this._chart.layoutParams.height = LayoutParams.MATCH_PARENT;

            this._chart.datamodel = this._dataModel;
          
            this._chart.gravity = Gravity.Center;
            this.addView(this._chart, 0);

        }

        public dispatchDraw(canvas: Canvas): void {
            var rect = this.layoutInfo.outterrect;
            canvas.drawRect(rect.startPoint, rect.endPoint, true, this.background);
            super.dispatchDraw(canvas);
        }

        onMeasure(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size {
            return super.onMeasure(width, height, canvas);
        }

        onLayout(l: number, t: number, r: number, b: number, canvas: Canvas): void {
            super.onLayout(l, t, r, b, canvas);
        }
        
        public addView(view: View, index: number): number {
            super.addView(view, index);
            return 0;
        }

    }
}