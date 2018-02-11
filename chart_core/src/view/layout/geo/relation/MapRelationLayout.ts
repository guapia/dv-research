/// <reference path="../../../../base.ts" />

namespace android.test.map.relation {
    'use strict';
    import Rect = android.graphics.Rect;
    import Canvas = android.graphics.Canvas;
    import Series = android.test.cartesian.Series;
    import Point = android.graphics.Point;
    import Context = android.app.Context;
    export class MapRelationLayout extends BaseLayout {
        constructor(c:Context) {
            super(c);
        }
        convert(items: Item[], rect: Rect, canvas: Canvas): PlotShape[] {
            this.__shapelist.length = 0;
        
            for (let item of items) {
                let max:FlightShape = null;
                let shape :FlightShape=new FlightShape(this.context,[item.start.x,item.end.x],[item.start.y,item.end.y]);

                    shape.strokeStyle.strokeColor ='red';
                    // 'gray'
                    shape.strokeStyle.strokeWidth =0.5;
                    this.shapeList.push(shape);
            }
            return this.shapeList;
        }
    }
}