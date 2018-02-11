/// <reference path="../../base.ts" />

namespace android.test.hierarchical {
    'use strict';
    import Util = android.graphics.Util;
    import Debug = android.Debug

    export class DataModel {
        private static id: number = 0;
        private __encoding: Encoding;
        // private __root:
        private __data: any;
        private __root: Item[];
        private __chartType: ChartType;
        private _analyseEncoding(encode: any): Encoding {
            return new Encoding(encode);
        }
        public get chartType(): ChartType {
            return this.__chartType;
        }

        // private __analyseTree()
        constructor(data: any) {
            DataModel.id = 0;
            this.__data = data;
            this.__chartType = Util.asEnum(data.charttype, ChartType);

            this.__encoding = this._analyseEncoding(this.__data.encoding);
            this.__createRoot();

        }
        private __createModel(data: any, depth: number): Item {
            let item: Item = new Item();
            // item._id = (++DataModel.id).toFixed();
            for (let key in this.__encoding) {

                if (key === 'children') {
                    if (item.children == null) {
                        item.children = [];
                    }
                    let _children = data[this.__encoding.children.bind];
                    if (_children != null && _children instanceof Array) {
                        for (let child of _children) {
                            item.children.push(this.__createModel(child, depth + 1));
                        }
                    }
                }else if (this.__encoding[key].bind === 'count' || this.__encoding[key].bind === 'depth') {
                    if (this.__encoding[key].bind in data) {
                        item[key] = new Value(data[this.__encoding[key].bind], null);
                    } else {
                        if (this.__encoding[key].bind == 'count') {
                            item[key] = new Value(data.children != null ? data.children.length : 1, null);
                        }else if(this.__encoding[key].bind =='depth'){
                            item.depth = new Value(depth,null);                            
                        }
                    }
                } else {
                    item[key] = new Value(data[this.__encoding[key].bind], null);
                }
            }
            // item.count = new Value(item.children.length,null);
            // item.depth = new Value(depth,null);
            return item;
        }
        private __createRoot() {
            // this.__root = this.__createModel(this.__data.values);
            this.__root = [];
            for (let item of this.__data.values) {
                this.__root.push(this.__createModel(item, 0));
            }
        }

        public refresh() {
            // do nothing
        }
        private __createScale(filed: Field): Scale {
            Debug.assert(filed != null);
            let scale: Scale = null;
            switch (filed.type) {
                case ScaleType.Linear:
                    scale = new LinearScale(filed.name);
                    break;
                case ScaleType.Ordinal:
                    scale = new OrdinalScale(filed.name);
                    break;
                default:
                    Debug.assert(false, filed.type + " ScaleType has not been implement!");
                    break;
            }
            return scale;
        }


        public get root(): Item[] {
            return this.__root;
        }
        public get encoding(): Encoding {
            return this.__encoding;
        }
    }
}