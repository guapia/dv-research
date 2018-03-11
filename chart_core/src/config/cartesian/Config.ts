/// <reference path="../../base.ts" />

namespace android.test.config.cartesian{
    import Gravity = android.graphics.Gravity;
    import Util =android.graphics.Util;

    export class Config{
        private _axis:AxisConfig[];
        private _legend:LegendConfig[];
        private _plot:ViewConfig;

        public get axis():AxisConfig[]{
            return this._axis;
        }
      
        public get legend():LegendConfig[]{
            return this._legend;
        }

        public get plot():ViewConfig{
            return this._plot;
        }
        constructor(option:any){
            if(option.axis != null){

                this._axis =[];
                option.axis.forEach(element => {
                    this._axis.push(new AxisConfig(element));
                });
            }
            if(option.legend != null){
                this._legend =[];
                option.legend.forEach(element=>{
                    this._legend.push(new LegendConfig(element));
                })
            }
            if(option.plot != null){
                this._plot = new ViewConfig(option.plot);
            }
        }
    }

    export class AxisConfig extends ViewConfig{
        constructor(option:any){
            super(option);

        }
    }

    export class LegendConfig extends ViewConfig{
        constructor(option:any){
            super(option);
        }
    }
    
}