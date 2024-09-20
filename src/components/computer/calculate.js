import { textRepresentation } from '../button/buttonsSet';

export default function calculate(exp) {
  const stack = [];
  let currentNumber = '';
  let currentOperator = null;

  let i = 0;

  const expression = exp.replace(/,/g, '.');

  while (i < expression.length) {
    const char = expression[i];

    if (!Number.isNaN(Number(char)) || char === '.') {
      currentNumber += char;
    }

    if (
      (Number.isNaN(Number(char)) && char !== '.') ||
      i === expression.length - 1
    ) {
      if (currentNumber) {
        const num = parseFloat(currentNumber);

        if (currentOperator) {
          switch (currentOperator) {
            case textRepresentation.plus:
              stack.push(num);
              break;
            case textRepresentation.minus:
              stack.push(-num);
              break;
            case textRepresentation.multiplication:
              stack.push(stack.pop() * num);
              break;
            case textRepresentation.division:
              stack.push(stack.pop() / num);
              break;
            case textRepresentation.percent:
              stack.push(stack.pop() * (num / 100));
              break;
            default:
              break;
          }
        } else {
          stack.push(num);
        }

        currentNumber = '';
      }

      if (
        char === textRepresentation.plus ||
        char === textRepresentation.minus ||
        char === textRepresentation.multiplication ||
        char === textRepresentation.division ||
        char === textRepresentation.percent
      ) {
        currentOperator = char;
      }
    }

    i += 1;
  }
  return stack.reduce((a, b) => a + b, 0);
}
