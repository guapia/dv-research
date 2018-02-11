var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// namespace test {
//     'use strict';
//     export class BaseView {
//         id:number=0;
//         animation: Animation;
//         parent:ViewGroup;
//         protected _canvas:CanvasRenderingContext2D;
//         private __drawingTime:number;
//         setDrawingTime(value:number){
//             this.__drawingTime = value;
//         }
//         getDrawingTime():number{
//             return this.__drawingTime;
//         }
//         onDraw(canvas: CanvasRenderingContext2D) { }
//         invalidate():void{
//             if(this.parent != null){
//                 this.parent.invalidate();
//             }
//         }
//         startAnimation(animation:Animation){
//             this.animation = animation;
//             if(this.animation != null){
//                 this.getRootView().startAnimation(animation);
//             }
//         }
//         public getRootView(): BaseView {
//             if(this.parent != null){
//                 let parent = this.parent;
//                 while (parent.parent != null)
//                 {
//                     parent = parent.parent;
//                 }
//                 return parent;
//             }
//             return this;
//         }
//     }
//     export class ViewGroup extends BaseView {
//         children: BaseView[];
//         constructor(){
//             super();
//             this.children =[];
//         }
//         addView(view:BaseView){
//             this.children.push(view);
//             view.parent = this;
//         }
//         dispatchDraw(canvas:CanvasRenderingContext2D){
//             for(let view of this.children){
//                 view.setDrawingTime(Date.now());
//                 this.drawchild(canvas,view);
//             }
//         }
//         drawchild(canvas: CanvasRenderingContext2D, view: BaseView) {
//             // console.log(this);
//             // console.log("    " + (view.animation != null )+" ,");//+( !view.animation.isAniamtionEnd));
//             if (view.animation != null && !view.animation.isAniamtionEnd) {
//                 canvas.save();
//                 if (view.animation.state == AnimationState.BeforeStart) {
//                     view.animation.onStartAnimation(canvas, view);
//                     view.animation.state = AnimationState.Animating;
//                 }
//                 view.animation.applyTransformation(view.animation.scale(view.getDrawingTime()), canvas, view);
//                 view.onDraw(canvas);
//                 if (view instanceof ViewGroup) {
//                     view.dispatchDraw(canvas);
//                 }
//                 canvas.restore();
//             } else {
//                 if (view.animation != null && view.animation.isAniamtionEnd && view.animation.state != AnimationState.End) {
//                     view.animation.state = AnimationState.End;
//                     view.animation.onEndAnimation(canvas, view);
//                 }
//                 view.onDraw(canvas);
//                 if (view instanceof ViewGroup) {
//                     view.dispatchDraw(canvas);
//                 }
//             }
//         }
//     }
//     export class RootView extends ViewGroup{
//         private _rect:{l:number,t:number,width:number,height:number};
//         private _rootAniamtion:Animation;
//         private _element:HTMLElement;
//         public startAnimation(animation: Animation) {
//             this.animation = animation;
//             // setTimeout(this._startAnimation());
//             this._startAnimation();
//         }
//         private _startAnimation(): void {
//             this.animation.start = Date.now();
//             if (this._rootAniamtion != null && !this._rootAniamtion.isAniamtionEnd) {
//                 if (this._rootAniamtion.duration + this._rootAniamtion.start < this.animation.duration + this.animation.start) {
//                     this._rootAniamtion.duration = this.animation.start + this.animation.duration - this._rootAniamtion.start;
//                 }
//             } else {
//                 this._rootAniamtion = this.animation;
//                 window.requestAnimationFrame(this._animate.bind(this));
//                 console.log("requestAnimationFrame ====== >>>>>  ");
//             }
//         }
//         private _animate() {
//             // console.log("_animating ========= >");
//             if (this._rootAniamtion != null && !this._rootAniamtion.isAniamtionEnd) {
//                 this.invalidate();
//                 window.requestAnimationFrame(this._animate.bind(this));
//             } else {
//                 this._rootAniamtion = null;
//                 this.invalidate();
//             }
//         }
//         attach(element:HTMLElement){
//             this._element = element;
//             this._rect = {l:0,t:0,width:element.clientWidth,height:element.clientHeight};
//             let canvasElement =document.createElement('canvas');
//             this._element.appendChild(canvasElement);
//             this._canvas =canvasElement.getContext('2d');
//             canvasElement.width = this._rect.width;
//             canvasElement.height =this._rect.height;
//             canvasElement.style.width = this._rect.width+"px";
//             canvasElement.style.height = this._rect.height+"px";
//         }
//         invalidate(){
//             this._canvas.clearRect(this._rect.l,this._rect.t,this._rect.width,this._rect.height);
//             this.dispatchDraw(this._canvas);
//         }
//     }
//     export enum AnimationState {
//         BeforeStart,
//         Animating,
//         End
//     }
//     export class AnimationEase {
//         public ease(t: number) {
//             return t;
//         }
//     }
//     export class Animation {
//         duration: number = 0;
//         start: number;
//         ease: AnimationEase;
//         from: number;
//         to: number;
//         state: AnimationState;
//         constructor() {
//             this.ease = new AnimationEase();
//             this.start = 0;
//             this.duration = 0;
//             this.from = 1;
//             this.to = 1;
//             this.state = AnimationState.BeforeStart;
//         }
//         get isAniamtionEnd(): boolean {
//             let flg= this.start + this.duration < Date.now();
//             // console.log("isAnimationEnd  " + this.start + " duration " +this.duration +" now " + Date.now()  +" "  +flg);
//             return flg;
//         }
//         onStartAnimation(canvas: CanvasRenderingContext2D, view: BaseView) {
//         }
//         onEndAnimation(canvas: CanvasRenderingContext2D, view: BaseView) {
//         }
//         __onInneranimationEnd(canvas:CanvasRenderingContext2D,view:BaseView){}
//         scale(now: number): number {
//             return this.ease.ease((now - this.start) / this.duration);
//         }
//         applyTransformation(interpolatedTime: number, canvas: CanvasRenderingContext2D, view: BaseView) {
//         }
//     }
// } 
/// <reference path="../libs/android.d.ts" />
var test;
(function (test) {
    'use strict';
    var Color = ['rgb(251, 118, 123)', 'rgb(129, 227, 238)', '#88bde6', '#fbb258', '#90cd97', '#f6aac9', '#bfa554', '#bc99c7', '#eddd46', '#f07e6e', '#8c8c8c'];
    var View = android.view.View;
    var Animation = android.view.animation.Animation;
    var AnimationEase = android.view.animation.AnimationEase;
    var RootView = android.widget.RootView;
    var Util = android.graphics.Util;
    var RenderType = android.graphics.RenderType;
    var FrameLayout = android.widget.FrameLayout;
    var layoutParams = android.view.LayoutParams;
    var Point = /** @class */ (function () {
        function Point(x, y) {
            this.x = 0;
            this.y = 0;
            if (x != null) {
                this.x = x;
            }
            if (y != null) {
                this.y = y;
            }
        }
        return Point;
    }());
    test.Point = Point;
    var FireWorksBombView = /** @class */ (function (_super) {
        __extends(FireWorksBombView, _super);
        function FireWorksBombView(cx, cy, angle, radius) {
            var _this = _super.call(this, null) || this;
            _this.alpha = 1;
            var xs = [], ys = [];
            xs[0] = cx;
            ys[0] = cy;
            xs[1] = Math.cos(angle) * radius + cx;
            ys[1] = Math.sin(Math.random() * Math.PI) * Math.sin(angle) * radius + cy;
            xs[2] = xs[1];
            ys[2] = cy + radius;
            xs[3] = xs[2];
            ys[3] = ys[2] + radius + Math.random() * 20;
            var startPt = new Point(xs[0], ys[0]);
            var endPt = new Point(xs[1], ys[1]);
            var spline = new Spline(xs, ys);
            var result = spline.calculate();
            _this.xs = result.xs;
            _this.ys = result.ys;
            var linexs = [];
            var lineys = [];
            _this.xs = linexs.concat(_this.xs);
            _this.ys = lineys.concat(_this.ys);
            _this.renderXs = [];
            _this.renderYs = [];
            return _this;
        }
        FireWorksBombView.prototype.onMeasure = function (width, height, canvas) {
            return _super.prototype.onMeasure.call(this, width, height, canvas);
        };
        FireWorksBombView.prototype.onLayout = function (l, t, r, b, canvas) {
            _super.prototype.onLayout.call(this, l, t, r, b, canvas);
        };
        FireWorksBombView.prototype.onDraw = function (context) {
            // super.onDraw(context);
            var index = parseInt(this.id); //Math.floor(Math.random() * 100);
            var radius = 2;
            var len = this.renderYs.length;
            var canvas = context.canvas;
            canvas.save();
            canvas.globalAlpha = this.alpha;
            canvas.fillStyle = Color[index % Color.length];
            canvas.beginPath();
            canvas.arc(this.renderXs[len - 1], this.renderYs[len - 1], radius, 0, 2 * Math.PI);
            var resultxs = [];
            var resultys = [];
            var nextx = 0;
            var nexty = 0;
            var lasta = 0;
            var padding = 5;
            for (var i = 0; i < this.renderXs.length; ++i) {
                padding = i / this.renderXs.length * radius;
                var x = this.renderXs[i];
                var y = this.renderYs[i];
                var nextx = x;
                var nexty = y;
                var a = lasta;
                if (i + 1 < this.renderXs.length) {
                    nextx = this.renderXs[i + 1];
                    nexty = this.renderYs[i + 1];
                    a = Math.atan((nexty - y) / (nextx - x));
                    lasta = a;
                }
                var xoffset = padding * Math.sin(a);
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
            for (var i_1 = 0; i_1 < resultxs.length; ++i_1) {
                canvas.lineTo(resultxs[i_1], resultys[i_1]);
            }
            //  ctx.stroke();
            canvas.fill();
            canvas.closePath();
            canvas.restore();
        };
        return FireWorksBombView;
    }(View));
    test.FireWorksBombView = FireWorksBombView;
    var FireWorksBombView2 = /** @class */ (function (_super) {
        __extends(FireWorksBombView2, _super);
        function FireWorksBombView2(cx, cy, angle, radius) {
            var _this = _super.call(this, null) || this;
            _this.alpha = 1;
            // let xs:number[];
            // let ys:number[];
            _this.xs = [];
            _this.ys = [];
            // xs[0]= cx;
            // ys[0] =cy;
            var ex = Math.cos(angle) * radius + cx;
            var ey = Math.sin(Math.random() * Math.PI) * Math.sin(angle) * radius + cy;
            var dx = ex - cx;
            var dy = ey - cy;
            var size = 100;
            var stepx = dx / size;
            var stepy = dy / size;
            for (var i = 0; i < size; ++i) {
                _this.xs.push(cx + stepx * i);
                _this.ys.push(cy + stepy * i);
            }
            _this.renderXs = [];
            _this.renderYs = [];
            return _this;
        }
        FireWorksBombView2.prototype.onMeasure = function (width, height, canvas) {
            return _super.prototype.onMeasure.call(this, width, height, canvas);
        };
        FireWorksBombView2.prototype.onLayout = function (l, t, r, b, canvas) {
            _super.prototype.onLayout.call(this, l, t, r, b, canvas);
        };
        FireWorksBombView2.prototype.onDraw = function (context) {
            // super.onDraw(context);
            var index = parseInt(this.id); //Math.floor(Math.random() * 100);
            var radius = 2;
            var len = this.renderYs.length;
            var canvas = context.canvas;
            canvas.save();
            canvas.globalAlpha = this.alpha;
            canvas.fillStyle = Color[index % Color.length];
            canvas.beginPath();
            canvas.arc(this.renderXs[len - 1], this.renderYs[len - 1], radius, 0, 2 * Math.PI);
            var resultxs = [];
            var resultys = [];
            var nextx = 0;
            var nexty = 0;
            var lasta = 0;
            var padding = 5;
            for (var i = 0; i < this.renderXs.length; ++i) {
                padding = i / this.renderXs.length * radius;
                var x = this.renderXs[i];
                var y = this.renderYs[i];
                var nextx = x;
                var nexty = y;
                var a = lasta;
                if (i + 1 < this.renderXs.length) {
                    nextx = this.renderXs[i + 1];
                    nexty = this.renderYs[i + 1];
                    a = Math.atan((nexty - y) / (nextx - x));
                    lasta = a;
                }
                var xoffset = padding * Math.sin(a);
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
            for (var i_2 = 0; i_2 < resultxs.length; ++i_2) {
                canvas.lineTo(resultxs[i_2], resultys[i_2]);
            }
            canvas.fill();
            canvas.closePath();
            canvas.restore();
        };
        return FireWorksBombView2;
    }(View));
    test.FireWorksBombView2 = FireWorksBombView2;
    var FireAnimation = /** @class */ (function (_super) {
        __extends(FireAnimation, _super);
        function FireAnimation() {
            var _this = _super.call(this) || this;
            _this.ease = new AnimationEase();
            return _this;
        }
        FireAnimation.prototype.applyTransformation = function (interpolatedTime, canvas, view) {
            var scale = this.from + (this.to - this.from) * interpolatedTime;
            var index = Math.floor((this.xs.length - 1) * scale);
            if (view instanceof FireWorksBombView || view instanceof FireWorksBombView2) {
                view.alpha = 1 - scale * 0.8;
                var size = 30;
                if (this.xs.length - 1 < index + size) {
                    size = this.xs.length - index - 1;
                }
                view.renderXs = this.xs.slice(index, index + size);
                view.renderYs = this.ys.slice(index, index + size);
            }
        };
        FireAnimation.prototype.onStartAniamtion = function (canvas, view) {
            _super.prototype.onStartAniamtion.call(this, canvas, view);
            if (view instanceof FireWorksBombView || view instanceof FireWorksBombView2) {
                this.xs = view.xs.slice(0);
                this.ys = view.ys.slice(0);
            }
            // console.log("onStartAnimation ");
            // console.log(this.xs);
        };
        FireAnimation.prototype.onEndAnimation = function (canvas, view) {
            _super.prototype.onEndAnimation.call(this, canvas, view);
            if (view instanceof FireWorksBombView || view instanceof FireWorksBombView2) {
                view.renderXs = [];
                view.renderYs = [];
            }
            // console.log("onEndAnimation ");
            // console.log(this.xs);
        };
        return FireAnimation;
    }(Animation));
    test.FireAnimation = FireAnimation;
    var FireWorksContainer = /** @class */ (function (_super) {
        __extends(FireWorksContainer, _super);
        function FireWorksContainer() {
            return _super.call(this, null) || this;
        }
        FireWorksContainer.prototype.onMeasure = function (width, height, canvas) {
            return _super.prototype.onMeasure.call(this, width, height, canvas);
        };
        FireWorksContainer.prototype.onLayout = function (l, t, r, b, canvas) {
            _super.prototype.onLayout.call(this, l, t, r, b, canvas);
        };
        FireWorksContainer.prototype.onDraw = function (context) {
            // super.onDraw(context);
            if (this.renderX == null || this.renderY == null) {
                return;
            }
            var index = parseInt(this.id);
            var radius = 5;
            var canvas = context.canvas;
            canvas.save();
            canvas.fillStyle = Color[index % Color.length];
            canvas.beginPath();
            canvas.arc(this.renderX, this.renderY, radius, 0, 2 * Math.PI);
            var resultxs = [];
            var resultys = [];
            var nextx = 0;
            var nexty = 0;
            var lasta = 0;
            var padding = 5;
            resultxs[0] = this.renderX - radius;
            resultys[0] = this.renderY;
            resultxs[1] = this.renderX + radius;
            resultys[1] = this.renderY;
            resultxs[2] = this.renderX;
            resultys[2] = this.renderY + 100;
            canvas.moveTo(resultxs[0], resultys[0]);
            for (var i = 0; i < resultxs.length; ++i) {
                canvas.lineTo(resultxs[i], resultys[i]);
            }
            canvas.fill();
            canvas.closePath();
            canvas.restore();
        };
        return FireWorksContainer;
    }(FrameLayout));
    test.FireWorksContainer = FireWorksContainer;
    var LineAnimation = /** @class */ (function (_super) {
        __extends(LineAnimation, _super);
        function LineAnimation() {
            var _this = _super.call(this) || this;
            var index = Math.floor(Math.random() * 10);
            if (index % 3 == 0) {
                _this.ease = new PolyOutEase();
            }
            else if (index % 3 == 1) {
                _this.ease = new PolyInEase();
            }
            else {
                _this.ease = new AnimationEase();
            }
            return _this;
        }
        LineAnimation.prototype.applyTransformation = function (interpolatedTime, canvas, view) {
            var scale = this.from + (this.to - this.from) * interpolatedTime;
            if (view instanceof FireWorksContainer) {
                view.renderX = this.x; //+Math.random()*10-5;
                view.renderY = this.y - view.h * scale;
            }
        };
        LineAnimation.prototype.onStartAniamtion = function (canvas, view) {
            _super.prototype.onStartAniamtion.call(this, canvas, view);
            if (view instanceof FireWorksContainer) {
                this.x = view.x;
                this.y = view.y;
            }
        };
        LineAnimation.prototype.onEndAnimation = function (canvas, view) {
            _super.prototype.onEndAnimation.call(this, canvas, view);
            if (view instanceof FireWorksContainer) {
                view.renderX = null; // this.x;
                view.renderY = null; //this.y;
            }
        };
        return LineAnimation;
    }(Animation));
    test.LineAnimation = LineAnimation;
    var FireLayout = /** @class */ (function (_super) {
        __extends(FireLayout, _super);
        function FireLayout() {
            return _super.call(this, null) || this;
        }
        FireLayout.prototype.attachElement = function (element, renderType) {
            _super.prototype.attachElement.call(this, element, Util.asEnum(renderType, RenderType));
        };
        FireLayout.prototype.init = function () {
            this.clip = false;
            for (var m = 0; m < 30; ++m) {
                var size = 200;
                var startAngle = 0; //*Math.PI/180;
                var endAngle = 360; // * Math.PI/180;
                var constcx = 400 + Math.random() * 300 - 150;
                var constcy = 200;
                var radius = 200 + Math.random() * 200;
                var fireWorksContainer = new FireWorksContainer();
                fireWorksContainer.layoutParams.width = layoutParams.MATCH_PARENT;
                fireWorksContainer.layoutParams.height = layoutParams.MATCH_PARENT;
                fireWorksContainer.h = 600;
                fireWorksContainer.x = constcx;
                fireWorksContainer.y = constcy + fireWorksContainer.h;
                for (var i = 0; i < size; ++i) {
                    var angle = (startAngle + (endAngle - startAngle) / size * i) * Math.PI / 180;
                    var xs = [];
                    var ys = [];
                    var cx = constcx; //+ Math.random() * 20;
                    var cy = constcy; //+ Math.random() * 20;
                    if (m % 2 == 0) {
                        var fire = new FireWorksBombView2(cx, cy, angle, radius + Math.random() * 100);
                        fire.layoutParams.width = 100;
                        fire.layoutParams.height = 100;
                        // let fire: FireWorksBombView = new FireWorksBombView(cx, cy, angle, radius);
                        fire.id = Math.floor(Math.random() * 100) + "";
                        fireWorksContainer.addView(fire);
                    }
                    else {
                        var fire = new FireWorksBombView(cx, cy, angle, radius);
                        fire.layoutParams.width = 100;
                        fire.layoutParams.height = 100;
                        fire.id = Math.floor(Math.random() * 100) + "";
                        fireWorksContainer.addView(fire);
                    }
                }
                this.addView(fireWorksContainer, 0);
                fireWorksContainer.id = Math.floor(Math.random() * 100) + "";
            }
        };
        FireLayout.prototype.animationTest = function () {
            var index = 0;
            var _loop_1 = function (view) {
                index++;
                setTimeout(function () {
                    if (view instanceof FireWorksContainer) {
                        var fireWorksContainer_1 = view;
                        var animation1 = new LineAnimation();
                        animation1.duration = 1000 + Math.random() * 1000;
                        animation1.from = 0;
                        animation1.to = 1;
                        fireWorksContainer_1.startAnimation(animation1);
                        var oldanimationEnd = animation1.onEndAnimation;
                        animation1.setAnimationCallBack(null, function (view) {
                            // console.log("on Line Animation end  ===");
                            // for (let view of fireWorksContainer.children) {
                            //     let animation = new FireAnimation();
                            //     animation.duration = Math.random() * 1000 + 2000;
                            //     animation.from = 0;
                            //     animation.to = 1;
                            //     view.startAnimation(animation);
                            // }
                            for (var i = 0; i < fireWorksContainer_1.getChildCount(); ++i) {
                                var child = fireWorksContainer_1.getChildAt(i);
                                var animation = new FireAnimation();
                                animation.duration = Math.random() * 1000 + 2000;
                                animation.from = 0;
                                animation.to = 1;
                                child.startAnimation(animation);
                            }
                        });
                    }
                }, index * (1000 + Math.random() * 1000));
            };
            for (var _i = 0, _e = this.children; _i < _e.length; _i++) {
                var view = _e[_i];
                _loop_1(view);
            }
        };
        return FireLayout;
    }(RootView));
    test.FireLayout = FireLayout;
    var Spline = /** @class */ (function () {
        function Spline(x, y) {
            // 
            this.k = 0.002;
            this._a = [];
            this._b = [];
            this._c = [];
            this._d = [];
            //  T^3     -1     +3    -3    +1     /
            //  T^2     +2     -5     4    -1    /
            //  T^1     -1      0     1     0   /  2
            //  T^0      0      2     0     0  /
            this.m = [
                [-1 * 0.5, +3 * 0.5, -3 * 0.5, +1 * 0.5],
                [+2 * 0.5, -5 * 0.5, +4 * 0.5, -1 * 0.5],
                [-1 * 0.5, 0, +1 * 0.5, 0],
                [0, +2 * 0.5, 0, 0],
            ];
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
        Spline.prototype.calculatePoint = function (val) {
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
        };
        Spline.prototype.calculate = function (xscale, yscale) {
            if (xscale === void 0) { xscale = 1; }
            if (yscale === void 0) { yscale = 1; }
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
                    ys.push(p.y);
                    p0 = p;
                }
            }
            if (xs[xs.length - 1].x != p.x || ys[ys.length - 1].y != p.y) {
                xs.push(p.x);
                ys.push(p.y);
            }
            return { xs: xs, ys: ys };
        };
        return Spline;
    }());
    test.Spline = Spline;
    var PolyInEase = /** @class */ (function (_super) {
        __extends(PolyInEase, _super);
        function PolyInEase() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PolyInEase.prototype.ease = function (t) {
            return Math.pow(t, 3);
        };
        return PolyInEase;
    }(AnimationEase));
    test.PolyInEase = PolyInEase;
    var PolyOutEase = /** @class */ (function (_super) {
        __extends(PolyOutEase, _super);
        function PolyOutEase() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PolyOutEase.prototype.ease = function (t) {
            return 1 - Math.pow(1 - t, 3);
        };
        return PolyOutEase;
    }(AnimationEase));
    test.PolyOutEase = PolyOutEase;
    var FRAME = 60;
    var Bezier = /** @class */ (function () {
        function Bezier(xs, ys) {
            // this.controlPoints = [];
            this.xs = xs;
            this.ys = ys;
        }
        Bezier.prototype.buildBezierPoints = function () {
            // let points: Point[] = [];
            var xs = [];
            var ys = [];
            // let order = this.controlPoints.length - 1;
            var order = this.xs.length - 1;
            var delta = 1.0 / FRAME;
            for (var t = 0; t <= 1; t += delta) {
                // points.push(new Point(this.deCasteljauX(order, 0, t), this.deCasteljauY(order, 0, t)));
                xs.push(this.deCasteljauX(order, 0, t));
                ys.push(this.deCasteljauY(order, 0, t));
            }
            return { 'xs': xs, 'ys': ys };
        };
        Bezier.prototype.deCasteljauX = function (i, j, t) {
            if (i == 1) {
                // return (1 - t) * this.controlPoints[i].x + t * this.controlPoints[j + 1].x;
                return (1 - t) * this.xs[i] + t * this.xs[j + 1];
            }
            return (1 - t) * this.deCasteljauX(i - 1, j, t) + t * this.deCasteljauX(i - 1, j + 1, t);
        };
        Bezier.prototype.deCasteljauY = function (i, j, t) {
            if (i == 1) {
                return (1 - t) * this.ys[j] + t * this.ys[(j + 1)];
            }
            return (1 - t) * this.deCasteljauY(i - 1, j, t) + t * this.deCasteljauY(i - 1, j + 1, t);
        };
        return Bezier;
    }());
    test.Bezier = Bezier;
})(test || (test = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9CYXNlLnRzIiwic3JjL0ZpcmVXb3Jrcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsbUJBQW1CO0FBQ25CLG9CQUFvQjtBQUNwQiw4QkFBOEI7QUFDOUIsdUJBQXVCO0FBQ3ZCLGdDQUFnQztBQUNoQyw0QkFBNEI7QUFDNUIsc0RBQXNEO0FBQ3RELHdDQUF3QztBQUN4Qyx3Q0FBd0M7QUFDeEMsMENBQTBDO0FBQzFDLFlBQVk7QUFDWixtQ0FBbUM7QUFDbkMseUNBQXlDO0FBQ3pDLFlBQVk7QUFDWix1REFBdUQ7QUFDdkQsNkJBQTZCO0FBQzdCLHVDQUF1QztBQUN2Qyw0Q0FBNEM7QUFDNUMsZ0JBQWdCO0FBQ2hCLFlBQVk7QUFDWiwrQ0FBK0M7QUFDL0MsMENBQTBDO0FBQzFDLDBDQUEwQztBQUMxQyxnRUFBZ0U7QUFDaEUsZ0JBQWdCO0FBQ2hCLFlBQVk7QUFDWiwyQ0FBMkM7QUFDM0MsdUNBQXVDO0FBQ3ZDLDRDQUE0QztBQUM1QyxnREFBZ0Q7QUFDaEQsb0JBQW9CO0FBQ3BCLDhDQUE4QztBQUM5QyxvQkFBb0I7QUFDcEIsaUNBQWlDO0FBQ2pDLGdCQUFnQjtBQUNoQiwyQkFBMkI7QUFDM0IsWUFBWTtBQUNaLFFBQVE7QUFFUixnREFBZ0Q7QUFDaEQsZ0NBQWdDO0FBQ2hDLHlCQUF5QjtBQUN6Qix1QkFBdUI7QUFDdkIsaUNBQWlDO0FBQ2pDLFlBQVk7QUFDWixrQ0FBa0M7QUFDbEMsd0NBQXdDO0FBQ3hDLGtDQUFrQztBQUNsQyxZQUFZO0FBRVoseURBQXlEO0FBQ3pELDhDQUE4QztBQUM5QyxtREFBbUQ7QUFDbkQsK0NBQStDO0FBQy9DLGdCQUFnQjtBQUNoQixZQUFZO0FBQ1osd0VBQXdFO0FBQ3hFLG9DQUFvQztBQUNwQyw2R0FBNkc7QUFDN0csOEVBQThFO0FBQzlFLGlDQUFpQztBQUNqQyw0RUFBNEU7QUFDNUUscUVBQXFFO0FBQ3JFLHVFQUF1RTtBQUN2RSxvQkFBb0I7QUFDcEIsaUhBQWlIO0FBQ2pI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Q0FBQztZQUNaLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBRVosSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRW5ELEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNWLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO29CQUMvQixJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDMUUsSUFBSSxFQUFFLEdBQUcsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMvQixJQUFJLEVBQUUsR0FBRyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdkMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRXhGLElBQUksQ0FBQyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7b0JBQ3BCLElBQUksQ0FBQyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7b0JBQ3BCLElBQUksQ0FBQyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7b0JBQ3BCLElBQUksQ0FBQyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7b0JBRXBCLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM1RixDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDNUYsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzVGLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUU1RixDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDNUYsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzVGLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM1RixDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxD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Q0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2RCxDQUFDO1lBQ0QsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzdGLENBQUM7UUFFTCxhQUFDO0lBQUQsQ0EzQ0EsQUEyQ0MsSUFBQTtJQTNDWSxXQUFNLFNBMkNsQixDQUFBO0FBSUwsQ0FBQyxFQTlsQlMsSUFBSSxLQUFKLElBQUksUUE4bEJiIiwiZmlsZSI6ImZpcmV3b3JrZHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBuYW1lc3BhY2UgdGVzdCB7XG4vLyAgICAgJ3VzZSBzdHJpY3QnO1xuLy8gICAgIGV4cG9ydCBjbGFzcyBCYXNlVmlldyB7XG4vLyAgICAgICAgIGlkOm51bWJlcj0wO1xuLy8gICAgICAgICBhbmltYXRpb246IEFuaW1hdGlvbjtcbi8vICAgICAgICAgcGFyZW50OlZpZXdHcm91cDtcbi8vICAgICAgICAgcHJvdGVjdGVkIF9jYW52YXM6Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuLy8gICAgICAgICBwcml2YXRlIF9fZHJhd2luZ1RpbWU6bnVtYmVyO1xuLy8gICAgICAgICBzZXREcmF3aW5nVGltZSh2YWx1ZTpudW1iZXIpe1xuLy8gICAgICAgICAgICAgdGhpcy5fX2RyYXdpbmdUaW1lID0gdmFsdWU7XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgZ2V0RHJhd2luZ1RpbWUoKTpudW1iZXJ7XG4vLyAgICAgICAgICAgICByZXR1cm4gdGhpcy5fX2RyYXdpbmdUaW1lO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIG9uRHJhdyhjYW52YXM6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCkgeyB9XG4vLyAgICAgICAgIGludmFsaWRhdGUoKTp2b2lke1xuLy8gICAgICAgICAgICAgaWYodGhpcy5wYXJlbnQgIT0gbnVsbCl7XG4vLyAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnQuaW52YWxpZGF0ZSgpO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9XG4vLyAgICAgICAgIHN0YXJ0QW5pbWF0aW9uKGFuaW1hdGlvbjpBbmltYXRpb24pe1xuLy8gICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSBhbmltYXRpb247XG4vLyAgICAgICAgICAgICBpZih0aGlzLmFuaW1hdGlvbiAhPSBudWxsKXtcbi8vICAgICAgICAgICAgICAgICB0aGlzLmdldFJvb3RWaWV3KCkuc3RhcnRBbmltYXRpb24oYW5pbWF0aW9uKTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfVxuLy8gICAgICAgICBwdWJsaWMgZ2V0Um9vdFZpZXcoKTogQmFzZVZpZXcge1xuLy8gICAgICAgICAgICAgaWYodGhpcy5wYXJlbnQgIT0gbnVsbCl7XG4vLyAgICAgICAgICAgICAgICAgbGV0IHBhcmVudCA9IHRoaXMucGFyZW50O1xuLy8gICAgICAgICAgICAgICAgIHdoaWxlIChwYXJlbnQucGFyZW50ICE9IG51bGwpXG4vLyAgICAgICAgICAgICAgICAge1xuLy8gICAgICAgICAgICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50O1xuLy8gICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICByZXR1cm4gcGFyZW50O1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4vLyAgICAgICAgIH1cbi8vICAgICB9XG4gICAgXG4vLyAgICAgZXhwb3J0IGNsYXNzIFZpZXdHcm91cCBleHRlbmRzIEJhc2VWaWV3IHtcbi8vICAgICAgICAgY2hpbGRyZW46IEJhc2VWaWV3W107XG4vLyAgICAgICAgIGNvbnN0cnVjdG9yKCl7XG4vLyAgICAgICAgICAgICBzdXBlcigpO1xuLy8gICAgICAgICAgICAgdGhpcy5jaGlsZHJlbiA9W107XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgYWRkVmlldyh2aWV3OkJhc2VWaWV3KXtcbi8vICAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaCh2aWV3KTtcbi8vICAgICAgICAgICAgIHZpZXcucGFyZW50ID0gdGhpcztcbi8vICAgICAgICAgfVxuXG4vLyAgICAgICAgIGRpc3BhdGNoRHJhdyhjYW52YXM6Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKXtcbi8vICAgICAgICAgICAgIGZvcihsZXQgdmlldyBvZiB0aGlzLmNoaWxkcmVuKXtcbi8vICAgICAgICAgICAgICAgICB2aWV3LnNldERyYXdpbmdUaW1lKERhdGUubm93KCkpO1xuLy8gICAgICAgICAgICAgICAgIHRoaXMuZHJhd2NoaWxkKGNhbnZhcyx2aWV3KTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfVxuLy8gICAgICAgICBkcmF3Y2hpbGQoY2FudmFzOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIHZpZXc6IEJhc2VWaWV3KSB7XG4vLyAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzKTtcbi8vICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiICAgIFwiICsgKHZpZXcuYW5pbWF0aW9uICE9IG51bGwgKStcIiAsXCIpOy8vKyggIXZpZXcuYW5pbWF0aW9uLmlzQW5pYW10aW9uRW5kKSk7XG4vLyAgICAgICAgICAgICBpZiAodmlldy5hbmltYXRpb24gIT0gbnVsbCAmJiAhdmlldy5hbmltYXRpb24uaXNBbmlhbXRpb25FbmQpIHtcbi8vICAgICAgICAgICAgICAgICBjYW52YXMuc2F2ZSgpO1xuLy8gICAgICAgICAgICAgICAgIGlmICh2aWV3LmFuaW1hdGlvbi5zdGF0ZSA9PSBBbmltYXRpb25TdGF0ZS5CZWZvcmVTdGFydCkge1xuLy8gICAgICAgICAgICAgICAgICAgICB2aWV3LmFuaW1hdGlvbi5vblN0YXJ0QW5pbWF0aW9uKGNhbnZhcywgdmlldyk7XG4vLyAgICAgICAgICAgICAgICAgICAgIHZpZXcuYW5pbWF0aW9uLnN0YXRlID0gQW5pbWF0aW9uU3RhdGUuQW5pbWF0aW5nO1xuLy8gICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICB2aWV3LmFuaW1hdGlvbi5hcHBseVRyYW5zZm9ybWF0aW9uKHZpZXcuYW5pbWF0aW9uLnNjYWxlKHZpZXcuZ2V0RHJhd2luZ1RpbWUoKSksIGNhbnZhcywgdmlldyk7XG4vLyAgICAgICAgICAgICAgICAgdmlldy5vbkRyYXcoY2FudmFzKTtcbi8vICAgICAgICAgICAgICAgICBpZiAodmlldyBpbnN0YW5jZW9mIFZpZXdHcm91cCkge1xuLy8gICAgICAgICAgICAgICAgICAgICB2aWV3LmRpc3BhdGNoRHJhdyhjYW52YXMpO1xuLy8gICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICBjYW52YXMucmVzdG9yZSgpO1xuLy8gICAgICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgICAgICBpZiAodmlldy5hbmltYXRpb24gIT0gbnVsbCAmJiB2aWV3LmFuaW1hdGlvbi5pc0FuaWFtdGlvbkVuZCAmJiB2aWV3LmFuaW1hdGlvbi5zdGF0ZSAhPSBBbmltYXRpb25TdGF0ZS5FbmQpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgdmlldy5hbmltYXRpb24uc3RhdGUgPSBBbmltYXRpb25TdGF0ZS5FbmQ7XG4vLyAgICAgICAgICAgICAgICAgICAgIHZpZXcuYW5pbWF0aW9uLm9uRW5kQW5pbWF0aW9uKGNhbnZhcywgdmlldyk7XG4vLyAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgIHZpZXcub25EcmF3KGNhbnZhcyk7XG4vLyAgICAgICAgICAgICAgICAgaWYgKHZpZXcgaW5zdGFuY2VvZiBWaWV3R3JvdXApIHtcbi8vICAgICAgICAgICAgICAgICAgICAgdmlldy5kaXNwYXRjaERyYXcoY2FudmFzKTtcbi8vICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH1cbi8vICAgICB9XG5cblxuLy8gICAgIGV4cG9ydCBjbGFzcyBSb290VmlldyBleHRlbmRzIFZpZXdHcm91cHtcbi8vICAgICAgICAgcHJpdmF0ZSBfcmVjdDp7bDpudW1iZXIsdDpudW1iZXIsd2lkdGg6bnVtYmVyLGhlaWdodDpudW1iZXJ9O1xuLy8gICAgICAgICBwcml2YXRlIF9yb290QW5pYW10aW9uOkFuaW1hdGlvbjtcbi8vICAgICAgICAgcHJpdmF0ZSBfZWxlbWVudDpIVE1MRWxlbWVudDtcblxuLy8gICAgICAgICBwdWJsaWMgc3RhcnRBbmltYXRpb24oYW5pbWF0aW9uOiBBbmltYXRpb24pIHtcbi8vICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gYW5pbWF0aW9uO1xuLy8gICAgICAgICAgICAgLy8gc2V0VGltZW91dCh0aGlzLl9zdGFydEFuaW1hdGlvbigpKTtcbi8vICAgICAgICAgICAgIHRoaXMuX3N0YXJ0QW5pbWF0aW9uKCk7XG4vLyAgICAgICAgIH1cbiAgICAgICAgXG4vLyAgICAgICAgIHByaXZhdGUgX3N0YXJ0QW5pbWF0aW9uKCk6IHZvaWQge1xuLy8gICAgICAgICAgICAgdGhpcy5hbmltYXRpb24uc3RhcnQgPSBEYXRlLm5vdygpO1xuLy8gICAgICAgICAgICAgaWYgKHRoaXMuX3Jvb3RBbmlhbXRpb24gIT0gbnVsbCAmJiAhdGhpcy5fcm9vdEFuaWFtdGlvbi5pc0FuaWFtdGlvbkVuZCkge1xuLy8gICAgICAgICAgICAgICAgIGlmICh0aGlzLl9yb290QW5pYW10aW9uLmR1cmF0aW9uICsgdGhpcy5fcm9vdEFuaWFtdGlvbi5zdGFydCA8IHRoaXMuYW5pbWF0aW9uLmR1cmF0aW9uICsgdGhpcy5hbmltYXRpb24uc3RhcnQpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm9vdEFuaWFtdGlvbi5kdXJhdGlvbiA9IHRoaXMuYW5pbWF0aW9uLnN0YXJ0ICsgdGhpcy5hbmltYXRpb24uZHVyYXRpb24gLSB0aGlzLl9yb290QW5pYW10aW9uLnN0YXJ0O1xuLy8gICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICAgICAgdGhpcy5fcm9vdEFuaWFtdGlvbiA9IHRoaXMuYW5pbWF0aW9uO1xuLy8gICAgICAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5fYW5pbWF0ZS5iaW5kKHRoaXMpKTtcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlcXVlc3RBbmltYXRpb25GcmFtZSA9PT09PT0gPj4+Pj4gIFwiKTtcbi8vICAgICAgICAgICAgIH1cblxuLy8gICAgICAgICB9XG4vLyAgICAgICAgIHByaXZhdGUgX2FuaW1hdGUoKSB7XG4vLyAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIl9hbmltYXRpbmcgPT09PT09PT09ID5cIik7XG4vLyAgICAgICAgICAgICBpZiAodGhpcy5fcm9vdEFuaWFtdGlvbiAhPSBudWxsICYmICF0aGlzLl9yb290QW5pYW10aW9uLmlzQW5pYW10aW9uRW5kKSB7XG4vLyAgICAgICAgICAgICAgICAgdGhpcy5pbnZhbGlkYXRlKCk7XG4vLyAgICAgICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLl9hbmltYXRlLmJpbmQodGhpcykpO1xuLy8gICAgICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgICAgICB0aGlzLl9yb290QW5pYW10aW9uID0gbnVsbDtcbi8vICAgICAgICAgICAgICAgICB0aGlzLmludmFsaWRhdGUoKTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfVxuLy8gICAgICAgICBhdHRhY2goZWxlbWVudDpIVE1MRWxlbWVudCl7XG4vLyAgICAgICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbi8vICAgICAgICAgICAgIHRoaXMuX3JlY3QgPSB7bDowLHQ6MCx3aWR0aDplbGVtZW50LmNsaWVudFdpZHRoLGhlaWdodDplbGVtZW50LmNsaWVudEhlaWdodH07XG4vLyAgICAgICAgICAgICBsZXQgY2FudmFzRWxlbWVudCA9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4vLyAgICAgICAgICAgICB0aGlzLl9lbGVtZW50LmFwcGVuZENoaWxkKGNhbnZhc0VsZW1lbnQpO1xuLy8gICAgICAgICAgICAgdGhpcy5fY2FudmFzID1jYW52YXNFbGVtZW50LmdldENvbnRleHQoJzJkJyk7XG4vLyAgICAgICAgICAgICBjYW52YXNFbGVtZW50LndpZHRoID0gdGhpcy5fcmVjdC53aWR0aDtcbi8vICAgICAgICAgICAgIGNhbnZhc0VsZW1lbnQuaGVpZ2h0ID10aGlzLl9yZWN0LmhlaWdodDtcbi8vICAgICAgICAgICAgIGNhbnZhc0VsZW1lbnQuc3R5bGUud2lkdGggPSB0aGlzLl9yZWN0LndpZHRoK1wicHhcIjtcbi8vICAgICAgICAgICAgIGNhbnZhc0VsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gdGhpcy5fcmVjdC5oZWlnaHQrXCJweFwiO1xuXG5cbi8vICAgICAgICAgfVxuLy8gICAgICAgICBpbnZhbGlkYXRlKCl7XG4vLyAgICAgICAgICAgICB0aGlzLl9jYW52YXMuY2xlYXJSZWN0KHRoaXMuX3JlY3QubCx0aGlzLl9yZWN0LnQsdGhpcy5fcmVjdC53aWR0aCx0aGlzLl9yZWN0LmhlaWdodCk7XG4vLyAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRHJhdyh0aGlzLl9jYW52YXMpO1xuLy8gICAgICAgICB9XG4vLyAgICAgfVxuXG4vLyAgICAgZXhwb3J0IGVudW0gQW5pbWF0aW9uU3RhdGUge1xuLy8gICAgICAgICBCZWZvcmVTdGFydCxcbi8vICAgICAgICAgQW5pbWF0aW5nLFxuLy8gICAgICAgICBFbmRcbi8vICAgICB9XG5cbi8vICAgICBleHBvcnQgY2xhc3MgQW5pbWF0aW9uRWFzZSB7XG4vLyAgICAgICAgIHB1YmxpYyBlYXNlKHQ6IG51bWJlcikge1xuLy8gICAgICAgICAgICAgcmV0dXJuIHQ7XG4vLyAgICAgICAgIH1cbi8vICAgICB9XG5cbi8vICAgICBleHBvcnQgY2xhc3MgQW5pbWF0aW9uIHtcbi8vICAgICAgICAgZHVyYXRpb246IG51bWJlciA9IDA7XG4vLyAgICAgICAgIHN0YXJ0OiBudW1iZXI7XG4vLyAgICAgICAgIGVhc2U6IEFuaW1hdGlvbkVhc2U7XG4vLyAgICAgICAgIGZyb206IG51bWJlcjtcbi8vICAgICAgICAgdG86IG51bWJlcjtcbi8vICAgICAgICAgc3RhdGU6IEFuaW1hdGlvblN0YXRlO1xuLy8gICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbi8vICAgICAgICAgICAgIHRoaXMuZWFzZSA9IG5ldyBBbmltYXRpb25FYXNlKCk7XG4vLyAgICAgICAgICAgICB0aGlzLnN0YXJ0ID0gMDtcbi8vICAgICAgICAgICAgIHRoaXMuZHVyYXRpb24gPSAwO1xuLy8gICAgICAgICAgICAgdGhpcy5mcm9tID0gMTtcbi8vICAgICAgICAgICAgIHRoaXMudG8gPSAxO1xuLy8gICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IEFuaW1hdGlvblN0YXRlLkJlZm9yZVN0YXJ0O1xuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgZ2V0IGlzQW5pYW10aW9uRW5kKCk6IGJvb2xlYW4ge1xuLy8gICAgICAgICAgICAgbGV0IGZsZz0gdGhpcy5zdGFydCArIHRoaXMuZHVyYXRpb24gPCBEYXRlLm5vdygpO1xuLy8gICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJpc0FuaW1hdGlvbkVuZCAgXCIgKyB0aGlzLnN0YXJ0ICsgXCIgZHVyYXRpb24gXCIgK3RoaXMuZHVyYXRpb24gK1wiIG5vdyBcIiArIERhdGUubm93KCkgICtcIiBcIiAgK2ZsZyk7XG4vLyAgICAgICAgICAgICByZXR1cm4gZmxnO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIG9uU3RhcnRBbmltYXRpb24oY2FudmFzOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIHZpZXc6IEJhc2VWaWV3KSB7XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgb25FbmRBbmltYXRpb24oY2FudmFzOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIHZpZXc6IEJhc2VWaWV3KSB7XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgX19vbklubmVyYW5pbWF0aW9uRW5kKGNhbnZhczpDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsdmlldzpCYXNlVmlldyl7fVxuICAgICAgICBcbi8vICAgICAgICAgc2NhbGUobm93OiBudW1iZXIpOiBudW1iZXIge1xuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFzZS5lYXNlKChub3cgLSB0aGlzLnN0YXJ0KSAvIHRoaXMuZHVyYXRpb24pO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGFwcGx5VHJhbnNmb3JtYXRpb24oaW50ZXJwb2xhdGVkVGltZTogbnVtYmVyLCBjYW52YXM6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgdmlldzogQmFzZVZpZXcpIHtcbi8vICAgICAgICAgfVxuLy8gICAgIH1cbi8vIH0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vbGlicy9hbmRyb2lkLmQudHNcIiAvPlxuXG5cblxubmFtZXNwYWNlIHRlc3Qge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICBjb25zdCBDb2xvcjogc3RyaW5nW10gPSBbJ3JnYigyNTEsIDExOCwgMTIzKScsICdyZ2IoMTI5LCAyMjcsIDIzOCknLCAnIzg4YmRlNicsICcjZmJiMjU4JywgJyM5MGNkOTcnLCAnI2Y2YWFjOScsICcjYmZhNTU0JywgJyNiYzk5YzcnLCAnI2VkZGQ0NicsICcjZjA3ZTZlJywgJyM4YzhjOGMnXTtcbiAgICBpbXBvcnQgVmlldyA9IGFuZHJvaWQudmlldy5WaWV3O1xuICAgIGltcG9ydCBDYW52YXMgPSBhbmRyb2lkLmdyYXBoaWNzLkNhbnZhcztcbiAgICBpbXBvcnQgQW5pbWF0aW9uID0gYW5kcm9pZC52aWV3LmFuaW1hdGlvbi5BbmltYXRpb247XG4gICAgaW1wb3J0IEFuaW1hdGlvbkVhc2UgPSBhbmRyb2lkLnZpZXcuYW5pbWF0aW9uLkFuaW1hdGlvbkVhc2U7XG4gICAgaW1wb3J0IFZpZXdHcm91cCA9IGFuZHJvaWQudmlldy5WaWV3R3JvdXA7XG4gICAgaW1wb3J0IFJvb3RWaWV3ID0gYW5kcm9pZC53aWRnZXQuUm9vdFZpZXc7XG4gICAgaW1wb3J0IFV0aWwgPSBhbmRyb2lkLmdyYXBoaWNzLlV0aWw7XG4gICAgaW1wb3J0IFJlbmRlclR5cGUgPSBhbmRyb2lkLmdyYXBoaWNzLlJlbmRlclR5cGU7XG4gICAgaW1wb3J0IEZyYW1lTGF5b3V0ID0gYW5kcm9pZC53aWRnZXQuRnJhbWVMYXlvdXQ7XG4gICAgaW1wb3J0IE1lYXN1cmVTcGVjID0gYW5kcm9pZC52aWV3Lk1lYXN1cmVTcGVjO1xuICAgIGltcG9ydCBTaXplID0gYW5kcm9pZC5ncmFwaGljcy5TaXplO1xuICAgIGltcG9ydCBsYXlvdXRQYXJhbXMgPSBhbmRyb2lkLnZpZXcuTGF5b3V0UGFyYW1zO1xuICAgIGV4cG9ydCBjbGFzcyBQb2ludCB7XG4gICAgICAgIHggPSAwOyB5ID0gMDtcbiAgICAgICAgY29uc3RydWN0b3IoeD86IG51bWJlciwgeT86IG51bWJlcikge1xuICAgICAgICAgICAgaWYgKHggIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoeSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBGaXJlV29ya3NCb21iVmlldyBleHRlbmRzIFZpZXcge1xuICAgICAgICBwdWJsaWMgeHM6IG51bWJlcltdO1xuICAgICAgICBwdWJsaWMgeXM6IG51bWJlcltdO1xuICAgICAgICBwdWJsaWMgcmVuZGVyWHM6IG51bWJlcltdO1xuICAgICAgICBwdWJsaWMgcmVuZGVyWXM6IG51bWJlcltdO1xuICAgICAgICBwdWJsaWMgYWxwaGE6IG51bWJlciA9IDE7XG4gICAgICAgIGNvbnN0cnVjdG9yKGN4OiBudW1iZXIsIGN5OiBudW1iZXIsIGFuZ2xlOiBudW1iZXIsIHJhZGl1czogbnVtYmVyKSB7XG4gICAgICAgICAgICBzdXBlcihudWxsKTtcbiAgICAgICAgICAgIGxldCB4czogbnVtYmVyW10gPSBbXSwgeXM6IG51bWJlcltdID0gW107XG4gICAgICAgICAgICB4c1swXSA9IGN4O1xuICAgICAgICAgICAgeXNbMF0gPSBjeTtcbiAgICAgICAgICAgIHhzWzFdID0gTWF0aC5jb3MoYW5nbGUpICogcmFkaXVzICsgY3g7XG4gICAgICAgICAgICB5c1sxXSA9IE1hdGguc2luKE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJKSAqIE1hdGguc2luKGFuZ2xlKSAqIHJhZGl1cyArIGN5O1xuICAgICAgICAgICAgeHNbMl0gPSB4c1sxXTtcbiAgICAgICAgICAgIHlzWzJdID0gY3kgKyByYWRpdXM7XG4gICAgICAgICAgICB4c1szXSA9IHhzWzJdO1xuICAgICAgICAgICAgeXNbM10gPSB5c1syXSArIHJhZGl1cyArTWF0aC5yYW5kb20oKSoyMDtcbiAgICAgICAgICAgIGxldCBzdGFydFB0OiBQb2ludCA9IG5ldyBQb2ludCh4c1swXSwgeXNbMF0pO1xuICAgICAgICAgICAgbGV0IGVuZFB0OiBQb2ludCA9IG5ldyBQb2ludCh4c1sxXSwgeXNbMV0pO1xuICAgICAgICAgICAgbGV0IHNwbGluZSA9IG5ldyBTcGxpbmUoeHMsIHlzKTtcbiAgICAgICAgICAgIGxldCByZXN1bHQ6IHsgeHM6IG51bWJlcltdLCB5czogbnVtYmVyW10gfSA9IHNwbGluZS5jYWxjdWxhdGUoKTtcbiAgICAgICAgICAgIHRoaXMueHMgPSByZXN1bHQueHM7XG4gICAgICAgICAgICB0aGlzLnlzID0gcmVzdWx0LnlzO1xuICAgICAgICAgICAgbGV0IGxpbmV4czogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgICAgIGxldCBsaW5leXM6IG51bWJlcltdID0gW107XG4gICAgICAgICAgICB0aGlzLnhzID0gbGluZXhzLmNvbmNhdCh0aGlzLnhzKTtcbiAgICAgICAgICAgIHRoaXMueXMgPSBsaW5leXMuY29uY2F0KHRoaXMueXMpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJYcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJZcyA9IFtdO1xuXG4gICAgICAgIH1cbiAgICAgICAgb25NZWFzdXJlKHdpZHRoOk1lYXN1cmVTcGVjLGhlaWdodDpNZWFzdXJlU3BlYyxjYW52YXM6Q2FudmFzKTpTaXple1xuICAgICAgICAgICAgcmV0dXJuIHN1cGVyLm9uTWVhc3VyZSh3aWR0aCxoZWlnaHQsY2FudmFzKTtcbiAgICAgICAgfVxuICAgICAgICBvbkxheW91dChsOm51bWJlcix0Om51bWJlcixyOm51bWJlcixiOm51bWJlcixjYW52YXM6Q2FudmFzKTp2b2lke1xuICAgICAgICAgICAgc3VwZXIub25MYXlvdXQobCx0LHIsYixjYW52YXMpO1xuICAgICAgICB9XG4gICAgICAgIG9uRHJhdyhjb250ZXh0OiBDYW52YXMpOiB2b2lkIHtcbiAgICAgICAgICAgIC8vIHN1cGVyLm9uRHJhdyhjb250ZXh0KTtcbiAgICAgICAgICAgIGxldCBpbmRleDogbnVtYmVyID1wYXJzZUludCh0aGlzLmlkKTsvL01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCByYWRpdXM6IG51bWJlciA9IDI7XG4gICAgICAgICAgICBsZXQgbGVuID0gdGhpcy5yZW5kZXJZcy5sZW5ndGg7XG4gICAgICAgICAgICBsZXQgY2FudmFzID0gY29udGV4dC5jYW52YXM7XG4gICAgICAgICAgICBjYW52YXMuc2F2ZSgpO1xuICAgICAgICAgICAgY2FudmFzLmdsb2JhbEFscGhhID0gdGhpcy5hbHBoYTtcbiAgICAgICAgICAgIGNhbnZhcy5maWxsU3R5bGUgPSBDb2xvcltpbmRleCAlIENvbG9yLmxlbmd0aF07XG4gICAgICAgICAgICBjYW52YXMuYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjYW52YXMuYXJjKHRoaXMucmVuZGVyWHNbbGVuIC0gMV0sIHRoaXMucmVuZGVyWXNbbGVuIC0gMV0sIHJhZGl1cywgMCwgMiAqIE1hdGguUEkpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdHhzID0gW107XG4gICAgICAgICAgICBsZXQgcmVzdWx0eXMgPSBbXTtcbiAgICAgICAgICAgIHZhciBuZXh0eDogbnVtYmVyID0gMDtcbiAgICAgICAgICAgIHZhciBuZXh0eTogbnVtYmVyID0gMDtcbiAgICAgICAgICAgIHZhciBsYXN0YTogbnVtYmVyID0gMDtcbiAgICAgICAgICAgIGxldCBwYWRkaW5nOiBudW1iZXIgPSA1O1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnJlbmRlclhzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgcGFkZGluZyA9IGkgLyB0aGlzLnJlbmRlclhzLmxlbmd0aCAqIHJhZGl1cztcbiAgICAgICAgICAgICAgICB2YXIgeCA9IHRoaXMucmVuZGVyWHNbaV07XG4gICAgICAgICAgICAgICAgdmFyIHkgPSB0aGlzLnJlbmRlcllzW2ldO1xuICAgICAgICAgICAgICAgIHZhciBuZXh0eCA9IHg7XG4gICAgICAgICAgICAgICAgdmFyIG5leHR5ID0geTtcbiAgICAgICAgICAgICAgICB2YXIgYTogbnVtYmVyID0gbGFzdGE7XG4gICAgICAgICAgICAgICAgaWYgKGkgKyAxIDwgdGhpcy5yZW5kZXJYcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dHggPSB0aGlzLnJlbmRlclhzW2kgKyAxXTtcbiAgICAgICAgICAgICAgICAgICAgbmV4dHkgPSB0aGlzLnJlbmRlcllzW2kgKyAxXTtcbiAgICAgICAgICAgICAgICAgICAgYSA9IE1hdGguYXRhbigobmV4dHkgLSB5KSAvIChuZXh0eCAtIHgpKTtcbiAgICAgICAgICAgICAgICAgICAgbGFzdGEgPSBhO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgeG9mZnNldCA9IHBhZGRpbmcgKiBNYXRoLnNpbihhKVxuICAgICAgICAgICAgICAgIHZhciB5b2Zmc2V0ID0gcGFkZGluZyAqIE1hdGguY29zKGEpO1xuICAgICAgICAgICAgICAgIHJlc3VsdHhzWzIgKiBpXSA9IHggKyB4b2Zmc2V0O1xuICAgICAgICAgICAgICAgIHJlc3VsdHlzWzIgKiBpXSA9IHkgLSB5b2Zmc2V0O1xuICAgICAgICAgICAgICAgIHJlc3VsdHhzWzIgKiBpICsgMV0gPSBuZXh0eCArIHhvZmZzZXQ7XG4gICAgICAgICAgICAgICAgcmVzdWx0eXNbMiAqIGkgKyAxXSA9IG5leHR5IC0geW9mZnNldDtcbiAgICAgICAgICAgICAgICByZXN1bHR4c1s0ICogbGVuIC0gMiAqIGkgLSAyXSA9IG5leHR4IC0geG9mZnNldDtcbiAgICAgICAgICAgICAgICByZXN1bHR5c1s0ICogbGVuIC0gMiAqIGkgLSAyXSA9IG5leHR5ICsgeW9mZnNldDtcbiAgICAgICAgICAgICAgICByZXN1bHR4c1s0ICogbGVuIC0gMiAqIGkgLSAxXSA9IHggLSB4b2Zmc2V0O1xuICAgICAgICAgICAgICAgIHJlc3VsdHlzWzQgKiBsZW4gLSAyICogaSAtIDFdID0geSArIHlvZmZzZXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYW52YXMubW92ZVRvKHJlc3VsdHhzWzBdLCByZXN1bHR5c1swXSk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdHhzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgY2FudmFzLmxpbmVUbyhyZXN1bHR4c1tpXSwgcmVzdWx0eXNbaV0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgY2FudmFzLmZpbGwoKTtcbiAgICAgICAgICAgIGNhbnZhcy5jbG9zZVBhdGgoKTtcbiAgICAgICAgICAgIGNhbnZhcy5yZXN0b3JlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgRmlyZVdvcmtzQm9tYlZpZXcyIGV4dGVuZHMgVmlldyB7XG4gICAgICAgIHB1YmxpYyB4czogbnVtYmVyW107XG4gICAgICAgIHB1YmxpYyB5czogbnVtYmVyW107XG4gICAgICAgIHB1YmxpYyByZW5kZXJYczogbnVtYmVyW107XG4gICAgICAgIHB1YmxpYyByZW5kZXJZczogbnVtYmVyW107XG4gICAgICAgIHB1YmxpYyBhbHBoYTogbnVtYmVyID0gMTtcbiAgICAgICAgY29uc3RydWN0b3IoY3g6IG51bWJlciwgY3k6IG51bWJlciwgYW5nbGU6IG51bWJlciwgcmFkaXVzOiBudW1iZXIpIHtcbiAgICAgICAgICAgIHN1cGVyKG51bGwpO1xuXG4gICAgICAgICAgICAvLyBsZXQgeHM6bnVtYmVyW107XG4gICAgICAgICAgICAvLyBsZXQgeXM6bnVtYmVyW107XG4gICAgICAgICAgICB0aGlzLnhzID0gW107XG4gICAgICAgICAgICB0aGlzLnlzID0gW107XG5cbiAgICAgICAgICAgIC8vIHhzWzBdPSBjeDtcbiAgICAgICAgICAgIC8vIHlzWzBdID1jeTtcbiAgICAgICAgICAgIGxldCBleCA9IE1hdGguY29zKGFuZ2xlKSAqIHJhZGl1cyArIGN4O1xuICAgICAgICAgICAgbGV0IGV5ID0gTWF0aC5zaW4oTWF0aC5yYW5kb20oKSAqIE1hdGguUEkpICogTWF0aC5zaW4oYW5nbGUpICogcmFkaXVzICsgY3k7XG4gICAgICAgICAgICBsZXQgZHg6IG51bWJlciA9IGV4IC0gY3g7XG4gICAgICAgICAgICBsZXQgZHk6IG51bWJlciA9IGV5IC0gY3k7XG4gICAgICAgICAgICBsZXQgc2l6ZTogbnVtYmVyID0gMTAwO1xuICAgICAgICAgICAgbGV0IHN0ZXB4OiBudW1iZXIgPSBkeCAvIHNpemU7XG4gICAgICAgICAgICBsZXQgc3RlcHk6IG51bWJlciA9IGR5IC8gc2l6ZTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgKytpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy54cy5wdXNoKGN4ICsgc3RlcHggKiBpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnlzLnB1c2goY3kgKyBzdGVweSAqIGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5yZW5kZXJYcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJZcyA9IFtdO1xuXG4gICAgICAgIH0gIG9uTWVhc3VyZSh3aWR0aDpNZWFzdXJlU3BlYyxoZWlnaHQ6TWVhc3VyZVNwZWMsY2FudmFzOkNhbnZhcyk6U2l6ZXtcbiAgICAgICAgICAgIHJldHVybiBzdXBlci5vbk1lYXN1cmUod2lkdGgsaGVpZ2h0LGNhbnZhcyk7XG4gICAgICAgIH1cbiAgICAgICAgb25MYXlvdXQobDpudW1iZXIsdDpudW1iZXIscjpudW1iZXIsYjpudW1iZXIsY2FudmFzOkNhbnZhcyk6dm9pZHtcbiAgICAgICAgICAgIHN1cGVyLm9uTGF5b3V0KGwsdCxyLGIsY2FudmFzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9uRHJhdyhjb250ZXh0OiBDYW52YXMpOiB2b2lkIHtcbiAgICAgICAgICAgIC8vIHN1cGVyLm9uRHJhdyhjb250ZXh0KTtcbiAgICAgICAgICAgIGxldCBpbmRleDogbnVtYmVyID0gcGFyc2VJbnQodGhpcy5pZCk7Ly9NYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApO1xuICAgICAgICAgICAgbGV0IHJhZGl1czogbnVtYmVyID0gMjtcbiAgICAgICAgICAgIGxldCBsZW4gPSB0aGlzLnJlbmRlcllzLmxlbmd0aDtcbiAgICAgICAgICAgIGxldCBjYW52YXMgPSBjb250ZXh0LmNhbnZhcztcbiAgICAgICAgICAgIGNhbnZhcy5zYXZlKCk7XG4gICAgICAgICAgICBjYW52YXMuZ2xvYmFsQWxwaGEgPSB0aGlzLmFscGhhO1xuICAgICAgICAgICAgY2FudmFzLmZpbGxTdHlsZSA9IENvbG9yW2luZGV4ICUgQ29sb3IubGVuZ3RoXTtcbiAgICAgICAgICAgIGNhbnZhcy5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGNhbnZhcy5hcmModGhpcy5yZW5kZXJYc1tsZW4gLSAxXSwgdGhpcy5yZW5kZXJZc1tsZW4gLSAxXSwgcmFkaXVzLCAwLCAyICogTWF0aC5QSSk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0eHMgPSBbXTtcbiAgICAgICAgICAgIGxldCByZXN1bHR5cyA9IFtdO1xuICAgICAgICAgICAgdmFyIG5leHR4OiBudW1iZXIgPSAwO1xuICAgICAgICAgICAgdmFyIG5leHR5OiBudW1iZXIgPSAwO1xuICAgICAgICAgICAgdmFyIGxhc3RhOiBudW1iZXIgPSAwO1xuICAgICAgICAgICAgbGV0IHBhZGRpbmc6IG51bWJlciA9IDU7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucmVuZGVyWHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBwYWRkaW5nID0gaSAvIHRoaXMucmVuZGVyWHMubGVuZ3RoICogcmFkaXVzO1xuICAgICAgICAgICAgICAgIHZhciB4ID0gdGhpcy5yZW5kZXJYc1tpXTtcbiAgICAgICAgICAgICAgICB2YXIgeSA9IHRoaXMucmVuZGVyWXNbaV07XG4gICAgICAgICAgICAgICAgdmFyIG5leHR4ID0geDtcbiAgICAgICAgICAgICAgICB2YXIgbmV4dHkgPSB5O1xuICAgICAgICAgICAgICAgIHZhciBhOiBudW1iZXIgPSBsYXN0YTtcbiAgICAgICAgICAgICAgICBpZiAoaSArIDEgPCB0aGlzLnJlbmRlclhzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBuZXh0eCA9IHRoaXMucmVuZGVyWHNbaSArIDFdO1xuICAgICAgICAgICAgICAgICAgICBuZXh0eSA9IHRoaXMucmVuZGVyWXNbaSArIDFdO1xuICAgICAgICAgICAgICAgICAgICBhID0gTWF0aC5hdGFuKChuZXh0eSAtIHkpIC8gKG5leHR4IC0geCkpO1xuICAgICAgICAgICAgICAgICAgICBsYXN0YSA9IGE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciB4b2Zmc2V0ID0gcGFkZGluZyAqIE1hdGguc2luKGEpXG4gICAgICAgICAgICAgICAgdmFyIHlvZmZzZXQgPSBwYWRkaW5nICogTWF0aC5jb3MoYSk7XG4gICAgICAgICAgICAgICAgcmVzdWx0eHNbMiAqIGldID0geCArIHhvZmZzZXQ7XG4gICAgICAgICAgICAgICAgcmVzdWx0eXNbMiAqIGldID0geSAtIHlvZmZzZXQ7XG4gICAgICAgICAgICAgICAgcmVzdWx0eHNbMiAqIGkgKyAxXSA9IG5leHR4ICsgeG9mZnNldDtcbiAgICAgICAgICAgICAgICByZXN1bHR5c1syICogaSArIDFdID0gbmV4dHkgLSB5b2Zmc2V0O1xuICAgICAgICAgICAgICAgIHJlc3VsdHhzWzQgKiBsZW4gLSAyICogaSAtIDJdID0gbmV4dHggLSB4b2Zmc2V0O1xuICAgICAgICAgICAgICAgIHJlc3VsdHlzWzQgKiBsZW4gLSAyICogaSAtIDJdID0gbmV4dHkgKyB5b2Zmc2V0O1xuICAgICAgICAgICAgICAgIHJlc3VsdHhzWzQgKiBsZW4gLSAyICogaSAtIDFdID0geCAtIHhvZmZzZXQ7XG4gICAgICAgICAgICAgICAgcmVzdWx0eXNbNCAqIGxlbiAtIDIgKiBpIC0gMV0gPSB5ICsgeW9mZnNldDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhbnZhcy5tb3ZlVG8ocmVzdWx0eHNbMF0sIHJlc3VsdHlzWzBdKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0eHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBjYW52YXMubGluZVRvKHJlc3VsdHhzW2ldLCByZXN1bHR5c1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYW52YXMuZmlsbCgpO1xuICAgICAgICAgICAgY2FudmFzLmNsb3NlUGF0aCgpO1xuICAgICAgICAgICAgY2FudmFzLnJlc3RvcmUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBleHBvcnQgY2xhc3MgRmlyZUFuaW1hdGlvbiBleHRlbmRzIEFuaW1hdGlvbiB7XG4gICAgICAgIHByaXZhdGUgeHM6IG51bWJlcltdO1xuICAgICAgICBwcml2YXRlIHlzOiBudW1iZXJbXTtcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgdGhpcy5lYXNlID0gbmV3IEFuaW1hdGlvbkVhc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VHJhbnNmb3JtYXRpb24oaW50ZXJwb2xhdGVkVGltZTogbnVtYmVyLCBjYW52YXM6IENhbnZhcywgdmlldzogVmlldykge1xuICAgICAgICAgICAgbGV0IHNjYWxlOiBudW1iZXIgPSB0aGlzLmZyb20gKyAodGhpcy50byAtIHRoaXMuZnJvbSkgKiBpbnRlcnBvbGF0ZWRUaW1lO1xuXG4gICAgICAgICAgICBsZXQgaW5kZXg6IG51bWJlciA9IE1hdGguZmxvb3IoKHRoaXMueHMubGVuZ3RoIC0gMSkgKiBzY2FsZSk7XG4gICAgICAgICAgICBpZiAodmlldyBpbnN0YW5jZW9mIEZpcmVXb3Jrc0JvbWJWaWV3IHx8IHZpZXcgaW5zdGFuY2VvZiBGaXJlV29ya3NCb21iVmlldzIpIHtcbiAgICAgICAgICAgICAgICB2aWV3LmFscGhhID0gMSAtIHNjYWxlICogMC44O1xuICAgICAgICAgICAgICAgIGxldCBzaXplOiBudW1iZXIgPSAzMDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy54cy5sZW5ndGggLSAxIDwgaW5kZXggKyBzaXplKSB7XG4gICAgICAgICAgICAgICAgICAgIHNpemUgPSB0aGlzLnhzLmxlbmd0aCAtIGluZGV4IC0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmlldy5yZW5kZXJYcyA9IHRoaXMueHMuc2xpY2UoaW5kZXgsIGluZGV4ICsgc2l6ZSk7XG4gICAgICAgICAgICAgICAgdmlldy5yZW5kZXJZcyA9IHRoaXMueXMuc2xpY2UoaW5kZXgsIGluZGV4ICsgc2l6ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgb25TdGFydEFuaWFtdGlvbihjYW52YXM6IENhbnZhcywgdmlldzogVmlldyk6IHZvaWQge1xuICAgICAgICAgICAgc3VwZXIub25TdGFydEFuaWFtdGlvbihjYW52YXMsdmlldyk7XG4gICAgICAgICAgICBpZiAodmlldyBpbnN0YW5jZW9mIEZpcmVXb3Jrc0JvbWJWaWV3IHx8IHZpZXcgaW5zdGFuY2VvZiBGaXJlV29ya3NCb21iVmlldzIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnhzID0gdmlldy54cy5zbGljZSgwKTtcbiAgICAgICAgICAgICAgICB0aGlzLnlzID0gdmlldy55cy5zbGljZSgwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwib25TdGFydEFuaW1hdGlvbiBcIik7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnhzKTtcblxuICAgICAgICB9XG4gICAgICAgIG9uRW5kQW5pbWF0aW9uKGNhbnZhczogQ2FudmFzLCB2aWV3OiBWaWV3KTogdm9pZCB7XG4gICAgICAgICAgICBzdXBlci5vbkVuZEFuaW1hdGlvbihjYW52YXMsdmlldyk7XG4gICAgICAgICAgICBpZiAodmlldyBpbnN0YW5jZW9mIEZpcmVXb3Jrc0JvbWJWaWV3IHx8IHZpZXcgaW5zdGFuY2VvZiBGaXJlV29ya3NCb21iVmlldzIpIHtcbiAgICAgICAgICAgICAgICB2aWV3LnJlbmRlclhzID0gW107XG4gICAgICAgICAgICAgICAgdmlldy5yZW5kZXJZcyA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJvbkVuZEFuaW1hdGlvbiBcIik7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnhzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBGaXJlV29ya3NDb250YWluZXIgZXh0ZW5kcyBGcmFtZUxheW91dCB7XG4gICAgICAgIHJlbmRlclg6IG51bWJlcjtcbiAgICAgICAgcmVuZGVyWTogbnVtYmVyO1xuICAgICAgICB4OiBudW1iZXI7XG4gICAgICAgIHk6IG51bWJlcjtcbiAgICAgICAgaDogbnVtYmVyO1xuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHN1cGVyKG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIG9uTWVhc3VyZSh3aWR0aDpNZWFzdXJlU3BlYyxoZWlnaHQ6TWVhc3VyZVNwZWMsY2FudmFzOkNhbnZhcyk6U2l6ZXtcbiAgICAgICAgICAgIHJldHVybiBzdXBlci5vbk1lYXN1cmUod2lkdGgsaGVpZ2h0LGNhbnZhcyk7XG4gICAgICAgIH1cbiAgICAgICAgb25MYXlvdXQobDpudW1iZXIsdDpudW1iZXIscjpudW1iZXIsYjpudW1iZXIsY2FudmFzOkNhbnZhcyk6dm9pZHtcbiAgICAgICAgICAgIHN1cGVyLm9uTGF5b3V0KGwsdCxyLGIsY2FudmFzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9uRHJhdyhjb250ZXh0OiBDYW52YXMpOiB2b2lkIHtcbiAgICAgICAgICAgIC8vIHN1cGVyLm9uRHJhdyhjb250ZXh0KTtcbiAgICAgICAgICAgIGlmICh0aGlzLnJlbmRlclggPT0gbnVsbCB8fCB0aGlzLnJlbmRlclkgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBpbmRleDogbnVtYmVyID0gcGFyc2VJbnQodGhpcy5pZCk7XG5cbiAgICAgICAgICAgIGxldCByYWRpdXM6IG51bWJlciA9IDU7XG4gICAgICAgICAgICBsZXQgY2FudmFzID0gY29udGV4dC5jYW52YXM7XG4gICAgICAgICAgICBjYW52YXMuc2F2ZSgpO1xuICAgICAgICAgICAgY2FudmFzLmZpbGxTdHlsZSA9IENvbG9yW2luZGV4ICUgQ29sb3IubGVuZ3RoXTtcbiAgICAgICAgICAgIGNhbnZhcy5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGNhbnZhcy5hcmModGhpcy5yZW5kZXJYLCB0aGlzLnJlbmRlclksIHJhZGl1cywgMCwgMiAqIE1hdGguUEkpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdHhzID0gW107XG4gICAgICAgICAgICBsZXQgcmVzdWx0eXMgPSBbXTtcbiAgICAgICAgICAgIHZhciBuZXh0eDogbnVtYmVyID0gMDtcbiAgICAgICAgICAgIHZhciBuZXh0eTogbnVtYmVyID0gMDtcbiAgICAgICAgICAgIHZhciBsYXN0YTogbnVtYmVyID0gMDtcbiAgICAgICAgICAgIGxldCBwYWRkaW5nOiBudW1iZXIgPSA1O1xuICAgICAgICAgICAgcmVzdWx0eHNbMF0gPSB0aGlzLnJlbmRlclggLSByYWRpdXM7XG4gICAgICAgICAgICByZXN1bHR5c1swXSA9IHRoaXMucmVuZGVyWTtcbiAgICAgICAgICAgIHJlc3VsdHhzWzFdID0gdGhpcy5yZW5kZXJYICsgcmFkaXVzO1xuICAgICAgICAgICAgcmVzdWx0eXNbMV0gPSB0aGlzLnJlbmRlclk7XG4gICAgICAgICAgICByZXN1bHR4c1syXSA9IHRoaXMucmVuZGVyWDtcbiAgICAgICAgICAgIHJlc3VsdHlzWzJdID0gdGhpcy5yZW5kZXJZICsgMTAwO1xuICAgICAgICAgICAgY2FudmFzLm1vdmVUbyhyZXN1bHR4c1swXSwgcmVzdWx0eXNbMF0pO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHR4cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIGNhbnZhcy5saW5lVG8ocmVzdWx0eHNbaV0sIHJlc3VsdHlzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhbnZhcy5maWxsKCk7XG4gICAgICAgICAgICBjYW52YXMuY2xvc2VQYXRoKCk7XG4gICAgICAgICAgICBjYW52YXMucmVzdG9yZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIExpbmVBbmltYXRpb24gZXh0ZW5kcyBBbmltYXRpb24ge1xuICAgICAgICBwcml2YXRlIHg6IG51bWJlcjtcbiAgICAgICAgcHJpdmF0ZSB5OiBudW1iZXI7XG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgIGlmIChpbmRleCAlIDMgPT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWFzZSA9IG5ldyBQb2x5T3V0RWFzZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpbmRleCAlIDMgPT0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWFzZSA9IG5ldyBQb2x5SW5FYXNlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZWFzZSA9IG5ldyBBbmltYXRpb25FYXNlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VHJhbnNmb3JtYXRpb24oaW50ZXJwb2xhdGVkVGltZTogbnVtYmVyLCBjYW52YXM6IENhbnZhcywgdmlldzogVmlldykge1xuICAgICAgICAgICAgbGV0IHNjYWxlOiBudW1iZXIgPSB0aGlzLmZyb20gKyAodGhpcy50byAtIHRoaXMuZnJvbSkgKiBpbnRlcnBvbGF0ZWRUaW1lO1xuICAgICAgICAgICAgaWYgKHZpZXcgaW5zdGFuY2VvZiBGaXJlV29ya3NDb250YWluZXIpIHtcbiAgICAgICAgICAgICAgICB2aWV3LnJlbmRlclggPSB0aGlzLng7Ly8rTWF0aC5yYW5kb20oKSoxMC01O1xuICAgICAgICAgICAgICAgIHZpZXcucmVuZGVyWSA9IHRoaXMueSAtIHZpZXcuaCAqIHNjYWxlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgb25TdGFydEFuaWFtdGlvbihjYW52YXM6IENhbnZhcywgdmlldzogVmlldyk6IHZvaWQge1xuICAgICAgICAgICAgc3VwZXIub25TdGFydEFuaWFtdGlvbihjYW52YXMsdmlldyk7XG4gICAgICAgICAgICBpZiAodmlldyBpbnN0YW5jZW9mIEZpcmVXb3Jrc0NvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgIHRoaXMueCA9IHZpZXcueDtcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB2aWV3Lnk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgICBvbkVuZEFuaW1hdGlvbihjYW52YXM6IENhbnZhcywgdmlldzogVmlldyk6IHZvaWQge1xuICAgICAgICAgICAgc3VwZXIub25FbmRBbmltYXRpb24oY2FudmFzLHZpZXcpO1xuICAgICAgICAgICAgaWYgKHZpZXcgaW5zdGFuY2VvZiBGaXJlV29ya3NDb250YWluZXIpIHtcbiAgICAgICAgICAgICAgICB2aWV3LnJlbmRlclggPSBudWxsOy8vIHRoaXMueDtcbiAgICAgICAgICAgICAgICB2aWV3LnJlbmRlclkgPSBudWxsOy8vdGhpcy55O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGV4cG9ydCBjbGFzcyBGaXJlTGF5b3V0IGV4dGVuZHMgUm9vdFZpZXcge1xuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHN1cGVyKG51bGwpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXR0YWNoRWxlbWVudChlbGVtZW50OiBIVE1MRWxlbWVudCwgcmVuZGVyVHlwZTpSZW5kZXJUeXBlKSB7XG4gICAgICAgICAgICBzdXBlci5hdHRhY2hFbGVtZW50KGVsZW1lbnQsVXRpbC5hc0VudW0ocmVuZGVyVHlwZSxSZW5kZXJUeXBlKSk7XG4gICAgICAgIH1cbiAgICAgICAgaW5pdCgpIHtcbiAgICAgICAgICAgIHRoaXMuY2xpcCA9ZmFsc2U7XG4gICAgICAgICAgICBmb3IgKGxldCBtID0gMDsgbSA8IDMwOyArK20pIHtcbiAgICAgICAgICAgICAgICBsZXQgc2l6ZTogbnVtYmVyID0gMjAwO1xuICAgICAgICAgICAgICAgIGxldCBzdGFydEFuZ2xlOiBudW1iZXIgPSAwOy8vKk1hdGguUEkvMTgwO1xuICAgICAgICAgICAgICAgIGxldCBlbmRBbmdsZTogbnVtYmVyID0gMzYwOy8vICogTWF0aC5QSS8xODA7XG4gICAgICAgICAgICAgICAgbGV0IGNvbnN0Y3g6IG51bWJlciA9IDQwMCArIE1hdGgucmFuZG9tKCkgKiAzMDAgLSAxNTA7XG4gICAgICAgICAgICAgICAgbGV0IGNvbnN0Y3k6IG51bWJlciA9IDIwMDtcbiAgICAgICAgICAgICAgICBsZXQgcmFkaXVzOiBudW1iZXIgPSAyMDAgKyBNYXRoLnJhbmRvbSgpICoyMDA7XG4gICAgICAgICAgICAgICAgbGV0IGZpcmVXb3Jrc0NvbnRhaW5lcjogRmlyZVdvcmtzQ29udGFpbmVyID0gbmV3IEZpcmVXb3Jrc0NvbnRhaW5lcigpO1xuICAgICAgICAgICAgICAgIGZpcmVXb3Jrc0NvbnRhaW5lci5sYXlvdXRQYXJhbXMud2lkdGggPSBsYXlvdXRQYXJhbXMuTUFUQ0hfUEFSRU5UO1xuICAgICAgICAgICAgICAgIGZpcmVXb3Jrc0NvbnRhaW5lci5sYXlvdXRQYXJhbXMuaGVpZ2h0ID0gbGF5b3V0UGFyYW1zLk1BVENIX1BBUkVOVDtcbiAgICAgICAgICAgICAgICBmaXJlV29ya3NDb250YWluZXIuaCA9IDYwMDtcbiAgICAgICAgICAgICAgICBmaXJlV29ya3NDb250YWluZXIueCA9IGNvbnN0Y3g7XG4gICAgICAgICAgICAgICAgZmlyZVdvcmtzQ29udGFpbmVyLnkgPSBjb25zdGN5ICsgZmlyZVdvcmtzQ29udGFpbmVyLmg7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFuZ2xlOiBudW1iZXIgPSAoc3RhcnRBbmdsZSArIChlbmRBbmdsZSAtIHN0YXJ0QW5nbGUpIC8gc2l6ZSAqIGkpICogTWF0aC5QSSAvIDE4MDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHhzOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBsZXQgeXM6IG51bWJlcltdID0gW107XG4gICAgICAgICAgICAgICAgICAgIGxldCBjeCA9IGNvbnN0Y3g7Ly8rIE1hdGgucmFuZG9tKCkgKiAyMDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN5ID0gY29uc3RjeTsvLysgTWF0aC5yYW5kb20oKSAqIDIwO1xuICAgICAgICAgICAgICAgICAgICBpZiAobSAlIDIgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpcmU6IEZpcmVXb3Jrc0JvbWJWaWV3MiA9IG5ldyBGaXJlV29ya3NCb21iVmlldzIoY3gsIGN5LCBhbmdsZSwgcmFkaXVzICsgTWF0aC5yYW5kb20oKSAqIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJlLmxheW91dFBhcmFtcy53aWR0aCA9IDEwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcmUubGF5b3V0UGFyYW1zLmhlaWdodCA9IDEwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxldCBmaXJlOiBGaXJlV29ya3NCb21iVmlldyA9IG5ldyBGaXJlV29ya3NCb21iVmlldyhjeCwgY3ksIGFuZ2xlLCByYWRpdXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlyZS5pZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkrXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcmVXb3Jrc0NvbnRhaW5lci5hZGRWaWV3KGZpcmUpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpcmU6IEZpcmVXb3Jrc0JvbWJWaWV3ID0gbmV3IEZpcmVXb3Jrc0JvbWJWaWV3KGN4LCBjeSwgYW5nbGUsIHJhZGl1cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJlLmxheW91dFBhcmFtcy53aWR0aCA9IDEwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcmUubGF5b3V0UGFyYW1zLmhlaWdodCA9IDEwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcmUuaWQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApK1wiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJlV29ya3NDb250YWluZXIuYWRkVmlldyhmaXJlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmFkZFZpZXcoZmlyZVdvcmtzQ29udGFpbmVyLDApO1xuICAgICAgICAgICAgICAgIGZpcmVXb3Jrc0NvbnRhaW5lci5pZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkrXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgYW5pbWF0aW9uVGVzdCgpIHtcbiAgICAgICAgICAgIGxldCBpbmRleDpudW1iZXIgPSAwXG4gICAgICAgICAgICBmb3IgKGxldCB2aWV3IG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodmlldyBpbnN0YW5jZW9mIEZpcmVXb3Jrc0NvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpcmVXb3Jrc0NvbnRhaW5lcjogRmlyZVdvcmtzQ29udGFpbmVyID0gdmlldztcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhbmltYXRpb24xOiBMaW5lQW5pbWF0aW9uID0gbmV3IExpbmVBbmltYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbjEuZHVyYXRpb24gPSAxMDAwICsgTWF0aC5yYW5kb20oKSAqIDEwMDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb24xLmZyb20gPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uMS50byA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJlV29ya3NDb250YWluZXIuc3RhcnRBbmltYXRpb24oYW5pbWF0aW9uMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2xkYW5pbWF0aW9uRW5kID0gYW5pbWF0aW9uMS5vbkVuZEFuaW1hdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbjEuc2V0QW5pbWF0aW9uQ2FsbEJhY2sobnVsbCwoIHZpZXc6IFZpZXcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwib24gTGluZSBBbmltYXRpb24gZW5kICA9PT1cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZm9yIChsZXQgdmlldyBvZiBmaXJlV29ya3NDb250YWluZXIuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgbGV0IGFuaW1hdGlvbiA9IG5ldyBGaXJlQW5pbWF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGFuaW1hdGlvbi5kdXJhdGlvbiA9IE1hdGgucmFuZG9tKCkgKiAxMDAwICsgMjAwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgYW5pbWF0aW9uLmZyb20gPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBhbmltYXRpb24udG8gPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICB2aWV3LnN0YXJ0QW5pbWF0aW9uKGFuaW1hdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9MDsgaSA8IGZpcmVXb3Jrc0NvbnRhaW5lci5nZXRDaGlsZENvdW50KCk7ICsraSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IGZpcmVXb3Jrc0NvbnRhaW5lci5nZXRDaGlsZEF0KGkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYW5pbWF0aW9uID0gbmV3IEZpcmVBbmltYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5kdXJhdGlvbiA9IE1hdGgucmFuZG9tKCkgKiAxMDAwICsgMjAwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5mcm9tID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbi50byA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5zdGFydEFuaW1hdGlvbihhbmltYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgaW5kZXgqKDEwMDArTWF0aC5yYW5kb20oKSoxMDAwKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgZXhwb3J0IGNsYXNzIFNwbGluZSB7XG4gICAgICAgIC8vIFxuICAgICAgICBwcml2YXRlIGsgPSAwLjAwMjtcblxuICAgICAgICBwcml2YXRlIF94OiBudW1iZXJbXTtcbiAgICAgICAgcHJpdmF0ZSBfeTogbnVtYmVyW107XG5cbiAgICAgICAgcHJpdmF0ZSBfYTogUG9pbnRbXSA9IFtdO1xuICAgICAgICBwcml2YXRlIF9iOiBQb2ludFtdID0gW107XG4gICAgICAgIHByaXZhdGUgX2M6IFBvaW50W10gPSBbXTtcbiAgICAgICAgcHJpdmF0ZSBfZDogUG9pbnRbXSA9IFtdO1xuXG4gICAgICAgIHByaXZhdGUgX2xlbjogbnVtYmVyO1xuXG4gICAgICAgIC8vICBUXjMgICAgIC0xICAgICArMyAgICAtMyAgICArMSAgICAgL1xuICAgICAgICAvLyAgVF4yICAgICArMiAgICAgLTUgICAgIDQgICAgLTEgICAgL1xuICAgICAgICAvLyAgVF4xICAgICAtMSAgICAgIDAgICAgIDEgICAgIDAgICAvICAyXG4gICAgICAgIC8vICBUXjAgICAgICAwICAgICAgMiAgICAgMCAgICAgMCAgL1xuXG4gICAgICAgIHByaXZhdGUgbSA9IFtcbiAgICAgICAgICAgIFstMSAqIDAuNSwgKzMgKiAwLjUsIC0zICogMC41LCArMSAqIDAuNV0sXG4gICAgICAgICAgICBbKzIgKiAwLjUsIC01ICogMC41LCArNCAqIDAuNSwgLTEgKiAwLjVdLFxuICAgICAgICAgICAgWy0xICogMC41LCAwLCArMSAqIDAuNSwgMF0sXG4gICAgICAgICAgICBbMCwgKzIgKiAwLjUsIDAsIDBdLFxuICAgICAgICAgICAgLy8gWzEsMCwwLDBdLFxuICAgICAgICAgICAgLy8gWy0zLDMsMCwwXSxcbiAgICAgICAgICAgIC8vIFszLC02LDMsMF0sXG4gICAgICAgICAgICAvLyBbLTEsMywtMywxXVxuICAgICAgICBdO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlcltdLCB5OiBudW1iZXJbXSkge1xuICAgICAgICAgICAgdGhpcy5feCA9IHg7XG4gICAgICAgICAgICB0aGlzLl95ID0geTtcblxuICAgICAgICAgICAgdmFyIGxlbiA9IHRoaXMuX2xlbiA9IE1hdGgubWluKHgubGVuZ3RoLCB5Lmxlbmd0aCk7XG5cbiAgICAgICAgICAgIGlmIChsZW4gPiAzKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW4gLSAxOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHAxID0gKGkgPT0gMCkgPyBuZXcgUG9pbnQoeFtpXSwgeVtpXSkgOiBuZXcgUG9pbnQoeFtpIC0gMV0sIHlbaSAtIDFdKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHAyID0gbmV3IFBvaW50KHhbaV0sIHlbaV0pO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcDMgPSBuZXcgUG9pbnQoeFtpICsgMV0sIHlbaSArIDFdKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHA0ID0gKGkgPT0gbGVuIC0gMikgPyBuZXcgUG9pbnQoeFtpICsgMV0sIHlbaSArIDFdKSA6IG5ldyBQb2ludCh4W2kgKyAyXSwgeVtpICsgMl0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBhID0gbmV3IFBvaW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBiID0gbmV3IFBvaW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjID0gbmV3IFBvaW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkID0gbmV3IFBvaW50KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgYS54ID0gcDEueCAqIHRoaXMubVswXVswXSArIHAyLnggKiB0aGlzLm1bMF1bMV0gKyBwMy54ICogdGhpcy5tWzBdWzJdICsgcDQueCAqIHRoaXMubVswXVszXTtcbiAgICAgICAgICAgICAgICAgICAgYi54ID0gcDEueCAqIHRoaXMubVsxXVswXSArIHAyLnggKiB0aGlzLm1bMV1bMV0gKyBwMy54ICogdGhpcy5tWzFdWzJdICsgcDQueCAqIHRoaXMubVsxXVszXTtcbiAgICAgICAgICAgICAgICAgICAgYy54ID0gcDEueCAqIHRoaXMubVsyXVswXSArIHAyLnggKiB0aGlzLm1bMl1bMV0gKyBwMy54ICogdGhpcy5tWzJdWzJdICsgcDQueCAqIHRoaXMubVsyXVszXTtcbiAgICAgICAgICAgICAgICAgICAgZC54ID0gcDEueCAqIHRoaXMubVszXVswXSArIHAyLnggKiB0aGlzLm1bM11bMV0gKyBwMy54ICogdGhpcy5tWzNdWzJdICsgcDQueCAqIHRoaXMubVszXVszXTtcblxuICAgICAgICAgICAgICAgICAgICBhLnkgPSBwMS55ICogdGhpcy5tWzBdWzBdICsgcDIueSAqIHRoaXMubVswXVsxXSArIHAzLnkgKiB0aGlzLm1bMF1bMl0gKyBwNC55ICogdGhpcy5tWzBdWzNdO1xuICAgICAgICAgICAgICAgICAgICBiLnkgPSBwMS55ICogdGhpcy5tWzFdWzBdICsgcDIueSAqIHRoaXMubVsxXVsxXSArIHAzLnkgKiB0aGlzLm1bMV1bMl0gKyBwNC55ICogdGhpcy5tWzFdWzNdO1xuICAgICAgICAgICAgICAgICAgICBjLnkgPSBwMS55ICogdGhpcy5tWzJdWzBdICsgcDIueSAqIHRoaXMubVsyXVsxXSArIHAzLnkgKiB0aGlzLm1bMl1bMl0gKyBwNC55ICogdGhpcy5tWzJdWzNdO1xuICAgICAgICAgICAgICAgICAgICBkLnkgPSBwMS55ICogdGhpcy5tWzNdWzBdICsgcDIueSAqIHRoaXMubVszXVsxXSArIHAzLnkgKiB0aGlzLm1bM11bMl0gKyBwNC55ICogdGhpcy5tWzNdWzNdO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2EucHVzaChhKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYi5wdXNoKGIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jLnB1c2goYyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2QucHVzaChkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIGNhbGN1bGF0ZVBvaW50KHZhbDogbnVtYmVyKTogYW55IHtcbiAgICAgICAgICAgIHZhciBpID0gTWF0aC5mbG9vcih2YWwpO1xuXG4gICAgICAgICAgICBpZiAoaSA8IDApIHtcbiAgICAgICAgICAgICAgICBpID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGkgPiB0aGlzLl9sZW4gLSAyKSB7XG4gICAgICAgICAgICAgICAgaSA9IHRoaXMuX2xlbiAtIDI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBkID0gdmFsIC0gaTtcblxuICAgICAgICAgICAgdmFyIHggPSAoKHRoaXMuX2FbaV0ueCAqIGQgKyB0aGlzLl9iW2ldLngpICogZCArIHRoaXMuX2NbaV0ueCkgKiBkICsgdGhpcy5fZFtpXS54O1xuICAgICAgICAgICAgdmFyIHkgPSAoKHRoaXMuX2FbaV0ueSAqIGQgKyB0aGlzLl9iW2ldLnkpICogZCArIHRoaXMuX2NbaV0ueSkgKiBkICsgdGhpcy5fZFtpXS55O1xuXG4gICAgICAgICAgICByZXR1cm4geyB4OiB4LCB5OiB5IH07XG4gICAgICAgIH1cblxuICAgICAgICBjYWxjdWxhdGUoeHNjYWxlOiBudW1iZXIgPSAxLCB5c2NhbGU6IG51bWJlciA9IDEpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9sZW4gPD0gMykge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IHhzOiB0aGlzLl94LCB5czogdGhpcy5feSB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgeHMgPSBbXTtcbiAgICAgICAgICAgIHZhciB5cyA9IFtdO1xuXG4gICAgICAgICAgICB2YXIgcDAgPSB0aGlzLmNhbGN1bGF0ZVBvaW50KDApO1xuICAgICAgICAgICAgeHMucHVzaChwMC54KTtcbiAgICAgICAgICAgIHlzLnB1c2gocDAueSk7XG5cbiAgICAgICAgICAgIHZhciBkZWx0YSA9IHRoaXMuX2xlbiAqIHRoaXMuaztcbiAgICAgICAgICAgIHZhciBkeCA9IDMgKiB4c2NhbGU7XG4gICAgICAgICAgICB2YXIgZHkgPSAzICogeXNjYWxlO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gZGVsdGE7IGkgPD0gdGhpcy5fbGVuIC0gMTsgaSArPSBkZWx0YSkge1xuICAgICAgICAgICAgICAgIHZhciBwID0gdGhpcy5jYWxjdWxhdGVQb2ludChpKTtcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMocDAueCAtIHAueCkgPj0gZHggfHwgTWF0aC5hYnMocDAueSAtIHAueSkgPj0gZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgeHMucHVzaChwLngpO1xuICAgICAgICAgICAgICAgICAgICB5cy5wdXNoKHAueSlcbiAgICAgICAgICAgICAgICAgICAgcDAgPSBwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh4c1t4cy5sZW5ndGggLSAxXS54ICE9IHAueCB8fCB5c1t5cy5sZW5ndGggLSAxXS55ICE9IHAueSkge1xuICAgICAgICAgICAgICAgIHhzLnB1c2gocC54KTtcbiAgICAgICAgICAgICAgICB5cy5wdXNoKHAueSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IHhzOiB4cywgeXM6IHlzIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgXG5cbiAgICBleHBvcnQgY2xhc3MgUG9seUluRWFzZSBleHRlbmRzIEFuaW1hdGlvbkVhc2Uge1xuICAgICAgICBwdWJsaWMgZWFzZSh0OiBudW1iZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnBvdyh0LCAzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBleHBvcnQgY2xhc3MgUG9seU91dEVhc2UgZXh0ZW5kcyBBbmltYXRpb25FYXNlIHtcbiAgICAgICAgcHVibGljIGVhc2UodDogbnVtYmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gMSAtIE1hdGgucG93KDEgLSB0LCAzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IEZSQU1FOiBudW1iZXIgPSA2MDtcbiAgICBleHBvcnQgY2xhc3MgQmV6aWVyIHtcblxuICAgICAgICAvLyBjb250cm9sUG9pbnRzOiBQb2ludFtdO1xuICAgICAgICB4czpudW1iZXJbXTtcbiAgICAgICAgeXM6bnVtYmVyW107XG4gICAgICAgIGNvbnN0cnVjdG9yKHhzOm51bWJlcltdLHlzOm51bWJlcltdKSB7XG4gICAgICAgICAgICAvLyB0aGlzLmNvbnRyb2xQb2ludHMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMueHM9eHM7XG4gICAgICAgICAgICB0aGlzLnlzPXlzO1xuICAgICAgICB9XG4gICAgICAgIHByaXZhdGUgYnVpbGRCZXppZXJQb2ludHMoKXtcbiAgICAgICAgICAgIC8vIGxldCBwb2ludHM6IFBvaW50W10gPSBbXTtcbiAgICAgICAgICAgIGxldCB4czpudW1iZXJbXT1bXTtcbiAgICAgICAgICAgIGxldCB5czpudW1iZXJbXT1bXTtcbiAgICAgICAgICAgIC8vIGxldCBvcmRlciA9IHRoaXMuY29udHJvbFBvaW50cy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgbGV0IG9yZGVyID0gdGhpcy54cy5sZW5ndGgtMTtcbiAgICAgICAgICAgIGxldCBkZWx0YSA9IDEuMCAvIEZSQU1FO1xuICAgICAgICAgICAgZm9yIChsZXQgdCA9IDA7IHQgPD0gMTsgdCArPSBkZWx0YSkge1xuICAgICAgICAgICAgICAgIC8vIHBvaW50cy5wdXNoKG5ldyBQb2ludCh0aGlzLmRlQ2FzdGVsamF1WChvcmRlciwgMCwgdCksIHRoaXMuZGVDYXN0ZWxqYXVZKG9yZGVyLCAwLCB0KSkpO1xuICAgICAgICAgICAgICAgIHhzLnB1c2godGhpcy5kZUNhc3RlbGphdVgob3JkZXIsIDAsIHQpKTtcbiAgICAgICAgICAgICAgICB5cy5wdXNoKCB0aGlzLmRlQ2FzdGVsamF1WShvcmRlciwgMCwgdCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsneHMnOnhzLCd5cyc6eXN9O1xuICAgICAgICB9XG5cblxuXG4gICAgICAgIFxuICAgICAgICBwcml2YXRlIGRlQ2FzdGVsamF1WChpOiBudW1iZXIsIGo6IG51bWJlciwgdDogbnVtYmVyKSB7XG4gICAgICAgICAgICBpZiAoaSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuICgxIC0gdCkgKiB0aGlzLmNvbnRyb2xQb2ludHNbaV0ueCArIHQgKiB0aGlzLmNvbnRyb2xQb2ludHNbaiArIDFdLng7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgxIC0gdCkgKiB0aGlzLnhzW2ldICsgdCAqIHRoaXMueHNbaiArIDFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICgxIC0gdCkgKiB0aGlzLmRlQ2FzdGVsamF1WChpIC0gMSwgaiwgdCkgKyB0ICogdGhpcy5kZUNhc3RlbGphdVgoaSAtIDEsIGogKyAxLCB0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgZGVDYXN0ZWxqYXVZKGk6IG51bWJlciwgajogbnVtYmVyLCB0OiBudW1iZXIpIHtcbiAgICAgICAgICAgIGlmIChpID09IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKDEgLSB0KSAqIHRoaXMueXNbal0gKyB0ICogdGhpcy55c1soaiArIDEpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAoMSAtIHQpICogdGhpcy5kZUNhc3RlbGphdVkoaSAtIDEsIGosIHQpICsgdCAqIHRoaXMuZGVDYXN0ZWxqYXVZKGkgLSAxLCBqICsgMSwgdCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuXG5cbn0iXX0=
