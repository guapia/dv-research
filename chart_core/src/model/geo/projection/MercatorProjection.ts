
/// <reference path="../../../base.ts" />
namespace android.test.map {
    'use strict';
    import Point = android.graphics.Point;
    export const EARTH_RADIUS: number = 6378137;
    export const EQUATOR: number = EARTH_RADIUS * 2 * Math.PI;// 赤道,在这里假设地球是一个正球
    export class MercatorProjection extends Projection {
        public static MAX_LAT :number=85.05112877980659;
        private __centerlon: number=0;
        private __centerlat: number=0;
        private __xoffset: number = 0;
        private __yoffset: number = 0;
        private __lambda: number;
        private __phi: number;
        private __gamma: number;
        private __circumference: number;
        private _max:number;
        private _min:number;
        private _maxy:number;
        private _miny:number;
        private _scale:number=1;


        constructor(){
            super();
            if(this.__circumference == null){
                this.__circumference = 1000;
            }
            this._scale = 1;

        }

        begin():void{
            this._max = 0;
            this._min = 0;
            this._maxy = 0;
            this._miny = 0;
            let minPt:Point = this.lonLat2xy(-180,-90);
            let maxPt:Point = this.lonLat2xy(180,90);


        }

        end():void{
            this._max = 0;
            this._min = 0;
            this._maxy = 0;
            this._miny = 0;
        }
        get maxx():number{
            return this._max;
        }
        get minx():number{
            return this._min;
        }
        get maxy():number{
            return this._max;
        }
        get miny():number{
            return this._min;
        }
        scale(rate:number):void{
            this._scale = rate;
        }
        rotate(lambda: number, phi: number, gamma: number): void {
            this.__lambda = lambda;
            this.__phi = phi;
            this.__gamma = gamma;
        }
        translate(xoffset: number, yoffset): void {
            if (xoffset != null && !isNaN(xoffset)) {
                this.__xoffset +=xoffset;
            }
            if (yoffset != null && !isNaN(yoffset)) {
                this.__yoffset +=yoffset;
            }
        }
        center(lon: number, lat: number): void {
            this.__centerlon = lon;
            this.__centerlat = lat;
        }
        xy2LonLat(x: number, y: number): { lon: number, lat: number } {
            let circumference :number = this.__circumference * this._scale;
            let mercatorPt: { lon: number, lat: number } = { lon: 0, lat: 0 };
            let lon: number = x / circumference * 180;
            let lat: number = y / circumference * 180;
            lat = 180 / Math.PI * (2 * Math.atan(Math.exp(lat * Math.PI / 180)) - Math.PI / 2);
            mercatorPt.lon = lon;
            mercatorPt.lat = lat;
            return mercatorPt;
        }
        lonLat2xy(lon: number, lat: number): Point {
            let circumference :number = this.__circumference * this._scale;
            lon = lon - this.__centerlon;
            lat = lat - this.__centerlat;
            let lambda: number = (this.__lambda == null || isNaN(this.__lambda)) ? 0 : this.__lambda;
            let phi: number = (this.__phi == null || isNaN(this.__phi)) ? 0 : this.__phi;
            let gamma: number = (this.__gamma == null || isNaN(this.__gamma)) ? 0 : this.__gamma;
            lon = lambda + lon;
            lat = phi + lat;
            if(Math.abs(lat)>MercatorProjection.MAX_LAT){
                return;
            }

            let x: number = lon * circumference / 180;
            let y: number = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180);
            y = y * circumference / 180;
            if (gamma > 0) {
                let a: number =  x==0?0:Math.atan(y / x);
                let newa: number = a + gamma * Math.PI / 180;
                let radius = Math.sqrt(x * x + y * y);
                x = Math.cos(newa) * radius;
                y = Math.sin(newa) * radius;
            }
            let pt: Point = new Point(x, y);
            
            pt.offset(this.__xoffset, this.__yoffset);
            pt.offset(0,-circumference/2);
            pt.y = -pt.y;
            
            return pt;
        }

        refresh(): void {

        }

    }

    // export class OrthographicProjection extends Projection {
    //     private __centerlon: number;
    //     private __centerlat: number;
    //     private __xoffset: number;
    //     private __yoffset: number;
    //     private __lambda: number;
    //     private __phi: number;
    //     private __gamma: number;

    //     rotate(lambda: number, phi: number, gamma: number): void {
    //         this.__lambda = lambda;
    //         this.__phi = phi;
    //         this.__gamma = gamma;
    //     }
    //     translate(xoffset: number, yoffset): void {
    //         this.__xoffset = xoffset;
    //         this.__yoffset = yoffset;
    //     }
    //     center(lon: number, lat: number): void {
    //         this.__centerlon = lon;
    //         this.__centerlat = lat;
    //     }
    //     xy2LonLat(x: number, y: number): { lon: number, lat: number } {

    //         let mercatorPt: { lon: number, lat: number } = { lon: 0, lat: 0 };
    //         let lon: number = x / EQUATOR * 180;
    //         let lat: number = y / EQUATOR * 180;
    //         lat = 180 / Math.PI * (2 * Math.atan(Math.exp(lat * Math.PI / 180)) - Math.PI / 2);
    //         mercatorPt.lon = lon;
    //         mercatorPt.lat = lat;
    //         return mercatorPt;
    //     }
    //     lonLat2xy(lon: number, lat: number): Point {
    //         let lambda: number = (this.__lambda == null || isNaN(this.__lambda)) ? 0 : this.__lambda;
    //         let phi: number = (this.__phi == null || isNaN(this.__phi)) ? 0 : this.__phi;
    //         let gamma: number = (this.__gamma == null || isNaN(this.__gamma)) ? 0 : this.__gamma;
    //         if (gamma > 0) {
    //             let a: number = Math.atan(lat / lon);
    //             let newa: number = a + gamma * Math.PI / 180;
    //             let radius = Math.sqrt(lat * lat + lon * lon);
    //             lon = Math.cos(newa) * radius;
    //             lat = Math.sin(newa) * radius;
    //         }
    //         lon = lambda + lon;
    //         lat = phi + lat;
    //         let x: number = lon * EQUATOR / 180;
    //         let y: number = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180);
    //         y = y * EQUATOR / 180;
    //         return new Point(x, y);
    //     }

    //     refresh(): void {

    //     }

    // }
}