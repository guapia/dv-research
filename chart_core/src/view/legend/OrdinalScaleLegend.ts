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
    import LinearGradient = android.graphics.LinearGradient;
    import FillStyle = android.graphics.FillStyle;

    export class OrdinalScaleLegend extends LinearLayout implements ILegend{

        private __scale: Scale;
        private __currentValue:number;
        private __type: string = null;
        constructor(c:Context,type?: 'size' | 'color') {
            super(c);
            this.__type = type;
            this.wrap = true;
        }


        public set scale(scale: Scale) {
            this.__scale = scale;
            this.__loadItems();

        }
        public get scale(): Scale {
            return this.__scale;
        }


        private __loadItems(){
            let colorScale = this.__scale;
            if(colorScale instanceof OrdinalScale ){
                if(this.__type == 'color'){
                    let colorArray:string[] =null;
                    if(colorScale.startPosition == null || colorScale.endPosition == null){
                        colorArray = colorScale.ranges;
                    }else{
                        colorArray =ColorUtils.gradientColor(colorScale.startPosition,colorScale.endPosition,(<OrdinalScale>colorScale).domains.length);
                    }
                    let len :number  = colorArray.length;
                    let step:number = this.layoutInfo.innerrect.width/len;
                    let left:number=this.layoutInfo.innerrect.left;
                    let top:number =this.layoutInfo.innerrect.top;
                    let height:number = this.layoutInfo.innerrect.height;
                    let style:Style =Default.style;
    
                    for(let color of colorArray){
                        let item: LegendItem = new LegendItem(this.getContext());
                        item.name =color;
                        item.padding= new android.graphics.Padding(5);
                        item.layoutParams.width = LayoutParams.WRAP_CONTENT;
                        item.layoutParams.height = LayoutParams.WRAP_CONTENT;
                        item.icon = new BarIcon();
                        item.icon.color = color;
                        this.children.push(item);
                    }
                }
            }
        }
        
        onMeasure(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size{
            return super.onMeasure(width,height,canvas);
        }
        onLayout(l: number, t: number, r: number, b: number, canvas: Canvas): void{
            super.onLayout(l,t,r,b,canvas);
        }

        onDraw(canvas:Canvas){
            super.onDraw(canvas);
           
        }

      

        // private _drawColorScale(canvas:Canvas){
        //     let colorScale = this.__scale;
        //     if(colorScale instanceof OrdinalScale){
        //         let colorArray:string[] =null;
        //         if(colorScale.startPosition == null || colorScale.endPosition == null){
        //             colorArray = colorScale.ranges;
        //         }else{
        //             colorArray =ColorUtils.gradientColor(colorScale.startPosition,colorScale.endPosition,(<OrdinalScale>colorScale).domains.length);
        //         }
        //         let len :number  = colorArray.length;
        //         let step:number = this.layoutInfo.innerrect.width/len;
        //         let left:number=this.layoutInfo.innerrect.left;
        //         let top:number =this.layoutInfo.innerrect.top;
        //         let height:number = this.layoutInfo.innerrect.height;
        //         let style:Style =Default.style;

        //         for(let color of colorArray){
        //             let rect:Rect =new Rect(left,top,left+step,top+height);
        //             style.background = color;
        //             canvas.drawRect(rect.startPoint,rect.endPoint,true,style);
        //             left += step;

        //         }
        //     }
        // }
    }
}