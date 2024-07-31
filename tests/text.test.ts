import { expect } from "chai";
import { describe } from "mocha";
import { FileParser } from "../src/file-parser";
import { Text } from "../src/text";

describe('test', () => {
    describe('is', () => {
        it('should return true if value is equal to the line parameter', () => {
            expect(new Text('a b c d').is('a b c d')).to.true;
            expect(new Text('a bb c d').is('a b c d')).to.false;
            expect(new Text('a b c').is('')).to.false;
            expect(new Text('').is('a b c')).to.false;
        })
    })

    describe('is_empty', () => {
        it('should check if the word is an empty string', () => {
            expect(new Text('a b').is_empty()).to.false;
            expect(new Text('').is_empty()).to.true;
        })
    })

    describe('contain', () => {
        it(`should return false if the searched line is an empty string`, () => {
            expect(new Text('a b c d').contain('')).to.false;
            expect(new Text('').contain('')).to.false;
            expect(new Text('').contain('test')).to.false;
        })

        it('should check if the word contain a word from parameter', () => {
            expect(new Text('aa bb cc dd').contain('a')).to.true;
            expect(new Text('aa bb cc dd').contain('b c')).to.true;
            expect(new Text('aa bb cc dd').contain('cc dd')).to.true;
            expect(new Text('aa bb cc dd').contain('aa bb cc dd')).to.true;
            
            expect(new Text('aa bb cc dd').contain('tes')).to.false;
            expect(new Text('aa bb cc dd').contain('aaa')).to.false;
            expect(new Text('aa bb cc dd').contain('xd')).to.false;
        })
    })

    describe('get', () => {
        it('should return line as string', () => {
            expect(new Text('aa bb').get()).to.eql('aa bb');
            expect(new Text('').get()).to.eql('');
        })
    })

    describe('parse', () => {
        it('should create a new parser from the line text', () => {
            expect(new Text('second line\n').parse().get_text()).eql('second line\n');
            expect(new Text('second line\n').parse().get_index()).eql(0);
        })
    });
})