
/// <reference path="Rect.ts" />

namespace android.graphics {

    import Rect = android.graphics.Rect;

    export enum Gravity {
        Left,
        Center,
        Right,
        Top,
        Bottom,
        Auto,
    }

    export class Padding {
        leftPadding: number;
        rightPadding: number;
        topPadding: number;
        bottomPadding: number;
        constructor(padding?: number) {
            if (padding) {
                this.padding = padding;
            } else {
                this.padding = 0;
            }
        }
        set padding(padding: number) {
            this.leftPadding = this.rightPadding = this.topPadding = this.bottomPadding = padding;
        }
    }

    export enum Position {
        Left,
        Top,
        Right,
        Bottom
    }

    export enum Orientation {
        Horizontal,
        Vertical
    }

    export class StrokeStyle {

        strokeWidth: number;
        strokeColor: string;
        dash:number[];
        dashOffset:number;
        constructor(strokewidth: number, strokecolor: string,dash?:number[],dashoffset?:number) {
            this.strokeWidth = strokewidth;
            this.strokeColor = strokecolor;
            if(dash != null && dash instanceof Array && dash.length > 0){
                this.dash = dash;
                if(dashoffset != null && !isNaN(dashoffset)){
                    this.dashOffset = dashoffset;
                }
            }
        }
        getCssStyle() {
            return {
                'stroke-width': this.strokeWidth,
                'stroke': this.strokeColor
            }
        }
        clone() {
            return new StrokeStyle(this.strokeWidth, this.strokeColor)
        }
    }

    export class Font {
        constructor(fz: number, fm: string, fc: string) {
            this.fontSize = fz;
            this.fontFamily = fm;
            this.fontColor = fc;
            if (!this.fontFamily || this.fontFamily === "") {
                this.fontFamily = 'Arial';
            }
        }
        fontSize: number;
        fontFamily: string;
        fontColor: string;
        toString() {
            return " fontSize = " + this.fontSize + ", fontFamily = " + this.fontFamily + ", fontColor = " + this.fontFamily;
        }
        public clone(): Font {
            return new Font(this.fontSize, this.fontFamily, this.fontColor);
        }
    }

    export class Style {
        constructor(bg: string | FillStyle, stroke: StrokeStyle) {
            this.background = bg;
            this.strokeStyle = stroke;
        }
        background: string | FillStyle;
        strokeStyle: StrokeStyle;
    }

    export class Gradient {
        public colors:{offset:number,color:string}[] =[];
        constructor(colors:{offset:number,color:string}[]){
            this.colors = colors;
        }
    }

    export class LinearGradient extends Gradient {
        public startx: number;
        public starty: number;
        public endx:number;
        public endy:number;
        constructor(sx:number,sy:number,ex:number,ey:number,colors:{offset:number,color:string}[]){
            super(colors);
            this.startx =sx;
            this.starty =sy;
            this.endx = ex;
            this.endy = ey;

        }
    }

    export class RadialGradient extends Gradient {
        public centerx:number;
        public centery:number;
        public radius:number
        
        public centerx1:number;
        public centery1:number;
        public radius1:number;
        constructor(cx:number,cy:number,r:number,cx1:number,cy1:number,r1:number,colors:{offset:number,color:string}[]){
            super(colors);
            this.centerx =cx;
            this.centery = cy;
            this.radius = r;
            this.centerx1 =cx1;
            this.centery1 = cy1;
            this.radius1 = r1;
            
        }
    }

    export class Shadow {
        offsetx: number;
        offsety: number;
        color: string;
        blur: number;
    }

    export class FillStyle {
        public fill: Gradient | string;
        public shadow: Shadow;
        constructor() {
            this.fill = 'transparent';
        }
    }

    export class Util {
        static cloneDeep(object: any): any {
            if ((object == null) ||
                (typeof object === 'number') ||
                (typeof object === 'string') ||
                (typeof object === 'boolean')) {
                return object;
            } else if (Array.isArray(object)) {
                let items = [];
                for (let item of object) {
                    items.push(Util.cloneDeep(item));
                }
                return items;
            }
            else if (object instanceof Date) {
                return new Date(object.getTime());
            } else {
                let cloneObject: any = {};
                for (let key in object) {
                    if (typeof object[key] == 'function') {
                        cloneObject[key] = object[key];
                    } else {
                        cloneObject[key] = Util.cloneDeep(object[key]);
                    }
                }
                return cloneObject;
            }
        }

