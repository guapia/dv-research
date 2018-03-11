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
        private _wrap: boolean = false;
        public setOrientation(orientation: Orientation) {
            this._orientation = orientation;
        }

        public getOrientation(): Orientation {
            return this._orientation;
        }

        public set wrap(value: boolean) {
            this._wrap = value;
        }
        public get wrap(): boolean {
            return this._wrap;
        }


        onMeasure(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size {
            if (this.children.length == 0) {
                return super.onMeasure(width, height, canvas);
            }
            if (this._orientation === Orientation.Horizontal) {
                return this.measureHorizontal(width, height, canvas);
            } else {
                return this.measureVertical(width, height, canvas);
            }
        }
        private _wrapRowWidth: number[];
        private _wrapColHeight: number[];

        measureHorizontal(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size {
            let size: Size;
            let suggeset: Size = new Size(-1, -1);
            if (this._wrap) {
                this._wrapColHeight = [];
            }
            if (this.layoutParams.widthMode === LayoutParams.EXACTLY) {
                suggeset.width = this.layoutParams.width;
            } else if (this.layoutParams.widthMode === LayoutParams.MATCH_PARENT) {
                suggeset.width = width.getMeasureValue();
            }
            if (this.layoutParams.heightMode === LayoutParams.EXACTLY) {
                suggeset.height = this.layoutParams.height;
            } else if (this.layoutParams.heightMode === LayoutParams.MATCH_PARENT) {
                suggeset.height = height.getMeasureValue();
            }
            let currentColWidth:number=0;

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
                    // size.width += s.width;
                    currentColWidth += s.width;
                    if (this._wrap && this._wrapColHeight) {
                        if (suggeset.width > 0 && currentColWidth > suggeset.width) {
                            // size.width -= s.width;
                            currentColWidth -= s.width;
                            if(size.width < currentColWidth ){
                                size.width = currentColWidth;
                            }
                            currentColWidth =  s.width;
                            this._wrapColHeight.push(size.height);
                            size.height = 0;
                        }
                    }
                    if (size.height < s.height) {
                        size.height = s.height;
                    }
                } else {
                    size = s.clone();
                    if(this._wrap){
                        currentColWidth = s.width;
                    }
                }
            }
            if (this._wrap && this._wrapColHeight && this._wrapColHeight.length > 0) {
                size.height = this._wrapColHeight.reduce((p: number, c: number) => {
                    return p + c;
                });
            }
            if (suggeset.width >= 0) {
                size.width = suggeset.width;
            }
            if (suggeset.height >= 0) {
                size.height = suggeset.height;
            }

            this.setMeasuredDimension(new MeasureSpec(size.width, LayoutParams.EXACTLY), new MeasureSpec(size.height, LayoutParams.EXACTLY));
            return size;
        }

        measureVertical(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size {
            let size: Size;
            let suggeset: Size = new Size(-1, -1);


            if (this.layoutParams.widthMode === LayoutParams.EXACTLY) {
                suggeset.width = this.layoutParams.width;
            } else if (this.layoutParams.widthMode === LayoutParams.MATCH_PARENT) {
                suggeset.width = width.getMeasureValue();
            }
            if (this.layoutParams.heightMode === LayoutParams.EXACTLY) {
                suggeset.height = this.layoutParams.height;
            } else if (this.layoutParams.heightMode === LayoutParams.MATCH_PARENT) {
                suggeset.height = height.getMeasureValue();
            }
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
            if (suggeset.width >= 0) {
                size.width = suggeset.width;
            }
            if (suggeset.height >= 0) {
                size.height = suggeset.height;
            }

            this.setMeasuredDimension(new MeasureSpec(size.width, LayoutParams.EXACTLY), new MeasureSpec(size.height, LayoutParams.EXACTLY));
            return size;
        }
        onLayout(l: number, t: number, r: number, b: number, canvas: Canvas): void {
            // this.layoutInfo.reset(l, t, r, b, this.padding, 0);
            super.onLayout(l, t, r, b, canvas);
            var innerrect: Rect = this.layoutInfo.innerrect;
            if (this._orientation === Orientation.Horizontal) {
                this.layoutHorizontal(innerrect.left, innerrect.top, innerrect.right, innerrect.bottom, canvas);
            } else {
                this.layoutVertical(innerrect.left, innerrect.top, innerrect.right, innerrect.bottom, canvas);
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
            let startOffset: number = 0;
            let width = r - l;
            if (childWidth < width) {
                startOffset = (width - childWidth) / 2;
            }
            let currentColWidth: number = 0;
            let wrapTop:number = 0;
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
                if (this._wrap) {
                    currentColWidth += (viewItem.width + (m.marginRight > 0 ? m.marginRight : 0) + (m.marginLeft > 0 ? m.marginLeft : 0));
                    if (currentColWidth > this.width) {
                        startpoint.x = l;
                        wrapTop +=this._wrapColHeight.shift();
                        startpoint.y = t + wrapTop;
                        currentColWidth = (viewItem.width + (m.marginRight > 0 ? m.marginRight : 0) + (m.marginLeft > 0 ? m.marginLeft : 0));
                        startpoint.offset(m.marginLeft > 0 ? m.marginLeft : 0, m.marginTop > 0 ? m.marginTop : 0);
                        viewItem.onLayout(startpoint.x, startpoint.y, startpoint.x + viewItem.width, startpoint.y + viewItem.height, canvas);
                        startpoint.offset(viewItem.width + (m.marginRight > 0 ? m.marginRight : 0), 0);
                    } else {
                        startpoint.offset(m.marginLeft > 0 ? m.marginLeft : 0, m.marginTop > 0 ? m.marginTop : 0);
                        viewItem.onLayout(startpoint.x, startpoint.y, startpoint.x + viewItem.width, startpoint.y + viewItem.height, canvas);
                        startpoint.offset(viewItem.width + (m.marginRight > 0 ? m.marginRight : 0), 0);
                    }
                } else {
                    startpoint.offset(m.marginLeft > 0 ? m.marginLeft : 0, m.marginTop > 0 ? m.marginTop : 0);
                    viewItem.onLayout(startpoint.x, startpoint.y, startpoint.x + viewItem.width, startpoint.y + viewItem.height, canvas);
                    startpoint.offset(viewItem.width + (m.marginRight > 0 ? m.marginRight : 0), 0);
                }
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
                viewItem.onLayout(startpoint.x, startpoint.y, startpoint.x + viewItem.width, startpoint.y + viewItem.height, canvas);
                // startpoint.translate(viewItem.width + (m.marginRight>0? m.marginRight:0),0);
                startpoint.offset(0, viewItem.height + (m.marginBottom > 0 ? m.marginBottom : 0));
            }
        }
    }
}