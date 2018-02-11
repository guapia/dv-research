namespace android.view.event {
    export class MotionEvent {


        public static ACTION_DOWN = 0;
        public static ACTION_UP = 1;
        public static ACTION_MOVE = 2;
        public static ACTION_CANCEL = 3;
        public static ACTION_OUTSIDE = 4;

        public static ACTION_MOUSE_DOWN =5;
        public static ACTION_MOUSE_MOVE = 6;
        public static ACTION_MOUSE_UP=7;
        public static ACTION_MOUSE_OVER=8;
        public static ACTION_MOUSE_OUT = 9;
        public static ACTION_MOUSE_ON =11;
        public static ACTION_CLICK = 10;

        public static ACTION_SCROLL = 11;
        public static ACTION_MOUSE_WHEEL = 12;
        
        private _x: number;
        private _y: number;
        private _deltaY:number;
        private _deltaX:number;

        private _action: number;
        
        public screenX:number;
        public screenY:number;
        
        public element:HTMLElement;

        get x() {
            return this._x;
        }
        set x(v:number){
            this._x = v;
        }
        set y(v:number){
            this._y = v;
        }
        get y() {
            return this._y;
        }
        
        get deltaX() {
            return this._deltaX;
        }
        set deltaX(v:number){
            this._deltaX = v;
        }
        set deltaY(v:number){
            this._deltaY = v;
        }
        get deltaY() {
            return this._deltaY;
        }
        get action() {
            return this._action;
        }
        set action(value:number){
            this._action = value;
        }
        public clone():MotionEvent{
            return new MotionEvent(this._x,this._y,this._action);
        }
        constructor(x:number, y:number, action:number) {
            this._x = x;
            this._y = y;
            this.screenX = x;
            this.screenY = y;
            this._action = action;
        }

        offset(x:number,y:number):void{
            this._x+=x;
            this._y+=y;
            this.screenX+=x;
            this.screenY+=y;
        }

        toString():string{
            let delta:string = (this.deltaX== null?"":" , deltaX = "+this.deltaX)+(this.deltaY == null ? "":" , deltaY = "+this.deltaY);
            return " x = "+this._x+" , y = "+this._y +delta +" , action = " + this._getaction();
        }
        _getaction():string{
            switch(this._action){
                case 0:
                return "ACTION_OUTSIDE";
                case 1:
                return  "ACTION_UP" ;
                case 2:
                return  "ACTION_MOVE" ;
                case 3:
                return "ACTION_CANCEL";
                case 4:
                return "ACTION_OUTSIDE";
                case 5:
                return "ACTION_MOUSE_DOWN";
                case 6:
                return "ACTION_MOUSE_MOVE";
                case 7:
                return "ACTION_MOUSE_UP";
                case 8:
                return "ACTION_MOUSE_OVER";
                case 9:
                return "ACTION_MOUSE_OUT";
                case 10:
                return "ACTION_CLICK";
                case 11:
                return "ACTION_MOUSE_ON";
                case 12:
                return "ACTION_MOUSE_WHEEL";
            }
        }
    }
}