        static contains(rect: Rect, pt: Point): boolean {
            if (pt.x <= rect.right && pt.x >= rect.left && pt.y <= rect.bottom && pt.y >= rect.top) {
                return true;
            }
            return false;
        }
        static getRect(start: Point, size: Size): Rect {
            let rect: Rect = new Rect(start.x, start.y, start.x + size.width, start.y + size.height);
            return rect;
        }
        static getStyleCss(style: Style) {
            return {

                "fill": style.background,
                "stroke": style.strokeStyle ? style.strokeStyle.strokeColor : "",
                "stroke-width": style.strokeStyle ? style.strokeStyle.strokeWidth : 0
            }
        }
        static union(...rects: Rect[]): Rect {
            let rect: Rect = new android.graphics.Rect(0, 0, 0, 0);
            rect.left = Math.min.apply(this, rects.map(e => e.left));
            rect.top = Math.min.apply(this, rects.map(e => e.top));
            rect.right = Math.max.apply(this, rects.map(e => e.right));
            rect.bottom = Math.max.apply(this, rects.map(e => e.bottom));
            return rect;
        }

        static hexToRgb(hex) {

            var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            hex = hex.replace(shorthandRegex, function (m, r, g, b) {
                return r + r + g + g + b + b;
            });

            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }

        static rgbToHex(r, g, b) {
            return "#" + Util.componentToHex(r) + Util.componentToHex(g) + Util.componentToHex(b);
        }
        static componentToHex(c) {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }
        static asEnum(value: number, enumType: any, nullOK = false): number {
            if (value == null && nullOK) return null;
            var e = enumType[value];
            return typeof (e) === 'number' ? e : value;
        }
        static isMixed(r1: Rect, r2: Rect): boolean {
            var ismixed: boolean = false;
            if (Math.abs((r1.left + r1.right) / 2 - (r2.left + r2.right) / 2)
                < ((r1.right + r2.right - r1.left - r2.left) / 2) && Math.abs((r1.top + r1.bottom) / 2
                    - (r2.top + r2.bottom) / 2) < ((r1.bottom + r2.bottom - r1.top - r2.top) / 2)) {
                ismixed = true;
            }
            return ismixed;
        }

        static containsRect(r1: Rect, r2: Rect): boolean {
            let flg: boolean = r1.left <= r2.left &&
                r1.top <= r2.top &&
                r1.right >= r2.right &&
                r1.bottom >= r2.bottom;
            return flg;
        }

        // let flg1:boolean = r1.left <=r2.left &&
        // r1.top <= r2.top &&
        // r1.right >=r2.right &&
        // r1.bottom >= r2.bottom;


        static IsPointInPolygon(p: Point, polygon: Point[]): boolean {
            let minX = polygon[0].x;
            let maxX = polygon[0].x;
            let minY = polygon[0].y;
            let maxY = polygon[0].y;
            for (let i = 1; i < polygon.length; i++) {
                let q: Point = polygon[i];
                minX = Math.min(q.x, minX);
                maxX = Math.max(q.x, maxX);
                minY = Math.min(q.y, minY);
                maxY = Math.max(q.y, maxY);
            }

            if (p.x < minX || p.x > maxX || p.y < minY || p.y > maxY) {
                return false;
            }

            // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
            let inside: boolean = false;
            for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
                if ((polygon[i].y > p.y) != (polygon[j].y > p.y) &&
                    p.x < (polygon[j].x - polygon[i].x) * (p.y - polygon[i].y) / (polygon[j].y - polygon[i].y) + polygon[i].x) {
                    inside = !inside;
                }
            }

            return inside;
        }


        static IsPointInPolygon2(p: Point, xs: number[], ys: number[]): boolean {
            let minX = xs[0];
            let maxX = xs[0];
            let minY = ys[0];
            let maxY = ys[0];
            for (let i = 1; i < xs.length; i++) {
                // let q: Point = polygon[i];
                minX = Math.min(xs[i], minX);
                maxX = Math.max(xs[i], maxX);
                minY = Math.min(ys[i], minY);
                maxY = Math.max(ys[i], maxY);
            }

            if (p.x < minX || p.x > maxX || p.y < minY || p.y > maxY) {
                return false;
            }

            let inside: boolean = false;
            for (let i = 0, j = xs.length - 1; i < xs.length; j = i++) {
                if ((ys[i] > p.y) != (ys[j] > p.y) &&
                    p.x < (xs[j] - xs[i]) * (p.y - ys[i]) / (ys[j] - ys[i]) + xs[i]) {
                    inside = !inside;
                }
            }

            return inside;
        }

        static Point2Line(x1: number, y1: number, x2: number, y2: number, x0: number, y0: number): number {

            let space: number = 0;

            let a: number, b: number, c: number;

            a = Util._lineSpace(x1, y1, x2, y2);

            b = Util._lineSpace(x1, y1, x0, y0);

            c = Util._lineSpace(x2, y2, x0, y0);

            if (c + b == a) {
                space = 0;
                return space;
            }
            if (a <= 0.000001) {
                space = b;
                return space;
            }
            if (c * c >= a * a + b * b) {
                space = b;
                return space;
            }
            if (b * b >= a * a + c * c) {
                space = c;
                return space;
            }
            let p: number = (a + b + c) / 2;
            let s: number = Math.sqrt(p * (p - a) * (p - b) * (p - c));
            space = 2 * s / a;
            return space;
        }
        /**
      * @hidden
      */
        private static _lineSpace(x1: number, y1: number, x2: number, y2: number) {
            let lineLength: number = 0;
            lineLength = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
            return lineLength;
        }


