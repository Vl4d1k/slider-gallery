import {action, computed, observable, makeObservable} from "mobx";

export default class AppStore {
    @observable
    counter = 0;

    constructor() {
        makeObservable(this);
    }

    @computed
    get counterV2() {
        return this.counter * 2;
    }

    @action.bound
    inc() {
        this.counter++;
    }

}
