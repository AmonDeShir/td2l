import { Line } from "./line";
import { LineReader } from "./line-reader";

export class FileReader extends LineReader {
    protected line: string;

    constructor(protected text: string, protected index: number = 0) {
        super(text, index);
    }

    next_line(): Line {
        if (this.is_last_line()) {
            return new Line('', this.clone());
        }

        this.jump_to('\n');

        if (this.next_char().is_new_line()) {
            return new Line('\n', this.clone());
        }

        return this.read_line();
    }

    prev_line(): Line {
        if (this.is_first_line()) {
            return new Line('', this.clone());
        }

        this.skip_left_until(char => !char.is_new_line());
        this.prev_char();

        if (this.read_prev_char().is_new_line()) {
            return new Line('\n', this.clone());
        }

        this.prev_char();
        this.skip_left_until(char => !char.is_new_line());
        
        return this.read_line();
    }
    
    read_line(): Line {
        return new Line(super.read_line().get(), this.clone());
    }

    read_next_line(): Line {
        return this.clone().next_line();
    }

    read_prev_line(): Line {
        return this.clone().prev_line();
    }
  
    clone(): FileReader {
        return new FileReader(this.text, this.index);
    }
  }