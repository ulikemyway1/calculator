import { textRepresentation } from '../button/buttonsSet';

const keyBindings = {
  0: {
    textContent: '0',
    value: 0,
    role: 'number',
  },
  1: {
    textContent: '1',
    value: 1,
    role: 'number',
  },
  2: {
    textContent: '2',
    value: 2,
    role: 'number',
  },
  3: {
    textContent: '3',
    value: 3,
    role: 'number',
  },
  4: {
    textContent: '4',
    value: 4,
    role: 'number',
  },
  5: {
    textContent: '5',
    value: 5,
    role: 'number',
  },
  6: {
    textContent: '6',
    value: 6,
    role: 'number',
  },
  7: {
    textContent: '7',
    value: 7,
    role: 'number',
  },
  8: {
    textContent: '8',
    value: 8,
    role: 'number',
  },
  9: {
    textContent: '9',
    value: 9,
    role: 'number',
  },
  '-': {
    textContent: textRepresentation.minus,
    value: null,
    role: 'minus',
  },
  '+': {
    textContent: textRepresentation.plus,
    value: null,
    role: 'plus',
  },
  '/': {
    textContent: textRepresentation.division,
    value: null,
    role: 'division',
  },
  '*': {
    textContent: textRepresentation.multiplication,
    value: null,
    role: 'multiplication',
  },
  '%': {
    textContent: textRepresentation.percent,
    value: null,
    role: 'percent',
  },
  '=': {
    textContent: textRepresentation.evaluation,
    value: null,
    role: 'evaluation',
  },
  Backspace: {
    textContent: textRepresentation.delete,
    value: null,
    role: 'delete',
  },
  _: {
    textContent: textRepresentation.invert,
    value: null,
    role: 'invert',
  },
  ',': {
    textContent: textRepresentation.comma,
    value: null,
    role: 'comma',
  },
  '(': {
    textContent: textRepresentation.leftParenthesis,
    value: null,
    role: 'separator-left',
  },
  ')': {
    textContent: textRepresentation.rightParenthesis,
    value: null,
    role: 'separator-right',
  },
  Escape: {
    textContent: textRepresentation.reset,
    value: null,
    role: 'reset',
  },
};

export default class KeyListener {
  constructor(dispatchEventTo) {
    this.targetEventAcceptor = dispatchEventTo;

    document.addEventListener('keydown', this._handleKeyPress);
  }

  _handleKeyPress = (event) => {
    const { key } = event;
    const targetCalculatorKey = keyBindings[key];

    if (targetCalculatorKey && this.targetEventAcceptor) {
      const buttonEvent = new CustomEvent('inputChanged', {
        detail: targetCalculatorKey,
      });

      this.targetEventAcceptor.dispatchEvent(buttonEvent);
    }
  };
}
