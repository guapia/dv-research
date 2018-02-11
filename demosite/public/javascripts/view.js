var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/// <reference path="./../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var Util = android.graphics.Util;
        var Utility = /** @class */ (function () {
            function Utility() {
            }
            Utility.max = function (arr) {
                var vs = [];
                for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                    var v = arr_1[_i];
                    if (!isNaN(v) && v != null) {
                        vs.push(v);
                    }
                }
                return Math.max.apply(this, vs);
            };
            Utility.min = function (arr) {
                var vs = [];
                for (var _i = 0, arr_2 = arr; _i < arr_2.length; _i++) {
                    var v = arr_2[_i];
                    if (!isNaN(v) && v != null) {
                        vs.push(v);
                    }
                }
                return Math.min.apply(this, vs);
            };
            Utility.iskey = function (key) {
                return key !== undefined && key !== null && typeof (key) == 'string' && key[0] != '_';
            };
            Utility.checkArrayType = function (arr) {
                android.Debug.assert(arr != null);
                android.Debug.assert(arr.length > 0);
                var type = typeof arr[0];
                for (var _i = 0, arr_3 = arr; _i < arr_3.length; _i++) {
                    var v = arr_3[_i];
                    if (type != typeof v) {
                        return false;
                    }
                }
                return true;
            };
            Utility.getType = function (v) {
                var datatype = null;
                if (v instanceof Array) {
                    android.Debug.assert(v != null);
                    android.Debug.assert(v.length > 0);
                    datatype = test.DataType.Array;
                    if (Utility.checkArrayType(v)) {
                        return Utility.getType(v[0]);
                    }
                }
                else if (typeof v == 'number') {
                    datatype = test.DataType.Number;
                }
                else if (typeof v == 'string') {
                    datatype = test.DataType.String;
                }
                else if (typeof v == 'boolean') {
                    datatype = test.DataType.Boolean;
                }
                else {
                    android.Debug.assert(true, "Value can't be Object except Array");
                }
                return datatype;
            };
            Utility.mergeScale = function (scaleA, scaleB, force) {
                if (force === void 0) { force = false; }
                var scale = null;
                if (scaleA.id == scaleB.id) {
                    if (scaleA instanceof test.OrdinalScale && scaleB instanceof test.OrdinalScale) {
                        var domainunions = _.union(scaleA.domains, scaleB.domains);
                        if (force || (scaleA.domains.length / domainunions.length > 0.5 && scaleB.domains.length / domainunions.length > 0.5)) {
                            scale = scaleA.clone();
                            scale.domain(domainunions);
                        }
                    }
                    else if ((scaleA instanceof test.LinearScale && scaleB instanceof test.LinearScale)) {
                        var min = Math.min(scaleA.min, scaleB.min);
                        var max = Math.max(scaleA.max, scaleB.max);
                        var rate1 = Math.abs(max - min) / (Math.abs(scaleA.max - scaleA.min));
                        var rate2 = Math.abs(max - min) / (Math.abs(scaleB.max - scaleB.min));
                        console.log("Linear range rate1 = " + rate1 + " , rate2 = " + rate2);
                        if (force || (rate1 < 10 && rate2 < 10)) {
                            scale = scaleA.clone();
                            scale.domain([min, max]);
                        }
                    }
                    else if (scaleA instanceof test.LogScale && scaleB instanceof test.LogScale) {
                        if (scaleA.logBase == scaleB.logBase) {
                            scale = scaleA.clone();
                            scale.domain([Math.min(scaleA.min, scaleB.min), Math.max(scaleA.max, scaleB.max)]);
                        }
                    }
                }
                return scale;
            };
            Utility.isMixedRotatedRect = function (r1, r2) {
                var ismixed = false;
                if (r1.angle == r2.angle) {
                    for (var _i = 0, _a = r1.points; _i < _a.length; _i++) {
                        var pt = _a[_i];
                        if (Util.IsPointInPolygon(pt, r2.points)) {
                            ismixed = true;
                            break;
                        }
                    }
                }
                else {
                    if (Math.sqrt(Math.pow(r1.center.x - r2.center.x, 2) + Math.pow(r1.center.y - r2.center.y, 2)) <= r1.raidius + r2.raidius) {
                        ismixed = true;
                    }
                }
                return ismixed;
            };
            return Utility;
        }());
        test.Utility = Utility;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
