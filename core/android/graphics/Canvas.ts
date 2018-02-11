/// <reference path="Point.ts" />
/// <reference path="Util.ts" />
/// <reference path="../device/Device.ts" />
/// <reference path="../util/Log.ts" />
/// <reference path="../device/Default.ts" />


namespace android.graphics {
    import Rect = android.graphics.Rect;
    import Point = android.graphics.Point;
    import Font = android.graphics.Font;
    import Size = android.graphics.Size;
    import Device = android.device.Device;
    import Default = android.device.Default;
    import Log = android.util.Log;
    import FillStyle = android.graphics.FillStyle;
    import Gradient = android.graphics.Gradient;
    import LinearGradient = android.graphics.LinearGradient;
    import RadialGradient = android.graphics.RadialGradient;
    export enum RenderType {
        Canvas,
        Svg
    }
    class CanvasState {
        xOffset: number = 0;
        yOffset: number = 0;
        constructor(x, y) {
            this.xOffset = x;
            this.yOffset = y;
        }
    }

    const Floor = value => Math.floor(1000 * value) / 1000;
    export class Canvas {
        private _render: CanvasRenderEngine|SvgRenderEngine;
        private _renderType: RenderType;
        private _hostElement: HTMLElement;
        private xOffset: number = 0;
        private yOffset: number = 0;
        private saveStates: CanvasState[] = [];

        constructor(element: HTMLElement, type: RenderType) {
            this._hostElement = element;
            this._renderType = type;
            if (type === RenderType.Canvas) {
                this._render = new CanvasRenderEngine(element);
                element.style.width = Device.width + 'px';
                element.style.height = Device.height + "px";
                this._render.setViewportSize(Device.width, Device.height);;
            } else if (type === RenderType.Svg) {
                this._render = new SvgRenderEngine(element);
                element.style.width = Device.width + 'px';
                element.style.height = Device.height + "px";
                this._render.setViewportSize(Device.width, Device.height);
            }
        }

        clearRect(left:number,top:number,width:number,height:number):void{

        }
        save() {
            let state = new CanvasState(this.xOffset, this.yOffset);
            this.saveStates.push(state);
            this._render.save();
        }

        clip(rect: Rect) {
            var r = rect.clone();
            r.translate(this.xOffset, this.yOffset);
            if(this._render instanceof CanvasRenderEngine){
                this._render.clip(rect);
            }else{
                this._render.clip();
            }
        }



        restore() {
            this.saveStates.pop();
            let state = this.saveStates[this.saveStates.length - 1];
            if (state) {
                this.xOffset = state.xOffset;
                this.yOffset = state.yOffset;
            } else {
                this.xOffset = 0;
                this.yOffset = 0;
            }
            if(this._render instanceof CanvasRenderEngine){
                this._render.restore();
            }
        }

        setViewportSize(w: number, h: number) {
            this._render.setViewportSize(w, h);
        }

        measureString(str: string, font: Font, maxSize?: number): Size {
            if (!font) {
                font = Default.font.clone();
            }
            var f = font.clone();
            f.fontSize *= Device.density;
            return this._render.measureString(str, f);
        }

        measureStringWithWidth(str: string, font: Font) {

        }

        drawText(str: string, pt: Point, f: Font, center?: Point, angle?: number) {
            if (!f) {
                f = Default.font.clone();
            }
            var size = this.measureString(str, f);
            var font: Font = f.clone();
            font.fontSize *= Device.density;
            let startpt: Point = new Point(pt.x, pt.y + size.height);
            let tpt = pt.clone();
            if (this._render instanceof CanvasRenderEngine) {
                if (angle != null) {
                    this._render.drawStringRotated(str, startpt, center, angle, font);
                } else {
                    this._render.drawString(str, startpt, font);
                }
            } else if(this._render instanceof SvgRenderEngine) {
                startpt.offset(this.xOffset, this.yOffset);
                if (angle != null) {
                    this._render.drawStringRotated(str, startpt, center, angle, null, { 'font-size': font.fontSize, 'font-family': font.fontFamily });
                } else {
                    this._render.drawString(str, startpt, null, { 'font-size': font.fontSize, 'font-family': font.fontFamily });
                }
            }
        }

        drawPosText(text: string, pos: number[], font: Font) {
            if (text.length * 2 > pos.length) {
                throw "IndexOutOfBoundsException";
            }
            if (!font) {
                font = Default.font;
            }
            if (this._renderType === RenderType.Canvas) {
                let pt: Point = new Point(0, 0);
                for (let i = 0; i < pos.length; i += 2) {
                    pt.set(pos[i], pos[i + 1]);
                    // this._render.drawString(text[i],pt,font);
                    this.drawText(text[i / 2], pt, font);
                }
            } else {
                // console.log(" drawPosText ");
            }
        }

        drawLine(pt1: Point, pt2: Point, strokestyle: StrokeStyle) {
            var stroke = null;
            if (strokestyle) {
                stroke = strokestyle.clone();
            } else {
                stroke = Default.strokestyle.clone();
            }
            var startpoint = pt1.clone();
            var endpoint = pt2.clone();

            if (this._renderType === RenderType.Canvas) {
                this._render.drawLine(startpoint.x, startpoint.y, endpoint.x, endpoint.y, stroke);
            } else {
                startpoint.offset(this.xOffset, this.yOffset);
                endpoint.offset(this.xOffset, this.yOffset);
                this._render.drawLine(startpoint.x, startpoint.y, endpoint.x, endpoint.y, stroke);
            }
        }

