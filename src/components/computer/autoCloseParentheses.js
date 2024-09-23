import { textRepresentation } from '../button/buttonsSet';

const { leftParenthesis, rightParenthesis, multiplication } =
  textRepresentation;

export default function autoCloseParentheses(expr) {
  let expression = expr;
  const openCount = (
    expression.match(new RegExp(`\\${leftParenthesis}`, 'g')) || []
  ).length;
  const closeCount = (
    expression.match(new RegExp(`\\${rightParenthesis}`, 'g')) || []
  ).length;
  const missingClosing = openCount - closeCount;

  expression = expression.replace(/(\d)(\s*\\?\()/g, `$1${multiplication}$2`);
  expression = expression.replace(/\\?\)(\s*\d)/g, `)${multiplication}$1`);
  expression = expression.replace(/\\?\)(\\?\()/g, `)${multiplication}`);

  return expression + rightParenthesis.repeat(missingClosing);
}
