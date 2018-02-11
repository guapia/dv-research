/// <reference path="node_modules/@types/lodash/index.d.ts" />
/// <reference path="node_modules/@types/mathjs/index.d.ts" />
/// <reference path="dst/android.d.ts" />
declare namespace android.test {
    class Utility {
        static max(arr: number[]): any;
        static min(arr: number[]): any;
        static iskey(key: any): boolean;
        static checkArrayType(arr: any[]): boolean;
        static getType(v: any): DataType;
        static mergeScale(scaleA: Scale, scaleB: Scale, force?: boolean): Scale;
        static isMixedRotatedRect(r1: RotateRect, r2: RotateRect): boolean;
    }
}
declare namespace android.test {
    class ColorUtils {
        private static _colorindex;
        static Color: string[];
        static nextColor(): string;
        static indexColor(index: number): string;
        static gradientColor(startColor: string, endColor: string, step: number): any[];
        static getColor(startColor: string, endColor: string, value: number, start: number, end: number): string;
        static colorRgb(sColor: string): string | any[];
        static colorHex(rgb: any): any;
    }
}
declare namespace android.test {
    import Point = android.graphics.Point;
    class RotateRect {
        angle: number;
        centerx: number;
        centery: number;
        width: number;
        height: number;
        points: Point[];
        constructor(centerx: number, centery: number, width: number, height: number, angle: number);
        readonly raidius: number;
        offset(x: number, y: number, angle: number): void;
        readonly leftTop: Point;
        readonly rightTop: Point;
        readonly leftBottom: Point;
        readonly rightBottom: Point;
        readonly centerTop: Point;
        readonly centerBottom: Point;
        readonly center: Point;
        readonly startPoint: Point;
    }
    class RotateLine {
        startPoint: Point;
        endPoint: Point;
        private _angle;
        private _cx;
        private _cy;
        private _leftwidth;
        private _rightwidth;
        constructor(cx: number, cy: number, leftwidth: number, rightwidth: number, angle: number);
    }
}
declare namespace android.test {
    enum AnimationType {
        Width = 0,
        Height = 1,
        Size = 2,
        Radius = 3,
        Sweep = 4,
        Alpha = 5,
    }
}
declare namespace android.test {
    enum Agg {
        SUM = 0,
        AVERAGE = 1,
        COUNT = 2,
        NONE = 3,
    }
}
declare namespace android.test {
    enum Order {
        Desc = 0,
        Asc = 1,
        None = 2,
    }
}
declare namespace android.test {
    enum ScaleType {
        Linear = 0,
        Log = 1,
        Ordinal = 2,
        LatLon = 3,
    }
}
declare namespace android.test {
    enum DataType {
        Number = 0,
        String = 1,
        Object = 2,
        Array = 3,
        Boolean = 4,
        Date = 5,
    }
}
declare namespace android.test {
    enum ChartType {
        Bar = 0,
        Line = 1,
        Scatter = 2,
        Area = 3,
        Pie = 4,
        Sunburst = 5,
        TreeMap = 6,
        Radar = 7,
        Candlestick = 8,
    }
}
declare namespace android.test.cartesian {
    enum AxisType {
        X = 0,
        Y = 1,
    }
}
declare namespace android.test.cartesian {
    class Value {
        __preVal: any;
        __val: any;
        __dataType: DataType;
        __nextVal: any;
        __scaleType: ScaleType;
        __isMultiple: boolean;
        constructor(v: any, scaleType: ScaleType);
        readonly scaleType: ScaleType;
        readonly dataType: DataType;
        /**
         * for what ?
         * array value for high low open close?
         */
        readonly isMultiple: boolean;
        readonly value: any;
    }
}
declare namespace android.test.cartesian {
    class Field {
        aggregate: Agg;
        bind: string | string[];
        name: string;
        type: ScaleType;
        logBase: number;
        range: any[];
        band: boolean;
        index: number;
        readonly isMultiple: boolean;
        constructor(bind: any, name: string, index?: number);
        equals(field: Field): boolean;
    }
}
declare namespace android.test.cartesian {
    class Filter {
        series: string[];
        rules: Rule[];
        constructor(series: string, rules: any);
        equals(field: Field): boolean;
    }
    class Rule {
        express: string;
        filed: string;
        constructor(filed: string, express: string);
    }
}
declare namespace android.test.cartesian {
    class Encoding {
        x: Field;
        y: Field;
        geoposition: Field;
        color: Field;
        size: Field;
        shape: Field;
        group: Field;
        text: Field;
        tooltip: Field;
        values: Field[];
        _stack: boolean;
        _radial: boolean;
        constructor(encoding: any);
    }
}
declare namespace android.test.cartesian {
    class Item {
        geoposition: Value;
        x: Value;
        y: Value;
        shape: Value;
        color: Value;
        size: Value;
        text: Value;
        tooltip: Value;
        group: Value;
        readonly id: string;
    }
}
declare namespace android.test.cartesian {
    class TransForm {
    }
}
declare namespace android.test.cartesian {
    class Series {
        private __name;
        private __index;
        private __data;
        private __encoding;
        private __pairs;
        private __points;
        private __chartType;
        enable: boolean;
        showlabels: boolean;
        readonly id: string;
        constructor(encoding: Encoding, series: any, index: number);
        private __analyseItem(pairs, item);
        _refresh(): void;
        private __createScale(filed);
        readonly data: any[];
        readonly name: string;
        readonly scalePairs: {
            filed: Field;
            scale: Scale;
        }[];
        readonly points: Item[];
        readonly size: number;
        readonly chartType: ChartType;
        readonly index: number;
        getScale(name: string): Scale;
        clone(): Series;
    }
}
declare namespace android.test.cartesian {
    class DataModel {
        private __encoding;
        private __filter;
        private __data;
        private __series;
        private __allSeries;
        private __chartTypes;
        protected __scalePairs: {
            series: string[];
            filed: Field;
            scale: Scale;
        }[];
        private _analyseEncoding(encode);
        readonly chartTypes: ChartType[];
        private _analyseSeries(series_data, encoding);
        constructor(data: any);
        refresh(): void;
        private _analyseFilter(filter);
        private _createLayoutScales(encoding);
        private _stack(chartType);
        private __getScaleInfobyname(filedname, seriesname);
        _getScaleByName(filedname: string, seriesname: string): Scale;
        private _setSeriesStack(series, pos, neg);
        getSeriesByType(charttype: ChartType): Series[];
        readonly series: Series[];
        readonly allSeries: Series[];
        readonly encoding: Encoding;
        readonly filter: Filter;
        readonly scalePairs: {
            series: string[];
            filed: Field;
            scale: Scale;
        }[];
    }
}
declare namespace android.test.hierarchical {
    class Value {
        __val: any;
        __dataType: DataType;
        __scaleType: ScaleType;
        constructor(v: any, scaleType: ScaleType);
        readonly scaleType: ScaleType;
        readonly dataType: DataType;
        readonly value: any;
    }
}
declare namespace android.test.hierarchical {
    class Field {
        aggregate: Agg;
        bind: string;
        name: string;
        range: any[];
        band: boolean;
        type: ScaleType;
        constructor(bind: any, name: string);
        equals(field: Field): boolean;
    }
}
declare namespace android.test.hierarchical {
    class Item {
        readonly id: string;
        children: Item[];
        size: Value;
        color: Value;
        text: Value;
        depth: Value;
        count: Value;
        _hidden: boolean;
    }
}
declare namespace android.test.hierarchical {
    class Encoding {
        color: Field;
        size: Field;
        tooltip: Field;
        text: Field;
        children: Field;
        constructor(encoding: any);
    }
}
declare namespace android.test.hierarchical {
    class DataModel {
        private static id;
        private __encoding;
        private __data;
        private __root;
        private __chartType;
        private _analyseEncoding(encode);
        readonly chartType: ChartType;
        constructor(data: any);
        private __createModel(data, depth);
        private __createRoot();
        refresh(): void;
        private __createScale(filed);
        readonly root: Item[];
        readonly encoding: Encoding;
    }
}
declare namespace android.test {
    interface IScale {
        domain(domains: any[]): IScale;
        refresh(): IScale;
        range(ranges: any[]): IScale;
        rangeBounds(ranges: any[]): IScale;
        getScaleValue(value: any): any;
        order: Order;
        max: number;
        min: number;
        clone(): IScale;
        equal(value: IScale): any;
    }
}
declare namespace android.test {
    abstract class Scale implements IScale {
        private __id;
        protected __start: any;
        protected __end: any;
        protected __bound: boolean;
        protected _order: Order;
        readonly max: number;
        readonly min: number;
        constructor(id?: string);
        protected __domains: any[];
        protected __ranges: any[];
        id: string;
        domain(domains: any[]): IScale;
        range(ranges: any[]): IScale;
        rangeBounds(ranges: any[]): IScale;
        refresh(): IScale;
        getScaleValue(value: any): any;
        readonly startPosition: any;
        readonly endPosition: any;
        order: Order;
        equal(value: Scale): boolean;
        clone(): Scale;
    }
}
declare namespace android.test {
    class LinearScale extends Scale {
        protected _max: number;
        protected _min: number;
        protected niceMaxValue: number;
        readonly max: number;
        readonly min: number;
        constructor(id?: any);
        domain(domains: any[]): this;
        refresh(): IScale;
        range(ranges: any[]): this;
        getScaleValue(v: any): any;
        equal(value: Scale): boolean;
    }
}
declare namespace android.test {
    class OrdinalScale extends Scale {
        protected _domainCache: {
            [name: string]: number;
        };
        private _size;
        constructor(id?: any);
        refresh(): IScale;
        readonly max: number;
        readonly min: number;
        readonly domains: any[];
        readonly ranges: any[];
        range(ranges: any[]): this;
        rangeBounds(ranges: any[]): this;
        domain(domains: any[]): IScale;
        getScaleValue(v: any): number;
    }
}
declare namespace android.test {
    class LogScale extends Scale {
        protected _max: number;
        protected _min: number;
        protected _niceTick: number;
        protected _niceMaxValue: number;
        private _ticksize;
        protected _logBase: number;
        constructor(logbase: number, id?: any);
        domain(domains: any[]): this;
        readonly logBase: number;
        tickSize: number;
        readonly max: number;
        readonly min: number;
        refresh(): IScale;
        range(ranges: any[]): this;
        readonly ticks: any[];
        getScaleValue(v: any): any;
    }
}
declare namespace android.test {
    enum ElementType {
        Shape = 0,
        Series = 1,
        Axis = 2,
        SeriesLegend = 3,
        ScaleLegend = 4,
    }
}
declare namespace android.test {
    interface ILegend {
    }
}
declare namespace android.test.cartesian {
    import View = android.view.View;
    import Context = android.app.Context;
    import MeasureSpec = android.view.MeasureSpec;
    import Size = android.graphics.Size;
    import Canvas = android.graphics.Canvas;
    class ScaleLegend extends View implements ILegend {
        private __scale;
        private __currentValue;
        private __type;
        constructor(c: Context, type?: 'value' | 'color');
        scale: Scale;
        onMeasure(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size;
        onLayout(l: number, t: number, r: number, b: number, canvas: Canvas): void;
        onDraw(canvas: Canvas): void;
        private _drawColorScale(canvas);
    }
}
declare namespace android.test.cartesian {
    import View = android.view.View;
    import LinearLayout = android.widget.LinearLayout;
    import Context = android.app.Context;
    import MeasureSpec = android.view.MeasureSpec;
    import Size = android.graphics.Size;
    import Canvas = android.graphics.Canvas;
    import Rect = android.graphics.Rect;
    import Font = android.graphics.Font;
    import MotionEvent = android.view.event.MotionEvent;
    class SeriesLegend extends LinearLayout implements ILegend {
        private _series;
        private __shape;
        constructor(c: Context, shape?: 'bar' | 'scatter');
        series: Series[];
        private __loadItems();
    }
    class LegendItem extends View {
        series: Series;
        icon: Icon;
        font: Font;
        private __fontRect;
        private __iconRect;
        constructor(c: Context);
        onMeasure(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size;
        onLayout(l: number, t: number, r: number, b: number, canvas: Canvas): void;
        onDraw(canvas: Canvas): void;
        onMouseEvent(event: MotionEvent): boolean;
    }
    abstract class Icon {
        color: string;
        abstract draw(rect: Rect, canvas: Canvas): void;
    }
    class BarIcon extends Icon {
        draw(rect: Rect, canvas: Canvas): void;
    }
    class CircleIcon extends Icon {
        draw(rect: Rect, canvas: Canvas): void;
    }
}
declare namespace android.test {
    import Canvas = android.graphics.Canvas;
    import Style = android.graphics.Style;
    import StrokeStyle = android.graphics.StrokeStyle;
    import MotionEvent = android.view.event.MotionEvent;
    import Context = android.app.Context;
    abstract class Shape extends ComparedView {
        static PRIORITY: number;
        protected _strokeStyle: StrokeStyle;
        protected _style: Style;
        style: Style;
        constructor(context: Context);
        onDraw(canvas: Canvas): void;
        protected _drawAnimation(canvas: Canvas): void;
        abstract onDrawShape(canvas: Canvas): void;
        abstract refresh(): void;
        onMouseEvent(event: MotionEvent): boolean;
    }
}
declare namespace android.test {
    import Canvas = android.graphics.Canvas;
    import Font = android.graphics.Font;
    import Context = android.app.Context;
    class Label extends Shape {
        text: string;
        labelrect: RotateRect;
        _font: Font;
        private __padding;
        private _xs;
        private _ys;
        constructor(c: Context, text: string, cx: number, cy: number, w: number, h: number, angle: number, padding: number);
        getpts(size: number): {
            xs: number[];
            ys: number[];
        };
        onDrawShape(canvas: Canvas): void;
        refresh(): void;
    }
}
declare namespace android.test {
    abstract class PlotShape extends Shape {
        datapoint: any;
        private _label;
        label: Label;
        refresh(): void;
    }
}
declare namespace android.test {
    import View = android.view.View;
    import Canvas = android.graphics.Canvas;
    import Rect = android.graphics.Rect;
    import Style = android.graphics.Style;
    import StrokeStyle = android.graphics.StrokeStyle;
    import Animation = android.view.animation.Animation;
    import MotionEvent = android.view.event.MotionEvent;
    import Context = android.app.Context;
    class BarShape extends PlotShape {
        static BarPrority: number;
        constructor(c: Context, x: number, y: number, w: number, h: number, style?: Style, strokeStyle?: StrokeStyle);
        onDrawShape(canvas: Canvas): void;
        onMouseEvent(event: MotionEvent): boolean;
    }
    class BarAnimation extends Animation {
        private rect;
        constructor(rect: Rect);
        applyTransformation(interpolatedTime: number, canvas: Canvas, view: View): void;
        onStartAniamtion(canvas: Canvas, view: View): void;
        onEndAnimation(canvas: Canvas, view: View): void;
    }
    class BarWidthAnimation extends Animation {
        id: string;
        private rect;
        constructor(rect: Rect);
        applyTransformation(interpolatedTime: number, canvas: Canvas, view: View): void;
        onStartAniamtion(canvas: Canvas, view: View): void;
        onEndAnimation(canvas: Canvas, view: View): void;
    }
}
declare namespace android.test {
    import View = android.view.View;
    import Rect = android.graphics.Rect;
    import Canvas = android.graphics.Canvas;
    import Style = android.graphics.Style;
    import StrokeStyle = android.graphics.StrokeStyle;
    import Animation = android.view.animation.Animation;
    import MotionEvent = android.view.event.MotionEvent;
    import Context = android.app.Context;
    class CubeShape extends PlotShape {
        static CubePrority: number;
        private __oldColor;
        scaleCallBack: (rect: Rect) => void;
        text: string;
        constructor(c: Context, x: number, y: number, w: number, h: number, style?: Style, strokeStyle?: StrokeStyle);
        onDrawShape(canvas: Canvas): void;
        invalidate(flg: boolean): void;
        onMouseEvent(event: MotionEvent): boolean;
        getComparedAnimation(fromview: ComparedView): Animation;
    }
    class CubeAnimation extends Animation {
        private rect;
        constructor(rect: Rect);
        applyTransformation(interpolatedTime: number, canvas: Canvas, view: View): void;
        onStartAniamtion(canvas: Canvas, view: View): void;
        onEndAnimation(canvas: Canvas, view: View): void;
    }
}
declare namespace android.test {
    import Canvas = android.graphics.Canvas;
    import Style = android.graphics.Style;
    import StrokeStyle = android.graphics.StrokeStyle;
    import Context = android.app.Context;
    class RadialBarShape extends PlotShape {
        protected _cx: number;
        protected _cy: number;
        _innerRadius: number;
        _radius: number;
        _startAngle: number;
        _sweep: number;
        constructor(c: Context, cx: number, cy: number, innerRadius: number, radius: number, startAngle: number, sweep: number, style?: Style, strokeStyle?: StrokeStyle);
        getpts(size: number): {
            xs: number[];
            ys: number[];
        };
        onDrawShape(canvas: Canvas): void;
    }
}
declare namespace android.test {
    import View = android.view.View;
    import Canvas = android.graphics.Canvas;
    import Style = android.graphics.Style;
    import StrokeStyle = android.graphics.StrokeStyle;
    import Animation = android.view.animation.Animation;
    import Context = android.app.Context;
    class SunburstShape extends PlotShape {
        protected _cx: number;
        protected _cy: number;
        _innerRadius: number;
        _radius: number;
        _startAngle: number;
        _sweep: number;
        text: string;
        constructor(c: Context, cx: number, cy: number, innerRadius: number, radius: number, startAngle: number, sweep: number, style?: Style, strokeStyle?: StrokeStyle);
        onDrawShape(canvas: Canvas): void;
    }
    class RadiusAnimation extends Animation {
        private _radius;
        private _sweep;
        constructor();
        applyTransformation(interpolatedTime: number, canvas: Canvas, view: View): void;
        onStartAniamtion(canvas: Canvas, view: View): void;
        onEndAnimation(canvas: Canvas, view: View): void;
    }
    class SweepAnimation extends Animation {
        private _radius;
        private _sweep;
        constructor();
        applyTransformation(interpolatedTime: number, canvas: Canvas, view: View): void;
        onStartAniamtion(canvas: Canvas, view: View): void;
        onEndAnimation(canvas: Canvas, view: View): void;
    }
}
declare namespace android.test {
    import View = android.view.View;
    import Canvas = android.graphics.Canvas;
    import Rect = android.graphics.Rect;
    import Style = android.graphics.Style;
    import StrokeStyle = android.graphics.StrokeStyle;
    import MotionEvent = android.view.event.MotionEvent;
    import Animation = android.view.animation.Animation;
    import Context = android.app.Context;
    class ScatterShape extends PlotShape {
        static ScatterPrority: number;
        constructor(c: Context, x: number, y: number, w: number, h: number, style?: Style, strokeStyle?: StrokeStyle);
        onDrawShape(canvas: Canvas): void;
        getpts(size: number): {
            xs: number[];
            ys: number[];
        };
        onMouseEvent(event: MotionEvent): boolean;
    }
    class ScatterAnimation extends Animation {
        private rect;
        constructor(rect: Rect);
        applyTransformation(interpolatedTime: number, canvas: Canvas, view: View): void;
        onStartAniamtion(canvas: Canvas, view: View): void;
        onEndAnimation(canvas: Canvas, view: View): void;
    }
}
declare namespace android.test {
    import Canvas = android.graphics.Canvas;
    import Style = android.graphics.Style;
    import StrokeStyle = android.graphics.StrokeStyle;
    import MotionEvent = android.view.event.MotionEvent;
    import Context = android.app.Context;
    class LinesShape extends PlotShape {
        private __xs;
        private __ys;
        static LinesPrority: number;
        constructor(context: Context, xs: number[], ys: number[], style?: Style, strokeStyle?: StrokeStyle);
        strokeStyle: StrokeStyle;
        getpts(size: number): {
            xs: number[];
            ys: number[];
        };
        trace(x: number, y: number): boolean;
        onMouseEvent(event: MotionEvent): boolean;
        onDrawShape(canvas: Canvas): void;
        protected _drawAnimation(canvas: Canvas): void;
    }
}
declare namespace android.test {
    import View = android.view.View;
    import Canvas = android.graphics.Canvas;
    import Rect = android.graphics.Rect;
    import Style = android.graphics.Style;
    import StrokeStyle = android.graphics.StrokeStyle;
    import Animation = android.view.animation.Animation;
    import MotionEvent = android.view.event.MotionEvent;
    import Context = android.app.Context;
    class AreaShape extends PlotShape {
        private __xs;
        private __ys;
        constructor(context: Context, xs: number[], ys: number[], style?: Style, strokeStyle?: StrokeStyle);
        strokeStyle: StrokeStyle;
        trace(x: number, y: number): boolean;
        onDrawShape(canvas: Canvas): void;
        getpts(size: number): {
            xs: number[];
            ys: number[];
        };
        onMouseEvent(event: MotionEvent): boolean;
    }
    class AreaAnimation extends Animation {
        private rect;
        constructor(rect: Rect);
        applyTransformation(interpolatedTime: number, canvas: Canvas, view: View): void;
        onStartAniamtion(canvas: Canvas, view: View): void;
        onEndAnimation(canvas: Canvas, view: View): void;
    }
}
declare namespace android.test {
    import Canvas = android.graphics.Canvas;
    import StrokeStyle = android.graphics.StrokeStyle;
    import Context = android.app.Context;
    class AxisLineShape extends Shape {
        private startPoint;
        private endPoint;
        constructor(c: Context, x: number, y: number, ex: number, ey: number, strokeStyle?: StrokeStyle);
        onDrawShape(canvas: Canvas): void;
        refresh(): void;
    }
}
declare namespace android.test {
    import Context = android.app.Context;
    /**
     * BaseLayout
     */
    class BaseLayout {
        protected __shapelist: PlotShape[];
        private __context;
        constructor(context: Context);
        readonly context: Context;
        convert(...args: any[]): PlotShape[];
        readonly shapeList: PlotShape[];
    }
}
declare namespace android.test.cartesian {
    /**
     * BaseLayout
     */
    class CartesianBaseLayout extends BaseLayout {
        readonly scalePairs: {
            series: string[];
            filed: Field;
            scale: Scale;
        }[];
    }
}
declare namespace android.test.cartesian {
    import Rect = android.graphics.Rect;
    import Style = android.graphics.Style;
    import StrokeStyle = android.graphics.StrokeStyle;
    import Canvas = android.graphics.Canvas;
    import Context = android.app.Context;
    abstract class CartesianLayout extends BaseLayout {
        barStyle: Style;
        lineStyle: StrokeStyle;
        protected __scalePairs: {
            series: string[];
            filed: Field;
            scale: Scale;
        }[];
        protected _locationCache: {
            key: string | number;
            points: any[];
        }[];
        protected _serieslist: Series[];
        protected _stack: boolean;
        protected _rect: Rect;
        protected _encoding: Encoding;
        constructor(c: Context);
        convert(serieslist: Series[], encoding: Encoding, rect: Rect, canvas: Canvas): PlotShape[];
        private __analyseScales();
        private _createLayoutScales(encoding);
        readonly maxSeriesSize: number;
        protected abstract _layoutSeries(series: Series, index: number, canvas?: Canvas): void;
        readonly scalePairs: {
            series: string[];
            filed: Field;
            scale: Scale;
        }[];
        private _getScale(name);
    }
}
declare namespace android.test.cartesian {
    import Canvas = android.graphics.Canvas;
    class BarLayout extends CartesianLayout {
        readonly barWidth: number;
        protected _layoutSeries(series: Series, index: number, canvas: Canvas): void;
    }
}
declare namespace android.test.cartesian {
    import Canvas = android.graphics.Canvas;
    class ScatterLayout extends CartesianLayout {
        readonly barWidth: number;
        protected _layoutSeries(series: Series, index: number, canvas: Canvas): void;
        protected _layoutLine(): void;
    }
}
declare namespace android.test.cartesian {
    import Context = android.app.Context;
    import Style = android.graphics.Style;
    import StrokeStyle = android.graphics.StrokeStyle;
    abstract class RadialCartesianLayout extends BaseLayout {
        barStyle: Style;
        lineStyle: StrokeStyle;
        protected __scalePairs: {
            series: string[];
            filed: Field;
            scale: Scale;
        }[];
        protected _locationCache: {
            key: string | number;
            points: any[];
        }[];
        protected _serieslist: Series[];
        protected _stack: boolean;
        protected _encoding: Encoding;
        protected _cx: number;
        protected _cy: number;
        protected _innerRadius: number;
        protected _radius: number;
        protected _startAngle: number;
        protected _endAngle: number;
        constructor(context: Context);
        convert(serieslist: Series[], encoding: Encoding, cx: number, cy: number, innerRadius: number, radius: number, startAngle: number, endAngle: number): PlotShape[];
        private __analyseScales();
        private _createLayoutScales(encoding);
        readonly maxSeriesSize: number;
        protected abstract _layoutSeries(series: Series, index: number): void;
        readonly scalePairs: {
            series: string[];
            filed: Field;
            scale: Scale;
        }[];
        private _getScale(name);
    }
}
declare namespace android.test.cartesian {
    class RadialBarLayout extends RadialCartesianLayout {
        readonly barWidth: number;
        protected _layoutSeries(series: Series, index: number): void;
    }
}
declare namespace android.test.cartesian {
    class RadialLineLayout extends RadialCartesianLayout {
        protected _layoutSeries(series: Series, index: number): void;
        protected _layoutLine(): void;
    }
}
declare namespace android.test.cartesian {
    class RadialAreaLayout extends RadialCartesianLayout {
        protected _layoutSeries(series: Series, index: number): void;
        protected _layoutLine(): void;
    }
}
declare namespace android.test.cartesian {
    class RadialScatterLayout extends RadialCartesianLayout {
        readonly barWidth: number;
        protected _layoutSeries(series: Series, index: number): void;
        protected _layoutLine(): void;
    }
}
declare namespace android.test.cartesian {
    class LineLayout extends CartesianLayout {
        protected _layoutSeries(series: Series, index: number): void;
        protected _layoutLine(): void;
    }
}
declare namespace android.test.cartesian {
    class AreaLayout extends CartesianLayout {
        protected _layoutSeries(series: Series, index: number): void;
        protected _layoutLine(): void;
    }
}
declare namespace android.test.hierarchical {
    import Rect = android.graphics.Rect;
    import Style = android.graphics.Style;
    import StrokeStyle = android.graphics.StrokeStyle;
    import Canvas = android.graphics.Canvas;
    import Context = android.app.Context;
    abstract class HierarchicalLayout extends BaseLayout {
        protected _rect: Rect;
        protected _encoding: Encoding;
        protected _depth: number;
        protected _offset: number;
        style: Style;
        lineStyle: StrokeStyle;
        constructor(c: Context);
        protected _calcDeep(roots: Item[]): void;
        private __calcDeep(items);
        abstract convert(roots: Item[], encoding: Encoding, rect: Rect, canvas: Canvas): PlotShape[];
    }
}
declare namespace android.test.hierarchical {
    import Rect = android.graphics.Rect;
    import Canvas = android.graphics.Canvas;
    import Context = android.app.Context;
    class SunburstLayout extends HierarchicalLayout {
        private __startAngle;
        private __sweep;
        private __innerRadius;
        private __radius;
        private __cx;
        private __cy;
        private __preangle;
        private __radiusUnit;
        constructor(c: Context, startAngle: number, sweep: number, innerRadius: any);
        convert(roots: Item[], encoding: Encoding, rect: Rect, canvas: Canvas): PlotShape[];
        private __layoutItems(analysis, engine);
        private __calcSum(a);
    }
}
declare namespace android.test.hierarchical {
    import Rect = android.graphics.Rect;
    import Canvas = android.graphics.Canvas;
    import Context = android.app.Context;
    class TreeMapLayout extends HierarchicalLayout {
        protected _limited: number;
        constructor(c: Context, rect: Rect);
        convert(roots: Item[], encoding: Encoding, rect: Rect, canvas: Canvas): PlotShape[];
        private __hideSmallNode(a);
        private __calcSum(a);
        private __layoutItems(analysis, canvas);
        private __locationRects(vs, index, preSize, rect);
        private __clipRect(r, recttotal);
    }
}
declare namespace android.test {
    abstract class Ticks {
        protected _scale: Scale;
        protected _ticks: any[];
        constructor(scale: Scale);
        static create(scale: Scale, start: number, end: number): Ticks;
        abstract createTicks(count?: number): void;
        protected _createTicks(start: number, stop: number, count: number): any;
        protected _tickIncrement(start: number, stop: number, count: number): number;
        _tickStep(start: number, stop: number, count: number): number;
    }
}
declare namespace android.test {
    class LinearTicks extends Ticks {
        static create(scale: Scale): LinearTicks;
        createTicks(count?: number): any[];
        niceScale(): LinearScale;
    }
}
declare namespace android.test {
    class LogTicks extends Ticks {
        static create(scale: Scale): LogTicks;
        createTicks(count?: number): any[];
    }
}
declare namespace android.test {
    class OrdinalTicks extends Ticks {
        static create(scale: Scale): OrdinalTicks;
        createTicks(count?: number): any[];
    }
}
declare namespace android.test {
    import Canvas = android.graphics.Canvas;
    import StrokeStyle = android.graphics.StrokeStyle;
    import Font = android.graphics.Font;
    import Context = android.app.Context;
    class AxisShape extends Shape {
        _label: string;
        _major: StrokeStyle;
        _minor: StrokeStyle;
        _lableRect: RotateRect;
        _lableFont: Font;
        _majorTick: RotateLine;
        _minorTick: RotateLine;
        _showLabel: boolean;
        constructor(context: Context);
        onDrawShape(canvas: Canvas): void;
        refresh(): void;
    }
}
declare const LABEL_PADDING: number;
declare const MAJOR_TICK_HEIGHT: number;
declare const MINOR_TICK_HEIGHT: number;
declare namespace android.test.cartesian {
    import MeasureSpec = android.view.MeasureSpec;
    import Canvas = android.graphics.Canvas;
    import Size = android.graphics.Size;
    import Context = android.app.Context;
    import Font = android.graphics.Font;
    import StrokeStyle = android.graphics.StrokeStyle;
    import ViewGroup = android.view.ViewGroup;
    abstract class BaseAxis extends ViewGroup {
        private _scale;
        private _max;
        private _min;
        private _reversed;
        private _series;
        protected _children: Shape[];
        protected _majorTickHeight: number;
        protected _minorTickHeight: number;
        protected _axisType: AxisType;
        protected _ticks: any[];
        protected _title: string;
        protected _titleFont: Font;
        protected _labelFont: Font;
        protected _majorStyle: StrokeStyle;
        protected _minorStyle: StrokeStyle;
        protected _lineStyle: StrokeStyle;
        protected _near: boolean;
        constructor(context: Context);
        protected abstract _createTicks(): any[];
        title: string;
        majorStyle: StrokeStyle;
        minorStyle: StrokeStyle;
        lineStyle: StrokeStyle;
        titleFont: Font;
        labelFont: Font;
        max: number;
        min: number;
        series: string[];
        scale: Scale;
        reversed: boolean;
        type: AxisType;
        near: boolean;
        abstract _layoutXAxis(canvas: Canvas): void;
        abstract _layoutYAxis(canvas: Canvas): void;
        onMeasure(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size;
        onLayout(l: number, t: number, r: number, b: number, canvas: Canvas): void;
        onDraw(canvas: Canvas): void;
        _format(val: any): string;
    }
}
declare namespace android.test.cartesian {
    import MeasureSpec = android.view.MeasureSpec;
    import Canvas = android.graphics.Canvas;
    import Size = android.graphics.Size;
    import Context = android.app.Context;
    class LineAxis extends BaseAxis {
        private _maxLabelSize;
        constructor(context: Context);
        near: boolean;
        readonly id: string;
        protected _createTicks(): any[];
        _layoutXAxis(canvas: Canvas): void;
        _layoutYAxis(canvas: Canvas): void;
        onMeasure(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size;
        protected _measureX(canvas: Canvas): number;
        protected _measureY(canvas: Canvas): number;
        onLayout(l: number, t: number, r: number, b: number, canvas: Canvas): void;
        onDraw(canvas: Canvas): void;
        private _drawLine(canvas);
    }
}
declare namespace android.test.cartesian {
    import MeasureSpec = android.view.MeasureSpec;
    import Canvas = android.graphics.Canvas;
    import Size = android.graphics.Size;
    import Context = android.app.Context;
    class RadialLineAxis extends BaseAxis {
        private __innerRadius;
        private __startAngle;
        private __sweep;
        private __radius;
        private __cx;
        private __cy;
        constructor(context: Context);
        near: boolean;
        _cx: number;
        _cy: number;
        _radius: number;
        _innerRadius: number;
        _startAngle: number;
        _sweep: number;
        protected _createTicks(): any[];
        _layoutXAxis(canvas: Canvas): void;
        _layoutYAxis(canvas: Canvas): void;
        onMeasure(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size;
        protected _measureX(canvas: Canvas): number;
        protected _measureY(canvas: Canvas): number;
        onLayout(l: number, t: number, r: number, b: number, canvas: Canvas): void;
        onDraw(canvas: Canvas): void;
        private _drawLine(canvas);
    }
}
declare namespace android.test {
    import ViewGroup = android.view.ViewGroup;
    import Animation = android.view.animation.Animation;
    abstract class BasePlot extends ViewGroup {
        protected _animation: Animation;
        readonly layout: BaseLayout;
        abstract beginLoadingAnimation(): void;
    }
}
declare namespace android.test.cartesian {
    import Context = android.app.Context;
    import MeasureSpec = android.view.MeasureSpec;
    import Canvas = android.graphics.Canvas;
    import Size = android.graphics.Size;
    class CartesianPlot extends BasePlot {
        private __shapeList;
        private _layouts;
        protected __scalePairs: {
            series: string[];
            filed: Field;
            scale: Scale;
        }[];
        private _datamodel;
        constructor(context: Context, datamodel: DataModel);
        onMeasure(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size;
        onLayout(l: number, t: number, r: number, b: number, canvas: Canvas): void;
        protected _layoutLine(l: number, r: number): void;
        beginLoadingAnimation(): void;
        /**
         * merage the scales which is  x / y
         */
        private __merageScale();
        onDraw(canvas: Canvas): void;
        readonly layouts: CartesianBaseLayout[];
        readonly scalePairs: {
            series: string[];
            filed: Field;
            scale: Scale;
        }[];
    }
}
declare namespace android.test.cartesian {
    import MeasureSpec = android.view.MeasureSpec;
    import Canvas = android.graphics.Canvas;
    import Size = android.graphics.Size;
    import Context = android.app.Context;
    import FrameLayout = android.widget.FrameLayout;
    const StartAngle: number;
    class CartesianChart extends FrameLayout {
        private _dataModel;
        private _chartType;
        private _option;
        private _axisList;
        private _plot;
        constructor(context: Context, option?: any, chartType?: ChartType);
        option: any;
        chartType: ChartType;
        datamodel: DataModel;
        private _loadView();
        beginLoadingAnimation(): void;
        private _loadRadialView();
        onMeasure(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size;
        onLayout(l: number, t: number, r: number, b: number, canvas: Canvas): void;
        readonly plot: CartesianPlot;
        dispatchDraw(canvas: Canvas): void;
    }
}
declare namespace android.test {
    import MeasureSpec = android.view.MeasureSpec;
    import Canvas = android.graphics.Canvas;
    import Size = android.graphics.Size;
    import View = android.view.View;
    import RootView = android.widget.RootView;
    abstract class BaseChartLayout extends RootView {
        private __mainLayout;
        private __legends;
        private __oldMargin;
        setMainLayout(main: View): void;
        addLegend(legend: View): void;
        removeAllViews(): void;
        onMeasure(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size;
        onLayout(l: number, t: number, r: number, b: number, canvas: Canvas): void;
        abstract beginLoadingAnimation(): void;
    }
}
declare namespace android.test.cartesian {
    import Size = android.graphics.Size;
    import Canvas = android.graphics.Canvas;
    import View = android.view.View;
    import MeasureSpec = android.view.MeasureSpec;
    import RenderType = android.graphics.RenderType;
    import Context = android.app.Context;
    const EventMessage: string;
    class ChartLayout extends BaseChartLayout {
        private _chart;
        private _legends;
        private _dataModel;
        constructor(context: Context);
        attachElement(element: HTMLElement, renderType: RenderType, datamodel?: DataModel, update?: boolean): void;
        beginLoadingAnimation(): void;
        setChart(): void;
        oninvalidate(): void;
        dispatchDraw(canvas: Canvas): void;
        onMeasure(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size;
        onLayout(l: number, t: number, r: number, b: number, canvas: Canvas): void;
        addView(view: View, index: number): number;
    }
}
declare namespace android.test.hierarchical {
    import Context = android.app.Context;
    import MeasureSpec = android.view.MeasureSpec;
    import Canvas = android.graphics.Canvas;
    import Size = android.graphics.Size;
    import Rect = android.graphics.Rect;
    import View = android.view.View;
    import LayoutParams = android.view.LayoutParams;
    class HierarchicalPlot extends BasePlot {
        private _currentRect;
        private __comparedAnimationCache;
        private _layouts;
        protected __scalePairs: {
            series: string[];
            filed: Field;
            scale: Scale;
        }[];
        private _datamodel;
        constructor(context: Context, datamodel: DataModel);
        scaleCallBack(rect: Rect): void;
        addViewWithOutReLayout(view: View, index?: number, layoutParams?: LayoutParams): number;
        onMeasure(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size;
        onLayout(l: number, t: number, r: number, b: number, canvas: Canvas): void;
        beginLoadingAnimation(): void;
        /**
         * merage the scales which is  x / y
         */
        private __merageScale();
        onDraw(canvas: Canvas): void;
        dispatchDraw(canvas: Canvas): void;
        readonly layouts: BaseLayout[];
        readonly scalePairs: {
            series: string[];
            filed: Field;
            scale: Scale;
        }[];
    }
}
declare namespace android.test.hierarchical {
    import MeasureSpec = android.view.MeasureSpec;
    import Canvas = android.graphics.Canvas;
    import Size = android.graphics.Size;
    import Context = android.app.Context;
    import FrameLayout = android.widget.FrameLayout;
    class HierarchicalChart extends FrameLayout {
        private _dataModel;
        private _chartType;
        private _option;
        private _plot;
        constructor(context: Context, option?: any, chartType?: ChartType);
        option: any;
        chartType: ChartType;
        datamodel: DataModel;
        private _loadView();
        beginLoadingAnimation(): void;
        onMeasure(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size;
        onLayout(l: number, t: number, r: number, b: number, canvas: Canvas): void;
        readonly plot: BasePlot;
        dispatchDraw(canvas: Canvas): void;
    }
}
declare namespace android.test.hierarchical {
    import Size = android.graphics.Size;
    import Canvas = android.graphics.Canvas;
    import View = android.view.View;
    import MeasureSpec = android.view.MeasureSpec;
    import RenderType = android.graphics.RenderType;
    import Context = android.app.Context;
    import RootView = android.widget.RootView;
    class ChartLayout extends RootView {
        private _chart;
        private _dataModel;
        constructor(context: Context);
        attachElement(element: HTMLElement, renderType: RenderType, datamodel?: DataModel): void;
        beginLoadingAnimation(): void;
        setChart(): void;
        dispatchDraw(canvas: Canvas): void;
        onMeasure(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size;
        onLayout(l: number, t: number, r: number, b: number, canvas: Canvas): void;
        addView(view: View, index: number): number;
    }
}
declare namespace android.test.map {
    import Point = android.graphics.Point;
    class PointList {
        private __xs;
        private __ys;
        private __ptlist;
        constructor();
        push(point: Point): void;
        pop(): Point;
        readonly xs: number[];
        readonly ys: number[];
        readonly points: Point[];
    }
    abstract class Stream {
        protected _pointList: PointList;
        protected _projection: Projection;
        constructor();
        setProjection(projection: Projection): void;
        abstract parseStream(coordinates: any): void;
        readonly result: PointList;
    }
    class AreaStream extends Stream {
        parseStream(coordinates: any): void;
    }
    class LineStream extends Stream {
        parseStream(coordinates: any): void;
    }
    class PointStream extends Stream {
        parseStream(coordinates: any): void;
    }
}
declare namespace android.test.map {
    class StreamFactory {
        static streamLine(coordinates: any[], stream: Stream): void;
        static streamArea(coordinates: any[], stream: Stream): void;
    }
}
declare namespace android.test.map {
    enum GeoType {
        Point = 0,
        MultiPoint = 1,
        LineString = 2,
        MultiLineString = 3,
        Polygon = 4,
        MultiPolygon = 5,
        GeometryCollection = 6,
        Feature = 7,
        FeatureCollection = 8,
    }
    class Feature {
        id: string;
        name: string;
        properties: any;
        streams: Stream[];
        projection: Projection;
        constructor();
        parseFeature(feature: any): void;
        parseName(prop: any): void;
        private _createPointStream(coordinates);
        private _createLineStream(coordinates);
        private _createAreaStream(coordinates);
        private _createMultiPointStream(coordinates);
        private _createMultiLineStream(coordinates);
        private _createMultiAreaStream(coordinates);
    }
}
declare namespace android.test.map {
    class ParseFactory {
    }
}
declare namespace android.test.map {
    import Point = android.graphics.Point;
    abstract class Projection {
        readonly maxx: number;
        readonly minx: number;
        readonly maxy: number;
        readonly miny: number;
        abstract begin(): void;
        abstract end(): void;
        abstract scale(rate: number): void;
        abstract rotate(lambda: number, phi: number, gamma: number): void;
        abstract translate(xoffset: number, yoffset: number): void;
        abstract center(lon: number, lat: number): void;
        abstract xy2LonLat(x: number, y: number): {
            lon: number;
            lat: number;
        };
        abstract lonLat2xy(lon: number, lat: number): Point;
        abstract refresh(): void;
    }
}
declare namespace android.test.map {
    import Point = android.graphics.Point;
    const EARTH_RADIUS: number;
    const EQUATOR: number;
    class MercatorProjection extends Projection {
        static MAX_LAT: number;
        private __centerlon;
        private __centerlat;
        private __xoffset;
        private __yoffset;
        private __lambda;
        private __phi;
        private __gamma;
        private __circumference;
        private _max;
        private _min;
        private _maxy;
        private _miny;
        private _scale;
        constructor();
        begin(): void;
        end(): void;
        readonly maxx: number;
        readonly minx: number;
        readonly maxy: number;
        readonly miny: number;
        scale(rate: number): void;
        rotate(lambda: number, phi: number, gamma: number): void;
        translate(xoffset: number, yoffset: any): void;
        center(lon: number, lat: number): void;
        xy2LonLat(x: number, y: number): {
            lon: number;
            lat: number;
        };
        lonLat2xy(lon: number, lat: number): Point;
        refresh(): void;
    }
}
declare namespace android.test.map {
    class ProjectionFactory {
        static create(name?: string): Projection;
    }
}
declare namespace android.test.map {
    import Series = android.test.cartesian.Series;
    import Field = android.test.cartesian.Field;
    import Filter = android.test.cartesian.Filter;
    import Encoding = android.test.cartesian.Encoding;
    class DataModel {
        private static id;
        private __data;
        private __encoding;
        private __filter;
        private __series;
        private __allSeries;
        private __chartTypes;
        private __config;
        protected __scalePairs: {
            series: string[];
            filed: Field;
            scale: Scale;
        }[];
        featureList: Feature[];
        projection: Projection;
        constructor(data: any);
        readonly config: Config;
        private _analyseEncoding(encode);
        refresh(): void;
        readonly chartTypes: ChartType[];
        private _analyseSeries(series_data, encoding);
        private _analyseFilter(filter);
        private __analyseGeoData(geodata);
        private _createLayoutScales(encoding);
        readonly nameScale: MapOrdinalScale;
        private __getScaleInfobyname(filedname, seriesname);
        _getScaleByName(filedname: string, seriesname: string): Scale;
        getSeriesByType(charttype: ChartType): Series[];
        readonly series: Series[];
        readonly allSeries: Series[];
        readonly encoding: Encoding;
        readonly filter: Filter;
        readonly scalePairs: {
            series: string[];
            filed: Field;
            scale: Scale;
        }[];
    }
}
declare namespace android.test.map.relation {
    import Field = android.test.cartesian.Field;
    class Encoding {
        start: Field[] | Field;
        end: Field[] | Field;
        color: Field;
        text: Field;
        tooltip: Field;
        values: Field[];
        constructor(encoding: any);
    }
}
declare namespace android.test.map.relation {
    import Field = android.test.cartesian.Field;
    import Encoding = android.test.map.relation.Encoding;
    import Point = android.graphics.Point;
    class Item {
        start: Point;
        end: Point;
        value: any;
    }
    class DataModel {
        private static id;
        private __data;
        private __encoding;
        private __chartTypes;
        private __config;
        protected __scalePairs: {
            filed: Field;
            scale: Scale;
        }[];
        featureList: Feature[];
        projection: Projection;
        private _points;
        readonly points: Item[];
        readonly config: Config;
        constructor(data: any);
        private _analysePathValue(data_arr);
        private _analyseEncoding(encode);
        refresh(): void;
        readonly chartTypes: ChartType[];
        private __analyseGeoData(geodata);
        readonly encoding: Encoding;
        readonly scalePairs: {
            filed: Field;
            scale: Scale;
        }[];
    }
}
declare namespace android.test.map {
    class FlightParser {
        private __data;
        readonly data: any[];
        private __airportsFields;
        private __airlinesFields;
        private __airports;
        private __airlines;
        private __routes;
        constructor(originaldata: any);
        private _analyse();
    }
}
declare namespace android.test.map {
    import Canvas = android.graphics.Canvas;
    import Context = android.app.Context;
    import MotionEvent = android.view.event.MotionEvent;
    class GeoPlot extends BasePlot {
        private _layouts;
        private __shapeList;
        private _dataModel;
        private _style;
        constructor(context: Context);
        datamodel: DataModel | relation.DataModel;
        private _startPt;
        private _ofx;
        private _ofy;
        onMouseEvent(event: MotionEvent): boolean;
        onInterceptMouseEvent(event: MotionEvent): boolean;
        beginLoadingAnimation(): void;
        onLayout(l: number, t: number, r: number, b: number, canvas: Canvas): void;
        onDraw(canvas: Canvas): void;
    }
}
declare namespace android.test.map {
    import Size = android.graphics.Size;
    import Canvas = android.graphics.Canvas;
    import View = android.view.View;
    import MeasureSpec = android.view.MeasureSpec;
    import RenderType = android.graphics.RenderType;
    import Context = android.app.Context;
    import RootView = android.widget.RootView;
    class ChartLayout extends RootView {
        private _chart;
        private _dataModel;
        constructor(context: Context);
        attachElement(element: HTMLElement, renderType: RenderType, datamodel?: DataModel): void;
        beginLoadingAnimation(): void;
        setChart(): void;
        dispatchDraw(canvas: Canvas): void;
        onMeasure(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size;
        onLayout(l: number, t: number, r: number, b: number, canvas: Canvas): void;
        addView(view: View, index: number): number;
    }
}
declare namespace android.test {
    import StrokeStyle = android.graphics.StrokeStyle;
    import FillStyle = android.graphics.FillStyle;
    import Font = android.graphics.Font;
    import Point = android.graphics.Point;
    class Config {
        symbolStyle: FillStyle;
        lineSeriesStyle: StrokeStyle;
        areaSeriesStyle: FillStyle;
        axisTitleFont: Font;
        axisLabelFont: Font;
        legendTitleFont: Font;
        legendLabelFont: Font;
        center: Point;
        scale: number;
        translate: Point;
        constructor(config: any);
    }
}
declare namespace android.test {
    class EventHandler {
    }
}
declare namespace android.test.cartesian {
    class AggregateCache {
        private __domains;
        private __agg;
        constructor(agg: Agg);
        put(key: any, value: any): void;
        get(key: any): any;
    }
}
declare namespace android.test {
    import View = android.view.View;
    import Canvas = android.graphics.Canvas;
    import Style = android.graphics.Style;
    import StrokeStyle = android.graphics.StrokeStyle;
    import Animation = android.view.animation.Animation;
    import Context = android.app.Context;
    class FlightShape extends PlotShape {
        private __xs;
        private __ys;
        readonly xs: number[];
        readonly ys: number[];
        private __renderXs;
        private __renderYs;
        renderXs: number[];
        renderYs: number[];
        static LinesPrority: number;
        constructor(c: Context, xs: number[], ys: number[], style?: Style, strokeStyle?: StrokeStyle);
        strokeStyle: StrokeStyle;
        onDrawShape(canvas: Canvas): void;
    }
    class FlightAnimationTo extends Animation {
        constructor();
        applyTransformation(interpolatedTime: number, canvas: Canvas, view: View): void;
        onStartAniamtion(canvas: Canvas, view: View): void;
        onEndAnimation(canvas: Canvas, view: View): void;
    }
    class FlightAnimationBack extends Animation {
        constructor();
        applyTransformation(interpolatedTime: number, canvas: Canvas, view: View): void;
        onStartAniamtion(canvas: Canvas, view: View): void;
        onEndAnimation(canvas: Canvas, view: View): void;
    }
}
declare namespace android.test {
    import Canvas = android.graphics.Canvas;
    import Style = android.graphics.Style;
    import StrokeStyle = android.graphics.StrokeStyle;
    import MotionEvent = android.view.event.MotionEvent;
    import Point = android.graphics.Point;
    import Context = android.app.Context;
    class MapItemShape extends PlotShape {
        private __xs;
        private __ys;
        private __center;
        private __area;
        center: Point;
        readonly area: number;
        constructor(c: Context, xs: number[], ys: number[], style?: Style, strokeStyle?: StrokeStyle);
        strokeStyle: StrokeStyle;
        onDrawShape(canvas: Canvas): void;
        onMouseEvent(event: MotionEvent): boolean;
    }
}
declare namespace android.test {
    import TextView = android.widget.TextView;
    import Canvas = android.graphics.Canvas;
    class ToolTips extends TextView {
        onDraw(canvas: Canvas): void;
    }
}
declare namespace android.test.map {
    import Rect = android.graphics.Rect;
    import Canvas = android.graphics.Canvas;
    import Context = android.app.Context;
    class GeoLayout extends BaseLayout {
        private __namescale;
        constructor(c: Context);
        convert(featurelist: Feature[], rect: Rect, canvas: Canvas): PlotShape[];
        readonly nameScale: MapOrdinalScale;
    }
}
declare namespace android.test.map {
    import Rect = android.graphics.Rect;
    import Canvas = android.graphics.Canvas;
    import Series = android.test.cartesian.Series;
    import Encoding = android.test.cartesian.Encoding;
    class MapBaseLayout extends BaseLayout {
        protected _serieslist: Series[];
        protected _rect: Rect;
        protected _encoding: Encoding;
        protected _nameScale: MapOrdinalScale;
        protected _projection: Projection;
        convert(serieslist: Series[], projection: Projection, nameScale: MapOrdinalScale, encoding: Encoding, rect: Rect, canvas: Canvas): PlotShape[];
        protected _layoutSeries(ser: Series, nameScale: MapOrdinalScale, canvas: Canvas): void;
    }
}
declare namespace android.test.map {
    class MapOrdinalScale extends OrdinalScale {
        getScaleValue(v: any): any;
        readonly ranges: any[];
    }
}
declare namespace android.test.map {
    import Canvas = android.graphics.Canvas;
    import Series = android.test.cartesian.Series;
    class MapScatterLayout extends MapBaseLayout {
        protected _layoutSeries(series: Series, nameScale: MapOrdinalScale, canvas: Canvas): void;
    }
}
declare namespace android.test.map.relation {
    import Rect = android.graphics.Rect;
    import Canvas = android.graphics.Canvas;
    import Context = android.app.Context;
    class MapRelationLayout extends BaseLayout {
        constructor(c: Context);
        convert(items: Item[], rect: Rect, canvas: Canvas): PlotShape[];
    }
}
