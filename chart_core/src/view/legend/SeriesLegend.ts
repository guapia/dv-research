/// <reference path="../../base.ts" />

namespace android.test.cartesian {

    'use strict';
    import View = android.view.View;
    import LinearLayout = android.widget.LinearLayout;
    import Context = android.app.Context;

    import MeasureSpec = android.view.MeasureSpec;
    import Size = android.graphics.Size;

    import Canvas = android.graphics.Canvas;
    import ViewState = android.view.ViewState;
    import Rect = android.graphics.Rect;
    import Style = android.graphics.Style;
    import StrokeStyle = android.graphics.StrokeStyle;
    import Default = android.device.Default;
    import Orientation = android.graphics.Orientation;
    import LayoutParams = android.view.LayoutParams;
    import ViewGroup = android.view.ViewGroup;
    import Font = android.graphics.Font;
    import Point = android.graphics.Point;
    import MotionEvent = android.view.event.MotionEvent;
    import Handler = android.util.Handler;
    import Message = android.util.Message;

    export class SeriesLegend extends LinearLayout implements ILegend{

        private _series: Series[];
        private __shape: string;
        constructor(c:Context,shape?: 'bar' | 'scatter') {
            super(c);
            this.__shape = shape;
        }

        public set series(value: Series[]) {
            this._series = value;
            this.__loadItems();
        }
        public get series(): Series[] {
            return this._series;
        }

        private __loadItems() {
            this.removeAllViews();

            let colorArray: string[] = [];

            for (let i = 0; i < this.series.length; ++i) {
                let item: LegendItem = new LegendItem(this.getContext());
                item.name = this.series[i].name;
                if (this.__shape == 'bar') {
                    item.icon = new BarIcon();
                } else if (this.__shape == 'scatter') {
                    item.icon = new CircleIcon();
                }
                if (this.series[i].enable) {
                    item.icon.color = ColorUtils.indexColor(i);
                } else { 
                    item.icon.color = 'gray';
                }
                item.padding= new android.graphics.Padding(5);
                item.layoutParams.width = LayoutParams.WRAP_CONTENT;
                item.layoutParams.height = LayoutParams.WRAP_CONTENT;
                this.children.push(item);
            }
        }

    }
   
}