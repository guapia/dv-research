/// <reference path="../../base.ts" />
namespace android.test{
    'use strict';
    import Rect = android.graphics.Rect;    
    import Context = android.app.Context;
    /**
     * BaseLayout
     */
    export class BaseLayout{
        protected __shapelist :PlotShape[] = [];
        private __context:Context;
        constructor(context:Context){
            this.__context = context;
        }
        get context():Context{
            return this.__context;
        }
        convert(...args):PlotShape[]{
            throw 'fuck Error';
        }
        public get shapeList():PlotShape[]{
            return this.__shapelist;
        }
        
    }


        
  
   
    
}