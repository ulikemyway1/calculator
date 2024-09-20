import recursiveCalculation from './recursiveCalculation';

export default class Computer {
  constructor({ input, outputExpression, outputResult }) {
    this.current = 0;
    this.result = [];
    this.expression = [];
    this.input = input;
    this.outputExpression = outputExpression;
    this.outputResult = outputResult;

    this.input.addEventListener('inputChanged', (e) => {
      this.processInput(e.detail);
    });
  }

  processInput = (data) => {
    let fullExpression;

    if (data.role === 'delete') {
      this.expression.pop();
    } else if (data.role === 'evaluation') {
      fullExpression = this.expression.join('');
      this.outputExpression(recursiveCalculation(fullExpression));
      this.outputResult(null);
      this.expression = [];
      return;
    } else {
      this.expression.push(data.textContent);
    }

    fullExpression = this.expression.join('');

    this.outputExpression(fullExpression);
    this.outputResult(recursiveCalculation(fullExpression));
  };

  getResult() {
    return this.result.reduceuce((a, b) => a + b);
  }

  processPlusOperation = () => {
    this.result.push(+this.expression.join(''));
  };
}
