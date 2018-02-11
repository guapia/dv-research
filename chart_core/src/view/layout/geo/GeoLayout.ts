/// <reference path="../../../base.ts" />

namespace android.test.map {
    'use strict';
    import Rect = android.graphics.Rect;
    import Canvas = android.graphics.Canvas;
    import Series = android.test.cartesian.Series;
    import Point = android.graphics.Point;
    import Context = android.app.Context;
    export class GeoLayout extends BaseLayout {
        private __namescale:MapOrdinalScale;
        constructor(c:Context) {
            super(c);
            this.__namescale = new MapOrdinalScale("name");
        }
        convert(featurelist: Feature[], rect: Rect, canvas: Canvas): PlotShape[] {
            this.__shapelist.length = 0;
        
            for (let feature of featurelist) {
                let max:MapItemShape = null;

                for(let stream of feature.streams){
                    let pointlist:PointList = stream.result;
                    let mapshape :MapItemShape =new MapItemShape(this.context,pointlist.xs,pointlist.ys);
                    
                    if(max == null){
                        max = mapshape;
                    }
                    if(max.area < mapshape.area){
                        max = mapshape;
                    }
                    // mapshape.style.background = ColorUtils.indexColor(parseInt(feature.id));
                    mapshape.style.background ="#000";
                    // mapshape.style.background =
                    mapshape.style.strokeStyle.strokeColor ='#cbcbcb';
                    // 'gray'
                    mapshape.style.strokeStyle.strokeWidth =1;
                    this.shapeList.push(mapshape);
                }
                if(max != null){
                    this.__namescale.domains.push(feature.name);
                    this.__namescale.ranges.push(max.center);
                }
            }
            this.__namescale.refresh();
            return this.shapeList;
        }
        get nameScale():MapOrdinalScale{
            return this.__namescale;
        }
    }
}