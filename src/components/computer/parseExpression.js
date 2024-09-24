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
  // Remove all spaces from the input expression
  let expression = expr.replace(/\s+/g, '');

  // Automatically close any unbalanced parentheses
  expression = autoCloseParentheses(expression);

  // Tokenize the expression using a regular expression to extract numbers and operators
  const tokens = expression.match(
    new RegExp(
      `(\\d+(\\.\\d+)?|\\${plus}|\\${minus}|\\${multiplication}|\\${division}|\\${percent}|\\${leftParenthesis}|\\${rightParenthesis})`,
      'g'
    )
  );

  // Return an empty array if there are no valid tokens
  if (!tokens) {
    return [];
  }

  // Initialize output queue and operator stack for the Shunting-Yard algorithm
  const outputQueue = [];
  const operatorStack = [];
  let lastToken = null; // Keep track of the previous token

  tokens.forEach((token, index) => {
    // If the token is a number, push it to the output queue
    if (/\d/.test(token)) {
      outputQueue.push(parseFloat(token));

      // If the token is a percent sign, convert the last number to its percentage value
    } else if (token === percent) {
      const number = outputQueue.pop();
      outputQueue.push(number * 0.01);

      // Handle operators (e.g., +, -, *, /)
    } else if (token in operators) {
      // Handle unary minus (negation) if it's the first token or follows an operator or left parenthesis
      if (
        token === minus &&
        (lastToken === null ||
          lastToken in operators ||
          lastToken === leftParenthesis)
      ) {
        // Convert the next number into a negative value
        if (/\d/.test(tokens[index + 1])) {
          tokens[index + 1] = (-parseFloat(tokens[index + 1])).toString();
        }
        return;
      }

      // Pop operators from the stack to the output queue based on their precedence
      while (
        operatorStack.length &&
        precedence(operatorStack[operatorStack.length - 1]) >= precedence(token)
      ) {
        outputQueue.push(operatorStack.pop());
      }
      operatorStack.push(token); // Push the current operator to the stack

      // Push left parenthesis to the stack
    } else if (token === leftParenthesis) {
      operatorStack.push(token);

      // For right parenthesis, pop operators from the stack until a left parenthesis is found
    } else if (token === rightParenthesis) {
      while (
        operatorStack.length &&
        operatorStack[operatorStack.length - 1] !== leftParenthesis
      ) {
        outputQueue.push(operatorStack.pop());
      }
      operatorStack.pop(); // Discard the left parenthesis
    }

    // Update the last token to the current one
    lastToken = token;
  });

  // Pop any remaining operators from the stack to the output queue
  while (operatorStack.length) {
    const op = operatorStack.pop();
    if (op === leftParenthesis) {
      throw new Error('Некорректное выражение: лишняя открывающая скобка');
    }
    outputQueue.push(op);
  }

  // Return the final output queue (expression in Reverse Polish Notation)
  return outputQueue;
}
