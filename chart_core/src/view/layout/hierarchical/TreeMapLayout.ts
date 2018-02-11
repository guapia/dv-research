/// <reference path="../../../base.ts" />

namespace android.test.hierarchical {
    'use strict';

    import Rect = android.graphics.Rect;
    import Style = android.graphics.Style;
    import Default = android.device.Default;
    import StrokeStyle = android.graphics.StrokeStyle;
    import Canvas = android.graphics.Canvas;
    import Utility = android.test.Utility;
    import Util = android.graphics.Util;
    import View = android.view.View;
    import ViewState = android.view.ViewState;
    import Context = android.app.Context;
    export class TreeMapLayout extends HierarchicalLayout {
        protected _limited: number = 500;
        constructor(c:Context,rect: Rect) {
            super(c);
            this._rect = rect;
        }
        convert(roots: Item[], encoding: Encoding, rect: Rect, canvas: Canvas): PlotShape[] {

            this.__shapelist = [];
            this._calcDeep(roots);
            let a: Analysis = new Analysis(roots, rect.left, rect.top, rect.right, rect.bottom, 0, 0);
            this.__calcSum(a);
            this.__hideSmallNode(a);
            this.__layoutItems(a, canvas);
            return this.__shapelist;
        }
        private __hideSmallNode(a: Analysis): void {
            if (a != null && a.vs != null && a.vs.length > 0) {
                let preSize = a.area / a.sum;
                a.vs.sort((a, b) => a.size.value - b.size.value);
                let length: number = a.vs.length;
                for (let v of a.vs) {
                    if (v.size.value * preSize < this._limited) {
                        v._hidden = true;
                        a.sum -= v.size.value;
                        preSize = a.area / a.sum;
                    }
                }
            }
        }

        private __calcSum(a: Analysis): void {
            let sum: number = 0;
            for (let v of a.vs) {
                sum += v.size.value;
            }
            a.sum = sum;
        }
        private __layoutItems(analysis: Analysis, canvas: Canvas): void {
            if (analysis.sum <= 0) { return; }
            let total_rectLast: Rect = new Rect(analysis.l, analysis.t, analysis.r, analysis.b);
            let preSize = analysis.area / analysis.sum;

            analysis.vs.sort((a, b) => b.size.value - a.size.value);
            let rate = 1;
            for (let i = 0; i < analysis.vs.length && !total_rectLast.isNil;) {
                let rects: Rect[] = this.__locationRects(analysis.vs, i, preSize, total_rectLast);
                let cliprect: Rect = Util.union(...rects);
                total_rectLast = this.__clipRect(cliprect, total_rectLast);
                for (let j = 0; j < rects.length; ++j) {
                    let rect: Rect = rects[j];
                    // if (Util.isMixed(rect, this._rect)) {
                        let v: Item = analysis.vs[i];
                        let shape: CubeShape = new CubeShape(this.context,rect.left, rect.top, rect.width, rect.height, Default.style, Default.strokestyle);
                        shape.visiable = ViewState.Visiable;
                        shape.style.background =ColorUtils.indexColor(parseInt(v.id));
                        shape.id = v.id;
                        shape.text = v.text.value;
                        // shape.onDraw(canvas);
                        if (v._hidden) { i++; continue; }
                        if (v.children && v.children.length > 0) {
                            let offset: number = 0;
                            if (!isNaN(this._offset) && this._offset > 0) {
                                offset = (this._depth - analysis.depth) / this._depth * this._offset;
                            }
                            rect = new Rect(rect.left + offset, rect.top + offset, rect.right - offset, rect.bottom - offset);
                            let child_analysis = new Analysis(v.children, rect.left, rect.top, rect.left + rect.width, rect.top + rect.height, v.size.value, analysis.depth + 1);

                            this.__calcSum(child_analysis);
                            this.__hideSmallNode(child_analysis);
                            if (child_analysis.sum > 0) {
                                shape.visiable = ViewState.InVisiable;
                                this.__layoutItems(child_analysis, canvas);
                            }
                        }

                        this.__shapelist.push(shape);

                    // }
                    ++i;
                    continue;
                }
            }

        }


