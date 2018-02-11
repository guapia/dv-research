/// <reference path="../../../base.ts" />
namespace android.test.map{
    'use strict';
    import Point = android.graphics.Point;
    export abstract class Projection{
        readonly maxx:number;
        readonly minx:number;
        readonly maxy:number;
        readonly miny:number;
        abstract begin():void;
        abstract end():void;
        abstract scale(rate:number):void;//1000为基准线
        abstract rotate(lambda: number, phi:number, gamma:number): void;
        abstract translate(xoffset:number,yoffset:number):void;
        abstract center(lon:number,lat:number):void;
        abstract xy2LonLat(x:number,y:number):{lon:number,lat:number};
        abstract lonLat2xy(lon:number,lat:number):Point;
        // abstract name2xy(name:string):Point;
        abstract refresh():void;
    }
}