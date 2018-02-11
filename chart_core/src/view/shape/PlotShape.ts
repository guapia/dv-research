/// <reference path="../../base.ts" />
namespace android.test {
    'use strict';

    import View = android.view.View;
    import Canvas = android.graphics.Canvas;
    import ViewState = android.view.ViewState;
    import Rect = android.graphics.Rect;
    import Style = android.graphics.Style;
    import StrokeStyle = android.graphics.StrokeStyle;
    import Default = android.device.Default;
    import LayoutParam = android.view.LayoutParams;
    import Gravity = android.graphics.Gravity;
    export abstract class PlotShape extends Shape {
        public datapoint:any;
        private _label: Label;
        set label(value:Label){
            if(value != null && value != this._label){
                this._label = value;
            }
        }
        get label():Label{
            return this._label;
        }
        // onDraw(canvas: Canvas): void {
        //     super.onDraw(canvas);
        //     if (this._label != null) {
        //         this._label.onDraw(canvas);
        //     }
        // }

        refresh(): void {
            // console.log(" *** you, this function is not been implemented yet!!! ");
                
        }

    }
}
