import AppStore from "@store/App";

export default class Stores {
    readonly app: AppStore

    constructor() {
        this.app = new AppStore();
    }
}
