/// <reference path="../../graphics/Util.ts" />
/// <reference path="../interface/IViewGroup.ts" />
/// <reference path="View.ts" />

namespace android.view {

    import Padding = android.graphics.Padding;
    import Align = android.graphics.Align;
    import AlignElement = android.graphics.AlignElement;
    import Size = android.graphics.Size;
    import Canvas = android.graphics.Canvas;
    import MotionEvent = android.view.event.MotionEvent;
    import Log = android.util.Log;
    import Rect = android.graphics.Rect;
    import Util = android.graphics.Util;
    import AnimationState = android.view.animation.AnimationState;
    export class ViewGroup extends View implements IViewGroup {

        protected children: Array<View> = new Array<View>();

        private _mCurrentTouchTarget: any = null;

        private _isIntercept: boolean = false;

        private lastInterceptEvent: MotionEvent[] = [];

        public dispatchDraw(canvas: Canvas): void {

            var item: View;
            for (var i = 0; i < this.children.length; ++i) {
                item = this.children[i];
                item.setDrawingTime(this.getDrawingTime());
                if (item.visiable != ViewState.Visiable) { continue; }
                if (item.clip === undefined) {
                    item.clip = this.clip;
                }
                if (item.clip === true || item.clip === undefined) {
                    canvas.save();
                    canvas.clip(item.layoutInfo.outterrect);
                    this.drawChild(canvas, item);
                    canvas.restore();
                } else {
                    this.drawChild(canvas, item);
                }
            }
        }

        drawChild(canvas: Canvas, view: View) {
            // if (Util.isMixed(view.layoutInfo.innerrect, this.layoutInfo.innerrect)) {
                if (view.animation != null && !view.animation.isAniamtionEnd) {
                    canvas.save();
                    if (view.animation.state === AnimationState.BeforeStart) {
                        view._layoutInfo = view._oldLayoutInfo.clone();
                        view.animation.onStartAniamtion(canvas, view);
                        view.animation.state = AnimationState.Animating;
                    }
                    view.animation.applyTransformation(view.animation.scale(this.getDrawingTime()), canvas, view);
                    if(view.alpha != null){
                        canvas.alpha = view.alpha;
                    }
                    view.onDraw(canvas);
                    if (view instanceof ViewGroup) {
                        view.dispatchDraw(canvas);
                    }
                    canvas.restore();
                } else {// normal drawing;
                    if (view.animation != null && view.animation.isAniamtionEnd && view.animation.state != AnimationState.End) {
                        view.animation.state = AnimationState.End;
                        view.animation.onEndAnimation(canvas, view);
                        if (!view.animation.fillAfter) {
                            view._layoutInfo = view._oldLayoutInfo.clone();
                        }
                        view.animation.__onInneranimationEnd(canvas,view);
                    }
                    if(view.alpha != null){
                        canvas.alpha = view.alpha;
                    }
                    view.onDraw(canvas);
                    if (view instanceof ViewGroup) {
                        view.dispatchDraw(canvas);
                    }
                }
            // }
        }
        public cleanAnimation(){
            super.cleanAnimation();
            for(let view of this.children){
                view.cleanAnimation();
            }
        }

        oninvalidate() {
            for (var i = 0; i < this.children.length; ++i) {
                this.children[i].oninvalidate();
            }
        }

        public invalidateChild(child: View, dirty: Rect): void {
            if (Util.containsRect(this.layoutInfo.outterrect, dirty)) {
                let newdirty = Util.union(dirty, this.layoutInfo.outterrect)
                this.parent.invalidateChild(this, newdirty);
                this.oninvalidate();
            } else {
                this.dispatchDraw(this._canvas);
            }
        }

        public getChildCount() {
            return this.children.length;
        }

        public getChildAt(index: number) {
            return this.children[index];
        }

        private getSortViews() {
            return this.children;
        }

        onLayout(l: number, t: number, r: number, b: number, canvas: Canvas): void {
            super.onLayout(l, t, r, b, canvas);
        }

