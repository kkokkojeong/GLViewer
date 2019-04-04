class CustomError {
    constructor(message) {
        this.message = message;
        try {
            throw new Error();
        }
        catch (e) {
            this.stack = e.stack;
        }
    }
    toString() {
        let str = `${this.name} : ${this.message}`;
        if (str) {
            str += `\n ${this.stack.toString()}`;
        }
        return str;
    }
}
export class DeveloperError extends CustomError {
    constructor(message) {
        super(message);
        this.name = 'DeveloperError';
    }
    toString() {
        return this.toString();
    }
}
export class RuntimeError extends CustomError {
    constructor(message) {
        super(message);
        this.name = 'RuntimeError';
    }
    toString() {
        return this.toString();
    }
}
//# sourceMappingURL=CustomError.js.map