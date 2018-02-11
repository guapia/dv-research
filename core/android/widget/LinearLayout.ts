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

    export class LinearLayout extends ViewGroup {
        private _orientation: Orientation = Orientation.Horizontal;
        public setOrientation(orientation: Orientation) {
            this._orientation = orientation;
        }

        public getOrientation(): Orientation {
            return this._orientation;
        }


        onMeasure(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size {
            if (this._orientation === Orientation.Horizontal) {
                return this.measureHorizontal(width, height, canvas);
            } else {
                return this.measureVertical(width, height, canvas);
            }
        }

        measureHorizontal(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size {
            var size: Size;
            for (var i = 0; i < this.children.length; ++i) {
                var item: View = this.children[i];
                var lp: LayoutParams = item.layoutParams;
                var w: number = lp.width;
                var h: number = lp.height;
                if (lp.heightMode === LayoutParams.MATCH_PARENT) {
                    h = height.value;
                }
                if (lp.widthMode === LayoutParams.MATCH_PARENT) {
                    w = width.value;
                }
                var s = item.onMeasure(new MeasureSpec(w, lp.widthMode), new MeasureSpec(h, lp.heightMode), canvas);
                if (size) {
                    size.width += s.width;
                    if (size.height < s.height) {
                        size.height = s.height;
                    }
                } else {
                    size = s.clone();
                }
            }
            // if (size.width > width.value) {
            //     size.width = width.value;
            // }
            // if (size.height > height.value) {
            //     size.height = height.value;
            // }
            if (this.layoutParams.widthMode === LayoutParams.EXACTLY) {
                size.width = this.layoutParams.width;
            } else if (this.layoutParams.widthMode === LayoutParams.MATCH_PARENT) {
                size.width = width.getMeasureValue();
            }
            if (this.layoutParams.heightMode === LayoutParams.EXACTLY) {
                size.height = this.layoutParams.height;
            } else if (this.layoutParams.heightMode === LayoutParams.MATCH_PARENT) {
                size.height = height.getMeasureValue();
            }
            this.setMeasuredDimension(new MeasureSpec(size.width, LayoutParams.EXACTLY), new MeasureSpec(size.height, LayoutParams.EXACTLY));
            return size;
        }

        measureVertical(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size {
            var size: Size;
            for (var i = 0; i < this.children.length; ++i) {
                var item: View = this.children[i];
                var lp: LayoutParams = item.layoutParams;
                var w: number = lp.width;
                var h: number = lp.height;
                if (lp.heightMode === LayoutParams.MATCH_PARENT) {
                    h = height.value;
                }
                if (lp.widthMode === LayoutParams.MATCH_PARENT) {
                    w = width.value;
                }
                var s = item.onMeasure(new MeasureSpec(w, lp.widthMode), new MeasureSpec(h, lp.heightMode), canvas);
                if (size) {
                    size.height += s.height;
                    if (size.width < s.width) {
                        size.width = s.width;
                    }
                } else {
                    size = s.clone();
                }
            }
            // if (size.width > width.value) {
            //     size.width = width.value;
            // }
            // if (size.height > height.value) {
            //     size.height = height.value;
            // }
            if (this.layoutParams.widthMode === LayoutParams.EXACTLY) {
                size.width = this.layoutParams.width;
            } else if (this.layoutParams.widthMode === LayoutParams.MATCH_PARENT) {
                size.width = width.getMeasureValue();
            }
            if (this.layoutParams.heightMode === LayoutParams.EXACTLY) {
                size.height = this.layoutParams.height;
            } else if (this.layoutParams.heightMode === LayoutParams.MATCH_PARENT) {
                size.height = height.getMeasureValue();
            }
            this.setMeasuredDimension(new MeasureSpec(size.width, LayoutParams.EXACTLY), new MeasureSpec(size.height, LayoutParams.EXACTLY));
            return size;
        }
        onLayout(l: number, t: number, r: number, b: number, canvas: Canvas): void {
            // this.layoutInfo.reset(l, t, r, b, this.padding, 0);
            super.onLayout(l,t,r,b,canvas);
            var innerrect: Rect = this.layoutInfo.innerrect;
            if (this._orientation === Orientation.Horizontal) {
                this.layoutHorizontal(innerrect.left, innerrect.top, innerrect.right, innerrect.bottom,canvas);
            } else {
                this.layoutVertical(innerrect.left, innerrect.top, innerrect.right, innerrect.bottom,canvas);
            }
        }

        layoutHorizontal(l: number, t: number, r: number, b: number, canvas: Canvas): void {
            let viewItem: View;
            let m: Margin;
            let startpoint: Point = new Point(l, t);
            let length: number = this.children.length;
            let childWidth: number = 0;

            for (var i = 0; i < length; ++i) {
                viewItem = this.children[i];
                m = viewItem.layoutParams.margin;
                childWidth += viewItem.width + (m.marginLeft + m.marginRight);
            }
            viewItem = null;
            m = null;
            var startOffset: number = 0;
            if (childWidth < (r - l)) {
                startOffset = ((r - l) - childWidth) / 2;
            }
            for (i = 0; i < length; ++i) {
                viewItem = this.children[i];
                m = viewItem.layoutParams.margin;
                switch (viewItem.gravity) {
                    case Gravity.Left:
                    case Gravity.Auto:

                        break;
                    case Gravity.Right:
                        break;
                    case Gravity.Top:
                        startpoint.y = t;
                        break;
                    case Gravity.Bottom:
                        startpoint.y = b - viewItem.height - m.marginBottom;
                        break;
                    case Gravity.Center:
                        startpoint.y = t + ((b - t - viewItem.height) > 0 ? b - t - viewItem.height : 0) / 2;
                        break;
                }
                startpoint.offset(m.marginLeft > 0 ? m.marginLeft : 0, m.marginTop > 0 ? m.marginTop : 0);
                viewItem.onLayout(startpoint.x, startpoint.y, startpoint.x + viewItem.width, startpoint.y + viewItem.height,canvas);
                startpoint.offset(viewItem.width + (m.marginRight > 0 ? m.marginRight : 0), 0);
            }

        }

        layoutVertical(l: number, t: number, r: number, b: number, canvas: Canvas): void {
            let viewItem: View;
            let m: Margin;
            let startpoint: Point = new Point(l, t);
            let length: number = this.children.length;
            let childHeight: number = 0;

            for (var i = 0; i < length; ++i) {
                viewItem = this.children[i];
                m = viewItem.layoutParams.margin;
                childHeight += viewItem.height + (m.marginTop + m.marginBottom);
            }
            viewItem = null;
            m = null;
            var startOffset: number = 0;
            if (childHeight < (b - t)) {
                startOffset = ((b - t) - childHeight) / 2;
            }
            for (i = 0; i < length; ++i) {
                viewItem = this.children[i];
                m = viewItem.layoutParams.margin;
                switch (viewItem.gravity) {
                    case Gravity.Left:
                    case Gravity.Auto:
                        startpoint.x = l;
                        break;
                    case Gravity.Right:
                        startpoint.x = r - viewItem.width - m.marginRight;
                        break;
                    case Gravity.Top:
                        // startpoint.y = t;
                        break;
                    case Gravity.Bottom:
                        // startpoint.y = b-viewItem.height-m.marginBottom;
                        break;
                    case Gravity.Center:
                        // startpoint.y = t+((b-t-viewItem.height)>0?b-t-viewItem.height:0)/2;
                        startpoint.x = l + ((r - l - viewItem.width) > 0 ? r - l - viewItem.width : 0) / 2;
                        break;
                }
                startpoint.offset(m.marginLeft > 0 ? m.marginLeft : 0, m.marginTop > 0 ? m.marginTop : 0);
                viewItem.onLayout(startpoint.x, startpoint.y, startpoint.x + viewItem.width, startpoint.y + viewItem.height,canvas);
                // startpoint.translate(viewItem.width + (m.marginRight>0? m.marginRight:0),0);
                startpoint.offset(0, viewItem.height + (m.marginBottom > 0 ? m.marginBottom : 0));
            }
        }
    }
}