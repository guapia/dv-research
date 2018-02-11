/// <reference path="../../../base.ts" />
namespace android.test.cartesian{

    'use strict';
    import Style = android.graphics.Style;
    import Default = android.device.Default;
    export class AreaLayout extends CartesianLayout{
        protected _layoutSeries(series:Series,index:number):void{
            let size = this._serieslist.length;
            let xScale:Scale = series.getScale('x');
            let yScale:Scale = series.getScale('y');
            let colorScale:Scale = series.getScale('color');
            let xs:number[]=[];
            let ys:number[]=[];
            for(let pt of series.points){
                if( pt != null){
                    let xvalue :Value= pt.x;
                    let yvalue :Value= pt.y;
                    let colorvalue :Value = pt.color;
                    let shape:Value = pt.shape;
                    let size :Value= pt.size;


                    let x:number = xScale.getScaleValue(xvalue.value) ;
                    let y0 = yvalue.isMultiple? yvalue.value[0]:(yScale.min<0?(yScale.max<0?yScale.max:0):yScale.min);
                    let y1 = yvalue.isMultiple? yvalue.value[1]:yvalue.value;                    
                    y0 = yScale.getScaleValue(y0);
                    y1 = yScale.getScaleValue(y1);
                    xs.push(x);
                    ys.push(y0);
                    xs.unshift(x);
                    ys.unshift(y1);
                }
            }
            let linesShape:AreaShape = new AreaShape(this.context,xs,ys,null,Default.strokestyle);
            linesShape.style.background = ColorUtils.indexColor(series.index);
            linesShape.style.strokeStyle=null;
            linesShape.id = series.id;
            this.__shapelist.push(linesShape);
            
        }
        protected _layoutLine(){
            
        }
    }
}
