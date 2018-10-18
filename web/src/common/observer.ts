import Observable from "./observable";

export default interface Observer<T> {
    update(object: T): void;
}