/// <reference path="../../../base.ts" />

namespace android.test.cartesian{

    'use strict';
    import Style = android.graphics.Style;
    import Default = android.device.Default;
    import Size = android.graphics.Size;
    import Canvas = android.graphics.Canvas;
    export class BarLayout extends CartesianLayout{
        get barWidth():number{
            return this._rect.width/this.maxSeriesSize/(this._stack?1:this._serieslist.length) *0.9;
        }
        protected _layoutSeries(series:Series,index:number,canvas:Canvas):void{
            let size = this._serieslist.length;
            let xScale:Scale = series.getScale('x');
            let yScale:Scale = series.getScale('y');
            let colorScale:Scale = series.getScale('color');
            let colorArray:string[]=[];
            if(colorScale instanceof OrdinalScale){
                colorScale = colorScale.clone();
                colorArray = ColorUtils.gradientColor(colorScale.startPosition,colorScale.endPosition,(<OrdinalScale>colorScale).domains.length);
                colorScale.range([0,(<OrdinalScale>colorScale).domains.length-1]);
            }
            let defaultcolor:string =ColorUtils.indexColor(series.index);
            for(let pt of series.points){
                if( pt != null){
                    let xvalue :Value= pt.x;
                    let yvalue :Value= pt.y;
                    let colorvalue :Value = pt.color;
                    let shape:Value = pt.shape;
                    let size :Value= pt.size;
                    let tooltip:Value = pt.tooltip;
                    let text :Value = pt.text;

                    let x:number = xScale.getScaleValue(xvalue.value) +(this._stack ?0:((index - (this._serieslist.length-1)/2) * this.barWidth));
                    let y0 = yvalue.isMultiple? yvalue.value[0]:(yScale.min<0?0:yScale.min);
                    let y1 = yvalue.isMultiple? yvalue.value[1]:yvalue.value;
                    let ytop:number = yScale.getScaleValue(y1);
                    let color :string = defaultcolor;
                    if(colorScale instanceof OrdinalScale){
                        let colorindex = colorScale.getScaleValue(colorvalue.value);
                         color = colorArray[colorindex];
                    }else if(colorScale instanceof LinearScale){
                        color = ColorUtils.getColor(colorScale.startPosition,colorScale.endPosition,colorvalue.value,colorScale.min,colorScale.max);
                    }
                    let ybottom :number = yScale.getScaleValue(y0);
                    if(y0 == 0){
                        // console.log(yScale);
                        // console.log("y0 " + y0 + " yBottom " + ybottom);

                    }
                    let xleft :number = x-  this.barWidth/2;
                    let xright :number = x +this.barWidth/2;
                    let barShape:BarShape = new BarShape(this.context,xleft,ytop,xright-xleft,ybottom-ytop);
                    barShape.id = pt.id;
                    barShape.style = new Style("gray",Default.strokestyle);
                    if(color != null){
                        barShape.style.background = color;
                    }else{
                        barShape.style.background = defaultcolor;
                    }
                    if(series.showlabels && text != null){
                        let textstr :string = text.value;
                        let font = Default.font;
                        font.fontColor='black';
                        font.fontSize=12;
                        let textsize :Size =canvas.measureString(textstr,font);
                        let width =textsize.width;
                        let height = textsize.height;
                        barShape.label = new Label(this.context,textstr,(xleft+xright)/2,ytop-height/2-3,width,height,0,5);
                        barShape.label._font=font;
                        barShape.label.background =Default.style;
                        barShape.label.background.strokeStyle.strokeColor='white';
                        barShape.label.background.background='white';
                    }
                    this.__shapelist.push(barShape);
                }
            }
        }
    }
}
