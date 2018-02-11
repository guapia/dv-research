/// <reference path="./app/Intent.ts" />

/// <reference path="graphics/Canvas.ts" />
/// <reference path="./app/ActivityManager.ts" />
/// <reference path="./util/Log.ts" />
/// <reference path="./view/event/MotionEvent.ts" />


namespace android {
    import ActivityManager = android.app.ActivityManager;
    import Canvas = android.graphics.Canvas;
    import RenderType = android.graphics.RenderType;
    import Intent = android.app.Intent;
    import Log = android.util.Log;
    import Device = android.device.Device;
    import MotionEvent = android.view.event.MotionEvent;
    import Bundle = android.app.Bundle;
    import Activity = android.app.Activity;
    export class StartUp {
        private activityManager: ActivityManager;
        private canvas: Canvas;
        private config: any;
        private element: HTMLElement;
        constructor() {
            this.loadConfig();
            this.element = document.getElementById(this.getRootElement());
            this.element.innerHTML = '';
            if (this.getFill() === 'parent') {
                Device.width = this.element.clientWidth;
                Device.height = this.element.clientHeight;
            }
            let type:RenderType = RenderType.Canvas;
            if (this.getRenderType() == 'canvas') {
                type = RenderType.Canvas;
            } else {
                type = RenderType.Svg;
            }
            this.activityManager = new ActivityManager(type,this.element);
           
        }
        private ontouch(event) {
            event.preventDefault();
            event.stopPropagation();
            var event = event || window.event;
            var str = '';
            let mevent: MotionEvent = new MotionEvent(0, 0, 0);
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
                    mevent = new MotionEvent(event.clientX, event.clientY,MotionEvent.ACTION_CLICK);
                    break;

            }
            mevent.element = this.element;
            var elementrect = this.element.getClientRects();
            mevent.x = mevent.x - elementrect[0].left;
            mevent.y = mevent.y - elementrect[0].top;
        }
        public start() {
            var intent: Intent = new Intent();
            intent.setClass(null, this.getLaunchActivity());
            var bundle = new android.app.Bundle();
            bundle.putDefault(this.getLaunchParams());
            this.activityManager.sendStartActivity(intent, bundle, 0, 0);
        }
        private getLaunchActivity() {
            return this.config.launchActivity.target;
        }
        private getLaunchParams() {
            return this.config.launchActivity.params;
        }
        private getRootElement() {
            return this.config.rootcontainer.target;
        }
        private getRenderType() {
            return this.config.rendertype ? this.config.rendertype.target : 'svg';
        }
        private getFill() {
            return this.config.fill;
        }
        private loadConfig() {
            this.config = window['mainfest'].config;
        }
        public getCurrentActivity():Activity{
            return this.activityManager.getCurrentActivity();
        }

    }
}

