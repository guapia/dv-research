namespace android.app{
    import Handler = android.util.Handler;
    export class Context{
        private _args:{[name:string]:any}={};
        getArgs(name:string){
            return this._args[name];
        }
        setArgs<T>(name:string,value:T){
            this._args[name]=value;
        }
        setComparedAniamtionCache(cache:ComparedAnimationCache):void{
            this._args['comparedanimation']=cache;
        }
        getComparedAnimationCache():ComparedAnimationCache{
            return this._args['comparedanimation'];
        }
        setHandler(handler:Handler):void{
            this._args['handler']=handler;
        }
        getHandler():Handler{
            return this._args['handler'];
        }
    }
}