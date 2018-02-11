namespace android.widget {
    import Padding = android.graphics.Padding;
    import Align = android.graphics.Align;
    import Gravity = android.graphics.Gravity;


    import AlignElement = android.graphics.AlignElement;
    import Margin = android.graphics.Margin;

    import Size = android.graphics.Size;
    import Canvas = android.graphics.Canvas;
    import ViewGroup = android.view.ViewGroup;
    import View = android.view.View;

    import Point = android.graphics.Point;
    import MeasureSpec = android.view.MeasureSpec;
    import Font = android.graphics.Font;
    import LayoutInfo = android.view.LayoutInfo;
    import LayoutParams = android.view.LayoutParams;

    export enum ScaleType {
        MATRIX,
        FIT_XY,
        FIT_START,
        FIT_CENTER,
        FIT_END,
        CENTER,
        CENTER_CROP,
        CENTER_INSIDE
    }







    export class ImageView extends View {




        private bitmap: ImageData;

        onMeasure(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size {
            
            this.setMeasuredDimension(new MeasureSpec(),new MeasureSpec());
            return null;
        }
        onDraw(canvas:Canvas):void{
        }
    }
}