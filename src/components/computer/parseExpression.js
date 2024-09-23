import autoCloseParentheses from './autoCloseParentheses';
import { textRepresentation } from '../button/buttonsSet';
import precedence from './precedence';
import operators from './operators';

const {
  plus,
  minus,
  multiplication,
  percent,
  division,
  leftParenthesis,
  rightParenthesis,
} = textRepresentation;

export default function parseExpression(expr) {
  let expression = expr.replace(/\s+/g, '');
  expression = autoCloseParentheses(expression);

  const tokens = expression.match(
    new RegExp(
      `(\\d+(\\.\\d+)?|\\${plus}|\\${minus}|\\${multiplication}|\\${division}|\\${percent}|\\${leftParenthesis}|\\${rightParenthesis})`,
      'g'
    )
  );
  if (!tokens) {
    return [];
  }

  const outputQueue = [];
  const operatorStack = [];
  let lastToken = null;

  tokens.forEach((token, index) => {
    if (/\d/.test(token)) {
      outputQueue.push(parseFloat(token));
    } else if (token === percent) {
      const number = outputQueue.pop();
      outputQueue.push(number * 0.01);
    } else if (token in operators) {
      if (
        token === minus &&
        (lastToken === null ||
          lastToken in operators ||
          lastToken === leftParenthesis)
      ) {
        if (/\d/.test(tokens[index + 1])) {
          tokens[index + 1] = (-parseFloat(tokens[index + 1])).toString();
        }
        return;
      }
      while (
        operatorStack.length &&
        precedence(operatorStack[operatorStack.length - 1]) >= precedence(token)
      ) {
        outputQueue.push(operatorStack.pop());
      }
      operatorStack.push(token);
    } else if (token === leftParenthesis) {
      operatorStack.push(token);
    } else if (token === rightParenthesis) {
      while (
        operatorStack.length &&
        operatorStack[operatorStack.length - 1] !== leftParenthesis
      ) {
        outputQueue.push(operatorStack.pop());
      }
      operatorStack.pop();
    }
    lastToken = token;
  });

  while (operatorStack.length) {
    const op = operatorStack.pop();
    if (op === leftParenthesis) {
      throw new Error('Некорректное выражение: лишняя открывающая скобка');
    }
    outputQueue.push(op);
  }

  return outputQueue;
}
