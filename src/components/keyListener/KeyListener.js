import keyBindings from './keyBindings';

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
