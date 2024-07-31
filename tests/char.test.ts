import { expect } from "chai";
import { describe } from "mocha";
import { Char } from "../src/char";
import { FileParser } from "../src/file-parser";
import { FILE } from "dns";
import { LineParser } from "../src/line-parser";

describe('char', () => {
    describe('is', () => {
        it('should return true if value is equal to char parameter', () => {
            const char = new Char('T');
            expect(char.is('T')).to.be.true;
        })

        it('should return false if value is not equal to char parameter', () => {
            const char = new Char('T');
            expect(char.is('X')).to.be.false;
        })

        it('should be case sensitive', () => {
            const char = new Char('T');
            expect(char.is('t')).to.be.false;
        })

        it('should accept empty string', () => {
            expect(new Char('').is('')).to.be.true;
            expect(new Char('x').is('')).to.be.false;
            expect(new Char('').is('x')).to.be.false;
        })
    })

    describe('is_next', () => {
        it('should check if next character is equal to the char parameter', () => {
            const char = new Char('T', new FileParser('pTn', 1));
            expect(char.is_next('n')).to.be.true;
            expect(char.is_next('T')).to.be.false;
        })

        it('should return true if next character not exist and the char parameter is an empty string', () => {
            const char = new Char('n', new FileParser('pTn', 2));
            expect(char.is_next('')).to.be.true;
            expect(char.is_next('n')).to.be.false;
        })
    })

    describe('is_prev', () => {
        it('should check if previous character is equal to the char parameter', () => {
            const char = new Char('T', new FileParser('pTn', 1));
            expect(char.is_prev('p')).to.be.true;
            expect(char.is_prev('T')).to.be.false;
        })

        it('should return true if previous character not exist and the char parameter is an empty string', () => {
            const char = new Char('p', new FileParser('pTn', 0));
            expect(char.is_prev('')).to.be.true;
            expect(char.is_prev('n')).to.be.false;
        })
    })

    describe('is_empty', () => {
        it('should check if char is an empty string', () => {
            expect(new Char('').is_empty()).to.be.true;
            expect(new Char('x').is_empty()).to.be.false;
        })
    })

    describe('is_white_space', () => {
        it(`should return false if char is an empty string`, () => {
            expect(new Char('').is_white_space()).to.be.false;
        })

        it('should check if char is white space', () => {
            expect(new Char('x').is_white_space()).to.be.false;
            expect(new Char('\n').is_white_space()).to.be.true;
            expect(new Char(' ').is_white_space()).to.be.true;
        })
    })

    describe('is_empty_or_white', () => {
        it(`should return true if char is an empty string`, () => {
            expect(new Char('').is_empty_or_white()).to.be.true;
        })

        it('should check if char is white space', () => {
            expect(new Char('x').is_empty_or_white()).to.be.false;
            expect(new Char('\n').is_white_space()).to.be.true;
            expect(new Char(' ').is_empty_or_white()).to.be.true;
        })
    })

    describe('is_space', () => {
        it(`should return false if char is an empty string`, () => {
            expect(new Char('').is_space()).to.be.false;
        })

        it('should check if char is space', () => {
            expect(new Char('x').is_space()).to.be.false;
            expect(new Char('\n').is_space()).to.be.false;
            expect(new Char(' ').is_space()).to.be.true;
        })
    })

    describe('is_number', () => {
        it(`should return false if char is an empty string`, () => {
            expect(new Char('').is_number()).to.be.false;
        })

        it('should check if char is a number', () => {
            expect(new Char('x').is_number()).to.be.false;
            expect(new Char(' ').is_number()).to.be.false;
            expect(new Char('5').is_number()).to.be.true;
            expect(new Char('0').is_number()).to.be.true;
            expect(new Char('-').is_number()).to.be.false;
        })
    })

    describe('is_alpha_numeric', () => {
        it(`should return false if char is an empty string`, () => {
            expect(new Char('').is_alpha_numeric()).to.be.false;
        })

        it('should check if char is number or letter', () => {
            expect(new Char('').is_alpha_numeric()).to.be.false;
            expect(new Char('-').is_alpha_numeric()).to.be.false;
            expect(new Char('.').is_alpha_numeric()).to.be.false;
            expect(new Char('5').is_alpha_numeric()).to.be.true;
            expect(new Char('a').is_alpha_numeric()).to.be.true;
            expect(new Char('Z').is_alpha_numeric()).to.be.true;
        })
    })

    describe('is_letter', () => {
        it(`should return false if char is an empty string`, () => {
            expect(new Char('').is_letter()).to.be.false;
        })

        it('should check if char is a letter', () => {
            expect(new Char('').is_letter()).to.be.false;
            expect(new Char('-').is_letter()).to.be.false;
            expect(new Char('.').is_letter()).to.be.false;
            expect(new Char('5').is_letter()).to.be.false;
            expect(new Char('a').is_letter()).to.be.true;
            expect(new Char('Z').is_letter()).to.be.true;
        })
    })

    describe('is_uppercase', () => {
        it(`should return false if char is an empty string`, () => {
            expect(new Char('').is_uppercase()).to.be.false;
        })

        it(`should return false if char is not a letter`, () => {
            expect(new Char('').is_uppercase()).to.be.false;
            expect(new Char('-').is_uppercase()).to.be.false;
            expect(new Char('.').is_uppercase()).to.be.false;
            expect(new Char('5').is_uppercase()).to.be.false;        })

        it('should check if char is a capital letter', () => {
            expect(new Char('A').is_uppercase()).to.be.true;
            expect(new Char('a').is_uppercase()).to.be.false;
        })
    })

    describe('is_lowercase', () => {
        it(`should return false if char is an empty string`, () => {
            expect(new Char('').is_lowercase()).to.be.false;
        })

        it(`should return false if char is not a letter`, () => {
            expect(new Char('').is_lowercase()).to.be.false;
            expect(new Char('-').is_lowercase()).to.be.false;
            expect(new Char('.').is_lowercase()).to.be.false;
            expect(new Char('5').is_lowercase()).to.be.false;        })

        it('should check if char is a lowercase letter', () => {
            expect(new Char('A').is_lowercase()).to.be.false;
            expect(new Char('a').is_lowercase()).to.be.true;
        })
    })
    
    describe('is_new_line', () => {
        it(`should return false if char is an empty string`, () => {
            expect(new Char('').is_new_line()).to.be.false;
        })

        it('should check if char is a new line character', () => {
            expect(new Char('x').is_new_line()).to.be.false;
            expect(new Char(' ').is_new_line()).to.be.false;
            expect(new Char('5').is_new_line()).to.be.false;
            expect(new Char('\n').is_new_line()).to.be.true;
        })

        it('should accept unix style new line', () => {
            expect(new Char('\n').is_new_line()).to.be.true;
        })

        it(`should accept windows style new line`, () => {
            expect(new Char('\r', new FileParser('\r\n')).is_new_line()).to.be.true;
            expect(new Char('\r', new FileParser('\rn')).is_new_line()).to.be.false;
        })
    })

    describe('is_comma', () => {
        it(`should return false if char is an empty string`, () => {
            expect(new Char('').is_comma()).to.be.false;
        })

        it('should check if char is a comma', () => {
            expect(new Char('x').is_comma()).to.be.false;
            expect(new Char(' ').is_comma()).to.be.false;
            expect(new Char('.').is_comma()).to.be.false;
            expect(new Char(',').is_comma()).to.be.true;
        })
    })

    describe('is_slash', () => {
        it(`should return false if char is an empty string`, () => {
            expect(new Char('').is_slash()).to.be.false;
        })

        it('should check if char is a slash', () => {
            expect(new Char('x').is_slash()).to.be.false;
            expect(new Char(' ').is_slash()).to.be.false;
            expect(new Char('5').is_slash()).to.be.false;
            expect(new Char('\\').is_slash()).to.be.false;
            expect(new Char('/').is_slash()).to.be.true;
        })
    })

    describe('is_back_slash', () => {
        it(`should return false if char is an empty string`, () => {
            expect(new Char('').is_back_slash()).to.be.false;
        })

        it('should check if char is a back slash', () => {
            expect(new Char('x').is_back_slash()).to.be.false;
            expect(new Char(' ').is_back_slash()).to.be.false;
            expect(new Char('5').is_back_slash()).to.be.false;
            expect(new Char('/').is_back_slash()).to.be.false;
            expect(new Char('\\').is_back_slash()).to.be.true;
        })
    })

    describe('is_quote', () => {
        it(`should return false if char is an empty string`, () => {
            expect(new Char('').is_quote()).to.be.false;
        })

        it('should check if char is a quote', () => {
            expect(new Char('x').is_quote()).to.be.false;
            expect(new Char(' ').is_quote()).to.be.false;
            expect(new Char('5').is_quote()).to.be.false;
            expect(new Char("'").is_quote()).to.be.false;
            expect(new Char('"').is_quote()).to.be.true;
        })
    })

    describe('is_single_quote', () => {
        it(`should return false if char is an empty string`, () => {
            expect(new Char('').is_single_quote()).to.be.false;
        })

        it('should check if char is a single quote', () => {
            expect(new Char('x').is_single_quote()).to.be.false;
            expect(new Char(' ').is_single_quote()).to.be.false;
            expect(new Char('5').is_single_quote()).to.be.false;
            expect(new Char('"').is_single_quote()).to.be.false;
            expect(new Char("'").is_single_quote()).to.be.true;
        })
    })

    describe('to_number', () => {
        it(`should return NaN if char is an empty string`, () => {
            expect(new Char('').to_number()).to.be.NaN;
        })

        it(`should return NaN if char is not a number`, () => {
            expect(new Char('a').to_number()).to.be.NaN;
            expect(new Char(' ').to_number()).to.be.NaN;   
            expect(new Char('\n').to_number()).to.be.NaN;     
        })

        it(`should return NaN if char is a dot character`, () => {
            expect(new Char('.').to_number()).to.be.NaN;
        })

        it(`should return NaN if char is a minus character`, () => {
            expect(new Char('-').to_number()).to.be.NaN;
        })

        it('should parse value to a number', () => {
            expect(new Char('0').to_number()).to.be.eq(0);
            expect(new Char('5').to_number()).to.be.eq(5);
        })
    })

    describe('get', () => {
        it(`should return empty string if value is empty`, () => {
            expect(new Char('').get()).to.be.eq('');
        })

        it(`should return value as a string`, () => {
            expect(new Char('a').get()).to.be.eq('a');
            expect(new Char('5').get()).to.be.eq('5');
        })
    })

    describe('index', () => {
        it(`should return 0 if char is the first one`, () => {
            expect(new Char('a', new LineParser('abc', 0)).index()).to.eql(0);
            expect(new Char('a', new LineParser('abc', 0)).prev().index()).to.eql(0);
        })

        it(`should return last char id if char is the last one`, () => {
            expect(new Char('c', new LineParser('abc', 2)).index()).to.eql(2);
            expect(new Char('c', new LineParser('abc', 2)).index()).to.eql(2);
        })

        it(`should return index of the current char in the word`, () => {
            expect(new Char('a', new LineParser('abc', 0)).index()).to.be.eq(0);
            expect(new Char('b', new LineParser('abc', 1)).index()).to.be.eq(1);
            expect(new Char('c', new LineParser('abc', 2)).index()).to.be.eq(2);
        })
    })

    describe('next', () => {
        it(`should return empty char if current char is the last one`, () => {
            expect(new Char('a', new LineParser('a')).next().is_empty()).to.be.true;
            expect(new Char('', new LineParser('')).next().is_empty()).to.be.true;
        })

        it(`should return a next char`, () => {
            expect(new Char('a', new LineParser('a5cd', 0)).next().get()).to.be.eq('5');
        })

        it(`shouldn't change current string when the next one is changed`, () => {
            const parser = new LineParser('a5cd', 0);
            const char = new Char('a', parser);

            expect(char.get()).is.eq('a')
            expect(char.next().get()).is.eq('5')
            expect(char.next().next().get()).is.eq('c')
            expect(char.next().next().next().get()).is.eq('d')
            expect(char.next().next().next().next().get()).is.eq('')
            expect(char.get()).is.eq('a')
        })
    })

    describe('prev', () => {
        it(`should return empty char if current char is the first one`, () => {
            expect(new Char('a', new LineParser('a')).prev().is_empty()).to.be.true;
            expect(new Char('', new LineParser('')).prev().is_empty()).to.be.true;
        })

        it(`should return a previous char`, () => {
            expect(new Char('3', new LineParser('123', 2)).prev().get()).to.be.eq('2');
        })

        it(`shouldn't change current string when the previous one is changed`, () => {
            const parser = new LineParser('a5cd', 3);
            const char = new Char('d', parser);

            expect(char.get()).is.eq('d')
            expect(char.prev().get()).is.eq('c')
            expect(char.prev().prev().get()).is.eq('5')
            expect(char.prev().prev().prev().get()).is.eq('a')
            expect(char.prev().prev().prev().prev().get()).is.eq('')
            expect(char.get()).is.eq('d')
        })
    })
})