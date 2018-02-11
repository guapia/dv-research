/// <reference path="../../../base.ts" />

namespace android.test.cartesian{

    'use strict';
    import Style = android.graphics.Style;
    import Default = android.device.Default;
    export class RadialScatterLayout extends RadialCartesianLayout{
        get barWidth():number{
            return (this._radius-this._innerRadius)/this.maxSeriesSize/(this._stack?1:this._serieslist.length) *0.9;
        }
        protected _layoutSeries(series:Series,index:number):void{
            let size = this._serieslist.length;
            let xScale:Scale = series.getScale('x');
            let yScale:Scale = series.getScale('y');
            let colorScale:Scale = series.getScale('color');
            let sizeScale:Scale = series.getScale('size');
            let defaultcolor:string =ColorUtils.indexColor(series.index);
            let colorArray:string[]=[];
            if(colorScale instanceof OrdinalScale){
                colorScale = colorScale.clone();
                colorArray = ColorUtils.gradientColor(colorScale.startPosition,colorScale.endPosition,(<OrdinalScale>colorScale).domains.length);
                colorScale.range([0,(<OrdinalScale>colorScale).domains.length-1]);
            }
            let defaultsize:number = 10;
            for(let pt of series.points){
                if( pt != null){
                    let xvalue :Value= pt.x;
                    let yvalue :Value= pt.y;
                    let colorValue :Value = pt.color;
                    let shapeValue:Value = pt.shape;
                    let sizeValue :Value= pt.size;

                    let radius:number = xScale.getScaleValue(xvalue.value) ;
                    let angle:number = yScale.getScaleValue(yvalue.isMultiple?yvalue.value[1]:yvalue.value);
                    let s :number = sizeScale.getScaleValue(sizeValue.value);
                    if(isNaN(s) || s == null || s <=0){
                        s = defaultsize;
                    }
                    console.log("radius " + radius +" angle " + angle );
                    
                    let color = defaultcolor;
                    if(colorScale instanceof OrdinalScale){
                        let colorindex = colorScale.getScaleValue(colorValue.value);
                         color = colorArray[colorindex];
                    }else if(colorScale instanceof LinearScale){
                        color = ColorUtils.getColor(colorScale.startPosition,colorScale.endPosition,colorValue.value,colorScale.min,colorScale.max);
                    }
                    let x = this._cx + Math.cos(angle) * radius;
                    let y = this._cy + Math.sin(angle) * radius;
                    let scatterShape :ScatterShape = new ScatterShape(this.context,x-s/2,y-s/2,s,s,Default.style);
                    if(color != null){
                        scatterShape.style.background = color;
                    }else {
                        scatterShape.style.background = defaultcolor;
                    }
                    this.__shapelist.push(scatterShape);
                }
            }
        }
        protected _layoutLine(){
        }            
    }
}
