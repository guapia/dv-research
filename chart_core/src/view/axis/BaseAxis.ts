/// <reference path="../../base.ts" />

const LABEL_PADDING :number = 4;
const MAJOR_TICK_HEIGHT:number = 6;
const MINOR_TICK_HEIGHT:number = 4;
namespace android.test.cartesian{
    'use strict';        
    import View = android.view.View;
    import MeasureSpec = android.view.MeasureSpec;
    import Canvas = android.graphics.Canvas;
    import Size = android.graphics.Size;
    import Context = android.app.Context;
    import Font = android.graphics.Font;

    import Default = android.device.Default;
    import StrokeStyle= android.graphics.StrokeStyle;
    import Gravity = android.graphics.Gravity;
    import ViewGroup = android.view.ViewGroup;

    export abstract class BaseAxis extends ViewGroup{
        
        private _scale:Scale;
        private _max:number;
        private _min:number;
        private _reversed:boolean;
        private _series:string[];
        protected _children:Shape[];
        protected _majorTickHeight:number;
        protected _minorTickHeight:number
        protected _axisType:AxisType;
        protected _ticks:any[];
    
        protected _title:string;
        protected _titleFont:Font;
        protected _labelFont:Font;
        protected _majorStyle:StrokeStyle;
        protected _minorStyle:StrokeStyle;
        protected _lineStyle:StrokeStyle;
        protected _near:boolean;
        constructor(context:Context){
            super(context);
            this._majorTickHeight = MAJOR_TICK_HEIGHT;
            this._minorTickHeight = MINOR_TICK_HEIGHT;
            this._ticks = [];
            this._titleFont = Default.font;
            this._labelFont = Default.font;
            this._majorStyle = Default.strokestyle;
            this._minorStyle = Default.strokestyle;
            this._near = true;
            this._labelFont.fontColor = "#262626";
            this._series=[];
        }
        
        protected abstract _createTicks() :any[];
            

        public set title(value:string){
            this._title = value;
        }
        public get title():string{
            return this._title;
        }

        public set majorStyle(value:StrokeStyle){
            this._majorStyle = value;
        }
        public get majorStyle():StrokeStyle{
            return this._majorStyle;
        }

        public set minorStyle(value:StrokeStyle){
            this._minorStyle = value;
        }
        public get minorStyle():StrokeStyle{
            return this._minorStyle;
        }
        public set lineStyle(value:StrokeStyle){
            this._lineStyle = value;
        }
        public get lineStyle():StrokeStyle{
            return this._lineStyle;
        }

        public set titleFont(value :Font){
            this._titleFont = value.clone();
        }
        
        public get titleFont():Font{
            return this._titleFont;
        }

        public set labelFont(value :Font){
            this._labelFont = value.clone();
        }
        
        public get labelFont():Font{
            return this._labelFont;
        }
        
        public set max(value:number){
            this._max = value;
        }
        public set min(value:number){
            this._min = value;
        }
        public get max():number{
            return this._max;
        }
        public get min():number{
            return this._min;
        }
        public get series():string[]{
            return this._series;
        }
        public set series(s:string[]){
                this._series =s;
        }

        public set scale(value:Scale){
            if(value != null && !value.equal(this._scale)){
                this._scale = value;
                this._ticks = this._createTicks();
            }else if(value == null){
                this._scale = null;
                this._ticks = [];
            }
        }
        public get scale():Scale{
            return this._scale;
        }
        public set reversed(value:boolean){
            this._reversed =value;
        }
        public get reversed():boolean{
            return this._reversed;
        }

        public set type(value:AxisType){
            this._axisType =value;
        }
        public get type():AxisType{
            return this._axisType;
        }
        

        public set near(value :boolean){
            this._near = value;
           
        }
        
        public get near():boolean{
            return this._near;
        }

        abstract _layoutXAxis(canvas:Canvas):void;
        abstract _layoutYAxis(canvas:Canvas):void;


        onMeasure(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size{
            return super.onMeasure(width,height,canvas);
        }
        
        onLayout(l: number, t: number, r: number, b: number, canvas: Canvas): void{
            super.onLayout(l,t,r,b,canvas);
        }

        onDraw(canvas: Canvas): void{
            super.onDraw(canvas);
        }
        _format(val:any){
            return val+"";
        }

    }
}