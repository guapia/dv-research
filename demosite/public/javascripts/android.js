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
var android;
(function (android) {
    /**
     * @hidden
     * @param callBack
     */
    function requestAnimationFrame(callBack) {
        if (__callbacklist.length == 0) {
            __callbacklist.length = 0;
            __callbacklist.push(callBack);
            window.requestAnimationFrame(__frameCallBack);
        }
        else {
            __callbacklist.push(callBack);
        }
    }
    android.requestAnimationFrame = requestAnimationFrame;
    /**
     * @hidden
     * @param time
     */
    function __frameCallBack(time) {
        var list = [].concat(__callbacklist);
        __callbacklist.length = 0;
        for (;;) {
            var callback = list.shift();
            if (callback == null) {
                break;
            }
            else {
                callback(time);
            }
        }
        list.length = 0;
    }
    android.__frameCallBack = __frameCallBack;
    /**
     * @hidden
     */
    var __callbacklist = [];
})(android || (android = {}));
var android;
(function (android) {
    var app;
    (function (app) {
        var Intent = /** @class */ (function () {
            function Intent() {
            }
            Intent.prototype.setClass = function (c, activityClass) {
                this.context = c;
                this.targetActivityClass = activityClass;
            };
            Intent.prototype.getClass = function () {
                return this.targetActivityClass;
            };
            Intent.prototype.getContext = function () {
                return this.context;
            };
            return Intent;
        }());
        app.Intent = Intent;
    })(app = android.app || (android.app = {}));
})(android || (android = {}));
var android;
(function (android) {
    var graphics;
    (function (graphics) {
        /**
         * Point holds two integer coordinates
         */
        var Point = /** @class */ (function () {
            function Point(x, y) {
                if (!isNaN(x)) {
                    this.x = x;
                }
                else {
                    this.x = 0;
                }
                if (!isNaN(y)) {
                    this.y = y;
                }
                else {
                    this.y = 0;
                }
            }
            /**
             * Set the point's x and y coordinates
             */
            Point.prototype.set = function (x, y) {
                this.x = x;
                this.y = y;
            };
            /**
             * Negate the point's coordinates
             */
            Point.prototype.negate = function () {
                this.x = -this.x;
                this.y = -this.y;
            };
            /**
             * Offset the point's coordinates by dx, dy
             */
            Point.prototype.offset = function (dx, dy) {
                this.x += dx;
                this.y += dy;
            };
            /**
             * Returns true if the point's coordinates equal (x,y)
             */
            Point.prototype.equals = function (x, y) {
                return this.x == x && this.y == y;
            };
            Point.prototype.equalPoint = function (pt) {
                return this.equals(pt.x, pt.y);
            };
            Point.prototype.hashCode = function () {
                var result = this.x;
                result = 31 * result + this.y;
                return result;
            };
            Point.prototype.toString = function () {
                return "Point(" + this.x + ", " + this.y + ")";
            };
            /**
             * Parcelable interface methods
             */
            Point.prototype.describeContents = function () {
                return 0;
            };
            Point.prototype.clone = function () {
                return new Point(this.x, this.y);
            };
            return Point;
        }());
        graphics.Point = Point;
    })(graphics = android.graphics || (android.graphics = {}));
})(android || (android = {}));
/// <reference path="Point.ts" />
var android;
(function (android) {
    var graphics;
    (function (graphics) {
        var Point = android.graphics.Point;
        var Rect = /** @class */ (function () {
            function Rect(left, top, right, bottom) {
                this.left = left;
                this.top = top;
                this.right = right;
                this.bottom = bottom;
            }
            Rect.prototype.reset = function (left, top, right, bottom) {
                this.left = left;
                this.top = top;
                this.right = right;
                this.bottom = bottom;
                return this;
            };
            Object.defineProperty(Rect.prototype, "center", {
                get: function () {
                    return new Point(this.left + this.width / 2, this.top + this.height / 2);
                },
                enumerable: true,
                configurable: true
            });
            Rect.prototype.correct = function () {
                if (this.left > this.right) {
                    var l = this.left;
                    this.left = this.right;
                    this.right = l;
                }
                if (this.top > this.bottom) {
                    var t = this.top;
                    this.top = this.bottom;
                    this.bottom = t;
                }
            };
            Rect.prototype.translate = function (x, y) {
                this.left += x;
                this.right += x;
                this.top += y;
                this.bottom += y;
                return this;
            };
            Rect.prototype.translateX = function (x) {
                this.translate(x, 0);
                return this;
            };
            Rect.prototype.translateY = function (y) {
                this.translate(0, y);
                return this;
            };
            Rect.prototype.scale = function (r) {
                // if (r < 1 && r > 0) {
                //     var w = this.right - this.left;
                //     var h = this.bottom - this.top;
                //     this.left += r * w / 2;
                //     this.top += r * h / 2;
                //     this.right -= r * w / 2;
                //     this.bottom -= r * h / 2;
                // } else {
                //     this.left += r;
                //     this.top += r;
                //     this.right -= r;
                //     this.bottom -= r;
                // }
                if (r > 0) {
                    var dw = this.width * r - this.width;
                    var dh = this.height * r - this.height;
                    this.left -= dw / 2;
                    this.right += dw / 2;
                    this.top -= dh / 2;
                    this.bottom += dh / 2;
                }
                return this;
            };
            Object.defineProperty(Rect.prototype, "isNil", {
                get: function () {
                    return (this.right - this.left <= 0.01) ||
                        (this.bottom - this.top <= 0.01);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rect.prototype, "height", {
                get: function () {
                    return ((this.bottom - this.top));
                },
                set: function (height) {
                    this.bottom = this.top + height;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rect.prototype, "width", {
                get: function () {
                    return ((this.right - this.left));
                },
                set: function (width) {
                    this.right = this.left + width;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rect.prototype, "startPoint", {
                get: function () {
                    if (!this._startpoint) {
                        this._startpoint = new Point(this.left, this.top);
                    }
                    this._startpoint.x = this.left;
                    this._startpoint.y = this.top;
                    return this._startpoint;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rect.prototype, "endPoint", {
                get: function () {
                    if (!this._endpoint) {
                        this._endpoint = new Point(this.right, this.bottom);
                    }
                    this._endpoint.x = this.right;
                    this._endpoint.y = this.bottom;
                    return this._endpoint;
                },
                enumerable: true,
                configurable: true
            });
            Rect.prototype.contains = function (x, y) {
                if (x <= this.right && x >= this.left && y <= this.bottom && y >= this.top) {
                    return true;
                }
                return false;
            };
            Rect.prototype.clone = function () {
                return new Rect(this.left, this.top, this.right, this.bottom);
            };
            Rect.prototype.equal = function (rect) {
                if (rect != null) {
                    return rect.left === this.left && rect.top === this.top && rect.bottom === this.bottom && rect.right === this.right;
                }
                return false;
            };
            Rect.prototype.toString = function () {
                return "< left:" + this.left + " ,top:" + this.top + " , width:" + this.width + " ,height:" + this.height + " >";
            };
            return Rect;
        }());
        graphics.Rect = Rect;
    })(graphics = android.graphics || (android.graphics = {}));
})(android || (android = {}));
/// <reference path="Rect.ts" />
var android;
(function (android) {
    var graphics;
    (function (graphics) {
        var Rect = android.graphics.Rect;
        var Gravity;
        (function (Gravity) {
            Gravity[Gravity["Left"] = 0] = "Left";
            Gravity[Gravity["Center"] = 1] = "Center";
            Gravity[Gravity["Right"] = 2] = "Right";
            Gravity[Gravity["Top"] = 3] = "Top";
            Gravity[Gravity["Bottom"] = 4] = "Bottom";
            Gravity[Gravity["Auto"] = 5] = "Auto";
        })(Gravity = graphics.Gravity || (graphics.Gravity = {}));
        var Padding = /** @class */ (function () {
            function Padding(padding) {
                if (padding) {
                    this.padding = padding;
                }
                else {
                    this.padding = 0;
                }
            }
            Object.defineProperty(Padding.prototype, "padding", {
                set: function (padding) {
                    this.leftPadding = this.rightPadding = this.topPadding = this.bottomPadding = padding;
                },
                enumerable: true,
                configurable: true
            });
            return Padding;
        }());
        graphics.Padding = Padding;
        var Position;
        (function (Position) {
            Position[Position["Left"] = 0] = "Left";
            Position[Position["Top"] = 1] = "Top";
            Position[Position["Right"] = 2] = "Right";
            Position[Position["Bottom"] = 3] = "Bottom";
        })(Position = graphics.Position || (graphics.Position = {}));
        var Orientation;
        (function (Orientation) {
            Orientation[Orientation["Horizontal"] = 0] = "Horizontal";
            Orientation[Orientation["Vertical"] = 1] = "Vertical";
        })(Orientation = graphics.Orientation || (graphics.Orientation = {}));
        var StrokeStyle = /** @class */ (function () {
            function StrokeStyle(strokewidth, strokecolor, dash, dashoffset) {
                this.strokeWidth = strokewidth;
                this.strokeColor = strokecolor;
                if (dash != null && dash instanceof Array && dash.length > 0) {
                    this.dash = dash;
                    if (dashoffset != null && !isNaN(dashoffset)) {
                        this.dashOffset = dashoffset;
                    }
                }
            }
            StrokeStyle.prototype.getCssStyle = function () {
                return {
                    'stroke-width': this.strokeWidth,
                    'stroke': this.strokeColor
                };
            };
            StrokeStyle.prototype.clone = function () {
                return new StrokeStyle(this.strokeWidth, this.strokeColor);
            };
            return StrokeStyle;
        }());
        graphics.StrokeStyle = StrokeStyle;
        var Font = /** @class */ (function () {
            function Font(fz, fm, fc) {
                this.fontSize = fz;
                this.fontFamily = fm;
                this.fontColor = fc;
                if (!this.fontFamily || this.fontFamily === "") {
                    this.fontFamily = 'Arial';
                }
            }
            Font.prototype.toString = function () {
                return " fontSize = " + this.fontSize + ", fontFamily = " + this.fontFamily + ", fontColor = " + this.fontFamily;
            };
            Font.prototype.clone = function () {
                return new Font(this.fontSize, this.fontFamily, this.fontColor);
            };
            return Font;
        }());
        graphics.Font = Font;
        var Style = /** @class */ (function () {
            function Style(bg, stroke) {
                this.background = bg;
                this.strokeStyle = stroke;
            }
            return Style;
        }());
        graphics.Style = Style;
        var Gradient = /** @class */ (function () {
            function Gradient(colors) {
                this.colors = [];
                this.colors = colors;
            }
            return Gradient;
        }());
        graphics.Gradient = Gradient;
        var LinearGradient = /** @class */ (function (_super) {
            __extends(LinearGradient, _super);
            function LinearGradient(sx, sy, ex, ey, colors) {
                var _this = _super.call(this, colors) || this;
                _this.startx = sx;
                _this.starty = sy;
                _this.endx = ex;
                _this.endy = ey;
                return _this;
            }
            return LinearGradient;
        }(Gradient));
        graphics.LinearGradient = LinearGradient;
        var RadialGradient = /** @class */ (function (_super) {
            __extends(RadialGradient, _super);
            function RadialGradient(cx, cy, r, cx1, cy1, r1, colors) {
                var _this = _super.call(this, colors) || this;
                _this.centerx = cx;
                _this.centery = cy;
                _this.radius = r;
                _this.centerx1 = cx1;
                _this.centery1 = cy1;
                _this.radius1 = r1;
                return _this;
            }
            return RadialGradient;
        }(Gradient));
        graphics.RadialGradient = RadialGradient;
        var Shadow = /** @class */ (function () {
            function Shadow() {
            }
            return Shadow;
        }());
        graphics.Shadow = Shadow;
        var FillStyle = /** @class */ (function () {
            function FillStyle() {
                this.fill = 'transparent';
            }
            return FillStyle;
        }());
        graphics.FillStyle = FillStyle;
        var Util = /** @class */ (function () {
            function Util() {
            }
            Util.cloneDeep = function (object) {
                if ((object == null) ||
                    (typeof object === 'number') ||
                    (typeof object === 'string') ||
                    (typeof object === 'boolean')) {
                    return object;
                }
                else if (Array.isArray(object)) {
                    var items = [];
                    for (var _i = 0, object_1 = object; _i < object_1.length; _i++) {
                        var item = object_1[_i];
                        items.push(Util.cloneDeep(item));
                    }
                    return items;
                }
                else if (object instanceof Date) {
                    return new Date(object.getTime());
                }
                else {
                    var cloneObject = {};
                    for (var key in object) {
                        if (typeof object[key] == 'function') {
                            cloneObject[key] = object[key];
                        }
                        else {
                            cloneObject[key] = Util.cloneDeep(object[key]);
                        }
                    }
                    return cloneObject;
                }
            };
            Util.contains = function (rect, pt) {
                if (pt.x <= rect.right && pt.x >= rect.left && pt.y <= rect.bottom && pt.y >= rect.top) {
                    return true;
                }
                return false;
            };
            Util.getRect = function (start, size) {
                var rect = new Rect(start.x, start.y, start.x + size.width, start.y + size.height);
                return rect;
            };
            Util.getStyleCss = function (style) {
                return {
                    "fill": style.background,
                    "stroke": style.strokeStyle ? style.strokeStyle.strokeColor : "",
                    "stroke-width": style.strokeStyle ? style.strokeStyle.strokeWidth : 0
                };
            };
            Util.union = function () {
                var rects = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    rects[_i] = arguments[_i];
                }
                var rect = new android.graphics.Rect(0, 0, 0, 0);
                rect.left = Math.min.apply(this, rects.map(function (e) { return e.left; }));
                rect.top = Math.min.apply(this, rects.map(function (e) { return e.top; }));
                rect.right = Math.max.apply(this, rects.map(function (e) { return e.right; }));
                rect.bottom = Math.max.apply(this, rects.map(function (e) { return e.bottom; }));
                return rect;
            };
            Util.hexToRgb = function (hex) {
                var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
                hex = hex.replace(shorthandRegex, function (m, r, g, b) {
                    return r + r + g + g + b + b;
                });
                var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                return result ? {
                    r: parseInt(result[1], 16),
                    g: parseInt(result[2], 16),
                    b: parseInt(result[3], 16)
                } : null;
            };
            Util.rgbToHex = function (r, g, b) {
                return "#" + Util.componentToHex(r) + Util.componentToHex(g) + Util.componentToHex(b);
            };
            Util.componentToHex = function (c) {
                var hex = c.toString(16);
                return hex.length == 1 ? "0" + hex : hex;
            };
            Util.asEnum = function (value, enumType, nullOK) {
                if (nullOK === void 0) { nullOK = false; }
                if (value == null && nullOK)
                    return null;
                var e = enumType[value];
                return typeof (e) === 'number' ? e : value;
            };
            Util.isMixed = function (r1, r2) {
                var ismixed = false;
                if (Math.abs((r1.left + r1.right) / 2 - (r2.left + r2.right) / 2)
                    < ((r1.right + r2.right - r1.left - r2.left) / 2) && Math.abs((r1.top + r1.bottom) / 2
                    - (r2.top + r2.bottom) / 2) < ((r1.bottom + r2.bottom - r1.top - r2.top) / 2)) {
                    ismixed = true;
                }
                return ismixed;
            };
            Util.containsRect = function (r1, r2) {
                var flg = r1.left <= r2.left &&
                    r1.top <= r2.top &&
                    r1.right >= r2.right &&
                    r1.bottom >= r2.bottom;
                return flg;
            };
            // let flg1:boolean = r1.left <=r2.left &&
            // r1.top <= r2.top &&
            // r1.right >=r2.right &&
            // r1.bottom >= r2.bottom;
            Util.IsPointInPolygon = function (p, polygon) {
                var minX = polygon[0].x;
                var maxX = polygon[0].x;
                var minY = polygon[0].y;
                var maxY = polygon[0].y;
                for (var i = 1; i < polygon.length; i++) {
                    var q = polygon[i];
                    minX = Math.min(q.x, minX);
                    maxX = Math.max(q.x, maxX);
                    minY = Math.min(q.y, minY);
                    maxY = Math.max(q.y, maxY);
                }
                if (p.x < minX || p.x > maxX || p.y < minY || p.y > maxY) {
                    return false;
                }
                // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
                var inside = false;
                for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
                    if ((polygon[i].y > p.y) != (polygon[j].y > p.y) &&
                        p.x < (polygon[j].x - polygon[i].x) * (p.y - polygon[i].y) / (polygon[j].y - polygon[i].y) + polygon[i].x) {
                        inside = !inside;
                    }
                }
                return inside;
            };
            Util.IsPointInPolygon2 = function (p, xs, ys) {
                var minX = xs[0];
                var maxX = xs[0];
                var minY = ys[0];
                var maxY = ys[0];
                for (var i = 1; i < xs.length; i++) {
                    // let q: Point = polygon[i];
                    minX = Math.min(xs[i], minX);
                    maxX = Math.max(xs[i], maxX);
                    minY = Math.min(ys[i], minY);
                    maxY = Math.max(ys[i], maxY);
                }
                if (p.x < minX || p.x > maxX || p.y < minY || p.y > maxY) {
                    return false;
                }
                var inside = false;
                for (var i = 0, j = xs.length - 1; i < xs.length; j = i++) {
                    if ((ys[i] > p.y) != (ys[j] > p.y) &&
                        p.x < (xs[j] - xs[i]) * (p.y - ys[i]) / (ys[j] - ys[i]) + xs[i]) {
                        inside = !inside;
                    }
                }
                return inside;
            };
            Util.Point2Line = function (x1, y1, x2, y2, x0, y0) {
                var space = 0;
                var a, b, c;
                a = Util._lineSpace(x1, y1, x2, y2);
                b = Util._lineSpace(x1, y1, x0, y0);
                c = Util._lineSpace(x2, y2, x0, y0);
                if (c + b == a) {
                    space = 0;
                    return space;
                }
                if (a <= 0.000001) {
                    space = b;
                    return space;
                }
                if (c * c >= a * a + b * b) {
                    space = b;
                    return space;
                }
                if (b * b >= a * a + c * c) {
                    space = c;
                    return space;
                }
                var p = (a + b + c) / 2;
                var s = Math.sqrt(p * (p - a) * (p - b) * (p - c));
                space = 2 * s / a;
                return space;
            };
            /**
          * @hidden
          */
            Util._lineSpace = function (x1, y1, x2, y2) {
                var lineLength = 0;
                lineLength = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
                return lineLength;
            };
            Util.Area = function (xs, ys) {
                var area = 0.00;
                for (var i = 0; i < xs.length; i++) {
                    if (i < xs.length - 1) {
                        area += xs[i] * ys[i + 1] - xs[i + 1] * ys[i];
                    }
                    else {
                        area += xs[i] * ys[0] - xs[0] * ys[i];
                    }
                }
                area = area / 2.00;
                return area;
            };
            Util.CenterOfPolygon = function (xs, ys) {
                var area = 0.0; //多边形面积  
                var Gx = 0.0, Gy = 0.0; // 重心的x、y  
                for (var i = 1; i <= xs.length; i++) {
                    var iLat = xs[(i % xs.length)];
                    var iLng = ys[(i % ys.length)];
                    var nextLat = xs[((i - 1) % xs.length)];
                    var nextLng = ys[((i - 1) % ys.length)];
                    var temp = (iLat * nextLng - iLng * nextLat) / 2.0;
                    area += temp;
                    Gx += temp * (iLat + nextLat) / 3.0;
                    Gy += temp * (iLng + nextLng) / 3.0;
                }
                Gx = Gx / area;
                Gy = Gy / area;
                return new graphics.Point(Gx, Gy);
            };
            Util.HashCode = function (obj) {
                if (obj == null) {
                    return '';
                }
                if (obj instanceof Object) {
                    var hash = '';
                    for (var key in obj) {
                        hash = hash + Util.HashCode(key) + Util.HashCode(obj[key]);
                    }
                    return Util.HashCodeString(hash);
                }
                else if (typeof obj == 'string') {
                    return Util.HashCodeString(obj);
                }
                else if (typeof obj == 'number') {
                    return Util.HashCodeString('number' + obj);
                }
                else if (typeof obj == 'boolean') {
                    return Util.HashCodeString('boolean' + obj);
                }
                return null;
            };
            Util.HashCodeString = function (obj) {
                var hash = 0, i, chr;
                if (obj == null || obj.length === 0) {
                    return hash + '';
                }
                for (i = 0; i < obj.length; ++i) {
                    chr = obj.charCodeAt(i);
                    hash = ((hash << 5) - hash) + chr;
                    hash |= 0;
                }
                return hash + '';
            };
            Util.createPtsFromRect = function (rect, size) {
                var xs = [];
                var ys = [];
                var pts = [new graphics.Point(rect.left, rect.top), new graphics.Point(rect.right, rect.top), new graphics.Point(rect.right, rect.bottom), new graphics.Point(rect.left, rect.bottom), new graphics.Point(rect.left, rect.top)];
                for (var i = 0; i < pts.length - 1; ++i) {
                    var p1 = pts[i];
                    var p2 = pts[i + 1];
                    for (var j = 0; j < size / 4; ++j) {
                        xs.push(p1.x + (p2.x - p1.x) / (size / 4) * j);
                        ys.push(p1.y + (p2.y - p1.y) / (size / 4) * j);
                    }
                }
                return { xs: xs, ys: ys };
            };
            Util.createPtsFromCircle = function (raidius, center, size) {
                var xs = [];
                var ys = [];
                var pi = Math.PI;
                for (var i = 0; i < size; ++i) {
                    var angle = 360 / size * i / pi;
                    var x = Math.sin(angle) * raidius + center.x;
                    var y = Math.cos(angle) * raidius + center.y;
                    xs.push(x);
                    ys.push(y);
                }
                return { xs: xs, ys: ys };
            };
            Util.createPtsFromRadialBar = function (startAngle, endAngle, radius, innerRadius, center, size) {
                var xs = [];
                var ys = [];
                var innerxs = [];
                var innerys = [];
                var pi = Math.PI;
                var currentSize = size;
                var step = (endAngle - startAngle) / (currentSize / 2);
                for (var angle = startAngle; angle < endAngle && xs.length <= currentSize / 2; angle += step) {
                    var x = Math.cos(angle) * radius + center.x;
                    var y = Math.sin(angle) * radius + center.y;
                    var ix = Math.cos(angle) * innerRadius + center.x;
                    var iy = Math.sin(angle) * innerRadius + center.y;
                    xs.push(x);
                    ys.push(y);
                    innerxs.push(ix);
                    innerys.push(iy);
                }
                while (xs.length + innerxs.length > size) {
                    xs.splice(1, 1);
                }
                xs = xs.concat(innerxs.reverse());
                ys = ys.concat(innerys.reverse());
                if (size !== xs.length) {
                    console.log(" error size  " + size + " xs size " + xs.length);
                }
                return { xs: xs, ys: ys };
            };
            return Util;
        }());
        graphics.Util = Util;
    })(graphics = android.graphics || (android.graphics = {}));
})(android || (android = {}));
var android;
(function (android) {
    var device;
    (function (device) {
        var Device = /** @class */ (function () {
            function Device() {
            }
            Object.defineProperty(Device, "width", {
                get: function () {
                    // return 340;
                    if (Device._width == 0) {
                        Device._width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
                    }
                    return Device._width;
                },
                set: function (value) {
                    Device._width = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Device, "height", {
                get: function () {
                    // return 620;
                    if (Device._height == 0) {
                        Device._height = (window.innerHeight > 0) ?
                            window.innerHeight : screen.height;
                    }
                    return Device._height;
                },
                set: function (value) {
                    Device._height = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Device, "density", {
                get: function () {
                    if (Device._density === 0) {
                        Device._density = Math.sqrt(Device.width * Device.width + Device.height * Device.height) / 160;
                    }
                    // return Device._density;
                    return 1;
                },
                enumerable: true,
                configurable: true
            });
            Device._density = 0;
            Device._width = 0;
            Device._height = 0;
            return Device;
        }());
        device.Device = Device;
    })(device = android.device || (android.device = {}));
})(android || (android = {}));
var android;
(function (android) {
    var util;
    (function (util) {
        var Log = /** @class */ (function () {
            function Log() {
            }
            Log.d = function (message, tag) {
                console.log(message);
            };
            Log.w = function (message, tag) {
                console.warn(message);
            };
            Log.e = function (message, tag) {
                console.error(message);
            };
            return Log;
        }());
        util.Log = Log;
    })(util = android.util || (android.util = {}));
})(android || (android = {}));
/// <reference path="../graphics/Util.ts" />
var android;
(function (android) {
    var device;
    (function (device) {
        var Font = android.graphics.Font;
        var StrokeStyle = android.graphics.StrokeStyle;
        var Style = android.graphics.Style;
        var Default = /** @class */ (function () {
            function Default() {
            }
            Object.defineProperty(Default, "font", {
                get: function () {
                    return new Font(10, "", "white");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Default, "strokestyle", {
                get: function () {
                    return new StrokeStyle(1, 'transparent');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Default, "style", {
                get: function () {
                    return new Style('transparent', Default.strokestyle);
                },
                enumerable: true,
                configurable: true
            });
            return Default;
        }());
        device.Default = Default;
    })(device = android.device || (android.device = {}));
})(android || (android = {}));
/// <reference path="Point.ts" />
/// <reference path="Util.ts" />
/// <reference path="../device/Device.ts" />
/// <reference path="../util/Log.ts" />
/// <reference path="../device/Default.ts" />
var android;
(function (android) {
    var graphics;
    (function (graphics) {
        var Point = android.graphics.Point;
        var Device = android.device.Device;
        var Default = android.device.Default;
        var RenderType;
        (function (RenderType) {
            RenderType[RenderType["Canvas"] = 0] = "Canvas";
            RenderType[RenderType["Svg"] = 1] = "Svg";
        })(RenderType = graphics.RenderType || (graphics.RenderType = {}));
        var CanvasState = /** @class */ (function () {
            function CanvasState(x, y) {
                this.xOffset = 0;
                this.yOffset = 0;
                this.xOffset = x;
                this.yOffset = y;
            }
            return CanvasState;
        }());
        var Floor = function (value) { return Math.floor(1000 * value) / 1000; };
        var Canvas = /** @class */ (function () {
            function Canvas(element, type) {
                this.xOffset = 0;
                this.yOffset = 0;
                this.saveStates = [];
                this._hostElement = element;
                this._renderType = type;
                if (type === RenderType.Canvas) {
                    this._render = new graphics.CanvasRenderEngine(element);
                    element.style.width = Device.width + 'px';
                    element.style.height = Device.height + "px";
                    this._render.setViewportSize(Device.width, Device.height);
                    ;
                }
                else if (type === RenderType.Svg) {
                    this._render = new graphics.SvgRenderEngine(element);
                    element.style.width = Device.width + 'px';
                    element.style.height = Device.height + "px";
                    this._render.setViewportSize(Device.width, Device.height);
                }
            }
            Canvas.prototype.clearRect = function (left, top, width, height) {
            };
            Canvas.prototype.save = function () {
                var state = new CanvasState(this.xOffset, this.yOffset);
                this.saveStates.push(state);
                this._render.save();
            };
            Canvas.prototype.clip = function (rect) {
                var r = rect.clone();
                r.translate(this.xOffset, this.yOffset);
                if (this._render instanceof graphics.CanvasRenderEngine) {
                    this._render.clip(rect);
                }
                else {
                    this._render.clip();
                }
            };
            Canvas.prototype.restore = function () {
                this.saveStates.pop();
                var state = this.saveStates[this.saveStates.length - 1];
                if (state) {
                    this.xOffset = state.xOffset;
                    this.yOffset = state.yOffset;
                }
                else {
                    this.xOffset = 0;
                    this.yOffset = 0;
                }
                if (this._render instanceof graphics.CanvasRenderEngine) {
                    this._render.restore();
                }
            };
            Canvas.prototype.setViewportSize = function (w, h) {
                this._render.setViewportSize(w, h);
            };
            Canvas.prototype.measureString = function (str, font, maxSize) {
                if (!font) {
                    font = Default.font.clone();
                }
                var f = font.clone();
                f.fontSize *= Device.density;
                return this._render.measureString(str, f);
            };
            Canvas.prototype.measureStringWithWidth = function (str, font) {
            };
            Canvas.prototype.drawText = function (str, pt, f, center, angle) {
                if (!f) {
                    f = Default.font.clone();
                }
                var size = this.measureString(str, f);
                var font = f.clone();
                font.fontSize *= Device.density;
                var startpt = new Point(pt.x, pt.y + size.height);
                var tpt = pt.clone();
                if (this._render instanceof graphics.CanvasRenderEngine) {
                    if (angle != null) {
                        this._render.drawStringRotated(str, startpt, center, angle, font);
                    }
                    else {
                        this._render.drawString(str, startpt, font);
                    }
                }
                else if (this._render instanceof graphics.SvgRenderEngine) {
                    startpt.offset(this.xOffset, this.yOffset);
                    if (angle != null) {
                        this._render.drawStringRotated(str, startpt, center, angle, null, { 'font-size': font.fontSize, 'font-family': font.fontFamily });
                    }
                    else {
                        this._render.drawString(str, startpt, null, { 'font-size': font.fontSize, 'font-family': font.fontFamily });
                    }
                }
            };
            Canvas.prototype.drawPosText = function (text, pos, font) {
                if (text.length * 2 > pos.length) {
                    throw "IndexOutOfBoundsException";
                }
                if (!font) {
                    font = Default.font;
                }
                if (this._renderType === RenderType.Canvas) {
                    var pt = new Point(0, 0);
                    for (var i = 0; i < pos.length; i += 2) {
                        pt.set(pos[i], pos[i + 1]);
                        // this._render.drawString(text[i],pt,font);
                        this.drawText(text[i / 2], pt, font);
                    }
                }
                else {
                    // console.log(" drawPosText ");
                }
            };
            Canvas.prototype.drawLine = function (pt1, pt2, strokestyle) {
                var stroke = null;
                if (strokestyle) {
                    stroke = strokestyle.clone();
                }
                else {
                    stroke = Default.strokestyle.clone();
                }
                var startpoint = pt1.clone();
                var endpoint = pt2.clone();
                if (this._renderType === RenderType.Canvas) {
                    this._render.drawLine(startpoint.x, startpoint.y, endpoint.x, endpoint.y, stroke);
                }
                else {
                    startpoint.offset(this.xOffset, this.yOffset);
                    endpoint.offset(this.xOffset, this.yOffset);
                    this._render.drawLine(startpoint.x, startpoint.y, endpoint.x, endpoint.y, stroke);
                }
            };
            Canvas.prototype.drawLines = function (xs, ys, strokestyle) {
                // drawLines(xs: number[], ys: number[], strokestyle: StrokeStyle) {
                var stroke = null;
                if (strokestyle) {
                    stroke = strokestyle.clone();
                }
                else {
                    stroke = Default.strokestyle.clone();
                }
                if (this._render instanceof graphics.CanvasRenderEngine) {
                    this._render.drawLines(xs, ys, stroke);
                }
                else if (this._render instanceof graphics.SvgRenderEngine) {
                    stroke.transform = "translate(" + this.xOffset + "," + this.yOffset + ")";
                    this._render.drawLines(xs, ys, null, stroke.getCssStyle());
                }
            };
            Canvas.prototype.drawRect = function (pt1, pt2, fill, style) {
                var startpoint = pt1.clone();
                var endpoint = pt2.clone();
                if (this._render instanceof graphics.CanvasRenderEngine) {
                    this._render.drawRect(startpoint.x, startpoint.y, endpoint.x - startpoint.x, endpoint.y - startpoint.y, style, fill);
                }
                else if (this._render instanceof graphics.SvgRenderEngine) {
                    startpoint.offset(this.xOffset, this.yOffset);
                    endpoint.offset(this.xOffset, this.yOffset);
                    if (fill) {
                        this._render.drawRect(startpoint.x, startpoint.y, endpoint.x - startpoint.x, endpoint.y - startpoint.y, null, { 'fill': typeof (style.background) == 'string' ? style.background : null }, null);
                    }
                    else {
                        this._render.drawRect(startpoint.x, startpoint.y, endpoint.x - startpoint.x, endpoint.y - startpoint.y, null, { 'fill': 'transparent', 'stroke': typeof (style.background) == 'string' ? style.background : null }, null);
                    }
                }
            };
            Canvas.prototype.drawArc = function (rect, startAngle, sweepAngel, style) {
                var cx = (rect.right - rect.left) / 2 + rect.left + this.xOffset;
                var cy = (rect.bottom - rect.top) / 2 + rect.top + this.yOffset;
                var r = (rect.width < rect.height ? rect.width : rect.height) / 2;
                if (this._render instanceof graphics.SvgRenderEngine) {
                    this._render.drawPie(cx, cy, r, Floor(startAngle), Floor(sweepAngel), null, { 'fill': typeof (style.background) == 'string' ? style.background : null });
                }
                else if (this._render instanceof graphics.CanvasRenderEngine) {
                    this._render.drawPie(cx, cy, r, Floor(startAngle), Floor(sweepAngel), style);
                }
            };
            Canvas.prototype.drawDonut = function (cx, cy, radius, innerRadius, startAngle, sweepAngle, style) {
                var _cx = cx + this.xOffset;
                var _cy = cy + this.yOffset;
                if (this._render instanceof graphics.SvgRenderEngine) {
                    this._render.drawDonut(_cx, _cy, radius, innerRadius, Floor(startAngle), Floor(sweepAngle), null, { 'fill': typeof (style.background) == 'string' ? style.background : null });
                }
                else if (this._render instanceof graphics.CanvasRenderEngine) {
                    this._render.drawDonut(_cx, _cy, radius, innerRadius, (startAngle), (sweepAngle), style);
                }
            };
            Canvas.prototype.drawOval = function (rect, color) {
            };
            Object.defineProperty(Canvas.prototype, "alpha", {
                // public alpha :number =0;
                set: function (value) {
                    this._render.alpha = value;
                },
                enumerable: true,
                configurable: true
            });
            Canvas.prototype.drawPolygon = function (xs, ys, style) {
                if (this._render instanceof graphics.SvgRenderEngine) {
                    this._render.drawPolygon(xs, ys, null, { 'fill': typeof (style.background) == 'string' ? style.background : null });
                }
                else if (this._render instanceof graphics.CanvasRenderEngine) {
                    this._render.drawPolygon(xs, ys, style);
                }
            };
            Canvas.prototype.drawImage = function (x, y, w, h) {
                // this._render.drawImage(x, y, w, h);
            };
            Canvas.prototype.getCache = function (sx, sy, sw, sh) {
                // return this._render.getImageData(sx, sy, sw, sh);
                return null;
            };
            Canvas.prototype.setCache = function (imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight) {
                // this._render.putImageData(imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight);
            };
            Canvas.prototype.begin = function () {
                this._render.beginRender();
            };
            Canvas.prototype.end = function () {
                this._render.endRender();
            };
            Canvas.prototype.moveTo = function (x, y) {
                if (this._render instanceof graphics.CanvasRenderEngine) {
                    this._render.moveTo(x, y);
                }
            };
            Canvas.prototype.scale = function (sx, sy) {
                console.log("canvasScale " + sx + " , " + sy);
                if (this._render instanceof graphics.CanvasRenderEngine) {
                    this._render.scale(sx, sy);
                }
            };
            Canvas.prototype.rotate = function (degree) {
                if (this._render instanceof graphics.CanvasRenderEngine) {
                    this._render.rotate(degree);
                }
            };
            Canvas.prototype.translate = function (x, y) {
                this.xOffset = x;
                this.yOffset = y;
                if (this._render instanceof graphics.CanvasRenderEngine) {
                    this._render.translate(x, y);
                }
            };
            Object.defineProperty(Canvas.prototype, "canvas", {
                get: function () {
                    if (this._render instanceof graphics.CanvasRenderEngine) {
                        return this._render.canvas;
                    }
                    else {
                        return null;
                    }
                },
                enumerable: true,
                configurable: true
            });
            return Canvas;
        }());
        graphics.Canvas = Canvas;
    })(graphics = android.graphics || (android.graphics = {}));
})(android || (android = {}));
var android;
(function (android) {
    var app;
    (function (app) {
        var Context = /** @class */ (function () {
            function Context() {
                this._args = {};
            }
            Context.prototype.getArgs = function (name) {
                return this._args[name];
            };
            Context.prototype.setArgs = function (name, value) {
                this._args[name] = value;
            };
            Context.prototype.setComparedAniamtionCache = function (cache) {
                this._args['comparedanimation'] = cache;
            };
            Context.prototype.getComparedAnimationCache = function () {
                return this._args['comparedanimation'];
            };
            Context.prototype.setHandler = function (handler) {
                this._args['handler'] = handler;
            };
            Context.prototype.getHandler = function () {
                return this._args['handler'];
            };
            return Context;
        }());
        app.Context = Context;
    })(app = android.app || (android.app = {}));
})(android || (android = {}));
/// <reference path="../../graphics/util.ts" />
/// <reference path="../../graphics/util.ts" />
/// <reference path="IView.ts" />
var android;
(function (android) {
    var graphics;
    (function (graphics) {
        var Size = /** @class */ (function () {
            function Size(w, h) {
                this.width = w;
                this.height = h;
            }
            Size.prototype.clone = function () {
                return new Size(this.width, this.height);
            };
            Size.prototype.hashCode = function () {
                return this.width * 37213 + this.height;
            };
            return Size;
        }());
        graphics.Size = Size;
    })(graphics = android.graphics || (android.graphics = {}));
})(android || (android = {}));
var android;
(function (android) {
    var graphics;
    (function (graphics) {
        var Margin = /** @class */ (function () {
            function Margin(marginLeft, marginRight, marginTop, marginBottom) {
                this.marginLeft = marginLeft;
                this.marginTop = marginTop;
                this.marginRight = marginRight;
                this.marginBottom = marginBottom;
            }
            Margin.prototype.getStartXMargin = function () {
                if (this.marginRight > 0 && !this.marginLeft) {
                    return -this.marginRight;
                }
                return this.marginLeft;
            };
            Margin.prototype.getStartYMargin = function () {
                if (this.marginBottom > 0 && !this.marginTop) {
                    return -this.marginBottom;
                }
                return this.marginTop;
            };
            return Margin;
        }());
        graphics.Margin = Margin;
    })(graphics = android.graphics || (android.graphics = {}));
})(android || (android = {}));
/// <reference path="../../graphics/Margins.ts" />
/// <reference path="../../graphics/Rect.ts" />
var android;
(function (android) {
    var view;
    (function (view) {
        var Rect = android.graphics.Rect;
        var Padding = android.graphics.Padding;
        var Margin = android.graphics.Margin;
        /***
         * 根据measure 计算出的结果
         */
        var LayoutInfo = /** @class */ (function () {
            function LayoutInfo(l, t, r, b, padding, drawindex) {
                this.outterrect = new Rect(l, t, r, b);
                this.padding = padding;
                this.innerrect = new Rect(this.outterrect.left + padding.leftPadding, this.outterrect.top + padding.topPadding, this.outterrect.right - padding.rightPadding, this.outterrect.bottom - padding.bottomPadding);
                if (drawindex) {
                    this.drawindex = drawindex;
                }
                else {
                    this.drawindex = 0;
                }
            }
            LayoutInfo.prototype.reset = function (l, t, r, b, padding, drawindex) {
                this.outterrect = new Rect(l, t, r, b);
                this.padding = padding;
                this.innerrect = new Rect(this.outterrect.left + padding.leftPadding, this.outterrect.top + padding.topPadding, this.outterrect.right - padding.rightPadding, this.outterrect.bottom - padding.bottomPadding);
                if (drawindex) {
                    this.drawindex = drawindex;
                }
                else {
                    this.drawindex = 0;
                }
            };
            LayoutInfo.prototype.offset = function (x, y) {
                this.innerrect.translate(x, y);
                this.outterrect.translate(x, y);
            };
            LayoutInfo.prototype.clone = function () {
                var info = new LayoutInfo(0, 0, 0, 0, new Padding(0));
                info.drawindex = this.drawindex;
                info.innerrect = this.innerrect.clone();
                info.outterrect = this.outterrect.clone();
                return info;
            };
            LayoutInfo.prototype.equal = function (info) {
                if (info != null) {
                    return info.drawindex === this.drawindex && this.innerrect.equal(info.innerrect) && this.outterrect.equal(info.outterrect);
                }
                return false;
            };
            return LayoutInfo;
        }());
        view.LayoutInfo = LayoutInfo;
        /***
         * 输入的参数
         */
        var LayoutParams = /** @class */ (function () {
            function LayoutParams(width, height, margin) {
                this.margin = new Margin(0, 0, 0, 0); // { 'marginLeft': 0, 'marginRight': 0, 'marginTop': 0, 'marginBottom': 0 };
                this.width = width;
                this.height = height;
                if (margin) {
                    this.margin = margin;
                }
            }
            Object.defineProperty(LayoutParams.prototype, "width", {
                get: function () {
                    if (this._width < 0) {
                        return 0;
                    }
                    return this._width;
                },
                set: function (w) {
                    this._width = w;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LayoutParams.prototype, "widthMode", {
                get: function () {
                    var mode = LayoutParams.EXACTLY;
                    switch (this._width) {
                        case LayoutParams.WRAP_CONTENT:
                            mode = LayoutParams.WRAP_CONTENT;
                            break;
                        case LayoutParams.MATCH_PARENT:
                            mode = LayoutParams.MATCH_PARENT;
                            break;
                        case LayoutParams.EXACTLY:
                        default:
                            mode = LayoutParams.EXACTLY;
                            break;
                    }
                    return mode;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LayoutParams.prototype, "heightMode", {
                get: function () {
                    var mode = LayoutParams.EXACTLY;
                    switch (this._height) {
                        case LayoutParams.WRAP_CONTENT:
                            mode = LayoutParams.WRAP_CONTENT;
                            break;
                        case LayoutParams.MATCH_PARENT:
                            mode = LayoutParams.MATCH_PARENT;
                            break;
                        case LayoutParams.EXACTLY:
                        default:
                            mode = LayoutParams.EXACTLY;
                            break;
                    }
                    return mode;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LayoutParams.prototype, "height", {
                get: function () {
                    if (this._height < 0) {
                        return 0;
                    }
                    return this._height;
                },
                set: function (h) {
                    this._height = h;
                },
                enumerable: true,
                configurable: true
            });
            LayoutParams.MATCH_PARENT = -1;
            LayoutParams.WRAP_CONTENT = -2;
            LayoutParams.EXACTLY = -3;
            return LayoutParams;
        }());
        view.LayoutParams = LayoutParams;
        var MeasureSpec = /** @class */ (function () {
            function MeasureSpec(v, m) {
                this.mode = LayoutParams.EXACTLY;
                if (v !== undefined) {
                    this.value = v;
                }
                if (m !== undefined) {
                    this.mode = m;
                }
            }
            MeasureSpec.prototype.getMeasureValue = function () {
                switch (this.mode) {
                    case LayoutParams.MATCH_PARENT:
                    case LayoutParams.EXACTLY:
                        return this.value;
                    case LayoutParams.WRAP_CONTENT:
                    default:
                        if (this.value) {
                            return this.value;
                        }
                        return LayoutParams.WRAP_CONTENT;
                }
            };
            return MeasureSpec;
        }());
        view.MeasureSpec = MeasureSpec;
    })(view = android.view || (android.view = {}));
})(android || (android = {}));
var android;
(function (android) {
    var view;
    (function (view) {
        var event;
        (function (event) {
            var MotionEvent = /** @class */ (function () {
                function MotionEvent(x, y, action) {
                    this._x = x;
                    this._y = y;
                    this.screenX = x;
                    this.screenY = y;
                    this._action = action;
                }
                Object.defineProperty(MotionEvent.prototype, "x", {
                    get: function () {
                        return this._x;
                    },
                    set: function (v) {
                        this._x = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MotionEvent.prototype, "y", {
                    get: function () {
                        return this._y;
                    },
                    set: function (v) {
                        this._y = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MotionEvent.prototype, "deltaX", {
                    get: function () {
                        return this._deltaX;
                    },
                    set: function (v) {
                        this._deltaX = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MotionEvent.prototype, "deltaY", {
                    get: function () {
                        return this._deltaY;
                    },
                    set: function (v) {
                        this._deltaY = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MotionEvent.prototype, "action", {
                    get: function () {
                        return this._action;
                    },
                    set: function (value) {
                        this._action = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                MotionEvent.prototype.clone = function () {
                    return new MotionEvent(this._x, this._y, this._action);
                };
                MotionEvent.prototype.offset = function (x, y) {
                    this._x += x;
                    this._y += y;
                    this.screenX += x;
                    this.screenY += y;
                };
                MotionEvent.prototype.toString = function () {
                    var delta = (this.deltaX == null ? "" : " , deltaX = " + this.deltaX) + (this.deltaY == null ? "" : " , deltaY = " + this.deltaY);
                    return " x = " + this._x + " , y = " + this._y + delta + " , action = " + this._getaction();
                };
                MotionEvent.prototype._getaction = function () {
                    switch (this._action) {
                        case 0:
                            return "ACTION_OUTSIDE";
                        case 1:
                            return "ACTION_UP";
                        case 2:
                            return "ACTION_MOVE";
                        case 3:
                            return "ACTION_CANCEL";
                        case 4:
                            return "ACTION_OUTSIDE";
                        case 5:
                            return "ACTION_MOUSE_DOWN";
                        case 6:
                            return "ACTION_MOUSE_MOVE";
                        case 7:
                            return "ACTION_MOUSE_UP";
                        case 8:
                            return "ACTION_MOUSE_OVER";
                        case 9:
                            return "ACTION_MOUSE_OUT";
                        case 10:
                            return "ACTION_CLICK";
                        case 11:
                            return "ACTION_MOUSE_ON";
                        case 12:
                            return "ACTION_MOUSE_WHEEL";
                    }
                };
                MotionEvent.ACTION_DOWN = 0;
                MotionEvent.ACTION_UP = 1;
                MotionEvent.ACTION_MOVE = 2;
                MotionEvent.ACTION_CANCEL = 3;
                MotionEvent.ACTION_OUTSIDE = 4;
                MotionEvent.ACTION_MOUSE_DOWN = 5;
                MotionEvent.ACTION_MOUSE_MOVE = 6;
                MotionEvent.ACTION_MOUSE_UP = 7;
                MotionEvent.ACTION_MOUSE_OVER = 8;
                MotionEvent.ACTION_MOUSE_OUT = 9;
                MotionEvent.ACTION_MOUSE_ON = 11;
                MotionEvent.ACTION_CLICK = 10;
                MotionEvent.ACTION_SCROLL = 11;
                MotionEvent.ACTION_MOUSE_WHEEL = 12;
                return MotionEvent;
            }());
            event.MotionEvent = MotionEvent;
        })(event = view.event || (view.event = {}));
    })(view = android.view || (android.view = {}));
})(android || (android = {}));
var android;
(function (android) {
    var view;
    (function (view_1) {
        var animation;
        (function (animation) {
            var AnimationState;
            (function (AnimationState) {
                AnimationState[AnimationState["BeforeStart"] = 0] = "BeforeStart";
                AnimationState[AnimationState["Animating"] = 1] = "Animating";
                AnimationState[AnimationState["End"] = 2] = "End";
            })(AnimationState = animation.AnimationState || (animation.AnimationState = {}));
            var Animating_Proprity = 9999999;
            var Animation = /** @class */ (function () {
                function Animation() {
                    this.duration = 0;
                    this.__oldProprity = 0;
                    this.ease = new animation.AnimationEase();
                    this.start = 0;
                    this.duration = 0;
                    this.type = animation.AnimationType.Alpha;
                    this.from = 1;
                    this.to = 1;
                    this.state = AnimationState.BeforeStart;
                    this.fillAfter = false;
                    this.repeate = false;
                }
                Animation.prototype.setAnimationCallBack = function (onAnimationStart, onAnimationEnd) {
                    this._startCallBack = onAnimationStart;
                    this._endCallBack = onAnimationEnd;
                };
                Object.defineProperty(Animation.prototype, "isAniamtionEnd", {
                    get: function () {
                        // console.log("start " + this.start +" , duration "+this.duration +" , now "+Date.now());
                        return (this.start + this.duration < Date.now()) || this.state == AnimationState.End;
                    },
                    enumerable: true,
                    configurable: true
                });
                Animation.prototype.scale = function (now) {
                    // console.log("ease " +( (now - this.start)/this.duration));
                    return this.ease.ease((now - this.start) / this.duration);
                };
                Animation.prototype.applyTransformation = function (interpolatedTime, canvas, view) {
                    // console.log("applyTransformation "+interpolatedTime + " canvas " + canvas + " View " + view);
                };
                Animation.prototype.onStartAniamtion = function (canvas, view) {
                    this.__oldProprity = view.priority;
                    // console.log("onStartAniamtion "+view.id);
                    view.priority = Animating_Proprity;
                    if (this._startCallBack) {
                        this._startCallBack(view);
                    }
                };
                Animation.prototype.onEndAnimation = function (canvas, view) {
                    view.priority = this.__oldProprity;
                    if (this._endCallBack) {
                        this._endCallBack(view);
                    }
                };
                Animation.prototype.__onInneranimationEnd = function (canvas, view) { };
                return Animation;
            }());
            animation.Animation = Animation;
        })(animation = view_1.animation || (view_1.animation = {}));
    })(view = android.view || (android.view = {}));
})(android || (android = {}));
var android;
(function (android) {
    var view;
    (function (view) {
        var animation;
        (function (animation) {
            var AnimationEase = /** @class */ (function () {
                function AnimationEase() {
                }
                AnimationEase.prototype.ease = function (t) {
                    return t;
                };
                return AnimationEase;
            }());
            animation.AnimationEase = AnimationEase;
            var BounceAnimationEase = /** @class */ (function (_super) {
                __extends(BounceAnimationEase, _super);
                function BounceAnimationEase() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                BounceAnimationEase.prototype.ease = function (t) {
                    var b1 = 4 / 11, b2 = 6 / 11, b3 = 8 / 11, b4 = 3 / 4, b5 = 9 / 11, b6 = 10 / 11, b7 = 15 / 16, b8 = 21 / 22, b9 = 63 / 64, b0 = 1 / b1 / b1;
                    return (t = +t) < b1 ? b0 * t * t : t < b3 ? b0 * (t -= b2) * t + b4 : t < b6 ? b0 * (t -= b5) * t + b7 : b0 * (t -= b8) * t + b9;
                };
                return BounceAnimationEase;
            }(AnimationEase));
            animation.BounceAnimationEase = BounceAnimationEase;
            var SinAnimationEase = /** @class */ (function (_super) {
                __extends(SinAnimationEase, _super);
                function SinAnimationEase() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                SinAnimationEase.prototype.ease = function (t) {
                    var pi = Math.PI, halfPi = pi / 2;
                    return Math.sin(t * halfPi);
                };
                return SinAnimationEase;
            }(AnimationEase));
            animation.SinAnimationEase = SinAnimationEase;
            var QuadAnimationEase = /** @class */ (function (_super) {
                __extends(QuadAnimationEase, _super);
                function QuadAnimationEase() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                QuadAnimationEase.prototype.ease = function (t) {
                    return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;
                };
                return QuadAnimationEase;
            }(AnimationEase));
            animation.QuadAnimationEase = QuadAnimationEase;
        })(animation = view.animation || (view.animation = {}));
    })(view = android.view || (android.view = {}));
})(android || (android = {}));
/// <reference path="../../graphics/Size.ts" />
/// <reference path="../interface/IView.ts" />
/// <reference path="./LayoutInfo.ts" />
/// <reference path="../event/MotionEvent.ts" />
/// <reference path="../../util/Log.ts" />
/// <reference path="../animation/Animation.ts" />
/// <reference path="../animation/AnimationEase.ts" />
var android;
(function (android) {
    var view;
    (function (view_2) {
        var Padding = android.graphics.Padding;
        var Size = android.graphics.Size;
        var Gravity = android.graphics.Gravity;
        var Default = android.device.Default;
        var AnimationState = android.view.animation.AnimationState;
        // public static  VISIABLE :number= 1; 
        // public static  INVISIABLE :number = -1;
        // public static  GONE :number = 0;
        var ViewState;
        (function (ViewState) {
            ViewState[ViewState["Visiable"] = 0] = "Visiable";
            ViewState[ViewState["InVisiable"] = 1] = "InVisiable";
            ViewState[ViewState["Gone"] = 2] = "Gone";
        })(ViewState = view_2.ViewState || (view_2.ViewState = {}));
        var View = /** @class */ (function () {
            function View(context) {
                this.id = "";
                this._padding = new Padding();
                this.priority = 0;
                this.layoutParams = new view_2.LayoutParams(0, 0, null);
                this._parent = null;
                this._drawingTime = 0;
                this.alpha = 1;
                this.offsetleft = 0;
                this.offsettop = 0;
                this.visiable = ViewState.Visiable;
                this._context = context;
                // Debug.assert(this._context != null,'Context can not be null');
                this._gravity = Gravity.Left;
                this._background = Default.style;
                this._background.background = 'transparent';
                this._background.strokeStyle.strokeColor = 'transparent';
                this._background.strokeStyle.strokeWidth = 0;
                this.id = Math.random() * 10000000 + "";
                this._animationList = [];
                this._layoutInfo = new view_2.LayoutInfo(0, 0, 0, 0, this.padding, 0);
                this._oldLayoutInfo = this.layoutInfo.clone();
            }
            View.prototype.getContext = function () {
                return this._context;
            };
            /**
             * may be called for serval times
             */
            View.prototype.onMeasure = function (width, height, canvas) {
                // this._layoutInfo = new LayoutInfo(0, 0, 0, 0, this.padding, 0);
                this._layoutInfo.reset(0, 0, 0, 0, this.padding, 0);
                var w = this.layoutParams.width;
                var h = this.layoutParams.height;
                var size = new Size(w, h);
                var widthmode = this.layoutParams.widthMode;
                var heightmode = this.layoutParams.heightMode;
                if (widthmode === view_2.LayoutParams.MATCH_PARENT) {
                    size.width = width.value;
                }
                if (heightmode === view_2.LayoutParams.MATCH_PARENT) {
                    size.height = height.value;
                }
                this.setMeasuredDimension(new view_2.MeasureSpec(size.width, view_2.LayoutParams.EXACTLY), new view_2.MeasureSpec(size.height, view_2.LayoutParams.EXACTLY));
                return size;
            };
            View.prototype.getDrawingTime = function () {
                if (this.parent != null) {
                    return this._drawingTime;
                }
                else {
                    return Date.now();
                }
            };
            View.prototype.setDrawingTime = function (value) {
                this._drawingTime = value;
            };
            View.prototype.onLayout = function (l, t, r, b, canvas) {
                this.layoutInfo.reset(l + this.offsetleft, t + this.offsettop, r + this.offsetleft, b + this.offsettop, this.padding, 0);
                if (this.layoutInfo != null) {
                    this._oldLayoutInfo = this.layoutInfo.clone();
                }
            };
            View.prototype.islayoutChanged = function () {
                return !this.layoutInfo.equal(this._oldLayoutInfo);
            };
            View.prototype.onDraw = function (canvas) {
                if (this.visiable != ViewState.Visiable) {
                    return;
                }
                this._canvas = canvas;
                if (this.background) {
                    canvas.drawRect(this._layoutInfo.outterrect.startPoint, this._layoutInfo.outterrect.endPoint, true, this.background);
                }
            };
            View.prototype.setMeasuredDimension = function (width, height) {
                this._width = width;
                this._height = height;
            };
            View.prototype.onTouchEvent = function (event) {
                return false;
            };
            View.prototype.onMouseEvent = function (event) {
                return false;
            };
            View.prototype.trace = function (x, y) {
                return this.layoutInfo.outterrect.contains(x, y);
            };
            View.prototype.invalidate = function (force) {
                force = true;
                if (force) {
                    if (this.parent) {
                        this.parent.invalidate(force);
                    }
                    else {
                        this.oninvalidate();
                    }
                }
                else {
                    this.parent.invalidateChild(this, this.layoutInfo.outterrect);
                    this.oninvalidate();
                }
            };
            View.prototype.getRootView = function () {
                if (this.parent != null) {
                    var parent_1 = this.parent;
                    // do {
                    //     parent = parent.parent;
                    // } while (parent.parent != null)
                    while (parent_1.parent != null) {
                        parent_1 = parent_1.parent;
                    }
                    return parent_1;
                }
                return this;
            };
            View.prototype.oninvalidate = function () {
            };
            View.prototype.requestLayout = function () {
                if (this.parent) {
                    this.parent.requestLayout();
                }
            };
            View.prototype.startAnimation = function (animation) {
                var _this = this;
                if (this.animation == null || this.animation.isAniamtionEnd) {
                    this.animation = animation;
                    if (this.animation != null) {
                        this.getRootView().startAnimation(animation);
                        this.animation.__onInneranimationEnd = function (canvas, view) {
                            if (_this.animation.repeate) {
                                _this.animation.start = 0;
                                _this.animation.state = AnimationState.BeforeStart;
                                _this.startAnimation(_this.animation);
                            }
                        };
                    }
                }
                else {
                    this._animationList.push(animation);
                    this.animation.__onInneranimationEnd = function (canvas, view) {
                        if (_this._animationList.length > 0) {
                            var curranimation = _this._animationList.pop();
                            _this.startAnimation(curranimation);
                        }
                    };
                }
            };
            View.prototype.cleanAnimation = function () {
                if (this.animation != null) {
                    this.animation.repeate = false;
                    this.animation.state = AnimationState.End;
                }
                this._animationList.length = 0;
            };
            View.prototype.setParent = function (p) {
                this._parent = p;
            };
            View.prototype.offset = function (left, top) {
                this.offsetleft += left;
                this.offsettop += top;
                if (isNaN(left) || isNaN(this.offsetleft)) {
                    console.log("offset error");
                    throw "offset error ";
                }
                console.log("offset " + top);
                // this.layoutInfo.offset(left,top);
            };
            Object.defineProperty(View.prototype, "parent", {
                get: function () {
                    return this._parent;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(View.prototype, "width", {
                get: function () {
                    return this._width.getMeasureValue();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(View.prototype, "height", {
                get: function () {
                    return this._height.getMeasureValue();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(View.prototype, "padding", {
                get: function () {
                    return this._padding;
                },
                set: function (padding) {
                    this._padding = padding;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(View.prototype, "left", {
                get: function () {
                    return this._layoutInfo.outterrect.left;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(View.prototype, "top", {
                get: function () {
                    return this._layoutInfo.outterrect.top;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(View.prototype, "right", {
                get: function () {
                    return this._layoutInfo.outterrect.right;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(View.prototype, "bottom", {
                get: function () {
                    return this._layoutInfo.outterrect.bottom;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(View.prototype, "background", {
                get: function () {
                    return this._background;
                },
                set: function (background) {
                    this._background = background;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(View.prototype, "layoutInfo", {
                get: function () {
                    if (!this._layoutInfo) {
                        this._layoutInfo = new view_2.LayoutInfo(0, 0, 0, 0, this.padding, 0);
                    }
                    return this._layoutInfo;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(View.prototype, "gravity", {
                get: function () {
                    return this._gravity;
                },
                set: function (gravity) {
                    this._gravity = gravity;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(View.prototype, "clip", {
                get: function () {
                    return this._clip;
                },
                set: function (value) {
                    this._clip = value;
                },
                enumerable: true,
                configurable: true
            });
            return View;
        }());
        view_2.View = View;
    })(view = android.view || (android.view = {}));
})(android || (android = {}));
/// <reference path="../../graphics/Util.ts" />
/// <reference path="../interface/IViewGroup.ts" />
/// <reference path="View.ts" />
var android;
(function (android) {
    var view;
    (function (view_3) {
        var Size = android.graphics.Size;
        var MotionEvent = android.view.event.MotionEvent;
        var Util = android.graphics.Util;
        var AnimationState = android.view.animation.AnimationState;
        var ViewGroup = /** @class */ (function (_super) {
            __extends(ViewGroup, _super);
            function ViewGroup() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.children = new Array();
                _this._mCurrentTouchTarget = null;
                _this._isIntercept = false;
                _this.lastInterceptEvent = [];
                return _this;
                // public dispatchMouseEvent(event: MotionEvent): boolean {
                //     if (!this._mCurrentTouchTarget || this._mCurrentTouchTarget instanceof ViewGroup) {
                //         let result: boolean = false;
                //         switch (event.action) {
                //             case MotionEvent.ACTION_MOUSE_DOWN:
                //                 if (!this._mCurrentTouchTarget) {
                //                     for (let i = 0; this.children && i < this.children.length; ++i) {
                //                         let child: View = this.children[i];
                //                         if (child) {
                //                             if (child.layoutInfo.outterrect.contains(event.x, event.y)) {
                //                                 this._mCurrentTouchTarget = child;
                //                             }
                //                         }
                //                     }
                //                 }
                //                 if (!this._mCurrentTouchTarget) {
                //                     return true;
                //                 }
                //                 if (!(this._mCurrentTouchTarget instanceof ViewGroup)) {
                //                     result = true;
                //                 } else {
                //                     result = this._mCurrentTouchTarget.onInterceptMouseEvent(event);
                //                 }
                //                 if (result) {
                //                     this._mCurrentTouchTarget.onMouseEvent(event);
                //                     this._isIntercept = result;
                //                     return true;
                //                 } else {
                //                     this.lastInterceptEvent.push(event.clone());//记录down时候的event
                //                     return false;
                //                 }
                //             case MotionEvent.ACTION_MOUSE_MOVE:
                //                 if (this._mCurrentTouchTarget) {
                //                     if (this._isIntercept) {
                //                         this._mCurrentTouchTarget.onMouseEvent(event);
                //                         return true;
                //                     }
                //                     if (!(this._mCurrentTouchTarget instanceof ViewGroup)) {
                //                         result = true;
                //                     } else {
                //                         result = this._mCurrentTouchTarget.onInterceptMouseEvent(event);
                //                     }
                //                     if (result) {
                //                         this._isIntercept = result;
                //                         this.lastInterceptEvent.forEach(e => {
                //                             this._mCurrentTouchTarget.onMouseEvent(e);
                //                         });
                //                         this.lastInterceptEvent.length = 0;
                //                         this._mCurrentTouchTarget.onMouseEvent(event);
                //                         return true;
                //                     } else {
                //                         this.lastInterceptEvent.forEach(e => {
                //                             if (this._mCurrentTouchTarget instanceof ViewGroup) {
                //                                 this._mCurrentTouchTarget.dispatchMouseEvent(e);
                //                             }
                //                         });
                //                         this.lastInterceptEvent.length = 0;
                //                         if (this._mCurrentTouchTarget instanceof ViewGroup) {
                //                             return this._mCurrentTouchTarget.dispatchMouseEvent(event);
                //                         } else {
                //                             return false;
                //                         }
                //                     }
                //                 }
                //             case MotionEvent.ACTION_MOUSE_OUT:
                //             case MotionEvent.ACTION_MOUSE_UP:
                //                 if (this._mCurrentTouchTarget) {
                //                     this.lastInterceptEvent.forEach(e => {
                //                         if (this._isIntercept) {
                //                             this._mCurrentTouchTarget.onMouseEvent(e);
                //                         } else {
                //                             this._mCurrentTouchTarget.dispatchMouseEvent(e);
                //                         }
                //                     });
                //                     if (this._isIntercept) {
                //                         this._mCurrentTouchTarget.onMouseEvent(event);
                //                         result = true;
                //                     } else {
                //                         result = this._mCurrentTouchTarget.dispatchMouseEvent(event);
                //                     }
                //                     this._mCurrentTouchTarget = null;
                //                     this.lastInterceptEvent.length = 0;
                //                     this._isIntercept = false;
                //                     return result;
                //                 }
                //         }
                //     }
                //     return false;
                // }
            }
            ViewGroup.prototype.dispatchDraw = function (canvas) {
                var item;
                for (var i = 0; i < this.children.length; ++i) {
                    item = this.children[i];
                    item.setDrawingTime(this.getDrawingTime());
                    if (item.visiable != view_3.ViewState.Visiable) {
                        continue;
                    }
                    if (item.clip === undefined) {
                        item.clip = this.clip;
                    }
                    if (item.clip === true || item.clip === undefined) {
                        canvas.save();
                        canvas.clip(item.layoutInfo.outterrect);
                        this.drawChild(canvas, item);
                        canvas.restore();
                    }
                    else {
                        this.drawChild(canvas, item);
                    }
                }
            };
            ViewGroup.prototype.drawChild = function (canvas, view) {
                // if (Util.isMixed(view.layoutInfo.innerrect, this.layoutInfo.innerrect)) {
                if (view.animation != null && !view.animation.isAniamtionEnd) {
                    canvas.save();
                    if (view.animation.state === AnimationState.BeforeStart) {
                        view._layoutInfo = view._oldLayoutInfo.clone();
                        view.animation.onStartAniamtion(canvas, view);
                        view.animation.state = AnimationState.Animating;
                    }
                    view.animation.applyTransformation(view.animation.scale(this.getDrawingTime()), canvas, view);
                    if (view.alpha != null) {
                        canvas.alpha = view.alpha;
                    }
                    view.onDraw(canvas);
                    if (view instanceof ViewGroup) {
                        view.dispatchDraw(canvas);
                    }
                    canvas.restore();
                }
                else {
                    if (view.animation != null && view.animation.isAniamtionEnd && view.animation.state != AnimationState.End) {
                        view.animation.state = AnimationState.End;
                        view.animation.onEndAnimation(canvas, view);
                        if (!view.animation.fillAfter) {
                            view._layoutInfo = view._oldLayoutInfo.clone();
                        }
                        view.animation.__onInneranimationEnd(canvas, view);
                    }
                    if (view.alpha != null) {
                        canvas.alpha = view.alpha;
                    }
                    view.onDraw(canvas);
                    if (view instanceof ViewGroup) {
                        view.dispatchDraw(canvas);
                    }
                }
                // }
            };
            ViewGroup.prototype.cleanAnimation = function () {
                _super.prototype.cleanAnimation.call(this);
                for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                    var view_4 = _a[_i];
                    view_4.cleanAnimation();
                }
            };
            ViewGroup.prototype.oninvalidate = function () {
                for (var i = 0; i < this.children.length; ++i) {
                    this.children[i].oninvalidate();
                }
            };
            ViewGroup.prototype.invalidateChild = function (child, dirty) {
                if (Util.containsRect(this.layoutInfo.outterrect, dirty)) {
                    var newdirty = Util.union(dirty, this.layoutInfo.outterrect);
                    this.parent.invalidateChild(this, newdirty);
                    this.oninvalidate();
                }
                else {
                    this.dispatchDraw(this._canvas);
                }
            };
            ViewGroup.prototype.getChildCount = function () {
                return this.children.length;
            };
            ViewGroup.prototype.getChildAt = function (index) {
                return this.children[index];
            };
            ViewGroup.prototype.getSortViews = function () {
                return this.children;
            };
            ViewGroup.prototype.onLayout = function (l, t, r, b, canvas) {
                _super.prototype.onLayout.call(this, l, t, r, b, canvas);
            };
            ViewGroup.prototype.onMeasure = function (width, height, canvas) {
                var maxSize;
                // return super.onMeasure(width,height,canvas);
                for (var i = 0; i < this.children.length; ++i) {
                    var item = this.children[i];
                    var lp = item.layoutParams;
                    var w = lp.width;
                    var h = lp.height;
                    //TO DO...
                    if (lp.heightMode === view_3.LayoutParams.MATCH_PARENT) {
                        h = height.value - item.layoutParams.margin.marginTop - item.layoutParams.margin.marginBottom - this.padding.topPadding - this.padding.bottomPadding;
                    }
                    if (lp.widthMode === view_3.LayoutParams.MATCH_PARENT) {
                        w = width.value - item.layoutParams.margin.marginLeft - item.layoutParams.margin.marginRight - this.padding.leftPadding - this.padding.rightPadding;
                    }
                    var size = item.onMeasure(new view_3.MeasureSpec(w, lp.widthMode), new view_3.MeasureSpec(h, lp.heightMode), canvas);
                    if (item.visiable === view_3.ViewState.Gone) {
                        size = new Size(0, 0);
                    }
                    if (maxSize) {
                        if (maxSize.width < size.width) {
                            maxSize.width = size.width;
                        }
                        if (maxSize.height < size.height) {
                            maxSize.height = size.height;
                        }
                    }
                    else {
                        maxSize = size;
                    }
                }
                if (!maxSize) {
                    maxSize = new Size(0, 0);
                }
                if (this.layoutParams.widthMode === view_3.LayoutParams.EXACTLY) {
                    maxSize.width = this.layoutParams.width;
                }
                else if (this.layoutParams.widthMode === view_3.LayoutParams.MATCH_PARENT) {
                    maxSize.width = width.getMeasureValue();
                }
                if (this.layoutParams.heightMode === view_3.LayoutParams.EXACTLY) {
                    maxSize.height = this.layoutParams.height;
                }
                else if (this.layoutParams.heightMode === view_3.LayoutParams.MATCH_PARENT) {
                    maxSize.height = height.getMeasureValue();
                }
                this.setMeasuredDimension(new view_3.MeasureSpec(maxSize.width, view_3.LayoutParams.EXACTLY), new view_3.MeasureSpec(maxSize.height, view_3.LayoutParams.EXACTLY));
                return maxSize;
            };
            ViewGroup.prototype.addView = function (view, index, layoutParams) {
                if (index === void 0) { index = 0; }
                if (layoutParams === void 0) { layoutParams = null; }
                this.addViewWithOutReLayout(view, index, layoutParams);
                this.requestLayout();
                return index;
            };
            ViewGroup.prototype.notifyDrawOrderChanged = function () {
                this.children.sort(function (a, b) {
                    return a.priority - b.priority;
                });
            };
            ViewGroup.prototype.addViewWithOutReLayout = function (view, index, layoutParams) {
                if (index === void 0) { index = 0; }
                if (layoutParams === void 0) { layoutParams = null; }
                this.children.push(view);
                // this.children.sort((a: View, b: View) => {
                //     return a.priority - b.priority;
                // });
                this.notifyDrawOrderChanged();
                if (index !== undefined && index !== null && index >= 0) {
                    view.layoutInfo.drawindex = index;
                }
                else {
                    view.layoutInfo.drawindex = this.children.length - 1;
                }
                if (layoutParams != null) {
                    view.layoutParams = layoutParams;
                }
                view.setParent(this);
                return index;
            };
            ViewGroup.prototype.removeAllViews = function () {
                this.children.length = 0;
            };
            ViewGroup.prototype.removeView = function (view) {
                var index = this.children.indexOf(view);
                this.children.splice(index, 1);
                view.setParent(null);
            };
            ViewGroup.prototype.onInterceptTouchEvent = function (event) {
                return false;
            };
            ViewGroup.prototype.dispatchTouchEvent = function (event) {
                var _this = this;
                if (!this._mCurrentTouchTarget || this._mCurrentTouchTarget instanceof ViewGroup) {
                    var result = false;
                    switch (event.action) {
                        case MotionEvent.ACTION_DOWN:
                            if (!this._mCurrentTouchTarget) {
                                for (var i = 0; this.children && i < this.children.length; ++i) {
                                    var child = this.children[i];
                                    if (child) {
                                        if (child.layoutInfo.outterrect.contains(event.x, event.y)) {
                                            this._mCurrentTouchTarget = child;
                                        }
                                    }
                                }
                            }
                            if (!this._mCurrentTouchTarget) {
                                return true;
                            }
                            if (!(this._mCurrentTouchTarget instanceof ViewGroup)) {
                                result = true;
                            }
                            else {
                                result = this._mCurrentTouchTarget.onInterceptTouchEvent(event);
                            }
                            if (result) {
                                this._mCurrentTouchTarget.onTouchEvent(event);
                                this._isIntercept = result;
                                return true;
                            }
                            else {
                                this.lastInterceptEvent.push(event.clone()); //记录down时候的event
                                return false;
                            }
                        case MotionEvent.ACTION_MOVE:
                            if (this._mCurrentTouchTarget) {
                                if (this._isIntercept) {
                                    this._mCurrentTouchTarget.onTouchEvent(event);
                                    return true;
                                }
                                if (!(this._mCurrentTouchTarget instanceof ViewGroup)) {
                                    result = true;
                                }
                                else {
                                    result = this._mCurrentTouchTarget.onInterceptTouchEvent(event);
                                }
                                if (result) {
                                    this._isIntercept = result;
                                    this.lastInterceptEvent.forEach(function (e) {
                                        _this._mCurrentTouchTarget.onTouchEvent(e);
                                    });
                                    this.lastInterceptEvent.length = 0;
                                    this._mCurrentTouchTarget.onTouchEvent(event);
                                    return true;
                                }
                                else {
                                    this.lastInterceptEvent.forEach(function (e) {
                                        if (_this._mCurrentTouchTarget instanceof ViewGroup) {
                                            _this._mCurrentTouchTarget.dispatchTouchEvent(e);
                                        }
                                    });
                                    this.lastInterceptEvent.length = 0;
                                    if (this._mCurrentTouchTarget instanceof ViewGroup) {
                                        return this._mCurrentTouchTarget.dispatchTouchEvent(event);
                                    }
                                    else {
                                        return false;
                                    }
                                }
                            }
                        case MotionEvent.ACTION_UP:
                        case MotionEvent.ACTION_CANCEL:
                            if (this._mCurrentTouchTarget) {
                                this.lastInterceptEvent.forEach(function (e) {
                                    if (_this._isIntercept) {
                                        _this._mCurrentTouchTarget.onTouchEvent(e);
                                    }
                                    else {
                                        _this._mCurrentTouchTarget.dispatchTouchEvent(e);
                                    }
                                });
                                if (this._isIntercept) {
                                    this._mCurrentTouchTarget.onTouchEvent(event);
                                    result = true;
                                }
                                else {
                                    result = this._mCurrentTouchTarget.dispatchTouchEvent(event);
                                }
                                this._mCurrentTouchTarget = null;
                                this.lastInterceptEvent.length = 0;
                                this._isIntercept = false;
                                return result;
                            }
                    }
                }
                return false;
            };
            ViewGroup.prototype.onInterceptMouseEvent = function (event) {
                return false;
            };
            ViewGroup.prototype.onMouseEvent = function (event) {
                return false;
            };
            ViewGroup.prototype.dispatchMouseEvent = function (event) {
                if (event.action === MotionEvent.ACTION_MOUSE_OUT || event.action === MotionEvent.ACTION_MOUSE_UP) {
                    if (this._mCurrentTouchTarget != null) {
                        var out_event = event.clone();
                        out_event.action = MotionEvent.ACTION_MOUSE_OUT;
                        if (this._mCurrentTouchTarget instanceof ViewGroup) {
                            if (this._mCurrentTouchTarget.onInterceptMouseEvent(out_event)) {
                                this._mCurrentTouchTarget.onMouseEvent(out_event);
                            }
                            else {
                                this._mCurrentTouchTarget.dispatchMouseEvent(out_event);
                            }
                        }
                        else {
                            this._mCurrentTouchTarget.onMouseEvent(out_event);
                        }
                        this._isIntercept = false;
                    }
                    this._mCurrentTouchTarget = null;
                }
                if (this._mCurrentTouchTarget == null) {
                    this._isIntercept = false;
                    for (var i = 0; this.children && i < this.children.length; ++i) {
                        var child = this.children[i];
                        if (child) {
                            if (child.trace(event.x, event.y)) {
                                this._mCurrentTouchTarget = child;
                            }
                        }
                    }
                    if (this._mCurrentTouchTarget != null) {
                        var on_event = event.clone();
                        on_event.action = MotionEvent.ACTION_MOUSE_ON;
                        if (!(this._mCurrentTouchTarget instanceof ViewGroup)) {
                            return this._mCurrentTouchTarget.onMouseEvent(on_event);
                        }
                        if (this._mCurrentTouchTarget.onInterceptMouseEvent(on_event)) {
                            return this._mCurrentTouchTarget.onMouseEvent(on_event);
                        }
                        else {
                            return this._mCurrentTouchTarget.dispatchMouseEvent(on_event);
                        }
                    }
                }
                else {
                    if (!this._mCurrentTouchTarget.trace(event.x, event.y)) {
                        var out_event = event.clone();
                        out_event.action = MotionEvent.ACTION_MOUSE_OUT;
                        var flg = false; // this._mCurrentTouchTarget.onMouseEvent(out_event);
                        if (this._mCurrentTouchTarget instanceof ViewGroup) {
                            if (this._mCurrentTouchTarget.onInterceptMouseEvent(out_event)) {
                                flg = this._mCurrentTouchTarget.onMouseEvent(out_event);
                            }
                            else {
                                flg = this._mCurrentTouchTarget.dispatchMouseEvent(out_event);
                            }
                        }
                        else {
                            flg = this._mCurrentTouchTarget.onMouseEvent(out_event);
                        }
                        this._mCurrentTouchTarget = null;
                        return flg;
                    }
                }
                if (this._mCurrentTouchTarget == null) {
                    return this.onMouseEvent(event);
                }
                if (!(this._mCurrentTouchTarget instanceof ViewGroup)) {
                    return this._mCurrentTouchTarget.onMouseEvent(event);
                }
                if (this._mCurrentTouchTarget.onInterceptMouseEvent(event)) {
                    return this._mCurrentTouchTarget.onMouseEvent(event);
                }
                else {
                    return this._mCurrentTouchTarget.dispatchMouseEvent(event);
                }
            };
            return ViewGroup;
        }(view_3.View));
        view_3.ViewGroup = ViewGroup;
    })(view = android.view || (android.view = {}));
})(android || (android = {}));
/// <reference path="../view/implemention/ViewGroup.ts" />
/// <reference path="../graphics/Util.ts" />
var android;
(function (android) {
    var widget;
    (function (widget) {
        var Gravity = android.graphics.Gravity;
        var ViewGroup = android.view.ViewGroup;
        var Point = android.graphics.Point;
        var FrameLayout = /** @class */ (function (_super) {
            __extends(FrameLayout, _super);
            function FrameLayout() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            FrameLayout.prototype.onMeasure = function (width, height, canvas) {
                return _super.prototype.onMeasure.call(this, width, height, canvas);
            };
            FrameLayout.prototype.onLayout = function (l, t, r, b, canvas) {
                // this.layoutInfo.reset(l, t, r, b, this.padding, 0);
                _super.prototype.onLayout.call(this, l, t, r, b, canvas);
                var viewItem;
                var length = this.children.length;
                for (var i = 0; i < length; ++i) {
                    viewItem = this.children[i];
                    this.layoutItem(viewItem, l, t, r, b, canvas);
                }
            };
            FrameLayout.prototype.layoutItem = function (viewItem, l, t, r, b, canvas) {
                var point = new Point(this.layoutInfo.innerrect.left, this.layoutInfo.innerrect.top);
                var innerrect = this.layoutInfo.innerrect;
                var length = this.children.length;
                var m = viewItem.layoutParams.margin;
                switch (viewItem.gravity) {
                    case Gravity.Left:
                        point.set(innerrect.left, innerrect.top);
                        point.offset(m.marginLeft, m.marginTop);
                        break;
                    case Gravity.Auto:
                        point.set(innerrect.left, innerrect.top);
                        break;
                    case Gravity.Right:
                        point.set(innerrect.right - viewItem.width, innerrect.top);
                        point.offset(-m.marginRight, m.marginTop);
                        break;
                    case Gravity.Top:
                        point.set(innerrect.left, innerrect.top);
                        point.offset(m.marginLeft, m.marginTop);
                        break;
                    case Gravity.Bottom:
                        point.set(innerrect.left, innerrect.bottom - viewItem.height);
                        point.offset(m.marginLeft, -m.marginBottom);
                        break;
                    case Gravity.Center:
                        var tmpl = innerrect.left + (this.layoutInfo.innerrect.width - viewItem.width) / 2;
                        var tmpt = innerrect.top + (this.layoutInfo.innerrect.height - viewItem.height) / 2;
                        if (tmpl < 0) {
                            tmpl = 0;
                        }
                        if (tmpt < 0) {
                            tmpt = 0;
                        }
                        point.set(tmpl, tmpt);
                        break;
                }
                // point.offset(m.getStartXMargin(), m.getStartYMargin());
                // point.offset(m.marginLeft,m.marginRight)
                viewItem.onLayout(point.x, point.y, point.x + viewItem.width, point.y + viewItem.height, canvas);
            };
            return FrameLayout;
        }(ViewGroup));
        widget.FrameLayout = FrameLayout;
    })(widget = android.widget || (android.widget = {}));
})(android || (android = {}));
/// <reference path="Context.ts" />
/// <reference path="../widget/FrameLayout.ts" />
/// <reference path="../util/Log.ts" />
var android;
(function (android) {
    var app;
    (function (app) {
        var LayoutParams = android.view.LayoutParams;
        var FrameLayout = android.widget.FrameLayout;
        var Log = android.util.Log;
        var Activity = /** @class */ (function (_super) {
            __extends(Activity, _super);
            function Activity(am) {
                var _this = _super.call(this) || this;
                if (am instanceof app.ActivityManager) {
                    _this.activityManager = am;
                }
                else {
                    throw "can't create Activity new ";
                }
                _this.rootView = new FrameLayout(_this);
                var lp = new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT, null);
                _this.rootView.layoutParams = lp;
                return _this;
                // this.rootView.background = 'lightblue';
            }
            Activity.prototype.attatchRootView = function (view) {
                view.addView(this.rootView, 0);
            };
            Activity.prototype.onCreate = function (bundle) {
                Log.d("oncreate");
            };
            Activity.prototype.onPause = function () {
                Log.d("onPause");
            };
            Activity.prototype.onResume = function () {
                Log.d('onResume');
            };
            Activity.prototype.onDestory = function () {
                Log.d('onDestory');
            };
            Activity.prototype.setContentView = function (view) {
                this.rootView.addView(view, 0);
            };
            Activity.prototype.startActivityForResult = function (intent, bundle, requestCode, resultCode) {
                this.activityManager.sendStartActivity(intent, bundle, requestCode, resultCode);
            };
            return Activity;
        }(app.Context));
        app.Activity = Activity;
    })(app = android.app || (android.app = {}));
})(android || (android = {}));
var android;
(function (android) {
    var graphics;
    (function (graphics) {
        var Align;
        (function (Align) {
            Align[Align["LEFT"] = 0] = "LEFT";
            /**
             * The text is drawn centered horizontally on the x,y origin
             */
            Align[Align["CENTER"] = 1] = "CENTER";
            /**
             * The text is drawn to the left of the x,y origin
             */
            Align[Align["RIGHT"] = 2] = "RIGHT";
        })(Align = graphics.Align || (graphics.Align = {}));
    })(graphics = android.graphics || (android.graphics = {}));
})(android || (android = {}));
var android;
(function (android) {
    var graphics;
    (function (graphics) {
        var AlignElement = /** @class */ (function () {
            function AlignElement(position, element) {
                this.position = position;
                this.element = element;
            }
            return AlignElement;
        }());
        graphics.AlignElement = AlignElement;
    })(graphics = android.graphics || (android.graphics = {}));
})(android || (android = {}));
var android;
(function (android) {
    var view;
    (function (view_5) {
        var animation;
        (function (animation) {
            var AlphaAnimation = /** @class */ (function (_super) {
                __extends(AlphaAnimation, _super);
                function AlphaAnimation() {
                    var _this = _super.call(this) || this;
                    _this.alpha = null;
                    _this.oldAlpha = null;
                    _this.ease = new android.view.animation.AnimationEase();
                    return _this;
                }
                AlphaAnimation.prototype.applyTransformation = function (interpolatedTime, canvas, view) {
                    var scale = this.from + (this.to - this.from) * interpolatedTime;
                    view.alpha = this.alpha * scale;
                };
                AlphaAnimation.prototype.onStartAniamtion = function (canvas, view) {
                    _super.prototype.onStartAniamtion.call(this, canvas, view);
                    this.alpha = this.oldAlpha = view.alpha;
                };
                AlphaAnimation.prototype.onEndAnimation = function (canvas, view) {
                    _super.prototype.onEndAnimation.call(this, canvas, view);
                    view.alpha = this.alpha = this.oldAlpha;
                };
                return AlphaAnimation;
            }(animation.Animation));
            animation.AlphaAnimation = AlphaAnimation;
        })(animation = view_5.animation || (view_5.animation = {}));
    })(view = android.view || (android.view = {}));
})(android || (android = {}));
/// <reference path="./AlphaAnimation.ts" />
var android;
(function (android) {
    'use strict';
    var AlphaAnimation = android.view.animation.AlphaAnimation;
    var ComparedAnimationCache = /** @class */ (function () {
        function ComparedAnimationCache() {
            this.__prepare = false;
            this._cache = {};
        }
        ComparedAnimationCache.prototype.getPreparing = function () {
            var p = this.__prepare;
            this.__prepare = false;
            console.log("getPreparing   " + p);
            return p;
        };
        ComparedAnimationCache.prototype.preparing = function () {
            this.__prepare = true;
            console.log('preparing ' + this.__prepare);
        };
        Object.defineProperty(ComparedAnimationCache.prototype, "isempty", {
            get: function () {
                var index = 0;
                for (var key in this._cache) {
                    index++;
                    if (index > 0) {
                        return false;
                    }
                }
                return true;
            },
            enumerable: true,
            configurable: true
        });
        ComparedAnimationCache.prototype.resetCache = function (views) {
            this._cache = {};
            for (var _i = 0, views_1 = views; _i < views_1.length; _i++) {
                var view_6 = views_1[_i];
                this._cache[view_6.id] = view_6;
            }
        };
        ComparedAnimationCache.prototype.clear = function () {
            this._cache = {};
        };
        ComparedAnimationCache.prototype.startCompare = function (views) {
            var currentCache = {};
            for (var _i = 0, views_2 = views; _i < views_2.length; _i++) {
                var view_7 = views_2[_i];
                currentCache[view_7.id] = view_7;
            }
            if (!this.isempty) {
                for (var key in currentCache) {
                    var fromview = this._cache[key];
                    var toview = currentCache[key];
                    if (toview != null) {
                        this.__startAnimation(fromview, toview);
                    }
                }
                this._cache = currentCache;
                return true;
            }
            else {
                this._cache = currentCache;
                return false;
            }
        };
        ComparedAnimationCache.prototype.__startAnimation = function (fromview, toview) {
            if (fromview == null) {
                var animation = new AlphaAnimation();
                animation.duration = 600;
                animation.from = 0;
                animation.to = 1;
                toview.startAnimation(animation);
                console.log("start Alpha animation   ======  ");
            }
            else {
                toview.startAnimation(toview.getComparedAnimation(fromview));
            }
        };
        ComparedAnimationCache.prototype.__switchLayout = function (view1, view2) {
            var layoutInfo = view1.layoutInfo.clone();
            // view2.layoutInfo.reset(layoutInfo.outterrect.left,layoutInfo.outterrect.top,layoutInfo.outterrect.right,layoutInfo.outterrect.bottom,layoutInfo.padding,layoutInfo.drawindex);
            view1.layoutInfo.innerrect = view2.layoutInfo.innerrect.clone();
            view2.layoutInfo.innerrect = layoutInfo.innerrect;
        };
        return ComparedAnimationCache;
    }());
    android.ComparedAnimationCache = ComparedAnimationCache;
})(android || (android = {}));
var android;
(function (android) {
    'use strict';
    var View = android.view.View;
    var Animation = android.view.animation.Animation;
    var AnimationEase = android.view.animation.AnimationEase;
    var Util = android.graphics.Util;
    var ComparedView = /** @class */ (function (_super) {
        __extends(ComparedView, _super);
        function ComparedView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.animationXs = [];
            _this.animationYs = [];
            _this._pts = null;
            return _this;
        }
        Object.defineProperty(ComparedView.prototype, "comparedAnimationEmpty", {
            get: function () {
                return this.animationXs == null || this.animationYs == null || this.animationXs.length <= 0 || this.animationYs.length <= 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ComparedView.prototype, "ptcount", {
            get: function () {
                return 100;
            },
            enumerable: true,
            configurable: true
        });
        ComparedView.prototype.getComparedAnimation = function (fromview) {
            var topts = this.getpts(this.ptcount);
            var frompts = fromview.getpts(fromview.ptcount);
            var same = topts.xs.every(function (v, index, arr) {
                return v === frompts.xs[index];
            }) &&
                topts.ys.every(function (v, index, arr) {
                    return v === frompts.ys[index];
                });
            if (same) {
                return;
            }
            if (topts == null || frompts == null) {
                return null;
            }
            var animation = new CommonComparedAnimation(frompts.xs, frompts.ys, topts.xs, topts.ys);
            animation.duration = 600;
            animation.ease = new AnimationEase();
            animation.from = 0;
            animation.to = 1;
            return animation;
        };
        ComparedView.prototype.onLayout = function (l, t, r, b, canvas) {
            _super.prototype.onLayout.call(this, l, t, r, b, canvas);
            this._pts = null;
        };
        ComparedView.prototype.getpts = function (size) {
            if (this._pts == null) {
                this._pts = Util.createPtsFromRect(this.layoutInfo.innerrect.clone(), this.ptcount);
            }
            return this._pts;
        };
        return ComparedView;
    }(View));
    android.ComparedView = ComparedView;
    var CommonComparedAnimation = /** @class */ (function (_super) {
        __extends(CommonComparedAnimation, _super);
        function CommonComparedAnimation(fromxs, fromys, toxs, toys) {
            var _this = _super.call(this) || this;
            _this.ease = new AnimationEase();
            _this.fromXs = [].concat(fromxs);
            _this.fromYs = [].concat(fromys);
            _this.toXs = [].concat(toxs);
            _this.toYs = [].concat(toys);
            return _this;
        }
        CommonComparedAnimation.prototype.onStartAniamtion = function (canvas, view) {
            _super.prototype.onStartAniamtion.call(this, canvas, view);
        };
        CommonComparedAnimation.prototype.onEndAnimation = function (canvas, view) {
            _super.prototype.onEndAnimation.call(this, canvas, view);
            if (view instanceof ComparedView) {
                view.animationXs.length = 0;
                view.animationYs.length = 0;
            }
        };
        CommonComparedAnimation.prototype.applyTransformation = function (interpolatedTime, canvas, view) {
            if (view instanceof ComparedView) {
                console.log('applyTransformation ' + view.id);
                var scale = this.from + (this.to - this.from) * interpolatedTime;
                var maxLen = Math.max(this.toXs.length, this.toYs.length, this.fromXs.length, this.fromYs.length);
                var minLen = Math.min(this.toXs.length, this.toYs.length, this.fromXs.length, this.fromYs.length);
                var toStep = Math.min(this.toXs.length, this.toYs.length) / minLen;
                var fromStep = Math.min(this.fromXs.length, this.fromYs.length) / minLen;
                for (var i = 0; i < minLen; ++i) {
                    var toindex = i; //Math.floor(i * toStep);
                    var fromindex = i; //Math.floor(i * fromStep);
                    var dx = (this.toXs[toindex] - this.fromXs[fromindex]) * scale;
                    var dy = (this.toYs[toindex] - this.fromYs[fromindex]) * scale;
                    view.animationXs[toindex] = dx + this.fromXs[fromindex];
                    view.animationYs[toindex] = dy + this.fromYs[fromindex];
                    // for(let j = toindex+1; j < Math.floor((i+1) * toStep); ++j){
                    //     view.animationXs[j]=view.animationXs[toindex];
                    //     view.animationXs[j]=view.animationYs[toindex];
                    // }
                }
            }
        };
        return CommonComparedAnimation;
    }(Animation));
})(android || (android = {}));
/// <reference path="../API.ts" />
/// <reference path="../view/implemention/ViewGroup.ts" />
/// <reference path="./FrameLayout.ts" />
/// <reference path="../graphics/Align.ts" />
/// <reference path="../graphics/AlignElement.ts" />
/// <reference path="../graphics/Canvas.ts" />
/// <reference path="../view/animation/ComparedAnimationCache.ts" />
/// <reference path="../view/animation/ComparedView.ts" />
var android;
(function (android) {
    var widget;
    (function (widget) {
        var Padding = android.graphics.Padding;
        var Canvas = android.graphics.Canvas;
        var ViewGroup = android.view.ViewGroup;
        var MeasureSpec = android.view.MeasureSpec;
        var LayoutParams = android.view.LayoutParams;
        var MotionEvent = android.view.event.MotionEvent;
        var Device = android.device.Device;
        var RootView = /** @class */ (function (_super) {
            __extends(RootView, _super);
            function RootView() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.throttle = true;
                return _this;
            }
            RootView.prototype.setInfo = function (left, top, width, height) {
                this._l = left;
                this._t = top;
                this._w = width;
                this._h = height;
                this.layoutParams.width = width;
                this.layoutParams.height = height;
                this.padding = new Padding(0);
            };
            RootView.prototype.dispatchDraw = function (canvas) {
                _super.prototype.dispatchDraw.call(this, canvas);
                var rect = this.layoutInfo.outterrect;
                canvas.drawRect(rect.startPoint, rect.endPoint, false, this.background);
            };
            RootView.prototype.onLayout = function (l, t, r, b, canvas) {
                _super.prototype.onLayout.call(this, l, t, r, b, canvas);
            };
            RootView.prototype.oninvalidate = function () {
                if (this.getContext() != null && this.getContext().getComparedAnimationCache() != null) {
                    var comparedCache = this.getContext().getComparedAnimationCache();
                    if (comparedCache.getPreparing()) {
                        return;
                    }
                }
                _super.prototype.oninvalidate.call(this);
                this._canvas.begin();
                this.dispatchDraw(this._canvas);
                this._canvas.end();
            };
            // private __relayouthandler: number;
            RootView.prototype.requestLayout = function () {
                // if(this.__relayouthandler != null){
                //     clearTimeout(this.__relayouthandler);
                // }
                // this.__relayouthandler = setTimeout(() => {
                // console.log('finnal handler===== ' + this.__relayouthandler);
                //     this.__relayouthandler = null;
                //      this.__relayout();   
                // });
                // console.log('handler ' + this.__relayouthandler);
                this.__relayout();
                this.oninvalidate();
            };
            RootView.prototype.perpareComparedAnimation = function () {
                if (this.getContext() != null && this.getContext().getComparedAnimationCache() != null) {
                    var comparedCache = this.getContext().getComparedAnimationCache();
                    comparedCache.clear();
                    var list = [];
                    this.__traceView(this, list);
                    comparedCache.resetCache(list);
                    comparedCache.preparing();
                }
            };
            RootView.prototype.startCompare = function () {
                if (this.getContext() != null && this.getContext().getComparedAnimationCache() != null) {
                    var comparedCache = this.getContext().getComparedAnimationCache();
                    if (!comparedCache.isempty) {
                        var newlist = [];
                        this.__traceView(this, newlist);
                        if (newlist != null) {
                            comparedCache.startCompare(newlist);
                        }
                    }
                }
            };
            RootView.prototype.__traceView = function (viewgroup, list) {
                for (var i = 0; i < viewgroup.getChildCount(); ++i) {
                    var child = viewgroup.getChildAt(i);
                    if (child instanceof android.ComparedView && child.id != null && child.layoutInfo != null) {
                        list.push(child);
                    }
                    if (child instanceof ViewGroup) {
                        this.__traceView(child, list);
                    }
                }
            };
            RootView.prototype.__relayout = function () {
                var width = new MeasureSpec(this._w, LayoutParams.MATCH_PARENT);
                var height = new MeasureSpec(this._h, LayoutParams.MATCH_PARENT);
                var size = this.onMeasure(width, height, this._canvas);
                this.onLayout(this._l, this._t, this._l + size.width, this._t + size.height, this._canvas);
            };
            Object.defineProperty(RootView.prototype, "left", {
                get: function () {
                    return this._l;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RootView.prototype, "top", {
                get: function () {
                    return this._t;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RootView.prototype, "width", {
                get: function () {
                    return this._w;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RootView.prototype, "height", {
                get: function () {
                    return this._h;
                },
                enumerable: true,
                configurable: true
            });
            RootView.prototype.startAnimation = function (animation) {
                this.animation = animation;
                this._startAnimation();
            };
            RootView.prototype.interruptAnimation = function () {
                this._rootAniamtion = null;
            };
            RootView.prototype._startAnimation = function () {
                this.animation.start = Date.now();
                if (this._rootAniamtion != null && !this._rootAniamtion.isAniamtionEnd) {
                    if (this._rootAniamtion.duration + this._rootAniamtion.start < this.animation.duration + this.animation.start) {
                        this._rootAniamtion.duration = this.animation.start + this.animation.duration - this._rootAniamtion.start;
                    }
                }
                else {
                    this._rootAniamtion = this.animation;
                    android.requestAnimationFrame(this._animate.bind(this));
                }
            };
            RootView.prototype._animate = function () {
                if (this._rootAniamtion != null && !this._rootAniamtion.isAniamtionEnd) {
                    this.invalidate(false);
                    android.requestAnimationFrame(this._animate.bind(this));
                }
                else {
                    this._rootAniamtion = null;
                    this.invalidate(false);
                }
            };
            RootView.prototype.addView = function (view, index) {
                _super.prototype.addView.call(this, view, index);
                return index;
            };
            RootView.prototype.attachRender = function (r) {
                this._canvas = r;
            };
            RootView.prototype.attachElement = function (element, renderType) {
                this.element = element;
                // this.element.onariarequest = this.ontouch.bind(this);
                // this.element.oncommand = this.ontouch.bind(this);
                // this.element.ongotpointercapture = this.ontouch.bind(this);
                // this.element.onlostpointercapture = this.ontouch.bind(this);
                // this.element.onmsgesturechange = this.ontouch.bind(this);
                // this.element.onmsgesturedoubletap = this.ontouch.bind(this);
                // this.element.onmsgestureend = this.ontouch.bind(this);
                // this.element.onmsgesturehold = this.ontouch.bind(this);
                // this.element.onmsgesturestart = this.ontouch.bind(this);
                // this.element.onmsgesturetap = this.ontouch.bind(this);
                // this.element.onmsgotpointercapture = this.ontouch.bind(this);
                // this.element.onmsinertiastart = this.ontouch.bind(this);
                // this.element.onmslostpointercapture = this.ontouch.bind(this);
                // this.element.onmspointercancel = this.ontouch.bind(this);
                // this.element.onmspointerdown = this.ontouch.bind(this);
                // this.element.onmspointerenter = this.ontouch.bind(this);
                // this.element.onmspointerleave = this.ontouch.bind(this);
                // this.element.onmspointermove = this.ontouch.bind(this);
                // this.element.onmspointerout = this.ontouch.bind(this);
                // this.element.onmspointerover = this.ontouch.bind(this);
                // this.element.onmspointerup = this.ontouch.bind(this);
                // this.element.onwaiting = this.ontouch.bind(this);
                // this.element.onvolumechange = this.ontouch.bind(this);
                // this.element.ontimeupdate = this.ontouch.bind(this);
                // this.element.onsuspend = this.ontouch.bind(this);
                // this.element.onsubmit = this.ontouch.bind(this);
                // this.element.onstalled = this.ontouch.bind(this);
                // this.element.onselectstart = this.ontouch.bind(this);
                // this.element.onselect = this.ontouch.bind(this);
                // this.element.onseeking = this.ontouch.bind(this);
                // this.element.onseeked = this.ontouch.bind(this);
                // this.element.onscroll = this.ontouch.bind(this);
                // this.element.onreset = this.ontouch.bind(this);
                // this.element.onratechange = this.ontouch.bind(this);
                // this.element.onprogress = this.ontouch.bind(this);
                // this.element.onplaying = this.ontouch.bind(this);
                // this.element.onplay = this.ontouch.bind(this);
                // this.element.onpause = this.ontouch.bind(this);
                // this.element.onpaste = this.ontouch.bind(this);
                // this.element.onmsmanipulationstatechanged = this.ontouch.bind(this);
                // this.element.onmscontentzoom = this.ontouch.bind(this);
                this.element.ontouchstart = this.ontouch.bind(this);
                this.element.ontouchmove = this.ontouch.bind(this);
                this.element.ontouchend = this.ontouch.bind(this);
                this.element.ontouchcancel = this.ontouch.bind(this);
                this.element.onmousedown = this.ontouch.bind(this);
                this.element.onmousemove = this.ontouch.bind(this);
                this.element.onmouseup = this.ontouch.bind(this);
                this.element.onmouseout = this.ontouch.bind(this);
                this.element.onmouseover = this.ontouch.bind(this);
                this.element.onmousewheel = this.ontouch.bind(this);
                this.element.onclick = this.ontouch.bind(this);
                this.element.onscroll = this.ontouch.bind(this);
                this.layoutParams.width = element.clientWidth;
                this.layoutParams.height = element.clientHeight;
                Device.width = element.clientWidth;
                Device.height = element.clientHeight;
                this.attachRender(new Canvas(element, renderType));
                this.setInfo(0, 0, element.clientWidth, element.clientHeight);
            };
            RootView.prototype.ontouch = function (event) {
                event.preventDefault();
                event.stopPropagation();
                var event = event || window.event;
                var str = '';
                var mevent = new MotionEvent(0, 0, 0);
                switch (event.type) {
                    case "touchstart":
                        mevent = new MotionEvent(event.touches[0].clientX, event.touches[0].clientY, MotionEvent.ACTION_DOWN);
                        break;
                    case "touchend":
                        mevent = new MotionEvent(event.changedTouches[0].clientX, event.changedTouches[0].clientY, MotionEvent.ACTION_UP);
                        break;
                    case "touchcancel":
                        mevent = new MotionEvent(event.changedTouches[0].clientX, event.changedTouches[0].clientY, MotionEvent.ACTION_CANCEL);
                        break;
                    case "touchmove":
                        mevent = new MotionEvent(event.touches[0].clientX, event.touches[0].clientY, MotionEvent.ACTION_MOVE);
                        break;
                    case 'mousedown':
                        mevent = new MotionEvent(event.clientX, event.clientY, MotionEvent.ACTION_MOUSE_DOWN);
                        break;
                    case 'mousemove':
                        mevent = new MotionEvent(event.clientX, event.clientY, MotionEvent.ACTION_MOUSE_MOVE);
                        break;
                    case 'mouseup':
                        mevent = new MotionEvent(event.clientX, event.clientY, MotionEvent.ACTION_MOUSE_UP);
                        break;
                    case 'mouseout':
                        mevent = new MotionEvent(event.clientX, event.clientY, MotionEvent.ACTION_MOUSE_OUT);
                        break;
                    case 'mouseover':
                        mevent = new MotionEvent(event.clientX, event.clientY, MotionEvent.ACTION_MOUSE_OVER);
                        break;
                    case 'click':
                        mevent = new MotionEvent(event.clientX, event.clientY, MotionEvent.ACTION_CLICK);
                        break;
                    case 'scroll':
                        mevent = new MotionEvent(event.clientX, event.clientY, MotionEvent.ACTION_SCROLL);
                        break;
                    case 'mousewheel':
                        mevent = new MotionEvent(event.clientX, event.clientY, MotionEvent.ACTION_MOUSE_WHEEL);
                        mevent.deltaX = event.deltaX;
                        mevent.deltaY = event.deltaY;
                        break;
                }
                mevent.element = this.element;
                var elementrect = this.element.getBoundingClientRect();
                mevent.x = mevent.x - elementrect.left;
                mevent.y = mevent.y - elementrect.top;
                this.sendEvent(mevent);
            };
            RootView.prototype.sendEvent = function (event) {
                if (event.action >= MotionEvent.ACTION_MOUSE_DOWN) {
                    this.dispatchMouseEvent(event);
                }
                else {
                    this.dispatchTouchEvent(event);
                }
            };
            return RootView;
        }(widget.FrameLayout));
        widget.RootView = RootView;
    })(widget = android.widget || (android.widget = {}));
})(android || (android = {}));
/// <reference path="Activity.ts" />
/// <reference path="../widget/RootView.ts" />
/// <reference path="../device/Device.ts" />
/// <reference path="../view/event/MotionEvent.ts" />
var android;
(function (android) {
    var app;
    (function (app) {
        var RootView = android.widget.RootView;
        var ActivityManager = /** @class */ (function () {
            function ActivityManager(rendertype, element) {
                this.stack = new Array();
                this.rootView = new RootView(null); // need to be application context
                // this.rootView.attachRender(canvas);
                this.rootView.attachElement(element, rendertype);
            }
            ActivityManager.prototype.sendStartActivity = function (intent, bundle, requestCode, resultCode) {
                var targetActivity = this.createActivity(intent.getClass());
                var currentActivity = this.stack[this.stack.length - 1];
                if (currentActivity) {
                    currentActivity['onPause'].call(currentActivity);
                }
                this.rootView.removeAllViews();
                this.stack.push(targetActivity);
                targetActivity['attatchRootView'].call(targetActivity, this.rootView);
                targetActivity['onResume'].call(targetActivity);
                // TO DO ...  lanch mode
                targetActivity['onCreate'].call(targetActivity, bundle);
                // this.rootView.background ='white';
                this.rootView.invalidate(true);
            };
            ActivityManager.prototype.createActivity = function (activityClass) {
                var activity = new activityClass(this);
                return activity;
            };
            ActivityManager.prototype.getCurrentActivity = function () {
                return this.stack[this.stack.length - 1];
            };
            return ActivityManager;
        }());
        app.ActivityManager = ActivityManager;
    })(app = android.app || (android.app = {}));
})(android || (android = {}));
/// <reference path="./app/Intent.ts" />
/// <reference path="graphics/Canvas.ts" />
/// <reference path="./app/ActivityManager.ts" />
/// <reference path="./util/Log.ts" />
/// <reference path="./view/event/MotionEvent.ts" />
var android;
(function (android) {
    var ActivityManager = android.app.ActivityManager;
    var RenderType = android.graphics.RenderType;
    var Intent = android.app.Intent;
    var Device = android.device.Device;
    var MotionEvent = android.view.event.MotionEvent;
    var StartUp = /** @class */ (function () {
        function StartUp() {
            this.loadConfig();
            this.element = document.getElementById(this.getRootElement());
            this.element.innerHTML = '';
            if (this.getFill() === 'parent') {
                Device.width = this.element.clientWidth;
                Device.height = this.element.clientHeight;
            }
            var type = RenderType.Canvas;
            if (this.getRenderType() == 'canvas') {
                type = RenderType.Canvas;
            }
            else {
                type = RenderType.Svg;
            }
            this.activityManager = new ActivityManager(type, this.element);
        }
        StartUp.prototype.ontouch = function (event) {
            event.preventDefault();
            event.stopPropagation();
            var event = event || window.event;
            var str = '';
            var mevent = new MotionEvent(0, 0, 0);
            switch (event.type) {
                case "touchstart":
                    // str= "Touch started (" + event.touches[0].clientX + "," + event.touches[0].clientY + ")";
                    mevent = new MotionEvent(event.touches[0].clientX, event.touches[0].clientY, MotionEvent.ACTION_DOWN);
                    break;
                case "touchend":
                    mevent = new MotionEvent(event.changedTouches[0].clientX, event.changedTouches[0].clientY, MotionEvent.ACTION_UP);
                    break;
                case "touchcancel":
                    mevent = new MotionEvent(event.changedTouches[0].clientX, event.changedTouches[0].clientY, MotionEvent.ACTION_CANCEL);
                    break;
                case "touchmove":
                    mevent = new MotionEvent(event.touches[0].clientX, event.touches[0].clientY, MotionEvent.ACTION_MOVE);
                    break;
                case 'mousedown':
                    mevent = new MotionEvent(event.clientX, event.clientY, MotionEvent.ACTION_MOUSE_DOWN);
                    break;
                case 'mousemove':
                    mevent = new MotionEvent(event.clientX, event.clientY, MotionEvent.ACTION_MOUSE_MOVE);
                    break;
                case 'mouseup':
                    mevent = new MotionEvent(event.clientX, event.clientY, MotionEvent.ACTION_MOUSE_UP);
                    break;
                case 'mouseout':
                    mevent = new MotionEvent(event.clientX, event.clientY, MotionEvent.ACTION_MOUSE_OUT);
                    break;
                case 'mouseover':
                    mevent = new MotionEvent(event.clientX, event.clientY, MotionEvent.ACTION_MOUSE_OVER);
                    break;
                case 'click':
                    mevent = new MotionEvent(event.clientX, event.clientY, MotionEvent.ACTION_CLICK);
                    break;
            }
            mevent.element = this.element;
            var elementrect = this.element.getClientRects();
            mevent.x = mevent.x - elementrect[0].left;
            mevent.y = mevent.y - elementrect[0].top;
        };
        StartUp.prototype.start = function () {
            var intent = new Intent();
            intent.setClass(null, this.getLaunchActivity());
            var bundle = new android.app.Bundle();
            bundle.putDefault(this.getLaunchParams());
            this.activityManager.sendStartActivity(intent, bundle, 0, 0);
        };
        StartUp.prototype.getLaunchActivity = function () {
            return this.config.launchActivity.target;
        };
        StartUp.prototype.getLaunchParams = function () {
            return this.config.launchActivity.params;
        };
        StartUp.prototype.getRootElement = function () {
            return this.config.rootcontainer.target;
        };
        StartUp.prototype.getRenderType = function () {
            return this.config.rendertype ? this.config.rendertype.target : 'svg';
        };
        StartUp.prototype.getFill = function () {
            return this.config.fill;
        };
        StartUp.prototype.loadConfig = function () {
            this.config = window['mainfest'].config;
        };
        StartUp.prototype.getCurrentActivity = function () {
            return this.activityManager.getCurrentActivity();
        };
        return StartUp;
    }());
    android.StartUp = StartUp;
})(android || (android = {}));
var android;
(function (android) {
    var database;
    (function (database) {
        var DataSetObserver = /** @class */ (function () {
            function DataSetObserver() {
            }
            DataSetObserver.prototype.onChanged = function () {
                // Do nothing
            };
            DataSetObserver.prototype.onInvalidated = function () {
                // Do nothing
            };
            return DataSetObserver;
        }());
        database.DataSetObserver = DataSetObserver;
    })(database = android.database || (android.database = {}));
})(android || (android = {}));
/// <reference path="DataSetObserver.ts" />
var android;
(function (android) {
    var database;
    (function (database) {
        var Observable = /** @class */ (function () {
            function Observable() {
                this.mObservers = new Array();
            }
            Observable.prototype.registerObserver = function (observer) {
                if (!observer) {
                    throw "The observer is null or undefine";
                }
                if (this.mObservers.indexOf(observer) > -1) {
                    throw "Observer " + observer + " is already registered ";
                }
                this.mObservers.push(observer);
            };
            Observable.prototype.unregisterObserver = function (observer) {
                if (!observer) {
                    throw "The observer is null or undefine";
                }
                var index = this.mObservers.indexOf(observer);
                if (index === -1) {
                    throw "Observer " + observer + " was not registered ";
                }
                this.mObservers.splice(index, 1);
            };
            Observable.prototype.unregisterAll = function () {
                this.mObservers.length = 0;
            };
            return Observable;
        }());
        database.Observable = Observable;
        var DataSetObservable = /** @class */ (function (_super) {
            __extends(DataSetObservable, _super);
            function DataSetObservable() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            DataSetObservable.prototype.notifyChanged = function () {
                for (var i = this.mObservers.length - 1; i >= 0; i--) {
                    this.mObservers[i].onChanged();
                }
            };
            DataSetObservable.prototype.notifyInvalidated = function () {
                for (var i = this.mObservers.length - 1; i >= 0; i--) {
                    this.mObservers[i].onInvalidated();
                }
            };
            return DataSetObservable;
        }(Observable));
        database.DataSetObservable = DataSetObservable;
    })(database = android.database || (android.database = {}));
})(android || (android = {}));
/// <reference path="../database/DataSetObservable.ts" />
var android;
(function (android) {
    var adapter;
    (function (adapter) {
        var Adapter = /** @class */ (function () {
            function Adapter() {
            }
            return Adapter;
        }());
        adapter.Adapter = Adapter;
    })(adapter = android.adapter || (android.adapter = {}));
})(android || (android = {}));
/// <reference path="../database/DataSetObservable.ts" />
var android;
(function (android) {
    var adapter;
    (function (adapter) {
        var DataSetObservable = android.database.DataSetObservable;
        var ViewPageAdapter = /** @class */ (function () {
            function ViewPageAdapter() {
                this.mDataSetObservable = new DataSetObservable();
                this.mViewCache = new Array();
                this.mShouldCache = false;
            }
            ViewPageAdapter.prototype.XBaseAdapter = function () {
            };
            /************************************* don't use this  **********************************************/
            ViewPageAdapter.prototype.registerDataSetObserver = function (observer) {
                this.mDataSetObservable.registerObserver(observer);
            };
            ViewPageAdapter.prototype.unregisterDataSetObserver = function (observer) {
                this.mDataSetObservable.unregisterObserver(observer);
            };
            /**********************************************************************************************/
            ViewPageAdapter.prototype.notifyDataSetChanged = function () {
                this.mDataSetObservable.notifyChanged();
            };
            ViewPageAdapter.prototype.notifyDataSetInvalidated = function () {
                this.mDataSetObservable.notifyInvalidated();
            };
            /***
             * set cache
             *
             * @param enable
             */
            ViewPageAdapter.prototype.setCacheEnable = function (enable) {
                this.mShouldCache = enable;
                if (!this.mShouldCache) {
                    this.mViewCache.length = 0;
                }
            };
            ViewPageAdapter.prototype.initItem = function (position, container) {
                var view = null;
                if (this.mShouldCache) {
                    for (var i = 0; i < this.mViewCache.length; ++i) {
                        var info = this.mViewCache[i];
                        if (info != null && info.position == position) {
                            view = info.view;
                            if (view != null) {
                                return this.instantiateItem(position, container, view);
                            }
                        }
                    }
                    if (view == null) {
                        view = this.instantiateItem(position, container, null);
                    }
                    this.mViewCache.push(new ViewInfo(view, position));
                }
                if (view == null) {
                    view = this.instantiateItem(position, container, null);
                }
                return view;
            };
            /**
             * unuseful methods currently
             */
            ViewPageAdapter.prototype.beginUpdata = function () { };
            /**
             * unuseful methods currently
             */
            ViewPageAdapter.prototype.finishUpdata = function () { };
            return ViewPageAdapter;
        }());
        adapter.ViewPageAdapter = ViewPageAdapter;
        var ViewInfo = /** @class */ (function () {
            function ViewInfo(v, pos) {
                this.view = v;
                this.position = pos;
            }
            return ViewInfo;
        }());
        adapter.ViewInfo = ViewInfo;
    })(adapter = android.adapter || (android.adapter = {}));
})(android || (android = {}));
var android;
(function (android) {
    var app;
    (function (app) {
        var Bundle = /** @class */ (function () {
            function Bundle() {
                this.map = {};
            }
            Bundle.prototype.put = function (key, value) {
                this.map[key] = value;
            };
            Bundle.prototype.putDefault = function (value) {
                this.map['default'] = value;
            };
            Bundle.prototype.getDefault = function () {
                return this.map['default'];
            };
            return Bundle;
        }());
        app.Bundle = Bundle;
    })(app = android.app || (android.app = {}));
})(android || (android = {}));
var android;
(function (android) {
    var Debug = /** @class */ (function () {
        function Debug() {
        }
        Debug.assert = function (flg, log) {
            if (flg === void 0) { flg = false; }
            if (!flg) {
                var err = new Error();
                throw log + "\n" + err.stack;
            }
        };
        Debug.logstack = function (log) {
            var err = new Error();
            console.log(log + "\n" + err.stack);
        };
        Debug.log = function (log) {
            console.log(log);
        };
        return Debug;
    }());
    android.Debug = Debug;
})(android || (android = {}));
/// <reference path="Rect.ts" />
var android;
(function (android) {
    var graphics;
    (function (graphics) {
        'use strict';
        var Size = android.graphics.Size;
        var Point = android.graphics.Point;
        /**
         * Render to canvas.
         */
        var CanvasRenderEngine = /** @class */ (function () {
            function CanvasRenderEngine(element) {
                this._element = element;
                this._create();
            }
            Object.defineProperty(CanvasRenderEngine.prototype, "canvas", {
                get: function () {
                    return this._canvas2d;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CanvasRenderEngine.prototype, "alpha", {
                set: function (value) {
                    this._canvas2d.globalAlpha = value;
                },
                enumerable: true,
                configurable: true
            });
            CanvasRenderEngine.prototype.clearRect = function (left, top, width, height) {
                this._canvas2d.clearRect(left, top, width, height);
            };
            CanvasRenderEngine.prototype.beginRender = function () {
                this._canvas2d.clearRect(0, 0, this._canvas.width, this._canvas.height);
            };
            CanvasRenderEngine.prototype.endRender = function () {
            };
            CanvasRenderEngine.prototype.save = function () {
                this._canvas2d.save();
            };
            CanvasRenderEngine.prototype.restore = function () {
                this._canvas2d.restore();
            };
            CanvasRenderEngine.prototype.getImageData = function (sx, sy, sw, sh) {
                return this._canvas2d.getImageData(sx, sy, sw, sh);
            };
            CanvasRenderEngine.prototype.putImageData = function (imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight) {
                this._canvas2d.putImageData(imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight);
            };
            CanvasRenderEngine.prototype.clip = function (rect) {
                this._canvas2d.beginPath();
                this._canvas2d.rect(rect.left, rect.top, rect.width, rect.height);
                ;
                this._canvas2d.clip();
            };
            CanvasRenderEngine.prototype.setViewportSize = function (w, h) {
                var _devicePixelRatio = 2;
                this._canvas.width = w * _devicePixelRatio;
                this._canvas.height = h * _devicePixelRatio;
                this._canvas.style.width = w + "px";
                this._canvas.style.height = h + "px";
                this._canvas2d.scale(_devicePixelRatio, _devicePixelRatio);
            };
            Object.defineProperty(CanvasRenderEngine.prototype, "element", {
                get: function () {
                    return this._canvas;
                },
                enumerable: true,
                configurable: true
            });
            CanvasRenderEngine.prototype.drawEllipse = function (cx, cy, rx, ry, style) {
            };
            CanvasRenderEngine.prototype._applyStyle = function (style) {
                if (style != null) {
                    if (style.background instanceof graphics.FillStyle) {
                        if (style.background.fill instanceof graphics.Gradient) {
                            var gradient = null;
                            var fill = style.background.fill;
                            if (fill instanceof graphics.LinearGradient) {
                                gradient = this._canvas2d.createLinearGradient(fill.startx, fill.starty, fill.endx, fill.endy);
                            }
                            else if (fill instanceof graphics.RadialGradient) {
                                gradient = this._canvas2d.createRadialGradient(fill.centerx, fill.centery, fill.radius, fill.centerx1, fill.centery1, fill.radius1);
                            }
                            if (gradient != null) {
                                for (var _i = 0, _a = fill.colors; _i < _a.length; _i++) {
                                    var colorinfo = _a[_i];
                                    gradient.addColorStop(colorinfo.offset, colorinfo.color);
                                }
                            }
                            this._canvas2d.fillStyle = gradient;
                        }
                    }
                    else if (typeof (style.background) == 'string') {
                        this._canvas2d.fillStyle = style.background;
                    }
                    this._applyStrokeStyle(style.strokeStyle);
                }
            };
            CanvasRenderEngine.prototype._applyStrokeStyle = function (strokeStyle) {
                if (strokeStyle != null) {
                    if (strokeStyle.strokeColor != null) {
                        this._canvas2d.strokeStyle = strokeStyle.strokeColor;
                    }
                    if (strokeStyle.strokeWidth != null && !isNaN(strokeStyle.strokeWidth)) {
                        this._canvas2d.lineWidth = strokeStyle.strokeWidth;
                    }
                    if (strokeStyle.dash != null) {
                        this._canvas2d.setLineDash(strokeStyle.dash);
                    }
                    if (strokeStyle.dashOffset != null) {
                        this._canvas2d.lineDashOffset = strokeStyle.dashOffset;
                    }
                }
            };
            CanvasRenderEngine.prototype._applyFont = function (font) {
                if (font != null) {
                    if (font.fontColor != null) {
                        this._canvas2d.fillStyle = font.fontColor;
                    }
                    if (font.fontSize != null) {
                        this._canvas2d.font = font.fontSize + 'px ';
                    }
                    if (font.fontFamily != null) {
                        this._canvas2d.font += font.fontFamily;
                    }
                }
            };
            CanvasRenderEngine.prototype.drawRect = function (x, y, w, h, style, fill) {
                this._canvas2d.save();
                this._applyStyle(style);
                if (fill) {
                    if (style.background != null) {
                        this._canvas2d.fillRect(x, y, w, h);
                    }
                    if (style.strokeStyle != null) {
                        this._canvas2d.strokeRect(x, y, w, h);
                    }
                }
                else {
                    this._canvas2d.strokeRect(x, y, w, h);
                }
                if (style.strokeStyle != null) {
                    // this._canvas2d.stroke();
                }
                this._canvas2d.restore();
            };
            CanvasRenderEngine.prototype.drawLine = function (x1, y1, x2, y2, strokestyle) {
                this._canvas2d.beginPath();
                this._canvas2d.moveTo(x1, y1);
                this._canvas2d.lineTo(x2, y2);
                this._canvas2d.strokeStyle = strokestyle.strokeColor;
                this._canvas2d.lineWidth = strokestyle.strokeWidth;
                this._canvas2d.stroke();
            };
            CanvasRenderEngine.prototype.drawLines = function (xs, ys, strokestyle) {
                if (xs !== null && ys !== null && xs.length === ys.length && xs.length > 0) {
                    this._canvas2d.save();
                    this._canvas2d.beginPath();
                    this._applyStrokeStyle(strokestyle);
                    this._canvas2d.moveTo(xs[0], ys[0]);
                    for (var i = 1; i < xs.length; ++i) {
                        this._canvas2d.lineTo(xs[i], ys[i]);
                    }
                    this._canvas2d.stroke();
                    this._canvas2d.closePath();
                    this._canvas2d.restore();
                }
            };
            CanvasRenderEngine.prototype.drawPolygon = function (xs, ys, style) {
                this._canvas2d.save();
                this._applyStyle(style);
                this._canvas2d.beginPath();
                this._canvas2d.moveTo(xs[0], ys[0]);
                for (var i = 1; i < xs.length; ++i) {
                    this._canvas2d.lineTo(xs[i], ys[i]);
                }
                this._canvas2d.closePath();
                this._canvas2d.fill();
                if (style != null && style.strokeStyle != null) {
                    this._canvas2d.stroke();
                }
                this._canvas2d.restore();
            };
            CanvasRenderEngine.prototype.drawPie = function (cx, cy, r, startAngle, sweepAngle, style) {
                this._canvas2d.save();
                this._applyStyle(style);
                this._canvas2d.beginPath();
                this._canvas2d.moveTo(cx, cy);
                this._canvas2d.arc(cx, cy, r, startAngle, startAngle + sweepAngle);
                this._canvas2d.lineTo(cx, cy);
                this._canvas2d.closePath();
                this._canvas2d.fill();
                this._canvas2d.rotate(startAngle);
                this._canvas2d.restore();
            };
            CanvasRenderEngine.prototype.drawDonut = function (cx, cy, radius, innerRadius, startAngle, sweepAngle, style) {
                var endAngle = startAngle + sweepAngle;
                var p1 = new Point(cx, cy);
                p1.x += innerRadius * Math.cos(startAngle);
                p1.y += innerRadius * Math.sin(startAngle);
                var p2 = new Point(cx, cy);
                p2.x += innerRadius * Math.cos(endAngle);
                p2.y += innerRadius * Math.sin(endAngle);
                this._canvas2d.save();
                this._canvas2d.beginPath();
                this._applyStyle(style);
                this._canvas2d.moveTo(p1.x, p1.y);
                this._canvas2d.arc(cx, cy, radius, startAngle, endAngle, false);
                this._canvas2d.lineTo(p2.x, p2.y);
                this._canvas2d.arc(cx, cy, innerRadius, endAngle, startAngle, true);
                if (style.background != null) {
                    this._canvas2d.fill();
                }
                if (style.strokeStyle != null) {
                    this._canvas2d.stroke();
                }
                this._canvas2d.restore();
            };
            CanvasRenderEngine.prototype.drawString = function (s, pt, font) {
                // if (font) {
                //     this._canvas2d.font = font.fontSize + 'px ' + font.fontFamily;
                //     var gradient = this._canvas2d.createLinearGradient(0, 0, this._canvas.width, 0);
                //     if (font.fontColor) {
                //         gradient.addColorStop(1.0, font.fontColor);
                //         this._canvas2d.fillStyle = gradient;
                //     }
                // }
                this._canvas2d.save();
                this._applyFont(font);
                this._canvas2d.fillText(s, pt.x, pt.y);
                this._canvas2d.restore();
            };
            CanvasRenderEngine.prototype.drawStringRotated = function (s, pt, center, angle, font) {
                this._canvas2d.save();
                this._canvas2d.textBaseline = 'bottom';
                this._canvas2d.translate(center.x, center.y);
                this._canvas2d.rotate(Math.PI / 180 * angle);
                this._canvas2d.translate(-center.x, -center.y);
                this._applyFont(font);
                this._canvas2d.fillText(s, pt.x, pt.y);
                this._canvas2d.restore();
            };
            CanvasRenderEngine.prototype.measureString = function (s, font, maxSize) {
                if (maxSize === void 0) { maxSize = 0; }
                var sz = new Size(0, 0);
                this._canvas2d.font = font.fontSize + "px" + " " + font.fontFamily;
                var tm = this._canvas2d.measureText(s);
                sz.width = tm.width;
                sz.height = font.fontSize;
                return sz;
            };
            CanvasRenderEngine.prototype.drawImage = function (image, x, y, w, h) {
            };
            CanvasRenderEngine.prototype._create = function () {
                this._canvas = document.createElement('canvas');
                this._element.appendChild(this._canvas);
                this._canvas2d = this._canvas.getContext("2d");
            };
            CanvasRenderEngine.prototype.moveTo = function (x, y) {
                this._canvas2d.moveTo(x, y);
            };
            CanvasRenderEngine.prototype.scale = function (sx, sy) {
                this._canvas2d.scale(sx, sy);
            };
            CanvasRenderEngine.prototype.rotate = function (degree) {
                this._canvas2d.rotate(degree);
            };
            CanvasRenderEngine.prototype.translate = function (x, y) {
                this._canvas2d.translate(x, y);
            };
            return CanvasRenderEngine;
        }());
        graphics.CanvasRenderEngine = CanvasRenderEngine;
    })(graphics = android.graphics || (android.graphics = {}));
})(android || (android = {}));
/// <reference path="Rect.ts" />
var android;
(function (android) {
    var graphics;
    (function (graphics) {
        'use strict';
        var Size = android.graphics.Size;
        var Point = android.graphics.Point;
        /**
         * Render to svg.
         */
        var SvgRenderEngine = /** @class */ (function () {
            function SvgRenderEngine(element) {
                this._strokeWidth = 1;
                this._fontSize = null;
                this._fontFamily = null;
                this.alpha = 1;
                this._element = element;
                this._create();
                this._element.appendChild(this._svg);
                if (SvgRenderEngine._isff === undefined) {
                    SvgRenderEngine._isff = navigator.userAgent.toLowerCase().indexOf('firefox') >= 0;
                }
            }
            SvgRenderEngine.prototype.save = function () {
            };
            SvgRenderEngine.prototype.restore = function () {
            };
            SvgRenderEngine.prototype.clip = function () { };
            SvgRenderEngine.prototype.beginRender = function () {
                while (this._svg.firstChild) {
                    this._svg.removeChild(this._svg.firstChild);
                }
                this._svg.appendChild(this._textGroup);
            };
            SvgRenderEngine.prototype.endRender = function () {
                if (this._textGroup.parentNode) {
                    this._svg.removeChild(this._textGroup);
                }
            };
            SvgRenderEngine.prototype.setViewportSize = function (w, h) {
                this._svg.setAttribute('width', w.toString());
                this._svg.setAttribute('height', h.toString());
            };
            Object.defineProperty(SvgRenderEngine.prototype, "element", {
                get: function () {
                    return this._svg;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SvgRenderEngine.prototype, "fill", {
                get: function () {
                    return this._fill;
                },
                set: function (value) {
                    this._fill = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SvgRenderEngine.prototype, "fontSize", {
                get: function () {
                    return this._fontSize;
                },
                set: function (value) {
                    this._fontSize = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SvgRenderEngine.prototype, "fontFamily", {
                get: function () {
                    return this._fontFamily;
                },
                set: function (value) {
                    this._fontFamily = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SvgRenderEngine.prototype, "stroke", {
                get: function () {
                    return this._stroke;
                },
                set: function (value) {
                    this._stroke = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SvgRenderEngine.prototype, "strokeWidth", {
                get: function () {
                    return this._strokeWidth;
                },
                set: function (value) {
                    this._strokeWidth = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SvgRenderEngine.prototype, "textFill", {
                get: function () {
                    return this._textFill;
                },
                set: function (value) {
                    this._textFill = value;
                },
                enumerable: true,
                configurable: true
            });
            SvgRenderEngine.prototype.addClipRect = function (clipRect, id) {
                if (clipRect && id) {
                    var clipPath = document.createElementNS(SvgRenderEngine.svgNS, 'clipPath');
                    var rect = document.createElementNS(SvgRenderEngine.svgNS, 'rect');
                    rect.setAttribute('x', (clipRect.left - 1).toFixed());
                    rect.setAttribute('y', (clipRect.top - 1).toFixed());
                    rect.setAttribute('width', (clipRect.width + 2).toFixed());
                    rect.setAttribute('height', (clipRect.height + 2).toFixed());
                    clipPath.appendChild(rect);
                    clipPath.setAttribute('id', id);
                    this._svg.appendChild(clipPath);
                    //this._defs.appendChild(clipPath);
                }
            };
            SvgRenderEngine.prototype.drawEllipse = function (cx, cy, rx, ry, className, style) {
                var ell = document.createElementNS(SvgRenderEngine.svgNS, 'ellipse');
                ell.setAttribute('stroke', this._stroke);
                if (this._strokeWidth !== null) {
                    ell.setAttribute('stroke-width', this._strokeWidth.toString());
                }
                ell.setAttribute('fill', this._fill);
                ell.setAttribute('cx', cx.toFixed(1));
                ell.setAttribute('cy', cy.toFixed(1));
                ell.setAttribute('rx', rx.toFixed(1));
                ell.setAttribute('ry', ry.toFixed(1));
                //ell.setAttribute('cx', cx.toString());
                //ell.setAttribute('cy', cy.toString());
                //ell.setAttribute('rx', rx.toString());
                //ell.setAttribute('ry', ry.toString());
                if (className) {
                    ell.setAttribute('class', className);
                }
                this._applyStyle(ell, style);
                //this._svg.appendChild(ell);
                this._appendChild(ell);
                return ell;
            };
            SvgRenderEngine.prototype.drawRect = function (x, y, w, h, className, style, clipPath) {
                var rect = document.createElementNS(SvgRenderEngine.svgNS, 'rect');
                rect.setAttribute('fill', this._fill);
                rect.setAttribute('stroke', this._stroke);
                if (this._strokeWidth !== null) {
                    rect.setAttribute('stroke-width', this._strokeWidth.toString());
                }
                rect.setAttribute('x', x.toFixed(1));
                rect.setAttribute('y', y.toFixed(1));
                if (w > 0 && w < 0.05) {
                    rect.setAttribute('width', '0.1');
                }
                else {
                    rect.setAttribute('width', w.toFixed(1));
                }
                if (h > 0 && h < 0.05) {
                    rect.setAttribute('height', '0.1');
                }
                else {
                    rect.setAttribute('height', h.toFixed(1));
                }
                if (clipPath) {
                    rect.setAttribute('clip-path', 'url(#' + clipPath + ')');
                }
                if (className) {
                    rect.setAttribute('class', className);
                }
                this._applyStyle(rect, style);
                this._appendChild(rect);
                return rect;
            };
            // this._render.drawLine(startpoint.x, startpoint.y, endpoint.x, endpoint.y,stroke);
            SvgRenderEngine.prototype.drawLine = function (x1, y1, x2, y2, stroke) {
                this._drawLine(x1, y1, x2, y2, null, { 'stroke': stroke.strokeColor, 'stroke-width': stroke.strokeWidth });
            };
            SvgRenderEngine.prototype._drawLine = function (x1, y1, x2, y2, className, style) {
                var line = document.createElementNS(SvgRenderEngine.svgNS, 'line');
                line.setAttribute('stroke', this._stroke);
                if (this._strokeWidth !== null) {
                    line.setAttribute('stroke-width', this._strokeWidth.toString());
                }
                line.setAttribute('x1', x1.toFixed(1));
                line.setAttribute('x2', x2.toFixed(1));
                line.setAttribute('y1', y1.toFixed(1));
                line.setAttribute('y2', y2.toFixed(1));
                //line.setAttribute('x1', x1.toString());
                //line.setAttribute('x2', x2.toString());
                //line.setAttribute('y1', y1.toString());
                //line.setAttribute('y2', y2.toString());
                if (className) {
                    line.setAttribute('class', className);
                }
                this._applyStyle(line, style);
                this._appendChild(line);
                return line;
            };
            SvgRenderEngine.prototype.drawLines = function (xs, ys, className, style, clipPath) {
                if (xs && ys) {
                    var len = Math.min(xs.length, ys.length);
                    if (len > 0) {
                        var pline = document.createElementNS(SvgRenderEngine.svgNS, 'polyline');
                        pline.setAttribute('stroke', this._stroke);
                        if (this._strokeWidth !== null) {
                            pline.setAttribute('stroke-width', this._strokeWidth.toString());
                        }
                        pline.setAttribute('fill', 'none');
                        var spts = '';
                        for (var i = 0; i < len; i++) {
                            spts += xs[i].toFixed(1) + ',' + ys[i].toFixed(1) + ' ';
                            //spts += xs[i].toString() + ',' + ys[i].toString() + ' ';
                        }
                        pline.setAttribute('points', spts);
                        if (className) {
                            pline.setAttribute('class', className);
                        }
                        if (clipPath) {
                            pline.setAttribute('clip-path', 'url(#' + clipPath + ')');
                        }
                        this._applyStyle(pline, style);
                        this._appendChild(pline);
                        return pline;
                    }
                }
                return null;
            };
            SvgRenderEngine.prototype.drawPolygon = function (xs, ys, className, style, clipPath) {
                if (xs && ys) {
                    var len = Math.min(xs.length, ys.length);
                    if (len > 0) {
                        var poly = document.createElementNS(SvgRenderEngine.svgNS, 'polygon');
                        poly.setAttribute('stroke', this._stroke);
                        if (this._strokeWidth !== null) {
                            poly.setAttribute('stroke-width', this._strokeWidth.toString());
                        }
                        poly.setAttribute('fill', this._fill);
                        poly.setAttribute('opacity', this.alpha + "");
                        var spts = '';
                        for (var i = 0; i < len; i++) {
                            //spts += xs[i].toString() + ',' + ys[i].toString() + ' ';
                            spts += xs[i].toFixed(1) + ',' + ys[i].toFixed(1) + ' ';
                        }
                        poly.setAttribute('points', spts);
                        if (className) {
                            poly.setAttribute('class', className);
                        }
                        if (clipPath) {
                            poly.setAttribute('clip-path', 'url(#' + clipPath + ')');
                        }
                        this._applyStyle(poly, style);
                        this._appendChild(poly);
                        return poly;
                    }
                }
                return null;
            };
            SvgRenderEngine.prototype.drawPie = function (cx, cy, r, startAngle, sweepAngle, className, style, clipPath) {
                if (sweepAngle >= Math.PI * 2) {
                    return this.drawEllipse(cx, cy, r, r, className, style);
                }
                var path = document.createElementNS(SvgRenderEngine.svgNS, 'path');
                path.setAttribute('fill', this._fill);
                path.setAttribute('stroke', this._stroke);
                if (this._strokeWidth !== null) {
                    path.setAttribute('stroke-width', this._strokeWidth.toString());
                }
                var p1 = new Point(cx, cy);
                p1.x += r * Math.cos(startAngle);
                p1.y += r * Math.sin(startAngle);
                var a2 = startAngle + sweepAngle;
                var p2 = new Point(cx, cy);
                p2.x += r * Math.cos(a2);
                p2.y += r * Math.sin(a2);
                var opt = ' 0 0,1 ';
                if (Math.abs(sweepAngle) > Math.PI) {
                    opt = ' 0 1,1 ';
                }
                //var d = 'M ' + cx.toFixed(1) + ',' + cy.toFixed(1);
                //d += ' L ' + p1.x.toFixed(1) + ',' + p1.y.toFixed(1);
                //d += ' A ' + r.toFixed(1) + ',' + r.toFixed(1) + opt;
                //d += p2.x.toFixed(1) + ',' + p2.y.toFixed(1) + ' z';
                var d = 'M ' + p1.x.toFixed(1) + ',' + p1.y.toFixed(1);
                d += ' A ' + r.toFixed(1) + ',' + r.toFixed(1) + opt;
                d += p2.x.toFixed(1) + ',' + p2.y.toFixed(1);
                d += ' L ' + cx.toFixed(1) + ',' + cy.toFixed(1) + ' z';
                path.setAttribute('d', d);
                if (clipPath) {
                    path.setAttribute('clip-path', 'url(#' + clipPath + ')');
                }
                if (className) {
                    path.setAttribute('class', className);
                }
                this._applyStyle(path, style);
                this._appendChild(path);
                return path;
            };
            SvgRenderEngine.prototype.drawDonut = function (cx, cy, radius, innerRadius, startAngle, sweepAngle, className, style, clipPath) {
                var isFull = false;
                if (startAngle + sweepAngle >= Math.PI * 2) {
                    isFull = true;
                    sweepAngle = Math.PI * 2 - startAngle - 0.01;
                }
                var path = document.createElementNS(SvgRenderEngine.svgNS, 'path');
                path.setAttribute('fill', this._fill);
                path.setAttribute('stroke', this._stroke);
                if (this._strokeWidth !== null) {
                    path.setAttribute('stroke-width', this._strokeWidth.toString());
                }
                var p1 = new Point(cx, cy);
                p1.x += radius * Math.cos(startAngle);
                p1.y += radius * Math.sin(startAngle);
                var a2 = startAngle + sweepAngle;
                var p2 = new Point(cx, cy);
                p2.x += radius * Math.cos(a2);
                p2.y += radius * Math.sin(a2);
                var p3 = new Point(cx, cy);
                p3.x += innerRadius * Math.cos(a2);
                p3.y += innerRadius * Math.sin(a2);
                var p4 = new Point(cx, cy);
                p4.x += innerRadius * Math.cos(startAngle);
                p4.y += innerRadius * Math.sin(startAngle);
                var opt1 = ' 0 0,1 ', opt2 = ' 0 0,0 ';
                if (Math.abs(sweepAngle) > Math.PI) {
                    opt1 = ' 0 1,1 ';
                    opt2 = ' 0 1,0 ';
                }
                var d = 'M ' + p1.x.toFixed(3) + ',' + p1.y.toFixed(3);
                d += ' A ' + radius.toFixed(3) + ',' + radius.toFixed(3) + opt1;
                d += p2.x.toFixed(3) + ',' + p2.y.toFixed(3);
                if (isFull) {
                    d += ' M ' + p3.x.toFixed(3) + ',' + p3.y.toFixed(3);
                }
                else {
                    d += ' L ' + p3.x.toFixed(3) + ',' + p3.y.toFixed(3);
                }
                d += ' A ' + innerRadius.toFixed(3) + ',' + innerRadius.toFixed(3) + opt2;
                d += p4.x.toFixed(3) + ',' + p4.y.toFixed(3);
                if (!isFull) {
                    d += ' z';
                }
                path.setAttribute('d', d);
                if (clipPath) {
                    path.setAttribute('clip-path', 'url(#' + clipPath + ')');
                }
                if (className) {
                    path.setAttribute('class', className);
                }
                this._applyStyle(path, style);
                this._appendChild(path);
                return path;
            };
            SvgRenderEngine.prototype.drawString = function (s, pt, className, style) {
                var text = this._createText(pt, s);
                if (className) {
                    text.setAttribute('class', className);
                }
                this._applyStyle(text, style);
                this._appendChild(text);
                var bb = this._getBBox(text); // text.getBBox();
                text.setAttribute('y', (pt.y - (bb.y + bb.height - pt.y)).toFixed(1));
                return text;
            };
            SvgRenderEngine.prototype.drawStringRotated = function (s, pt, center, angle, className, style) {
                var text = this._createText(pt, s);
                if (className) {
                    text.setAttribute('class', className);
                }
                this._applyStyle(text, style);
                var g = document.createElementNS(SvgRenderEngine.svgNS, 'g');
                g.setAttribute('transform', 'rotate(' + angle.toFixed(1) + ',' + center.x.toFixed(1) + ',' + center.y.toFixed(1) + ')');
                //g.setAttribute('transform', 'rotate(' + angle.toString() + ',' + center.x.toString() + ',' + center.y.toString() + ')');
                g.appendChild(text);
                //this._svg.appendChild(g);
                this._appendChild(g);
                var bb = this._getBBox(text); // text.getBBox();
                text.setAttribute('y', (pt.y - (bb.y + bb.height - pt.y)).toFixed(1));
                return text;
            };
            SvgRenderEngine.prototype.measureString = function (s, font) {
                return this._measureString(s, null, null, { 'font-size': font.fontSize, 'font-family': font.fontFamily });
            };
            SvgRenderEngine.prototype._measureString = function (s, className, groupName, style) {
                var sz = new Size(0, 0);
                if (this._fontSize) {
                    this._text.setAttribute('font-size', this._fontSize);
                }
                if (this._fontFamily) {
                    this._text.setAttribute('font-family', this._fontFamily);
                }
                if (className) {
                    this._text.setAttribute('class', className);
                }
                if (groupName) {
                    this._textGroup.setAttribute('class', groupName);
                }
                this._applyStyle(this._text, style);
                this._setText(this._text, s);
                var rect = this._getBBox(this._text); // this._text.getBBox();
                sz.width = rect.width;
                sz.height = rect.height - 2;
                this._text.removeAttribute('font-size');
                this._text.removeAttribute('font-family');
                this._text.removeAttribute('class');
                if (style) {
                    for (var key in style) {
                        this._text.removeAttribute(this._deCase(key));
                    }
                }
                this._textGroup.removeAttribute('class');
                this._text.textContent = null;
                return sz;
            };
            SvgRenderEngine.prototype.startGroup = function (className, clipPath, createTransform) {
                if (createTransform === void 0) { createTransform = false; }
                var group = document.createElementNS(SvgRenderEngine.svgNS, 'g');
                if (className) {
                    group.setAttribute('class', className);
                }
                if (clipPath) {
                    group.setAttribute('clip-path', 'url(#' + clipPath + ')');
                }
                this._appendChild(group);
                if (createTransform) {
                    group.transform.baseVal.appendItem(this._svg.createSVGTransform());
                }
                this._group = group;
                return group;
            };
            SvgRenderEngine.prototype.endGroup = function () {
                if (this._group) {
                    var parent = this._group.parentNode;
                    if (parent == this._svg) {
                        this._group = null;
                    }
                    else {
                        this._group = parent;
                    }
                }
            };
            SvgRenderEngine.prototype.drawImage = function (imageHref, x, y, w, h) {
                var img = document.createElementNS(SvgRenderEngine.svgNS, 'image');
                img.setAttributeNS(SvgRenderEngine.xlinkNS, 'href', imageHref);
                img.setAttribute('x', x.toFixed(1));
                img.setAttribute('y', y.toFixed(1));
                img.setAttribute('width', w.toFixed(1));
                img.setAttribute('height', h.toFixed(1));
                this._appendChild(img);
                return img;
            };
            SvgRenderEngine.prototype._appendChild = function (element) {
                var group = this._group;
                if (!group) {
                    group = this._svg;
                }
                group.appendChild(element);
            };
            SvgRenderEngine.prototype._create = function () {
                this._svg = document.createElementNS(SvgRenderEngine.svgNS, 'svg');
                this._defs = document.createElementNS(SvgRenderEngine.svgNS, 'defs');
                this._svg.appendChild(this._defs);
                this._text = this._createText(new Point(-1000, -1000), '');
                this._textGroup = document.createElementNS(SvgRenderEngine.svgNS, 'g');
                this._textGroup.appendChild(this._text);
                this._svg.appendChild(this._textGroup);
            };
            SvgRenderEngine.prototype._setText = function (element, s) {
                var text = s ? s.toString() : null;
                if (text && text.indexOf('tspan') >= 0) {
                    try {
                        element.textContent = null;
                        // Parse the markup into valid nodes.
                        var dXML = new DOMParser();
                        //dXML.async = false;
                        // Wrap the markup into a SVG node to ensure parsing works.
                        var sXML = '<svg xmlns="http://www.w3.org/2000/svg\">' + text + '</svg>';
                        var svgDocElement = dXML.parseFromString(sXML, 'text/xml').documentElement;
                        // Now take each node, import it and append to this element.
                        var childNode = svgDocElement.firstChild;
                        while (childNode) {
                            element.appendChild(element.ownerDocument.importNode(childNode, true));
                            childNode = childNode.nextSibling;
                        }
                    }
                    catch (e) {
                        throw new Error('Error parsing XML string.');
                    }
                    ;
                }
                else {
                    element.textContent = text;
                }
            };
            SvgRenderEngine.prototype._createText = function (pos, text) {
                var textel = document.createElementNS(SvgRenderEngine.svgNS, 'text');
                this._setText(textel, text);
                textel.setAttribute('fill', this._textFill);
                textel.setAttribute('x', pos.x.toFixed(1));
                textel.setAttribute('y', pos.y.toFixed(1));
                //textel.setAttribute('x', pos.x.toString());
                //textel.setAttribute('y', pos.y.toString());
                if (this._fontSize) {
                    textel.setAttribute('font-size', this._fontSize);
                }
                if (this._fontFamily) {
                    textel.setAttribute('font-family', this._fontFamily);
                }
                return textel;
            };
            SvgRenderEngine.prototype._applyStyle = function (el, style) {
                if (style) {
                    for (var key in style) {
                        el.setAttribute(this._deCase(key), style[key]);
                    }
                }
            };
            SvgRenderEngine.prototype._deCase = function (s) {
                return s.replace(/[A-Z]/g, function (a) { return '-' + a.toLowerCase(); });
            };
            SvgRenderEngine.prototype._getBBox = function (text) {
                if (SvgRenderEngine._isff) {
                    try {
                        return text.getBBox();
                    }
                    catch (e) {
                        return { x: 0, y: 0, width: 0, height: 0 };
                    }
                }
                else {
                    return text.getBBox();
                }
            };
            SvgRenderEngine.svgNS = 'http://www.w3.org/2000/svg';
            SvgRenderEngine.xlinkNS = 'http://www.w3.org/1999/xlink';
            return SvgRenderEngine;
        }());
        graphics.SvgRenderEngine = SvgRenderEngine;
    })(graphics = android.graphics || (android.graphics = {}));
})(android || (android = {}));
/// <reference path="Util.ts" />
/// <reference path="Canvas.ts" />
var android;
(function (android) {
    var graphics;
    (function (graphics) {
        var TextPaint = /** @class */ (function () {
            function TextPaint(canvas, font) {
                this.canvas = canvas;
                this.font = font;
            }
            TextPaint.prototype.measureString = function (str) {
                return this.canvas.measureString(str, this.font);
            };
            return TextPaint;
        }());
        graphics.TextPaint = TextPaint;
    })(graphics = android.graphics || (android.graphics = {}));
})(android || (android = {}));
var android;
(function (android) {
    var util;
    (function (util) {
        var ArrayList = /** @class */ (function () {
            function ArrayList() {
                this._array = [];
            }
            ArrayList.prototype.add = function (value) {
                this._array.push(value);
            };
            ArrayList.prototype.remove = function (value) {
                if (typeof (value) === 'number') {
                    this._array.splice(value);
                }
                else {
                    var index = this._array.indexOf(value);
                    if (index > 0) {
                        this._array.splice(index, 1);
                    }
                }
            };
            ArrayList.prototype.clear = function () {
                this._array.length = 0;
            };
            ArrayList.prototype.size = function () {
                return this._array.length;
            };
            ArrayList.prototype.get = function (index) {
                return this._array[index];
            };
            return ArrayList;
        }());
        util.ArrayList = ArrayList;
    })(util = android.util || (android.util = {}));
})(android || (android = {}));
var android;
(function (android) {
    var util;
    (function (util) {
        var Message = /** @class */ (function () {
            function Message(what) {
                this.what = 0;
                this.args = {};
                this.what = what;
            }
            Message.obtain = function (what) {
                return new Message(what);
            };
            return Message;
        }());
        util.Message = Message;
    })(util = android.util || (android.util = {}));
})(android || (android = {}));
/// <reference path="Message.ts" />
/// <reference path="Log.ts" />
var android;
(function (android) {
    var util;
    (function (util) {
        var Handler = /** @class */ (function () {
            function Handler(handleMessage) {
                this._hanlderMap = {};
                this._queue = [];
                this.handleMessage = handleMessage;
            }
            Handler.prototype.sendMessage = function (msg) {
                return this.sendMessageDelayed(msg, 0);
            };
            Handler.prototype.sendMessageDelayed = function (msg, delay) {
                util.Log.d('sendMessageDelayed delay = ' + delay + "   now =" + Date.now());
                return this.sendMessageAtTime(msg, Date.now() + delay);
            };
            Handler.prototype.sendMessageAtTime = function (msg, uptimeMillis) {
                var self = this;
                this._hanlderMap[msg.what] = setTimeout(function () {
                    self.handleMessage(msg);
                }, uptimeMillis - Date.now());
                return true;
            };
            Handler.prototype.removeMessages = function (what) {
                clearTimeout(this._hanlderMap[what]);
            };
            Handler.prototype.obtainMessage = function (what) {
                return util.Message.obtain(what);
            };
            return Handler;
        }());
        util.Handler = Handler;
    })(util = android.util || (android.util = {}));
})(android || (android = {}));
var android;
(function (android) {
    var widget;
    (function (widget) {
        var View = android.view.View;
        var MeasureSpec = android.view.MeasureSpec;
        var ScaleType;
        (function (ScaleType) {
            ScaleType[ScaleType["MATRIX"] = 0] = "MATRIX";
            ScaleType[ScaleType["FIT_XY"] = 1] = "FIT_XY";
            ScaleType[ScaleType["FIT_START"] = 2] = "FIT_START";
            ScaleType[ScaleType["FIT_CENTER"] = 3] = "FIT_CENTER";
            ScaleType[ScaleType["FIT_END"] = 4] = "FIT_END";
            ScaleType[ScaleType["CENTER"] = 5] = "CENTER";
            ScaleType[ScaleType["CENTER_CROP"] = 6] = "CENTER_CROP";
            ScaleType[ScaleType["CENTER_INSIDE"] = 7] = "CENTER_INSIDE";
        })(ScaleType = widget.ScaleType || (widget.ScaleType = {}));
        var ImageView = /** @class */ (function (_super) {
            __extends(ImageView, _super);
            function ImageView() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ImageView.prototype.onMeasure = function (width, height, canvas) {
                this.setMeasuredDimension(new MeasureSpec(), new MeasureSpec());
                return null;
            };
            ImageView.prototype.onDraw = function (canvas) {
            };
            return ImageView;
        }(View));
        widget.ImageView = ImageView;
    })(widget = android.widget || (android.widget = {}));
})(android || (android = {}));
/// <reference path="../view/implemention/ViewGroup.ts" />
var android;
(function (android) {
    var widget;
    (function (widget) {
        var Gravity = android.graphics.Gravity;
        var ViewGroup = android.view.ViewGroup;
        var Point = android.graphics.Point;
        var MeasureSpec = android.view.MeasureSpec;
        var Orientation = android.graphics.Orientation;
        var LayoutParams = android.view.LayoutParams;
        var LinearLayout = /** @class */ (function (_super) {
            __extends(LinearLayout, _super);
            function LinearLayout() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._orientation = Orientation.Horizontal;
                return _this;
            }
            LinearLayout.prototype.setOrientation = function (orientation) {
                this._orientation = orientation;
            };
            LinearLayout.prototype.getOrientation = function () {
                return this._orientation;
            };
            LinearLayout.prototype.onMeasure = function (width, height, canvas) {
                if (this._orientation === Orientation.Horizontal) {
                    return this.measureHorizontal(width, height, canvas);
                }
                else {
                    return this.measureVertical(width, height, canvas);
                }
            };
            LinearLayout.prototype.measureHorizontal = function (width, height, canvas) {
                var size;
                for (var i = 0; i < this.children.length; ++i) {
                    var item = this.children[i];
                    var lp = item.layoutParams;
                    var w = lp.width;
                    var h = lp.height;
                    if (lp.heightMode === LayoutParams.MATCH_PARENT) {
                        h = height.value;
                    }
                    if (lp.widthMode === LayoutParams.MATCH_PARENT) {
                        w = width.value;
                    }
                    var s = item.onMeasure(new MeasureSpec(w, lp.widthMode), new MeasureSpec(h, lp.heightMode), canvas);
                    if (size) {
                        size.width += s.width;
                        if (size.height < s.height) {
                            size.height = s.height;
                        }
                    }
                    else {
                        size = s.clone();
                    }
                }
                // if (size.width > width.value) {
                //     size.width = width.value;
                // }
                // if (size.height > height.value) {
                //     size.height = height.value;
                // }
                if (this.layoutParams.widthMode === LayoutParams.EXACTLY) {
                    size.width = this.layoutParams.width;
                }
                else if (this.layoutParams.widthMode === LayoutParams.MATCH_PARENT) {
                    size.width = width.getMeasureValue();
                }
                if (this.layoutParams.heightMode === LayoutParams.EXACTLY) {
                    size.height = this.layoutParams.height;
                }
                else if (this.layoutParams.heightMode === LayoutParams.MATCH_PARENT) {
                    size.height = height.getMeasureValue();
                }
                this.setMeasuredDimension(new MeasureSpec(size.width, LayoutParams.EXACTLY), new MeasureSpec(size.height, LayoutParams.EXACTLY));
                return size;
            };
            LinearLayout.prototype.measureVertical = function (width, height, canvas) {
                var size;
                for (var i = 0; i < this.children.length; ++i) {
                    var item = this.children[i];
                    var lp = item.layoutParams;
                    var w = lp.width;
                    var h = lp.height;
                    if (lp.heightMode === LayoutParams.MATCH_PARENT) {
                        h = height.value;
                    }
                    if (lp.widthMode === LayoutParams.MATCH_PARENT) {
                        w = width.value;
                    }
                    var s = item.onMeasure(new MeasureSpec(w, lp.widthMode), new MeasureSpec(h, lp.heightMode), canvas);
                    if (size) {
                        size.height += s.height;
                        if (size.width < s.width) {
                            size.width = s.width;
                        }
                    }
                    else {
                        size = s.clone();
                    }
                }
                // if (size.width > width.value) {
                //     size.width = width.value;
                // }
                // if (size.height > height.value) {
                //     size.height = height.value;
                // }
                if (this.layoutParams.widthMode === LayoutParams.EXACTLY) {
                    size.width = this.layoutParams.width;
                }
                else if (this.layoutParams.widthMode === LayoutParams.MATCH_PARENT) {
                    size.width = width.getMeasureValue();
                }
                if (this.layoutParams.heightMode === LayoutParams.EXACTLY) {
                    size.height = this.layoutParams.height;
                }
                else if (this.layoutParams.heightMode === LayoutParams.MATCH_PARENT) {
                    size.height = height.getMeasureValue();
                }
                this.setMeasuredDimension(new MeasureSpec(size.width, LayoutParams.EXACTLY), new MeasureSpec(size.height, LayoutParams.EXACTLY));
                return size;
            };
            LinearLayout.prototype.onLayout = function (l, t, r, b, canvas) {
                // this.layoutInfo.reset(l, t, r, b, this.padding, 0);
                _super.prototype.onLayout.call(this, l, t, r, b, canvas);
                var innerrect = this.layoutInfo.innerrect;
                if (this._orientation === Orientation.Horizontal) {
                    this.layoutHorizontal(innerrect.left, innerrect.top, innerrect.right, innerrect.bottom, canvas);
                }
                else {
                    this.layoutVertical(innerrect.left, innerrect.top, innerrect.right, innerrect.bottom, canvas);
                }
            };
            LinearLayout.prototype.layoutHorizontal = function (l, t, r, b, canvas) {
                var viewItem;
                var m;
                var startpoint = new Point(l, t);
                var length = this.children.length;
                var childWidth = 0;
                for (var i = 0; i < length; ++i) {
                    viewItem = this.children[i];
                    m = viewItem.layoutParams.margin;
                    childWidth += viewItem.width + (m.marginLeft + m.marginRight);
                }
                viewItem = null;
                m = null;
                var startOffset = 0;
                if (childWidth < (r - l)) {
                    startOffset = ((r - l) - childWidth) / 2;
                }
                for (i = 0; i < length; ++i) {
                    viewItem = this.children[i];
                    m = viewItem.layoutParams.margin;
                    switch (viewItem.gravity) {
                        case Gravity.Left:
                        case Gravity.Auto:
                            break;
                        case Gravity.Right:
                            break;
                        case Gravity.Top:
                            startpoint.y = t;
                            break;
                        case Gravity.Bottom:
                            startpoint.y = b - viewItem.height - m.marginBottom;
                            break;
                        case Gravity.Center:
                            startpoint.y = t + ((b - t - viewItem.height) > 0 ? b - t - viewItem.height : 0) / 2;
                            break;
                    }
                    startpoint.offset(m.marginLeft > 0 ? m.marginLeft : 0, m.marginTop > 0 ? m.marginTop : 0);
                    viewItem.onLayout(startpoint.x, startpoint.y, startpoint.x + viewItem.width, startpoint.y + viewItem.height, canvas);
                    startpoint.offset(viewItem.width + (m.marginRight > 0 ? m.marginRight : 0), 0);
                }
            };
            LinearLayout.prototype.layoutVertical = function (l, t, r, b, canvas) {
                var viewItem;
                var m;
                var startpoint = new Point(l, t);
                var length = this.children.length;
                var childHeight = 0;
                for (var i = 0; i < length; ++i) {
                    viewItem = this.children[i];
                    m = viewItem.layoutParams.margin;
                    childHeight += viewItem.height + (m.marginTop + m.marginBottom);
                }
                viewItem = null;
                m = null;
                var startOffset = 0;
                if (childHeight < (b - t)) {
                    startOffset = ((b - t) - childHeight) / 2;
                }
                for (i = 0; i < length; ++i) {
                    viewItem = this.children[i];
                    m = viewItem.layoutParams.margin;
                    switch (viewItem.gravity) {
                        case Gravity.Left:
                        case Gravity.Auto:
                            startpoint.x = l;
                            break;
                        case Gravity.Right:
                            startpoint.x = r - viewItem.width - m.marginRight;
                            break;
                        case Gravity.Top:
                            // startpoint.y = t;
                            break;
                        case Gravity.Bottom:
                            // startpoint.y = b-viewItem.height-m.marginBottom;
                            break;
                        case Gravity.Center:
                            // startpoint.y = t+((b-t-viewItem.height)>0?b-t-viewItem.height:0)/2;
                            startpoint.x = l + ((r - l - viewItem.width) > 0 ? r - l - viewItem.width : 0) / 2;
                            break;
                    }
                    startpoint.offset(m.marginLeft > 0 ? m.marginLeft : 0, m.marginTop > 0 ? m.marginTop : 0);
                    viewItem.onLayout(startpoint.x, startpoint.y, startpoint.x + viewItem.width, startpoint.y + viewItem.height, canvas);
                    // startpoint.translate(viewItem.width + (m.marginRight>0? m.marginRight:0),0);
                    startpoint.offset(0, viewItem.height + (m.marginBottom > 0 ? m.marginBottom : 0));
                }
            };
            return LinearLayout;
        }(ViewGroup));
        widget.LinearLayout = LinearLayout;
    })(widget = android.widget || (android.widget = {}));
})(android || (android = {}));
/// <reference path="../view/implemention/ViewGroup.ts" />
var android;
(function (android) {
    var widget;
    (function (widget) {
        var ViewGroup = android.view.ViewGroup;
        var ListView = /** @class */ (function (_super) {
            __extends(ListView, _super);
            function ListView(context) {
                return _super.call(this, context) || this;
            }
            ListView.prototype.setAdapter = function (adapter) {
            };
            return ListView;
        }(ViewGroup));
        widget.ListView = ListView;
    })(widget = android.widget || (android.widget = {}));
})(android || (android = {}));
/// <reference path="../view/implemention/ViewGroup.ts" />
var android;
(function (android) {
    var widget;
    (function (widget) {
        var Point = android.graphics.Point;
        var MotionEvent = android.view.event.MotionEvent;
        var ScrollLayout = /** @class */ (function (_super) {
            __extends(ScrollLayout, _super);
            function ScrollLayout(context) {
                return _super.call(this, context) || this;
            }
            ScrollLayout.prototype.onMeasure = function (width, height, canvas) {
                android.Debug.assert(this.children.length === 1, "There is only one view that can be added to the scroll layout ");
                return _super.prototype.onMeasure.call(this, width, height, canvas);
            };
            ScrollLayout.prototype.onLayout = function (l, t, r, b, canvas) {
                _super.prototype.onLayout.call(this, l, t, r, b, canvas);
            };
            ScrollLayout.prototype.onInterceptMouseEvent = function (event) {
                // console.log("===================================  onInterceptMouseEvent " + event.toString());
                // // return super.onInterceptMouseEvent(event);
                // let result: boolean = false;
                // switch (event.action) {
                //     case MotionEvent.ACTION_MOUSE_ON:
                //         result = true;
                //         this.lastPt = new Point(event.x, event.y);
                //     case MotionEvent.ACTION_MOUSE_MOVE:
                //         if (Math.abs(event.y - this.lastPt.y) > Math.abs(event.x - this.lastPt.x)) {
                //             result = true;
                //         } else {
                //             result = false;
                //         }
                //         this.lastPt = new Point(event.x, event.y);
                //         break;
                // }
                // console.log("Intercept Result  " + result);
                // return result;
                return true;
            };
            ScrollLayout.prototype.onMouseEvent = function (event) {
                console.log("onMouseEvent " + event.toString());
                var currentPt = new Point(event.x, event.y);
                switch (event.action) {
                    case MotionEvent.ACTION_MOUSE_WHEEL:
                        if (this.startPt != null) {
                            if (this.children[0].height > this.width) {
                                if (event.deltaY != null && event.deltaY != 0) {
                                    // let offset=(currentPt.y-this.startPt.y);
                                    var offset = -event.deltaY;
                                    if (offset > 0 && this.children[0].top >= this.top) {
                                        return;
                                    }
                                    if (offset < 0 && this.children[0].bottom <= this.bottom) {
                                        return;
                                    }
                                    this.children[0].offset(0, offset);
                                    // this.invalidate(true);
                                    this.requestLayout();
                                    // this.invalidate(true);
                                    console.log('top' + this.children[0].top + " , bottom  " + this.children[0].bottom);
                                }
                            }
                        }
                        this.startPt = currentPt.clone();
                        break;
                    case MotionEvent.ACTION_MOUSE_OUT:
                        this.startPt = null;
                        break;
                }
                return true;
            };
            return ScrollLayout;
        }(widget.FrameLayout));
        widget.ScrollLayout = ScrollLayout;
    })(widget = android.widget || (android.widget = {}));
})(android || (android = {}));
var android;
(function (android) {
    var widget;
    (function (widget) {
        'use strict';
        var Scroller = /** @class */ (function () {
            function Scroller() {
            }
            return Scroller;
        }());
        widget.Scroller = Scroller;
        var FastScroller = /** @class */ (function () {
            function FastScroller() {
            }
            return FastScroller;
        }());
        widget.FastScroller = FastScroller;
    })(widget = android.widget || (android.widget = {}));
})(android || (android = {}));
var android;
(function (android) {
    var widget;
    (function (widget) {
        var Size = android.graphics.Size;
        var View = android.view.View;
        var MeasureSpec = android.view.MeasureSpec;
        var Font = android.graphics.Font;
        var LayoutInfo = android.view.LayoutInfo;
        var LayoutParams = android.view.LayoutParams;
        var Ellipsize;
        (function (Ellipsize) {
        })(Ellipsize = widget.Ellipsize || (widget.Ellipsize = {}));
        var TextView = /** @class */ (function (_super) {
            __extends(TextView, _super);
            function TextView() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            TextView.prototype.onDraw = function (canvas) {
                _super.prototype.onDraw.call(this, canvas);
                canvas.drawText(this.text, this.layoutInfo.innerrect.startPoint, this.font);
            };
            TextView.prototype.setText = function (text) {
                this.text = text;
                this.invalidate(false);
            };
            TextView.prototype.setFont = function (font) {
                this.font = font;
            };
            Object.defineProperty(TextView.prototype, "ellipsize", {
                get: function () {
                    return this._ellipsize;
                },
                set: function (ellipsize) {
                    this._ellipsize = ellipsize;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextView.prototype, "maxWidth", {
                get: function () {
                    return this._maxWidth;
                },
                set: function (maxWidth) {
                    this._maxWidth = maxWidth;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextView.prototype, "linespace", {
                get: function () {
                    return this._linespace;
                },
                set: function (linespace) {
                    this._linespace = linespace;
                },
                enumerable: true,
                configurable: true
            });
            // private _measureString(width:number):Size{
            //     return
            // }
            TextView.prototype.onMeasure = function (width, height, canvas) {
                if (!this.font) {
                    this.font = new Font(16, "", 'white');
                }
                this._layoutInfo = new LayoutInfo(0, 0, 0, 0, this.padding, 0);
                var w = this.layoutParams.width;
                var h = this.layoutParams.height;
                var size = new Size(w, h);
                var widthmode = this.layoutParams.widthMode;
                var heightmode = this.layoutParams.heightMode;
                var textsize = canvas.measureString(this.text, this.font);
                if (widthmode === LayoutParams.MATCH_PARENT) {
                    size.width = width.value;
                }
                else if (widthmode === LayoutParams.WRAP_CONTENT) {
                    size.width = textsize.width > this._maxWidth ? this._maxWidth : textsize.width;
                }
                if (heightmode === LayoutParams.MATCH_PARENT) {
                    size.height = height.value;
                }
                else if (heightmode === LayoutParams.WRAP_CONTENT) {
                    size.height = textsize.height;
                }
                this.setMeasuredDimension(new MeasureSpec(size.width, LayoutParams.EXACTLY), new MeasureSpec(size.height, LayoutParams.EXACTLY));
                return size;
            };
            return TextView;
        }(View));
        widget.TextView = TextView;
    })(widget = android.widget || (android.widget = {}));
})(android || (android = {}));
/// <reference path="../database/DataSetObservable.ts" />
/// <reference path="../adapter/ViewPagerAdapter.ts" />
/// <reference path="../util/ArrayList.ts" />
/// <reference path="../util/Handler.ts" />
/// <reference path="../device/Device.ts" />
var android;
(function (android) {
    var widget;
    (function (widget) {
        var Size = android.graphics.Size;
        var ViewGroup = android.view.ViewGroup;
        var MeasureSpec = android.view.MeasureSpec;
        var LayoutParams = android.view.LayoutParams;
        var ArrayList = android.util.ArrayList;
        var DataSetObserver = android.database.DataSetObserver;
        var Handler = android.util.Handler;
        var Log = android.util.Log;
        var MotionEvent = android.view.event.MotionEvent;
        var Device = android.device.Device;
        var TAG = "ScaleViewPager";
        var ANIMATION_FRAME_DURATION = 1000 / 80;
        var MIN_SPEED = 10.0;
        var MIN_TOUCH = 12;
        var MOVE_LEFT = 10001;
        var MOVE_RIGHT = 10002;
        var MOVE_BACK = 10003;
        var SCALE_CONSTANT = 100;
        var STATE_MOVE_LEFT = 11001;
        var STATE_MOVE_RIGHT = 11002;
        var ViewPager = /** @class */ (function (_super) {
            __extends(ViewPager, _super);
            function ViewPager(context) {
                var _this = _super.call(this, context) || this;
                _this.mPosition = 0;
                _this.mViewStack = new ArrayList();
                _this.mIndex = 0;
                _this.mSize = 0;
                _this.mAnimationState = 0;
                _this.mScale = 0;
                _this.mIsScaled = false;
                _this.mMin_speed = MIN_SPEED;
                _this.min_touch = MIN_TOUCH;
                _this.mLastAnimationTime = 0;
                _this.mCurrentAnimationTime = 0;
                _this.mSpeed = 130;
                _this.mAnimationEnd = true;
                _this.mCenterX = 0;
                _this.mCenterY = 0;
                _this.direction = 1;
                _this.init();
                return _this;
            }
            ViewPager.prototype.init = function () {
                var _this = this;
                var context = this.getContext();
                this.mMin_speed = MIN_SPEED * Device.density;
                this.mLayoutParams = new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT);
                this.min_touch = 3;
                this.mHandler = new Handler(function (msg) {
                    switch (msg.what) {
                        case MOVE_LEFT:
                            _this.doLeftOrBounceAnimation();
                            break;
                        case MOVE_RIGHT:
                            _this.doRightOrBounceAnimation();
                            break;
                    }
                });
            };
            ViewPager.prototype.setAreaTouchListener = function (l) {
                this.mAreaTouchListener = l;
            };
            ViewPager.prototype.onInterceptTouchEvent = function (evnt) {
                var action = evnt.action;
                var x = evnt.x;
                var y = evnt.y;
                switch (action) {
                    case MotionEvent.ACTION_DOWN:
                        this.oldx = x;
                        this.oldy = y;
                        this.downX = x;
                        if (this.mAreaTouchListener) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    case MotionEvent.ACTION_MOVE:
                        if (y - this.oldy != 0) {
                            if (Math.abs(x - this.oldx) / Math.abs(y - this.oldy) > 2 && Math.abs(x - this.downX) > this.min_touch) {
                                return true;
                            }
                            else {
                                return false;
                            }
                        }
                        else {
                            return false;
                        }
                }
                return true;
            };
            ViewPager.prototype.onTouchEvent = function (event) {
                if (!this.mAnimationEnd) {
                    return true;
                }
                var action = event.action;
                var x = event.x;
                var y = event.y;
                if (this.mCurrentView == null)
                    return false;
                switch (action) {
                    case MotionEvent.ACTION_MOVE: {
                        Log.d("event", "move ");
                        this.direction = x - this.oldx > 0 ? 1 : -1;
                        this.move(x - this.oldx);
                        this.oldx = x;
                        break;
                    }
                    case MotionEvent.ACTION_UP:
                    case MotionEvent.ACTION_CANCEL:
                        {
                            this.oldx = -1;
                            this.oldy = -1;
                            if (Math.abs(this.downX - x) == 0) {
                                if (x >= this.width / 4 * 3) {
                                    if (this.mAreaTouchListener != null) {
                                        this.mAreaTouchListener.onLeftTouch();
                                    }
                                }
                                else if (x <= this.width / 4) {
                                    if (this.mAreaTouchListener != null) {
                                        this.mAreaTouchListener.onRightTouch();
                                    }
                                }
                                else {
                                    if (this.mAreaTouchListener != null) {
                                        this.mAreaTouchListener.onMiddleTouch();
                                    }
                                }
                            }
                            else {
                                this.prepareToAnimation(this.direction * this.mMin_speed);
                            }
                            break;
                        }
                }
                return true;
            };
            ViewPager.prototype.onMeasure = function (widthMeasureSpec, heightMeasureSpec, canvas) {
                var width = widthMeasureSpec.getMeasureValue();
                var height = heightMeasureSpec.getMeasureValue();
                this.mCenterX = width / 2;
                this.mCenterY = height / 2;
                for (var i = 0; i < this.mViewStack.size(); ++i) {
                    var child = this.mViewStack.get(i).view;
                    var lp = child.layoutParams;
                    var w = lp.width;
                    var h = lp.height;
                    if (lp.heightMode === LayoutParams.MATCH_PARENT) {
                        h = height;
                    }
                    if (lp.widthMode === LayoutParams.MATCH_PARENT) {
                        w = width;
                    }
                    child.onMeasure(new MeasureSpec(w, lp.widthMode), new MeasureSpec(h, lp.heightMode), canvas);
                }
                var size = new Size(width, height);
                this.setMeasuredDimension(new MeasureSpec(size.width, LayoutParams.EXACTLY), new MeasureSpec(size.height, LayoutParams.EXACTLY));
                return size;
            };
            ViewPager.prototype.onLayout = function (l, t, r, b, canvas) {
                this.layoutInfo.reset(l, t, r, b, this.padding, 0);
                var innerrect = this.layoutInfo.innerrect;
                var width = r - l;
                var height = b - t;
                for (var i = 0; i < this.mViewStack.size(); ++i) {
                    var view_8 = this.mViewStack.get(i).view;
                    var pos = this.mViewStack.get(i).index;
                    var gap = pos - this.mIndex;
                    var viewleft = view_8.padding.leftPadding + (width - view_8.width) / 2;
                    var viewtop = view_8.padding.topPadding + (height - view_8.height) / 2;
                    gap = gap > 0 ? 0 : gap;
                    view_8.onLayout(viewleft + gap * width, viewtop, viewleft + gap * width + view_8.width, viewtop + view_8.height, canvas);
                }
            };
            ViewPager.prototype.dispatchDraw = function (canvas) {
                // super.dispatchDraw(canvas);
                // Log.d('dispatchDraw ' + this.mPosition);
                if (this.mAnimationState === STATE_MOVE_LEFT) {
                    this.drawChild(canvas, this.mNextView);
                    canvas.save();
                    canvas.translate(this.mPosition, 0);
                    this.drawChild(canvas, this.mCurrentView);
                    canvas.restore();
                }
                else if (this.mAnimationState === STATE_MOVE_RIGHT) {
                    this.drawChild(canvas, this.mCurrentView);
                    canvas.save();
                    canvas.translate(this.mPosition, 0);
                    this.drawChild(canvas, this.mPreView);
                    canvas.restore();
                }
                else {
                    this.drawChild(canvas, this.mCurrentView);
                }
            };
            ViewPager.prototype.setAdapter = function (adapter) {
                this.mOldAdapter = this.mAdapter;
                this.mAdapter = adapter;
                if (this.mAdapter != null) {
                    this.mDataSetObserver = new DataSetObserver();
                    var self = this;
                    this.mDataSetObserver.onChanged = function () {
                        self.mSize = self.mAdapter.getCount();
                    };
                    this.mDataSetObserver.onInvalidated = function () {
                        self.invalidate(false);
                    };
                    this.mAdapter.registerDataSetObserver(this.mDataSetObserver);
                    this.mSize = adapter.getCount();
                    this.refreshNormal();
                }
            };
            ViewPager.prototype.setCurrentItem = function (index) {
                Log.d('setCurrentItem ' + index);
                this.mIndex = index;
                this.refreshNormal();
                this.pagerMovingEnd(this.mIndex);
            };
            ViewPager.prototype.getCurrentItem = function () {
                return this.mIndex;
            };
            ViewPager.prototype.setPagerChangedListener = function (listen) {
                this.listener = listen;
            };
            ViewPager.prototype.refreshNormal = function () {
                if (this.mAdapter) {
                    if (this.mIndex >= 0 && this.mIndex < this.mAdapter.getCount()) {
                        this.preRemove();
                        this.preLoad(this.mIndex);
                        for (var i = 0; i < this.mViewStack.size(); ++i) {
                            var view_9 = this.mViewStack.get(i).view;
                            var index = this.mViewStack.get(i).index;
                            if (index === this.mIndex) {
                                this.mCurrentView = view_9;
                                this.addView(view_9, 1, this.mLayoutParams);
                            }
                            if (index === this.mIndex - 1) {
                                this.mPreView = view_9;
                                this.addView(view_9, 0, this.mLayoutParams);
                            }
                            if (index === this.mIndex + 1) {
                                this.mNextView = view_9;
                                this.addView(view_9, 1, this.mLayoutParams);
                            }
                        }
                    }
                    else if (this.mAdapter.getCount() === 0 && this.mIndex === 0) {
                        return;
                    }
                    else {
                        throw 'current index is ' + this.mIndex + ' size is ' + this.mAdapter.getCount();
                    }
                }
            };
            ViewPager.prototype.preRemove = function () {
                for (var i = 0; i < this.mViewStack.size(); ++i) {
                    var view_10 = this.mViewStack.get(i).view;
                    var position = this.mViewStack.get(i).index;
                    this.removeView(view_10);
                    this.mAdapter.destoryItem(position, this);
                }
            };
            ViewPager.prototype.preLoad = function (position) {
                if (this.mAdapter !== null) {
                    this.mViewStack.clear();
                    this.mViewStack.add(this.preLoadPreView(position));
                    this.mViewStack.add(this.loadView(position));
                    this.mViewStack.add(this.preLoadNextView(position));
                }
            };
            ViewPager.prototype.preLoadPreView = function (position) {
                var pos = position - 1;
                return this.loadView(pos);
            };
            ViewPager.prototype.preLoadNextView = function (position) {
                var pos = position + 1;
                return this.loadView(pos);
            };
            ViewPager.prototype.loadView = function (index) {
                if (this.mAdapter === null) {
                    throw 'Null point Exception adapter is null';
                }
                var pos = index;
                if (pos >= this.mSize) {
                    pos = 0;
                }
                if (pos < 0) {
                    pos += this.mSize;
                }
                var view = this.mAdapter.initItem(pos, this);
                return new ItemInfo(view, index, pos);
            };
            ViewPager.prototype.move = function (dis) {
                Log.d("move " + dis);
                if (this.mPosition === 0 && dis !== 0) {
                    this.pagerChanged(this.mIndex, dis > 0 ? this.mIndex + 1 : this.mIndex - 1);
                }
                this.mPosition += dis;
                if (this.mPosition >= 0) {
                    this.mAnimationState = STATE_MOVE_RIGHT;
                }
                if (this.mPosition < 0) {
                    this.mAnimationState = STATE_MOVE_LEFT;
                }
                var movedegreepreView = this.mPosition / this.width;
                var movedegree = this.mPosition * (this.mIndex + 1) / this.width * this.mAdapter.getCount();
                this.pagerMoving(movedegreepreView, movedegree);
                this.invalidate(false);
            };
            ViewPager.prototype.prepareToAnimation = function (speed) {
                var now = Date.now();
                this.mAnimationEnd = false;
                this.mLastAnimationTime = now;
                this.mCurrentAnimationTime = now;
                this.mSpeed = speed;
                if (this.mSpeed === 0) {
                    this.mSpeed = this.mMin_speed;
                }
                if (speed > 0) {
                    this.mSpeed = Math.abs(this.mSpeed);
                    this.doRightOrBounceAnimation();
                }
                else {
                    this.mSpeed = -1 * Math.abs(this.mSpeed);
                    this.doLeftOrBounceAnimation();
                }
            };
            ViewPager.prototype.flipLeft = function () {
                Log.d("flipLeft " + this.mAnimationEnd);
                if (!this.mAnimationEnd)
                    return;
                this.mPosition = this.mCurrentView.left;
                this.move(-1);
                var now = Date.now();
                this.mAnimationEnd = false;
                this.mLastAnimationTime = now;
                this.mCurrentAnimationTime = now;
                this.mSpeed = -this.mMin_speed;
                this.doLeftOrBounceAnimation();
            };
            ViewPager.prototype.flipRight = function () {
                Log.d("filpRight " + this.mAnimationEnd);
                if (!this.mAnimationEnd)
                    return;
                this.mPosition = this.mCurrentView.left;
                this.move(1);
                var now = Date.now();
                this.mAnimationEnd = false;
                this.mLastAnimationTime = now;
                this.mCurrentAnimationTime = now;
                this.mSpeed = this.mMin_speed;
                this.doRightOrBounceAnimation();
            };
            ViewPager.prototype.doRightOrBounceAnimation = function () {
                var now = Date.now();
                var t = 1;
                var s = this.mSpeed * t;
                if (this.mPosition > 0) {
                    if (this.mPosition === this.width) {
                        this.mHandler.removeMessages(MOVE_RIGHT);
                        this.endRightanimation();
                        return;
                    }
                    if (s + this.mPosition > this.width) {
                        s = this.width - this.mPosition;
                    }
                }
                else {
                    if (this.mPosition === 0) {
                        this.mHandler.removeMessages(MOVE_RIGHT);
                        this.endBounceanimtion();
                        return;
                    }
                    if (s + this.mPosition > 0) {
                        s = -this.mPosition;
                    }
                }
                this.move(s);
                this.mCurrentAnimationTime += ANIMATION_FRAME_DURATION;
                this.mHandler.removeMessages(MOVE_LEFT);
                this.mHandler.removeMessages(MOVE_RIGHT);
                this.mHandler.sendMessageDelayed(this.mHandler.obtainMessage(MOVE_RIGHT), ANIMATION_FRAME_DURATION);
            };
            ViewPager.prototype.doLeftOrBounceAnimation = function () {
                // Log.d(TAG, "doleftAnimation  ");
                var now = Date.now();
                var t = 1; //(now - mLastAnimationTime)/1000;
                var s = (this.mSpeed * t);
                if (this.mPosition < 0) {
                    if (this.mPosition + this.width == 0) {
                        this.mHandler.removeMessages(MOVE_LEFT);
                        this.endLeftAnimation();
                        return;
                    }
                    if (s + this.mPosition + this.width < 0) {
                        s = -(this.mPosition + this.width);
                    }
                }
                else {
                    if (this.mPosition == 0) {
                        this.mHandler.removeMessages(MOVE_LEFT);
                        this.endBounceanimtion();
                        return;
                    }
                    if (s + this.mPosition < 0) {
                        s = -this.mPosition;
                    }
                }
                this.move(s);
                this.mCurrentAnimationTime += ANIMATION_FRAME_DURATION;
                this.mHandler.removeMessages(MOVE_LEFT);
                this.mHandler.removeMessages(MOVE_RIGHT);
                this.mHandler.sendMessageDelayed(this.mHandler.obtainMessage(MOVE_LEFT), ANIMATION_FRAME_DURATION);
            };
            ViewPager.prototype.endBounceanimtion = function () {
                Log.d("endBounceanimtion  ");
                this.mAnimationEnd = true;
                this.mScale = 0;
                this.mPosition = 0;
                this.mAnimationState = 0;
                this.pagerMovingEnd(this.mIndex);
            };
            ViewPager.prototype.endRightanimation = function () {
                Log.d("endRightanimation   ");
                var index = this.mIndex - 1;
                if (index < 0) {
                    index = this.mAdapter.getCount() + index;
                }
                this.mPosition = 0;
                this.mScale = 0;
                this.mAnimationState = 0;
                this.setCurrentItem(index);
                this.mAnimationEnd = true;
                this.pagerMovingEnd(this.mIndex);
            };
            ViewPager.prototype.endLeftAnimation = function () {
                Log.d("endLeftAnimation   ");
                var index = this.mIndex + 1;
                this.mPosition = 0;
                this.mScale = 0;
                index = index % this.mAdapter.getCount();
                this.mAnimationState = 0;
                this.setCurrentItem(index);
                this.mAnimationEnd = true;
                this.pagerMovingEnd(this.mIndex);
            };
            ViewPager.prototype.pagerChanged = function (position, targetPosition) {
                if (this.listener != null) {
                    this.listener.onPagerChanged(position, targetPosition);
                }
            };
            ViewPager.prototype.pagerMoving = function (movedegreepreView, movedegree) {
                if (this.listener != null) {
                    this.listener.onPagerMoving(-1 * movedegreepreView, -1 * movedegree);
                }
            };
            ViewPager.prototype.pagerMovingEnd = function (position) {
                if (this.listener != null) {
                    this.listener.onPagerMovingEnd(position);
                }
            };
            return ViewPager;
        }(ViewGroup));
        widget.ViewPager = ViewPager;
        var ItemInfo = /** @class */ (function () {
            function ItemInfo(v, i, pos) {
                this.view = v;
                this.index = i;
                this.position = pos;
            }
            return ItemInfo;
        }());
    })(widget = android.widget || (android.widget = {}));
})(android || (android = {}));
var android;
(function (android) {
    var view;
    (function (view) {
        var animation;
        (function (animation) {
            var AnimationType;
            (function (AnimationType) {
                AnimationType[AnimationType["Alpha"] = 0] = "Alpha";
                AnimationType[AnimationType["Translate"] = 1] = "Translate";
                AnimationType[AnimationType["Scale"] = 2] = "Scale";
                AnimationType[AnimationType["Rotate"] = 3] = "Rotate";
            })(AnimationType = animation.AnimationType || (animation.AnimationType = {}));
        })(animation = view.animation || (view.animation = {}));
    })(view = android.view || (android.view = {}));
})(android || (android = {}));
var android;
(function (android) {
    var view;
    (function (view_11) {
        var animation;
        (function (animation) {
            var ScaleAnimation = /** @class */ (function (_super) {
                __extends(ScaleAnimation, _super);
                function ScaleAnimation() {
                    var _this = _super.call(this) || this;
                    _this.duration = 0;
                    return _this;
                }
                Object.defineProperty(ScaleAnimation.prototype, "isAniamtionEnd", {
                    get: function () {
                        return this.start + this.duration < Date.now();
                    },
                    enumerable: true,
                    configurable: true
                });
                ScaleAnimation.prototype.scale = function (now) {
                    console.log("ease " + ((now - this.start) / this.duration));
                    return this.ease.ease((now - this.start) / this.duration);
                };
                ScaleAnimation.prototype.applyTransformation = function (interpolatedTime, canvas, view) {
                    // canvas.moveto(view.left+view.width/2,view.top +view.height/2);
                    canvas.scale(this.from + (this.to - this.from) * interpolatedTime, this.from + (this.to - this.from) * interpolatedTime);
                };
                return ScaleAnimation;
            }(animation.Animation));
            animation.ScaleAnimation = ScaleAnimation;
        })(animation = view_11.animation || (view_11.animation = {}));
    })(view = android.view || (android.view = {}));
})(android || (android = {}));
var android;
(function (android) {
    var view;
    (function (view) {
        var RenderState = /** @class */ (function () {
            function RenderState(rect, index) {
                this.currentRect = rect;
                this.index = index;
            }
            return RenderState;
        }());
        view.RenderState = RenderState;
    })(view = android.view || (android.view = {}));
})(android || (android = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZHJvaWQvQVBJLnRzIiwiYW5kcm9pZC9hcHAvSW50ZW50LnRzIiwiYW5kcm9pZC9ncmFwaGljcy9Qb2ludC50cyIsImFuZHJvaWQvZ3JhcGhpY3MvUmVjdC50cyIsImFuZHJvaWQvZ3JhcGhpY3MvVXRpbC50cyIsImFuZHJvaWQvZGV2aWNlL0RldmljZS50cyIsImFuZHJvaWQvdXRpbC9Mb2cudHMiLCJhbmRyb2lkL2RldmljZS9EZWZhdWx0LnRzIiwiYW5kcm9pZC9ncmFwaGljcy9DYW52YXMudHMiLCJhbmRyb2lkL2FwcC9Db250ZXh0LnRzIiwiYW5kcm9pZC92aWV3L2ludGVyZmFjZS9JVmlldy50cyIsImFuZHJvaWQvdmlldy9pbnRlcmZhY2UvSVZpZXdHcm91cC50cyIsImFuZHJvaWQvZ3JhcGhpY3MvU2l6ZS50cyIsImFuZHJvaWQvZ3JhcGhpY3MvTWFyZ2lucy50cyIsImFuZHJvaWQvdmlldy9pbXBsZW1lbnRpb24vTGF5b3V0SW5mby50cyIsImFuZHJvaWQvdmlldy9ldmVudC9Nb3Rpb25FdmVudC50cyIsImFuZHJvaWQvdmlldy9hbmltYXRpb24vQW5pbWF0aW9uLnRzIiwiYW5kcm9pZC92aWV3L2FuaW1hdGlvbi9BbmltYXRpb25FYXNlLnRzIiwiYW5kcm9pZC92aWV3L2ltcGxlbWVudGlvbi9WaWV3LnRzIiwiYW5kcm9pZC92aWV3L2ltcGxlbWVudGlvbi9WaWV3R3JvdXAudHMiLCJhbmRyb2lkL3dpZGdldC9GcmFtZUxheW91dC50cyIsImFuZHJvaWQvYXBwL0FjdGl2aXR5LnRzIiwiYW5kcm9pZC9ncmFwaGljcy9BbGlnbi50cyIsImFuZHJvaWQvZ3JhcGhpY3MvQWxpZ25FbGVtZW50LnRzIiwiYW5kcm9pZC92aWV3L2FuaW1hdGlvbi9BbHBoYUFuaW1hdGlvbi50cyIsImFuZHJvaWQvdmlldy9hbmltYXRpb24vQ29tcGFyZWRBbmltYXRpb25DYWNoZS50cyIsImFuZHJvaWQvdmlldy9hbmltYXRpb24vQ29tcGFyZWRWaWV3LnRzIiwiYW5kcm9pZC93aWRnZXQvUm9vdFZpZXcudHMiLCJhbmRyb2lkL2FwcC9BY3Rpdml0eU1hbmFnZXIudHMiLCJhbmRyb2lkL3N0YXJ0dXAudHMiLCJhbmRyb2lkL2RhdGFiYXNlL0RhdGFTZXRPYnNlcnZlci50cyIsImFuZHJvaWQvZGF0YWJhc2UvRGF0YVNldE9Cc2VydmFibGUudHMiLCJhbmRyb2lkL2FkYXB0ZXIvQWRhcHRlci50cyIsImFuZHJvaWQvYWRhcHRlci9WaWV3UGFnZXJBZGFwdGVyLnRzIiwiYW5kcm9pZC9hcHAvQnVuZGxlLnRzIiwiYW5kcm9pZC9kZWJ1Zy9EZWJ1Zy50cyIsImFuZHJvaWQvZ3JhcGhpY3MvUmVuZGVyQ2FudmFzLnRzIiwiYW5kcm9pZC9ncmFwaGljcy9SZW5kZXJTdmcudHMiLCJhbmRyb2lkL2dyYXBoaWNzL1RleHRQYWludC50cyIsImFuZHJvaWQvdXRpbC9BcnJheUxpc3QudHMiLCJhbmRyb2lkL3V0aWwvTWVzc2FnZS50cyIsImFuZHJvaWQvdXRpbC9IYW5kbGVyLnRzIiwiYW5kcm9pZC93aWRnZXQvSW1hZ2VWaWV3LnRzIiwiYW5kcm9pZC93aWRnZXQvTGluZWFyTGF5b3V0LnRzIiwiYW5kcm9pZC93aWRnZXQvTGlzdFZpZXcudHMiLCJhbmRyb2lkL3dpZGdldC9TY3JvbGxMYXlvdXQudHMiLCJhbmRyb2lkL3dpZGdldC9TY3JvbGxlci50cyIsImFuZHJvaWQvd2lkZ2V0L1RleHRWaWV3LnRzIiwiYW5kcm9pZC93aWRnZXQvVmlld1BhZ2VyLnRzIiwiYW5kcm9pZC92aWV3L2FuaW1hdGlvbi9BbmltYXRpb25UeXBlLnRzIiwiYW5kcm9pZC92aWV3L2FuaW1hdGlvbi9TY2FsZUFuaW1hdGlvbi50cyIsImFuZHJvaWQvdmlldy9pbXBsZW1lbnRpb24vUmVuZGVyU3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQVUsT0FBTyxDQW9DaEI7QUFwQ0QsV0FBVSxPQUFPO0lBQ2I7OztPQUdHO0lBQ0gsK0JBQXNDLFFBQThCO1FB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VUFBVSxHQUFHLFVBQVUsQ0FBQztnQkFDL0MsSUFBSSxFQUFFLEdBQUcsSUFBSSxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUMzQixFQUFFLENBQUMsQ0FBQyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUMzQyxFQUFFLENBQUMsQ0FBQyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUMzQyxJQUFJLEVBQUUsR0FBRyxJQUFJLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQzNCLEVBQUUsQ0FBQyxDQUFDLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3pDLEVBQUUsQ0FBQyxDQUFDLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3pDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNoRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFF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QUMsSUFBSSxDQUFDLEVBQUUsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsZ0JBQWdCLEVBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLGdCQUFnQixDQUFDLENBQUM7Z0JBQ3hILENBQUM7Z0JBRUwscUJBQUM7WUFBRCxDQXRCQSxBQXNCQyxDQXRCbUMsVUFBQSxTQUFTLEdBc0I1QztZQXRCWSx3QkFBYyxpQkFzQjFCLENBQUE7UUFDTCxDQUFDLEVBekJzQixTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQXlCL0I7SUFBRCxDQUFDLEVBekJpQixJQUFJLEdBQUosWUFBSSxLQUFKLFlBQUksUUF5QnJCO0FBQUQsQ0FBQyxFQXpCUyxPQUFPLEtBQVAsT0FBTyxRQXlCaEI7QUMxQkQsSUFBVSxPQUFPLENBVWhCO0FBVkQsV0FBVSxPQUFPO0lBQUMsSUFBQSxJQUFJLENBVXJCO0lBVmlCLFdBQUEsSUFBSTtRQUVsQjtZQUdJLHFCQUFZLElBQVMsRUFBQyxLQUFZO2dCQUM5QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztnQkFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDdkIsQ0FBQztZQUNMLGtCQUFDO1FBQUQsQ0FQQSxBQU9DLElBQUE7UUFQWSxnQkFBVyxjQU92QixDQUFBO0lBQ0wsQ0FBQyxFQVZpQixJQUFJLEdBQUosWUFBSSxLQUFKLFlBQUksUUFVckI7QUFBRCxDQUFDLEVBVlMsT0FBTyxLQUFQLE9BQU8sUUFVaEIiLCJmaWxlIjoiYW5kcm9pZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBhbmRyb2lke1xuICAgIC8qKlxuICAgICAqIEBoaWRkZW5cbiAgICAgKiBAcGFyYW0gY2FsbEJhY2sgXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHJlcXVlc3RBbmltYXRpb25GcmFtZShjYWxsQmFjazogRnJhbWVSZXF1ZXN0Q2FsbGJhY2spIHtcbiAgICAgICAgaWYgKF9fY2FsbGJhY2tsaXN0Lmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICBfX2NhbGxiYWNrbGlzdC5sZW5ndGggPSAwO1xuICAgICAgICAgICAgX19jYWxsYmFja2xpc3QucHVzaChjYWxsQmFjayk7XG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKF9fZnJhbWVDYWxsQmFjayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfX2NhbGxiYWNrbGlzdC5wdXNoKGNhbGxCYWNrKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBAaGlkZGVuXG4gICAgICogQHBhcmFtIHRpbWVcbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gX19mcmFtZUNhbGxCYWNrKHRpbWU6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBsZXQgbGlzdCA9IFtdLmNvbmNhdChfX2NhbGxiYWNrbGlzdCk7XG4gICAgICAgIF9fY2FsbGJhY2tsaXN0Lmxlbmd0aCA9IDA7XG4gICAgICAgIGZvciAoOyA7KSB7XG4gICAgICAgICAgICBsZXQgY2FsbGJhY2sgPSBsaXN0LnNoaWZ0KCk7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sgPT0gbnVsbCkge1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHRpbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxpc3QubGVuZ3RoID0gMDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQGhpZGRlblxuICAgICAqL1xuICAgIGNvbnN0IF9fY2FsbGJhY2tsaXN0OiBGcmFtZVJlcXVlc3RDYWxsYmFja1tdID0gW107XG59XG4iLCJuYW1lc3BhY2UgYW5kcm9pZC5hcHB7XG4gICAgZXhwb3J0IGNsYXNzIEludGVudHtcbiAgICAgICAgIHByaXZhdGUgY29udGV4dDpDb250ZXh0O1xuICAgICAgICAgcHJpdmF0ZSB0YXJnZXRBY3Rpdml0eUNsYXNzOmFueTtcbiAgICAgICAgIHB1YmxpYyBzZXRDbGFzcyhjOkNvbnRleHQsIGFjdGl2aXR5Q2xhc3M6YW55KTp2b2lke1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0ID1jO1xuICAgICAgICAgICAgdGhpcy50YXJnZXRBY3Rpdml0eUNsYXNzID0gYWN0aXZpdHlDbGFzcztcbiAgICAgICAgIH1cbiAgICAgICAgIHB1YmxpYyBnZXRDbGFzcygpe1xuICAgICAgICAgICAgIHJldHVybiB0aGlzLnRhcmdldEFjdGl2aXR5Q2xhc3M7XG4gICAgICAgICB9XG4gICAgICAgICBwdWJsaWMgZ2V0Q29udGV4dCgpe1xuICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQ7XG4gICAgICAgICB9XG4gICAgfVxufSIsIm5hbWVzcGFjZSBhbmRyb2lkLmdyYXBoaWNzIHtcblxuICAgIC8qKlxuICAgICAqIFBvaW50IGhvbGRzIHR3byBpbnRlZ2VyIGNvb3JkaW5hdGVzXG4gICAgICovXG4gICAgZXhwb3J0IGNsYXNzIFBvaW50IHtcbiAgICAgICAgcHVibGljIHg6IG51bWJlcjtcbiAgICAgICAgcHVibGljIHk6IG51bWJlcjtcblxuXG5cbiAgICAgICAgcHVibGljIGNvbnN0cnVjdG9yKHg/OiBudW1iZXIsIHk/OiBudW1iZXIpIHtcbiAgICAgICAgICAgIGlmKCFpc05hTih4KSl7XG4gICAgICAgICAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMueCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBpZighaXNOYU4oeSkpe1xuICAgICAgICAgICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldCB0aGUgcG9pbnQncyB4IGFuZCB5IGNvb3JkaW5hdGVzXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgc2V0KHg6IG51bWJlciwgeTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBOZWdhdGUgdGhlIHBvaW50J3MgY29vcmRpbmF0ZXNcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBuZWdhdGUoKSB7XG4gICAgICAgICAgICB0aGlzLnggPSAtdGhpcy54O1xuICAgICAgICAgICAgdGhpcy55ID0gLXRoaXMueTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBPZmZzZXQgdGhlIHBvaW50J3MgY29vcmRpbmF0ZXMgYnkgZHgsIGR5XG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgb2Zmc2V0KGR4OiBudW1iZXIsIGR5OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMueCArPSBkeDtcbiAgICAgICAgICAgIHRoaXMueSArPSBkeTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHBvaW50J3MgY29vcmRpbmF0ZXMgZXF1YWwgKHgseSlcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBlcXVhbHMoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnggPT0geCAmJiB0aGlzLnkgPT0geTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBlcXVhbFBvaW50KHB0OlBvaW50KXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVxdWFscyhwdC54LHB0LnkpO1xuICAgICAgICB9XG5cblxuICAgICAgICBwdWJsaWMgaGFzaENvZGUoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIGxldCByZXN1bHQ6IG51bWJlciA9IHRoaXMueDtcbiAgICAgICAgICAgIHJlc3VsdCA9IDMxICogcmVzdWx0ICsgdGhpcy55O1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgICAgICAgICByZXR1cm4gXCJQb2ludChcIiArIHRoaXMueCArIFwiLCBcIiArIHRoaXMueSArIFwiKVwiO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFBhcmNlbGFibGUgaW50ZXJmYWNlIG1ldGhvZHNcbiAgICAgICAgICovXG5cbiAgICAgICAgcHVibGljIGRlc2NyaWJlQ29udGVudHMoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGNsb25lKCl7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFBvaW50KHRoaXMueCx0aGlzLnkpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiUG9pbnQudHNcIiAvPlxuXG5uYW1lc3BhY2UgYW5kcm9pZC5ncmFwaGljcyB7XG5cbiAgICBpbXBvcnQgUG9pbnQgPSBhbmRyb2lkLmdyYXBoaWNzLlBvaW50O1xuICAgIGV4cG9ydCBjbGFzcyBSZWN0IHtcbiAgICAgICAgbGVmdDogbnVtYmVyO1xuICAgICAgICB0b3A6IG51bWJlcjtcbiAgICAgICAgcmlnaHQ6IG51bWJlcjtcbiAgICAgICAgYm90dG9tOiBudW1iZXI7XG4gICAgICAgIHByaXZhdGUgX3N0YXJ0cG9pbnQ6IFBvaW50O1xuICAgICAgICBwcml2YXRlIF9lbmRwb2ludDogUG9pbnQ7XG5cbiAgICAgICAgY29uc3RydWN0b3IobGVmdDogbnVtYmVyLCB0b3A6IG51bWJlciwgcmlnaHQ6IG51bWJlciwgYm90dG9tOiBudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMubGVmdCA9IGxlZnQ7XG4gICAgICAgICAgICB0aGlzLnRvcCA9IHRvcDtcbiAgICAgICAgICAgIHRoaXMucmlnaHQgPSByaWdodDtcbiAgICAgICAgICAgIHRoaXMuYm90dG9tID0gYm90dG9tO1xuICAgICAgICB9XG4gICAgICAgIHJlc2V0KGxlZnQ6IG51bWJlciwgdG9wOiBudW1iZXIsIHJpZ2h0OiBudW1iZXIsIGJvdHRvbTogbnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLmxlZnQgPSBsZWZ0O1xuICAgICAgICAgICAgdGhpcy50b3AgPSB0b3A7XG4gICAgICAgICAgICB0aGlzLnJpZ2h0ID0gcmlnaHQ7XG4gICAgICAgICAgICB0aGlzLmJvdHRvbSA9IGJvdHRvbTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGdldCBjZW50ZXIoKTpQb2ludHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUG9pbnQodGhpcy5sZWZ0ICsgdGhpcy53aWR0aC8yLHRoaXMudG9wK3RoaXMuaGVpZ2h0LzIpO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBjb3JyZWN0KCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubGVmdCA+IHRoaXMucmlnaHQpIHtcbiAgICAgICAgICAgICAgICB2YXIgbDogbnVtYmVyID0gdGhpcy5sZWZ0O1xuICAgICAgICAgICAgICAgIHRoaXMubGVmdCA9IHRoaXMucmlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy5yaWdodCA9IGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy50b3AgPiB0aGlzLmJvdHRvbSkge1xuICAgICAgICAgICAgICAgIHZhciB0ID0gdGhpcy50b3A7XG4gICAgICAgICAgICAgICAgdGhpcy50b3AgPSB0aGlzLmJvdHRvbTtcbiAgICAgICAgICAgICAgICB0aGlzLmJvdHRvbSA9IHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIHRyYW5zbGF0ZSh4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICAgICAgICAgICAgdGhpcy5sZWZ0ICs9IHg7XG4gICAgICAgICAgICB0aGlzLnJpZ2h0ICs9IHg7XG4gICAgICAgICAgICB0aGlzLnRvcCArPSB5O1xuICAgICAgICAgICAgdGhpcy5ib3R0b20gKz0geTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyB0cmFuc2xhdGVYKHg6IG51bWJlcikge1xuICAgICAgICAgICAgdGhpcy50cmFuc2xhdGUoeCwgMCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgdHJhbnNsYXRlWSh5OiBudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNsYXRlKDAsIHkpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIHNjYWxlKHI6IG51bWJlcikge1xuICAgICAgICAgICAgLy8gaWYgKHIgPCAxICYmIHIgPiAwKSB7XG4gICAgICAgICAgICAvLyAgICAgdmFyIHcgPSB0aGlzLnJpZ2h0IC0gdGhpcy5sZWZ0O1xuICAgICAgICAgICAgLy8gICAgIHZhciBoID0gdGhpcy5ib3R0b20gLSB0aGlzLnRvcDtcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmxlZnQgKz0gciAqIHcgLyAyO1xuICAgICAgICAgICAgLy8gICAgIHRoaXMudG9wICs9IHIgKiBoIC8gMjtcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnJpZ2h0IC09IHIgKiB3IC8gMjtcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmJvdHRvbSAtPSByICogaCAvIDI7XG4gICAgICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gICAgIHRoaXMubGVmdCArPSByO1xuICAgICAgICAgICAgLy8gICAgIHRoaXMudG9wICs9IHI7XG4gICAgICAgICAgICAvLyAgICAgdGhpcy5yaWdodCAtPSByO1xuICAgICAgICAgICAgLy8gICAgIHRoaXMuYm90dG9tIC09IHI7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICBpZihyID4gMCl7XG4gICAgICAgICAgICAgICAgbGV0IGR3Om51bWJlciA9IHRoaXMud2lkdGggKnItdGhpcy53aWR0aDtcbiAgICAgICAgICAgICAgICBsZXQgZGg6bnVtYmVyID0gdGhpcy5oZWlnaHQgKiByIC0gdGhpcy5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy5sZWZ0IC09IGR3LzI7XG4gICAgICAgICAgICAgICAgdGhpcy5yaWdodCArPSBkdy8yO1xuICAgICAgICAgICAgICAgIHRoaXMudG9wIC09IGRoLzI7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3R0b20gKz0gZGgvMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IGlzTmlsKCkge1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLnJpZ2h0IC0gdGhpcy5sZWZ0IDw9IDAuMDEpIHx8XG4gICAgICAgICAgICAgICAgKHRoaXMuYm90dG9tIC0gdGhpcy50b3AgPD0gMC4wMSk7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IGhlaWdodCgpIHtcbiAgICAgICAgICAgIHJldHVybiAoKHRoaXMuYm90dG9tIC0gdGhpcy50b3ApKTtcbiAgICAgICAgfVxuICAgICAgICBnZXQgd2lkdGgoKSB7XG4gICAgICAgICAgICByZXR1cm4gKCh0aGlzLnJpZ2h0IC0gdGhpcy5sZWZ0KSk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IHdpZHRoKHdpZHRoOiBudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMucmlnaHQgPSB0aGlzLmxlZnQgKyB3aWR0aDtcblxuICAgICAgICB9XG4gICAgICAgIHNldCBoZWlnaHQoaGVpZ2h0OiBudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMuYm90dG9tID0gdGhpcy50b3AgKyBoZWlnaHQ7XG5cbiAgICAgICAgfVxuICAgICAgICBnZXQgc3RhcnRQb2ludCgpOiBQb2ludCB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3N0YXJ0cG9pbnQpIHsgdGhpcy5fc3RhcnRwb2ludCA9IG5ldyBQb2ludCh0aGlzLmxlZnQsIHRoaXMudG9wKTsgfVxuICAgICAgICAgICAgdGhpcy5fc3RhcnRwb2ludC54ID0gdGhpcy5sZWZ0O1xuICAgICAgICAgICAgdGhpcy5fc3RhcnRwb2ludC55ID0gdGhpcy50b3A7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3RhcnRwb2ludDtcbiAgICAgICAgfVxuICAgICAgICBnZXQgZW5kUG9pbnQoKTogUG9pbnQge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9lbmRwb2ludCkgeyB0aGlzLl9lbmRwb2ludCA9IG5ldyBQb2ludCh0aGlzLnJpZ2h0LCB0aGlzLmJvdHRvbSk7IH1cbiAgICAgICAgICAgIHRoaXMuX2VuZHBvaW50LnggPSB0aGlzLnJpZ2h0O1xuICAgICAgICAgICAgdGhpcy5fZW5kcG9pbnQueSA9IHRoaXMuYm90dG9tO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VuZHBvaW50O1xuICAgICAgICB9XG4gICAgICAgIGNvbnRhaW5zKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgICAgICAgICBpZiAoeCA8PSB0aGlzLnJpZ2h0ICYmIHggPj0gdGhpcy5sZWZ0ICYmIHkgPD0gdGhpcy5ib3R0b20gJiYgeSA+PSB0aGlzLnRvcCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNsb25lKCk6IFJlY3Qge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWN0KHRoaXMubGVmdCwgdGhpcy50b3AsIHRoaXMucmlnaHQsIHRoaXMuYm90dG9tKTtcbiAgICAgICAgfVxuICAgICAgICBlcXVhbChyZWN0OlJlY3QpOmJvb2xlYW57XG4gICAgICAgICAgICBpZihyZWN0ICE9IG51bGwpe1xuICAgICAgICAgICAgICAgIHJldHVybiByZWN0LmxlZnQgPT09IHRoaXMubGVmdCAmJiByZWN0LnRvcCA9PT0gdGhpcy50b3AgJiYgcmVjdC5ib3R0b20gPT09IHRoaXMuYm90dG9tICYmIHJlY3QucmlnaHQgPT09IHRoaXMucmlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdG9TdHJpbmcoKTpzdHJpbmd7XG4gICAgICAgICAgICByZXR1cm4gXCI8IGxlZnQ6XCIrdGhpcy5sZWZ0K1wiICx0b3A6XCIrdGhpcy50b3ArXCIgLCB3aWR0aDpcIit0aGlzLndpZHRoK1wiICxoZWlnaHQ6XCIrdGhpcy5oZWlnaHQrXCIgPlwiO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn0iLCJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJSZWN0LnRzXCIgLz5cblxubmFtZXNwYWNlIGFuZHJvaWQuZ3JhcGhpY3Mge1xuXG4gICAgaW1wb3J0IFJlY3QgPSBhbmRyb2lkLmdyYXBoaWNzLlJlY3Q7XG5cbiAgICBleHBvcnQgZW51bSBHcmF2aXR5IHtcbiAgICAgICAgTGVmdCxcbiAgICAgICAgQ2VudGVyLFxuICAgICAgICBSaWdodCxcbiAgICAgICAgVG9wLFxuICAgICAgICBCb3R0b20sXG4gICAgICAgIEF1dG8sXG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIFBhZGRpbmcge1xuICAgICAgICBsZWZ0UGFkZGluZzogbnVtYmVyO1xuICAgICAgICByaWdodFBhZGRpbmc6IG51bWJlcjtcbiAgICAgICAgdG9wUGFkZGluZzogbnVtYmVyO1xuICAgICAgICBib3R0b21QYWRkaW5nOiBudW1iZXI7XG4gICAgICAgIGNvbnN0cnVjdG9yKHBhZGRpbmc/OiBudW1iZXIpIHtcbiAgICAgICAgICAgIGlmIChwYWRkaW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYWRkaW5nID0gcGFkZGluZztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYWRkaW5nID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzZXQgcGFkZGluZyhwYWRkaW5nOiBudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMubGVmdFBhZGRpbmcgPSB0aGlzLnJpZ2h0UGFkZGluZyA9IHRoaXMudG9wUGFkZGluZyA9IHRoaXMuYm90dG9tUGFkZGluZyA9IHBhZGRpbmc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgZW51bSBQb3NpdGlvbiB7XG4gICAgICAgIExlZnQsXG4gICAgICAgIFRvcCxcbiAgICAgICAgUmlnaHQsXG4gICAgICAgIEJvdHRvbVxuICAgIH1cblxuICAgIGV4cG9ydCBlbnVtIE9yaWVudGF0aW9uIHtcbiAgICAgICAgSG9yaXpvbnRhbCxcbiAgICAgICAgVmVydGljYWxcbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgU3Ryb2tlU3R5bGUge1xuXG4gICAgICAgIHN0cm9rZVdpZHRoOiBudW1iZXI7XG4gICAgICAgIHN0cm9rZUNvbG9yOiBzdHJpbmc7XG4gICAgICAgIGRhc2g6bnVtYmVyW107XG4gICAgICAgIGRhc2hPZmZzZXQ6bnVtYmVyO1xuICAgICAgICBjb25zdHJ1Y3RvcihzdHJva2V3aWR0aDogbnVtYmVyLCBzdHJva2Vjb2xvcjogc3RyaW5nLGRhc2g/Om51bWJlcltdLGRhc2hvZmZzZXQ/Om51bWJlcikge1xuICAgICAgICAgICAgdGhpcy5zdHJva2VXaWR0aCA9IHN0cm9rZXdpZHRoO1xuICAgICAgICAgICAgdGhpcy5zdHJva2VDb2xvciA9IHN0cm9rZWNvbG9yO1xuICAgICAgICAgICAgaWYoZGFzaCAhPSBudWxsICYmIGRhc2ggaW5zdGFuY2VvZiBBcnJheSAmJiBkYXNoLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIHRoaXMuZGFzaCA9IGRhc2g7XG4gICAgICAgICAgICAgICAgaWYoZGFzaG9mZnNldCAhPSBudWxsICYmICFpc05hTihkYXNob2Zmc2V0KSl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGFzaE9mZnNldCA9IGRhc2hvZmZzZXQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGdldENzc1N0eWxlKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAnc3Ryb2tlLXdpZHRoJzogdGhpcy5zdHJva2VXaWR0aCxcbiAgICAgICAgICAgICAgICAnc3Ryb2tlJzogdGhpcy5zdHJva2VDb2xvclxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNsb25lKCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBTdHJva2VTdHlsZSh0aGlzLnN0cm9rZVdpZHRoLCB0aGlzLnN0cm9rZUNvbG9yKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIEZvbnQge1xuICAgICAgICBjb25zdHJ1Y3RvcihmejogbnVtYmVyLCBmbTogc3RyaW5nLCBmYzogc3RyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmZvbnRTaXplID0gZno7XG4gICAgICAgICAgICB0aGlzLmZvbnRGYW1pbHkgPSBmbTtcbiAgICAgICAgICAgIHRoaXMuZm9udENvbG9yID0gZmM7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZm9udEZhbWlseSB8fCB0aGlzLmZvbnRGYW1pbHkgPT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvbnRGYW1pbHkgPSAnQXJpYWwnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvbnRTaXplOiBudW1iZXI7XG4gICAgICAgIGZvbnRGYW1pbHk6IHN0cmluZztcbiAgICAgICAgZm9udENvbG9yOiBzdHJpbmc7XG4gICAgICAgIHRvU3RyaW5nKCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiIGZvbnRTaXplID0gXCIgKyB0aGlzLmZvbnRTaXplICsgXCIsIGZvbnRGYW1pbHkgPSBcIiArIHRoaXMuZm9udEZhbWlseSArIFwiLCBmb250Q29sb3IgPSBcIiArIHRoaXMuZm9udEZhbWlseTtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgY2xvbmUoKTogRm9udCB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEZvbnQodGhpcy5mb250U2l6ZSwgdGhpcy5mb250RmFtaWx5LCB0aGlzLmZvbnRDb2xvcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgU3R5bGUge1xuICAgICAgICBjb25zdHJ1Y3RvcihiZzogc3RyaW5nIHwgRmlsbFN0eWxlLCBzdHJva2U6IFN0cm9rZVN0eWxlKSB7XG4gICAgICAgICAgICB0aGlzLmJhY2tncm91bmQgPSBiZztcbiAgICAgICAgICAgIHRoaXMuc3Ryb2tlU3R5bGUgPSBzdHJva2U7XG4gICAgICAgIH1cbiAgICAgICAgYmFja2dyb3VuZDogc3RyaW5nIHwgRmlsbFN0eWxlO1xuICAgICAgICBzdHJva2VTdHlsZTogU3Ryb2tlU3R5bGU7XG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIEdyYWRpZW50IHtcbiAgICAgICAgcHVibGljIGNvbG9yczp7b2Zmc2V0Om51bWJlcixjb2xvcjpzdHJpbmd9W10gPVtdO1xuICAgICAgICBjb25zdHJ1Y3Rvcihjb2xvcnM6e29mZnNldDpudW1iZXIsY29sb3I6c3RyaW5nfVtdKXtcbiAgICAgICAgICAgIHRoaXMuY29sb3JzID0gY29sb3JzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIExpbmVhckdyYWRpZW50IGV4dGVuZHMgR3JhZGllbnQge1xuICAgICAgICBwdWJsaWMgc3RhcnR4OiBudW1iZXI7XG4gICAgICAgIHB1YmxpYyBzdGFydHk6IG51bWJlcjtcbiAgICAgICAgcHVibGljIGVuZHg6bnVtYmVyO1xuICAgICAgICBwdWJsaWMgZW5keTpudW1iZXI7XG4gICAgICAgIGNvbnN0cnVjdG9yKHN4Om51bWJlcixzeTpudW1iZXIsZXg6bnVtYmVyLGV5Om51bWJlcixjb2xvcnM6e29mZnNldDpudW1iZXIsY29sb3I6c3RyaW5nfVtdKXtcbiAgICAgICAgICAgIHN1cGVyKGNvbG9ycyk7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0eCA9c3g7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0eSA9c3k7XG4gICAgICAgICAgICB0aGlzLmVuZHggPSBleDtcbiAgICAgICAgICAgIHRoaXMuZW5keSA9IGV5O1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgUmFkaWFsR3JhZGllbnQgZXh0ZW5kcyBHcmFkaWVudCB7XG4gICAgICAgIHB1YmxpYyBjZW50ZXJ4Om51bWJlcjtcbiAgICAgICAgcHVibGljIGNlbnRlcnk6bnVtYmVyO1xuICAgICAgICBwdWJsaWMgcmFkaXVzOm51bWJlclxuICAgICAgICBcbiAgICAgICAgcHVibGljIGNlbnRlcngxOm51bWJlcjtcbiAgICAgICAgcHVibGljIGNlbnRlcnkxOm51bWJlcjtcbiAgICAgICAgcHVibGljIHJhZGl1czE6bnVtYmVyO1xuICAgICAgICBjb25zdHJ1Y3RvcihjeDpudW1iZXIsY3k6bnVtYmVyLHI6bnVtYmVyLGN4MTpudW1iZXIsY3kxOm51bWJlcixyMTpudW1iZXIsY29sb3JzOntvZmZzZXQ6bnVtYmVyLGNvbG9yOnN0cmluZ31bXSl7XG4gICAgICAgICAgICBzdXBlcihjb2xvcnMpO1xuICAgICAgICAgICAgdGhpcy5jZW50ZXJ4ID1jeDtcbiAgICAgICAgICAgIHRoaXMuY2VudGVyeSA9IGN5O1xuICAgICAgICAgICAgdGhpcy5yYWRpdXMgPSByO1xuICAgICAgICAgICAgdGhpcy5jZW50ZXJ4MSA9Y3gxO1xuICAgICAgICAgICAgdGhpcy5jZW50ZXJ5MSA9IGN5MTtcbiAgICAgICAgICAgIHRoaXMucmFkaXVzMSA9IHIxO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgU2hhZG93IHtcbiAgICAgICAgb2Zmc2V0eDogbnVtYmVyO1xuICAgICAgICBvZmZzZXR5OiBudW1iZXI7XG4gICAgICAgIGNvbG9yOiBzdHJpbmc7XG4gICAgICAgIGJsdXI6IG51bWJlcjtcbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgRmlsbFN0eWxlIHtcbiAgICAgICAgcHVibGljIGZpbGw6IEdyYWRpZW50IHwgc3RyaW5nO1xuICAgICAgICBwdWJsaWMgc2hhZG93OiBTaGFkb3c7XG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgdGhpcy5maWxsID0gJ3RyYW5zcGFyZW50JztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBVdGlsIHtcbiAgICAgICAgc3RhdGljIGNsb25lRGVlcChvYmplY3Q6IGFueSk6IGFueSB7XG4gICAgICAgICAgICBpZiAoKG9iamVjdCA9PSBudWxsKSB8fFxuICAgICAgICAgICAgICAgICh0eXBlb2Ygb2JqZWN0ID09PSAnbnVtYmVyJykgfHxcbiAgICAgICAgICAgICAgICAodHlwZW9mIG9iamVjdCA9PT0gJ3N0cmluZycpIHx8XG4gICAgICAgICAgICAgICAgKHR5cGVvZiBvYmplY3QgPT09ICdib29sZWFuJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9iamVjdCkpIHtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbXMgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIG9iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKFV0aWwuY2xvbmVEZWVwKGl0ZW0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAob2JqZWN0IGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZShvYmplY3QuZ2V0VGltZSgpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGNsb25lT2JqZWN0OiBhbnkgPSB7fTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0W2tleV0gPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmVPYmplY3Rba2V5XSA9IG9iamVjdFtrZXldO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmVPYmplY3Rba2V5XSA9IFV0aWwuY2xvbmVEZWVwKG9iamVjdFtrZXldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gY2xvbmVPYmplY3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0aWMgY29udGFpbnMocmVjdDogUmVjdCwgcHQ6IFBvaW50KTogYm9vbGVhbiB7XG4gICAgICAgICAgICBpZiAocHQueCA8PSByZWN0LnJpZ2h0ICYmIHB0LnggPj0gcmVjdC5sZWZ0ICYmIHB0LnkgPD0gcmVjdC5ib3R0b20gJiYgcHQueSA+PSByZWN0LnRvcCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRpYyBnZXRSZWN0KHN0YXJ0OiBQb2ludCwgc2l6ZTogU2l6ZSk6IFJlY3Qge1xuICAgICAgICAgICAgbGV0IHJlY3Q6IFJlY3QgPSBuZXcgUmVjdChzdGFydC54LCBzdGFydC55LCBzdGFydC54ICsgc2l6ZS53aWR0aCwgc3RhcnQueSArIHNpemUuaGVpZ2h0KTtcbiAgICAgICAgICAgIHJldHVybiByZWN0O1xuICAgICAgICB9XG4gICAgICAgIHN0YXRpYyBnZXRTdHlsZUNzcyhzdHlsZTogU3R5bGUpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG5cbiAgICAgICAgICAgICAgICBcImZpbGxcIjogc3R5bGUuYmFja2dyb3VuZCxcbiAgICAgICAgICAgICAgICBcInN0cm9rZVwiOiBzdHlsZS5zdHJva2VTdHlsZSA/IHN0eWxlLnN0cm9rZVN0eWxlLnN0cm9rZUNvbG9yIDogXCJcIixcbiAgICAgICAgICAgICAgICBcInN0cm9rZS13aWR0aFwiOiBzdHlsZS5zdHJva2VTdHlsZSA/IHN0eWxlLnN0cm9rZVN0eWxlLnN0cm9rZVdpZHRoIDogMFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN0YXRpYyB1bmlvbiguLi5yZWN0czogUmVjdFtdKTogUmVjdCB7XG4gICAgICAgICAgICBsZXQgcmVjdDogUmVjdCA9IG5ldyBhbmRyb2lkLmdyYXBoaWNzLlJlY3QoMCwgMCwgMCwgMCk7XG4gICAgICAgICAgICByZWN0LmxlZnQgPSBNYXRoLm1pbi5hcHBseSh0aGlzLCByZWN0cy5tYXAoZSA9PiBlLmxlZnQpKTtcbiAgICAgICAgICAgIHJlY3QudG9wID0gTWF0aC5taW4uYXBwbHkodGhpcywgcmVjdHMubWFwKGUgPT4gZS50b3ApKTtcbiAgICAgICAgICAgIHJlY3QucmlnaHQgPSBNYXRoLm1heC5hcHBseSh0aGlzLCByZWN0cy5tYXAoZSA9PiBlLnJpZ2h0KSk7XG4gICAgICAgICAgICByZWN0LmJvdHRvbSA9IE1hdGgubWF4LmFwcGx5KHRoaXMsIHJlY3RzLm1hcChlID0+IGUuYm90dG9tKSk7XG4gICAgICAgICAgICByZXR1cm4gcmVjdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRpYyBoZXhUb1JnYihoZXgpIHtcblxuICAgICAgICAgICAgdmFyIHNob3J0aGFuZFJlZ2V4ID0gL14jPyhbYS1mXFxkXSkoW2EtZlxcZF0pKFthLWZcXGRdKSQvaTtcbiAgICAgICAgICAgIGhleCA9IGhleC5yZXBsYWNlKHNob3J0aGFuZFJlZ2V4LCBmdW5jdGlvbiAobSwgciwgZywgYikge1xuICAgICAgICAgICAgICAgIHJldHVybiByICsgciArIGcgKyBnICsgYiArIGI7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IC9eIz8oW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkkL2kuZXhlYyhoZXgpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdCA/IHtcbiAgICAgICAgICAgICAgICByOiBwYXJzZUludChyZXN1bHRbMV0sIDE2KSxcbiAgICAgICAgICAgICAgICBnOiBwYXJzZUludChyZXN1bHRbMl0sIDE2KSxcbiAgICAgICAgICAgICAgICBiOiBwYXJzZUludChyZXN1bHRbM10sIDE2KVxuICAgICAgICAgICAgfSA6IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0aWMgcmdiVG9IZXgociwgZywgYikge1xuICAgICAgICAgICAgcmV0dXJuIFwiI1wiICsgVXRpbC5jb21wb25lbnRUb0hleChyKSArIFV0aWwuY29tcG9uZW50VG9IZXgoZykgKyBVdGlsLmNvbXBvbmVudFRvSGV4KGIpO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRpYyBjb21wb25lbnRUb0hleChjKSB7XG4gICAgICAgICAgICB2YXIgaGV4ID0gYy50b1N0cmluZygxNik7XG4gICAgICAgICAgICByZXR1cm4gaGV4Lmxlbmd0aCA9PSAxID8gXCIwXCIgKyBoZXggOiBoZXg7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGljIGFzRW51bSh2YWx1ZTogbnVtYmVyLCBlbnVtVHlwZTogYW55LCBudWxsT0sgPSBmYWxzZSk6IG51bWJlciB7XG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCAmJiBudWxsT0spIHJldHVybiBudWxsO1xuICAgICAgICAgICAgdmFyIGUgPSBlbnVtVHlwZVt2YWx1ZV07XG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIChlKSA9PT0gJ251bWJlcicgPyBlIDogdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGljIGlzTWl4ZWQocjE6IFJlY3QsIHIyOiBSZWN0KTogYm9vbGVhbiB7XG4gICAgICAgICAgICB2YXIgaXNtaXhlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKE1hdGguYWJzKChyMS5sZWZ0ICsgcjEucmlnaHQpIC8gMiAtIChyMi5sZWZ0ICsgcjIucmlnaHQpIC8gMilcbiAgICAgICAgICAgICAgICA8ICgocjEucmlnaHQgKyByMi5yaWdodCAtIHIxLmxlZnQgLSByMi5sZWZ0KSAvIDIpICYmIE1hdGguYWJzKChyMS50b3AgKyByMS5ib3R0b20pIC8gMlxuICAgICAgICAgICAgICAgICAgICAtIChyMi50b3AgKyByMi5ib3R0b20pIC8gMikgPCAoKHIxLmJvdHRvbSArIHIyLmJvdHRvbSAtIHIxLnRvcCAtIHIyLnRvcCkgLyAyKSkge1xuICAgICAgICAgICAgICAgIGlzbWl4ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGlzbWl4ZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0aWMgY29udGFpbnNSZWN0KHIxOiBSZWN0LCByMjogUmVjdCk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgbGV0IGZsZzogYm9vbGVhbiA9IHIxLmxlZnQgPD0gcjIubGVmdCAmJlxuICAgICAgICAgICAgICAgIHIxLnRvcCA8PSByMi50b3AgJiZcbiAgICAgICAgICAgICAgICByMS5yaWdodCA+PSByMi5yaWdodCAmJlxuICAgICAgICAgICAgICAgIHIxLmJvdHRvbSA+PSByMi5ib3R0b207XG4gICAgICAgICAgICByZXR1cm4gZmxnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbGV0IGZsZzE6Ym9vbGVhbiA9IHIxLmxlZnQgPD1yMi5sZWZ0ICYmXG4gICAgICAgIC8vIHIxLnRvcCA8PSByMi50b3AgJiZcbiAgICAgICAgLy8gcjEucmlnaHQgPj1yMi5yaWdodCAmJlxuICAgICAgICAvLyByMS5ib3R0b20gPj0gcjIuYm90dG9tO1xuXG5cbiAgICAgICAgc3RhdGljIElzUG9pbnRJblBvbHlnb24ocDogUG9pbnQsIHBvbHlnb246IFBvaW50W10pOiBib29sZWFuIHtcbiAgICAgICAgICAgIGxldCBtaW5YID0gcG9seWdvblswXS54O1xuICAgICAgICAgICAgbGV0IG1heFggPSBwb2x5Z29uWzBdLng7XG4gICAgICAgICAgICBsZXQgbWluWSA9IHBvbHlnb25bMF0ueTtcbiAgICAgICAgICAgIGxldCBtYXhZID0gcG9seWdvblswXS55O1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBwb2x5Z29uLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHE6IFBvaW50ID0gcG9seWdvbltpXTtcbiAgICAgICAgICAgICAgICBtaW5YID0gTWF0aC5taW4ocS54LCBtaW5YKTtcbiAgICAgICAgICAgICAgICBtYXhYID0gTWF0aC5tYXgocS54LCBtYXhYKTtcbiAgICAgICAgICAgICAgICBtaW5ZID0gTWF0aC5taW4ocS55LCBtaW5ZKTtcbiAgICAgICAgICAgICAgICBtYXhZID0gTWF0aC5tYXgocS55LCBtYXhZKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHAueCA8IG1pblggfHwgcC54ID4gbWF4WCB8fCBwLnkgPCBtaW5ZIHx8IHAueSA+IG1heFkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGh0dHA6Ly93d3cuZWNzZS5ycGkuZWR1L0hvbWVwYWdlcy93cmYvUmVzZWFyY2gvU2hvcnRfTm90ZXMvcG5wb2x5Lmh0bWxcbiAgICAgICAgICAgIGxldCBpbnNpZGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBqID0gcG9seWdvbi5sZW5ndGggLSAxOyBpIDwgcG9seWdvbi5sZW5ndGg7IGogPSBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoKHBvbHlnb25baV0ueSA+IHAueSkgIT0gKHBvbHlnb25bal0ueSA+IHAueSkgJiZcbiAgICAgICAgICAgICAgICAgICAgcC54IDwgKHBvbHlnb25bal0ueCAtIHBvbHlnb25baV0ueCkgKiAocC55IC0gcG9seWdvbltpXS55KSAvIChwb2x5Z29uW2pdLnkgLSBwb2x5Z29uW2ldLnkpICsgcG9seWdvbltpXS54KSB7XG4gICAgICAgICAgICAgICAgICAgIGluc2lkZSA9ICFpbnNpZGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gaW5zaWRlO1xuICAgICAgICB9XG5cblxuICAgICAgICBzdGF0aWMgSXNQb2ludEluUG9seWdvbjIocDogUG9pbnQsIHhzOiBudW1iZXJbXSwgeXM6IG51bWJlcltdKTogYm9vbGVhbiB7XG4gICAgICAgICAgICBsZXQgbWluWCA9IHhzWzBdO1xuICAgICAgICAgICAgbGV0IG1heFggPSB4c1swXTtcbiAgICAgICAgICAgIGxldCBtaW5ZID0geXNbMF07XG4gICAgICAgICAgICBsZXQgbWF4WSA9IHlzWzBdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCB4cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIC8vIGxldCBxOiBQb2ludCA9IHBvbHlnb25baV07XG4gICAgICAgICAgICAgICAgbWluWCA9IE1hdGgubWluKHhzW2ldLCBtaW5YKTtcbiAgICAgICAgICAgICAgICBtYXhYID0gTWF0aC5tYXgoeHNbaV0sIG1heFgpO1xuICAgICAgICAgICAgICAgIG1pblkgPSBNYXRoLm1pbih5c1tpXSwgbWluWSk7XG4gICAgICAgICAgICAgICAgbWF4WSA9IE1hdGgubWF4KHlzW2ldLCBtYXhZKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHAueCA8IG1pblggfHwgcC54ID4gbWF4WCB8fCBwLnkgPCBtaW5ZIHx8IHAueSA+IG1heFkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBpbnNpZGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBqID0geHMubGVuZ3RoIC0gMTsgaSA8IHhzLmxlbmd0aDsgaiA9IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICgoeXNbaV0gPiBwLnkpICE9ICh5c1tqXSA+IHAueSkgJiZcbiAgICAgICAgICAgICAgICAgICAgcC54IDwgKHhzW2pdIC0geHNbaV0pICogKHAueSAtIHlzW2ldKSAvICh5c1tqXSAtIHlzW2ldKSArIHhzW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIGluc2lkZSA9ICFpbnNpZGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gaW5zaWRlO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGljIFBvaW50MkxpbmUoeDE6IG51bWJlciwgeTE6IG51bWJlciwgeDI6IG51bWJlciwgeTI6IG51bWJlciwgeDA6IG51bWJlciwgeTA6IG51bWJlcik6IG51bWJlciB7XG5cbiAgICAgICAgICAgIGxldCBzcGFjZTogbnVtYmVyID0gMDtcblxuICAgICAgICAgICAgbGV0IGE6IG51bWJlciwgYjogbnVtYmVyLCBjOiBudW1iZXI7XG5cbiAgICAgICAgICAgIGEgPSBVdGlsLl9saW5lU3BhY2UoeDEsIHkxLCB4MiwgeTIpO1xuXG4gICAgICAgICAgICBiID0gVXRpbC5fbGluZVNwYWNlKHgxLCB5MSwgeDAsIHkwKTtcblxuICAgICAgICAgICAgYyA9IFV0aWwuX2xpbmVTcGFjZSh4MiwgeTIsIHgwLCB5MCk7XG5cbiAgICAgICAgICAgIGlmIChjICsgYiA9PSBhKSB7XG4gICAgICAgICAgICAgICAgc3BhY2UgPSAwO1xuICAgICAgICAgICAgICAgIHJldHVybiBzcGFjZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhIDw9IDAuMDAwMDAxKSB7XG4gICAgICAgICAgICAgICAgc3BhY2UgPSBiO1xuICAgICAgICAgICAgICAgIHJldHVybiBzcGFjZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjICogYyA+PSBhICogYSArIGIgKiBiKSB7XG4gICAgICAgICAgICAgICAgc3BhY2UgPSBiO1xuICAgICAgICAgICAgICAgIHJldHVybiBzcGFjZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChiICogYiA+PSBhICogYSArIGMgKiBjKSB7XG4gICAgICAgICAgICAgICAgc3BhY2UgPSBjO1xuICAgICAgICAgICAgICAgIHJldHVybiBzcGFjZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBwOiBudW1iZXIgPSAoYSArIGIgKyBjKSAvIDI7XG4gICAgICAgICAgICBsZXQgczogbnVtYmVyID0gTWF0aC5zcXJ0KHAgKiAocCAtIGEpICogKHAgLSBiKSAqIChwIC0gYykpO1xuICAgICAgICAgICAgc3BhY2UgPSAyICogcyAvIGE7XG4gICAgICAgICAgICByZXR1cm4gc3BhY2U7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAqIEBoaWRkZW5cbiAgICAgICovXG4gICAgICAgIHByaXZhdGUgc3RhdGljIF9saW5lU3BhY2UoeDE6IG51bWJlciwgeTE6IG51bWJlciwgeDI6IG51bWJlciwgeTI6IG51bWJlcikge1xuICAgICAgICAgICAgbGV0IGxpbmVMZW5ndGg6IG51bWJlciA9IDA7XG4gICAgICAgICAgICBsaW5lTGVuZ3RoID0gTWF0aC5zcXJ0KCh4MSAtIHgyKSAqICh4MSAtIHgyKSArICh5MSAtIHkyKSAqICh5MSAtIHkyKSk7XG4gICAgICAgICAgICByZXR1cm4gbGluZUxlbmd0aDtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgc3RhdGljIEFyZWEoeHM6IG51bWJlcltdLCB5czogbnVtYmVyW10pIHtcbiAgICAgICAgICAgIGxldCBhcmVhID0gMC4wMDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgeHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoaSA8IHhzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgYXJlYSArPSB4c1tpXSAqIHlzW2kgKyAxXSAtIHhzW2kgKyAxXSAqIHlzW2ldO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFyZWEgKz0geHNbaV0gKiB5c1swXSAtIHhzWzBdICogeXNbaV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXJlYSA9IGFyZWEgLyAyLjAwO1xuICAgICAgICAgICAgcmV0dXJuIGFyZWE7XG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgc3RhdGljIENlbnRlck9mUG9seWdvbih4czogbnVtYmVyW10sIHlzOiBudW1iZXJbXSk6IFBvaW50IHtcbiAgICAgICAgICAgIGxldCBhcmVhID0gMC4wOy8v5aSa6L655b2i6Z2i56evICBcbiAgICAgICAgICAgIGxldCBHeCA9IDAuMCwgR3kgPSAwLjA7Ly8g6YeN5b+D55qEeOOAgXkgIFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0geHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgaUxhdCA9IHhzWyhpICUgeHMubGVuZ3RoKV07XG4gICAgICAgICAgICAgICAgbGV0IGlMbmcgPSB5c1soaSAlIHlzLmxlbmd0aCldO1xuICAgICAgICAgICAgICAgIGxldCBuZXh0TGF0ID0geHNbKChpIC0gMSkgJSB4cy5sZW5ndGgpXTtcbiAgICAgICAgICAgICAgICBsZXQgbmV4dExuZyA9IHlzWygoaSAtIDEpICUgeXMubGVuZ3RoKV07XG4gICAgICAgICAgICAgICAgbGV0IHRlbXAgPSAoaUxhdCAqIG5leHRMbmcgLSBpTG5nICogbmV4dExhdCkgLyAyLjA7XG4gICAgICAgICAgICAgICAgYXJlYSArPSB0ZW1wO1xuICAgICAgICAgICAgICAgIEd4ICs9IHRlbXAgKiAoaUxhdCArIG5leHRMYXQpIC8gMy4wO1xuICAgICAgICAgICAgICAgIEd5ICs9IHRlbXAgKiAoaUxuZyArIG5leHRMbmcpIC8gMy4wO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgR3ggPSBHeCAvIGFyZWE7XG4gICAgICAgICAgICBHeSA9IEd5IC8gYXJlYTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUG9pbnQoR3gsIEd5KTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgc3RhdGljIEhhc2hDb2RlKG9iajpudW1iZXJ8c3RyaW5nfGFueSk6c3RyaW5ne1xuICAgICAgICAgICAgaWYob2JqID09IG51bGwpe3JldHVybiAnJzt9XG4gICAgICAgICAgICBpZihvYmogaW5zdGFuY2VvZiBPYmplY3Qpe1xuICAgICAgICAgICAgICAgIGxldCBoYXNoOnN0cmluZyA9ICcnO1xuICAgICAgICAgICAgICAgIGZvcihsZXQga2V5IGluIG9iail7XG4gICAgICAgICAgICAgICAgICAgIGhhc2ggPSBoYXNoK1V0aWwuSGFzaENvZGUoa2V5KStVdGlsLkhhc2hDb2RlKG9ialtrZXldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIFV0aWwuSGFzaENvZGVTdHJpbmcoaGFzaCk7XG4gICAgICAgICAgICB9ZWxzZSBpZih0eXBlb2Ygb2JqID09J3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gVXRpbC5IYXNoQ29kZVN0cmluZyhvYmopO1xuICAgICAgICAgICAgfWVsc2UgaWYodHlwZW9mIG9iaiA9PSAnbnVtYmVyJyl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFV0aWwuSGFzaENvZGVTdHJpbmcoJ251bWJlcicrb2JqKTtcbiAgICAgICAgICAgIH1lbHNlIGlmKHR5cGVvZiBvYmogPT0nYm9vbGVhbicpe1xuICAgICAgICAgICAgICAgIHJldHVybiBVdGlsLkhhc2hDb2RlU3RyaW5nKCdib29sZWFuJytvYmopO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0aWMgSGFzaENvZGVTdHJpbmcob2JqOnN0cmluZyk6c3RyaW5ne1xuICAgICAgICAgICAgbGV0IGhhc2ggPSAwLGkgLGNocjtcbiAgICAgICAgICAgIGlmKG9iaj09IG51bGwgfHwgb2JqLmxlbmd0aCA9PT0gMCl7cmV0dXJuIGhhc2grJyc7fVxuICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgb2JqLmxlbmd0aDsgKytpKXtcbiAgICAgICAgICAgICAgICBjaHIgPSBvYmouY2hhckNvZGVBdChpKTtcbiAgICAgICAgICAgICAgICBoYXNoID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBjaHI7XG4gICAgICAgICAgICAgICAgaGFzaCB8PSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGhhc2grJyc7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHN0YXRpYyBjcmVhdGVQdHNGcm9tUmVjdChyZWN0OlJlY3Qsc2l6ZTpudW1iZXIpOnt4czpudW1iZXJbXSx5czpudW1iZXJbXX17XG4gICAgICAgICAgICBsZXQgeHM6bnVtYmVyW109W107XG4gICAgICAgICAgICBsZXQgeXM6bnVtYmVyW109W107XG4gICAgICAgICAgICBsZXQgcHRzOlBvaW50W10gPSBbbmV3IFBvaW50KHJlY3QubGVmdCxyZWN0LnRvcCksbmV3IFBvaW50KHJlY3QucmlnaHQscmVjdC50b3ApLG5ldyBQb2ludChyZWN0LnJpZ2h0LHJlY3QuYm90dG9tKSxuZXcgUG9pbnQocmVjdC5sZWZ0LHJlY3QuYm90dG9tKSxuZXcgUG9pbnQocmVjdC5sZWZ0LHJlY3QudG9wKV07XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcHRzLmxlbmd0aC0xOyArK2kpe1xuICAgICAgICAgICAgICAgIGxldCBwMT1wdHNbaV07XG4gICAgICAgICAgICAgICAgbGV0IHAyPXB0c1tpKzFdO1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBzaXplLzQ7KytqKXtcbiAgICAgICAgICAgICAgICAgICAgeHMucHVzaChwMS54KyAocDIueC1wMS54KS8oc2l6ZS80KSAqaik7XG4gICAgICAgICAgICAgICAgICAgIHlzLnB1c2gocDEueSsgKHAyLnktcDEueSkvKHNpemUvNCkgKmopO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7eHM6eHMseXM6eXN9O1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGljIGNyZWF0ZVB0c0Zyb21DaXJjbGUocmFpZGl1czpudW1iZXIsY2VudGVyOlBvaW50LHNpemU6bnVtYmVyKTp7eHM6bnVtYmVyW10seXM6bnVtYmVyW119e1xuICAgICAgICAgICAgbGV0IHhzOm51bWJlcltdPVtdO1xuICAgICAgICAgICAgbGV0IHlzOm51bWJlcltdPVtdO1xuICAgICAgICAgICAgbGV0IHBpOm51bWJlciA9IE1hdGguUEk7XG4gICAgICAgICAgICBmb3IobGV0IGkgPTA7IGkgPHNpemU7ICsraSl7XG4gICAgICAgICAgICAgICAgbGV0IGFuZ2xlOm51bWJlciA9IDM2MC9zaXplICogaSAvIHBpO1xuICAgICAgICAgICAgICAgIGxldCB4Om51bWJlciA9IE1hdGguc2luKGFuZ2xlKSAqIHJhaWRpdXMgKyBjZW50ZXIueDtcbiAgICAgICAgICAgICAgICBsZXQgeTpudW1iZXIgPSBNYXRoLmNvcyhhbmdsZSkgKiByYWlkaXVzICsgY2VudGVyLnk7XG4gICAgICAgICAgICAgICAgeHMucHVzaCh4KTtcbiAgICAgICAgICAgICAgICB5cy5wdXNoKHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHt4czp4cyx5czp5c307XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0aWMgY3JlYXRlUHRzRnJvbVJhZGlhbEJhcihzdGFydEFuZ2xlOm51bWJlcixlbmRBbmdsZTpudW1iZXIscmFkaXVzOm51bWJlcixpbm5lclJhZGl1czpudW1iZXIsY2VudGVyOlBvaW50LHNpemU6bnVtYmVyKTp7eHM6bnVtYmVyW10seXM6bnVtYmVyW119e1xuICAgICAgICAgICAgbGV0IHhzOm51bWJlcltdPVtdO1xuICAgICAgICAgICAgbGV0IHlzOm51bWJlcltdPVtdO1xuICAgICAgICAgICAgbGV0IGlubmVyeHM6bnVtYmVyW109W107XG4gICAgICAgICAgICBsZXQgaW5uZXJ5czpudW1iZXJbXT1bXTtcbiAgICAgICAgICAgIGxldCBwaTpudW1iZXIgPSBNYXRoLlBJO1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRTaXplOm51bWJlciA9IHNpemU7XG4gICAgICAgICAgICBsZXQgc3RlcDpudW1iZXIgPSAoZW5kQW5nbGUtc3RhcnRBbmdsZSkvKGN1cnJlbnRTaXplIC8gMik7XG4gICAgICAgICAgICBmb3IobGV0IGFuZ2xlOm51bWJlciA9IHN0YXJ0QW5nbGUgOyBhbmdsZSA8IGVuZEFuZ2xlICYmIHhzLmxlbmd0aCA8PSBjdXJyZW50U2l6ZS8yOyBhbmdsZSs9c3RlcCl7XG5cbiAgICAgICAgICAgICAgICBsZXQgeDpudW1iZXIgPSBNYXRoLmNvcyhhbmdsZSkgKiByYWRpdXMgKyBjZW50ZXIueDtcbiAgICAgICAgICAgICAgICBsZXQgeTpudW1iZXIgPSBNYXRoLnNpbihhbmdsZSkgKiByYWRpdXMgKyBjZW50ZXIueTtcbiAgICAgICAgICAgICAgICBsZXQgaXg6bnVtYmVyID0gTWF0aC5jb3MoYW5nbGUpICogaW5uZXJSYWRpdXMrIGNlbnRlci54O1xuICAgICAgICAgICAgICAgIGxldCBpeTpudW1iZXIgPSBNYXRoLnNpbihhbmdsZSkgKiBpbm5lclJhZGl1cysgY2VudGVyLnk7XG4gICAgICAgICAgICAgICAgeHMucHVzaCh4KTtcbiAgICAgICAgICAgICAgICB5cy5wdXNoKHkpO1xuICAgICAgICAgICAgICAgIGlubmVyeHMucHVzaChpeCk7XG4gICAgICAgICAgICAgICAgaW5uZXJ5cy5wdXNoKGl5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgd2hpbGUoeHMubGVuZ3RoICsgaW5uZXJ4cy5sZW5ndGggPnNpemUpe1xuICAgICAgICAgICAgICAgIHhzLnNwbGljZSgxLDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB4cyA9IHhzLmNvbmNhdChpbm5lcnhzLnJldmVyc2UoKSk7XG4gICAgICAgICAgICB5cyA9IHlzLmNvbmNhdChpbm5lcnlzLnJldmVyc2UoKSk7XG4gICAgICAgICAgICBpZihzaXplICE9PSB4cy5sZW5ndGggKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIiBlcnJvciBzaXplICBcIiArIHNpemUgK1wiIHhzIHNpemUgXCIgKyB4cy5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHt4czp4cyx5czp5c307XG4gICAgICAgIH1cblxuXG4gICAgfVxufVxuIiwibmFtZXNwYWNlIGFuZHJvaWQuZGV2aWNlIHtcbiAgICBleHBvcnQgY2xhc3MgRGV2aWNlIHtcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgX2RlbnNpdHk6IG51bWJlciA9IDA7XG4gICAgICAgIHByaXZhdGUgc3RhdGljIF93aWR0aDogbnVtYmVyID0gMDtcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgX2hlaWdodDogbnVtYmVyID0gMDtcbiAgICAgICAgXG4gICAgICAgIHN0YXRpYyBzZXQgd2lkdGgodmFsdWU6IG51bWJlcikge1xuICAgICAgICAgICAgRGV2aWNlLl93aWR0aCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBzdGF0aWMgc2V0IGhlaWdodCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgICAgICBEZXZpY2UuX2hlaWdodCA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGljIGdldCB3aWR0aCgpIHtcbiAgICAgICAgICAgIC8vIHJldHVybiAzNDA7XG4gICAgICAgICAgICBpZiAoRGV2aWNlLl93aWR0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgRGV2aWNlLl93aWR0aCA9ICh3aW5kb3cuaW5uZXJXaWR0aCA+IDApID8gd2luZG93LmlubmVyV2lkdGggOiBzY3JlZW4ud2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gRGV2aWNlLl93aWR0aCA7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0aWMgZ2V0IGhlaWdodCgpIHtcbiAgICAgICAgICAgIC8vIHJldHVybiA2MjA7XG4gICAgICAgICAgICBpZiAoRGV2aWNlLl9oZWlnaHQgPT0gMCkge1xuICAgICAgICAgICAgICAgIERldmljZS5faGVpZ2h0ID0gKHdpbmRvdy5pbm5lckhlaWdodCA+IDApID9cbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmlubmVySGVpZ2h0IDogc2NyZWVuLmhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBEZXZpY2UuX2hlaWdodCA7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0aWMgZ2V0IGRlbnNpdHkoKSB7XG4gICAgICAgICAgICBpZiAoRGV2aWNlLl9kZW5zaXR5ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgRGV2aWNlLl9kZW5zaXR5ID0gTWF0aC5zcXJ0KERldmljZS53aWR0aCAqIERldmljZS53aWR0aCArIERldmljZS5oZWlnaHQgKiBEZXZpY2UuaGVpZ2h0KSAvIDE2MDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHJldHVybiBEZXZpY2UuX2RlbnNpdHk7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuICAgIH1cblxufSIsIm5hbWVzcGFjZSBhbmRyb2lkLnV0aWx7XG4gICAgIGV4cG9ydCBjbGFzcyBMb2d7XG4gICAgICAgICBzdGF0aWMgZChtZXNzYWdlOnN0cmluZyx0YWc/OnN0cmluZyl7XG4gICAgICAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSk7XG4gICAgICAgICB9XG4gICAgICAgICBzdGF0aWMgdyhtZXNzYWdlOnN0cmluZyx0YWc/OnN0cmluZyl7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4obWVzc2FnZSk7XG4gICAgICAgICB9XG4gICAgICAgICBzdGF0aWMgZShtZXNzYWdlOnN0cmluZyx0YWc/OnN0cmluZyl7XG4gICAgICAgICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICAgICAgIH1cbiAgICAgfSAgIFxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9ncmFwaGljcy9VdGlsLnRzXCIgLz5cblxubmFtZXNwYWNlIGFuZHJvaWQuZGV2aWNle1xuICAgIGltcG9ydCBGb250ID0gYW5kcm9pZC5ncmFwaGljcy5Gb250O1xuICAgIGltcG9ydCBTdHJva2VTdHlsZSA9IGFuZHJvaWQuZ3JhcGhpY3MuU3Ryb2tlU3R5bGU7XG4gICAgaW1wb3J0IFN0eWxlID0gYW5kcm9pZC5ncmFwaGljcy5TdHlsZTtcbiAgICBleHBvcnQgY2xhc3MgRGVmYXVsdHtcbiAgICAgICAgc3RhdGljIGdldCBmb250KCl7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEZvbnQoMTAsXCJcIixcIndoaXRlXCIpO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRpYyBnZXQgc3Ryb2tlc3R5bGUoKXtcbiAgICAgICAgICAgIHJldHVybiBuZXcgU3Ryb2tlU3R5bGUoMSwndHJhbnNwYXJlbnQnKTtcbiAgICAgICAgfVxuICAgICAgICBzdGF0aWMgZ2V0IHN0eWxlKCl7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFN0eWxlKCd0cmFuc3BhcmVudCcsRGVmYXVsdC5zdHJva2VzdHlsZSk7XG4gICAgICAgIH1cbiAgICB9XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlBvaW50LnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJVdGlsLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kZXZpY2UvRGV2aWNlLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi91dGlsL0xvZy50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZGV2aWNlL0RlZmF1bHQudHNcIiAvPlxuXG5cbm5hbWVzcGFjZSBhbmRyb2lkLmdyYXBoaWNzIHtcbiAgICBpbXBvcnQgUmVjdCA9IGFuZHJvaWQuZ3JhcGhpY3MuUmVjdDtcbiAgICBpbXBvcnQgUG9pbnQgPSBhbmRyb2lkLmdyYXBoaWNzLlBvaW50O1xuICAgIGltcG9ydCBGb250ID0gYW5kcm9pZC5ncmFwaGljcy5Gb250O1xuICAgIGltcG9ydCBTaXplID0gYW5kcm9pZC5ncmFwaGljcy5TaXplO1xuICAgIGltcG9ydCBEZXZpY2UgPSBhbmRyb2lkLmRldmljZS5EZXZpY2U7XG4gICAgaW1wb3J0IERlZmF1bHQgPSBhbmRyb2lkLmRldmljZS5EZWZhdWx0O1xuICAgIGltcG9ydCBMb2cgPSBhbmRyb2lkLnV0aWwuTG9nO1xuICAgIGltcG9ydCBGaWxsU3R5bGUgPSBhbmRyb2lkLmdyYXBoaWNzLkZpbGxTdHlsZTtcbiAgICBpbXBvcnQgR3JhZGllbnQgPSBhbmRyb2lkLmdyYXBoaWNzLkdyYWRpZW50O1xuICAgIGltcG9ydCBMaW5lYXJHcmFkaWVudCA9IGFuZHJvaWQuZ3JhcGhpY3MuTGluZWFyR3JhZGllbnQ7XG4gICAgaW1wb3J0IFJhZGlhbEdyYWRpZW50ID0gYW5kcm9pZC5ncmFwaGljcy5SYWRpYWxHcmFkaWVudDtcbiAgICBleHBvcnQgZW51bSBSZW5kZXJUeXBlIHtcbiAgICAgICAgQ2FudmFzLFxuICAgICAgICBTdmdcbiAgICB9XG4gICAgY2xhc3MgQ2FudmFzU3RhdGUge1xuICAgICAgICB4T2Zmc2V0OiBudW1iZXIgPSAwO1xuICAgICAgICB5T2Zmc2V0OiBudW1iZXIgPSAwO1xuICAgICAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgICAgICAgICB0aGlzLnhPZmZzZXQgPSB4O1xuICAgICAgICAgICAgdGhpcy55T2Zmc2V0ID0geTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IEZsb29yID0gdmFsdWUgPT4gTWF0aC5mbG9vcigxMDAwICogdmFsdWUpIC8gMTAwMDtcbiAgICBleHBvcnQgY2xhc3MgQ2FudmFzIHtcbiAgICAgICAgcHJpdmF0ZSBfcmVuZGVyOiBDYW52YXNSZW5kZXJFbmdpbmV8U3ZnUmVuZGVyRW5naW5lO1xuICAgICAgICBwcml2YXRlIF9yZW5kZXJUeXBlOiBSZW5kZXJUeXBlO1xuICAgICAgICBwcml2YXRlIF9ob3N0RWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgICAgIHByaXZhdGUgeE9mZnNldDogbnVtYmVyID0gMDtcbiAgICAgICAgcHJpdmF0ZSB5T2Zmc2V0OiBudW1iZXIgPSAwO1xuICAgICAgICBwcml2YXRlIHNhdmVTdGF0ZXM6IENhbnZhc1N0YXRlW10gPSBbXTtcblxuICAgICAgICBjb25zdHJ1Y3RvcihlbGVtZW50OiBIVE1MRWxlbWVudCwgdHlwZTogUmVuZGVyVHlwZSkge1xuICAgICAgICAgICAgdGhpcy5faG9zdEVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyVHlwZSA9IHR5cGU7XG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gUmVuZGVyVHlwZS5DYW52YXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXIgPSBuZXcgQ2FudmFzUmVuZGVyRW5naW5lKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUud2lkdGggPSBEZXZpY2Uud2lkdGggKyAncHgnO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gRGV2aWNlLmhlaWdodCArIFwicHhcIjtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXIuc2V0Vmlld3BvcnRTaXplKERldmljZS53aWR0aCwgRGV2aWNlLmhlaWdodCk7O1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBSZW5kZXJUeXBlLlN2Zykge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlciA9IG5ldyBTdmdSZW5kZXJFbmdpbmUoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS53aWR0aCA9IERldmljZS53aWR0aCArICdweCc7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5oZWlnaHQgPSBEZXZpY2UuaGVpZ2h0ICsgXCJweFwiO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlci5zZXRWaWV3cG9ydFNpemUoRGV2aWNlLndpZHRoLCBEZXZpY2UuaGVpZ2h0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNsZWFyUmVjdChsZWZ0Om51bWJlcix0b3A6bnVtYmVyLHdpZHRoOm51bWJlcixoZWlnaHQ6bnVtYmVyKTp2b2lke1xuXG4gICAgICAgIH1cbiAgICAgICAgc2F2ZSgpIHtcbiAgICAgICAgICAgIGxldCBzdGF0ZSA9IG5ldyBDYW52YXNTdGF0ZSh0aGlzLnhPZmZzZXQsIHRoaXMueU9mZnNldCk7XG4gICAgICAgICAgICB0aGlzLnNhdmVTdGF0ZXMucHVzaChzdGF0ZSk7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXIuc2F2ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2xpcChyZWN0OiBSZWN0KSB7XG4gICAgICAgICAgICB2YXIgciA9IHJlY3QuY2xvbmUoKTtcbiAgICAgICAgICAgIHIudHJhbnNsYXRlKHRoaXMueE9mZnNldCwgdGhpcy55T2Zmc2V0KTtcbiAgICAgICAgICAgIGlmKHRoaXMuX3JlbmRlciBpbnN0YW5jZW9mIENhbnZhc1JlbmRlckVuZ2luZSl7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyLmNsaXAocmVjdCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXIuY2xpcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuXG4gICAgICAgIHJlc3RvcmUoKSB7XG4gICAgICAgICAgICB0aGlzLnNhdmVTdGF0ZXMucG9wKCk7XG4gICAgICAgICAgICBsZXQgc3RhdGUgPSB0aGlzLnNhdmVTdGF0ZXNbdGhpcy5zYXZlU3RhdGVzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy54T2Zmc2V0ID0gc3RhdGUueE9mZnNldDtcbiAgICAgICAgICAgICAgICB0aGlzLnlPZmZzZXQgPSBzdGF0ZS55T2Zmc2V0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnhPZmZzZXQgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMueU9mZnNldCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0aGlzLl9yZW5kZXIgaW5zdGFuY2VvZiBDYW52YXNSZW5kZXJFbmdpbmUpe1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlci5yZXN0b3JlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzZXRWaWV3cG9ydFNpemUodzogbnVtYmVyLCBoOiBudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlci5zZXRWaWV3cG9ydFNpemUodywgaCk7XG4gICAgICAgIH1cblxuICAgICAgICBtZWFzdXJlU3RyaW5nKHN0cjogc3RyaW5nLCBmb250OiBGb250LCBtYXhTaXplPzogbnVtYmVyKTogU2l6ZSB7XG4gICAgICAgICAgICBpZiAoIWZvbnQpIHtcbiAgICAgICAgICAgICAgICBmb250ID0gRGVmYXVsdC5mb250LmNsb25lKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgZiA9IGZvbnQuY2xvbmUoKTtcbiAgICAgICAgICAgIGYuZm9udFNpemUgKj0gRGV2aWNlLmRlbnNpdHk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVuZGVyLm1lYXN1cmVTdHJpbmcoc3RyLCBmKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG1lYXN1cmVTdHJpbmdXaXRoV2lkdGgoc3RyOiBzdHJpbmcsIGZvbnQ6IEZvbnQpIHtcblxuICAgICAgICB9XG5cbiAgICAgICAgZHJhd1RleHQoc3RyOiBzdHJpbmcsIHB0OiBQb2ludCwgZjogRm9udCwgY2VudGVyPzogUG9pbnQsIGFuZ2xlPzogbnVtYmVyKSB7XG4gICAgICAgICAgICBpZiAoIWYpIHtcbiAgICAgICAgICAgICAgICBmID0gRGVmYXVsdC5mb250LmNsb25lKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgc2l6ZSA9IHRoaXMubWVhc3VyZVN0cmluZyhzdHIsIGYpO1xuICAgICAgICAgICAgdmFyIGZvbnQ6IEZvbnQgPSBmLmNsb25lKCk7XG4gICAgICAgICAgICBmb250LmZvbnRTaXplICo9IERldmljZS5kZW5zaXR5O1xuICAgICAgICAgICAgbGV0IHN0YXJ0cHQ6IFBvaW50ID0gbmV3IFBvaW50KHB0LngsIHB0LnkgKyBzaXplLmhlaWdodCk7XG4gICAgICAgICAgICBsZXQgdHB0ID0gcHQuY2xvbmUoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9yZW5kZXIgaW5zdGFuY2VvZiBDYW52YXNSZW5kZXJFbmdpbmUpIHtcbiAgICAgICAgICAgICAgICBpZiAoYW5nbGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXIuZHJhd1N0cmluZ1JvdGF0ZWQoc3RyLCBzdGFydHB0LCBjZW50ZXIsIGFuZ2xlLCBmb250KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXIuZHJhd1N0cmluZyhzdHIsIHN0YXJ0cHQsIGZvbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZih0aGlzLl9yZW5kZXIgaW5zdGFuY2VvZiBTdmdSZW5kZXJFbmdpbmUpIHtcbiAgICAgICAgICAgICAgICBzdGFydHB0Lm9mZnNldCh0aGlzLnhPZmZzZXQsIHRoaXMueU9mZnNldCk7XG4gICAgICAgICAgICAgICAgaWYgKGFuZ2xlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyLmRyYXdTdHJpbmdSb3RhdGVkKHN0ciwgc3RhcnRwdCwgY2VudGVyLCBhbmdsZSwgbnVsbCwgeyAnZm9udC1zaXplJzogZm9udC5mb250U2l6ZSwgJ2ZvbnQtZmFtaWx5JzogZm9udC5mb250RmFtaWx5IH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlci5kcmF3U3RyaW5nKHN0ciwgc3RhcnRwdCwgbnVsbCwgeyAnZm9udC1zaXplJzogZm9udC5mb250U2l6ZSwgJ2ZvbnQtZmFtaWx5JzogZm9udC5mb250RmFtaWx5IH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGRyYXdQb3NUZXh0KHRleHQ6IHN0cmluZywgcG9zOiBudW1iZXJbXSwgZm9udDogRm9udCkge1xuICAgICAgICAgICAgaWYgKHRleHQubGVuZ3RoICogMiA+IHBvcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBcIkluZGV4T3V0T2ZCb3VuZHNFeGNlcHRpb25cIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZm9udCkge1xuICAgICAgICAgICAgICAgIGZvbnQgPSBEZWZhdWx0LmZvbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5fcmVuZGVyVHlwZSA9PT0gUmVuZGVyVHlwZS5DYW52YXMpIHtcbiAgICAgICAgICAgICAgICBsZXQgcHQ6IFBvaW50ID0gbmV3IFBvaW50KDAsIDApO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9zLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgICAgICAgICAgICAgIHB0LnNldChwb3NbaV0sIHBvc1tpICsgMV0pO1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLl9yZW5kZXIuZHJhd1N0cmluZyh0ZXh0W2ldLHB0LGZvbnQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdUZXh0KHRleHRbaSAvIDJdLCBwdCwgZm9udCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIiBkcmF3UG9zVGV4dCBcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBkcmF3TGluZShwdDE6IFBvaW50LCBwdDI6IFBvaW50LCBzdHJva2VzdHlsZTogU3Ryb2tlU3R5bGUpIHtcbiAgICAgICAgICAgIHZhciBzdHJva2UgPSBudWxsO1xuICAgICAgICAgICAgaWYgKHN0cm9rZXN0eWxlKSB7XG4gICAgICAgICAgICAgICAgc3Ryb2tlID0gc3Ryb2tlc3R5bGUuY2xvbmUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3Ryb2tlID0gRGVmYXVsdC5zdHJva2VzdHlsZS5jbG9uZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHN0YXJ0cG9pbnQgPSBwdDEuY2xvbmUoKTtcbiAgICAgICAgICAgIHZhciBlbmRwb2ludCA9IHB0Mi5jbG9uZSgpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fcmVuZGVyVHlwZSA9PT0gUmVuZGVyVHlwZS5DYW52YXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXIuZHJhd0xpbmUoc3RhcnRwb2ludC54LCBzdGFydHBvaW50LnksIGVuZHBvaW50LngsIGVuZHBvaW50LnksIHN0cm9rZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0YXJ0cG9pbnQub2Zmc2V0KHRoaXMueE9mZnNldCwgdGhpcy55T2Zmc2V0KTtcbiAgICAgICAgICAgICAgICBlbmRwb2ludC5vZmZzZXQodGhpcy54T2Zmc2V0LCB0aGlzLnlPZmZzZXQpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlci5kcmF3TGluZShzdGFydHBvaW50LngsIHN0YXJ0cG9pbnQueSwgZW5kcG9pbnQueCwgZW5kcG9pbnQueSwgc3Ryb2tlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGRyYXdMaW5lcyh4czogbnVtYmVyW10sIHlzOiBudW1iZXJbXSwgc3Ryb2tlc3R5bGU6IFN0cm9rZVN0eWxlKSB7XG4gICAgICAgICAgICAvLyBkcmF3TGluZXMoeHM6IG51bWJlcltdLCB5czogbnVtYmVyW10sIHN0cm9rZXN0eWxlOiBTdHJva2VTdHlsZSkge1xuICAgICAgICAgICAgdmFyIHN0cm9rZSA9IG51bGw7XG4gICAgICAgICAgICBpZiAoc3Ryb2tlc3R5bGUpIHtcbiAgICAgICAgICAgICAgICBzdHJva2UgPSBzdHJva2VzdHlsZS5jbG9uZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdHJva2UgPSBEZWZhdWx0LnN0cm9rZXN0eWxlLmNsb25lKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5fcmVuZGVyIGluc3RhbmNlb2YgQ2FudmFzUmVuZGVyRW5naW5lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyLmRyYXdMaW5lcyh4cywgeXMsIHN0cm9rZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYodGhpcy5fcmVuZGVyIGluc3RhbmNlb2YgU3ZnUmVuZGVyRW5naW5lKXtcbiAgICAgICAgICAgICAgICBzdHJva2UudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGUoXCIgKyB0aGlzLnhPZmZzZXQgKyBcIixcIiArIHRoaXMueU9mZnNldCArIFwiKVwiO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlci5kcmF3TGluZXMoeHMsIHlzLCBudWxsLCBzdHJva2UuZ2V0Q3NzU3R5bGUoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZHJhd1JlY3QocHQxOiBQb2ludCwgcHQyOiBQb2ludCwgZmlsbDogYm9vbGVhbiwgc3R5bGU6U3R5bGUsKSB7XG4gICAgICAgICAgICB2YXIgc3RhcnRwb2ludCA9IHB0MS5jbG9uZSgpO1xuICAgICAgICAgICAgdmFyIGVuZHBvaW50ID0gcHQyLmNsb25lKCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9yZW5kZXIgaW5zdGFuY2VvZiBDYW52YXNSZW5kZXJFbmdpbmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXIuZHJhd1JlY3Qoc3RhcnRwb2ludC54LCBzdGFydHBvaW50LnksIGVuZHBvaW50LnggLSBzdGFydHBvaW50LngsIGVuZHBvaW50LnkgLSBzdGFydHBvaW50LnksIHN0eWxlLCBmaWxsKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZih0aGlzLl9yZW5kZXIgaW5zdGFuY2VvZiBTdmdSZW5kZXJFbmdpbmUpe1xuICAgICAgICAgICAgICAgIHN0YXJ0cG9pbnQub2Zmc2V0KHRoaXMueE9mZnNldCwgdGhpcy55T2Zmc2V0KTtcbiAgICAgICAgICAgICAgICBlbmRwb2ludC5vZmZzZXQodGhpcy54T2Zmc2V0LCB0aGlzLnlPZmZzZXQpO1xuICAgICAgICAgICAgICAgIGlmIChmaWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlci5kcmF3UmVjdChzdGFydHBvaW50LngsIHN0YXJ0cG9pbnQueSwgZW5kcG9pbnQueCAtIHN0YXJ0cG9pbnQueCwgZW5kcG9pbnQueSAtIHN0YXJ0cG9pbnQueSwgbnVsbCwgeyAnZmlsbCc6IHR5cGVvZihzdHlsZS5iYWNrZ3JvdW5kKT09J3N0cmluZyc/c3R5bGUuYmFja2dyb3VuZDpudWxsIH0sIG51bGwpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlci5kcmF3UmVjdChzdGFydHBvaW50LngsIHN0YXJ0cG9pbnQueSwgZW5kcG9pbnQueCAtIHN0YXJ0cG9pbnQueCwgZW5kcG9pbnQueSAtIHN0YXJ0cG9pbnQueSwgbnVsbCwgeyAnZmlsbCc6ICd0cmFuc3BhcmVudCcsICdzdHJva2UnOiB0eXBlb2Yoc3R5bGUuYmFja2dyb3VuZCk9PSdzdHJpbmcnP3N0eWxlLmJhY2tncm91bmQ6bnVsbCB9LCBudWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZHJhd0FyYyhyZWN0OiBSZWN0LCBzdGFydEFuZ2xlOiBudW1iZXIsIHN3ZWVwQW5nZWw6IG51bWJlciwgc3R5bGU6IFN0eWxlKSB7XG4gICAgICAgICAgICB2YXIgY3g6IG51bWJlciA9IChyZWN0LnJpZ2h0IC0gcmVjdC5sZWZ0KSAvIDIgKyByZWN0LmxlZnQgKyB0aGlzLnhPZmZzZXQ7XG4gICAgICAgICAgICB2YXIgY3k6IG51bWJlciA9IChyZWN0LmJvdHRvbSAtIHJlY3QudG9wKSAvIDIgKyByZWN0LnRvcCArIHRoaXMueU9mZnNldDtcbiAgICAgICAgICAgIHZhciByOiBudW1iZXIgPSAocmVjdC53aWR0aCA8IHJlY3QuaGVpZ2h0ID8gcmVjdC53aWR0aCA6IHJlY3QuaGVpZ2h0KSAvIDI7XG4gICAgICAgICAgICBpZiAodGhpcy5fcmVuZGVyIGluc3RhbmNlb2YgU3ZnUmVuZGVyRW5naW5lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyLmRyYXdQaWUoY3gsIGN5LCByLCBGbG9vcihzdGFydEFuZ2xlKSwgRmxvb3Ioc3dlZXBBbmdlbCksIG51bGwsIHsgJ2ZpbGwnOiB0eXBlb2Yoc3R5bGUuYmFja2dyb3VuZCkgPT0nc3RyaW5nJyA/c3R5bGUuYmFja2dyb3VuZDpudWxsIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmKHRoaXMuX3JlbmRlciBpbnN0YW5jZW9mIENhbnZhc1JlbmRlckVuZ2luZSl7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyLmRyYXdQaWUoY3gsIGN5LCByLCBGbG9vcihzdGFydEFuZ2xlKSwgRmxvb3Ioc3dlZXBBbmdlbCksIHN0eWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgZHJhd0RvbnV0KGN4OiBudW1iZXIsIGN5OiBudW1iZXIsIHJhZGl1czogbnVtYmVyLCBpbm5lclJhZGl1czogbnVtYmVyLCBzdGFydEFuZ2xlOiBudW1iZXIsIHN3ZWVwQW5nbGU6IG51bWJlciwgc3R5bGU6U3R5bGUpIHtcbiAgICAgICAgICAgIHZhciBfY3g6IG51bWJlciA9IGN4ICsgdGhpcy54T2Zmc2V0O1xuICAgICAgICAgICAgdmFyIF9jeTogbnVtYmVyID0gY3kgKyB0aGlzLnlPZmZzZXQ7XG4gICAgICAgICAgICBpZiAodGhpcy5fcmVuZGVyIGluc3RhbmNlb2YgU3ZnUmVuZGVyRW5naW5lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyLmRyYXdEb251dChfY3gsIF9jeSwgcmFkaXVzLCBpbm5lclJhZGl1cywgRmxvb3Ioc3RhcnRBbmdsZSksIEZsb29yKHN3ZWVwQW5nbGUpLCBudWxsLCB7ICdmaWxsJzp0eXBlb2Yoc3R5bGUuYmFja2dyb3VuZCkgPT0nc3RyaW5nJyA/c3R5bGUuYmFja2dyb3VuZDpudWxsIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmKHRoaXMuX3JlbmRlciBpbnN0YW5jZW9mIENhbnZhc1JlbmRlckVuZ2luZSl7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyLmRyYXdEb251dChfY3gsIF9jeSwgcmFkaXVzLCBpbm5lclJhZGl1cywgKHN0YXJ0QW5nbGUpLCAoc3dlZXBBbmdsZSksIHN0eWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGRyYXdPdmFsKHJlY3Q6IFJlY3QsIGNvbG9yOiBzdHJpbmcpIHtcblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gcHVibGljIGFscGhhIDpudW1iZXIgPTA7XG4gICAgICAgIHB1YmxpYyBzZXQgYWxwaGEodmFsdWU6IG51bWJlcikge1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyLmFscGhhID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZHJhd1BvbHlnb24oeHM6IG51bWJlcltdLCB5czogbnVtYmVyW10sIHN0eWxlOlN0eWxlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fcmVuZGVyIGluc3RhbmNlb2YgU3ZnUmVuZGVyRW5naW5lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyLmRyYXdQb2x5Z29uKHhzLCB5cywgbnVsbCwgeyAnZmlsbCc6IHR5cGVvZihzdHlsZS5iYWNrZ3JvdW5kKSA9PSdzdHJpbmcnP3N0eWxlLmJhY2tncm91bmQ6bnVsbCB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZih0aGlzLl9yZW5kZXIgaW5zdGFuY2VvZiBDYW52YXNSZW5kZXJFbmdpbmUpe1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlci5kcmF3UG9seWdvbih4cywgeXMsIHN0eWxlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgZHJhd0ltYWdlKHg6IG51bWJlciwgeTogbnVtYmVyLCB3OiBudW1iZXIsIGg6IG51bWJlcikge1xuICAgICAgICAgICAgLy8gdGhpcy5fcmVuZGVyLmRyYXdJbWFnZSh4LCB5LCB3LCBoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldENhY2hlKHN4OiBudW1iZXIsIHN5OiBudW1iZXIsIHN3OiBudW1iZXIsIHNoOiBudW1iZXIpOiBJbWFnZURhdGEge1xuICAgICAgICAgICAgLy8gcmV0dXJuIHRoaXMuX3JlbmRlci5nZXRJbWFnZURhdGEoc3gsIHN5LCBzdywgc2gpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRDYWNoZShpbWFnZWRhdGE6IEltYWdlRGF0YSwgZHg6IG51bWJlciwgZHk6IG51bWJlciwgZGlydHlYPzogbnVtYmVyLCBkaXJ0eVk/OiBudW1iZXIsIGRpcnR5V2lkdGg/OiBudW1iZXIsIGRpcnR5SGVpZ2h0PzogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgICAgICAvLyB0aGlzLl9yZW5kZXIucHV0SW1hZ2VEYXRhKGltYWdlZGF0YSwgZHgsIGR5LCBkaXJ0eVgsIGRpcnR5WSwgZGlydHlXaWR0aCwgZGlydHlIZWlnaHQpO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICBiZWdpbigpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlci5iZWdpblJlbmRlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgZW5kKCkge1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyLmVuZFJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICAgIG1vdmVUbyh4Om51bWJlcix5Om51bWJlcil7XG4gICAgICAgICAgICBpZiAodGhpcy5fcmVuZGVyIGluc3RhbmNlb2YgQ2FudmFzUmVuZGVyRW5naW5lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyLm1vdmVUbyh4LHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc2NhbGUoc3g6IG51bWJlciwgc3k6IG51bWJlcik6IHZvaWQge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjYW52YXNTY2FsZSBcIiArIHN4K1wiICwgXCIgKyBzeSk7XG4gICAgICAgICAgICBpZiAodGhpcy5fcmVuZGVyIGluc3RhbmNlb2YgQ2FudmFzUmVuZGVyRW5naW5lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyLnNjYWxlKHN4LHN5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByb3RhdGUoZGVncmVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9yZW5kZXIgaW5zdGFuY2VvZiBDYW52YXNSZW5kZXJFbmdpbmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXIucm90YXRlKGRlZ3JlZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0cmFuc2xhdGUoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMueE9mZnNldCA9IHg7XG4gICAgICAgICAgICB0aGlzLnlPZmZzZXQgPSB5O1xuICAgICAgICAgICAgaWYgKHRoaXMuX3JlbmRlciBpbnN0YW5jZW9mIENhbnZhc1JlbmRlckVuZ2luZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlci50cmFuc2xhdGUoeCwgeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgY2FudmFzKCk6Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEe1xuICAgICAgICAgICAgaWYodGhpcy5fcmVuZGVyIGluc3RhbmNlb2YgQ2FudmFzUmVuZGVyRW5naW5lKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVuZGVyLmNhbnZhcztcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgIH1cbn1cbiIsIm5hbWVzcGFjZSBhbmRyb2lkLmFwcHtcbiAgICBpbXBvcnQgSGFuZGxlciA9IGFuZHJvaWQudXRpbC5IYW5kbGVyO1xuICAgIGV4cG9ydCBjbGFzcyBDb250ZXh0e1xuICAgICAgICBwcml2YXRlIF9hcmdzOntbbmFtZTpzdHJpbmddOmFueX09e307XG4gICAgICAgIGdldEFyZ3MobmFtZTpzdHJpbmcpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FyZ3NbbmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgc2V0QXJnczxUPihuYW1lOnN0cmluZyx2YWx1ZTpUKXtcbiAgICAgICAgICAgIHRoaXMuX2FyZ3NbbmFtZV09dmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgc2V0Q29tcGFyZWRBbmlhbXRpb25DYWNoZShjYWNoZTpDb21wYXJlZEFuaW1hdGlvbkNhY2hlKTp2b2lke1xuICAgICAgICAgICAgdGhpcy5fYXJnc1snY29tcGFyZWRhbmltYXRpb24nXT1jYWNoZTtcbiAgICAgICAgfVxuICAgICAgICBnZXRDb21wYXJlZEFuaW1hdGlvbkNhY2hlKCk6Q29tcGFyZWRBbmltYXRpb25DYWNoZXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hcmdzWydjb21wYXJlZGFuaW1hdGlvbiddO1xuICAgICAgICB9XG4gICAgICAgIHNldEhhbmRsZXIoaGFuZGxlcjpIYW5kbGVyKTp2b2lke1xuICAgICAgICAgICAgdGhpcy5fYXJnc1snaGFuZGxlciddPWhhbmRsZXI7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0SGFuZGxlcigpOkhhbmRsZXJ7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYXJnc1snaGFuZGxlciddO1xuICAgICAgICB9XG4gICAgfVxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9ncmFwaGljcy91dGlsLnRzXCIgLz5cblxubmFtZXNwYWNlIGFuZHJvaWQudmlldyB7XG4gICAgaW1wb3J0IFBhZGRpbmcgPSBhbmRyb2lkLmdyYXBoaWNzLlBhZGRpbmc7XG4gICAgaW1wb3J0IEFsaWduID0gYW5kcm9pZC5ncmFwaGljcy5BbGlnbjtcbiAgICBpbXBvcnQgQWxpZ25FbGVtZW50ID0gYW5kcm9pZC5ncmFwaGljcy5BbGlnbkVsZW1lbnQ7XG4gICAgaW1wb3J0IFNpemUgPSBhbmRyb2lkLmdyYXBoaWNzLlNpemU7XG4gICAgaW1wb3J0IENhbnZhcyA9IGFuZHJvaWQuZ3JhcGhpY3MuQ2FudmFzO1xuICAgIGltcG9ydCBHcmF2aXR5ID0gYW5kcm9pZC5ncmFwaGljcy5HcmF2aXR5O1xuICAgIGltcG9ydCBTdHlsZT0gYW5kcm9pZC5ncmFwaGljcy5TdHlsZTtcblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVZpZXcge1xuICAgICAgICBvbk1lYXN1cmUod2lkdGg6IE1lYXN1cmVTcGVjLCBoZWlnaHQ6IE1lYXN1cmVTcGVjLCBjYW52YXM6IENhbnZhcyk6IFNpemU7XG4gICAgICAgIG9uTGF5b3V0KGw6IG51bWJlciwgdDogbnVtYmVyLCByOiBudW1iZXIsIGI6IG51bWJlcixjYW52YXM6Q2FudmFzKTogdm9pZDtcbiAgICAgICAgb25EcmF3KGNhbnZhczogQ2FudmFzKTogdm9pZDtcbiAgICAgICAgaW52YWxpZGF0ZShmbGc6Ym9vbGVhbik6IHZvaWQ7XG4gICAgICAgIHJlYWRvbmx5IHdpZHRoOiBudW1iZXI7XG4gICAgICAgIHJlYWRvbmx5IGhlaWdodDogbnVtYmVyO1xuICAgICAgICByZWFkb25seSBsZWZ0OiBudW1iZXI7XG4gICAgICAgIHJlYWRvbmx5IHRvcDogbnVtYmVyO1xuICAgICAgICByZWFkb25seSByaWdodDogbnVtYmVyO1xuICAgICAgICByZWFkb25seSBib3R0b206IG51bWJlcjtcbiAgICAgICAgZ3Jhdml0eTogR3Jhdml0eTtcbiAgICAgICAgbGF5b3V0UGFyYW1zOiBMYXlvdXRQYXJhbXNcbiAgICAgICAgYmFja2dyb3VuZDogU3R5bGU7XG4gICAgfVxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9ncmFwaGljcy91dGlsLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJJVmlldy50c1wiIC8+XG5cbm5hbWVzcGFjZSBhbmRyb2lkLnZpZXcge1xuICAgIGltcG9ydCBQYWRkaW5nID0gYW5kcm9pZC5ncmFwaGljcy5QYWRkaW5nO1xuICAgIGltcG9ydCBBbGlnbiA9IGFuZHJvaWQuZ3JhcGhpY3MuQWxpZ247XG4gICAgaW1wb3J0IEFsaWduRWxlbWVudCA9IGFuZHJvaWQuZ3JhcGhpY3MuQWxpZ25FbGVtZW50O1xuICAgIGltcG9ydCBTaXplID0gYW5kcm9pZC5ncmFwaGljcy5TaXplO1xuICAgIGltcG9ydCBDYW52YXMgPSBhbmRyb2lkLmdyYXBoaWNzLkNhbnZhcztcbiAgICBpbXBvcnQgUmVjdCA9IGFuZHJvaWQuZ3JhcGhpY3MuUmVjdDtcbiAgICBleHBvcnQgaW50ZXJmYWNlIElWaWV3R3JvdXAgZXh0ZW5kcyBJVmlldyB7XG4gICAgICAgIGRpc3BhdGNoRHJhdyhjYW52YXM6IENhbnZhcyk6IHZvaWQ7XG4gICAgICAgIGFkZFZpZXcoVmlldzogVmlldywgaW5kZXg6IG51bWJlcik6IG51bWJlcjtcbiAgICAgICAgaW52YWxpZGF0ZUNoaWxkKGNoaWxkOiBWaWV3LCBkaXJ0eTogUmVjdCk6IHZvaWQ7XG5cbiAgICB9XG59IiwibmFtZXNwYWNlIGFuZHJvaWQuZ3JhcGhpY3Mge1xuICAgIGV4cG9ydCBjbGFzcyBTaXplIHtcbiAgICAgICAgd2lkdGg6IG51bWJlcjtcbiAgICAgICAgaGVpZ2h0OiBudW1iZXI7XG4gICAgICAgIGNvbnN0cnVjdG9yKHc6IG51bWJlciwgaDogbnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLndpZHRoID0gdztcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gaDtcbiAgICAgICAgfVxuICAgICAgICBjbG9uZSgpOiBTaXplIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgU2l6ZSh0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIGhhc2hDb2RlKCk6bnVtYmVye1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMud2lkdGgqIDM3MjEzICsgdGhpcy5oZWlnaHQ7XG4gICAgICAgIH1cbiAgICB9XG59IiwibmFtZXNwYWNlIGFuZHJvaWQuZ3JhcGhpY3Mge1xuXG4gICAgZXhwb3J0IGNsYXNzIE1hcmdpbiB7XG4gICAgICAgIG1hcmdpbkxlZnQ6IG51bWJlcjtcbiAgICAgICAgbWFyZ2luUmlnaHQ6IG51bWJlcjtcbiAgICAgICAgbWFyZ2luVG9wOiBudW1iZXI7XG4gICAgICAgIG1hcmdpbkJvdHRvbTogbnVtYmVyO1xuICAgICAgICBjb25zdHJ1Y3RvcihtYXJnaW5MZWZ0OiBudW1iZXIsXG4gICAgICAgICAgICBtYXJnaW5SaWdodDogbnVtYmVyLFxuICAgICAgICAgICAgbWFyZ2luVG9wOiBudW1iZXIsXG4gICAgICAgICAgICBtYXJnaW5Cb3R0b206IG51bWJlcikge1xuICAgICAgICAgICAgdGhpcy5tYXJnaW5MZWZ0ID0gbWFyZ2luTGVmdDtcbiAgICAgICAgICAgIHRoaXMubWFyZ2luVG9wID0gbWFyZ2luVG9wO1xuICAgICAgICAgICAgdGhpcy5tYXJnaW5SaWdodCA9IG1hcmdpblJpZ2h0O1xuICAgICAgICAgICAgdGhpcy5tYXJnaW5Cb3R0b20gPSBtYXJnaW5Cb3R0b21cbiAgICAgICAgfVxuICAgICAgICBnZXRTdGFydFhNYXJnaW4oKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tYXJnaW5SaWdodCA+IDAgJiYgIXRoaXMubWFyZ2luTGVmdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAtdGhpcy5tYXJnaW5SaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcmdpbkxlZnQ7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0U3RhcnRZTWFyZ2luKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubWFyZ2luQm90dG9tID4gMCAmJiAhdGhpcy5tYXJnaW5Ub3ApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gLXRoaXMubWFyZ2luQm90dG9tO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFyZ2luVG9wO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZ3JhcGhpY3MvTWFyZ2lucy50c1wiIC8+XG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9ncmFwaGljcy9SZWN0LnRzXCIgLz5cblxubmFtZXNwYWNlIGFuZHJvaWQudmlldyB7XG5cbiAgICBpbXBvcnQgUmVjdCA9IGFuZHJvaWQuZ3JhcGhpY3MuUmVjdDtcbiAgICBpbXBvcnQgUGFkZGluZyA9IGFuZHJvaWQuZ3JhcGhpY3MuUGFkZGluZztcbiAgICBpbXBvcnQgTWFyZ2luID0gYW5kcm9pZC5ncmFwaGljcy5NYXJnaW47XG4gICAgaW1wb3J0IFV0aWwgPSBhbmRyb2lkLmdyYXBoaWNzLlV0aWw7XG4gICAgLyoqKlxuICAgICAqIOagueaNrm1lYXN1cmUg6K6h566X5Ye655qE57uT5p6cXG4gICAgICovXG4gICAgZXhwb3J0IGNsYXNzIExheW91dEluZm8ge1xuICAgICAgICBpbm5lcnJlY3Q6IFJlY3Q7XG4gICAgICAgIG91dHRlcnJlY3Q6IFJlY3Q7XG4gICAgICAgIGRyYXdpbmRleDogbnVtYmVyOy8vcmVuZGVyIG9yZGVyIGluIHZpZXdncm91cFxuICAgICAgICBwYWRkaW5nOlBhZGRpbmc7XG4gICAgICAgIGNvbnN0cnVjdG9yKGw6IG51bWJlciwgdDogbnVtYmVyLCByOiBudW1iZXIsIGI6IG51bWJlciwgcGFkZGluZzogUGFkZGluZywgZHJhd2luZGV4PzogbnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLm91dHRlcnJlY3QgPSBuZXcgUmVjdChsLCB0LCByLCBiKTtcbiAgICAgICAgICAgIHRoaXMucGFkZGluZyA9IHBhZGRpbmc7XG4gICAgICAgICAgICB0aGlzLmlubmVycmVjdCA9IG5ldyBSZWN0KHRoaXMub3V0dGVycmVjdC5sZWZ0ICsgcGFkZGluZy5sZWZ0UGFkZGluZyxcbiAgICAgICAgICAgICAgICB0aGlzLm91dHRlcnJlY3QudG9wICsgcGFkZGluZy50b3BQYWRkaW5nLFxuICAgICAgICAgICAgICAgIHRoaXMub3V0dGVycmVjdC5yaWdodCAtIHBhZGRpbmcucmlnaHRQYWRkaW5nLFxuICAgICAgICAgICAgICAgIHRoaXMub3V0dGVycmVjdC5ib3R0b20gLSBwYWRkaW5nLmJvdHRvbVBhZGRpbmdcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIGlmIChkcmF3aW5kZXgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdpbmRleCA9IGRyYXdpbmRleDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3aW5kZXggPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJlc2V0KGw6IG51bWJlciwgdDogbnVtYmVyLCByOiBudW1iZXIsIGI6IG51bWJlciwgcGFkZGluZzogUGFkZGluZywgZHJhd2luZGV4PzogbnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLm91dHRlcnJlY3QgPSBuZXcgUmVjdChsLCB0LCByLCBiKTtcbiAgICAgICAgICAgIHRoaXMucGFkZGluZyA9IHBhZGRpbmc7XG4gICAgICAgICAgICB0aGlzLmlubmVycmVjdCA9IG5ldyBSZWN0KHRoaXMub3V0dGVycmVjdC5sZWZ0ICsgcGFkZGluZy5sZWZ0UGFkZGluZyxcbiAgICAgICAgICAgICAgICB0aGlzLm91dHRlcnJlY3QudG9wICsgcGFkZGluZy50b3BQYWRkaW5nLFxuICAgICAgICAgICAgICAgIHRoaXMub3V0dGVycmVjdC5yaWdodCAtIHBhZGRpbmcucmlnaHRQYWRkaW5nLFxuICAgICAgICAgICAgICAgIHRoaXMub3V0dGVycmVjdC5ib3R0b20gLSBwYWRkaW5nLmJvdHRvbVBhZGRpbmdcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIGlmIChkcmF3aW5kZXgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdpbmRleCA9IGRyYXdpbmRleDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3aW5kZXggPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG9mZnNldCh4Om51bWJlcix5Om51bWJlcil7XG4gICAgICAgICAgICB0aGlzLmlubmVycmVjdC50cmFuc2xhdGUoeCx5KTtcbiAgICAgICAgICAgIHRoaXMub3V0dGVycmVjdC50cmFuc2xhdGUoeCx5KTtcbiAgICAgICAgfVxuICAgICAgICBjbG9uZSgpe1xuICAgICAgICAgICAgbGV0IGluZm89IG5ldyBMYXlvdXRJbmZvKDAsMCwwLDAsbmV3IFBhZGRpbmcoMCkpO1xuICAgICAgICAgICAgaW5mby5kcmF3aW5kZXggPXRoaXMuZHJhd2luZGV4O1xuICAgICAgICAgICAgaW5mby5pbm5lcnJlY3QgPSB0aGlzLmlubmVycmVjdC5jbG9uZSgpO1xuICAgICAgICAgICAgaW5mby5vdXR0ZXJyZWN0ID0gdGhpcy5vdXR0ZXJyZWN0LmNsb25lKCk7XG4gICAgICAgICAgICByZXR1cm4gaW5mbztcbiAgICAgICAgfVxuICAgICAgICBlcXVhbChpbmZvOkxheW91dEluZm8pOmJvb2xlYW57XG4gICAgICAgICAgICBpZihpbmZvICE9IG51bGwpe1xuICAgICAgICAgICAgICAgIHJldHVybiBpbmZvLmRyYXdpbmRleCA9PT0gdGhpcy5kcmF3aW5kZXggJiYgdGhpcy5pbm5lcnJlY3QuZXF1YWwoaW5mby5pbm5lcnJlY3QpICYmIHRoaXMub3V0dGVycmVjdC5lcXVhbChpbmZvLm91dHRlcnJlY3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKipcbiAgICAgKiDovpPlhaXnmoTlj4LmlbBcbiAgICAgKi9cbiAgICBleHBvcnQgY2xhc3MgTGF5b3V0UGFyYW1zIHtcbiAgICAgICAgX3dpZHRoOiBudW1iZXI7XG4gICAgICAgIF9oZWlnaHQ6IG51bWJlcjtcbiAgICAgICAgbWFyZ2luOiBNYXJnaW4gPSBuZXcgTWFyZ2luKDAsIDAsIDAsIDApOy8vIHsgJ21hcmdpbkxlZnQnOiAwLCAnbWFyZ2luUmlnaHQnOiAwLCAnbWFyZ2luVG9wJzogMCwgJ21hcmdpbkJvdHRvbSc6IDAgfTtcbiAgICAgICAgY29uc3RydWN0b3Iod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIG1hcmdpbj86IE1hcmdpbikge1xuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgICAgICBpZiAobWFyZ2luKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXJnaW4gPSBtYXJnaW47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2V0IHdpZHRoKHc6IG51bWJlcikge1xuICAgICAgICAgICAgdGhpcy5fd2lkdGggPSB3O1xuICAgICAgICB9XG4gICAgICAgIGdldCB3aWR0aCgpOiBudW1iZXIge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3dpZHRoIDwgMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IHdpZHRoTW9kZSgpIHtcbiAgICAgICAgICAgIHZhciBtb2RlID0gTGF5b3V0UGFyYW1zLkVYQUNUTFk7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuX3dpZHRoKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBMYXlvdXRQYXJhbXMuV1JBUF9DT05URU5UOlxuICAgICAgICAgICAgICAgICAgICBtb2RlID0gTGF5b3V0UGFyYW1zLldSQVBfQ09OVEVOVDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBMYXlvdXRQYXJhbXMuTUFUQ0hfUEFSRU5UOlxuICAgICAgICAgICAgICAgICAgICBtb2RlID0gTGF5b3V0UGFyYW1zLk1BVENIX1BBUkVOVDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBMYXlvdXRQYXJhbXMuRVhBQ1RMWTpcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBtb2RlID0gTGF5b3V0UGFyYW1zLkVYQUNUTFk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG1vZGU7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgaGVpZ2h0TW9kZSgpIHtcbiAgICAgICAgICAgIHZhciBtb2RlID0gTGF5b3V0UGFyYW1zLkVYQUNUTFk7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuX2hlaWdodCkge1xuICAgICAgICAgICAgICAgIGNhc2UgTGF5b3V0UGFyYW1zLldSQVBfQ09OVEVOVDpcbiAgICAgICAgICAgICAgICAgICAgbW9kZSA9IExheW91dFBhcmFtcy5XUkFQX0NPTlRFTlQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgTGF5b3V0UGFyYW1zLk1BVENIX1BBUkVOVDpcbiAgICAgICAgICAgICAgICAgICAgbW9kZSA9IExheW91dFBhcmFtcy5NQVRDSF9QQVJFTlQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgTGF5b3V0UGFyYW1zLkVYQUNUTFk6XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgbW9kZSA9IExheW91dFBhcmFtcy5FWEFDVExZO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBtb2RlO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0IGhlaWdodChoOiBudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2hlaWdodCA9IGg7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IGhlaWdodCgpOiBudW1iZXIge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2hlaWdodCA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9oZWlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0aWMgTUFUQ0hfUEFSRU5UOiBudW1iZXIgPSAtMTtcbiAgICAgICAgc3RhdGljIFdSQVBfQ09OVEVOVDogbnVtYmVyID0gLTI7XG4gICAgICAgIHN0YXRpYyBFWEFDVExZOiBudW1iZXIgPSAtMztcbiAgICB9XG4gICAgZXhwb3J0IGNsYXNzIE1lYXN1cmVTcGVjIHtcbiAgICAgICAgdmFsdWU6IG51bWJlcjtcbiAgICAgICAgbW9kZTogbnVtYmVyID0gTGF5b3V0UGFyYW1zLkVYQUNUTFk7XG4gICAgICAgIGNvbnN0cnVjdG9yKHY/OiBudW1iZXIsIG0/OiBudW1iZXIpIHtcbiAgICAgICAgICAgIGlmICh2ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGUgPSBtO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGdldE1lYXN1cmVWYWx1ZSgpIHtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5tb2RlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBMYXlvdXRQYXJhbXMuTUFUQ0hfUEFSRU5UOlxuICAgICAgICAgICAgICAgIGNhc2UgTGF5b3V0UGFyYW1zLkVYQUNUTFk6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgICAgICAgICAgICAgIGNhc2UgTGF5b3V0UGFyYW1zLldSQVBfQ09OVEVOVDpcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIExheW91dFBhcmFtcy5XUkFQX0NPTlRFTlQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJuYW1lc3BhY2UgYW5kcm9pZC52aWV3LmV2ZW50IHtcbiAgICBleHBvcnQgY2xhc3MgTW90aW9uRXZlbnQge1xuXG5cbiAgICAgICAgcHVibGljIHN0YXRpYyBBQ1RJT05fRE9XTiA9IDA7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQUNUSU9OX1VQID0gMTtcbiAgICAgICAgcHVibGljIHN0YXRpYyBBQ1RJT05fTU9WRSA9IDI7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQUNUSU9OX0NBTkNFTCA9IDM7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQUNUSU9OX09VVFNJREUgPSA0O1xuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQUNUSU9OX01PVVNFX0RPV04gPTU7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQUNUSU9OX01PVVNFX01PVkUgPSA2O1xuICAgICAgICBwdWJsaWMgc3RhdGljIEFDVElPTl9NT1VTRV9VUD03O1xuICAgICAgICBwdWJsaWMgc3RhdGljIEFDVElPTl9NT1VTRV9PVkVSPTg7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQUNUSU9OX01PVVNFX09VVCA9IDk7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQUNUSU9OX01PVVNFX09OID0xMTtcbiAgICAgICAgcHVibGljIHN0YXRpYyBBQ1RJT05fQ0xJQ0sgPSAxMDtcblxuICAgICAgICBwdWJsaWMgc3RhdGljIEFDVElPTl9TQ1JPTEwgPSAxMTtcbiAgICAgICAgcHVibGljIHN0YXRpYyBBQ1RJT05fTU9VU0VfV0hFRUwgPSAxMjtcbiAgICAgICAgXG4gICAgICAgIHByaXZhdGUgX3g6IG51bWJlcjtcbiAgICAgICAgcHJpdmF0ZSBfeTogbnVtYmVyO1xuICAgICAgICBwcml2YXRlIF9kZWx0YVk6bnVtYmVyO1xuICAgICAgICBwcml2YXRlIF9kZWx0YVg6bnVtYmVyO1xuXG4gICAgICAgIHByaXZhdGUgX2FjdGlvbjogbnVtYmVyO1xuICAgICAgICBcbiAgICAgICAgcHVibGljIHNjcmVlblg6bnVtYmVyO1xuICAgICAgICBwdWJsaWMgc2NyZWVuWTpudW1iZXI7XG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgZWxlbWVudDpIVE1MRWxlbWVudDtcblxuICAgICAgICBnZXQgeCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl94O1xuICAgICAgICB9XG4gICAgICAgIHNldCB4KHY6bnVtYmVyKXtcbiAgICAgICAgICAgIHRoaXMuX3ggPSB2O1xuICAgICAgICB9XG4gICAgICAgIHNldCB5KHY6bnVtYmVyKXtcbiAgICAgICAgICAgIHRoaXMuX3kgPSB2O1xuICAgICAgICB9XG4gICAgICAgIGdldCB5KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3k7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGdldCBkZWx0YVgoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGVsdGFYO1xuICAgICAgICB9XG4gICAgICAgIHNldCBkZWx0YVgodjpudW1iZXIpe1xuICAgICAgICAgICAgdGhpcy5fZGVsdGFYID0gdjtcbiAgICAgICAgfVxuICAgICAgICBzZXQgZGVsdGFZKHY6bnVtYmVyKXtcbiAgICAgICAgICAgIHRoaXMuX2RlbHRhWSA9IHY7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IGRlbHRhWSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kZWx0YVk7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IGFjdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hY3Rpb247XG4gICAgICAgIH1cbiAgICAgICAgc2V0IGFjdGlvbih2YWx1ZTpudW1iZXIpe1xuICAgICAgICAgICAgdGhpcy5fYWN0aW9uID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIGNsb25lKCk6TW90aW9uRXZlbnR7XG4gICAgICAgICAgICByZXR1cm4gbmV3IE1vdGlvbkV2ZW50KHRoaXMuX3gsdGhpcy5feSx0aGlzLl9hY3Rpb24pO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0cnVjdG9yKHg6bnVtYmVyLCB5Om51bWJlciwgYWN0aW9uOm51bWJlcikge1xuICAgICAgICAgICAgdGhpcy5feCA9IHg7XG4gICAgICAgICAgICB0aGlzLl95ID0geTtcbiAgICAgICAgICAgIHRoaXMuc2NyZWVuWCA9IHg7XG4gICAgICAgICAgICB0aGlzLnNjcmVlblkgPSB5O1xuICAgICAgICAgICAgdGhpcy5fYWN0aW9uID0gYWN0aW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgb2Zmc2V0KHg6bnVtYmVyLHk6bnVtYmVyKTp2b2lke1xuICAgICAgICAgICAgdGhpcy5feCs9eDtcbiAgICAgICAgICAgIHRoaXMuX3krPXk7XG4gICAgICAgICAgICB0aGlzLnNjcmVlblgrPXg7XG4gICAgICAgICAgICB0aGlzLnNjcmVlblkrPXk7XG4gICAgICAgIH1cblxuICAgICAgICB0b1N0cmluZygpOnN0cmluZ3tcbiAgICAgICAgICAgIGxldCBkZWx0YTpzdHJpbmcgPSAodGhpcy5kZWx0YVg9PSBudWxsP1wiXCI6XCIgLCBkZWx0YVggPSBcIit0aGlzLmRlbHRhWCkrKHRoaXMuZGVsdGFZID09IG51bGwgPyBcIlwiOlwiICwgZGVsdGFZID0gXCIrdGhpcy5kZWx0YVkpO1xuICAgICAgICAgICAgcmV0dXJuIFwiIHggPSBcIit0aGlzLl94K1wiICwgeSA9IFwiK3RoaXMuX3kgK2RlbHRhICtcIiAsIGFjdGlvbiA9IFwiICsgdGhpcy5fZ2V0YWN0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgX2dldGFjdGlvbigpOnN0cmluZ3tcbiAgICAgICAgICAgIHN3aXRjaCh0aGlzLl9hY3Rpb24pe1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJBQ1RJT05fT1VUU0lERVwiO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gIFwiQUNUSU9OX1VQXCIgO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gIFwiQUNUSU9OX01PVkVcIiA7XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIkFDVElPTl9DQU5DRUxcIjtcbiAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiQUNUSU9OX09VVFNJREVcIjtcbiAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiQUNUSU9OX01PVVNFX0RPV05cIjtcbiAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiQUNUSU9OX01PVVNFX01PVkVcIjtcbiAgICAgICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiQUNUSU9OX01PVVNFX1VQXCI7XG4gICAgICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICAgIHJldHVybiBcIkFDVElPTl9NT1VTRV9PVkVSXCI7XG4gICAgICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAgIHJldHVybiBcIkFDVElPTl9NT1VTRV9PVVRcIjtcbiAgICAgICAgICAgICAgICBjYXNlIDEwOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIkFDVElPTl9DTElDS1wiO1xuICAgICAgICAgICAgICAgIGNhc2UgMTE6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiQUNUSU9OX01PVVNFX09OXCI7XG4gICAgICAgICAgICAgICAgY2FzZSAxMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJBQ1RJT05fTU9VU0VfV0hFRUxcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0iLCJcbm5hbWVzcGFjZSBhbmRyb2lkLnZpZXcuYW5pbWF0aW9uIHtcbiAgICBpbXBvcnQgQ2FudmFzID0gYW5kcm9pZC5ncmFwaGljcy5DYW52YXM7XG4gICAgZXhwb3J0IGVudW0gQW5pbWF0aW9uU3RhdGUge1xuICAgICAgICBCZWZvcmVTdGFydCxcbiAgICAgICAgQW5pbWF0aW5nLFxuICAgICAgICBFbmRcbiAgICB9XG4gICAgY29uc3QgQW5pbWF0aW5nX1Byb3ByaXR5OiBudW1iZXIgPSA5OTk5OTk5O1xuICAgIGV4cG9ydCBjbGFzcyBBbmltYXRpb24ge1xuXG4gICAgICAgIGR1cmF0aW9uOiBudW1iZXIgPSAwO1xuICAgICAgICBzdGFydDogbnVtYmVyO1xuICAgICAgICBlYXNlOiBBbmltYXRpb25FYXNlO1xuICAgICAgICB0eXBlOiBBbmltYXRpb25UeXBlO1xuICAgICAgICBmcm9tOiBudW1iZXI7XG4gICAgICAgIHRvOiBudW1iZXI7XG4gICAgICAgIGZpbGxBZnRlcjogYm9vbGVhbjtcbiAgICAgICAgc3RhdGU6IEFuaW1hdGlvblN0YXRlO1xuICAgICAgICByZXBlYXRlOiBib29sZWFuO1xuICAgICAgICBfc3RhcnRDYWxsQmFjazogKHZpZXc6IFZpZXcpID0+IHZvaWQ7XG4gICAgICAgIF9lbmRDYWxsQmFjazogKHZpZXc6IFZpZXcpID0+IHZvaWQ7XG4gICAgICAgIHByaXZhdGUgX19vbGRQcm9wcml0eTogbnVtYmVyID0gMDtcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICB0aGlzLmVhc2UgPSBuZXcgQW5pbWF0aW9uRWFzZSgpO1xuICAgICAgICAgICAgdGhpcy5zdGFydCA9IDA7XG4gICAgICAgICAgICB0aGlzLmR1cmF0aW9uID0gMDtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IEFuaW1hdGlvblR5cGUuQWxwaGE7XG4gICAgICAgICAgICB0aGlzLmZyb20gPSAxO1xuICAgICAgICAgICAgdGhpcy50byA9IDE7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gQW5pbWF0aW9uU3RhdGUuQmVmb3JlU3RhcnQ7XG4gICAgICAgICAgICB0aGlzLmZpbGxBZnRlciA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5yZXBlYXRlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgc2V0QW5pbWF0aW9uQ2FsbEJhY2sob25BbmltYXRpb25TdGFydDogKHZpZXc6IFZpZXcpID0+IHZvaWQsIG9uQW5pbWF0aW9uRW5kOiAodmlldzogVmlldykgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy5fc3RhcnRDYWxsQmFjayA9IG9uQW5pbWF0aW9uU3RhcnQ7XG4gICAgICAgICAgICB0aGlzLl9lbmRDYWxsQmFjayA9IG9uQW5pbWF0aW9uRW5kO1xuICAgICAgICB9XG4gICAgICAgIGdldCBpc0FuaWFtdGlvbkVuZCgpOiBib29sZWFuIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwic3RhcnQgXCIgKyB0aGlzLnN0YXJ0ICtcIiAsIGR1cmF0aW9uIFwiK3RoaXMuZHVyYXRpb24gK1wiICwgbm93IFwiK0RhdGUubm93KCkpO1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLnN0YXJ0ICsgdGhpcy5kdXJhdGlvbiA8IERhdGUubm93KCkpIHx8IHRoaXMuc3RhdGUgPT0gQW5pbWF0aW9uU3RhdGUuRW5kO1xuICAgICAgICB9XG5cbiAgICAgICAgc2NhbGUobm93OiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJlYXNlIFwiICsoIChub3cgLSB0aGlzLnN0YXJ0KS90aGlzLmR1cmF0aW9uKSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lYXNlLmVhc2UoKG5vdyAtIHRoaXMuc3RhcnQpIC8gdGhpcy5kdXJhdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgYXBwbHlUcmFuc2Zvcm1hdGlvbihpbnRlcnBvbGF0ZWRUaW1lOiBudW1iZXIsIGNhbnZhczogQ2FudmFzLCB2aWV3OiBWaWV3KSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImFwcGx5VHJhbnNmb3JtYXRpb24gXCIraW50ZXJwb2xhdGVkVGltZSArIFwiIGNhbnZhcyBcIiArIGNhbnZhcyArIFwiIFZpZXcgXCIgKyB2aWV3KTtcbiAgICAgICAgfVxuICAgICAgICBvblN0YXJ0QW5pYW10aW9uKGNhbnZhczogQ2FudmFzLCB2aWV3OiBWaWV3KSB7XG4gICAgICAgICAgICB0aGlzLl9fb2xkUHJvcHJpdHkgPSB2aWV3LnByaW9yaXR5O1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJvblN0YXJ0QW5pYW10aW9uIFwiK3ZpZXcuaWQpO1xuICAgICAgICAgICAgdmlldy5wcmlvcml0eSA9IEFuaW1hdGluZ19Qcm9wcml0eTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9zdGFydENhbGxCYWNrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhcnRDYWxsQmFjayh2aWV3KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBvbkVuZEFuaW1hdGlvbihjYW52YXM6IENhbnZhcywgdmlldzogVmlldykge1xuICAgICAgICAgICAgdmlldy5wcmlvcml0eSA9IHRoaXMuX19vbGRQcm9wcml0eTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9lbmRDYWxsQmFjaykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2VuZENhbGxCYWNrKHZpZXcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF9fb25Jbm5lcmFuaW1hdGlvbkVuZChjYW52YXM6Q2FudmFzLHZpZXc6Vmlldyl7fVxuICAgIH1cbn0iLCJuYW1lc3BhY2UgYW5kcm9pZC52aWV3LmFuaW1hdGlvbiB7XG4gICAgXG5cbiAgICBleHBvcnQgY2xhc3MgQW5pbWF0aW9uRWFzZSB7XG4gICAgICAgIHB1YmxpYyBlYXNlKHQ6IG51bWJlcikge1xuICAgICAgICAgICAgcmV0dXJuIHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgQm91bmNlQW5pbWF0aW9uRWFzZSBleHRlbmRzIEFuaW1hdGlvbkVhc2Uge1xuXG4gICAgICAgIHB1YmxpYyBlYXNlKHQ6IG51bWJlcikge1xuICAgICAgICAgICAgdmFyIGIxID0gNCAvIDExLFxuICAgICAgICAgICAgICAgIGIyID0gNiAvIDExLFxuICAgICAgICAgICAgICAgIGIzID0gOCAvIDExLFxuICAgICAgICAgICAgICAgIGI0ID0gMyAvIDQsXG4gICAgICAgICAgICAgICAgYjUgPSA5IC8gMTEsXG4gICAgICAgICAgICAgICAgYjYgPSAxMCAvIDExLFxuICAgICAgICAgICAgICAgIGI3ID0gMTUgLyAxNixcbiAgICAgICAgICAgICAgICBiOCA9IDIxIC8gMjIsXG4gICAgICAgICAgICAgICAgYjkgPSA2MyAvIDY0LFxuICAgICAgICAgICAgICAgIGIwID0gMSAvIGIxIC8gYjE7XG4gICAgICAgICAgICByZXR1cm4gKHQgPSArdCkgPCBiMSA/IGIwICogdCAqIHQgOiB0IDwgYjMgPyBiMCAqICh0IC09IGIyKSAqIHQgKyBiNCA6IHQgPCBiNiA/IGIwICogKHQgLT0gYjUpICogdCArIGI3IDogYjAgKiAodCAtPSBiOCkgKiB0ICsgYjk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgU2luQW5pbWF0aW9uRWFzZSBleHRlbmRzIEFuaW1hdGlvbkVhc2Uge1xuICAgICAgICBwdWJsaWMgZWFzZSh0OiBudW1iZXIpIHtcbiAgICAgICAgICAgIHZhciBwaSA9IE1hdGguUEksXG4gICAgICAgICAgICAgICAgaGFsZlBpID0gcGkgLyAyO1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguc2luKHQgKiBoYWxmUGkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGV4cG9ydCBjbGFzcyBRdWFkQW5pbWF0aW9uRWFzZSBleHRlbmRzIEFuaW1hdGlvbkVhc2Uge1xuICAgICAgICBwdWJsaWMgZWFzZSh0OiBudW1iZXIpIHtcbiAgICAgICAgICAgIHJldHVybiAoKHQgKj0gMikgPD0gMSA/IHQgKiB0IDogLS10ICogKDIgLSB0KSArIDEpIC8gMjtcbiAgICAgICAgfVxuICAgIH1cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZ3JhcGhpY3MvU2l6ZS50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vaW50ZXJmYWNlL0lWaWV3LnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL0xheW91dEluZm8udHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2V2ZW50L01vdGlvbkV2ZW50LnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi91dGlsL0xvZy50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vYW5pbWF0aW9uL0FuaW1hdGlvbi50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vYW5pbWF0aW9uL0FuaW1hdGlvbkVhc2UudHNcIiAvPlxuXG5cbm5hbWVzcGFjZSBhbmRyb2lkLnZpZXcge1xuICAgIGltcG9ydCBQYWRkaW5nID0gYW5kcm9pZC5ncmFwaGljcy5QYWRkaW5nO1xuICAgIGltcG9ydCBBbGlnbiA9IGFuZHJvaWQuZ3JhcGhpY3MuQWxpZ247XG4gICAgaW1wb3J0IEFsaWduRWxlbWVudCA9IGFuZHJvaWQuZ3JhcGhpY3MuQWxpZ25FbGVtZW50O1xuICAgIGltcG9ydCBTaXplID0gYW5kcm9pZC5ncmFwaGljcy5TaXplO1xuICAgIGltcG9ydCBDYW52YXMgPSBhbmRyb2lkLmdyYXBoaWNzLkNhbnZhcztcbiAgICBpbXBvcnQgR3Jhdml0eSA9IGFuZHJvaWQuZ3JhcGhpY3MuR3Jhdml0eTtcbiAgICBpbXBvcnQgQ29udGV4dCA9IGFuZHJvaWQuYXBwLkNvbnRleHQ7XG4gICAgaW1wb3J0IE1vdGlvbkV2ZW50ID0gYW5kcm9pZC52aWV3LmV2ZW50Lk1vdGlvbkV2ZW50O1xuICAgIGltcG9ydCBMb2cgPSBhbmRyb2lkLnV0aWwuTG9nO1xuICAgIGltcG9ydCBBbmltYXRpb24gPSBhbmRyb2lkLnZpZXcuYW5pbWF0aW9uLkFuaW1hdGlvbjtcbiAgICBpbXBvcnQgQW5pbWF0aW9uRWFzZSA9IGFuZHJvaWQudmlldy5hbmltYXRpb24uQW5pbWF0aW9uRWFzZTtcbiAgICBpbXBvcnQgU3R5bGUgPSBhbmRyb2lkLmdyYXBoaWNzLlN0eWxlO1xuICAgIGltcG9ydCBEZWZhdWx0ID0gYW5kcm9pZC5kZXZpY2UuRGVmYXVsdDtcbiAgICBpbXBvcnQgQW5pbWF0aW9uU3RhdGUgPSBhbmRyb2lkLnZpZXcuYW5pbWF0aW9uLkFuaW1hdGlvblN0YXRlO1xuXG4gICAgLy8gcHVibGljIHN0YXRpYyAgVklTSUFCTEUgOm51bWJlcj0gMTsgXG4gICAgLy8gcHVibGljIHN0YXRpYyAgSU5WSVNJQUJMRSA6bnVtYmVyID0gLTE7XG4gICAgLy8gcHVibGljIHN0YXRpYyAgR09ORSA6bnVtYmVyID0gMDtcbiAgICBleHBvcnQgZW51bSBWaWV3U3RhdGUge1xuICAgICAgICBWaXNpYWJsZSxcbiAgICAgICAgSW5WaXNpYWJsZSxcbiAgICAgICAgR29uZVxuICAgIH1cbiAgICBleHBvcnQgY2xhc3MgVmlldyBpbXBsZW1lbnRzIElWaWV3IHtcbiAgICAgICAgcHVibGljIGlkOiBzdHJpbmcgPSBcIlwiO1xuICAgICAgICBwcm90ZWN0ZWQgX3dpZHRoOiBNZWFzdXJlU3BlYztcbiAgICAgICAgcHJvdGVjdGVkIF9oZWlnaHQ6IE1lYXN1cmVTcGVjO1xuICAgICAgICBwcm90ZWN0ZWQgX2JhY2tncm91bmQ6IFN0eWxlO1xuICAgICAgICBwcm90ZWN0ZWQgX3BhZGRpbmc6IFBhZGRpbmcgPSBuZXcgUGFkZGluZygpO1xuICAgICAgICBwdWJsaWMgX2xheW91dEluZm86IExheW91dEluZm87XG4gICAgICAgIHB1YmxpYyBfb2xkTGF5b3V0SW5mbzogTGF5b3V0SW5mbztcbiAgICAgICAgcHVibGljIHByaW9yaXR5OiBudW1iZXIgPSAwO1xuICAgICAgICBwcm90ZWN0ZWQgX2dyYXZpdHk6IEdyYXZpdHk7XG4gICAgICAgIHByb3RlY3RlZCBhbGlnblZpZXc6IEFsaWduRWxlbWVudDtcbiAgICAgICAgbGF5b3V0UGFyYW1zOiBMYXlvdXRQYXJhbXMgPSBuZXcgTGF5b3V0UGFyYW1zKDAsIDAsIG51bGwpO1xuICAgICAgICBwcml2YXRlIF9wYXJlbnQ6IFZpZXdHcm91cCA9IG51bGw7XG4gICAgICAgIHByaXZhdGUgX2NvbnRleHQ6IENvbnRleHQ7XG4gICAgICAgIHByb3RlY3RlZCBfY2FudmFzOiBDYW52YXM7XG4gICAgICAgIHByb3RlY3RlZCBfY2xpcDogYm9vbGVhbjtcbiAgICAgICAgcHVibGljIGFuaW1hdGlvbjogQW5pbWF0aW9uO1xuICAgICAgICBwcml2YXRlIF9hbmltYXRpb25MaXN0OiBBbmltYXRpb25bXTtcbiAgICAgICAgcHJpdmF0ZSBfZHJhd2luZ1RpbWU6IG51bWJlciA9IDA7XG4gICAgICAgIHB1YmxpYyBhbHBoYTpudW1iZXI9MTtcblxuICAgICAgICBvZmZzZXRsZWZ0OiBudW1iZXIgPSAwO1xuICAgICAgICBvZmZzZXR0b3A6IG51bWJlciA9IDA7XG4gICAgICAgIHB1YmxpYyB2aXNpYWJsZTogVmlld1N0YXRlID0gVmlld1N0YXRlLlZpc2lhYmxlO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICAgICAgLy8gRGVidWcuYXNzZXJ0KHRoaXMuX2NvbnRleHQgIT0gbnVsbCwnQ29udGV4dCBjYW4gbm90IGJlIG51bGwnKTtcbiAgICAgICAgICAgIHRoaXMuX2dyYXZpdHkgPSBHcmF2aXR5LkxlZnQ7XG4gICAgICAgICAgICB0aGlzLl9iYWNrZ3JvdW5kID0gRGVmYXVsdC5zdHlsZTtcbiAgICAgICAgICAgIHRoaXMuX2JhY2tncm91bmQuYmFja2dyb3VuZCA9ICd0cmFuc3BhcmVudCc7XG4gICAgICAgICAgICB0aGlzLl9iYWNrZ3JvdW5kLnN0cm9rZVN0eWxlLnN0cm9rZUNvbG9yID0gJ3RyYW5zcGFyZW50JztcbiAgICAgICAgICAgIHRoaXMuX2JhY2tncm91bmQuc3Ryb2tlU3R5bGUuc3Ryb2tlV2lkdGggPSAwO1xuICAgICAgICAgICAgdGhpcy5pZCA9IE1hdGgucmFuZG9tKCkgKiAxMDAwMDAwMCArIFwiXCI7XG4gICAgICAgICAgICB0aGlzLl9hbmltYXRpb25MaXN0ID0gW107XG4gICAgICAgICAgICB0aGlzLl9sYXlvdXRJbmZvID0gbmV3IExheW91dEluZm8oMCwgMCwgMCwgMCwgdGhpcy5wYWRkaW5nLCAwKTtcbiAgICAgICAgICAgIHRoaXMuX29sZExheW91dEluZm8gPSB0aGlzLmxheW91dEluZm8uY2xvbmUoKTtcblxuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBnZXRDb250ZXh0KCk6IENvbnRleHQge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHQ7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogbWF5IGJlIGNhbGxlZCBmb3Igc2VydmFsIHRpbWVzXG4gICAgICAgICAqL1xuICAgICAgICBvbk1lYXN1cmUod2lkdGg6IE1lYXN1cmVTcGVjLCBoZWlnaHQ6IE1lYXN1cmVTcGVjLCBjYW52YXM6IENhbnZhcyk6IFNpemUge1xuICAgICAgICAgICAgLy8gdGhpcy5fbGF5b3V0SW5mbyA9IG5ldyBMYXlvdXRJbmZvKDAsIDAsIDAsIDAsIHRoaXMucGFkZGluZywgMCk7XG4gICAgICAgICAgICB0aGlzLl9sYXlvdXRJbmZvLnJlc2V0KDAsMCwwLDAsdGhpcy5wYWRkaW5nLDApO1xuICAgICAgICAgICAgdmFyIHc6IG51bWJlciA9IHRoaXMubGF5b3V0UGFyYW1zLndpZHRoO1xuICAgICAgICAgICAgdmFyIGg6IG51bWJlciA9IHRoaXMubGF5b3V0UGFyYW1zLmhlaWdodDtcbiAgICAgICAgICAgIHZhciBzaXplOiBTaXplID0gbmV3IFNpemUodywgaCk7XG4gICAgICAgICAgICB2YXIgd2lkdGhtb2RlID0gdGhpcy5sYXlvdXRQYXJhbXMud2lkdGhNb2RlO1xuICAgICAgICAgICAgdmFyIGhlaWdodG1vZGUgPSB0aGlzLmxheW91dFBhcmFtcy5oZWlnaHRNb2RlO1xuICAgICAgICAgICAgaWYgKHdpZHRobW9kZSA9PT0gTGF5b3V0UGFyYW1zLk1BVENIX1BBUkVOVCkge1xuICAgICAgICAgICAgICAgIHNpemUud2lkdGggPSB3aWR0aC52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChoZWlnaHRtb2RlID09PSBMYXlvdXRQYXJhbXMuTUFUQ0hfUEFSRU5UKSB7XG4gICAgICAgICAgICAgICAgc2l6ZS5oZWlnaHQgPSBoZWlnaHQudmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNldE1lYXN1cmVkRGltZW5zaW9uKG5ldyBNZWFzdXJlU3BlYyhzaXplLndpZHRoLCBMYXlvdXRQYXJhbXMuRVhBQ1RMWSksIG5ldyBNZWFzdXJlU3BlYyhzaXplLmhlaWdodCwgTGF5b3V0UGFyYW1zLkVYQUNUTFkpKTtcbiAgICAgICAgICAgIHJldHVybiBzaXplO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGdldERyYXdpbmdUaW1lKCk6IG51bWJlciB7XG4gICAgICAgICAgICBpZiAodGhpcy5wYXJlbnQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kcmF3aW5nVGltZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIERhdGUubm93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIHNldERyYXdpbmdUaW1lKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2RyYXdpbmdUaW1lID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBvbkxheW91dChsOiBudW1iZXIsIHQ6IG51bWJlciwgcjogbnVtYmVyLCBiOiBudW1iZXIsIGNhbnZhczogQ2FudmFzKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLmxheW91dEluZm8ucmVzZXQobCArIHRoaXMub2Zmc2V0bGVmdCwgdCArIHRoaXMub2Zmc2V0dG9wLCByICsgdGhpcy5vZmZzZXRsZWZ0LCBiICsgdGhpcy5vZmZzZXR0b3AsIHRoaXMucGFkZGluZywgMCk7XG4gICAgICAgICAgICBpZiAodGhpcy5sYXlvdXRJbmZvICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vbGRMYXlvdXRJbmZvID0gdGhpcy5sYXlvdXRJbmZvLmNsb25lKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcHJvdGVjdGVkIGlzbGF5b3V0Q2hhbmdlZCgpOiBib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5sYXlvdXRJbmZvLmVxdWFsKHRoaXMuX29sZExheW91dEluZm8pO1xuICAgICAgICB9XG4gICAgICAgIG9uRHJhdyhjYW52YXM6IENhbnZhcyk6IHZvaWQge1xuICAgICAgICAgICAgaWYgKHRoaXMudmlzaWFibGUgIT0gVmlld1N0YXRlLlZpc2lhYmxlKSB7IHJldHVybjsgfVxuICAgICAgICAgICAgdGhpcy5fY2FudmFzID0gY2FudmFzO1xuICAgICAgICAgICAgaWYgKHRoaXMuYmFja2dyb3VuZCkge1xuICAgICAgICAgICAgICAgIGNhbnZhcy5kcmF3UmVjdCh0aGlzLl9sYXlvdXRJbmZvLm91dHRlcnJlY3Quc3RhcnRQb2ludCwgdGhpcy5fbGF5b3V0SW5mby5vdXR0ZXJyZWN0LmVuZFBvaW50LCB0cnVlLCB0aGlzLmJhY2tncm91bmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHNldE1lYXN1cmVkRGltZW5zaW9uKHdpZHRoOiBNZWFzdXJlU3BlYywgaGVpZ2h0OiBNZWFzdXJlU3BlYykge1xuICAgICAgICAgICAgdGhpcy5fd2lkdGggPSB3aWR0aDtcbiAgICAgICAgICAgIHRoaXMuX2hlaWdodCA9IGhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBvblRvdWNoRXZlbnQoZXZlbnQ6IE1vdGlvbkV2ZW50KTogYm9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIG9uTW91c2VFdmVudChldmVudDogTW90aW9uRXZlbnQpOiBib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgdHJhY2UoeDpudW1iZXIseTpudW1iZXIpOmJvb2xlYW57XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sYXlvdXRJbmZvLm91dHRlcnJlY3QuY29udGFpbnMoeCx5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBpbnZhbGlkYXRlKGZvcmNlOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgICAgICBmb3JjZSA9IHRydWU7XG4gICAgICAgICAgICBpZiAoZm9yY2UpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnQuaW52YWxpZGF0ZShmb3JjZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbmludmFsaWRhdGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50LmludmFsaWRhdGVDaGlsZCh0aGlzLCB0aGlzLmxheW91dEluZm8ub3V0dGVycmVjdCk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbmludmFsaWRhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBnZXRSb290VmlldygpOiBWaWV3IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmVudCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbGV0IHBhcmVudCA9IHRoaXMucGFyZW50O1xuICAgICAgICAgICAgICAgIC8vIGRvIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudDtcbiAgICAgICAgICAgICAgICAvLyB9IHdoaWxlIChwYXJlbnQucGFyZW50ICE9IG51bGwpXG4gICAgICAgICAgICAgICAgd2hpbGUgKHBhcmVudC5wYXJlbnQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgb25pbnZhbGlkYXRlKCkge1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHJlcXVlc3RMYXlvdXQoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudC5yZXF1ZXN0TGF5b3V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIHB1YmxpYyBzdGFydEFuaW1hdGlvbihhbmltYXRpb246IEFuaW1hdGlvbikge1xuICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uID09IG51bGwgfHwgdGhpcy5hbmltYXRpb24uaXNBbmlhbXRpb25FbmQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IGFuaW1hdGlvbjtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFJvb3RWaWV3KCkuc3RhcnRBbmltYXRpb24oYW5pbWF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24uX19vbklubmVyYW5pbWF0aW9uRW5kID0gKGNhbnZhczogQ2FudmFzLCB2aWV3OiBWaWV3KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24ucmVwZWF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnN0YXJ0ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5zdGF0ZSA9IEFuaW1hdGlvblN0YXRlLkJlZm9yZVN0YXJ0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRBbmltYXRpb24odGhpcy5hbmltYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbkxpc3QucHVzaChhbmltYXRpb24pO1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLl9fb25Jbm5lcmFuaW1hdGlvbkVuZCA9IChjYW52YXM6IENhbnZhcywgdmlldzogVmlldykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fYW5pbWF0aW9uTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmFuaW1hdGlvbiA9IHRoaXMuX2FuaW1hdGlvbkxpc3QucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0QW5pbWF0aW9uKGN1cnJhbmltYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgY2xlYW5BbmltYXRpb24oKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnJlcGVhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5zdGF0ZSA9IEFuaW1hdGlvblN0YXRlLkVuZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbkxpc3QubGVuZ3RoID0gMDtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgc2V0UGFyZW50KHA6IFZpZXdHcm91cCkge1xuICAgICAgICAgICAgdGhpcy5fcGFyZW50ID0gcDtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgb2Zmc2V0KGxlZnQ6IG51bWJlciwgdG9wOiBudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMub2Zmc2V0bGVmdCArPSBsZWZ0O1xuICAgICAgICAgICAgdGhpcy5vZmZzZXR0b3AgKz0gdG9wO1xuICAgICAgICAgICAgaWYgKGlzTmFOKGxlZnQpIHx8IGlzTmFOKHRoaXMub2Zmc2V0bGVmdCkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9mZnNldCBlcnJvclwiKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBcIm9mZnNldCBlcnJvciBcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib2Zmc2V0IFwiICsgdG9wKTtcbiAgICAgICAgICAgIC8vIHRoaXMubGF5b3V0SW5mby5vZmZzZXQobGVmdCx0b3ApO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IHBhcmVudCgpOiBWaWV3R3JvdXAge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmVudDtcbiAgICAgICAgfVxuICAgICAgICBnZXQgd2lkdGgoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fd2lkdGguZ2V0TWVhc3VyZVZhbHVlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IGhlaWdodCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9oZWlnaHQuZ2V0TWVhc3VyZVZhbHVlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXQgcGFkZGluZyhwYWRkaW5nOiBQYWRkaW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9wYWRkaW5nID0gcGFkZGluZztcbiAgICAgICAgfVxuICAgICAgICBnZXQgcGFkZGluZygpOiBQYWRkaW5nIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wYWRkaW5nO1xuICAgICAgICB9XG4gICAgICAgIGdldCBsZWZ0KCk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGF5b3V0SW5mby5vdXR0ZXJyZWN0LmxlZnQ7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgdG9wKCk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGF5b3V0SW5mby5vdXR0ZXJyZWN0LnRvcDtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCByaWdodCgpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xheW91dEluZm8ub3V0dGVycmVjdC5yaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCBib3R0b20oKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9sYXlvdXRJbmZvLm91dHRlcnJlY3QuYm90dG9tO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0IGJhY2tncm91bmQoYmFja2dyb3VuZDogU3R5bGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2JhY2tncm91bmQgPSBiYWNrZ3JvdW5kO1xuICAgICAgICB9XG4gICAgICAgIGdldCBiYWNrZ3JvdW5kKCk6IFN0eWxlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9iYWNrZ3JvdW5kO1xuICAgICAgICB9XG4gICAgICAgIGdldCBsYXlvdXRJbmZvKCk6IExheW91dEluZm8ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9sYXlvdXRJbmZvKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGF5b3V0SW5mbyA9IG5ldyBMYXlvdXRJbmZvKDAsIDAsIDAsIDAsIHRoaXMucGFkZGluZywgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGF5b3V0SW5mbztcbiAgICAgICAgfVxuXG5cbiAgICAgICAgc2V0IGdyYXZpdHkoZ3Jhdml0eTogR3Jhdml0eSkge1xuICAgICAgICAgICAgdGhpcy5fZ3Jhdml0eSA9IGdyYXZpdHk7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IGdyYXZpdHkoKTogR3Jhdml0eSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ3Jhdml0eTtcbiAgICAgICAgfVxuICAgICAgICBzZXQgY2xpcCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICAgICAgdGhpcy5fY2xpcCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGdldCBjbGlwKCk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NsaXA7XG4gICAgICAgIH1cbiAgICB9XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2dyYXBoaWNzL1V0aWwudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2ludGVyZmFjZS9JVmlld0dyb3VwLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJWaWV3LnRzXCIgLz5cblxubmFtZXNwYWNlIGFuZHJvaWQudmlldyB7XG5cbiAgICBpbXBvcnQgUGFkZGluZyA9IGFuZHJvaWQuZ3JhcGhpY3MuUGFkZGluZztcbiAgICBpbXBvcnQgQWxpZ24gPSBhbmRyb2lkLmdyYXBoaWNzLkFsaWduO1xuICAgIGltcG9ydCBBbGlnbkVsZW1lbnQgPSBhbmRyb2lkLmdyYXBoaWNzLkFsaWduRWxlbWVudDtcbiAgICBpbXBvcnQgU2l6ZSA9IGFuZHJvaWQuZ3JhcGhpY3MuU2l6ZTtcbiAgICBpbXBvcnQgQ2FudmFzID0gYW5kcm9pZC5ncmFwaGljcy5DYW52YXM7XG4gICAgaW1wb3J0IE1vdGlvbkV2ZW50ID0gYW5kcm9pZC52aWV3LmV2ZW50Lk1vdGlvbkV2ZW50O1xuICAgIGltcG9ydCBMb2cgPSBhbmRyb2lkLnV0aWwuTG9nO1xuICAgIGltcG9ydCBSZWN0ID0gYW5kcm9pZC5ncmFwaGljcy5SZWN0O1xuICAgIGltcG9ydCBVdGlsID0gYW5kcm9pZC5ncmFwaGljcy5VdGlsO1xuICAgIGltcG9ydCBBbmltYXRpb25TdGF0ZSA9IGFuZHJvaWQudmlldy5hbmltYXRpb24uQW5pbWF0aW9uU3RhdGU7XG4gICAgZXhwb3J0IGNsYXNzIFZpZXdHcm91cCBleHRlbmRzIFZpZXcgaW1wbGVtZW50cyBJVmlld0dyb3VwIHtcblxuICAgICAgICBwcm90ZWN0ZWQgY2hpbGRyZW46IEFycmF5PFZpZXc+ID0gbmV3IEFycmF5PFZpZXc+KCk7XG5cbiAgICAgICAgcHJpdmF0ZSBfbUN1cnJlbnRUb3VjaFRhcmdldDogYW55ID0gbnVsbDtcblxuICAgICAgICBwcml2YXRlIF9pc0ludGVyY2VwdDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgICAgIHByaXZhdGUgbGFzdEludGVyY2VwdEV2ZW50OiBNb3Rpb25FdmVudFtdID0gW107XG5cbiAgICAgICAgcHVibGljIGRpc3BhdGNoRHJhdyhjYW52YXM6IENhbnZhcyk6IHZvaWQge1xuXG4gICAgICAgICAgICB2YXIgaXRlbTogVmlldztcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIGl0ZW0gPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgIGl0ZW0uc2V0RHJhd2luZ1RpbWUodGhpcy5nZXREcmF3aW5nVGltZSgpKTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS52aXNpYWJsZSAhPSBWaWV3U3RhdGUuVmlzaWFibGUpIHsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5jbGlwID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGlwID0gdGhpcy5jbGlwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5jbGlwID09PSB0cnVlIHx8IGl0ZW0uY2xpcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbnZhcy5zYXZlKCk7XG4gICAgICAgICAgICAgICAgICAgIGNhbnZhcy5jbGlwKGl0ZW0ubGF5b3V0SW5mby5vdXR0ZXJyZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3Q2hpbGQoY2FudmFzLCBpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgY2FudmFzLnJlc3RvcmUoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdDaGlsZChjYW52YXMsIGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGRyYXdDaGlsZChjYW52YXM6IENhbnZhcywgdmlldzogVmlldykge1xuICAgICAgICAgICAgLy8gaWYgKFV0aWwuaXNNaXhlZCh2aWV3LmxheW91dEluZm8uaW5uZXJyZWN0LCB0aGlzLmxheW91dEluZm8uaW5uZXJyZWN0KSkge1xuICAgICAgICAgICAgICAgIGlmICh2aWV3LmFuaW1hdGlvbiAhPSBudWxsICYmICF2aWV3LmFuaW1hdGlvbi5pc0FuaWFtdGlvbkVuZCkge1xuICAgICAgICAgICAgICAgICAgICBjYW52YXMuc2F2ZSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodmlldy5hbmltYXRpb24uc3RhdGUgPT09IEFuaW1hdGlvblN0YXRlLkJlZm9yZVN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3Ll9sYXlvdXRJbmZvID0gdmlldy5fb2xkTGF5b3V0SW5mby5jbG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5hbmltYXRpb24ub25TdGFydEFuaWFtdGlvbihjYW52YXMsIHZpZXcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5hbmltYXRpb24uc3RhdGUgPSBBbmltYXRpb25TdGF0ZS5BbmltYXRpbmc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmlldy5hbmltYXRpb24uYXBwbHlUcmFuc2Zvcm1hdGlvbih2aWV3LmFuaW1hdGlvbi5zY2FsZSh0aGlzLmdldERyYXdpbmdUaW1lKCkpLCBjYW52YXMsIHZpZXcpO1xuICAgICAgICAgICAgICAgICAgICBpZih2aWV3LmFscGhhICE9IG51bGwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzLmFscGhhID0gdmlldy5hbHBoYTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2aWV3Lm9uRHJhdyhjYW52YXMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodmlldyBpbnN0YW5jZW9mIFZpZXdHcm91cCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5kaXNwYXRjaERyYXcoY2FudmFzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYW52YXMucmVzdG9yZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7Ly8gbm9ybWFsIGRyYXdpbmc7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2aWV3LmFuaW1hdGlvbiAhPSBudWxsICYmIHZpZXcuYW5pbWF0aW9uLmlzQW5pYW10aW9uRW5kICYmIHZpZXcuYW5pbWF0aW9uLnN0YXRlICE9IEFuaW1hdGlvblN0YXRlLkVuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5hbmltYXRpb24uc3RhdGUgPSBBbmltYXRpb25TdGF0ZS5FbmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3LmFuaW1hdGlvbi5vbkVuZEFuaW1hdGlvbihjYW52YXMsIHZpZXcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF2aWV3LmFuaW1hdGlvbi5maWxsQWZ0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3Ll9sYXlvdXRJbmZvID0gdmlldy5fb2xkTGF5b3V0SW5mby5jbG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5hbmltYXRpb24uX19vbklubmVyYW5pbWF0aW9uRW5kKGNhbnZhcyx2aWV3KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZih2aWV3LmFscGhhICE9IG51bGwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzLmFscGhhID0gdmlldy5hbHBoYTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2aWV3Lm9uRHJhdyhjYW52YXMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodmlldyBpbnN0YW5jZW9mIFZpZXdHcm91cCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5kaXNwYXRjaERyYXcoY2FudmFzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgY2xlYW5BbmltYXRpb24oKXtcbiAgICAgICAgICAgIHN1cGVyLmNsZWFuQW5pbWF0aW9uKCk7XG4gICAgICAgICAgICBmb3IobGV0IHZpZXcgb2YgdGhpcy5jaGlsZHJlbil7XG4gICAgICAgICAgICAgICAgdmlldy5jbGVhbkFuaW1hdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgb25pbnZhbGlkYXRlKCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGlsZHJlbltpXS5vbmludmFsaWRhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBpbnZhbGlkYXRlQ2hpbGQoY2hpbGQ6IFZpZXcsIGRpcnR5OiBSZWN0KTogdm9pZCB7XG4gICAgICAgICAgICBpZiAoVXRpbC5jb250YWluc1JlY3QodGhpcy5sYXlvdXRJbmZvLm91dHRlcnJlY3QsIGRpcnR5KSkge1xuICAgICAgICAgICAgICAgIGxldCBuZXdkaXJ0eSA9IFV0aWwudW5pb24oZGlydHksIHRoaXMubGF5b3V0SW5mby5vdXR0ZXJyZWN0KVxuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50LmludmFsaWRhdGVDaGlsZCh0aGlzLCBuZXdkaXJ0eSk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbmludmFsaWRhdGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaERyYXcodGhpcy5fY2FudmFzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBnZXRDaGlsZENvdW50KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGdldENoaWxkQXQoaW5kZXg6IG51bWJlcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW5baW5kZXhdO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBnZXRTb3J0Vmlld3MoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbjtcbiAgICAgICAgfVxuXG4gICAgICAgIG9uTGF5b3V0KGw6IG51bWJlciwgdDogbnVtYmVyLCByOiBudW1iZXIsIGI6IG51bWJlciwgY2FudmFzOiBDYW52YXMpOiB2b2lkIHtcbiAgICAgICAgICAgIHN1cGVyLm9uTGF5b3V0KGwsIHQsIHIsIGIsIGNhbnZhcyk7XG4gICAgICAgIH1cblxuICAgICAgICBvbk1lYXN1cmUod2lkdGg6IE1lYXN1cmVTcGVjLCBoZWlnaHQ6IE1lYXN1cmVTcGVjLCBjYW52YXM6IENhbnZhcyk6IFNpemUge1xuICAgICAgICAgICAgdmFyIG1heFNpemU6IFNpemU7XG4gICAgICAgICAgICAvLyByZXR1cm4gc3VwZXIub25NZWFzdXJlKHdpZHRoLGhlaWdodCxjYW52YXMpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGl0ZW06IFZpZXcgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgIHZhciBscDogTGF5b3V0UGFyYW1zID0gaXRlbS5sYXlvdXRQYXJhbXM7XG4gICAgICAgICAgICAgICAgdmFyIHc6IG51bWJlciA9IGxwLndpZHRoO1xuICAgICAgICAgICAgICAgIHZhciBoOiBudW1iZXIgPSBscC5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgLy9UTyBETy4uLlxuICAgICAgICAgICAgICAgIGlmIChscC5oZWlnaHRNb2RlID09PSBMYXlvdXRQYXJhbXMuTUFUQ0hfUEFSRU5UKSB7XG4gICAgICAgICAgICAgICAgICAgIGggPSBoZWlnaHQudmFsdWUgLSBpdGVtLmxheW91dFBhcmFtcy5tYXJnaW4ubWFyZ2luVG9wIC0gaXRlbS5sYXlvdXRQYXJhbXMubWFyZ2luLm1hcmdpbkJvdHRvbSAtIHRoaXMucGFkZGluZy50b3BQYWRkaW5nIC0gdGhpcy5wYWRkaW5nLmJvdHRvbVBhZGRpbmc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChscC53aWR0aE1vZGUgPT09IExheW91dFBhcmFtcy5NQVRDSF9QQVJFTlQpIHtcbiAgICAgICAgICAgICAgICAgICAgdyA9IHdpZHRoLnZhbHVlIC0gaXRlbS5sYXlvdXRQYXJhbXMubWFyZ2luLm1hcmdpbkxlZnQgLSBpdGVtLmxheW91dFBhcmFtcy5tYXJnaW4ubWFyZ2luUmlnaHQgLSB0aGlzLnBhZGRpbmcubGVmdFBhZGRpbmcgLSB0aGlzLnBhZGRpbmcucmlnaHRQYWRkaW5nO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBzaXplID0gaXRlbS5vbk1lYXN1cmUobmV3IE1lYXN1cmVTcGVjKHcsIGxwLndpZHRoTW9kZSksIG5ldyBNZWFzdXJlU3BlYyhoLCBscC5oZWlnaHRNb2RlKSwgY2FudmFzKTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS52aXNpYWJsZSA9PT0gVmlld1N0YXRlLkdvbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgc2l6ZSA9IG5ldyBTaXplKDAsIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobWF4U2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF4U2l6ZS53aWR0aCA8IHNpemUud2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heFNpemUud2lkdGggPSBzaXplLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXhTaXplLmhlaWdodCA8IHNpemUuaGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhTaXplLmhlaWdodCA9IHNpemUuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbWF4U2l6ZSA9IHNpemU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFtYXhTaXplKSB7XG4gICAgICAgICAgICAgICAgbWF4U2l6ZSA9IG5ldyBTaXplKDAsIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMubGF5b3V0UGFyYW1zLndpZHRoTW9kZSA9PT0gTGF5b3V0UGFyYW1zLkVYQUNUTFkpIHtcbiAgICAgICAgICAgICAgICBtYXhTaXplLndpZHRoID0gdGhpcy5sYXlvdXRQYXJhbXMud2lkdGg7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubGF5b3V0UGFyYW1zLndpZHRoTW9kZSA9PT0gTGF5b3V0UGFyYW1zLk1BVENIX1BBUkVOVCkge1xuICAgICAgICAgICAgICAgIG1heFNpemUud2lkdGggPSB3aWR0aC5nZXRNZWFzdXJlVmFsdWUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmxheW91dFBhcmFtcy5oZWlnaHRNb2RlID09PSBMYXlvdXRQYXJhbXMuRVhBQ1RMWSkge1xuICAgICAgICAgICAgICAgIG1heFNpemUuaGVpZ2h0ID0gdGhpcy5sYXlvdXRQYXJhbXMuaGVpZ2h0O1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmxheW91dFBhcmFtcy5oZWlnaHRNb2RlID09PSBMYXlvdXRQYXJhbXMuTUFUQ0hfUEFSRU5UKSB7XG4gICAgICAgICAgICAgICAgbWF4U2l6ZS5oZWlnaHQgPSBoZWlnaHQuZ2V0TWVhc3VyZVZhbHVlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNldE1lYXN1cmVkRGltZW5zaW9uKG5ldyBNZWFzdXJlU3BlYyhtYXhTaXplLndpZHRoLCBMYXlvdXRQYXJhbXMuRVhBQ1RMWSksIG5ldyBNZWFzdXJlU3BlYyhtYXhTaXplLmhlaWdodCwgTGF5b3V0UGFyYW1zLkVYQUNUTFkpKTtcbiAgICAgICAgICAgIHJldHVybiBtYXhTaXplO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGFkZFZpZXcodmlldzogVmlldywgaW5kZXg6IG51bWJlciA9IDAsIGxheW91dFBhcmFtczogTGF5b3V0UGFyYW1zID0gbnVsbCk6IG51bWJlciB7XG4gICAgICAgICAgICB0aGlzLmFkZFZpZXdXaXRoT3V0UmVMYXlvdXQodmlldywgaW5kZXgsIGxheW91dFBhcmFtcyk7XG4gICAgICAgICAgICB0aGlzLnJlcXVlc3RMYXlvdXQoKTtcbiAgICAgICAgICAgIHJldHVybiBpbmRleDtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgbm90aWZ5RHJhd09yZGVyQ2hhbmdlZCgpIHtcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4uc29ydCgoYTogVmlldywgYjogVmlldykgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBhLnByaW9yaXR5IC0gYi5wcmlvcml0eTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBhZGRWaWV3V2l0aE91dFJlTGF5b3V0KHZpZXc6IFZpZXcsIGluZGV4OiBudW1iZXIgPSAwLCBsYXlvdXRQYXJhbXM6IExheW91dFBhcmFtcyA9IG51bGwpOiBudW1iZXIge1xuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5wdXNoKHZpZXcpO1xuICAgICAgICAgICAgLy8gdGhpcy5jaGlsZHJlbi5zb3J0KChhOiBWaWV3LCBiOiBWaWV3KSA9PiB7XG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuIGEucHJpb3JpdHkgLSBiLnByaW9yaXR5O1xuICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeURyYXdPcmRlckNoYW5nZWQoKTtcbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gdW5kZWZpbmVkICYmIGluZGV4ICE9PSBudWxsICYmIGluZGV4ID49IDApIHtcbiAgICAgICAgICAgICAgICB2aWV3LmxheW91dEluZm8uZHJhd2luZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZpZXcubGF5b3V0SW5mby5kcmF3aW5kZXggPSB0aGlzLmNoaWxkcmVuLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGF5b3V0UGFyYW1zICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB2aWV3LmxheW91dFBhcmFtcyA9IGxheW91dFBhcmFtcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZpZXcuc2V0UGFyZW50KHRoaXMpO1xuICAgICAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHJlbW92ZUFsbFZpZXdzKCkge1xuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5sZW5ndGggPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHJlbW92ZVZpZXcodmlldzogVmlldykge1xuICAgICAgICAgICAgbGV0IGluZGV4OiBudW1iZXIgPSB0aGlzLmNoaWxkcmVuLmluZGV4T2Yodmlldyk7XG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB2aWV3LnNldFBhcmVudChudWxsKTtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgb25JbnRlcmNlcHRUb3VjaEV2ZW50KGV2ZW50OiBNb3Rpb25FdmVudCk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGRpc3BhdGNoVG91Y2hFdmVudChldmVudDogTW90aW9uRXZlbnQpOiBib29sZWFuIHtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLl9tQ3VycmVudFRvdWNoVGFyZ2V0IHx8IHRoaXMuX21DdXJyZW50VG91Y2hUYXJnZXQgaW5zdGFuY2VvZiBWaWV3R3JvdXApIHtcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmFjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIE1vdGlvbkV2ZW50LkFDVElPTl9ET1dOOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9tQ3VycmVudFRvdWNoVGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IHRoaXMuY2hpbGRyZW4gJiYgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkOiBWaWV3ID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGQubGF5b3V0SW5mby5vdXR0ZXJyZWN0LmNvbnRhaW5zKGV2ZW50LngsIGV2ZW50LnkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbUN1cnJlbnRUb3VjaFRhcmdldCA9IGNoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9tQ3VycmVudFRvdWNoVGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISh0aGlzLl9tQ3VycmVudFRvdWNoVGFyZ2V0IGluc3RhbmNlb2YgVmlld0dyb3VwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuX21DdXJyZW50VG91Y2hUYXJnZXQub25JbnRlcmNlcHRUb3VjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9tQ3VycmVudFRvdWNoVGFyZ2V0Lm9uVG91Y2hFdmVudChldmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNJbnRlcmNlcHQgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdEludGVyY2VwdEV2ZW50LnB1c2goZXZlbnQuY2xvbmUoKSk7Ly/orrDlvZVkb3du5pe25YCZ55qEZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSBNb3Rpb25FdmVudC5BQ1RJT05fTU9WRTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tQ3VycmVudFRvdWNoVGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzSW50ZXJjZXB0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21DdXJyZW50VG91Y2hUYXJnZXQub25Ub3VjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEodGhpcy5fbUN1cnJlbnRUb3VjaFRhcmdldCBpbnN0YW5jZW9mIFZpZXdHcm91cCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLl9tQ3VycmVudFRvdWNoVGFyZ2V0Lm9uSW50ZXJjZXB0VG91Y2hFdmVudChldmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNJbnRlcmNlcHQgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdEludGVyY2VwdEV2ZW50LmZvckVhY2goZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9tQ3VycmVudFRvdWNoVGFyZ2V0Lm9uVG91Y2hFdmVudChlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdEludGVyY2VwdEV2ZW50Lmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21DdXJyZW50VG91Y2hUYXJnZXQub25Ub3VjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0SW50ZXJjZXB0RXZlbnQuZm9yRWFjaChlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tQ3VycmVudFRvdWNoVGFyZ2V0IGluc3RhbmNlb2YgVmlld0dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbUN1cnJlbnRUb3VjaFRhcmdldC5kaXNwYXRjaFRvdWNoRXZlbnQoZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RJbnRlcmNlcHRFdmVudC5sZW5ndGggPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbUN1cnJlbnRUb3VjaFRhcmdldCBpbnN0YW5jZW9mIFZpZXdHcm91cCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21DdXJyZW50VG91Y2hUYXJnZXQuZGlzcGF0Y2hUb3VjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuXG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSBNb3Rpb25FdmVudC5BQ1RJT05fVVA6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgTW90aW9uRXZlbnQuQUNUSU9OX0NBTkNFTDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tQ3VycmVudFRvdWNoVGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0SW50ZXJjZXB0RXZlbnQuZm9yRWFjaChlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzSW50ZXJjZXB0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9tQ3VycmVudFRvdWNoVGFyZ2V0Lm9uVG91Y2hFdmVudChlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21DdXJyZW50VG91Y2hUYXJnZXQuZGlzcGF0Y2hUb3VjaEV2ZW50KGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzSW50ZXJjZXB0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21DdXJyZW50VG91Y2hUYXJnZXQub25Ub3VjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLl9tQ3VycmVudFRvdWNoVGFyZ2V0LmRpc3BhdGNoVG91Y2hFdmVudChldmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9tQ3VycmVudFRvdWNoVGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RJbnRlcmNlcHRFdmVudC5sZW5ndGggPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzSW50ZXJjZXB0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHB1YmxpYyBvbkludGVyY2VwdE1vdXNlRXZlbnQoZXZlbnQ6IE1vdGlvbkV2ZW50KTogYm9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIG9uTW91c2VFdmVudChldmVudDogTW90aW9uRXZlbnQpOiBib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgZGlzcGF0Y2hNb3VzZUV2ZW50KGV2ZW50OiBNb3Rpb25FdmVudCk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmFjdGlvbiA9PT0gTW90aW9uRXZlbnQuQUNUSU9OX01PVVNFX09VVCB8fCBldmVudC5hY3Rpb24gPT09IE1vdGlvbkV2ZW50LkFDVElPTl9NT1VTRV9VUCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tQ3VycmVudFRvdWNoVGFyZ2V0ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG91dF9ldmVudDogTW90aW9uRXZlbnQgPSBldmVudC5jbG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICBvdXRfZXZlbnQuYWN0aW9uID0gTW90aW9uRXZlbnQuQUNUSU9OX01PVVNFX09VVDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX21DdXJyZW50VG91Y2hUYXJnZXQgaW5zdGFuY2VvZiBWaWV3R3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tQ3VycmVudFRvdWNoVGFyZ2V0Lm9uSW50ZXJjZXB0TW91c2VFdmVudChvdXRfZXZlbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbUN1cnJlbnRUb3VjaFRhcmdldC5vbk1vdXNlRXZlbnQob3V0X2V2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbUN1cnJlbnRUb3VjaFRhcmdldC5kaXNwYXRjaE1vdXNlRXZlbnQob3V0X2V2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21DdXJyZW50VG91Y2hUYXJnZXQub25Nb3VzZUV2ZW50KG91dF9ldmVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNJbnRlcmNlcHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fbUN1cnJlbnRUb3VjaFRhcmdldCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5fbUN1cnJlbnRUb3VjaFRhcmdldCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faXNJbnRlcmNlcHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgdGhpcy5jaGlsZHJlbiAmJiBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQ6IFZpZXcgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGlsZC50cmFjZShldmVudC54LCBldmVudC55KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21DdXJyZW50VG91Y2hUYXJnZXQgPSBjaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbUN1cnJlbnRUb3VjaFRhcmdldCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBvbl9ldmVudDogTW90aW9uRXZlbnQgPSBldmVudC5jbG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICBvbl9ldmVudC5hY3Rpb24gPSBNb3Rpb25FdmVudC5BQ1RJT05fTU9VU0VfT047XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHRoaXMuX21DdXJyZW50VG91Y2hUYXJnZXQgaW5zdGFuY2VvZiBWaWV3R3JvdXApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbUN1cnJlbnRUb3VjaFRhcmdldC5vbk1vdXNlRXZlbnQob25fZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX21DdXJyZW50VG91Y2hUYXJnZXQub25JbnRlcmNlcHRNb3VzZUV2ZW50KG9uX2V2ZW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21DdXJyZW50VG91Y2hUYXJnZXQub25Nb3VzZUV2ZW50KG9uX2V2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tQ3VycmVudFRvdWNoVGFyZ2V0LmRpc3BhdGNoTW91c2VFdmVudChvbl9ldmVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9tQ3VycmVudFRvdWNoVGFyZ2V0LnRyYWNlKGV2ZW50LngsIGV2ZW50LnkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBvdXRfZXZlbnQ6IE1vdGlvbkV2ZW50ID0gZXZlbnQuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgb3V0X2V2ZW50LmFjdGlvbiA9IE1vdGlvbkV2ZW50LkFDVElPTl9NT1VTRV9PVVQ7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmbGc6IGJvb2xlYW4gPSBmYWxzZTsvLyB0aGlzLl9tQ3VycmVudFRvdWNoVGFyZ2V0Lm9uTW91c2VFdmVudChvdXRfZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbUN1cnJlbnRUb3VjaFRhcmdldCBpbnN0YW5jZW9mIFZpZXdHcm91cCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX21DdXJyZW50VG91Y2hUYXJnZXQub25JbnRlcmNlcHRNb3VzZUV2ZW50KG91dF9ldmVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGcgPSB0aGlzLl9tQ3VycmVudFRvdWNoVGFyZ2V0Lm9uTW91c2VFdmVudChvdXRfZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGcgPSB0aGlzLl9tQ3VycmVudFRvdWNoVGFyZ2V0LmRpc3BhdGNoTW91c2VFdmVudChvdXRfZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmxnID0gdGhpcy5fbUN1cnJlbnRUb3VjaFRhcmdldC5vbk1vdXNlRXZlbnQob3V0X2V2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tQ3VycmVudFRvdWNoVGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZsZztcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLl9tQ3VycmVudFRvdWNoVGFyZ2V0ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vbk1vdXNlRXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCEodGhpcy5fbUN1cnJlbnRUb3VjaFRhcmdldCBpbnN0YW5jZW9mIFZpZXdHcm91cCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbUN1cnJlbnRUb3VjaFRhcmdldC5vbk1vdXNlRXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX21DdXJyZW50VG91Y2hUYXJnZXQub25JbnRlcmNlcHRNb3VzZUV2ZW50KGV2ZW50KSkge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21DdXJyZW50VG91Y2hUYXJnZXQub25Nb3VzZUV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21DdXJyZW50VG91Y2hUYXJnZXQuZGlzcGF0Y2hNb3VzZUV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cblxuXG4gICAgICAgIC8vIHB1YmxpYyBkaXNwYXRjaE1vdXNlRXZlbnQoZXZlbnQ6IE1vdGlvbkV2ZW50KTogYm9vbGVhbiB7XG5cbiAgICAgICAgLy8gICAgIGlmICghdGhpcy5fbUN1cnJlbnRUb3VjaFRhcmdldCB8fCB0aGlzLl9tQ3VycmVudFRvdWNoVGFyZ2V0IGluc3RhbmNlb2YgVmlld0dyb3VwKSB7XG4gICAgICAgIC8vICAgICAgICAgbGV0IHJlc3VsdDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgICAgIC8vICAgICAgICAgc3dpdGNoIChldmVudC5hY3Rpb24pIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgY2FzZSBNb3Rpb25FdmVudC5BQ1RJT05fTU9VU0VfRE9XTjpcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGlmICghdGhpcy5fbUN1cnJlbnRUb3VjaFRhcmdldCkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyB0aGlzLmNoaWxkcmVuICYmIGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZDogVmlldyA9IHRoaXMuY2hpbGRyZW5baV07XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGlsZCkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkLmxheW91dEluZm8ub3V0dGVycmVjdC5jb250YWlucyhldmVudC54LCBldmVudC55KSkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21DdXJyZW50VG91Y2hUYXJnZXQgPSBjaGlsZDtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGlmICghdGhpcy5fbUN1cnJlbnRUb3VjaFRhcmdldCkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgaWYgKCEodGhpcy5fbUN1cnJlbnRUb3VjaFRhcmdldCBpbnN0YW5jZW9mIFZpZXdHcm91cCkpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLl9tQ3VycmVudFRvdWNoVGFyZ2V0Lm9uSW50ZXJjZXB0TW91c2VFdmVudChldmVudCk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbUN1cnJlbnRUb3VjaFRhcmdldC5vbk1vdXNlRXZlbnQoZXZlbnQpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzSW50ZXJjZXB0ID0gcmVzdWx0O1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RJbnRlcmNlcHRFdmVudC5wdXNoKGV2ZW50LmNsb25lKCkpOy8v6K6w5b2VZG93buaXtuWAmeeahGV2ZW50XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgIC8vICAgICAgICAgICAgIGNhc2UgTW90aW9uRXZlbnQuQUNUSU9OX01PVVNFX01PVkU6XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbUN1cnJlbnRUb3VjaFRhcmdldCkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc0ludGVyY2VwdCkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9tQ3VycmVudFRvdWNoVGFyZ2V0Lm9uTW91c2VFdmVudChldmVudCk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGlmICghKHRoaXMuX21DdXJyZW50VG91Y2hUYXJnZXQgaW5zdGFuY2VvZiBWaWV3R3JvdXApKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5fbUN1cnJlbnRUb3VjaFRhcmdldC5vbkludGVyY2VwdE1vdXNlRXZlbnQoZXZlbnQpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzSW50ZXJjZXB0ID0gcmVzdWx0O1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RJbnRlcmNlcHRFdmVudC5mb3JFYWNoKGUgPT4ge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbUN1cnJlbnRUb3VjaFRhcmdldC5vbk1vdXNlRXZlbnQoZSk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RJbnRlcmNlcHRFdmVudC5sZW5ndGggPSAwO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9tQ3VycmVudFRvdWNoVGFyZ2V0Lm9uTW91c2VFdmVudChldmVudCk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdEludGVyY2VwdEV2ZW50LmZvckVhY2goZSA9PiB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbUN1cnJlbnRUb3VjaFRhcmdldCBpbnN0YW5jZW9mIFZpZXdHcm91cCkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21DdXJyZW50VG91Y2hUYXJnZXQuZGlzcGF0Y2hNb3VzZUV2ZW50KGUpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0SW50ZXJjZXB0RXZlbnQubGVuZ3RoID0gMDtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX21DdXJyZW50VG91Y2hUYXJnZXQgaW5zdGFuY2VvZiBWaWV3R3JvdXApIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tQ3VycmVudFRvdWNoVGFyZ2V0LmRpc3BhdGNoTW91c2VFdmVudChldmVudCk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9XG5cblxuXG4gICAgICAgIC8vICAgICAgICAgICAgIGNhc2UgTW90aW9uRXZlbnQuQUNUSU9OX01PVVNFX09VVDpcbiAgICAgICAgLy8gICAgICAgICAgICAgY2FzZSBNb3Rpb25FdmVudC5BQ1RJT05fTU9VU0VfVVA6XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbUN1cnJlbnRUb3VjaFRhcmdldCkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdEludGVyY2VwdEV2ZW50LmZvckVhY2goZSA9PiB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc0ludGVyY2VwdCkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbUN1cnJlbnRUb3VjaFRhcmdldC5vbk1vdXNlRXZlbnQoZSk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9tQ3VycmVudFRvdWNoVGFyZ2V0LmRpc3BhdGNoTW91c2VFdmVudChlKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc0ludGVyY2VwdCkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9tQ3VycmVudFRvdWNoVGFyZ2V0Lm9uTW91c2VFdmVudChldmVudCk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5fbUN1cnJlbnRUb3VjaFRhcmdldC5kaXNwYXRjaE1vdXNlRXZlbnQoZXZlbnQpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbUN1cnJlbnRUb3VjaFRhcmdldCA9IG51bGw7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0SW50ZXJjZXB0RXZlbnQubGVuZ3RoID0gMDtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc0ludGVyY2VwdCA9IGZhbHNlO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAvLyB9XG4gICAgfVxufSIsIlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3ZpZXcvaW1wbGVtZW50aW9uL1ZpZXdHcm91cC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZ3JhcGhpY3MvVXRpbC50c1wiIC8+XG5cbm5hbWVzcGFjZSBhbmRyb2lkLndpZGdldCB7XG4gICAgaW1wb3J0IFBhZGRpbmcgPSBhbmRyb2lkLmdyYXBoaWNzLlBhZGRpbmc7XG4gICAgaW1wb3J0IEFsaWduID0gYW5kcm9pZC5ncmFwaGljcy5BbGlnbjtcbiAgICBpbXBvcnQgR3Jhdml0eSA9IGFuZHJvaWQuZ3JhcGhpY3MuR3Jhdml0eTtcblxuXG4gICAgaW1wb3J0IEFsaWduRWxlbWVudCA9IGFuZHJvaWQuZ3JhcGhpY3MuQWxpZ25FbGVtZW50O1xuICAgIGltcG9ydCBNYXJnaW4gPSBhbmRyb2lkLmdyYXBoaWNzLk1hcmdpbjtcblxuICAgIGltcG9ydCBTaXplID0gYW5kcm9pZC5ncmFwaGljcy5TaXplO1xuICAgIGltcG9ydCBDYW52YXMgPSBhbmRyb2lkLmdyYXBoaWNzLkNhbnZhcztcbiAgICBpbXBvcnQgVmlld0dyb3VwID0gYW5kcm9pZC52aWV3LlZpZXdHcm91cDtcbiAgICBpbXBvcnQgVmlldyA9IGFuZHJvaWQudmlldy5WaWV3O1xuXG4gICAgaW1wb3J0IFBvaW50ID0gYW5kcm9pZC5ncmFwaGljcy5Qb2ludDtcbiAgICBpbXBvcnQgTWVhc3VyZVNwZWMgPSBhbmRyb2lkLnZpZXcuTWVhc3VyZVNwZWM7XG4gICAgZXhwb3J0IGNsYXNzIEZyYW1lTGF5b3V0IGV4dGVuZHMgVmlld0dyb3VwIHtcblxuICAgICAgICBvbk1lYXN1cmUod2lkdGg6IE1lYXN1cmVTcGVjLCBoZWlnaHQ6IE1lYXN1cmVTcGVjLCBjYW52YXM6IENhbnZhcykge1xuICAgICAgICAgICAgcmV0dXJuIHN1cGVyLm9uTWVhc3VyZSh3aWR0aCwgaGVpZ2h0LCBjYW52YXMpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBvbkxheW91dChsOiBudW1iZXIsIHQ6IG51bWJlciwgcjogbnVtYmVyLCBiOiBudW1iZXIsIGNhbnZhczogQ2FudmFzKTogdm9pZCB7XG4gICAgICAgICAgICAvLyB0aGlzLmxheW91dEluZm8ucmVzZXQobCwgdCwgciwgYiwgdGhpcy5wYWRkaW5nLCAwKTtcbiAgICAgICAgICAgIHN1cGVyLm9uTGF5b3V0KGwsdCxyLGIsY2FudmFzKTtcbiAgICAgICAgICAgIGxldCB2aWV3SXRlbTogVmlldztcblxuXG4gICAgICAgICAgICBsZXQgbGVuZ3RoOiBudW1iZXIgPSB0aGlzLmNoaWxkcmVuLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICB2aWV3SXRlbSA9IHRoaXMuY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgdGhpcy5sYXlvdXRJdGVtKHZpZXdJdGVtLGwsdCxyLGIsY2FudmFzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICAgXG4gICAgICAgIHB1YmxpYyBsYXlvdXRJdGVtKHZpZXdJdGVtOlZpZXcsbDogbnVtYmVyLCB0OiBudW1iZXIsIHI6IG51bWJlciwgYjogbnVtYmVyLCBjYW52YXM6IENhbnZhcyk6IHZvaWQge1xuXG4gICAgICAgICAgICBsZXQgcG9pbnQ6IFBvaW50ID0gbmV3IFBvaW50KHRoaXMubGF5b3V0SW5mby5pbm5lcnJlY3QubGVmdCwgdGhpcy5sYXlvdXRJbmZvLmlubmVycmVjdC50b3ApO1xuICAgICAgICAgICAgbGV0IGlubmVycmVjdCA9IHRoaXMubGF5b3V0SW5mby5pbm5lcnJlY3Q7XG4gICAgICAgICAgICBsZXQgbGVuZ3RoOiBudW1iZXIgPSB0aGlzLmNoaWxkcmVuLmxlbmd0aDtcbiAgICAgICAgICAgIGxldCBtOiBNYXJnaW4gPSB2aWV3SXRlbS5sYXlvdXRQYXJhbXMubWFyZ2luO1xuICAgICAgICAgICAgc3dpdGNoICh2aWV3SXRlbS5ncmF2aXR5KSB7XG4gICAgICAgICAgICAgICAgY2FzZSBHcmF2aXR5LkxlZnQ6XG4gICAgICAgICAgICAgICAgICAgIHBvaW50LnNldChpbm5lcnJlY3QubGVmdCxpbm5lcnJlY3QudG9wKTtcbiAgICAgICAgICAgICAgICAgICAgcG9pbnQub2Zmc2V0KG0ubWFyZ2luTGVmdCxtLm1hcmdpblRvcCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgR3Jhdml0eS5BdXRvOlxuICAgICAgICAgICAgICAgICAgICBwb2ludC5zZXQoaW5uZXJyZWN0LmxlZnQsaW5uZXJyZWN0LnRvcCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgR3Jhdml0eS5SaWdodDpcbiAgICAgICAgICAgICAgICAgICAgcG9pbnQuc2V0KGlubmVycmVjdC5yaWdodCAtIHZpZXdJdGVtLndpZHRoLCBpbm5lcnJlY3QudG9wKTtcbiAgICAgICAgICAgICAgICAgICAgcG9pbnQub2Zmc2V0KC1tLm1hcmdpblJpZ2h0LG0ubWFyZ2luVG9wKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBHcmF2aXR5LlRvcDpcbiAgICAgICAgICAgICAgICAgICAgcG9pbnQuc2V0KGlubmVycmVjdC5sZWZ0LGlubmVycmVjdC50b3ApO1xuICAgICAgICAgICAgICAgICAgICBwb2ludC5vZmZzZXQobS5tYXJnaW5MZWZ0LG0ubWFyZ2luVG9wKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBHcmF2aXR5LkJvdHRvbTpcbiAgICAgICAgICAgICAgICAgICAgcG9pbnQuc2V0KGlubmVycmVjdC5sZWZ0LCBpbm5lcnJlY3QuYm90dG9tIC0gdmlld0l0ZW0uaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgcG9pbnQub2Zmc2V0KG0ubWFyZ2luTGVmdCwtbS5tYXJnaW5Cb3R0b20pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEdyYXZpdHkuQ2VudGVyOlxuICAgICAgICAgICAgICAgICAgICBsZXQgdG1wbCA9IGlubmVycmVjdC5sZWZ0Kyh0aGlzLmxheW91dEluZm8uaW5uZXJyZWN0LndpZHRoLXZpZXdJdGVtLndpZHRoKS8yO1xuICAgICAgICAgICAgICAgICAgICBsZXQgdG1wdCA9IGlubmVycmVjdC50b3AgICsgKHRoaXMubGF5b3V0SW5mby5pbm5lcnJlY3QuaGVpZ2h0LXZpZXdJdGVtLmhlaWdodCkvMjtcbiAgICAgICAgICAgICAgICAgICAgaWYodG1wbCA8IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgdG1wbCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYodG1wdCA8IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgdG1wdCA9MDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBwb2ludC5zZXQodG1wbCx0bXB0KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIHBvaW50Lm9mZnNldChtLmdldFN0YXJ0WE1hcmdpbigpLCBtLmdldFN0YXJ0WU1hcmdpbigpKTtcbiAgICAgICAgICAgICAgICAvLyBwb2ludC5vZmZzZXQobS5tYXJnaW5MZWZ0LG0ubWFyZ2luUmlnaHQpXG4gICAgICAgICAgICAgICAgdmlld0l0ZW0ub25MYXlvdXQocG9pbnQueCwgcG9pbnQueSwgcG9pbnQueCArIHZpZXdJdGVtLndpZHRoLCBwb2ludC55ICsgdmlld0l0ZW0uaGVpZ2h0LGNhbnZhcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiQ29udGV4dC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vd2lkZ2V0L0ZyYW1lTGF5b3V0LnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi91dGlsL0xvZy50c1wiIC8+XG5cblxubmFtZXNwYWNlIGFuZHJvaWQuYXBwe1xuXG4gICAgaW1wb3J0IFZpZXcgPSBhbmRyb2lkLnZpZXcuVmlldztcbiAgICBpbXBvcnQgUGFkZGluZyA9IGFuZHJvaWQuZ3JhcGhpY3MuUGFkZGluZztcbiAgICBpbXBvcnQgR3Jhdml0eSA9IGFuZHJvaWQuZ3JhcGhpY3MuR3Jhdml0eTtcbiAgICBpbXBvcnQgUmVjdCA9IGFuZHJvaWQuZ3JhcGhpY3MuUmVjdDtcbiAgICBpbXBvcnQgQWxpZ25FbGVtZW50ID0gYW5kcm9pZC5ncmFwaGljcy5BbGlnbkVsZW1lbnQ7XG4gICAgaW1wb3J0IE1hcmdpbiA9IGFuZHJvaWQuZ3JhcGhpY3MuTWFyZ2luO1xuICAgIGltcG9ydCBTaXplID0gYW5kcm9pZC5ncmFwaGljcy5TaXplO1xuICAgIGltcG9ydCBDYW52YXMgPSBhbmRyb2lkLmdyYXBoaWNzLkNhbnZhcztcbiAgICBpbXBvcnQgVmlld0dyb3VwID0gYW5kcm9pZC52aWV3LlZpZXdHcm91cDtcbiAgICBpbXBvcnQgUG9pbnQgPSBhbmRyb2lkLmdyYXBoaWNzLlBvaW50O1xuICAgIGltcG9ydCBNZWFzdXJlU3BlYyA9IGFuZHJvaWQudmlldy5NZWFzdXJlU3BlYztcbiAgICBpbXBvcnQgT3JpZW50YXRpb24gPSBhbmRyb2lkLmdyYXBoaWNzLk9yaWVudGF0aW9uO1xuICAgIGltcG9ydCBMYXlvdXRQYXJhbXMgPSBhbmRyb2lkLnZpZXcuTGF5b3V0UGFyYW1zO1xuICAgIGltcG9ydCBSZW5kZXJUeXBlID0gYW5kcm9pZC5ncmFwaGljcy5SZW5kZXJUeXBlO1xuICAgIGltcG9ydCBSb290VmlldyA9IGFuZHJvaWQud2lkZ2V0LlJvb3RWaWV3O1xuICAgIGltcG9ydCBMaW5lYXJMYXlvdXQgPSBhbmRyb2lkLndpZGdldC5MaW5lYXJMYXlvdXQ7XG4gICAgaW1wb3J0IEZyYW1lTGF5b3V0ID0gYW5kcm9pZC53aWRnZXQuRnJhbWVMYXlvdXQ7XG4gICAgaW1wb3J0IExvZyA9IGFuZHJvaWQudXRpbC5Mb2c7XG5cbiAgICBleHBvcnQgY2xhc3MgQWN0aXZpdHkgZXh0ZW5kcyBDb250ZXh0e1xuICAgICAgICBwcml2YXRlIHJvb3RWaWV3IDpGcmFtZUxheW91dCA7XG4gICAgICAgIHByaXZhdGUgYWN0aXZpdHlNYW5hZ2VyIDpBY3Rpdml0eU1hbmFnZXI7XG4gICAgICAgIGNvbnN0cnVjdG9yKGFtOkFjdGl2aXR5TWFuYWdlcil7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgaWYoYW0gaW5zdGFuY2VvZiBBY3Rpdml0eU1hbmFnZXIpe1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZpdHlNYW5hZ2VyID0gYW07XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aHJvdyBcImNhbid0IGNyZWF0ZSBBY3Rpdml0eSBuZXcgXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJvb3RWaWV3ID0gbmV3IEZyYW1lTGF5b3V0KHRoaXMpO1xuICAgICAgICAgICAgbGV0IGxwIDogTGF5b3V0UGFyYW1zID0gbmV3IExheW91dFBhcmFtcyhMYXlvdXRQYXJhbXMuTUFUQ0hfUEFSRU5ULExheW91dFBhcmFtcy5NQVRDSF9QQVJFTlQsbnVsbCk7XG4gICAgICAgICAgICB0aGlzLnJvb3RWaWV3LmxheW91dFBhcmFtcyA9IGxwO1xuICAgICAgICAgICAgLy8gdGhpcy5yb290Vmlldy5iYWNrZ3JvdW5kID0gJ2xpZ2h0Ymx1ZSc7XG4gICAgICAgIH1cbiAgICAgICAgcHJpdmF0ZSBhdHRhdGNoUm9vdFZpZXcodmlldzpSb290Vmlldyl7XG4gICAgICAgICAgICB2aWV3LmFkZFZpZXcodGhpcy5yb290VmlldywwKTtcbiAgICAgICAgfVxuICAgICAgICBwcm90ZWN0ZWQgb25DcmVhdGUoYnVuZGxlOkJ1bmRsZSl7XG4gICAgICAgICAgICBMb2cuZChcIm9uY3JlYXRlXCIpO1xuICAgICAgICB9XG4gICAgICAgIHByb3RlY3RlZCBvblBhdXNlKCl7XG4gICAgICAgICAgICBMb2cuZChcIm9uUGF1c2VcIik7XG4gICAgICAgIH1cbiAgICAgICAgcHJvdGVjdGVkIG9uUmVzdW1lKCl7XG4gICAgICAgICAgICBMb2cuZCgnb25SZXN1bWUnKTtcbiAgICAgICAgfVxuICAgICAgICBwcm90ZWN0ZWQgb25EZXN0b3J5KCl7XG4gICAgICAgICAgICBMb2cuZCgnb25EZXN0b3J5Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcHJvdGVjdGVkIHNldENvbnRlbnRWaWV3KHZpZXc6Vmlldyl7XG4gICAgICAgICAgICB0aGlzLnJvb3RWaWV3LmFkZFZpZXcodmlldywwKTtcbiAgICAgICAgfVxuICAgICAgICBwcm90ZWN0ZWQgc3RhcnRBY3Rpdml0eUZvclJlc3VsdChpbnRlbnQ6SW50ZW50LGJ1bmRsZTpCdW5kbGUscmVxdWVzdENvZGU6bnVtYmVyLHJlc3VsdENvZGU6bnVtYmVyKXtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZpdHlNYW5hZ2VyLnNlbmRTdGFydEFjdGl2aXR5KGludGVudCxidW5kbGUscmVxdWVzdENvZGUscmVzdWx0Q29kZSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxufSIsIm5hbWVzcGFjZSBhbmRyb2lkLmdyYXBoaWNzIHtcbiAgICBleHBvcnQgZW51bSBBbGlnbiB7XG4gICAgICAgIExFRlQgPSAwLFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHRleHQgaXMgZHJhd24gY2VudGVyZWQgaG9yaXpvbnRhbGx5IG9uIHRoZSB4LHkgb3JpZ2luXG4gICAgICAgICAqL1xuICAgICAgICBDRU5URVIgPSAxLFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHRleHQgaXMgZHJhd24gdG8gdGhlIGxlZnQgb2YgdGhlIHgseSBvcmlnaW5cbiAgICAgICAgICovXG4gICAgICAgIFJJR0hUID0gMlxuXG4gICAgfVxufSIsIm5hbWVzcGFjZSBhbmRyb2lkLmdyYXBoaWNzIHtcblxuICAgICAgZXhwb3J0IGNsYXNzIEFsaWduRWxlbWVudHtcbiAgICAgICAgcG9zaXRpb246UG9zaXRpb247XG4gICAgICAgIGVsZW1lbnQ6RWxlbWVudDtcbiAgICAgICAgY29uc3RydWN0b3IocG9zaXRpb246UG9zaXRpb24sZWxlbWVudDpFbGVtZW50KXtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24gPXBvc2l0aW9uO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgfVxuICAgIH1cblxufSIsIlxubmFtZXNwYWNlIGFuZHJvaWQudmlldy5hbmltYXRpb24ge1xuICAgIGltcG9ydCBDYW52YXMgPSBhbmRyb2lkLmdyYXBoaWNzLkNhbnZhcztcbiAgICBleHBvcnQgY2xhc3MgQWxwaGFBbmltYXRpb24gZXh0ZW5kcyBBbmltYXRpb24ge1xuICAgICAgICBwcml2YXRlIGFscGhhIDpudW1iZXIgPW51bGw7XG4gICAgICAgIHByaXZhdGUgb2xkQWxwaGE6bnVtYmVyID0gbnVsbDtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZWFzZSA9IG5ldyBhbmRyb2lkLnZpZXcuYW5pbWF0aW9uLkFuaW1hdGlvbkVhc2UoKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgYXBwbHlUcmFuc2Zvcm1hdGlvbihpbnRlcnBvbGF0ZWRUaW1lOiBudW1iZXIsIGNhbnZhczogQ2FudmFzLCB2aWV3OiBWaWV3KSB7XG5cbiAgICAgICAgICAgIGxldCBzY2FsZTogbnVtYmVyID0gdGhpcy5mcm9tICsgKHRoaXMudG8gLSB0aGlzLmZyb20pICogaW50ZXJwb2xhdGVkVGltZTtcbiAgICAgICAgICAgIHZpZXcuYWxwaGEgPSB0aGlzLmFscGhhICogc2NhbGUgO1xuICAgICAgICB9XG4gICAgICAgIG9uU3RhcnRBbmlhbXRpb24oY2FudmFzOiBDYW52YXMsIHZpZXc6IFZpZXcpOiB2b2lkIHtcbiAgICAgICAgICAgIHN1cGVyLm9uU3RhcnRBbmlhbXRpb24oY2FudmFzLCB2aWV3KTtcbiAgICAgICAgICAgIHRoaXMuYWxwaGEgPSB0aGlzLm9sZEFscGhhID0gdmlldy5hbHBoYTtcbiAgICAgICAgfVxuICAgICAgICBvbkVuZEFuaW1hdGlvbihjYW52YXM6IENhbnZhcywgdmlldzogVmlldyk6IHZvaWQge1xuICAgICAgICAgICAgc3VwZXIub25FbmRBbmltYXRpb24oY2FudmFzLCB2aWV3KTtcbiAgICAgICAgICAgIHZpZXcuYWxwaGEgPSB0aGlzLmFscGhhID0gdGhpcy5vbGRBbHBoYTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9BbHBoYUFuaW1hdGlvbi50c1wiIC8+XG5cblxubmFtZXNwYWNlIGFuZHJvaWQge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICBpbXBvcnQgQW5pbWF0aW9uID0gYW5kcm9pZC52aWV3LmFuaW1hdGlvbi5BbmltYXRpb247XG4gICAgaW1wb3J0IEFuaW1hdGlvbkVhc2UgPSBhbmRyb2lkLnZpZXcuYW5pbWF0aW9uLkFuaW1hdGlvbkVhc2U7XG4gICAgaW1wb3J0IEFscGhhQW5pbWF0aW9uID0gYW5kcm9pZC52aWV3LmFuaW1hdGlvbi5BbHBoYUFuaW1hdGlvbjtcbiAgICBpbXBvcnQgVmlld1N0YXRlID0gYW5kcm9pZC52aWV3LlZpZXdTdGF0ZTtcbiAgICBpbXBvcnQgUmVjdCA9IGFuZHJvaWQuZ3JhcGhpY3MuUmVjdDtcbiAgICBpbXBvcnQgQ2FudmFzID0gYW5kcm9pZC5ncmFwaGljcy5DYW52YXM7XG4gICAgaW1wb3J0IExheW91dEluZm8gPSBhbmRyb2lkLnZpZXcuTGF5b3V0SW5mbztcbiAgICBleHBvcnQgY2xhc3MgQ29tcGFyZWRBbmltYXRpb25DYWNoZSB7XG4gICAgICAgIHByaXZhdGUgX19wcmVwYXJlOmJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgZ2V0UHJlcGFyaW5nKCk6Ym9vbGVhbntcbiAgICAgICAgICAgIGxldCBwID0gdGhpcy5fX3ByZXBhcmU7XG4gICAgICAgICAgICB0aGlzLl9fcHJlcGFyZSA9IGZhbHNlO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJnZXRQcmVwYXJpbmcgICBcIiArIHApO1xuICAgICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgIH1cbiAgICAgICAgcHJlcGFyaW5nKCk6dm9pZHtcbiAgICAgICAgICAgIHRoaXMuX19wcmVwYXJlID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwcmVwYXJpbmcgJyArIHRoaXMuX19wcmVwYXJlKTtcbiAgICAgICAgfVxuICAgICAgICBwcml2YXRlIF9jYWNoZTogYW55ID0ge307XG4gICAgICAgIHB1YmxpYyBnZXQgaXNlbXB0eSgpOiBib29sZWFuIHtcbiAgICAgICAgICAgIGxldCBpbmRleDogbnVtYmVyID0gMDtcbiAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLl9jYWNoZSkge1xuICAgICAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gMCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyByZXNldENhY2hlKHZpZXdzOiBDb21wYXJlZFZpZXdbXSkge1xuICAgICAgICAgICAgdGhpcy5fY2FjaGUgPSB7fTtcbiAgICAgICAgICAgIGZvciAobGV0IHZpZXcgb2Ygdmlld3MpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZVt2aWV3LmlkXSA9IHZpZXc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIGNsZWFyKCl7XG4gICAgICAgICAgICB0aGlzLl9jYWNoZT17fTtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgc3RhcnRDb21wYXJlKHZpZXdzOiBDb21wYXJlZFZpZXdbXSk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRDYWNoZTogYW55ID0ge307XG4gICAgICAgICAgICBmb3IgKGxldCB2aWV3IG9mIHZpZXdzKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudENhY2hlW3ZpZXcuaWRdID0gdmlldztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy5pc2VtcHR5KSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIGN1cnJlbnRDYWNoZSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZnJvbXZpZXcgPSB0aGlzLl9jYWNoZVtrZXldO1xuICAgICAgICAgICAgICAgICAgICBsZXQgdG92aWV3ID0gY3VycmVudENhY2hlW2tleV07XG4gICAgICAgICAgICAgICAgICAgIGlmICh0b3ZpZXcgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3N0YXJ0QW5pbWF0aW9uKGZyb212aWV3LCB0b3ZpZXcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlID0gY3VycmVudENhY2hlO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZSA9IGN1cnJlbnRDYWNoZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcHJpdmF0ZSBfX3N0YXJ0QW5pbWF0aW9uKGZyb212aWV3OiBDb21wYXJlZFZpZXcsIHRvdmlldzogQ29tcGFyZWRWaWV3KTogdm9pZCB7XG4gICAgICAgICAgICBpZihmcm9tdmlldyA9PSBudWxsKXtcbiAgICAgICAgICAgICAgICBsZXQgYW5pbWF0aW9uIDpBbHBoYUFuaW1hdGlvbiA9IG5ldyBBbHBoYUFuaW1hdGlvbigpO1xuICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5kdXJhdGlvbiA9IDYwMDtcbiAgICAgICAgICAgICAgICBhbmltYXRpb24uZnJvbSA9IDA7XG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uLnRvID0gMTtcbiAgICAgICAgICAgICAgICB0b3ZpZXcuc3RhcnRBbmltYXRpb24oYW5pbWF0aW9uKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInN0YXJ0IEFscGhhIGFuaW1hdGlvbiAgID09PT09PSAgXCIpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdG92aWV3LnN0YXJ0QW5pbWF0aW9uKHRvdmlldy5nZXRDb21wYXJlZEFuaW1hdGlvbihmcm9tdmlldykpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9fc3dpdGNoTGF5b3V0KHZpZXcxOiBDb21wYXJlZFZpZXcsIHZpZXcyOiBDb21wYXJlZFZpZXcpIHtcbiAgICAgICAgICAgIGxldCBsYXlvdXRJbmZvOiBMYXlvdXRJbmZvID0gdmlldzEubGF5b3V0SW5mby5jbG9uZSgpO1xuICAgICAgICAgICAgLy8gdmlldzIubGF5b3V0SW5mby5yZXNldChsYXlvdXRJbmZvLm91dHRlcnJlY3QubGVmdCxsYXlvdXRJbmZvLm91dHRlcnJlY3QudG9wLGxheW91dEluZm8ub3V0dGVycmVjdC5yaWdodCxsYXlvdXRJbmZvLm91dHRlcnJlY3QuYm90dG9tLGxheW91dEluZm8ucGFkZGluZyxsYXlvdXRJbmZvLmRyYXdpbmRleCk7XG4gICAgICAgICAgICB2aWV3MS5sYXlvdXRJbmZvLmlubmVycmVjdCA9IHZpZXcyLmxheW91dEluZm8uaW5uZXJyZWN0LmNsb25lKCk7XG4gICAgICAgICAgICB2aWV3Mi5sYXlvdXRJbmZvLmlubmVycmVjdCA9IGxheW91dEluZm8uaW5uZXJyZWN0O1xuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIFxufSIsIm5hbWVzcGFjZSBhbmRyb2lkIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgaW1wb3J0IFZpZXcgPSBhbmRyb2lkLnZpZXcuVmlldztcbiAgICBpbXBvcnQgQW5pbWF0aW9uID0gYW5kcm9pZC52aWV3LmFuaW1hdGlvbi5BbmltYXRpb247XG4gICAgaW1wb3J0IENhbnZhcyA9IGFuZHJvaWQuZ3JhcGhpY3MuQ2FudmFzO1xuICAgIGltcG9ydCBBbmltYXRpb25FYXNlID0gYW5kcm9pZC52aWV3LmFuaW1hdGlvbi5BbmltYXRpb25FYXNlO1xuICAgIGltcG9ydCBVdGlsID0gYW5kcm9pZC5ncmFwaGljcy5VdGlsO1xuICAgIGV4cG9ydCBjbGFzcyBDb21wYXJlZFZpZXcgZXh0ZW5kcyBWaWV3IHtcblxuICAgICAgICBwdWJsaWMgYW5pbWF0aW9uWHM6IG51bWJlcltdID0gW107XG4gICAgICAgIHB1YmxpYyBhbmltYXRpb25ZczogbnVtYmVyW10gPSBbXTtcblxuICAgICAgICBnZXQgY29tcGFyZWRBbmltYXRpb25FbXB0eSgpOiBib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFuaW1hdGlvblhzID09IG51bGwgfHwgdGhpcy5hbmltYXRpb25ZcyA9PSBudWxsIHx8IHRoaXMuYW5pbWF0aW9uWHMubGVuZ3RoIDw9IDAgfHwgdGhpcy5hbmltYXRpb25Zcy5sZW5ndGggPD0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCBwdGNvdW50KCk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gMTAwO1xuICAgICAgICB9XG4gICAgICAgIGdldENvbXBhcmVkQW5pbWF0aW9uKGZyb212aWV3OiBDb21wYXJlZFZpZXcpOiBBbmltYXRpb24ge1xuICAgICAgICAgICAgbGV0IHRvcHRzID0gdGhpcy5nZXRwdHModGhpcy5wdGNvdW50KTtcbiAgICAgICAgICAgIGxldCBmcm9tcHRzID0gZnJvbXZpZXcuZ2V0cHRzKGZyb212aWV3LnB0Y291bnQpO1xuICAgICAgICAgICAgbGV0IHNhbWU6IGJvb2xlYW4gPSB0b3B0cy54cy5ldmVyeSgodjogbnVtYmVyLCBpbmRleDogbnVtYmVyLCBhcnI6IG51bWJlcltdKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHYgPT09IGZyb21wdHMueHNbaW5kZXhdO1xuICAgICAgICAgICAgfSkgJiZcbiAgICAgICAgICAgICAgICB0b3B0cy55cy5ldmVyeSgodjogbnVtYmVyLCBpbmRleDogbnVtYmVyLCBhcnI6IG51bWJlcltdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2ID09PSBmcm9tcHRzLnlzW2luZGV4XTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChzYW1lKSB7IHJldHVybjsgfVxuXG4gICAgICAgICAgICBpZiAodG9wdHMgPT0gbnVsbCB8fCBmcm9tcHRzID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBhbmltYXRpb24gPSBuZXcgQ29tbW9uQ29tcGFyZWRBbmltYXRpb24oZnJvbXB0cy54cywgZnJvbXB0cy55cywgdG9wdHMueHMsIHRvcHRzLnlzKTtcbiAgICAgICAgICAgIGFuaW1hdGlvbi5kdXJhdGlvbiA9IDYwMDtcbiAgICAgICAgICAgIGFuaW1hdGlvbi5lYXNlID0gbmV3IEFuaW1hdGlvbkVhc2UoKTtcbiAgICAgICAgICAgIGFuaW1hdGlvbi5mcm9tID0gMDtcbiAgICAgICAgICAgIGFuaW1hdGlvbi50byA9IDE7XG4gICAgICAgICAgICByZXR1cm4gYW5pbWF0aW9uO1xuICAgICAgICB9XG4gICAgICAgIG9uTGF5b3V0KGw6IG51bWJlciwgdDogbnVtYmVyLCByOiBudW1iZXIsIGI6IG51bWJlciwgY2FudmFzOiBDYW52YXMpOiB2b2lkIHtcbiAgICAgICAgICAgIHN1cGVyLm9uTGF5b3V0KGwsIHQsIHIsIGIsIGNhbnZhcyk7XG4gICAgICAgICAgICB0aGlzLl9wdHMgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGdldHB0cyhzaXplOiBudW1iZXIpOiB7IHhzOiBudW1iZXJbXSwgeXM6IG51bWJlcltdIH0ge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3B0cyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcHRzID0gVXRpbC5jcmVhdGVQdHNGcm9tUmVjdCh0aGlzLmxheW91dEluZm8uaW5uZXJyZWN0LmNsb25lKCksIHRoaXMucHRjb3VudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcHRzO1xuICAgICAgICB9XG4gICAgICAgIHByb3RlY3RlZCBfcHRzOiB7IHhzOiBudW1iZXJbXSwgeXM6IG51bWJlcltdIH0gPSBudWxsO1xuICAgIH1cblxuICAgIGNsYXNzIENvbW1vbkNvbXBhcmVkQW5pbWF0aW9uIGV4dGVuZHMgQW5pbWF0aW9uIHtcbiAgICAgICAgcHJpdmF0ZSBmcm9tWHM6IG51bWJlcltdO1xuICAgICAgICBwcml2YXRlIGZyb21ZczogbnVtYmVyW107XG4gICAgICAgIHByaXZhdGUgdG9YczogbnVtYmVyW107XG4gICAgICAgIHByaXZhdGUgdG9ZczogbnVtYmVyW107XG5cbiAgICAgICAgY29uc3RydWN0b3IoZnJvbXhzOiBudW1iZXJbXSwgZnJvbXlzOiBudW1iZXJbXSwgdG94czogbnVtYmVyW10sIHRveXM6IG51bWJlcltdKSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgdGhpcy5lYXNlID0gbmV3IEFuaW1hdGlvbkVhc2UoKTtcbiAgICAgICAgICAgIHRoaXMuZnJvbVhzID0gW10uY29uY2F0KGZyb214cyk7XG4gICAgICAgICAgICB0aGlzLmZyb21ZcyA9IFtdLmNvbmNhdChmcm9teXMpO1xuICAgICAgICAgICAgdGhpcy50b1hzID0gW10uY29uY2F0KHRveHMpO1xuICAgICAgICAgICAgdGhpcy50b1lzID0gW10uY29uY2F0KHRveXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgb25TdGFydEFuaWFtdGlvbihjYW52YXM6IENhbnZhcywgdmlldzogVmlldykge1xuICAgICAgICAgICAgc3VwZXIub25TdGFydEFuaWFtdGlvbihjYW52YXMsIHZpZXcpO1xuICAgICAgICB9XG4gICAgICAgIG9uRW5kQW5pbWF0aW9uKGNhbnZhczogQ2FudmFzLCB2aWV3OiBWaWV3KSB7XG4gICAgICAgICAgICBzdXBlci5vbkVuZEFuaW1hdGlvbihjYW52YXMsIHZpZXcpO1xuICAgICAgICAgICAgaWYgKHZpZXcgaW5zdGFuY2VvZiBDb21wYXJlZFZpZXcpIHtcbiAgICAgICAgICAgICAgICB2aWV3LmFuaW1hdGlvblhzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgdmlldy5hbmltYXRpb25Zcy5sZW5ndGggPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGFwcGx5VHJhbnNmb3JtYXRpb24oaW50ZXJwb2xhdGVkVGltZTogbnVtYmVyLCBjYW52YXM6IENhbnZhcywgdmlldzogVmlldykge1xuICAgICAgICAgICAgaWYgKHZpZXcgaW5zdGFuY2VvZiBDb21wYXJlZFZpZXcpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnYXBwbHlUcmFuc2Zvcm1hdGlvbiAnICsgdmlldy5pZCk7XG4gICAgICAgICAgICAgICAgbGV0IHNjYWxlOiBudW1iZXIgPSB0aGlzLmZyb20gKyAodGhpcy50byAtIHRoaXMuZnJvbSkgKiBpbnRlcnBvbGF0ZWRUaW1lO1xuICAgICAgICAgICAgICAgIGxldCBtYXhMZW46IG51bWJlciA9IE1hdGgubWF4KHRoaXMudG9Ycy5sZW5ndGgsIHRoaXMudG9Zcy5sZW5ndGgsIHRoaXMuZnJvbVhzLmxlbmd0aCwgdGhpcy5mcm9tWXMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBsZXQgbWluTGVuOiBudW1iZXIgPSBNYXRoLm1pbih0aGlzLnRvWHMubGVuZ3RoLCB0aGlzLnRvWXMubGVuZ3RoLCB0aGlzLmZyb21Ycy5sZW5ndGgsIHRoaXMuZnJvbVlzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgbGV0IHRvU3RlcDogbnVtYmVyID0gTWF0aC5taW4odGhpcy50b1hzLmxlbmd0aCwgdGhpcy50b1lzLmxlbmd0aCkgLyBtaW5MZW47XG4gICAgICAgICAgICAgICAgbGV0IGZyb21TdGVwOiBudW1iZXIgPSBNYXRoLm1pbih0aGlzLmZyb21Ycy5sZW5ndGgsIHRoaXMuZnJvbVlzLmxlbmd0aCkgLyBtaW5MZW47XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtaW5MZW47ICsraSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdG9pbmRleDogbnVtYmVyID0gaTsvL01hdGguZmxvb3IoaSAqIHRvU3RlcCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmcm9taW5kZXg6IG51bWJlciA9IGk7Ly9NYXRoLmZsb29yKGkgKiBmcm9tU3RlcCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkeDogbnVtYmVyID0gKHRoaXMudG9Yc1t0b2luZGV4XSAtIHRoaXMuZnJvbVhzW2Zyb21pbmRleF0pICogc2NhbGU7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkeTogbnVtYmVyID0gKHRoaXMudG9Zc1t0b2luZGV4XSAtIHRoaXMuZnJvbVlzW2Zyb21pbmRleF0pICogc2NhbGU7XG4gICAgICAgICAgICAgICAgICAgIHZpZXcuYW5pbWF0aW9uWHNbdG9pbmRleF0gPSBkeCArIHRoaXMuZnJvbVhzW2Zyb21pbmRleF07XG4gICAgICAgICAgICAgICAgICAgIHZpZXcuYW5pbWF0aW9uWXNbdG9pbmRleF0gPSBkeSArIHRoaXMuZnJvbVlzW2Zyb21pbmRleF07XG4gICAgICAgICAgICAgICAgICAgIC8vIGZvcihsZXQgaiA9IHRvaW5kZXgrMTsgaiA8IE1hdGguZmxvb3IoKGkrMSkgKiB0b1N0ZXApOyArK2ope1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdmlldy5hbmltYXRpb25Yc1tqXT12aWV3LmFuaW1hdGlvblhzW3RvaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdmlldy5hbmltYXRpb25Yc1tqXT12aWV3LmFuaW1hdGlvbllzW3RvaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL0FQSS50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdmlldy9pbXBsZW1lbnRpb24vVmlld0dyb3VwLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL0ZyYW1lTGF5b3V0LnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9ncmFwaGljcy9BbGlnbi50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZ3JhcGhpY3MvQWxpZ25FbGVtZW50LnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9ncmFwaGljcy9DYW52YXMudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3ZpZXcvYW5pbWF0aW9uL0NvbXBhcmVkQW5pbWF0aW9uQ2FjaGUudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3ZpZXcvYW5pbWF0aW9uL0NvbXBhcmVkVmlldy50c1wiIC8+XG5cblxuXG5uYW1lc3BhY2UgYW5kcm9pZC53aWRnZXQge1xuICAgIGltcG9ydCBQYWRkaW5nID0gYW5kcm9pZC5ncmFwaGljcy5QYWRkaW5nO1xuICAgIGltcG9ydCBBbGlnbiA9IGFuZHJvaWQuZ3JhcGhpY3MuQWxpZ247XG4gICAgaW1wb3J0IEdyYXZpdHkgPSBhbmRyb2lkLmdyYXBoaWNzLkdyYXZpdHk7XG5cblxuICAgIGltcG9ydCBBbGlnbkVsZW1lbnQgPSBhbmRyb2lkLmdyYXBoaWNzLkFsaWduRWxlbWVudDtcbiAgICBpbXBvcnQgTWFyZ2luID0gYW5kcm9pZC5ncmFwaGljcy5NYXJnaW47XG5cbiAgICBpbXBvcnQgU2l6ZSA9IGFuZHJvaWQuZ3JhcGhpY3MuU2l6ZTtcbiAgICBpbXBvcnQgQ2FudmFzID0gYW5kcm9pZC5ncmFwaGljcy5DYW52YXM7XG4gICAgaW1wb3J0IFZpZXdHcm91cCA9IGFuZHJvaWQudmlldy5WaWV3R3JvdXA7XG4gICAgaW1wb3J0IFZpZXcgPSBhbmRyb2lkLnZpZXcuVmlldztcblxuICAgIGltcG9ydCBQb2ludCA9IGFuZHJvaWQuZ3JhcGhpY3MuUG9pbnQ7XG4gICAgaW1wb3J0IE1lYXN1cmVTcGVjID0gYW5kcm9pZC52aWV3Lk1lYXN1cmVTcGVjO1xuICAgIGltcG9ydCBMYXlvdXRQYXJhbXMgPSBhbmRyb2lkLnZpZXcuTGF5b3V0UGFyYW1zO1xuICAgIGltcG9ydCBNb3Rpb25FdmVudCA9IGFuZHJvaWQudmlldy5ldmVudC5Nb3Rpb25FdmVudDtcbiAgICBpbXBvcnQgQW5pbWF0aW9uID0gYW5kcm9pZC52aWV3LmFuaW1hdGlvbi5BbmltYXRpb247XG4gICAgaW1wb3J0IERldmljZSA9IGFuZHJvaWQuZGV2aWNlLkRldmljZTtcbiAgICBpbXBvcnQgUmVuZGVyVHlwZSA9IGFuZHJvaWQuZ3JhcGhpY3MuUmVuZGVyVHlwZTtcbiAgICBleHBvcnQgY2xhc3MgUm9vdFZpZXcgZXh0ZW5kcyBGcmFtZUxheW91dCB7XG4gICAgICAgIHByaXZhdGUgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgICAgIHByaXZhdGUgdGhyb3R0bGU6IGJvb2xlYW4gPSB0cnVlO1xuICAgICAgICBwcml2YXRlIF93OiBudW1iZXI7XG4gICAgICAgIHByaXZhdGUgX2g6IG51bWJlcjtcbiAgICAgICAgcHJpdmF0ZSBfbDogbnVtYmVyO1xuICAgICAgICBwcml2YXRlIF90OiBudW1iZXI7XG4gICAgICAgIHByaXZhdGUgX3Jvb3RBbmlhbXRpb246IEFuaW1hdGlvbjtcblxuICAgICAgICBzZXRJbmZvKGxlZnQ6IG51bWJlciwgdG9wOiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9sID0gbGVmdDtcbiAgICAgICAgICAgIHRoaXMuX3QgPSB0b3A7XG4gICAgICAgICAgICB0aGlzLl93ID0gd2lkdGg7XG4gICAgICAgICAgICB0aGlzLl9oID0gaGVpZ2h0O1xuICAgICAgICAgICAgdGhpcy5sYXlvdXRQYXJhbXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgICAgIHRoaXMubGF5b3V0UGFyYW1zLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgICAgIHRoaXMucGFkZGluZyA9IG5ldyBQYWRkaW5nKDApO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGRpc3BhdGNoRHJhdyhjYW52YXM6IENhbnZhcyk6IHZvaWQge1xuXG4gICAgICAgICAgICBzdXBlci5kaXNwYXRjaERyYXcoY2FudmFzKTtcbiAgICAgICAgICAgIHZhciByZWN0ID0gdGhpcy5sYXlvdXRJbmZvLm91dHRlcnJlY3Q7XG4gICAgICAgICAgICBjYW52YXMuZHJhd1JlY3QocmVjdC5zdGFydFBvaW50LCByZWN0LmVuZFBvaW50LCBmYWxzZSwgdGhpcy5iYWNrZ3JvdW5kKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9uTGF5b3V0KGw6IG51bWJlciwgdDogbnVtYmVyLCByOiBudW1iZXIsIGI6IG51bWJlciwgY2FudmFzOiBDYW52YXMpOiB2b2lkIHtcbiAgICAgICAgICAgIHN1cGVyLm9uTGF5b3V0KGwsIHQsIHIsIGIsIGNhbnZhcyk7XG4gICAgICAgIH1cblxuICAgICAgICBvbmludmFsaWRhdGUoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5nZXRDb250ZXh0KCkgIT0gbnVsbCAmJiB0aGlzLmdldENvbnRleHQoKS5nZXRDb21wYXJlZEFuaW1hdGlvbkNhY2hlKCkgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGxldCBjb21wYXJlZENhY2hlOiBDb21wYXJlZEFuaW1hdGlvbkNhY2hlID0gdGhpcy5nZXRDb250ZXh0KCkuZ2V0Q29tcGFyZWRBbmltYXRpb25DYWNoZSgpO1xuICAgICAgICAgICAgICAgIGlmIChjb21wYXJlZENhY2hlLmdldFByZXBhcmluZygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdXBlci5vbmludmFsaWRhdGUoKTtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5iZWdpbigpO1xuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaERyYXcodGhpcy5fY2FudmFzKTtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5lbmQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHByaXZhdGUgX19yZWxheW91dGhhbmRsZXI6IG51bWJlcjtcbiAgICAgICAgcHVibGljIHJlcXVlc3RMYXlvdXQoKSB7XG4gICAgICAgICAgICAvLyBpZih0aGlzLl9fcmVsYXlvdXRoYW5kbGVyICE9IG51bGwpe1xuICAgICAgICAgICAgLy8gICAgIGNsZWFyVGltZW91dCh0aGlzLl9fcmVsYXlvdXRoYW5kbGVyKTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIC8vIHRoaXMuX19yZWxheW91dGhhbmRsZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdmaW5uYWwgaGFuZGxlcj09PT09ICcgKyB0aGlzLl9fcmVsYXlvdXRoYW5kbGVyKTtcbiAgICAgICAgICAgIC8vICAgICB0aGlzLl9fcmVsYXlvdXRoYW5kbGVyID0gbnVsbDtcbiAgICAgICAgICAgIC8vICAgICAgdGhpcy5fX3JlbGF5b3V0KCk7ICAgXG4gICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoYW5kbGVyICcgKyB0aGlzLl9fcmVsYXlvdXRoYW5kbGVyKTtcbiAgICAgICAgICAgIHRoaXMuX19yZWxheW91dCgpO1xuICAgICAgICAgICAgdGhpcy5vbmludmFsaWRhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBwZXJwYXJlQ29tcGFyZWRBbmltYXRpb24oKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5nZXRDb250ZXh0KCkgIT0gbnVsbCAmJiB0aGlzLmdldENvbnRleHQoKS5nZXRDb21wYXJlZEFuaW1hdGlvbkNhY2hlKCkgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGxldCBjb21wYXJlZENhY2hlOiBDb21wYXJlZEFuaW1hdGlvbkNhY2hlID0gdGhpcy5nZXRDb250ZXh0KCkuZ2V0Q29tcGFyZWRBbmltYXRpb25DYWNoZSgpO1xuICAgICAgICAgICAgICAgIGNvbXBhcmVkQ2FjaGUuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICBsZXQgbGlzdDogQ29tcGFyZWRWaWV3W10gPSBbXTtcbiAgICAgICAgICAgICAgICB0aGlzLl9fdHJhY2VWaWV3KHRoaXMsIGxpc3QpO1xuICAgICAgICAgICAgICAgIGNvbXBhcmVkQ2FjaGUucmVzZXRDYWNoZShsaXN0KTtcbiAgICAgICAgICAgICAgICBjb21wYXJlZENhY2hlLnByZXBhcmluZygpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc3RhcnRDb21wYXJlKCk6IHZvaWQge1xuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0Q29udGV4dCgpICE9IG51bGwgJiYgdGhpcy5nZXRDb250ZXh0KCkuZ2V0Q29tcGFyZWRBbmltYXRpb25DYWNoZSgpICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBsZXQgY29tcGFyZWRDYWNoZTogQ29tcGFyZWRBbmltYXRpb25DYWNoZSA9IHRoaXMuZ2V0Q29udGV4dCgpLmdldENvbXBhcmVkQW5pbWF0aW9uQ2FjaGUoKTtcbiAgICAgICAgICAgICAgICBpZiAoIWNvbXBhcmVkQ2FjaGUuaXNlbXB0eSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3bGlzdDogQ29tcGFyZWRWaWV3W10gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3RyYWNlVmlldyh0aGlzLCBuZXdsaXN0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ld2xpc3QgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGFyZWRDYWNoZS5zdGFydENvbXBhcmUobmV3bGlzdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9fdHJhY2VWaWV3KHZpZXdncm91cDogVmlld0dyb3VwLCBsaXN0OiBDb21wYXJlZFZpZXdbXSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2aWV3Z3JvdXAuZ2V0Q2hpbGRDb3VudCgpOyArK2kpIHtcbiAgICAgICAgICAgICAgICBsZXQgY2hpbGQ6IFZpZXcgPSB2aWV3Z3JvdXAuZ2V0Q2hpbGRBdChpKTtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBDb21wYXJlZFZpZXcgJiYgY2hpbGQuaWQgIT0gbnVsbCAmJiBjaGlsZC5sYXlvdXRJbmZvICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdC5wdXNoKGNoaWxkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgVmlld0dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX190cmFjZVZpZXcoY2hpbGQsIGxpc3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX19yZWxheW91dCgpIHtcbiAgICAgICAgICAgIHZhciB3aWR0aDogTWVhc3VyZVNwZWMgPSBuZXcgTWVhc3VyZVNwZWModGhpcy5fdywgTGF5b3V0UGFyYW1zLk1BVENIX1BBUkVOVCk7XG4gICAgICAgICAgICB2YXIgaGVpZ2h0OiBNZWFzdXJlU3BlYyA9IG5ldyBNZWFzdXJlU3BlYyh0aGlzLl9oLCBMYXlvdXRQYXJhbXMuTUFUQ0hfUEFSRU5UKTtcbiAgICAgICAgICAgIHZhciBzaXplOiBTaXplID0gdGhpcy5vbk1lYXN1cmUod2lkdGgsIGhlaWdodCwgdGhpcy5fY2FudmFzKTtcbiAgICAgICAgICAgIHRoaXMub25MYXlvdXQodGhpcy5fbCwgdGhpcy5fdCwgdGhpcy5fbCArIHNpemUud2lkdGgsIHRoaXMuX3QgKyBzaXplLmhlaWdodCwgdGhpcy5fY2FudmFzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCBsZWZ0KCk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbDtcbiAgICAgICAgfVxuICAgICAgICBnZXQgdG9wKCk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdDtcbiAgICAgICAgfVxuICAgICAgICBnZXQgd2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl93O1xuICAgICAgICB9XG4gICAgICAgIGdldCBoZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9oO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHN0YXJ0QW5pbWF0aW9uKGFuaW1hdGlvbjogQW5pbWF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IGFuaW1hdGlvbjtcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0QW5pbWF0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIGludGVycnVwdEFuaW1hdGlvbigpe1xuICAgICAgICAgICAgdGhpcy5fcm9vdEFuaWFtdGlvbiA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9zdGFydEFuaW1hdGlvbigpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnN0YXJ0ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9yb290QW5pYW10aW9uICE9IG51bGwgJiYgIXRoaXMuX3Jvb3RBbmlhbXRpb24uaXNBbmlhbXRpb25FbmQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fcm9vdEFuaWFtdGlvbi5kdXJhdGlvbiArIHRoaXMuX3Jvb3RBbmlhbXRpb24uc3RhcnQgPCB0aGlzLmFuaW1hdGlvbi5kdXJhdGlvbiArIHRoaXMuYW5pbWF0aW9uLnN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvb3RBbmlhbXRpb24uZHVyYXRpb24gPSB0aGlzLmFuaW1hdGlvbi5zdGFydCArIHRoaXMuYW5pbWF0aW9uLmR1cmF0aW9uIC0gdGhpcy5fcm9vdEFuaWFtdGlvbi5zdGFydDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jvb3RBbmlhbXRpb24gPSB0aGlzLmFuaW1hdGlvbjtcbiAgICAgICAgICAgICAgICBhbmRyb2lkLnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLl9hbmltYXRlLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfYW5pbWF0ZSgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9yb290QW5pYW10aW9uICE9IG51bGwgJiYgIXRoaXMuX3Jvb3RBbmlhbXRpb24uaXNBbmlhbXRpb25FbmQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmludmFsaWRhdGUoZmFsc2UpO1xuICAgICAgICAgICAgICAgIGFuZHJvaWQucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuX2FuaW1hdGUuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jvb3RBbmlhbXRpb24gPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuaW52YWxpZGF0ZShmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgYWRkVmlldyh2aWV3OiBWaWV3LCBpbmRleDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHN1cGVyLmFkZFZpZXcodmlldywgaW5kZXgpO1xuICAgICAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGF0dGFjaFJlbmRlcihyOiBDYW52YXMpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcyA9IHI7XG4gICAgICAgIH1cblxuICAgICAgICBhdHRhY2hFbGVtZW50KGVsZW1lbnQ6IEhUTUxFbGVtZW50LCByZW5kZXJUeXBlOiBSZW5kZXJUeXBlKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICAgICAgLy8gdGhpcy5lbGVtZW50Lm9uYXJpYXJlcXVlc3QgPSB0aGlzLm9udG91Y2guYmluZCh0aGlzKTtcbiAgICAgICAgICAgIC8vIHRoaXMuZWxlbWVudC5vbmNvbW1hbmQgPSB0aGlzLm9udG91Y2guYmluZCh0aGlzKTtcbiAgICAgICAgICAgIC8vIHRoaXMuZWxlbWVudC5vbmdvdHBvaW50ZXJjYXB0dXJlID0gdGhpcy5vbnRvdWNoLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAvLyB0aGlzLmVsZW1lbnQub25sb3N0cG9pbnRlcmNhcHR1cmUgPSB0aGlzLm9udG91Y2guYmluZCh0aGlzKTtcbiAgICAgICAgICAgIC8vIHRoaXMuZWxlbWVudC5vbm1zZ2VzdHVyZWNoYW5nZSA9IHRoaXMub250b3VjaC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgLy8gdGhpcy5lbGVtZW50Lm9ubXNnZXN0dXJlZG91YmxldGFwID0gdGhpcy5vbnRvdWNoLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAvLyB0aGlzLmVsZW1lbnQub25tc2dlc3R1cmVlbmQgPSB0aGlzLm9udG91Y2guYmluZCh0aGlzKTtcbiAgICAgICAgICAgIC8vIHRoaXMuZWxlbWVudC5vbm1zZ2VzdHVyZWhvbGQgPSB0aGlzLm9udG91Y2guYmluZCh0aGlzKTtcbiAgICAgICAgICAgIC8vIHRoaXMuZWxlbWVudC5vbm1zZ2VzdHVyZXN0YXJ0ID0gdGhpcy5vbnRvdWNoLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAvLyB0aGlzLmVsZW1lbnQub25tc2dlc3R1cmV0YXAgPSB0aGlzLm9udG91Y2guYmluZCh0aGlzKTtcbiAgICAgICAgICAgIC8vIHRoaXMuZWxlbWVudC5vbm1zZ290cG9pbnRlcmNhcHR1cmUgPSB0aGlzLm9udG91Y2guYmluZCh0aGlzKTtcbiAgICAgICAgICAgIC8vIHRoaXMuZWxlbWVudC5vbm1zaW5lcnRpYXN0YXJ0ID0gdGhpcy5vbnRvdWNoLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAvLyB0aGlzLmVsZW1lbnQub25tc2xvc3Rwb2ludGVyY2FwdHVyZSA9IHRoaXMub250b3VjaC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgLy8gdGhpcy5lbGVtZW50Lm9ubXNwb2ludGVyY2FuY2VsID0gdGhpcy5vbnRvdWNoLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAvLyB0aGlzLmVsZW1lbnQub25tc3BvaW50ZXJkb3duID0gdGhpcy5vbnRvdWNoLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAvLyB0aGlzLmVsZW1lbnQub25tc3BvaW50ZXJlbnRlciA9IHRoaXMub250b3VjaC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgLy8gdGhpcy5lbGVtZW50Lm9ubXNwb2ludGVybGVhdmUgPSB0aGlzLm9udG91Y2guYmluZCh0aGlzKTtcbiAgICAgICAgICAgIC8vIHRoaXMuZWxlbWVudC5vbm1zcG9pbnRlcm1vdmUgPSB0aGlzLm9udG91Y2guYmluZCh0aGlzKTtcbiAgICAgICAgICAgIC8vIHRoaXMuZWxlbWVudC5vbm1zcG9pbnRlcm91dCA9IHRoaXMub250b3VjaC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgLy8gdGhpcy5lbGVtZW50Lm9ubXNwb2ludGVyb3ZlciA9IHRoaXMub250b3VjaC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgLy8gdGhpcy5lbGVtZW50Lm9ubXNwb2ludGVydXAgPSB0aGlzLm9udG91Y2guYmluZCh0aGlzKTtcbiAgICAgICAgICAgIC8vIHRoaXMuZWxlbWVudC5vbndhaXRpbmcgPSB0aGlzLm9udG91Y2guYmluZCh0aGlzKTtcbiAgICAgICAgICAgIC8vIHRoaXMuZWxlbWVudC5vbnZvbHVtZWNoYW5nZSA9IHRoaXMub250b3VjaC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgLy8gdGhpcy5lbGVtZW50Lm9udGltZXVwZGF0ZSA9IHRoaXMub250b3VjaC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgLy8gdGhpcy5lbGVtZW50Lm9uc3VzcGVuZCA9IHRoaXMub250b3VjaC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgLy8gdGhpcy5lbGVtZW50Lm9uc3VibWl0ID0gdGhpcy5vbnRvdWNoLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAvLyB0aGlzLmVsZW1lbnQub25zdGFsbGVkID0gdGhpcy5vbnRvdWNoLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAvLyB0aGlzLmVsZW1lbnQub25zZWxlY3RzdGFydCA9IHRoaXMub250b3VjaC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgLy8gdGhpcy5lbGVtZW50Lm9uc2VsZWN0ID0gdGhpcy5vbnRvdWNoLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAvLyB0aGlzLmVsZW1lbnQub25zZWVraW5nID0gdGhpcy5vbnRvdWNoLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAvLyB0aGlzLmVsZW1lbnQub25zZWVrZWQgPSB0aGlzLm9udG91Y2guYmluZCh0aGlzKTtcbiAgICAgICAgICAgIC8vIHRoaXMuZWxlbWVudC5vbnNjcm9sbCA9IHRoaXMub250b3VjaC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgLy8gdGhpcy5lbGVtZW50Lm9ucmVzZXQgPSB0aGlzLm9udG91Y2guYmluZCh0aGlzKTtcbiAgICAgICAgICAgIC8vIHRoaXMuZWxlbWVudC5vbnJhdGVjaGFuZ2UgPSB0aGlzLm9udG91Y2guYmluZCh0aGlzKTtcbiAgICAgICAgICAgIC8vIHRoaXMuZWxlbWVudC5vbnByb2dyZXNzID0gdGhpcy5vbnRvdWNoLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAvLyB0aGlzLmVsZW1lbnQub25wbGF5aW5nID0gdGhpcy5vbnRvdWNoLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAvLyB0aGlzLmVsZW1lbnQub25wbGF5ID0gdGhpcy5vbnRvdWNoLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAvLyB0aGlzLmVsZW1lbnQub25wYXVzZSA9IHRoaXMub250b3VjaC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgLy8gdGhpcy5lbGVtZW50Lm9ucGFzdGUgPSB0aGlzLm9udG91Y2guYmluZCh0aGlzKTtcbiAgICAgICAgICAgIC8vIHRoaXMuZWxlbWVudC5vbm1zbWFuaXB1bGF0aW9uc3RhdGVjaGFuZ2VkID0gdGhpcy5vbnRvdWNoLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAvLyB0aGlzLmVsZW1lbnQub25tc2NvbnRlbnR6b29tID0gdGhpcy5vbnRvdWNoLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQub250b3VjaHN0YXJ0ID0gdGhpcy5vbnRvdWNoLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQub250b3VjaG1vdmUgPSB0aGlzLm9udG91Y2guYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5vbnRvdWNoZW5kID0gdGhpcy5vbnRvdWNoLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQub250b3VjaGNhbmNlbCA9IHRoaXMub250b3VjaC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm9ubW91c2Vkb3duID0gdGhpcy5vbnRvdWNoLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQub25tb3VzZW1vdmUgPSB0aGlzLm9udG91Y2guYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5vbm1vdXNldXAgPSB0aGlzLm9udG91Y2guYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5vbm1vdXNlb3V0ID0gdGhpcy5vbnRvdWNoLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQub25tb3VzZW92ZXIgPSB0aGlzLm9udG91Y2guYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5vbm1vdXNld2hlZWwgPSB0aGlzLm9udG91Y2guYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5vbmNsaWNrID0gdGhpcy5vbnRvdWNoLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQub25zY3JvbGwgPSB0aGlzLm9udG91Y2guYmluZCh0aGlzKTtcblxuICAgICAgICAgICAgdGhpcy5sYXlvdXRQYXJhbXMud2lkdGggPSBlbGVtZW50LmNsaWVudFdpZHRoO1xuICAgICAgICAgICAgdGhpcy5sYXlvdXRQYXJhbXMuaGVpZ2h0ID0gZWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgICBEZXZpY2Uud2lkdGggPSBlbGVtZW50LmNsaWVudFdpZHRoO1xuICAgICAgICAgICAgRGV2aWNlLmhlaWdodCA9IGVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgdGhpcy5hdHRhY2hSZW5kZXIobmV3IENhbnZhcyhlbGVtZW50LCByZW5kZXJUeXBlKSk7XG4gICAgICAgICAgICB0aGlzLnNldEluZm8oMCwgMCwgZWxlbWVudC5jbGllbnRXaWR0aCwgZWxlbWVudC5jbGllbnRIZWlnaHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBvbnRvdWNoKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB2YXIgZXZlbnQgPSBldmVudCB8fCB3aW5kb3cuZXZlbnQ7XG4gICAgICAgICAgICB2YXIgc3RyID0gJyc7XG4gICAgICAgICAgICBsZXQgbWV2ZW50OiBNb3Rpb25FdmVudCA9IG5ldyBNb3Rpb25FdmVudCgwLCAwLCAwKTtcbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJ0b3VjaHN0YXJ0XCI6XG4gICAgICAgICAgICAgICAgICAgIG1ldmVudCA9IG5ldyBNb3Rpb25FdmVudChldmVudC50b3VjaGVzWzBdLmNsaWVudFgsIGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WSwgTW90aW9uRXZlbnQuQUNUSU9OX0RPV04pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwidG91Y2hlbmRcIjpcbiAgICAgICAgICAgICAgICAgICAgbWV2ZW50ID0gbmV3IE1vdGlvbkV2ZW50KGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFgsIGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFksIE1vdGlvbkV2ZW50LkFDVElPTl9VUCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJ0b3VjaGNhbmNlbFwiOlxuICAgICAgICAgICAgICAgICAgICBtZXZlbnQgPSBuZXcgTW90aW9uRXZlbnQoZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WCwgZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WSwgTW90aW9uRXZlbnQuQUNUSU9OX0NBTkNFTCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJ0b3VjaG1vdmVcIjpcbiAgICAgICAgICAgICAgICAgICAgbWV2ZW50ID0gbmV3IE1vdGlvbkV2ZW50KGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WCwgZXZlbnQudG91Y2hlc1swXS5jbGllbnRZLCBNb3Rpb25FdmVudC5BQ1RJT05fTU9WRSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21vdXNlZG93bic6XG4gICAgICAgICAgICAgICAgICAgIG1ldmVudCA9IG5ldyBNb3Rpb25FdmVudChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZLCBNb3Rpb25FdmVudC5BQ1RJT05fTU9VU0VfRE9XTik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21vdXNlbW92ZSc6XG4gICAgICAgICAgICAgICAgICAgIG1ldmVudCA9IG5ldyBNb3Rpb25FdmVudChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZLCBNb3Rpb25FdmVudC5BQ1RJT05fTU9VU0VfTU9WRSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21vdXNldXAnOlxuICAgICAgICAgICAgICAgICAgICBtZXZlbnQgPSBuZXcgTW90aW9uRXZlbnQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSwgTW90aW9uRXZlbnQuQUNUSU9OX01PVVNFX1VQKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbW91c2VvdXQnOlxuICAgICAgICAgICAgICAgICAgICBtZXZlbnQgPSBuZXcgTW90aW9uRXZlbnQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSwgTW90aW9uRXZlbnQuQUNUSU9OX01PVVNFX09VVCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21vdXNlb3Zlcic6XG4gICAgICAgICAgICAgICAgICAgIG1ldmVudCA9IG5ldyBNb3Rpb25FdmVudChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZLCBNb3Rpb25FdmVudC5BQ1RJT05fTU9VU0VfT1ZFUik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NsaWNrJzpcbiAgICAgICAgICAgICAgICAgICAgbWV2ZW50ID0gbmV3IE1vdGlvbkV2ZW50KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFksIE1vdGlvbkV2ZW50LkFDVElPTl9DTElDSyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3Njcm9sbCc6XG4gICAgICAgICAgICAgICAgICAgIG1ldmVudCA9IG5ldyBNb3Rpb25FdmVudChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZLCBNb3Rpb25FdmVudC5BQ1RJT05fU0NST0xMKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbW91c2V3aGVlbCc6XG4gICAgICAgICAgICAgICAgICAgIG1ldmVudCA9IG5ldyBNb3Rpb25FdmVudChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZLCBNb3Rpb25FdmVudC5BQ1RJT05fTU9VU0VfV0hFRUwpO1xuICAgICAgICAgICAgICAgICAgICBtZXZlbnQuZGVsdGFYID0gZXZlbnQuZGVsdGFYO1xuICAgICAgICAgICAgICAgICAgICBtZXZlbnQuZGVsdGFZID0gZXZlbnQuZGVsdGFZO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1ldmVudC5lbGVtZW50ID0gdGhpcy5lbGVtZW50O1xuICAgICAgICAgICAgdmFyIGVsZW1lbnRyZWN0ID0gdGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgbWV2ZW50LnggPSBtZXZlbnQueCAtIGVsZW1lbnRyZWN0LmxlZnQ7XG4gICAgICAgICAgICBtZXZlbnQueSA9IG1ldmVudC55IC0gZWxlbWVudHJlY3QudG9wO1xuICAgICAgICAgICAgdGhpcy5zZW5kRXZlbnQobWV2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzZW5kRXZlbnQoZXZlbnQ6IE1vdGlvbkV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuYWN0aW9uID49IE1vdGlvbkV2ZW50LkFDVElPTl9NT1VTRV9ET1dOKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaE1vdXNlRXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoVG91Y2hFdmVudChldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiQWN0aXZpdHkudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3dpZGdldC9Sb290Vmlldy50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZGV2aWNlL0RldmljZS50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdmlldy9ldmVudC9Nb3Rpb25FdmVudC50c1wiIC8+XG5cblxubmFtZXNwYWNlIGFuZHJvaWQuYXBwIHtcbiAgICBpbXBvcnQgUGFkZGluZyA9IGFuZHJvaWQuZ3JhcGhpY3MuUGFkZGluZztcbiAgICBpbXBvcnQgR3Jhdml0eSA9IGFuZHJvaWQuZ3JhcGhpY3MuR3Jhdml0eTtcbiAgICBpbXBvcnQgUmVjdCA9IGFuZHJvaWQuZ3JhcGhpY3MuUmVjdDtcbiAgICBpbXBvcnQgQWxpZ25FbGVtZW50ID0gYW5kcm9pZC5ncmFwaGljcy5BbGlnbkVsZW1lbnQ7XG4gICAgaW1wb3J0IE1hcmdpbiA9IGFuZHJvaWQuZ3JhcGhpY3MuTWFyZ2luO1xuICAgIGltcG9ydCBTaXplID0gYW5kcm9pZC5ncmFwaGljcy5TaXplO1xuICAgIGltcG9ydCBDYW52YXMgPSBhbmRyb2lkLmdyYXBoaWNzLkNhbnZhcztcbiAgICBpbXBvcnQgVmlld0dyb3VwID0gYW5kcm9pZC52aWV3LlZpZXdHcm91cDtcbiAgICBpbXBvcnQgVmlldyA9IGFuZHJvaWQudmlldy5WaWV3O1xuICAgIGltcG9ydCBQb2ludCA9IGFuZHJvaWQuZ3JhcGhpY3MuUG9pbnQ7XG4gICAgaW1wb3J0IE1lYXN1cmVTcGVjID0gYW5kcm9pZC52aWV3Lk1lYXN1cmVTcGVjO1xuICAgIGltcG9ydCBPcmllbnRhdGlvbiA9IGFuZHJvaWQuZ3JhcGhpY3MuT3JpZW50YXRpb247XG4gICAgaW1wb3J0IExheW91dFBhcmFtcyA9IGFuZHJvaWQudmlldy5MYXlvdXRQYXJhbXM7XG4gICAgaW1wb3J0IFJlbmRlclR5cGUgPSBhbmRyb2lkLmdyYXBoaWNzLlJlbmRlclR5cGU7XG4gICAgaW1wb3J0IFJvb3RWaWV3ID0gYW5kcm9pZC53aWRnZXQuUm9vdFZpZXc7XG4gICAgaW1wb3J0IExpbmVhckxheW91dCA9IGFuZHJvaWQud2lkZ2V0LkxpbmVhckxheW91dDtcbiAgICBpbXBvcnQgRnJhbWVMYXlvdXQgPSBhbmRyb2lkLndpZGdldC5GcmFtZUxheW91dDtcbiAgICBpbXBvcnQgRGV2aWNlID0gYW5kcm9pZC5kZXZpY2UuRGV2aWNlO1xuICAgIGltcG9ydCBNb3Rpb25FdmVudCA9IGFuZHJvaWQudmlldy5ldmVudC5Nb3Rpb25FdmVudDtcblxuICAgIGV4cG9ydCBjbGFzcyBBY3Rpdml0eU1hbmFnZXIge1xuICAgICAgICBwcml2YXRlIHN0YWNrOiBBY3Rpdml0eVtdID0gbmV3IEFycmF5KCk7XG4gICAgICAgIHByaXZhdGUgcm9vdFZpZXc6IFJvb3RWaWV3O1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHJlbmRlcnR5cGU6UmVuZGVyVHlwZSxlbGVtZW50OkhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLnJvb3RWaWV3ID0gbmV3IFJvb3RWaWV3KG51bGwpOy8vIG5lZWQgdG8gYmUgYXBwbGljYXRpb24gY29udGV4dFxuICAgICAgICAgICAgLy8gdGhpcy5yb290Vmlldy5hdHRhY2hSZW5kZXIoY2FudmFzKTtcbiAgICAgICAgICAgIHRoaXMucm9vdFZpZXcuYXR0YWNoRWxlbWVudChlbGVtZW50LHJlbmRlcnR5cGUpOyAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgIFxuICAgICAgICBwdWJsaWMgc2VuZFN0YXJ0QWN0aXZpdHkoaW50ZW50OiBJbnRlbnQsYnVuZGxlOiBCdW5kbGUsIHJlcXVlc3RDb2RlOiBudW1iZXIsIHJlc3VsdENvZGU6bnVtYmVyKSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0QWN0aXZpdHkgPSB0aGlzLmNyZWF0ZUFjdGl2aXR5KGludGVudC5nZXRDbGFzcygpKTtcbiAgICAgICAgICAgIHZhciBjdXJyZW50QWN0aXZpdHk6IEFjdGl2aXR5ID0gdGhpcy5zdGFja1t0aGlzLnN0YWNrLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRBY3Rpdml0eSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRBY3Rpdml0eVsnb25QYXVzZSddLmNhbGwoY3VycmVudEFjdGl2aXR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucm9vdFZpZXcucmVtb3ZlQWxsVmlld3MoKTtcbiAgICAgICAgICAgIHRoaXMuc3RhY2sucHVzaCh0YXJnZXRBY3Rpdml0eSk7XG4gICAgICAgICAgICB0YXJnZXRBY3Rpdml0eVsnYXR0YXRjaFJvb3RWaWV3J10uY2FsbCh0YXJnZXRBY3Rpdml0eSwgdGhpcy5yb290Vmlldyk7XG4gICAgICAgICAgICB0YXJnZXRBY3Rpdml0eVsnb25SZXN1bWUnXS5jYWxsKHRhcmdldEFjdGl2aXR5KTtcbiAgICAgICAgICAgIC8vIFRPIERPIC4uLiAgbGFuY2ggbW9kZVxuICAgICAgICAgICAgdGFyZ2V0QWN0aXZpdHlbJ29uQ3JlYXRlJ10uY2FsbCh0YXJnZXRBY3Rpdml0eSxidW5kbGUpO1xuICAgICAgICAgICAgLy8gdGhpcy5yb290Vmlldy5iYWNrZ3JvdW5kID0nd2hpdGUnO1xuICAgICAgICAgICAgdGhpcy5yb290Vmlldy5pbnZhbGlkYXRlKHRydWUpO1xuXG4gICAgICAgIH1cbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpdml0eShhY3Rpdml0eUNsYXNzOiBhbnkpOiBBY3Rpdml0eSB7XG4gICAgICAgICAgICB2YXIgYWN0aXZpdHk6IEFjdGl2aXR5ID0gbmV3IGFjdGl2aXR5Q2xhc3ModGhpcyk7XG4gICAgICAgICAgICByZXR1cm4gYWN0aXZpdHk7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIGdldEN1cnJlbnRBY3Rpdml0eSgpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhY2tbdGhpcy5zdGFjay5sZW5ndGgtMV07XG4gICAgICAgIH1cbiAgICB9XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vYXBwL0ludGVudC50c1wiIC8+XG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJncmFwaGljcy9DYW52YXMudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vYXBwL0FjdGl2aXR5TWFuYWdlci50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi91dGlsL0xvZy50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi92aWV3L2V2ZW50L01vdGlvbkV2ZW50LnRzXCIgLz5cblxuXG5uYW1lc3BhY2UgYW5kcm9pZCB7XG4gICAgaW1wb3J0IEFjdGl2aXR5TWFuYWdlciA9IGFuZHJvaWQuYXBwLkFjdGl2aXR5TWFuYWdlcjtcbiAgICBpbXBvcnQgQ2FudmFzID0gYW5kcm9pZC5ncmFwaGljcy5DYW52YXM7XG4gICAgaW1wb3J0IFJlbmRlclR5cGUgPSBhbmRyb2lkLmdyYXBoaWNzLlJlbmRlclR5cGU7XG4gICAgaW1wb3J0IEludGVudCA9IGFuZHJvaWQuYXBwLkludGVudDtcbiAgICBpbXBvcnQgTG9nID0gYW5kcm9pZC51dGlsLkxvZztcbiAgICBpbXBvcnQgRGV2aWNlID0gYW5kcm9pZC5kZXZpY2UuRGV2aWNlO1xuICAgIGltcG9ydCBNb3Rpb25FdmVudCA9IGFuZHJvaWQudmlldy5ldmVudC5Nb3Rpb25FdmVudDtcbiAgICBpbXBvcnQgQnVuZGxlID0gYW5kcm9pZC5hcHAuQnVuZGxlO1xuICAgIGltcG9ydCBBY3Rpdml0eSA9IGFuZHJvaWQuYXBwLkFjdGl2aXR5O1xuICAgIGV4cG9ydCBjbGFzcyBTdGFydFVwIHtcbiAgICAgICAgcHJpdmF0ZSBhY3Rpdml0eU1hbmFnZXI6IEFjdGl2aXR5TWFuYWdlcjtcbiAgICAgICAgcHJpdmF0ZSBjYW52YXM6IENhbnZhcztcbiAgICAgICAgcHJpdmF0ZSBjb25maWc6IGFueTtcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRDb25maWcoKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICBpZiAodGhpcy5nZXRGaWxsKCkgPT09ICdwYXJlbnQnKSB7XG4gICAgICAgICAgICAgICAgRGV2aWNlLndpZHRoID0gdGhpcy5lbGVtZW50LmNsaWVudFdpZHRoO1xuICAgICAgICAgICAgICAgIERldmljZS5oZWlnaHQgPSB0aGlzLmVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHR5cGU6UmVuZGVyVHlwZSA9IFJlbmRlclR5cGUuQ2FudmFzO1xuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0UmVuZGVyVHlwZSgpID09ICdjYW52YXMnKSB7XG4gICAgICAgICAgICAgICAgdHlwZSA9IFJlbmRlclR5cGUuQ2FudmFzO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0eXBlID0gUmVuZGVyVHlwZS5Tdmc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmFjdGl2aXR5TWFuYWdlciA9IG5ldyBBY3Rpdml0eU1hbmFnZXIodHlwZSx0aGlzLmVsZW1lbnQpO1xuICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBwcml2YXRlIG9udG91Y2goZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIHZhciBldmVudCA9IGV2ZW50IHx8IHdpbmRvdy5ldmVudDtcbiAgICAgICAgICAgIHZhciBzdHIgPSAnJztcbiAgICAgICAgICAgIGxldCBtZXZlbnQ6IE1vdGlvbkV2ZW50ID0gbmV3IE1vdGlvbkV2ZW50KDAsIDAsIDApO1xuICAgICAgICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcInRvdWNoc3RhcnRcIjpcbiAgICAgICAgICAgICAgICAgICAgLy8gc3RyPSBcIlRvdWNoIHN0YXJ0ZWQgKFwiICsgZXZlbnQudG91Y2hlc1swXS5jbGllbnRYICsgXCIsXCIgKyBldmVudC50b3VjaGVzWzBdLmNsaWVudFkgKyBcIilcIjtcbiAgICAgICAgICAgICAgICAgICAgbWV2ZW50ID0gbmV3IE1vdGlvbkV2ZW50KGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WCwgZXZlbnQudG91Y2hlc1swXS5jbGllbnRZLCBNb3Rpb25FdmVudC5BQ1RJT05fRE9XTik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJ0b3VjaGVuZFwiOlxuICAgICAgICAgICAgICAgICAgICBtZXZlbnQgPSBuZXcgTW90aW9uRXZlbnQoZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WCwgZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WSwgTW90aW9uRXZlbnQuQUNUSU9OX1VQKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInRvdWNoY2FuY2VsXCI6XG4gICAgICAgICAgICAgICAgICAgIG1ldmVudCA9IG5ldyBNb3Rpb25FdmVudChldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYLCBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZLCBNb3Rpb25FdmVudC5BQ1RJT05fQ0FOQ0VMKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInRvdWNobW92ZVwiOlxuICAgICAgICAgICAgICAgICAgICBtZXZlbnQgPSBuZXcgTW90aW9uRXZlbnQoZXZlbnQudG91Y2hlc1swXS5jbGllbnRYLCBldmVudC50b3VjaGVzWzBdLmNsaWVudFksIE1vdGlvbkV2ZW50LkFDVElPTl9NT1ZFKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbW91c2Vkb3duJzpcbiAgICAgICAgICAgICAgICAgICAgbWV2ZW50ID0gbmV3IE1vdGlvbkV2ZW50KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFksIE1vdGlvbkV2ZW50LkFDVElPTl9NT1VTRV9ET1dOKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbW91c2Vtb3ZlJzpcbiAgICAgICAgICAgICAgICAgICAgbWV2ZW50ID0gbmV3IE1vdGlvbkV2ZW50KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFksIE1vdGlvbkV2ZW50LkFDVElPTl9NT1VTRV9NT1ZFKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbW91c2V1cCc6XG4gICAgICAgICAgICAgICAgICAgIG1ldmVudCA9IG5ldyBNb3Rpb25FdmVudChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZLCBNb3Rpb25FdmVudC5BQ1RJT05fTU9VU0VfVVApO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdtb3VzZW91dCc6XG4gICAgICAgICAgICAgICAgICAgIG1ldmVudCA9IG5ldyBNb3Rpb25FdmVudChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZLCBNb3Rpb25FdmVudC5BQ1RJT05fTU9VU0VfT1VUKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbW91c2VvdmVyJzpcbiAgICAgICAgICAgICAgICAgICAgbWV2ZW50ID0gbmV3IE1vdGlvbkV2ZW50KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFksIE1vdGlvbkV2ZW50LkFDVElPTl9NT1VTRV9PVkVSKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnY2xpY2snOlxuICAgICAgICAgICAgICAgICAgICBtZXZlbnQgPSBuZXcgTW90aW9uRXZlbnQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSxNb3Rpb25FdmVudC5BQ1RJT05fQ0xJQ0spO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWV2ZW50LmVsZW1lbnQgPSB0aGlzLmVsZW1lbnQ7XG4gICAgICAgICAgICB2YXIgZWxlbWVudHJlY3QgPSB0aGlzLmVsZW1lbnQuZ2V0Q2xpZW50UmVjdHMoKTtcbiAgICAgICAgICAgIG1ldmVudC54ID0gbWV2ZW50LnggLSBlbGVtZW50cmVjdFswXS5sZWZ0O1xuICAgICAgICAgICAgbWV2ZW50LnkgPSBtZXZlbnQueSAtIGVsZW1lbnRyZWN0WzBdLnRvcDtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgc3RhcnQoKSB7XG4gICAgICAgICAgICB2YXIgaW50ZW50OiBJbnRlbnQgPSBuZXcgSW50ZW50KCk7XG4gICAgICAgICAgICBpbnRlbnQuc2V0Q2xhc3MobnVsbCwgdGhpcy5nZXRMYXVuY2hBY3Rpdml0eSgpKTtcbiAgICAgICAgICAgIHZhciBidW5kbGUgPSBuZXcgYW5kcm9pZC5hcHAuQnVuZGxlKCk7XG4gICAgICAgICAgICBidW5kbGUucHV0RGVmYXVsdCh0aGlzLmdldExhdW5jaFBhcmFtcygpKTtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZpdHlNYW5hZ2VyLnNlbmRTdGFydEFjdGl2aXR5KGludGVudCwgYnVuZGxlLCAwLCAwKTtcbiAgICAgICAgfVxuICAgICAgICBwcml2YXRlIGdldExhdW5jaEFjdGl2aXR5KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmxhdW5jaEFjdGl2aXR5LnRhcmdldDtcbiAgICAgICAgfVxuICAgICAgICBwcml2YXRlIGdldExhdW5jaFBhcmFtcygpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5sYXVuY2hBY3Rpdml0eS5wYXJhbXM7XG4gICAgICAgIH1cbiAgICAgICAgcHJpdmF0ZSBnZXRSb290RWxlbWVudCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5yb290Y29udGFpbmVyLnRhcmdldDtcbiAgICAgICAgfVxuICAgICAgICBwcml2YXRlIGdldFJlbmRlclR5cGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb25maWcucmVuZGVydHlwZSA/IHRoaXMuY29uZmlnLnJlbmRlcnR5cGUudGFyZ2V0IDogJ3N2Zyc7XG4gICAgICAgIH1cbiAgICAgICAgcHJpdmF0ZSBnZXRGaWxsKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmZpbGw7XG4gICAgICAgIH1cbiAgICAgICAgcHJpdmF0ZSBsb2FkQ29uZmlnKCkge1xuICAgICAgICAgICAgdGhpcy5jb25maWcgPSB3aW5kb3dbJ21haW5mZXN0J10uY29uZmlnO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBnZXRDdXJyZW50QWN0aXZpdHkoKTpBY3Rpdml0eXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFjdGl2aXR5TWFuYWdlci5nZXRDdXJyZW50QWN0aXZpdHkoKTtcbiAgICAgICAgfVxuXG4gICAgfVxufVxuXG4iLCJuYW1lc3BhY2UgYW5kcm9pZC5kYXRhYmFzZSB7XG5cbiAgICBleHBvcnQgIGNsYXNzIERhdGFTZXRPYnNlcnZlciB7XG5cbiAgICAgICAgcHVibGljIG9uQ2hhbmdlZCgpIHtcbiAgICAgICAgICAgIC8vIERvIG5vdGhpbmdcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBvbkludmFsaWRhdGVkKCkge1xuICAgICAgICAgICAgLy8gRG8gbm90aGluZ1xuICAgICAgICB9XG4gICAgfVxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJEYXRhU2V0T2JzZXJ2ZXIudHNcIiAvPlxuXG5uYW1lc3BhY2UgYW5kcm9pZC5kYXRhYmFzZSB7XG4gICAgZXhwb3J0ICBjbGFzcyBPYnNlcnZhYmxlPFQ+e1xuICAgICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgbU9ic2VydmVyczogQXJyYXk8VD4gPSBuZXcgQXJyYXk8VD4oKTtcbiAgICAgICAgcHVibGljIHJlZ2lzdGVyT2JzZXJ2ZXIob2JzZXJ2ZXI6IFQpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmICghb2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBcIlRoZSBvYnNlcnZlciBpcyBudWxsIG9yIHVuZGVmaW5lXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5tT2JzZXJ2ZXJzLmluZGV4T2Yob2JzZXJ2ZXIpID4gLTEpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBcIk9ic2VydmVyIFwiICsgb2JzZXJ2ZXIgKyBcIiBpcyBhbHJlYWR5IHJlZ2lzdGVyZWQgXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm1PYnNlcnZlcnMucHVzaChvYnNlcnZlcik7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIHVucmVnaXN0ZXJPYnNlcnZlcihvYnNlcnZlcjogVCk6IHZvaWQge1xuICAgICAgICAgICAgaWYgKCFvYnNlcnZlcikge1xuICAgICAgICAgICAgICAgIHRocm93IFwiVGhlIG9ic2VydmVyIGlzIG51bGwgb3IgdW5kZWZpbmVcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBpbmRleDogbnVtYmVyID0gdGhpcy5tT2JzZXJ2ZXJzLmluZGV4T2Yob2JzZXJ2ZXIpO1xuICAgICAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHRocm93IFwiT2JzZXJ2ZXIgXCIgKyBvYnNlcnZlciArIFwiIHdhcyBub3QgcmVnaXN0ZXJlZCBcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubU9ic2VydmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyB1bnJlZ2lzdGVyQWxsKCkge1xuICAgICAgICAgICAgdGhpcy5tT2JzZXJ2ZXJzLmxlbmd0aCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZXhwb3J0IGNsYXNzIERhdGFTZXRPYnNlcnZhYmxlIGV4dGVuZHMgT2JzZXJ2YWJsZTxEYXRhU2V0T2JzZXJ2ZXI+e1xuICAgICAgICBwdWJsaWMgbm90aWZ5Q2hhbmdlZCgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IHRoaXMubU9ic2VydmVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICAgIHRoaXMubU9ic2VydmVyc1tpXS5vbkNoYW5nZWQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIG5vdGlmeUludmFsaWRhdGVkKCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gdGhpcy5tT2JzZXJ2ZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tT2JzZXJ2ZXJzW2ldLm9uSW52YWxpZGF0ZWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kYXRhYmFzZS9EYXRhU2V0T2JzZXJ2YWJsZS50c1wiIC8+XG5cbm5hbWVzcGFjZSBhbmRyb2lkLmFkYXB0ZXIge1xuICAgIGltcG9ydCBEYXRhU2V0T2JzZXJ2YWJsZSA9IGFuZHJvaWQuZGF0YWJhc2UuRGF0YVNldE9ic2VydmFibGU7XG4gICAgaW1wb3J0IERhdGFTZXRPYnNlcnZlciA9IGFuZHJvaWQuZGF0YWJhc2UuRGF0YVNldE9ic2VydmVyO1xuICAgIGltcG9ydCBWaWV3ID0gYW5kcm9pZC52aWV3LlZpZXc7XG4gICAgZXhwb3J0ICBjbGFzcyBBZGFwdGVyIHtcbiAgICB9XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RhdGFiYXNlL0RhdGFTZXRPYnNlcnZhYmxlLnRzXCIgLz5cblxubmFtZXNwYWNlIGFuZHJvaWQuYWRhcHRlciB7XG4gICAgaW1wb3J0IERhdGFTZXRPYnNlcnZhYmxlICA9IGFuZHJvaWQuZGF0YWJhc2UuRGF0YVNldE9ic2VydmFibGU7XG4gICAgaW1wb3J0IERhdGFTZXRPYnNlcnZlciA9IGFuZHJvaWQuZGF0YWJhc2UuRGF0YVNldE9ic2VydmVyO1xuICAgIGltcG9ydCBWaWV3ID0gYW5kcm9pZC52aWV3LlZpZXc7XG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIFZpZXdQYWdlQWRhcHRlciB7XG4gICAgcHJpdmF0ZSBtRGF0YVNldE9ic2VydmFibGUgOkRhdGFTZXRPYnNlcnZhYmxlID1uZXcgRGF0YVNldE9ic2VydmFibGUoKTtcblx0cHJpdmF0ZSBtVmlld0NhY2hlIDpBcnJheTxWaWV3SW5mbz4gID0gbmV3IEFycmF5PFZpZXdJbmZvPigpO1xuXHRwcml2YXRlICBtU2hvdWxkQ2FjaGUgOmJvb2xlYW49IGZhbHNlO1xuXG5cdHB1YmxpYyBYQmFzZUFkYXB0ZXIoKSB7XG5cdH1cblxuXHQvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiBkb24ndCB1c2UgdGhpcyAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXHQgcmVnaXN0ZXJEYXRhU2V0T2JzZXJ2ZXIob2JzZXJ2ZXI6RGF0YVNldE9ic2VydmVyICkge1xuXHRcdHRoaXMubURhdGFTZXRPYnNlcnZhYmxlLnJlZ2lzdGVyT2JzZXJ2ZXIob2JzZXJ2ZXIpO1xuXHR9XG5cblx0IHVucmVnaXN0ZXJEYXRhU2V0T2JzZXJ2ZXIob2JzZXJ2ZXI6RGF0YVNldE9ic2VydmVyICkge1xuXHRcdHRoaXMubURhdGFTZXRPYnNlcnZhYmxlLnVucmVnaXN0ZXJPYnNlcnZlcihvYnNlcnZlcik7XG5cdH1cblxuXHQvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXHRwdWJsaWMgbm90aWZ5RGF0YVNldENoYW5nZWQoKSB7XG5cdFx0dGhpcy5tRGF0YVNldE9ic2VydmFibGUubm90aWZ5Q2hhbmdlZCgpO1xuXHR9XG5cdFxuXHRwdWJsaWMgIG5vdGlmeURhdGFTZXRJbnZhbGlkYXRlZCgpIHtcblx0XHR0aGlzLm1EYXRhU2V0T2JzZXJ2YWJsZS5ub3RpZnlJbnZhbGlkYXRlZCgpO1xuXHR9XG5cdC8qKipcblx0ICogc2V0IGNhY2hlXG5cdCAqIFxuXHQgKiBAcGFyYW0gZW5hYmxlXG5cdCAqL1xuXHRwdWJsaWMgIHNldENhY2hlRW5hYmxlKCBlbmFibGU6Ym9vbGVhbikge1xuXHRcdHRoaXMubVNob3VsZENhY2hlID0gZW5hYmxlO1xuXHRcdGlmICghdGhpcy5tU2hvdWxkQ2FjaGUpIHtcblx0XHRcdHRoaXMubVZpZXdDYWNoZS5sZW5ndGggPTA7XG5cdFx0fVxuXHR9XG5cblx0cHVibGljIGFic3RyYWN0ICBnZXRDb3VudCgpOm51bWJlcjtcblxuXG5cdHB1YmxpYyBhYnN0cmFjdCAgZ2V0SXRlbSggcG9zaXRpb246bnVtYmVyKTphbnk7XG5cblx0cHVibGljIGFic3RyYWN0ICBkZXN0b3J5SXRlbShwb3NpdGlvbjpudW1iZXIsICBjb250YWluZXI6Vmlldyk7XG5cblx0cHVibGljIGFic3RyYWN0ICBpbnN0YW50aWF0ZUl0ZW0oIHBvc2l0aW9uOm51bWJlcixcblx0XHRcdGNvbnRhaW5lcjpWaWV3LCBjb250ZW50VmlldzpWaWV3KTpWaWV3O1xuXG5cdCBpbml0SXRlbShwb3NpdGlvbjpudW1iZXIsICBjb250YWluZXI6Vmlldyk6VmlldyB7XG5cdFx0bGV0IHZpZXc6VmlldyA9IG51bGw7XG5cdFx0aWYgKHRoaXMubVNob3VsZENhY2hlKSB7XG5cdFx0XHRmb3IgKGxldCBpOm51bWJlciA9IDA7IGkgPCB0aGlzLm1WaWV3Q2FjaGUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBsZXQgaW5mbzpWaWV3SW5mbyAgPSB0aGlzLm1WaWV3Q2FjaGVbaV07XG5cdFx0XHRcdGlmIChpbmZvICE9IG51bGwgJiYgaW5mby5wb3NpdGlvbiA9PSBwb3NpdGlvbikge1xuXHRcdFx0XHRcdHZpZXcgPSBpbmZvLnZpZXc7XG5cdFx0XHRcdFx0aWYgKHZpZXcgIT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuaW5zdGFudGlhdGVJdGVtKHBvc2l0aW9uLCBjb250YWluZXIsIHZpZXcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKHZpZXcgPT0gbnVsbCkge1xuXHRcdFx0XHR2aWV3ID0gdGhpcy5pbnN0YW50aWF0ZUl0ZW0ocG9zaXRpb24sIGNvbnRhaW5lciwgbnVsbCk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLm1WaWV3Q2FjaGUucHVzaChuZXcgVmlld0luZm8odmlldywgcG9zaXRpb24pKTtcblx0XHR9XG5cdFx0aWYgKHZpZXcgPT0gbnVsbCkge1xuXHRcdFx0dmlldyA9IHRoaXMuaW5zdGFudGlhdGVJdGVtKHBvc2l0aW9uLCBjb250YWluZXIsIG51bGwpO1xuXHRcdH1cblx0XHRyZXR1cm4gdmlldztcblx0fVxuXHQvKipcblx0ICogdW51c2VmdWwgbWV0aG9kcyBjdXJyZW50bHlcblx0ICovXG5cblx0cHVibGljICAgYmVnaW5VcGRhdGEoKXt9XG5cblx0LyoqXG5cdCAqIHVudXNlZnVsIG1ldGhvZHMgY3VycmVudGx5XG5cdCAqL1xuXG5cdHB1YmxpYyAgIGZpbmlzaFVwZGF0YSgpe31cblxuXHRcbiAgICB9XG4gICAgZXhwb3J0IGNsYXNzIFZpZXdJbmZvIHtcblx0XHR2aWV3OlZpZXc7XG5cdFx0cG9zaXRpb246bnVtYmVyO1xuXG5cdFx0Y29uc3RydWN0b3IoIHY6VmlldywgIHBvczpudW1iZXIpIHtcblx0XHRcdHRoaXMudmlldyA9IHY7XG5cdFx0XHR0aGlzLnBvc2l0aW9uID0gcG9zO1xuXHRcdH1cblx0fVxufSIsIm5hbWVzcGFjZSBhbmRyb2lkLmFwcHtcbiAgICBleHBvcnQgY2xhc3MgQnVuZGxle1xuICAgICAgICBwcml2YXRlIG1hcDphbnkgPSB7fTtcbiAgICAgICAgcHVibGljIHB1dChrZXk6c3RyaW5nLHZhbHVlOmFueSl7XG4gICAgICAgICAgICB0aGlzLm1hcFtrZXldPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgcHV0RGVmYXVsdCh2YWx1ZTphbnkpe1xuICAgICAgICAgICAgdGhpcy5tYXBbJ2RlZmF1bHQnXT12YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgZ2V0RGVmYXVsdCgpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwWydkZWZhdWx0J107XG4gICAgICAgIH1cbiAgICB9XG59IiwibmFtZXNwYWNlIGFuZHJvaWR7XG4gICAgZXhwb3J0IGNsYXNzIERlYnVne1xuICAgICAgICBzdGF0aWMgYXNzZXJ0KGZsZzpib29sZWFuPWZhbHNlLGxvZz86c3RyaW5nKXtcbiAgICAgICAgICAgIGlmKCFmbGcpe1xuICAgICAgICAgICAgICAgIGxldCBlcnI6RXJyb3IgPSBuZXcgRXJyb3IoKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBsb2crXCJcXG5cIitlcnIuc3RhY2s7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGljIGxvZ3N0YWNrKGxvZyA6YW55KXtcbiAgICAgICAgICAgIGxldCBlcnI6RXJyb3IgPSBuZXcgRXJyb3IoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCBsb2crXCJcXG5cIitlcnIuc3RhY2spO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRpYyBsb2cobG9nOmFueSl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhsb2cpO1xuICAgICAgICB9XG4gICAgfVxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJSZWN0LnRzXCIgLz5cblxubW9kdWxlIGFuZHJvaWQuZ3JhcGhpY3Mge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICBpbXBvcnQgUmVjdCA9IGFuZHJvaWQuZ3JhcGhpY3MuUmVjdDtcbiAgICBpbXBvcnQgU2l6ZSA9IGFuZHJvaWQuZ3JhcGhpY3MuU2l6ZTtcbiAgICBpbXBvcnQgUG9pbnQgPSBhbmRyb2lkLmdyYXBoaWNzLlBvaW50O1xuICAgIGltcG9ydCBGb250ID0gYW5kcm9pZC5ncmFwaGljcy5Gb250O1xuICAgIGltcG9ydCBTdHJva2VTdHlsZSA9IGFuZHJvaWQuZ3JhcGhpY3MuU3Ryb2tlU3R5bGU7XG4gICAgLyoqXG4gICAgICogUmVuZGVyIHRvIGNhbnZhcy5cbiAgICAgKi9cbiAgICBleHBvcnQgY2xhc3MgQ2FudmFzUmVuZGVyRW5naW5lIHtcblxuICAgICAgICBwcml2YXRlIF9lbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICAgICAgcHJpdmF0ZSBfY2FudmFzOiBhbnk7XG4gICAgICAgIHByaXZhdGUgX2NhbnZhczJkOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG5cbiAgICAgICAgcHJpdmF0ZSBfY2xpcFJlY3Q6IFJlY3Q7XG5cbiAgICAgICAgY29uc3RydWN0b3IoZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICAgICAgdGhpcy5fY3JlYXRlKCk7XG5cbiAgICAgICAgfVxuICAgICAgICBnZXQgY2FudmFzKCk6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY2FudmFzMmQ7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc2V0IGFscGhhKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhczJkLmdsb2JhbEFscGhhID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgY2xlYXJSZWN0KGxlZnQ6IG51bWJlciwgdG9wOiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMyZC5jbGVhclJlY3QobGVmdCwgdG9wLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJlZ2luUmVuZGVyKCkge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzMmQuY2xlYXJSZWN0KDAsIDAsIHRoaXMuX2NhbnZhcy53aWR0aCwgdGhpcy5fY2FudmFzLmhlaWdodCk7XG4gICAgICAgIH1cblxuICAgICAgICBlbmRSZW5kZXIoKSB7XG4gICAgICAgIH1cblxuICAgICAgICBzYXZlKCkge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzMmQuc2F2ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzdG9yZSgpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhczJkLnJlc3RvcmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldEltYWdlRGF0YShzeDogbnVtYmVyLCBzeTogbnVtYmVyLCBzdzogbnVtYmVyLCBzaDogbnVtYmVyKTogSW1hZ2VEYXRhIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jYW52YXMyZC5nZXRJbWFnZURhdGEoc3gsIHN5LCBzdywgc2gpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHV0SW1hZ2VEYXRhKGltYWdlZGF0YTogSW1hZ2VEYXRhLCBkeDogbnVtYmVyLCBkeTogbnVtYmVyLCBkaXJ0eVg/OiBudW1iZXIsIGRpcnR5WT86IG51bWJlciwgZGlydHlXaWR0aD86IG51bWJlciwgZGlydHlIZWlnaHQ/OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhczJkLnB1dEltYWdlRGF0YShpbWFnZWRhdGEsIGR4LCBkeSwgZGlydHlYLCBkaXJ0eVksIGRpcnR5V2lkdGgsIGRpcnR5SGVpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNsaXAocmVjdDogUmVjdCkge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzMmQuYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMyZC5yZWN0KHJlY3QubGVmdCwgcmVjdC50b3AsIHJlY3Qud2lkdGgsIHJlY3QuaGVpZ2h0KTs7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMyZC5jbGlwKCk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRWaWV3cG9ydFNpemUodzogbnVtYmVyLCBoOiBudW1iZXIpIHtcbiAgICAgICAgICAgIGxldCBfZGV2aWNlUGl4ZWxSYXRpbzogbnVtYmVyID0gMjtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy53aWR0aCA9IHcgKiBfZGV2aWNlUGl4ZWxSYXRpbztcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5oZWlnaHQgPSBoICogX2RldmljZVBpeGVsUmF0aW87XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUud2lkdGggPSB3ICsgXCJweFwiO1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLmhlaWdodCA9IGggKyBcInB4XCI7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMyZC5zY2FsZShfZGV2aWNlUGl4ZWxSYXRpbywgX2RldmljZVBpeGVsUmF0aW8pO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IGVsZW1lbnQoKTogRWxlbWVudCB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY2FudmFzO1xuICAgICAgICB9XG5cblxuICAgICAgICBkcmF3RWxsaXBzZShjeDogbnVtYmVyLCBjeTogbnVtYmVyLCByeDogbnVtYmVyLCByeTogbnVtYmVyLCBzdHlsZT86IFN0eWxlKSB7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHByaXZhdGUgX2FwcGx5U3R5bGUoc3R5bGU6IFN0eWxlKSB7XG4gICAgICAgICAgICBpZiAoc3R5bGUgIT0gbnVsbCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKHN0eWxlLmJhY2tncm91bmQgaW5zdGFuY2VvZiBGaWxsU3R5bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0eWxlLmJhY2tncm91bmQuZmlsbCBpbnN0YW5jZW9mIEdyYWRpZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ3JhZGllbnQ6IGFueSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmlsbCA9IHN0eWxlLmJhY2tncm91bmQuZmlsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWxsIGluc3RhbmNlb2YgTGluZWFyR3JhZGllbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmFkaWVudCA9IHRoaXMuX2NhbnZhczJkLmNyZWF0ZUxpbmVhckdyYWRpZW50KGZpbGwuc3RhcnR4LCBmaWxsLnN0YXJ0eSwgZmlsbC5lbmR4LCBmaWxsLmVuZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmaWxsIGluc3RhbmNlb2YgUmFkaWFsR3JhZGllbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmFkaWVudCA9IHRoaXMuX2NhbnZhczJkLmNyZWF0ZVJhZGlhbEdyYWRpZW50KGZpbGwuY2VudGVyeCwgZmlsbC5jZW50ZXJ5LCBmaWxsLnJhZGl1cywgZmlsbC5jZW50ZXJ4MSwgZmlsbC5jZW50ZXJ5MSwgZmlsbC5yYWRpdXMxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmFkaWVudCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgY29sb3JpbmZvIG9mIGZpbGwuY29sb3JzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcChjb2xvcmluZm8ub2Zmc2V0LCBjb2xvcmluZm8uY29sb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhbnZhczJkLmZpbGxTdHlsZSA9IGdyYWRpZW50O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiAoc3R5bGUuYmFja2dyb3VuZCkgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FudmFzMmQuZmlsbFN0eWxlID0gc3R5bGUuYmFja2dyb3VuZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fYXBwbHlTdHJva2VTdHlsZShzdHlsZS5zdHJva2VTdHlsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcHJpdmF0ZSBfYXBwbHlTdHJva2VTdHlsZShzdHJva2VTdHlsZTogU3Ryb2tlU3R5bGUpIHtcbiAgICAgICAgICAgIGlmIChzdHJva2VTdHlsZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0cm9rZVN0eWxlLnN0cm9rZUNvbG9yICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FudmFzMmQuc3Ryb2tlU3R5bGUgPSBzdHJva2VTdHlsZS5zdHJva2VDb2xvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHN0cm9rZVN0eWxlLnN0cm9rZVdpZHRoICE9IG51bGwgJiYgIWlzTmFOKHN0cm9rZVN0eWxlLnN0cm9rZVdpZHRoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYW52YXMyZC5saW5lV2lkdGggPSBzdHJva2VTdHlsZS5zdHJva2VXaWR0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHN0cm9rZVN0eWxlLmRhc2ggIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYW52YXMyZC5zZXRMaW5lRGFzaChzdHJva2VTdHlsZS5kYXNoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHN0cm9rZVN0eWxlLmRhc2hPZmZzZXQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYW52YXMyZC5saW5lRGFzaE9mZnNldCA9IHN0cm9rZVN0eWxlLmRhc2hPZmZzZXQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfYXBwbHlGb250KGZvbnQ6IEZvbnQpIHtcbiAgICAgICAgICAgIGlmIChmb250ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAoZm9udC5mb250Q29sb3IgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYW52YXMyZC5maWxsU3R5bGUgPSBmb250LmZvbnRDb2xvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGZvbnQuZm9udFNpemUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYW52YXMyZC5mb250ID0gZm9udC5mb250U2l6ZSArICdweCAnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZm9udC5mb250RmFtaWx5ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FudmFzMmQuZm9udCArPSBmb250LmZvbnRGYW1pbHk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZHJhd1JlY3QoeDogbnVtYmVyLCB5OiBudW1iZXIsIHc6IG51bWJlciwgaDogbnVtYmVyLCBzdHlsZTogU3R5bGUsIGZpbGw6IGJvb2xlYW4pIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhczJkLnNhdmUoKTtcbiAgICAgICAgICAgIHRoaXMuX2FwcGx5U3R5bGUoc3R5bGUpO1xuICAgICAgICAgICAgaWYgKGZpbGwpIHtcbiAgICAgICAgICAgICAgICBpZihzdHlsZS5iYWNrZ3JvdW5kICE9IG51bGwpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYW52YXMyZC5maWxsUmVjdCh4LCB5LCB3LCBoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoc3R5bGUuc3Ryb2tlU3R5bGUgIT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhbnZhczJkLnN0cm9rZVJlY3QoeCwgeSwgdywgaCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jYW52YXMyZC5zdHJva2VSZWN0KHgsIHksIHcsIGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN0eWxlLnN0cm9rZVN0eWxlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLl9jYW52YXMyZC5zdHJva2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2NhbnZhczJkLnJlc3RvcmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRyYXdMaW5lKHgxOiBudW1iZXIsIHkxOiBudW1iZXIsIHgyOiBudW1iZXIsIHkyOiBudW1iZXIsIHN0cm9rZXN0eWxlOiBTdHJva2VTdHlsZSkge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzMmQuYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMyZC5tb3ZlVG8oeDEsIHkxKTtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhczJkLmxpbmVUbyh4MiwgeTIpO1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzMmQuc3Ryb2tlU3R5bGUgPSBzdHJva2VzdHlsZS5zdHJva2VDb2xvcjtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhczJkLmxpbmVXaWR0aCA9IHN0cm9rZXN0eWxlLnN0cm9rZVdpZHRoO1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzMmQuc3Ryb2tlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBkcmF3TGluZXMoeHM6IG51bWJlcltdLCB5czogbnVtYmVyW10sIHN0cm9rZXN0eWxlOiBTdHJva2VTdHlsZSkge1xuICAgICAgICAgICAgaWYgKHhzICE9PSBudWxsICYmIHlzICE9PSBudWxsICYmIHhzLmxlbmd0aCA9PT0geXMubGVuZ3RoICYmIHhzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jYW52YXMyZC5zYXZlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FudmFzMmQuYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fYXBwbHlTdHJva2VTdHlsZShzdHJva2VzdHlsZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FudmFzMmQubW92ZVRvKHhzWzBdLCB5c1swXSk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCB4cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYW52YXMyZC5saW5lVG8oeHNbaV0sIHlzW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FudmFzMmQuc3Ryb2tlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FudmFzMmQuY2xvc2VQYXRoKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FudmFzMmQucmVzdG9yZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZHJhd1BvbHlnb24oeHM6IG51bWJlcltdLCB5czogbnVtYmVyW10sIHN0eWxlOiBTdHlsZSkge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzMmQuc2F2ZSgpO1xuICAgICAgICAgICAgdGhpcy5fYXBwbHlTdHlsZShzdHlsZSk7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMyZC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhczJkLm1vdmVUbyh4c1swXSwgeXNbMF0pO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCB4cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhbnZhczJkLmxpbmVUbyh4c1tpXSwgeXNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fY2FudmFzMmQuY2xvc2VQYXRoKCk7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMyZC5maWxsKCk7XG4gICAgICAgICAgICBpZiAoc3R5bGUgIT0gbnVsbCAmJiBzdHlsZS5zdHJva2VTdHlsZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FudmFzMmQuc3Ryb2tlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMyZC5yZXN0b3JlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBkcmF3UGllKGN4OiBudW1iZXIsIGN5OiBudW1iZXIsIHI6IG51bWJlciwgc3RhcnRBbmdsZTogbnVtYmVyLCBzd2VlcEFuZ2xlOiBudW1iZXIsIHN0eWxlOiBTdHlsZSkge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzMmQuc2F2ZSgpO1xuICAgICAgICAgICAgdGhpcy5fYXBwbHlTdHlsZShzdHlsZSk7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMyZC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhczJkLm1vdmVUbyhjeCwgY3kpO1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzMmQuYXJjKGN4LCBjeSwgciwgc3RhcnRBbmdsZSwgc3RhcnRBbmdsZSArIHN3ZWVwQW5nbGUpO1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzMmQubGluZVRvKGN4LCBjeSk7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMyZC5jbG9zZVBhdGgoKTtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhczJkLmZpbGwoKTtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhczJkLnJvdGF0ZShzdGFydEFuZ2xlKTtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhczJkLnJlc3RvcmUoKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICBkcmF3RG9udXQoY3g6IG51bWJlciwgY3k6IG51bWJlciwgcmFkaXVzOiBudW1iZXIsIGlubmVyUmFkaXVzOiBudW1iZXIsIHN0YXJ0QW5nbGU6IG51bWJlciwgc3dlZXBBbmdsZTogbnVtYmVyLCBzdHlsZTogU3R5bGUpIHtcbiAgICAgICAgICAgIGxldCBlbmRBbmdsZTogbnVtYmVyID0gc3RhcnRBbmdsZSArIHN3ZWVwQW5nbGU7XG4gICAgICAgICAgICBsZXQgcDEgPSBuZXcgUG9pbnQoY3gsIGN5KTtcbiAgICAgICAgICAgIHAxLnggKz0gaW5uZXJSYWRpdXMgKiBNYXRoLmNvcyhzdGFydEFuZ2xlKTtcbiAgICAgICAgICAgIHAxLnkgKz0gaW5uZXJSYWRpdXMgKiBNYXRoLnNpbihzdGFydEFuZ2xlKTtcbiAgICAgICAgICAgIGxldCBwMiA9IG5ldyBQb2ludChjeCwgY3kpO1xuICAgICAgICAgICAgcDIueCArPSBpbm5lclJhZGl1cyAqIE1hdGguY29zKGVuZEFuZ2xlKTtcbiAgICAgICAgICAgIHAyLnkgKz0gaW5uZXJSYWRpdXMgKiBNYXRoLnNpbihlbmRBbmdsZSk7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMyZC5zYXZlKCk7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMyZC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIHRoaXMuX2FwcGx5U3R5bGUoc3R5bGUpO1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzMmQubW92ZVRvKHAxLngsIHAxLnkpO1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzMmQuYXJjKGN4LCBjeSwgcmFkaXVzLCBzdGFydEFuZ2xlLCBlbmRBbmdsZSwgZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzMmQubGluZVRvKHAyLngsIHAyLnkpO1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzMmQuYXJjKGN4LCBjeSwgaW5uZXJSYWRpdXMsIGVuZEFuZ2xlLCBzdGFydEFuZ2xlLCB0cnVlKTtcbiAgICAgICAgICAgIGlmKHN0eWxlLmJhY2tncm91bmQgIT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FudmFzMmQuZmlsbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoc3R5bGUuc3Ryb2tlU3R5bGUgIT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FudmFzMmQuc3Ryb2tlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMyZC5yZXN0b3JlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBkcmF3U3RyaW5nKHM6IHN0cmluZywgcHQ6IFBvaW50LCBmb250OiBGb250KSB7XG4gICAgICAgICAgICAvLyBpZiAoZm9udCkge1xuICAgICAgICAgICAgLy8gICAgIHRoaXMuX2NhbnZhczJkLmZvbnQgPSBmb250LmZvbnRTaXplICsgJ3B4ICcgKyBmb250LmZvbnRGYW1pbHk7XG4gICAgICAgICAgICAvLyAgICAgdmFyIGdyYWRpZW50ID0gdGhpcy5fY2FudmFzMmQuY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgMCwgdGhpcy5fY2FudmFzLndpZHRoLCAwKTtcbiAgICAgICAgICAgIC8vICAgICBpZiAoZm9udC5mb250Q29sb3IpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDEuMCwgZm9udC5mb250Q29sb3IpO1xuICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLl9jYW52YXMyZC5maWxsU3R5bGUgPSBncmFkaWVudDtcbiAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMyZC5zYXZlKCk7XG4gICAgICAgICAgICB0aGlzLl9hcHBseUZvbnQoZm9udCk7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMyZC5maWxsVGV4dChzLCBwdC54LCBwdC55KTtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhczJkLnJlc3RvcmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRyYXdTdHJpbmdSb3RhdGVkKHM6IHN0cmluZywgcHQ6IFBvaW50LCBjZW50ZXI6IFBvaW50LCBhbmdsZTogbnVtYmVyLCBmb250OiBGb250KSB7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMyZC5zYXZlKCk7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMyZC50ZXh0QmFzZWxpbmUgPSAnYm90dG9tJztcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhczJkLnRyYW5zbGF0ZShjZW50ZXIueCwgY2VudGVyLnkpO1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzMmQucm90YXRlKE1hdGguUEkgLyAxODAgKiBhbmdsZSk7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMyZC50cmFuc2xhdGUoLWNlbnRlci54LCAtY2VudGVyLnkpO1xuICAgICAgICAgICAgdGhpcy5fYXBwbHlGb250KGZvbnQpO1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzMmQuZmlsbFRleHQocywgcHQueCwgcHQueSk7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMyZC5yZXN0b3JlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBtZWFzdXJlU3RyaW5nKHM6IHN0cmluZywgZm9udDogRm9udCwgbWF4U2l6ZTogbnVtYmVyID0gMCk6IFNpemUge1xuICAgICAgICAgICAgdmFyIHN6ID0gbmV3IFNpemUoMCwgMCk7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMyZC5mb250ID0gZm9udC5mb250U2l6ZSArIFwicHhcIiArIFwiIFwiICsgZm9udC5mb250RmFtaWx5O1xuICAgICAgICAgICAgdmFyIHRtOiBUZXh0TWV0cmljcyA9IHRoaXMuX2NhbnZhczJkLm1lYXN1cmVUZXh0KHMpO1xuICAgICAgICAgICAgc3oud2lkdGggPSB0bS53aWR0aDtcbiAgICAgICAgICAgIHN6LmhlaWdodCA9IGZvbnQuZm9udFNpemU7XG4gICAgICAgICAgICByZXR1cm4gc3o7XG4gICAgICAgIH1cblxuICAgICAgICBkcmF3SW1hZ2UoaW1hZ2U6IGFueSwgeDogbnVtYmVyLCB5OiBudW1iZXIsIHc6IG51bWJlciwgaDogbnVtYmVyKSB7XG5cblxuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfY3JlYXRlKCkge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX2NhbnZhcyk7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMyZCA9IHRoaXMuX2NhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgIH1cblxuXG4gICAgICAgIG1vdmVUbyh4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzMmQubW92ZVRvKHgsIHkpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2NhbGUoc3g6IG51bWJlciwgc3k6IG51bWJlcik6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzMmQuc2NhbGUoc3gsIHN5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJvdGF0ZShkZWdyZWU6IG51bWJlcik6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzMmQucm90YXRlKGRlZ3JlZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0cmFuc2xhdGUoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhczJkLnRyYW5zbGF0ZSh4LCB5KTtcbiAgICAgICAgfVxuXG4gICAgfVxufVxuXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiUmVjdC50c1wiIC8+XG5cbm1vZHVsZSBhbmRyb2lkLmdyYXBoaWNzIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgaW1wb3J0IFJlY3QgPSBhbmRyb2lkLmdyYXBoaWNzLlJlY3Q7XG4gICAgaW1wb3J0IFNpemUgPSBhbmRyb2lkLmdyYXBoaWNzLlNpemU7XG4gICAgaW1wb3J0IFBvaW50ID0gYW5kcm9pZC5ncmFwaGljcy5Qb2ludDtcbiAgICBpbXBvcnQgRm9udCA9IGFuZHJvaWQuZ3JhcGhpY3MuRm9udDtcbiAgICBpbXBvcnQgU3Ryb2tlU3R5bGUgPSBhbmRyb2lkLmdyYXBoaWNzLlN0cm9rZVN0eWxlO1xuICAgIC8qKlxuICAgICAqIFJlbmRlciB0byBzdmcuXG4gICAgICovXG4gICAgZXhwb3J0IGNsYXNzIFN2Z1JlbmRlckVuZ2luZSB7XG4gICAgICAgIHByaXZhdGUgc3RhdGljIHN2Z05TID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJztcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgeGxpbmtOUyA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJztcblxuICAgICAgICBwcml2YXRlIF9lbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICAgICAgcHJpdmF0ZSBfc3ZnOiBFbGVtZW50O1xuICAgICAgICBwcml2YXRlIF90ZXh0OiBTVkdUZXh0RWxlbWVudDtcbiAgICAgICAgcHJpdmF0ZSBfdGV4dEdyb3VwOiBTVkdHRWxlbWVudDtcbiAgICAgICAgcHJpdmF0ZSBfZGVmczogU1ZHRGVmc0VsZW1lbnQ7XG5cbiAgICAgICAgLy8gXG4gICAgICAgIHByaXZhdGUgX2ZpbGw6IHN0cmluZztcbiAgICAgICAgcHJpdmF0ZSBfc3Ryb2tlOiBzdHJpbmc7XG4gICAgICAgIHByaXZhdGUgX3RleHRGaWxsOiBzdHJpbmc7XG5cbiAgICAgICAgcHJpdmF0ZSBfc3Ryb2tlV2lkdGg6IG51bWJlciA9IDE7XG5cbiAgICAgICAgcHJpdmF0ZSBfZm9udFNpemU6IHN0cmluZyA9IG51bGw7XG4gICAgICAgIHByaXZhdGUgX2ZvbnRGYW1pbHk6IHN0cmluZyA9IG51bGw7XG5cbiAgICAgICAgcHJpdmF0ZSBfZ3JvdXA6IEVsZW1lbnQ7XG4gICAgICAgIHByaXZhdGUgX2NsaXBSZWN0OiBSZWN0O1xuICAgICAgICBwcml2YXRlIHN0YXRpYyBfaXNmZjogYm9vbGVhbjtcblxuICAgICAgICBwdWJsaWMgYWxwaGE6bnVtYmVyID0gMTtcblxuICAgICAgICBjb25zdHJ1Y3RvcihlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgICAgICB0aGlzLl9jcmVhdGUoKTtcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fc3ZnKTtcblxuICAgICAgICAgICAgaWYgKFN2Z1JlbmRlckVuZ2luZS5faXNmZiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgU3ZnUmVuZGVyRW5naW5lLl9pc2ZmID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ2ZpcmVmb3gnKSA+PSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc2F2ZSgpe1xuXG4gICAgICAgIH1cbiAgICAgICAgcmVzdG9yZSgpe1xuXG4gICAgICAgIH1cbiAgICAgICAgY2xpcCgpe31cblxuICAgICAgICBiZWdpblJlbmRlcigpIHtcbiAgICAgICAgICAgIHdoaWxlICh0aGlzLl9zdmcuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N2Zy5yZW1vdmVDaGlsZCh0aGlzLl9zdmcuZmlyc3RDaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9zdmcuYXBwZW5kQ2hpbGQodGhpcy5fdGV4dEdyb3VwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVuZFJlbmRlcigpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl90ZXh0R3JvdXAucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N2Zy5yZW1vdmVDaGlsZCh0aGlzLl90ZXh0R3JvdXApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc2V0Vmlld3BvcnRTaXplKHc6IG51bWJlciwgaDogbnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9zdmcuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHcudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB0aGlzLl9zdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBoLnRvU3RyaW5nKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IGVsZW1lbnQoKTogRWxlbWVudCB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3ZnO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IGZpbGwoKTogc3RyaW5nIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9maWxsXG4gICAgICAgIH1cbiAgICAgICAgc2V0IGZpbGwodmFsdWU6IHN0cmluZykge1xuICAgICAgICAgICAgdGhpcy5fZmlsbCA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IGZvbnRTaXplKCk6IHN0cmluZyB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZm9udFNpemU7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IGZvbnRTaXplKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZvbnRTaXplID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgZm9udEZhbWlseSgpOiBzdHJpbmcge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ZvbnRGYW1pbHk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IGZvbnRGYW1pbHkodmFsdWU6IHN0cmluZykge1xuICAgICAgICAgICAgdGhpcy5fZm9udEZhbWlseSA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IHN0cm9rZSgpOiBzdHJpbmcge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0cm9rZTtcbiAgICAgICAgfVxuICAgICAgICBzZXQgc3Ryb2tlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0cm9rZSA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IHN0cm9rZVdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3Ryb2tlV2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IHN0cm9rZVdpZHRoKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0cm9rZVdpZHRoID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgdGV4dEZpbGwoKTogc3RyaW5nIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90ZXh0RmlsbDtcbiAgICAgICAgfVxuICAgICAgICBzZXQgdGV4dEZpbGwodmFsdWU6IHN0cmluZykge1xuICAgICAgICAgICAgdGhpcy5fdGV4dEZpbGwgPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZENsaXBSZWN0KGNsaXBSZWN0OiBSZWN0LCBpZDogc3RyaW5nKSB7XG4gICAgICAgICAgICBpZiAoY2xpcFJlY3QgJiYgaWQpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2xpcFBhdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoU3ZnUmVuZGVyRW5naW5lLnN2Z05TLCAnY2xpcFBhdGgnKTtcbiAgICAgICAgICAgICAgICB2YXIgcmVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhTdmdSZW5kZXJFbmdpbmUuc3ZnTlMsICdyZWN0Jyk7XG4gICAgICAgICAgICAgICAgcmVjdC5zZXRBdHRyaWJ1dGUoJ3gnLCAoY2xpcFJlY3QubGVmdCAtIDEpLnRvRml4ZWQoKSk7XG4gICAgICAgICAgICAgICAgcmVjdC5zZXRBdHRyaWJ1dGUoJ3knLCAoY2xpcFJlY3QudG9wIC0gMSkudG9GaXhlZCgpKTtcbiAgICAgICAgICAgICAgICByZWN0LnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAoY2xpcFJlY3Qud2lkdGggKyAyKS50b0ZpeGVkKCkpO1xuICAgICAgICAgICAgICAgIHJlY3Quc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAoY2xpcFJlY3QuaGVpZ2h0ICsgMikudG9GaXhlZCgpKTtcbiAgICAgICAgICAgICAgICBjbGlwUGF0aC5hcHBlbmRDaGlsZChyZWN0KTtcblxuICAgICAgICAgICAgICAgIGNsaXBQYXRoLnNldEF0dHJpYnV0ZSgnaWQnLCBpZCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9zdmcuYXBwZW5kQ2hpbGQoY2xpcFBhdGgpO1xuICAgICAgICAgICAgICAgIC8vdGhpcy5fZGVmcy5hcHBlbmRDaGlsZChjbGlwUGF0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBkcmF3RWxsaXBzZShjeDogbnVtYmVyLCBjeTogbnVtYmVyLCByeDogbnVtYmVyLCByeTogbnVtYmVyLCBjbGFzc05hbWU/OiBzdHJpbmcsIHN0eWxlPzogYW55KTogU1ZHRWxlbWVudCB7XG4gICAgICAgICAgICB2YXIgZWxsID0gPFNWR0VsZW1lbnQ+ZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFN2Z1JlbmRlckVuZ2luZS5zdmdOUywgJ2VsbGlwc2UnKTtcbiAgICAgICAgICAgIGVsbC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsIHRoaXMuX3N0cm9rZSk7XG4gICAgICAgICAgICBpZiAodGhpcy5fc3Ryb2tlV2lkdGggIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBlbGwuc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLCB0aGlzLl9zdHJva2VXaWR0aC50b1N0cmluZygpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsbC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLl9maWxsKTtcbiAgICAgICAgICAgIGVsbC5zZXRBdHRyaWJ1dGUoJ2N4JywgY3gudG9GaXhlZCgxKSk7XG4gICAgICAgICAgICBlbGwuc2V0QXR0cmlidXRlKCdjeScsIGN5LnRvRml4ZWQoMSkpO1xuICAgICAgICAgICAgZWxsLnNldEF0dHJpYnV0ZSgncngnLCByeC50b0ZpeGVkKDEpKTtcbiAgICAgICAgICAgIGVsbC5zZXRBdHRyaWJ1dGUoJ3J5JywgcnkudG9GaXhlZCgxKSk7XG4gICAgICAgICAgICAvL2VsbC5zZXRBdHRyaWJ1dGUoJ2N4JywgY3gudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAvL2VsbC5zZXRBdHRyaWJ1dGUoJ2N5JywgY3kudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAvL2VsbC5zZXRBdHRyaWJ1dGUoJ3J4JywgcngudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAvL2VsbC5zZXRBdHRyaWJ1dGUoJ3J5JywgcnkudG9TdHJpbmcoKSk7XG5cbiAgICAgICAgICAgIGlmIChjbGFzc05hbWUpIHtcbiAgICAgICAgICAgICAgICBlbGwuc2V0QXR0cmlidXRlKCdjbGFzcycsIGNsYXNzTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9hcHBseVN0eWxlKGVsbCwgc3R5bGUpO1xuXG4gICAgICAgICAgICAvL3RoaXMuX3N2Zy5hcHBlbmRDaGlsZChlbGwpO1xuICAgICAgICAgICAgdGhpcy5fYXBwZW5kQ2hpbGQoZWxsKTtcblxuICAgICAgICAgICAgcmV0dXJuIGVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGRyYXdSZWN0KHg6IG51bWJlciwgeTogbnVtYmVyLCB3OiBudW1iZXIsIGg6IG51bWJlciwgY2xhc3NOYW1lPzogc3RyaW5nLCBzdHlsZT86IGFueSwgY2xpcFBhdGg/OiBzdHJpbmcpOiBTVkdFbGVtZW50IHtcbiAgICAgICAgICAgIHZhciByZWN0ID0gPFNWR0VsZW1lbnQ+ZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFN2Z1JlbmRlckVuZ2luZS5zdmdOUywgJ3JlY3QnKTtcblxuICAgICAgICAgICAgcmVjdC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLl9maWxsKTtcbiAgICAgICAgICAgIHJlY3Quc2V0QXR0cmlidXRlKCdzdHJva2UnLCB0aGlzLl9zdHJva2UpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX3N0cm9rZVdpZHRoICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmVjdC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS13aWR0aCcsIHRoaXMuX3N0cm9rZVdpZHRoLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVjdC5zZXRBdHRyaWJ1dGUoJ3gnLCB4LnRvRml4ZWQoMSkpO1xuICAgICAgICAgICAgcmVjdC5zZXRBdHRyaWJ1dGUoJ3knLCB5LnRvRml4ZWQoMSkpO1xuICAgICAgICAgICAgaWYgKHcgPiAwICYmIHcgPCAwLjA1KSB7XG4gICAgICAgICAgICAgICAgcmVjdC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzAuMScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWN0LnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB3LnRvRml4ZWQoMSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGggPiAwICYmIGggPCAwLjA1KSB7XG4gICAgICAgICAgICAgICAgcmVjdC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsICcwLjEnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVjdC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIGgudG9GaXhlZCgxKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2xpcFBhdGgpIHtcbiAgICAgICAgICAgICAgICByZWN0LnNldEF0dHJpYnV0ZSgnY2xpcC1wYXRoJywgJ3VybCgjJyArIGNsaXBQYXRoICsgJyknKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgICAgIHJlY3Quc2V0QXR0cmlidXRlKCdjbGFzcycsIGNsYXNzTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9hcHBseVN0eWxlKHJlY3QsIHN0eWxlKTtcblxuICAgICAgICAgICAgdGhpcy5fYXBwZW5kQ2hpbGQocmVjdCk7XG5cbiAgICAgICAgICAgIHJldHVybiByZWN0O1xuICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5fcmVuZGVyLmRyYXdMaW5lKHN0YXJ0cG9pbnQueCwgc3RhcnRwb2ludC55LCBlbmRwb2ludC54LCBlbmRwb2ludC55LHN0cm9rZSk7XG4gICAgICAgIFxuICAgICAgICBkcmF3TGluZSh4MTpudW1iZXIsIHkxOm51bWJlciwgeDI6bnVtYmVyLCB5MjpudW1iZXIsIHN0cm9rZTpTdHJva2VTdHlsZSl7XG4gICAgICAgICAgICB0aGlzLl9kcmF3TGluZSh4MSx5MSx4Mix5MixudWxsLHsnc3Ryb2tlJzpzdHJva2Uuc3Ryb2tlQ29sb3IsJ3N0cm9rZS13aWR0aCc6c3Ryb2tlLnN0cm9rZVdpZHRofSk7XG4gICAgICAgIH1cbiAgICAgICAgX2RyYXdMaW5lKHgxOiBudW1iZXIsIHkxOiBudW1iZXIsIHgyOiBudW1iZXIsIHkyOiBudW1iZXIsIGNsYXNzTmFtZT86IHN0cmluZywgc3R5bGU/OiBhbnkpOiBTVkdFbGVtZW50IHtcbiAgICAgICAgICAgIHZhciBsaW5lID0gPFNWR0FFbGVtZW50PmRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhTdmdSZW5kZXJFbmdpbmUuc3ZnTlMsICdsaW5lJyk7XG4gICAgICAgICAgICBsaW5lLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgdGhpcy5fc3Ryb2tlKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9zdHJva2VXaWR0aCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGxpbmUuc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLCB0aGlzLl9zdHJva2VXaWR0aC50b1N0cmluZygpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxpbmUuc2V0QXR0cmlidXRlKCd4MScsIHgxLnRvRml4ZWQoMSkpO1xuICAgICAgICAgICAgbGluZS5zZXRBdHRyaWJ1dGUoJ3gyJywgeDIudG9GaXhlZCgxKSk7XG4gICAgICAgICAgICBsaW5lLnNldEF0dHJpYnV0ZSgneTEnLCB5MS50b0ZpeGVkKDEpKTtcbiAgICAgICAgICAgIGxpbmUuc2V0QXR0cmlidXRlKCd5MicsIHkyLnRvRml4ZWQoMSkpO1xuICAgICAgICAgICAgLy9saW5lLnNldEF0dHJpYnV0ZSgneDEnLCB4MS50b1N0cmluZygpKTtcbiAgICAgICAgICAgIC8vbGluZS5zZXRBdHRyaWJ1dGUoJ3gyJywgeDIudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAvL2xpbmUuc2V0QXR0cmlidXRlKCd5MScsIHkxLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgLy9saW5lLnNldEF0dHJpYnV0ZSgneTInLCB5Mi50b1N0cmluZygpKTtcblxuICAgICAgICAgICAgaWYgKGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgICAgIGxpbmUuc2V0QXR0cmlidXRlKCdjbGFzcycsIGNsYXNzTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9hcHBseVN0eWxlKGxpbmUsIHN0eWxlKTtcblxuICAgICAgICAgICAgdGhpcy5fYXBwZW5kQ2hpbGQobGluZSk7XG5cbiAgICAgICAgICAgIHJldHVybiBsaW5lO1xuICAgICAgICB9XG5cbiAgICAgICAgZHJhd0xpbmVzKHhzOiBudW1iZXJbXSwgeXM6IG51bWJlcltdLCBjbGFzc05hbWU/OiBzdHJpbmcsIHN0eWxlPzogYW55LCBjbGlwUGF0aD86IHN0cmluZyk6IFNWR0VsZW1lbnQge1xuICAgICAgICAgICAgaWYgKHhzICYmIHlzKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxlbiA9IE1hdGgubWluKHhzLmxlbmd0aCwgeXMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBpZiAobGVuID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGxpbmUgPSA8U1ZHRWxlbWVudD5kb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoU3ZnUmVuZGVyRW5naW5lLnN2Z05TLCAncG9seWxpbmUnKTtcblxuICAgICAgICAgICAgICAgICAgICBwbGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsIHRoaXMuX3N0cm9rZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zdHJva2VXaWR0aCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxpbmUuc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLCB0aGlzLl9zdHJva2VXaWR0aC50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHBsaW5lLnNldEF0dHJpYnV0ZSgnZmlsbCcsICdub25lJyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzcHRzID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwdHMgKz0geHNbaV0udG9GaXhlZCgxKSArICcsJyArIHlzW2ldLnRvRml4ZWQoMSkgKyAnICc7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NwdHMgKz0geHNbaV0udG9TdHJpbmcoKSArICcsJyArIHlzW2ldLnRvU3RyaW5nKCkgKyAnICc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcGxpbmUuc2V0QXR0cmlidXRlKCdwb2ludHMnLCBzcHRzKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGluZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgY2xhc3NOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoY2xpcFBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsaW5lLnNldEF0dHJpYnV0ZSgnY2xpcC1wYXRoJywgJ3VybCgjJyArIGNsaXBQYXRoICsgJyknKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hcHBseVN0eWxlKHBsaW5lLCBzdHlsZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYXBwZW5kQ2hpbGQocGxpbmUpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwbGluZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cblxuXG4gICAgICAgIGRyYXdQb2x5Z29uKHhzOiBudW1iZXJbXSwgeXM6IG51bWJlcltdLCBjbGFzc05hbWU/OiBzdHJpbmcsIHN0eWxlPzogYW55LCBjbGlwUGF0aD86IHN0cmluZyk6IFNWR0VsZW1lbnQge1xuICAgICAgICAgICAgaWYgKHhzICYmIHlzKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxlbiA9IE1hdGgubWluKHhzLmxlbmd0aCwgeXMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBpZiAobGVuID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcG9seSA9IDxTVkdFbGVtZW50PmRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhTdmdSZW5kZXJFbmdpbmUuc3ZnTlMsICdwb2x5Z29uJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgcG9seS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsIHRoaXMuX3N0cm9rZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zdHJva2VXaWR0aCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9seS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS13aWR0aCcsIHRoaXMuX3N0cm9rZVdpZHRoLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHBvbHkuc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5fZmlsbCk7XG4gICAgICAgICAgICAgICAgICAgIHBvbHkuc2V0QXR0cmlidXRlKCdvcGFjaXR5Jyx0aGlzLmFscGhhK1wiXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzcHRzID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc3B0cyArPSB4c1tpXS50b1N0cmluZygpICsgJywnICsgeXNbaV0udG9TdHJpbmcoKSArICcgJztcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwdHMgKz0geHNbaV0udG9GaXhlZCgxKSArICcsJyArIHlzW2ldLnRvRml4ZWQoMSkgKyAnICc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcG9seS5zZXRBdHRyaWJ1dGUoJ3BvaW50cycsIHNwdHMpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjbGFzc05hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvbHkuc2V0QXR0cmlidXRlKCdjbGFzcycsIGNsYXNzTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsaXBQYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb2x5LnNldEF0dHJpYnV0ZSgnY2xpcC1wYXRoJywgJ3VybCgjJyArIGNsaXBQYXRoICsgJyknKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hcHBseVN0eWxlKHBvbHksIHN0eWxlKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hcHBlbmRDaGlsZChwb2x5KTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcG9seTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgZHJhd1BpZShjeDogbnVtYmVyLCBjeTogbnVtYmVyLCByOiBudW1iZXIsIHN0YXJ0QW5nbGU6IG51bWJlciwgc3dlZXBBbmdsZTogbnVtYmVyLFxuICAgICAgICAgICAgY2xhc3NOYW1lPzogc3RyaW5nLCBzdHlsZT86IGFueSwgY2xpcFBhdGg/OiBzdHJpbmcpOiBTVkdFbGVtZW50IHtcblxuICAgICAgICAgICAgaWYgKHN3ZWVwQW5nbGUgPj0gTWF0aC5QSSAqIDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kcmF3RWxsaXBzZShjeCwgY3ksIHIsIHIsIGNsYXNzTmFtZSwgc3R5bGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcGF0aCA9IDxTVkdFbGVtZW50PmRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhTdmdSZW5kZXJFbmdpbmUuc3ZnTlMsICdwYXRoJyk7XG5cbiAgICAgICAgICAgIHBhdGguc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5fZmlsbCk7XG4gICAgICAgICAgICBwYXRoLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgdGhpcy5fc3Ryb2tlKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9zdHJva2VXaWR0aCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHBhdGguc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLCB0aGlzLl9zdHJva2VXaWR0aC50b1N0cmluZygpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHAxID0gbmV3IFBvaW50KGN4LCBjeSk7XG4gICAgICAgICAgICBwMS54ICs9IHIgKiBNYXRoLmNvcyhzdGFydEFuZ2xlKTtcbiAgICAgICAgICAgIHAxLnkgKz0gciAqIE1hdGguc2luKHN0YXJ0QW5nbGUpO1xuXG4gICAgICAgICAgICB2YXIgYTIgPSBzdGFydEFuZ2xlICsgc3dlZXBBbmdsZTtcbiAgICAgICAgICAgIHZhciBwMiA9IG5ldyBQb2ludChjeCwgY3kpO1xuICAgICAgICAgICAgcDIueCArPSByICogTWF0aC5jb3MoYTIpO1xuICAgICAgICAgICAgcDIueSArPSByICogTWF0aC5zaW4oYTIpO1xuXG4gICAgICAgICAgICB2YXIgb3B0ID0gJyAwIDAsMSAnO1xuICAgICAgICAgICAgaWYgKE1hdGguYWJzKHN3ZWVwQW5nbGUpID4gTWF0aC5QSSkge1xuICAgICAgICAgICAgICAgIG9wdCA9ICcgMCAxLDEgJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy92YXIgZCA9ICdNICcgKyBjeC50b0ZpeGVkKDEpICsgJywnICsgY3kudG9GaXhlZCgxKTtcbiAgICAgICAgICAgIC8vZCArPSAnIEwgJyArIHAxLngudG9GaXhlZCgxKSArICcsJyArIHAxLnkudG9GaXhlZCgxKTtcbiAgICAgICAgICAgIC8vZCArPSAnIEEgJyArIHIudG9GaXhlZCgxKSArICcsJyArIHIudG9GaXhlZCgxKSArIG9wdDtcbiAgICAgICAgICAgIC8vZCArPSBwMi54LnRvRml4ZWQoMSkgKyAnLCcgKyBwMi55LnRvRml4ZWQoMSkgKyAnIHonO1xuICAgICAgICAgICAgdmFyIGQgPSAnTSAnICsgcDEueC50b0ZpeGVkKDEpICsgJywnICsgcDEueS50b0ZpeGVkKDEpO1xuICAgICAgICAgICAgZCArPSAnIEEgJyArIHIudG9GaXhlZCgxKSArICcsJyArIHIudG9GaXhlZCgxKSArIG9wdDtcbiAgICAgICAgICAgIGQgKz0gcDIueC50b0ZpeGVkKDEpICsgJywnICsgcDIueS50b0ZpeGVkKDEpO1xuICAgICAgICAgICAgZCArPSAnIEwgJyArIGN4LnRvRml4ZWQoMSkgKyAnLCcgKyBjeS50b0ZpeGVkKDEpICsgJyB6JztcblxuICAgICAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCBkKTtcblxuXG4gICAgICAgICAgICBpZiAoY2xpcFBhdGgpIHtcbiAgICAgICAgICAgICAgICBwYXRoLnNldEF0dHJpYnV0ZSgnY2xpcC1wYXRoJywgJ3VybCgjJyArIGNsaXBQYXRoICsgJyknKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgICAgIHBhdGguc2V0QXR0cmlidXRlKCdjbGFzcycsIGNsYXNzTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9hcHBseVN0eWxlKHBhdGgsIHN0eWxlKTtcblxuICAgICAgICAgICAgdGhpcy5fYXBwZW5kQ2hpbGQocGF0aCk7XG5cbiAgICAgICAgICAgIHJldHVybiBwYXRoO1xuICAgICAgICB9XG5cbiAgICAgICAgZHJhd0RvbnV0KGN4OiBudW1iZXIsIGN5OiBudW1iZXIsIHJhZGl1czogbnVtYmVyLCBpbm5lclJhZGl1czogbnVtYmVyLCBzdGFydEFuZ2xlOiBudW1iZXIsIHN3ZWVwQW5nbGU6IG51bWJlcixcbiAgICAgICAgICAgIGNsYXNzTmFtZT86IHN0cmluZywgc3R5bGU/OiBhbnksIGNsaXBQYXRoPzogc3RyaW5nKTogU1ZHRWxlbWVudCB7XG5cbiAgICAgICAgICAgIHZhciBpc0Z1bGwgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChzdGFydEFuZ2xlK3N3ZWVwQW5nbGUgPj0gTWF0aC5QSSAqIDIpIHtcbiAgICAgICAgICAgICAgICBpc0Z1bGwgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHN3ZWVwQW5nbGU9TWF0aC5QSSAqIDIgLXN0YXJ0QW5nbGUtMC4wMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBwYXRoID0gPFNWR0VsZW1lbnQ+ZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFN2Z1JlbmRlckVuZ2luZS5zdmdOUywgJ3BhdGgnKTtcblxuICAgICAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCB0aGlzLl9maWxsKTtcbiAgICAgICAgICAgIHBhdGguc2V0QXR0cmlidXRlKCdzdHJva2UnLCB0aGlzLl9zdHJva2UpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX3N0cm9rZVdpZHRoICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS13aWR0aCcsIHRoaXMuX3N0cm9rZVdpZHRoLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcDEgPSBuZXcgUG9pbnQoY3gsIGN5KTtcbiAgICAgICAgICAgIHAxLnggKz0gcmFkaXVzICogTWF0aC5jb3Moc3RhcnRBbmdsZSk7XG4gICAgICAgICAgICBwMS55ICs9IHJhZGl1cyAqIE1hdGguc2luKHN0YXJ0QW5nbGUpO1xuXG4gICAgICAgICAgICB2YXIgYTIgPSBzdGFydEFuZ2xlICsgc3dlZXBBbmdsZTtcbiAgICAgICAgICAgIHZhciBwMiA9IG5ldyBQb2ludChjeCwgY3kpO1xuICAgICAgICAgICAgcDIueCArPSByYWRpdXMgKiBNYXRoLmNvcyhhMik7XG4gICAgICAgICAgICBwMi55ICs9IHJhZGl1cyAqIE1hdGguc2luKGEyKTtcblxuICAgICAgICAgICAgdmFyIHAzID0gbmV3IFBvaW50KGN4LCBjeSk7XG4gICAgICAgICAgICBwMy54ICs9IGlubmVyUmFkaXVzICogTWF0aC5jb3MoYTIpO1xuICAgICAgICAgICAgcDMueSArPSBpbm5lclJhZGl1cyAqIE1hdGguc2luKGEyKTtcblxuICAgICAgICAgICAgdmFyIHA0ID0gbmV3IFBvaW50KGN4LCBjeSk7XG4gICAgICAgICAgICBwNC54ICs9IGlubmVyUmFkaXVzICogTWF0aC5jb3Moc3RhcnRBbmdsZSk7XG4gICAgICAgICAgICBwNC55ICs9IGlubmVyUmFkaXVzICogTWF0aC5zaW4oc3RhcnRBbmdsZSk7XG5cbiAgICAgICAgICAgIHZhciBvcHQxID0gJyAwIDAsMSAnLFxuICAgICAgICAgICAgICAgIG9wdDIgPSAnIDAgMCwwICc7XG4gICAgICAgICAgICBpZiAoTWF0aC5hYnMoc3dlZXBBbmdsZSkgPiBNYXRoLlBJKSB7XG4gICAgICAgICAgICAgICAgb3B0MSA9ICcgMCAxLDEgJztcbiAgICAgICAgICAgICAgICBvcHQyID0gJyAwIDEsMCAnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZCA9ICdNICcgKyBwMS54LnRvRml4ZWQoMykgKyAnLCcgKyBwMS55LnRvRml4ZWQoMyk7XG5cbiAgICAgICAgICAgIGQgKz0gJyBBICcgKyByYWRpdXMudG9GaXhlZCgzKSArICcsJyArIHJhZGl1cy50b0ZpeGVkKDMpICsgb3B0MTtcbiAgICAgICAgICAgIGQgKz0gcDIueC50b0ZpeGVkKDMpICsgJywnICsgcDIueS50b0ZpeGVkKDMpO1xuICAgICAgICAgICAgaWYgKGlzRnVsbCkge1xuICAgICAgICAgICAgICAgIGQgKz0gJyBNICcgKyBwMy54LnRvRml4ZWQoMykgKyAnLCcgKyBwMy55LnRvRml4ZWQoMyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGQgKz0gJyBMICcgKyBwMy54LnRvRml4ZWQoMykgKyAnLCcgKyBwMy55LnRvRml4ZWQoMyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkICs9ICcgQSAnICsgaW5uZXJSYWRpdXMudG9GaXhlZCgzKSArICcsJyArIGlubmVyUmFkaXVzLnRvRml4ZWQoMykgKyBvcHQyO1xuICAgICAgICAgICAgZCArPSBwNC54LnRvRml4ZWQoMykgKyAnLCcgKyBwNC55LnRvRml4ZWQoMyk7XG4gICAgICAgICAgICBpZiAoIWlzRnVsbCkge1xuICAgICAgICAgICAgICAgIGQgKz0gJyB6JztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCBkKTtcblxuICAgICAgICAgICAgaWYgKGNsaXBQYXRoKSB7XG4gICAgICAgICAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ2NsaXAtcGF0aCcsICd1cmwoIycgKyBjbGlwUGF0aCArICcpJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjbGFzc05hbWUpIHtcbiAgICAgICAgICAgICAgICBwYXRoLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBjbGFzc05hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fYXBwbHlTdHlsZShwYXRoLCBzdHlsZSk7XG5cbiAgICAgICAgICAgIHRoaXMuX2FwcGVuZENoaWxkKHBhdGgpO1xuXG4gICAgICAgICAgICByZXR1cm4gcGF0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIGRyYXdTdHJpbmcoczogc3RyaW5nLCBwdDogUG9pbnQsIGNsYXNzTmFtZT86IHN0cmluZywgc3R5bGU/OiBhbnkpOiBTVkdFbGVtZW50IHtcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gdGhpcy5fY3JlYXRlVGV4dChwdCwgcyk7XG4gICAgICAgICAgICBpZiAoY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICAgICAgdGV4dC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgY2xhc3NOYW1lKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fYXBwbHlTdHlsZSh0ZXh0LCBzdHlsZSk7XG5cbiAgICAgICAgICAgIHRoaXMuX2FwcGVuZENoaWxkKHRleHQpO1xuXG4gICAgICAgICAgICB2YXIgYmIgPSB0aGlzLl9nZXRCQm94KHRleHQpOy8vIHRleHQuZ2V0QkJveCgpO1xuICAgICAgICAgICAgdGV4dC5zZXRBdHRyaWJ1dGUoJ3knLCAocHQueSAtIChiYi55ICsgYmIuaGVpZ2h0IC0gcHQueSkpLnRvRml4ZWQoMSkpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGV4dDtcbiAgICAgICAgfVxuXG4gICAgICAgIGRyYXdTdHJpbmdSb3RhdGVkKHM6IHN0cmluZywgcHQ6IFBvaW50LCBjZW50ZXI6IFBvaW50LCBhbmdsZTogbnVtYmVyLCBjbGFzc05hbWU/OiBzdHJpbmcsIHN0eWxlPzogYW55KTogU1ZHRWxlbWVudCB7XG4gICAgICAgICAgICB2YXIgdGV4dCA9IHRoaXMuX2NyZWF0ZVRleHQocHQsIHMpO1xuICAgICAgICAgICAgaWYgKGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgICAgIHRleHQuc2V0QXR0cmlidXRlKCdjbGFzcycsIGNsYXNzTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9hcHBseVN0eWxlKHRleHQsIHN0eWxlKTtcblxuICAgICAgICAgICAgdmFyIGcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoU3ZnUmVuZGVyRW5naW5lLnN2Z05TLCAnZycpO1xuICAgICAgICAgICAgZy5zZXRBdHRyaWJ1dGUoJ3RyYW5zZm9ybScsICdyb3RhdGUoJyArIGFuZ2xlLnRvRml4ZWQoMSkgKyAnLCcgKyBjZW50ZXIueC50b0ZpeGVkKDEpICsgJywnICsgY2VudGVyLnkudG9GaXhlZCgxKSArICcpJyk7XG4gICAgICAgICAgICAvL2cuc2V0QXR0cmlidXRlKCd0cmFuc2Zvcm0nLCAncm90YXRlKCcgKyBhbmdsZS50b1N0cmluZygpICsgJywnICsgY2VudGVyLngudG9TdHJpbmcoKSArICcsJyArIGNlbnRlci55LnRvU3RyaW5nKCkgKyAnKScpO1xuICAgICAgICAgICAgZy5hcHBlbmRDaGlsZCh0ZXh0KTtcblxuXG4gICAgICAgICAgICAvL3RoaXMuX3N2Zy5hcHBlbmRDaGlsZChnKTtcbiAgICAgICAgICAgIHRoaXMuX2FwcGVuZENoaWxkKGcpO1xuICAgICAgICAgICAgdmFyIGJiID0gdGhpcy5fZ2V0QkJveCh0ZXh0KTsvLyB0ZXh0LmdldEJCb3goKTtcbiAgICAgICAgICAgIHRleHQuc2V0QXR0cmlidXRlKCd5JywgKHB0LnkgLSAoYmIueSArIGJiLmhlaWdodCAtIHB0LnkpKS50b0ZpeGVkKDEpKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIG1lYXN1cmVTdHJpbmcoczpzdHJpbmcsZm9udDpGb250KTpTaXple1xuICAgICAgICAgICByZXR1cm4gdGhpcy5fbWVhc3VyZVN0cmluZyhzLCBudWxsLCBudWxsLCB7ICdmb250LXNpemUnOiBmb250LmZvbnRTaXplLCAnZm9udC1mYW1pbHknOiBmb250LmZvbnRGYW1pbHkgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBfbWVhc3VyZVN0cmluZyhzOiBzdHJpbmcsIGNsYXNzTmFtZT86IHN0cmluZywgZ3JvdXBOYW1lPzogc3RyaW5nLCBzdHlsZT86IGFueSk6IFNpemUge1xuICAgICAgICAgICAgdmFyIHN6ID0gbmV3IFNpemUoMCwgMCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9mb250U2l6ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RleHQuc2V0QXR0cmlidXRlKCdmb250LXNpemUnLCB0aGlzLl9mb250U2l6ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5fZm9udEZhbWlseSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RleHQuc2V0QXR0cmlidXRlKCdmb250LWZhbWlseScsIHRoaXMuX2ZvbnRGYW1pbHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RleHQuc2V0QXR0cmlidXRlKCdjbGFzcycsIGNsYXNzTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZ3JvdXBOYW1lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGV4dEdyb3VwLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBncm91cE5hbWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9hcHBseVN0eWxlKHRoaXMuX3RleHQsIHN0eWxlKTtcblxuICAgICAgICAgICAgdGhpcy5fc2V0VGV4dCh0aGlzLl90ZXh0LCBzKTtcblxuICAgICAgICAgICAgdmFyIHJlY3QgPSB0aGlzLl9nZXRCQm94KHRoaXMuX3RleHQpOyAvLyB0aGlzLl90ZXh0LmdldEJCb3goKTtcbiAgICAgICAgICAgIHN6LndpZHRoID0gcmVjdC53aWR0aDtcbiAgICAgICAgICAgIHN6LmhlaWdodCA9IHJlY3QuaGVpZ2h0LTI7XG5cbiAgICAgICAgICAgIHRoaXMuX3RleHQucmVtb3ZlQXR0cmlidXRlKCdmb250LXNpemUnKTtcbiAgICAgICAgICAgIHRoaXMuX3RleHQucmVtb3ZlQXR0cmlidXRlKCdmb250LWZhbWlseScpO1xuICAgICAgICAgICAgdGhpcy5fdGV4dC5yZW1vdmVBdHRyaWJ1dGUoJ2NsYXNzJyk7XG5cbiAgICAgICAgICAgIGlmIChzdHlsZSkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBzdHlsZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90ZXh0LnJlbW92ZUF0dHJpYnV0ZSh0aGlzLl9kZUNhc2Uoa2V5KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl90ZXh0R3JvdXAucmVtb3ZlQXR0cmlidXRlKCdjbGFzcycpO1xuICAgICAgICAgICAgdGhpcy5fdGV4dC50ZXh0Q29udGVudCA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm4gc3o7XG4gICAgICAgIH1cblxuICAgICAgICBzdGFydEdyb3VwKGNsYXNzTmFtZT86IHN0cmluZywgY2xpcFBhdGg/OiBzdHJpbmcsIGNyZWF0ZVRyYW5zZm9ybTogYm9vbGVhbiA9IGZhbHNlKTogU1ZHRWxlbWVudCB7XG4gICAgICAgICAgICB2YXIgZ3JvdXAgPSA8U1ZHR0VsZW1lbnQ+ZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFN2Z1JlbmRlckVuZ2luZS5zdmdOUywgJ2cnKTtcbiAgICAgICAgICAgIGlmIChjbGFzc05hbWUpIHtcbiAgICAgICAgICAgICAgICBncm91cC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgY2xhc3NOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjbGlwUGF0aCkge1xuICAgICAgICAgICAgICAgIGdyb3VwLnNldEF0dHJpYnV0ZSgnY2xpcC1wYXRoJywgJ3VybCgjJyArIGNsaXBQYXRoICsgJyknKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2FwcGVuZENoaWxkKGdyb3VwKTtcbiAgICAgICAgICAgIGlmIChjcmVhdGVUcmFuc2Zvcm0pIHtcbiAgICAgICAgICAgICAgICBncm91cC50cmFuc2Zvcm0uYmFzZVZhbC5hcHBlbmRJdGVtKCg8U1ZHU1ZHRWxlbWVudD50aGlzLl9zdmcpLmNyZWF0ZVNWR1RyYW5zZm9ybSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2dyb3VwID0gZ3JvdXA7XG4gICAgICAgICAgICByZXR1cm4gZ3JvdXA7XG4gICAgICAgIH1cblxuICAgICAgICBlbmRHcm91cCgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9ncm91cCkge1xuICAgICAgICAgICAgICAgIHZhciBwYXJlbnQgPSA8RWxlbWVudD50aGlzLl9ncm91cC5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICAgIGlmIChwYXJlbnQgPT0gdGhpcy5fc3ZnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2dyb3VwID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ncm91cCA9IHBhcmVudDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBkcmF3SW1hZ2UoaW1hZ2VIcmVmOiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyLCB3OiBudW1iZXIsIGg6IG51bWJlcik6IFNWR0VsZW1lbnQge1xuICAgICAgICAgICAgdmFyIGltZyA9IDxTVkdHRWxlbWVudD5kb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoU3ZnUmVuZGVyRW5naW5lLnN2Z05TLCAnaW1hZ2UnKTtcblxuICAgICAgICAgICAgaW1nLnNldEF0dHJpYnV0ZU5TKFN2Z1JlbmRlckVuZ2luZS54bGlua05TLCAnaHJlZicsIGltYWdlSHJlZik7XG4gICAgICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCd4JywgeC50b0ZpeGVkKDEpKTtcbiAgICAgICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3knLCB5LnRvRml4ZWQoMSkpO1xuICAgICAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB3LnRvRml4ZWQoMSkpO1xuICAgICAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgaC50b0ZpeGVkKDEpKTtcblxuICAgICAgICAgICAgdGhpcy5fYXBwZW5kQ2hpbGQoaW1nKTtcblxuICAgICAgICAgICAgcmV0dXJuIGltZztcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2FwcGVuZENoaWxkKGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHZhciBncm91cCA9IHRoaXMuX2dyb3VwO1xuICAgICAgICAgICAgaWYgKCFncm91cCkge1xuICAgICAgICAgICAgICAgIGdyb3VwID0gdGhpcy5fc3ZnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ3JvdXAuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9jcmVhdGUoKSB7XG4gICAgICAgICAgICB0aGlzLl9zdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoU3ZnUmVuZGVyRW5naW5lLnN2Z05TLCAnc3ZnJyk7XG4gICAgICAgICAgICB0aGlzLl9kZWZzID0gPFNWR0RlZnNFbGVtZW50PmRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhTdmdSZW5kZXJFbmdpbmUuc3ZnTlMsICdkZWZzJyk7XG4gICAgICAgICAgICB0aGlzLl9zdmcuYXBwZW5kQ2hpbGQodGhpcy5fZGVmcyk7XG4gICAgICAgICAgICB0aGlzLl90ZXh0ID0gdGhpcy5fY3JlYXRlVGV4dChuZXcgUG9pbnQoLTEwMDAsIC0xMDAwKSwgJycpO1xuICAgICAgICAgICAgdGhpcy5fdGV4dEdyb3VwID0gPFNWR0dFbGVtZW50PmRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhTdmdSZW5kZXJFbmdpbmUuc3ZnTlMsICdnJyk7XG4gICAgICAgICAgICB0aGlzLl90ZXh0R3JvdXAuYXBwZW5kQ2hpbGQodGhpcy5fdGV4dCk7XG4gICAgICAgICAgICB0aGlzLl9zdmcuYXBwZW5kQ2hpbGQodGhpcy5fdGV4dEdyb3VwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3NldFRleHQoZWxlbWVudDogRWxlbWVudCwgczogc3RyaW5nKSB7XG4gICAgICAgICAgICB2YXIgdGV4dCA9IHMgPyBzLnRvU3RyaW5nKCkgOiBudWxsO1xuICAgICAgICAgICAgaWYgKHRleHQgJiYgdGV4dC5pbmRleE9mKCd0c3BhbicpID49IDApIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gbnVsbDtcblxuICAgICAgICAgICAgICAgICAgICAvLyBQYXJzZSB0aGUgbWFya3VwIGludG8gdmFsaWQgbm9kZXMuXG4gICAgICAgICAgICAgICAgICAgIHZhciBkWE1MID0gbmV3IERPTVBhcnNlcigpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vZFhNTC5hc3luYyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAvLyBXcmFwIHRoZSBtYXJrdXAgaW50byBhIFNWRyBub2RlIHRvIGVuc3VyZSBwYXJzaW5nIHdvcmtzLlxuICAgICAgICAgICAgICAgICAgICB2YXIgc1hNTCA9ICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiPicgKyB0ZXh0ICsgJzwvc3ZnPic7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdmdEb2NFbGVtZW50ID0gZFhNTC5wYXJzZUZyb21TdHJpbmcoc1hNTCwgJ3RleHQveG1sJykuZG9jdW1lbnRFbGVtZW50O1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIE5vdyB0YWtlIGVhY2ggbm9kZSwgaW1wb3J0IGl0IGFuZCBhcHBlbmQgdG8gdGhpcyBlbGVtZW50LlxuICAgICAgICAgICAgICAgICAgICB2YXIgY2hpbGROb2RlID0gc3ZnRG9jRWxlbWVudC5maXJzdENoaWxkO1xuXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChjaGlsZE5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudC5vd25lckRvY3VtZW50LmltcG9ydE5vZGUoY2hpbGROb2RlLCB0cnVlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZE5vZGUgPSBjaGlsZE5vZGUubmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvciBwYXJzaW5nIFhNTCBzdHJpbmcuJyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfY3JlYXRlVGV4dChwb3M6IFBvaW50LCB0ZXh0OiBzdHJpbmcpOiBTVkdUZXh0RWxlbWVudCB7XG4gICAgICAgICAgICB2YXIgdGV4dGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFN2Z1JlbmRlckVuZ2luZS5zdmdOUywgJ3RleHQnKTtcblxuICAgICAgICAgICAgdGhpcy5fc2V0VGV4dCh0ZXh0ZWwsIHRleHQpO1xuICAgICAgICAgICAgdGV4dGVsLnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMuX3RleHRGaWxsKTtcbiAgICAgICAgICAgIHRleHRlbC5zZXRBdHRyaWJ1dGUoJ3gnLCBwb3MueC50b0ZpeGVkKDEpKTtcbiAgICAgICAgICAgIHRleHRlbC5zZXRBdHRyaWJ1dGUoJ3knLCBwb3MueS50b0ZpeGVkKDEpKTtcbiAgICAgICAgICAgIC8vdGV4dGVsLnNldEF0dHJpYnV0ZSgneCcsIHBvcy54LnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgLy90ZXh0ZWwuc2V0QXR0cmlidXRlKCd5JywgcG9zLnkudG9TdHJpbmcoKSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9mb250U2l6ZSkge1xuICAgICAgICAgICAgICAgIHRleHRlbC5zZXRBdHRyaWJ1dGUoJ2ZvbnQtc2l6ZScsIHRoaXMuX2ZvbnRTaXplKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLl9mb250RmFtaWx5KSB7XG4gICAgICAgICAgICAgICAgdGV4dGVsLnNldEF0dHJpYnV0ZSgnZm9udC1mYW1pbHknLCB0aGlzLl9mb250RmFtaWx5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiA8U1ZHVGV4dEVsZW1lbnQ+dGV4dGVsO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfYXBwbHlTdHlsZShlbDogU1ZHRWxlbWVudCwgc3R5bGU6IGFueSkge1xuICAgICAgICAgICAgaWYgKHN0eWxlKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHN0eWxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZSh0aGlzLl9kZUNhc2Uoa2V5KSwgc3R5bGVba2V5XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfZGVDYXNlKHM6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgICAgICByZXR1cm4gcy5yZXBsYWNlKC9bQS1aXS9nLCBmdW5jdGlvbiAoYSkgeyByZXR1cm4gJy0nICsgYS50b0xvd2VyQ2FzZSgpIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfZ2V0QkJveCh0ZXh0OiBTVkdUZXh0RWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKFN2Z1JlbmRlckVuZ2luZS5faXNmZikge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0ZXh0LmdldEJCb3goKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHg6IDAsIHk6IDAsIHdpZHRoOiAwLCBoZWlnaHQ6IDAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0ZXh0LmdldEJCb3goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIlV0aWwudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkNhbnZhcy50c1wiIC8+XG5cbm5hbWVzcGFjZSBhbmRyb2lkLmdyYXBoaWNze1xuXG5cbiAgICBleHBvcnQgY2xhc3MgVGV4dFBhaW50e1xuICAgICAgICBwcml2YXRlIGNhbnZhczpDYW52YXM7XG4gICAgICAgIHByaXZhdGUgZm9udDpGb250O1xuICAgICAgICBjb25zdHJ1Y3RvcihjYW52YXM6Q2FudmFzLCBmb250OkZvbnQpe1xuICAgICAgICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XG4gICAgICAgICAgICB0aGlzLmZvbnQgPSBmb250O1xuICAgICAgICB9XG4gICAgICAgIG1lYXN1cmVTdHJpbmcoc3RyOnN0cmluZyk6U2l6ZXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhbnZhcy5tZWFzdXJlU3RyaW5nKHN0cix0aGlzLmZvbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG59IiwibmFtZXNwYWNlIGFuZHJvaWQudXRpbHtcbiAgICBleHBvcnQgY2xhc3MgQXJyYXlMaXN0PFQ+IHtcbiAgICAgICAgcHJpdmF0ZSBfYXJyYXk6VFtdID0gW107XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7XG5cbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgYWRkKHZhbHVlOlQpOnZvaWR7XG4gICAgICAgICAgICB0aGlzLl9hcnJheS5wdXNoKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgcmVtb3ZlPFQ+KHZhbHVlOmFueSk6dm9pZHtcbiAgICAgICAgICAgIGlmKHR5cGVvZih2YWx1ZSkgPT09ICdudW1iZXInKXtcbiAgICAgICAgICAgICAgICB0aGlzLl9hcnJheS5zcGxpY2UodmFsdWUpO1xuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuX2FycmF5LmluZGV4T2YodmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmKGluZGV4ID4wKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYXJyYXkuc3BsaWNlKGluZGV4LDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgY2xlYXIoKXtcbiAgICAgICAgICAgIHRoaXMuX2FycmF5Lmxlbmd0aCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIHNpemUoKTpudW1iZXJ7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYXJyYXkubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBnZXQoaW5kZXg6bnVtYmVyKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hcnJheVtpbmRleF07XG4gICAgICAgIH1cbiAgICB9XG59IiwibmFtZXNwYWNlIGFuZHJvaWQudXRpbHtcbiAgICBleHBvcnQgY2xhc3MgTWVzc2FnZXtcbiAgICAgICAgcHVibGljIHdoYXQgOm51bWJlciA9MDtcbiAgICAgICAgcHVibGljIGFyZ3M6e1trZXk6c3RyaW5nXTphbnl9PXt9O1xuICAgICAgICBjb25zdHJ1Y3Rvcih3aGF0PzpudW1iZXIpe1xuICAgICAgICAgICAgdGhpcy53aGF0ID13aGF0O1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHN0YXRpYyBvYnRhaW4od2hhdD86bnVtYmVyKTpNZXNzYWdle1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBNZXNzYWdlKHdoYXQpO1xuICAgICAgICB9XG5cbiAgICB9XG5cblxuXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIk1lc3NhZ2UudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkxvZy50c1wiIC8+XG5cbm5hbWVzcGFjZSBhbmRyb2lkLnV0aWwge1xuICAgIGV4cG9ydCBjbGFzcyBIYW5kbGVyIHtcbiAgICAgICAgcHJpdmF0ZSBfaGFubGRlck1hcCA9IHt9O1xuICAgICAgICBwcml2YXRlIF9xdWV1ZTphbnlbXT1bXTtcbiAgICAgICAgY29uc3RydWN0b3IoaGFuZGxlTWVzc2FnZToobXNnOk1lc3NhZ2UpPT52b2lkKXtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlTWVzc2FnZSA9IGhhbmRsZU1lc3NhZ2U7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIGhhbmRsZU1lc3NhZ2U6KG1zZzpNZXNzYWdlKT0+dm9pZDtcblxuICAgICAgICBwdWJsaWMgc2VuZE1lc3NhZ2UobXNnOiBNZXNzYWdlKTogYm9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZW5kTWVzc2FnZURlbGF5ZWQobXNnLCAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzZW5kTWVzc2FnZURlbGF5ZWQobXNnOiBNZXNzYWdlLCBkZWxheTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgICAgICBMb2cuZCgnc2VuZE1lc3NhZ2VEZWxheWVkIGRlbGF5ID0gJyArIGRlbGF5ICsgXCIgICBub3cgPVwiICsgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZW5kTWVzc2FnZUF0VGltZShtc2csIERhdGUubm93KCkgKyBkZWxheSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc2VuZE1lc3NhZ2VBdFRpbWUobXNnOiBNZXNzYWdlLCB1cHRpbWVNaWxsaXM6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5faGFubGRlck1hcFttc2cud2hhdF0gPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmhhbmRsZU1lc3NhZ2UobXNnKTtcbiAgICAgICAgICAgIH0sIHVwdGltZU1pbGxpcyAtIERhdGUubm93KCkpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgcmVtb3ZlTWVzc2FnZXMod2hhdDogbnVtYmVyKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5faGFubGRlck1hcFt3aGF0XSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHB1YmxpYyBvYnRhaW5NZXNzYWdlKHdoYXQ6IG51bWJlcik6IE1lc3NhZ2Uge1xuICAgICAgICAgICAgcmV0dXJuIE1lc3NhZ2Uub2J0YWluKHdoYXQpO1xuICAgICAgICB9XG4gICAgfVxufSIsIm5hbWVzcGFjZSBhbmRyb2lkLndpZGdldCB7XG4gICAgaW1wb3J0IFBhZGRpbmcgPSBhbmRyb2lkLmdyYXBoaWNzLlBhZGRpbmc7XG4gICAgaW1wb3J0IEFsaWduID0gYW5kcm9pZC5ncmFwaGljcy5BbGlnbjtcbiAgICBpbXBvcnQgR3Jhdml0eSA9IGFuZHJvaWQuZ3JhcGhpY3MuR3Jhdml0eTtcblxuXG4gICAgaW1wb3J0IEFsaWduRWxlbWVudCA9IGFuZHJvaWQuZ3JhcGhpY3MuQWxpZ25FbGVtZW50O1xuICAgIGltcG9ydCBNYXJnaW4gPSBhbmRyb2lkLmdyYXBoaWNzLk1hcmdpbjtcblxuICAgIGltcG9ydCBTaXplID0gYW5kcm9pZC5ncmFwaGljcy5TaXplO1xuICAgIGltcG9ydCBDYW52YXMgPSBhbmRyb2lkLmdyYXBoaWNzLkNhbnZhcztcbiAgICBpbXBvcnQgVmlld0dyb3VwID0gYW5kcm9pZC52aWV3LlZpZXdHcm91cDtcbiAgICBpbXBvcnQgVmlldyA9IGFuZHJvaWQudmlldy5WaWV3O1xuXG4gICAgaW1wb3J0IFBvaW50ID0gYW5kcm9pZC5ncmFwaGljcy5Qb2ludDtcbiAgICBpbXBvcnQgTWVhc3VyZVNwZWMgPSBhbmRyb2lkLnZpZXcuTWVhc3VyZVNwZWM7XG4gICAgaW1wb3J0IEZvbnQgPSBhbmRyb2lkLmdyYXBoaWNzLkZvbnQ7XG4gICAgaW1wb3J0IExheW91dEluZm8gPSBhbmRyb2lkLnZpZXcuTGF5b3V0SW5mbztcbiAgICBpbXBvcnQgTGF5b3V0UGFyYW1zID0gYW5kcm9pZC52aWV3LkxheW91dFBhcmFtcztcblxuICAgIGV4cG9ydCBlbnVtIFNjYWxlVHlwZSB7XG4gICAgICAgIE1BVFJJWCxcbiAgICAgICAgRklUX1hZLFxuICAgICAgICBGSVRfU1RBUlQsXG4gICAgICAgIEZJVF9DRU5URVIsXG4gICAgICAgIEZJVF9FTkQsXG4gICAgICAgIENFTlRFUixcbiAgICAgICAgQ0VOVEVSX0NST1AsXG4gICAgICAgIENFTlRFUl9JTlNJREVcbiAgICB9XG5cblxuXG5cblxuXG5cbiAgICBleHBvcnQgY2xhc3MgSW1hZ2VWaWV3IGV4dGVuZHMgVmlldyB7XG5cblxuXG5cbiAgICAgICAgcHJpdmF0ZSBiaXRtYXA6IEltYWdlRGF0YTtcblxuICAgICAgICBvbk1lYXN1cmUod2lkdGg6IE1lYXN1cmVTcGVjLCBoZWlnaHQ6IE1lYXN1cmVTcGVjLCBjYW52YXM6IENhbnZhcyk6IFNpemUge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLnNldE1lYXN1cmVkRGltZW5zaW9uKG5ldyBNZWFzdXJlU3BlYygpLG5ldyBNZWFzdXJlU3BlYygpKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIG9uRHJhdyhjYW52YXM6Q2FudmFzKTp2b2lke1xuICAgICAgICB9XG4gICAgfVxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi92aWV3L2ltcGxlbWVudGlvbi9WaWV3R3JvdXAudHNcIiAvPlxuXG5cblxubmFtZXNwYWNlIGFuZHJvaWQud2lkZ2V0IHtcbiAgICBpbXBvcnQgUGFkZGluZyA9IGFuZHJvaWQuZ3JhcGhpY3MuUGFkZGluZztcbiAgICBpbXBvcnQgR3Jhdml0eSA9IGFuZHJvaWQuZ3JhcGhpY3MuR3Jhdml0eTtcbiAgICBpbXBvcnQgUmVjdCA9IGFuZHJvaWQuZ3JhcGhpY3MuUmVjdDtcblxuXG4gICAgaW1wb3J0IEFsaWduRWxlbWVudCA9IGFuZHJvaWQuZ3JhcGhpY3MuQWxpZ25FbGVtZW50O1xuICAgIGltcG9ydCBNYXJnaW4gPSBhbmRyb2lkLmdyYXBoaWNzLk1hcmdpbjtcblxuICAgIGltcG9ydCBTaXplID0gYW5kcm9pZC5ncmFwaGljcy5TaXplO1xuICAgIGltcG9ydCBDYW52YXMgPSBhbmRyb2lkLmdyYXBoaWNzLkNhbnZhcztcbiAgICBpbXBvcnQgVmlld0dyb3VwID0gYW5kcm9pZC52aWV3LlZpZXdHcm91cDtcbiAgICBpbXBvcnQgVmlldyA9IGFuZHJvaWQudmlldy5WaWV3O1xuXG4gICAgaW1wb3J0IFBvaW50ID0gYW5kcm9pZC5ncmFwaGljcy5Qb2ludDtcbiAgICBpbXBvcnQgTWVhc3VyZVNwZWMgPSBhbmRyb2lkLnZpZXcuTWVhc3VyZVNwZWM7XG5cbiAgICBpbXBvcnQgT3JpZW50YXRpb24gPSBhbmRyb2lkLmdyYXBoaWNzLk9yaWVudGF0aW9uO1xuICAgIGltcG9ydCBMYXlvdXRQYXJhbXMgPSBhbmRyb2lkLnZpZXcuTGF5b3V0UGFyYW1zO1xuXG4gICAgZXhwb3J0IGNsYXNzIExpbmVhckxheW91dCBleHRlbmRzIFZpZXdHcm91cCB7XG4gICAgICAgIHByaXZhdGUgX29yaWVudGF0aW9uOiBPcmllbnRhdGlvbiA9IE9yaWVudGF0aW9uLkhvcml6b250YWw7XG4gICAgICAgIHB1YmxpYyBzZXRPcmllbnRhdGlvbihvcmllbnRhdGlvbjogT3JpZW50YXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuX29yaWVudGF0aW9uID0gb3JpZW50YXRpb247XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgZ2V0T3JpZW50YXRpb24oKTogT3JpZW50YXRpb24ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX29yaWVudGF0aW9uO1xuICAgICAgICB9XG5cblxuICAgICAgICBvbk1lYXN1cmUod2lkdGg6IE1lYXN1cmVTcGVjLCBoZWlnaHQ6IE1lYXN1cmVTcGVjLCBjYW52YXM6IENhbnZhcyk6IFNpemUge1xuICAgICAgICAgICAgaWYgKHRoaXMuX29yaWVudGF0aW9uID09PSBPcmllbnRhdGlvbi5Ib3Jpem9udGFsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWVhc3VyZUhvcml6b250YWwod2lkdGgsIGhlaWdodCwgY2FudmFzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWVhc3VyZVZlcnRpY2FsKHdpZHRoLCBoZWlnaHQsIGNhbnZhcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBtZWFzdXJlSG9yaXpvbnRhbCh3aWR0aDogTWVhc3VyZVNwZWMsIGhlaWdodDogTWVhc3VyZVNwZWMsIGNhbnZhczogQ2FudmFzKTogU2l6ZSB7XG4gICAgICAgICAgICB2YXIgc2l6ZTogU2l6ZTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIHZhciBpdGVtOiBWaWV3ID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICB2YXIgbHA6IExheW91dFBhcmFtcyA9IGl0ZW0ubGF5b3V0UGFyYW1zO1xuICAgICAgICAgICAgICAgIHZhciB3OiBudW1iZXIgPSBscC53aWR0aDtcbiAgICAgICAgICAgICAgICB2YXIgaDogbnVtYmVyID0gbHAuaGVpZ2h0O1xuICAgICAgICAgICAgICAgIGlmIChscC5oZWlnaHRNb2RlID09PSBMYXlvdXRQYXJhbXMuTUFUQ0hfUEFSRU5UKSB7XG4gICAgICAgICAgICAgICAgICAgIGggPSBoZWlnaHQudmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChscC53aWR0aE1vZGUgPT09IExheW91dFBhcmFtcy5NQVRDSF9QQVJFTlQpIHtcbiAgICAgICAgICAgICAgICAgICAgdyA9IHdpZHRoLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgcyA9IGl0ZW0ub25NZWFzdXJlKG5ldyBNZWFzdXJlU3BlYyh3LCBscC53aWR0aE1vZGUpLCBuZXcgTWVhc3VyZVNwZWMoaCwgbHAuaGVpZ2h0TW9kZSksIGNhbnZhcyk7XG4gICAgICAgICAgICAgICAgaWYgKHNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgc2l6ZS53aWR0aCArPSBzLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2l6ZS5oZWlnaHQgPCBzLmhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZS5oZWlnaHQgPSBzLmhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNpemUgPSBzLmNsb25lKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaWYgKHNpemUud2lkdGggPiB3aWR0aC52YWx1ZSkge1xuICAgICAgICAgICAgLy8gICAgIHNpemUud2lkdGggPSB3aWR0aC52YWx1ZTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIC8vIGlmIChzaXplLmhlaWdodCA+IGhlaWdodC52YWx1ZSkge1xuICAgICAgICAgICAgLy8gICAgIHNpemUuaGVpZ2h0ID0gaGVpZ2h0LnZhbHVlO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgaWYgKHRoaXMubGF5b3V0UGFyYW1zLndpZHRoTW9kZSA9PT0gTGF5b3V0UGFyYW1zLkVYQUNUTFkpIHtcbiAgICAgICAgICAgICAgICBzaXplLndpZHRoID0gdGhpcy5sYXlvdXRQYXJhbXMud2lkdGg7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubGF5b3V0UGFyYW1zLndpZHRoTW9kZSA9PT0gTGF5b3V0UGFyYW1zLk1BVENIX1BBUkVOVCkge1xuICAgICAgICAgICAgICAgIHNpemUud2lkdGggPSB3aWR0aC5nZXRNZWFzdXJlVmFsdWUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmxheW91dFBhcmFtcy5oZWlnaHRNb2RlID09PSBMYXlvdXRQYXJhbXMuRVhBQ1RMWSkge1xuICAgICAgICAgICAgICAgIHNpemUuaGVpZ2h0ID0gdGhpcy5sYXlvdXRQYXJhbXMuaGVpZ2h0O1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmxheW91dFBhcmFtcy5oZWlnaHRNb2RlID09PSBMYXlvdXRQYXJhbXMuTUFUQ0hfUEFSRU5UKSB7XG4gICAgICAgICAgICAgICAgc2l6ZS5oZWlnaHQgPSBoZWlnaHQuZ2V0TWVhc3VyZVZhbHVlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNldE1lYXN1cmVkRGltZW5zaW9uKG5ldyBNZWFzdXJlU3BlYyhzaXplLndpZHRoLCBMYXlvdXRQYXJhbXMuRVhBQ1RMWSksIG5ldyBNZWFzdXJlU3BlYyhzaXplLmhlaWdodCwgTGF5b3V0UGFyYW1zLkVYQUNUTFkpKTtcbiAgICAgICAgICAgIHJldHVybiBzaXplO1xuICAgICAgICB9XG5cbiAgICAgICAgbWVhc3VyZVZlcnRpY2FsKHdpZHRoOiBNZWFzdXJlU3BlYywgaGVpZ2h0OiBNZWFzdXJlU3BlYywgY2FudmFzOiBDYW52YXMpOiBTaXplIHtcbiAgICAgICAgICAgIHZhciBzaXplOiBTaXplO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGl0ZW06IFZpZXcgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgIHZhciBscDogTGF5b3V0UGFyYW1zID0gaXRlbS5sYXlvdXRQYXJhbXM7XG4gICAgICAgICAgICAgICAgdmFyIHc6IG51bWJlciA9IGxwLndpZHRoO1xuICAgICAgICAgICAgICAgIHZhciBoOiBudW1iZXIgPSBscC5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgaWYgKGxwLmhlaWdodE1vZGUgPT09IExheW91dFBhcmFtcy5NQVRDSF9QQVJFTlQpIHtcbiAgICAgICAgICAgICAgICAgICAgaCA9IGhlaWdodC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGxwLndpZHRoTW9kZSA9PT0gTGF5b3V0UGFyYW1zLk1BVENIX1BBUkVOVCkge1xuICAgICAgICAgICAgICAgICAgICB3ID0gd2lkdGgudmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBzID0gaXRlbS5vbk1lYXN1cmUobmV3IE1lYXN1cmVTcGVjKHcsIGxwLndpZHRoTW9kZSksIG5ldyBNZWFzdXJlU3BlYyhoLCBscC5oZWlnaHRNb2RlKSwgY2FudmFzKTtcbiAgICAgICAgICAgICAgICBpZiAoc2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICBzaXplLmhlaWdodCArPSBzLmhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNpemUud2lkdGggPCBzLndpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplLndpZHRoID0gcy53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNpemUgPSBzLmNsb25lKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaWYgKHNpemUud2lkdGggPiB3aWR0aC52YWx1ZSkge1xuICAgICAgICAgICAgLy8gICAgIHNpemUud2lkdGggPSB3aWR0aC52YWx1ZTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIC8vIGlmIChzaXplLmhlaWdodCA+IGhlaWdodC52YWx1ZSkge1xuICAgICAgICAgICAgLy8gICAgIHNpemUuaGVpZ2h0ID0gaGVpZ2h0LnZhbHVlO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgaWYgKHRoaXMubGF5b3V0UGFyYW1zLndpZHRoTW9kZSA9PT0gTGF5b3V0UGFyYW1zLkVYQUNUTFkpIHtcbiAgICAgICAgICAgICAgICBzaXplLndpZHRoID0gdGhpcy5sYXlvdXRQYXJhbXMud2lkdGg7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubGF5b3V0UGFyYW1zLndpZHRoTW9kZSA9PT0gTGF5b3V0UGFyYW1zLk1BVENIX1BBUkVOVCkge1xuICAgICAgICAgICAgICAgIHNpemUud2lkdGggPSB3aWR0aC5nZXRNZWFzdXJlVmFsdWUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmxheW91dFBhcmFtcy5oZWlnaHRNb2RlID09PSBMYXlvdXRQYXJhbXMuRVhBQ1RMWSkge1xuICAgICAgICAgICAgICAgIHNpemUuaGVpZ2h0ID0gdGhpcy5sYXlvdXRQYXJhbXMuaGVpZ2h0O1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmxheW91dFBhcmFtcy5oZWlnaHRNb2RlID09PSBMYXlvdXRQYXJhbXMuTUFUQ0hfUEFSRU5UKSB7XG4gICAgICAgICAgICAgICAgc2l6ZS5oZWlnaHQgPSBoZWlnaHQuZ2V0TWVhc3VyZVZhbHVlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNldE1lYXN1cmVkRGltZW5zaW9uKG5ldyBNZWFzdXJlU3BlYyhzaXplLndpZHRoLCBMYXlvdXRQYXJhbXMuRVhBQ1RMWSksIG5ldyBNZWFzdXJlU3BlYyhzaXplLmhlaWdodCwgTGF5b3V0UGFyYW1zLkVYQUNUTFkpKTtcbiAgICAgICAgICAgIHJldHVybiBzaXplO1xuICAgICAgICB9XG4gICAgICAgIG9uTGF5b3V0KGw6IG51bWJlciwgdDogbnVtYmVyLCByOiBudW1iZXIsIGI6IG51bWJlciwgY2FudmFzOiBDYW52YXMpOiB2b2lkIHtcbiAgICAgICAgICAgIC8vIHRoaXMubGF5b3V0SW5mby5yZXNldChsLCB0LCByLCBiLCB0aGlzLnBhZGRpbmcsIDApO1xuICAgICAgICAgICAgc3VwZXIub25MYXlvdXQobCx0LHIsYixjYW52YXMpO1xuICAgICAgICAgICAgdmFyIGlubmVycmVjdDogUmVjdCA9IHRoaXMubGF5b3V0SW5mby5pbm5lcnJlY3Q7XG4gICAgICAgICAgICBpZiAodGhpcy5fb3JpZW50YXRpb24gPT09IE9yaWVudGF0aW9uLkhvcml6b250YWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxheW91dEhvcml6b250YWwoaW5uZXJyZWN0LmxlZnQsIGlubmVycmVjdC50b3AsIGlubmVycmVjdC5yaWdodCwgaW5uZXJyZWN0LmJvdHRvbSxjYW52YXMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxheW91dFZlcnRpY2FsKGlubmVycmVjdC5sZWZ0LCBpbm5lcnJlY3QudG9wLCBpbm5lcnJlY3QucmlnaHQsIGlubmVycmVjdC5ib3R0b20sY2FudmFzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxheW91dEhvcml6b250YWwobDogbnVtYmVyLCB0OiBudW1iZXIsIHI6IG51bWJlciwgYjogbnVtYmVyLCBjYW52YXM6IENhbnZhcyk6IHZvaWQge1xuICAgICAgICAgICAgbGV0IHZpZXdJdGVtOiBWaWV3O1xuICAgICAgICAgICAgbGV0IG06IE1hcmdpbjtcbiAgICAgICAgICAgIGxldCBzdGFydHBvaW50OiBQb2ludCA9IG5ldyBQb2ludChsLCB0KTtcbiAgICAgICAgICAgIGxldCBsZW5ndGg6IG51bWJlciA9IHRoaXMuY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICAgICAgbGV0IGNoaWxkV2lkdGg6IG51bWJlciA9IDA7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICB2aWV3SXRlbSA9IHRoaXMuY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgbSA9IHZpZXdJdGVtLmxheW91dFBhcmFtcy5tYXJnaW47XG4gICAgICAgICAgICAgICAgY2hpbGRXaWR0aCArPSB2aWV3SXRlbS53aWR0aCArIChtLm1hcmdpbkxlZnQgKyBtLm1hcmdpblJpZ2h0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZpZXdJdGVtID0gbnVsbDtcbiAgICAgICAgICAgIG0gPSBudWxsO1xuICAgICAgICAgICAgdmFyIHN0YXJ0T2Zmc2V0OiBudW1iZXIgPSAwO1xuICAgICAgICAgICAgaWYgKGNoaWxkV2lkdGggPCAociAtIGwpKSB7XG4gICAgICAgICAgICAgICAgc3RhcnRPZmZzZXQgPSAoKHIgLSBsKSAtIGNoaWxkV2lkdGgpIC8gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIHZpZXdJdGVtID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICBtID0gdmlld0l0ZW0ubGF5b3V0UGFyYW1zLm1hcmdpbjtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHZpZXdJdGVtLmdyYXZpdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBHcmF2aXR5LkxlZnQ6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgR3Jhdml0eS5BdXRvOlxuXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBHcmF2aXR5LlJpZ2h0OlxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgR3Jhdml0eS5Ub3A6XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydHBvaW50LnkgPSB0O1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgR3Jhdml0eS5Cb3R0b206XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydHBvaW50LnkgPSBiIC0gdmlld0l0ZW0uaGVpZ2h0IC0gbS5tYXJnaW5Cb3R0b207XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBHcmF2aXR5LkNlbnRlcjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0cG9pbnQueSA9IHQgKyAoKGIgLSB0IC0gdmlld0l0ZW0uaGVpZ2h0KSA+IDAgPyBiIC0gdCAtIHZpZXdJdGVtLmhlaWdodCA6IDApIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdGFydHBvaW50Lm9mZnNldChtLm1hcmdpbkxlZnQgPiAwID8gbS5tYXJnaW5MZWZ0IDogMCwgbS5tYXJnaW5Ub3AgPiAwID8gbS5tYXJnaW5Ub3AgOiAwKTtcbiAgICAgICAgICAgICAgICB2aWV3SXRlbS5vbkxheW91dChzdGFydHBvaW50LngsIHN0YXJ0cG9pbnQueSwgc3RhcnRwb2ludC54ICsgdmlld0l0ZW0ud2lkdGgsIHN0YXJ0cG9pbnQueSArIHZpZXdJdGVtLmhlaWdodCxjYW52YXMpO1xuICAgICAgICAgICAgICAgIHN0YXJ0cG9pbnQub2Zmc2V0KHZpZXdJdGVtLndpZHRoICsgKG0ubWFyZ2luUmlnaHQgPiAwID8gbS5tYXJnaW5SaWdodCA6IDApLCAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgbGF5b3V0VmVydGljYWwobDogbnVtYmVyLCB0OiBudW1iZXIsIHI6IG51bWJlciwgYjogbnVtYmVyLCBjYW52YXM6IENhbnZhcyk6IHZvaWQge1xuICAgICAgICAgICAgbGV0IHZpZXdJdGVtOiBWaWV3O1xuICAgICAgICAgICAgbGV0IG06IE1hcmdpbjtcbiAgICAgICAgICAgIGxldCBzdGFydHBvaW50OiBQb2ludCA9IG5ldyBQb2ludChsLCB0KTtcbiAgICAgICAgICAgIGxldCBsZW5ndGg6IG51bWJlciA9IHRoaXMuY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICAgICAgbGV0IGNoaWxkSGVpZ2h0OiBudW1iZXIgPSAwO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgdmlld0l0ZW0gPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgIG0gPSB2aWV3SXRlbS5sYXlvdXRQYXJhbXMubWFyZ2luO1xuICAgICAgICAgICAgICAgIGNoaWxkSGVpZ2h0ICs9IHZpZXdJdGVtLmhlaWdodCArIChtLm1hcmdpblRvcCArIG0ubWFyZ2luQm90dG9tKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZpZXdJdGVtID0gbnVsbDtcbiAgICAgICAgICAgIG0gPSBudWxsO1xuICAgICAgICAgICAgdmFyIHN0YXJ0T2Zmc2V0OiBudW1iZXIgPSAwO1xuICAgICAgICAgICAgaWYgKGNoaWxkSGVpZ2h0IDwgKGIgLSB0KSkge1xuICAgICAgICAgICAgICAgIHN0YXJ0T2Zmc2V0ID0gKChiIC0gdCkgLSBjaGlsZEhlaWdodCkgLyAyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgdmlld0l0ZW0gPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgIG0gPSB2aWV3SXRlbS5sYXlvdXRQYXJhbXMubWFyZ2luO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAodmlld0l0ZW0uZ3Jhdml0eSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIEdyYXZpdHkuTGVmdDpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBHcmF2aXR5LkF1dG86XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydHBvaW50LnggPSBsO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgR3Jhdml0eS5SaWdodDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0cG9pbnQueCA9IHIgLSB2aWV3SXRlbS53aWR0aCAtIG0ubWFyZ2luUmlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBHcmF2aXR5LlRvcDpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHN0YXJ0cG9pbnQueSA9IHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBHcmF2aXR5LkJvdHRvbTpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHN0YXJ0cG9pbnQueSA9IGItdmlld0l0ZW0uaGVpZ2h0LW0ubWFyZ2luQm90dG9tO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgR3Jhdml0eS5DZW50ZXI6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzdGFydHBvaW50LnkgPSB0KygoYi10LXZpZXdJdGVtLmhlaWdodCk+MD9iLXQtdmlld0l0ZW0uaGVpZ2h0OjApLzI7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydHBvaW50LnggPSBsICsgKChyIC0gbCAtIHZpZXdJdGVtLndpZHRoKSA+IDAgPyByIC0gbCAtIHZpZXdJdGVtLndpZHRoIDogMCkgLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0YXJ0cG9pbnQub2Zmc2V0KG0ubWFyZ2luTGVmdCA+IDAgPyBtLm1hcmdpbkxlZnQgOiAwLCBtLm1hcmdpblRvcCA+IDAgPyBtLm1hcmdpblRvcCA6IDApO1xuICAgICAgICAgICAgICAgIHZpZXdJdGVtLm9uTGF5b3V0KHN0YXJ0cG9pbnQueCwgc3RhcnRwb2ludC55LCBzdGFydHBvaW50LnggKyB2aWV3SXRlbS53aWR0aCwgc3RhcnRwb2ludC55ICsgdmlld0l0ZW0uaGVpZ2h0LGNhbnZhcyk7XG4gICAgICAgICAgICAgICAgLy8gc3RhcnRwb2ludC50cmFuc2xhdGUodmlld0l0ZW0ud2lkdGggKyAobS5tYXJnaW5SaWdodD4wPyBtLm1hcmdpblJpZ2h0OjApLDApO1xuICAgICAgICAgICAgICAgIHN0YXJ0cG9pbnQub2Zmc2V0KDAsIHZpZXdJdGVtLmhlaWdodCArIChtLm1hcmdpbkJvdHRvbSA+IDAgPyBtLm1hcmdpbkJvdHRvbSA6IDApKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdmlldy9pbXBsZW1lbnRpb24vVmlld0dyb3VwLnRzXCIgLz5cblxuXG5cbm5hbWVzcGFjZSBhbmRyb2lkLndpZGdldCB7XG5cbiAgICBpbXBvcnQgUGFkZGluZyA9IGFuZHJvaWQuZ3JhcGhpY3MuUGFkZGluZztcbiAgICBpbXBvcnQgR3Jhdml0eSA9IGFuZHJvaWQuZ3JhcGhpY3MuR3Jhdml0eTtcbiAgICBpbXBvcnQgUmVjdCA9IGFuZHJvaWQuZ3JhcGhpY3MuUmVjdDtcbiAgICBpbXBvcnQgQWxpZ25FbGVtZW50ID0gYW5kcm9pZC5ncmFwaGljcy5BbGlnbkVsZW1lbnQ7XG4gICAgaW1wb3J0IE1hcmdpbiA9IGFuZHJvaWQuZ3JhcGhpY3MuTWFyZ2luO1xuICAgIGltcG9ydCBTaXplID0gYW5kcm9pZC5ncmFwaGljcy5TaXplO1xuICAgIGltcG9ydCBDYW52YXMgPSBhbmRyb2lkLmdyYXBoaWNzLkNhbnZhcztcbiAgICBpbXBvcnQgVmlld0dyb3VwID0gYW5kcm9pZC52aWV3LlZpZXdHcm91cDtcbiAgICBpbXBvcnQgVmlldyA9IGFuZHJvaWQudmlldy5WaWV3O1xuICAgIGltcG9ydCBQb2ludCA9IGFuZHJvaWQuZ3JhcGhpY3MuUG9pbnQ7XG4gICAgaW1wb3J0IE1lYXN1cmVTcGVjID0gYW5kcm9pZC52aWV3Lk1lYXN1cmVTcGVjO1xuICAgIGltcG9ydCBPcmllbnRhdGlvbiA9IGFuZHJvaWQuZ3JhcGhpY3MuT3JpZW50YXRpb247XG4gICAgaW1wb3J0IExheW91dFBhcmFtcyA9IGFuZHJvaWQudmlldy5MYXlvdXRQYXJhbXM7XG4gICAgaW1wb3J0IENvbnRleHQgPSBhbmRyb2lkLmFwcC5Db250ZXh0O1xuICAgIGltcG9ydCBEYXRhU2V0T2JzZXJ2ZXIgPSBhbmRyb2lkLmRhdGFiYXNlLkRhdGFTZXRPYnNlcnZlcjtcbiAgICBpbXBvcnQgQWRhcHRlciA9IGFuZHJvaWQuYWRhcHRlci5BZGFwdGVyO1xuICAgIGV4cG9ydCBjbGFzcyBMaXN0VmlldyBleHRlbmRzIFZpZXdHcm91cHtcbiAgICAgICAgY29uc3RydWN0b3IoY29udGV4dDpDb250ZXh0KXtcbiAgICAgICAgICAgIHN1cGVyKGNvbnRleHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0QWRhcHRlcihhZGFwdGVyOkFkYXB0ZXIpe1xuXG4gICAgICAgIH1cbiAgICB9XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3ZpZXcvaW1wbGVtZW50aW9uL1ZpZXdHcm91cC50c1wiIC8+XG5cblxuXG5uYW1lc3BhY2UgYW5kcm9pZC53aWRnZXQge1xuICAgIGltcG9ydCBQYWRkaW5nID0gYW5kcm9pZC5ncmFwaGljcy5QYWRkaW5nO1xuICAgIGltcG9ydCBHcmF2aXR5ID0gYW5kcm9pZC5ncmFwaGljcy5HcmF2aXR5O1xuICAgIGltcG9ydCBSZWN0ID0gYW5kcm9pZC5ncmFwaGljcy5SZWN0O1xuICAgIGltcG9ydCBBbGlnbkVsZW1lbnQgPSBhbmRyb2lkLmdyYXBoaWNzLkFsaWduRWxlbWVudDtcbiAgICBpbXBvcnQgTWFyZ2luID0gYW5kcm9pZC5ncmFwaGljcy5NYXJnaW47XG4gICAgaW1wb3J0IFNpemUgPSBhbmRyb2lkLmdyYXBoaWNzLlNpemU7XG4gICAgaW1wb3J0IENhbnZhcyA9IGFuZHJvaWQuZ3JhcGhpY3MuQ2FudmFzO1xuICAgIGltcG9ydCBWaWV3R3JvdXAgPSBhbmRyb2lkLnZpZXcuVmlld0dyb3VwO1xuICAgIGltcG9ydCBWaWV3ID0gYW5kcm9pZC52aWV3LlZpZXc7XG4gICAgaW1wb3J0IFBvaW50ID0gYW5kcm9pZC5ncmFwaGljcy5Qb2ludDtcbiAgICBpbXBvcnQgTWVhc3VyZVNwZWMgPSBhbmRyb2lkLnZpZXcuTWVhc3VyZVNwZWM7XG4gICAgaW1wb3J0IE9yaWVudGF0aW9uID0gYW5kcm9pZC5ncmFwaGljcy5PcmllbnRhdGlvbjtcbiAgICBpbXBvcnQgTGF5b3V0UGFyYW1zID0gYW5kcm9pZC52aWV3LkxheW91dFBhcmFtcztcbiAgICBpbXBvcnQgTGF5b3V0SW5mbyA9IGFuZHJvaWQudmlldy5MYXlvdXRJbmZvO1xuICAgIGltcG9ydCBDb250ZXh0ID0gYW5kcm9pZC5hcHAuQ29udGV4dDtcbiAgICBpbXBvcnQgTW90aW9uRXZlbnQgPSBhbmRyb2lkLnZpZXcuZXZlbnQuTW90aW9uRXZlbnQ7XG5cblxuXG4gICAgZXhwb3J0IGNsYXNzIFNjcm9sbExheW91dCBleHRlbmRzIEZyYW1lTGF5b3V0IHtcblxuICAgICAgICBwcml2YXRlIF9yZWFsTGF5b3V0SW5mbzogTGF5b3V0SW5mbztcblxuICAgICAgICBjb25zdHJ1Y3Rvcihjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgICAgICAgICBzdXBlcihjb250ZXh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9uTWVhc3VyZSh3aWR0aDogTWVhc3VyZVNwZWMsIGhlaWdodDogTWVhc3VyZVNwZWMsIGNhbnZhczogQ2FudmFzKTogU2l6ZSB7XG4gICAgICAgICAgICBEZWJ1Zy5hc3NlcnQodGhpcy5jaGlsZHJlbi5sZW5ndGggPT09IDEsIFwiVGhlcmUgaXMgb25seSBvbmUgdmlldyB0aGF0IGNhbiBiZSBhZGRlZCB0byB0aGUgc2Nyb2xsIGxheW91dCBcIik7XG4gICAgICAgICAgICByZXR1cm4gc3VwZXIub25NZWFzdXJlKHdpZHRoLCBoZWlnaHQsIGNhbnZhcyk7XG4gICAgICAgIH1cblxuICAgICAgICBvbkxheW91dChsOiBudW1iZXIsIHQ6IG51bWJlciwgcjogbnVtYmVyLCBiOiBudW1iZXIsIGNhbnZhczogQ2FudmFzKTogdm9pZCB7XG4gICAgICAgICAgICBzdXBlci5vbkxheW91dChsLCB0LCByLCBiLCBjYW52YXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBsYXN0UHQ6IFBvaW50O1xuICAgICAgICBwdWJsaWMgb25JbnRlcmNlcHRNb3VzZUV2ZW50KGV2ZW50OiBNb3Rpb25FdmVudCk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCI9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAgb25JbnRlcmNlcHRNb3VzZUV2ZW50IFwiICsgZXZlbnQudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAvLyAvLyByZXR1cm4gc3VwZXIub25JbnRlcmNlcHRNb3VzZUV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgIC8vIGxldCByZXN1bHQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgICAgIC8vIHN3aXRjaCAoZXZlbnQuYWN0aW9uKSB7XG4gICAgICAgICAgICAvLyAgICAgY2FzZSBNb3Rpb25FdmVudC5BQ1RJT05fTU9VU0VfT046XG4gICAgICAgICAgICAvLyAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgICAgICAvLyAgICAgICAgIHRoaXMubGFzdFB0ID0gbmV3IFBvaW50KGV2ZW50LngsIGV2ZW50LnkpO1xuICAgICAgICAgICAgLy8gICAgIGNhc2UgTW90aW9uRXZlbnQuQUNUSU9OX01PVVNFX01PVkU6XG4gICAgICAgICAgICAvLyAgICAgICAgIGlmIChNYXRoLmFicyhldmVudC55IC0gdGhpcy5sYXN0UHQueSkgPiBNYXRoLmFicyhldmVudC54IC0gdGhpcy5sYXN0UHQueCkpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgICAgICAvLyAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLmxhc3RQdCA9IG5ldyBQb2ludChldmVudC54LCBldmVudC55KTtcbiAgICAgICAgICAgIC8vICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiSW50ZXJjZXB0IFJlc3VsdCAgXCIgKyByZXN1bHQpO1xuICAgICAgICAgICAgLy8gcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHByaXZhdGUgc3RhcnRQdDogUG9pbnQ7XG4gICAgICAgIHB1YmxpYyBvbk1vdXNlRXZlbnQoZXZlbnQ6IE1vdGlvbkV2ZW50KTogYm9vbGVhbiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9uTW91c2VFdmVudCBcIiArIGV2ZW50LnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRQdDogUG9pbnQgPSBuZXcgUG9pbnQoZXZlbnQueCwgZXZlbnQueSk7XG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmFjdGlvbikge1xuICAgICAgICAgICAgICAgIGNhc2UgTW90aW9uRXZlbnQuQUNUSU9OX01PVVNFX1dIRUVMOlxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGFydFB0ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoaWxkcmVuWzBdLmhlaWdodCA+IHRoaXMud2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQuZGVsdGFZICE9IG51bGwgJiYgZXZlbnQuZGVsdGFZICE9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGV0IG9mZnNldD0oY3VycmVudFB0LnktdGhpcy5zdGFydFB0LnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2Zmc2V0ID0gLWV2ZW50LmRlbHRhWTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihvZmZzZXQgPiAwICAmJiB0aGlzLmNoaWxkcmVuWzBdLnRvcCA+PXRoaXMudG9wKXtyZXR1cm47fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihvZmZzZXQgPCAwICAmJiB0aGlzLmNoaWxkcmVuWzBdLmJvdHRvbSA8PSB0aGlzLmJvdHRvbSl7cmV0dXJuO31cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuWzBdLm9mZnNldCgwLG9mZnNldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuaW52YWxpZGF0ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0TGF5b3V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuaW52YWxpZGF0ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3RvcCcgKyB0aGlzLmNoaWxkcmVuWzBdLnRvcCArXCIgLCBib3R0b20gIFwiICsgdGhpcy5jaGlsZHJlblswXS5ib3R0b20pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0UHQgPSBjdXJyZW50UHQuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgTW90aW9uRXZlbnQuQUNUSU9OX01PVVNFX09VVDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRQdCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgIH1cbn0iLCJuYW1lc3BhY2UgYW5kcm9pZC53aWRnZXR7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgZXhwb3J0IGNsYXNzIFNjcm9sbGVye1xuICAgICAgICBcbiAgICB9XG4gICAgZXhwb3J0IGNsYXNzIEZhc3RTY3JvbGxlcntcblxuICAgIH1cbn0iLCJuYW1lc3BhY2UgYW5kcm9pZC53aWRnZXQge1xuICAgIGltcG9ydCBQYWRkaW5nID0gYW5kcm9pZC5ncmFwaGljcy5QYWRkaW5nO1xuICAgIGltcG9ydCBBbGlnbiA9IGFuZHJvaWQuZ3JhcGhpY3MuQWxpZ247XG4gICAgaW1wb3J0IEdyYXZpdHkgPSBhbmRyb2lkLmdyYXBoaWNzLkdyYXZpdHk7XG5cblxuICAgIGltcG9ydCBBbGlnbkVsZW1lbnQgPSBhbmRyb2lkLmdyYXBoaWNzLkFsaWduRWxlbWVudDtcbiAgICBpbXBvcnQgTWFyZ2luID0gYW5kcm9pZC5ncmFwaGljcy5NYXJnaW47XG5cbiAgICBpbXBvcnQgU2l6ZSA9IGFuZHJvaWQuZ3JhcGhpY3MuU2l6ZTtcbiAgICBpbXBvcnQgQ2FudmFzID0gYW5kcm9pZC5ncmFwaGljcy5DYW52YXM7XG4gICAgaW1wb3J0IFZpZXdHcm91cCA9IGFuZHJvaWQudmlldy5WaWV3R3JvdXA7XG4gICAgaW1wb3J0IFZpZXcgPSBhbmRyb2lkLnZpZXcuVmlldztcblxuICAgIGltcG9ydCBQb2ludCA9IGFuZHJvaWQuZ3JhcGhpY3MuUG9pbnQ7XG4gICAgaW1wb3J0IE1lYXN1cmVTcGVjID0gYW5kcm9pZC52aWV3Lk1lYXN1cmVTcGVjO1xuICAgIGltcG9ydCBGb250ID0gYW5kcm9pZC5ncmFwaGljcy5Gb250O1xuICAgIGltcG9ydCBMYXlvdXRJbmZvICA9IGFuZHJvaWQudmlldy5MYXlvdXRJbmZvO1xuICAgIGltcG9ydCBMYXlvdXRQYXJhbXMgPSBhbmRyb2lkLnZpZXcuTGF5b3V0UGFyYW1zO1xuICAgIGV4cG9ydCBlbnVtIEVsbGlwc2l6ZXtcblxuICAgIH1cbiAgICBleHBvcnQgY2xhc3MgVGV4dFZpZXcgZXh0ZW5kcyBWaWV3e1xuICAgICAgICBwcml2YXRlIHRleHQgOnN0cmluZztcbiAgICAgICAgcHJpdmF0ZSBmb250IDpGb250O1xuICAgICAgICBwcml2YXRlIF9lbGxpcHNpemU6RWxsaXBzaXplO1xuICAgICAgICBwcml2YXRlIF9tYXhXaWR0aDpudW1iZXI7XG4gICAgICAgIHByaXZhdGUgX2xpbmVzcGFjZTpudW1iZXI7XG4gICAgICAgIG9uRHJhdyhjYW52YXM6Q2FudmFzKTp2b2lkeyAgICAgICAgICAgIFxuICAgICAgICAgICAgc3VwZXIub25EcmF3KGNhbnZhcyk7XG4gICAgICAgICAgICBjYW52YXMuZHJhd1RleHQodGhpcy50ZXh0LHRoaXMubGF5b3V0SW5mby5pbm5lcnJlY3Quc3RhcnRQb2ludCx0aGlzLmZvbnQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgc2V0VGV4dCh0ZXh0OnN0cmluZyk6dm9pZHtcbiAgICAgICAgICAgIHRoaXMudGV4dCA9IHRleHQ7XG4gICAgICAgICAgICB0aGlzLmludmFsaWRhdGUoZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHNldEZvbnQoZm9udDpGb250KTp2b2lke1xuICAgICAgICAgICAgdGhpcy5mb250ID0gZm9udDtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCBlbGxpcHNpemUoZWxsaXBzaXplOkVsbGlwc2l6ZSl7XG4gICAgICAgICAgICB0aGlzLl9lbGxpcHNpemUgPSBlbGxpcHNpemU7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgZWxsaXBzaXplKCk6RWxsaXBzaXple1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VsbGlwc2l6ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCBtYXhXaWR0aChtYXhXaWR0aDpudW1iZXIpe1xuICAgICAgICAgICAgdGhpcy5fbWF4V2lkdGggPSBtYXhXaWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCBtYXhXaWR0aCgpOm51bWJlcntcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tYXhXaWR0aDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZ2V0IGxpbmVzcGFjZSgpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpbmVzcGFjZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCBsaW5lc3BhY2UobGluZXNwYWNlOm51bWJlcil7XG4gICAgICAgICAgICB0aGlzLl9saW5lc3BhY2UgPSBsaW5lc3BhY2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBwcml2YXRlIF9tZWFzdXJlU3RyaW5nKHdpZHRoOm51bWJlcik6U2l6ZXtcbiAgICAgICAgLy8gICAgIHJldHVyblxuICAgICAgICAvLyB9XG4gICAgICAgICAgICBcbiAgICAgICAgb25NZWFzdXJlKHdpZHRoOiBNZWFzdXJlU3BlYywgaGVpZ2h0OiBNZWFzdXJlU3BlYywgY2FudmFzOiBDYW52YXMpOiBTaXplIHtcbiAgICAgICAgICAgIGlmKCF0aGlzLmZvbnQpe1xuICAgICAgICAgICAgICAgIHRoaXMuZm9udCA9ICBuZXcgRm9udCgxNixcIlwiLCd3aGl0ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0SW5mbyA9IG5ldyBMYXlvdXRJbmZvKDAsMCwwLDAsdGhpcy5wYWRkaW5nLDApO1xuICAgICAgICAgICAgdmFyIHc6bnVtYmVyID0gdGhpcy5sYXlvdXRQYXJhbXMud2lkdGg7XG4gICAgICAgICAgICB2YXIgaDpudW1iZXIgPSB0aGlzLmxheW91dFBhcmFtcy5oZWlnaHQ7XG4gICAgICAgICAgICB2YXIgc2l6ZSA6U2l6ZSA9IG5ldyBTaXplKHcsIGgpO1xuICAgICAgICAgICAgdmFyIHdpZHRobW9kZSA9IHRoaXMubGF5b3V0UGFyYW1zLndpZHRoTW9kZTtcbiAgICAgICAgICAgIHZhciBoZWlnaHRtb2RlID0gdGhpcy5sYXlvdXRQYXJhbXMuaGVpZ2h0TW9kZTtcbiAgICAgICAgICAgIHZhciB0ZXh0c2l6ZSA9IGNhbnZhcy5tZWFzdXJlU3RyaW5nKHRoaXMudGV4dCx0aGlzLmZvbnQpO1xuICAgICAgICAgICAgaWYod2lkdGhtb2RlID09PSBMYXlvdXRQYXJhbXMuTUFUQ0hfUEFSRU5UKXtcbiAgICAgICAgICAgICAgICBzaXplLndpZHRoID0gd2lkdGgudmFsdWU7XG4gICAgICAgICAgICB9ZWxzZSBpZih3aWR0aG1vZGUgPT09IExheW91dFBhcmFtcy5XUkFQX0NPTlRFTlQpe1xuICAgICAgICAgICAgICAgIHNpemUud2lkdGggPSB0ZXh0c2l6ZS53aWR0aD50aGlzLl9tYXhXaWR0aD90aGlzLl9tYXhXaWR0aDp0ZXh0c2l6ZS53aWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGhlaWdodG1vZGUgPT09IExheW91dFBhcmFtcy5NQVRDSF9QQVJFTlQpe1xuICAgICAgICAgICAgICAgIHNpemUuaGVpZ2h0ID0gaGVpZ2h0LnZhbHVlO1xuICAgICAgICAgICAgfWVsc2UgaWYoaGVpZ2h0bW9kZSA9PT0gTGF5b3V0UGFyYW1zLldSQVBfQ09OVEVOVCl7XG4gICAgICAgICAgICAgICAgc2l6ZS5oZWlnaHQgPSB0ZXh0c2l6ZS5oZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNldE1lYXN1cmVkRGltZW5zaW9uKG5ldyBNZWFzdXJlU3BlYyhzaXplLndpZHRoLExheW91dFBhcmFtcy5FWEFDVExZKSxuZXcgTWVhc3VyZVNwZWMoc2l6ZS5oZWlnaHQsTGF5b3V0UGFyYW1zLkVYQUNUTFkpKTtcbiAgICAgICAgICAgIHJldHVybiBzaXplO1xuICAgICAgICB9XG4gICAgfVxufSIsIlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RhdGFiYXNlL0RhdGFTZXRPYnNlcnZhYmxlLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9hZGFwdGVyL1ZpZXdQYWdlckFkYXB0ZXIudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3V0aWwvQXJyYXlMaXN0LnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi91dGlsL0hhbmRsZXIudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RldmljZS9EZXZpY2UudHNcIiAvPlxuXG5uYW1lc3BhY2UgYW5kcm9pZC53aWRnZXQge1xuXG4gICAgaW1wb3J0IFBhZGRpbmcgPSBhbmRyb2lkLmdyYXBoaWNzLlBhZGRpbmc7XG4gICAgaW1wb3J0IEdyYXZpdHkgPSBhbmRyb2lkLmdyYXBoaWNzLkdyYXZpdHk7XG4gICAgaW1wb3J0IFJlY3QgPSBhbmRyb2lkLmdyYXBoaWNzLlJlY3Q7XG4gICAgaW1wb3J0IEFsaWduRWxlbWVudCA9IGFuZHJvaWQuZ3JhcGhpY3MuQWxpZ25FbGVtZW50O1xuICAgIGltcG9ydCBNYXJnaW4gPSBhbmRyb2lkLmdyYXBoaWNzLk1hcmdpbjtcbiAgICBpbXBvcnQgU2l6ZSA9IGFuZHJvaWQuZ3JhcGhpY3MuU2l6ZTtcbiAgICBpbXBvcnQgQ2FudmFzID0gYW5kcm9pZC5ncmFwaGljcy5DYW52YXM7XG4gICAgaW1wb3J0IFZpZXdHcm91cCA9IGFuZHJvaWQudmlldy5WaWV3R3JvdXA7XG4gICAgaW1wb3J0IFZpZXcgPSBhbmRyb2lkLnZpZXcuVmlldztcbiAgICBpbXBvcnQgUG9pbnQgPSBhbmRyb2lkLmdyYXBoaWNzLlBvaW50O1xuICAgIGltcG9ydCBNZWFzdXJlU3BlYyA9IGFuZHJvaWQudmlldy5NZWFzdXJlU3BlYztcbiAgICBpbXBvcnQgT3JpZW50YXRpb24gPSBhbmRyb2lkLmdyYXBoaWNzLk9yaWVudGF0aW9uO1xuICAgIGltcG9ydCBMYXlvdXRQYXJhbXMgPSBhbmRyb2lkLnZpZXcuTGF5b3V0UGFyYW1zO1xuICAgIGltcG9ydCBWaWV3UGFnZUFkYXB0ZXIgPSBhbmRyb2lkLmFkYXB0ZXIuVmlld1BhZ2VBZGFwdGVyO1xuICAgIGltcG9ydCBBcnJheUxpc3QgPSBhbmRyb2lkLnV0aWwuQXJyYXlMaXN0O1xuICAgIGltcG9ydCBEYXRhU2V0T2JzZXJ2ZXIgPSBhbmRyb2lkLmRhdGFiYXNlLkRhdGFTZXRPYnNlcnZlcjtcbiAgICBpbXBvcnQgSGFuZGxlciA9IGFuZHJvaWQudXRpbC5IYW5kbGVyO1xuICAgIGltcG9ydCBNZXNzYWdlID0gYW5kcm9pZC51dGlsLk1lc3NhZ2U7XG4gICAgaW1wb3J0IExvZyA9IGFuZHJvaWQudXRpbC5Mb2c7XG4gICAgaW1wb3J0IENvbnRleHQgPSBhbmRyb2lkLmFwcC5Db250ZXh0O1xuICAgIGltcG9ydCBNb3Rpb25FdmVudCA9IGFuZHJvaWQudmlldy5ldmVudC5Nb3Rpb25FdmVudDtcbiAgICBpbXBvcnQgRGV2aWNlID0gYW5kcm9pZC5kZXZpY2UuRGV2aWNlO1xuICAgIGxldCBUQUc6IHN0cmluZyA9IFwiU2NhbGVWaWV3UGFnZXJcIjtcbiAgICBjb25zdCBBTklNQVRJT05fRlJBTUVfRFVSQVRJT046IG51bWJlciA9IDEwMDAgLyA4MDtcbiAgICBjb25zdCBNSU5fU1BFRUQ6IG51bWJlciA9IDEwLjA7XG4gICAgY29uc3QgTUlOX1RPVUNIOiBudW1iZXIgPSAxMjtcblxuICAgIGNvbnN0IE1PVkVfTEVGVDogbnVtYmVyID0gMTAwMDE7XG4gICAgY29uc3QgTU9WRV9SSUdIVDogbnVtYmVyID0gMTAwMDI7XG4gICAgY29uc3QgTU9WRV9CQUNLOiBudW1iZXIgPSAxMDAwMztcbiAgICBjb25zdCBTQ0FMRV9DT05TVEFOVDogbnVtYmVyID0gMTAwO1xuICAgIGNvbnN0IFNUQVRFX01PVkVfTEVGVDogbnVtYmVyID0gMTEwMDE7XG4gICAgY29uc3QgU1RBVEVfTU9WRV9SSUdIVDogbnVtYmVyID0gMTEwMDI7XG4gICAgZXhwb3J0IGNsYXNzIFZpZXdQYWdlciBleHRlbmRzIFZpZXdHcm91cCB7XG5cbiAgICAgICAgcHJpdmF0ZSBtUG9zaXRpb246IG51bWJlciA9IDA7XG4gICAgICAgIHByaXZhdGUgbUFkYXB0ZXI6IFZpZXdQYWdlQWRhcHRlcjtcbiAgICAgICAgcHJpdmF0ZSBtT2xkQWRhcHRlcjogVmlld1BhZ2VBZGFwdGVyO1xuICAgICAgICBwcml2YXRlIG1WaWV3U3RhY2s6IEFycmF5TGlzdDxJdGVtSW5mbz4gPSBuZXcgQXJyYXlMaXN0PEl0ZW1JbmZvPigpO1xuICAgICAgICBwcml2YXRlIG1JbmRleDogbnVtYmVyID0gMDtcbiAgICAgICAgcHJpdmF0ZSBtU2l6ZTogbnVtYmVyID0gMDtcbiAgICAgICAgcHJpdmF0ZSBtQW5pbWF0aW9uU3RhdGU6IG51bWJlciA9IDA7XG4gICAgICAgIHByaXZhdGUgbVNjYWxlOiBudW1iZXIgPSAwO1xuICAgICAgICBwcml2YXRlIG1Jc1NjYWxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICBwcml2YXRlIG1NaW5fc3BlZWQ6IG51bWJlciA9IE1JTl9TUEVFRDtcbiAgICAgICAgcHJpdmF0ZSBtaW5fdG91Y2g6IG51bWJlciA9IE1JTl9UT1VDSDtcbiAgICAgICAgcHJpdmF0ZSBtTGF5b3V0UGFyYW1zOiBMYXlvdXRQYXJhbXM7XG4gICAgICAgIHByaXZhdGUgbUxhc3RBbmltYXRpb25UaW1lOiBudW1iZXIgPSAwO1xuICAgICAgICBwcml2YXRlIG1DdXJyZW50QW5pbWF0aW9uVGltZTogbnVtYmVyID0gMDtcbiAgICAgICAgcHJpdmF0ZSBtU3BlZWQ6IG51bWJlciA9IDEzMDtcbiAgICAgICAgcHJpdmF0ZSBtQ3VycmVudFZpZXc6IFZpZXc7XG4gICAgICAgIHByaXZhdGUgbU5leHRWaWV3OiBWaWV3O1xuICAgICAgICBwcml2YXRlIG1QcmVWaWV3OiBWaWV3O1xuICAgICAgICBwcml2YXRlIG1BbmltYXRpb25FbmQ6IGJvb2xlYW4gPSB0cnVlO1xuICAgICAgICBwcml2YXRlIG1DZW50ZXJYOiBudW1iZXIgPSAwO1xuICAgICAgICBwcml2YXRlIG1DZW50ZXJZOiBudW1iZXIgPSAwO1xuICAgICAgICBwcml2YXRlIGxpc3RlbmVyOiBQYWdlckNoYW5nZWRMaXN0ZW5lcjtcbiAgICAgICAgcHJpdmF0ZSBtRGF0YVNldE9ic2VydmVyOiBEYXRhU2V0T2JzZXJ2ZXI7XG4gICAgICAgIHByaXZhdGUgbUhhbmRsZXI6IEhhbmRsZXI7XG4gICAgICAgIHByaXZhdGUgbUFyZWFUb3VjaExpc3RlbmVyOiBBcmVhVG91Y2hMaXN0ZW5lcjtcbiAgICAgICAgcHJpdmF0ZSBkaXJlY3Rpb24gPSAxO1xuICAgICAgICBwcml2YXRlIG9sZHg7XG4gICAgICAgIHByaXZhdGUgb2xkeTtcbiAgICAgICAgcHJpdmF0ZSBkb3duWDtcblxuICAgICAgICBjb25zdHJ1Y3Rvcihjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgICAgICAgICBzdXBlcihjb250ZXh0KTtcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBpbml0KCk6IHZvaWQge1xuICAgICAgICAgICAgbGV0IGNvbnRleHQ6IENvbnRleHQgPSB0aGlzLmdldENvbnRleHQoKTtcbiAgICAgICAgICAgIHRoaXMubU1pbl9zcGVlZCA9IE1JTl9TUEVFRCAqRGV2aWNlLmRlbnNpdHk7XG4gICAgICAgICAgICB0aGlzLm1MYXlvdXRQYXJhbXMgPSBuZXcgTGF5b3V0UGFyYW1zKExheW91dFBhcmFtcy5NQVRDSF9QQVJFTlQsIExheW91dFBhcmFtcy5NQVRDSF9QQVJFTlQpO1xuICAgICAgICAgICAgdGhpcy5taW5fdG91Y2ggPSAzO1xuICAgICAgICAgICAgdGhpcy5tSGFuZGxlciA9IG5ldyBIYW5kbGVyKChtc2c6IE1lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG1zZy53aGF0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgTU9WRV9MRUZUOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kb0xlZnRPckJvdW5jZUFuaW1hdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgTU9WRV9SSUdIVDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZG9SaWdodE9yQm91bmNlQW5pbWF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzZXRBcmVhVG91Y2hMaXN0ZW5lcihsOiBBcmVhVG91Y2hMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5tQXJlYVRvdWNoTGlzdGVuZXIgPSBsO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIG9uSW50ZXJjZXB0VG91Y2hFdmVudChldm50OiBNb3Rpb25FdmVudCk6IGJvb2xlYW4ge1xuXG4gICAgICAgICAgICBsZXQgYWN0aW9uID0gZXZudC5hY3Rpb247XG4gICAgICAgICAgICBsZXQgeCA9IGV2bnQueDtcbiAgICAgICAgICAgIGxldCB5ID0gZXZudC55O1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGFjdGlvbikge1xuICAgICAgICAgICAgICAgIGNhc2UgTW90aW9uRXZlbnQuQUNUSU9OX0RPV046XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2xkeCA9IHg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2xkeSA9IHk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG93blggPSB4O1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tQXJlYVRvdWNoTGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FzZSBNb3Rpb25FdmVudC5BQ1RJT05fTU9WRTpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHkgLSB0aGlzLm9sZHkgIT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHggLSB0aGlzLm9sZHgpIC8gTWF0aC5hYnMoeSAtIHRoaXMub2xkeSkgPiAyICYmIE1hdGguYWJzKHggLSB0aGlzLmRvd25YKSA+IHRoaXMubWluX3RvdWNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBvblRvdWNoRXZlbnQoZXZlbnQ6IE1vdGlvbkV2ZW50KTogYm9vbGVhbiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMubUFuaW1hdGlvbkVuZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGFjdGlvbiA9IGV2ZW50LmFjdGlvblxuICAgICAgICAgICAgbGV0IHggPSBldmVudC54O1xuICAgICAgICAgICAgbGV0IHkgPSBldmVudC55O1xuICAgICAgICAgICAgaWYgKHRoaXMubUN1cnJlbnRWaWV3ID09IG51bGwpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBNb3Rpb25FdmVudC5BQ1RJT05fTU9WRToge1xuICAgICAgICAgICAgICAgICAgICBMb2cuZChcImV2ZW50XCIsIFwibW92ZSBcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0geCAtIHRoaXMub2xkeCA+IDAgPyAxIDogLTE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZSh4IC0gdGhpcy5vbGR4KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbGR4ID0geDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhc2UgTW90aW9uRXZlbnQuQUNUSU9OX1VQOlxuICAgICAgICAgICAgICAgIGNhc2UgTW90aW9uRXZlbnQuQUNUSU9OX0NBTkNFTDpcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbGR4ID0gLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9sZHkgPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyh0aGlzLmRvd25YIC0geCkgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh4ID49IHRoaXMud2lkdGggLyA0ICogMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tQXJlYVRvdWNoTGlzdGVuZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tQXJlYVRvdWNoTGlzdGVuZXIub25MZWZ0VG91Y2goKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoeCA8PSB0aGlzLndpZHRoIC8gNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tQXJlYVRvdWNoTGlzdGVuZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tQXJlYVRvdWNoTGlzdGVuZXIub25SaWdodFRvdWNoKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tQXJlYVRvdWNoTGlzdGVuZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tQXJlYVRvdWNoTGlzdGVuZXIub25NaWRkbGVUb3VjaCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXBhcmVUb0FuaW1hdGlvbih0aGlzLmRpcmVjdGlvbiAqIHRoaXMubU1pbl9zcGVlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9uTWVhc3VyZSh3aWR0aE1lYXN1cmVTcGVjOiBNZWFzdXJlU3BlYywgaGVpZ2h0TWVhc3VyZVNwZWM6IE1lYXN1cmVTcGVjLCBjYW52YXM6IENhbnZhcyk6IFNpemUge1xuICAgICAgICAgICAgbGV0IHdpZHRoOiBudW1iZXIgPSB3aWR0aE1lYXN1cmVTcGVjLmdldE1lYXN1cmVWYWx1ZSgpO1xuICAgICAgICAgICAgbGV0IGhlaWdodDogbnVtYmVyID0gaGVpZ2h0TWVhc3VyZVNwZWMuZ2V0TWVhc3VyZVZhbHVlKCk7XG4gICAgICAgICAgICB0aGlzLm1DZW50ZXJYID0gd2lkdGggLyAyO1xuICAgICAgICAgICAgdGhpcy5tQ2VudGVyWSA9IGhlaWdodCAvIDI7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubVZpZXdTdGFjay5zaXplKCk7ICsraSkge1xuICAgICAgICAgICAgICAgIGxldCBjaGlsZDogVmlldyA9IHRoaXMubVZpZXdTdGFjay5nZXQoaSkudmlldztcbiAgICAgICAgICAgICAgICBsZXQgbHA6IExheW91dFBhcmFtcyA9IGNoaWxkLmxheW91dFBhcmFtcztcbiAgICAgICAgICAgICAgICBsZXQgdyA9IGxwLndpZHRoO1xuICAgICAgICAgICAgICAgIGxldCBoID0gbHAuaGVpZ2h0O1xuICAgICAgICAgICAgICAgIGlmIChscC5oZWlnaHRNb2RlID09PSBMYXlvdXRQYXJhbXMuTUFUQ0hfUEFSRU5UKSB7XG4gICAgICAgICAgICAgICAgICAgIGggPSBoZWlnaHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChscC53aWR0aE1vZGUgPT09IExheW91dFBhcmFtcy5NQVRDSF9QQVJFTlQpIHtcbiAgICAgICAgICAgICAgICAgICAgdyA9IHdpZHRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjaGlsZC5vbk1lYXN1cmUobmV3IE1lYXN1cmVTcGVjKHcsIGxwLndpZHRoTW9kZSksIG5ldyBNZWFzdXJlU3BlYyhoLCBscC5oZWlnaHRNb2RlKSwgY2FudmFzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBzaXplOiBTaXplID0gbmV3IFNpemUod2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICB0aGlzLnNldE1lYXN1cmVkRGltZW5zaW9uKG5ldyBNZWFzdXJlU3BlYyhzaXplLndpZHRoLCBMYXlvdXRQYXJhbXMuRVhBQ1RMWSksIG5ldyBNZWFzdXJlU3BlYyhzaXplLmhlaWdodCwgTGF5b3V0UGFyYW1zLkVYQUNUTFkpKTtcbiAgICAgICAgICAgIHJldHVybiBzaXplO1xuICAgICAgICB9XG5cbiAgICAgICAgb25MYXlvdXQobDogbnVtYmVyLCB0OiBudW1iZXIsIHI6IG51bWJlciwgYjogbnVtYmVyLCBjYW52YXM6IENhbnZhcyk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy5sYXlvdXRJbmZvLnJlc2V0KGwsIHQsIHIsIGIsIHRoaXMucGFkZGluZywgMCk7XG4gICAgICAgICAgICB2YXIgaW5uZXJyZWN0OiBSZWN0ID0gdGhpcy5sYXlvdXRJbmZvLmlubmVycmVjdDtcbiAgICAgICAgICAgIGxldCB3aWR0aDogbnVtYmVyID0gciAtIGw7XG4gICAgICAgICAgICBsZXQgaGVpZ2h0OiBudW1iZXIgPSBiIC0gdDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tVmlld1N0YWNrLnNpemUoKTsgKytpKSB7XG4gICAgICAgICAgICAgICAgbGV0IHZpZXc6IFZpZXcgPSB0aGlzLm1WaWV3U3RhY2suZ2V0KGkpLnZpZXc7XG4gICAgICAgICAgICAgICAgbGV0IHBvcyA9IHRoaXMubVZpZXdTdGFjay5nZXQoaSkuaW5kZXg7XG4gICAgICAgICAgICAgICAgbGV0IGdhcCA9IHBvcyAtIHRoaXMubUluZGV4O1xuICAgICAgICAgICAgICAgIGxldCB2aWV3bGVmdCA9IHZpZXcucGFkZGluZy5sZWZ0UGFkZGluZyArICh3aWR0aCAtIHZpZXcud2lkdGgpIC8gMjtcbiAgICAgICAgICAgICAgICBsZXQgdmlld3RvcCA9IHZpZXcucGFkZGluZy50b3BQYWRkaW5nICsgKGhlaWdodCAtIHZpZXcuaGVpZ2h0KSAvIDI7XG4gICAgICAgICAgICAgICAgZ2FwID0gZ2FwID4gMCA/IDAgOiBnYXA7XG4gICAgICAgICAgICAgICAgdmlldy5vbkxheW91dCh2aWV3bGVmdCArIGdhcCAqIHdpZHRoLCB2aWV3dG9wLCB2aWV3bGVmdCArIGdhcCAqIHdpZHRoICsgdmlldy53aWR0aCwgdmlld3RvcCArIHZpZXcuaGVpZ2h0LGNhbnZhcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgZGlzcGF0Y2hEcmF3KGNhbnZhczogQ2FudmFzKTogdm9pZCB7XG4gICAgICAgICAgICAvLyBzdXBlci5kaXNwYXRjaERyYXcoY2FudmFzKTtcbiAgICAgICAgICAgIC8vIExvZy5kKCdkaXNwYXRjaERyYXcgJyArIHRoaXMubVBvc2l0aW9uKTtcbiAgICAgICAgICAgIGlmICh0aGlzLm1BbmltYXRpb25TdGF0ZSA9PT0gU1RBVEVfTU9WRV9MRUZUKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3Q2hpbGQoY2FudmFzLCB0aGlzLm1OZXh0Vmlldyk7XG4gICAgICAgICAgICAgICAgY2FudmFzLnNhdmUoKTtcbiAgICAgICAgICAgICAgICBjYW52YXMudHJhbnNsYXRlKHRoaXMubVBvc2l0aW9uLCAwKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdDaGlsZChjYW52YXMsIHRoaXMubUN1cnJlbnRWaWV3KTtcbiAgICAgICAgICAgICAgICBjYW52YXMucmVzdG9yZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5tQW5pbWF0aW9uU3RhdGUgPT09IFNUQVRFX01PVkVfUklHSFQpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd0NoaWxkKGNhbnZhcywgdGhpcy5tQ3VycmVudFZpZXcpO1xuICAgICAgICAgICAgICAgIGNhbnZhcy5zYXZlKCk7XG4gICAgICAgICAgICAgICAgY2FudmFzLnRyYW5zbGF0ZSh0aGlzLm1Qb3NpdGlvbiwgMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3Q2hpbGQoY2FudmFzLCB0aGlzLm1QcmVWaWV3KTtcbiAgICAgICAgICAgICAgICBjYW52YXMucmVzdG9yZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3Q2hpbGQoY2FudmFzLCB0aGlzLm1DdXJyZW50Vmlldyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzZXRBZGFwdGVyKGFkYXB0ZXI6IFZpZXdQYWdlQWRhcHRlcikge1xuICAgICAgICAgICAgdGhpcy5tT2xkQWRhcHRlciA9IHRoaXMubUFkYXB0ZXI7XG4gICAgICAgICAgICB0aGlzLm1BZGFwdGVyID0gYWRhcHRlcjtcbiAgICAgICAgICAgIGlmICh0aGlzLm1BZGFwdGVyICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1EYXRhU2V0T2JzZXJ2ZXIgPSBuZXcgRGF0YVNldE9ic2VydmVyKCk7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgICAgIHRoaXMubURhdGFTZXRPYnNlcnZlci5vbkNoYW5nZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubVNpemUgPSBzZWxmLm1BZGFwdGVyLmdldENvdW50KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubURhdGFTZXRPYnNlcnZlci5vbkludmFsaWRhdGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmludmFsaWRhdGUoZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLm1BZGFwdGVyLnJlZ2lzdGVyRGF0YVNldE9ic2VydmVyKHRoaXMubURhdGFTZXRPYnNlcnZlcik7XG4gICAgICAgICAgICAgICAgdGhpcy5tU2l6ZSA9IGFkYXB0ZXIuZ2V0Q291bnQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hOb3JtYWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzZXRDdXJyZW50SXRlbShpbmRleDogbnVtYmVyKSB7XG4gICAgICAgICAgICBMb2cuZCgnc2V0Q3VycmVudEl0ZW0gJyArIGluZGV4KTtcbiAgICAgICAgICAgIHRoaXMubUluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hOb3JtYWwoKTtcbiAgICAgICAgICAgIHRoaXMucGFnZXJNb3ZpbmdFbmQodGhpcy5tSW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGdldEN1cnJlbnRJdGVtKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubUluZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHNldFBhZ2VyQ2hhbmdlZExpc3RlbmVyKGxpc3RlbjogUGFnZXJDaGFuZ2VkTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXIgPSBsaXN0ZW47XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIHJlZnJlc2hOb3JtYWwoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tQWRhcHRlcikge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1JbmRleCA+PSAwICYmIHRoaXMubUluZGV4IDwgdGhpcy5tQWRhcHRlci5nZXRDb3VudCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJlUmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJlTG9hZCh0aGlzLm1JbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tVmlld1N0YWNrLnNpemUoKTsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmlldzogVmlldyA9IHRoaXMubVZpZXdTdGFjay5nZXQoaSkudmlldztcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbmRleDogbnVtYmVyID0gdGhpcy5tVmlld1N0YWNrLmdldChpKS5pbmRleDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gdGhpcy5tSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1DdXJyZW50VmlldyA9IHZpZXc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRWaWV3KHZpZXcsIDEsIHRoaXMubUxheW91dFBhcmFtcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IHRoaXMubUluZGV4IC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubVByZVZpZXcgPSB2aWV3O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkVmlldyh2aWV3LCAwLCB0aGlzLm1MYXlvdXRQYXJhbXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSB0aGlzLm1JbmRleCArIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1OZXh0VmlldyA9IHZpZXc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRWaWV3KHZpZXcsIDEsIHRoaXMubUxheW91dFBhcmFtcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubUFkYXB0ZXIuZ2V0Q291bnQoKSA9PT0gMCAmJiB0aGlzLm1JbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgJ2N1cnJlbnQgaW5kZXggaXMgJyArIHRoaXMubUluZGV4ICsgJyBzaXplIGlzICcgKyB0aGlzLm1BZGFwdGVyLmdldENvdW50KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBwcml2YXRlIHByZVJlbW92ZSgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tVmlld1N0YWNrLnNpemUoKTsgKytpKSB7XG4gICAgICAgICAgICAgICAgbGV0IHZpZXc6IFZpZXcgPSB0aGlzLm1WaWV3U3RhY2suZ2V0KGkpLnZpZXc7XG4gICAgICAgICAgICAgICAgbGV0IHBvc2l0aW9uOiBudW1iZXIgPSB0aGlzLm1WaWV3U3RhY2suZ2V0KGkpLmluZGV4O1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlVmlldyh2aWV3KTtcbiAgICAgICAgICAgICAgICB0aGlzLm1BZGFwdGVyLmRlc3RvcnlJdGVtKHBvc2l0aW9uLCB0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgIFxuICAgICAgICBwcml2YXRlIHByZUxvYWQocG9zaXRpb246IG51bWJlcikge1xuICAgICAgICAgICAgaWYgKHRoaXMubUFkYXB0ZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1WaWV3U3RhY2suY2xlYXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1WaWV3U3RhY2suYWRkKHRoaXMucHJlTG9hZFByZVZpZXcocG9zaXRpb24pKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1WaWV3U3RhY2suYWRkKHRoaXMubG9hZFZpZXcocG9zaXRpb24pKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1WaWV3U3RhY2suYWRkKHRoaXMucHJlTG9hZE5leHRWaWV3KHBvc2l0aW9uKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHByaXZhdGUgcHJlTG9hZFByZVZpZXcocG9zaXRpb246IG51bWJlcikge1xuICAgICAgICAgICAgbGV0IHBvcyA9IHBvc2l0aW9uIC0gMTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvYWRWaWV3KHBvcyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHByaXZhdGUgcHJlTG9hZE5leHRWaWV3KHBvc2l0aW9uOiBudW1iZXIpIHtcbiAgICAgICAgICAgIGxldCBwb3MgPSBwb3NpdGlvbiArIDE7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sb2FkVmlldyhwb3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBsb2FkVmlldyhpbmRleDogbnVtYmVyKTogSXRlbUluZm8ge1xuICAgICAgICAgICAgaWYgKHRoaXMubUFkYXB0ZXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyAnTnVsbCBwb2ludCBFeGNlcHRpb24gYWRhcHRlciBpcyBudWxsJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBwb3MgPSBpbmRleDtcbiAgICAgICAgICAgIGlmIChwb3MgPj0gdGhpcy5tU2l6ZSkge1xuICAgICAgICAgICAgICAgIHBvcyA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocG9zIDwgMCkge1xuICAgICAgICAgICAgICAgIHBvcyArPSB0aGlzLm1TaXplO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHZpZXc6IFZpZXcgPSB0aGlzLm1BZGFwdGVyLmluaXRJdGVtKHBvcywgdGhpcyk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEl0ZW1JbmZvKHZpZXcsIGluZGV4LCBwb3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBtb3ZlKGRpczogbnVtYmVyKSB7XG4gICAgICAgICAgICBMb2cuZChcIm1vdmUgXCIgKyBkaXMpO1xuICAgICAgICAgICAgaWYgKHRoaXMubVBvc2l0aW9uID09PSAwICYmIGRpcyAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMucGFnZXJDaGFuZ2VkKHRoaXMubUluZGV4LCBkaXMgPiAwID8gdGhpcy5tSW5kZXggKyAxIDogdGhpcy5tSW5kZXggLSAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubVBvc2l0aW9uICs9IGRpcztcbiAgICAgICAgICAgIGlmICh0aGlzLm1Qb3NpdGlvbiA+PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tQW5pbWF0aW9uU3RhdGUgPSBTVEFURV9NT1ZFX1JJR0hUO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMubVBvc2l0aW9uIDwgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMubUFuaW1hdGlvblN0YXRlID0gU1RBVEVfTU9WRV9MRUZUO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IG1vdmVkZWdyZWVwcmVWaWV3ID0gdGhpcy5tUG9zaXRpb24gLyB0aGlzLndpZHRoO1xuICAgICAgICAgICAgbGV0IG1vdmVkZWdyZWUgPSB0aGlzLm1Qb3NpdGlvbiAqICh0aGlzLm1JbmRleCArIDEpIC8gdGhpcy53aWR0aCAqIHRoaXMubUFkYXB0ZXIuZ2V0Q291bnQoKTtcbiAgICAgICAgICAgIHRoaXMucGFnZXJNb3ZpbmcobW92ZWRlZ3JlZXByZVZpZXcsIG1vdmVkZWdyZWUpO1xuICAgICAgICAgICAgdGhpcy5pbnZhbGlkYXRlKGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgcHJlcGFyZVRvQW5pbWF0aW9uKHNwZWVkOiBudW1iZXIpIHtcbiAgICAgICAgICAgIGxldCBub3c6IG51bWJlciA9IERhdGUubm93KCk7XG4gICAgICAgICAgICB0aGlzLm1BbmltYXRpb25FbmQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubUxhc3RBbmltYXRpb25UaW1lID0gbm93O1xuICAgICAgICAgICAgdGhpcy5tQ3VycmVudEFuaW1hdGlvblRpbWUgPSBub3c7XG4gICAgICAgICAgICB0aGlzLm1TcGVlZCA9IHNwZWVkO1xuICAgICAgICAgICAgaWYgKHRoaXMubVNwZWVkID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tU3BlZWQgPSB0aGlzLm1NaW5fc3BlZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3BlZWQgPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tU3BlZWQgPSBNYXRoLmFicyh0aGlzLm1TcGVlZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5kb1JpZ2h0T3JCb3VuY2VBbmltYXRpb24oKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tU3BlZWQgPSAtMSAqIE1hdGguYWJzKHRoaXMubVNwZWVkKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRvTGVmdE9yQm91bmNlQW5pbWF0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgZmxpcExlZnQoKSB7XG4gICAgICAgICAgICBMb2cuZChcImZsaXBMZWZ0IFwiICsgdGhpcy5tQW5pbWF0aW9uRW5kKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5tQW5pbWF0aW9uRW5kKSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLm1Qb3NpdGlvbiA9IHRoaXMubUN1cnJlbnRWaWV3LmxlZnQ7XG4gICAgICAgICAgICB0aGlzLm1vdmUoLTEpO1xuICAgICAgICAgICAgbGV0IG5vdzogbnVtYmVyID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIHRoaXMubUFuaW1hdGlvbkVuZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5tTGFzdEFuaW1hdGlvblRpbWUgPSBub3c7XG4gICAgICAgICAgICB0aGlzLm1DdXJyZW50QW5pbWF0aW9uVGltZSA9IG5vdztcbiAgICAgICAgICAgIHRoaXMubVNwZWVkID0gLXRoaXMubU1pbl9zcGVlZDtcbiAgICAgICAgICAgIHRoaXMuZG9MZWZ0T3JCb3VuY2VBbmltYXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBmbGlwUmlnaHQoKSB7XG4gICAgICAgICAgICBMb2cuZChcImZpbHBSaWdodCBcIiArIHRoaXMubUFuaW1hdGlvbkVuZCk7XG4gICAgICAgICAgICBpZiAoIXRoaXMubUFuaW1hdGlvbkVuZCkgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5tUG9zaXRpb24gPSB0aGlzLm1DdXJyZW50Vmlldy5sZWZ0O1xuICAgICAgICAgICAgdGhpcy5tb3ZlKDEpO1xuICAgICAgICAgICAgbGV0IG5vdzogbnVtYmVyID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIHRoaXMubUFuaW1hdGlvbkVuZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5tTGFzdEFuaW1hdGlvblRpbWUgPSBub3c7XG4gICAgICAgICAgICB0aGlzLm1DdXJyZW50QW5pbWF0aW9uVGltZSA9IG5vdztcbiAgICAgICAgICAgIHRoaXMubVNwZWVkID0gdGhpcy5tTWluX3NwZWVkO1xuICAgICAgICAgICAgdGhpcy5kb1JpZ2h0T3JCb3VuY2VBbmltYXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgZG9SaWdodE9yQm91bmNlQW5pbWF0aW9uKCkge1xuICAgICAgICAgICAgbGV0IG5vdzogbnVtYmVyID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIGxldCB0ID0gMTtcbiAgICAgICAgICAgIGxldCBzOiBudW1iZXIgPSB0aGlzLm1TcGVlZCAqIHQ7XG4gICAgICAgICAgICBpZiAodGhpcy5tUG9zaXRpb24gPiAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubVBvc2l0aW9uID09PSB0aGlzLndpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubUhhbmRsZXIucmVtb3ZlTWVzc2FnZXMoTU9WRV9SSUdIVCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kUmlnaHRhbmltYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocyArIHRoaXMubVBvc2l0aW9uID4gdGhpcy53aWR0aCkge1xuICAgICAgICAgICAgICAgICAgICBzID0gdGhpcy53aWR0aCAtIHRoaXMubVBvc2l0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubVBvc2l0aW9uID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubUhhbmRsZXIucmVtb3ZlTWVzc2FnZXMoTU9WRV9SSUdIVCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kQm91bmNlYW5pbXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocyArIHRoaXMubVBvc2l0aW9uID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBzID0gLXRoaXMubVBvc2l0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubW92ZShzKTtcbiAgICAgICAgICAgIHRoaXMubUN1cnJlbnRBbmltYXRpb25UaW1lICs9IEFOSU1BVElPTl9GUkFNRV9EVVJBVElPTjtcbiAgICAgICAgICAgIHRoaXMubUhhbmRsZXIucmVtb3ZlTWVzc2FnZXMoTU9WRV9MRUZUKTtcbiAgICAgICAgICAgIHRoaXMubUhhbmRsZXIucmVtb3ZlTWVzc2FnZXMoTU9WRV9SSUdIVCk7XG4gICAgICAgICAgICB0aGlzLm1IYW5kbGVyLnNlbmRNZXNzYWdlRGVsYXllZCh0aGlzLm1IYW5kbGVyLm9idGFpbk1lc3NhZ2UoTU9WRV9SSUdIVCksIEFOSU1BVElPTl9GUkFNRV9EVVJBVElPTik7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIGRvTGVmdE9yQm91bmNlQW5pbWF0aW9uKCkge1xuICAgICAgICAgICAgLy8gTG9nLmQoVEFHLCBcImRvbGVmdEFuaW1hdGlvbiAgXCIpO1xuICAgICAgICAgICAgbGV0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgICAgICBsZXQgdCA9IDE7Ly8obm93IC0gbUxhc3RBbmltYXRpb25UaW1lKS8xMDAwO1xuICAgICAgICAgICAgbGV0IHMgPSAodGhpcy5tU3BlZWQgKiB0KTtcbiAgICAgICAgICAgIGlmICh0aGlzLm1Qb3NpdGlvbiA8IDApIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tUG9zaXRpb24gKyB0aGlzLndpZHRoID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tSGFuZGxlci5yZW1vdmVNZXNzYWdlcyhNT1ZFX0xFRlQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZExlZnRBbmltYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocyArIHRoaXMubVBvc2l0aW9uICsgdGhpcy53aWR0aCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcyA9IC0odGhpcy5tUG9zaXRpb24gKyB0aGlzLndpZHRoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1Qb3NpdGlvbiA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubUhhbmRsZXIucmVtb3ZlTWVzc2FnZXMoTU9WRV9MRUZUKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmRCb3VuY2VhbmltdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHMgKyB0aGlzLm1Qb3NpdGlvbiA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcyA9IC10aGlzLm1Qb3NpdGlvbjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubW92ZShzKTtcbiAgICAgICAgICAgIHRoaXMubUN1cnJlbnRBbmltYXRpb25UaW1lICs9IEFOSU1BVElPTl9GUkFNRV9EVVJBVElPTjtcbiAgICAgICAgICAgIHRoaXMubUhhbmRsZXIucmVtb3ZlTWVzc2FnZXMoTU9WRV9MRUZUKTtcbiAgICAgICAgICAgIHRoaXMubUhhbmRsZXIucmVtb3ZlTWVzc2FnZXMoTU9WRV9SSUdIVCk7XG4gICAgICAgICAgICB0aGlzLm1IYW5kbGVyLnNlbmRNZXNzYWdlRGVsYXllZCh0aGlzLm1IYW5kbGVyLm9idGFpbk1lc3NhZ2UoTU9WRV9MRUZUKSwgQU5JTUFUSU9OX0ZSQU1FX0RVUkFUSU9OKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgZW5kQm91bmNlYW5pbXRpb24oKSB7XG4gICAgICAgICAgICBMb2cuZChcImVuZEJvdW5jZWFuaW10aW9uICBcIik7XG4gICAgICAgICAgICB0aGlzLm1BbmltYXRpb25FbmQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5tU2NhbGUgPSAwO1xuICAgICAgICAgICAgdGhpcy5tUG9zaXRpb24gPSAwO1xuICAgICAgICAgICAgdGhpcy5tQW5pbWF0aW9uU3RhdGUgPSAwO1xuICAgICAgICAgICAgdGhpcy5wYWdlck1vdmluZ0VuZCh0aGlzLm1JbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIGVuZFJpZ2h0YW5pbWF0aW9uKCkge1xuICAgICAgICAgICAgTG9nLmQoXCJlbmRSaWdodGFuaW1hdGlvbiAgIFwiKTtcbiAgICAgICAgICAgIGxldCBpbmRleDogbnVtYmVyID0gdGhpcy5tSW5kZXggLSAxO1xuICAgICAgICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gdGhpcy5tQWRhcHRlci5nZXRDb3VudCgpICsgaW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm1Qb3NpdGlvbiA9IDA7XG4gICAgICAgICAgICB0aGlzLm1TY2FsZSA9IDA7XG4gICAgICAgICAgICB0aGlzLm1BbmltYXRpb25TdGF0ZSA9IDA7XG4gICAgICAgICAgICB0aGlzLnNldEN1cnJlbnRJdGVtKGluZGV4KTtcbiAgICAgICAgICAgIHRoaXMubUFuaW1hdGlvbkVuZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnBhZ2VyTW92aW5nRW5kKHRoaXMubUluZGV4KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBlbmRMZWZ0QW5pbWF0aW9uKCkge1xuICAgICAgICAgICAgTG9nLmQoXCJlbmRMZWZ0QW5pbWF0aW9uICAgXCIpO1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5tSW5kZXggKyAxO1xuICAgICAgICAgICAgdGhpcy5tUG9zaXRpb24gPSAwO1xuICAgICAgICAgICAgdGhpcy5tU2NhbGUgPSAwO1xuICAgICAgICAgICAgaW5kZXggPSBpbmRleCAlIHRoaXMubUFkYXB0ZXIuZ2V0Q291bnQoKTtcbiAgICAgICAgICAgIHRoaXMubUFuaW1hdGlvblN0YXRlID0gMDtcbiAgICAgICAgICAgIHRoaXMuc2V0Q3VycmVudEl0ZW0oaW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5tQW5pbWF0aW9uRW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucGFnZXJNb3ZpbmdFbmQodGhpcy5tSW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBwYWdlckNoYW5nZWQocG9zaXRpb246IG51bWJlciwgdGFyZ2V0UG9zaXRpb246IG51bWJlcikge1xuICAgICAgICAgICAgaWYgKHRoaXMubGlzdGVuZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuZXIub25QYWdlckNoYW5nZWQocG9zaXRpb24sIHRhcmdldFBvc2l0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgcGFnZXJNb3ZpbmcobW92ZWRlZ3JlZXByZVZpZXc6IG51bWJlciwgbW92ZWRlZ3JlZTogbnVtYmVyKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5saXN0ZW5lciAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ZW5lci5vblBhZ2VyTW92aW5nKC0xICogbW92ZWRlZ3JlZXByZVZpZXcsIC0xICogbW92ZWRlZ3JlZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIHBhZ2VyTW92aW5nRW5kKHBvc2l0aW9uOiBudW1iZXIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmxpc3RlbmVyICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RlbmVyLm9uUGFnZXJNb3ZpbmdFbmQocG9zaXRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBleHBvcnQgaW50ZXJmYWNlIFBhZ2VyQ2hhbmdlZExpc3RlbmVyIHtcbiAgICAgICAgb25QYWdlckNoYW5nZWQocG9zaXRpb246IG51bWJlciwgdGFyZ2V0UG9zaXRpb246IG51bWJlcik7XG4gICAgICAgIG9uUGFnZXJNb3ZpbmcobW92ZWRlZ3JlZXByZVZpZXc6IG51bWJlciwgbW92ZWRlZ3JlZTogbnVtYmVyKTtcbiAgICAgICAgb25QYWdlck1vdmluZ0VuZChwb3NpdGlvbjogbnVtYmVyKTtcbiAgICB9XG5cbiAgICBleHBvcnQgaW50ZXJmYWNlIEFyZWFUb3VjaExpc3RlbmVyIHtcbiAgICAgICAgb25MZWZ0VG91Y2goKTtcbiAgICAgICAgb25SaWdodFRvdWNoKCk7XG4gICAgICAgIG9uTWlkZGxlVG91Y2goKTtcbiAgICB9XG5cbiAgICBjbGFzcyBJdGVtSW5mbyB7XG4gICAgICAgIHZpZXc6IFZpZXc7XG4gICAgICAgIGluZGV4OiBudW1iZXI7XG4gICAgICAgIHBvc2l0aW9uOiBudW1iZXI7XG4gICAgICAgIGNvbnN0cnVjdG9yKHY6IFZpZXcsIGk6IG51bWJlciwgcG9zOiBudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMudmlldyA9IHY7XG4gICAgICAgICAgICB0aGlzLmluZGV4ID0gaTtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24gPSBwb3M7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJcbm5hbWVzcGFjZSBhbmRyb2lkLnZpZXcuYW5pbWF0aW9uIHtcbiAgICBleHBvcnQgZW51bSBBbmltYXRpb25UeXBlIHtcbiAgICAgICBBbHBoYSxcbiAgICAgICBUcmFuc2xhdGUsXG4gICAgICAgU2NhbGUsXG4gICAgICAgUm90YXRlXG4gICAgfVxufSIsIlxubmFtZXNwYWNlIGFuZHJvaWQudmlldy5hbmltYXRpb24ge1xuICAgIGltcG9ydCBDYW52YXMgPSBhbmRyb2lkLmdyYXBoaWNzLkNhbnZhcztcbiAgICBleHBvcnQgY2xhc3MgU2NhbGVBbmltYXRpb24gZXh0ZW5kcyBBbmltYXRpb24ge1xuICAgICAgICBkdXJhdGlvbjogbnVtYmVyID0gMDtcbiAgICAgICAgc3RhcnQ6IG51bWJlcjtcbiAgICAgICAgZWFzZTpBbmltYXRpb25FYXNlO1xuICAgICAgICB0eXBlOkFuaW1hdGlvblR5cGU7XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBnZXQgaXNBbmlhbXRpb25FbmQoKTpib29sZWFue1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnQgKyB0aGlzLmR1cmF0aW9uIDwgRGF0ZS5ub3coKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNjYWxlKG5vdzogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZWFzZSBcIiArKCAobm93IC0gdGhpcy5zdGFydCkvdGhpcy5kdXJhdGlvbikpO1xuICAgICAgICAgICAgcmV0dXJuICB0aGlzLmVhc2UuZWFzZSgobm93IC0gdGhpcy5zdGFydCkgLyB0aGlzLmR1cmF0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBhcHBseVRyYW5zZm9ybWF0aW9uKGludGVycG9sYXRlZFRpbWU6bnVtYmVyLCBjYW52YXM6Q2FudmFzLHZpZXc6Vmlldykge1xuICAgICAgICAgICAgLy8gY2FudmFzLm1vdmV0byh2aWV3LmxlZnQrdmlldy53aWR0aC8yLHZpZXcudG9wICt2aWV3LmhlaWdodC8yKTtcbiAgICAgICAgICAgIGNhbnZhcy5zY2FsZSh0aGlzLmZyb20gKyAodGhpcy50by10aGlzLmZyb20pICogaW50ZXJwb2xhdGVkVGltZSx0aGlzLmZyb20gKyAodGhpcy50by10aGlzLmZyb20pICogaW50ZXJwb2xhdGVkVGltZSk7XG4gICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgIH1cbn0iLCJuYW1lc3BhY2UgYW5kcm9pZC52aWV3e1xuICAgIGltcG9ydCBSZWN0ID0gYW5kcm9pZC5ncmFwaGljcy5SZWN0O1xuICAgIGV4cG9ydCBjbGFzcyBSZW5kZXJTdGF0ZXtcbiAgICAgICAgY3VycmVudFJlY3Q6UmVjdDtcbiAgICAgICAgaW5kZXg6bnVtYmVyO1xuICAgICAgICBjb25zdHJ1Y3RvcihyZWN0OlJlY3QsaW5kZXg6bnVtYmVyKXtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFJlY3QgPSByZWN0O1xuICAgICAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==
