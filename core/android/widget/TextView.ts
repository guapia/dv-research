namespace android.widget {
    import Padding = android.graphics.Padding;
    import Align = android.graphics.Align;
    import Gravity = android.graphics.Gravity;


    import AlignElement = android.graphics.AlignElement;
    import Margin = android.graphics.Margin;

    import Size = android.graphics.Size;
    import Canvas = android.graphics.Canvas;
    import ViewGroup = android.view.ViewGroup;
    import View = android.view.View;

    import Point = android.graphics.Point;
    import MeasureSpec = android.view.MeasureSpec;
    import Font = android.graphics.Font;
    import LayoutInfo  = android.view.LayoutInfo;
    import LayoutParams = android.view.LayoutParams;
    export enum Ellipsize{

    }
    export class TextView extends View{
        private text :string;
        private font :Font;
        private _ellipsize:Ellipsize;
        private _maxWidth:number;
        private _linespace:number;
        onDraw(canvas:Canvas):void{            
            super.onDraw(canvas);
            canvas.drawText(this.text,this.layoutInfo.innerrect.startPoint,this.font);
        }
        
        public setText(text:string):void{
            this.text = text;
            this.invalidate(false);
        }

        public setFont(font:Font):void{
            this.font = font;
        }

        set ellipsize(ellipsize:Ellipsize){
            this._ellipsize = ellipsize;
        }

        get ellipsize():Ellipsize{
            return this._ellipsize;
        }

        set maxWidth(maxWidth:number){
            this._maxWidth = maxWidth;
        }

        get maxWidth():number{
            return this._maxWidth;
        }
        
        get linespace(){
            return this._linespace;
        }

        set linespace(linespace:number){
            this._linespace = linespace;
        }

        // private _measureString(width:number):Size{
        //     return
        // }
            
        onMeasure(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size {
            if(!this.font){
                this.font =  new Font(16,"",'white');
            }
            this._layoutInfo = new LayoutInfo(0,0,0,0,this.padding,0);
            var w:number = this.layoutParams.width;
            var h:number = this.layoutParams.height;
            var size :Size = new Size(w, h);
            var widthmode = this.layoutParams.widthMode;
            var heightmode = this.layoutParams.heightMode;
            var textsize = canvas.measureString(this.text,this.font);
            if(widthmode === LayoutParams.MATCH_PARENT){
                size.width = width.value;
            }else if(widthmode === LayoutParams.WRAP_CONTENT){
                size.width = textsize.width>this._maxWidth?this._maxWidth:textsize.width;
            }
            if(heightmode === LayoutParams.MATCH_PARENT){
                size.height = height.value;
            }else if(heightmode === LayoutParams.WRAP_CONTENT){
                size.height = textsize.height;
            }
            this.setMeasuredDimension(new MeasureSpec(size.width,LayoutParams.EXACTLY),new MeasureSpec(size.height,LayoutParams.EXACTLY));
            return size;
        }
    }
}