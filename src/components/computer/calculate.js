import { textRepresentation } from '../button/buttonsSet';

export default function calculate(exp) {
  const stack = [];
  let currentNumber = '';
  let currentOperator = null;
  let i = 0;
  let befotePercent = null;
  const expression = exp.replace(/,/g, '.');

  while (i < expression.length) {
    const char = expression[i];
    let num;

    if (!Number.isNaN(Number(char)) || char === '.') {
      currentNumber += char;
    }

    if (
      (Number.isNaN(Number(char)) && char !== '.') ||
      i === expression.length - 1
    ) {
      if (currentNumber) {
        num = parseFloat(currentNumber);

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
        char === textRepresentation.division
      ) {
        currentOperator = char;
        befotePercent = stack.reduce((a, b) => a + b);
      } else if (char === textRepresentation.percent) {
        stack.pop();
        if (befotePercent) {
          stack.push(befotePercent * (num / 100));
        } else {
          stack.push(num / 100);
        }
      }
    }

    i += 1;
  }

  return stack.reduce((a, b) => a + b, 0);
}
