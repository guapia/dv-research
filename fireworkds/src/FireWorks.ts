/// <reference path="../libs/android.d.ts" />



namespace test {
    'use strict';
    const Color: string[] = ['rgb(251, 118, 123)', 'rgb(129, 227, 238)', '#88bde6', '#fbb258', '#90cd97', '#f6aac9', '#bfa554', '#bc99c7', '#eddd46', '#f07e6e', '#8c8c8c'];
    import Context = android.app.Context;
    import View = android.view.View;
    import Canvas = android.graphics.Canvas;
    import Animation = android.view.animation.Animation;
    import AnimationEase = android.view.animation.AnimationEase;
    import ViewGroup = android.view.ViewGroup;
    import RootView = android.widget.RootView;
    import Util = android.graphics.Util;
    import RenderType = android.graphics.RenderType;
    import FrameLayout = android.widget.FrameLayout;
    import MeasureSpec = android.view.MeasureSpec;
    import Size = android.graphics.Size;
    import layoutParams = android.view.LayoutParams;
    export class Point {
        x = 0; y = 0;
        constructor(x?: number, y?: number) {
            if (x != null) {
                this.x = x;
            }
            if (y != null) {
                this.y = y;
            }
        }
    }

    export class FireWorksBombView extends View {
        public xs: number[];
        public ys: number[];
        public renderXs: number[];
        public renderYs: number[];
        public alpha: number = 1;
        constructor(c:Context,cx: number, cy: number, angle: number, radius: number) {
            super(c);
            let xs: number[] = [], ys: number[] = [];
            xs[0] = cx;
            ys[0] = cy;
            xs[1] = Math.cos(angle) * radius + cx;
            ys[1] = Math.sin(Math.random() * Math.PI) * Math.sin(angle) * radius + cy;
            xs[2] = xs[1];
            ys[2] = cy + radius;
            xs[3] = xs[2];
            ys[3] = ys[2] + radius +Math.random()*20;
            let startPt: Point = new Point(xs[0], ys[0]);
            let endPt: Point = new Point(xs[1], ys[1]);
            let spline = new Spline(xs, ys);
            let result: { xs: number[], ys: number[] } = spline.calculate();
            this.xs = result.xs;
            this.ys = result.ys;
            let linexs: number[] = [];
            let lineys: number[] = [];
            this.xs = linexs.concat(this.xs);
            this.ys = lineys.concat(this.ys);
            this.renderXs = [];
            this.renderYs = [];

        }
        onMeasure(width:MeasureSpec,height:MeasureSpec,canvas:Canvas):Size{
            return super.onMeasure(width,height,canvas);
        }
        onLayout(l:number,t:number,r:number,b:number,canvas:Canvas):void{
            super.onLayout(l,t,r,b,canvas);
        }
        onDraw(context: Canvas): void {
            // super.onDraw(context);
            let index: number =parseInt(this.id);//Math.floor(Math.random() * 100);
            
            let radius: number = 2;
            let len = this.renderYs.length;
            let canvas = context.canvas;
            canvas.save();
            canvas.globalAlpha = this.alpha;
            canvas.fillStyle = Color[index % Color.length];
            canvas.beginPath();
            canvas.arc(this.renderXs[len - 1], this.renderYs[len - 1], radius, 0, 2 * Math.PI);
            let resultxs = [];
            let resultys = [];
            var nextx: number = 0;
            var nexty: number = 0;
            var lasta: number = 0;
            let padding: number = 5;
            for (var i = 0; i < this.renderXs.length; ++i) {
                padding = i / this.renderXs.length * radius;
                var x = this.renderXs[i];
                var y = this.renderYs[i];
                var nextx = x;
                var nexty = y;
                var a: number = lasta;
                if (i + 1 < this.renderXs.length) {
                    nextx = this.renderXs[i + 1];
                    nexty = this.renderYs[i + 1];
                    a = Math.atan((nexty - y) / (nextx - x));
                    lasta = a;
                }
                var xoffset = padding * Math.sin(a)
                var yoffset = padding * Math.cos(a);
                resultxs[2 * i] = x + xoffset;
                resultys[2 * i] = y - yoffset;
                resultxs[2 * i + 1] = nextx + xoffset;
                resultys[2 * i + 1] = nexty - yoffset;
                resultxs[4 * len - 2 * i - 2] = nextx - xoffset;
                resultys[4 * len - 2 * i - 2] = nexty + yoffset;
                resultxs[4 * len - 2 * i - 1] = x - xoffset;
                resultys[4 * len - 2 * i - 1] = y + yoffset;
            }
            canvas.moveTo(resultxs[0], resultys[0]);
            for (let i = 0; i < resultxs.length; ++i) {
                canvas.lineTo(resultxs[i], resultys[i]);
            }

            //  ctx.stroke();
            canvas.fill();
            canvas.closePath();
            canvas.restore();
        }
    }

