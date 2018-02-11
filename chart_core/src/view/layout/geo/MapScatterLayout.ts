/// <reference path="../../../base.ts" />

namespace android.test.map{

    'use strict';
    import Style = android.graphics.Style;
    import Default = android.device.Default;
    import Canvas = android.graphics.Canvas;
    import Size = android.graphics.Size;
    import Rect = android.graphics.Rect;
    import Series = android.test.cartesian.Series;
    import Value = android.test.cartesian.Value;
    import Point = android.graphics.Point;
    export class MapScatterLayout extends MapBaseLayout{
       
        protected _layoutSeries(series:Series,nameScale:MapOrdinalScale,canvas:Canvas):void{
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
                    let colorValue :Value = pt.color;
                    let shapeValue:Value = pt.shape;
                    let sizeValue :Value= pt.size;
                    let tooltip:Value = pt.tooltip;
                    let text :Value = pt.text;
                    // let name:Value= pt.x;
                    let name:Value = pt.geoposition;
                    let point:Point = null;
                    if(pt.geoposition.scaleType === ScaleType.LatLon){
                        point = this._projection.lonLat2xy(pt.geoposition.value[0],pt.geoposition.value[1]);
                    }else{
                        point = nameScale.getScaleValue(pt.geoposition.value);
                    }
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
                    let scatterShape :ScatterShape = new ScatterShape(this.context,point.x-s/2,point.y-s/2,s,s,Default.style);
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
                        scatterShape.label = new Label(this.context,textstr,point.x,point.y-s/2-3,width,height,0,3);
                        scatterShape.label.background =Default.style;
                        scatterShape.label._font=font;                        
                        scatterShape.label.background.strokeStyle.strokeColor='gray';
                        scatterShape.label.background.background='lightblue';
                    }
                    this.__shapelist.push(scatterShape);
                }
            }
        }


    }
}