        onMeasure(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size {
            var maxSize: Size;
            // return super.onMeasure(width,height,canvas);
            for (var i = 0; i < this.children.length; ++i) {
                var item: View = this.children[i];
                var lp: LayoutParams = item.layoutParams;
                var w: number = lp.width;
                var h: number = lp.height;
                //TO DO...
                if (lp.heightMode === LayoutParams.MATCH_PARENT) {
                    h = height.value - item.layoutParams.margin.marginTop - item.layoutParams.margin.marginBottom - this.padding.topPadding - this.padding.bottomPadding;
                }
                if (lp.widthMode === LayoutParams.MATCH_PARENT) {
                    w = width.value - item.layoutParams.margin.marginLeft - item.layoutParams.margin.marginRight - this.padding.leftPadding - this.padding.rightPadding;
                }

                var size = item.onMeasure(new MeasureSpec(w, lp.widthMode), new MeasureSpec(h, lp.heightMode), canvas);
                if (item.visiable === ViewState.Gone) {
                    size = new Size(0, 0);
                }
                if (maxSize) {
                    if (maxSize.width < size.width) {
                        maxSize.width = size.width;
                    }
                    if (maxSize.height < size.height) {
                        maxSize.height = size.height;
                    }
                } else {
                    maxSize = size;
                }
            }
            if (!maxSize) {
                maxSize = new Size(0, 0);
            }
            if (this.layoutParams.widthMode === LayoutParams.EXACTLY) {
                maxSize.width = this.layoutParams.width;
            } else if (this.layoutParams.widthMode === LayoutParams.MATCH_PARENT) {
                maxSize.width = width.getMeasureValue();
            }
            if (this.layoutParams.heightMode === LayoutParams.EXACTLY) {
                maxSize.height = this.layoutParams.height;
            } else if (this.layoutParams.heightMode === LayoutParams.MATCH_PARENT) {
                maxSize.height = height.getMeasureValue();
            }
            this.setMeasuredDimension(new MeasureSpec(maxSize.width, LayoutParams.EXACTLY), new MeasureSpec(maxSize.height, LayoutParams.EXACTLY));
            return maxSize;
        }

        public addView(view: View, index: number = 0, layoutParams: LayoutParams = null): number {
            this.addViewWithOutReLayout(view, index, layoutParams);
            this.requestLayout();
            return index;
        }
        public notifyDrawOrderChanged() {
            this.children.sort((a: View, b: View) => {
                return a.priority - b.priority;
            });
        }
        public addViewWithOutReLayout(view: View, index: number = 0, layoutParams: LayoutParams = null): number {
            this.children.push(view);
            // this.children.sort((a: View, b: View) => {
            //     return a.priority - b.priority;
            // });
            this.notifyDrawOrderChanged();
            if (index !== undefined && index !== null && index >= 0) {
                view.layoutInfo.drawindex = index;
            } else {
                view.layoutInfo.drawindex = this.children.length - 1;
            }
            if (layoutParams != null) {
                view.layoutParams = layoutParams;
            }
            view.setParent(this);
            return index;
        }

        public removeAllViews() {
            this.children.length = 0;
        }

        public removeView(view: View) {
            let index: number = this.children.indexOf(view);
            this.children.splice(index, 1);
            view.setParent(null);
        }
        public onInterceptTouchEvent(event: MotionEvent): boolean {
            return false;
        }

        public dispatchTouchEvent(event: MotionEvent): boolean {

            if (!this._mCurrentTouchTarget || this._mCurrentTouchTarget instanceof ViewGroup) {
                let result: boolean = false;

                switch (event.action) {
                    case MotionEvent.ACTION_DOWN:
                        if (!this._mCurrentTouchTarget) {
                            for (let i = 0; this.children && i < this.children.length; ++i) {
                                let child: View = this.children[i];
                                if (child) {
                                    if (child.layoutInfo.outterrect.contains(event.x, event.y)) {
                                        this._mCurrentTouchTarget = child;
                                    }
                                }
                            }
                        }
                        if (!this._mCurrentTouchTarget) {
                            return true;
                        }
                        if (!(this._mCurrentTouchTarget instanceof ViewGroup)) {
                            result = true;
                        } else {
                            result = this._mCurrentTouchTarget.onInterceptTouchEvent(event);
                        }
                        if (result) {
                            this._mCurrentTouchTarget.onTouchEvent(event);
                            this._isIntercept = result;
                            return true;
                        } else {
                            this.lastInterceptEvent.push(event.clone());//记录down时候的event
                            return false;
                        }

                    case MotionEvent.ACTION_MOVE:
                        if (this._mCurrentTouchTarget) {
                            if (this._isIntercept) {
                                this._mCurrentTouchTarget.onTouchEvent(event);
                                return true;
                            }

                            if (!(this._mCurrentTouchTarget instanceof ViewGroup)) {
                                result = true;
                            } else {
                                result = this._mCurrentTouchTarget.onInterceptTouchEvent(event);
                            }
                            if (result) {
                                this._isIntercept = result;
                                this.lastInterceptEvent.forEach(e => {
                                    this._mCurrentTouchTarget.onTouchEvent(e);
                                });
                                this.lastInterceptEvent.length = 0;
                                this._mCurrentTouchTarget.onTouchEvent(event);
                                return true;
                            } else {
                                this.lastInterceptEvent.forEach(e => {
                                    if (this._mCurrentTouchTarget instanceof ViewGroup) {
                                        this._mCurrentTouchTarget.dispatchTouchEvent(e);
                                    }
                                });
                                this.lastInterceptEvent.length = 0;
                                if (this._mCurrentTouchTarget instanceof ViewGroup) {
                                    return this._mCurrentTouchTarget.dispatchTouchEvent(event);
                                } else {
                                    return false;
                                }
                            }
                        }



                    case MotionEvent.ACTION_UP:
                    case MotionEvent.ACTION_CANCEL:
                        if (this._mCurrentTouchTarget) {
                            this.lastInterceptEvent.forEach(e => {
                                if (this._isIntercept) {
                                    this._mCurrentTouchTarget.onTouchEvent(e);
                                } else {
                                    this._mCurrentTouchTarget.dispatchTouchEvent(e);
                                }
                            });
                            if (this._isIntercept) {
                                this._mCurrentTouchTarget.onTouchEvent(event);
                                result = true;
                            } else {
                                result = this._mCurrentTouchTarget.dispatchTouchEvent(event);
                            }


                            this._mCurrentTouchTarget = null;
                            this.lastInterceptEvent.length = 0;
                            this._isIntercept = false;
                            return result;
                        }
                }
            }
            return false;
        }


        public onInterceptMouseEvent(event: MotionEvent): boolean {
            return false;
        }
        public onMouseEvent(event: MotionEvent): boolean {
            return false;
        }
        public dispatchMouseEvent(event: MotionEvent): boolean {
            if (event.action === MotionEvent.ACTION_MOUSE_OUT || event.action === MotionEvent.ACTION_MOUSE_UP) {
                if (this._mCurrentTouchTarget != null) {
                    let out_event: MotionEvent = event.clone();
                    out_event.action = MotionEvent.ACTION_MOUSE_OUT;
                    if (this._mCurrentTouchTarget instanceof ViewGroup) {
                        if (this._mCurrentTouchTarget.onInterceptMouseEvent(out_event)) {
                            this._mCurrentTouchTarget.onMouseEvent(out_event);
                        } else {
                            this._mCurrentTouchTarget.dispatchMouseEvent(out_event);
                        }
                    } else {
                        this._mCurrentTouchTarget.onMouseEvent(out_event);
                    }
                    this._isIntercept = false;
                }
                this._mCurrentTouchTarget = null;
            }
            if (this._mCurrentTouchTarget == null) {
                this._isIntercept = false;
                for (let i = 0; this.children && i < this.children.length; ++i) {
                    let child: View = this.children[i];
                    if (child) {
                        if (child.trace(event.x, event.y)) {
                            this._mCurrentTouchTarget = child;
                        }
                    }
                }
                if (this._mCurrentTouchTarget != null) {
                    let on_event: MotionEvent = event.clone();
                    on_event.action = MotionEvent.ACTION_MOUSE_ON;
                    if (!(this._mCurrentTouchTarget instanceof ViewGroup)) {
                        return this._mCurrentTouchTarget.onMouseEvent(on_event);
                    }

                    if (this._mCurrentTouchTarget.onInterceptMouseEvent(on_event)) {
                        return this._mCurrentTouchTarget.onMouseEvent(on_event);
                    } else {
                        return this._mCurrentTouchTarget.dispatchMouseEvent(on_event);
                    }

                }
            } else {
                if (!this._mCurrentTouchTarget.trace(event.x, event.y)) {
                    let out_event: MotionEvent = event.clone();
                    out_event.action = MotionEvent.ACTION_MOUSE_OUT;
                    let flg: boolean = false;// this._mCurrentTouchTarget.onMouseEvent(out_event);
                    if (this._mCurrentTouchTarget instanceof ViewGroup) {
                        if (this._mCurrentTouchTarget.onInterceptMouseEvent(out_event)) {
                            flg = this._mCurrentTouchTarget.onMouseEvent(out_event);
                        } else {
                            flg = this._mCurrentTouchTarget.dispatchMouseEvent(out_event);
                        }
                    } else {
                        flg = this._mCurrentTouchTarget.onMouseEvent(out_event);
                    }
                    this._mCurrentTouchTarget = null;
                    return flg;

                }
            }
            if (this._mCurrentTouchTarget == null) {
                return this.onMouseEvent(event);
            }
            if (!(this._mCurrentTouchTarget instanceof ViewGroup)) {
                return this._mCurrentTouchTarget.onMouseEvent(event);
            }
            if (this._mCurrentTouchTarget.onInterceptMouseEvent(event)) {

                return this._mCurrentTouchTarget.onMouseEvent(event);
            } else {
                return this._mCurrentTouchTarget.dispatchMouseEvent(event);
            }

        }



        // public dispatchMouseEvent(event: MotionEvent): boolean {

        //     if (!this._mCurrentTouchTarget || this._mCurrentTouchTarget instanceof ViewGroup) {
        //         let result: boolean = false;

        //         switch (event.action) {
        //             case MotionEvent.ACTION_MOUSE_DOWN:
        //                 if (!this._mCurrentTouchTarget) {
        //                     for (let i = 0; this.children && i < this.children.length; ++i) {
        //                         let child: View = this.children[i];
        //                         if (child) {
        //                             if (child.layoutInfo.outterrect.contains(event.x, event.y)) {
        //                                 this._mCurrentTouchTarget = child;
        //                             }
        //                         }
        //                     }
        //                 }
        //                 if (!this._mCurrentTouchTarget) {
        //                     return true;
        //                 }
        //                 if (!(this._mCurrentTouchTarget instanceof ViewGroup)) {
        //                     result = true;
        //                 } else {
        //                     result = this._mCurrentTouchTarget.onInterceptMouseEvent(event);
        //                 }
        //                 if (result) {
        //                     this._mCurrentTouchTarget.onMouseEvent(event);
        //                     this._isIntercept = result;
        //                     return true;
        //                 } else {
        //                     this.lastInterceptEvent.push(event.clone());//记录down时候的event
        //                     return false;
        //                 }

        //             case MotionEvent.ACTION_MOUSE_MOVE:
        //                 if (this._mCurrentTouchTarget) {
        //                     if (this._isIntercept) {
        //                         this._mCurrentTouchTarget.onMouseEvent(event);
        //                         return true;
        //                     }

        //                     if (!(this._mCurrentTouchTarget instanceof ViewGroup)) {
        //                         result = true;
        //                     } else {
        //                         result = this._mCurrentTouchTarget.onInterceptMouseEvent(event);
        //                     }
        //                     if (result) {
        //                         this._isIntercept = result;
        //                         this.lastInterceptEvent.forEach(e => {
        //                             this._mCurrentTouchTarget.onMouseEvent(e);
        //                         });
        //                         this.lastInterceptEvent.length = 0;
        //                         this._mCurrentTouchTarget.onMouseEvent(event);
        //                         return true;
        //                     } else {
        //                         this.lastInterceptEvent.forEach(e => {
        //                             if (this._mCurrentTouchTarget instanceof ViewGroup) {
        //                                 this._mCurrentTouchTarget.dispatchMouseEvent(e);
        //                             }
        //                         });
        //                         this.lastInterceptEvent.length = 0;
        //                         if (this._mCurrentTouchTarget instanceof ViewGroup) {
        //                             return this._mCurrentTouchTarget.dispatchMouseEvent(event);
        //                         } else {
        //                             return false;
        //                         }
        //                     }
        //                 }



        //             case MotionEvent.ACTION_MOUSE_OUT:
        //             case MotionEvent.ACTION_MOUSE_UP:
        //                 if (this._mCurrentTouchTarget) {
        //                     this.lastInterceptEvent.forEach(e => {
        //                         if (this._isIntercept) {
        //                             this._mCurrentTouchTarget.onMouseEvent(e);
        //                         } else {
        //                             this._mCurrentTouchTarget.dispatchMouseEvent(e);
        //                         }
        //                     });
        //                     if (this._isIntercept) {
        //                         this._mCurrentTouchTarget.onMouseEvent(event);
        //                         result = true;
        //                     } else {
        //                         result = this._mCurrentTouchTarget.dispatchMouseEvent(event);
        //                     }


        //                     this._mCurrentTouchTarget = null;
        //                     this.lastInterceptEvent.length = 0;
        //                     this._isIntercept = false;
        //                     return result;
        //                 }
        //         }
        //     }
        //     return false;
        // }
    }
}