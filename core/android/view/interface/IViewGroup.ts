/// <reference path="../../graphics/util.ts" />
/// <reference path="IView.ts" />

namespace android.view {
    import Padding = android.graphics.Padding;
    import Align = android.graphics.Align;
    import AlignElement = android.graphics.AlignElement;
    import Size = android.graphics.Size;
    import Canvas = android.graphics.Canvas;
    import Rect = android.graphics.Rect;
    export interface IViewGroup extends IView {
        dispatchDraw(canvas: Canvas): void;
        addView(View: View, index: number): number;
        invalidateChild(child: View, dirty: Rect): void;

    }
}