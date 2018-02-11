/// <reference path="../../../base.ts" />

namespace android.test.map {
    'use strict';


    import Rect = android.graphics.Rect;
    import Style = android.graphics.Style;
    import Default = android.device.Default;
    import StrokeStyle = android.graphics.StrokeStyle;
    import Canvas = android.graphics.Canvas;
    import Series = android.test.cartesian.Series;
    import Encoding = android.test.cartesian.Encoding;
    export class MapBaseLayout extends BaseLayout {
        protected _serieslist:Series[];
        protected _rect: Rect = null;
        protected _encoding: Encoding;
        protected _nameScale:MapOrdinalScale;
        protected _projection:Projection;
        convert(serieslist: Series[],projection:Projection,nameScale:MapOrdinalScale, encoding: Encoding, rect: Rect, canvas: Canvas): PlotShape[] {
            this.__shapelist = [];
            this._serieslist=[];
            this._projection = projection;
            this._nameScale = nameScale;
            for(let ser of serieslist){
                this._serieslist.push(ser.clone());
            }
            this._encoding = encoding;
            this._rect = rect;
            for(let ser of this._serieslist){
                this._layoutSeries(ser,nameScale,canvas);
            }
            return this.__shapelist;
            
        }
        protected _layoutSeries(ser:Series,nameScale:MapOrdinalScale,canvas:Canvas){
            
        }
    }
}