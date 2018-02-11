/// <reference path="../../graphics/Size.ts" />
/// <reference path="../interface/IView.ts" />
/// <reference path="./LayoutInfo.ts" />
/// <reference path="../event/MotionEvent.ts" />
/// <reference path="../../util/Log.ts" />
/// <reference path="../animation/Animation.ts" />
/// <reference path="../animation/AnimationEase.ts" />


namespace android.view {
    import Padding = android.graphics.Padding;
    import Align = android.graphics.Align;
    import AlignElement = android.graphics.AlignElement;
    import Size = android.graphics.Size;
    import Canvas = android.graphics.Canvas;
    import Gravity = android.graphics.Gravity;
    import Context = android.app.Context;
    import MotionEvent = android.view.event.MotionEvent;
    import Log = android.util.Log;
    import Animation = android.view.animation.Animation;
    import AnimationEase = android.view.animation.AnimationEase;
    import Style = android.graphics.Style;
    import Default = android.device.Default;
    import AnimationState = android.view.animation.AnimationState;

    // public static  VISIABLE :number= 1; 
    // public static  INVISIABLE :number = -1;
    // public static  GONE :number = 0;
    export enum ViewState {
        Visiable,
        InVisiable,
        Gone
    }
    export class View implements IView {
        public id: string = "";
        protected _width: MeasureSpec;
        protected _height: MeasureSpec;
        protected _background: Style;
        protected _padding: Padding = new Padding();
        public _layoutInfo: LayoutInfo;
        public _oldLayoutInfo: LayoutInfo;
        public priority: number = 0;
        protected _gravity: Gravity;
        protected alignView: AlignElement;
        layoutParams: LayoutParams = new LayoutParams(0, 0, null);
        private _parent: ViewGroup = null;
        private _context: Context;
        protected _canvas: Canvas;
        protected _clip: boolean;
        public animation: Animation;
        private _animationList: Animation[];
        private _drawingTime: number = 0;
        public alpha:number=1;

        offsetleft: number = 0;
        offsettop: number = 0;
        public visiable: ViewState = ViewState.Visiable;

        constructor(context: Context) {
            this._context = context;
            // Debug.assert(this._context != null,'Context can not be null');
            this._gravity = Gravity.Left;
            this._background = Default.style;
            this._background.background = 'transparent';
            this._background.strokeStyle.strokeColor = 'transparent';
            this._background.strokeStyle.strokeWidth = 0;
            this.id = Math.random() * 10000000 + "";
            this._animationList = [];
            this._layoutInfo = new LayoutInfo(0, 0, 0, 0, this.padding, 0);
            this._oldLayoutInfo = this.layoutInfo.clone();

        }
        public getContext(): Context {
            return this._context;
        }

