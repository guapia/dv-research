/// <reference path="../view/implemention/ViewGroup.ts" />



namespace android.widget {
    import Padding = android.graphics.Padding;
    import Gravity = android.graphics.Gravity;
    import Rect = android.graphics.Rect;
    import AlignElement = android.graphics.AlignElement;
    import Margin = android.graphics.Margin;
    import Size = android.graphics.Size;
    import Canvas = android.graphics.Canvas;
    import ViewGroup = android.view.ViewGroup;
    import View = android.view.View;
    import Point = android.graphics.Point;
    import MeasureSpec = android.view.MeasureSpec;
    import Orientation = android.graphics.Orientation;
    import LayoutParams = android.view.LayoutParams;
    import LayoutInfo = android.view.LayoutInfo;
    import Context = android.app.Context;
    import MotionEvent = android.view.event.MotionEvent;



    export class ScrollLayout extends FrameLayout {

        private _realLayoutInfo: LayoutInfo;

        constructor(context: Context) {
            super(context);
        }

        onMeasure(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size {
            Debug.assert(this.children.length === 1, "There is only one view that can be added to the scroll layout ");
            return super.onMeasure(width, height, canvas);
        }

        onLayout(l: number, t: number, r: number, b: number, canvas: Canvas): void {
            super.onLayout(l, t, r, b, canvas);
        }

        private lastPt: Point;
        public onInterceptMouseEvent(event: MotionEvent): boolean {
            // console.log("===================================  onInterceptMouseEvent " + event.toString());
            // // return super.onInterceptMouseEvent(event);
            // let result: boolean = false;
            // switch (event.action) {
            //     case MotionEvent.ACTION_MOUSE_ON:
            //         result = true;
            //         this.lastPt = new Point(event.x, event.y);
            //     case MotionEvent.ACTION_MOUSE_MOVE:
            //         if (Math.abs(event.y - this.lastPt.y) > Math.abs(event.x - this.lastPt.x)) {
            //             result = true;
            //         } else {
            //             result = false;
            //         }
            //         this.lastPt = new Point(event.x, event.y);
            //         break;

            // }
            // console.log("Intercept Result  " + result);
            // return result;
            return true;
        }
        private startPt: Point;
        public onMouseEvent(event: MotionEvent): boolean {
            console.log("onMouseEvent " + event.toString());
            let currentPt: Point = new Point(event.x, event.y);
            switch (event.action) {
                case MotionEvent.ACTION_MOUSE_WHEEL:
                    if (this.startPt != null) {
                        if (this.children[0].height > this.width) {
                            if (event.deltaY != null && event.deltaY != 0) {
                                // let offset=(currentPt.y-this.startPt.y);
                                let offset = -event.deltaY;

                                if(offset > 0  && this.children[0].top >=this.top){return;}
                                if(offset < 0  && this.children[0].bottom <= this.bottom){return;}

                                this.children[0].offset(0,offset);
                                // this.invalidate(true);
                                this.requestLayout();
                                // this.invalidate(true);
                                console.log('top' + this.children[0].top +" , bottom  " + this.children[0].bottom);
                            }
                        }
                    }
                    this.startPt = currentPt.clone();
                    break;
                    case MotionEvent.ACTION_MOUSE_OUT:
                        this.startPt = null;
                    break;
            }
            return true;
        }

    }
}