/// <reference path="../../../base.ts" />

namespace android.test.cartesian{

    'use strict';
    import Style = android.graphics.Style;
    import Default = android.device.Default;
    export class LineLayout extends CartesianLayout{
        protected _layoutSeries(series:Series,index:number):void{
            let size = this._serieslist.length;
            let xScale:Scale = series.getScale('x');
            let yScale:Scale = series.getScale('y');
            // let colorScale:Scale = series.getScale('color');
            let xs:number[]=[];
            let ys:number[]=[];
            let defaultcolor:string =ColorUtils.indexColor(series.index);
            for(let pt of series.points){
                if( pt != null){
                    let xvalue :Value= pt.x;
                    let yvalue :Value= pt.y;
                    let colorvalue :Value = pt.color;
                    let shape:Value = pt.shape;
                    let size :Value= pt.size;
                    let x:number = xScale.getScaleValue(xvalue.value) ;
                    let y = yvalue.isMultiple? yvalue.value[1]:yvalue.value;
                    y = yScale.getScaleValue(y);
                    xs.push(x);
                    ys.push(y);
                }
            }
            let linesShape:LinesShape = new LinesShape(this.context,xs,ys,null,Default.strokestyle);
            linesShape.strokeStyle.strokeColor = ColorUtils.indexColor(series.index);
            linesShape.style.strokeStyle=null;            
            linesShape.id = series.id;
            this.__shapelist.push(linesShape);
            
        }
        protected _layoutLine(){
            
        }
    }
}
