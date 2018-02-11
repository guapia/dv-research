/// <reference path="../../graphics/util.ts" />

namespace android.view {
    import Padding = android.graphics.Padding;
    import Align = android.graphics.Align;
    import AlignElement = android.graphics.AlignElement;
    import Size = android.graphics.Size;
    import Canvas = android.graphics.Canvas;
    import Gravity = android.graphics.Gravity;
    import Style= android.graphics.Style;

    export interface IView {
        onMeasure(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size;
        onLayout(l: number, t: number, r: number, b: number,canvas:Canvas): void;
        onDraw(canvas: Canvas): void;
        invalidate(flg:boolean): void;
        readonly width: number;
        readonly height: number;
        readonly left: number;
        readonly top: number;
        readonly right: number;
        readonly bottom: number;
        gravity: Gravity;
        layoutParams: LayoutParams
        background: Style;
    }
}