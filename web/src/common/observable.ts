import Observer from "./observer";

export default class Observable<T> {
    constructor(obj: T) {
        this._obj = obj;
    }

    registerObserver(observer: Observer<T>) {
        this.observers.push(observer)
    }

    notifyAll() {
        this.observers.forEach(observer => observer.update(this.obj));
    }

    get obj(): T {
        return this._obj;
    }    
    private observers: Observer<T>[] = []
    private _obj: T;
}

