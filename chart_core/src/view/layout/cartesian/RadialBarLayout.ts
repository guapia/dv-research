/// <reference path="../../../base.ts" />

namespace android.test.cartesian{

    'use strict';
    import Style = android.graphics.Style;
    import Default = android.device.Default;
    export class RadialBarLayout extends RadialCartesianLayout{
        get barWidth():number{
            return (this._radius-this._innerRadius)/this.maxSeriesSize/(this._stack?1:this._serieslist.length) *0.9;
        }
        protected _layoutSeries(series:Series,index:number):void{
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

                    let x:number = xScale.getScaleValue(xvalue.value) +(this._stack ?0:((index - (this._serieslist.length-1)/2) * this.barWidth));
                    let y0 = yvalue.isMultiple? yvalue.value[0]:(yScale.min<0?0:yScale.min);
                    let y1 = yvalue.isMultiple? yvalue.value[1]:yvalue.value;
                    let yEndAngle:number = yScale.getScaleValue(y1);
                    let color :string = defaultcolor;
                    if(colorScale instanceof OrdinalScale){
                        let colorindex = colorScale.getScaleValue(colorvalue.value);
                         color = colorArray[colorindex];
                    }else if(colorScale instanceof LinearScale){
                        color = ColorUtils.getColor(colorScale.startPosition,colorScale.endPosition,colorvalue.value,colorScale.min,colorScale.max);
                    }
                    let yStartAngle :number = yScale.getScaleValue(y0);
                    let xInnerRadius :number = x-  this.barWidth/2;
                    let xOutterRadius :number = x +this.barWidth/2;
                    // let barShape:BarShape = new BarShape(xleft,yEndAngle,xright-xleft,ybottom-yEndAngle);
                    let barShape :RadialBarShape = new RadialBarShape(this.context,this._cx,this._cy,xInnerRadius,xOutterRadius,yStartAngle,yEndAngle-yStartAngle);
                    barShape.id = pt.id;
                    barShape.style = new Style("gray",Default.strokestyle);
                    if(color != null){
                        barShape.style.background = color;
                    }else{
                        barShape.style.background = defaultcolor;
                    }
                    this.__shapelist.push(barShape);
                }
            }
        }
    }
}
