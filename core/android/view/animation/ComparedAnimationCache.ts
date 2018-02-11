/// <reference path="./AlphaAnimation.ts" />


namespace android {
    'use strict';
    import Animation = android.view.animation.Animation;
    import AnimationEase = android.view.animation.AnimationEase;
    import AlphaAnimation = android.view.animation.AlphaAnimation;
    import ViewState = android.view.ViewState;
    import Rect = android.graphics.Rect;
    import Canvas = android.graphics.Canvas;
    import LayoutInfo = android.view.LayoutInfo;
    export class ComparedAnimationCache {
        private __prepare:boolean = false;
        getPreparing():boolean{
            let p = this.__prepare;
            this.__prepare = false;
            return p;
        }
        preparing():void{
            this.__prepare = true;
        }
        private _cache: any = {};
        public get isempty(): boolean {
            let index: number = 0;
            for (let key in this._cache) {
                index++;
                if (index > 0) { return false; }
            }
            return true;
        }
        public resetCache(views: ComparedView[]) {
            this._cache = {};
            for (let view of views) {
                this._cache[view.id] = view;
            }
        }
        public clear(){
            this._cache={};
        }
        public startCompare(views: ComparedView[]): boolean {
            let currentCache: any = {};
            for (let view of views) {
                currentCache[view.id] = view;
            }
            if (!this.isempty) {
                for (let key in currentCache) {
                    let fromview = this._cache[key];
                    let toview = currentCache[key];
                    if (toview != null) {
                        this.__startAnimation(fromview, toview);
                    }
                }
                this._cache = currentCache;
                return true;
            } else {
                this._cache = currentCache;
                return false;
            }
        }
        private __startAnimation(fromview: ComparedView, toview: ComparedView): void {
            if(fromview == null){
                let animation :AlphaAnimation = new AlphaAnimation();
                animation.duration = 600;
                animation.from = 0;
                animation.to = 1;
                toview.startAnimation(animation);
                console.log("start Alpha animation   ======  ");
            }else{
                toview.startAnimation(toview.getComparedAnimation(fromview));
            }

        }

        private __switchLayout(view1: ComparedView, view2: ComparedView) {
            let layoutInfo: LayoutInfo = view1.layoutInfo.clone();
            // view2.layoutInfo.reset(layoutInfo.outterrect.left,layoutInfo.outterrect.top,layoutInfo.outterrect.right,layoutInfo.outterrect.bottom,layoutInfo.padding,layoutInfo.drawindex);
            view1.layoutInfo.innerrect = view2.layoutInfo.innerrect.clone();
            view2.layoutInfo.innerrect = layoutInfo.innerrect;

        }

    }

    
}