        static Area(xs: number[], ys: number[]) {
            let area = 0.00;
            for (let i = 0; i < xs.length; i++) {
                if (i < xs.length - 1) {
                    area += xs[i] * ys[i + 1] - xs[i + 1] * ys[i];
                } else {
                    area += xs[i] * ys[0] - xs[0] * ys[i];
                }
            }
            area = area / 2.00;
            return area;
        }



        static CenterOfPolygon(xs: number[], ys: number[]): Point {
            let area = 0.0;//多边形面积  
            let Gx = 0.0, Gy = 0.0;// 重心的x、y  
            for (let i = 1; i <= xs.length; i++) {
                let iLat = xs[(i % xs.length)];
                let iLng = ys[(i % ys.length)];
                let nextLat = xs[((i - 1) % xs.length)];
                let nextLng = ys[((i - 1) % ys.length)];
                let temp = (iLat * nextLng - iLng * nextLat) / 2.0;
                area += temp;
                Gx += temp * (iLat + nextLat) / 3.0;
                Gy += temp * (iLng + nextLng) / 3.0;
            }
            Gx = Gx / area;
            Gy = Gy / area;
            return new Point(Gx, Gy);
        }


        static HashCode(obj:number|string|any):string{
            if(obj == null){return '';}
            if(obj instanceof Object){
                let hash:string = '';
                for(let key in obj){
                    hash = hash+Util.HashCode(key)+Util.HashCode(obj[key]);
                }
                return Util.HashCodeString(hash);
            }else if(typeof obj =='string') {
                return Util.HashCodeString(obj);
            }else if(typeof obj == 'number'){
                return Util.HashCodeString('number'+obj);
            }else if(typeof obj =='boolean'){
                return Util.HashCodeString('boolean'+obj);
            }
            return null;
        }

        static HashCodeString(obj:string):string{
            let hash = 0,i ,chr;
            if(obj== null || obj.length === 0){return hash+'';}
            for(i = 0; i < obj.length; ++i){
                chr = obj.charCodeAt(i);
                hash = ((hash << 5) - hash) + chr;
                hash |= 0;
            }
            return hash+'';
        }


        static createPtsFromRect(rect:Rect,size:number):{xs:number[],ys:number[]}{
            let xs:number[]=[];
            let ys:number[]=[];
            let pts:Point[] = [new Point(rect.left,rect.top),new Point(rect.right,rect.top),new Point(rect.right,rect.bottom),new Point(rect.left,rect.bottom),new Point(rect.left,rect.top)];
            for(let i = 0; i < pts.length-1; ++i){
                let p1=pts[i];
                let p2=pts[i+1];
                for(let j = 0; j < size/4;++j){
                    xs.push(p1.x+ (p2.x-p1.x)/(size/4) *j);
                    ys.push(p1.y+ (p2.y-p1.y)/(size/4) *j);
                }
            }
            return {xs:xs,ys:ys};
        }

        static createPtsFromCircle(raidius:number,center:Point,size:number):{xs:number[],ys:number[]}{
            let xs:number[]=[];
            let ys:number[]=[];
            let pi:number = Math.PI;
            for(let i =0; i <size; ++i){
                let angle:number = 360/size * i / pi;
                let x:number = Math.sin(angle) * raidius + center.x;
                let y:number = Math.cos(angle) * raidius + center.y;
                xs.push(x);
                ys.push(y);
            }
            return {xs:xs,ys:ys};
        }

        static createPtsFromRadialBar(startAngle:number,endAngle:number,radius:number,innerRadius:number,center:Point,size:number):{xs:number[],ys:number[]}{
            let xs:number[]=[];
            let ys:number[]=[];
            let innerxs:number[]=[];
            let innerys:number[]=[];
            let pi:number = Math.PI;
            let currentSize:number = size;
            let step:number = (endAngle-startAngle)/(currentSize / 2);
            for(let angle:number = startAngle ; angle < endAngle && xs.length <= currentSize/2; angle+=step){

                let x:number = Math.cos(angle) * radius + center.x;
                let y:number = Math.sin(angle) * radius + center.y;
                let ix:number = Math.cos(angle) * innerRadius+ center.x;
                let iy:number = Math.sin(angle) * innerRadius+ center.y;
                xs.push(x);
                ys.push(y);
                innerxs.push(ix);
                innerys.push(iy);
            }
            
            while(xs.length + innerxs.length >size){
                xs.splice(1,1);
            }
            
            xs = xs.concat(innerxs.reverse());
            ys = ys.concat(innerys.reverse());
            if(size !== xs.length ){
                console.log(" error size  " + size +" xs size " + xs.length);
            }
            return {xs:xs,ys:ys};
        }


    }
}
