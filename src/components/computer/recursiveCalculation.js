import calculate from './calculate';

export default function recursiveCalculation(expression) {
  const res = [...expression];

  function recursion(result) {
    if (!result.includes('(')) {
      return calculate(result.join(''));
    }

    const arr = [...result];
    const left = arr.lastIndexOf('(');
    const right = arr.indexOf(')', left);

    if (right === -1 || left === -1) {
      return null;
    }

    const innerExpression = arr.slice(left + 1, right).join('');
    const innerResult = calculate(innerExpression);
    const nextResult = [
      ...arr.slice(0, left),
      ...innerResult.toString(),
      ...arr.slice(right + 1),
    ];

    return recursion(nextResult);
  }

  return recursion(res);
}
