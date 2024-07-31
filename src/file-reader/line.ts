import { FileReader } from "./file-reader";
import { Text } from "./text";

export class Line extends Text {
    constructor(protected value: string, protected navigator: FileReader = new FileReader(value)) {
        super(value);
    }

    next(): Line {
        return this.navigator.read_next_line();
    }

    prev(): Line {
        return this.navigator.read_prev_line();
    }
}