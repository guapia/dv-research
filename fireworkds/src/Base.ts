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