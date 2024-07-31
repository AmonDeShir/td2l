import { Char } from "./char";
import { LineReader } from "./line-reader";

export class Word {
  constructor(
    protected value: string,
    protected parser: LineReader = new LineReader(value), 
  ) {}

  is(word: string): boolean {
    return this.value === word;
  }

  is_next(word: string): boolean {
    return this.next().is(word);
  }

  is_prev(word: string): boolean {
    return this.prev().is(word);
  }

  is_empty(): boolean {
    return this.value.length === 0;
  }

  contain(word: string): boolean {
    if (word.length <= 0) {
      return false;
    }

    return this.value.includes(word);
  }

  get(): string {
    return this.value;
  }
  
  first_char(): Char {
    return this.parser.read_first_word_letter();
  }

  last_char(): Char {
    return this.parser.read_last_word_letter();
  }
  
  parse(): LineReader {
    return new LineReader(this.value);
  }

  next(): Word {
    return this.parser.read_next_word();
  }

  prev(): Word {
    return this.parser.read_prev_word();
  }
}