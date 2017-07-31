export class Person {
    name: String;
    height: number;
    gender: String;
    birth_year: String;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}