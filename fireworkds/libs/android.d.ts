declare namespace android {
    /**
     * @hidden
     * @param callBack
     */
    function requestAnimationFrame(callBack: FrameRequestCallback): void;
    /**
     * @hidden
     * @param time
     */
    function __frameCallBack(time: number): void;
}
declare namespace android.app {
    class Intent {
        private context;
        private targetActivityClass;
        setClass(c: Context, activityClass: any): void;
        getClass(): any;
        getContext(): Context;
    }
}
declare namespace android.graphics {
    /**
     * Point holds two integer coordinates
     */
    class Point {
        x: number;
        y: number;
        constructor(x?: number, y?: number);
        /**
         * Set the point's x and y coordinates
         */
        set(x: number, y: number): void;
        /**
         * Negate the point's coordinates
         */
        negate(): void;
        /**
         * Offset the point's coordinates by dx, dy
         */
        offset(dx: number, dy: number): void;
        /**
         * Returns true if the point's coordinates equal (x,y)
         */
        equals(x: number, y: number): boolean;
        equalPoint(pt: Point): boolean;
        hashCode(): number;
        toString(): string;
        /**
         * Parcelable interface methods
         */
        describeContents(): number;
        clone(): Point;
    }
}
declare namespace android.graphics {
    import Point = android.graphics.Point;
    class Rect {
        left: number;
        top: number;
        right: number;
        bottom: number;
        private _startpoint;
        private _endpoint;
        constructor(left: number, top: number, right: number, bottom: number);
        reset(left: number, top: number, right: number, bottom: number): this;
        readonly center: Point;
        correct(): void;
        translate(x: number, y: number): this;
        translateX(x: number): this;
        translateY(y: number): this;
        scale(r: number): this;
        readonly isNil: boolean;
        height: number;
        width: number;
        readonly startPoint: Point;
        readonly endPoint: Point;
        contains(x: number, y: number): boolean;
        clone(): Rect;
        equal(rect: Rect): boolean;
        toString(): string;
    }
}
declare namespace android.graphics {
    import Rect = android.graphics.Rect;
    enum Gravity {
        Left = 0,
        Center = 1,
        Right = 2,
        Top = 3,
        Bottom = 4,
        Auto = 5,
    }
    class Padding {
        leftPadding: number;
        rightPadding: number;
        topPadding: number;
        bottomPadding: number;
        constructor(padding?: number);
        padding: number;
    }
    enum Position {
        Left = 0,
        Top = 1,
        Right = 2,
        Bottom = 3,
    }
    enum Orientation {
        Horizontal = 0,
        Vertical = 1,
    }
    class StrokeStyle {
        strokeWidth: number;
        strokeColor: string;
        dash: number[];
        dashOffset: number;
        constructor(strokewidth: number, strokecolor: string, dash?: number[], dashoffset?: number);
        getCssStyle(): {
            'stroke-width': number;
            'stroke': string;
        };
        clone(): StrokeStyle;
    }
    class Font {
        constructor(fz: number, fm: string, fc: string);
        fontSize: number;
        fontFamily: string;
        fontColor: string;
        toString(): string;
        clone(): Font;
    }
    class Style {
        constructor(bg: string | FillStyle, stroke: StrokeStyle);
        background: string | FillStyle;
        strokeStyle: StrokeStyle;
    }
    class Gradient {
        colors: {
            offset: number;
            color: string;
        }[];
        constructor(colors: {
            offset: number;
            color: string;
        }[]);
    }
    class LinearGradient extends Gradient {
        startx: number;
        starty: number;
        endx: number;
        endy: number;
        constructor(sx: number, sy: number, ex: number, ey: number, colors: {
            offset: number;
            color: string;
        }[]);
    }
    class RadialGradient extends Gradient {
        centerx: number;
        centery: number;
        radius: number;
        centerx1: number;
        centery1: number;
        radius1: number;
        constructor(cx: number, cy: number, r: number, cx1: number, cy1: number, r1: number, colors: {
            offset: number;
            color: string;
        }[]);
    }
    class Shadow {
        offsetx: number;
        offsety: number;
        color: string;
        blur: number;
    }
    class FillStyle {
        fill: Gradient | string;
        shadow: Shadow;
        constructor();
    }
    class Util {
        static cloneDeep(object: any): any;
        static contains(rect: Rect, pt: Point): boolean;
        static getRect(start: Point, size: Size): Rect;
        static getStyleCss(style: Style): {
            "fill": string | FillStyle;
            "stroke": string;
            "stroke-width": number;
        };
        static union(...rects: Rect[]): Rect;
        static hexToRgb(hex: any): {
            r: number;
            g: number;
            b: number;
        };
        static rgbToHex(r: any, g: any, b: any): string;
        static componentToHex(c: any): any;
        static asEnum(value: number, enumType: any, nullOK?: boolean): number;
        static isMixed(r1: Rect, r2: Rect): boolean;
        static containsRect(r1: Rect, r2: Rect): boolean;
        static IsPointInPolygon(p: Point, polygon: Point[]): boolean;
        static IsPointInPolygon2(p: Point, xs: number[], ys: number[]): boolean;
        static Point2Line(x1: number, y1: number, x2: number, y2: number, x0: number, y0: number): number;
        /**
      * @hidden
      */
        private static _lineSpace(x1, y1, x2, y2);
        static Area(xs: number[], ys: number[]): number;
        static CenterOfPolygon(xs: number[], ys: number[]): Point;
        static HashCode(obj: number | string | any): string;
        static HashCodeString(obj: string): string;
        static createPtsFromRect(rect: Rect, size: number): {
            xs: number[];
            ys: number[];
        };
        static createPtsFromCircle(raidius: number, center: Point, size: number): {
            xs: number[];
            ys: number[];
        };
        static createPtsFromRadialBar(startAngle: number, endAngle: number, radius: number, innerRadius: number, center: Point, size: number): {
            xs: number[];
            ys: number[];
        };
    }
}
declare namespace android.device {
    class Device {
        private static _density;
        private static _width;
        private static _height;
        static width: number;
        static height: number;
        static readonly density: number;
    }
}
declare namespace android.util {
    class Log {
        static d(message: string, tag?: string): void;
        static w(message: string, tag?: string): void;
        static e(message: string, tag?: string): void;
    }
}
declare namespace android.device {
    import Font = android.graphics.Font;
    import StrokeStyle = android.graphics.StrokeStyle;
    import Style = android.graphics.Style;
    class Default {
        static readonly font: Font;
        static readonly strokestyle: StrokeStyle;
        static readonly style: Style;
    }
}
declare namespace android.graphics {
    import Rect = android.graphics.Rect;
    import Point = android.graphics.Point;
    import Font = android.graphics.Font;
    import Size = android.graphics.Size;
    enum RenderType {
        Canvas = 0,
        Svg = 1,
    }
    class Canvas {
        private _render;
        private _renderType;
        private _hostElement;
        private xOffset;
        private yOffset;
        private saveStates;
        constructor(element: HTMLElement, type: RenderType);
        clearRect(left: number, top: number, width: number, height: number): void;
        save(): void;
        clip(rect: Rect): void;
        restore(): void;
        setViewportSize(w: number, h: number): void;
        measureString(str: string, font: Font, maxSize?: number): Size;
        measureStringWithWidth(str: string, font: Font): void;
        drawText(str: string, pt: Point, f: Font, center?: Point, angle?: number): void;
        drawPosText(text: string, pos: number[], font: Font): void;
        drawLine(pt1: Point, pt2: Point, strokestyle: StrokeStyle): void;
        drawLines(xs: number[], ys: number[], strokestyle: StrokeStyle): void;
        drawRect(pt1: Point, pt2: Point, fill: boolean, style: Style): void;
        drawArc(rect: Rect, startAngle: number, sweepAngel: number, style: Style): void;
        drawDonut(cx: number, cy: number, radius: number, innerRadius: number, startAngle: number, sweepAngle: number, style: Style): void;
        drawOval(rect: Rect, color: string): void;
        alpha: number;
        drawPolygon(xs: number[], ys: number[], style: Style): void;
        drawImage(x: number, y: number, w: number, h: number): void;
        getCache(sx: number, sy: number, sw: number, sh: number): ImageData;
        setCache(imagedata: ImageData, dx: number, dy: number, dirtyX?: number, dirtyY?: number, dirtyWidth?: number, dirtyHeight?: number): void;
        begin(): void;
        end(): void;
        moveTo(x: number, y: number): void;
        scale(sx: number, sy: number): void;
        rotate(degree: number): void;
        translate(x: number, y: number): void;
        readonly canvas: CanvasRenderingContext2D;
    }
}
declare namespace android.app {
    import Handler = android.util.Handler;
    class Context {
        private _args;
        getArgs(name: string): any;
        setArgs<T>(name: string, value: T): void;
        setComparedAniamtionCache(cache: ComparedAnimationCache): void;
        getComparedAnimationCache(): ComparedAnimationCache;
        setHandler(handler: Handler): void;
        getHandler(): Handler;
    }
}
declare namespace android.view {
    import Size = android.graphics.Size;
    import Canvas = android.graphics.Canvas;
    import Gravity = android.graphics.Gravity;
    import Style = android.graphics.Style;
    interface IView {
        onMeasure(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size;
        onLayout(l: number, t: number, r: number, b: number, canvas: Canvas): void;
        onDraw(canvas: Canvas): void;
        invalidate(flg: boolean): void;
        readonly width: number;
        readonly height: number;
        readonly left: number;
        readonly top: number;
        readonly right: number;
        readonly bottom: number;
        gravity: Gravity;
        layoutParams: LayoutParams;
        background: Style;
    }
}
declare namespace android.view {
    import Canvas = android.graphics.Canvas;
    import Rect = android.graphics.Rect;
    interface IViewGroup extends IView {
        dispatchDraw(canvas: Canvas): void;
        addView(View: View, index: number): number;
        invalidateChild(child: View, dirty: Rect): void;
    }
}
declare namespace android.graphics {
    class Size {
        width: number;
        height: number;
        constructor(w: number, h: number);
        clone(): Size;
        hashCode(): number;
    }
}
declare namespace android.graphics {
    class Margin {
        marginLeft: number;
        marginRight: number;
        marginTop: number;
        marginBottom: number;
        constructor(marginLeft: number, marginRight: number, marginTop: number, marginBottom: number);
        getStartXMargin(): number;
        getStartYMargin(): number;
    }
}
declare namespace android.view {
    import Rect = android.graphics.Rect;
    import Padding = android.graphics.Padding;
    import Margin = android.graphics.Margin;
    /***
     * 根据measure 计算出的结果
     */
    class LayoutInfo {
        innerrect: Rect;
        outterrect: Rect;
        drawindex: number;
        padding: Padding;
        constructor(l: number, t: number, r: number, b: number, padding: Padding, drawindex?: number);
        reset(l: number, t: number, r: number, b: number, padding: Padding, drawindex?: number): void;
        offset(x: number, y: number): void;
        clone(): LayoutInfo;
        equal(info: LayoutInfo): boolean;
    }
    /***
     * 输入的参数
     */
    class LayoutParams {
        _width: number;
        _height: number;
        margin: Margin;
        constructor(width: number, height: number, margin?: Margin);
        width: number;
        readonly widthMode: number;
        readonly heightMode: number;
        height: number;
        static MATCH_PARENT: number;
        static WRAP_CONTENT: number;
        static EXACTLY: number;
    }
    class MeasureSpec {
        value: number;
        mode: number;
        constructor(v?: number, m?: number);
        getMeasureValue(): number;
    }
}
declare namespace android.view.event {
    class MotionEvent {
        static ACTION_DOWN: number;
        static ACTION_UP: number;
        static ACTION_MOVE: number;
        static ACTION_CANCEL: number;
        static ACTION_OUTSIDE: number;
        static ACTION_MOUSE_DOWN: number;
        static ACTION_MOUSE_MOVE: number;
        static ACTION_MOUSE_UP: number;
        static ACTION_MOUSE_OVER: number;
        static ACTION_MOUSE_OUT: number;
        static ACTION_MOUSE_ON: number;
        static ACTION_CLICK: number;
        static ACTION_SCROLL: number;
        static ACTION_MOUSE_WHEEL: number;
        private _x;
        private _y;
        private _deltaY;
        private _deltaX;
        private _action;
        screenX: number;
        screenY: number;
        element: HTMLElement;
        x: number;
        y: number;
        deltaX: number;
        deltaY: number;
        action: number;
        clone(): MotionEvent;
        constructor(x: number, y: number, action: number);
        offset(x: number, y: number): void;
        toString(): string;
        _getaction(): string;
    }
}
declare namespace android.view.animation {
    import Canvas = android.graphics.Canvas;
    enum AnimationState {
        BeforeStart = 0,
        Animating = 1,
        End = 2,
    }
    class Animation {
        duration: number;
        start: number;
        ease: AnimationEase;
        type: AnimationType;
        from: number;
        to: number;
        fillAfter: boolean;
        state: AnimationState;
        repeate: boolean;
        _startCallBack: (view: View) => void;
        _endCallBack: (view: View) => void;
        private __oldProprity;
        constructor();
        setAnimationCallBack(onAnimationStart: (view: View) => void, onAnimationEnd: (view: View) => void): void;
        readonly isAniamtionEnd: boolean;
        scale(now: number): number;
        applyTransformation(interpolatedTime: number, canvas: Canvas, view: View): void;
        onStartAniamtion(canvas: Canvas, view: View): void;
        onEndAnimation(canvas: Canvas, view: View): void;
        __onInneranimationEnd(canvas: Canvas, view: View): void;
    }
}
declare namespace android.view.animation {
    class AnimationEase {
        ease(t: number): number;
    }
    class BounceAnimationEase extends AnimationEase {
        ease(t: number): number;
    }
    class SinAnimationEase extends AnimationEase {
        ease(t: number): number;
    }
    class QuadAnimationEase extends AnimationEase {
        ease(t: number): number;
    }
}
declare namespace android.view {
    import Padding = android.graphics.Padding;
    import AlignElement = android.graphics.AlignElement;
    import Size = android.graphics.Size;
    import Canvas = android.graphics.Canvas;
    import Gravity = android.graphics.Gravity;
    import Context = android.app.Context;
    import MotionEvent = android.view.event.MotionEvent;
    import Animation = android.view.animation.Animation;
    import Style = android.graphics.Style;
    enum ViewState {
        Visiable = 0,
        InVisiable = 1,
        Gone = 2,
    }
    class View implements IView {
        id: string;
        protected _width: MeasureSpec;
        protected _height: MeasureSpec;
        protected _background: Style;
        protected _padding: Padding;
        _layoutInfo: LayoutInfo;
        _oldLayoutInfo: LayoutInfo;
        priority: number;
        protected _gravity: Gravity;
        protected alignView: AlignElement;
        layoutParams: LayoutParams;
        private _parent;
        private _context;
        protected _canvas: Canvas;
        protected _clip: boolean;
        animation: Animation;
        private _animationList;
        private _drawingTime;
        alpha: number;
        offsetleft: number;
        offsettop: number;
        visiable: ViewState;
        constructor(context: Context);
        getContext(): Context;
        /**
         * may be called for serval times
         */
        onMeasure(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size;
        getDrawingTime(): number;
        setDrawingTime(value: number): void;
        onLayout(l: number, t: number, r: number, b: number, canvas: Canvas): void;
        protected islayoutChanged(): boolean;
        onDraw(canvas: Canvas): void;
        setMeasuredDimension(width: MeasureSpec, height: MeasureSpec): void;
        onTouchEvent(event: MotionEvent): boolean;
        onMouseEvent(event: MotionEvent): boolean;
        trace(x: number, y: number): boolean;
        invalidate(force: boolean): void;
        getRootView(): View;
        oninvalidate(): void;
        requestLayout(): void;
        startAnimation(animation: Animation): void;
        cleanAnimation(): void;
        setParent(p: ViewGroup): void;
        offset(left: number, top: number): void;
        readonly parent: ViewGroup;
        readonly width: number;
        readonly height: number;
        padding: Padding;
        readonly left: number;
        readonly top: number;
        readonly right: number;
        readonly bottom: number;
        background: Style;
        readonly layoutInfo: LayoutInfo;
        gravity: Gravity;
        clip: boolean;
    }
}
declare namespace android.view {
    import Size = android.graphics.Size;
    import Canvas = android.graphics.Canvas;
    import MotionEvent = android.view.event.MotionEvent;
    import Rect = android.graphics.Rect;
    class ViewGroup extends View implements IViewGroup {
        protected children: Array<View>;
        private _mCurrentTouchTarget;
        private _isIntercept;
        private lastInterceptEvent;
        dispatchDraw(canvas: Canvas): void;
        drawChild(canvas: Canvas, view: View): void;
        cleanAnimation(): void;
        oninvalidate(): void;
        invalidateChild(child: View, dirty: Rect): void;
        getChildCount(): number;
        getChildAt(index: number): View;
        private getSortViews();
        onLayout(l: number, t: number, r: number, b: number, canvas: Canvas): void;
        onMeasure(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size;
        addView(view: View, index?: number, layoutParams?: LayoutParams): number;
        notifyDrawOrderChanged(): void;
        addViewWithOutReLayout(view: View, index?: number, layoutParams?: LayoutParams): number;
        removeAllViews(): void;
        removeView(view: View): void;
        onInterceptTouchEvent(event: MotionEvent): boolean;
        dispatchTouchEvent(event: MotionEvent): boolean;
        onInterceptMouseEvent(event: MotionEvent): boolean;
        onMouseEvent(event: MotionEvent): boolean;
        dispatchMouseEvent(event: MotionEvent): boolean;
    }
}
declare namespace android.widget {
    import Size = android.graphics.Size;
    import Canvas = android.graphics.Canvas;
    import ViewGroup = android.view.ViewGroup;
    import View = android.view.View;
    import MeasureSpec = android.view.MeasureSpec;
    class FrameLayout extends ViewGroup {
        onMeasure(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size;
        onLayout(l: number, t: number, r: number, b: number, canvas: Canvas): void;
        layoutItem(viewItem: View, l: number, t: number, r: number, b: number, canvas: Canvas): void;
    }
}
declare namespace android.app {
    import View = android.view.View;
    class Activity extends Context {
        private rootView;
        private activityManager;
        constructor(am: ActivityManager);
        private attatchRootView(view);
        protected onCreate(bundle: Bundle): void;
        protected onPause(): void;
        protected onResume(): void;
        protected onDestory(): void;
        protected setContentView(view: View): void;
        protected startActivityForResult(intent: Intent, bundle: Bundle, requestCode: number, resultCode: number): void;
    }
}
declare namespace android.graphics {
    enum Align {
        LEFT = 0,
        /**
         * The text is drawn centered horizontally on the x,y origin
         */
        CENTER = 1,
        /**
         * The text is drawn to the left of the x,y origin
         */
        RIGHT = 2,
    }
}
declare namespace android.graphics {
    class AlignElement {
        position: Position;
        element: Element;
        constructor(position: Position, element: Element);
    }
}
declare namespace android.view.animation {
    import Canvas = android.graphics.Canvas;
    class AlphaAnimation extends Animation {
        private alpha;
        private oldAlpha;
        constructor();
        applyTransformation(interpolatedTime: number, canvas: Canvas, view: View): void;
        onStartAniamtion(canvas: Canvas, view: View): void;
        onEndAnimation(canvas: Canvas, view: View): void;
    }
}
declare namespace android {
    class ComparedAnimationCache {
        private __prepare;
        getPreparing(): boolean;
        preparing(): void;
        private _cache;
        readonly isempty: boolean;
        resetCache(views: ComparedView[]): void;
        clear(): void;
        startCompare(views: ComparedView[]): boolean;
        private __startAnimation(fromview, toview);
        private __switchLayout(view1, view2);
    }
}
declare namespace android {
    import View = android.view.View;
    import Animation = android.view.animation.Animation;
    import Canvas = android.graphics.Canvas;
    class ComparedView extends View {
        animationXs: number[];
        animationYs: number[];
        readonly comparedAnimationEmpty: boolean;
        readonly ptcount: number;
        getComparedAnimation(fromview: ComparedView): Animation;
        onLayout(l: number, t: number, r: number, b: number, canvas: Canvas): void;
        getpts(size: number): {
            xs: number[];
            ys: number[];
        };
        protected _pts: {
            xs: number[];
            ys: number[];
        };
    }
}
declare namespace android.widget {
    import Canvas = android.graphics.Canvas;
    import View = android.view.View;
    import MotionEvent = android.view.event.MotionEvent;
    import Animation = android.view.animation.Animation;
    import RenderType = android.graphics.RenderType;
    class RootView extends FrameLayout {
        private element;
        private throttle;
        private _w;
        private _h;
        private _l;
        private _t;
        private _rootAniamtion;
        setInfo(left: number, top: number, width: number, height: number): void;
        dispatchDraw(canvas: Canvas): void;
        onLayout(l: number, t: number, r: number, b: number, canvas: Canvas): void;
        oninvalidate(): void;
        requestLayout(): void;
        perpareComparedAnimation(): void;
        startCompare(): void;
        private __traceView(viewgroup, list);
        private __relayout();
        readonly left: number;
        readonly top: number;
        readonly width: number;
        readonly height: number;
        startAnimation(animation: Animation): void;
        interruptAnimation(): void;
        private _startAnimation();
        private _animate();
        addView(view: View, index: number): number;
        attachRender(r: Canvas): void;
        attachElement(element: HTMLElement, renderType: RenderType): void;
        private ontouch(event);
        sendEvent(event: MotionEvent): void;
    }
}
declare namespace android.app {
    import RenderType = android.graphics.RenderType;
    class ActivityManager {
        private stack;
        private rootView;
        constructor(rendertype: RenderType, element: HTMLElement);
        sendStartActivity(intent: Intent, bundle: Bundle, requestCode: number, resultCode: number): void;
        private createActivity(activityClass);
        getCurrentActivity(): Activity;
    }
}
declare namespace android {
    import Activity = android.app.Activity;
    class StartUp {
        private activityManager;
        private canvas;
        private config;
        private element;
        constructor();
        private ontouch(event);
        start(): void;
        private getLaunchActivity();
        private getLaunchParams();
        private getRootElement();
        private getRenderType();
        private getFill();
        private loadConfig();
        getCurrentActivity(): Activity;
    }
}
declare namespace android.database {
    class DataSetObserver {
        onChanged(): void;
        onInvalidated(): void;
    }
}
declare namespace android.database {
    class Observable<T> {
        protected readonly mObservers: Array<T>;
        registerObserver(observer: T): void;
        unregisterObserver(observer: T): void;
        unregisterAll(): void;
    }
    class DataSetObservable extends Observable<DataSetObserver> {
        notifyChanged(): void;
        notifyInvalidated(): void;
    }
}
declare namespace android.adapter {
    class Adapter {
    }
}
declare namespace android.adapter {
    import DataSetObserver = android.database.DataSetObserver;
    import View = android.view.View;
    abstract class ViewPageAdapter {
        private mDataSetObservable;
        private mViewCache;
        private mShouldCache;
        XBaseAdapter(): void;
        /************************************* don't use this  **********************************************/
        registerDataSetObserver(observer: DataSetObserver): void;
        unregisterDataSetObserver(observer: DataSetObserver): void;
        /**********************************************************************************************/
        notifyDataSetChanged(): void;
        notifyDataSetInvalidated(): void;
        /***
         * set cache
         *
         * @param enable
         */
        setCacheEnable(enable: boolean): void;
        abstract getCount(): number;
        abstract getItem(position: number): any;
        abstract destoryItem(position: number, container: View): any;
        abstract instantiateItem(position: number, container: View, contentView: View): View;
        initItem(position: number, container: View): View;
        /**
         * unuseful methods currently
         */
        beginUpdata(): void;
        /**
         * unuseful methods currently
         */
        finishUpdata(): void;
    }
    class ViewInfo {
        view: View;
        position: number;
        constructor(v: View, pos: number);
    }
}
declare namespace android.app {
    class Bundle {
        private map;
        put(key: string, value: any): void;
        putDefault(value: any): void;
        getDefault(): any;
    }
}
declare namespace android {
    class Debug {
        static assert(flg?: boolean, log?: string): void;
        static logstack(log: any): void;
        static log(log: any): void;
    }
}
declare module android.graphics {
    import Rect = android.graphics.Rect;
    import Size = android.graphics.Size;
    import Point = android.graphics.Point;
    import Font = android.graphics.Font;
    import StrokeStyle = android.graphics.StrokeStyle;
    /**
     * Render to canvas.
     */
    class CanvasRenderEngine {
        private _element;
        private _canvas;
        private _canvas2d;
        private _clipRect;
        constructor(element: HTMLElement);
        readonly canvas: CanvasRenderingContext2D;
        alpha: number;
        clearRect(left: number, top: number, width: number, height: number): void;
        beginRender(): void;
        endRender(): void;
        save(): void;
        restore(): void;
        getImageData(sx: number, sy: number, sw: number, sh: number): ImageData;
        putImageData(imagedata: ImageData, dx: number, dy: number, dirtyX?: number, dirtyY?: number, dirtyWidth?: number, dirtyHeight?: number): void;
        clip(rect: Rect): void;
        setViewportSize(w: number, h: number): void;
        readonly element: Element;
        drawEllipse(cx: number, cy: number, rx: number, ry: number, style?: Style): void;
        private _applyStyle(style);
        private _applyStrokeStyle(strokeStyle);
        private _applyFont(font);
        drawRect(x: number, y: number, w: number, h: number, style: Style, fill: boolean): void;
        drawLine(x1: number, y1: number, x2: number, y2: number, strokestyle: StrokeStyle): void;
        drawLines(xs: number[], ys: number[], strokestyle: StrokeStyle): void;
        drawPolygon(xs: number[], ys: number[], style: Style): void;
        drawPie(cx: number, cy: number, r: number, startAngle: number, sweepAngle: number, style: Style): void;
        drawDonut(cx: number, cy: number, radius: number, innerRadius: number, startAngle: number, sweepAngle: number, style: Style): void;
        drawString(s: string, pt: Point, font: Font): void;
        drawStringRotated(s: string, pt: Point, center: Point, angle: number, font: Font): void;
        measureString(s: string, font: Font, maxSize?: number): Size;
        drawImage(image: any, x: number, y: number, w: number, h: number): void;
        private _create();
        moveTo(x: number, y: number): void;
        scale(sx: number, sy: number): void;
        rotate(degree: number): void;
        translate(x: number, y: number): void;
    }
}
declare module android.graphics {
    import Rect = android.graphics.Rect;
    import Size = android.graphics.Size;
    import Point = android.graphics.Point;
    import Font = android.graphics.Font;
    import StrokeStyle = android.graphics.StrokeStyle;
    /**
     * Render to svg.
     */
    class SvgRenderEngine {
        private static svgNS;
        private static xlinkNS;
        private _element;
        private _svg;
        private _text;
        private _textGroup;
        private _defs;
        private _fill;
        private _stroke;
        private _textFill;
        private _strokeWidth;
        private _fontSize;
        private _fontFamily;
        private _group;
        private _clipRect;
        private static _isff;
        alpha: number;
        constructor(element: HTMLElement);
        save(): void;
        restore(): void;
        clip(): void;
        beginRender(): void;
        endRender(): void;
        setViewportSize(w: number, h: number): void;
        readonly element: Element;
        fill: string;
        fontSize: string;
        fontFamily: string;
        stroke: string;
        strokeWidth: number;
        textFill: string;
        addClipRect(clipRect: Rect, id: string): void;
        drawEllipse(cx: number, cy: number, rx: number, ry: number, className?: string, style?: any): SVGElement;
        drawRect(x: number, y: number, w: number, h: number, className?: string, style?: any, clipPath?: string): SVGElement;
        drawLine(x1: number, y1: number, x2: number, y2: number, stroke: StrokeStyle): void;
        _drawLine(x1: number, y1: number, x2: number, y2: number, className?: string, style?: any): SVGElement;
        drawLines(xs: number[], ys: number[], className?: string, style?: any, clipPath?: string): SVGElement;
        drawPolygon(xs: number[], ys: number[], className?: string, style?: any, clipPath?: string): SVGElement;
        drawPie(cx: number, cy: number, r: number, startAngle: number, sweepAngle: number, className?: string, style?: any, clipPath?: string): SVGElement;
        drawDonut(cx: number, cy: number, radius: number, innerRadius: number, startAngle: number, sweepAngle: number, className?: string, style?: any, clipPath?: string): SVGElement;
        drawString(s: string, pt: Point, className?: string, style?: any): SVGElement;
        drawStringRotated(s: string, pt: Point, center: Point, angle: number, className?: string, style?: any): SVGElement;
        measureString(s: string, font: Font): Size;
        _measureString(s: string, className?: string, groupName?: string, style?: any): Size;
        startGroup(className?: string, clipPath?: string, createTransform?: boolean): SVGElement;
        endGroup(): void;
        drawImage(imageHref: string, x: number, y: number, w: number, h: number): SVGElement;
        private _appendChild(element);
        private _create();
        private _setText(element, s);
        private _createText(pos, text);
        private _applyStyle(el, style);
        private _deCase(s);
        private _getBBox(text);
    }
}
declare namespace android.graphics {
    class TextPaint {
        private canvas;
        private font;
        constructor(canvas: Canvas, font: Font);
        measureString(str: string): Size;
    }
}
declare namespace android.util {
    class ArrayList<T> {
        private _array;
        constructor();
        add(value: T): void;
        remove<T>(value: any): void;
        clear(): void;
        size(): number;
        get(index: number): T;
    }
}
declare namespace android.util {
    class Message {
        what: number;
        args: {
            [key: string]: any;
        };
        constructor(what?: number);
        static obtain(what?: number): Message;
    }
}
declare namespace android.util {
    class Handler {
        private _hanlderMap;
        private _queue;
        constructor(handleMessage: (msg: Message) => void);
        handleMessage: (msg: Message) => void;
        sendMessage(msg: Message): boolean;
        sendMessageDelayed(msg: Message, delay: number): boolean;
        sendMessageAtTime(msg: Message, uptimeMillis: number): boolean;
        removeMessages(what: number): void;
        obtainMessage(what: number): Message;
    }
}
declare namespace android.widget {
    import Size = android.graphics.Size;
    import Canvas = android.graphics.Canvas;
    import View = android.view.View;
    import MeasureSpec = android.view.MeasureSpec;
    enum ScaleType {
        MATRIX = 0,
        FIT_XY = 1,
        FIT_START = 2,
        FIT_CENTER = 3,
        FIT_END = 4,
        CENTER = 5,
        CENTER_CROP = 6,
        CENTER_INSIDE = 7,
    }
    class ImageView extends View {
        private bitmap;
        onMeasure(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size;
        onDraw(canvas: Canvas): void;
    }
}
declare namespace android.widget {
    import Size = android.graphics.Size;
    import Canvas = android.graphics.Canvas;
    import ViewGroup = android.view.ViewGroup;
    import MeasureSpec = android.view.MeasureSpec;
    import Orientation = android.graphics.Orientation;
    class LinearLayout extends ViewGroup {
        private _orientation;
        setOrientation(orientation: Orientation): void;
        getOrientation(): Orientation;
        onMeasure(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size;
        measureHorizontal(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size;
        measureVertical(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size;
        onLayout(l: number, t: number, r: number, b: number, canvas: Canvas): void;
        layoutHorizontal(l: number, t: number, r: number, b: number, canvas: Canvas): void;
        layoutVertical(l: number, t: number, r: number, b: number, canvas: Canvas): void;
    }
}
declare namespace android.widget {
    import ViewGroup = android.view.ViewGroup;
    import Context = android.app.Context;
    import Adapter = android.adapter.Adapter;
    class ListView extends ViewGroup {
        constructor(context: Context);
        setAdapter(adapter: Adapter): void;
    }
}
declare namespace android.widget {
    import Size = android.graphics.Size;
    import Canvas = android.graphics.Canvas;
    import MeasureSpec = android.view.MeasureSpec;
    import Context = android.app.Context;
    import MotionEvent = android.view.event.MotionEvent;
    class ScrollLayout extends FrameLayout {
        private _realLayoutInfo;
        constructor(context: Context);
        onMeasure(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size;
        onLayout(l: number, t: number, r: number, b: number, canvas: Canvas): void;
        private lastPt;
        onInterceptMouseEvent(event: MotionEvent): boolean;
        private startPt;
        onMouseEvent(event: MotionEvent): boolean;
    }
}
declare namespace android.widget {
    class Scroller {
    }
    class FastScroller {
    }
}
declare namespace android.widget {
    import Size = android.graphics.Size;
    import Canvas = android.graphics.Canvas;
    import View = android.view.View;
    import MeasureSpec = android.view.MeasureSpec;
    import Font = android.graphics.Font;
    enum Ellipsize {
    }
    class TextView extends View {
        private text;
        private font;
        private _ellipsize;
        private _maxWidth;
        private _linespace;
        onDraw(canvas: Canvas): void;
        setText(text: string): void;
        setFont(font: Font): void;
        ellipsize: Ellipsize;
        maxWidth: number;
        linespace: number;
        onMeasure(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size;
    }
}
declare namespace android.widget {
    import Size = android.graphics.Size;
    import Canvas = android.graphics.Canvas;
    import ViewGroup = android.view.ViewGroup;
    import MeasureSpec = android.view.MeasureSpec;
    import ViewPageAdapter = android.adapter.ViewPageAdapter;
    import Context = android.app.Context;
    import MotionEvent = android.view.event.MotionEvent;
    class ViewPager extends ViewGroup {
        private mPosition;
        private mAdapter;
        private mOldAdapter;
        private mViewStack;
        private mIndex;
        private mSize;
        private mAnimationState;
        private mScale;
        private mIsScaled;
        private mMin_speed;
        private min_touch;
        private mLayoutParams;
        private mLastAnimationTime;
        private mCurrentAnimationTime;
        private mSpeed;
        private mCurrentView;
        private mNextView;
        private mPreView;
        private mAnimationEnd;
        private mCenterX;
        private mCenterY;
        private listener;
        private mDataSetObserver;
        private mHandler;
        private mAreaTouchListener;
        private direction;
        private oldx;
        private oldy;
        private downX;
        constructor(context: Context);
        private init();
        setAreaTouchListener(l: AreaTouchListener): void;
        onInterceptTouchEvent(evnt: MotionEvent): boolean;
        onTouchEvent(event: MotionEvent): boolean;
        onMeasure(widthMeasureSpec: MeasureSpec, heightMeasureSpec: MeasureSpec, canvas: Canvas): Size;
        onLayout(l: number, t: number, r: number, b: number, canvas: Canvas): void;
        dispatchDraw(canvas: Canvas): void;
        setAdapter(adapter: ViewPageAdapter): void;
        setCurrentItem(index: number): void;
        getCurrentItem(): number;
        setPagerChangedListener(listen: PagerChangedListener): void;
        private refreshNormal();
        private preRemove();
        private preLoad(position);
        private preLoadPreView(position);
        private preLoadNextView(position);
        private loadView(index);
        private move(dis);
        private prepareToAnimation(speed);
        flipLeft(): void;
        flipRight(): void;
        private doRightOrBounceAnimation();
        private doLeftOrBounceAnimation();
        private endBounceanimtion();
        private endRightanimation();
        private endLeftAnimation();
        private pagerChanged(position, targetPosition);
        private pagerMoving(movedegreepreView, movedegree);
        private pagerMovingEnd(position);
    }
    interface PagerChangedListener {
        onPagerChanged(position: number, targetPosition: number): any;
        onPagerMoving(movedegreepreView: number, movedegree: number): any;
        onPagerMovingEnd(position: number): any;
    }
    interface AreaTouchListener {
        onLeftTouch(): any;
        onRightTouch(): any;
        onMiddleTouch(): any;
    }
}
declare namespace android.view.animation {
    enum AnimationType {
        Alpha = 0,
        Translate = 1,
        Scale = 2,
        Rotate = 3,
    }
}
declare namespace android.view.animation {
    import Canvas = android.graphics.Canvas;
    class ScaleAnimation extends Animation {
        duration: number;
        start: number;
        ease: AnimationEase;
        type: AnimationType;
        constructor();
        readonly isAniamtionEnd: boolean;
        scale(now: number): number;
        applyTransformation(interpolatedTime: number, canvas: Canvas, view: View): void;
    }
}
declare namespace android.view {
    import Rect = android.graphics.Rect;
    class RenderState {
        currentRect: Rect;
        index: number;
        constructor(rect: Rect, index: number);
    }
}
