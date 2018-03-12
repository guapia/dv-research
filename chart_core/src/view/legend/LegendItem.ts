/// <reference path="../../base.ts" />

namespace android.test{

    'use strict';
    const PADDING: number = 5;
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
    import EventMessagen= android.test.EventMessage;
    export class LegendItem extends View {

        // public series: Series;
        public name:string;
        public icon: Icon;
        public font: Font
        private __fontRect: Rect;
        private __iconRect: Rect;
        public enable:boolean = true;
        constructor(c:Context,option?:{enable:boolean}) {
            super(c);
            this.font = Default.font;
            this.font.fontColor = 'black';
            if(option != null && option.enable != null){
                this.enable = option.enable;
            }
          

        }

        onMeasure(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size {
            let w: number = width.getMeasureValue();
            let h: number = height.getMeasureValue();
            let size: Size = new Size(0, 0);
            size = canvas.measureString(this.name, this.font);
            this.__fontRect = new Rect(0, 0, size.width, size.height);
            let iconsize = size.height * 2;
            this.__iconRect = new Rect(0, 0, iconsize, size.height);
            size.width = size.width +PADDING + iconsize + this._padding.leftPadding + this._padding .rightPadding;
            size.height += (this._padding.topPadding + this._padding.bottomPadding);
            this.setMeasuredDimension(new MeasureSpec(size.width, LayoutParams.EXACTLY), new MeasureSpec(size.height, LayoutParams.EXACTLY));
            return size;
        }
        onLayout(l: number, t: number, r: number, b: number, canvas: Canvas): void {
            super.onLayout(l, t, r, b, canvas);
            this.__fontRect.translate(l, t+this._padding.topPadding);
            this.__iconRect.translate(l + PADDING + this.__fontRect.width, t+this._padding.topPadding);
        }
        onDraw(canvas: Canvas): void {
            if(!this.enable ){
                this.icon.color = 'gray';
            }
            canvas.drawText(this.name, this.__fontRect.startPoint, this.font);
            this.icon.draw(this.__iconRect, canvas);
        }
        onMouseEvent(event: MotionEvent): boolean {

           let handler :Handler= this.getContext().getArgs(EventMessage);
            switch (event.action) {
                case MotionEvent.ACTION_CLICK:

                    // window['EventHandler'](new Point(event.x, event.y), ElementType.SeriesLegend, { 'series': this.series.name, 'enable': this.series.enable ,action:"enableseries"});
                    let msg :Message = new Message();
                    msg.args['types']= ElementType.SeriesLegend;
                    this.enable = !this.enable;
                    msg.args['info']={ 'name': this.name,action:"enable",value:this.enable};
                    handler.sendMessage(msg);
                    break;
                case MotionEvent.ACTION_MOUSE_ON:
                    // this.series.showlabels = true;
                    // window['EventHandler'](new Point(event.x, event.y), ElementType.SeriesLegend, { 'series': this.series.name, 'showlabel': this.series.showlabels,action:"showlabel" });
                    break;
                case MotionEvent.ACTION_MOUSE_OUT:
                    // this.series.showlabels = false;
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