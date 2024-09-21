import recursiveCalculation from './recursiveCalculation';
import { textRepresentation } from '../button/buttonsSet';

export default class Computer {
  constructor({ input, outputExpression, outputResult }) {
    this.result = [];
    this.expression = [];
    this.inputStream = input;
    this.outputExpressionStream = outputExpression;
    this.outputResultStream = outputResult;
    this.inputStream.addEventListener('inputChanged', (e) => {
      this.processInput(e.detail);
    });
  }

  processInput = (data) => {
    const prevChar = this.expression[this.expression.length - 1];
    if (this._isChangingOperatorProcess(prevChar, data)) {
      this._deleteLastCharFromExpression();
      this._recalculateWithNewChar(data.textContent);
    } else {
      switch (data.role) {
        case 'delete':
          this._deleteLastCharFromExpression();
          break;
        case 'evaluation':
          this._showFinalResult();
          break;
        case 'invert':
          this._invertNumberSign();
          break;
        default:
          this._recalculateWithNewChar(data.textContent);
      }
    }
  };

  getResult() {
    return this.result.reduceuce((a, b) => a + b);
  }

  _processPlusOperation = () => {
    this.result.push(+this.expression.join(''));
  };

  _normalizeExpression = (expression) =>
    expression
      .replaceAll(')(', `)${textRepresentation.multiplication}()`)
      .replaceAll(/(\d|\))\(/g, `$1${textRepresentation.multiplication}(`)
      .replaceAll('()', '');

  _getAndDeleteCharFromMemory = () => {
    this.expression.pop();
  };

  _showFinalResult = () => {
    const fullExpression = this._normalizeExpression(this.expression.join(''));
    this.outputExpressionStream(
      recursiveCalculation(fullExpression).toFixed(2)
    );
    this.outputResultStream(null);
    this._resetCalculatorMemory();
  };

  _resetCalculatorMemory = () => {
    this.expression = [];
  };

  _pushCharInCalculatorMemory = (char) => this.expression.push(char);

  _invertNumberSign = () => {
    const lastNumberChars = [];

    let j = 1;
    let lastElement = this.expression[this.expression.length - j];

    while (!Number.isNaN(Number(lastElement))) {
      lastNumberChars.push(lastElement);
      j += 1;

      lastElement = this.expression[this.expression.length - j];
    }

    j = 1;
    lastElement = lastNumberChars.reverse().join('');

    for (let i = 0; i < lastElement.length; i += 1) {
      this._deleteLastCharFromExpression();
    }
    this._pushCharInCalculatorMemory(Number(lastElement) * -1);
    this._recalculateWithNewChar(null);
  };

  _displayCurrentExpression = (exp) => {
    this.outputExpressionStream(exp);
  };

  _displayCurrentResult = (exp) => {
    this.outputResultStream(recursiveCalculation(exp)?.toPrecision(3));
  };

  _recalculateWithNewChar = (char) => {
    if (char) this._pushCharInCalculatorMemory(char);
    const fullExpression = this._normalizeExpression(this.expression.join(''));
    this._displayCurrentExpression(fullExpression);
    this._displayCurrentResult(fullExpression);
  };

  _deleteLastCharFromExpression = () => {
    this._getAndDeleteCharFromMemory();
    this._recalculateWithNewChar(null);
  };

  _isChangingOperatorProcess = (prevChar, newCharInfo) =>
    prevChar &&
    Number.isNaN(Number(prevChar)) &&
    newCharInfo.role !== 'number' &&
    newCharInfo.role !== 'delete' &&
    newCharInfo.role !== 'evaluation' &&
    prevChar !== textRepresentation.percent &&
    prevChar !== textRepresentation.delete;
}
