
/// <reference path="../view/implemention/ViewGroup.ts" />
/// <reference path="../graphics/Util.ts" />

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
    export class FrameLayout extends ViewGroup {

        onMeasure(width: MeasureSpec, height: MeasureSpec, canvas: Canvas) {
            return super.onMeasure(width, height, canvas);
        }
        
        onLayout(l: number, t: number, r: number, b: number, canvas: Canvas): void {
            // this.layoutInfo.reset(l, t, r, b, this.padding, 0);
            super.onLayout(l,t,r,b,canvas);
            let viewItem: View;


            let length: number = this.children.length;
            for (var i = 0; i < length; ++i) {
                viewItem = this.children[i];
                this.layoutItem(viewItem,l,t,r,b,canvas);
            }
        }

          
        public layoutItem(viewItem:View,l: number, t: number, r: number, b: number, canvas: Canvas): void {

            let point: Point = new Point(this.layoutInfo.innerrect.left, this.layoutInfo.innerrect.top);
            let innerrect = this.layoutInfo.innerrect;
            let length: number = this.children.length;
            let m: Margin = viewItem.layoutParams.margin;
            switch (viewItem.gravity) {
                case Gravity.Left:
                    point.set(innerrect.left,innerrect.top);
                    point.offset(m.marginLeft,m.marginTop);
                    break;
                case Gravity.Auto:
                    point.set(innerrect.left,innerrect.top);
                    break;
                case Gravity.Right:
                    point.set(innerrect.right - viewItem.width, innerrect.top);
                    point.offset(-m.marginRight,m.marginTop);
                    break;
                case Gravity.Top:
                    point.set(innerrect.left,innerrect.top);
                    point.offset(m.marginLeft,m.marginTop);
                    break;
                case Gravity.Bottom:
                    point.set(innerrect.left, innerrect.bottom - viewItem.height);
                    point.offset(m.marginLeft,-m.marginBottom);
                    break;
                case Gravity.Center:
                    let tmpl = innerrect.left+(this.layoutInfo.innerrect.width-viewItem.width)/2;
                    let tmpt = innerrect.top  + (this.layoutInfo.innerrect.height-viewItem.height)/2;
                    if(tmpl < 0){
                        tmpl = 0;
                    }
                    if(tmpt < 0){
                        tmpt =0;
                    }
                    point.set(tmpl,tmpt);
                    break;
                }
                // point.offset(m.getStartXMargin(), m.getStartYMargin());
                // point.offset(m.marginLeft,m.marginRight)
                viewItem.onLayout(point.x, point.y, point.x + viewItem.width, point.y + viewItem.height,canvas);
            }
        
    }
}