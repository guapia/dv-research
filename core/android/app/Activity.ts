/// <reference path="Context.ts" />
/// <reference path="../widget/FrameLayout.ts" />
/// <reference path="../util/Log.ts" />


namespace android.app{

    import View = android.view.View;
    import Padding = android.graphics.Padding;
    import Gravity = android.graphics.Gravity;
    import Rect = android.graphics.Rect;
    import AlignElement = android.graphics.AlignElement;
    import Margin = android.graphics.Margin;
    import Size = android.graphics.Size;
    import Canvas = android.graphics.Canvas;
    import ViewGroup = android.view.ViewGroup;
    import Point = android.graphics.Point;
    import MeasureSpec = android.view.MeasureSpec;
    import Orientation = android.graphics.Orientation;
    import LayoutParams = android.view.LayoutParams;
    import RenderType = android.graphics.RenderType;
    import RootView = android.widget.RootView;
    import LinearLayout = android.widget.LinearLayout;
    import FrameLayout = android.widget.FrameLayout;
    import Log = android.util.Log;

    export class Activity extends Context{
        private rootView :FrameLayout ;
        private activityManager :ActivityManager;
        constructor(am:ActivityManager){
            super();
            if(am instanceof ActivityManager){
                this.activityManager = am;
            }else{
                throw "can't create Activity new ";
            }
            this.rootView = new FrameLayout(this);
            let lp : LayoutParams = new LayoutParams(LayoutParams.MATCH_PARENT,LayoutParams.MATCH_PARENT,null);
            this.rootView.layoutParams = lp;
            // this.rootView.background = 'lightblue';
        }
        private attatchRootView(view:RootView){
            view.addView(this.rootView,0);
        }
        protected onCreate(bundle:Bundle){
            Log.d("oncreate");
        }
        protected onPause(){
            Log.d("onPause");
        }
        protected onResume(){
            Log.d('onResume');
        }
        protected onDestory(){
            Log.d('onDestory');
        }
        protected setContentView(view:View){
            this.rootView.addView(view,0);
        }
        protected startActivityForResult(intent:Intent,bundle:Bundle,requestCode:number,resultCode:number){
            this.activityManager.sendStartActivity(intent,bundle,requestCode,resultCode);
        }
        
    }
}