
/// <reference path="../database/DataSetObservable.ts" />
/// <reference path="../adapter/ViewPagerAdapter.ts" />
/// <reference path="../util/ArrayList.ts" />
/// <reference path="../util/Handler.ts" />
/// <reference path="../device/Device.ts" />

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
    import ViewPageAdapter = android.adapter.ViewPageAdapter;
    import ArrayList = android.util.ArrayList;
    import DataSetObserver = android.database.DataSetObserver;
    import Handler = android.util.Handler;
    import Message = android.util.Message;
    import Log = android.util.Log;
    import Context = android.app.Context;
    import MotionEvent = android.view.event.MotionEvent;
    import Device = android.device.Device;
    let TAG: string = "ScaleViewPager";
    const ANIMATION_FRAME_DURATION: number = 1000 / 80;
    const MIN_SPEED: number = 10.0;
    const MIN_TOUCH: number = 12;

    const MOVE_LEFT: number = 10001;
    const MOVE_RIGHT: number = 10002;
    const MOVE_BACK: number = 10003;
    const SCALE_CONSTANT: number = 100;
    const STATE_MOVE_LEFT: number = 11001;
    const STATE_MOVE_RIGHT: number = 11002;
    export class ViewPager extends ViewGroup {

        private mPosition: number = 0;
        private mAdapter: ViewPageAdapter;
        private mOldAdapter: ViewPageAdapter;
        private mViewStack: ArrayList<ItemInfo> = new ArrayList<ItemInfo>();
        private mIndex: number = 0;
        private mSize: number = 0;
        private mAnimationState: number = 0;
        private mScale: number = 0;
        private mIsScaled: boolean = false;
        private mMin_speed: number = MIN_SPEED;
        private min_touch: number = MIN_TOUCH;
        private mLayoutParams: LayoutParams;
        private mLastAnimationTime: number = 0;
        private mCurrentAnimationTime: number = 0;
        private mSpeed: number = 130;
        private mCurrentView: View;
        private mNextView: View;
        private mPreView: View;
        private mAnimationEnd: boolean = true;
        private mCenterX: number = 0;
        private mCenterY: number = 0;
        private listener: PagerChangedListener;
        private mDataSetObserver: DataSetObserver;
        private mHandler: Handler;
        private mAreaTouchListener: AreaTouchListener;
        private direction = 1;
        private oldx;
        private oldy;
        private downX;

        constructor(context: Context) {
            super(context);
            this.init();
        }

        private init(): void {
            let context: Context = this.getContext();
            this.mMin_speed = MIN_SPEED *Device.density;
            this.mLayoutParams = new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT);
            this.min_touch = 3;
            this.mHandler = new Handler((msg: Message) => {
                switch (msg.what) {
                    case MOVE_LEFT:
                        this.doLeftOrBounceAnimation();
                        break;
                    case MOVE_RIGHT:
                        this.doRightOrBounceAnimation();
                        break;
                }
            });
        }

        public setAreaTouchListener(l: AreaTouchListener) {
            this.mAreaTouchListener = l;
        }

        public onInterceptTouchEvent(evnt: MotionEvent): boolean {

            let action = evnt.action;
            let x = evnt.x;
            let y = evnt.y;

            switch (action) {
                case MotionEvent.ACTION_DOWN:
                    this.oldx = x;
                    this.oldy = y;
                    this.downX = x;
                    if (this.mAreaTouchListener) {
                        return true;
                    } else {
                        return false;
                    }
                case MotionEvent.ACTION_MOVE:
                    if (y - this.oldy != 0) {
                        if (Math.abs(x - this.oldx) / Math.abs(y - this.oldy) > 2 && Math.abs(x - this.downX) > this.min_touch) {
                            return true;
                        } else {

                            return false;
                        }
                    } else {
                        return false;
                    }
            }
            return true;
        }

        public onTouchEvent(event: MotionEvent): boolean {
            if (!this.mAnimationEnd) {
                return true;
            }
            let action = event.action
            let x = event.x;
            let y = event.y;
            if (this.mCurrentView == null) return false;
            switch (action) {
                case MotionEvent.ACTION_MOVE: {
                    Log.d("event", "move ");
                    this.direction = x - this.oldx > 0 ? 1 : -1;
                    this.move(x - this.oldx);
                    this.oldx = x;
                    break;
                }
                case MotionEvent.ACTION_UP:
                case MotionEvent.ACTION_CANCEL:
                    {
                        this.oldx = -1;
                        this.oldy = -1;
                        if (Math.abs(this.downX - x) == 0) {
                            if (x >= this.width / 4 * 3) {
                                if (this.mAreaTouchListener != null) {
                                    this.mAreaTouchListener.onLeftTouch();
                                }
                            } else if (x <= this.width / 4) {
                                if (this.mAreaTouchListener != null) {
                                    this.mAreaTouchListener.onRightTouch();
                                }
                            } else {
                                if (this.mAreaTouchListener != null) {
                                    this.mAreaTouchListener.onMiddleTouch();
                                }
                            }
                        } else {
                            this.prepareToAnimation(this.direction * this.mMin_speed);
                        }
                        break;
                    }

            }
            return true;
        }

        onMeasure(widthMeasureSpec: MeasureSpec, heightMeasureSpec: MeasureSpec, canvas: Canvas): Size {
            let width: number = widthMeasureSpec.getMeasureValue();
            let height: number = heightMeasureSpec.getMeasureValue();
            this.mCenterX = width / 2;
            this.mCenterY = height / 2;
            for (let i = 0; i < this.mViewStack.size(); ++i) {
                let child: View = this.mViewStack.get(i).view;
                let lp: LayoutParams = child.layoutParams;
                let w = lp.width;
                let h = lp.height;
                if (lp.heightMode === LayoutParams.MATCH_PARENT) {
                    h = height;
                }
                if (lp.widthMode === LayoutParams.MATCH_PARENT) {
                    w = width;
                }
                child.onMeasure(new MeasureSpec(w, lp.widthMode), new MeasureSpec(h, lp.heightMode), canvas);
            }
            let size: Size = new Size(width, height);
            this.setMeasuredDimension(new MeasureSpec(size.width, LayoutParams.EXACTLY), new MeasureSpec(size.height, LayoutParams.EXACTLY));
            return size;
        }

        onLayout(l: number, t: number, r: number, b: number, canvas: Canvas): void {
            this.layoutInfo.reset(l, t, r, b, this.padding, 0);
            var innerrect: Rect = this.layoutInfo.innerrect;
            let width: number = r - l;
            let height: number = b - t;
            for (let i = 0; i < this.mViewStack.size(); ++i) {
                let view: View = this.mViewStack.get(i).view;
                let pos = this.mViewStack.get(i).index;
                let gap = pos - this.mIndex;
                let viewleft = view.padding.leftPadding + (width - view.width) / 2;
                let viewtop = view.padding.topPadding + (height - view.height) / 2;
                gap = gap > 0 ? 0 : gap;
                view.onLayout(viewleft + gap * width, viewtop, viewleft + gap * width + view.width, viewtop + view.height,canvas);
            }
        }

        public dispatchDraw(canvas: Canvas): void {
            // super.dispatchDraw(canvas);
            // Log.d('dispatchDraw ' + this.mPosition);
            if (this.mAnimationState === STATE_MOVE_LEFT) {
                this.drawChild(canvas, this.mNextView);
                canvas.save();
                canvas.translate(this.mPosition, 0);
                this.drawChild(canvas, this.mCurrentView);
                canvas.restore();
            }
            else if (this.mAnimationState === STATE_MOVE_RIGHT) {

                this.drawChild(canvas, this.mCurrentView);
                canvas.save();
                canvas.translate(this.mPosition, 0);
                this.drawChild(canvas, this.mPreView);
                canvas.restore();
            }
            else {
                this.drawChild(canvas, this.mCurrentView);
            }

        }

        public setAdapter(adapter: ViewPageAdapter) {
            this.mOldAdapter = this.mAdapter;
            this.mAdapter = adapter;
            if (this.mAdapter != null) {
                this.mDataSetObserver = new DataSetObserver();
                var self = this;
                this.mDataSetObserver.onChanged = function () {
                    self.mSize = self.mAdapter.getCount();
                }
                this.mDataSetObserver.onInvalidated = function () {
                    self.invalidate(false);
                }
                this.mAdapter.registerDataSetObserver(this.mDataSetObserver);
                this.mSize = adapter.getCount();
                this.refreshNormal();
            }
        }

        public setCurrentItem(index: number) {
            Log.d('setCurrentItem ' + index);
            this.mIndex = index;
            this.refreshNormal();
            this.pagerMovingEnd(this.mIndex);
        }

        public getCurrentItem() {
            return this.mIndex;
        }

        public setPagerChangedListener(listen: PagerChangedListener) {
            this.listener = listen;
        }

        private refreshNormal() {
            if (this.mAdapter) {
                if (this.mIndex >= 0 && this.mIndex < this.mAdapter.getCount()) {
                    this.preRemove();
                    this.preLoad(this.mIndex);
                    for (let i = 0; i < this.mViewStack.size(); ++i) {
                        let view: View = this.mViewStack.get(i).view;
                        let index: number = this.mViewStack.get(i).index;
                        if (index === this.mIndex) {
                            this.mCurrentView = view;
                            this.addView(view, 1, this.mLayoutParams);
                        }
                        if (index === this.mIndex - 1) {
                            this.mPreView = view;
                            this.addView(view, 0, this.mLayoutParams);
                        }
                        if (index === this.mIndex + 1) {
                            this.mNextView = view;
                            this.addView(view, 1, this.mLayoutParams);
                        }
                    }
                } else if (this.mAdapter.getCount() === 0 && this.mIndex === 0) {
                    return;
                } else {
                    throw 'current index is ' + this.mIndex + ' size is ' + this.mAdapter.getCount();
                }
            }
        }
        
        private preRemove() {
            for (let i = 0; i < this.mViewStack.size(); ++i) {
                let view: View = this.mViewStack.get(i).view;
                let position: number = this.mViewStack.get(i).index;
                this.removeView(view);
                this.mAdapter.destoryItem(position, this);
            }
        }
       
        private preLoad(position: number) {
            if (this.mAdapter !== null) {
                this.mViewStack.clear();
                this.mViewStack.add(this.preLoadPreView(position));
                this.mViewStack.add(this.loadView(position));
                this.mViewStack.add(this.preLoadNextView(position));
            }
        }
        
        private preLoadPreView(position: number) {
            let pos = position - 1;
            return this.loadView(pos);
        }
        
        private preLoadNextView(position: number) {
            let pos = position + 1;
            return this.loadView(pos);
        }

        private loadView(index: number): ItemInfo {
            if (this.mAdapter === null) {
                throw 'Null point Exception adapter is null';
            }
            let pos = index;
            if (pos >= this.mSize) {
                pos = 0;
            }
            if (pos < 0) {
                pos += this.mSize;
            }
            let view: View = this.mAdapter.initItem(pos, this);
            return new ItemInfo(view, index, pos);
        }

        private move(dis: number) {
            Log.d("move " + dis);
            if (this.mPosition === 0 && dis !== 0) {
                this.pagerChanged(this.mIndex, dis > 0 ? this.mIndex + 1 : this.mIndex - 1);
            }
            this.mPosition += dis;
            if (this.mPosition >= 0) {
                this.mAnimationState = STATE_MOVE_RIGHT;
            }
            if (this.mPosition < 0) {
                this.mAnimationState = STATE_MOVE_LEFT;
            }
            let movedegreepreView = this.mPosition / this.width;
            let movedegree = this.mPosition * (this.mIndex + 1) / this.width * this.mAdapter.getCount();
            this.pagerMoving(movedegreepreView, movedegree);
            this.invalidate(false);
        }

        private prepareToAnimation(speed: number) {
            let now: number = Date.now();
            this.mAnimationEnd = false;
            this.mLastAnimationTime = now;
            this.mCurrentAnimationTime = now;
            this.mSpeed = speed;
            if (this.mSpeed === 0) {
                this.mSpeed = this.mMin_speed;
            }
            if (speed > 0) {
                this.mSpeed = Math.abs(this.mSpeed);
                this.doRightOrBounceAnimation();
            } else {
                this.mSpeed = -1 * Math.abs(this.mSpeed);
                this.doLeftOrBounceAnimation();
            }
        }

        public flipLeft() {
            Log.d("flipLeft " + this.mAnimationEnd);
            if (!this.mAnimationEnd) return;
            this.mPosition = this.mCurrentView.left;
            this.move(-1);
            let now: number = Date.now();
            this.mAnimationEnd = false;
            this.mLastAnimationTime = now;
            this.mCurrentAnimationTime = now;
            this.mSpeed = -this.mMin_speed;
            this.doLeftOrBounceAnimation();
        }

        public flipRight() {
            Log.d("filpRight " + this.mAnimationEnd);
            if (!this.mAnimationEnd) return;
            this.mPosition = this.mCurrentView.left;
            this.move(1);
            let now: number = Date.now();
            this.mAnimationEnd = false;
            this.mLastAnimationTime = now;
            this.mCurrentAnimationTime = now;
            this.mSpeed = this.mMin_speed;
            this.doRightOrBounceAnimation();
        }

        private doRightOrBounceAnimation() {
            let now: number = Date.now();
            let t = 1;
            let s: number = this.mSpeed * t;
            if (this.mPosition > 0) {
                if (this.mPosition === this.width) {
                    this.mHandler.removeMessages(MOVE_RIGHT);
                    this.endRightanimation();
                    return;
                }
                if (s + this.mPosition > this.width) {
                    s = this.width - this.mPosition;
                }
            } else {
                if (this.mPosition === 0) {
                    this.mHandler.removeMessages(MOVE_RIGHT);
                    this.endBounceanimtion();
                    return;
                }
                if (s + this.mPosition > 0) {
                    s = -this.mPosition;
                }
            }
            this.move(s);
            this.mCurrentAnimationTime += ANIMATION_FRAME_DURATION;
            this.mHandler.removeMessages(MOVE_LEFT);
            this.mHandler.removeMessages(MOVE_RIGHT);
            this.mHandler.sendMessageDelayed(this.mHandler.obtainMessage(MOVE_RIGHT), ANIMATION_FRAME_DURATION);
        }

        private doLeftOrBounceAnimation() {
            // Log.d(TAG, "doleftAnimation  ");
            let now = Date.now();
            let t = 1;//(now - mLastAnimationTime)/1000;
            let s = (this.mSpeed * t);
            if (this.mPosition < 0) {
                if (this.mPosition + this.width == 0) {
                    this.mHandler.removeMessages(MOVE_LEFT);
                    this.endLeftAnimation();
                    return;
                }
                if (s + this.mPosition + this.width < 0) {
                    s = -(this.mPosition + this.width);
                }
            } else {
                if (this.mPosition == 0) {
                    this.mHandler.removeMessages(MOVE_LEFT);
                    this.endBounceanimtion();
                    return;

                }
                if (s + this.mPosition < 0) {
                    s = -this.mPosition;
                }

            }
            this.move(s);
            this.mCurrentAnimationTime += ANIMATION_FRAME_DURATION;
            this.mHandler.removeMessages(MOVE_LEFT);
            this.mHandler.removeMessages(MOVE_RIGHT);
            this.mHandler.sendMessageDelayed(this.mHandler.obtainMessage(MOVE_LEFT), ANIMATION_FRAME_DURATION);
        }

        private endBounceanimtion() {
            Log.d("endBounceanimtion  ");
            this.mAnimationEnd = true;
            this.mScale = 0;
            this.mPosition = 0;
            this.mAnimationState = 0;
            this.pagerMovingEnd(this.mIndex);
        }

        private endRightanimation() {
            Log.d("endRightanimation   ");
            let index: number = this.mIndex - 1;
            if (index < 0) {
                index = this.mAdapter.getCount() + index;
            }
            this.mPosition = 0;
            this.mScale = 0;
            this.mAnimationState = 0;
            this.setCurrentItem(index);
            this.mAnimationEnd = true;
            this.pagerMovingEnd(this.mIndex);

        }

        private endLeftAnimation() {
            Log.d("endLeftAnimation   ");
            let index = this.mIndex + 1;
            this.mPosition = 0;
            this.mScale = 0;
            index = index % this.mAdapter.getCount();
            this.mAnimationState = 0;
            this.setCurrentItem(index);
            this.mAnimationEnd = true;
            this.pagerMovingEnd(this.mIndex);
        }

        private pagerChanged(position: number, targetPosition: number) {
            if (this.listener != null) {
                this.listener.onPagerChanged(position, targetPosition);
            }
        }

        private pagerMoving(movedegreepreView: number, movedegree: number) {
            if (this.listener != null) {
                this.listener.onPagerMoving(-1 * movedegreepreView, -1 * movedegree);
            }
        }

        private pagerMovingEnd(position: number) {
            if (this.listener != null) {
                this.listener.onPagerMovingEnd(position);
            }
        }

    }

    export interface PagerChangedListener {
        onPagerChanged(position: number, targetPosition: number);
        onPagerMoving(movedegreepreView: number, movedegree: number);
        onPagerMovingEnd(position: number);
    }

    export interface AreaTouchListener {
        onLeftTouch();
        onRightTouch();
        onMiddleTouch();
    }

    class ItemInfo {
        view: View;
        index: number;
        position: number;
        constructor(v: View, i: number, pos: number) {
            this.view = v;
            this.index = i;
            this.position = pos;
        }
    }

}