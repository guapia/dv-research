/// <reference path="../../base.ts" />


namespace android.test.cartesian {
    'use strict';
    export class DataModel {

        private __encoding: Encoding;
        private __filter: Filter;
        private __data:any;
        
        private __series: Series[];
        // private __helpSeries:Series[];
        private __allSeries:Series[];
        private __chartTypes: ChartType[] = [];
        protected __scalePairs: { series: string[], filed: Field, scale: Scale }[];
        private _analyseEncoding(encode: any): Encoding {
            return new Encoding(encode);
        }

        public get chartTypes(): ChartType[] {
            return this.__chartTypes;
        }

        private _analyseSeries(series_data: any, encoding: Encoding): void {
            this.__series =[];
            this.__allSeries =[];
            for (let i = 0; i < series_data.length; ++i) {
                let seriesitem = series_data[i];
                let ser: Series = new Series(encoding, seriesitem, i);
                if(this.__filter != null && this.__filter.series.indexOf(seriesitem.name)>-1){
                    ser.enable = true;
                    this.__series.push(ser);
                    if (this.__chartTypes.indexOf(ser.chartType) < 0) {
                        this.__chartTypes.push(ser.chartType);
                    }
                }else{
                    ser.enable =false;
                }
                this.__allSeries.push(ser);
            }

        }

        constructor(data: any) {
            this.__data = data;

            this.__encoding = this._analyseEncoding(this.__data.encoding);
            this._analyseFilter(data.filter);
            this.refresh();

        }
        public refresh(){
            this._analyseSeries(this.__data.series, this.__encoding);
            this._createLayoutScales(this.encoding);
        }

        private _analyseFilter(filter: any) {
            if (filter != null) {
                this.__filter = new Filter( filter.series,filter.rules);
            }
        }

        private _createLayoutScales(encoding: Encoding) {
            this.__scalePairs = [];

            if (this.__series.length > 1) {
                this._stack(ChartType.Bar);
                this._stack(ChartType.Line);
                this._stack(ChartType.Area);
                this._stack(ChartType.Scatter);
                for (let i = 0; i < this.__series.length - 1; ++i) {
                    let series: Series = this.__series[i];
                    let next_series: Series = this.__series[i + 1];

                    for (let pairA of series.scalePairs) {
                        for (let pairB of next_series.scalePairs) {
                            if (pairA.filed.equals(pairB.filed)) {
                                let filed = pairA.filed;
                                let force :boolean = this.encoding._stack && pairA.filed.name =='y';                                
                                let infoA: { series: string[], filed: Field, scale: Scale } = this.__getScaleInfobyname(pairA.filed.name, series.name);
                                let infoB: { series: string[], filed: Field, scale: Scale } = this.__getScaleInfobyname(pairB.filed.name, next_series.name);

                                if (infoA == null && infoB == null) {
                                    let scale = Utility.mergeScale(pairA.scale, pairB.scale,force);
                                    if (scale != null) {
                                        this.__scalePairs.push({ series: [series.name, next_series.name], filed: filed, scale: scale });
                                    } else {
                                        this.__scalePairs.push({ series: [series.name], filed: pairA.filed, scale: pairA.scale });
                                        this.__scalePairs.push({ series: [next_series.name], filed: pairB.filed, scale: pairB.scale });
                                    }
                                } else if (infoA == null && infoB != null) {
                                    let scale = Utility.mergeScale(pairA.scale, infoB.scale,force);
                                    if (scale != null) {
                                        infoB.scale = scale;
                                        infoB.series.push(series.name);
                                    } else {
                                        this.__scalePairs.push({ series: [series.name], filed: pairA.filed, scale: pairA.scale });
                                    }
                                } else if (infoA != null && infoB == null) {
                                    let scale = Utility.mergeScale(pairB.scale, infoA.scale,force);
                                    if (scale != null) {
                                        infoA.scale = scale;
                                        infoA.series.push(next_series.name);
                                    } else {
                                        this.__scalePairs.push({ series: [next_series.name], filed: pairB.filed, scale: pairB.scale });
                                    }
                                }
                            }
                        }
                    }
                }
                for (let ser of this.__series) {
                    for (let pair of ser.scalePairs) {
                        let scale = this._getScaleByName(pair.filed.name, ser.name);
                        if (scale != null) {
                            pair.scale = scale;
                        }
                    }
                }

            } else if (this.__series.length == 1) {
                for (let pair of this.__series[0].scalePairs) {
                    this.__scalePairs.push({ series: [this.__series[0].name], filed: pair.filed, scale: pair.scale.clone() });
                }
            }
        }
        private _stack(chartType: ChartType) {
            if (this.encoding._stack) {
                let negative: any = {};
                let positive: any = {};

                for (let i = 0; i < this.series.length; ++i) {
                    let serA = this.series[i];
                    if (serA.chartType === chartType) {
                        this._setSeriesStack(serA, positive, negative);
                    }
                }
            }
        }

        private __getScaleInfobyname(filedname: string, seriesname: string): { series: string[], filed: Field, scale: Scale } {
            let info: { series: string[], filed: Field, scale: Scale } = _.find(this.__scalePairs, (item: { series: string[], filed: Field, scale: Scale }) => {
                return item.series.indexOf(seriesname) >= 0 && filedname == item.filed.name;
            });
            return info;
        }

        public _getScaleByName(filedname: string, seriesname: string): Scale {
            return _.result(_.find(this.__scalePairs, (item: { series: string[], filed: Field, scale: Scale }) => {
                return item.series.indexOf(seriesname) >= 0 && filedname == item.filed.name;
            }), "scale");
        }

        private _setSeriesStack(series: Series, pos: any, neg: any) {
            let scaleX_A: Scale = series.getScale('x');

            if (scaleX_A instanceof OrdinalScale) {
                for (let pt of series.points) {
                    let negvalue: number = neg[pt.x.value];
                    let posvalue: number = pos[pt.x.value];
                    if (negvalue == null) { negvalue = 0; neg[pt.x.value] = 0; }
                    if (posvalue == null) { posvalue = 0; pos[pt.x.value] = 0; }

                    let isNeg: boolean = pt.y.value < 0;
                    let startY: number = isNeg ? negvalue : posvalue;
                    let endY: number = startY + pt.y.value;
                    isNeg ? neg[pt.x.value] = endY : pos[pt.x.value] = endY;
                    // targetPoint.y = new Value([startY, endY], targetPoint.y.scaleType);
                    // seriesB.points[index] = targetPoint;
                    pt.y = new Value([startY, endY], pt.y.scaleType);
                }
            }
            series._refresh();
        }

        getSeriesByType(charttype: ChartType): Series[] {
            let series: Series[] = _.filter(this.__series, (ser) => { return ser.chartType === charttype; });
            return series;
        }

        get series(): Series[] {
            return this.__series;
        }
        get allSeries():Series[]{
            return this.__allSeries;
        }
        get encoding(): Encoding {
            return this.__encoding;
        }
        get filter():Filter{
            return this.__filter;
        }

        get scalePairs(): { series: string[], filed: Field, scale: Scale }[] {
            return this.__scalePairs;
        }
    }
}