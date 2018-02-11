/// <reference path="./app/Intent.ts" />
/// <reference path="graphics/Canvas.ts" />
/// <reference path="./app/ActivityManager.ts" />
/// <reference path="./util/Log.ts" />
/// <reference path="./view/event/MotionEvent.ts" />
var android;
(function (android) {
    var ActivityManager = android.app.ActivityManager;
    var Canvas = android.graphics.Canvas;
    var RenderType = android.graphics.RenderType;
    var Intent = android.app.Intent;
    var Device = android.device.Device;
    var MotionEvent = android.view.event.MotionEvent;
    var StartUp = (function () {
        function StartUp() {
            this.loadConfig();
            this.element = document.getElementById(this.getRootElement());
            this.element.innerHTML = '';
            if (this.getFill() === 'parent') {
                Device.width = this.element.clientWidth;
                Device.height = this.element.clientHeight;
            }
            if (this.getRenderType() == 'canvas') {
                this.canvas = new Canvas(this.element, RenderType.Canvas);
            }
            else {
                this.canvas = new Canvas(this.element, RenderType.Svg);
            }
            this.activityManager = new ActivityManager(this.canvas);
            // this.element.ontouchstart=null;
            // this.element.ontouchmove=null;
            // this.element.ontouchend=null;
            // this.element.ontouchcancel=null;
            // this.element.onmousedown=null;
            // this.element.onmousemove=null;
            // this.element.onmouseup=null;
            // this.element.onmouseout=null;
            // this.element.onmouseover=null;
            this.element.ontouchstart = this.ontouch.bind(this);
            this.element.ontouchmove = this.ontouch.bind(this);
            this.element.ontouchend = this.ontouch.bind(this);
            this.element.ontouchcancel = this.ontouch.bind(this);
            this.element.onmousedown = this.ontouch.bind(this);
            this.element.onmousemove = this.ontouch.bind(this);
            this.element.onmouseup = this.ontouch.bind(this);
            this.element.onmouseout = this.ontouch.bind(this);
            this.element.onmouseover = this.ontouch.bind(this);
            this.element.onclick = this.ontouch.bind(this);
            // this.element.addEventListener('touchstart', this.ontouch.bind(this));
            // this.element.addEventListener('touchmove', this.ontouch.bind(this));
            // this.element.addEventListener('touchend', this.ontouch.bind(this));
            // this.element.addEventListener('touchcancel', this.ontouch.bind(this));
            // this.element.addEventListener('mousedown', this.ontouch.bind(this));
            // this.element.addEventListener('mousemove', this.ontouch.bind(this));
            // this.element.addEventListener('mouseup', this.ontouch.bind(this));
            // this.element.addEventListener('mouseout', this.ontouch.bind(this));
            // this.element.addEventListener('mouseover', this.ontouch.bind(this));
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
            this.activityManager.sendEvent(mevent);
            // Log.d('ontouch ' + str);
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
