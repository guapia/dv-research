/// <reference path="../../../base.ts" />

namespace android.test.hierarchical {
    'use strict';


    import Rect = android.graphics.Rect;
    import Style = android.graphics.Style;
    import Default = android.device.Default;
    import StrokeStyle = android.graphics.StrokeStyle;
    import Canvas = android.graphics.Canvas;
    import Context = android.app.Context;

    export class SunburstLayout extends HierarchicalLayout {

        private __startAngle: number;
        private __sweep: number;
        private __innerRadius:number;
        private __radius:number;
        private __cx: number;
        private __cy: number;
        private __preangle: number;        
        private __radiusUnit:number;
    
        constructor(c:Context,startAngle: number, sweep: number,innerRadius) {
            super(c);
            this.__startAngle = startAngle;
            this.__innerRadius = innerRadius;
            this.__sweep = sweep;
        }

        convert(roots: Item[], encoding: Encoding, rect: Rect, canvas: Canvas): PlotShape[] {
            this._calcDeep(roots);
            this.__cx = (rect.left + rect.right)/2;
            this.__cy = (rect.top + rect.bottom)/2;
            this.__radius = rect.width<rect.height?rect.width/2:rect.height/2;
            this.__radiusUnit = (this.__radius - this.__innerRadius - this._offset) / (this._depth - 1);
            
            let a:Analysis = new Analysis(roots,this.__cx,this.__cy,this.__startAngle,this.__sweep+this.__startAngle,this.__innerRadius,this.__innerRadius+this.__radiusUnit,0,0);
            this.__calcSum(a);
            this.__preangle = a.sweep / a.sum;
            this.__layoutItems(a,canvas);
            return null;
        }

        private __layoutItems(analysis: Analysis, engine: Canvas) {
            let startAngle = analysis.startAngle;
            for (var i = 0; i < analysis.vs.length; ++i) {
                let v: Item = analysis.vs[i];
                let sweep :number= v.size.value * this.__preangle;
                var cx = analysis.cx;
                var cy = analysis.cy;
                if (analysis.depth == 0) {
                    cx = analysis.cx + this._offset * Math.cos(startAngle + sweep / 2);
                    cy = analysis.cy + this._offset * Math.sin(startAngle + sweep / 2);
                }
                var shape: SunburstShape = new SunburstShape(this.context, cx, cy,  analysis.innerRadius,analysis.radius, startAngle,sweep,Default.style,Default.strokestyle);
                shape.style.background =ColorUtils.indexColor(parseInt(v.id));
                shape.id = v.id;
                shape.text = v.text.value;
                this.__shapelist.push(shape);

                if (v.children && v.children.length > 0) {
                    let child_analysis: Analysis = new Analysis(v.children, cx, cy, startAngle, startAngle + sweep, analysis.radius, analysis.radius + this.__radiusUnit, 0, analysis.depth + 1);
                    this.__calcSum(child_analysis);
                    this.__layoutItems(child_analysis, engine);
                }
                startAngle += sweep;
            }
        }

        private __calcSum(a: Analysis): void {
            let sum: number = 0;
            for (let v of a.vs) {
                sum += ((v.size.value == null)||(isNaN(v.size.value))? 0:v.size.value);
            }
            a.sum = sum;
        }
    }
    class Analysis {
        startAngle: number;
        endAngle: number;
        radius: number;
        innerRadius: number;
        vs: Item[];
        sum: number;
        cx: number;
        cy: number;
        depth: number;
        constructor(vs: Item[], cx: number, cy: number, startAngle: number, endAngle: number, innerRadius: number, radius: number, max: number, depth: number) {
            this.vs = vs;
            this.startAngle = startAngle;
            this.endAngle = endAngle;
            this.innerRadius = innerRadius;
            this.radius = radius;
            this.sum = max;
            this.depth = depth;
            this.cx = cx;
            this.cy = cy;
        }

        get sweep() {
            return this.endAngle - this.startAngle;
        }

        get h() {
            return this.radius - this.innerRadius;
        }
    }
}