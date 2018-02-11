/// <reference path="DataSetObserver.ts" />

namespace android.database {
    export  class Observable<T>{
        protected readonly mObservers: Array<T> = new Array<T>();
        public registerObserver(observer: T): void {
            if (!observer) {
                throw "The observer is null or undefine";
            }
            if (this.mObservers.indexOf(observer) > -1) {
                throw "Observer " + observer + " is already registered ";
            }
            this.mObservers.push(observer);
        }
        public unregisterObserver(observer: T): void {
            if (!observer) {
                throw "The observer is null or undefine";
            }
            let index: number = this.mObservers.indexOf(observer);
            if (index === -1) {
                throw "Observer " + observer + " was not registered ";
            }
            this.mObservers.splice(index, 1);
        }
        public unregisterAll() {
            this.mObservers.length = 0;
        }
    }
    
    export class DataSetObservable extends Observable<DataSetObserver>{
        public notifyChanged() {
            for (let i: number = this.mObservers.length - 1; i >= 0; i--) {
                this.mObservers[i].onChanged();
            }

        }

        public notifyInvalidated() {
            for (let i: number = this.mObservers.length - 1; i >= 0; i--) {
                this.mObservers[i].onInvalidated();
            }
        }
    }
}
