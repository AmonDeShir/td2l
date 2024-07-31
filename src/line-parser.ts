import { Char } from "./char";
import { Text } from "./text";
import { Word } from "./word";

export class LineParser {    
    constructor(
      protected text: string, 
      protected index: number = 0
    ) {}

    prev_char(): Char {
      if (this.index > 0) {
        this.index--;

        return this.read_char();
      }

      return new Char('', this.clone());
    }

    next_char(): Char {
      if (this.index < this.text.length-1) {
        this.index++;

        return this.read_char();
      }
      
      return new Char('', this.clone());
    }
    
    prev_word(): Word {
      const char = this.read_char();
      const start_index = this.index;
      
      if (char.is_white_space() || char.is_empty() || this.index === 0) {
        return new Word('', this.clone());
      }

      this.jump_to_word_start();

      if (!this.prev_char().is_white_space()) {
        this.index = start_index;
        return new Word('', this.clone());
      }

      this.skip_white_space_backward();
      this.jump_to_word_start();

      return this.read_word();
    }

    next_word(): Word {
      const char = this.read_char();
      
      if (char.is_white_space() || char.is_empty() || this.is_eof() || this.is_last_word()) {
        return new Word('', this.clone());
      }

      this.jump_to_word_end();
      this.next_char();
      this.skip_white_space();

      return this.read_word();
    }

    skip_white_space(): void {
      if (!this.read_char().is_white_space()) {
        return;
      }

      this.skip_until(char => char.is_white_space());
      this.next_char();
    }

    skip_white_space_backward(): void {
      if (!this.read_char().is_white_space()) {
        return;
      }

      this.skip_left_until(char => char.is_white_space());
      this.prev_char();
    }

    skip_space(): void {
      if (!this.read_char().is_space()) {
        return;
      }

      this.skip_until(char => char.is_space());
      this.next_char();
    }

    skip_space_backward(): void {
      if (!this.read_char().is_space()) {
        return;
      }

      this.skip_left_until(char => char.is_space());
      this.prev_char();
    }


    skip_line(skip_white_space: boolean = true): void {
      if (this.is_last_line()) {
        return;
      }

      this.jump_to('\n');
      this.next_char();

      if (skip_white_space) {
        this.skip_white_space();
      }
    }

    skip_until(test: (char: Char) => boolean): void {
      let char = this.read_char();

      if (!test(char) || this.is_eof()) {
        return;
      }

      while(test(char) && !char.is_empty()) {
        char = this.next_char();
      }

      if (!char.is_empty()) {
        this.prev_char();
      }
    }

    skip_left_until(test: (char: Char) => boolean): void {
      let char = this.read_char();

      while(test(char) && !char.is_empty()) {
        char = this.prev_char();
      }

      if (!char.is_empty()) {
        this.next_char();
      }
    }

    jump_to(char: string): void {
      this.skip_until(test => !test.is(char));
      this.next_char();
    }

    jump_to_word_start(): void {
      if (this.read_char().is_empty_or_white()) {
        return;
      }

      this.skip_left_until(char => !char.is_white_space());
    }

    jump_to_word_end(): void {
      if (this.read_char().is_empty_or_white()) {
        return;
      }

      this.skip_until(char => !char.is_white_space());
    }

    is_eol(): boolean {
      return this.is_eof() || this.read_char().is_new_line();
    }

    is_eof(): boolean {
      return this.index >= this.text.length-1;
    }

    is_last_line(): boolean {
      const parser = this.clone();

      parser.jump_to('\n');
      
      return parser.is_eof();
    }

    is_first_line(): boolean {
      const parser = this.clone();

      parser.skip_left_until(char => !char.is_new_line());
      parser.prev_char();
      
      return parser.index <= 0;
    }

    is_last_word(): boolean {
      const parser = this.clone();
      const char = this.read_char();

      if (char.is_white_space() || char.is_empty()) {
        return false;
      }

      parser.jump_to_word_end();
      parser.next_char();
      parser.skip_until(char => char.is_white_space());

      return parser.is_eof();
    }

    read_first_word_letter(): Char {
      if (this.read_char().is_empty_or_white()) {
        return new Char('', this.clone());
      }

      const parser = this.clone();
      parser.jump_to_word_start();
      
      return parser.read_char();
    }

    read_last_word_letter(): Char {
      if (this.read_char().is_empty_or_white()) {
        return new Char('', this.clone());
      }

      const parser = this.clone();
      parser.jump_to_word_end();

      return parser.read_char();
    }

    read_left_line_part(): Text {
      return this.read_left_until(char => !char.is_new_line());
    }

    read_right_line_part(): Text {
      return this.read_to('\n');
    }

    read_line(): Text {
      const parser = this.clone();

      parser.skip_left_until(char => !char.is_new_line());
      return parser.read_to('\n');
    }

    read_char(): Char {
      if (this.text.length === 0) {
        return new Char('', this.clone());
      } 

      return new Char(this.text[this.index], this.clone());
    }

    read_prev_char(): Char {
      return this.clone().prev_char();
    }

    read_next_char(): Char {
      return this.clone().next_char();
    }

    read_word(): Word {
      const char = this.read_char();
      const parser = this.clone();

      if (char.is_white_space() || char.is_empty()) {
        return new Word('', this.clone());
      }

      parser.jump_to_word_start();
      const text = parser.read_until(char => !char.is_white_space());

      return new Word(text.get(), parser);
    }

    read_prev_word(): Word {
      return this.clone().prev_word();
    }

    read_next_word(): Word {
      return this.clone().next_word();
    }

    read_until(test: (char: Char) => boolean): Text {
      const parser = this.clone();
      let char = parser.read_char();
      let word = "";

      while(test(char) && !char.is_empty()) {
        word += char.get();
        char = parser.next_char();
      }

      if (word.length > 0) {
        parser.prev_char();
      }

      return new Text(word);
    }

    read_left_until(test: (char: Char) => boolean): Text {
      const parser = this.clone();
      let char = parser.read_char();
      let word = "";

      while(test(char) && !char.is_empty()) {
        word = char.get() + word;
        char = parser.prev_char();
      }

      if (word.length > 0) {
        parser.next_char();
      }

      return new Text(word);
    }

    read_to(char: string): Text {
      const parser = this.clone();
      let current = parser.read_char();
      let word = current.get();

      while(!current.is(char) && !current.is_empty()) {
        current = parser.next_char();
        word += current.get();
      }

      return new Text(word);    
    }

    get_text(): string {
      return this.text;
    }

    get_index(): number {
      return this.index;
    }

    clone(): LineParser {
      return new LineParser(this.text, this.index);
    }
  }