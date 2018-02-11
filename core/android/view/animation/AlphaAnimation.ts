
namespace android.view.animation {
    import Canvas = android.graphics.Canvas;
    export class AlphaAnimation extends Animation {
        private alpha :number =null;
        private oldAlpha:number = null;
        
        constructor() {
            super();
            this.ease = new android.view.animation.AnimationEase();
        }


        applyTransformation(interpolatedTime: number, canvas: Canvas, view: View) {

            let scale: number = this.from + (this.to - this.from) * interpolatedTime;
            view.alpha = this.alpha * scale ;
        }
        onStartAniamtion(canvas: Canvas, view: View): void {
            super.onStartAniamtion(canvas, view);
            this.alpha = this.oldAlpha = view.alpha;
        }
        onEndAnimation(canvas: Canvas, view: View): void {
            super.onEndAnimation(canvas, view);
            view.alpha = this.alpha = this.oldAlpha;
        }
    }
}