import { textRepresentation } from '../button/buttonsSet';
import calculate from './calculate';

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
    if (
      this._isChangingOperatorProcess(prevChar, data) &&
      data.textContent &&
      data.role !== 'reset'
    ) {
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
        case 'separator-left':
          this._handleLeftParenthesis();
          break;
        case 'separator-right':
          this._handleRightParenthesis();
          break;
        case 'percent':
          this._handlePercent();
          break;
        case 'comma':
          this._handleComma();
          break;
        case 'reset':
          this.reset();
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
    expression.replaceAll(textRepresentation.comma, '.');

  _getAndDeleteCharFromMemory = () => {
    this.expression.pop();
  };

  _showFinalResult = () => {
    if (this.expression.length === 0) return;
    const fullExpression = this._normalizeExpression(this.expression.join(''));
    const calculatedResult = calculate(this._expandNegatives(fullExpression));

    this.outputExpressionStream(this._replaceNaN(calculatedResult));
    this.outputResultStream(0);
    this._resetCalculatorMemory();
  };

  _replaceNaN = (exp) => {
    if (typeof exp === 'number' && !Number.isNaN(exp)) {
      return exp.toPrecision(4);
    }
    return 0;
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
    if (
      this.expression.length === 0 ||
      !this._charIsNumber(this._getNumberFromTheEndAtPoistionN(1))
    )
      return;

    if (
      this.expression.length === 1 &&
      this._charIsNumber(this.expression[0])
    ) {
      const currentNumber = this.expression[0];
      const invertedNumber = (-Number(currentNumber)).toString();
      this.expression[0] = invertedNumber;
      this._displayCurrentExpression(this.expression.join(''));
      this._displayCurrentResult(this.expression.join(''));
      return;
    }

    const lastNumberChars = [];
    let isMinusNow = false;
    let j = 1;
    let lastElement = this._getNumberFromTheEndAtPoistionN(j);

    while (
      this._charIsNumber(lastElement) ||
      lastElement === textRepresentation.minus ||
      lastElement === textRepresentation.comma ||
      lastElement === '.'
    ) {
      if (!(isMinusNow && lastElement !== textRepresentation.minus)) {
        lastNumberChars.push(lastElement);
      } else if (isMinusNow && this._charIsNumber(lastElement)) {
        break;
      }
      isMinusNow = lastElement === textRepresentation.minus;
      j += 1;
      lastElement = this._getNumberFromTheEndAtPoistionN(j);
    }

    lastElement = lastNumberChars.reverse().join('').replace(',', '.');

    this._deleteSomeLastChars(lastNumberChars.length);

    const invertedChar = Number(lastElement) * -1;

    if (
      invertedChar >= 0 &&
      this.expression.length !== 0 &&
      this._getNumberFromTheEndAtPoistionN(1) !== textRepresentation.plus &&
      this._getNumberFromTheEndAtPoistionN(1) !==
        textRepresentation.multiplication &&
      this._getNumberFromTheEndAtPoistionN(1) !==
        textRepresentation.leftParenthesis &&
      this._getNumberFromTheEndAtPoistionN(1) !== textRepresentation.division
    )
      this._pushCharInCalculatorMemory(textRepresentation.plus);
    this._recalculateWithNewChar(invertedChar.toString());
  };

  _displayCurrentExpression = (exp) => {
    this.outputExpressionStream(exp);
  };

  _displayCurrentResult = (exp) => {
    this.outputResultStream(this._replaceNaN(calculate(exp)));
  };

  _recalculateWithNewChar = (char) => {
    if (char) {
      if (
        this.expression.length === 0 &&
        !(
          this._charIsNumber(char) ||
          char === textRepresentation.minus ||
          char === textRepresentation.leftParenthesis
        )
      ) {
        return;
      }
      if (
        char === '0' &&
        this.expression.length === 1 &&
        this._getNumberFromTheEndAtPoistionN(1) === '0'
      ) {
        return;
      }
      if (
        char === '0' &&
        this.expression.length === 2 &&
        this._getNumberFromTheEndAtPoistionN(2) === textRepresentation.minus &&
        this._getNumberFromTheEndAtPoistionN(1) === '0'
      ) {
        return;
      }
      if (
        char === textRepresentation.plus &&
        this._getNumberFromTheEndAtPoistionN(1) === textRepresentation.plus
      ) {
        return;
      }

      this._pushCharInCalculatorMemory(char);
    }

    const fullExpression = this._normalizeExpression(this.expression.join(''));

    this.expression = fullExpression.split('');

    this._displayCurrentExpression(fullExpression);
    this._displayCurrentResult(fullExpression);
  };

  _deleteLastCharFromExpression = () => {
    this._getAndDeleteCharFromMemory();
    this._recalculateWithNewChar(null);
  };

  _isChangingOperatorProcess = (prevChar, newCharInfo) => {
    const nonChangeableRoles = [
      'number',
      'delete',
      'evaluation',
      'separator-left',
      'separator-right',
      'invert',
    ];
    const nonChangeablePrevChars = [
      textRepresentation.percent,
      textRepresentation.delete,
      textRepresentation.leftParenthesis,
      textRepresentation.rightParenthesis,
    ];

    return (
      prevChar &&
      !this._charIsNumber(prevChar) &&
      !nonChangeableRoles.includes(newCharInfo.role) &&
      !nonChangeablePrevChars.includes(prevChar)
    );
  };

  _deleteSomeLastChars(n) {
    for (let i = 0; i < n; i += 1) {
      this._deleteLastCharFromExpression();
    }
  }

  _charIsNumber = (char) => !Number.isNaN(Number(char));

  _handleLeftParenthesis = () => {
    this._recalculateWithNewChar(textRepresentation.leftParenthesis);
  };

  _handleRightParenthesis = () => {
    const rightParenthesisMoreThanLeft =
      this._calculateCharOccurrenceInExpression(
        textRepresentation.leftParenthesis
      ) <=
      this._calculateCharOccurrenceInExpression(
        textRepresentation.rightParenthesis
      );

    if (
      rightParenthesisMoreThanLeft ||
      (!this._charIsNumber(this._getNumberFromTheEndAtPoistionN(1)) &&
        this._getNumberFromTheEndAtPoistionN(1) !== textRepresentation.percent)
    )
      return;

    this._recalculateWithNewChar(textRepresentation.rightParenthesis);
  };

  _calculateCharOccurrenceInExpression = (char) => {
    const expression = this.expression.join('');
    const inititalLength = expression.length;
    const lengthAfterDeletion = expression.replaceAll(char, '').length;
    return inititalLength - lengthAfterDeletion;
  };

  _expandNegatives = (expression) =>
    // transform statements like 3*(-3) to -3*3
    expression
      .replace(/(\d+)\s*×\s*\(-(\d+)\)/g, '-$1×$2')
      .replace(/(\d+)\s*×\s*-(\d+)/g, '-$1×$2')
      .replace(/(\d+)\s*÷\s*\(-(\d+)\)/g, '-$1÷$2')
      .replace(/(\d+)\s*÷\s*-(\d+)/g, '-$1÷$2')
      .replace(`${textRepresentation.minus}${textRepresentation.minus}`, '');

  _handlePercent = () => {
    if (
      this.expression.length === 0 ||
      this._getNumberFromTheEndAtPoistionN(1) === textRepresentation.percent ||
      this._getNumberFromTheEndAtPoistionN(1) ===
        textRepresentation.leftParenthesis
    )
      return;
    this._recalculateWithNewChar(textRepresentation.percent);
  };

  _handleComma = () => {
    if (this._charIsNumber(this._getNumberFromTheEndAtPoistionN(1))) {
      this._recalculateWithNewChar(textRepresentation.comma);
    }
  };

  _getNumberFromTheEndAtPoistionN = (n) =>
    this.expression[this.expression.length - n];

  reset = () => {
    this.expression = [];
    this.result = [];
    this.outputExpressionStream(0);
    this.outputResultStream(0);
  };
}
