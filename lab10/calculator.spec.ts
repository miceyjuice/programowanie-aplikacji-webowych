import { Calculator } from "./calculator";

describe('Calc', () => {
    let calc: Calculator;

    beforeEach(() => {
        calc = new Calculator();
    });

    it('should return correct sum of two numbers', () => {
        expect(calc).toBeInstanceOf(Calculator);
        expect(calc.Add(2,2)).toEqual(4);
    });
    it('should return correct substraction of two numbers', () => {
        expect(calc).toBeInstanceOf(Calculator);
        expect(calc.Substract(6,2)).toEqual(4);
    });
    it('should return correct multiplication of two numbers', () => {
        expect(calc).toBeInstanceOf(Calculator);
        expect(calc.Multiply(3,2)).toEqual(6);
    });
    it('should return correct division of two numbers', () => {
        expect(calc).toBeInstanceOf(Calculator);
        expect(calc.Divide(6,2)).toEqual(3);
    });
});