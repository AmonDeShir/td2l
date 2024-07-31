import { expect } from "chai";
import { describe } from "mocha";
import { Char } from "../src/char";
import { FileParser } from "../src/file-parser";
import { FILE } from "dns";
import { LineParser } from "../src/line-parser";
import { Word } from "../src/word";

describe('word', () => {
    describe('is', () => {
        it('should return true if value is equal to word parameter', () => {
            expect(new Word('test').is('test')).to.true;
            expect(new Word('test').is('not_test')).to.false;
            expect(new Word('test').is('')).to.false;
            expect(new Word('').is('test')).to.false;
        })
    })

    describe('is_next', () => {
        it('should return true if value of the next word is equal to word parameter', () => {
            expect(new Word('one', new LineParser('one two')).is_next('two')).to.true;
            expect(new Word('one', new LineParser('one two')).is_next('test')).to.false;
        })

        it('should return false if the current word is the last one', () => {
            expect(new Word('one', new LineParser('one')).is_next('two')).to.false;
            expect(new Word('one', new LineParser('one')).is_next('')).to.true;
        })
    })

    describe('is_prev', () => {
        it('should return true if value of the prev word is equal to word parameter', () => {
            expect(new Word('two', new LineParser('one two', 4)).is_prev('one')).to.true;
            expect(new Word('two', new LineParser('one two', 4)).is_prev('test')).to.false;
        })

        it('should return false if the current word is the first one', () => {
            expect(new Word('two', new LineParser('one')).is_prev('two')).to.false;
            expect(new Word('two', new LineParser('one')).is_prev('')).to.true;
        })
    })

    describe('is_empty', () => {
        it('should check if the word is an empty string', () => {
            expect(new Word('test').is_empty()).to.false;
            expect(new Word('').is_empty()).to.true;
        })
    })

    describe('contain', () => {
        it(`should return false if the searched word is an empty string`, () => {
            expect(new Word('test').contain('')).to.false;
            expect(new Word('').contain('')).to.false;
            expect(new Word('').contain('test')).to.false;
        })

        it('should check if the word contain a word from parameter', () => {
            expect(new Word('test').contain('t')).to.true;
            expect(new Word('test').contain('te')).to.true;
            expect(new Word('test').contain('tes')).to.true;
            expect(new Word('test').contain('test')).to.true;
            expect(new Word('test').contain('es')).to.true;
            
            expect(new Word('test').contain('tests')).to.false;
            expect(new Word('test').contain('xd')).to.false;
        })
    })

    describe('get', () => {
        it('should return word as string', () => {
            expect(new Word('test').get()).to.eql('test');
            expect(new Word('').get()).to.eql('');
        })
    })

    describe('first_char', () => {
        it('should return an empty string if the word is empty', () => {
            expect(new Word('').first_char().is_empty()).to.true;
        })

        it('should return the first letter of the word', () => {
            expect(new Word('word').first_char().get()).to.eql('w');
        })
    });

    describe('last_char', () => {
        it('should return an empty string if the word is empty', () => {
            expect(new Word('').last_char().is_empty()).to.true;
        })

        it('should return the first letter of the word', () => {
            expect(new Word('word').last_char().get()).to.eql('d');
        })
    });

    describe('parse', () => {
        it('should create a new parser from the word text', () => {
            expect(new Word('test', new LineParser('word test next', 6)).parse().get_text()).eql('test');
            expect(new Word('test', new LineParser('word test next', 6)).parse().get_index()).eql(0);
        })
    });

    describe('next', () => {
        it(`should return empty char if current word is the last one`, () => {
            expect(new Word('two', new LineParser('one two', 4)).next().is_empty()).to.be.true;
            expect(new Word('', new LineParser('')).next().is_empty()).to.be.true;
        })

        it(`should return a next word`, () => {
            expect(new Word('two', new LineParser('one two three', 4)).next().get()).to.eql('three');
        })

        it(`shouldn't change current word when the next one is changed`, () => {
            const parser = new LineParser('one two three four', 0);
            const word = new Word('one', parser);

            expect(word.get()).is.eq('one')
            expect(word.next().get()).is.eq('two')
            expect(word.next().next().get()).is.eq('three')
            expect(word.next().next().next().get()).is.eq('four')
            expect(word.next().next().next().next().get()).is.eq('')
            expect(word.get()).is.eq('one')
        })
    })

    describe('prev', () => {
        it(`should return empty char if current word is the first one`, () => {
            expect(new Word('one', new LineParser('one two', 1)).prev().is_empty()).to.be.true;
            expect(new Word('', new LineParser('')).prev().is_empty()).to.be.true;
        })

        it(`should return a previous word`, () => {
            expect(new Word('two', new LineParser('one two three', 4)).prev().get()).to.eql('one');
        })

        it(`shouldn't change current word when the previous one is changed`, () => {
            const parser = new LineParser('one two three four', 15);
            const word = new Word('four', parser);

            expect(word.get()).is.eq('four')
            expect(word.prev().get()).is.eq('three')
            expect(word.prev().prev().get()).is.eq('two')
            expect(word.prev().prev().prev().get()).is.eq('one')
            expect(word.prev().prev().prev().prev().get()).is.eq('')
            expect(word.get()).is.eq('four')
        })
    })
})