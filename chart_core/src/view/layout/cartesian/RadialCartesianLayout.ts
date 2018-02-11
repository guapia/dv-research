/// <reference path="../../../base.ts" />


namespace android.test.cartesian{
    'use strict';
    import Context = android.app.Context;

    import Rect = android.graphics.Rect;
    import Style = android.graphics.Style;
    import Default = android.device.Default;
    import StrokeStyle = android.graphics.StrokeStyle;
    export abstract class RadialCartesianLayout extends BaseLayout {
        public barStyle: Style = Default.style;
        public lineStyle: StrokeStyle = Default.strokestyle;
        protected __scalePairs: { series: string[], filed: Field, scale: Scale }[];
        protected _locationCache: { key: string | number, points: any[] }[] = [];
        protected _serieslist: Series[];
        protected _stack: boolean = false;
        protected _encoding: Encoding;
        protected _cx: number;
        protected _cy: number;
        protected _innerRadius: number;
        protected _radius: number;
        protected _startAngle: number;
        protected _endAngle: number;
        constructor(context:Context) {
            super(context);
        }
        convert(serieslist: Series[], encoding: Encoding, cx: number, cy: number, innerRadius: number, radius: number, startAngle: number, endAngle: number): PlotShape[] {
            this.__shapelist.length = 0;
            this._serieslist = [];
            for (let ser of serieslist) {
                this._serieslist.push(ser.clone());
            }
            this._encoding = encoding;
            this._locationCache = [];
            this.__scalePairs = [];
            this._stack = encoding._stack;
            this._cx = cx;
            this._cy = cy;
            this._innerRadius = innerRadius;
            this._radius = radius;
            this._startAngle = startAngle;
            this._endAngle = endAngle;
            this.__analyseScales();
            for (let i = 0; i < this._serieslist.length; ++i) {
                this._layoutSeries(this._serieslist[i], i);
            }
            return this.__shapelist;
        }

        private __analyseScales() {
            this._createLayoutScales(this._encoding);

            for (let ser of this._serieslist) {
                for (let scalepair of ser.scalePairs) {
                    let filed: Field = scalepair.filed;
                    let scale: Scale = scalepair.scale;
                    if (filed.name == 'x') {
                        if (scale instanceof OrdinalScale) {
                            if (filed.band === true) {
                                scale.rangeBounds([this._innerRadius, this._radius]);
                            } else {
                                scale.range([this._innerRadius, this._radius]);
                            }
                        } else {
                            scale.range([this._innerRadius, this._radius]);
                        }
                    } else if (filed.name == 'y') {
                        if (scale instanceof OrdinalScale) {
                            if (filed.band === true) {
                                scale.rangeBounds([this._startAngle, this._endAngle]);
                            } else {
                                scale.range([this._startAngle, this._endAngle]);
                            }
                        } else {
                            let ticker: LinearTicks = LinearTicks.create(scale);
                            scale = ticker.niceScale();
                            scale.range([this._startAngle, this._endAngle]);
                        }
                    }
                }
            }


        }


        private _createLayoutScales(encoding: Encoding) {
            if (this._serieslist.length > 1) {
                for (let i = 0; i < this._serieslist.length; ++i) {
                    let series: Series = this._serieslist[i];
                    for (let pair of series.scalePairs) {
                        let filed: Field = pair.filed;
                        let hasadded: boolean = false;
                        for (let p of this.__scalePairs) {
                            if (!p.filed.equals(filed) || !p.scale.equal(pair.scale)) {
                                continue;
                            } else {
                                hasadded = true;
                                p.series.push(series.name);
                                break;
                            }
                        }
                        if (!hasadded) {
                            this.__scalePairs.push({ series: [series.name], filed: filed, scale: pair.scale });
                        }
                    }
                }
            } else if (this._serieslist.length == 1) {
                // this.__scalePairs = this._serieslist[0].scalePairs;
                let series: Series = this._serieslist[0];
                // this.__scalePairs.push({series:[series.name], filed: series.filed, scale: pair.scale });
                for (let pair of series.scalePairs) {
                    this.__scalePairs.push({ series: [series.name], filed: pair.filed, scale: pair.scale });
                }
            }
        }

        get maxSeriesSize(): number {
            let xscale = this._getScale('x');
            if (xscale instanceof OrdinalScale) {
                return xscale.domains.length;
            } else {
                return Utility.max(this._serieslist.map((ser: Series, index: number, array: Series[]) => { return ser.size; }));
            }
        }
        protected abstract _layoutSeries(series: Series, index: number): void;

        // protected _preAnalyseSeries() {
        //     for (let ser of this._serieslist) {
        //         for (let pt of ser.points) {
        //             let xvalue = pt.x;
        //             let index = _.findIndex(this._locationCache, 'key', xvalue.value);
        //             if (index > 0) {
        //                 if (this._locationCache[index] != null) {
        //                     this._locationCache[index].points.push(pt);
        //                 } else {
        //                     this._locationCache.push({ key: xvalue.value, points: [pt] });
        //                 }
        //             }
        //         }
        //     }
        // }
        get scalePairs(): { series: string[], filed: Field, scale: Scale }[] {
            return this.__scalePairs;
        }
        private _getScale(name: string): Scale {
            let index = _.findIndex(this.__scalePairs, function (item) {
                return item.filed.name == name;
            });
            return this.__scalePairs[index].scale;
        }

    }
}