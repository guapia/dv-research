/// <reference path="Point.ts" />

namespace android.graphics {

    import Point = android.graphics.Point;
    export class Rect {
        left: number;
        top: number;
        right: number;
        bottom: number;
        private _startpoint: Point;
        private _endpoint: Point;

        constructor(left: number, top: number, right: number, bottom: number) {
            this.left = left;
            this.top = top;
            this.right = right;
            this.bottom = bottom;
        }
        reset(left: number, top: number, right: number, bottom: number) {
            this.left = left;
            this.top = top;
            this.right = right;
            this.bottom = bottom;
            return this;
        }
        get center():Point{
            return new Point(this.left + this.width/2,this.top+this.height/2);
        }
        public correct() {
            if (this.left > this.right) {
                var l: number = this.left;
                this.left = this.right;
                this.right = l;
            }
            if (this.top > this.bottom) {
                var t = this.top;
                this.top = this.bottom;
                this.bottom = t;
            }
        }
        public translate(x: number, y: number) {
            this.left += x;
            this.right += x;
            this.top += y;
            this.bottom += y;
            return this;
        }
        public translateX(x: number) {
            this.translate(x, 0);
            return this;
        }
        public translateY(y: number) {
            this.translate(0, y);
            return this;
        }
        public scale(r: number) {
            // if (r < 1 && r > 0) {
            //     var w = this.right - this.left;
            //     var h = this.bottom - this.top;
            //     this.left += r * w / 2;
            //     this.top += r * h / 2;
            //     this.right -= r * w / 2;
            //     this.bottom -= r * h / 2;
            // } else {
            //     this.left += r;
            //     this.top += r;
            //     this.right -= r;
            //     this.bottom -= r;
            // }
            if(r > 0){
                let dw:number = this.width *r-this.width;
                let dh:number = this.height * r - this.height;
                this.left -= dw/2;
                this.right += dw/2;
                this.top -= dh/2;
                this.bottom += dh/2;
            }
            return this;
        }

        get isNil() {
            return (this.right - this.left <= 0.01) ||
                (this.bottom - this.top <= 0.01);
        }
        get height() {
            return ((this.bottom - this.top));
        }
        get width() {
            return ((this.right - this.left));
        }
        set width(width: number) {
            this.right = this.left + width;

        }
        set height(height: number) {
            this.bottom = this.top + height;

        }
        get startPoint(): Point {
            if (!this._startpoint) { this._startpoint = new Point(this.left, this.top); }
            this._startpoint.x = this.left;
            this._startpoint.y = this.top;
            return this._startpoint;
        }
        get endPoint(): Point {
            if (!this._endpoint) { this._endpoint = new Point(this.right, this.bottom); }
            this._endpoint.x = this.right;
            this._endpoint.y = this.bottom;
            return this._endpoint;
        }
        contains(x: number, y: number) {
            if (x <= this.right && x >= this.left && y <= this.bottom && y >= this.top) {
                return true;
            }
            return false;
        }
        clone(): Rect {
            return new Rect(this.left, this.top, this.right, this.bottom);
        }
        equal(rect:Rect):boolean{
            if(rect != null){
                return rect.left === this.left && rect.top === this.top && rect.bottom === this.bottom && rect.right === this.right;
            }
            return false;
        }
        toString():string{
            return "< left:"+this.left+" ,top:"+this.top+" , width:"+this.width+" ,height:"+this.height+" >";
        }

    }

}