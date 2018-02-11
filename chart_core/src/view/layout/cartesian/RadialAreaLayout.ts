/// <reference path="../../../base.ts" />

namespace android.test.cartesian {

    'use strict';
    import Style = android.graphics.Style;
    import Default = android.device.Default;
    export class RadialAreaLayout extends RadialCartesianLayout {
        protected _layoutSeries(series: Series, index: number): void {
            let size = this._serieslist.length;
            let xScale: Scale = series.getScale('x');
            let yScale: Scale = series.getScale('y');
            let colorScale: Scale = series.getScale('color');
            let xs: number[] = [];
            let ys: number[] = [];
            for (let pt of series.points) {
                if (pt != null) {
                    console.log(pt);
                    let xvalue: Value = pt.x;
                    let yvalue: Value = pt.y;
                    let colorvalue: Value = pt.color;
                    let shape: Value = pt.shape;
                    let size: Value = pt.size;

                    let radius: number = xScale.getScaleValue(xvalue.value);
                    let angleValue0 = yvalue.isMultiple ? yvalue.value[0] : (yScale.min < 0 ? 0 : yScale.min);
                    let angleValue1 = yvalue.isMultiple ? yvalue.value[1] : yvalue.value;
                    let angle0 = yScale.getScaleValue(angleValue0);
                    let angle1 = yScale.getScaleValue(angleValue1);
                    // let color = colorScale.getScaleValue(colorvalue.value);

                    let x0 = this._cx + Math.cos(angle0) * radius;
                    let y0 = this._cy + Math.sin(angle0) * radius;
                    let x = this._cx + Math.cos(angle1) * radius;
                    let y = this._cy + Math.sin(angle1) * radius;

                    xs.push(x);
                    ys.push(y);
                    xs.unshift(x0);
                    ys.unshift(y0);
                }
            }
            let linesShape: AreaShape = new AreaShape(this.context,xs, ys, null, Default.strokestyle);
            linesShape.style.background = ColorUtils.indexColor(series.index);
            linesShape.id = series.id;
            this.__shapelist.push(linesShape);

        }
        protected _layoutLine() {

        }
    }
}