    export class FireWorksBombView2 extends View {
        public xs: number[];
        public ys: number[];
        public renderXs: number[];
        public renderYs: number[];
        public alpha: number = 1;
        constructor(c:Context,cx: number, cy: number, angle: number, radius: number) {

                super(c);

            // let xs:number[];
            // let ys:number[];
            this.xs = [];
            this.ys = [];

            // xs[0]= cx;
            // ys[0] =cy;
            let ex = Math.cos(angle) * radius + cx;
            let ey = Math.sin(Math.random() * Math.PI) * Math.sin(angle) * radius + cy;
            let dx: number = ex - cx;
            let dy: number = ey - cy;
            let size: number = 100;
            let stepx: number = dx / size;
            let stepy: number = dy / size;
            for (let i = 0; i < size; ++i) {
                this.xs.push(cx + stepx * i);
                this.ys.push(cy + stepy * i);
            }
            this.renderXs = [];
            this.renderYs = [];

        }  onMeasure(width:MeasureSpec,height:MeasureSpec,canvas:Canvas):Size{
            return super.onMeasure(width,height,canvas);
        }
        onLayout(l:number,t:number,r:number,b:number,canvas:Canvas):void{
            super.onLayout(l,t,r,b,canvas);
        }

        onDraw(context: Canvas): void {
            // super.onDraw(context);
            let index: number = parseInt(this.id);//Math.floor(Math.random() * 100);
            let radius: number = 2;
            let len = this.renderYs.length;
            let canvas = context.canvas;
            canvas.save();
            canvas.globalAlpha = this.alpha;
            canvas.fillStyle = Color[index % Color.length];
            canvas.beginPath();
            canvas.arc(this.renderXs[len - 1], this.renderYs[len - 1], radius, 0, 2 * Math.PI);
            let resultxs = [];
            let resultys = [];
            var nextx: number = 0;
            var nexty: number = 0;
            var lasta: number = 0;
            let padding: number = 5;
            for (var i = 0; i < this.renderXs.length; ++i) {
                padding = i / this.renderXs.length * radius;
                var x = this.renderXs[i];
                var y = this.renderYs[i];
                var nextx = x;
                var nexty = y;
                var a: number = lasta;
                if (i + 1 < this.renderXs.length) {
                    nextx = this.renderXs[i + 1];
                    nexty = this.renderYs[i + 1];
                    a = Math.atan((nexty - y) / (nextx - x));
                    lasta = a;
                }
                var xoffset = padding * Math.sin(a)
                var yoffset = padding * Math.cos(a);
                resultxs[2 * i] = x + xoffset;
                resultys[2 * i] = y - yoffset;
                resultxs[2 * i + 1] = nextx + xoffset;
                resultys[2 * i + 1] = nexty - yoffset;
                resultxs[4 * len - 2 * i - 2] = nextx - xoffset;
                resultys[4 * len - 2 * i - 2] = nexty + yoffset;
                resultxs[4 * len - 2 * i - 1] = x - xoffset;
                resultys[4 * len - 2 * i - 1] = y + yoffset;
            }
            canvas.moveTo(resultxs[0], resultys[0]);
            for (let i = 0; i < resultxs.length; ++i) {
                canvas.lineTo(resultxs[i], resultys[i]);
            }
            canvas.fill();
            canvas.closePath();
            canvas.restore();
        }
    }
    export class FireAnimation extends Animation {
        private xs: number[];
        private ys: number[];
        constructor() {
            super();
            this.ease = new AnimationEase();
        }

