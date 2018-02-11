/// <reference path="../../base.ts" />

namespace android.test.map {
    'use strict';
    import Util = android.graphics.Util;
    import Series = android.test.cartesian.Series;
    import Field = android.test.cartesian.Field;
    import Filter = android.test.cartesian.Filter;
    import Value = android.test.cartesian.Value;
    import Encoding = android.test.cartesian.Encoding;
    import Point = android.graphics.Point;
    export class DataModel {
        private static id: number = 0;

        private __data: any;
        private __encoding: Encoding;
        private __filter: Filter;

        private __series: Series[];
        private __allSeries: Series[];
        private __chartTypes: ChartType[] = [];
        private __config: Config
        protected __scalePairs: { series: string[], filed: Field, scale: Scale }[];
        public featureList: Feature[];
        public projection: Projection;

        constructor(data: any) {
            DataModel.id = 0;
            this.__data = data;
            this.projection = new MercatorProjection();
            if (data.config != null) {
                this.__config = new Config(data.config);
                if (this.__config.center != null) {
                    this.projection.center(this.__config.center.x, this.__config.center.y);
                }
                if(this.__config.translate != null){
                    this.projection.translate(this.__config.translate.x,this.__config.translate.y);
                }
                if (this.__config.scale != null) {
                    this.projection.scale(this.__config.scale);
                }
            }
            this.__encoding = this._analyseEncoding(this.__data.encoding);
            this._analyseFilter(data.filter);
            this.refresh();
        }


        get config():Config{
            return this.__config;
        }

        private _analyseEncoding(encode: any): Encoding {
            return new Encoding(encode);
        }

        refresh(): void {
            DataModel.id = 0;
            this.__analyseGeoData(this.__data.geo);
            this._analyseSeries(this.__data.series, this.__encoding);
            this._createLayoutScales(this.__encoding);
        }

        public get chartTypes(): ChartType[] {
            return this.__chartTypes;
        }

        private _analyseSeries(series_data: any, encoding: Encoding): void {
            this.__series = [];
            this.__allSeries = [];
            for (let i = 0; i < series_data.length; ++i) {
                let seriesitem = series_data[i];
                let ser: Series = new Series(encoding, seriesitem, i);
                if (this.__filter != null && this.__filter.series.indexOf(seriesitem.name) > -1) {
                    ser.enable = true;
                    this.__series.push(ser);
                    if (this.__chartTypes.indexOf(ser.chartType) < 0) {
                        this.__chartTypes.push(ser.chartType);
                    }
                } else {
                    ser.enable = false;
                }
                this.__allSeries.push(ser);
            }

        }

        private _analyseFilter(filter: any) {
            if (filter != null && filter.series != null && filter.rules != null) {
                this.__filter = new Filter(filter.series, filter.rules);
            }
        }

        private __analyseGeoData(geodata: any) {
            this.projection.begin();
            let type: GeoType = Util.asEnum(geodata.type, GeoType, true);
            this.featureList = [];

            if (type == GeoType.FeatureCollection) {
                let features = geodata.features;
                if (features != null && features instanceof Array) {
                    for (let feature of features) {
                        let f: Feature = new Feature();
                        f.id = (++DataModel.id).toFixed();
                        if (this.projection != null) {
                            f.projection = this.projection;
                        }
                        f.parseFeature(feature);
                        this.featureList.push(f);
                    }
                }
            }

            this.projection.end();
        }



        private _createLayoutScales(encoding: Encoding) {
            this.__scalePairs = [];

            if (this.__series.length > 1) {

                for (let i = 0; i < this.__series.length - 1; ++i) {
                    let series: Series = this.__series[i];
                    let next_series: Series = this.__series[i + 1];

                    for (let pairA of series.scalePairs) {
                        for (let pairB of next_series.scalePairs) {
                            if (pairA.filed.equals(pairB.filed)) {
                                let filed = pairA.filed;
                                let force: boolean = true;
                                let infoA: { series: string[], filed: Field, scale: Scale } = this.__getScaleInfobyname(pairA.filed.name, series.name);
                                let infoB: { series: string[], filed: Field, scale: Scale } = this.__getScaleInfobyname(pairB.filed.name, next_series.name);

                                if (infoA == null && infoB == null) {
                                    let scale = Utility.mergeScale(pairA.scale, pairB.scale, force);
                                    if (scale != null) {
                                        this.__scalePairs.push({ series: [series.name, next_series.name], filed: filed, scale: scale });
                                    } else {
                                        this.__scalePairs.push({ series: [series.name], filed: pairA.filed, scale: pairA.scale });
                                        this.__scalePairs.push({ series: [next_series.name], filed: pairB.filed, scale: pairB.scale });
                                    }
                                } else if (infoA == null && infoB != null) {
                                    let scale = Utility.mergeScale(pairA.scale, infoB.scale, force);
                                    if (scale != null) {
                                        infoB.scale = scale;
                                        infoB.series.push(series.name);
                                    }
                                } else if (infoA != null && infoB == null) {
                                    let scale = Utility.mergeScale(pairB.scale, infoA.scale, force);
                                    if (scale != null) {
                                        infoA.scale = scale;
                                        infoA.series.push(next_series.name);
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
            // this.nameScale.ranges
            let namescale: MapOrdinalScale = this.nameScale;
            if (namescale != null && namescale.domains != null) {
                namescale.domains.map((pt: Point) => {
                    if (pt instanceof Point) {
                        return this.projection.lonLat2xy(pt.x, pt.y);
                    } else {
                        return pt;
                    }
                });
            }
        }
        get nameScale(): MapOrdinalScale {
            let scale: Scale = _.result(_.find(this.__scalePairs, (item: { series: string[], filed: Field, scale: Scale }) => {
                return 'geoposition' == item.filed.name;
            }), "scale");
            if (scale instanceof MapOrdinalScale) {
                return scale;
            } else {
                return null;
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


        getSeriesByType(charttype: ChartType): Series[] {
            let series: Series[] = _.filter(this.__series, (ser) => { return ser.chartType === charttype; });
            return series;
        }

        get series(): Series[] {
            return this.__series;
        }
        get allSeries(): Series[] {
            return this.__allSeries;
        }
        get encoding(): Encoding {
            return this.__encoding;
        }
        get filter(): Filter {
            return this.__filter;
        }

        get scalePairs(): { series: string[], filed: Field, scale: Scale }[] {
            return this.__scalePairs;
        }
    }
}