import { expect } from "chai";
import { describe } from "mocha";
import { LineParser } from "../src/line-parser";

describe('LineParser', () => {
    describe('prev_char', () => {
        it(`shouldn't change index if current char is the first one`, () => {
            const parser = new LineParser('text', 0);
            parser.prev_char();
        
            expect(parser.get_index()).is.eql(0);
        })

        it(`should return empty char if current char is the first one`, () => {
            expect(new LineParser('text', 0).prev_char().is_empty()).to.true;
        })

        it('should decrement index', () => {
            const parser = new LineParser('text', 3);
            parser.prev_char();
        
            expect(parser.get_index()).is.eql(2);
        })

        it('should return previous char', () => {
            const parser = new LineParser('text', 3);

            expect(parser.prev_char().get()).is.eql('x');
            expect(parser.prev_char().get()).is.eql('e');
            expect(parser.prev_char().get()).is.eql('t');
            expect(parser.get_index()).is.eql(0);
        })
    })

    describe('next_char', () => {
        it(`shouldn't change index if current char is the last one`, () => {
            const parser = new LineParser('text', 3);
            parser.next_char();
        
            expect(parser.get_index()).is.eql(3);
        })

        it(`should return empty char if current char is the last one`, () => {
            expect(new LineParser('text', 3).next_char().is_empty()).to.true;
        })

        it('should increment index', () => {
            const parser = new LineParser('text', 0);
            parser.next_char();
        
            expect(parser.get_index()).is.eql(1);
        })

        it('should return next char', () => {
            const parser = new LineParser('text', 0);

            expect(parser.next_char().get()).is.eql('e');
            expect(parser.next_char().get()).is.eql('x');
            expect(parser.next_char().get()).is.eql('t');
            expect(parser.get_index()).is.eql(3);
        })
    })

    describe('prev_word', () => {
        it(`should return empty word if the current one is the first one`, () => {
            const parser = new LineParser('one two', 0);
            expect(parser.prev_word().is_empty()).to.be.true;
        })

        it(`shouldn't change index if current word is the first one`, () => {
            const parser = new LineParser('one two', 2);
            parser.prev_word();
        
            expect(parser.get_index()).is.eql(2);
        })
        
        it(`should load previous word`, () => {
            const parser = new LineParser('one two', 4);        
            expect(parser.prev_word().get()).is.eql("one");
        })
        
        it(`should change index and selected char`, () => {
            const parser = new LineParser('one two three', 9);        

            parser.prev_word();

            expect(parser.get_index()).is.eql(4);
            expect(parser.read_char().get()).is.eql("t");
        })
    })

    describe('next_word', () => {
        it(`should return empty word if the current one is the last one`, () => {
            const parser = new LineParser('one two', 6);
            expect(parser.next_word().is_empty()).to.be.true;
        })

        it(`shouldn't change index if current word is the last one`, () => {
            const parser = new LineParser('one two', 6);
            parser.next_word();
        
            expect(parser.get_index()).is.eql(6);
        })
        
        it(`should load next word`, () => {
            const parser = new LineParser('one two', 2);        
            expect(parser.next_word().get()).is.eql("two");
        })
        
        it(`should change index and selected char`, () => {
            const parser = new LineParser('one two three', 1);        

            parser.next_word();

            expect(parser.get_index()).is.eql(4);
            expect(parser.read_char().get()).is.eql("t");
        })
    })
    
    describe('skip_white_space', () => {
        it(`should skip white space`, () => {
            const parser = new LineParser('one  \n  two', 3);
           
            parser.skip_white_space();

            expect(parser.get_index()).to.eql(8);
            expect(parser.read_char().get()).to.eql("t");
            expect(parser.read_word().get()).to.eql("two");
        })

        it(`should do nothing if selected char is not a wait space character`, () => {
            const parser = new LineParser('one two', 1);
            parser.skip_white_space();
        
            expect(parser.get_index()).is.eql(1);
        })

        it(`should do nothing if selected char is the last character`, () => {
            const parser = new LineParser('one two\n', 7);
            parser.skip_white_space();
        
            expect(parser.get_index()).is.eql(7);
        })
    })

    describe('skip_white_space_backward', () => {
        it(`should skip white space backward`, () => {
            const parser = new LineParser('one  \n  two', 7);
           
            parser.skip_white_space_backward();

            expect(parser.get_index()).to.eql(2);
            expect(parser.read_char().get()).to.eql("e");
            expect(parser.read_word().get()).to.eql("one");
        })

        it(`should do nothing if selected char is not a wait space character`, () => {
            const parser = new LineParser('one two', 5);
            parser.skip_white_space_backward();
        
            expect(parser.get_index()).is.eql(5);
        })

        it(`should do nothing if selected char is the first character`, () => {
            const parser = new LineParser('one two\n', 0);
            parser.skip_white_space_backward();
        
            expect(parser.get_index()).is.eql(0);
        })
    })

    describe('skip_space', () => {
        it(`should skip space`, () => {
            const parser = new LineParser('one  \n  two', 3);
           
            parser.skip_space();

            expect(parser.get_index()).to.eql(5);
            expect(parser.read_char().get()).to.eql("\n");
            expect(parser.read_word().get()).to.eql("");
        })

        it(`should do nothing if selected char is not a space`, () => {
            const parser = new LineParser('one\ntwo', 3);
            parser.skip_space();
        
            expect(parser.get_index()).is.eql(3);
        })

        it(`should do nothing if selected char is not a wait space character`, () => {
            const parser = new LineParser('one two', 1);
            parser.skip_space();
        
            expect(parser.get_index()).is.eql(1);
        })

        it(`should do nothing if selected char is the last character`, () => {
            const parser = new LineParser('one two ', 7);
            parser.skip_space();
        
            expect(parser.get_index()).is.eql(7);
        })
    })

    describe('skip_space_backward', () => {
        it(`should skip space backward`, () => {
            const parser = new LineParser('one  \n  two', 7);
           
            parser.skip_space_backward();

            expect(parser.get_index()).to.eql(5);
            expect(parser.read_char().get()).to.eql("\n");
            expect(parser.read_word().get()).to.eql("");
        })

        it(`should do nothing if selected char is not a space`, () => {
            const parser = new LineParser('one\ntwo', 3);
            parser.skip_space_backward();
        
            expect(parser.get_index()).is.eql(3);
        })

        it(`should do nothing if selected char is not a wait space character`, () => {
            const parser = new LineParser('one two', 1);
            parser.skip_space_backward();
        
            expect(parser.get_index()).is.eql(1);
        })

        it(`should do nothing if selected char is the first character`, () => {
            const parser = new LineParser('one two ', 0);
            parser.skip_space_backward();
        
            expect(parser.get_index()).is.eql(0);
        })
    })

    describe('skip_line', () => {
        it(`should skip a line and jump to the first no white character`, () => {
            const parser = new LineParser('one  \n  two', 1);
           
            parser.skip_line();

            expect(parser.get_index()).to.eql(8);
            expect(parser.read_char().get()).to.eql("t");
            expect(parser.read_word().get()).to.eql("two");
        })

        it(`should skip a line and not jump to the first no white character if the skip_white_space flag is set to false`, () => {
            const parser = new LineParser('one  \n  two', 1);
           
            parser.skip_line(false);

            expect(parser.get_index()).to.eql(6);
            expect(parser.read_char().get()).to.eql(" ");
            expect(parser.read_word().get()).to.eql("");
        })

        it(`should do nothing if selected char is the last character`, () => {
            const parser = new LineParser('one\ntwo ', 7);
            parser.skip_line();
        
            expect(parser.get_index()).is.eql(7);
        })

        it(`should do nothing if selected char is in the the last character`, () => {
            const parser = new LineParser('one\ntwo ', 4);
            parser.skip_line();
        
            expect(parser.get_index()).is.eql(4);
        })
    })

    describe(`skip_until`, () => {
        it(`should skip characters until function return true`, () => {
            const parser = new LineParser('123123123123123123123e', 1);
            parser.skip_until(char=>char.is_number());

            expect(parser.read_char().get()).to.eql("3");
            expect(parser.next_char().get()).to.eql("e");
        })

        it(`should do nothing if function return false for current character`, () => {
            const parser = new LineParser('e123123123123123123123e', 0);
            parser.skip_until(char=>char.is_number());

            expect(parser.get_index()).to.eql(0);
        })
    })

    describe(`skip_left_until`, () => {
        it(`should skip characters backward until function return true`, () => {
            const parser = new LineParser('e123123123123123123123', 21);
            parser.skip_left_until(char=>char.is_number());

            expect(parser.read_char().get()).to.eql("1");
            expect(parser.prev_char().get()).to.eql("e");
        })

        it(`should do nothing if function return false for current character`, () => {
            const parser = new LineParser('e12312312312312312312e', 21);
            parser.skip_left_until(char=>char.is_number());

            expect(parser.get_index()).to.eql(21);
        })
    })

    describe(`jump_to`, () => {
        it(`should set index to the first matching character`, () => {
            const parser = new LineParser('1231231e23123123123123e', 0);
            parser.jump_to('e');

            expect(parser.read_char().get()).to.eql("e");
            expect(parser.get_index()).to.eql(7);
        })

        it(`should skip all characters if the chose one not exist`, () => {
            const parser = new LineParser('0123456789', 0);
            parser.jump_to('e');

            expect(parser.read_char().get()).to.eql("9");
        })
    })

    describe(`jump_to_word_start`, () => {
        it(`should do nothing if the selected char is a wait space`, () => {
            const parser = new LineParser('one two three', 3);
            parser.jump_to_word_start();

            expect(parser.get_index()).to.eql(3);
        })

        it(`should jump to the first letter of the selected word`, () => {
            const parser = new LineParser('one two three', 5);
            parser.jump_to_word_start();

            expect(parser.read_char().get()).to.eql('t');
        })
    })

    describe(`jump_to_word_end`, () => {
        it(`should do nothing if the selected char is a wait space`, () => {
            const parser = new LineParser('one two three', 3);
            parser.jump_to_word_end();

            expect(parser.get_index()).to.eql(3);
        })

        it(`should jump to the last letter of the selected word`, () => {
            const parser = new LineParser('one two three', 5);
            parser.jump_to_word_end();

            expect(parser.read_char().get()).to.eql('o');
        })
    })

    describe('is_eol', () => {
        it(`should return true if the selected char is the last one`, () => {
            expect(new LineParser('0123456789', 9).is_eol()).to.be.true;
        })

        it(`should return true if the selected char is the new line char`, () => {
            expect(new LineParser('012\n456789', 3).is_eol()).to.be.true;
        })

        it(`should return false if the selected char isn't a new line character`, () => {
            expect(new LineParser('0123456789', 3).is_eol()).to.be.false;
        })

        it(`should return false if the selected char isn't the last one character`, () => {
            expect(new LineParser('0123456789', 3).is_eol()).to.be.false;
        })
    })

    describe('is_eof', () => {
        it(`should return true if the selected char is the last one`, () => {
            expect(new LineParser('0123456789', 9).is_eof()).to.be.true;
        })

        it(`should return false if the selected char isn't the last one character`, () => {
            expect(new LineParser('0123456789', 3).is_eof()).to.be.false;
        })
    })

    describe('is_last_line', () => {
        it(`should return true if the selected char is in the last line`, () => {
            expect(new LineParser('012\n3456789', 7).is_last_line()).to.be.true;
        })

        it(`should return true if the selected char is in the last line (\\n)`, () => {
            expect(new LineParser('012\n3456789\n', 7).is_last_line()).to.be.true;
        })

        it(`should return true if the selected char is the last character`, () => {
            expect(new LineParser('012\n3456789', 10).is_last_line()).to.be.true;
        })

        it(`should return true if the selected char is the last character (\\n)`, () => {
            expect(new LineParser('012\n3456789\n', 11).is_last_line()).to.be.true;
        })

        it(`should return false if the selected char isn't in the last line`, () => {
            expect(new LineParser('012\n3456789', 2).is_last_line()).to.be.false;
        })
    })

    describe('is_first_line', () => {
        it(`should return true if the selected char is in the first line`, () => {
            expect(new LineParser('012\n3456789', 2).is_first_line()).to.be.true;
        })

        it(`should return true if the selected char is the first character`, () => {
            expect(new LineParser('012\n3456789', 0).is_first_line()).to.be.true;
        })

        it(`should return false if the selected char isn't in the first line`, () => {
            expect(new LineParser('012\n3456789', 7).is_first_line()).to.be.false;
        })
    })

    describe('is_last_word', () => {
        it(`should return true if the selected char is in the last word`, () => {
            expect(new LineParser('012\n3456789\n', 7).is_last_word()).to.be.true;
        })

        it(`should return true if the selected char is in the last word (\\n)`, () => {
            expect(new LineParser('012\n3456789\n', 7).is_last_word()).to.be.true;
        })

        it(`should return true if the selected char is the last character`, () => {
            expect(new LineParser('012\n3456789', 10).is_last_word()).to.be.true;
        })

        it(`should return false if the selected char isn't in the last word`, () => {
            expect(new LineParser('012\n3456789', 2).is_last_word()).to.be.false;
        })

        it(`should return false if the selected char isn't in the word`, () => {
            expect(new LineParser('012\n', 3).is_last_word()).to.be.false;
        })
    })


    describe('read_first_word_letter', () => {
        it(`shouldn't change index`, () => {
            const parser = new LineParser('one two three', 5);
            parser.read_first_word_letter();

            expect(parser.get_index()).to.eql(5);
        })

        it(`should return empty char if the selected char is a wait space`, () => {
            const parser = new LineParser('one two three', 3);
            const letter = parser.read_first_word_letter();

            expect(letter.is_empty()).to.be.true;
        })

        it(`should return first letter of the selected word`, () => {
            const parser = new LineParser('one two three', 5);
            const letter = parser.read_first_word_letter();

            expect(letter.get()).to.eql('t');
        })
    })

    describe('read_last_word_letter', () => {
        it(`shouldn't change index`, () => {
            const parser = new LineParser('one two three', 5);
            parser.read_last_word_letter();

            expect(parser.get_index()).to.eql(5);
        })

        it(`should return empty char if the selected char is a wait space`, () => {
            const parser = new LineParser('one two three', 3);
            const letter = parser.read_last_word_letter();

            expect(letter.is_empty()).to.be.true;
        })

        it(`should return last letter of the selected word`, () => {
            const parser = new LineParser('one two three', 5);
            const letter = parser.read_last_word_letter();

            expect(letter.get()).to.eql('o');
        })
    })

    describe(`read_left_line_part`, () => {
        it(`shouldn't change index`, () => {
            const parser = new LineParser('1 \none two three\n 2', 8);
            parser.read_left_line_part();

            expect(parser.get_index()).to.eql(8);
        })

        it(`should return left part of the line starting from the selected character`, () => {
            const parser = new LineParser('1 \none two three\n 2', 8);
            const line = parser.read_left_line_part();

            expect(line.get()).to.eql('one tw');
        })
    })

    describe(`read_right_line_part`, () => {
        it(`shouldn't change index`, () => {
            const parser = new LineParser('1 \none two three\n 2', 8);
            parser.read_right_line_part();

            expect(parser.get_index()).to.eql(8);
        })

        it(`should return right part of the line starting from the selected character`, () => {
            const parser = new LineParser('1 \none two three\n 2', 8);
            const line = parser.read_right_line_part();

            expect(line.get()).to.eql('wo three\n');
        })
    })

    describe(`read_line`, () => {
        it(`shouldn't change index`, () => {
            const parser = new LineParser('1 \none two three\n 2', 8);
            parser.read_line();

            expect(parser.get_index()).to.eql(8);
        })

        it(`should return current line text`, () => {
            const parser = new LineParser('1 \none two three\n 2', 8);
            const line = parser.read_line();

            expect(line.get()).to.eql('one two three\n');
        })
    })

    describe(`read_char`, () => {
        it(`shouldn't change index`, () => {
            const parser = new LineParser('test', 2);
            parser.read_char();

            expect(parser.get_index()).to.eql(2);
        })

        it(`should return selected char`, () => {
            const parser = new LineParser('test', 2);
            const char = parser.read_char();

            expect(char.get()).to.eql('s');
        })
    })

    describe('read_prev_char', () => {
        it(`shouldn't change index`, () => {
            const parser = new LineParser('test', 2);
            parser.read_prev_char();

            expect(parser.get_index()).to.eql(2);
        })

        it(`should return empty char if current char is the first one`, () => {
            expect(new LineParser('text', 0).read_prev_char().is_empty()).to.true;
        })

        it('should return previous char', () => {
            const parser = new LineParser('text', 3);
            expect(parser.read_prev_char().get()).is.eql('x');
        })
    })

    describe('read_next_char', () => {
        it(`shouldn't change index`, () => {
            const parser = new LineParser('test', 2);
            parser.read_next_char();

            expect(parser.get_index()).to.eql(2);
        })

        it(`should return empty char if current char is the first one`, () => {
            expect(new LineParser('text', 3).read_next_char().is_empty()).to.true;
        })

        it('should return next char', () => {
            const parser = new LineParser('text', 0);
            expect(parser.read_next_char().get()).is.eql('e');
        })
    })

    describe(`read_word`, () => {
        it(`shouldn't change index`, () => {
            const parser = new LineParser('test', 2);
            parser.read_word();

            expect(parser.get_index()).to.eql(2);
        })

        it(`should return empty word if the selected char is a wait space`, () => {
            const parser = new LineParser('one two three', 3);
            const word = parser.read_word();

            expect(word.is_empty()).to.be.true;
        })

        it(`should return selected word`, () => {
            const parser = new LineParser('one two three', 5);
            const word = parser.read_word();

            expect(word.get()).to.eql('two');
        })
    })

    describe('read_prev_word', () => {
        it(`shouldn't change index`, () => {
            const parser = new LineParser('test', 2);
            parser.read_prev_word();

            expect(parser.get_index()).to.eql(2);
        })

        it(`should return empty word if the current one is the first one`, () => {
            const parser = new LineParser('one two', 0);
            expect(parser.read_prev_word().is_empty()).to.be.true;
        })

        it(`should return previous word`, () => {
            const parser = new LineParser('one two', 4);        
            expect(parser.read_prev_word().get()).is.eql("one");
        })
    })

    describe('read_next_word', () => {
        it(`shouldn't change index`, () => {
            const parser = new LineParser('test', 2);
            parser.read_next_word();

            expect(parser.get_index()).to.eql(2);
        })

        it(`should return empty word if the current one is the last one`, () => {
            const parser = new LineParser('one two', 6);
            expect(parser.read_next_word().is_empty()).to.be.true;
        })

        it(`should return next word`, () => {
            const parser = new LineParser('one two', 2);        
            expect(parser.read_next_word().get()).is.eql("two");
        })
    })

    describe(`read_until`, () => {
        it(`shouldn't change index`, () => {
            const parser = new LineParser('123123123123123123123e', 2);
            parser.read_until(char=>char.is_number());

            expect(parser.get_index()).to.eql(2);
        })

        it(`should read characters until function return true`, () => {
            const parser = new LineParser('123123123123123123123e', 0);
            const line  = parser.read_until(char=>char.is_number());

            expect(line.get()).to.eql("123123123123123123123");
        })

        it(`should return empty line if function return false for current character`, () => {
            const parser = new LineParser('e123123123123123123123e', 0);
            const line = parser.read_until(char=>char.is_number());

            expect(line.is_empty()).to.be.true;
        })
    })

    describe(`read_left_until`, () => {
        it(`shouldn't change index`, () => {
            const parser = new LineParser('e123123123123123123123', 21);
            parser.read_left_until(char=>char.is_number());

            expect(parser.get_index()).to.eql(21);
        })

        it(`should skip characters backward until function return true`, () => {
            const parser = new LineParser('e123123123123123123123', 21);
            const line = parser.read_left_until(char=>char.is_number());

            expect(line.get()).to.eql("123123123123123123123");
        })

        it(`should return empty line if function return false for current character`, () => {
            const parser = new LineParser('e12312312312312312312e', 21);
            const line = parser.read_left_until(char=>char.is_number());

            expect(line.is_empty()).to.be.true;
        })
    })

    describe(`read_to`, () => {
        it(`shouldn't change index`, () => {
            const parser = new LineParser('123123123123123123123e', 2);
            parser.read_to("e");

            expect(parser.get_index()).to.eql(2);
        })

        it(`should read all characters to the chose one`, () => {
            const parser = new LineParser('123123123123123123123e', 0);
            const line = parser.read_to('e');

            expect(line.get()).to.eql("123123123123123123123e");
        })

        it(`should skip all characters if the chose one not exist`, () => {
            const parser = new LineParser('0123456789', 0);
            const line = parser.read_to('e');

            expect(line.get()).to.eql("0123456789");
        })
    })

    describe('get_text', () => {
        it(`should return the text that is currently loaded into parser`, () => {
            const parser = new LineParser('0123\n45\n 67sad e89', 0);
            expect(parser.get_text()).to.eql("0123\n45\n 67sad e89");
        })
    })

    describe('get_index', () => {
        it(`should return the position of the selected char in the parsing text`, () => {
            const parser = new LineParser('0123\n45\n 67sad e89', 5);
            expect(parser.get_index()).to.eql(5);
        })
    })

    describe(`clone`, () => {
        it(`should create a deep copy of the parser`, () => {
            const parser = new LineParser('0123\n45\n 67sad e89', 5);
            const copy = parser.clone();

            expect(parser).to.not.equal(copy);
            expect(parser.get_text()).to.eql(copy.get_text());
            expect(parser.get_index()).to.eql(copy.get_index());
           
            parser.next_char();
            expect(parser.get_index()).to.not.eql(copy.get_index());
        })
    })
})