        /**
         * may be called for serval times
         */
        onMeasure(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size {
            // this._layoutInfo = new LayoutInfo(0, 0, 0, 0, this.padding, 0);
            this._layoutInfo.reset(0,0,0,0,this.padding,0);
            var w: number = this.layoutParams.width;
            var h: number = this.layoutParams.height;
            var size: Size = new Size(w, h);
            var widthmode = this.layoutParams.widthMode;
            var heightmode = this.layoutParams.heightMode;
            if (widthmode === LayoutParams.MATCH_PARENT) {
                size.width = width.value;
            }
            if (heightmode === LayoutParams.MATCH_PARENT) {
                size.height = height.value;
            }
            this.setMeasuredDimension(new MeasureSpec(size.width, LayoutParams.EXACTLY), new MeasureSpec(size.height, LayoutParams.EXACTLY));
            return size;
        }

        public getDrawingTime(): number {
            if (this.parent != null) {
                return this._drawingTime;
            } else {
                return Date.now();
            }
        }
        public setDrawingTime(value: number) {
            this._drawingTime = value;
        }

        onLayout(l: number, t: number, r: number, b: number, canvas: Canvas): void {
            this.layoutInfo.reset(l + this.offsetleft, t + this.offsettop, r + this.offsetleft, b + this.offsettop, this.padding, 0);
            if (this.layoutInfo != null) {
                this._oldLayoutInfo = this.layoutInfo.clone();
            }
        }
        protected islayoutChanged(): boolean {
            return !this.layoutInfo.equal(this._oldLayoutInfo);
        }
        onDraw(canvas: Canvas): void {
            if (this.visiable != ViewState.Visiable) { return; }
            this._canvas = canvas;
            if (this.background) {
                canvas.drawRect(this._layoutInfo.outterrect.startPoint, this._layoutInfo.outterrect.endPoint, true, this.background);
            }
        }
        setMeasuredDimension(width: MeasureSpec, height: MeasureSpec) {
            this._width = width;
            this._height = height;
        }

        public onTouchEvent(event: MotionEvent): boolean {
            return false;
        }
        public onMouseEvent(event: MotionEvent): boolean {
            return false;
        }
        public trace(x:number,y:number):boolean{
            return this.layoutInfo.outterrect.contains(x,y);
        }

        public invalidate(force: boolean): void {
            force = true;
            if (force) {
                if (this.parent) {
                    this.parent.invalidate(force);
                } else {
                    this.oninvalidate();
                }
            } else {
                this.parent.invalidateChild(this, this.layoutInfo.outterrect);
                this.oninvalidate();
            }
        }

        public getRootView(): View {
            if (this.parent != null) {
                let parent = this.parent;
                // do {
                //     parent = parent.parent;
                // } while (parent.parent != null)
                while (parent.parent != null) {
                    parent = parent.parent;
                }
                return parent;
            }
            return this;
        }

        public oninvalidate() {
        }

        public requestLayout() {
            if (this.parent) {
                this.parent.requestLayout();
            }
        }


        public startAnimation(animation: Animation) {
            if (this.animation == null || this.animation.isAniamtionEnd) {
                this.animation = animation;
                if (this.animation != null) {
                    this.getRootView().startAnimation(animation);
                    this.animation.__onInneranimationEnd = (canvas: Canvas, view: View) => {
                        if (this.animation.repeate) {
                            this.animation.start = 0;
                            this.animation.state = AnimationState.BeforeStart;
                            this.startAnimation(this.animation);
                        }
                    }
                }

            } else {
                this._animationList.push(animation);
                this.animation.__onInneranimationEnd = (canvas: Canvas, view: View) => {
                    if (this._animationList.length > 0) {
                        let curranimation = this._animationList.pop();
                        this.startAnimation(curranimation);
                    }

                }
            }
        }

        public cleanAnimation() {
            if (this.animation != null) {
                this.animation.repeate = false;
                this.animation.state = AnimationState.End;
            }
            this._animationList.length = 0;
        }
        public setParent(p: ViewGroup) {
            this._parent = p;
        }
        public offset(left: number, top: number) {
            this.offsetleft += left;
            this.offsettop += top;
            if (isNaN(left) || isNaN(this.offsetleft)) {
                console.log("offset error");
                throw "offset error ";
            }
            console.log("offset " + top);
            // this.layoutInfo.offset(left,top);
        }

        get parent(): ViewGroup {
            return this._parent;
        }
        get width() {
            return this._width.getMeasureValue();
        }
        get height() {
            return this._height.getMeasureValue();
        }

        set padding(padding: Padding) {
            this._padding = padding;
        }
        get padding(): Padding {
            return this._padding;
        }
        get left(): number {
            return this._layoutInfo.outterrect.left;
        }

        get top(): number {
            return this._layoutInfo.outterrect.top;
        }

        get right(): number {
            return this._layoutInfo.outterrect.right;
        }

        get bottom(): number {
            return this._layoutInfo.outterrect.bottom;
        }

        set background(background: Style) {
            this._background = background;
        }
        get background(): Style {
            return this._background;
        }
        get layoutInfo(): LayoutInfo {
            if (!this._layoutInfo) {
                this._layoutInfo = new LayoutInfo(0, 0, 0, 0, this.padding, 0);
            }
            return this._layoutInfo;
        }


        set gravity(gravity: Gravity) {
            this._gravity = gravity;
        }
        get gravity(): Gravity {
            return this._gravity;
        }
        set clip(value: boolean) {
            this._clip = value;
        }
        get clip(): boolean {
            return this._clip;
        }
    }
}