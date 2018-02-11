/// <reference path="../../../base.ts" />


namespace android.test.cartesian {
    'use strict';

    import Rect = android.graphics.Rect;
    import Style = android.graphics.Style;
    import Default = android.device.Default;
    import StrokeStyle = android.graphics.StrokeStyle;
    import Canvas = android.graphics.Canvas;
    import Context = android.app.Context;

    export abstract class CartesianLayout extends BaseLayout {
        public barStyle: Style = Default.style;
        public lineStyle: StrokeStyle = Default.strokestyle;
        protected __scalePairs: { series: string[], filed: Field, scale: Scale }[];
        protected _locationCache: { key: string | number, points: any[] }[] = [];
        protected _serieslist: Series[];
        protected _stack: boolean = false;
        protected _rect: Rect = null;
        protected _encoding: Encoding;

        constructor( c:Context) {
            super(c);
        }
        convert(serieslist: Series[], encoding: Encoding, rect: Rect,canvas:Canvas): PlotShape[] {
            this.__shapelist.length = 0;
            this._serieslist = [];
            for (let ser of serieslist) {
                this._serieslist.push(ser.clone());
            }
            this._encoding = encoding;
            this._locationCache = [];
            this.__scalePairs = [];
            this._stack = encoding._stack;
            this._rect = rect;
            this.__analyseScales();
            for (let i = 0; i < this._serieslist.length; ++i) {
                this._layoutSeries(this._serieslist[i], i,canvas);
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
                                scale.rangeBounds([this._rect.left, this._rect.right]);
                            } else {
                                scale.range([this._rect.left, this._rect.right]);
                            }
                        } else {
                            scale.range([this._rect.left, this._rect.right]);
                        }
                    } else if (filed.name == 'y') {
                        if (scale instanceof OrdinalScale) {
                            if (filed.band === true) {
                                scale.rangeBounds([this._rect.bottom, this._rect.top]);
                            } else {
                                scale.range([this._rect.bottom, this._rect.top]);
                            }
                        } else {
                            let ticker: LinearTicks = LinearTicks.create(scale);
                            scale = ticker.niceScale();
                            scale.range([this._rect.bottom, this._rect.top]);
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
        protected abstract _layoutSeries(series: Series, index: number,canvas?:Canvas): void;
        
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