/// <reference path="Util.ts" />
/// <reference path="Canvas.ts" />

namespace android.graphics{


    export class TextPaint{
        private canvas:Canvas;
        private font:Font;
        constructor(canvas:Canvas, font:Font){
            this.canvas = canvas;
            this.font = font;
        }
        measureString(str:string):Size{
            return this.canvas.measureString(str,this.font);
        }
    }

}