        applyTransformation(interpolatedTime: number, canvas: Canvas, view: View) {
            let scale: number = this.from + (this.to - this.from) * interpolatedTime;

            let index: number = Math.floor((this.xs.length - 1) * scale);
            if (view instanceof FireWorksBombView || view instanceof FireWorksBombView2) {
                view.alpha = 1 - scale * 0.8;
                let size: number = 30;
                if (this.xs.length - 1 < index + size) {
                    size = this.xs.length - index - 1;
                }
                view.renderXs = this.xs.slice(index, index + size);
                view.renderYs = this.ys.slice(index, index + size);
            }
        }
        onStartAniamtion(canvas: Canvas, view: View): void {
            super.onStartAniamtion(canvas,view);
            if (view instanceof FireWorksBombView || view instanceof FireWorksBombView2) {
                this.xs = view.xs.slice(0);
                this.ys = view.ys.slice(0);
            }
            // console.log("onStartAnimation ");
            // console.log(this.xs);

        }
        onEndAnimation(canvas: Canvas, view: View): void {
            super.onEndAnimation(canvas,view);
            if (view instanceof FireWorksBombView || view instanceof FireWorksBombView2) {
                view.renderXs = [];
                view.renderYs = [];
            }
            // console.log("onEndAnimation ");
            // console.log(this.xs);
        }
    }

    export class FireWorksContainer extends FrameLayout {
        renderX: number;
        renderY: number;
        x: number;
        y: number;
        h: number;
        constructor(c:Context) {
            super(c);
        }
        onMeasure(width:MeasureSpec,height:MeasureSpec,canvas:Canvas):Size{
            return super.onMeasure(width,height,canvas);
        }
        onLayout(l:number,t:number,r:number,b:number,canvas:Canvas):void{
            super.onLayout(l,t,r,b,canvas);
        }

        onDraw(context: Canvas): void {
            // super.onDraw(context);
            if (this.renderX == null || this.renderY == null) {
                return;
            }
            let index: number = parseInt(this.id);

            let radius: number = 5;
            let canvas = context.canvas;
            canvas.save();
            canvas.fillStyle = Color[index % Color.length];
            canvas.beginPath();
            canvas.arc(this.renderX, this.renderY, radius, 0, 2 * Math.PI);
            let resultxs = [];
            let resultys = [];
            var nextx: number = 0;
            var nexty: number = 0;
            var lasta: number = 0;
            let padding: number = 5;
            resultxs[0] = this.renderX - radius;
            resultys[0] = this.renderY;
            resultxs[1] = this.renderX + radius;
            resultys[1] = this.renderY;
            resultxs[2] = this.renderX;
            resultys[2] = this.renderY + 100;
            canvas.moveTo(resultxs[0], resultys[0]);
            for (let i = 0; i < resultxs.length; ++i) {
                canvas.lineTo(resultxs[i], resultys[i]);
            }
            canvas.fill();
            canvas.closePath();
            canvas.restore();
        }
    }

    export class LineAnimation extends Animation {
        private x: number;
        private y: number;
        constructor() {
            super();
            let index = Math.floor(Math.random() * 10);
            if (index % 3 == 0) {
                this.ease = new PolyOutEase();
            } else if (index % 3 == 1) {
                this.ease = new PolyInEase();
            } else {
                this.ease = new AnimationEase();
            }

        }

        applyTransformation(interpolatedTime: number, canvas: Canvas, view: View) {
            let scale: number = this.from + (this.to - this.from) * interpolatedTime;
            if (view instanceof FireWorksContainer) {
                view.renderX = this.x;//+Math.random()*10-5;
                view.renderY = this.y - view.h * scale;
            }

        }
        onStartAniamtion(canvas: Canvas, view: View): void {
            super.onStartAniamtion(canvas,view);
            if (view instanceof FireWorksContainer) {
                this.x = view.x;
                this.y = view.y;
            }

        }
        onEndAnimation(canvas: Canvas, view: View): void {
            super.onEndAnimation(canvas,view);
            if (view instanceof FireWorksContainer) {
                view.renderX = null;// this.x;
                view.renderY = null;//this.y;
            }
        }
    }
    export class FireLayout extends RootView {
        constructor(c:android.app.Context) {
            super(c);
        }

