/// <reference path="Activity.ts" />
/// <reference path="../widget/RootView.ts" />
/// <reference path="../device/Device.ts" />
/// <reference path="../view/event/MotionEvent.ts" />


namespace android.app {
    import Padding = android.graphics.Padding;
    import Gravity = android.graphics.Gravity;
    import Rect = android.graphics.Rect;
    import AlignElement = android.graphics.AlignElement;
    import Margin = android.graphics.Margin;
    import Size = android.graphics.Size;
    import Canvas = android.graphics.Canvas;
    import ViewGroup = android.view.ViewGroup;
    import View = android.view.View;
    import Point = android.graphics.Point;
    import MeasureSpec = android.view.MeasureSpec;
    import Orientation = android.graphics.Orientation;
    import LayoutParams = android.view.LayoutParams;
    import RenderType = android.graphics.RenderType;
    import RootView = android.widget.RootView;
    import LinearLayout = android.widget.LinearLayout;
    import FrameLayout = android.widget.FrameLayout;
    import Device = android.device.Device;
    import MotionEvent = android.view.event.MotionEvent;

    export class ActivityManager {
        private stack: Activity[] = new Array();
        private rootView: RootView;

        constructor(rendertype:RenderType,element:HTMLElement) {
            this.rootView = new RootView(null);// need to be application context
            // this.rootView.attachRender(canvas);
            this.rootView.attachElement(element,rendertype);            
        }
     
        public sendStartActivity(intent: Intent,bundle: Bundle, requestCode: number, resultCode:number) {
            var targetActivity = this.createActivity(intent.getClass());
            var currentActivity: Activity = this.stack[this.stack.length - 1];
            if (currentActivity) {
                currentActivity['onPause'].call(currentActivity);
            }
            this.rootView.removeAllViews();
            this.stack.push(targetActivity);
            targetActivity['attatchRootView'].call(targetActivity, this.rootView);
            targetActivity['onResume'].call(targetActivity);
            // TO DO ...  lanch mode
            targetActivity['onCreate'].call(targetActivity,bundle);
            // this.rootView.background ='white';
            this.rootView.invalidate(true);

        }
        private createActivity(activityClass: any): Activity {
            var activity: Activity = new activityClass(this);
            return activity;
        }
        public getCurrentActivity(){
            return this.stack[this.stack.length-1];
        }
    }
}