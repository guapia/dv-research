/// <reference path="../base.ts" />

namespace android.test{
    'use strict';
    import Style = android.graphics.Style;
    import StrokeStyle = android.graphics.StrokeStyle;
    import FillStyle = android.graphics.FillStyle;
    import Font = android.graphics.Font;
    import Point = android.graphics.Point;

    export class Config{
        symbolStyle:FillStyle;
        lineSeriesStyle:StrokeStyle;
        areaSeriesStyle:FillStyle;
        axisTitleFont:Font;
        axisLabelFont:Font;
        legendTitleFont:Font;
        legendLabelFont:Font;
        center:Point;
        scale:number;
        translate:Point;
        constructor(config:any){
            let geo:any = config.geo;
            if(geo != null){
                if(geo.center != null){
                    this.center = new Point(geo.center[0],geo.center[1]);
                }
                if(geo.translate != null){
                    this.translate = new Point(geo.translate[0],geo.translate[1]);
                }
                if(geo.scale){
                    this.scale = geo.scale;
                }
            }
        }
    }
}