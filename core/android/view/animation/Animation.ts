
namespace android.view.animation {
    import Canvas = android.graphics.Canvas;
    export enum AnimationState {
        BeforeStart,
        Animating,
        End
    }
    const Animating_Proprity: number = 9999999;
    export class Animation {

        duration: number = 0;
        start: number;
        ease: AnimationEase;
        type: AnimationType;
        from: number;
        to: number;
        fillAfter: boolean;
        state: AnimationState;
        repeate: boolean;
        _startCallBack: (view: View) => void;
        _endCallBack: (view: View) => void;
        private __oldProprity: number = 0;
        constructor() {
            this.ease = new AnimationEase();
            this.start = 0;
            this.duration = 0;
            this.type = AnimationType.Alpha;
            this.from = 1;
            this.to = 1;
            this.state = AnimationState.BeforeStart;
            this.fillAfter = false;
            this.repeate = false;
        }
        setAnimationCallBack(onAnimationStart: (view: View) => void, onAnimationEnd: (view: View) => void): void {
            this._startCallBack = onAnimationStart;
            this._endCallBack = onAnimationEnd;
        }
        get isAniamtionEnd(): boolean {
            // console.log("start " + this.start +" , duration "+this.duration +" , now "+Date.now());
            return (this.start + this.duration < Date.now()) || this.state == AnimationState.End;
        }

        scale(now: number): number {
            // console.log("ease " +( (now - this.start)/this.duration));
            return this.ease.ease((now - this.start) / this.duration);
        }
        applyTransformation(interpolatedTime: number, canvas: Canvas, view: View) {
            // console.log("applyTransformation "+interpolatedTime + " canvas " + canvas + " View " + view);
        }
        onStartAniamtion(canvas: Canvas, view: View) {
            this.__oldProprity = view.priority;
            // console.log("onStartAniamtion "+view.id);
            view.priority = Animating_Proprity;
            if (this._startCallBack) {
                this._startCallBack(view);
            }
        }
        onEndAnimation(canvas: Canvas, view: View) {
            view.priority = this.__oldProprity;
            if (this._endCallBack) {
                this._endCallBack(view);
            }
        }
        __onInneranimationEnd(canvas:Canvas,view:View){}
    }
}