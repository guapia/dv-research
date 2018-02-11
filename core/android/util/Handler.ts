/// <reference path="Message.ts" />
/// <reference path="Log.ts" />

namespace android.util {
    export class Handler {
        private _hanlderMap = {};
        private _queue:any[]=[];
        constructor(handleMessage:(msg:Message)=>void){
            this.handleMessage = handleMessage;
        }
        public handleMessage:(msg:Message)=>void;

        public sendMessage(msg: Message): boolean {
            return this.sendMessageDelayed(msg, 0);
        }

        public sendMessageDelayed(msg: Message, delay: number): boolean {
            Log.d('sendMessageDelayed delay = ' + delay + "   now =" + Date.now());
            return this.sendMessageAtTime(msg, Date.now() + delay);
        }

        public sendMessageAtTime(msg: Message, uptimeMillis: number): boolean {
            var self = this;
            this._hanlderMap[msg.what] = setTimeout(function () {
                self.handleMessage(msg);
            }, uptimeMillis - Date.now());
            return true;
        }

        public removeMessages(what: number) {
            clearTimeout(this._hanlderMap[what]);
        }


        public obtainMessage(what: number): Message {
            return Message.obtain(what);
        }
    }
}