        private __locationRects(vs: Item[], index: number, preSize: number, rect: Rect): Rect[] {
            let resultRect: Rect[] = [];
            let lastRate: number = 0;
            let lastSize: number = 0;
            let lastW, lastH: number = 0;
            for (let i = index; i < vs.length; ++i) {
                let v = vs[i];
                let w, h = 0;
                let vw, vh = 0;
                if (v.size.value < 0) {
                    vs.splice(i, 1);
                    v = vs[i];
                }
                if (rect.height < rect.width) {
                    lastSize += v.size.value;
                    vw = w = (lastSize * preSize) / rect.height;
                    vh = (vs[index].size.value * preSize) / vw;
                    if (lastRate != 0) {
                        let tmpRate = vh > vw ? vh / vw : vw / vh;
                        if (Math.abs(tmpRate - 1) < Math.abs(lastRate - 1)) {
                            lastRate = tmpRate;
                            resultRect.length = 0;
                        } else {
                            return resultRect;
                        }
                    } else {
                        lastRate = vh > vw ? vh / vw : vw / vh;
                    }
                    resultRect.length = 0;
                    for (let j = index; j <= i; j++) {
                        let r: Rect;
                        let currentH = vs[j].size.value * preSize / vw;
                        if (j === index) {
                            r = new Rect(rect.left, rect.top, rect.left + vw, rect.top + vh);
                        } else {
                            r = new Rect(resultRect[j - index - 1].left, resultRect[j - index - 1].bottom, resultRect[j - index - 1].left + vw, currentH + resultRect[j - index - 1].bottom);
                        }
                        resultRect.push(r);
                    }
                } else {
                    lastSize += v.size.value;
                    vh = h = (lastSize * preSize) / rect.width;
                    vw = (vs[index].size.value * preSize) / vh;

                    if (lastRate != 0) {
                        let tmpRate = vh > vw ? vh / vw : vw / vh;

                        if (Math.abs(tmpRate - 1) < Math.abs(lastRate - 1)) {
                            lastRate = tmpRate;
                            resultRect.length = 0;
                        } else {
                            return resultRect;
                        }
                    } else {
                        lastRate = vh > vw ? vh / vw : vw / vh;
                    }
                    resultRect.length = 0;
                    for (let j = index; j <= i; j++) {
                        let r: Rect;
                        let currentW = vs[j].size.value * preSize / vh;
                        if (j === index) {
                            r = new Rect(rect.left, rect.top, rect.left + vw, rect.top + vh);
                        } else {
                            r = new Rect(resultRect[j - index - 1].right, resultRect[j - index - 1].top, resultRect[j - index - 1].right + currentW, resultRect[j - index - 1].top + vh);
                        }
                        resultRect.push(r);
                    }
                }
                lastW = vw;
                lastH = vh;
            }
            return resultRect;
        }
        private __clipRect(r: Rect, recttotal: Rect): Rect {
            let rect = null;
            if (Math.abs(r.width - recttotal.width) <= 0.0001) {
                rect = new Rect(r.left, r.bottom, r.right, recttotal.bottom);
            } else {
                rect = new Rect(r.right, r.top, recttotal.right, r.bottom);
            }
            return rect;
        }


    }

    class Analysis {
        l: number;
        t: number;
        r: number;
        b: number;
        vs: Item[];
        sum: number;

        depth: number;
        constructor(vs: Item[], l: number, t: number, r: number, b: number, max: number, depth: number) {
            this.vs = vs;
            this.l = l;
            this.t = t;
            this.r = r;
            this.b = b;
            this.sum = max;
            this.depth = depth;
        }

        get w() {
            return this.r - this.l;
        }

        get h() {
            return this.b - this.t;
        }

        get area() {
            return this.w * this.h;
        }
    }
}