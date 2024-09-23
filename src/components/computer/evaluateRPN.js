import operators from './operators';

export default function evaluateRPN(rpn) {
  const stack = [];
  rpn.forEach((token) => {
    if (typeof token === 'number') {
      stack.push(token);
    } else if (token in operators) {
      const b = stack.pop();
      const a = stack.pop();
      stack.push(operators[token](a, b));
    }
  });
  if (stack.length !== 1) {
    return 0;
  }
  return stack[0];
}
