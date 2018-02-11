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
                item.series = this.series[i];
                if (this.__shape == 'bar') {
                    item.icon = new BarIcon();
                } else if (this.__shape == 'scatter') {
                    item.icon = new CircleIcon();
                }
                if (item.series.enable) {
                    item.icon.color = ColorUtils.indexColor(i);
                } else { 
                    item.icon.color = 'gray';
                }
                this.children.push(item);
            }
        }

    }
    const PADDING: number = 5;
    export class LegendItem extends View {

        public series: Series;
        public icon: Icon;
        public font: Font
        private __fontRect: Rect;
        private __iconRect: Rect;
        constructor(c:Context) {
            super(c);
            this.font = Default.font;
            this.font.fontColor = 'black';
        }

        onMeasure(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size {
            let w: number = width.getMeasureValue();
            let h: number = height.getMeasureValue();
            let size: Size = new Size(0, 0);
            size = canvas.measureString(this.series.name, this.font);
            this.__fontRect = new Rect(0, 0, size.width, size.height);
            let iconsize = size.height * 2;
            this.__iconRect = new Rect(0, 0, iconsize, size.height);
            size.width = size.width + PADDING * 3 + iconsize;
            this.setMeasuredDimension(new MeasureSpec(size.width, LayoutParams.EXACTLY), new MeasureSpec(size.height, LayoutParams.EXACTLY));
            return size;
        }
        onLayout(l: number, t: number, r: number, b: number, canvas: Canvas): void {
            super.onLayout(l, t, r, b, canvas);
            this.__fontRect.translate(l, t);
            this.__iconRect.translate(l + PADDING + this.__fontRect.width, t);
        }
        onDraw(canvas: Canvas): void {
            canvas.drawText(this.series.name, this.__fontRect.startPoint, this.font);
            this.icon.draw(this.__iconRect, canvas);
        }
        onMouseEvent(event: MotionEvent): boolean {

           let handler :Handler= this.getContext().getArgs(EventMessage);
            switch (event.action) {
                case MotionEvent.ACTION_CLICK:
                    console.log("event ");
                    // window['EventHandler'](new Point(event.x, event.y), ElementType.SeriesLegend, { 'series': this.series.name, 'enable': this.series.enable ,action:"enableseries"});
                    let msg :Message = new Message();
                    msg.args['types']= ElementType.SeriesLegend;
                    msg.args['info']={ 'series': this.series.name, 'enable': this.series.enable ,action:"enableseries"};
                    handler.sendMessage(msg);
                    break;
                case MotionEvent.ACTION_MOUSE_ON:
                    this.series.showlabels = true;
                    // window['EventHandler'](new Point(event.x, event.y), ElementType.SeriesLegend, { 'series': this.series.name, 'showlabel': this.series.showlabels,action:"showlabel" });
                    break;
                case MotionEvent.ACTION_MOUSE_OUT:
                    this.series.showlabels = false;
                    // window['EventHandler'](new Point(event.x, event.y), ElementType.SeriesLegend, { 'series': this.series.name, 'showlabel': this.series.showlabels ,action:"showlabel"});
                    break;
            }
            return false;
        }
    }
    export abstract class Icon {
        color: string;
        abstract draw(rect: Rect, canvas: Canvas): void;
    }
    export class BarIcon extends Icon {

        draw(rect: Rect, canvas: Canvas): void {
            let style: Style = Default.style;
            style.background = this.color;
            canvas.drawRect(rect.startPoint, rect.endPoint, true, style);
        }
    }
    export class CircleIcon extends Icon {

        draw(rect: Rect, canvas: Canvas): void {
            let style: Style = Default.style;
            style.background = this.color;
            canvas.drawArc(rect, 0, 2 * 180, style);
        }

    }
}