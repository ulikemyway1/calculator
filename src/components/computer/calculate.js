import parseExpression from './parseExpression';
import evaluateRPN from './evaluateRPN';

export default function calculate(expression) {
  if (!expression) return 0;
  return evaluateRPN(parseExpression(expression));
}