        drawLines(xs: number[], ys: number[], strokestyle: StrokeStyle) {
            // drawLines(xs: number[], ys: number[], strokestyle: StrokeStyle) {
            var stroke = null;
            if (strokestyle) {
                stroke = strokestyle.clone();
            } else {
                stroke = Default.strokestyle.clone();
            }
            if (this._render instanceof CanvasRenderEngine) {
                this._render.drawLines(xs, ys, stroke);
            } else if(this._render instanceof SvgRenderEngine){
                stroke.transform = "translate(" + this.xOffset + "," + this.yOffset + ")";
                this._render.drawLines(xs, ys, null, stroke.getCssStyle());
            }
        }
        drawRect(pt1: Point, pt2: Point, fill: boolean, style:Style,) {
            var startpoint = pt1.clone();
            var endpoint = pt2.clone();

            if (this._render instanceof CanvasRenderEngine) {
                this._render.drawRect(startpoint.x, startpoint.y, endpoint.x - startpoint.x, endpoint.y - startpoint.y, style, fill);
            } else if(this._render instanceof SvgRenderEngine){
                startpoint.offset(this.xOffset, this.yOffset);
                endpoint.offset(this.xOffset, this.yOffset);
                if (fill) {
                    this._render.drawRect(startpoint.x, startpoint.y, endpoint.x - startpoint.x, endpoint.y - startpoint.y, null, { 'fill': typeof(style.background)=='string'?style.background:null }, null);
                } else {
                    this._render.drawRect(startpoint.x, startpoint.y, endpoint.x - startpoint.x, endpoint.y - startpoint.y, null, { 'fill': 'transparent', 'stroke': typeof(style.background)=='string'?style.background:null }, null);
                }
            }
        }
        drawArc(rect: Rect, startAngle: number, sweepAngel: number, style: Style) {
            var cx: number = (rect.right - rect.left) / 2 + rect.left + this.xOffset;
            var cy: number = (rect.bottom - rect.top) / 2 + rect.top + this.yOffset;
            var r: number = (rect.width < rect.height ? rect.width : rect.height) / 2;
            if (this._render instanceof SvgRenderEngine) {
                this._render.drawPie(cx, cy, r, Floor(startAngle), Floor(sweepAngel), null, { 'fill': typeof(style.background) =='string' ?style.background:null });
            } else if(this._render instanceof CanvasRenderEngine){
                this._render.drawPie(cx, cy, r, Floor(startAngle), Floor(sweepAngel), style);
            }
        }


        drawDonut(cx: number, cy: number, radius: number, innerRadius: number, startAngle: number, sweepAngle: number, style:Style) {
            var _cx: number = cx + this.xOffset;
            var _cy: number = cy + this.yOffset;
            if (this._render instanceof SvgRenderEngine) {
                this._render.drawDonut(_cx, _cy, radius, innerRadius, Floor(startAngle), Floor(sweepAngle), null, { 'fill':typeof(style.background) =='string' ?style.background:null });
            } else if(this._render instanceof CanvasRenderEngine){
                this._render.drawDonut(_cx, _cy, radius, innerRadius, (startAngle), (sweepAngle), style);
            }
        }

        drawOval(rect: Rect, color: string) {

        }

        // public alpha :number =0;
        public set alpha(value: number) {
            this._render.alpha = value;
        }
        drawPolygon(xs: number[], ys: number[], style:Style) {
            if (this._render instanceof SvgRenderEngine) {
                this._render.drawPolygon(xs, ys, null, { 'fill': typeof(style.background) =='string'?style.background:null });
            } else if(this._render instanceof CanvasRenderEngine){
                this._render.drawPolygon(xs, ys, style);
            }

        }

        drawImage(x: number, y: number, w: number, h: number) {
            // this._render.drawImage(x, y, w, h);
        }

        getCache(sx: number, sy: number, sw: number, sh: number): ImageData {
            // return this._render.getImageData(sx, sy, sw, sh);
            return null;
        }

        setCache(imagedata: ImageData, dx: number, dy: number, dirtyX?: number, dirtyY?: number, dirtyWidth?: number, dirtyHeight?: number): void {
            // this._render.putImageData(imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight);
            
        }

        begin() {
            this._render.beginRender();
        }

        end() {
            this._render.endRender();
        }
        moveTo(x:number,y:number){
            if (this._render instanceof CanvasRenderEngine) {
                this._render.moveTo(x,y);
            }
        }

        scale(sx: number, sy: number): void {
            console.log("canvasScale " + sx+" , " + sy);
            if (this._render instanceof CanvasRenderEngine) {
                this._render.scale(sx,sy);
            }
        }
        rotate(degree: number): void {
            if (this._render instanceof CanvasRenderEngine) {
                this._render.rotate(degree);
            }
        }

        translate(x: number, y: number) {
            this.xOffset = x;
            this.yOffset = y;
            if (this._render instanceof CanvasRenderEngine) {
                this._render.translate(x, y);
            }
        }

        get canvas():CanvasRenderingContext2D{
            if(this._render instanceof CanvasRenderEngine){
                return this._render.canvas;
            }else{
                return null;
            }
        }


    }
}
