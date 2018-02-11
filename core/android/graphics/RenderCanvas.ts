/// <reference path="Rect.ts" />

module android.graphics {
    'use strict';
    import Rect = android.graphics.Rect;
    import Size = android.graphics.Size;
    import Point = android.graphics.Point;
    import Font = android.graphics.Font;
    import StrokeStyle = android.graphics.StrokeStyle;
    /**
     * Render to canvas.
     */
    export class CanvasRenderEngine {

        private _element: HTMLElement;
        private _canvas: any;
        private _canvas2d: CanvasRenderingContext2D;

        private _clipRect: Rect;

        constructor(element: HTMLElement) {
            this._element = element;
            this._create();

        }
        get canvas(): CanvasRenderingContext2D {
            return this._canvas2d;
        }

        public set alpha(value: number) {
            this._canvas2d.globalAlpha = value;
        }
        clearRect(left: number, top: number, width: number, height: number) {
            this._canvas2d.clearRect(left, top, width, height);
        }

        beginRender() {
            this._canvas2d.clearRect(0, 0, this._canvas.width, this._canvas.height);
        }

        endRender() {
        }

        save() {
            this._canvas2d.save();
        }

        restore() {
            this._canvas2d.restore();
        }

        getImageData(sx: number, sy: number, sw: number, sh: number): ImageData {
            return this._canvas2d.getImageData(sx, sy, sw, sh);
        }

        putImageData(imagedata: ImageData, dx: number, dy: number, dirtyX?: number, dirtyY?: number, dirtyWidth?: number, dirtyHeight?: number): void {
            this._canvas2d.putImageData(imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight);
        }

        clip(rect: Rect) {
            this._canvas2d.beginPath();
            this._canvas2d.rect(rect.left, rect.top, rect.width, rect.height);;
            this._canvas2d.clip();
        }

        setViewportSize(w: number, h: number) {
            let _devicePixelRatio: number = 2;
            this._canvas.width = w * _devicePixelRatio;
            this._canvas.height = h * _devicePixelRatio;
            this._canvas.style.width = w + "px";
            this._canvas.style.height = h + "px";
            this._canvas2d.scale(_devicePixelRatio, _devicePixelRatio);
        }

        get element(): Element {
            return this._canvas;
        }


        drawEllipse(cx: number, cy: number, rx: number, ry: number, style?: Style) {
        }


        private _applyStyle(style: Style) {
            if (style != null) {

                if (style.background instanceof FillStyle) {
                    if (style.background.fill instanceof Gradient) {
                        let gradient: any = null;
                        let fill = style.background.fill;
                        if (fill instanceof LinearGradient) {
                            gradient = this._canvas2d.createLinearGradient(fill.startx, fill.starty, fill.endx, fill.endy);
                        } else if (fill instanceof RadialGradient) {
                            gradient = this._canvas2d.createRadialGradient(fill.centerx, fill.centery, fill.radius, fill.centerx1, fill.centery1, fill.radius1);
                        }
                        if (gradient != null) {
                            for (let colorinfo of fill.colors) {
                                gradient.addColorStop(colorinfo.offset, colorinfo.color);
                            }
                        }
                        this._canvas2d.fillStyle = gradient;
                    }
                }
                else if (typeof (style.background) == 'string') {
                    this._canvas2d.fillStyle = style.background;
                }
                this._applyStrokeStyle(style.strokeStyle);
            }
        }
        private _applyStrokeStyle(strokeStyle: StrokeStyle) {
            if (strokeStyle != null) {
                if (strokeStyle.strokeColor != null) {
                    this._canvas2d.strokeStyle = strokeStyle.strokeColor;
                }
                if (strokeStyle.strokeWidth != null && !isNaN(strokeStyle.strokeWidth)) {
                    this._canvas2d.lineWidth = strokeStyle.strokeWidth;
                }
                if (strokeStyle.dash != null) {
                    this._canvas2d.setLineDash(strokeStyle.dash);
                }
                if (strokeStyle.dashOffset != null) {
                    this._canvas2d.lineDashOffset = strokeStyle.dashOffset;
                }
            }
        }

        private _applyFont(font: Font) {
            if (font != null) {
                if (font.fontColor != null) {
                    this._canvas2d.fillStyle = font.fontColor;
                }
                if (font.fontSize != null) {
                    this._canvas2d.font = font.fontSize + 'px ';
                }
                if (font.fontFamily != null) {
                    this._canvas2d.font += font.fontFamily;
                }
            }
        }

        drawRect(x: number, y: number, w: number, h: number, style: Style, fill: boolean) {
            this._canvas2d.save();
            this._applyStyle(style);
            if (fill) {
                if(style.background != null){
                    this._canvas2d.fillRect(x, y, w, h);
                }
                if(style.strokeStyle != null){
                    this._canvas2d.strokeRect(x, y, w, h);
                }
            } else {
                this._canvas2d.strokeRect(x, y, w, h);
            }
            if (style.strokeStyle != null) {
                // this._canvas2d.stroke();
            }
            this._canvas2d.restore();
        }

