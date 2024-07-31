import { LineReader } from "./line-reader";

export class Char {
  constructor(
    protected value: string,
    protected navigator: LineReader = new LineReader(value), 
  ) {}

  is(char: string): boolean {
    return char === this.value;
  }

  is_next(char: string): boolean {
    return this.next().is(char);
  }

  is_prev(char: string): boolean {
    return this.prev().is(char);
  }

  is_empty(): boolean {
    return this.value.length === 0;
  }

  is_white_space(): boolean {
    return !this.is_empty() && this.value.trim() === ''
  }

  is_empty_or_white(): boolean {
    return this.value.trim() === ''
  }

  is_space(): boolean {
    return this.value === ' ';
  }

  is_number(): boolean {
    return !this.is_empty_or_white() && Number.isFinite(Number(this.value))
  }

  is_letter(): boolean {
    return !this.is_empty()&& this.value.toLowerCase() !== this.value.toUpperCase();
  }

  is_alpha_numeric(): boolean {
    return this.is_number() || this.is_letter();
  }

  is_uppercase(): boolean {
    return this.is_letter() && this.value.toUpperCase() === this.value;
  }

  is_lowercase(): boolean {
    return this.is_letter() && this.value.toLowerCase() === this.value;
  }

  is_new_line(): boolean {
    if (this.is_empty()) {
      return false;
    }

    if (this.value === '\r' && this.is_next('\n')) {
      return true;
    }

    return this.value === '\n';
  }

  is_comma(): boolean {
    return this.value === ',';
  }

  is_slash(): boolean {
    return this.value === '/';
  }

  is_back_slash(): boolean {
    return this.value === '\\';
  }

  is_quote(): boolean {
    return this.value === '"';
  }

  is_single_quote(): boolean {
    return this.value === "'";
  }

  to_number(): number {
    if (this.is_empty_or_white()) {
      return NaN;
    }

    return Number(this.value);
  }

  get(): string {
    return this.value;
  }

  index(): number {
    return this.navigator.get_index();
  }

  next(): Char {
    return this.navigator.read_next_char();
  }

  prev(): Char {
    return this.navigator.read_prev_char();
  }
}