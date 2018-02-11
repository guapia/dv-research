/// <reference path="../../graphics/Margins.ts" />

/// <reference path="../../graphics/Rect.ts" />

namespace android.view {

    import Rect = android.graphics.Rect;
    import Padding = android.graphics.Padding;
    import Margin = android.graphics.Margin;
    import Util = android.graphics.Util;
    /***
     * 根据measure 计算出的结果
     */
    export class LayoutInfo {
        innerrect: Rect;
        outterrect: Rect;
        drawindex: number;//render order in viewgroup
        padding:Padding;
        constructor(l: number, t: number, r: number, b: number, padding: Padding, drawindex?: number) {
            this.outterrect = new Rect(l, t, r, b);
            this.padding = padding;
            this.innerrect = new Rect(this.outterrect.left + padding.leftPadding,
                this.outterrect.top + padding.topPadding,
                this.outterrect.right - padding.rightPadding,
                this.outterrect.bottom - padding.bottomPadding
            )
            if (drawindex) {
                this.drawindex = drawindex;
            } else {
                this.drawindex = 0;
            }
        }
        reset(l: number, t: number, r: number, b: number, padding: Padding, drawindex?: number) {
            this.outterrect = new Rect(l, t, r, b);
            this.padding = padding;
            this.innerrect = new Rect(this.outterrect.left + padding.leftPadding,
                this.outterrect.top + padding.topPadding,
                this.outterrect.right - padding.rightPadding,
                this.outterrect.bottom - padding.bottomPadding
            )
            if (drawindex) {
                this.drawindex = drawindex;
            } else {
                this.drawindex = 0;
            }
        }
        offset(x:number,y:number){
            this.innerrect.translate(x,y);
            this.outterrect.translate(x,y);
        }
        clone(){
            let info= new LayoutInfo(0,0,0,0,new Padding(0));
            info.drawindex =this.drawindex;
            info.innerrect = this.innerrect.clone();
            info.outterrect = this.outterrect.clone();
            return info;
        }
        equal(info:LayoutInfo):boolean{
            if(info != null){
                return info.drawindex === this.drawindex && this.innerrect.equal(info.innerrect) && this.outterrect.equal(info.outterrect);
            }
            return false;
        }
    }
    /***
     * 输入的参数
     */
    export class LayoutParams {
        _width: number;
        _height: number;
        margin: Margin = new Margin(0, 0, 0, 0);// { 'marginLeft': 0, 'marginRight': 0, 'marginTop': 0, 'marginBottom': 0 };
        constructor(width: number, height: number, margin?: Margin) {
            this.width = width;
            this.height = height;
            if (margin) {
                this.margin = margin;
            }
        }
        set width(w: number) {
            this._width = w;
        }
        get width(): number {
            if (this._width < 0) {
                return 0;
            }
            return this._width;
        }

        get widthMode() {
            var mode = LayoutParams.EXACTLY;
            switch (this._width) {
                case LayoutParams.WRAP_CONTENT:
                    mode = LayoutParams.WRAP_CONTENT;
                    break;
                case LayoutParams.MATCH_PARENT:
                    mode = LayoutParams.MATCH_PARENT;
                    break;
                case LayoutParams.EXACTLY:
                default:
                    mode = LayoutParams.EXACTLY;
                    break;
            }
            return mode;
        }

        get heightMode() {
            var mode = LayoutParams.EXACTLY;
            switch (this._height) {
                case LayoutParams.WRAP_CONTENT:
                    mode = LayoutParams.WRAP_CONTENT;
                    break;
                case LayoutParams.MATCH_PARENT:
                    mode = LayoutParams.MATCH_PARENT;
                    break;
                case LayoutParams.EXACTLY:
                default:
                    mode = LayoutParams.EXACTLY;
                    break;
            }
            return mode;
        }

        set height(h: number) {
            this._height = h;
        }
        get height(): number {
            if (this._height < 0) {
                return 0;
            }
            return this._height;
        }

        static MATCH_PARENT: number = -1;
        static WRAP_CONTENT: number = -2;
        static EXACTLY: number = -3;
    }
    export class MeasureSpec {
        value: number;
        mode: number = LayoutParams.EXACTLY;
        constructor(v?: number, m?: number) {
            if (v !== undefined) {
                this.value = v;
            }
            if (m !== undefined) {
                this.mode = m;
            }
        }
        getMeasureValue() {
            switch (this.mode) {
                case LayoutParams.MATCH_PARENT:
                case LayoutParams.EXACTLY:
                    return this.value;
                case LayoutParams.WRAP_CONTENT:
                default:
                    if (this.value) {
                        return this.value;
                    }
                    return LayoutParams.WRAP_CONTENT;
            }
        }
    }

}