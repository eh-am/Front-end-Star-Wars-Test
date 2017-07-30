export class Person {
    name: String;
    height: number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}