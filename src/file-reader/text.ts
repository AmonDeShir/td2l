import { LineReader } from "./line-reader";

export class Text {
    constructor(
        protected value: string, 
    ) {}

    is(value: string): boolean {
        return this.value === value;
    }
    
    is_empty(): boolean {
        return this.value.length === 0;
    }

    contain(text: string): boolean {
        if (text.length <= 0) {
            return false;
        }

        return this.value.includes(text);
    }

    get(): string {
        return this.value;
    }

    parse(): LineReader {
        return new LineReader(this.value);
    }
}