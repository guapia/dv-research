
namespace android.view.animation {
    import Canvas = android.graphics.Canvas;
    export class ScaleAnimation extends Animation {
        duration: number = 0;
        start: number;
        ease:AnimationEase;
        type:AnimationType;
        constructor(){
            super();
        }
        
        get isAniamtionEnd():boolean{
            return this.start + this.duration < Date.now();
        }

        scale(now: number): number {
            console.log("ease " +( (now - this.start)/this.duration));
            return  this.ease.ease((now - this.start) / this.duration);
        }
        applyTransformation(interpolatedTime:number, canvas:Canvas,view:View) {
            // canvas.moveto(view.left+view.width/2,view.top +view.height/2);
            canvas.scale(this.from + (this.to-this.from) * interpolatedTime,this.from + (this.to-this.from) * interpolatedTime);
        }
            
    }
}