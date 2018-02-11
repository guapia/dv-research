/// <reference path="../../base.ts" />

namespace android.test {
    'use strict';
    import View = android.view.View;
    import Canvas = android.graphics.Canvas;
    import ViewState = android.view.ViewState;
    import Rect = android.graphics.Rect;
    import Style = android.graphics.Style;
    import StrokeStyle = android.graphics.StrokeStyle;
    import Font = android.graphics.Font;
    import Animation = android.view.animation.Animation;
    import MotionEvent = android.view.event.MotionEvent;
    import Context = android.app.Context;
    export abstract class Shape extends ComparedView{
        public static  PRIORITY :number= 10000;
        protected _strokeStyle:StrokeStyle;

        protected _style :Style;
            
        public set style(value:Style){
            this._style = value;
        }
        public get style():Style{
            return this._style;
        }


        constructor(context:Context){
            super(context);
            this.priority= Shape.PRIORITY;
        }
        
        onDraw(canvas:Canvas):void{
            super.onDraw(canvas);
            if(this.comparedAnimationEmpty){
                this.onDrawShape(canvas);
            }else{
                this._drawAnimation(canvas);
            }
            
        }
        protected _drawAnimation(canvas:Canvas):void{
            canvas.drawPolygon(this.animationXs,this.animationYs,this.style);
        }

        abstract onDrawShape(canvas:Canvas):void;
        

        abstract refresh(): void;

        onMouseEvent(event: MotionEvent): boolean{
            return true;
        }
        

    }
}