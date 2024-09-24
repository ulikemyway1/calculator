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
    // Return if the expression is empty or if the last character is not a number
    if (
      this.expression.length === 0 ||
      !this._charIsNumber(this._getCharFromTheEndAtPoistionN(1))
    )
      return;

    // If the expression consists of a single number, invert its sign directly
    if (
      this.expression.length === 1 &&
      this._charIsNumber(this.expression[0])
    ) {
      const currentNumber = this.expression[0];
      const invertedNumber = (-Number(currentNumber)).toString(); // Invert the number
      this.expression[0] = invertedNumber; // Update the expression with the inverted number
      this._displayCurrentExpression(this.expression.join('')); // Display updated expression
      this._displayCurrentResult(this.expression.join('')); // Display result
      return;
    }

    // For multi-digit numbers, extract the last number from the expression
    const lastNumberChars = [];
    let isMinusNow = false; // Track if the current number has a minus sign
    let j = 1;
    let lastElement = this._getCharFromTheEndAtPoistionN(j); // Get the last character of the expression

    // Loop to collect the characters of the last number, handling minus signs and decimal points
    while (
      this._charIsNumber(lastElement) ||
      lastElement === textRepresentation.minus ||
      lastElement === textRepresentation.comma ||
      lastElement === '.'
    ) {
      if (!(isMinusNow && lastElement !== textRepresentation.minus)) {
        lastNumberChars.push(lastElement); // Add characters to the last number array
      } else if (isMinusNow && this._charIsNumber(lastElement)) {
        break; // Exit loop if a minus sign is followed by a number
      }
      isMinusNow = lastElement === textRepresentation.minus; // Check if the last element is a minus sign
      j += 1;
      lastElement = this._getCharFromTheEndAtPoistionN(j); // Get the next character
    }

    // Join the collected characters to form the number and convert commas to dots (for decimals)
    lastElement = lastNumberChars.reverse().join('').replace(',', '.');

    // Delete the old number from the expression
    this._deleteSomeLastChars(lastNumberChars.length);

    // Invert the number's sign
    const invertedChar = Number(lastElement) * -1;

    // If the inverted number is positive and the expression ends with an operator,
    // add a plus sign to maintain the correct format
    if (
      invertedChar >= 0 &&
      this.expression.length !== 0 &&
      this._getCharFromTheEndAtPoistionN(1) !== textRepresentation.plus &&
      this._getCharFromTheEndAtPoistionN(1) !==
        textRepresentation.multiplication &&
      this._getCharFromTheEndAtPoistionN(1) !==
        textRepresentation.leftParenthesis &&
      this._getCharFromTheEndAtPoistionN(1) !== textRepresentation.division
    ) {
      this._pushCharInCalculatorMemory(textRepresentation.plus); // Add a plus sign if needed
    }

    // Recalculate the expression with the new inverted number
    this._recalculateWithNewChar(invertedChar.toString());
  };

  _displayCurrentExpression = (exp) => {
    this.outputExpressionStream(exp);
  };

  _displayCurrentResult = (exp) => {
    this.outputResultStream(this._replaceNaN(calculate(exp)));
  };

  _recalculateWithNewChar = (char) => {
    // Check if char is provided
    if (char) {
      // If expression is empty and the new char is not a number, a minus sign, or a left parenthesis, return early
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

      // Prevent adding leading zero if the current expression is just '0'
      if (
        char === '0' &&
        this.expression.length === 1 &&
        this._getCharFromTheEndAtPoistionN(1) === '0'
      ) {
        return;
      }

      // Prevent adding negative zero if the expression starts with '-0'
      if (
        char === '0' &&
        this.expression.length === 2 &&
        this._getCharFromTheEndAtPoistionN(2) === textRepresentation.minus &&
        this._getCharFromTheEndAtPoistionN(1) === '0'
      ) {
        return;
      }

      // Prevent adding two consecutive plus signs or adding a plus sign after an open parenthesis
      if (
        char === textRepresentation.plus &&
        (this._getCharFromTheEndAtPoistionN(1) === textRepresentation.plus ||
          this._getCharFromTheEndAtPoistionN(1) ===
            textRepresentation.leftParenthesis)
      ) {
        return;
      }

      // Prevent multiplication or division immediately after an open parenthesis
      if (
        (char === textRepresentation.multiplication ||
          char === textRepresentation.division) &&
        this._getCharFromTheEndAtPoistionN(1) ===
          textRepresentation.leftParenthesis
      ) {
        return;
      }

      // Push the valid char into the calculator memory
      this._pushCharInCalculatorMemory(char);
    }

    // Normalize the full expression to handle any necessary format adjustments
    const fullExpression = this._normalizeExpression(this.expression.join(''));

    // Update the expression with the normalized version
    this.expression = fullExpression.split('');

    // Display the current expression and result
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
      'comma',
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
      (!this._charIsNumber(this._getCharFromTheEndAtPoistionN(1)) &&
        this._getCharFromTheEndAtPoistionN(1) !== textRepresentation.percent)
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
      this._getCharFromTheEndAtPoistionN(1) === textRepresentation.percent ||
      this._getCharFromTheEndAtPoistionN(1) ===
        textRepresentation.leftParenthesis
    )
      return;
    this._recalculateWithNewChar(textRepresentation.percent);
  };

  _handleComma = () => {
    if (
      this._charIsNumber(this._getCharFromTheEndAtPoistionN(1)) &&
      !this._hasDelimeterInThisNumber()
    ) {
      this._recalculateWithNewChar(textRepresentation.comma);
    }
  };

  _getCharFromTheEndAtPoistionN = (n) =>
    this.expression[this.expression.length - n];

  _hasDelimeterInThisNumber = () => {
    const chars = [];
    let i = 1;
    while (
      this._charIsNumber(this._getCharFromTheEndAtPoistionN(i)) ||
      this._getCharFromTheEndAtPoistionN(i) === '.'
    ) {
      chars.push(this._getCharFromTheEndAtPoistionN(i));
      i += 1;
    }
    return chars.includes('.');
  };

  reset = () => {
    this.expression = [];
    this.result = [];
    this.outputExpressionStream(0);
    this.outputResultStream(0);
  };
}
