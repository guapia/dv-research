/// <reference path="../../../base.ts" />

namespace android.test.map {

    'use strict';
    import Point = android.graphics.Point;

    // export const EQUATOR: number = 200;

    export class PointList {
        private __xs: number[];
        private __ys: number[];
        private __ptlist: Point[];
        constructor() {
            this.__xs = [];
            this.__ys = [];
            this.__ptlist = [];
        }
        push(point: Point): void {
            this.__ptlist.push(point);
            this.__xs.push(point.x);
            this.__ys.push(point.y);
        }
        pop(): Point {
            this.__xs.pop();
            this.__ys.pop();
            return this.__ptlist.pop();
        }
        get xs(): number[] {
            return this.__xs;
        }
        get ys(): number[] {
            return this.__ys;
        }
        get points(): Point[] {
            return this.__ptlist;
        }
    }
    export abstract class Stream {
        protected _pointList: PointList;
        protected _projection: Projection;
        constructor() {
            this._pointList = new PointList();
        }
        public setProjection(projection: Projection): void {
            this._projection = projection
        }
        abstract parseStream(coordinates: any): void;

        // static lonLat2Mercator(lon: number, lat: number): Point {
        //     let pt: Point = new Point();
        //     let x: number = lon * EQUATOR / 180;
        //     let y: number = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180);
        //     y = y * EQUATOR / 180;
        //     pt.x = x;
        //     pt.y = y;
        //     return pt;
        // }

        // static mercator2LonLat(x: number, y: number): { lon: number, lat: number } {
        //     let mercatorPt: { lon: number, lat: number } = { lon: 0, lat: 0 };
        //     let lon: number = x / EQUATOR * 180;
        //     let lat: number = y / EQUATOR * 180;
        //     lat = 180 / Math.PI * (2 * Math.atan(Math.exp(lat * Math.PI / 180)) - Math.PI / 2);
        //     mercatorPt.lon = lon;
        //     mercatorPt.lat = lat;
        //     return mercatorPt;
        // }

        get result(): PointList {
            return this._pointList;
        }
    }
    export class AreaStream extends Stream {
        parseStream(coordinates: any): void {
            let startPt: Point = null;
            if (coordinates != null && coordinates instanceof Array) {
                for (let coordinate of coordinates) {
                    for (let cpt of coordinate) {
                        if (cpt instanceof Array && cpt.length === 2) {
                            let pt: Point = this._projection.lonLat2xy(cpt[0], cpt[1]);
                            if (pt != null) {
                                this._pointList.push(pt);
                                if (startPt == null) {
                                    startPt = pt.clone();
                                }
                            }
                        }
                    }
                }
            }
        }

    }
    export class LineStream extends Stream {
        parseStream(coordinates: any): void {
            if (coordinates != null && coordinates instanceof Array) {
                for (let cpt of coordinates) {
                    if (cpt instanceof Array && cpt.length === 2) {
                        let pt: Point = this._projection.lonLat2xy(cpt[0], cpt[1]);
                        if (pt != null) {
                            this._pointList.push(pt);
                        }
                    }
                }
            }
        }
    }

    export class PointStream extends Stream {
        parseStream(coordinates: any): void {
            if (coordinates != null && coordinates instanceof Array) {
                let pt: Point = this._projection.lonLat2xy(coordinates[0], coordinates[1]);
                if (pt != null) {
                    this._pointList.push(pt);
                }
            }
        }
    }


}