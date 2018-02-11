/// <reference path="../../../base.ts" />

namespace android.test.cartesian{

    'use strict';
    import Style = android.graphics.Style;
    import Default = android.device.Default;
    import Canvas = android.graphics.Canvas;
    import Size = android.graphics.Size;
    export class ScatterLayout extends CartesianLayout{
        get barWidth():number{
            return this._rect.width/this.maxSeriesSize/(this._stack?1:this._serieslist.length) *0.9;
        }
        protected _layoutSeries(series:Series,index:number,canvas:Canvas):void{
            let size = this._serieslist.length;
            let xScale:Scale = series.getScale('x');
            let yScale:Scale = series.getScale('y');
            let colorScale:Scale = series.getScale('color');
            let sizeScale:Scale = series.getScale('size');
            let defaultcolor:string =ColorUtils.indexColor(series.index);
            let colorArray:string[]=[];
            if(colorScale instanceof OrdinalScale){
                colorScale = colorScale.clone() as OrdinalScale;
                if(colorScale.startPosition == null || colorScale.endPosition == null){
                   let len :number=(<OrdinalScale>colorScale).domains.length;
                   for(let i= 0; i < len;++i){
                    (<OrdinalScale>colorScale).ranges.push(ColorUtils.Color[i&ColorUtils.Color.length]);
                   }
                }else{
                    colorArray = ColorUtils.gradientColor(colorScale.startPosition,colorScale.endPosition,(<OrdinalScale>colorScale).domains.length);
                    colorScale.range([0,(<OrdinalScale>colorScale).domains.length-1]);
                }
            }
            let defaultsize:number = 10;
            for(let pt of series.points){
                if( pt != null){
                    let xvalue :Value= pt.x;
                    let yvalue :Value= pt.y;
                    let colorValue :Value = pt.color;
                    let shapeValue:Value = pt.shape;
                    let sizeValue :Value= pt.size;
                    let tooltip:Value = pt.tooltip;
                    let text :Value = pt.text;


                    let x:number = xScale.getScaleValue(xvalue.value) ;
                    let y:number = yScale.getScaleValue(yvalue.isMultiple?yvalue.value[1]:yvalue.value);
                    let s :number = sizeScale.getScaleValue(sizeValue.value);
                    if(isNaN(s) || s == null || s <=0){
                        s = defaultsize;
                    }
                    let color = defaultcolor;
                    if(colorScale instanceof OrdinalScale){
                        let colorindex = colorScale.getScaleValue(colorValue.value);
                         color = colorArray[colorindex];
                    }else if(colorScale instanceof LinearScale){
                        color = ColorUtils.getColor(colorScale.startPosition,colorScale.endPosition,colorValue.value,colorScale.min,colorScale.max);
                    }
                    let scatterShape :ScatterShape = new ScatterShape(this.context,x-s/2,y-s/2,s,s,Default.style);
                    if(color != null){
                        scatterShape.style.background = color;
                    }else {
                        scatterShape.style.background = defaultcolor;
                    }
                    if(series.showlabels && text != null){
                        let textstr :string= text.value;
                        let font = Default.font;
                        font.fontColor='black';
                        font.fontSize=12;
                        let textsize :Size =canvas.measureString(textstr,font);
                        let width =textsize.width;
                        let height = textsize.height;
                        scatterShape.label = new Label(this.context,textstr,x,y-s/2-3,width,height,0,3);
                        scatterShape.label.background =Default.style;
                        scatterShape.label._font=font;                        
                        scatterShape.label.background.strokeStyle.strokeColor='gray';
                        scatterShape.label.background.background='lightblue';
                    }
                    this.__shapelist.push(scatterShape);
                }
            }
        }
        protected _layoutLine(){
        }            
    }
}
