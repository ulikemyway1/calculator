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
        case 'minus':
          this._recalculateWithNewChar(data.textContent);
          break;
        default:
          this._recalculateWithNewChar(data.textContent);
          break;
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

  _pushCharInCalculatorMemory = (char) => {
    char
      .toString()
      .split('')
      .forEach((symbol) => this.expression.push(symbol));
  };

  _invertNumberSign = () => {
    const lastNumberChars = [];
    let isMinusNow = false;
    let j = 1;
    let lastElement = this.expression[this.expression.length - j];

    while (
      this._charIsNumber(lastElement) ||
      lastElement === textRepresentation.minus
    ) {
      if (!(isMinusNow && lastElement !== textRepresentation.minus))
        lastNumberChars.push(lastElement);

      isMinusNow = lastElement === textRepresentation.minus;
      j += 1;
      lastElement = this.expression[this.expression.length - j];
    }

    lastElement = lastNumberChars.reverse().join('');

    this._deleteSomeLastChars(lastElement.length);

    const invertedChar = Number(lastElement) * -1;
    this._recalculateWithNewChar(invertedChar);
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
    !this._charIsNumber(prevChar) &&
    newCharInfo.role !== 'number' &&
    newCharInfo.role !== 'delete' &&
    newCharInfo.role !== 'evaluation' &&
    newCharInfo.role !== 'separator-left' &&
    newCharInfo.role !== 'separator-right' &&
    prevChar !== textRepresentation.percent &&
    prevChar !== textRepresentation.delete &&
    prevChar !== textRepresentation.leftParenthesis &&
    prevChar !== textRepresentation.rightParenthesis;

  _deleteSomeLastChars(n) {
    for (let i = 0; i < n; i += 1) {
      this._deleteLastCharFromExpression();
    }
  }

  _charIsNumber = (char) => !Number.isNaN(Number(char));
}