var android;
(function (android) {
    var test;
    (function (test) {
        var ColorUtils = /** @class */ (function () {
            function ColorUtils() {
            }
            // ["#FFFFF0", "#FFFFE0", "#FFFF00 ", "#FFFAFA", "#FFFAF0", "#FFFACD", "#FFF8DC ", "#FFF68F", "#FFF5EE", "#FFF0F5", "#FFEFDB ", "#FFEFD5", "#FFEC8B", "#FFEBCD", "#FFE7BA ", "#FFE4E1", "#FFE4C4", "#FFE4B5", "#FFE1FF ", "#FFDEAD", "#FFDAB9", "#FFD700", "#FFD39B ", "#FFC1C1", "#FFC125", "#FFC0CB", "#FFBBFF ", "#FFB90F", "#FFB6C1", "#FFB5C5", "#FFAEB9 ", "#FFA54F", "#FFA500", "#FFA07A", "#FF8C69 ", "#FF8C00", "#FF83FA", "#FF82AB", "#FF8247 ", "#FF7F50", "#FF7F24", "#FF7F00", "#FF7256 ", "#FF6EB4", "#FF6A6A", "#FF69B4", "#FF6347 ", "#FF4500", "#FF4040", "#FF3E96", "#FF34B3 ", "#FF3030", "#FF1493", "#FF00FF", "#FF0000 ", "#FDF5E6", "#FCFCFC", "#FAFAFA", "#FAFAD2 ", "#FAF0E6", "#FAEBD7", "#FA8072", "#F8F8FF ", "#F7F7F7", "#F5FFFA", "#F5F5F5", "#F5F5DC ", "#F5DEB3", "#F4F4F4", "#F4A460", "#F2F2F2 ", "#F0FFFF", "#F0FFF0", "#F0F8FF", "#F0F0F0 ", "#F0E68C", "#F08080", "#EEEEE0", "#EEEED1 ", "#EEEE00", "#EEE9E9", "#EEE9BF", "#EEE8CD ", "#EEE8AA", "#EEE685", "#EEE5DE", "#EEE0E5 ", "#EEDFCC", "#EEDC82", "#EED8AE", "#EED5D2 ", "#EED5B7", "#EED2EE", "#EECFA1", "#EECBAD ", "#EEC900", "#EEC591", "#EEB4B4", "#EEB422 ", "#EEAEEE", "#EEAD0E", "#EEA9B8", "#EEA2AD ", "#EE9A49", "#EE9A00", "#EE9572", "#EE82EE ", "#EE8262", "#EE7AE9", "#EE799F", "#EE7942 ", "#EE7621", "#EE7600", "#EE6AA7", "#EE6A50 ", "#EE6363", "#EE5C42", "#EE4000", "#EE3B3B ", "#EE3A8C", "#EE30A7", "#EE2C2C", "#EE1289 ", "#EE00EE", "#EE0000", "#EDEDED", "#EBEBEB ", "#EAEAEA", "#E9967A", "#E8E8E8", "#E6E6FA ", "#E5E5E5", "#E3E3E3", "#E0FFFF", "#E0EEEE ", "#E0EEE0", "#E0E0E0", "#E066FF", "#DEDEDE ", "#DEB887", "#DDA0DD", "#DCDCDC", "#DC143C ", "#DBDBDB", "#DB7093", "#DAA520", "#DA70D6 ", "#D9D9D9", "#D8BFD8", "#D6D6D6", "#D4D4D4 ", "#D3D3D3", "#D2B48C", "#D2691E", "#D1EEEE ", "#D1D1D1", "#D15FEE", "#D02090", "#CFCFCF ", "#CDCDC1", "#CDCDB4", "#CDCD00", "#CDC9C9 ", "#CDC9A5", "#CDC8B1", "#CDC673", "#CDC5BF ", "#CDC1C5", "#CDC0B0", "#CDBE70", "#CDBA96 ", "#CDB7B5", "#CDB79E", "#CDB5CD", "#CDB38B ", "#CDAF95", "#CDAD00", "#CDAA7D", "#CD9B9B ", "#CD9B1D", "#CD96CD", "#CD950C", "#CD919E ", "#CD8C95", "#CD853F", "#CD8500", "#CD8162 ", "#CD7054", "#CD69C9", "#CD6889", "#CD6839 ", "#CD661D", "#CD6600", "#CD6090", "#CD5C5C ", "#CD5B45", "#CD5555", "#CD4F39", "#CD3700 ", "#CD3333", "#CD3278", "#CD2990", "#CD2626 ", "#CD1076", "#CD00CD", "#CD0000", "#CCCCCC ", "#CAFF70", "#CAE1FF", "#C9C9C9", "#C7C7C7 ", "#C71585", "#C6E2FF", "#C67171", "#C5C1AA ", "#C4C4C4", "#C2C2C2", "#C1FFC1", "#C1CDCD ", "#C1CDC1", "#C1C1C1", "#C0FF3E", "#BFEFFF ", "#BFBFBF", "#BF3EFF", "#BEBEBE", "#BDBDBD ", "#BDB76B", "#BCEE68", "#BCD2EE", "#BC8F8F ", "#BBFFFF", "#BABABA", "#BA55D3", "#B9D3EE ", "#B8B8B8", "#B8860B", "#B7B7B7", "#B5B5B5 ", "#B4EEB4", "#B4CDCD", "#B452CD", "#B3EE3A ", "#B3B3B3", "#B2DFEE", "#B23AEE", "#B22222 ", "#B0E2FF", "#B0E0E6", "#B0C4DE", "#B0B0B0 ", "#B03060", "#AEEEEE", "#ADFF2F", "#ADD8E6 ", "#ADADAD", "#ABABAB", "#AB82FF", "#AAAAAA ", "#A9A9A9", "#A8A8A8", "#A6A6A6", "#A52A2A ", "#A4D3EE", "#A3A3A3", "#A2CD5A", "#A2B5CD ", "#A1A1A1", "#A0522D", "#A020F0", "#9FB6CD ", "#9F79EE", "#9E9E9E", "#9C9C9C", "#9BCD9B ", "#9B30FF", "#9AFF9A", "#9ACD32", "#9AC0CD ", "#9A32CD", "#999999", "#9932CC", "#98FB98 ", "#98F5FF", "#97FFFF", "#96CDCD", "#969696 ", "#949494", "#9400D3", "#9370DB", "#919191 ", "#912CEE", "#90EE90", "#8FBC8F", "#8F8F8F ", "#8EE5EE", "#8E8E8E", "#8E8E38", "#8E388E ", "#8DEEEE", "#8DB6CD", "#8C8C8C", "#8B8B83 ", "#8B8B7A", "#8B8B00", "#8B8989", "#8B8970 ", "#8B8878", "#8B8682", "#8B864E", "#8B8386 ", "#8B8378", "#8B814C", "#8B7E66", "#8B7D7B ", "#8B7D6B", "#8B7B8B", "#8B795E", "#8B7765 ", "#8B7500", "#8B7355", "#8B6969", "#8B6914 ", "#8B668B", "#8B6508", "#8B636C", "#8B5F65 ", "#8B5A2B", "#8B5A00", "#8B5742", "#8B4C39 ", "#8B4789", "#8B475D", "#8B4726", "#8B4513 ", "#8B4500", "#8B3E2F", "#8B3A62", "#8B3A3A ", "#8B3626", "#8B2500", "#8B2323", "#8B2252 ", "#8B1C62", "#8B1A1A", "#8B0A50", "#8B008B ", "#8B0000", "#8A8A8A", "#8A2BE2", "#8968CD ", "#87CEFF", "#87CEFA", "#87CEEB", "#878787 ", "#858585", "#848484", "#8470FF", "#838B8B ", "#838B83", "#836FFF", "#828282", "#7FFFD4 ", "#7FFF00", "#7F7F7F", "#7EC0EE", "#7D9EC0 ", "#7D7D7D", "#7D26CD", "#7CFC00", "#7CCD7C ", "#7B68EE", "#7AC5CD", "#7A8B8B", "#7A7A7A ", "#7A67EE", "#7A378B", "#79CDCD", "#787878 ", "#778899", "#76EEC6", "#76EE00", "#757575 ", "#737373", "#71C671", "#7171C6", "#708090 ", "#707070", "#6E8B3D", "#6E7B8B", "#6E6E6E ", "#6CA6CD", "#6C7B8B", "#6B8E23", "#6B6B6B ", "#6A5ACD", "#698B69", "#698B22", "#696969 ", "#6959CD", "#68838B", "#68228B", "#66CDAA ", "#66CD00", "#668B8B", "#666666", "#6495ED ", "#63B8FF", "#636363", "#616161", "#607B8B ", "#5F9EA0", "#5E5E5E", "#5D478B", "#5CACEE ", "#5C5C5C", "#5B5B5B", "#595959", "#575757 ", "#556B2F", "#555555", "#551A8B", "#54FF9F ", "#548B54", "#545454", "#53868B", "#528B8B ", "#525252", "#515151", "#4F94CD", "#4F4F4F ", "#4EEE94", "#4D4D4D", "#4B0082", "#4A708B ", "#4A4A4A", "#48D1CC", "#4876FF", "#483D8B ", "#474747", "#473C8B", "#4682B4", "#458B74 ", "#458B00", "#454545", "#43CD80", "#436EEE ", "#424242", "#4169E1", "#40E0D0", "#404040 ", "#3D3D3D", "#3CB371", "#3B3B3B", "#3A5FCD ", "#388E8E", "#383838", "#36648B", "#363636 ", "#333333", "#32CD32", "#303030", "#2F4F4F ", "#2E8B57", "#2E2E2E", "#2B2B2B", "#292929 ", "#282828", "#27408B", "#262626", "#242424 ", "#228B22", "#218868", "#212121", "#20B2AA ", "#1F1F1F", "#1E90FF", "#1E1E1E", "#1C86EE ", "#1C1C1C", "#1A1A1A", "#191970", "#1874CD ", "#171717", "#141414", "#121212", "#104E8B ", "#0F0F0F", "#0D0D0D", "#0A0A0A", "#080808 ", "#050505", "#030303", "#00FFFF", "#00FF7F ", "#00FF00", "#00FA9A", "#00F5FF", "#00EEEE ", "#00EE76", "#00EE00", "#00E5EE", "#00CED1 ", "#00CDCD", "#00CD66", "#00CD00", "#00C5CD ", "#00BFFF", "#00B2EE", "#009ACD", "#008B8B ", "#008B45", "#008B00", "#00868B", "#00688B ", "#006400", "#0000FF", "#0000EE", "#0000CD ", "#0000AA", "#00008B", "#000080"];
            ColorUtils.nextColor = function () {
                return ColorUtils.Color[++ColorUtils._colorindex % ColorUtils.Color.length];
            };
            ColorUtils.indexColor = function (index) {
                var result = ColorUtils.Color[Math.abs(index) % (ColorUtils.Color.length - 1)];
                return result;
            };
            ColorUtils.gradientColor = function (startColor, endColor, step) {
                var startRGB = null;
                if (startColor.indexOf('rgb') == 0) {
                    startColor = ColorUtils.colorHex(startColor);
                }
                startRGB = ColorUtils.colorRgb(startColor); //转换为rgb数组模式
                var startR = startRGB[0];
                var startG = startRGB[1];
                var startB = startRGB[2];
                var endRGB = null;
                if (endColor.indexOf('rgb') == 0) {
                    endColor = ColorUtils.colorHex(endColor);
                }
                endRGB = ColorUtils.colorRgb(endColor);
                var endR = endRGB[0];
                var endG = endRGB[1];
                var endB = endRGB[2];
                var sR = (endR - startR) / step; //总差值
                var sG = (endG - startG) / step;
                var sB = (endB - startB) / step;
                var colorArr = [];
                for (var i = 0; i < step; i++) {
                    //计算每一步的hex值 
                    var hex = ColorUtils.colorHex('rgb(' + parseInt((sR * i + startR)) + ',' + parseInt((sG * i + startG)) + ',' + parseInt((sB * i + startB)) + ')');
                    colorArr.push(hex);
                }
                return colorArr;
            };
            ColorUtils.getColor = function (startColor, endColor, value, start, end) {
                var startRGB = ColorUtils.colorRgb(startColor); //转换为rgb数组模式
                var startR = startRGB[0];
                var startG = startRGB[1];
                var startB = startRGB[2];
                var endRGB = ColorUtils.colorRgb(endColor);
                var endR = endRGB[0];
                var endG = endRGB[1];
                var endB = endRGB[2];
                var sR = (endR - startR) / (end - start); //总差值
                var sG = (endG - startG) / (end - start);
                var sB = (endB - startB) / (end - start);
                var hex = ColorUtils.colorHex('rgb(' + parseInt((sR * value + startR)) + ',' + parseInt((sG * value + startG)) + ',' + parseInt((sB * value + startB)) + ')');
                return hex;
            };
            ColorUtils.colorRgb = function (sColor) {
                var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
                var sColor = sColor.toLowerCase();
                if (sColor && reg.test(sColor)) {
                    if (sColor.length === 4) {
                        var sColorNew = "#";
                        for (var i = 1; i < 4; i += 1) {
                            sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                        }
                        sColor = sColorNew;
                    }
                    //处理六位的颜色值
                    var sColorChange = [];
                    for (var i = 1; i < 7; i += 2) {
                        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
                    }
                    return sColorChange;
                }
                else {
                    return sColor;
                }
            };
            // 将rgb表示方式转换为hex表示方式
            ColorUtils.colorHex = function (rgb) {
                var _thiss = rgb;
                var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
                if (/^(rgb|RGB)/.test(_thiss)) {
                    var aColor = _thiss.replace(/(?:(|)|rgb|RGB)*/g, "").split(",");
                    var strHex = "#";
                    for (var i = 0; i < aColor.length; i++) {
                        var hex = Number(aColor[i]).toString(16);
                        hex = hex < 10 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
                        if (hex === "0") {
                            hex += hex;
                        }
                        strHex += hex;
                    }
                    if (strHex.length !== 7) {
                        strHex = _thiss;
                    }
                    return strHex;
                }
                else if (reg.test(_thiss)) {
                    var aNum = _thiss.replace(/#/, "").split("");
                    if (aNum.length === 6) {
                        return _thiss;
                    }
                    else if (aNum.length === 3) {
                        var numHex = "#";
                        for (var i = 0; i < aNum.length; i += 1) {
                            numHex += (aNum[i] + aNum[i]);
                        }
                        return numHex;
                    }
                }
                else {
                    return _thiss;
                }
            };
            ColorUtils._colorindex = -1;
            ColorUtils.Color = ['rgb(251, 118, 123)', 'rgb(129, 227, 238)', '#88bde6', '#fbb258', '#90cd97', '#f6aac9', '#bfa554', '#bc99c7', '#eddd46', '#f07e6e', '#8c8c8c'];
            return ColorUtils;
        }());
        test.ColorUtils = ColorUtils;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var Point = android.graphics.Point;
        var RotateRect = /** @class */ (function () {
            function RotateRect(centerx, centery, width, height, angle) {
                this.angle = angle;
                this.centerx = centerx;
                this.centery = centery;
                this.width = width;
                this.height = height;
                this.points = [new Point(), new Point(), new Point(), new Point(), new Point(), new Point(), new Point(), new Point(), new Point()];
                var lt = this.points[0];
                var rt = this.points[1];
                var rb = this.points[2];
                var lb = this.points[3];
                var ct = this.points[4];
                var cb = this.points[5];
                var cl = this.points[6];
                var cr = this.points[7];
                cr.x = this.centerx + Math.cos(this.angle) * this.width / 2;
                cr.y = this.centery + Math.sin(this.angle) * this.width / 2;
                cl.x = 2 * this.centerx - cr.x;
                cl.y = 2 * this.centery - cr.y;
                rt.x = cr.x + Math.sin(this.angle) * this.height / 2;
                rt.y = cr.y - Math.cos(this.angle) * this.height / 2;
                rb.x = 2 * cr.x - rt.x;
                rb.y = 2 * cr.y - rt.y;
                lb.x = cl.x - Math.sin(this.angle) * this.height / 2;
                lb.y = cl.y + Math.cos(this.angle) * this.height / 2;
                lt.x = 2 * cl.x - lb.x;
                lt.y = 2 * cl.y - lb.y;
                cb.x = (lb.x + rb.x) / 2;
                cb.y = (lb.y + rb.y) / 2;
                ct.x = (lt.x + rt.x) / 2;
                ct.y = (lt.y + rt.y) / 2;
                var center = this.points[8];
                center.x = this.centerx;
                center.y = this.centery;
            }
            Object.defineProperty(RotateRect.prototype, "raidius", {
                get: function () {
                    return Math.sqrt(Math.pow(this.center.x - this.leftTop.x, 2) + Math.pow(this.center.y - this.leftTop.y, 2));
                },
                enumerable: true,
                configurable: true
            });
            RotateRect.prototype.offset = function (x, y, angle) {
                for (var i = 0; i < this.points.length; ++i) {
                    var pt = this.points[i];
                    pt.x += x * Math.cos(angle);
                    pt.y += y * Math.sin(angle);
                }
            };
            Object.defineProperty(RotateRect.prototype, "leftTop", {
                get: function () {
                    return this.points[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RotateRect.prototype, "rightTop", {
                get: function () {
                    return this.points[1];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RotateRect.prototype, "leftBottom", {
                get: function () {
                    return this.points[3];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RotateRect.prototype, "rightBottom", {
                get: function () {
                    return this.points[2];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RotateRect.prototype, "centerTop", {
                get: function () {
                    return this.points[4];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RotateRect.prototype, "centerBottom", {
                get: function () {
                    return this.points[5];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RotateRect.prototype, "center", {
                get: function () {
                    return this.points[8];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RotateRect.prototype, "startPoint", {
                get: function () {
                    return new Point(this.centerx, this.centery);
                },
                enumerable: true,
                configurable: true
            });
            return RotateRect;
        }());
        test.RotateRect = RotateRect;
        var RotateLine = /** @class */ (function () {
            function RotateLine(cx, cy, leftwidth, rightwidth, angle) {
                this._cx = cx;
                this._cy = cy;
                this._leftwidth = leftwidth;
                this._rightwidth = rightwidth;
                this._angle = angle;
                this.endPoint = new Point();
                this.endPoint.x = cx + Math.sin(this._angle) * rightwidth;
                this.endPoint.y = cy - Math.cos(this._angle) * rightwidth;
                this.startPoint = new Point();
                this.startPoint.x = cx - Math.sin(this._angle) * leftwidth;
                this.startPoint.y = cy + Math.cos(this._angle) * leftwidth;
            }
            return RotateLine;
        }());
        test.RotateLine = RotateLine;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var AnimationType;
        (function (AnimationType) {
            AnimationType[AnimationType["Width"] = 0] = "Width";
            AnimationType[AnimationType["Height"] = 1] = "Height";
            AnimationType[AnimationType["Size"] = 2] = "Size";
            AnimationType[AnimationType["Radius"] = 3] = "Radius";
            AnimationType[AnimationType["Sweep"] = 4] = "Sweep";
            AnimationType[AnimationType["Alpha"] = 5] = "Alpha";
        })(AnimationType = test.AnimationType || (test.AnimationType = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var Agg;
        (function (Agg) {
            Agg[Agg["SUM"] = 0] = "SUM";
            Agg[Agg["AVERAGE"] = 1] = "AVERAGE";
            Agg[Agg["COUNT"] = 2] = "COUNT";
            Agg[Agg["NONE"] = 3] = "NONE";
        })(Agg = test.Agg || (test.Agg = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var Order;
        (function (Order) {
            Order[Order["Desc"] = 0] = "Desc";
            Order[Order["Asc"] = 1] = "Asc";
            Order[Order["None"] = 2] = "None";
        })(Order = test.Order || (test.Order = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var ScaleType;
        (function (ScaleType) {
            ScaleType[ScaleType["Linear"] = 0] = "Linear";
            ScaleType[ScaleType["Log"] = 1] = "Log";
            ScaleType[ScaleType["Ordinal"] = 2] = "Ordinal";
            ScaleType[ScaleType["LatLon"] = 3] = "LatLon";
        })(ScaleType = test.ScaleType || (test.ScaleType = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
var android;
(function (android) {
    var test;
    (function (test) {
        var DataType;
        (function (DataType) {
            DataType[DataType["Number"] = 0] = "Number";
            DataType[DataType["String"] = 1] = "String";
            DataType[DataType["Object"] = 2] = "Object";
            DataType[DataType["Array"] = 3] = "Array";
            DataType[DataType["Boolean"] = 4] = "Boolean";
            DataType[DataType["Date"] = 5] = "Date";
        })(DataType = test.DataType || (test.DataType = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var ChartType;
        (function (ChartType) {
            ChartType[ChartType["Bar"] = 0] = "Bar";
            ChartType[ChartType["Line"] = 1] = "Line";
            ChartType[ChartType["Scatter"] = 2] = "Scatter";
            ChartType[ChartType["Area"] = 3] = "Area";
            ChartType[ChartType["Pie"] = 4] = "Pie";
            ChartType[ChartType["Sunburst"] = 5] = "Sunburst";
            ChartType[ChartType["TreeMap"] = 6] = "TreeMap";
            ChartType[ChartType["Radar"] = 7] = "Radar";
            ChartType[ChartType["Candlestick"] = 8] = "Candlestick";
        })(ChartType = test.ChartType || (test.ChartType = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
var android;
(function (android) {
    var test;
    (function (test) {
        var cartesian;
        (function (cartesian) {
            'use strict';
            var AxisType;
            (function (AxisType) {
                AxisType[AxisType["X"] = 0] = "X";
                AxisType[AxisType["Y"] = 1] = "Y";
            })(AxisType = cartesian.AxisType || (cartesian.AxisType = {}));
        })(cartesian = test.cartesian || (test.cartesian = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var cartesian;
        (function (cartesian) {
            'use strict';
            var Value = /** @class */ (function () {
                function Value(v, scaleType) {
                    this.__val = v;
                    if (v instanceof Array) {
                        this.__isMultiple = true;
                    }
                    else {
                        this.__isMultiple = false;
                    }
                    this.__scaleType = scaleType;
                    this.__dataType = test.Utility.getType(v);
                }
                Object.defineProperty(Value.prototype, "scaleType", {
                    get: function () {
                        return this.__scaleType;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Value.prototype, "dataType", {
                    get: function () {
                        return this.__dataType;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Value.prototype, "isMultiple", {
                    /**
                     * for what ?
                     * array value for high low open close?
                     */
                    get: function () {
                        return this.__isMultiple;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Value.prototype, "value", {
                    get: function () {
                        return this.__val;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Value;
            }());
            cartesian.Value = Value;
        })(cartesian = test.cartesian || (test.cartesian = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.ts" />
/// <reference path="../enum/Agg.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var cartesian;
        (function (cartesian) {
            var Util = android.graphics.Util;
            'use strict';
            var Field = /** @class */ (function () {
                function Field(bind, name, index) {
                    if (index === void 0) { index = 0; }
                    this.index = 0;
                    this.aggregate = Util.asEnum(bind.aggregate, test.Agg, true);
                    if (this.aggregate == null) {
                        this.aggregate = test.Agg.NONE;
                    }
                    var binds = bind.field.split(',');
                    if (binds != null && binds.length > 1) {
                        this.bind = binds;
                    }
                    else {
                        this.bind = bind.field;
                    }
                    this.type = Util.asEnum(bind.type, test.ScaleType, true);
                    if (this.type == null) {
                        this.type = test.ScaleType.Ordinal;
                    }
                    this.logBase = bind.logBase;
                    this.name = name;
                    this.range = bind.range;
                    this.band = bind.band;
                    if (index != null && !isNaN(index)) {
                        this.index = index;
                    }
                }
                Object.defineProperty(Field.prototype, "isMultiple", {
                    get: function () {
                        return this.bind instanceof Array;
                    },
                    enumerable: true,
                    configurable: true
                });
                Field.prototype.equals = function (field) {
                    return _.isEqual(this, field);
                };
                return Field;
            }());
            cartesian.Field = Field;
        })(cartesian = test.cartesian || (test.cartesian = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var cartesian;
        (function (cartesian) {
            'use strict';
            var Filter = /** @class */ (function () {
                function Filter(series, rules) {
                    this.series = series.split(',');
                    if (rules != null && rules instanceof Array) {
                        this.rules = [];
                        for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
                            var rule = rules_1[_i];
                            this.rules.push(new Rule(rule.field, rule.express));
                        }
                    }
                }
                Filter.prototype.equals = function (field) {
                    return _.isEqual(this, field);
                };
                return Filter;
            }());
            cartesian.Filter = Filter;
            var Rule = /** @class */ (function () {
                function Rule(filed, express) {
                    this.filed = filed;
                    this.express = express;
                }
                return Rule;
            }());
            cartesian.Rule = Rule;
        })(cartesian = test.cartesian || (test.cartesian = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="./Field.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var cartesian;
        (function (cartesian) {
            var Encoding = /** @class */ (function () {
                function Encoding(encoding) {
                    this._stack = false;
                    this._radial = false;
                    if (encoding.x) {
                        this.x = new cartesian.Field(encoding.x, 'x');
                    }
                    if (encoding.geoposition) {
                        this.geoposition = new cartesian.Field(encoding.geoposition, 'geoposition');
                    }
                    if (encoding.y) {
                        this.y = new cartesian.Field(encoding.y, 'y');
                    }
                    if (encoding.color) {
                        this.color = new cartesian.Field(encoding.color, 'color');
                    }
                    if (encoding.shape) {
                        this.shape = new cartesian.Field(encoding.shape, 'shape');
                    }
                    if (encoding.size) {
                        this.size = new cartesian.Field(encoding.size, 'size');
                    }
                    if (encoding.tooltip) {
                        this.tooltip = new cartesian.Field(encoding.tooltip, 'tooltip');
                    }
                    if (encoding.text) {
                        this.text = new cartesian.Field(encoding.text, 'text');
                    }
                    if (encoding.group) {
                        this.group = new cartesian.Field(encoding.group, 'group');
                    }
                    if (encoding.values && encoding.values instanceof Array) {
                        this.values = [];
                        for (var i = 0; i < encoding.values.length; ++i) {
                            var value = encoding.values[i];
                            this.values.push(new cartesian.Field(value, value.name));
                        }
                    }
                    if (encoding.stack != null) {
                        this._stack = encoding.stack;
                    }
                    if (encoding.radial != null) {
                        this._radial = encoding.radial;
                    }
                }
                return Encoding;
            }());
            cartesian.Encoding = Encoding;
        })(cartesian = test.cartesian || (test.cartesian = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var cartesian;
        (function (cartesian) {
            'use strict';
            var Util = android.graphics.Util;
            var Item = /** @class */ (function () {
                function Item() {
                }
                Object.defineProperty(Item.prototype, "id", {
                    get: function () {
                        // return Utility.HashCode(this);
                        return Util.HashCode(Util.HashCode(this.x) + Util.HashCode(this.group));
                        // return this.x.value +" " + this.group.value;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Item;
            }());
            cartesian.Item = Item;
        })(cartesian = test.cartesian || (test.cartesian = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
var android;
(function (android) {
    var test;
    (function (test) {
        var cartesian;
        (function (cartesian) {
            'use strict';
            var TransForm = /** @class */ (function () {
                function TransForm() {
                }
                return TransForm;
            }());
            cartesian.TransForm = TransForm;
        })(cartesian = test.cartesian || (test.cartesian = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var cartesian;
        (function (cartesian) {
            'use strict';
            var Util = android.graphics.Util;
            var Debug = android.Debug;
            var Series = /** @class */ (function () {
                function Series(encoding, series, index) {
                    this.__points = [];
                    this.__chartType = test.ChartType.Bar;
                    this.enable = true;
                    this.showlabels = false;
                    Debug.assert(encoding != null);
                    Debug.assert(series != null);
                    Debug.assert(series.data instanceof Array, "Series must be Array");
                    this.__data = series.data;
                    this.__name = series.name;
                    this.__index = index;
                    this.__chartType = Util.asEnum(series.charttype, test.ChartType);
                    this.__encoding = encoding;
                    this.__pairs = [];
                    for (var key in this.__encoding) {
                        if (test.Utility.iskey(key)) {
                            var filed = this.__encoding[key];
                            var scale = this.__createScale(filed);
                            this.__pairs.push({ filed: filed, scale: scale });
                        }
                    }
                    for (var _i = 0, _a = this.__data; _i < _a.length; _i++) {
                        var item = _a[_i];
                        this.__points.push(this.__analyseItem(this.__pairs, item));
                    }
                    for (var _b = 0, _c = this.__pairs; _b < _c.length; _b++) {
                        var pair = _c[_b];
                        var filed = pair.filed;
                        var scale = pair.scale;
                        if (filed.name != 'x' && filed.name != 'y' && filed.range != null && filed.range.length > 0) {
                            if (scale instanceof test.LinearScale) {
                                scale.range(filed.range);
                            }
                            else if (scale instanceof test.LogScale) {
                                scale.range(filed.range);
                            }
                            else if (scale instanceof test.OrdinalScale) {
                                if (filed.band === true) {
                                    scale.rangeBounds(filed.range);
                                }
                                else {
                                    scale.range(filed.range);
                                }
                            }
                        }
                        scale.refresh();
                    }
                }
                Object.defineProperty(Series.prototype, "id", {
                    get: function () {
                        return Util.HashCode(this.__name);
                    },
                    enumerable: true,
                    configurable: true
                });
                Series.prototype.__analyseItem = function (pairs, item) {
                    Debug.assert(item != null);
                    Debug.assert(typeof item == 'object');
                    var values = new cartesian.Item();
                    Debug.assert(!(item instanceof Array));
                    values.group = new cartesian.Value(this.__name, test.ScaleType.Ordinal);
                    for (var _i = 0, pairs_1 = pairs; _i < pairs_1.length; _i++) {
                        var pair = pairs_1[_i];
                        var filed = pair.filed;
                        var scale = pair.scale;
                        var value = null;
                        if (filed.bind instanceof Array) {
                            value = new cartesian.Value([item[filed.bind[0]], item[filed.bind[1]]], filed.type);
                        }
                        else {
                            value = new cartesian.Value(item[filed.bind], filed.type);
                        }
                        values[filed.name] = value;
                        if (typeof (filed.bind) == 'string') {
                            if (scale instanceof test.LinearScale) {
                                var max = test.Utility.max([item[filed.bind], scale.max]);
                                var min = test.Utility.min([item[filed.bind], scale.min]);
                                scale.domain([min, max]);
                            }
                            else if (scale instanceof test.LogScale) {
                                var max = test.Utility.max([item[filed.bind], scale.max]);
                                var min = test.Utility.min([item[filed.bind], scale.min]);
                                scale.domain([min, max]);
                            }
                            else if (scale instanceof test.OrdinalScale) {
                                // if(scale.domains.indexOf(item[filed.bind]) < 0){
                                scale.domains.push(item[filed.bind]);
                                // }
                            }
                        }
                        else if (filed.isMultiple) {
                            if (scale instanceof test.map.MapOrdinalScale) {
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
                };
                Series.prototype._refresh = function () {
                    for (var _i = 0, _a = this.__pairs; _i < _a.length; _i++) {
                        var pair = _a[_i];
                        pair.scale.domain([]);
                    }
                    for (var _b = 0, _c = this.__points; _b < _c.length; _b++) {
                        var pt = _c[_b];
                        for (var _d = 0, _e = this.__pairs; _d < _e.length; _d++) {
                            var pair = _e[_d];
                            var filed = pair.filed;
                            var scale = pair.scale;
                            if (scale instanceof test.LinearScale) {
                                var value = pt[filed.name];
                                var max = test.Utility.max(value.isMultiple ? value.value.concat([scale.max]) : [value.value, scale.max]);
                                var min = test.Utility.min(value.isMultiple ? value.value.concat([scale.min]) : [value.value, scale.min]);
                                scale.domain([min, max]);
                            }
                            else if (scale instanceof test.LogScale) {
                                var value = pt[filed.name];
                                var max = test.Utility.max(value.isMultiple ? value.value.concat([scale.max]) : [value.value, scale.max]);
                                var min = test.Utility.min(value.isMultiple ? value.value.concat([scale.min]) : [value.value, scale.min]);
                                scale.domain([min, max]);
                            }
                            else if (scale instanceof test.OrdinalScale) {
                                var value = pt[filed.name];
                                if (value.isMultiple) {
                                    for (var _f = 0, _g = value.value; _f < _g.length; _f++) {
                                        var v = _g[_f];
                                        scale.domains.push(v);
                                    }
                                }
                                else {
                                    scale.domains.push(value.value);
                                }
                            }
                            else if (scale instanceof test.map.MapOrdinalScale) {
                                var value = pt[filed.name];
                                if (value.isMultiple) {
                                    for (var _h = 0, _j = value.value; _h < _j.length; _h++) {
                                        var v = _j[_h];
                                        scale.domains.push(v);
                                    }
                                }
                                else {
                                    scale.domains.push(value.value);
                                }
                            }
                        }
                    }
                };
                Series.prototype.__createScale = function (filed) {
                    Debug.assert(filed != null);
                    var scale = null;
                    switch (filed.type) {
                        case test.ScaleType.Linear:
                            scale = new test.LinearScale(filed.name);
                            break;
                        case test.ScaleType.Ordinal:
                            scale = new test.OrdinalScale(filed.name);
                            break;
                        case test.ScaleType.Log:
                            scale = new test.LogScale(filed.logBase, filed.name);
                            break;
                        case test.ScaleType.LatLon:
                            scale = new test.map.MapOrdinalScale(filed.name);
                            break;
                        default:
                            Debug.assert(false, filed.type + " ScaleType has not been implement!");
                            break;
                    }
                    return scale;
                };
                Object.defineProperty(Series.prototype, "data", {
                    get: function () {
                        return this.__data;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Series.prototype, "name", {
                    get: function () {
                        return this.__name;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Series.prototype, "scalePairs", {
                    get: function () {
                        return this.__pairs;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Series.prototype, "points", {
                    get: function () {
                        return this.__points;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Series.prototype, "size", {
                    get: function () {
                        return this.__points.length;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Series.prototype, "chartType", {
                    get: function () {
                        return this.__chartType;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Series.prototype, "index", {
                    get: function () {
                        return this.__index;
                    },
                    enumerable: true,
                    configurable: true
                });
                Series.prototype.getScale = function (name) {
                    var index = _.findIndex(this.__pairs, function (item) {
                        return item.filed.name == name;
                    });
                    if (index >= 0) {
                        return this.__pairs[index].scale;
                    }
                    return null;
                };
                Series.prototype.clone = function () {
                    var series = _.cloneDeep(this);
                    return series;
                };
                return Series;
            }());
            cartesian.Series = Series;
        })(cartesian = test.cartesian || (test.cartesian = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var cartesian;
        (function (cartesian) {
            'use strict';
            var DataModel = /** @class */ (function () {
                function DataModel(data) {
                    this.__chartTypes = [];
                    this.__data = data;
                    this.__encoding = this._analyseEncoding(this.__data.encoding);
                    this._analyseFilter(data.filter);
                    this.refresh();
                }
                DataModel.prototype._analyseEncoding = function (encode) {
                    return new cartesian.Encoding(encode);
                };
                Object.defineProperty(DataModel.prototype, "chartTypes", {
                    get: function () {
                        return this.__chartTypes;
                    },
                    enumerable: true,
                    configurable: true
                });
                DataModel.prototype._analyseSeries = function (series_data, encoding) {
                    this.__series = [];
                    this.__allSeries = [];
                    for (var i = 0; i < series_data.length; ++i) {
                        var seriesitem = series_data[i];
                        var ser = new cartesian.Series(encoding, seriesitem, i);
                        if (this.__filter != null && this.__filter.series.indexOf(seriesitem.name) > -1) {
                            ser.enable = true;
                            this.__series.push(ser);
                            if (this.__chartTypes.indexOf(ser.chartType) < 0) {
                                this.__chartTypes.push(ser.chartType);
                            }
                        }
                        else {
                            ser.enable = false;
                        }
                        this.__allSeries.push(ser);
                    }
                };
                DataModel.prototype.refresh = function () {
                    this._analyseSeries(this.__data.series, this.__encoding);
                    this._createLayoutScales(this.encoding);
                };
                DataModel.prototype._analyseFilter = function (filter) {
                    if (filter != null) {
                        this.__filter = new cartesian.Filter(filter.series, filter.rules);
                    }
                };
                DataModel.prototype._createLayoutScales = function (encoding) {
                    this.__scalePairs = [];
                    if (this.__series.length > 1) {
                        this._stack(test.ChartType.Bar);
                        this._stack(test.ChartType.Line);
                        this._stack(test.ChartType.Area);
                        this._stack(test.ChartType.Scatter);
                        for (var i = 0; i < this.__series.length - 1; ++i) {
                            var series = this.__series[i];
                            var next_series = this.__series[i + 1];
                            for (var _i = 0, _a = series.scalePairs; _i < _a.length; _i++) {
                                var pairA = _a[_i];
                                for (var _b = 0, _c = next_series.scalePairs; _b < _c.length; _b++) {
                                    var pairB = _c[_b];
                                    if (pairA.filed.equals(pairB.filed)) {
                                        var filed = pairA.filed;
                                        var force = this.encoding._stack && pairA.filed.name == 'y';
                                        var infoA = this.__getScaleInfobyname(pairA.filed.name, series.name);
                                        var infoB = this.__getScaleInfobyname(pairB.filed.name, next_series.name);
                                        if (infoA == null && infoB == null) {
                                            var scale = test.Utility.mergeScale(pairA.scale, pairB.scale, force);
                                            if (scale != null) {
                                                this.__scalePairs.push({ series: [series.name, next_series.name], filed: filed, scale: scale });
                                            }
                                            else {
                                                this.__scalePairs.push({ series: [series.name], filed: pairA.filed, scale: pairA.scale });
                                                this.__scalePairs.push({ series: [next_series.name], filed: pairB.filed, scale: pairB.scale });
                                            }
                                        }
                                        else if (infoA == null && infoB != null) {
                                            var scale = test.Utility.mergeScale(pairA.scale, infoB.scale, force);
                                            if (scale != null) {
                                                infoB.scale = scale;
                                                infoB.series.push(series.name);
                                            }
                                            else {
                                                this.__scalePairs.push({ series: [series.name], filed: pairA.filed, scale: pairA.scale });
                                            }
                                        }
                                        else if (infoA != null && infoB == null) {
                                            var scale = test.Utility.mergeScale(pairB.scale, infoA.scale, force);
                                            if (scale != null) {
                                                infoA.scale = scale;
                                                infoA.series.push(next_series.name);
                                            }
                                            else {
                                                this.__scalePairs.push({ series: [next_series.name], filed: pairB.filed, scale: pairB.scale });
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        for (var _d = 0, _e = this.__series; _d < _e.length; _d++) {
                            var ser = _e[_d];
                            for (var _f = 0, _g = ser.scalePairs; _f < _g.length; _f++) {
                                var pair = _g[_f];
                                var scale = this._getScaleByName(pair.filed.name, ser.name);
                                if (scale != null) {
                                    pair.scale = scale;
                                }
                            }
                        }
                    }
                    else if (this.__series.length == 1) {
                        for (var _h = 0, _j = this.__series[0].scalePairs; _h < _j.length; _h++) {
                            var pair = _j[_h];
                            this.__scalePairs.push({ series: [this.__series[0].name], filed: pair.filed, scale: pair.scale.clone() });
                        }
                    }
                };
                DataModel.prototype._stack = function (chartType) {
                    if (this.encoding._stack) {
                        var negative = {};
                        var positive = {};
                        for (var i = 0; i < this.series.length; ++i) {
                            var serA = this.series[i];
                            if (serA.chartType === chartType) {
                                this._setSeriesStack(serA, positive, negative);
                            }
                        }
                    }
                };
                DataModel.prototype.__getScaleInfobyname = function (filedname, seriesname) {
                    var info = _.find(this.__scalePairs, function (item) {
                        return item.series.indexOf(seriesname) >= 0 && filedname == item.filed.name;
                    });
                    return info;
                };
                DataModel.prototype._getScaleByName = function (filedname, seriesname) {
                    return _.result(_.find(this.__scalePairs, function (item) {
                        return item.series.indexOf(seriesname) >= 0 && filedname == item.filed.name;
                    }), "scale");
                };
                DataModel.prototype._setSeriesStack = function (series, pos, neg) {
                    var scaleX_A = series.getScale('x');
                    if (scaleX_A instanceof test.OrdinalScale) {
                        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
                            var pt = _a[_i];
                            var negvalue = neg[pt.x.value];
                            var posvalue = pos[pt.x.value];
                            if (negvalue == null) {
                                negvalue = 0;
                                neg[pt.x.value] = 0;
                            }
                            if (posvalue == null) {
                                posvalue = 0;
                                pos[pt.x.value] = 0;
                            }
                            var isNeg = pt.y.value < 0;
                            var startY = isNeg ? negvalue : posvalue;
                            var endY = startY + pt.y.value;
                            isNeg ? neg[pt.x.value] = endY : pos[pt.x.value] = endY;
                            // targetPoint.y = new Value([startY, endY], targetPoint.y.scaleType);
                            // seriesB.points[index] = targetPoint;
                            pt.y = new cartesian.Value([startY, endY], pt.y.scaleType);
                        }
                    }
                    series._refresh();
                };
                DataModel.prototype.getSeriesByType = function (charttype) {
                    var series = _.filter(this.__series, function (ser) { return ser.chartType === charttype; });
                    return series;
                };
                Object.defineProperty(DataModel.prototype, "series", {
                    get: function () {
                        return this.__series;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataModel.prototype, "allSeries", {
                    get: function () {
                        return this.__allSeries;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataModel.prototype, "encoding", {
                    get: function () {
                        return this.__encoding;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataModel.prototype, "filter", {
                    get: function () {
                        return this.__filter;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataModel.prototype, "scalePairs", {
                    get: function () {
                        return this.__scalePairs;
                    },
                    enumerable: true,
                    configurable: true
                });
                return DataModel;
            }());
            cartesian.DataModel = DataModel;
        })(cartesian = test.cartesian || (test.cartesian = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var hierarchical;
        (function (hierarchical) {
            'use strict';
            var Value = /** @class */ (function () {
                function Value(v, scaleType) {
                    this.__val = v;
                    this.__scaleType = scaleType;
                    this.__dataType = test.Utility.getType(v);
                    if (this.__scaleType == null) {
                        switch (this.__dataType) {
                            case test.DataType.Number:
                            case test.DataType.Date:
                                this.__scaleType = test.ScaleType.Linear;
                                break;
                            case test.DataType.String:
                            case test.DataType.Boolean:
                            default:
                                this.__scaleType = test.ScaleType.Ordinal;
                                break;
                        }
                    }
                }
                Object.defineProperty(Value.prototype, "scaleType", {
                    get: function () {
                        return this.__scaleType;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Value.prototype, "dataType", {
                    get: function () {
                        return this.__dataType;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Value.prototype, "value", {
                    get: function () {
                        return this.__val;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Value;
            }());
            hierarchical.Value = Value;
        })(hierarchical = test.hierarchical || (test.hierarchical = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var hierarchical;
        (function (hierarchical) {
            var Util = android.graphics.Util;
            'use strict';
            var Field = /** @class */ (function () {
                function Field(bind, name) {
                    this.aggregate = Util.asEnum(bind.aggregate, test.Agg, true);
                    if (this.aggregate == null) {
                        this.aggregate = test.Agg.NONE;
                    }
                    this.bind = bind.field;
                    this.name = name;
                    this.range = bind.range;
                    this.band = bind.band;
                    this.type = Util.asEnum(bind.type, test.ScaleType, true);
                }
                Field.prototype.equals = function (field) {
                    return _.isEqual(this, field);
                };
                return Field;
            }());
            hierarchical.Field = Field;
        })(hierarchical = test.hierarchical || (test.hierarchical = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
var android;
(function (android) {
    var test;
    (function (test) {
        var hierarchical;
        (function (hierarchical) {
            'use strict';
            var Util = android.graphics.Util;
            var Item = /** @class */ (function () {
                function Item() {
                    this._hidden = false;
                }
                Object.defineProperty(Item.prototype, "id", {
                    get: function () {
                        // return Util.HashCode(this);
                        return Util.HashCode(Util.HashCode(this.size) + Util.HashCode(this.color) + Util.HashCode(this.text) + Util.HashCode(this.depth) + Util.HashCode(this.count));
                    },
                    enumerable: true,
                    configurable: true
                });
                return Item;
            }());
            hierarchical.Item = Item;
        })(hierarchical = test.hierarchical || (test.hierarchical = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var hierarchical;
        (function (hierarchical) {
            'use strict';
            var Encoding = /** @class */ (function () {
                function Encoding(encoding) {
                    if (encoding.color != null) {
                        this.color = new hierarchical.Field(encoding.color, 'color');
                    }
                    if (encoding.size != null) {
                        this.size = new hierarchical.Field(encoding.size, 'size');
                    }
                    if (encoding.tooltip != null) {
                        this.tooltip = new hierarchical.Field(encoding.tooltip, 'tooltip');
                    }
                    if (encoding.text != null) {
                        this.text = new hierarchical.Field(encoding.text, 'text');
                    }
                    if (encoding.children != null) {
                        this.children = new hierarchical.Field(encoding.children, 'children');
                    }
                }
                return Encoding;
            }());
            hierarchical.Encoding = Encoding;
        })(hierarchical = test.hierarchical || (test.hierarchical = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var hierarchical;
        (function (hierarchical) {
            'use strict';
            var Util = android.graphics.Util;
            var Debug = android.Debug;
            var DataModel = /** @class */ (function () {
                // private __analyseTree()
                function DataModel(data) {
                    DataModel.id = 0;
                    this.__data = data;
                    this.__chartType = Util.asEnum(data.charttype, test.ChartType);
                    this.__encoding = this._analyseEncoding(this.__data.encoding);
                    this.__createRoot();
                }
                DataModel.prototype._analyseEncoding = function (encode) {
                    return new hierarchical.Encoding(encode);
                };
                Object.defineProperty(DataModel.prototype, "chartType", {
                    get: function () {
                        return this.__chartType;
                    },
                    enumerable: true,
                    configurable: true
                });
                DataModel.prototype.__createModel = function (data, depth) {
                    var item = new hierarchical.Item();
                    // item._id = (++DataModel.id).toFixed();
                    for (var key in this.__encoding) {
                        if (key === 'children') {
                            if (item.children == null) {
                                item.children = [];
                            }
                            var _children = data[this.__encoding.children.bind];
                            if (_children != null && _children instanceof Array) {
                                for (var _i = 0, _children_1 = _children; _i < _children_1.length; _i++) {
                                    var child = _children_1[_i];
                                    item.children.push(this.__createModel(child, depth + 1));
                                }
                            }
                        }
                        else if (this.__encoding[key].bind === 'count' || this.__encoding[key].bind === 'depth') {
                            if (this.__encoding[key].bind in data) {
                                item[key] = new hierarchical.Value(data[this.__encoding[key].bind], null);
                            }
                            else {
                                if (this.__encoding[key].bind == 'count') {
                                    item[key] = new hierarchical.Value(data.children != null ? data.children.length : 1, null);
                                }
                                else if (this.__encoding[key].bind == 'depth') {
                                    item.depth = new hierarchical.Value(depth, null);
                                }
                            }
                        }
                        else {
                            item[key] = new hierarchical.Value(data[this.__encoding[key].bind], null);
                        }
                    }
                    // item.count = new Value(item.children.length,null);
                    // item.depth = new Value(depth,null);
                    return item;
                };
                DataModel.prototype.__createRoot = function () {
                    // this.__root = this.__createModel(this.__data.values);
                    this.__root = [];
                    for (var _i = 0, _a = this.__data.values; _i < _a.length; _i++) {
                        var item = _a[_i];
                        this.__root.push(this.__createModel(item, 0));
                    }
                };
                DataModel.prototype.refresh = function () {
                    // do nothing
                };
                DataModel.prototype.__createScale = function (filed) {
                    Debug.assert(filed != null);
                    var scale = null;
                    switch (filed.type) {
                        case test.ScaleType.Linear:
                            scale = new test.LinearScale(filed.name);
                            break;
                        case test.ScaleType.Ordinal:
                            scale = new test.OrdinalScale(filed.name);
                            break;
                        default:
                            Debug.assert(false, filed.type + " ScaleType has not been implement!");
                            break;
                    }
                    return scale;
                };
                Object.defineProperty(DataModel.prototype, "root", {
                    get: function () {
                        return this.__root;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataModel.prototype, "encoding", {
                    get: function () {
                        return this.__encoding;
                    },
                    enumerable: true,
                    configurable: true
                });
                DataModel.id = 0;
                return DataModel;
            }());
            hierarchical.DataModel = DataModel;
        })(hierarchical = test.hierarchical || (test.hierarchical = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../base.ts" />
/// <reference path="../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var Scale = /** @class */ (function () {
            function Scale(id) {
                this.__bound = false;
                this.__domains = [];
                this.__ranges = [];
                this.id = id;
                this._order = test.Order.None;
            }
            Object.defineProperty(Scale.prototype, "id", {
                get: function () {
                    return this.__id;
                },
                set: function (value) {
                    this.__id = value;
                },
                enumerable: true,
                configurable: true
            });
            Scale.prototype.domain = function (domains) {
                this.__domains = domains;
                return this;
            };
            Scale.prototype.range = function (ranges) {
                this.__ranges = ranges;
                return this.refresh();
            };
            Scale.prototype.rangeBounds = function (ranges) {
                return this;
            };
            Scale.prototype.refresh = function () {
                return this;
            };
            Scale.prototype.getScaleValue = function (value) {
                return 0;
            };
            Object.defineProperty(Scale.prototype, "startPosition", {
                get: function () {
                    return this.__start;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Scale.prototype, "endPosition", {
                get: function () {
                    return this.__end;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Scale.prototype, "order", {
                get: function () {
                    return this._order;
                },
                set: function (value) {
                    this._order = value;
                },
                enumerable: true,
                configurable: true
            });
            Scale.prototype.equal = function (value) {
                if (value != null) {
                    return this.id == value.id;
                }
                return false;
            };
            Scale.prototype.clone = function () {
                return _.cloneDeep(this);
            };
            return Scale;
        }());
        test.Scale = Scale;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var LinearScale = /** @class */ (function (_super) {
            __extends(LinearScale, _super);
            function LinearScale(id) {
                return _super.call(this, id) || this;
            }
            Object.defineProperty(LinearScale.prototype, "max", {
                get: function () {
                    return this._max;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinearScale.prototype, "min", {
                get: function () {
                    return this._min;
                },
                enumerable: true,
                configurable: true
            });
            LinearScale.prototype.domain = function (domains) {
                _super.prototype.domain.call(this, domains);
                this._min = this.__domains[0];
                this._max = this.__domains[1];
                return this;
            };
            LinearScale.prototype.refresh = function () {
                if (this.order === test.Order.Asc) {
                    this.__start = this.__ranges[0];
                    this.__end = this.__ranges[1];
                }
                else if (this.order === test.Order.Desc) {
                    this.__start = this.__ranges[1];
                    this.__end = this.__ranges[0];
                }
                else {
                    this.__start = this.__ranges[0];
                    this.__end = this.__ranges[1];
                }
                this._min = this.__domains[0];
                this._max = this.__domains[1];
                return this;
            };
            LinearScale.prototype.range = function (ranges) {
                this.__ranges = ranges;
                return (this.refresh(), this);
            };
            LinearScale.prototype.getScaleValue = function (v) {
                var value;
                if (this._max == this._min) {
                    value = (this.__end - this.__start) / 2 + this.__start;
                }
                else {
                    value = (this.__end - this.__start) / (this._max - this._min) * (v - this._min) + this.__start;
                }
                return value;
            };
            LinearScale.prototype.equal = function (value) {
                if (value != null) {
                    return value.id == this.id && value.max == this.max && value.min == this.min;
                }
                return false;
            };
            return LinearScale;
        }(test.Scale));
        test.LinearScale = LinearScale;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var OrdinalScale = /** @class */ (function (_super) {
            __extends(OrdinalScale, _super);
            function OrdinalScale(id) {
                var _this = _super.call(this, id) || this;
                _this._domainCache = {};
                _this._size = 0;
                return _this;
            }
            OrdinalScale.prototype.refresh = function () {
                if (this.order === test.Order.Asc) {
                    this.__domains.sort(function (a, b) {
                        return a - b;
                    });
                }
                else if (this.order === test.Order.Desc) {
                    this.__domains.sort(function (a, b) {
                        return b - a;
                    });
                }
                this._domainCache = {};
                // for(let i = 0; i < this.__domains.length; ++i){
                //     if(this._domainCache[this.__domains[i]] == null){
                //         this._domainCache[this.__domains[i]]=i;
                //     }
                // }
                var index = 0;
                for (var _i = 0, _a = this.__domains; _i < _a.length; _i++) {
                    var ds = _a[_i];
                    if (this._domainCache[ds] == null) {
                        this._domainCache[ds] = index;
                        index++;
                    }
                }
                this._size = index;
                android.Debug.assert(this.__ranges != null, "");
                // Debug.assert(this.__ranges.length == 2);
                if (this.__ranges.length == 2) {
                    this.__start = this.__ranges[0];
                    this.__end = this.__ranges[1];
                }
                return this;
            };
            Object.defineProperty(OrdinalScale.prototype, "max", {
                get: function () {
                    return this._size;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OrdinalScale.prototype, "min", {
                get: function () {
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OrdinalScale.prototype, "domains", {
                get: function () {
                    return this.__domains;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OrdinalScale.prototype, "ranges", {
                get: function () {
                    return this.__ranges;
                },
                enumerable: true,
                configurable: true
            });
            OrdinalScale.prototype.range = function (ranges) {
                this.__ranges = ranges;
                this.__bound = false;
                return (this.refresh(), this);
            };
            OrdinalScale.prototype.rangeBounds = function (ranges) {
                this.__ranges = ranges;
                this.__bound = true;
                return (this.refresh(), this);
            };
            OrdinalScale.prototype.domain = function (domains) {
                this.__domains = domains;
                return this;
            };
            OrdinalScale.prototype.getScaleValue = function (v) {
                // var index = this.__domains.indexOf(v);
                // var index = _.indexOf(this.__domains,v);
                var index = this._domainCache[v];
                if (isNaN(index)) {
                    index = 0;
                }
                var value = 0;
                var size = this._size;
                if (size < 2) {
                    size = 2;
                }
                if (typeof (this.__end) == 'number' && typeof (this.__start) == 'number') {
                    if (this.__bound) {
                        value = (index + 0.5) * (this.__end - this.__start) / size + this.__start;
                    }
                    else {
                        value = index * (this.__end - this.__start) / (size - 1) + this.__start;
                    }
                }
                return value;
            };
            return OrdinalScale;
        }(test.Scale));
        test.OrdinalScale = OrdinalScale;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var LogScale = /** @class */ (function (_super) {
            __extends(LogScale, _super);
            function LogScale(logbase, id) {
                var _this = _super.call(this, id) || this;
                _this._ticksize = 6;
                _this._logBase = logbase;
                return _this;
            }
            LogScale.prototype.domain = function (domains) {
                _super.prototype.domain.call(this, domains);
                this._min = this.__domains[0];
                this._max = this.__domains[1];
                return this;
            };
            Object.defineProperty(LogScale.prototype, "logBase", {
                get: function () {
                    return this._logBase;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LogScale.prototype, "tickSize", {
                set: function (value) {
                    this._ticksize = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LogScale.prototype, "max", {
                get: function () {
                    return this._max;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LogScale.prototype, "min", {
                get: function () {
                    return this._min;
                },
                enumerable: true,
                configurable: true
            });
            LogScale.prototype.refresh = function () {
                if (this.order === test.Order.Asc) {
                    this.__start = this.__ranges[0];
                    this.__end = this.__ranges[1];
                }
                else if (this.order === test.Order.Desc) {
                    this.__start = this.__ranges[1];
                    this.__end = this.__ranges[0];
                }
                else {
                    this.__start = this.__ranges[0];
                    this.__end = this.__ranges[1];
                }
                this._min = this.__domains[0];
                this._max = this.__domains[1];
                if (this._logBase > 0) {
                    var base = this._logBase;
                    var k = Math.log(base);
                    var imax = Math.ceil(Math.log(this._max) / k);
                    this._max = Math.pow(base, imax);
                    var imin = Math.floor(Math.log(this._min) / k);
                    this._min = Math.pow(base, imin);
                    if (this._min <= 0 || isNaN(this._min)) {
                        this._min = 1;
                    }
                    if (this._max < this._min) {
                        this._max = this._min + 1;
                    }
                }
                return this;
            };
            LogScale.prototype.range = function (ranges) {
                this.__ranges = ranges;
                return (this.refresh(), this);
            };
            Object.defineProperty(LogScale.prototype, "ticks", {
                get: function () {
                    var ticks = new Array(this._ticksize);
                    for (var i = 0; i <= this._ticksize; ++i) {
                        ticks[i] = i * this._niceTick;
                    }
                    return ticks;
                },
                enumerable: true,
                configurable: true
            });
            LogScale.prototype.getScaleValue = function (v) {
                if (v < this._min) {
                    v = this._min;
                }
                var maxl = Math.log(this._max / this._min);
                var value = Math.log(v / this._min) / maxl * (this.__end - this.__start) + this.__start;
                return value;
            };
            return LogScale;
        }(test.Scale));
        test.LogScale = LogScale;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
// /// <reference path="../base.ts" />
// namespace android.test {
//         export class ColorScale extends OrdinalScale {
//             private __colorranges:string[];
//             constructor(id?: any) {
//                 super(id);
//                 this.__colorranges =[];
//             }
//             get domains(): any[] {
//                 return this.__domains;
//             }
//             range(ranges: any[]) {
//                 if(ranges.length > 1){
//                     this.__colorranges =ColorUtils.gradientColor(ranges[0],ranges[ranges.length-1],this.__domains.length);
//                 }
//                 return super.range([0,this.__colorranges.length-1]);
//             }
//              rangeBounds(ranges: any[]) {
//                 if(ranges.length > 1){
//                     this.__colorranges =ColorUtils.gradientColor(ranges[0],ranges[ranges.length-1],this.__domains.length);
//                 }
//                 return super.range([0,this.__colorranges.length-1]);
//             }
//             getScaleValue(v: any):any {
//                 var index = this.__domains.indexOf(v);
//                 return this.__colorranges[index];
//             }
//         }
//     }
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var ElementType;
        (function (ElementType) {
            ElementType[ElementType["Shape"] = 0] = "Shape";
            ElementType[ElementType["Series"] = 1] = "Series";
            ElementType[ElementType["Axis"] = 2] = "Axis";
            ElementType[ElementType["SeriesLegend"] = 3] = "SeriesLegend";
            ElementType[ElementType["ScaleLegend"] = 4] = "ScaleLegend";
        })(ElementType = test.ElementType || (test.ElementType = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var cartesian;
        (function (cartesian) {
            'use strict';
            var View = android.view.View;
            var Rect = android.graphics.Rect;
            var Style = android.graphics.Style;
            var Default = android.device.Default;
            var LinearGradient = android.graphics.LinearGradient;
            var FillStyle = android.graphics.FillStyle;
            var ScaleLegend = /** @class */ (function (_super) {
                __extends(ScaleLegend, _super);
                function ScaleLegend(c, type) {
                    var _this = _super.call(this, c) || this;
                    _this.__type = null;
                    _this.__type = type;
                    return _this;
                }
                Object.defineProperty(ScaleLegend.prototype, "scale", {
                    get: function () {
                        return this.__scale;
                    },
                    set: function (scale) {
                        this.__scale = scale;
                    },
                    enumerable: true,
                    configurable: true
                });
                ScaleLegend.prototype.onMeasure = function (width, height, canvas) {
                    return _super.prototype.onMeasure.call(this, width, height, canvas);
                };
                ScaleLegend.prototype.onLayout = function (l, t, r, b, canvas) {
                    _super.prototype.onLayout.call(this, l, t, r, b, canvas);
                };
                ScaleLegend.prototype.onDraw = function (canvas) {
                    _super.prototype.onDraw.call(this, canvas);
                    if (this.__type == 'value') {
                    }
                    else if (this.__type == 'color') {
                        this._drawColorScale(canvas);
                    }
                };
                ScaleLegend.prototype._drawColorScale = function (canvas) {
                    var colorScale = this.__scale;
                    if (colorScale instanceof test.OrdinalScale) {
                        // let colorindex = colorScale.getScaleValue(colorValue.value);
                        //  color = colorArray[colorindex];
                        var colorArray = null;
                        if (colorScale.startPosition == null || colorScale.endPosition == null) {
                            colorArray = colorScale.ranges;
                        }
                        else {
                            colorArray = test.ColorUtils.gradientColor(colorScale.startPosition, colorScale.endPosition, colorScale.domains.length);
                        }
                        var len = colorArray.length;
                        var step = this.layoutInfo.innerrect.width / len;
                        var left = this.layoutInfo.innerrect.left;
                        var top_1 = this.layoutInfo.innerrect.top;
                        var height = this.layoutInfo.innerrect.height;
                        var style = Default.style;
                        for (var _i = 0, colorArray_1 = colorArray; _i < colorArray_1.length; _i++) {
                            var color = colorArray_1[_i];
                            var rect = new Rect(left, top_1, left + step, top_1 + height);
                            style.background = color;
                            canvas.drawRect(rect.startPoint, rect.endPoint, true, style);
                            left += step;
                        }
                    }
                    else if (colorScale instanceof test.LinearScale) {
                        // color = ColorUtils.getColor(colorScale.startPosition,colorScale.endPosition,colorValue.value,colorScale.min,colorScale.max);
                        var sx = this.layoutInfo.innerrect.left + this.layoutInfo.innerrect.width / 2;
                        var sy = this.layoutInfo.innerrect.top;
                        var ex = sy;
                        var ey = this.layoutInfo.innerrect.bottom;
                        var l = new LinearGradient(sx, sy, ex, ey, [
                            { offset: 0, color: colorScale.startPosition },
                            { offset: 1, color: colorScale.endPosition }
                        ]);
                        var fill = new FillStyle();
                        fill.fill = l;
                        var style = new Style(fill, null);
                        canvas.drawRect(this.layoutInfo.innerrect.startPoint, this.layoutInfo.innerrect.endPoint, true, style);
                    }
                };
                return ScaleLegend;
            }(View));
            cartesian.ScaleLegend = ScaleLegend;
        })(cartesian = test.cartesian || (test.cartesian = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var cartesian;
        (function (cartesian) {
            'use strict';
            var View = android.view.View;
            var LinearLayout = android.widget.LinearLayout;
            var MeasureSpec = android.view.MeasureSpec;
            var Size = android.graphics.Size;
            var Rect = android.graphics.Rect;
            var Default = android.device.Default;
            var LayoutParams = android.view.LayoutParams;
            var MotionEvent = android.view.event.MotionEvent;
            var Message = android.util.Message;
            var SeriesLegend = /** @class */ (function (_super) {
                __extends(SeriesLegend, _super);
                function SeriesLegend(c, shape) {
                    var _this = _super.call(this, c) || this;
                    _this.__shape = shape;
                    return _this;
                }
                Object.defineProperty(SeriesLegend.prototype, "series", {
                    get: function () {
                        return this._series;
                    },
                    set: function (value) {
                        this._series = value;
                        this.__loadItems();
                    },
                    enumerable: true,
                    configurable: true
                });
                SeriesLegend.prototype.__loadItems = function () {
                    this.removeAllViews();
                    var colorArray = [];
                    for (var i = 0; i < this.series.length; ++i) {
                        var item = new LegendItem(this.getContext());
                        item.series = this.series[i];
                        if (this.__shape == 'bar') {
                            item.icon = new BarIcon();
                        }
                        else if (this.__shape == 'scatter') {
                            item.icon = new CircleIcon();
                        }
                        if (item.series.enable) {
                            item.icon.color = test.ColorUtils.indexColor(i);
                        }
                        else {
                            item.icon.color = 'gray';
                        }
                        this.children.push(item);
                    }
                };
                return SeriesLegend;
            }(LinearLayout));
            cartesian.SeriesLegend = SeriesLegend;
            var PADDING = 5;
            var LegendItem = /** @class */ (function (_super) {
                __extends(LegendItem, _super);
                function LegendItem(c) {
                    var _this = _super.call(this, c) || this;
                    _this.font = Default.font;
                    _this.font.fontColor = 'black';
                    return _this;
                }
                LegendItem.prototype.onMeasure = function (width, height, canvas) {
                    var w = width.getMeasureValue();
                    var h = height.getMeasureValue();
                    var size = new Size(0, 0);
                    size = canvas.measureString(this.series.name, this.font);
                    this.__fontRect = new Rect(0, 0, size.width, size.height);
                    var iconsize = size.height * 2;
                    this.__iconRect = new Rect(0, 0, iconsize, size.height);
                    size.width = size.width + PADDING * 3 + iconsize;
                    this.setMeasuredDimension(new MeasureSpec(size.width, LayoutParams.EXACTLY), new MeasureSpec(size.height, LayoutParams.EXACTLY));
                    return size;
                };
                LegendItem.prototype.onLayout = function (l, t, r, b, canvas) {
                    _super.prototype.onLayout.call(this, l, t, r, b, canvas);
                    this.__fontRect.translate(l, t);
                    this.__iconRect.translate(l + PADDING + this.__fontRect.width, t);
                };
                LegendItem.prototype.onDraw = function (canvas) {
                    canvas.drawText(this.series.name, this.__fontRect.startPoint, this.font);
                    this.icon.draw(this.__iconRect, canvas);
                };
                LegendItem.prototype.onMouseEvent = function (event) {
                    var handler = this.getContext().getArgs(cartesian.EventMessage);
                    switch (event.action) {
                        case MotionEvent.ACTION_CLICK:
                            console.log("event ");
                            // window['EventHandler'](new Point(event.x, event.y), ElementType.SeriesLegend, { 'series': this.series.name, 'enable': this.series.enable ,action:"enableseries"});
                            var msg = new Message();
                            msg.args['types'] = test.ElementType.SeriesLegend;
                            msg.args['info'] = { 'series': this.series.name, 'enable': this.series.enable, action: "enableseries" };
                            handler.sendMessage(msg);
                            break;
                        case MotionEvent.ACTION_MOUSE_ON:
                            this.series.showlabels = true;
                            // window['EventHandler'](new Point(event.x, event.y), ElementType.SeriesLegend, { 'series': this.series.name, 'showlabel': this.series.showlabels,action:"showlabel" });
                            break;
                        case MotionEvent.ACTION_MOUSE_OUT:
                            this.series.showlabels = false;
                            // window['EventHandler'](new Point(event.x, event.y), ElementType.SeriesLegend, { 'series': this.series.name, 'showlabel': this.series.showlabels ,action:"showlabel"});
                            break;
                    }
                    return false;
                };
                return LegendItem;
            }(View));
            cartesian.LegendItem = LegendItem;
            var Icon = /** @class */ (function () {
                function Icon() {
                }
                return Icon;
            }());
            cartesian.Icon = Icon;
            var BarIcon = /** @class */ (function (_super) {
                __extends(BarIcon, _super);
                function BarIcon() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                BarIcon.prototype.draw = function (rect, canvas) {
                    var style = Default.style;
                    style.background = this.color;
                    canvas.drawRect(rect.startPoint, rect.endPoint, true, style);
                };
                return BarIcon;
            }(Icon));
            cartesian.BarIcon = BarIcon;
            var CircleIcon = /** @class */ (function (_super) {
                __extends(CircleIcon, _super);
                function CircleIcon() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                CircleIcon.prototype.draw = function (rect, canvas) {
                    var style = Default.style;
                    style.background = this.color;
                    canvas.drawArc(rect, 0, 2 * 180, style);
                };
                return CircleIcon;
            }(Icon));
            cartesian.CircleIcon = CircleIcon;
        })(cartesian = test.cartesian || (test.cartesian = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var Shape = /** @class */ (function (_super) {
            __extends(Shape, _super);
            function Shape(context) {
                var _this = _super.call(this, context) || this;
                _this.priority = Shape.PRIORITY;
                return _this;
            }
            Object.defineProperty(Shape.prototype, "style", {
                get: function () {
                    return this._style;
                },
                set: function (value) {
                    this._style = value;
                },
                enumerable: true,
                configurable: true
            });
            Shape.prototype.onDraw = function (canvas) {
                _super.prototype.onDraw.call(this, canvas);
                if (this.comparedAnimationEmpty) {
                    this.onDrawShape(canvas);
                }
                else {
                    this._drawAnimation(canvas);
                }
            };
            Shape.prototype._drawAnimation = function (canvas) {
                canvas.drawPolygon(this.animationXs, this.animationYs, this.style);
            };
            Shape.prototype.onMouseEvent = function (event) {
                return true;
            };
            Shape.PRIORITY = 10000;
            return Shape;
        }(android.ComparedView));
        test.Shape = Shape;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var Label = /** @class */ (function (_super) {
            __extends(Label, _super);
            function Label(c, text, cx, cy, w, h, angle, padding) {
                var _this = _super.call(this, c) || this;
                _this.__padding = 0;
                _this.priority = test.Shape.PRIORITY * 10;
                _this.__padding = padding;
                _this.text = text;
                _this.labelrect = new test.RotateRect(cx, cy, w + padding * 2, h + padding * 2, (angle == null || isNaN(angle)) ? 0 : angle);
                _this._xs = [];
                _this._ys = [];
                for (var i = 0; i < 4 && i < _this.labelrect.points.length; ++i) {
                    _this._xs[i] = _this.labelrect.points[i].x;
                    _this._ys[i] = _this.labelrect.points[i].y;
                }
                return _this;
            }
            Label.prototype.getpts = function (size) {
                return { xs: this._xs, ys: this._ys };
            };
            Label.prototype.onDrawShape = function (canvas) {
                canvas.drawPolygon(this._xs, this._ys, this.background);
                var pt = this.labelrect.leftTop.clone();
                pt.offset(this.__padding, this.__padding);
                canvas.drawText(this.text, pt, this._font);
            };
            Label.prototype.refresh = function () {
            };
            return Label;
        }(test.Shape));
        test.Label = Label;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var PlotShape = /** @class */ (function (_super) {
            __extends(PlotShape, _super);
            function PlotShape() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(PlotShape.prototype, "label", {
                get: function () {
                    return this._label;
                },
                set: function (value) {
                    if (value != null && value != this._label) {
                        this._label = value;
                    }
                },
                enumerable: true,
                configurable: true
            });
            // onDraw(canvas: Canvas): void {
            //     super.onDraw(canvas);
            //     if (this._label != null) {
            //         this._label.onDraw(canvas);
            //     }
            // }
            PlotShape.prototype.refresh = function () {
                // console.log(" *** you, this function is not been implemented yet!!! ");
            };
            return PlotShape;
        }(test.Shape));
        test.PlotShape = PlotShape;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var Default = android.device.Default;
        var Animation = android.view.animation.Animation;
        var MotionEvent = android.view.event.MotionEvent;
        var BarShape = /** @class */ (function (_super) {
            __extends(BarShape, _super);
            function BarShape(c, x, y, w, h, style, strokeStyle) {
                var _this = _super.call(this, c) || this;
                var top = y;
                var left = x;
                var height = h;
                var width = w;
                if (height < 0) {
                    top = top + height;
                    height = Math.abs(height);
                }
                _this.priority = ++BarShape.BarPrority;
                _this.layoutInfo.reset(left, top, left + width, top + height, _this.padding, 0);
                _this._oldLayoutInfo = _this.layoutInfo.clone();
                _this._style = style;
                if (style == null) {
                    _this._style = Default.style;
                }
                _this._strokeStyle = strokeStyle;
                if (strokeStyle == null) {
                    _this._strokeStyle = Default.strokestyle;
                }
                return _this;
            }
            BarShape.prototype.onDrawShape = function (canvas) {
                window['renderTimes']++;
                canvas.drawRect(this.layoutInfo.innerrect.startPoint, this.layoutInfo.innerrect.endPoint, true, this._style);
            };
            BarShape.prototype.onMouseEvent = function (event) {
                switch (event.action) {
                    case MotionEvent.ACTION_MOUSE_ON:
                        var animation_on = new BarWidthAnimation(this.layoutInfo.innerrect);
                        animation_on.duration = 400;
                        animation_on.from = 1;
                        animation_on.to = 1.3;
                        animation_on.fillAfter = true;
                        animation_on.id = "mouseOn Animation ";
                        console.log("=======> addAnimation on ");
                        console.log("mouse on ");
                        this.startAnimation(animation_on);
                        break;
                    case MotionEvent.ACTION_MOUSE_OUT:
                        var animation_out = new BarWidthAnimation(this.layoutInfo.innerrect);
                        animation_out.duration = 200;
                        animation_out.from = 1.3;
                        animation_out.to = 1;
                        animation_out.id = "mouseOut Animation ";
                        animation_out.fillAfter = false;
                        console.log("=======> addAnimation out ");
                        console.log("mouse out ");
                        this.startAnimation(animation_out);
                        break;
                    case MotionEvent.ACTION_MOUSE_MOVE:
                        break;
                    case MotionEvent.ACTION_MOUSE_OUT:
                        break;
                }
                return true;
            };
            BarShape.BarPrority = test.Shape.PRIORITY * 2;
            return BarShape;
        }(test.PlotShape));
        test.BarShape = BarShape;
        var BarAnimation = /** @class */ (function (_super) {
            __extends(BarAnimation, _super);
            function BarAnimation(rect) {
                var _this = _super.call(this) || this;
                _this.ease = new android.view.animation.BounceAnimationEase();
                return _this;
            }
            BarAnimation.prototype.applyTransformation = function (interpolatedTime, canvas, view) {
                if (view instanceof BarShape) {
                    var scale = this.from + (this.to - this.from) * interpolatedTime;
                    var rect = this.rect.clone();
                    view.layoutInfo.innerrect.top = this.rect.top + this.rect.height - this.rect.height * scale;
                    view.layoutInfo.innerrect.height = this.rect.height * scale;
                }
            };
            BarAnimation.prototype.onStartAniamtion = function (canvas, view) {
                this.rect = view.layoutInfo.innerrect.clone();
            };
            BarAnimation.prototype.onEndAnimation = function (canvas, view) {
            };
            return BarAnimation;
        }(Animation));
        test.BarAnimation = BarAnimation;
        var BarWidthAnimation = /** @class */ (function (_super) {
            __extends(BarWidthAnimation, _super);
            function BarWidthAnimation(rect) {
                var _this = _super.call(this) || this;
                _this.id = "";
                _this.ease = new android.view.animation.BounceAnimationEase();
                return _this;
            }
            BarWidthAnimation.prototype.applyTransformation = function (interpolatedTime, canvas, view) {
                if (view instanceof BarShape) {
                    var scale = this.from + (this.to - this.from) * interpolatedTime;
                    var rect = this.rect.clone();
                    // scale = scale - 1;
                    view.layoutInfo.innerrect.left = this.rect.left + (this.rect.width - this.rect.width * scale) / 2;
                    view.layoutInfo.innerrect.width = this.rect.width * scale;
                    console.log(this.id + ' width === ' + view.layoutInfo.innerrect.width + " scale " + scale + "  interpolatedTime " + interpolatedTime);
                }
            };
            BarWidthAnimation.prototype.onStartAniamtion = function (canvas, view) {
                // console.log("onStartAniamtion ");
                _super.prototype.onStartAniamtion.call(this, canvas, view);
                console.log("onStartAniamtion view Width " + view.layoutInfo.innerrect.width);
                this.rect = view.layoutInfo.innerrect.clone();
            };
            BarWidthAnimation.prototype.onEndAnimation = function (canvas, view) {
                _super.prototype.onEndAnimation.call(this, canvas, view);
                console.log("onEndAnimation view Width " + view.layoutInfo.innerrect.width);
                // view.layoutInfo.innerrect = this.rect;
                // console.log("onAnimationEnd " + view.layoutInfo.innerrect.width + "  ");
            };
            return BarWidthAnimation;
        }(Animation));
        test.BarWidthAnimation = BarWidthAnimation;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var Default = android.device.Default;
        var Animation = android.view.animation.Animation;
        var MotionEvent = android.view.event.MotionEvent;
        var Debug = android.Debug;
        var CubeShape = /** @class */ (function (_super) {
            __extends(CubeShape, _super);
            function CubeShape(c, x, y, w, h, style, strokeStyle) {
                var _this = _super.call(this, c) || this;
                _this.__oldColor = null;
                var top = y;
                var left = x;
                var height = h;
                var width = w;
                if (height < 0) {
                    top = top + height;
                    height = Math.abs(height);
                }
                _this.priority = ++CubeShape.CubePrority;
                _this.layoutInfo.reset(left, top, left + width, top + height, _this.padding, 0);
                _this._oldLayoutInfo = _this.layoutInfo.clone();
                _this._style = style;
                if (style == null) {
                    _this._style = Default.style;
                }
                _this._strokeStyle = strokeStyle;
                if (strokeStyle == null) {
                    _this._strokeStyle = Default.strokestyle;
                }
                _this.background = null;
                return _this;
            }
            CubeShape.prototype.onDrawShape = function (canvas) {
                window['renderTimes']++;
                canvas.drawRect(this.layoutInfo.innerrect.startPoint, this.layoutInfo.innerrect.endPoint, true, this._style);
                if (this.animation == null || this.animation.isAniamtionEnd) {
                    canvas.drawText(this.text, this.layoutInfo.innerrect.startPoint, Default.font);
                }
            };
            CubeShape.prototype.invalidate = function (flg) {
                _super.prototype.invalidate.call(this, flg);
                // console.log("cubeinvalidate  " +( window['cubeinvalidate'] ==null? window['cubeinvalidate']=0: window['cubeinvalidate']++));
                Debug.logstack("cubeinvalidate  " + (window['cubeinvalidate'] == null ? window['cubeinvalidate'] = 0 : window['cubeinvalidate']++));
            };
            CubeShape.prototype.onMouseEvent = function (event) {
                switch (event.action) {
                    case MotionEvent.ACTION_MOUSE_ON:
                        if (typeof this.style.background == 'string') {
                            if (this.__oldColor == null) {
                                this.__oldColor = this.style.background;
                            }
                            var colors = test.ColorUtils.gradientColor(this.__oldColor, '#ffffff', 3);
                            this.style.background = colors[1];
                        }
                        console.log("mouse on ");
                        this.invalidate(true);
                        break;
                    case MotionEvent.ACTION_MOUSE_OUT:
                        this.style.background = this.__oldColor;
                        this.invalidate(true);
                        console.log("mouse out ");
                        break;
                    case MotionEvent.ACTION_MOUSE_MOVE:
                        break;
                    case MotionEvent.ACTION_CLICK:
                        console.log("click ");
                        if (this.scaleCallBack != null) {
                            this.scaleCallBack(this.layoutInfo.innerrect);
                        }
                        break;
                }
                return true;
            };
            CubeShape.prototype.getComparedAnimation = function (fromview) {
                var animation = new _Animation(fromview.layoutInfo.innerrect.clone(), this.layoutInfo.innerrect.clone());
                animation.duration = 500;
                animation.fillAfter = true;
                animation.from = 0;
                animation.to = 1;
                return animation;
            };
            CubeShape.CubePrority = test.Shape.PRIORITY * 1;
            return CubeShape;
        }(test.PlotShape));
        test.CubeShape = CubeShape;
        var _Animation = /** @class */ (function (_super) {
            __extends(_Animation, _super);
            function _Animation(fromrect, torect) {
                var _this = _super.call(this) || this;
                _this.ease = new android.view.animation.AnimationEase();
                _this.fromrect = fromrect;
                _this.torect = torect;
                return _this;
            }
            _Animation.prototype.applyTransformation = function (interpolatedTime, canvas, view) {
                var scale = this.from + (this.to - this.from) * interpolatedTime;
                view.layoutInfo.innerrect.left = this.fromrect.left + (this.torect.left - this.fromrect.left) * scale;
                view.layoutInfo.innerrect.top = this.fromrect.top + (this.torect.top - this.fromrect.top) * scale;
                view.layoutInfo.innerrect.width = this.fromrect.width + (this.torect.width - this.fromrect.width) * scale;
                view.layoutInfo.innerrect.height = this.fromrect.height + (this.torect.height - this.fromrect.height) * scale;
            };
            _Animation.prototype.onStartAniamtion = function (canvas, view) {
                _super.prototype.onStartAniamtion.call(this, canvas, view);
            };
            _Animation.prototype.onEndAnimation = function (canvas, view) {
                _super.prototype.onEndAnimation.call(this, canvas, view);
                view.layoutInfo.innerrect = view._oldLayoutInfo.innerrect.clone();
            };
            return _Animation;
        }(Animation));
        var CubeAnimation = /** @class */ (function (_super) {
            __extends(CubeAnimation, _super);
            function CubeAnimation(rect) {
                var _this = _super.call(this) || this;
                _this.ease = new android.view.animation.BounceAnimationEase();
                return _this;
            }
            CubeAnimation.prototype.applyTransformation = function (interpolatedTime, canvas, view) {
                if (view instanceof CubeShape) {
                    var scale = this.from + (this.to - this.from) * interpolatedTime;
                    var rect = this.rect.clone();
                    // scale = scale - 1;
                    view.layoutInfo.innerrect.left = this.rect.left + (this.rect.width - this.rect.width * scale) / 2;
                    view.layoutInfo.innerrect.width = this.rect.width * scale;
                    view.layoutInfo.innerrect.top = this.rect.top + (this.rect.height - this.rect.height * scale) / 2;
                    view.layoutInfo.innerrect.height = this.rect.height * scale;
                    // console.log('bar height === ' + view.layoutInfo.innerrect.height +" scale " + scale +"  interpolatedTime "+interpolatedTime);
                }
            };
            CubeAnimation.prototype.onStartAniamtion = function (canvas, view) {
                // console.log("onStartAniamtion ");
                _super.prototype.onStartAniamtion.call(this, canvas, view);
                this.rect = view.layoutInfo.innerrect.clone();
            };
            CubeAnimation.prototype.onEndAnimation = function (canvas, view) {
                _super.prototype.onEndAnimation.call(this, canvas, view);
                // view.layoutInfo.innerrect = this.rect;
                // console.log("onAnimationEnd " + view.layoutInfo.innerrect.width + "  ");
            };
            return CubeAnimation;
        }(Animation));
        test.CubeAnimation = CubeAnimation;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var Default = android.device.Default;
        var Point = android.graphics.Point;
        var Util = android.graphics.Util;
        var RadialBarShape = /** @class */ (function (_super) {
            __extends(RadialBarShape, _super);
            function RadialBarShape(c, cx, cy, innerRadius, radius, startAngle, sweep, style, strokeStyle) {
                var _this = _super.call(this, c) || this;
                _this.layoutInfo.reset(cx - radius, cy - radius, cx + radius, cy + radius, _this.padding, 0);
                _this._oldLayoutInfo = _this.layoutInfo.clone();
                _this._cx = cx;
                _this._cy = cy;
                _this._innerRadius = innerRadius;
                _this._radius = radius;
                _this._startAngle = startAngle;
                _this._sweep = sweep;
                _this._style = style;
                if (style == null) {
                    _this._style = Default.style;
                }
                _this._strokeStyle = strokeStyle;
                if (strokeStyle == null) {
                    _this._strokeStyle = Default.strokestyle;
                }
                if (_this._sweep < 0) {
                    _this._startAngle = _this._startAngle + _this._sweep;
                    _this._sweep = _this._sweep * -1;
                }
                return _this;
            }
            RadialBarShape.prototype.getpts = function (size) {
                if (this._pts == null) {
                    this._pts = Util.createPtsFromRadialBar(this._startAngle, this._startAngle + this._sweep, this._radius, this._innerRadius, new Point(this._cx, this._cy), this.ptcount);
                }
                return this._pts;
            };
            RadialBarShape.prototype.onDrawShape = function (canvas) {
                canvas.drawDonut(this._cx, this._cy, this._radius, this._innerRadius, this._startAngle, this._sweep, this._style);
            };
            return RadialBarShape;
        }(test.PlotShape));
        test.RadialBarShape = RadialBarShape;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var Default = android.device.Default;
        var Animation = android.view.animation.Animation;
        var SunburstShape = /** @class */ (function (_super) {
            __extends(SunburstShape, _super);
            function SunburstShape(c, cx, cy, innerRadius, radius, startAngle, sweep, style, strokeStyle) {
                var _this = _super.call(this, c) || this;
                _this.layoutInfo.reset(cx - radius, cy - radius, cx + radius, cy + radius, _this.padding, 0);
                _this._oldLayoutInfo = _this.layoutInfo.clone();
                _this._cx = cx;
                _this._cy = cy;
                _this._innerRadius = innerRadius;
                _this._radius = radius;
                _this._startAngle = startAngle;
                _this._sweep = sweep;
                _this._style = style;
                if (style == null) {
                    _this._style = Default.style;
                }
                _this._strokeStyle = strokeStyle;
                if (strokeStyle == null) {
                    _this._strokeStyle = Default.strokestyle;
                }
                if (_this._sweep < 0) {
                    _this._startAngle = _this._startAngle + _this._sweep;
                    _this._sweep = _this._sweep * -1;
                }
                return _this;
            }
            SunburstShape.prototype.onDrawShape = function (canvas) {
                canvas.drawDonut(this._cx, this._cy, this._radius, this._innerRadius, this._startAngle, this._sweep, this._style);
            };
            return SunburstShape;
        }(test.PlotShape));
        test.SunburstShape = SunburstShape;
        var RadiusAnimation = /** @class */ (function (_super) {
            __extends(RadiusAnimation, _super);
            function RadiusAnimation() {
                var _this = _super.call(this) || this;
                _this.ease = new android.view.animation.BounceAnimationEase();
                return _this;
            }
            RadiusAnimation.prototype.applyTransformation = function (interpolatedTime, canvas, view) {
                if (view instanceof SunburstShape || view instanceof test.RadialBarShape) {
                    var scale = this.from + (this.to - this.from) * interpolatedTime;
                    view._radius = scale * this._radius;
                    // console.log('bar height === ' + view.layoutInfo.innerrect.height +" scale " + scale +"  interpolatedTime "+interpolatedTime);
                }
            };
            RadiusAnimation.prototype.onStartAniamtion = function (canvas, view) {
                // console.log("onStartAniamtion ");
                _super.prototype.onStartAniamtion.call(this, canvas, view);
                if (view instanceof SunburstShape || view instanceof test.RadialBarShape) {
                    this._radius = view._radius;
                    this._sweep = view._sweep;
                }
            };
            RadiusAnimation.prototype.onEndAnimation = function (canvas, view) {
                _super.prototype.onEndAnimation.call(this, canvas, view);
                // view.layoutInfo.innerrect = this.rect;
                // console.log("onAnimationEnd " + view.layoutInfo.innerrect.width + "  ");
                if (view instanceof SunburstShape || view instanceof test.RadialBarShape) {
                    view._radius = this._radius;
                    view._sweep = this._sweep;
                }
            };
            return RadiusAnimation;
        }(Animation));
        test.RadiusAnimation = RadiusAnimation;
        var SweepAnimation = /** @class */ (function (_super) {
            __extends(SweepAnimation, _super);
            function SweepAnimation() {
                var _this = _super.call(this) || this;
                _this.ease = new android.view.animation.BounceAnimationEase();
                return _this;
            }
            SweepAnimation.prototype.applyTransformation = function (interpolatedTime, canvas, view) {
                if (view instanceof SunburstShape || view instanceof test.RadialBarShape) {
                    var scale = this.from + (this.to - this.from) * interpolatedTime;
                    view._sweep = scale * this._sweep;
                    // console.log('bar height === ' + view.layoutInfo.innerrect.height +" scale " + scale +"  interpolatedTime "+interpolatedTime);
                }
            };
            SweepAnimation.prototype.onStartAniamtion = function (canvas, view) {
                // console.log("onStartAniamtion ");
                _super.prototype.onStartAniamtion.call(this, canvas, view);
                if (view instanceof SunburstShape || view instanceof test.RadialBarShape) {
                    this._radius = view._radius;
                    this._sweep = view._sweep;
                }
            };
            SweepAnimation.prototype.onEndAnimation = function (canvas, view) {
                _super.prototype.onEndAnimation.call(this, canvas, view);
                // view.layoutInfo.innerrect = this.rect;
                // console.log("onAnimationEnd " + view.layoutInfo.innerrect.width + "  ");
                if (view instanceof SunburstShape || view instanceof test.RadialBarShape) {
                    view._radius = this._radius;
                    view._sweep = this._sweep;
                }
            };
            return SweepAnimation;
        }(Animation));
        test.SweepAnimation = SweepAnimation;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var Default = android.device.Default;
        var MotionEvent = android.view.event.MotionEvent;
        var Animation = android.view.animation.Animation;
        var Util = android.graphics.Util;
        var ScatterShape = /** @class */ (function (_super) {
            __extends(ScatterShape, _super);
            function ScatterShape(c, x, y, w, h, style, strokeStyle) {
                var _this = _super.call(this, c) || this;
                var top = y;
                var left = x;
                var height = h;
                var width = w;
                if (height < 0) {
                    top = top + height;
                    height = Math.abs(height);
                }
                _this.layoutInfo.reset(left, top, left + width, top + height, _this.padding, 0);
                _this._oldLayoutInfo = _this.layoutInfo.clone();
                _this._style = style;
                if (style == null) {
                    _this._style = Default.style;
                }
                _this._strokeStyle = strokeStyle;
                if (strokeStyle == null) {
                    _this._strokeStyle = Default.strokestyle;
                }
                _this.priority = ++ScatterShape.ScatterPrority;
                return _this;
            }
            ScatterShape.prototype.onDrawShape = function (canvas) {
                canvas.drawArc(this.layoutInfo.innerrect, 0, 2 * 180, this.style);
            };
            ScatterShape.prototype.getpts = function (size) {
                if (this._pts == null) {
                    var radius = (this.layoutInfo.innerrect.width < this.layoutInfo.innerrect.height ? this.layoutInfo.innerrect.width : this.layoutInfo.innerrect.height) / 2;
                    var center = this.layoutInfo.innerrect.center;
                    this._pts = Util.createPtsFromCircle(this.layoutInfo.innerrect.width / 2, center, this.ptcount);
                }
                return this._pts;
            };
            ScatterShape.prototype.onMouseEvent = function (event) {
                console.log("shape ==== " + event.toString());
                switch (event.action) {
                    case MotionEvent.ACTION_MOUSE_ON:
                        var animation = new ScatterAnimation(this.layoutInfo.innerrect);
                        animation.duration = 400;
                        animation.from = 1;
                        animation.to = 1.2;
                        animation.fillAfter = true;
                        this.startAnimation(animation);
                        break;
                    case MotionEvent.ACTION_MOUSE_OUT:
                        var animation_out = new ScatterAnimation(this.layoutInfo.innerrect);
                        animation_out.duration = 200;
                        animation_out.from = 1.2;
                        animation_out.to = 1;
                        animation_out.fillAfter = false;
                        this.startAnimation(animation_out);
                        break;
                    case MotionEvent.ACTION_MOUSE_MOVE:
                        break;
                    case MotionEvent.ACTION_MOUSE_OUT:
                        break;
                }
                return true;
            };
            ScatterShape.ScatterPrority = test.Shape.PRIORITY * 3;
            return ScatterShape;
        }(test.PlotShape));
        test.ScatterShape = ScatterShape;
        var ScatterAnimation = /** @class */ (function (_super) {
            __extends(ScatterAnimation, _super);
            function ScatterAnimation(rect) {
                var _this = _super.call(this) || this;
                _this.ease = new android.view.animation.BounceAnimationEase();
                return _this;
            }
            ScatterAnimation.prototype.applyTransformation = function (interpolatedTime, canvas, view) {
                // if (view instanceof ScatterShape) {
                var scale = this.from + (this.to - this.from) * interpolatedTime;
                // let dx :number=-view.layoutInfo.innerrect.left;
                // let dy :number=-view.layoutInfo.innerrect.top;
                // canvas.translate(dx,dy);
                // canvas.scale(scale,scale);
                // canvas.translate(view.layoutInfo.innerrect.width,view.layoutInfo.innerrect.height);
                var rect = this.rect.clone();
                scale = scale - 1;
                view.layoutInfo.innerrect.left = this.rect.left - (scale * view.layoutInfo.innerrect.width / 2);
                view.layoutInfo.innerrect.top = this.rect.top - (scale * view.layoutInfo.innerrect.height / 2);
                view.layoutInfo.innerrect.width = this.rect.width + (scale * view.layoutInfo.innerrect.width);
                view.layoutInfo.innerrect.height = this.rect.height + (scale * view.layoutInfo.innerrect.height);
                // console.log("scatter width  " + view.layoutInfo.innerrect.width + " rect.width " + rect.width + " scale " + scale);
                // }
            };
            ScatterAnimation.prototype.onStartAniamtion = function (canvas, view) {
                // console.log("onStartAniamtion ");
                this.rect = view.layoutInfo.innerrect.clone();
            };
            ScatterAnimation.prototype.onEndAnimation = function (canvas, view) {
                // view.layoutInfo.innerrect = this.rect;
                // console.log("onAnimationEnd " + view.layoutInfo.innerrect.width + "  ");
            };
            return ScatterAnimation;
        }(Animation));
        test.ScatterAnimation = ScatterAnimation;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var Default = android.device.Default;
        var Util = android.graphics.Util;
        var LinesShape = /** @class */ (function (_super) {
            __extends(LinesShape, _super);
            function LinesShape(context, xs, ys, style, strokeStyle) {
                var _this = _super.call(this, context) || this;
                _this.priority = ++LinesShape.LinesPrority;
                _this.__xs = xs;
                _this.__ys = ys;
                var l = test.Utility.min(xs);
                var t = test.Utility.min(ys);
                var r = test.Utility.max(xs);
                var b = test.Utility.max(ys);
                _this.layoutInfo.reset(l, t, r, b, _this.padding, 0);
                _this._oldLayoutInfo = _this.layoutInfo.clone();
                _this._style = style;
                if (style == null) {
                    _this._style = Default.style;
                }
                _this._strokeStyle = strokeStyle;
                if (strokeStyle == null) {
                    _this._strokeStyle = Default.strokestyle;
                }
                return _this;
            }
            Object.defineProperty(LinesShape.prototype, "strokeStyle", {
                get: function () {
                    return this._strokeStyle;
                },
                set: function (value) {
                    this._strokeStyle = value;
                },
                enumerable: true,
                configurable: true
            });
            LinesShape.prototype.getpts = function (size) {
                if (this._pts == null) {
                    this._pts = { xs: this.__xs, ys: this.__ys };
                }
                return this._pts;
            };
            LinesShape.prototype.trace = function (x, y) {
                if (this.layoutInfo.outterrect.contains(x, y)) {
                    for (var i = 0; i < Math.min(this.__xs.length, this.__ys.length); ++i) {
                        if (Util.Point2Line(this.__xs[i], this.__ys[i], this.__xs[i + 1], this.__ys[i + 1], x, y) < 10) {
                            return true;
                        }
                    }
                }
                return false;
            };
            LinesShape.prototype.onMouseEvent = function (event) {
                return _super.prototype.onMouseEvent.call(this, event);
            };
            LinesShape.prototype.onDrawShape = function (canvas) {
                canvas.save();
                canvas.clip(this.layoutInfo.innerrect);
                canvas.drawLines(this.__xs, this.__ys, this._strokeStyle);
                canvas.restore();
            };
            LinesShape.prototype._drawAnimation = function (canvas) {
                console.log('drawAnimation ');
                canvas.drawLines(this.animationXs, this.animationYs, this._strokeStyle);
            };
            LinesShape.LinesPrority = test.PlotShape.PRIORITY * 4;
            return LinesShape;
        }(test.PlotShape));
        test.LinesShape = LinesShape;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var Default = android.device.Default;
        var Animation = android.view.animation.Animation;
        var MotionEvent = android.view.event.MotionEvent;
        var Point = android.graphics.Point;
        var Util = android.graphics.Util;
        var AreaShape = /** @class */ (function (_super) {
            __extends(AreaShape, _super);
            function AreaShape(context, xs, ys, style, strokeStyle) {
                var _this = _super.call(this, context) || this;
                _this.priority = test.Shape.PRIORITY + 1;
                _this.__xs = xs;
                _this.__ys = ys;
                _this._style = style;
                var l = Math.min.apply(Math, xs);
                var t = Math.min.apply(Math, ys);
                var r = Math.max.apply(Math, xs);
                var b = Math.max.apply(Math, ys);
                _this.layoutInfo.reset(l, t, r, b, _this.padding, 0);
                _this._oldLayoutInfo = _this.layoutInfo.clone();
                if (style == null) {
                    _this._style = Default.style;
                }
                _this._strokeStyle = strokeStyle;
                if (strokeStyle == null) {
                    _this._strokeStyle = Default.strokestyle;
                }
                return _this;
            }
            Object.defineProperty(AreaShape.prototype, "strokeStyle", {
                get: function () {
                    return this._strokeStyle;
                },
                set: function (value) {
                    this._strokeStyle = value;
                },
                enumerable: true,
                configurable: true
            });
            AreaShape.prototype.trace = function (x, y) {
                return Util.IsPointInPolygon2(new Point(x, y), this.__xs, this.__ys);
            };
            AreaShape.prototype.onDrawShape = function (canvas) {
                canvas.save();
                canvas.clip(this.layoutInfo.innerrect);
                canvas.drawPolygon(this.__xs, this.__ys, this.style);
                canvas.restore();
            };
            AreaShape.prototype.getpts = function (size) {
                if (this._pts == null) {
                    this._pts = { xs: this.__xs, ys: this.__ys };
                }
                return this._pts;
            };
            AreaShape.prototype.onMouseEvent = function (event) {
                switch (event.action) {
                    case MotionEvent.ACTION_MOUSE_ON:
                        console.log("mouse on ");
                        break;
                    case MotionEvent.ACTION_MOUSE_OUT:
                        console.log("mouse out ");
                        break;
                    case MotionEvent.ACTION_MOUSE_MOVE:
                        break;
                    case MotionEvent.ACTION_MOUSE_OUT:
                        break;
                }
                return true;
            };
            return AreaShape;
        }(test.PlotShape));
        test.AreaShape = AreaShape;
        var AreaAnimation = /** @class */ (function (_super) {
            __extends(AreaAnimation, _super);
            function AreaAnimation(rect) {
                var _this = _super.call(this) || this;
                _this.ease = new android.view.animation.AnimationEase();
                return _this;
            }
            AreaAnimation.prototype.applyTransformation = function (interpolatedTime, canvas, view) {
                var scale = this.from + (this.to - this.from) * interpolatedTime;
                var rect = this.rect.clone();
                view.layoutInfo.innerrect.width = this.rect.width * scale;
            };
            AreaAnimation.prototype.onStartAniamtion = function (canvas, view) {
                this.rect = view.layoutInfo.innerrect.clone();
            };
            AreaAnimation.prototype.onEndAnimation = function (canvas, view) {
            };
            return AreaAnimation;
        }(Animation));
        test.AreaAnimation = AreaAnimation;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var Default = android.device.Default;
        var Point = android.graphics.Point;
        var AxisLineShape = /** @class */ (function (_super) {
            __extends(AxisLineShape, _super);
            function AxisLineShape(c, x, y, ex, ey, strokeStyle) {
                var _this = _super.call(this, c) || this;
                _this.startPoint = new Point(x, y);
                _this.endPoint = new Point(ex, ey);
                _this._strokeStyle = strokeStyle;
                if (strokeStyle == null) {
                    _this._strokeStyle = Default.strokestyle;
                }
                return _this;
            }
            AxisLineShape.prototype.onDrawShape = function (canvas) {
                canvas.drawLine(this.startPoint, this.endPoint, this._strokeStyle);
            };
            AxisLineShape.prototype.refresh = function () { };
            return AxisLineShape;
        }(test.Shape));
        test.AxisLineShape = AxisLineShape;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        /**
         * BaseLayout
         */
        var BaseLayout = /** @class */ (function () {
            function BaseLayout(context) {
                this.__shapelist = [];
                this.__context = context;
            }
            Object.defineProperty(BaseLayout.prototype, "context", {
                get: function () {
                    return this.__context;
                },
                enumerable: true,
                configurable: true
            });
            BaseLayout.prototype.convert = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                throw 'fuck Error';
            };
            Object.defineProperty(BaseLayout.prototype, "shapeList", {
                get: function () {
                    return this.__shapelist;
                },
                enumerable: true,
                configurable: true
            });
            return BaseLayout;
        }());
        test.BaseLayout = BaseLayout;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var cartesian;
        (function (cartesian) {
            'use strict';
            /**
             * BaseLayout
             */
            var CartesianBaseLayout = /** @class */ (function (_super) {
                __extends(CartesianBaseLayout, _super);
                function CartesianBaseLayout() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return CartesianBaseLayout;
            }(test.BaseLayout));
            cartesian.CartesianBaseLayout = CartesianBaseLayout;
        })(cartesian = test.cartesian || (test.cartesian = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var cartesian;
        (function (cartesian) {
            'use strict';
            var Default = android.device.Default;
            var CartesianLayout = /** @class */ (function (_super) {
                __extends(CartesianLayout, _super);
                function CartesianLayout(c) {
                    var _this = _super.call(this, c) || this;
                    _this.barStyle = Default.style;
                    _this.lineStyle = Default.strokestyle;
                    _this._locationCache = [];
                    _this._stack = false;
                    _this._rect = null;
                    return _this;
                }
                CartesianLayout.prototype.convert = function (serieslist, encoding, rect, canvas) {
                    this.__shapelist.length = 0;
                    this._serieslist = [];
                    for (var _i = 0, serieslist_1 = serieslist; _i < serieslist_1.length; _i++) {
                        var ser = serieslist_1[_i];
                        this._serieslist.push(ser.clone());
                    }
                    this._encoding = encoding;
                    this._locationCache = [];
                    this.__scalePairs = [];
                    this._stack = encoding._stack;
                    this._rect = rect;
                    this.__analyseScales();
                    for (var i = 0; i < this._serieslist.length; ++i) {
                        this._layoutSeries(this._serieslist[i], i, canvas);
                    }
                    return this.__shapelist;
                };
                CartesianLayout.prototype.__analyseScales = function () {
                    this._createLayoutScales(this._encoding);
                    for (var _i = 0, _a = this._serieslist; _i < _a.length; _i++) {
                        var ser = _a[_i];
                        for (var _b = 0, _c = ser.scalePairs; _b < _c.length; _b++) {
                            var scalepair = _c[_b];
                            var filed = scalepair.filed;
                            var scale = scalepair.scale;
                            if (filed.name == 'x') {
                                if (scale instanceof test.OrdinalScale) {
                                    if (filed.band === true) {
                                        scale.rangeBounds([this._rect.left, this._rect.right]);
                                    }
                                    else {
                                        scale.range([this._rect.left, this._rect.right]);
                                    }
                                }
                                else {
                                    scale.range([this._rect.left, this._rect.right]);
                                }
                            }
                            else if (filed.name == 'y') {
                                if (scale instanceof test.OrdinalScale) {
                                    if (filed.band === true) {
                                        scale.rangeBounds([this._rect.bottom, this._rect.top]);
                                    }
                                    else {
                                        scale.range([this._rect.bottom, this._rect.top]);
                                    }
                                }
                                else {
                                    var ticker = test.LinearTicks.create(scale);
                                    scale = ticker.niceScale();
                                    scale.range([this._rect.bottom, this._rect.top]);
                                }
                            }
                        }
                    }
                };
                CartesianLayout.prototype._createLayoutScales = function (encoding) {
                    if (this._serieslist.length > 1) {
                        for (var i = 0; i < this._serieslist.length; ++i) {
                            var series = this._serieslist[i];
                            for (var _i = 0, _a = series.scalePairs; _i < _a.length; _i++) {
                                var pair = _a[_i];
                                var filed = pair.filed;
                                var hasadded = false;
                                for (var _b = 0, _c = this.__scalePairs; _b < _c.length; _b++) {
                                    var p = _c[_b];
                                    if (!p.filed.equals(filed) || !p.scale.equal(pair.scale)) {
                                        continue;
                                    }
                                    else {
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
                    }
                    else if (this._serieslist.length == 1) {
                        // this.__scalePairs = this._serieslist[0].scalePairs;
                        var series = this._serieslist[0];
                        // this.__scalePairs.push({series:[series.name], filed: series.filed, scale: pair.scale });
                        for (var _d = 0, _e = series.scalePairs; _d < _e.length; _d++) {
                            var pair = _e[_d];
                            this.__scalePairs.push({ series: [series.name], filed: pair.filed, scale: pair.scale });
                        }
                    }
                };
                Object.defineProperty(CartesianLayout.prototype, "maxSeriesSize", {
                    get: function () {
                        var xscale = this._getScale('x');
                        if (xscale instanceof test.OrdinalScale) {
                            return xscale.domains.length;
                        }
                        else {
                            return test.Utility.max(this._serieslist.map(function (ser, index, array) { return ser.size; }));
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CartesianLayout.prototype, "scalePairs", {
                    get: function () {
                        return this.__scalePairs;
                    },
                    enumerable: true,
                    configurable: true
                });
                CartesianLayout.prototype._getScale = function (name) {
                    var index = _.findIndex(this.__scalePairs, function (item) {
                        return item.filed.name == name;
                    });
                    return this.__scalePairs[index].scale;
                };
                return CartesianLayout;
            }(test.BaseLayout));
            cartesian.CartesianLayout = CartesianLayout;
        })(cartesian = test.cartesian || (test.cartesian = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var cartesian;
        (function (cartesian) {
            'use strict';
            var Style = android.graphics.Style;
            var Default = android.device.Default;
            var BarLayout = /** @class */ (function (_super) {
                __extends(BarLayout, _super);
                function BarLayout() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Object.defineProperty(BarLayout.prototype, "barWidth", {
                    get: function () {
                        return this._rect.width / this.maxSeriesSize / (this._stack ? 1 : this._serieslist.length) * 0.9;
                    },
                    enumerable: true,
                    configurable: true
                });
                BarLayout.prototype._layoutSeries = function (series, index, canvas) {
                    var size = this._serieslist.length;
                    var xScale = series.getScale('x');
                    var yScale = series.getScale('y');
                    var colorScale = series.getScale('color');
                    var colorArray = [];
                    if (colorScale instanceof test.OrdinalScale) {
                        colorScale = colorScale.clone();
                        colorArray = test.ColorUtils.gradientColor(colorScale.startPosition, colorScale.endPosition, colorScale.domains.length);
                        colorScale.range([0, colorScale.domains.length - 1]);
                    }
                    var defaultcolor = test.ColorUtils.indexColor(series.index);
                    for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
                        var pt = _a[_i];
                        if (pt != null) {
                            var xvalue = pt.x;
                            var yvalue = pt.y;
                            var colorvalue = pt.color;
                            var shape = pt.shape;
                            var size_1 = pt.size;
                            var tooltip = pt.tooltip;
                            var text = pt.text;
                            var x = xScale.getScaleValue(xvalue.value) + (this._stack ? 0 : ((index - (this._serieslist.length - 1) / 2) * this.barWidth));
                            var y0 = yvalue.isMultiple ? yvalue.value[0] : (yScale.min < 0 ? 0 : yScale.min);
                            var y1 = yvalue.isMultiple ? yvalue.value[1] : yvalue.value;
                            var ytop = yScale.getScaleValue(y1);
                            var color = defaultcolor;
                            if (colorScale instanceof test.OrdinalScale) {
                                var colorindex = colorScale.getScaleValue(colorvalue.value);
                                color = colorArray[colorindex];
                            }
                            else if (colorScale instanceof test.LinearScale) {
                                color = test.ColorUtils.getColor(colorScale.startPosition, colorScale.endPosition, colorvalue.value, colorScale.min, colorScale.max);
                            }
                            var ybottom = yScale.getScaleValue(y0);
                            if (y0 == 0) {
                                // console.log(yScale);
                                // console.log("y0 " + y0 + " yBottom " + ybottom);
                            }
                            var xleft = x - this.barWidth / 2;
                            var xright = x + this.barWidth / 2;
                            var barShape = new test.BarShape(this.context, xleft, ytop, xright - xleft, ybottom - ytop);
                            barShape.id = pt.id;
                            barShape.style = new Style("gray", Default.strokestyle);
                            if (color != null) {
                                barShape.style.background = color;
                            }
                            else {
                                barShape.style.background = defaultcolor;
                            }
                            if (series.showlabels && text != null) {
                                var textstr = text.value;
                                var font = Default.font;
                                font.fontColor = 'black';
                                font.fontSize = 12;
                                var textsize = canvas.measureString(textstr, font);
                                var width = textsize.width;
                                var height = textsize.height;
                                barShape.label = new test.Label(this.context, textstr, (xleft + xright) / 2, ytop - height / 2 - 3, width, height, 0, 5);
                                barShape.label._font = font;
                                barShape.label.background = Default.style;
                                barShape.label.background.strokeStyle.strokeColor = 'white';
                                barShape.label.background.background = 'white';
                            }
                            this.__shapelist.push(barShape);
                        }
                    }
                };
                return BarLayout;
            }(cartesian.CartesianLayout));
            cartesian.BarLayout = BarLayout;
        })(cartesian = test.cartesian || (test.cartesian = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var cartesian;
        (function (cartesian) {
            'use strict';
            var Default = android.device.Default;
            var ScatterLayout = /** @class */ (function (_super) {
                __extends(ScatterLayout, _super);
                function ScatterLayout() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Object.defineProperty(ScatterLayout.prototype, "barWidth", {
                    get: function () {
                        return this._rect.width / this.maxSeriesSize / (this._stack ? 1 : this._serieslist.length) * 0.9;
                    },
                    enumerable: true,
                    configurable: true
                });
                ScatterLayout.prototype._layoutSeries = function (series, index, canvas) {
                    var size = this._serieslist.length;
                    var xScale = series.getScale('x');
                    var yScale = series.getScale('y');
                    var colorScale = series.getScale('color');
                    var sizeScale = series.getScale('size');
                    var defaultcolor = test.ColorUtils.indexColor(series.index);
                    var colorArray = [];
                    if (colorScale instanceof test.OrdinalScale) {
                        colorScale = colorScale.clone();
                        if (colorScale.startPosition == null || colorScale.endPosition == null) {
                            var len = colorScale.domains.length;
                            for (var i = 0; i < len; ++i) {
                                colorScale.ranges.push(test.ColorUtils.Color[i & test.ColorUtils.Color.length]);
                            }
                        }
                        else {
                            colorArray = test.ColorUtils.gradientColor(colorScale.startPosition, colorScale.endPosition, colorScale.domains.length);
                            colorScale.range([0, colorScale.domains.length - 1]);
                        }
                    }
                    var defaultsize = 10;
                    for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
                        var pt = _a[_i];
                        if (pt != null) {
                            var xvalue = pt.x;
                            var yvalue = pt.y;
                            var colorValue = pt.color;
                            var shapeValue = pt.shape;
                            var sizeValue = pt.size;
                            var tooltip = pt.tooltip;
                            var text = pt.text;
                            var x = xScale.getScaleValue(xvalue.value);
                            var y = yScale.getScaleValue(yvalue.isMultiple ? yvalue.value[1] : yvalue.value);
                            var s = sizeScale.getScaleValue(sizeValue.value);
                            if (isNaN(s) || s == null || s <= 0) {
                                s = defaultsize;
                            }
                            var color = defaultcolor;
                            if (colorScale instanceof test.OrdinalScale) {
                                var colorindex = colorScale.getScaleValue(colorValue.value);
                                color = colorArray[colorindex];
                            }
                            else if (colorScale instanceof test.LinearScale) {
                                color = test.ColorUtils.getColor(colorScale.startPosition, colorScale.endPosition, colorValue.value, colorScale.min, colorScale.max);
                            }
                            var scatterShape = new test.ScatterShape(this.context, x - s / 2, y - s / 2, s, s, Default.style);
                            if (color != null) {
                                scatterShape.style.background = color;
                            }
                            else {
                                scatterShape.style.background = defaultcolor;
                            }
                            if (series.showlabels && text != null) {
                                var textstr = text.value;
                                var font = Default.font;
                                font.fontColor = 'black';
                                font.fontSize = 12;
                                var textsize = canvas.measureString(textstr, font);
                                var width = textsize.width;
                                var height = textsize.height;
                                scatterShape.label = new test.Label(this.context, textstr, x, y - s / 2 - 3, width, height, 0, 3);
                                scatterShape.label.background = Default.style;
                                scatterShape.label._font = font;
                                scatterShape.label.background.strokeStyle.strokeColor = 'gray';
                                scatterShape.label.background.background = 'lightblue';
                            }
                            this.__shapelist.push(scatterShape);
                        }
                    }
                };
                ScatterLayout.prototype._layoutLine = function () {
                };
                return ScatterLayout;
            }(cartesian.CartesianLayout));
            cartesian.ScatterLayout = ScatterLayout;
        })(cartesian = test.cartesian || (test.cartesian = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var cartesian;
        (function (cartesian) {
            'use strict';
            var Default = android.device.Default;
            var RadialCartesianLayout = /** @class */ (function (_super) {
                __extends(RadialCartesianLayout, _super);
                function RadialCartesianLayout(context) {
                    var _this = _super.call(this, context) || this;
                    _this.barStyle = Default.style;
                    _this.lineStyle = Default.strokestyle;
                    _this._locationCache = [];
                    _this._stack = false;
                    return _this;
                }
                RadialCartesianLayout.prototype.convert = function (serieslist, encoding, cx, cy, innerRadius, radius, startAngle, endAngle) {
                    this.__shapelist.length = 0;
                    this._serieslist = [];
                    for (var _i = 0, serieslist_2 = serieslist; _i < serieslist_2.length; _i++) {
                        var ser = serieslist_2[_i];
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
                    for (var i = 0; i < this._serieslist.length; ++i) {
                        this._layoutSeries(this._serieslist[i], i);
                    }
                    return this.__shapelist;
                };
                RadialCartesianLayout.prototype.__analyseScales = function () {
                    this._createLayoutScales(this._encoding);
                    for (var _i = 0, _a = this._serieslist; _i < _a.length; _i++) {
                        var ser = _a[_i];
                        for (var _b = 0, _c = ser.scalePairs; _b < _c.length; _b++) {
                            var scalepair = _c[_b];
                            var filed = scalepair.filed;
                            var scale = scalepair.scale;
                            if (filed.name == 'x') {
                                if (scale instanceof test.OrdinalScale) {
                                    if (filed.band === true) {
                                        scale.rangeBounds([this._innerRadius, this._radius]);
                                    }
                                    else {
                                        scale.range([this._innerRadius, this._radius]);
                                    }
                                }
                                else {
                                    scale.range([this._innerRadius, this._radius]);
                                }
                            }
                            else if (filed.name == 'y') {
                                if (scale instanceof test.OrdinalScale) {
                                    if (filed.band === true) {
                                        scale.rangeBounds([this._startAngle, this._endAngle]);
                                    }
                                    else {
                                        scale.range([this._startAngle, this._endAngle]);
                                    }
                                }
                                else {
                                    var ticker = test.LinearTicks.create(scale);
                                    scale = ticker.niceScale();
                                    scale.range([this._startAngle, this._endAngle]);
                                }
                            }
                        }
                    }
                };
                RadialCartesianLayout.prototype._createLayoutScales = function (encoding) {
                    if (this._serieslist.length > 1) {
                        for (var i = 0; i < this._serieslist.length; ++i) {
                            var series = this._serieslist[i];
                            for (var _i = 0, _a = series.scalePairs; _i < _a.length; _i++) {
                                var pair = _a[_i];
                                var filed = pair.filed;
                                var hasadded = false;
                                for (var _b = 0, _c = this.__scalePairs; _b < _c.length; _b++) {
                                    var p = _c[_b];
                                    if (!p.filed.equals(filed) || !p.scale.equal(pair.scale)) {
                                        continue;
                                    }
                                    else {
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
                    }
                    else if (this._serieslist.length == 1) {
                        // this.__scalePairs = this._serieslist[0].scalePairs;
                        var series = this._serieslist[0];
                        // this.__scalePairs.push({series:[series.name], filed: series.filed, scale: pair.scale });
                        for (var _d = 0, _e = series.scalePairs; _d < _e.length; _d++) {
                            var pair = _e[_d];
                            this.__scalePairs.push({ series: [series.name], filed: pair.filed, scale: pair.scale });
                        }
                    }
                };
                Object.defineProperty(RadialCartesianLayout.prototype, "maxSeriesSize", {
                    get: function () {
                        var xscale = this._getScale('x');
                        if (xscale instanceof test.OrdinalScale) {
                            return xscale.domains.length;
                        }
                        else {
                            return test.Utility.max(this._serieslist.map(function (ser, index, array) { return ser.size; }));
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RadialCartesianLayout.prototype, "scalePairs", {
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
                    get: function () {
                        return this.__scalePairs;
                    },
                    enumerable: true,
                    configurable: true
                });
                RadialCartesianLayout.prototype._getScale = function (name) {
                    var index = _.findIndex(this.__scalePairs, function (item) {
                        return item.filed.name == name;
                    });
                    return this.__scalePairs[index].scale;
                };
                return RadialCartesianLayout;
            }(test.BaseLayout));
            cartesian.RadialCartesianLayout = RadialCartesianLayout;
        })(cartesian = test.cartesian || (test.cartesian = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var cartesian;
        (function (cartesian) {
            'use strict';
            var Style = android.graphics.Style;
            var Default = android.device.Default;
            var RadialBarLayout = /** @class */ (function (_super) {
                __extends(RadialBarLayout, _super);
                function RadialBarLayout() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Object.defineProperty(RadialBarLayout.prototype, "barWidth", {
                    get: function () {
                        return (this._radius - this._innerRadius) / this.maxSeriesSize / (this._stack ? 1 : this._serieslist.length) * 0.9;
                    },
                    enumerable: true,
                    configurable: true
                });
                RadialBarLayout.prototype._layoutSeries = function (series, index) {
                    var size = this._serieslist.length;
                    var xScale = series.getScale('x');
                    var yScale = series.getScale('y');
                    var colorScale = series.getScale('color');
                    var colorArray = [];
                    if (colorScale instanceof test.OrdinalScale) {
                        colorScale = colorScale.clone();
                        colorArray = test.ColorUtils.gradientColor(colorScale.startPosition, colorScale.endPosition, colorScale.domains.length);
                        colorScale.range([0, colorScale.domains.length - 1]);
                    }
                    var defaultcolor = test.ColorUtils.indexColor(series.index);
                    for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
                        var pt = _a[_i];
                        if (pt != null) {
                            var xvalue = pt.x;
                            var yvalue = pt.y;
                            var colorvalue = pt.color;
                            var shape = pt.shape;
                            var size_2 = pt.size;
                            var x = xScale.getScaleValue(xvalue.value) + (this._stack ? 0 : ((index - (this._serieslist.length - 1) / 2) * this.barWidth));
                            var y0 = yvalue.isMultiple ? yvalue.value[0] : (yScale.min < 0 ? 0 : yScale.min);
                            var y1 = yvalue.isMultiple ? yvalue.value[1] : yvalue.value;
                            var yEndAngle = yScale.getScaleValue(y1);
                            var color = defaultcolor;
                            if (colorScale instanceof test.OrdinalScale) {
                                var colorindex = colorScale.getScaleValue(colorvalue.value);
                                color = colorArray[colorindex];
                            }
                            else if (colorScale instanceof test.LinearScale) {
                                color = test.ColorUtils.getColor(colorScale.startPosition, colorScale.endPosition, colorvalue.value, colorScale.min, colorScale.max);
                            }
                            var yStartAngle = yScale.getScaleValue(y0);
                            var xInnerRadius = x - this.barWidth / 2;
                            var xOutterRadius = x + this.barWidth / 2;
                            // let barShape:BarShape = new BarShape(xleft,yEndAngle,xright-xleft,ybottom-yEndAngle);
                            var barShape = new test.RadialBarShape(this.context, this._cx, this._cy, xInnerRadius, xOutterRadius, yStartAngle, yEndAngle - yStartAngle);
                            barShape.id = pt.id;
                            barShape.style = new Style("gray", Default.strokestyle);
                            if (color != null) {
                                barShape.style.background = color;
                            }
                            else {
                                barShape.style.background = defaultcolor;
                            }
                            this.__shapelist.push(barShape);
                        }
                    }
                };
                return RadialBarLayout;
            }(cartesian.RadialCartesianLayout));
            cartesian.RadialBarLayout = RadialBarLayout;
        })(cartesian = test.cartesian || (test.cartesian = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var cartesian;
        (function (cartesian) {
            'use strict';
            var Default = android.device.Default;
            var RadialLineLayout = /** @class */ (function (_super) {
                __extends(RadialLineLayout, _super);
                function RadialLineLayout() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                RadialLineLayout.prototype._layoutSeries = function (series, index) {
                    var size = this._serieslist.length;
                    var xScale = series.getScale('x');
                    var yScale = series.getScale('y');
                    var colorScale = series.getScale('color');
                    var xs = [];
                    var ys = [];
                    for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
                        var pt = _a[_i];
                        if (pt != null) {
                            console.log(pt);
                            var xvalue = pt.x;
                            var yvalue = pt.y;
                            var colorvalue = pt.color;
                            var shape = pt.shape;
                            var size_3 = pt.size;
                            var radius = xScale.getScaleValue(xvalue.value);
                            var angle = yScale.getScaleValue(yvalue.isMultiple ? yvalue.value[1] : yvalue.value);
                            var x = this._cx + Math.cos(angle) * radius;
                            var y = this._cy + Math.sin(angle) * radius;
                            xs.push(x);
                            ys.push(y);
                        }
                    }
                    var linesShape = new test.LinesShape(this.context, xs, ys, null, Default.strokestyle);
                    linesShape.strokeStyle.strokeColor = test.ColorUtils.indexColor(series.index);
                    this.__shapelist.push(linesShape);
                };
                RadialLineLayout.prototype._layoutLine = function () {
                };
                return RadialLineLayout;
            }(cartesian.RadialCartesianLayout));
            cartesian.RadialLineLayout = RadialLineLayout;
        })(cartesian = test.cartesian || (test.cartesian = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var cartesian;
        (function (cartesian) {
            'use strict';
            var Default = android.device.Default;
            var RadialAreaLayout = /** @class */ (function (_super) {
                __extends(RadialAreaLayout, _super);
                function RadialAreaLayout() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                RadialAreaLayout.prototype._layoutSeries = function (series, index) {
                    var size = this._serieslist.length;
                    var xScale = series.getScale('x');
                    var yScale = series.getScale('y');
                    var colorScale = series.getScale('color');
                    var xs = [];
                    var ys = [];
                    for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
                        var pt = _a[_i];
                        if (pt != null) {
                            console.log(pt);
                            var xvalue = pt.x;
                            var yvalue = pt.y;
                            var colorvalue = pt.color;
                            var shape = pt.shape;
                            var size_4 = pt.size;
                            var radius = xScale.getScaleValue(xvalue.value);
                            var angleValue0 = yvalue.isMultiple ? yvalue.value[0] : (yScale.min < 0 ? 0 : yScale.min);
                            var angleValue1 = yvalue.isMultiple ? yvalue.value[1] : yvalue.value;
                            var angle0 = yScale.getScaleValue(angleValue0);
                            var angle1 = yScale.getScaleValue(angleValue1);
                            // let color = colorScale.getScaleValue(colorvalue.value);
                            var x0 = this._cx + Math.cos(angle0) * radius;
                            var y0 = this._cy + Math.sin(angle0) * radius;
                            var x = this._cx + Math.cos(angle1) * radius;
                            var y = this._cy + Math.sin(angle1) * radius;
                            xs.push(x);
                            ys.push(y);
                            xs.unshift(x0);
                            ys.unshift(y0);
                        }
                    }
                    var linesShape = new test.AreaShape(this.context, xs, ys, null, Default.strokestyle);
                    linesShape.style.background = test.ColorUtils.indexColor(series.index);
                    this.__shapelist.push(linesShape);
                };
                RadialAreaLayout.prototype._layoutLine = function () {
                };
                return RadialAreaLayout;
            }(cartesian.RadialCartesianLayout));
            cartesian.RadialAreaLayout = RadialAreaLayout;
        })(cartesian = test.cartesian || (test.cartesian = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var cartesian;
        (function (cartesian) {
            'use strict';
            var Default = android.device.Default;
            var RadialScatterLayout = /** @class */ (function (_super) {
                __extends(RadialScatterLayout, _super);
                function RadialScatterLayout() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Object.defineProperty(RadialScatterLayout.prototype, "barWidth", {
                    get: function () {
                        return (this._radius - this._innerRadius) / this.maxSeriesSize / (this._stack ? 1 : this._serieslist.length) * 0.9;
                    },
                    enumerable: true,
                    configurable: true
                });
                RadialScatterLayout.prototype._layoutSeries = function (series, index) {
                    var size = this._serieslist.length;
                    var xScale = series.getScale('x');
                    var yScale = series.getScale('y');
                    var colorScale = series.getScale('color');
                    var sizeScale = series.getScale('size');
                    var defaultcolor = test.ColorUtils.indexColor(series.index);
                    var colorArray = [];
                    if (colorScale instanceof test.OrdinalScale) {
                        colorScale = colorScale.clone();
                        colorArray = test.ColorUtils.gradientColor(colorScale.startPosition, colorScale.endPosition, colorScale.domains.length);
                        colorScale.range([0, colorScale.domains.length - 1]);
                    }
                    var defaultsize = 10;
                    for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
                        var pt = _a[_i];
                        if (pt != null) {
                            var xvalue = pt.x;
                            var yvalue = pt.y;
                            var colorValue = pt.color;
                            var shapeValue = pt.shape;
                            var sizeValue = pt.size;
                            var radius = xScale.getScaleValue(xvalue.value);
                            var angle = yScale.getScaleValue(yvalue.isMultiple ? yvalue.value[1] : yvalue.value);
                            var s = sizeScale.getScaleValue(sizeValue.value);
                            if (isNaN(s) || s == null || s <= 0) {
                                s = defaultsize;
                            }
                            console.log("radius " + radius + " angle " + angle);
                            var color = defaultcolor;
                            if (colorScale instanceof test.OrdinalScale) {
                                var colorindex = colorScale.getScaleValue(colorValue.value);
                                color = colorArray[colorindex];
                            }
                            else if (colorScale instanceof test.LinearScale) {
                                color = test.ColorUtils.getColor(colorScale.startPosition, colorScale.endPosition, colorValue.value, colorScale.min, colorScale.max);
                            }
                            var x = this._cx + Math.cos(angle) * radius;
                            var y = this._cy + Math.sin(angle) * radius;
                            var scatterShape = new test.ScatterShape(this.context, x - s / 2, y - s / 2, s, s, Default.style);
                            if (color != null) {
                                scatterShape.style.background = color;
                            }
                            else {
                                scatterShape.style.background = defaultcolor;
                            }
                            this.__shapelist.push(scatterShape);
                        }
                    }
                };
                RadialScatterLayout.prototype._layoutLine = function () {
                };
                return RadialScatterLayout;
            }(cartesian.RadialCartesianLayout));
            cartesian.RadialScatterLayout = RadialScatterLayout;
        })(cartesian = test.cartesian || (test.cartesian = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var cartesian;
        (function (cartesian) {
            'use strict';
            var Default = android.device.Default;
            var LineLayout = /** @class */ (function (_super) {
                __extends(LineLayout, _super);
                function LineLayout() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                LineLayout.prototype._layoutSeries = function (series, index) {
                    var size = this._serieslist.length;
                    var xScale = series.getScale('x');
                    var yScale = series.getScale('y');
                    // let colorScale:Scale = series.getScale('color');
                    var xs = [];
                    var ys = [];
                    var defaultcolor = test.ColorUtils.indexColor(series.index);
                    for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
                        var pt = _a[_i];
                        if (pt != null) {
                            var xvalue = pt.x;
                            var yvalue = pt.y;
                            var colorvalue = pt.color;
                            var shape = pt.shape;
                            var size_5 = pt.size;
                            var x = xScale.getScaleValue(xvalue.value);
                            var y = yvalue.isMultiple ? yvalue.value[1] : yvalue.value;
                            y = yScale.getScaleValue(y);
                            xs.push(x);
                            ys.push(y);
                        }
                    }
                    var linesShape = new test.LinesShape(this.context, xs, ys, null, Default.strokestyle);
                    linesShape.strokeStyle.strokeColor = test.ColorUtils.indexColor(series.index);
                    linesShape.style.strokeStyle = null;
                    linesShape.id = series.id;
                    this.__shapelist.push(linesShape);
                };
                LineLayout.prototype._layoutLine = function () {
                };
                return LineLayout;
            }(cartesian.CartesianLayout));
            cartesian.LineLayout = LineLayout;
        })(cartesian = test.cartesian || (test.cartesian = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var cartesian;
        (function (cartesian) {
            'use strict';
            var Default = android.device.Default;
            var AreaLayout = /** @class */ (function (_super) {
                __extends(AreaLayout, _super);
                function AreaLayout() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                AreaLayout.prototype._layoutSeries = function (series, index) {
                    var size = this._serieslist.length;
                    var xScale = series.getScale('x');
                    var yScale = series.getScale('y');
                    var colorScale = series.getScale('color');
                    var xs = [];
                    var ys = [];
                    for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
                        var pt = _a[_i];
                        if (pt != null) {
                            var xvalue = pt.x;
                            var yvalue = pt.y;
                            var colorvalue = pt.color;
                            var shape = pt.shape;
                            var size_6 = pt.size;
                            var x = xScale.getScaleValue(xvalue.value);
                            var y0 = yvalue.isMultiple ? yvalue.value[0] : (yScale.min < 0 ? (yScale.max < 0 ? yScale.max : 0) : yScale.min);
                            var y1 = yvalue.isMultiple ? yvalue.value[1] : yvalue.value;
                            y0 = yScale.getScaleValue(y0);
                            y1 = yScale.getScaleValue(y1);
                            xs.push(x);
                            ys.push(y0);
                            xs.unshift(x);
                            ys.unshift(y1);
                        }
                    }
                    var linesShape = new test.AreaShape(this.context, xs, ys, null, Default.strokestyle);
                    linesShape.style.background = test.ColorUtils.indexColor(series.index);
                    linesShape.style.strokeStyle = null;
                    linesShape.id = series.id;
                    this.__shapelist.push(linesShape);
                };
                AreaLayout.prototype._layoutLine = function () {
                };
                return AreaLayout;
            }(cartesian.CartesianLayout));
            cartesian.AreaLayout = AreaLayout;
        })(cartesian = test.cartesian || (test.cartesian = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var hierarchical;
        (function (hierarchical) {
            'use strict';
            var Default = android.device.Default;
            var HierarchicalLayout = /** @class */ (function (_super) {
                __extends(HierarchicalLayout, _super);
                function HierarchicalLayout(c) {
                    var _this = _super.call(this, c) || this;
                    _this._rect = null;
                    _this._depth = 0;
                    _this._offset = 1;
                    _this.style = Default.style;
                    _this.lineStyle = Default.strokestyle;
                    _this._depth = 0;
                    return _this;
                }
                HierarchicalLayout.prototype._calcDeep = function (roots) {
                    this._depth = 0;
                    this._depth = this.__calcDeep(roots) + 1;
                };
                HierarchicalLayout.prototype.__calcDeep = function (items) {
                    if (items != null && items.length > 0) {
                        var deep = 0;
                        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                            var item = items_1[_i];
                            var currdeep = this.__calcDeep(item.children);
                            item._hidden = false;
                            if (deep < currdeep) {
                                deep = currdeep;
                            }
                        }
                        return ++deep;
                    }
                    return 0;
                };
                return HierarchicalLayout;
            }(test.BaseLayout));
            hierarchical.HierarchicalLayout = HierarchicalLayout;
        })(hierarchical = test.hierarchical || (test.hierarchical = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var hierarchical;
        (function (hierarchical) {
            'use strict';
            var Default = android.device.Default;
            var SunburstLayout = /** @class */ (function (_super) {
                __extends(SunburstLayout, _super);
                function SunburstLayout(c, startAngle, sweep, innerRadius) {
                    var _this = _super.call(this, c) || this;
                    _this.__startAngle = startAngle;
                    _this.__innerRadius = innerRadius;
                    _this.__sweep = sweep;
                    return _this;
                }
                SunburstLayout.prototype.convert = function (roots, encoding, rect, canvas) {
                    this._calcDeep(roots);
                    this.__cx = (rect.left + rect.right) / 2;
                    this.__cy = (rect.top + rect.bottom) / 2;
                    this.__radius = rect.width < rect.height ? rect.width / 2 : rect.height / 2;
                    this.__radiusUnit = (this.__radius - this.__innerRadius - this._offset) / (this._depth - 1);
                    var a = new Analysis(roots, this.__cx, this.__cy, this.__startAngle, this.__sweep + this.__startAngle, this.__innerRadius, this.__innerRadius + this.__radiusUnit, 0, 0);
                    this.__calcSum(a);
                    this.__preangle = a.sweep / a.sum;
                    this.__layoutItems(a, canvas);
                    return null;
                };
                SunburstLayout.prototype.__layoutItems = function (analysis, engine) {
                    var startAngle = analysis.startAngle;
                    for (var i = 0; i < analysis.vs.length; ++i) {
                        var v = analysis.vs[i];
                        var sweep = v.size.value * this.__preangle;
                        var cx = analysis.cx;
                        var cy = analysis.cy;
                        if (analysis.depth == 0) {
                            cx = analysis.cx + this._offset * Math.cos(startAngle + sweep / 2);
                            cy = analysis.cy + this._offset * Math.sin(startAngle + sweep / 2);
                        }
                        var shape = new test.SunburstShape(this.context, cx, cy, analysis.innerRadius, analysis.radius, startAngle, sweep, Default.style, Default.strokestyle);
                        shape.style.background = test.ColorUtils.indexColor(parseInt(v.id));
                        shape.id = v.id;
                        shape.text = v.text.value;
                        this.__shapelist.push(shape);
                        if (v.children && v.children.length > 0) {
                            var child_analysis = new Analysis(v.children, cx, cy, startAngle, startAngle + sweep, analysis.radius, analysis.radius + this.__radiusUnit, 0, analysis.depth + 1);
                            this.__calcSum(child_analysis);
                            this.__layoutItems(child_analysis, engine);
                        }
                        startAngle += sweep;
                    }
                };
                SunburstLayout.prototype.__calcSum = function (a) {
                    var sum = 0;
                    for (var _i = 0, _a = a.vs; _i < _a.length; _i++) {
                        var v = _a[_i];
                        sum += ((v.size.value == null) || (isNaN(v.size.value)) ? 0 : v.size.value);
                    }
                    a.sum = sum;
                };
                return SunburstLayout;
            }(hierarchical.HierarchicalLayout));
            hierarchical.SunburstLayout = SunburstLayout;
            var Analysis = /** @class */ (function () {
                function Analysis(vs, cx, cy, startAngle, endAngle, innerRadius, radius, max, depth) {
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
                Object.defineProperty(Analysis.prototype, "sweep", {
                    get: function () {
                        return this.endAngle - this.startAngle;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Analysis.prototype, "h", {
                    get: function () {
                        return this.radius - this.innerRadius;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Analysis;
            }());
        })(hierarchical = test.hierarchical || (test.hierarchical = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var hierarchical;
        (function (hierarchical) {
            'use strict';
            var Rect = android.graphics.Rect;
            var Default = android.device.Default;
            var Util = android.graphics.Util;
            var ViewState = android.view.ViewState;
            var TreeMapLayout = /** @class */ (function (_super) {
                __extends(TreeMapLayout, _super);
                function TreeMapLayout(c, rect) {
                    var _this = _super.call(this, c) || this;
                    _this._limited = 500;
                    _this._rect = rect;
                    return _this;
                }
                TreeMapLayout.prototype.convert = function (roots, encoding, rect, canvas) {
                    this.__shapelist = [];
                    this._calcDeep(roots);
                    var a = new Analysis(roots, rect.left, rect.top, rect.right, rect.bottom, 0, 0);
                    this.__calcSum(a);
                    this.__hideSmallNode(a);
                    this.__layoutItems(a, canvas);
                    return this.__shapelist;
                };
                TreeMapLayout.prototype.__hideSmallNode = function (a) {
                    if (a != null && a.vs != null && a.vs.length > 0) {
                        var preSize = a.area / a.sum;
                        a.vs.sort(function (a, b) { return a.size.value - b.size.value; });
                        var length_1 = a.vs.length;
                        for (var _i = 0, _a = a.vs; _i < _a.length; _i++) {
                            var v = _a[_i];
                            if (v.size.value * preSize < this._limited) {
                                v._hidden = true;
                                a.sum -= v.size.value;
                                preSize = a.area / a.sum;
                            }
                        }
                    }
                };
                TreeMapLayout.prototype.__calcSum = function (a) {
                    var sum = 0;
                    for (var _i = 0, _a = a.vs; _i < _a.length; _i++) {
                        var v = _a[_i];
                        sum += v.size.value;
                    }
                    a.sum = sum;
                };
                TreeMapLayout.prototype.__layoutItems = function (analysis, canvas) {
                    if (analysis.sum <= 0) {
                        return;
                    }
                    var total_rectLast = new Rect(analysis.l, analysis.t, analysis.r, analysis.b);
                    var preSize = analysis.area / analysis.sum;
                    analysis.vs.sort(function (a, b) { return b.size.value - a.size.value; });
                    var rate = 1;
                    for (var i = 0; i < analysis.vs.length && !total_rectLast.isNil;) {
                        var rects = this.__locationRects(analysis.vs, i, preSize, total_rectLast);
                        var cliprect = Util.union.apply(Util, rects);
                        total_rectLast = this.__clipRect(cliprect, total_rectLast);
                        for (var j = 0; j < rects.length; ++j) {
                            var rect = rects[j];
                            // if (Util.isMixed(rect, this._rect)) {
                            var v = analysis.vs[i];
                            var shape = new test.CubeShape(this.context, rect.left, rect.top, rect.width, rect.height, Default.style, Default.strokestyle);
                            shape.visiable = ViewState.Visiable;
                            shape.style.background = test.ColorUtils.indexColor(parseInt(v.id));
                            shape.id = v.id;
                            shape.text = v.text.value;
                            // shape.onDraw(canvas);
                            if (v._hidden) {
                                i++;
                                continue;
                            }
                            if (v.children && v.children.length > 0) {
                                var offset = 0;
                                if (!isNaN(this._offset) && this._offset > 0) {
                                    offset = (this._depth - analysis.depth) / this._depth * this._offset;
                                }
                                rect = new Rect(rect.left + offset, rect.top + offset, rect.right - offset, rect.bottom - offset);
                                var child_analysis = new Analysis(v.children, rect.left, rect.top, rect.left + rect.width, rect.top + rect.height, v.size.value, analysis.depth + 1);
                                this.__calcSum(child_analysis);
                                this.__hideSmallNode(child_analysis);
                                if (child_analysis.sum > 0) {
                                    shape.visiable = ViewState.InVisiable;
                                    this.__layoutItems(child_analysis, canvas);
                                }
                            }
                            this.__shapelist.push(shape);
                            // }
                            ++i;
                            continue;
                        }
                    }
                };
                TreeMapLayout.prototype.__locationRects = function (vs, index, preSize, rect) {
                    var resultRect = [];
                    var lastRate = 0;
                    var lastSize = 0;
                    var lastW, lastH = 0;
                    for (var i = index; i < vs.length; ++i) {
                        var v = vs[i];
                        var w = void 0, h = 0;
                        var vw = void 0, vh = 0;
                        if (v.size.value < 0) {
                            vs.splice(i, 1);
                            v = vs[i];
                        }
                        if (rect.height < rect.width) {
                            lastSize += v.size.value;
                            vw = w = (lastSize * preSize) / rect.height;
                            vh = (vs[index].size.value * preSize) / vw;
                            if (lastRate != 0) {
                                var tmpRate = vh > vw ? vh / vw : vw / vh;
                                if (Math.abs(tmpRate - 1) < Math.abs(lastRate - 1)) {
                                    lastRate = tmpRate;
                                    resultRect.length = 0;
                                }
                                else {
                                    return resultRect;
                                }
                            }
                            else {
                                lastRate = vh > vw ? vh / vw : vw / vh;
                            }
                            resultRect.length = 0;
                            for (var j = index; j <= i; j++) {
                                var r = void 0;
                                var currentH = vs[j].size.value * preSize / vw;
                                if (j === index) {
                                    r = new Rect(rect.left, rect.top, rect.left + vw, rect.top + vh);
                                }
                                else {
                                    r = new Rect(resultRect[j - index - 1].left, resultRect[j - index - 1].bottom, resultRect[j - index - 1].left + vw, currentH + resultRect[j - index - 1].bottom);
                                }
                                resultRect.push(r);
                            }
                        }
                        else {
                            lastSize += v.size.value;
                            vh = h = (lastSize * preSize) / rect.width;
                            vw = (vs[index].size.value * preSize) / vh;
                            if (lastRate != 0) {
                                var tmpRate = vh > vw ? vh / vw : vw / vh;
                                if (Math.abs(tmpRate - 1) < Math.abs(lastRate - 1)) {
                                    lastRate = tmpRate;
                                    resultRect.length = 0;
                                }
                                else {
                                    return resultRect;
                                }
                            }
                            else {
                                lastRate = vh > vw ? vh / vw : vw / vh;
                            }
                            resultRect.length = 0;
                            for (var j = index; j <= i; j++) {
                                var r = void 0;
                                var currentW = vs[j].size.value * preSize / vh;
                                if (j === index) {
                                    r = new Rect(rect.left, rect.top, rect.left + vw, rect.top + vh);
                                }
                                else {
                                    r = new Rect(resultRect[j - index - 1].right, resultRect[j - index - 1].top, resultRect[j - index - 1].right + currentW, resultRect[j - index - 1].top + vh);
                                }
                                resultRect.push(r);
                            }
                        }
                        lastW = vw;
                        lastH = vh;
                    }
                    return resultRect;
                };
                TreeMapLayout.prototype.__clipRect = function (r, recttotal) {
                    var rect = null;
                    if (Math.abs(r.width - recttotal.width) <= 0.0001) {
                        rect = new Rect(r.left, r.bottom, r.right, recttotal.bottom);
                    }
                    else {
                        rect = new Rect(r.right, r.top, recttotal.right, r.bottom);
                    }
                    return rect;
                };
                return TreeMapLayout;
            }(hierarchical.HierarchicalLayout));
            hierarchical.TreeMapLayout = TreeMapLayout;
            var Analysis = /** @class */ (function () {
                function Analysis(vs, l, t, r, b, max, depth) {
                    this.vs = vs;
                    this.l = l;
                    this.t = t;
                    this.r = r;
                    this.b = b;
                    this.sum = max;
                    this.depth = depth;
                }
                Object.defineProperty(Analysis.prototype, "w", {
                    get: function () {
                        return this.r - this.l;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Analysis.prototype, "h", {
                    get: function () {
                        return this.b - this.t;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Analysis.prototype, "area", {
                    get: function () {
                        return this.w * this.h;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Analysis;
            }());
        })(hierarchical = test.hierarchical || (test.hierarchical = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var e10 = Math.sqrt(50);
        var e5 = Math.sqrt(10);
        var e2 = Math.sqrt(2);
        var Ticks = /** @class */ (function () {
            function Ticks(scale) {
                this._scale = scale;
                this._ticks = [];
            }
            Ticks.create = function (scale, start, end) {
                return null;
            };
            Ticks.prototype._createTicks = function (start, stop, count) {
                var reverse = stop < start, i = -1, n, ticks, step;
                if (reverse)
                    n = start, start = stop, stop = n;
                if ((step = this._tickIncrement(start, stop, count)) === 0 || !isFinite(step))
                    return [];
                if (step > 0) {
                    start = Math.ceil(start / step);
                    stop = Math.floor(stop / step);
                    ticks = new Array(n = Math.ceil(stop - start + 1));
                    while (++i < n)
                        ticks[i] = (start + i) * step;
                }
                else {
                    start = Math.floor(start * step);
                    stop = Math.ceil(stop * step);
                    ticks = new Array(n = Math.ceil(start - stop + 1));
                    while (++i < n)
                        ticks[i] = (start - i) / step;
                }
                if (reverse)
                    ticks.reverse();
                return ticks;
            };
            Ticks.prototype._tickIncrement = function (start, stop, count) {
                var step = (stop - start) / Math.max(0, count), power = Math.floor(Math.log(step) / Math.LN10), error = step / Math.pow(10, power);
                return power >= 0
                    ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power)
                    : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
            };
            Ticks.prototype._tickStep = function (start, stop, count) {
                var step0 = Math.abs(stop - start) / Math.max(0, count), step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)), error = step0 / step1;
                if (error >= e10)
                    step1 *= 10;
                else if (error >= e5)
                    step1 *= 5;
                else if (error >= e2)
                    step1 *= 2;
                return stop < start ? -step1 : step1;
            };
            return Ticks;
        }());
        test.Ticks = Ticks;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var LinearTicks = /** @class */ (function (_super) {
            __extends(LinearTicks, _super);
            function LinearTicks() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            LinearTicks.create = function (scale) {
                android.Debug.assert(scale instanceof test.LinearScale, " scale must be LinearScale");
                return new LinearTicks(scale);
            };
            LinearTicks.prototype.createTicks = function (count) {
                // let step:number, start:number,stop:number;
                // step = this._tickIncrement(this._start, this._end, count);
                // if (step > 0) {
                //     start = Math.floor(this._start/step) * step;
                //     stop = Math.floor(this._end/step) * step;
                //     step = this._tickIncrement(start,stop,count);
                // }else if(step < 0){
                //     start = Math.ceil(start * step) / step;
                //     stop = Math.floor(stop * step) / step;
                //     step = this._tickIncrement(start, stop, count);
                // }
                if (count == null || isNaN(count)) {
                    count = 10;
                }
                this._ticks = this._createTicks(this._scale.max, this._scale.min, count);
                return this._ticks;
            };
            LinearTicks.prototype.niceScale = function () {
                var scale = this._scale;
                var step = this._tickStep(scale.min, scale.max, 10);
                if (step == 0) {
                    step = 1;
                }
                var niceMin = scale.min === 0 ? 0 : (Math.floor(scale.min / step)) * step;
                var niceMax = (Math.floor(scale.max / step) + 1) * step;
                scale.domain([niceMin, niceMax]).refresh();
                return scale;
            };
            return LinearTicks;
        }(test.Ticks));
        test.LinearTicks = LinearTicks;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var LogTicks = /** @class */ (function (_super) {
            __extends(LogTicks, _super);
            function LogTicks() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            LogTicks.create = function (scale) {
                android.Debug.assert(scale instanceof test.LogScale, " scale must be LinearScale");
                return new LogTicks(scale);
            };
            LogTicks.prototype.createTicks = function (count) {
                if (count == null || isNaN(count)) {
                    count = 10;
                }
                this._ticks = this._createTicks(this._scale.max, this._scale.min, count);
                return this._ticks;
            };
            return LogTicks;
        }(test.Ticks));
        test.LogTicks = LogTicks;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var OrdinalTicks = /** @class */ (function (_super) {
            __extends(OrdinalTicks, _super);
            function OrdinalTicks() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            OrdinalTicks.create = function (scale) {
                android.Debug.assert(scale instanceof test.OrdinalScale, " scale must be OrdinalScale");
                return new OrdinalTicks(scale);
            };
            OrdinalTicks.prototype.createTicks = function (count) {
                // this._ticks = this._createTicks(this._scale.max,this._scale.min,count);
                if (count != null) {
                    this._ticks = [];
                    var domains = this._scale.domains;
                    if (domains.length / count < 2) {
                        this._ticks = this._scale.domains;
                    }
                    else {
                        var step = Math.floor(domains.length / count);
                        for (var i = 0; i < domains.length; i += step) {
                            this._ticks.push(domains[i]);
                        }
                    }
                }
                else {
                    this._ticks = this._scale.domains;
                }
                return this._ticks;
            };
            return OrdinalTicks;
        }(test.Ticks));
        test.OrdinalTicks = OrdinalTicks;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var Default = android.device.Default;
        var AxisShape = /** @class */ (function (_super) {
            __extends(AxisShape, _super);
            function AxisShape(context) {
                var _this = _super.call(this, context) || this;
                _this._major = Default.strokestyle.clone();
                _this._minor = Default.strokestyle.clone();
                _this._lableFont = Default.font.clone();
                _this._showLabel = true;
                return _this;
            }
            AxisShape.prototype.onDrawShape = function (canvas) {
                canvas.save();
                // canvas.clip(rect);
                var xs = [];
                var ys = [];
                var pts = this._lableRect.points;
                for (var j = 0; j < 4; ++j) {
                    xs.push(pts[j].x);
                    ys.push(pts[j].y);
                }
                // canvas.drawPolygon(xs,ys,"blue");
                // this._lableFont.fontColor ='red';
                canvas.drawLine(this._majorTick.startPoint, this._majorTick.endPoint, this._major);
                if (this._showLabel) {
                    canvas.drawText(this._label, this._lableRect.leftTop, this._lableFont, this._lableRect.leftTop, this._lableRect.angle * 180 / Math.PI);
                }
                canvas.drawLine(this._minorTick.startPoint, this._minorTick.endPoint, this._minor);
                canvas.restore();
            };
            AxisShape.prototype.refresh = function () {
            };
            return AxisShape;
        }(test.Shape));
        test.AxisShape = AxisShape;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.ts" />
var LABEL_PADDING = 4;
var MAJOR_TICK_HEIGHT = 6;
var MINOR_TICK_HEIGHT = 4;
var android;
(function (android) {
    var test;
    (function (test) {
        var cartesian;
        (function (cartesian) {
            'use strict';
            var Default = android.device.Default;
            var ViewGroup = android.view.ViewGroup;
            var BaseAxis = /** @class */ (function (_super) {
                __extends(BaseAxis, _super);
                function BaseAxis(context) {
                    var _this = _super.call(this, context) || this;
                    _this._majorTickHeight = MAJOR_TICK_HEIGHT;
                    _this._minorTickHeight = MINOR_TICK_HEIGHT;
                    _this._ticks = [];
                    _this._titleFont = Default.font;
                    _this._labelFont = Default.font;
                    _this._majorStyle = Default.strokestyle;
                    _this._minorStyle = Default.strokestyle;
                    _this._near = true;
                    _this._labelFont.fontColor = "#262626";
                    _this._series = [];
                    return _this;
                }
                Object.defineProperty(BaseAxis.prototype, "title", {
                    get: function () {
                        return this._title;
                    },
                    set: function (value) {
                        this._title = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseAxis.prototype, "majorStyle", {
                    get: function () {
                        return this._majorStyle;
                    },
                    set: function (value) {
                        this._majorStyle = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseAxis.prototype, "minorStyle", {
                    get: function () {
                        return this._minorStyle;
                    },
                    set: function (value) {
                        this._minorStyle = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseAxis.prototype, "lineStyle", {
                    get: function () {
                        return this._lineStyle;
                    },
                    set: function (value) {
                        this._lineStyle = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseAxis.prototype, "titleFont", {
                    get: function () {
                        return this._titleFont;
                    },
                    set: function (value) {
                        this._titleFont = value.clone();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseAxis.prototype, "labelFont", {
                    get: function () {
                        return this._labelFont;
                    },
                    set: function (value) {
                        this._labelFont = value.clone();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseAxis.prototype, "max", {
                    get: function () {
                        return this._max;
                    },
                    set: function (value) {
                        this._max = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseAxis.prototype, "min", {
                    get: function () {
                        return this._min;
                    },
                    set: function (value) {
                        this._min = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseAxis.prototype, "series", {
                    get: function () {
                        return this._series;
                    },
                    set: function (s) {
                        this._series = s;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseAxis.prototype, "scale", {
                    get: function () {
                        return this._scale;
                    },
                    set: function (value) {
                        if (value != null && !value.equal(this._scale)) {
                            this._scale = value;
                            this._ticks = this._createTicks();
                        }
                        else if (value == null) {
                            this._scale = null;
                            this._ticks = [];
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseAxis.prototype, "reversed", {
                    get: function () {
                        return this._reversed;
                    },
                    set: function (value) {
                        this._reversed = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseAxis.prototype, "type", {
                    get: function () {
                        return this._axisType;
                    },
                    set: function (value) {
                        this._axisType = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseAxis.prototype, "near", {
                    get: function () {
                        return this._near;
                    },
                    set: function (value) {
                        this._near = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                BaseAxis.prototype.onMeasure = function (width, height, canvas) {
                    return _super.prototype.onMeasure.call(this, width, height, canvas);
                };
                BaseAxis.prototype.onLayout = function (l, t, r, b, canvas) {
                    _super.prototype.onLayout.call(this, l, t, r, b, canvas);
                };
                BaseAxis.prototype.onDraw = function (canvas) {
                    _super.prototype.onDraw.call(this, canvas);
                };
                BaseAxis.prototype._format = function (val) {
                    return val + "";
                };
                return BaseAxis;
            }(ViewGroup));
            cartesian.BaseAxis = BaseAxis;
        })(cartesian = test.cartesian || (test.cartesian = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var cartesian;
        (function (cartesian) {
            'use strict';
            var MeasureSpec = android.view.MeasureSpec;
            var Size = android.graphics.Size;
            var Gravity = android.graphics.Gravity;
            var LayoutParams = android.view.LayoutParams;
            var Point = android.graphics.Point;
            var Util = android.graphics.Util;
            var LineAxis = /** @class */ (function (_super) {
                __extends(LineAxis, _super);
                function LineAxis(context) {
                    var _this = _super.call(this, context) || this;
                    _this._maxLabelSize = new Size(0, 0);
                    return _this;
                }
                Object.defineProperty(LineAxis.prototype, "near", {
                    get: function () {
                        return this._near;
                    },
                    set: function (value) {
                        this._near = value;
                        if (value) {
                            if (this.type == cartesian.AxisType.X) {
                                this.gravity = Gravity.Bottom;
                            }
                            else if (this.type == cartesian.AxisType.Y) {
                                this.gravity = Gravity.Left;
                            }
                        }
                        else {
                            if (this.type == cartesian.AxisType.X) {
                                this.gravity = Gravity.Top;
                            }
                            else if (this.type == cartesian.AxisType.Y) {
                                this.gravity = Gravity.Right;
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(LineAxis.prototype, "id", {
                    get: function () {
                        return Util.HashCode(Util.HashCode(this._axisType) + Util.HashCode(this.near) + Util.HashCode(this.title));
                    },
                    enumerable: true,
                    configurable: true
                });
                LineAxis.prototype._createTicks = function () {
                    var ticks = [];
                    if (this.scale instanceof test.LinearScale) {
                        ticks = test.LinearTicks.create(this.scale).createTicks(10);
                    }
                    else if (this.scale instanceof test.LogScale) {
                        ticks = test.LogTicks.create(this.scale).createTicks(10);
                    }
                    else if (this.scale instanceof test.OrdinalScale) {
                        ticks = test.OrdinalTicks.create(this.scale).createTicks();
                        if (ticks.length > 30) {
                            ticks = test.OrdinalTicks.create(this.scale).createTicks(30);
                        }
                    }
                    // else if(this.scale instanceof Timescale)
                    return ticks;
                };
                LineAxis.prototype._layoutXAxis = function (canvas) {
                    var ticks = this._ticks;
                    this._children = [];
                    var lastShape;
                    for (var i = 0; ticks && i < ticks.length; ++i) {
                        var value = ticks[i];
                        var nextValue = i >= ticks.length ? null : ticks[i + 1];
                        var tickheight = Math.max(this._majorTickHeight, this._minorTickHeight);
                        var label = this._format(value);
                        var labelSize = canvas.measureString(label, this.labelFont);
                        var x = this.scale.getScaleValue(value);
                        var y = this.layoutInfo.innerrect.top;
                        var nx = NaN;
                        var ny = NaN;
                        if (nextValue != null) {
                            nx = this.scale.getScaleValue(nextValue);
                            ny = y;
                        }
                        var labelX = x;
                        var labelY = y + tickheight + LABEL_PADDING + labelSize.height / 2;
                        var shape = new test.AxisShape(this.getContext());
                        shape._lableRect = new test.RotateRect(labelX, labelY, labelSize.width, labelSize.height, 0);
                        shape._majorTick = new test.RotateLine(x, y, this._majorTickHeight, 0, 0);
                        shape._label = label;
                        shape._lableFont = this._labelFont;
                        shape._major = this.majorStyle;
                        shape._minor = this.minorStyle;
                        var minorx = NaN;
                        if (!isNaN(nx)) {
                            minorx = (x + nx) / 2;
                        }
                        shape._minorTick = new test.RotateLine(minorx, y, this._minorTickHeight, 0, 0);
                        if (lastShape != null && test.Utility.isMixedRotatedRect(shape._lableRect, lastShape._lableRect)) {
                            shape._showLabel = false;
                        }
                        else {
                            shape._showLabel = true;
                            lastShape = shape;
                        }
                        this._children.push(shape);
                    }
                };
                LineAxis.prototype._layoutYAxis = function (canvas) {
                    var ticks = this._ticks;
                    this._children = [];
                    for (var i = 0; ticks && i < ticks.length; ++i) {
                        var value = ticks[i];
                        var nextValue = i >= ticks.length ? null : ticks[i + 1];
                        var tickheight = Math.max(this._majorTickHeight, this._minorTickHeight);
                        var label = this._format(value);
                        var labelSize = canvas.measureString(label, this.labelFont);
                        var y = this.scale.getScaleValue(value);
                        var x = this.layoutInfo.innerrect.right;
                        if (!this.near) {
                            x = this.layoutInfo.innerrect.left;
                        }
                        var nx = NaN;
                        var ny = NaN;
                        if (nextValue != null) {
                            ny = this.scale.getScaleValue(nextValue);
                            nx = x;
                        }
                        var labelX = x - labelSize.width / 2 - LABEL_PADDING - tickheight;
                        var labelY = y;
                        if (!this.near) {
                            labelX = x + labelSize.width / 2 + LABEL_PADDING + tickheight;
                        }
                        var shape = new test.AxisShape(this.getContext());
                        shape._lableRect = new test.RotateRect(labelX, labelY, labelSize.width, labelSize.height, 0);
                        shape._majorTick = new test.RotateLine(x, y, this._majorTickHeight, 0, this.near ? Math.PI / 2 : -Math.PI / 2);
                        shape._label = label;
                        shape._lableFont = this.labelFont;
                        shape._major = this.majorStyle;
                        shape._minor = this.minorStyle;
                        var minory = NaN;
                        if (!isNaN(ny)) {
                            minory = (y + ny) / 2;
                        }
                        shape._minorTick = new test.RotateLine(x, minory, this._minorTickHeight, 0, this.near ? Math.PI / 2 : -Math.PI / 2);
                        this._children.push(shape);
                    }
                };
                LineAxis.prototype.onMeasure = function (width, height, canvas) {
                    var size = null;
                    if (this._axisType == cartesian.AxisType.X) {
                        size = new Size(width.value, this._measureX(canvas));
                        this.setMeasuredDimension(new MeasureSpec(size.width, LayoutParams.EXACTLY), new MeasureSpec(size.height, LayoutParams.EXACTLY));
                        return size;
                    }
                    else if (this._axisType == cartesian.AxisType.Y) {
                        size = new Size(this._measureY(canvas), height.value);
                        this.setMeasuredDimension(new MeasureSpec(size.width, LayoutParams.EXACTLY), new MeasureSpec(size.height, LayoutParams.EXACTLY));
                        return size;
                    }
                    else {
                        return _super.prototype.onMeasure.call(this, width, height, canvas);
                    }
                };
                LineAxis.prototype._measureX = function (canvas) {
                    var titleSize = canvas.measureString(this.title, this.titleFont);
                    var tickHeght = Math.max(this._majorTickHeight, this._minorTickHeight);
                    var labelSize = new Size(0, 0);
                    var ticks = this._ticks;
                    for (var _i = 0, ticks_1 = ticks; _i < ticks_1.length; _i++) {
                        var t = ticks_1[_i];
                        var sz = canvas.measureString(this._format(t), this.labelFont);
                        labelSize.width = Math.max(sz.width, labelSize.width);
                        labelSize.height = Math.max(sz.height, labelSize.height);
                    }
                    this._maxLabelSize = labelSize.clone();
                    return labelSize.height + titleSize.height + tickHeght;
                };
                LineAxis.prototype._measureY = function (canvas) {
                    var titleSize = canvas.measureString(this.title, this.titleFont);
                    var tickHeght = Math.max(this._majorTickHeight, this._minorTickHeight);
                    var labelSize = new Size(0, 0);
                    var ticks = this._ticks;
                    for (var _i = 0, ticks_2 = ticks; _i < ticks_2.length; _i++) {
                        var t = ticks_2[_i];
                        var sz = canvas.measureString(this._format(t), this.labelFont);
                        labelSize.width = Math.max(sz.width, labelSize.width);
                        labelSize.height = Math.max(sz.height, labelSize.height);
                    }
                    this._maxLabelSize = labelSize.clone();
                    return labelSize.width + titleSize.height + tickHeght;
                };
                LineAxis.prototype.onLayout = function (l, t, r, b, canvas) {
                    _super.prototype.onLayout.call(this, l, t, r, b, canvas);
                    if (this.scale != null) {
                        if (this._axisType === cartesian.AxisType.X) {
                            this._layoutXAxis(canvas);
                        }
                        else if (this._axisType == cartesian.AxisType.Y) {
                            this._layoutYAxis(canvas);
                        }
                    }
                    if (this._children != null) {
                        for (var _i = 0, _a = this._children; _i < _a.length; _i++) {
                            var child = _a[_i];
                            if (child instanceof test.AxisShape) {
                                child.onLayout(child._lableRect.leftTop.x, child._lableRect.leftTop.y, child._lableRect.width, child._lableRect.height, canvas);
                                child.id = Util.HashCode(Util.HashCode(child._label) + Util.HashCode(this.id));
                            }
                        }
                    }
                };
                LineAxis.prototype.onDraw = function (canvas) {
                    _super.prototype.onDraw.call(this, canvas);
                    this._drawLine(canvas);
                    if (this._children != null) {
                        for (var _i = 0, _a = this._children; _i < _a.length; _i++) {
                            var shape = _a[_i];
                            shape.onDraw(canvas);
                        }
                    }
                };
                LineAxis.prototype._drawLine = function (canvas) {
                    var rect = this.layoutInfo.innerrect;
                    if (this._axisType == cartesian.AxisType.X) {
                        if (this._near) {
                            canvas.drawLine(new Point(rect.left, rect.top), new Point(rect.right, rect.top), this.lineStyle);
                        }
                        else {
                            canvas.drawLine(new Point(rect.left, rect.bottom), new Point(rect.right, rect.bottom), this.lineStyle);
                        }
                    }
                    else if (this._axisType == cartesian.AxisType.Y) {
                        if (this._near) {
                            canvas.drawLine(new Point(rect.right, rect.top), new Point(rect.right, rect.bottom), this.lineStyle);
                        }
                        else {
                            canvas.drawLine(new Point(rect.left, rect.top), new Point(rect.left, rect.bottom), this.lineStyle);
                        }
                    }
                };
                return LineAxis;
            }(cartesian.BaseAxis));
            cartesian.LineAxis = LineAxis;
        })(cartesian = test.cartesian || (test.cartesian = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var cartesian;
        (function (cartesian) {
            'use strict';
            var MeasureSpec = android.view.MeasureSpec;
            var Size = android.graphics.Size;
            var Gravity = android.graphics.Gravity;
            var LayoutParams = android.view.LayoutParams;
            var Point = android.graphics.Point;
            var Default = android.device.Default;
            var RadialLineAxis = /** @class */ (function (_super) {
                __extends(RadialLineAxis, _super);
                function RadialLineAxis(context) {
                    var _this = _super.call(this, context) || this;
                    _this.__innerRadius = 0;
                    _this.__startAngle = 0;
                    _this.__sweep = 0;
                    _this.__radius = 0;
                    _this.__cx = 0;
                    _this.__cy = 0;
                    _this.__innerRadius = 0;
                    _this._lineStyle = Default.strokestyle;
                    return _this;
                }
                Object.defineProperty(RadialLineAxis.prototype, "near", {
                    get: function () {
                        return this._near;
                    },
                    set: function (value) {
                        this._near = value;
                        if (value) {
                            if (this.type == cartesian.AxisType.X) {
                                this.gravity = Gravity.Bottom;
                            }
                            else if (this.type == cartesian.AxisType.Y) {
                                this.gravity = Gravity.Left;
                            }
                        }
                        else {
                            if (this.type == cartesian.AxisType.X) {
                                this.gravity = Gravity.Top;
                            }
                            else if (this.type == cartesian.AxisType.Y) {
                                this.gravity = Gravity.Right;
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RadialLineAxis.prototype, "_cx", {
                    get: function () {
                        return this.__cx;
                    },
                    set: function (value) {
                        this.__cx = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RadialLineAxis.prototype, "_cy", {
                    get: function () {
                        return this.__cy;
                    },
                    set: function (value) {
                        this.__cy = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RadialLineAxis.prototype, "_radius", {
                    get: function () {
                        return this.__radius;
                    },
                    set: function (value) {
                        this.__radius = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RadialLineAxis.prototype, "_innerRadius", {
                    get: function () {
                        return this.__innerRadius;
                    },
                    set: function (value) {
                        this.__innerRadius = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RadialLineAxis.prototype, "_startAngle", {
                    get: function () {
                        return this.__startAngle;
                    },
                    set: function (value) {
                        this.__startAngle = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RadialLineAxis.prototype, "_sweep", {
                    get: function () {
                        return this.__sweep;
                    },
                    set: function (value) {
                        this.__sweep = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                RadialLineAxis.prototype._createTicks = function () {
                    var ticks = [];
                    if (this.scale instanceof test.LinearScale) {
                        ticks = test.LinearTicks.create(this.scale).createTicks(10);
                    }
                    else if (this.scale instanceof test.LogScale) {
                        ticks = test.LogTicks.create(this.scale).createTicks(10);
                    }
                    else if (this.scale instanceof test.OrdinalScale) {
                        ticks = test.OrdinalTicks.create(this.scale).createTicks();
                    }
                    // else if(this.scale instanceof Timescale)
                    return ticks;
                };
                RadialLineAxis.prototype._layoutXAxis = function (canvas) {
                    var ticks = this._ticks;
                    this._children = [];
                    for (var i = 0; ticks && i < ticks.length; ++i) {
                        var value = ticks[i];
                        var nextValue = i >= ticks.length ? null : ticks[i + 1];
                        var tickheight = Math.max(this._majorTickHeight, this._minorTickHeight);
                        var label = this._format(value);
                        var labelSize = canvas.measureString(label, this.labelFont);
                        var radius = this.scale.getScaleValue(value);
                        var x = this._cx + Math.cos(this._startAngle) * radius;
                        var y = this._cy + Math.sin(this._startAngle) * radius;
                        var nx = NaN;
                        var ny = NaN;
                        if (nextValue != null) {
                            var nextRadius = this.scale.getScaleValue(nextValue);
                            nx = this._cx + Math.cos(this._startAngle) * nextRadius;
                            ny = this._cy + Math.sin(this._startAngle) * nextRadius;
                        }
                        var labelx = x + (Math.sin(this._startAngle) * (tickheight + LABEL_PADDING + labelSize.height / 2));
                        var labely = y - (Math.cos(this._startAngle) * (tickheight + LABEL_PADDING + labelSize.height / 2));
                        var labelX = x;
                        var labelY = y + tickheight + LABEL_PADDING + labelSize.height / 2;
                        var shape = new test.AxisShape(this.getContext());
                        shape._lableRect = new test.RotateRect(labelX, labelY, labelSize.width, labelSize.height, 0);
                        shape._majorTick = new test.RotateLine(x, y, this._majorTickHeight, 0, this._startAngle);
                        shape._label = label;
                        shape._lableFont = this._labelFont;
                        shape._major = this.majorStyle;
                        shape._minor = this.minorStyle;
                        var minorx = NaN;
                        var minory = NaN;
                        var minorRadius = NaN;
                        if (!isNaN(nx)) {
                            minorRadius = this.scale.getScaleValue((value + nextValue) / 2);
                            minorx = this._cx + Math.cos(this._startAngle) * minorRadius;
                            minory = this._cy + Math.sin(this._startAngle) * minorRadius;
                        }
                        shape._minorTick = new test.RotateLine(minorx, minory, this._minorTickHeight, 0, this._startAngle);
                        this._children.push(shape);
                    }
                };
                RadialLineAxis.prototype._layoutYAxis = function (canvas) {
                    var ticks = this._ticks;
                    this._children = [];
                    for (var i = 0; ticks && i < ticks.length; ++i) {
                        var value = ticks[i];
                        var nextValue = i >= ticks.length ? null : ticks[i + 1];
                        var tickheight = Math.max(this._majorTickHeight, this._minorTickHeight);
                        var label = this._format(value);
                        var labelSize = canvas.measureString(label, this.labelFont);
                        var angle = this.scale.getScaleValue(value);
                        var x = this._cx + Math.cos(angle) * this._radius;
                        var y = this._cy + Math.sin(angle) * this._radius;
                        var nx = NaN;
                        var ny = NaN;
                        if (nextValue != null) {
                            var nAngle = this.scale.getScaleValue(nextValue);
                            nx = this._cx + Math.cos(nAngle) * this._radius;
                            ny = this._cy + Math.sin(nAngle) * this._radius;
                        }
                        var lableX = this._cx + Math.cos(angle) * (this._radius + tickheight + LABEL_PADDING + labelSize.height / 2);
                        var lableY = this._cy + Math.sin(angle) * (this._radius + tickheight + LABEL_PADDING + labelSize.height / 2);
                        var shape = new test.AxisShape(this.getContext());
                        shape._lableRect = new test.RotateRect(lableX, lableY, labelSize.width, labelSize.height, 0);
                        shape._majorTick = new test.RotateLine(x, y, this._majorTickHeight, 0, angle - Math.PI / 2);
                        shape._label = label;
                        shape._lableFont = this.labelFont;
                        shape._major = this.majorStyle;
                        shape._minor = this.minorStyle;
                        var minory = NaN;
                        var minorx = NaN;
                        var minorAngle = NaN;
                        if (!isNaN(ny)) {
                            minorAngle = this.scale.getScaleValue((nextValue + value) / 2);
                            minorx = this._cx + Math.cos(minorAngle) * this._radius;
                            minory = this._cy + Math.sin(minorAngle) * this._radius;
                        }
                        shape._minorTick = new test.RotateLine(minorx, minory, this._minorTickHeight, 0, minorAngle - Math.PI / 2);
                        this._children.push(shape);
                    }
                };
                RadialLineAxis.prototype.onMeasure = function (width, height, canvas) {
                    var size = null;
                    if (this._axisType == cartesian.AxisType.X) {
                        size = new Size(width.value, this._measureX(canvas));
                        this.setMeasuredDimension(new MeasureSpec(size.width, LayoutParams.EXACTLY), new MeasureSpec(size.height, LayoutParams.EXACTLY));
                        return size;
                    }
                    else if (this._axisType == cartesian.AxisType.Y) {
                        size = new Size(this._measureY(canvas), height.value);
                        this.setMeasuredDimension(new MeasureSpec(size.width, LayoutParams.EXACTLY), new MeasureSpec(size.height, LayoutParams.EXACTLY));
                        return size;
                    }
                    else {
                        return _super.prototype.onMeasure.call(this, width, height, canvas);
                    }
                };
                RadialLineAxis.prototype._measureX = function (canvas) {
                    var titleSize = canvas.measureString(this.title, this.titleFont);
                    var tickHeght = Math.max(this._majorTickHeight, this._minorTickHeight);
                    var labelSize = new Size(0, 0);
                    var ticks = this._ticks;
                    for (var _i = 0, ticks_3 = ticks; _i < ticks_3.length; _i++) {
                        var t = ticks_3[_i];
                        var sz = canvas.measureString(this._format(t), this.labelFont);
                        labelSize.width = Math.max(sz.width, labelSize.width);
                        labelSize.height = Math.max(sz.height, labelSize.height);
                    }
                    return labelSize.height + titleSize.height + tickHeght;
                };
                RadialLineAxis.prototype._measureY = function (canvas) {
                    var titleSize = canvas.measureString(this.title, this.titleFont);
                    var tickHeght = Math.max(this._majorTickHeight, this._minorTickHeight);
                    var labelSize = new Size(0, 0);
                    var ticks = this._ticks;
                    for (var _i = 0, ticks_4 = ticks; _i < ticks_4.length; _i++) {
                        var t = ticks_4[_i];
                        var sz = canvas.measureString(this._format(t), this.labelFont);
                        labelSize.width = Math.max(sz.width, labelSize.width);
                        labelSize.height = Math.max(sz.height, labelSize.height);
                    }
                    return labelSize.width + titleSize.height + tickHeght;
                };
                RadialLineAxis.prototype.onLayout = function (l, t, r, b, canvas) {
                    _super.prototype.onLayout.call(this, l, t, r, b, canvas);
                    if (this.scale != null) {
                        if (this._axisType === cartesian.AxisType.X) {
                            this._layoutXAxis(canvas);
                        }
                        else if (this._axisType == cartesian.AxisType.Y) {
                            this._layoutYAxis(canvas);
                        }
                    }
                };
                RadialLineAxis.prototype.onDraw = function (canvas) {
                    _super.prototype.onDraw.call(this, canvas);
                    this._drawLine(canvas);
                    if (this._children != null) {
                        for (var _i = 0, _a = this._children; _i < _a.length; _i++) {
                            var shape = _a[_i];
                            shape.onDraw(canvas);
                        }
                    }
                };
                RadialLineAxis.prototype._drawLine = function (canvas) {
                    var rect = this.layoutInfo.innerrect;
                    if (this._axisType == cartesian.AxisType.X) {
                        var endx = this._cx + Math.cos(this.__startAngle) * this._radius;
                        var endy = this._cy + Math.sin(this.__startAngle) * this._radius;
                        var sx = this._cx + Math.cos(this.__startAngle) *
                            this.__innerRadius * this._radius;
                        var sy = this._cy + Math.sin(this.__startAngle) * this._innerRadius * this._radius;
                        canvas.drawLine(new Point(sx, sy), new Point(endx, endy), this.lineStyle);
                    }
                    else if (this._axisType == cartesian.AxisType.Y) {
                        var s = Default.style;
                        s.strokeStyle = this.lineStyle;
                        canvas.drawDonut(this._cx, this._cy, this._radius, this._radius - this.lineStyle.strokeWidth, this._startAngle / Math.PI * 180, this._sweep * 180 / Math.PI, s);
                    }
                };
                return RadialLineAxis;
            }(cartesian.BaseAxis));
            cartesian.RadialLineAxis = RadialLineAxis;
        })(cartesian = test.cartesian || (test.cartesian = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var ViewGroup = android.view.ViewGroup;
        var BasePlot = /** @class */ (function (_super) {
            __extends(BasePlot, _super);
            function BasePlot() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(BasePlot.prototype, "layout", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            return BasePlot;
        }(ViewGroup));
        test.BasePlot = BasePlot;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var cartesian;
        (function (cartesian) {
            var Rect = android.graphics.Rect;
            var Default = android.device.Default;
            var Animation = android.view.animation.Animation;
            var BounceAnimationEase = android.view.animation.BounceAnimationEase;
            var CartesianPlot = /** @class */ (function (_super) {
                __extends(CartesianPlot, _super);
                function CartesianPlot(context, datamodel) {
                    var _this = _super.call(this, context) || this;
                    _this.__shapeList = [];
                    _this._datamodel = datamodel;
                    _this._layouts = [];
                    _this.__scalePairs = [];
                    _this._animation = new Animation();
                    _this._animation.duration = 500;
                    _this._animation.ease = new BounceAnimationEase();
                    return _this;
                }
                CartesianPlot.prototype.onMeasure = function (width, height, canvas) {
                    return _super.prototype.onMeasure.call(this, width, height, canvas);
                };
                CartesianPlot.prototype.onLayout = function (l, t, r, b, canvas) {
                    _super.prototype.onLayout.call(this, l, t, r, b, canvas);
                    if (this.islayoutChanged) {
                        this.removeAllViews();
                        this.__shapeList = [];
                        this.__scalePairs = [];
                        this._layouts.length = 0;
                        var isradial = this._datamodel.encoding._radial;
                        for (var _i = 0, _a = this._datamodel.chartTypes; _i < _a.length; _i++) {
                            var type = _a[_i];
                            switch (type) {
                                case test.ChartType.Bar:
                                    if (isradial) {
                                        var barlayout = new cartesian.RadialBarLayout(this.getContext());
                                        var cx = (l + r) / 2;
                                        var cy = (b + t) / 2;
                                        var radius = ((r - l) < (b - t) ? (r - l) : (b - t)) / 2;
                                        var innerRadius = 0;
                                        var startAngle = cartesian.StartAngle;
                                        var endAngle = Math.PI * 2 + startAngle;
                                        barlayout.convert(this._datamodel.getSeriesByType(test.ChartType.Bar), this._datamodel.encoding, cx, cy, innerRadius, radius, startAngle, endAngle);
                                        this.__shapeList = this.__shapeList.concat(barlayout.shapeList);
                                        this._layouts.push(barlayout);
                                    }
                                    else {
                                        var barlayout = new cartesian.BarLayout(this.getContext());
                                        barlayout.convert(this._datamodel.getSeriesByType(test.ChartType.Bar), this._datamodel.encoding, new Rect(l, t, r, b), canvas);
                                        this.__shapeList = this.__shapeList.concat(barlayout.shapeList);
                                        this._layouts.push(barlayout);
                                    }
                                    break;
                                case test.ChartType.Line:
                                    if (isradial) {
                                        var linelayout = new cartesian.RadialLineLayout(this.getContext());
                                        var cx = (l + r) / 2;
                                        var cy = (b + t) / 2;
                                        var radius = ((r - l) < (b - t) ? (r - l) : (b - t)) / 2;
                                        var innerRadius = 0;
                                        var startAngle = cartesian.StartAngle;
                                        var endAngle = Math.PI * 2 + startAngle;
                                        linelayout.convert(this._datamodel.getSeriesByType(test.ChartType.Line), this._datamodel.encoding, cx, cy, innerRadius, radius, startAngle, endAngle);
                                        this.__shapeList = this.__shapeList.concat(linelayout.shapeList);
                                        this._layouts.push(linelayout);
                                    }
                                    else {
                                        var linelayout = new cartesian.LineLayout(this.getContext());
                                        linelayout.convert(this._datamodel.getSeriesByType(test.ChartType.Line), this._datamodel.encoding, new Rect(l, t, r, b), canvas);
                                        this.__shapeList = this.__shapeList.concat(linelayout.shapeList);
                                        this._layouts.push(linelayout);
                                    }
                                    break;
                                case test.ChartType.Scatter:
                                    if (isradial) {
                                        var scatterlayout = new cartesian.RadialScatterLayout(this.getContext());
                                        var cx = (l + r) / 2;
                                        var cy = (b + t) / 2;
                                        var radius = ((r - l) < (b - t) ? (r - l) : (b - t)) / 2;
                                        var innerRadius = 0;
                                        var startAngle = cartesian.StartAngle;
                                        var endAngle = Math.PI * 2 + startAngle;
                                        scatterlayout.convert(this._datamodel.getSeriesByType(test.ChartType.Scatter), this._datamodel.encoding, cx, cy, innerRadius, radius, startAngle, endAngle);
                                        this.__shapeList = this.__shapeList.concat(scatterlayout.shapeList);
                                        this._layouts.push(scatterlayout);
                                    }
                                    else {
                                        var scatterLayout = new cartesian.ScatterLayout(this.getContext());
                                        scatterLayout.convert(this._datamodel.getSeriesByType(test.ChartType.Scatter), this._datamodel.encoding, new Rect(l, t, r, b), canvas);
                                        this.__shapeList = this.__shapeList.concat(scatterLayout.shapeList);
                                        this._layouts.push(scatterLayout);
                                    }
                                    break;
                                case test.ChartType.Area:
                                    if (isradial) {
                                        var arealayout = new cartesian.RadialAreaLayout(this.getContext());
                                        var cx = (l + r) / 2;
                                        var cy = (b + t) / 2;
                                        var radius = ((r - l) < (b - t) ? (r - l) : (b - t)) / 2;
                                        var innerRadius = 0;
                                        var startAngle = cartesian.StartAngle;
                                        var endAngle = Math.PI * 2 + startAngle;
                                        arealayout.convert(this._datamodel.getSeriesByType(test.ChartType.Area), this._datamodel.encoding, cx, cy, innerRadius, radius, startAngle, endAngle);
                                        this.__shapeList = this.__shapeList.concat(arealayout.shapeList);
                                        this._layouts.push(arealayout);
                                    }
                                    else {
                                        var arealayout = new cartesian.AreaLayout(this.getContext());
                                        arealayout.convert(this._datamodel.getSeriesByType(test.ChartType.Area), this._datamodel.encoding, new Rect(l, t, r, b), canvas);
                                        this.__shapeList = this.__shapeList.concat(arealayout.shapeList);
                                        this._layouts.push(arealayout);
                                    }
                                    break;
                            }
                        }
                        if (this.layouts.length > 1) {
                            for (var i = 0; i < this._layouts.length; ++i) {
                                var scalesPairs = this.layouts[i].scalePairs;
                                var _loop_1 = function (pair) {
                                    var result = _.find(this_1.scalePairs, function (p) {
                                        return p.filed.equals(pair.filed) && p.scale.equal(pair.scale);
                                    });
                                    if (result == null) {
                                        this_1.__scalePairs.push({ series: [].concat(pair.series), filed: pair.filed, scale: pair.scale });
                                    }
                                    else {
                                        result.series = result.series.concat(pair.series);
                                    }
                                };
                                var this_1 = this;
                                for (var _b = 0, scalesPairs_1 = scalesPairs; _b < scalesPairs_1.length; _b++) {
                                    var pair = scalesPairs_1[_b];
                                    _loop_1(pair);
                                }
                            }
                        }
                        else if (this._layouts.length === 1) {
                            this.__scalePairs = this._layouts[0].scalePairs;
                        }
                        if (!this._datamodel.encoding._radial) {
                            this._layoutLine(l, r);
                        }
                        // if(this.comparedAniamtionCache != null){
                        //     if(!this.comparedAniamtionCache.isempty){
                        //         this.comparedAniamtionCache.preparing();
                        //     }
                        //     setTimeout(() => {
                        //         this.comparedAniamtionCache.startCompare(this.__shapeList);
                        //     });
                        // }
                        for (var _c = 0, _d = this.__shapeList; _c < _d.length; _c++) {
                            var shape = _d[_c];
                            this.addViewWithOutReLayout(shape);
                            if (shape instanceof test.PlotShape && shape.label != null) {
                                this.addViewWithOutReLayout(shape.label);
                            }
                        }
                    }
                };
                CartesianPlot.prototype._layoutLine = function (l, r) {
                    var ys = [];
                    for (var _i = 0, _a = this.layouts; _i < _a.length; _i++) {
                        var layout = _a[_i];
                        for (var _b = 0, _c = layout.scalePairs; _b < _c.length; _b++) {
                            var pair = _c[_b];
                            if (pair.filed.name == 'y') {
                                var y = pair.scale.getScaleValue(0);
                                if (ys.indexOf(y) < 0) {
                                    ys.push(y);
                                    var axisline = new test.AxisLineShape(this.getContext(), l, y, r, y, Default.strokestyle);
                                    this.__shapeList.push(axisline);
                                }
                            }
                        }
                    }
                };
                CartesianPlot.prototype.beginLoadingAnimation = function () {
                    var step = 500 / this.children.length;
                    var _loop_2 = function (i) {
                        var shape = this_2.children[i];
                        if (shape instanceof test.ScatterShape) {
                            setTimeout(function () {
                                console.log("index  " + i);
                                var animation = new test.ScatterAnimation(null);
                                animation.duration = 500;
                                animation.from = 0.2;
                                animation.to = 1;
                                animation.fillAfter = false;
                                shape.startAnimation(animation);
                            }, step * i);
                        }
                        else if (shape instanceof test.BarShape) {
                            setTimeout(function () {
                                var animation = new test.BarAnimation(null);
                                animation.duration = 1000;
                                animation.from = 0.3;
                                animation.to = 1;
                                animation.fillAfter = false;
                                shape.startAnimation(animation);
                            }, step * i);
                        }
                        else if (shape instanceof test.AreaShape || shape instanceof test.LinesShape) {
                            setTimeout(function () {
                                var animation = new test.AreaAnimation(null);
                                animation.duration = 1000;
                                animation.from = 0;
                                animation.to = 1;
                                animation.fillAfter = false;
                                shape.startAnimation(animation);
                            }, step * i);
                        }
                        else if (shape instanceof test.RadialBarShape) {
                            setTimeout(function () {
                                var animation = new test.SweepAnimation();
                                animation.duration = 1000;
                                animation.from = 0;
                                animation.to = 1;
                                animation.fillAfter = false;
                                shape.startAnimation(animation);
                            }, step * i);
                        }
                    };
                    var this_2 = this;
                    for (var i = 0; i < this.children.length; ++i) {
                        _loop_2(i);
                    }
                };
                /**
                 * merage the scales which is  x / y
                 */
                CartesianPlot.prototype.__merageScale = function () {
                };
                CartesianPlot.prototype.onDraw = function (canvas) {
                    _super.prototype.onDraw.call(this, canvas);
                    // for (let shape of this.__shapeList) {
                    //     shape.draw(canvas);
                    // }
                };
                Object.defineProperty(CartesianPlot.prototype, "layouts", {
                    get: function () {
                        return this._layouts;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CartesianPlot.prototype, "scalePairs", {
                    get: function () {
                        return this.__scalePairs;
                    },
                    enumerable: true,
                    configurable: true
                });
                return CartesianPlot;
            }(test.BasePlot));
            cartesian.CartesianPlot = CartesianPlot;
        })(cartesian = test.cartesian || (test.cartesian = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var cartesian;
        (function (cartesian) {
            'use strict';
            var MeasureSpec = android.view.MeasureSpec;
            var Size = android.graphics.Size;
            var LayoutParams = android.view.LayoutParams;
            var FrameLayout = android.widget.FrameLayout;
            var Gravity = android.graphics.Gravity;
            var StrokeStyle = android.graphics.StrokeStyle;
            cartesian.StartAngle = Math.PI;
            var CartesianChart = /** @class */ (function (_super) {
                __extends(CartesianChart, _super);
                function CartesianChart(context, option, chartType) {
                    var _this = _super.call(this, context) || this;
                    _this._option = option;
                    _this._chartType = chartType;
                    _this._axisList = [];
                    return _this;
                }
                Object.defineProperty(CartesianChart.prototype, "option", {
                    get: function () {
                        return this._option;
                    },
                    set: function (value) {
                        this._option = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CartesianChart.prototype, "chartType", {
                    get: function () {
                        return this._chartType;
                    },
                    set: function (value) {
                        if (value != null && value != this._chartType) {
                            this._chartType = value;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CartesianChart.prototype, "datamodel", {
                    get: function () {
                        return this._dataModel;
                    },
                    set: function (value) {
                        this._dataModel = value;
                        if (this._dataModel.encoding._radial) {
                            this._loadRadialView();
                        }
                        else {
                            this._loadView();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                CartesianChart.prototype._loadView = function () {
                    for (var _i = 0, _a = this.datamodel.scalePairs; _i < _a.length; _i++) {
                        var pair = _a[_i];
                        if (pair.filed.name == 'y') {
                            var axisY = new cartesian.LineAxis(this.getContext());
                            axisY.type = cartesian.AxisType.Y;
                            axisY.layoutParams.height = LayoutParams.MATCH_PARENT;
                            axisY.layoutParams.width = 100;
                            axisY.near = true;
                            axisY.majorStyle = new StrokeStyle(1, 'black');
                            axisY.series = [].concat(pair.series);
                            axisY.lineStyle = new StrokeStyle(1, 'black');
                            this._axisList.push(axisY);
                            this.addView(axisY);
                        }
                    }
                    if (this._axisList.length > 1) {
                        this._axisList[this._axisList.length - 1].near = false;
                    }
                    var plot = new cartesian.CartesianPlot(this.getContext(), this.datamodel);
                    plot.layoutParams.width = LayoutParams.MATCH_PARENT;
                    plot.layoutParams.height = LayoutParams.MATCH_PARENT;
                    this._plot = plot;
                    this.addView(plot);
                    var axisX = new cartesian.LineAxis(this.getContext());
                    axisX.type = cartesian.AxisType.X;
                    axisX.layoutParams.width = LayoutParams.MATCH_PARENT;
                    axisX.layoutParams.height = 100;
                    axisX.majorStyle = new StrokeStyle(1, 'black');
                    axisX.near = true;
                    axisX.lineStyle = new StrokeStyle(1, 'black');
                    this._axisList.push(axisX);
                    this.addView(axisX);
                };
                CartesianChart.prototype.beginLoadingAnimation = function () {
                    this.plot.beginLoadingAnimation();
                };
                CartesianChart.prototype._loadRadialView = function () {
                    for (var _i = 0, _a = this.datamodel.scalePairs; _i < _a.length; _i++) {
                        var pair = _a[_i];
                        if (pair.filed.name == 'y') {
                            var axisY = new cartesian.RadialLineAxis(this.getContext());
                            axisY.type = cartesian.AxisType.Y;
                            axisY.layoutParams.height = LayoutParams.MATCH_PARENT;
                            axisY.layoutParams.width = LayoutParams.MATCH_PARENT;
                            axisY.near = true;
                            axisY.series = [].concat(pair.series);
                            axisY.lineStyle = new StrokeStyle(1, 'black');
                            axisY.majorStyle = new StrokeStyle(1, 'black');
                            this._axisList.push(axisY);
                            this.addView(axisY);
                        }
                    }
                    if (this._axisList.length > 1) {
                        this._axisList[this._axisList.length - 1].near = false;
                    }
                    var plot = new cartesian.CartesianPlot(this.getContext(), this.datamodel);
                    plot.layoutParams.width = LayoutParams.MATCH_PARENT;
                    plot.layoutParams.height = LayoutParams.MATCH_PARENT;
                    this._plot = plot;
                    this.addView(plot);
                    var axisX = new cartesian.RadialLineAxis(this.getContext());
                    axisX.type = cartesian.AxisType.X;
                    axisX.gravity = Gravity.Center;
                    axisX.layoutParams.width = LayoutParams.MATCH_PARENT;
                    axisX.layoutParams.height = LayoutParams.MATCH_PARENT;
                    axisX.majorStyle = new StrokeStyle(1, 'black');
                    axisX.near = true;
                    axisX.lineStyle = new StrokeStyle(1, 'black');
                    this._axisList.push(axisX);
                    this.addView(axisX);
                };
                CartesianChart.prototype.onMeasure = function (width, height, canvas) {
                    // return super.onMeasure(width,height,canvas);
                    var maxsize = new Size(0, 0);
                    if (this.datamodel.encoding._radial) {
                        var offset = 0;
                        for (var _i = 0, _a = this._axisList; _i < _a.length; _i++) {
                            var axis = _a[_i];
                            var size = axis.onMeasure(width, height, canvas);
                            if (axis.type == cartesian.AxisType.Y) {
                                offset = size.width;
                            }
                        }
                        var w = width.getMeasureValue();
                        var h = height.getMeasureValue();
                        var radius = w < h ? w / 2 : h / 2;
                        radius = radius - offset;
                        var startAngle = cartesian.StartAngle;
                        var sweep = Math.PI * 2;
                        for (var _b = 0, _c = this.children; _b < _c.length; _b++) {
                            var view_1 = _c[_b];
                            var size = new Size(0, 0);
                            if (view_1 instanceof cartesian.BaseAxis) {
                                if (view_1.type == cartesian.AxisType.Y) {
                                    size = view_1.onMeasure(new MeasureSpec(width.getMeasureValue(), LayoutParams.EXACTLY), new MeasureSpec(height.getMeasureValue(), LayoutParams.EXACTLY), canvas);
                                }
                                else if (view_1.type == cartesian.AxisType.X) {
                                    view_1.onMeasure(width, height, canvas);
                                }
                                view_1._innerRadius = 0;
                                view_1._startAngle = startAngle;
                                view_1._sweep = sweep;
                                view_1._radius = radius;
                            }
                            else if (view_1 instanceof test.BasePlot) {
                                view_1.layoutParams.margin.marginLeft = offset;
                                view_1.layoutParams.margin.marginTop = offset;
                                view_1.layoutParams.margin.marginRight = offset;
                                view_1.layoutParams.margin.marginBottom = offset;
                                view_1.onMeasure(width, height, canvas);
                            }
                        }
                    }
                    else {
                        var loff = 0, toff = 0, roff = 0, boff = 0;
                        var axisYPositiveoffset = [];
                        var axisYNegativeoffset = [];
                        for (var _d = 0, _e = this._axisList; _d < _e.length; _d++) {
                            var axis = _e[_d];
                            var size = axis.onMeasure(width, height, canvas);
                            if (axis.type == cartesian.AxisType.X) {
                                if (axis.near) {
                                    boff = size.height;
                                }
                                else {
                                    toff = size.height;
                                }
                            }
                            else if (axis.type == cartesian.AxisType.Y) {
                                if (axis.near) {
                                    loff += size.width;
                                    axisYPositiveoffset.push(size.width);
                                }
                                else {
                                    roff += size.width;
                                    axisYPositiveoffset.push(size.width);
                                }
                            }
                        }
                        var leftPadding = 0;
                        var rightPadding = 0;
                        for (var _f = 0, _g = this.children; _f < _g.length; _f++) {
                            var view_2 = _g[_f];
                            var size = new Size(0, 0);
                            if (view_2 instanceof cartesian.BaseAxis) {
                                if (view_2.type == cartesian.AxisType.X) {
                                    view_2.layoutParams.margin.marginLeft = loff;
                                    view_2.layoutParams.margin.marginRight = roff;
                                    size = view_2.onMeasure(new MeasureSpec(width.getMeasureValue() - loff - roff, width.mode), height, canvas);
                                }
                                else if (view_2.type == cartesian.AxisType.Y) {
                                    if (view_2.near) {
                                        view_2.layoutParams.margin.marginTop = toff;
                                        view_2.layoutParams.margin.marginBottom = boff;
                                        view_2.layoutParams.margin.marginLeft = leftPadding;
                                        leftPadding += view_2.width;
                                        size = view_2.onMeasure(width, new MeasureSpec(height.getMeasureValue() - toff - boff, LayoutParams.EXACTLY), canvas);
                                    }
                                    else {
                                        view_2.layoutParams.margin.marginTop = toff;
                                        view_2.layoutParams.margin.marginBottom = boff;
                                        view_2.layoutParams.margin.marginRight = rightPadding;
                                        rightPadding += view_2.width;
                                        size = view_2.onMeasure(width, new MeasureSpec(height.getMeasureValue() - toff - boff, LayoutParams.EXACTLY), canvas);
                                    }
                                }
                            }
                            else if (view_2 instanceof test.BasePlot) {
                                view_2.layoutParams.margin.marginLeft = loff;
                                view_2.layoutParams.margin.marginRight = roff;
                                view_2.layoutParams.margin.marginTop = toff;
                                view_2.layoutParams.margin.marginBottom = boff;
                                size = view_2.onMeasure(width, height, canvas);
                            }
                            else {
                                size = view_2.onMeasure(width, height, canvas);
                            }
                            if (size.width > maxsize.width) {
                                maxsize.width = size.width;
                            }
                            if (size.height > maxsize.height) {
                                maxsize.height = size.height;
                            }
                        }
                    }
                    return _super.prototype.onMeasure.call(this, width, height, canvas);
                };
                CartesianChart.prototype.onLayout = function (l, t, r, b, canvas) {
                    this.layoutInfo.reset(l, t, r, b, this.padding, 0);
                    for (var _i = 0, _a = this._axisList; _i < _a.length; _i++) {
                        var axis = _a[_i];
                        axis.scale = null;
                    }
                    // super.onLayout(l, t, r, b, canvas); 
                    this.layoutItem(this.plot, l, t, r, b, canvas);
                    for (var _b = 0, _c = this._axisList; _b < _c.length; _b++) {
                        var axis = _c[_b];
                        if (axis instanceof cartesian.BaseAxis) {
                            if (axis instanceof cartesian.RadialLineAxis) {
                                axis._cx = (l + r) / 2;
                                axis._cy = (t + b) / 2;
                            }
                            if (axis.type === cartesian.AxisType.X) {
                                for (var _d = 0, _e = this.plot.scalePairs; _d < _e.length; _d++) {
                                    var pair = _e[_d];
                                    if (pair.filed.name == 'x') {
                                        axis.scale = pair.scale;
                                    }
                                }
                            }
                            else {
                                for (var _f = 0, _g = this.plot.scalePairs; _f < _g.length; _f++) {
                                    var pair = _g[_f];
                                    if (pair.filed.name == 'y' && _.xor(pair.series, axis.series).length == 0) {
                                        axis.scale = pair.scale;
                                    }
                                }
                            }
                        }
                        this.layoutItem(axis, l, r, t, b, canvas);
                    }
                };
                Object.defineProperty(CartesianChart.prototype, "plot", {
                    get: function () {
                        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                            var plot = _a[_i];
                            if (plot instanceof cartesian.CartesianPlot) {
                                return plot;
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                CartesianChart.prototype.dispatchDraw = function (canvas) {
                    _super.prototype.dispatchDraw.call(this, canvas);
                };
                return CartesianChart;
            }(FrameLayout));
            cartesian.CartesianChart = CartesianChart;
        })(cartesian = test.cartesian || (test.cartesian = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var Gravity = android.graphics.Gravity;
        var RootView = android.widget.RootView;
        var BaseChartLayout = /** @class */ (function (_super) {
            __extends(BaseChartLayout, _super);
            function BaseChartLayout() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.__legends = [];
                return _this;
            }
            BaseChartLayout.prototype.setMainLayout = function (main) {
                this.__mainLayout = main;
                this.addView(main, 0);
            };
            BaseChartLayout.prototype.addLegend = function (legend) {
                this.__legends.push(legend);
                this.addView(legend, 0);
            };
            BaseChartLayout.prototype.removeAllViews = function () {
                _super.prototype.removeAllViews.call(this);
                this.__mainLayout = null;
                this.__legends.length = 0;
            };
            BaseChartLayout.prototype.onMeasure = function (width, height, canvas) {
                _super.prototype.onMeasure.call(this, width, height, canvas);
                if (this.__oldMargin == null) {
                    this.__oldMargin = _.cloneDeep(this.__mainLayout.layoutParams.margin);
                }
                else {
                    this.__mainLayout.layoutParams.margin = _.cloneDeep(this.__oldMargin);
                }
                for (var _i = 0, _a = this.__legends; _i < _a.length; _i++) {
                    var legend = _a[_i];
                    switch (legend.gravity) {
                        case Gravity.Left:
                            this.__mainLayout.layoutParams.margin.marginLeft += (legend.width + legend.layoutParams.margin.marginLeft + legend.layoutParams.margin.marginRight);
                            break;
                        case Gravity.Right:
                            this.__mainLayout.layoutParams.margin.marginRight += (legend.width + legend.layoutParams.margin.marginRight + legend.layoutParams.margin.marginLeft);
                            break;
                        case Gravity.Top:
                            this.__mainLayout.layoutParams.margin.marginTop += (legend.height + legend.layoutParams.margin.marginTop + legend.layoutParams.margin.marginBottom);
                            break;
                        case Gravity.Bottom:
                            this.__mainLayout.layoutParams.margin.marginBottom += (legend.height + legend.layoutParams.margin.marginBottom + legend.layoutParams.margin.marginTop);
                            break;
                    }
                }
                return _super.prototype.onMeasure.call(this, width, height, canvas);
            };
            BaseChartLayout.prototype.onLayout = function (l, t, r, b, canvas) {
                _super.prototype.onLayout.call(this, l, t, r, b, canvas);
            };
            return BaseChartLayout;
        }(RootView));
        test.BaseChartLayout = BaseChartLayout;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var cartesian;
        (function (cartesian) {
            var Padding = android.graphics.Padding;
            var Gravity = android.graphics.Gravity;
            var LayoutParams = android.view.LayoutParams;
            var RenderType = android.graphics.RenderType;
            var Util = android.graphics.Util;
            var Handler = android.util.Handler;
            cartesian.EventMessage = 'EventMessage';
            var ChartLayout = /** @class */ (function (_super) {
                __extends(ChartLayout, _super);
                function ChartLayout(context) {
                    var _this = _super.call(this, context) || this;
                    _this.clip = false;
                    var handler = new Handler(function (msg) {
                        var types = msg.args['types'];
                        var info = msg.args['info'];
                        // let pt 
                        console.log(" " + ", type " + types + " , info " + info);
                        if (types == test.ElementType.SeriesLegend) {
                            var series = _this._dataModel.filter.series;
                            var index = series.indexOf(info.series);
                            if (info.action === 'enableseries') {
                                if (info.enable) {
                                    if (index > -1) {
                                        _this._dataModel.filter.series.splice(index, 1);
                                    }
                                }
                                else {
                                    if (index < 0) {
                                        _this._dataModel.filter.series.push(info.series);
                                    }
                                }
                                _this.perpareComparedAnimation();
                                _this._dataModel.refresh();
                                _this.setChart();
                                _this.startCompare();
                            }
                            else if (info.action === 'showlabel') {
                                _this.requestLayout();
                            }
                        }
                    });
                    context.setArgs(cartesian.EventMessage, handler);
                    return _this;
                    // let EventHandler = (pt: Point, types: ElementType, info: any) => {
                    //     console.log(" " + pt.toString() + ", type " + types + " , info " + info);
                    //     if (types == ElementType.SeriesLegend) {
                    //         let series: string[] = this._dataModel.filter.series;
                    //         let index: number = series.indexOf(info.series);
                    //         if (info.action === 'enableseries') {
                    //             if (info.enable) {
                    //                 if (index > -1) {
                    //                     this._dataModel.filter.series.splice(index, 1);
                    //                 }
                    //             } else {
                    //                 if (index < 0) {
                    //                     this._dataModel.filter.series.push(info.series);
                    //                 }
                    //             }
                    //             this._dataModel.refresh();
                    //             this.setChart();
                    //         } else if (info.action === 'showlabel') {
                    //             this.requestLayout();
                    //         }
                    //     }
                    // }
                    // window['EventHandler'] = EventHandler;
                }
                ChartLayout.prototype.attachElement = function (element, renderType, datamodel, update) {
                    _super.prototype.attachElement.call(this, element, Util.asEnum(renderType, RenderType));
                    this.padding = new Padding(20);
                    this._dataModel = datamodel;
                    this.setChart();
                };
                ChartLayout.prototype.beginLoadingAnimation = function () {
                    if (this.getContext() != null) {
                        var comparedAnimationCache = this.getContext().getArgs('comparedanimation');
                        if (comparedAnimationCache != null) {
                            comparedAnimationCache.clear();
                        }
                    }
                    this._chart.beginLoadingAnimation();
                };
                ChartLayout.prototype.setChart = function () {
                    this.removeAllViews();
                    this._chart = new cartesian.CartesianChart(this.getContext(), null, test.ChartType.Bar);
                    this._chart.layoutParams.width = LayoutParams.MATCH_PARENT;
                    this._chart.layoutParams.height = LayoutParams.MATCH_PARENT;
                    this._chart.datamodel = this._dataModel;
                    this._chart.gravity = Gravity.Bottom;
                    this.setMainLayout(this._chart);
                    if (this._dataModel.allSeries.length > 1) {
                        var legend = new cartesian.SeriesLegend(this.getContext(), 'bar');
                        legend.series = this._dataModel.allSeries;
                        legend.gravity = Gravity.Bottom;
                        legend.layoutParams.margin.marginLeft = 0;
                        legend.layoutParams.margin.marginTop = 20;
                        legend.layoutParams.width = LayoutParams.WRAP_CONTENT;
                        legend.layoutParams.height = LayoutParams.WRAP_CONTENT;
                        this.addLegend(legend);
                    }
                    else if (this._dataModel.series.length == 1) {
                        // this._horizontallegend.series = datamodel._getScaleByName('color',datamodel.series[0].name);
                    }
                    if (this._dataModel != null) {
                        for (var _i = 0, _a = this._dataModel.scalePairs; _i < _a.length; _i++) {
                            var scaleinfo = _a[_i];
                            if (scaleinfo.filed.name == 'color') {
                                var legend = new cartesian.ScaleLegend(this.getContext(), 'color');
                                legend.scale = scaleinfo.scale;
                                legend.layoutParams.width = 200;
                                legend.layoutParams.height = 30;
                                legend.gravity = Gravity.Top;
                                legend.layoutParams.margin.marginLeft = 100;
                                legend.layoutParams.margin.marginBottom = 20;
                                this.addLegend(legend);
                            }
                        }
                    }
                    // if (legend != null) {
                    //     // _horizontallegend.setOrientation(Orientation.Horizontal);
                    // }
                };
                ChartLayout.prototype.oninvalidate = function () {
                    // let comparedanimationcache :ComparedAnimationCache =this.getContext().getArgs('comparedanimation');
                    // if( comparedanimationcache!= null && comparedanimationcache.getPreparing()) {
                    //     return;
                    // }
                    _super.prototype.oninvalidate.call(this);
                };
                ChartLayout.prototype.dispatchDraw = function (canvas) {
                    _super.prototype.dispatchDraw.call(this, canvas);
                    var rect = this.layoutInfo.outterrect;
                    canvas.drawRect(rect.startPoint, rect.endPoint, false, this.background);
                };
                ChartLayout.prototype.onMeasure = function (width, height, canvas) {
                    return _super.prototype.onMeasure.call(this, width, height, canvas);
                };
                ChartLayout.prototype.onLayout = function (l, t, r, b, canvas) {
                    _super.prototype.onLayout.call(this, l, t, r, b, canvas);
                };
                ChartLayout.prototype.addView = function (view, index) {
                    _super.prototype.addView.call(this, view, index);
                    return 0;
                };
                return ChartLayout;
            }(test.BaseChartLayout));
            cartesian.ChartLayout = ChartLayout;
        })(cartesian = test.cartesian || (test.cartesian = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var hierarchical;
        (function (hierarchical) {
            var Rect = android.graphics.Rect;
            var Util = android.graphics.Util;
            var HierarchicalPlot = /** @class */ (function (_super) {
                __extends(HierarchicalPlot, _super);
                function HierarchicalPlot(context, datamodel) {
                    var _this = _super.call(this, context) || this;
                    _this.__comparedAnimationCache = new android.ComparedAnimationCache();
                    _this._datamodel = datamodel;
                    _this._layouts = [];
                    _this.__scalePairs = [];
                    _this._currentRect = new Rect(0, 0, 0, 0);
                    return _this;
                }
                HierarchicalPlot.prototype.scaleCallBack = function (rect) {
                    var _this = this;
                    if (rect.width * rect.height < this.layoutInfo.innerrect.width * this.layoutInfo.innerrect.height / 4) {
                        if (this._datamodel.chartType === test.ChartType.TreeMap) {
                            setTimeout(function () {
                                var treemapLayout = new hierarchical.TreeMapLayout(_this.getContext(), _this.layoutInfo.innerrect);
                                var rect = _this._currentRect;
                                _this._currentRect = new Rect(rect.left - rect.width / 2, rect.top - rect.height / 2, rect.right + rect.width / 2, rect.bottom + rect.height / 2);
                                treemapLayout.convert(_this._datamodel.root, _this._datamodel.encoding, _this._currentRect, _this._canvas);
                                var shapeList = []; //(treemapLayout.shapeList);
                                for (var _i = 0, _a = treemapLayout.shapeList; _i < _a.length; _i++) {
                                    var item = _a[_i];
                                    if (Util.isMixed(item.layoutInfo.innerrect, _this.layoutInfo.innerrect)) {
                                        shapeList.push(item);
                                    }
                                }
                                console.log("after shapelist size  " + shapeList.length);
                                _this.removeAllViews();
                                for (var _b = 0, shapeList_1 = shapeList; _b < shapeList_1.length; _b++) {
                                    var shape = shapeList_1[_b];
                                    _this.addViewWithOutReLayout(shape);
                                    if (shape instanceof test.PlotShape && shape.label != null) {
                                        _this.addViewWithOutReLayout(shape.label);
                                    }
                                }
                                _this.__comparedAnimationCache.startCompare(shapeList);
                            }, 100);
                        }
                    }
                    else if (rect.width * rect.height > this.layoutInfo.innerrect.width * this.layoutInfo.innerrect.height / 4) {
                        if (this._datamodel.chartType === test.ChartType.TreeMap) {
                            setTimeout(function () {
                                var treemapLayout = new hierarchical.TreeMapLayout(_this.getContext(), _this.layoutInfo.innerrect);
                                var rect = _this._currentRect;
                                _this._currentRect = new Rect(rect.left + rect.width / 4, rect.top + rect.height / 4, rect.right - rect.width / 4, rect.bottom - rect.height / 4);
                                treemapLayout.convert(_this._datamodel.root, _this._datamodel.encoding, _this._currentRect, _this._canvas);
                                // let shapeList =(treemapLayout.shapeList);
                                var shapeList = []; //(treemapLayout.shapeList);
                                for (var _i = 0, _a = treemapLayout.shapeList; _i < _a.length; _i++) {
                                    var item = _a[_i];
                                    if (Util.isMixed(item.layoutInfo.innerrect, _this.layoutInfo.innerrect)) {
                                        shapeList.push(item);
                                    }
                                }
                                console.log("after shapelist size  " + shapeList.length);
                                _this.removeAllViews();
                                for (var _b = 0, shapeList_2 = shapeList; _b < shapeList_2.length; _b++) {
                                    var shape = shapeList_2[_b];
                                    _this.addViewWithOutReLayout(shape);
                                    if (shape instanceof test.PlotShape && shape.label != null) {
                                        _this.addViewWithOutReLayout(shape.label);
                                    }
                                }
                                _this.__comparedAnimationCache.startCompare(shapeList);
                            }, 100);
                        }
                    }
                };
                HierarchicalPlot.prototype.addViewWithOutReLayout = function (view, index, layoutParams) {
                    if (view instanceof test.CubeShape) {
                        view.scaleCallBack = this.scaleCallBack.bind(this);
                    }
                    return _super.prototype.addViewWithOutReLayout.call(this, view, index, layoutParams);
                };
                // public onInterceptMouseEvent(event: MotionEvent): boolean {
                //     if(event.action === MotionEvent.ACTION_CLICK){
                //         return true;
                //     }
                //     return super.onInterceptMouseEvent(event);
                // }
                // public onMouseEvent(event: MotionEvent): boolean {
                //     // return false;
                //     if(this._datamodel.chartType == ChartType.TreeMap){
                //     }else{
                //         return true;
                //     }
                // }
                HierarchicalPlot.prototype.onMeasure = function (width, height, canvas) {
                    return _super.prototype.onMeasure.call(this, width, height, canvas);
                };
                HierarchicalPlot.prototype.onLayout = function (l, t, r, b, canvas) {
                    var _this = this;
                    _super.prototype.onLayout.call(this, l, t, r, b, canvas);
                    if (this.islayoutChanged) {
                        this.removeAllViews();
                        var shapeList_3 = [];
                        this.__scalePairs = [];
                        this._layouts.length = 0;
                        if (this._datamodel.chartType == test.ChartType.Sunburst) {
                            var sunburstLayout = new hierarchical.SunburstLayout(this.getContext(), 0, Math.PI * 2, 0);
                            this._currentRect = new Rect(l, t, r, b);
                            sunburstLayout.convert(this._datamodel.root, this._datamodel.encoding, this._currentRect, canvas);
                            shapeList_3 = (sunburstLayout.shapeList);
                        }
                        else if (this._datamodel.chartType == test.ChartType.TreeMap) {
                            var treemapLayout = new hierarchical.TreeMapLayout(this.getContext(), this.layoutInfo.innerrect);
                            this._currentRect = new Rect(l, t, r, b);
                            treemapLayout.convert(this._datamodel.root, this._datamodel.encoding, this._currentRect, canvas);
                            // let rect: Rect = this.layoutInfo.innerrect;
                            // treemapLayout.convert(this._datamodel.root, this._datamodel.encoding, new Rect(rect.left - rect.width / 2, rect.top - rect.height / 2, rect.right + rect.width / 2, rect.bottom + rect.height / 2), this._canvas);
                            shapeList_3 = (treemapLayout.shapeList);
                            console.log("before shape list size " + shapeList_3.length);
                            if (this.__comparedAnimationCache != null) {
                                setTimeout(function () {
                                    _this.__comparedAnimationCache.startCompare(shapeList_3);
                                });
                            }
                        }
                        for (var _i = 0, shapeList_4 = shapeList_3; _i < shapeList_4.length; _i++) {
                            var shape = shapeList_4[_i];
                            this.addViewWithOutReLayout(shape);
                            if (shape instanceof test.PlotShape && shape.label != null) {
                                this.addViewWithOutReLayout(shape.label);
                            }
                        }
                    }
                };
                HierarchicalPlot.prototype.beginLoadingAnimation = function () {
                    var step = 500 / this.children.length;
                    var _loop_3 = function (i) {
                        var shape = this_3.children[i];
                        if (shape instanceof test.CubeShape) {
                            setTimeout(function () {
                                // console.log("index  " + i);
                                var animation = new test.CubeAnimation(null);
                                animation.duration = 500;
                                animation.from = 0.2;
                                animation.to = 1;
                                animation.fillAfter = false;
                                shape.startAnimation(animation);
                            }, step * i);
                        }
                        else if (shape instanceof test.SunburstShape) {
                            // console.log("index  " + i);
                            var animation = new test.SweepAnimation();
                            animation.duration = 1500;
                            animation.from = 0.2;
                            animation.to = 1;
                            animation.fillAfter = false;
                            shape.startAnimation(animation);
                        }
                    };
                    var this_3 = this;
                    for (var i = 0; i < this.children.length; ++i) {
                        _loop_3(i);
                    }
                };
                /**
                 * merage the scales which is  x / y
                 */
                HierarchicalPlot.prototype.__merageScale = function () {
                };
                HierarchicalPlot.prototype.onDraw = function (canvas) {
                    _super.prototype.onDraw.call(this, canvas);
                };
                HierarchicalPlot.prototype.dispatchDraw = function (canvas) {
                    canvas.save();
                    canvas.clip(this.layoutInfo.innerrect);
                    _super.prototype.dispatchDraw.call(this, canvas);
                    canvas.restore();
                };
                Object.defineProperty(HierarchicalPlot.prototype, "layouts", {
                    get: function () {
                        return this._layouts;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(HierarchicalPlot.prototype, "scalePairs", {
                    get: function () {
                        return this.__scalePairs;
                    },
                    enumerable: true,
                    configurable: true
                });
                return HierarchicalPlot;
            }(test.BasePlot));
            hierarchical.HierarchicalPlot = HierarchicalPlot;
        })(hierarchical = test.hierarchical || (test.hierarchical = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var hierarchical;
        (function (hierarchical) {
            'use strict';
            var Size = android.graphics.Size;
            var LayoutParams = android.view.LayoutParams;
            var FrameLayout = android.widget.FrameLayout;
            // export const StartAngle:number = Math.PI;
            // import ScrollLayout = android.widget.ScrollLayout
            var HierarchicalChart = /** @class */ (function (_super) {
                __extends(HierarchicalChart, _super);
                function HierarchicalChart(context, option, chartType) {
                    var _this = _super.call(this, context) || this;
                    _this._option = option;
                    _this._chartType = chartType;
                    return _this;
                }
                Object.defineProperty(HierarchicalChart.prototype, "option", {
                    get: function () {
                        return this._option;
                    },
                    set: function (value) {
                        this._option = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(HierarchicalChart.prototype, "chartType", {
                    get: function () {
                        return this._chartType;
                    },
                    set: function (value) {
                        if (value != null && value != this._chartType) {
                            this._chartType = value;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(HierarchicalChart.prototype, "datamodel", {
                    get: function () {
                        return this._dataModel;
                    },
                    set: function (value) {
                        this._dataModel = value;
                        this._loadView();
                    },
                    enumerable: true,
                    configurable: true
                });
                HierarchicalChart.prototype._loadView = function () {
                    var plot = new hierarchical.HierarchicalPlot(this.getContext(), this.datamodel);
                    plot.layoutParams.width = LayoutParams.MATCH_PARENT;
                    plot.layoutParams.height = LayoutParams.MATCH_PARENT;
                    this._plot = plot;
                    this.addView(plot);
                };
                HierarchicalChart.prototype.beginLoadingAnimation = function () {
                    this.plot.beginLoadingAnimation();
                };
                HierarchicalChart.prototype.onMeasure = function (width, height, canvas) {
                    // return super.onMeasure(width,height,canvas);
                    var maxsize = new Size(0, 0);
                    var loff = 0, toff = 0, roff = 0, boff = 0;
                    for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                        var view_3 = _a[_i];
                        var size = new Size(0, 0);
                        if (view_3 instanceof test.BasePlot) {
                            view_3.layoutParams.margin.marginLeft = loff;
                            view_3.layoutParams.margin.marginRight = roff;
                            view_3.layoutParams.margin.marginTop = toff;
                            view_3.layoutParams.margin.marginBottom = boff;
                            size = view_3.onMeasure(width, height, canvas);
                        }
                        else {
                            size = view_3.onMeasure(width, height, canvas);
                        }
                        if (size.width > maxsize.width) {
                            maxsize.width = size.width;
                        }
                        if (size.height > maxsize.height) {
                            maxsize.height = size.height;
                        }
                    }
                    return _super.prototype.onMeasure.call(this, width, height, canvas);
                };
                HierarchicalChart.prototype.onLayout = function (l, t, r, b, canvas) {
                    this.layoutInfo.reset(l, t, r, b, this.padding, 0);
                    this.layoutItem(this.plot, l, t, r, b, canvas);
                };
                Object.defineProperty(HierarchicalChart.prototype, "plot", {
                    get: function () {
                        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                            var plot = _a[_i];
                            if (plot instanceof test.BasePlot) {
                                return plot;
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                HierarchicalChart.prototype.dispatchDraw = function (canvas) {
                    _super.prototype.dispatchDraw.call(this, canvas);
                };
                return HierarchicalChart;
            }(FrameLayout));
            hierarchical.HierarchicalChart = HierarchicalChart;
        })(hierarchical = test.hierarchical || (test.hierarchical = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var hierarchical;
        (function (hierarchical) {
            var Padding = android.graphics.Padding;
            var Gravity = android.graphics.Gravity;
            var LayoutParams = android.view.LayoutParams;
            var RenderType = android.graphics.RenderType;
            var RootView = android.widget.RootView;
            var Util = android.graphics.Util;
            var ChartLayout = /** @class */ (function (_super) {
                __extends(ChartLayout, _super);
                function ChartLayout(context) {
                    var _this = _super.call(this, context) || this;
                    _this.clip = false;
                    var EventHandler = function (pt, types, info) {
                        console.log(" " + pt.toString() + ", type " + types + " , info " + info);
                    };
                    window['EventHandler'] = EventHandler;
                    return _this;
                }
                ChartLayout.prototype.attachElement = function (element, renderType, datamodel) {
                    _super.prototype.attachElement.call(this, element, Util.asEnum(renderType, RenderType));
                    this.padding = new Padding(20);
                    this._dataModel = datamodel;
                    this.setChart();
                };
                ChartLayout.prototype.beginLoadingAnimation = function () {
                    this._chart.beginLoadingAnimation();
                };
                ChartLayout.prototype.setChart = function () {
                    this.removeAllViews();
                    this._chart = new hierarchical.HierarchicalChart(this.getContext(), null, test.ChartType.Bar);
                    this._chart.layoutParams.width = LayoutParams.MATCH_PARENT;
                    this._chart.layoutParams.height = LayoutParams.MATCH_PARENT;
                    this._chart.datamodel = this._dataModel;
                    this._chart.gravity = Gravity.Center;
                    this.addView(this._chart, 0);
                };
                ChartLayout.prototype.dispatchDraw = function (canvas) {
                    _super.prototype.dispatchDraw.call(this, canvas);
                    var rect = this.layoutInfo.outterrect;
                    canvas.drawRect(rect.startPoint, rect.endPoint, false, this.background);
                };
                ChartLayout.prototype.onMeasure = function (width, height, canvas) {
                    return _super.prototype.onMeasure.call(this, width, height, canvas);
                };
                ChartLayout.prototype.onLayout = function (l, t, r, b, canvas) {
                    _super.prototype.onLayout.call(this, l, t, r, b, canvas);
                };
                ChartLayout.prototype.addView = function (view, index) {
                    _super.prototype.addView.call(this, view, index);
                    return 0;
                };
                return ChartLayout;
            }(RootView));
            hierarchical.ChartLayout = ChartLayout;
        })(hierarchical = test.hierarchical || (test.hierarchical = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var map;
        (function (map) {
            'use strict';
            // export const EQUATOR: number = 200;
            var PointList = /** @class */ (function () {
                function PointList() {
                    this.__xs = [];
                    this.__ys = [];
                    this.__ptlist = [];
                }
                PointList.prototype.push = function (point) {
                    this.__ptlist.push(point);
                    this.__xs.push(point.x);
                    this.__ys.push(point.y);
                };
                PointList.prototype.pop = function () {
                    this.__xs.pop();
                    this.__ys.pop();
                    return this.__ptlist.pop();
                };
                Object.defineProperty(PointList.prototype, "xs", {
                    get: function () {
                        return this.__xs;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PointList.prototype, "ys", {
                    get: function () {
                        return this.__ys;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PointList.prototype, "points", {
                    get: function () {
                        return this.__ptlist;
                    },
                    enumerable: true,
                    configurable: true
                });
                return PointList;
            }());
            map.PointList = PointList;
            var Stream = /** @class */ (function () {
                function Stream() {
                    this._pointList = new PointList();
                }
                Stream.prototype.setProjection = function (projection) {
                    this._projection = projection;
                };
                Object.defineProperty(Stream.prototype, "result", {
                    // static lonLat2Mercator(lon: number, lat: number): Point {
                    //     let pt: Point = new Point();
                    //     let x: number = lon * EQUATOR / 180;
                    //     let y: number = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180);
                    //     y = y * EQUATOR / 180;
                    //     pt.x = x;
                    //     pt.y = y;
                    //     return pt;
                    // }
                    // static mercator2LonLat(x: number, y: number): { lon: number, lat: number } {
                    //     let mercatorPt: { lon: number, lat: number } = { lon: 0, lat: 0 };
                    //     let lon: number = x / EQUATOR * 180;
                    //     let lat: number = y / EQUATOR * 180;
                    //     lat = 180 / Math.PI * (2 * Math.atan(Math.exp(lat * Math.PI / 180)) - Math.PI / 2);
                    //     mercatorPt.lon = lon;
                    //     mercatorPt.lat = lat;
                    //     return mercatorPt;
                    // }
                    get: function () {
                        return this._pointList;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Stream;
            }());
            map.Stream = Stream;
            var AreaStream = /** @class */ (function (_super) {
                __extends(AreaStream, _super);
                function AreaStream() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                AreaStream.prototype.parseStream = function (coordinates) {
                    var startPt = null;
                    if (coordinates != null && coordinates instanceof Array) {
                        for (var _i = 0, coordinates_1 = coordinates; _i < coordinates_1.length; _i++) {
                            var coordinate = coordinates_1[_i];
                            for (var _a = 0, coordinate_1 = coordinate; _a < coordinate_1.length; _a++) {
                                var cpt = coordinate_1[_a];
                                if (cpt instanceof Array && cpt.length === 2) {
                                    var pt = this._projection.lonLat2xy(cpt[0], cpt[1]);
                                    if (pt != null) {
                                        this._pointList.push(pt);
                                        if (startPt == null) {
                                            startPt = pt.clone();
                                        }
                                    }
                                }
                            }
                        }
                    }
                };
                return AreaStream;
            }(Stream));
            map.AreaStream = AreaStream;
            var LineStream = /** @class */ (function (_super) {
                __extends(LineStream, _super);
                function LineStream() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                LineStream.prototype.parseStream = function (coordinates) {
                    if (coordinates != null && coordinates instanceof Array) {
                        for (var _i = 0, coordinates_2 = coordinates; _i < coordinates_2.length; _i++) {
                            var cpt = coordinates_2[_i];
                            if (cpt instanceof Array && cpt.length === 2) {
                                var pt = this._projection.lonLat2xy(cpt[0], cpt[1]);
                                if (pt != null) {
                                    this._pointList.push(pt);
                                }
                            }
                        }
                    }
                };
                return LineStream;
            }(Stream));
            map.LineStream = LineStream;
            var PointStream = /** @class */ (function (_super) {
                __extends(PointStream, _super);
                function PointStream() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                PointStream.prototype.parseStream = function (coordinates) {
                    if (coordinates != null && coordinates instanceof Array) {
                        var pt = this._projection.lonLat2xy(coordinates[0], coordinates[1]);
                        if (pt != null) {
                            this._pointList.push(pt);
                        }
                    }
                };
                return PointStream;
            }(Stream));
            map.PointStream = PointStream;
        })(map = test.map || (test.map = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
var android;
(function (android) {
    var test;
    (function (test) {
        var map;
        (function (map) {
            'use strict';
            var StreamFactory = /** @class */ (function () {
                function StreamFactory() {
                }
                StreamFactory.streamLine = function (coordinates, stream) { };
                StreamFactory.streamArea = function (coordinates, stream) { };
                return StreamFactory;
            }());
            map.StreamFactory = StreamFactory;
        })(map = test.map || (test.map = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var map;
        (function (map) {
            'use strict';
            var Util = android.graphics.Util;
            var GeoType;
            (function (GeoType) {
                GeoType[GeoType["Point"] = 0] = "Point";
                GeoType[GeoType["MultiPoint"] = 1] = "MultiPoint";
                GeoType[GeoType["LineString"] = 2] = "LineString";
                GeoType[GeoType["MultiLineString"] = 3] = "MultiLineString";
                GeoType[GeoType["Polygon"] = 4] = "Polygon";
                GeoType[GeoType["MultiPolygon"] = 5] = "MultiPolygon";
                GeoType[GeoType["GeometryCollection"] = 6] = "GeometryCollection";
                GeoType[GeoType["Feature"] = 7] = "Feature";
                GeoType[GeoType["FeatureCollection"] = 8] = "FeatureCollection";
            })(GeoType = map.GeoType || (map.GeoType = {}));
            var Feature = /** @class */ (function () {
                function Feature() {
                }
                Feature.prototype.parseFeature = function (feature) {
                    if (this.projection != null) {
                        this.properties = feature.properties;
                        var geometry = feature.geometry;
                        this.parseName(this.properties);
                        this.streams = [];
                        if (geometry != null) {
                            var geometry_type = Util.asEnum(geometry.type, GeoType, true);
                            var coordinates = geometry.coordinates;
                            switch (geometry_type) {
                                case GeoType.Point:
                                    this.streams.push(this._createPointStream(coordinates));
                                    break;
                                case GeoType.MultiPoint:
                                    this.streams = this.streams.concat(this._createMultiPointStream(coordinates));
                                    break;
                                case GeoType.LineString:
                                    this.streams.push(this._createLineStream(coordinates));
                                    break;
                                case GeoType.MultiLineString:
                                    this.streams = this.streams.concat(this._createMultiLineStream(coordinates));
                                    break;
                                case GeoType.Polygon:
                                    this.streams.push(this._createAreaStream(coordinates));
                                    break;
                                case GeoType.MultiPolygon:
                                    this.streams = this.streams.concat(this._createMultiAreaStream(coordinates));
                                    break;
                            }
                        }
                    }
                };
                Feature.prototype.parseName = function (prop) {
                    if (prop != null) {
                        this.name = prop.name;
                        if (this.name == null) {
                            this.name = prop.NAME;
                        }
                    }
                };
                Feature.prototype._createPointStream = function (coordinates) {
                    var pointStream = new map.PointStream();
                    pointStream.setProjection(this.projection);
                    pointStream.parseStream(coordinates);
                    return pointStream;
                };
                Feature.prototype._createLineStream = function (coordinates) {
                    var lineStream = new map.LineStream();
                    lineStream.setProjection(this.projection);
                    lineStream.parseStream(coordinates);
                    return lineStream;
                };
                Feature.prototype._createAreaStream = function (coordinates) {
                    var areaStream = new map.AreaStream();
                    areaStream.setProjection(this.projection);
                    areaStream.parseStream(coordinates);
                    return areaStream;
                };
                Feature.prototype._createMultiPointStream = function (coordinates) {
                    var list = [];
                    if (coordinates != null && coordinates instanceof Array) {
                        for (var _i = 0, coordinates_3 = coordinates; _i < coordinates_3.length; _i++) {
                            var coorpt = coordinates_3[_i];
                            list.push(this._createPointStream(coorpt));
                        }
                    }
                    return list;
                };
                Feature.prototype._createMultiLineStream = function (coordinates) {
                    var list = [];
                    if (coordinates != null && coordinates instanceof Array) {
                        for (var _i = 0, coordinates_4 = coordinates; _i < coordinates_4.length; _i++) {
                            var coorpt = coordinates_4[_i];
                            list.push(this._createLineStream(coorpt));
                        }
                    }
                    return list;
                };
                Feature.prototype._createMultiAreaStream = function (coordinates) {
                    var list = [];
                    if (coordinates != null && coordinates instanceof Array) {
                        for (var _i = 0, coordinates_5 = coordinates; _i < coordinates_5.length; _i++) {
                            var coorpt = coordinates_5[_i];
                            list.push(this._createAreaStream(coorpt));
                        }
                    }
                    return list;
                };
                return Feature;
            }());
            map.Feature = Feature;
        })(map = test.map || (test.map = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
var android;
(function (android) {
    var test;
    (function (test) {
        var map;
        (function (map) {
            'use strict';
            var ParseFactory = /** @class */ (function () {
                function ParseFactory() {
                }
                return ParseFactory;
            }());
            map.ParseFactory = ParseFactory;
        })(map = test.map || (test.map = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var map;
        (function (map) {
            'use strict';
            var Projection = /** @class */ (function () {
                function Projection() {
                }
                return Projection;
            }());
            map.Projection = Projection;
        })(map = test.map || (test.map = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var map;
        (function (map) {
            'use strict';
            var Point = android.graphics.Point;
            map.EARTH_RADIUS = 6378137;
            map.EQUATOR = map.EARTH_RADIUS * 2 * Math.PI; // 赤道,在这里假设地球是一个正球
            var MercatorProjection = /** @class */ (function (_super) {
                __extends(MercatorProjection, _super);
                function MercatorProjection() {
                    var _this = _super.call(this) || this;
                    _this.__centerlon = 0;
                    _this.__centerlat = 0;
                    _this.__xoffset = 0;
                    _this.__yoffset = 0;
                    _this._scale = 1;
                    if (_this.__circumference == null) {
                        _this.__circumference = 1000;
                    }
                    _this._scale = 1;
                    return _this;
                }
                MercatorProjection.prototype.begin = function () {
                    this._max = 0;
                    this._min = 0;
                    this._maxy = 0;
                    this._miny = 0;
                    var minPt = this.lonLat2xy(-180, -90);
                    var maxPt = this.lonLat2xy(180, 90);
                };
                MercatorProjection.prototype.end = function () {
                    this._max = 0;
                    this._min = 0;
                    this._maxy = 0;
                    this._miny = 0;
                };
                Object.defineProperty(MercatorProjection.prototype, "maxx", {
                    get: function () {
                        return this._max;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MercatorProjection.prototype, "minx", {
                    get: function () {
                        return this._min;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MercatorProjection.prototype, "maxy", {
                    get: function () {
                        return this._max;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MercatorProjection.prototype, "miny", {
                    get: function () {
                        return this._min;
                    },
                    enumerable: true,
                    configurable: true
                });
                MercatorProjection.prototype.scale = function (rate) {
                    this._scale = rate;
                };
                MercatorProjection.prototype.rotate = function (lambda, phi, gamma) {
                    this.__lambda = lambda;
                    this.__phi = phi;
                    this.__gamma = gamma;
                };
                MercatorProjection.prototype.translate = function (xoffset, yoffset) {
                    if (xoffset != null && !isNaN(xoffset)) {
                        this.__xoffset += xoffset;
                    }
                    if (yoffset != null && !isNaN(yoffset)) {
                        this.__yoffset += yoffset;
                    }
                };
                MercatorProjection.prototype.center = function (lon, lat) {
                    this.__centerlon = lon;
                    this.__centerlat = lat;
                };
                MercatorProjection.prototype.xy2LonLat = function (x, y) {
                    var circumference = this.__circumference * this._scale;
                    var mercatorPt = { lon: 0, lat: 0 };
                    var lon = x / circumference * 180;
                    var lat = y / circumference * 180;
                    lat = 180 / Math.PI * (2 * Math.atan(Math.exp(lat * Math.PI / 180)) - Math.PI / 2);
                    mercatorPt.lon = lon;
                    mercatorPt.lat = lat;
                    return mercatorPt;
                };
                MercatorProjection.prototype.lonLat2xy = function (lon, lat) {
                    var circumference = this.__circumference * this._scale;
                    lon = lon - this.__centerlon;
                    lat = lat - this.__centerlat;
                    var lambda = (this.__lambda == null || isNaN(this.__lambda)) ? 0 : this.__lambda;
                    var phi = (this.__phi == null || isNaN(this.__phi)) ? 0 : this.__phi;
                    var gamma = (this.__gamma == null || isNaN(this.__gamma)) ? 0 : this.__gamma;
                    lon = lambda + lon;
                    lat = phi + lat;
                    if (Math.abs(lat) > MercatorProjection.MAX_LAT) {
                        return;
                    }
                    var x = lon * circumference / 180;
                    var y = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180);
                    y = y * circumference / 180;
                    if (gamma > 0) {
                        var a = x == 0 ? 0 : Math.atan(y / x);
                        var newa = a + gamma * Math.PI / 180;
                        var radius = Math.sqrt(x * x + y * y);
                        x = Math.cos(newa) * radius;
                        y = Math.sin(newa) * radius;
                    }
                    var pt = new Point(x, y);
                    pt.offset(this.__xoffset, this.__yoffset);
                    pt.offset(0, -circumference / 2);
                    pt.y = -pt.y;
                    return pt;
                };
                MercatorProjection.prototype.refresh = function () {
                };
                MercatorProjection.MAX_LAT = 85.05112877980659;
                return MercatorProjection;
            }(map.Projection));
            map.MercatorProjection = MercatorProjection;
            // export class OrthographicProjection extends Projection {
            //     private __centerlon: number;
            //     private __centerlat: number;
            //     private __xoffset: number;
            //     private __yoffset: number;
            //     private __lambda: number;
            //     private __phi: number;
            //     private __gamma: number;
            //     rotate(lambda: number, phi: number, gamma: number): void {
            //         this.__lambda = lambda;
            //         this.__phi = phi;
            //         this.__gamma = gamma;
            //     }
            //     translate(xoffset: number, yoffset): void {
            //         this.__xoffset = xoffset;
            //         this.__yoffset = yoffset;
            //     }
            //     center(lon: number, lat: number): void {
            //         this.__centerlon = lon;
            //         this.__centerlat = lat;
            //     }
            //     xy2LonLat(x: number, y: number): { lon: number, lat: number } {
            //         let mercatorPt: { lon: number, lat: number } = { lon: 0, lat: 0 };
            //         let lon: number = x / EQUATOR * 180;
            //         let lat: number = y / EQUATOR * 180;
            //         lat = 180 / Math.PI * (2 * Math.atan(Math.exp(lat * Math.PI / 180)) - Math.PI / 2);
            //         mercatorPt.lon = lon;
            //         mercatorPt.lat = lat;
            //         return mercatorPt;
            //     }
            //     lonLat2xy(lon: number, lat: number): Point {
            //         let lambda: number = (this.__lambda == null || isNaN(this.__lambda)) ? 0 : this.__lambda;
            //         let phi: number = (this.__phi == null || isNaN(this.__phi)) ? 0 : this.__phi;
            //         let gamma: number = (this.__gamma == null || isNaN(this.__gamma)) ? 0 : this.__gamma;
            //         if (gamma > 0) {
            //             let a: number = Math.atan(lat / lon);
            //             let newa: number = a + gamma * Math.PI / 180;
            //             let radius = Math.sqrt(lat * lat + lon * lon);
            //             lon = Math.cos(newa) * radius;
            //             lat = Math.sin(newa) * radius;
            //         }
            //         lon = lambda + lon;
            //         lat = phi + lat;
            //         let x: number = lon * EQUATOR / 180;
            //         let y: number = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180);
            //         y = y * EQUATOR / 180;
            //         return new Point(x, y);
            //     }
            //     refresh(): void {
            //     }
            // }
        })(map = test.map || (test.map = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var map;
        (function (map) {
            'use strict';
            var ProjectionFactory = /** @class */ (function () {
                function ProjectionFactory() {
                }
                ProjectionFactory.create = function (name) {
                    if (name === void 0) { name = null; }
                    if (name == null) {
                    }
                    return null;
                };
                return ProjectionFactory;
            }());
            map.ProjectionFactory = ProjectionFactory;
        })(map = test.map || (test.map = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var map;
        (function (map) {
            'use strict';
            var Util = android.graphics.Util;
            var Series = android.test.cartesian.Series;
            var Filter = android.test.cartesian.Filter;
            var Encoding = android.test.cartesian.Encoding;
            var Point = android.graphics.Point;
            var DataModel = /** @class */ (function () {
                function DataModel(data) {
                    this.__chartTypes = [];
                    DataModel.id = 0;
                    this.__data = data;
                    this.projection = new map.MercatorProjection();
                    if (data.config != null) {
                        this.__config = new test.Config(data.config);
                        if (this.__config.center != null) {
                            this.projection.center(this.__config.center.x, this.__config.center.y);
                        }
                        if (this.__config.translate != null) {
                            this.projection.translate(this.__config.translate.x, this.__config.translate.y);
                        }
                        if (this.__config.scale != null) {
                            this.projection.scale(this.__config.scale);
                        }
                    }
                    this.__encoding = this._analyseEncoding(this.__data.encoding);
                    this._analyseFilter(data.filter);
                    this.refresh();
                }
                Object.defineProperty(DataModel.prototype, "config", {
                    get: function () {
                        return this.__config;
                    },
                    enumerable: true,
                    configurable: true
                });
                DataModel.prototype._analyseEncoding = function (encode) {
                    return new Encoding(encode);
                };
                DataModel.prototype.refresh = function () {
                    DataModel.id = 0;
                    this.__analyseGeoData(this.__data.geo);
                    this._analyseSeries(this.__data.series, this.__encoding);
                    this._createLayoutScales(this.__encoding);
                };
                Object.defineProperty(DataModel.prototype, "chartTypes", {
                    get: function () {
                        return this.__chartTypes;
                    },
                    enumerable: true,
                    configurable: true
                });
                DataModel.prototype._analyseSeries = function (series_data, encoding) {
                    this.__series = [];
                    this.__allSeries = [];
                    for (var i = 0; i < series_data.length; ++i) {
                        var seriesitem = series_data[i];
                        var ser = new Series(encoding, seriesitem, i);
                        if (this.__filter != null && this.__filter.series.indexOf(seriesitem.name) > -1) {
                            ser.enable = true;
                            this.__series.push(ser);
                            if (this.__chartTypes.indexOf(ser.chartType) < 0) {
                                this.__chartTypes.push(ser.chartType);
                            }
                        }
                        else {
                            ser.enable = false;
                        }
                        this.__allSeries.push(ser);
                    }
                };
                DataModel.prototype._analyseFilter = function (filter) {
                    if (filter != null && filter.series != null && filter.rules != null) {
                        this.__filter = new Filter(filter.series, filter.rules);
                    }
                };
                DataModel.prototype.__analyseGeoData = function (geodata) {
                    this.projection.begin();
                    var type = Util.asEnum(geodata.type, map.GeoType, true);
                    this.featureList = [];
                    if (type == map.GeoType.FeatureCollection) {
                        var features = geodata.features;
                        if (features != null && features instanceof Array) {
                            for (var _i = 0, features_1 = features; _i < features_1.length; _i++) {
                                var feature = features_1[_i];
                                var f = new map.Feature();
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
                };
                DataModel.prototype._createLayoutScales = function (encoding) {
                    var _this = this;
                    this.__scalePairs = [];
                    if (this.__series.length > 1) {
                        for (var i = 0; i < this.__series.length - 1; ++i) {
                            var series = this.__series[i];
                            var next_series = this.__series[i + 1];
                            for (var _i = 0, _a = series.scalePairs; _i < _a.length; _i++) {
                                var pairA = _a[_i];
                                for (var _b = 0, _c = next_series.scalePairs; _b < _c.length; _b++) {
                                    var pairB = _c[_b];
                                    if (pairA.filed.equals(pairB.filed)) {
                                        var filed = pairA.filed;
                                        var force = true;
                                        var infoA = this.__getScaleInfobyname(pairA.filed.name, series.name);
                                        var infoB = this.__getScaleInfobyname(pairB.filed.name, next_series.name);
                                        if (infoA == null && infoB == null) {
                                            var scale = test.Utility.mergeScale(pairA.scale, pairB.scale, force);
                                            if (scale != null) {
                                                this.__scalePairs.push({ series: [series.name, next_series.name], filed: filed, scale: scale });
                                            }
                                            else {
                                                this.__scalePairs.push({ series: [series.name], filed: pairA.filed, scale: pairA.scale });
                                                this.__scalePairs.push({ series: [next_series.name], filed: pairB.filed, scale: pairB.scale });
                                            }
                                        }
                                        else if (infoA == null && infoB != null) {
                                            var scale = test.Utility.mergeScale(pairA.scale, infoB.scale, force);
                                            if (scale != null) {
                                                infoB.scale = scale;
                                                infoB.series.push(series.name);
                                            }
                                        }
                                        else if (infoA != null && infoB == null) {
                                            var scale = test.Utility.mergeScale(pairB.scale, infoA.scale, force);
                                            if (scale != null) {
                                                infoA.scale = scale;
                                                infoA.series.push(next_series.name);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        for (var _d = 0, _e = this.__series; _d < _e.length; _d++) {
                            var ser = _e[_d];
                            for (var _f = 0, _g = ser.scalePairs; _f < _g.length; _f++) {
                                var pair = _g[_f];
                                var scale = this._getScaleByName(pair.filed.name, ser.name);
                                if (scale != null) {
                                    pair.scale = scale;
                                }
                            }
                        }
                    }
                    else if (this.__series.length == 1) {
                        for (var _h = 0, _j = this.__series[0].scalePairs; _h < _j.length; _h++) {
                            var pair = _j[_h];
                            this.__scalePairs.push({ series: [this.__series[0].name], filed: pair.filed, scale: pair.scale.clone() });
                        }
                    }
                    // this.nameScale.ranges
                    var namescale = this.nameScale;
                    if (namescale != null && namescale.domains != null) {
                        namescale.domains.map(function (pt) {
                            if (pt instanceof Point) {
                                return _this.projection.lonLat2xy(pt.x, pt.y);
                            }
                            else {
                                return pt;
                            }
                        });
                    }
                };
                Object.defineProperty(DataModel.prototype, "nameScale", {
                    get: function () {
                        var scale = _.result(_.find(this.__scalePairs, function (item) {
                            return 'geoposition' == item.filed.name;
                        }), "scale");
                        if (scale instanceof map.MapOrdinalScale) {
                            return scale;
                        }
                        else {
                            return null;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                DataModel.prototype.__getScaleInfobyname = function (filedname, seriesname) {
                    var info = _.find(this.__scalePairs, function (item) {
                        return item.series.indexOf(seriesname) >= 0 && filedname == item.filed.name;
                    });
                    return info;
                };
                DataModel.prototype._getScaleByName = function (filedname, seriesname) {
                    return _.result(_.find(this.__scalePairs, function (item) {
                        return item.series.indexOf(seriesname) >= 0 && filedname == item.filed.name;
                    }), "scale");
                };
                DataModel.prototype.getSeriesByType = function (charttype) {
                    var series = _.filter(this.__series, function (ser) { return ser.chartType === charttype; });
                    return series;
                };
                Object.defineProperty(DataModel.prototype, "series", {
                    get: function () {
                        return this.__series;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataModel.prototype, "allSeries", {
                    get: function () {
                        return this.__allSeries;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataModel.prototype, "encoding", {
                    get: function () {
                        return this.__encoding;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataModel.prototype, "filter", {
                    get: function () {
                        return this.__filter;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataModel.prototype, "scalePairs", {
                    get: function () {
                        return this.__scalePairs;
                    },
                    enumerable: true,
                    configurable: true
                });
                DataModel.id = 0;
                return DataModel;
            }());
            map.DataModel = DataModel;
        })(map = test.map || (test.map = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var map;
        (function (map) {
            var relation;
            (function (relation) {
                'use strict';
                var Field = android.test.cartesian.Field;
                var Encoding = /** @class */ (function () {
                    function Encoding(encoding) {
                        // if (encoding.start&& encoding.start.field != null) {
                        //     if (encoding.start.field.includes(',')) {
                        //         this.start = [];
                        //         let start: any[] = encoding.start.split(',');
                        //         for (let i = 0; i < start.length; ++i) {
                        //             this.start.push(new Field(start[i], 'start', i));
                        //         }
                        //     } else {
                        //         this.start = new Field(encoding.start, "start");
                        //     }
                        // }
                        // if (encoding.end && encoding.end.field != null) {
                        //     if (encoding.end.field.includes(',')) {
                        //         this.end = [];
                        //         let end: any[] = encoding.end.split(',');
                        //         for (let i:number = 0; i < end.length; ++i) {
                        //             this.end.push(new Field(end[i], 'start',i));
                        //         }
                        //     } else {
                        //         this.end = new Field(encoding.shape, 'end');
                        //     }
                        // }
                        if (encoding.color) {
                            this.color = new Field(encoding.color, 'color');
                        }
                        if (encoding.tooltip) {
                            this.tooltip = new Field(encoding.tooltip, 'tooltip');
                        }
                        if (encoding.text) {
                            this.text = new Field(encoding.text, 'text');
                        }
                        if (encoding.values && encoding.values instanceof Array) {
                            this.values = [];
                            for (var i = 0; i < encoding.values.length; ++i) {
                                var value = encoding.values[i];
                                this.values.push(new Field(value, value.name));
                            }
                        }
                    }
                    return Encoding;
                }());
                relation.Encoding = Encoding;
            })(relation = map.relation || (map.relation = {}));
        })(map = test.map || (test.map = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var map;
        (function (map) {
            var relation;
            (function (relation) {
                'use strict';
                var Util = android.graphics.Util;
                var Encoding = android.test.map.relation.Encoding;
                var Item = /** @class */ (function () {
                    function Item() {
                    }
                    return Item;
                }());
                relation.Item = Item;
                var DataModel = /** @class */ (function () {
                    function DataModel(data) {
                        this.__chartTypes = [];
                        this._points = [];
                        DataModel.id = 0;
                        this.__data = data;
                        this.projection = new map.MercatorProjection();
                        if (data.config != null) {
                            this.__config = new test.Config(data.config);
                            if (this.__config.center != null) {
                                this.projection.center(this.__config.center.x, this.__config.center.y);
                            }
                            if (this.__config.translate != null) {
                                this.projection.translate(this.__config.translate.x, this.__config.translate.y);
                            }
                            if (this.__config.scale != null) {
                                this.projection.scale(this.__config.scale);
                            }
                        }
                        this.__encoding = this._analyseEncoding(this.__data.encoding);
                        this.refresh();
                    }
                    Object.defineProperty(DataModel.prototype, "points", {
                        get: function () {
                            return this._points;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(DataModel.prototype, "config", {
                        get: function () {
                            return this.__config;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    DataModel.prototype._analysePathValue = function (data_arr) {
                        for (var _i = 0, data_arr_1 = data_arr; _i < data_arr_1.length; _i++) {
                            var point = data_arr_1[_i];
                            var item = new Item();
                            // for(let key in this.__encoding){
                            //     item[key]
                            // }
                            item.start = this.projection.lonLat2xy(point.start.longitude, point.start.latitude);
                            item.end = this.projection.lonLat2xy(point.end.longitude, point.end.latitude);
                            item.value = point;
                            this._points.push(item);
                        }
                    };
                    DataModel.prototype._analyseEncoding = function (encode) {
                        return new Encoding(encode);
                    };
                    DataModel.prototype.refresh = function () {
                        DataModel.id = 0;
                        this.projection.begin();
                        this.__analyseGeoData(this.__data.geo);
                        this._analysePathValue(this.__data.values);
                        this.projection.end();
                    };
                    Object.defineProperty(DataModel.prototype, "chartTypes", {
                        get: function () {
                            return this.__chartTypes;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    DataModel.prototype.__analyseGeoData = function (geodata) {
                        var type = Util.asEnum(geodata.type, map.GeoType, true);
                        this.featureList = [];
                        if (type == map.GeoType.FeatureCollection) {
                            var features = geodata.features;
                            if (features != null && features instanceof Array) {
                                for (var _i = 0, features_2 = features; _i < features_2.length; _i++) {
                                    var feature = features_2[_i];
                                    var f = new map.Feature();
                                    f.id = (++DataModel.id).toFixed();
                                    if (this.projection != null) {
                                        f.projection = this.projection;
                                    }
                                    f.parseFeature(feature);
                                    this.featureList.push(f);
                                }
                            }
                        }
                    };
                    Object.defineProperty(DataModel.prototype, "encoding", {
                        get: function () {
                            return this.__encoding;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(DataModel.prototype, "scalePairs", {
                        get: function () {
                            return this.__scalePairs;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    DataModel.id = 0;
                    return DataModel;
                }());
                relation.DataModel = DataModel;
            })(relation = map.relation || (map.relation = {}));
        })(map = test.map || (test.map = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var map;
        (function (map) {
            'use strict';
            var FlightParser = /** @class */ (function () {
                function FlightParser(originaldata) {
                    this.__airportsFields = _.cloneDeep(originaldata.airportsFields);
                    this.__airlinesFields = _.cloneDeep(originaldata.airlineFields);
                    this.__airports = _.cloneDeep(originaldata.airports);
                    this.__airlines = _.cloneDeep(originaldata.airlines);
                    this.__routes = _.cloneDeep(originaldata.routes);
                    this._analyse();
                }
                Object.defineProperty(FlightParser.prototype, "data", {
                    get: function () {
                        return this.__data;
                    },
                    enumerable: true,
                    configurable: true
                });
                FlightParser.prototype._analyse = function () {
                    var _this = this;
                    var airlines = this.__airlines.map(function (item) {
                        var result = {};
                        for (var i = 0; i < item.length; ++i) {
                            result[_this.__airlinesFields[i]] = item[i];
                        }
                        return result;
                    });
                    var airports = this.__airports.map(function (item) {
                        var result = {};
                        for (var i = 0; i < item.length; ++i) {
                            result[_this.__airportsFields[i]] = item[i];
                        }
                        return result;
                    });
                    this.__data = this.__routes.map(function (item) {
                        var result = { start: {}, end: {} };
                        var line = airlines[item[0]];
                        var port1 = airports[item[1]];
                        var port2 = airports[item[2]];
                        for (var key in line) {
                            result['start'][key] = line[key];
                            result['end'][key] = line[key];
                        }
                        for (var key in port1) {
                            result['start'][key] = port1[key];
                        }
                        for (var key in port2) {
                            result['end'][key] = port2[key];
                        }
                        return result;
                    });
                };
                return FlightParser;
            }());
            map.FlightParser = FlightParser;
        })(map = test.map || (test.map = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var map;
        (function (map) {
            'use strict';
            var Default = android.device.Default;
            var MotionEvent = android.view.event.MotionEvent;
            var Point = android.graphics.Point;
            var Rect = android.graphics.Rect;
            var GeoPlot = /** @class */ (function (_super) {
                __extends(GeoPlot, _super);
                function GeoPlot(context) {
                    var _this = _super.call(this, context) || this;
                    _this._layouts = [];
                    _this.__shapeList = [];
                    _this._ofx = 0;
                    _this._ofy = 0;
                    _this._style = Default.style;
                    _this._style.background = '#333';
                    return _this;
                }
                Object.defineProperty(GeoPlot.prototype, "datamodel", {
                    get: function () {
                        return this._dataModel;
                    },
                    set: function (value) {
                        this._dataModel = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                GeoPlot.prototype.onMouseEvent = function (event) {
                    // if(event.action == MotionEvent.ACTION_MOUSE_MOVE){
                    //     return true;
                    // }
                    switch (event.action) {
                        case MotionEvent.ACTION_MOUSE_DOWN:
                            this._startPt = new Point(event.x, event.y);
                            return true;
                        case MotionEvent.ACTION_MOUSE_UP:
                        case MotionEvent.ACTION_CANCEL:
                        case MotionEvent.ACTION_MOUSE_OUT:
                            this._startPt = null;
                            return true;
                        case MotionEvent.ACTION_MOUSE_MOVE:
                            if (this._startPt != null) {
                                var ofx = event.x - this._startPt.x; // - this.datamodel.config.translate.x;
                                var ofy = this._startPt.y - event.y; // - this.datamodel.config.translate.y;
                                this._startPt.x = event.x;
                                this._startPt.y = event.y;
                                // this._ofx += ofx;
                                // this._ofy -= ofy;
                                if (this.datamodel.projection == null) {
                                    this.datamodel.projection = new map.MercatorProjection();
                                }
                                console.log("ofx " + ofx + " , ofy " + ofy);
                                this.datamodel.projection.translate(ofx, ofy);
                                this.datamodel.refresh();
                                // this.offset(this._ofx,this._ofy);
                                // this.cleanAnimation();
                                this.requestLayout();
                                // this.invalidate(false);
                                return true;
                            }
                    }
                    return false;
                };
                GeoPlot.prototype.onInterceptMouseEvent = function (event) {
                    return true;
                };
                GeoPlot.prototype.beginLoadingAnimation = function () {
                    var step = 500 / this.children.length;
                    var _loop_4 = function (i) {
                        var view_4 = this_4.children[i];
                        var animation = new test.FlightAnimationTo();
                        animation.duration = Math.random() * 1000 + 1500;
                        animation.from = 0;
                        animation.to = 1;
                        animation.repeate = true;
                        setTimeout(function () {
                            if (view_4 instanceof test.FlightShape) {
                                view_4.startAnimation(animation);
                            }
                        }, step * i);
                    };
                    var this_4 = this;
                    for (var i = 0; i < this.children.length; ++i) {
                        _loop_4(i);
                    }
                };
                // onMeasure(width: MeasureSpec, height: MeasureSpec, canvas: Canvas): Size {
                //     let w: number = width.getMeasureValue();
                //     let h: number = height.getMeasureValue();
                //     let radius: number = w < h ? w : h;
                //     return super.onMeasure(new MeasureSpec(radius, width.mode), new MeasureSpec(radius, height.mode), canvas);
                // }
                GeoPlot.prototype.onLayout = function (l, t, r, b, canvas) {
                    _super.prototype.onLayout.call(this, l, t, r, b, canvas);
                    if (this.islayoutChanged) {
                        this.removeAllViews();
                        this.__shapeList = [];
                        this._layouts = [];
                        var geolayout = new map.GeoLayout(this.getContext());
                        geolayout.convert(this._dataModel.featureList, new Rect(l, t, r, b), canvas);
                        this.__shapeList = this.__shapeList.concat(geolayout.shapeList);
                        var namescale = null;
                        if (this.datamodel instanceof map.DataModel) {
                            namescale = this.datamodel.nameScale;
                        }
                        if (namescale == null) {
                            namescale = geolayout.nameScale;
                        }
                        if (this._dataModel instanceof map.DataModel) {
                            for (var _i = 0, _a = this._dataModel.chartTypes; _i < _a.length; _i++) {
                                var type = _a[_i];
                                switch (type) {
                                    case test.ChartType.Scatter:
                                        var scatterLayout = new map.MapScatterLayout(this.getContext());
                                        scatterLayout.convert(this._dataModel.getSeriesByType(test.ChartType.Scatter), this._dataModel.projection, namescale, this._dataModel.encoding, new Rect(l, t, r, b), canvas);
                                        this.__shapeList = this.__shapeList.concat(scatterLayout.shapeList);
                                        this._layouts.push(scatterLayout);
                                        break;
                                }
                            }
                        }
                        else if (this._dataModel instanceof map.relation.DataModel) {
                            var relationlayout = new map.relation.MapRelationLayout(this.getContext());
                            relationlayout.convert(this._dataModel.points, new Rect(l, t, r, b), canvas);
                            this.__shapeList = this.__shapeList.concat(relationlayout.shapeList);
                            this._layouts.push(relationlayout);
                        }
                        for (var _b = 0, _c = this.__shapeList; _b < _c.length; _b++) {
                            var shape = _c[_b];
                            this.addViewWithOutReLayout(shape);
                            if (shape instanceof test.PlotShape && shape.label != null) {
                                this.addViewWithOutReLayout(shape.label);
                            }
                        }
                    }
                };
                GeoPlot.prototype.onDraw = function (canvas) {
                    _super.prototype.onDraw.call(this, canvas);
                };
                return GeoPlot;
            }(test.BasePlot));
            map.GeoPlot = GeoPlot;
        })(map = test.map || (test.map = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var map;
        (function (map) {
            var Padding = android.graphics.Padding;
            var Gravity = android.graphics.Gravity;
            var LayoutParams = android.view.LayoutParams;
            var RenderType = android.graphics.RenderType;
            var RootView = android.widget.RootView;
            var Util = android.graphics.Util;
            var ChartLayout = /** @class */ (function (_super) {
                __extends(ChartLayout, _super);
                function ChartLayout(context) {
                    var _this = _super.call(this, context) || this;
                    _this.clip = false;
                    var EventHandler = function (pt, types, info) {
                        console.log(" " + pt.toString() + ", type " + types + " , info " + info);
                    };
                    window['EventHandler'] = EventHandler;
                    _this.background.background = "#333";
                    return _this;
                }
                ChartLayout.prototype.attachElement = function (element, renderType, datamodel) {
                    _super.prototype.attachElement.call(this, element, Util.asEnum(renderType, RenderType));
                    this.padding = new Padding(20);
                    this._dataModel = datamodel;
                    this.setChart();
                };
                ChartLayout.prototype.beginLoadingAnimation = function () {
                    this._chart.beginLoadingAnimation();
                };
                ChartLayout.prototype.setChart = function () {
                    this.removeAllViews();
                    this._chart = new map.GeoPlot(this.getContext());
                    this._chart.layoutParams.width = LayoutParams.MATCH_PARENT;
                    this._chart.layoutParams.height = LayoutParams.MATCH_PARENT;
                    this._chart.datamodel = this._dataModel;
                    this._chart.gravity = Gravity.Center;
                    this.addView(this._chart, 0);
                };
                ChartLayout.prototype.dispatchDraw = function (canvas) {
                    var rect = this.layoutInfo.outterrect;
                    canvas.drawRect(rect.startPoint, rect.endPoint, true, this.background);
                    _super.prototype.dispatchDraw.call(this, canvas);
                };
                ChartLayout.prototype.onMeasure = function (width, height, canvas) {
                    return _super.prototype.onMeasure.call(this, width, height, canvas);
                };
                ChartLayout.prototype.onLayout = function (l, t, r, b, canvas) {
                    _super.prototype.onLayout.call(this, l, t, r, b, canvas);
                };
                ChartLayout.prototype.addView = function (view, index) {
                    _super.prototype.addView.call(this, view, index);
                    return 0;
                };
                return ChartLayout;
            }(RootView));
            map.ChartLayout = ChartLayout;
        })(map = test.map || (test.map = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../node_modules/@types/lodash/index.d.ts" />
/// <reference path="../node_modules/@types/mathjs/index.d.ts" />
//// / <reference path="../typings/index.d.ts" />
/// <reference path="../dst/android.d.ts" />
/// <reference path="./util/Utility.ts" />
/// <reference path="./util/ColorUtils.ts" />
/// <reference path="./util/RotatedRect.ts" />
/// <reference path="./model/enum/AnimationType.ts" />
/// <reference path="./model/enum/Agg.ts" />
/// <reference path="./model/enum/Order.ts" />
/// <reference path="./model/enum/ScaleType.ts" />
/// <reference path="./model/enum/DataType.ts" />
/// <reference path="./model/enum/ChartType.ts" />
/// <reference path="./model/enum/AxisType.ts" />
/// <reference path="./model/cartesian/Value.ts" />
/// <reference path="./model/cartesian/Field.ts" />
/// <reference path="./model/cartesian/Filter.ts" />
/// <reference path="./model/cartesian/Encoding.ts" />
/// <reference path="./model/cartesian/Item.ts" />
/// <reference path="./model/cartesian/TransForm.ts" />
/// <reference path="./model/cartesian/Series.ts" />
/// <reference path="./model/cartesian/DataModel.ts" />
/// <reference path="./model/hierarchical/Value.ts" />
/// <reference path="./model/hierarchical/Field.ts" />
/// <reference path="./model/hierarchical/Item.ts" />
/// <reference path="./model/hierarchical/Encoding.ts" />
/// <reference path="./model/hierarchical/DataModel.ts" />
/// <reference path="./scale/IScale.ts" />
/// <reference path="./scale/Scale.ts" />
/// <reference path="./scale/LinearScale.ts" />
/// <reference path="./scale/OrdinalScale.ts" />
/// <reference path="./scale/LogScale.ts" />
/// <reference path="./scale/ColorScale.ts" />
/// <reference path="./view/ElementType.ts" />
/// <reference path="./view/legend/ILegend.ts" />
/// <reference path="./view/legend/ScaleLegend.ts" />
/// <reference path="./view/legend/SeriesLegend.ts" />
/// <reference path="./view/shape/Shape.ts" />
/// <reference path="./view/shape/Lable.ts" />
/// <reference path="./view/shape/PlotShape.ts" />
/// <reference path="./view/shape/BarShape.ts" />
/// <reference path="./view/shape/CubeShape.ts" />
/// <reference path="./view/shape/RadialBarShape.ts" />
/// <reference path="./view/shape/SunburstShape.ts" />
/// <reference path="./view/shape/ScatterShape.ts" />
/// <reference path="./view/shape/LinesShape.ts" />
/// <reference path="./view/shape/AreaShape.ts" />
/// <reference path="./view/shape/AxisLineShape.ts" />
/// <reference path="./view/layout/BaseLayout.ts" />
/// <reference path="./view/layout/cartesian/CartesianBaseLayout.ts" />
/// <reference path="./view/layout/cartesian/CartesianLayout.ts" />
/// <reference path="./view/layout/cartesian/BarLayout.ts" />
/// <reference path="./view/layout/cartesian/ScatterLayout.ts" />
/// <reference path="./view/layout/cartesian/RadialCartesianLayout.ts" />
/// <reference path="./view/layout/cartesian/RadialBarLayout.ts" />
/// <reference path="./view/layout/cartesian/RadialLineLayout.ts" />
/// <reference path="./view/layout/cartesian/RadialAreaLayout.ts" />
/// <reference path="./view/layout/cartesian/RadialScatterLayout.ts" />
/// <reference path="./view/layout/cartesian/LineLayout.ts" />
/// <reference path="./view/layout/cartesian/AreaLayout.ts" />
/// <reference path="./view/layout/hierarchical/HierarchicalLayout.ts" />
/// <reference path="./view/layout/hierarchical/SunburstLayout.ts" />
/// <reference path="./view/layout/hierarchical/TreeMapLayout.ts" />
/// <reference path="./view/axis/ticks/Ticks.ts" />
/// <reference path="./view/axis/ticks/LinearTicks.ts" />
/// <reference path="./view/axis/ticks/LogTicks.ts" />
/// <reference path="./view/axis/ticks/OrdinalTicks.ts" />
/// <reference path="./view/axis/shape/AxisShape.ts" />
/// <reference path="./view/axis/BaseAxis.ts" />
/// <reference path="./view/axis/LineAxis.ts" />
/// <reference path="./view/axis/RadialLineAxis.ts" />
/// <reference path="./view/plot/BasePlot.ts" />
/// <reference path="./view/plot/CartesianPlot.ts" />
/// <reference path="./view/chart/cartesian/CartesianChart.ts" />
/// <reference path="./view/BaseChartLayout.ts" />
/// <reference path="./view/chart/cartesian/ChartLayout.ts" />
/// <reference path="./view/plot/HierarchicalPlot.ts" />
/// <reference path="./view/chart/hierarchical/HierarchicalChart.ts" />
/// <reference path="./view/chart/hierarchical/ChartLayout.ts" />
///// <reference path="./view/chart/hierarchical/HierarchicalChart.ts" />
// HierarchicalChart
/// <reference path="./model/geo/path/Stream.ts" />
/// <reference path="./model/geo/path/StreamFactory.ts" />
/// <reference path="./model/geo/path/Feature.ts" />
/// <reference path="./model/geo/path/ParseFactory.ts" />
/// <reference path="./model/geo/projection/Projection.ts"/>
/// <reference path="./model/geo/projection/MercatorProjection.ts" />
/// <reference path="./model/geo/projection/ProjectionFactory.ts"/>
/// <reference path="./model/geo/DataModel.ts" />
/// <reference path="./model/geo/relation/Encoding.ts" />
/// <reference path="./model/geo/relation/DataModel.ts" />
/// <reference path="./model/geo/FlightParser.ts" />
/// <reference path="./view/chart/geo/GeoPlot.ts" />
/// <reference path="./view/chart/geo/ChartLayout.ts" />
/// <reference path="../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var Point = android.graphics.Point;
        var Config = /** @class */ (function () {
            function Config(config) {
                var geo = config.geo;
                if (geo != null) {
                    if (geo.center != null) {
                        this.center = new Point(geo.center[0], geo.center[1]);
                    }
                    if (geo.translate != null) {
                        this.translate = new Point(geo.translate[0], geo.translate[1]);
                    }
                    if (geo.scale) {
                        this.scale = geo.scale;
                    }
                }
            }
            return Config;
        }());
        test.Config = Config;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
var android;
(function (android) {
    var test;
    (function (test) {
        var EventHandler = /** @class */ (function () {
            function EventHandler() {
            }
            return EventHandler;
        }());
        test.EventHandler = EventHandler;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
var android;
(function (android) {
    var test;
    (function (test) {
        var cartesian;
        (function (cartesian) {
            'use strict';
            var AggregateCache = /** @class */ (function () {
                function AggregateCache(agg) {
                    this.__agg = agg;
                }
                AggregateCache.prototype.put = function (key, value) {
                    if (this.__domains[key] == null) {
                        this.__domains[key] = [];
                    }
                    this.__domains[key].push(value);
                };
                AggregateCache.prototype.get = function (key) {
                    var list = this.__domains[key];
                    if (list != null) {
                        var count = 0;
                        var sum = 0;
                        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                            var item = list_1[_i];
                            if (typeof item == 'number') {
                                sum += item;
                                count++;
                            }
                        }
                        switch (this.__agg) {
                            case test.Agg.AVERAGE:
                                return sum / count;
                            case test.Agg.COUNT:
                                return count;
                            case test.Agg.SUM:
                                return sum;
                            case test.Agg.NONE:
                                return list[0];
                        }
                    }
                    return 0;
                };
                return AggregateCache;
            }());
            cartesian.AggregateCache = AggregateCache;
        })(cartesian = test.cartesian || (test.cartesian = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
// /// <reference path="../../base.ts" />
// namespace android.test.map {
//     'use strict';
//     import Field = android.test.cartesian.Field;
//     export class Encoding {
//         public name:Field;
//         public color: Field;
//         public size: Field;
//         public shape: Field;
//         public group: Field;
//         public text:Field;
//         public tooltip:Field;
//         public values:Field[];
//         public _stack:boolean = false;
//         public _radial:boolean = false;
//         constructor(encoding: any) {
//             if(encoding.name){
//                 this.name  = new Field(encoding.name,"name");
//             }
//             if (encoding.color) {
//                 this.color = new Field(encoding.color, 'color');
//             }
//             if (encoding.shape) {
//                 this.shape = new Field(encoding.shape, 'shape');
//             }
//             if (encoding.size) {
//                 this.size = new Field(encoding.size, 'size');
//             }
//             if(encoding.tooltip){
//                 this.tooltip = new Field(encoding.tooltip,'tooltip');
//             }
//             if(encoding.text){
//                 this.text = new Field(encoding.text,'text');
//             }
//             if (encoding.group) {
//                 this.group = new Field(encoding.group, 'group');
//             }
//             if (encoding.values && encoding.values instanceof Array){
//                 this.values =[];
//                 for(var i = 0; i <encoding.values.length; ++i){
//                     var value = encoding.values[i];
//                     this.values.push(new Field(value,value.name));
//                 }
//             }
//             if(encoding.stack != null){
//                 this._stack = encoding.stack ;
//             }
//             if(encoding.radial != null){
//                 this._radial = encoding.radial;
//             }
//         }
//     }
// }
/// <reference path="../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var Default = android.device.Default;
        var Animation = android.view.animation.Animation;
        var FlightShape = /** @class */ (function (_super) {
            __extends(FlightShape, _super);
            function FlightShape(c, xs, ys, style, strokeStyle) {
                var _this = _super.call(this, c) || this;
                _this.priority = ++test.LinesShape.LinesPrority;
                _this.__xs = xs;
                _this.__ys = ys;
                var l = test.Utility.min(xs);
                var t = test.Utility.min(ys);
                var r = test.Utility.max(xs);
                var b = test.Utility.max(ys);
                _this.__renderXs = [];
                _this.__renderYs = [];
                _this.layoutInfo.reset(l, t, r, b, _this.padding, 0);
                _this._oldLayoutInfo = _this.layoutInfo.clone();
                _this._style = style;
                if (style == null) {
                    _this._style = Default.style;
                }
                _this._strokeStyle = strokeStyle;
                if (strokeStyle == null) {
                    _this._strokeStyle = Default.strokestyle;
                }
                return _this;
            }
            Object.defineProperty(FlightShape.prototype, "xs", {
                get: function () {
                    return this.__xs;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlightShape.prototype, "ys", {
                get: function () {
                    return this.__ys;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlightShape.prototype, "renderXs", {
                set: function (value) {
                    this.__renderXs = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlightShape.prototype, "renderYs", {
                set: function (value) {
                    this.__renderYs = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlightShape.prototype, "strokeStyle", {
                get: function () {
                    return this._strokeStyle;
                },
                set: function (value) {
                    this._strokeStyle = value;
                },
                enumerable: true,
                configurable: true
            });
            FlightShape.prototype.onDrawShape = function (canvas) {
                // canvas.save();
                // canvas.clip(this.layoutInfo.innerrect);
                // canvas.drawLines(this.__xs,this.__ys,this._strokeStyle);
                // canvas.restore();
                canvas.drawLines(this.__renderXs, this.__renderYs, this._strokeStyle);
                // let context = canvas.canvas;
                // context.fillStyle = 'rgba(0,0,0,0.05)';
                // context.beginPath();
                // context.fillStyle = '#ac6318';
                // context.strokeStyle = '#ac6318';
                // context.lineWidth = 6;
                // context.moveTo(this.__renderXs[0], this.__renderYs[0]);
                // context.lineTo(this.__renderXs[1], this.__renderYs[1]);
                // context.stroke();
                // context.arc(this.__renderXs[0], this.__renderYs[0], 3, 0, Math.PI*2, true);
                // context.fill();
            };
            FlightShape.LinesPrority = test.PlotShape.PRIORITY * 4;
            return FlightShape;
        }(test.PlotShape));
        test.FlightShape = FlightShape;
        var FlightAnimationTo = /** @class */ (function (_super) {
            __extends(FlightAnimationTo, _super);
            function FlightAnimationTo() {
                var _this = _super.call(this) || this;
                _this.ease = new android.view.animation.AnimationEase();
                return _this;
            }
            FlightAnimationTo.prototype.applyTransformation = function (interpolatedTime, canvas, view) {
                if (view instanceof FlightShape) {
                    var xs = view.xs;
                    var ys = view.ys;
                    var last = xs.length - 1;
                    // console.log("interpolated Time  "+ interpolatedTime);
                    var txs = [(xs[last] - xs[0]) * interpolatedTime + xs[0], (xs[last] - xs[0]) * (interpolatedTime + 0.1) + xs[0]];
                    var tys = [(ys[last] - ys[0]) * interpolatedTime + ys[0], (ys[last] - ys[0]) * (interpolatedTime + 0.1) + ys[0]];
                    view.renderXs = txs;
                    view.renderYs = tys;
                }
            };
            FlightAnimationTo.prototype.onStartAniamtion = function (canvas, view) {
                _super.prototype.onStartAniamtion.call(this, canvas, view);
            };
            FlightAnimationTo.prototype.onEndAnimation = function (canvas, view) {
                _super.prototype.onEndAnimation.call(this, canvas, view);
                // console.log("onEndAnimation ");
            };
            return FlightAnimationTo;
        }(Animation));
        test.FlightAnimationTo = FlightAnimationTo;
        var FlightAnimationBack = /** @class */ (function (_super) {
            __extends(FlightAnimationBack, _super);
            function FlightAnimationBack() {
                var _this = _super.call(this) || this;
                _this.ease = new android.view.animation.AnimationEase();
                return _this;
            }
            FlightAnimationBack.prototype.applyTransformation = function (interpolatedTime, canvas, view) {
                if (view instanceof FlightShape) {
                    var xs = view.xs;
                    var ys = view.ys;
                    var last = xs.length - 1;
                    // console.log("interpolated Time  "+ interpolatedTime);
                    var txs = [xs[last] - (xs[last] - xs[0]) * (interpolatedTime), xs[last] - (xs[last] - xs[0]) * (interpolatedTime + 0.1)];
                    var tys = [ys[last] - (ys[last] - ys[0]) * (interpolatedTime), ys[last] - (ys[last] - ys[0]) * (interpolatedTime + 0.1)];
                    view.renderXs = txs;
                    view.renderYs = tys;
                }
            };
            FlightAnimationBack.prototype.onStartAniamtion = function (canvas, view) {
                _super.prototype.onStartAniamtion.call(this, canvas, view);
            };
            FlightAnimationBack.prototype.onEndAnimation = function (canvas, view) {
                _super.prototype.onEndAnimation.call(this, canvas, view);
            };
            return FlightAnimationBack;
        }(Animation));
        test.FlightAnimationBack = FlightAnimationBack;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var Default = android.device.Default;
        var MotionEvent = android.view.event.MotionEvent;
        var Util = android.graphics.Util;
        var MapItemShape = /** @class */ (function (_super) {
            __extends(MapItemShape, _super);
            function MapItemShape(c, xs, ys, style, strokeStyle) {
                var _this = _super.call(this, c) || this;
                _this.priority = test.Shape.PRIORITY + 1;
                _this.__xs = xs;
                _this.__ys = ys;
                _this._style = style;
                var l = Math.min.apply(Math, xs);
                var t = Math.min.apply(Math, ys);
                var r = Math.max.apply(Math, xs);
                var b = Math.max.apply(Math, ys);
                _this.layoutInfo.reset(l, t, r, b, _this.padding, 0);
                _this._oldLayoutInfo = _this.layoutInfo.clone();
                _this.__center = Util.CenterOfPolygon(_this.__xs, _this.__ys);
                _this.__area = Util.Area(_this.__xs, _this.__ys);
                if (style == null) {
                    _this._style = Default.style;
                }
                _this._strokeStyle = strokeStyle;
                if (strokeStyle == null) {
                    _this._strokeStyle = Default.strokestyle;
                }
                return _this;
            }
            Object.defineProperty(MapItemShape.prototype, "center", {
                get: function () {
                    return this.__center;
                },
                set: function (value) {
                    this.__center = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MapItemShape.prototype, "area", {
                get: function () {
                    return this.__area;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MapItemShape.prototype, "strokeStyle", {
                get: function () {
                    return this._strokeStyle;
                },
                set: function (value) {
                    this._strokeStyle = value;
                },
                enumerable: true,
                configurable: true
            });
            MapItemShape.prototype.onDrawShape = function (canvas) {
                canvas.save();
                canvas.clip(this.layoutInfo.innerrect);
                canvas.drawPolygon(this.__xs, this.__ys, this.style);
                canvas.restore();
            };
            MapItemShape.prototype.onMouseEvent = function (event) {
                switch (event.action) {
                    case MotionEvent.ACTION_MOUSE_ON:
                        console.log("mouse on ");
                        break;
                    case MotionEvent.ACTION_MOUSE_OUT:
                        console.log("mouse out ");
                        break;
                    case MotionEvent.ACTION_MOUSE_MOVE:
                        break;
                    case MotionEvent.ACTION_MOUSE_OUT:
                        break;
                }
                return true;
            };
            return MapItemShape;
        }(test.PlotShape));
        test.MapItemShape = MapItemShape;
        // export class MapItemShapeAnimation extends Animation {
        //     private rect: Rect;
        //     constructor(rect: Rect) {
        //         super();
        //         this.ease = new android.view.animation.AnimationEase();
        //     }
        //     applyTransformation(interpolatedTime: number, canvas: Canvas, view: View) {
        //         let scale: number = this.from + (this.to - this.from) * interpolatedTime;
        //         let rect: Rect = this.rect.clone();
        //         view.layoutInfo.innerrect.width = this.rect.width * scale;
        //     }
        //     onStartAniamtion(canvas: Canvas, view: View): void {
        //         this.rect = view.layoutInfo.innerrect.clone();
        //     }
        //     onEndAnimation(canvas: Canvas, view: View): void {
        //     }
        // }
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var TextView = android.widget.TextView;
        var ToolTips = /** @class */ (function (_super) {
            __extends(ToolTips, _super);
            function ToolTips() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ToolTips.prototype.onDraw = function (canvas) {
            };
            return ToolTips;
        }(TextView));
        test.ToolTips = ToolTips;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var map;
        (function (map) {
            'use strict';
            var GeoLayout = /** @class */ (function (_super) {
                __extends(GeoLayout, _super);
                function GeoLayout(c) {
                    var _this = _super.call(this, c) || this;
                    _this.__namescale = new map.MapOrdinalScale("name");
                    return _this;
                }
                GeoLayout.prototype.convert = function (featurelist, rect, canvas) {
                    this.__shapelist.length = 0;
                    for (var _i = 0, featurelist_1 = featurelist; _i < featurelist_1.length; _i++) {
                        var feature = featurelist_1[_i];
                        var max = null;
                        for (var _a = 0, _b = feature.streams; _a < _b.length; _a++) {
                            var stream = _b[_a];
                            var pointlist = stream.result;
                            var mapshape = new test.MapItemShape(this.context, pointlist.xs, pointlist.ys);
                            if (max == null) {
                                max = mapshape;
                            }
                            if (max.area < mapshape.area) {
                                max = mapshape;
                            }
                            // mapshape.style.background = ColorUtils.indexColor(parseInt(feature.id));
                            mapshape.style.background = "#000";
                            // mapshape.style.background =
                            mapshape.style.strokeStyle.strokeColor = '#cbcbcb';
                            // 'gray'
                            mapshape.style.strokeStyle.strokeWidth = 1;
                            this.shapeList.push(mapshape);
                        }
                        if (max != null) {
                            this.__namescale.domains.push(feature.name);
                            this.__namescale.ranges.push(max.center);
                        }
                    }
                    this.__namescale.refresh();
                    return this.shapeList;
                };
                Object.defineProperty(GeoLayout.prototype, "nameScale", {
                    get: function () {
                        return this.__namescale;
                    },
                    enumerable: true,
                    configurable: true
                });
                return GeoLayout;
            }(test.BaseLayout));
            map.GeoLayout = GeoLayout;
        })(map = test.map || (test.map = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var map;
        (function (map) {
            'use strict';
            var MapBaseLayout = /** @class */ (function (_super) {
                __extends(MapBaseLayout, _super);
                function MapBaseLayout() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._rect = null;
                    return _this;
                }
                MapBaseLayout.prototype.convert = function (serieslist, projection, nameScale, encoding, rect, canvas) {
                    this.__shapelist = [];
                    this._serieslist = [];
                    this._projection = projection;
                    this._nameScale = nameScale;
                    for (var _i = 0, serieslist_3 = serieslist; _i < serieslist_3.length; _i++) {
                        var ser = serieslist_3[_i];
                        this._serieslist.push(ser.clone());
                    }
                    this._encoding = encoding;
                    this._rect = rect;
                    for (var _a = 0, _b = this._serieslist; _a < _b.length; _a++) {
                        var ser = _b[_a];
                        this._layoutSeries(ser, nameScale, canvas);
                    }
                    return this.__shapelist;
                };
                MapBaseLayout.prototype._layoutSeries = function (ser, nameScale, canvas) {
                };
                return MapBaseLayout;
            }(test.BaseLayout));
            map.MapBaseLayout = MapBaseLayout;
        })(map = test.map || (test.map = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
var android;
(function (android) {
    var test;
    (function (test) {
        var map;
        (function (map) {
            'use strict';
            var MapOrdinalScale = /** @class */ (function (_super) {
                __extends(MapOrdinalScale, _super);
                function MapOrdinalScale() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                MapOrdinalScale.prototype.getScaleValue = function (v) {
                    var index = this._domainCache[v];
                    if (isNaN(index)) {
                        index = 0;
                    }
                    return this.__ranges[index];
                };
                Object.defineProperty(MapOrdinalScale.prototype, "ranges", {
                    get: function () {
                        return this.__ranges;
                    },
                    enumerable: true,
                    configurable: true
                });
                return MapOrdinalScale;
            }(test.OrdinalScale));
            map.MapOrdinalScale = MapOrdinalScale;
        })(map = test.map || (test.map = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var map;
        (function (map) {
            'use strict';
            var Default = android.device.Default;
            var MapScatterLayout = /** @class */ (function (_super) {
                __extends(MapScatterLayout, _super);
                function MapScatterLayout() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                MapScatterLayout.prototype._layoutSeries = function (series, nameScale, canvas) {
                    var size = this._serieslist.length;
                    var xScale = series.getScale('x');
                    var yScale = series.getScale('y');
                    var colorScale = series.getScale('color');
                    var sizeScale = series.getScale('size');
                    var defaultcolor = test.ColorUtils.indexColor(series.index);
                    var colorArray = [];
                    if (colorScale instanceof test.OrdinalScale) {
                        colorScale = colorScale.clone();
                        colorArray = test.ColorUtils.gradientColor(colorScale.startPosition, colorScale.endPosition, colorScale.domains.length);
                        colorScale.range([0, colorScale.domains.length - 1]);
                    }
                    var defaultsize = 10;
                    for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
                        var pt = _a[_i];
                        if (pt != null) {
                            var colorValue = pt.color;
                            var shapeValue = pt.shape;
                            var sizeValue = pt.size;
                            var tooltip = pt.tooltip;
                            var text = pt.text;
                            // let name:Value= pt.x;
                            var name_1 = pt.geoposition;
                            var point = null;
                            if (pt.geoposition.scaleType === test.ScaleType.LatLon) {
                                point = this._projection.lonLat2xy(pt.geoposition.value[0], pt.geoposition.value[1]);
                            }
                            else {
                                point = nameScale.getScaleValue(pt.geoposition.value);
                            }
                            var s = sizeScale.getScaleValue(sizeValue.value);
                            if (isNaN(s) || s == null || s <= 0) {
                                s = defaultsize;
                            }
                            var color = defaultcolor;
                            if (colorScale instanceof test.OrdinalScale) {
                                var colorindex = colorScale.getScaleValue(colorValue.value);
                                color = colorArray[colorindex];
                            }
                            else if (colorScale instanceof test.LinearScale) {
                                color = test.ColorUtils.getColor(colorScale.startPosition, colorScale.endPosition, colorValue.value, colorScale.min, colorScale.max);
                            }
                            var scatterShape = new test.ScatterShape(this.context, point.x - s / 2, point.y - s / 2, s, s, Default.style);
                            if (color != null) {
                                scatterShape.style.background = color;
                            }
                            else {
                                scatterShape.style.background = defaultcolor;
                            }
                            if (series.showlabels && text != null) {
                                var textstr = text.value;
                                var font = Default.font;
                                font.fontColor = 'black';
                                font.fontSize = 12;
                                var textsize = canvas.measureString(textstr, font);
                                var width = textsize.width;
                                var height = textsize.height;
                                scatterShape.label = new test.Label(this.context, textstr, point.x, point.y - s / 2 - 3, width, height, 0, 3);
                                scatterShape.label.background = Default.style;
                                scatterShape.label._font = font;
                                scatterShape.label.background.strokeStyle.strokeColor = 'gray';
                                scatterShape.label.background.background = 'lightblue';
                            }
                            this.__shapelist.push(scatterShape);
                        }
                    }
                };
                return MapScatterLayout;
            }(map.MapBaseLayout));
            map.MapScatterLayout = MapScatterLayout;
        })(map = test.map || (test.map = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../../../base.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var map;
        (function (map) {
            var relation;
            (function (relation) {
                'use strict';
                var MapRelationLayout = /** @class */ (function (_super) {
                    __extends(MapRelationLayout, _super);
                    function MapRelationLayout(c) {
                        return _super.call(this, c) || this;
                    }
                    MapRelationLayout.prototype.convert = function (items, rect, canvas) {
                        this.__shapelist.length = 0;
                        for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
                            var item = items_2[_i];
                            var max = null;
                            var shape = new test.FlightShape(this.context, [item.start.x, item.end.x], [item.start.y, item.end.y]);
                            shape.strokeStyle.strokeColor = 'red';
                            // 'gray'
                            shape.strokeStyle.strokeWidth = 0.5;
                            this.shapeList.push(shape);
                        }
                        return this.shapeList;
                    };
                    return MapRelationLayout;
                }(test.BaseLayout));
                relation.MapRelationLayout = MapRelationLayout;
            })(relation = map.relation || (map.relation = {}));
        })(map = test.map || (test.map = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));


