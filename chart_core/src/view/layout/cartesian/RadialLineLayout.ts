/// <reference path="../../../base.ts" />

namespace android.test.cartesian{

    'use strict';
    import Style = android.graphics.Style;
    import Default = android.device.Default;
    export class RadialLineLayout extends RadialCartesianLayout{
        protected _layoutSeries(series:Series,index:number):void{
            let size = this._serieslist.length;
            let xScale:Scale = series.getScale('x');
            let yScale:Scale = series.getScale('y');
            let colorScale:Scale = series.getScale('color');
            let xs:number[]=[];
            let ys:number[]=[];
            for(let pt of series.points){
                if( pt != null){
                    console.log(pt);
                    let xvalue :Value= pt.x;
                    let yvalue :Value= pt.y;
                    let colorvalue :Value = pt.color;
                    let shape:Value = pt.shape;
                    let size :Value= pt.size;

                    let radius:number = xScale.getScaleValue(xvalue.value) ;

                    let angle = yScale.getScaleValue(yvalue.isMultiple? yvalue.value[1]:yvalue.value);

                    let x = this._cx + Math.cos(angle) * radius;
                    let y = this._cy + Math.sin(angle) * radius;
                    xs.push(x);
                    ys.push(y);
                }
            }
            let linesShape:LinesShape = new LinesShape(this.context,xs,ys,null,Default.strokestyle);
            linesShape.strokeStyle.strokeColor = ColorUtils.indexColor(series.index);
            linesShape.id = series.id;
            this.__shapelist.push(linesShape);
            
        }
        protected _layoutLine(){
            
        }
    }
}