        attachElement(element: HTMLElement, renderType:RenderType) {
            super.attachElement(element,Util.asEnum(renderType,RenderType));
        }
        init() {
            this.clip =false;
            for (let m = 0; m < 30; ++m) {
                let size: number = 200;
                let startAngle: number = 0;//*Math.PI/180;
                let endAngle: number = 360;// * Math.PI/180;
                let constcx: number = 400 + Math.random() * 300 - 150;
                let constcy: number = 200;
                let radius: number = 200 + Math.random() *200;
                let fireWorksContainer: FireWorksContainer = new FireWorksContainer(this.getContext());
                fireWorksContainer.layoutParams.width = layoutParams.MATCH_PARENT;
                fireWorksContainer.layoutParams.height = layoutParams.MATCH_PARENT;
                fireWorksContainer.h = 600;
                fireWorksContainer.x = constcx;
                fireWorksContainer.y = constcy + fireWorksContainer.h;
                for (let i = 0; i < size; ++i) {
                    let angle: number = (startAngle + (endAngle - startAngle) / size * i) * Math.PI / 180;
                    let xs: number[] = [];
                    let ys: number[] = [];
                    let cx = constcx;//+ Math.random() * 20;
                    let cy = constcy;//+ Math.random() * 20;
                    if (m % 2 == 0) {
                        let fire: FireWorksBombView2 = new FireWorksBombView2(this.getContext(),cx, cy, angle, radius + Math.random() * 100);
                        fire.layoutParams.width = 100;
                        fire.layoutParams.height = 100;
                        // let fire: FireWorksBombView = new FireWorksBombView(cx, cy, angle, radius);
                        fire.id = Math.floor(Math.random() * 100)+"";
                        fireWorksContainer.addView(fire);
                    } else {
                        let fire: FireWorksBombView = new FireWorksBombView(this.getContext(),cx, cy, angle, radius);
                        fire.layoutParams.width = 100;
                        fire.layoutParams.height = 100;
                        fire.id = Math.floor(Math.random() * 100)+"";
                        fireWorksContainer.addView(fire);
                    }
                }
                this.addView(fireWorksContainer,0);
                fireWorksContainer.id = Math.floor(Math.random() * 100)+"";
            }
        }


        animationTest() {
            let index:number = 0
            for (let view of this.children) {
                index++;
                setTimeout(() => {
                    if (view instanceof FireWorksContainer) {
                        let fireWorksContainer: FireWorksContainer = view;
                        let animation1: LineAnimation = new LineAnimation();
                        animation1.duration = 1000 + Math.random() * 1000;
                        animation1.from = 0;
                        animation1.to = 1;
                        fireWorksContainer.startAnimation(animation1);
                        let oldanimationEnd = animation1.onEndAnimation;
                        animation1.setAnimationCallBack(null,( view: View) => {
                        // console.log("on Line Animation end  ===");
                            // for (let view of fireWorksContainer.children) {
                            //     let animation = new FireAnimation();
                            //     animation.duration = Math.random() * 1000 + 2000;
                            //     animation.from = 0;
                            //     animation.to = 1;
                            //     view.startAnimation(animation);
                            // }
                            for(let i =0; i < fireWorksContainer.getChildCount(); ++i){
                                let child = fireWorksContainer.getChildAt(i);
                                let animation = new FireAnimation();
                                    animation.duration = Math.random() * 1000 + 2000;
                                    animation.from = 0;
                                    animation.to = 1;
                                    child.startAnimation(animation);
                            }
                        });
                    }
                }, index*(1000+Math.random()*1000));
            }

        }
    }


    export class Spline {
        // 
        private k = 0.002;

        private _x: number[];
        private _y: number[];

        private _a: Point[] = [];
        private _b: Point[] = [];
        private _c: Point[] = [];
        private _d: Point[] = [];

        private _len: number;

        //  T^3     -1     +3    -3    +1     /
        //  T^2     +2     -5     4    -1    /
        //  T^1     -1      0     1     0   /  2
        //  T^0      0      2     0     0  /

        private m = [
            [-1 * 0.5, +3 * 0.5, -3 * 0.5, +1 * 0.5],
            [+2 * 0.5, -5 * 0.5, +4 * 0.5, -1 * 0.5],
            [-1 * 0.5, 0, +1 * 0.5, 0],
            [0, +2 * 0.5, 0, 0],
            // [1,0,0,0],
            // [-3,3,0,0],
            // [3,-6,3,0],
            // [-1,3,-3,1]
        ];

