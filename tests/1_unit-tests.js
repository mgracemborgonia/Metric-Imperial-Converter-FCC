const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite("getNum Function", () => {
        test("whole number input", () => {
            let input = "32L";
            assert.equal(convertHandler.getNum(input), 32);
        });
        test("decimal number input", () => {
            let input = "32.2L";
            assert.equal(convertHandler.getNum(input), 32.2);
        });
        test("fractional input", () => {
            let input = "32/2L";
            assert.equal(convertHandler.getNum(input), 32/2);
        });
        test("fractional input with a decimal", () => {
            let input = "32.2/4L";
            assert.equal(convertHandler.getNum(input), 32.2/4);
        });
        test("invalid input on a double-fraction", () => {
            let input = "32/2/3L";
            assert.isUndefined(convertHandler.getNum(input));
        });
        test("default to a numerical input of 1 if there is no numerical input", () => {
            let input = "L";
            assert.equal(convertHandler.getNum(input), 1);
        });
    });
    suite("getUnit Function", () => {
        test("read each valid input unit", () => {
            let input = ["gal","L","mi","km","lbs","kg"];
            for(let i = 0; i < input.length; i++){
                assert.equal(convertHandler.getUnit(input[i]),input[i]);
            };
        });
        test("invalid input unit", () => {
            assert.isUndefined(convertHandler.getUnit("34g"));
        });
    });
    suite("getReturnUnit Function", () => {
        test("return unit for each valid input unit", () => {
            let input = ["gal","L","mi","km","lbs","kg"];
            let expect = ["L","gal","km","mi","kg","lbs"];
            for(let i = 0; i < input.length; i++){
                assert.equal(convertHandler.getReturnUnit(input[i]),expect[i]);
            };
        });
    });
    suite("spellOutUnit Function", () => {
        test("spelled-out string unit for each valid input unit", () => {
            let input = ["gal","L","mi","km","lbs","kg"];
            let expect = ["gallons","liters","miles","kilometers","pounds","kilograms"];
            for(let i = 0; i < input.length; i++){
                assert.equal(convertHandler.spellOutUnit(input[i]),expect[i]);
            };
        });
    });
    suite("convert Function", () => {
        test("from gal to L", () => {
            assert.approximately(convertHandler.convert(2,"gal"),7.57082,0.1);
        });
        test("from L to gal", () => {
            assert.approximately(convertHandler.convert(2,"L"),0.52834,0.1);
        });
        test("from mi to km", () => {
            assert.approximately(convertHandler.convert(2,"mi"),3.21868,0.1);
        });
        test("from km to mi", () => {
            assert.approximately(convertHandler.convert(2,"km"),1.24275,0.1);
        });
        test("from lbs to kg", () => {
            assert.approximately(convertHandler.convert(2,"lbs"),0.90718,0.1);
        });
        test("from kg to lbs", () => {
            assert.approximately(convertHandler.convert(2,"kg"),4.40925,0.1);
        });
    });
});