        drawLine(x1: number, y1: number, x2: number, y2: number, strokestyle: StrokeStyle) {
            this._canvas2d.beginPath();
            this._canvas2d.moveTo(x1, y1);
            this._canvas2d.lineTo(x2, y2);
            this._canvas2d.strokeStyle = strokestyle.strokeColor;
            this._canvas2d.lineWidth = strokestyle.strokeWidth;
            this._canvas2d.stroke();
        }

        drawLines(xs: number[], ys: number[], strokestyle: StrokeStyle) {
            if (xs !== null && ys !== null && xs.length === ys.length && xs.length > 0) {
                this._canvas2d.save();
                this._canvas2d.beginPath();
                this._applyStrokeStyle(strokestyle);
                this._canvas2d.moveTo(xs[0], ys[0]);
                for (let i = 1; i < xs.length; ++i) {
                    this._canvas2d.lineTo(xs[i], ys[i]);
                }
                this._canvas2d.stroke();
                this._canvas2d.closePath();
                this._canvas2d.restore();
            }
        }

        drawPolygon(xs: number[], ys: number[], style: Style) {
            this._canvas2d.save();
            this._applyStyle(style);
            this._canvas2d.beginPath();
            this._canvas2d.moveTo(xs[0], ys[0]);
            for (var i = 1; i < xs.length; ++i) {
                this._canvas2d.lineTo(xs[i], ys[i]);
            }
            this._canvas2d.closePath();
            this._canvas2d.fill();
            if (style != null && style.strokeStyle != null) {
                this._canvas2d.stroke();
            }
            this._canvas2d.restore();
        }

        drawPie(cx: number, cy: number, r: number, startAngle: number, sweepAngle: number, style: Style) {
            this._canvas2d.save();
            this._applyStyle(style);
            this._canvas2d.beginPath();
            this._canvas2d.moveTo(cx, cy);
            this._canvas2d.arc(cx, cy, r, startAngle, startAngle + sweepAngle);
            this._canvas2d.lineTo(cx, cy);
            this._canvas2d.closePath();
            this._canvas2d.fill();
            this._canvas2d.rotate(startAngle);
            this._canvas2d.restore();

        }


        drawDonut(cx: number, cy: number, radius: number, innerRadius: number, startAngle: number, sweepAngle: number, style: Style) {
            let endAngle: number = startAngle + sweepAngle;
            let p1 = new Point(cx, cy);
            p1.x += innerRadius * Math.cos(startAngle);
            p1.y += innerRadius * Math.sin(startAngle);
            let p2 = new Point(cx, cy);
            p2.x += innerRadius * Math.cos(endAngle);
            p2.y += innerRadius * Math.sin(endAngle);
            this._canvas2d.save();
            this._canvas2d.beginPath();
            this._applyStyle(style);
            this._canvas2d.moveTo(p1.x, p1.y);
            this._canvas2d.arc(cx, cy, radius, startAngle, endAngle, false);
            this._canvas2d.lineTo(p2.x, p2.y);
            this._canvas2d.arc(cx, cy, innerRadius, endAngle, startAngle, true);
            if(style.background != null){
                this._canvas2d.fill();
            }
            if(style.strokeStyle != null){
                this._canvas2d.stroke();
            }
            this._canvas2d.restore();
        }

        drawString(s: string, pt: Point, font: Font) {
            // if (font) {
            //     this._canvas2d.font = font.fontSize + 'px ' + font.fontFamily;
            //     var gradient = this._canvas2d.createLinearGradient(0, 0, this._canvas.width, 0);
            //     if (font.fontColor) {
            //         gradient.addColorStop(1.0, font.fontColor);
            //         this._canvas2d.fillStyle = gradient;
            //     }
            // }
            this._canvas2d.save();
            this._applyFont(font);
            this._canvas2d.fillText(s, pt.x, pt.y);
            this._canvas2d.restore();
        }

        drawStringRotated(s: string, pt: Point, center: Point, angle: number, font: Font) {
            this._canvas2d.save();
            this._canvas2d.textBaseline = 'bottom';
            this._canvas2d.translate(center.x, center.y);
            this._canvas2d.rotate(Math.PI / 180 * angle);
            this._canvas2d.translate(-center.x, -center.y);
            this._applyFont(font);
            this._canvas2d.fillText(s, pt.x, pt.y);
            this._canvas2d.restore();
        }

        measureString(s: string, font: Font, maxSize: number = 0): Size {
            var sz = new Size(0, 0);
            this._canvas2d.font = font.fontSize + "px" + " " + font.fontFamily;
            var tm: TextMetrics = this._canvas2d.measureText(s);
            sz.width = tm.width;
            sz.height = font.fontSize;
            return sz;
        }

        drawImage(image: any, x: number, y: number, w: number, h: number) {


        }

        private _create() {
            this._canvas = document.createElement('canvas');
            this._element.appendChild(this._canvas);
            this._canvas2d = this._canvas.getContext("2d");
        }


        moveTo(x: number, y: number) {
            this._canvas2d.moveTo(x, y);
        }

        scale(sx: number, sy: number): void {
            this._canvas2d.scale(sx, sy);
        }

        rotate(degree: number): void {
            this._canvas2d.rotate(degree);
        }

        translate(x: number, y: number) {
            this._canvas2d.translate(x, y);
        }

    }
}

