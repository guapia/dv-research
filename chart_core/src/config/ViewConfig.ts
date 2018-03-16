/// <reference path="../base.ts" />
namespace android.test.config{
    import Style = android.graphics.Style;
    import FillStyle = android.graphics.FillStyle;
    import StrokeStyle= android.graphics.StrokeStyle;
    import LinearGradient = android.graphics.LinearGradient;
    import Gravity = android.graphics.Gravity;
    import Util = android.graphics.Util;
    export class ViewConfig{
        private _gravity:Gravity;
        private _background:string|FillStyle;
        private _stroke:StrokeStyle;
        
        get background():string|FillStyle{
            return this._background;
        }
        get stroke():StrokeStyle{
            return this._stroke;
        }
        get gravity():Gravity{
            return this._gravity;
        }
        set gravity(val:Gravity){
            if(val != null && val != this._gravity){
                this._gravity = Util.asEnum(val,Gravity,null);
            }
        }

        constructor(option:any){
            if(option.background){
                
                if(option.background instanceof Object){
                    this._background = new FillStyle();
                    if(option.background.fill instanceof Object){
                        //TO DO
                    }
                    if(option.background.shadow instanceof Object){
                        //TO DO
                    }
                }else{
                    this._background = option.background;
                }
            }
            if(option.stroke){
                if(option.stroke ){
                    this._stroke = new StrokeStyle(option.stroke.width,option.stroke.color,option.stroke.dash,option.stroke.dashoffset);
                }
            }
            this.gravity = option.gravity;

        }
        
    }
}