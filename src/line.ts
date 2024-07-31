import { FileParser } from "./file-parser";
import { LineParser } from "./line-parser";
import { Text } from "./text";

export class Line extends Text {
    constructor(protected value: string, protected parser: FileParser = new FileParser(value)) {
        super(value);
    }

    next(): Line {
        return this.parser.read_next_line();
    }

    prev(): Line {
        return this.parser.read_prev_line();
    }
}