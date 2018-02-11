/// <reference path="../graphics/Util.ts" />

namespace android.device{
    import Font = android.graphics.Font;
    import StrokeStyle = android.graphics.StrokeStyle;
    import Style = android.graphics.Style;
    export class Default{
        static get font(){
            return new Font(10,"","white");
        }
        static get strokestyle(){
            return new StrokeStyle(1,'transparent');
        }
        static get style(){
            return new Style('transparent',Default.strokestyle);
        }
    }
}