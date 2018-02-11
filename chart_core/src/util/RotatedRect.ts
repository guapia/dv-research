/// <reference path="../base.ts" />

namespace android.test {
    'use strict';
    import Point = android.graphics.Point;
    export class RotateRect {
        public angle: number;
        public centerx: number;
        public centery: number;
        public width: number;
        public height: number;
        public points: Point[];
        constructor(centerx: number, centery: number, width: number, height: number, angle: number) {
            this.angle = angle;
            this.centerx = centerx;
            this.centery = centery;
            this.width = width;
            this.height = height;
            this.points = [new Point(), new Point(), new Point(), new Point(), new Point(), new Point(), new Point(), new Point(), new Point()];
            let lt = this.points[0];
            let rt = this.points[1];
            let rb = this.points[2];
            let lb = this.points[3];
            let ct = this.points[4];
            let cb = this.points[5];

            let cl = this.points[6];
            let cr = this.points[7];

            cr.x = this.centerx + Math.cos(this.angle) * this.width / 2;
            cr.y = this.centery + Math.sin(this.angle) * this.width / 2;

            cl.x = 2 * this.centerx - cr.x;
            cl.y = 2 * this.centery - cr.y;

            rt.x = cr.x + Math.sin(this.angle) * this.height / 2;
            rt.y = cr.y - Math.cos(this.angle) * this.height / 2;
            rb.x = 2 * cr.x - rt.x;
            rb.y = 2 * cr.y - rt.y;

            lb.x = cl.x - Math.sin(this.angle) * this.height / 2;
            lb.y = cl.y + Math.cos(this.angle) * this.height / 2;

            lt.x = 2 * cl.x - lb.x;
            lt.y = 2 * cl.y - lb.y;

            cb.x = (lb.x + rb.x)/2;
            cb.y = (lb.y + rb.y)/2;
            ct.x = (lt.x + rt.x)/2;
            ct.y =(lt.y + rt.y)/2;

            let center = this.points[8];
            center.x = this.centerx;
            center.y = this.centery;


        }
        get raidius(): number {
            return Math.sqrt(Math.pow(this.center.x - this.leftTop.x, 2) + Math.pow(this.center.y - this.leftTop.y, 2));
        }
        public offset(x: number, y: number, angle: number) {
            for (var i = 0; i < this.points.length; ++i) {
                var pt: Point = this.points[i];
                pt.x += x * Math.cos(angle);
                pt.y += y * Math.sin(angle);
            }
        }
        get leftTop(): Point {
            return this.points[0];
        }
        get rightTop(): Point {
            return this.points[1];
        }
        get leftBottom(): Point {
            return this.points[3];
        }
        get rightBottom(): Point {
            return this.points[2];
        }

        get centerTop(): Point {
            return this.points[4];
        }
        get centerBottom(): Point {
            return this.points[5];
        }
        get center(): Point {
            return this.points[8];
        }
        get startPoint(): Point {
            return new Point(this.centerx, this.centery);
        }


    }
    export class RotateLine {
        public startPoint: Point;
        public endPoint: Point;
        private _angle: number;
        private _cx: number;
        private _cy: number;
        private _leftwidth: number;
        private _rightwidth: number;
        constructor(cx: number, cy: number, leftwidth: number, rightwidth: number, angle: number) {
            this._cx = cx;
            this._cy = cy;
            this._leftwidth = leftwidth;
            this._rightwidth = rightwidth;
            this._angle = angle;
            this.endPoint = new Point();
            this.endPoint.x = cx + Math.sin(this._angle) * rightwidth;
            this.endPoint.y = cy - Math.cos(this._angle) * rightwidth;
            this.startPoint = new Point();
            this.startPoint.x = cx - Math.sin(this._angle) * leftwidth;
            this.startPoint.y = cy + Math.cos(this._angle) * leftwidth;
        }

    }
}