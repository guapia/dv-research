namespace android.test {
    'use strict';
    import View = android.view.View;
    import Canvas = android.graphics.Canvas;
    import ViewState = android.view.ViewState;
    import Rect = android.graphics.Rect;
    import Style = android.graphics.Style;
    import StrokeStyle = android.graphics.StrokeStyle;
    import Font = android.graphics.Font;
    import Point = android.graphics.Point;
    import Context = android.app.Context;
    export class Label extends Shape {

        public text: string;
        public labelrect: RotateRect;
        public _font:Font;
        private __padding :number=0;
        private _xs: number[];
        private _ys: number[];
        constructor(c:Context,text: string, cx: number, cy: number, w: number, h: number, angle: number,padding:number) {
            super(c);
            this.priority = Shape.PRIORITY *10;
            this.__padding =padding;
            this.text = text;
            this.labelrect = new RotateRect(cx, cy, w+padding*2, h+padding*2, (angle == null || isNaN(angle)) ? 0 : angle);
            this._xs =[];
            this._ys= [];
            for (let i = 0; i < 4 && i < this.labelrect.points.length; ++i) {
                this._xs[i] = this.labelrect.points[i].x;
                this._ys[i] = this.labelrect.points[i].y;
            }
        }
        getpts(size: number): {xs: number[],ys: number[]}{
            return {xs:this._xs,ys:this._ys};
        }
        onDrawShape(canvas: Canvas): void {
            canvas.drawPolygon(this._xs,this._ys,this.background);
            let pt:Point =this.labelrect.leftTop.clone();
            pt.offset(this.__padding,this.__padding);
            canvas.drawText(this.text, pt, this._font);
        }

        refresh(): void {
            
        }
    }
}