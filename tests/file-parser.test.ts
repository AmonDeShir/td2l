import { expect } from "chai";
import { describe } from "mocha";
import { FileParser } from "../src/file-parser";

describe('LineParser', () => {
    describe('next_line', () => {
        it(`should return empty line if current line is the last one`, () => {
            const parser = new FileParser('1 \none two three\n 2', 17);
            
            expect(parser.next_line().is_empty()).to.be.true;
            expect(parser.get_index()).to.eql(17);
        })

        it(`should handle empty line`, () => {
            const parser = new FileParser('1 \n\none two three\n 2', 0);
            expect(parser.next_line().get()).to.eql('\n');
            expect(parser.get_index()).to.eql(3);
        })

        it(`should return the next line`, () => {
            const parser = new FileParser('1 \none two three\n 2', 8);

            expect(parser.next_line().get()).to.eql(' 2');
            expect(parser.get_index()).to.eql(17);
        })
    })

    describe('prev_line', () => {
        it(`should return empty line if current line is the first one`, () => {
            const parser = new FileParser('1 \none two three\n 2', 1);
            
            expect(parser.prev_line().is_empty()).to.be.true;
            expect(parser.get_index()).to.eql(1);
        })

        it(`should handle empty line`, () => {
            const parser = new FileParser('1 \n\none two three\n 2', 9);
            expect(parser.prev_line().get()).to.eql('\n');
            expect(parser.get_index()).to.eql(3);
        })

        it(`should return the previous line`, () => {
            const parser = new FileParser('1 \none two three\n 2', 8);

            expect(parser.prev_line().get()).to.eql('1 \n');
            expect(parser.get_index()).to.eql(0);
        })
    })


    describe(`read_line`, () => {
        it(`shouldn't change index`, () => {
            const parser = new FileParser('1 \none two three\n 2', 8);
            parser.read_line();

            expect(parser.get_index()).to.eql(8);
        })

        it(`should return current line text`, () => {
            const parser = new FileParser('1 \none two three\n 2', 8);
            const line = parser.read_line();

            expect(line.get()).to.eql('one two three\n');
        })
    })

    describe('read_next_line', () => {
        it(`shouldn't change index`, () => {
            const parser = new FileParser('1 \none two three\n 2', 7);
            parser.read_next_line();

            expect(parser.get_index()).to.eql(7);
        })

        it(`should return empty line if current line is the last one`, () => {
            const parser = new FileParser('1 \none two three\n 2', 17);
        
            expect(parser.read_next_line().is_empty()).to.be.true;
        })

        it(`should return the next line`, () => {
            const parser = new FileParser('1 \none two three\n 2', 8);
            expect(parser.read_next_line().get()).to.eql(' 2');
        })
    })

    describe('read_prev_line', () => {
        it(`shouldn't change index`, () => {
            const parser = new FileParser('1 \none two three\n 2', 7);
            parser.read_prev_line();

            expect(parser.get_index()).to.eql(7);
        })

        it(`should return empty line if current line is the first one`, () => {
            const parser = new FileParser('1 \none two three\n 2', 1);
            
            expect(parser.read_prev_line().is_empty()).to.be.true;
        })

        it(`should return the next line`, () => {
            const parser = new FileParser('1 \none two three\n 2', 8);

            expect(parser.read_prev_line().get()).to.eql('1 \n');
        })
    })


    describe(`clone`, () => {
        it(`should create a deep copy of the parser`, () => {
            const parser = new FileParser('0123\n45\n 67sad e89', 5);
            const copy = parser.clone();

            expect(parser).to.not.equal(copy);
            expect(parser.get_text()).to.eql(copy.get_text());
            expect(parser.get_index()).to.eql(copy.get_index());
           
            parser.next_char();
            expect(parser.get_index()).to.not.eql(copy.get_index());
        })
    })
})