        constructor(x: number[], y: number[]) {
            this._x = x;
            this._y = y;

            var len = this._len = Math.min(x.length, y.length);

            if (len > 3) {
                for (var i = 0; i < len - 1; i++) {
                    var p1 = (i == 0) ? new Point(x[i], y[i]) : new Point(x[i - 1], y[i - 1]);
                    var p2 = new Point(x[i], y[i]);
                    var p3 = new Point(x[i + 1], y[i + 1]);
                    var p4 = (i == len - 2) ? new Point(x[i + 1], y[i + 1]) : new Point(x[i + 2], y[i + 2]);

                    var a = new Point();
                    var b = new Point();
                    var c = new Point();
                    var d = new Point();

                    a.x = p1.x * this.m[0][0] + p2.x * this.m[0][1] + p3.x * this.m[0][2] + p4.x * this.m[0][3];
                    b.x = p1.x * this.m[1][0] + p2.x * this.m[1][1] + p3.x * this.m[1][2] + p4.x * this.m[1][3];
                    c.x = p1.x * this.m[2][0] + p2.x * this.m[2][1] + p3.x * this.m[2][2] + p4.x * this.m[2][3];
                    d.x = p1.x * this.m[3][0] + p2.x * this.m[3][1] + p3.x * this.m[3][2] + p4.x * this.m[3][3];

                    a.y = p1.y * this.m[0][0] + p2.y * this.m[0][1] + p3.y * this.m[0][2] + p4.y * this.m[0][3];
                    b.y = p1.y * this.m[1][0] + p2.y * this.m[1][1] + p3.y * this.m[1][2] + p4.y * this.m[1][3];
                    c.y = p1.y * this.m[2][0] + p2.y * this.m[2][1] + p3.y * this.m[2][2] + p4.y * this.m[2][3];
                    d.y = p1.y * this.m[3][0] + p2.y * this.m[3][1] + p3.y * this.m[3][2] + p4.y * this.m[3][3];

                    this._a.push(a);
                    this._b.push(b);
                    this._c.push(c);
                    this._d.push(d);
                }
            }
        }

        private calculatePoint(val: number): any {
            var i = Math.floor(val);

            if (i < 0) {
                i = 0;
            }

            if (i > this._len - 2) {
                i = this._len - 2;
            }

            var d = val - i;

            var x = ((this._a[i].x * d + this._b[i].x) * d + this._c[i].x) * d + this._d[i].x;
            var y = ((this._a[i].y * d + this._b[i].y) * d + this._c[i].y) * d + this._d[i].y;

            return { x: x, y: y };
        }

        calculate(xscale: number = 1, yscale: number = 1) {
            if (this._len <= 3) {
                return { xs: this._x, ys: this._y };
            }

            var xs = [];
            var ys = [];

            var p0 = this.calculatePoint(0);
            xs.push(p0.x);
            ys.push(p0.y);

            var delta = this._len * this.k;
            var dx = 3 * xscale;
            var dy = 3 * yscale;

            for (var i = delta; i <= this._len - 1; i += delta) {
                var p = this.calculatePoint(i);
                if (Math.abs(p0.x - p.x) >= dx || Math.abs(p0.y - p.y) >= dy) {
                    xs.push(p.x);
                    ys.push(p.y)
                    p0 = p;
                }
            }
            if (xs[xs.length - 1].x != p.x || ys[ys.length - 1].y != p.y) {
                xs.push(p.x);
                ys.push(p.y)
            }
            return { xs: xs, ys: ys };
        }
    }

  

    export class PolyInEase extends AnimationEase {
        public ease(t: number) {
            return Math.pow(t, 3);
        }
    }
    export class PolyOutEase extends AnimationEase {
        public ease(t: number) {
            return 1 - Math.pow(1 - t, 3);
        }
    }

    const FRAME: number = 60;
    export class Bezier {

        // controlPoints: Point[];
        xs:number[];
        ys:number[];
        constructor(xs:number[],ys:number[]) {
            // this.controlPoints = [];
            this.xs=xs;
            this.ys=ys;
        }
        private buildBezierPoints(){
            // let points: Point[] = [];
            let xs:number[]=[];
            let ys:number[]=[];
            // let order = this.controlPoints.length - 1;
            let order = this.xs.length-1;
            let delta = 1.0 / FRAME;
            for (let t = 0; t <= 1; t += delta) {
                // points.push(new Point(this.deCasteljauX(order, 0, t), this.deCasteljauY(order, 0, t)));
                xs.push(this.deCasteljauX(order, 0, t));
                ys.push( this.deCasteljauY(order, 0, t));
            }
            return {'xs':xs,'ys':ys};
        }



        
        private deCasteljauX(i: number, j: number, t: number) {
            if (i == 1) {
                // return (1 - t) * this.controlPoints[i].x + t * this.controlPoints[j + 1].x;
                return (1 - t) * this.xs[i] + t * this.xs[j + 1];
            }
            return (1 - t) * this.deCasteljauX(i - 1, j, t) + t * this.deCasteljauX(i - 1, j + 1, t);
        }

        private deCasteljauY(i: number, j: number, t: number) {
            if (i == 1) {
                return (1 - t) * this.ys[j] + t * this.ys[(j + 1)];
            }
            return (1 - t) * this.deCasteljauY(i - 1, j, t) + t * this.deCasteljauY(i - 1, j + 1, t);
        }

    }



}