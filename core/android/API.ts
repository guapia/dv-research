namespace android{
    /**
     * @hidden
     * @param callBack 
     */
    export function requestAnimationFrame(callBack: FrameRequestCallback) {
        if (__callbacklist.length == 0) {
            __callbacklist.length = 0;
            __callbacklist.push(callBack);
            window.requestAnimationFrame(__frameCallBack);
        } else {
            __callbacklist.push(callBack);
        }
    }
    /**
     * @hidden
     * @param time
     */
    export function __frameCallBack(time: number): void {
        let list = [].concat(__callbacklist);
        __callbacklist.length = 0;
        for (; ;) {
            let callback = list.shift();
            if (callback == null) {

                break;
            } else {
                callback(time);
            }
        }
        list.length = 0;
    }
    /**
     * @hidden
     */
    const __callbacklist: FrameRequestCallback[] = [];
}
