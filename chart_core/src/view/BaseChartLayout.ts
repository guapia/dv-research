/// <reference path="../base.ts" />

namespace android.test {

    'use strict';
    import ViewGroup = android.view.ViewGroup;
    import LinearLayout = android.widget.LinearLayout;
    import Framelayout = android.widget.FrameLayout;
    import MeasureSpec = android.view.MeasureSpec;
    import Canvas = android.graphics.Canvas;
    import Size = android.graphics.Size;
    import View = android.view.View;
    import Margin = android.graphics.Margin;
    import Gravity = android.graphics.Gravity;
    import RootView = android.widget.RootView;
    export abstract class BaseChartLayout extends RootView {
        private __mainLayout: View;
        private __legends: View[] = [];
        private __oldMargin:Margin;
        setMainLayout(main: View): void {
            this.__mainLayout = main;
            this.addView(main,0);
        }
        addLegend(legend: View): void {
            this.__legends.push(legend);
            this.addView(legend,0);
        }
        removeAllViews():void{
            super.removeAllViews();
            this.__mainLayout = null;
            this.__legends.length = 0;
        }
        onMeasure(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size {
            super.onMeasure(width,height,canvas);
            if(this.__oldMargin == null){
                this.__oldMargin = _.cloneDeep(this.__mainLayout.layoutParams.margin);
            }else{
                this.__mainLayout.layoutParams.margin = _.cloneDeep(this.__oldMargin);
            }
            for (let legend of this.__legends) {
                switch (legend.gravity) {
                    case Gravity.Left:
                            this.__mainLayout.layoutParams.margin.marginLeft+= (legend.width + legend.layoutParams.margin.marginLeft + legend.layoutParams.margin.marginRight);
                        break;
                    case Gravity.Right:
                            this.__mainLayout.layoutParams.margin.marginRight += (legend.width + legend.layoutParams.margin.marginRight+legend.layoutParams.margin.marginLeft);
                        break;
                    case Gravity.Top:
                            this.__mainLayout.layoutParams.margin.marginTop += (legend.height + legend.layoutParams.margin.marginTop + legend.layoutParams.margin.marginBottom);
                        break;
                    case Gravity.Bottom:
                            this.__mainLayout.layoutParams.margin.marginBottom += (legend.height + legend.layoutParams.margin.marginBottom + legend.layoutParams.margin.marginTop);
                        break;
                }
            }
            return  super.onMeasure(width,height,canvas);
        }
        onLayout(l: number, t: number, r: number, b: number, canvas: Canvas): void {
            super.onLayout(l,t,r,b,canvas);
        }
        public abstract beginLoadingAnimation():void;
    }
}