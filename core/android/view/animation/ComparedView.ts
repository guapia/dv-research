namespace android {
    'use strict';
    import View = android.view.View;
    import Animation = android.view.animation.Animation;
    import Canvas = android.graphics.Canvas;
    import AnimationEase = android.view.animation.AnimationEase;
    import Util = android.graphics.Util;
    export class ComparedView extends View {

        public animationXs: number[] = [];
        public animationYs: number[] = [];

        get comparedAnimationEmpty(): boolean {
            return this.animationXs == null || this.animationYs == null || this.animationXs.length <= 0 || this.animationYs.length <= 0;
        }

        get ptcount(): number {
            return 100;
        }
        getComparedAnimation(fromview: ComparedView): Animation {
            let topts = this.getpts(this.ptcount);
            let frompts = fromview.getpts(fromview.ptcount);
            let same: boolean = topts.xs.every((v: number, index: number, arr: number[]) => {
                return v === frompts.xs[index];
            }) &&
                topts.ys.every((v: number, index: number, arr: number[]) => {
                    return v === frompts.ys[index];
                });
            if (same) { return; }

            if (topts == null || frompts == null) {
                return null;
            }
            let animation = new CommonComparedAnimation(frompts.xs, frompts.ys, topts.xs, topts.ys);
            animation.duration = 600;
            animation.ease = new AnimationEase();
            animation.from = 0;
            animation.to = 1;
            return animation;
        }
        onLayout(l: number, t: number, r: number, b: number, canvas: Canvas): void {
            super.onLayout(l, t, r, b, canvas);
            this._pts = null;
        }
        getpts(size: number): { xs: number[], ys: number[] } {
            if (this._pts == null) {
                this._pts = Util.createPtsFromRect(this.layoutInfo.innerrect.clone(), this.ptcount);
            }
            return this._pts;
        }
        protected _pts: { xs: number[], ys: number[] } = null;
    }

    class CommonComparedAnimation extends Animation {
        private fromXs: number[];
        private fromYs: number[];
        private toXs: number[];
        private toYs: number[];

        constructor(fromxs: number[], fromys: number[], toxs: number[], toys: number[]) {
            super();
            this.ease = new AnimationEase();
            this.fromXs = [].concat(fromxs);
            this.fromYs = [].concat(fromys);
            this.toXs = [].concat(toxs);
            this.toYs = [].concat(toys);
        }

        onStartAniamtion(canvas: Canvas, view: View) {
            super.onStartAniamtion(canvas, view);
        }
        onEndAnimation(canvas: Canvas, view: View) {
            super.onEndAnimation(canvas, view);
            if (view instanceof ComparedView) {
                view.animationXs.length = 0;
                view.animationYs.length = 0;
            }
        }
        applyTransformation(interpolatedTime: number, canvas: Canvas, view: View) {
            if (view instanceof ComparedView) {
                let scale: number = this.from + (this.to - this.from) * interpolatedTime;
                let maxLen: number = Math.max(this.toXs.length, this.toYs.length, this.fromXs.length, this.fromYs.length);
                let minLen: number = Math.min(this.toXs.length, this.toYs.length, this.fromXs.length, this.fromYs.length);
                let toStep: number = Math.min(this.toXs.length, this.toYs.length) / minLen;
                let fromStep: number = Math.min(this.fromXs.length, this.fromYs.length) / minLen;
                for (let i = 0; i < minLen; ++i) {
                    let toindex: number = i;//Math.floor(i * toStep);
                    let fromindex: number = i;//Math.floor(i * fromStep);
                    let dx: number = (this.toXs[toindex] - this.fromXs[fromindex]) * scale;
                    let dy: number = (this.toYs[toindex] - this.fromYs[fromindex]) * scale;
                    view.animationXs[toindex] = dx + this.fromXs[fromindex];
                    view.animationYs[toindex] = dy + this.fromYs[fromindex];
                    // for(let j = toindex+1; j < Math.floor((i+1) * toStep); ++j){
                    //     view.animationXs[j]=view.animationXs[toindex];
                    //     view.animationXs[j]=view.animationYs[toindex];
                    // }
                }

            }
        }
    }
}