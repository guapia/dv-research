/// <reference path="../../base.ts" />
namespace android.test{
    'use strict';
    import View = android.view.View;
    import ViewGroup = android.view.ViewGroup;
    import Animation = android.view.animation.Animation;
    export abstract class BasePlot extends ViewGroup{
        protected _animation:Animation;
        
        get layout():BaseLayout{
            return null;
        }
        public abstract beginLoadingAnimation():void;
        // get comparedAniamtionCache():ComparedAnimationCache{
        //     if(this.getContext()){
        //         return this.getContext().getArgs('comparedanimation');
        //     }
        //     return null;
        // }
    }
}