/// <reference path="../../../base.ts" />

namespace android.test.map.relation {
    'use strict';
    import Util = android.graphics.Util;
    import Field = android.test.cartesian.Field;
    import Value = android.test.cartesian.Value;
    import Encoding = android.test.map.relation.Encoding;
    import Point = android.graphics.Point;
    export class Item {
        start: Point;
        end: Point;
        value: any;
    }
    export class DataModel {
        private static id: number = 0;

        private __data: any;
        private __encoding: Encoding;

        private __chartTypes: ChartType[] = [];
        private __config: Config
        protected __scalePairs: { filed: Field, scale: Scale }[];
        public featureList: Feature[];
        public projection: Projection;
        private _points: Item[];
        get points(): Item[] {
            return this._points;
        }
        get config():Config{
            return this.__config;
        }


        constructor(data: any) {
            this._points = [];
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
            this.refresh();
        }

        private _analysePathValue(data_arr: any[]) {

            for (let point of data_arr) {
                let item: Item = new Item();
                // for(let key in this.__encoding){
                //     item[key]
                // }
                item.start= this.projection.lonLat2xy(point.start.longitude,point.start.latitude)
                item.end = this.projection.lonLat2xy(point.end.longitude,point.end.latitude)
                
                item.value = point;
                this._points.push(item);
            }
        }

        private _analyseEncoding(encode: any): Encoding {
            return new Encoding(encode);
        }

        refresh(): void {
            DataModel.id = 0; this.projection.begin();
            this.__analyseGeoData(this.__data.geo);
            this._analysePathValue(this.__data.values);
            this.projection.end();

        }

        public get chartTypes(): ChartType[] {
            return this.__chartTypes;
        }

        private __analyseGeoData(geodata: any) {
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

        }

        get encoding(): Encoding {
            return this.__encoding;
        }

        get scalePairs(): { filed: Field, scale: Scale }[] {
            return this.__scalePairs;
        }
    }
}