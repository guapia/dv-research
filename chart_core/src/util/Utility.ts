/// <reference path="./../base.ts" />

namespace android.test {
    'use strict';
    import Point = android.graphics.Point;
    import Rect = android.graphics.Rect;
    import Util = android.graphics.Util;
    export class Utility {
        static max(arr: number[]) {
            var vs = [];
            for (let v of arr) {
                if (!isNaN(v) && v != null) {
                    vs.push(v);
                }
            }
            return Math.max.apply(this, vs);
        }
        static min(arr: number[]) {
            var vs = [];
            for (let v of arr) {
                if (!isNaN(v) && v != null) {
                    vs.push(v);
                }
            }
            return Math.min.apply(this, vs);
        }
        static iskey(key: any) {
            return key !== undefined && key !== null && typeof (key) == 'string' && key[0] != '_';
        }

        static checkArrayType(arr: any[]): boolean {
            Debug.assert(arr != null);
            Debug.assert(arr.length > 0);
            let type = typeof arr[0];
            for (let v of arr) {
                if (type != typeof v) {
                    return false;
                }
            }
            return true;
        }
        static getType(v: any): DataType {
            let datatype: DataType = null;
            if (v instanceof Array) {
                Debug.assert(v != null);
                Debug.assert(v.length > 0);
                datatype = DataType.Array;
                if (Utility.checkArrayType(v)) {
                    return Utility.getType(v[0]);
                }
            } else if (typeof v == 'number') {
                datatype = DataType.Number;
            } else if (typeof v == 'string') {
                datatype = DataType.String;
            } else if (typeof v == 'boolean') {
                datatype = DataType.Boolean;
            } else {
                Debug.assert(true, "Value can't be Object except Array");
            }
            return datatype;
        }

        public static mergeScale(scaleA: Scale, scaleB: Scale, force: boolean = false) {
            let scale: Scale = null;
            if (scaleA.id == scaleB.id) {
                if (scaleA instanceof OrdinalScale && scaleB instanceof OrdinalScale) {
                    let domainunions: string[] = _.union(scaleA.domains, scaleB.domains);
                    if (force || (scaleA.domains.length / domainunions.length > 0.5 && scaleB.domains.length / domainunions.length > 0.5)) {
                        scale = scaleA.clone();
                        scale.domain(domainunions);
                    }
                } else if ((scaleA instanceof LinearScale && scaleB instanceof LinearScale)) {

                    let min: number = Math.min(scaleA.min, scaleB.min);
                    let max: number = Math.max(scaleA.max, scaleB.max);
                    let rate1: number = Math.abs(max - min) / (Math.abs(scaleA.max - scaleA.min));
                    let rate2: number = Math.abs(max - min) / (Math.abs(scaleB.max - scaleB.min));

                    console.log("Linear range rate1 = " + rate1 + " , rate2 = " + rate2);
                    if (force || (rate1 < 10 && rate2 < 10)) {
                        scale = scaleA.clone();
                        scale.domain([min, max]);
                    }
                } else if (scaleA instanceof LogScale && scaleB instanceof LogScale) {
                    if (scaleA.logBase == scaleB.logBase) {
                        scale = scaleA.clone();
                        scale.domain([Math.min(scaleA.min, scaleB.min), Math.max(scaleA.max, scaleB.max)]);
                    }
                }
            }
            return scale;
        }

        static isMixedRotatedRect(r1: RotateRect, r2: RotateRect) {
            var ismixed: boolean = false;
            if (r1.angle == r2.angle) {
                for (let pt of r1.points) {
                    if (Util.IsPointInPolygon(pt, r2.points)) {
                        ismixed = true;
                        break;
                    }
                }
            } else {
                if (Math.sqrt(Math.pow(r1.center.x - r2.center.x, 2) + Math.pow(r1.center.y - r2.center.y, 2)) <= r1.raidius + r2.raidius) {
                    ismixed = true;
                }
            }
            return ismixed;
        }

       


    }
}