import { expect } from "chai";
import { describe } from "mocha";
import { Line } from "../../src/file-reader/line";
import { FileReader } from "../../src/file-reader/file-reader";

describe('line', () => {
    describe('is', () => {
        it('should return true if value is equal to the line parameter', () => {
            expect(new Line('a b c d').is('a b c d')).to.true;
            expect(new Line('a bb c d').is('a b c d')).to.false;
            expect(new Line('a b c').is('')).to.false;
            expect(new Line('').is('a b c')).to.false;
        })
    })

    describe('is_empty', () => {
        it('should check if the word is an empty string', () => {
            expect(new Line('a b').is_empty()).to.false;
            expect(new Line('').is_empty()).to.true;
        })
    })

    describe('contain', () => {
        it(`should return false if the searched line is an empty string`, () => {
            expect(new Line('a b c d').contain('')).to.false;
            expect(new Line('').contain('')).to.false;
            expect(new Line('').contain('test')).to.false;
        })

        it('should check if the word contain a word from parameter', () => {
            expect(new Line('aa bb cc dd').contain('a')).to.true;
            expect(new Line('aa bb cc dd').contain('b c')).to.true;
            expect(new Line('aa bb cc dd').contain('cc dd')).to.true;
            expect(new Line('aa bb cc dd').contain('aa bb cc dd')).to.true;
            
            expect(new Line('aa bb cc dd').contain('tes')).to.false;
            expect(new Line('aa bb cc dd').contain('aaa')).to.false;
            expect(new Line('aa bb cc dd').contain('xd')).to.false;
        })
    })

    describe('get', () => {
        it('should return line as string', () => {
            expect(new Line('aa bb').get()).to.eql('aa bb');
            expect(new Line('').get()).to.eql('');
        })
    })

    describe('parse', () => {
        it('should create a new parser from the line text', () => {
            expect(new Line('second line\n', new FileReader('first line\nsecond line\nthird line', 12)).parse().get_text()).eql('second line\n');
            expect(new Line('second line\n', new FileReader('first line\nsecond line\nthird line', 12)).parse().get_index()).eql(0);
        })
    });

    describe('next', () => {
        it(`should return empty char if current line is the last one`, () => {
            expect(new Line('two', new FileReader('one\ntwo', 4)).next().is_empty()).to.be.true;
            expect(new Line('', new FileReader('')).next().is_empty()).to.be.true;
        })

        it(`should return a next line`, () => {
            expect(new Line('two', new FileReader('one\ntwo\nthree', 5)).next().get()).to.eql('three');
        })

        it(`shouldn't change current line when the next one is changed`, () => {
            const parser = new FileReader('fist line\nsecond line\nthird line\n fourth line', 0);
            const line = new Line('first line\n', parser);

            expect(line.get()).is.eq('first line\n')
            expect(line.next().get()).is.eq('second line\n')
            expect(line.next().next().get()).is.eq('third line\n')
            expect(line.next().next().next().get()).is.eql(' fourth line')
            expect(line.next().next().next().next().get()).is.eq('')
            expect(line.get()).is.eq('first line\n')
        })
    })

    describe('prev', () => {
        it(`should return empty char if current line is the first one`, () => {
            expect(new Line('one', new FileReader('one\ntwo', 1)).prev().is_empty()).to.be.true;
            expect(new Line('', new FileReader('')).prev().is_empty()).to.be.true;
        })

        it(`should return a previous line`, () => {
            expect(new Line('two', new FileReader('one\ntwo\nthree', 4)).prev().get()).to.eql('one\n');
        })

        it(`shouldn't change current line when the previous one is changed`, () => {
            const parser = new FileReader('first line\nsecond line\nthird line\n fourth line', 35);
            const line = new Line('fourth line', parser);

            expect(line.get()).is.eq('fourth line')
            expect(line.prev().get()).is.eq('third line\n')
            expect(line.prev().prev().get()).is.eq('second line\n')
            expect(line.prev().prev().prev().get()).is.eq('first line\n')
            expect(line.prev().prev().prev().prev().get()).is.eq('')
            expect(line.get()).is.eq('fourth line')
        })
    })
})