namespace android.view{
    import Rect = android.graphics.Rect;
    export class RenderState{
        currentRect:Rect;
        index:number;
        constructor(rect:Rect,index:number){
            this.currentRect = rect;
            this.index = index;
        }
    }
}