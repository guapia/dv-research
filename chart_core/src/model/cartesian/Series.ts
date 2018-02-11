/// <reference path="../../base.ts" />

namespace android.test.cartesian {
    'use strict';
    import Util = android.graphics.Util;
    import Debug = android.Debug
    export class Series {
        private __name: string;
        private __index: number;
        private __data: any[];
        private __encoding: Encoding;
        private __pairs: { filed: Field, scale: Scale }[];
        private __points: Item[] = [];
        private __chartType: ChartType = ChartType.Bar;
        public enable: boolean = true;
        public showlabels: boolean = false;
        public get id():string{
            return Util.HashCode(this.__name);
        }
        constructor(encoding: Encoding, series: any, index: number) {
            Debug.assert(encoding != null);
            Debug.assert(series != null);
            Debug.assert(series.data instanceof Array, "Series must be Array");
            this.__data = series.data;
            this.__name = series.name;
            this.__index = index;
            this.__chartType = Util.asEnum(series.charttype, ChartType);
            this.__encoding = encoding;
            this.__pairs = [];
            for (let key in this.__encoding) {
                if (Utility.iskey(key)) {
                    let filed: Field = this.__encoding[key];
                    let scale: Scale = this.__createScale(filed);
                    this.__pairs.push({ filed: filed, scale: scale});
                }
            }
            for (let item of this.__data) {
                this.__points.push(this.__analyseItem(this.__pairs, item));
            }
            for (let pair of this.__pairs) {
                let filed: Field = pair.filed;
                let scale: Scale = pair.scale;
                if (filed.name != 'x' && filed.name != 'y' && filed.range != null && filed.range.length > 0) {

                    if (scale instanceof LinearScale) {
                        scale.range(filed.range);
                    } else if (scale instanceof LogScale) {
                        scale.range(filed.range);
                    } else if (scale instanceof OrdinalScale) {
                        if (filed.band === true) {
                            scale.rangeBounds(filed.range);
                        } else {
                            scale.range(filed.range);
                        }
                    }
                }
                scale.refresh();
            }
        }

        private __analyseItem(pairs: { filed: Field, scale: Scale }[], item: any): Item {
            Debug.assert(item != null);
            Debug.assert(typeof item == 'object');
            let values: Item = new Item();
            Debug.assert(!(item instanceof Array));
            values.group = new Value(this.__name,ScaleType.Ordinal);
            for (let pair of pairs) {
                let filed: Field = pair.filed;
                let scale: Scale = pair.scale;
                let value: Value = null;
                if (filed.bind instanceof Array) {
                    value = new Value([item[filed.bind[0]], item[filed.bind[1]]], filed.type);
                } else {
                    value = new Value(item[filed.bind], filed.type);
                }
                values[filed.name] = value;
                if (typeof (filed.bind) == 'string') {
                    if (scale instanceof LinearScale) {
                        let max: number = Utility.max([item[filed.bind], scale.max]);
                        let min: number = Utility.min([item[filed.bind], scale.min]);
                        scale.domain([min, max]);
                    } else if (scale instanceof LogScale) {
                        let max: number = Utility.max([item[filed.bind], scale.max]);
                        let min: number = Utility.min([item[filed.bind], scale.min]);
                        scale.domain([min, max]);

                    }
                    else if (scale instanceof OrdinalScale) {
                        // if(scale.domains.indexOf(item[filed.bind]) < 0){
                            scale.domains.push(item[filed.bind]);
                        // }
                    }
                } else if (filed.isMultiple) {
                    if (scale instanceof map.MapOrdinalScale) {
                        // if (value.isMultiple) {
                        //     for (let v of value.value) {
                        //         scale.domains.push(v);
                        //     }
                        // } else {
                            scale.domains.push(value.value);
                        // }
                    }
                }



            }
            return values;
        }

        public _refresh() {
            for (let pair of this.__pairs) {
                pair.scale.domain([]);
            }
            for (let pt of this.__points) {
                for (let pair of this.__pairs) {
                    let filed: Field = pair.filed;
                    let scale: Scale = pair.scale;
                    if (scale instanceof LinearScale) {
                        let value = pt[filed.name];
                        let max: number = Utility.max(value.isMultiple ? value.value.concat([scale.max]) : [value.value, scale.max]);
                        let min: number = Utility.min(value.isMultiple ? value.value.concat([scale.min]) : [value.value, scale.min]);
                        scale.domain([min, max]);
                    } else if (scale instanceof LogScale) {

                        let value = pt[filed.name];
                        let max: number = Utility.max(value.isMultiple ? value.value.concat([scale.max]) : [value.value, scale.max]);
                        let min: number = Utility.min(value.isMultiple ? value.value.concat([scale.min]) : [value.value, scale.min]);
                        scale.domain([min, max]);
                    } else if (scale instanceof OrdinalScale) {
                        let value = pt[filed.name];
                        if (value.isMultiple) {
                            for (let v of value.value) {
                                scale.domains.push(v);
                            }
                        } else {
                            scale.domains.push(value.value);
                        }
                    } 
                    else if (scale instanceof map.MapOrdinalScale) {
                        let value = pt[filed.name];
                        if (value.isMultiple) {
                            for (let v of value.value) {
                                scale.domains.push(v);
                            }
                        } else {
                            scale.domains.push(value.value);
                        }
                    }
                }
            }
        }
        private __createScale(filed: Field):Scale{
            Debug.assert(filed != null);

            let scale: Scale = null;
            switch (filed.type) {
                case ScaleType.Linear:
                    scale = new LinearScale(filed.name);
                    break;
                case ScaleType.Ordinal:
                    scale = new OrdinalScale(filed.name);

                    break;
                case ScaleType.Log:
                    scale = new LogScale(filed.logBase, filed.name);
                    break;
                case ScaleType.LatLon:
                    scale = new map.MapOrdinalScale(filed.name);
                    break;
                default:
                    Debug.assert(false, filed.type + " ScaleType has not been implement!");
                    break;
            }
            return scale;
        }



        get data(): any[] {
            return this.__data;
        }

        get name(): string {
            return this.__name;
        }

        get scalePairs(): { filed: Field, scale: Scale }[] {
            return this.__pairs;
        }

        get points(): Item[] {
            return this.__points;
        }
        get size(): number {
            return this.__points.length;
        }
        get chartType(): ChartType {
            return this.__chartType;
        }

        get index(): number {
            return this.__index;
        }

        getScale(name: string): Scale {
            let index = _.findIndex(this.__pairs, function (item) {
                return item.filed.name == name;
            });
            if (index >= 0) {

                return this.__pairs[index].scale;
            }
            return null;
        }

        public clone(): Series {
            let series = _.cloneDeep(this);
            return series;
        }
    }
}