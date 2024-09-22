import createDOMElement from '../../helpers/createDOMElement';
import './calculatorView.scss';
import { buttonsSet } from '../button/buttonsSet';
import Button from '../button/Button';
import Computer from '../computer/Computer';

export default class CalculatorView {
  constructor() {
    this.view = createDOMElement({ tag: 'main', classList: ['calculator'] });

    this.buttonsSet = createDOMElement({
      tag: 'div',
      classList: ['calculator__buttons'],
    });

    this.screenWithExpression = createDOMElement({
      tag: 'div',
      classList: ['calculator__screen-expression'],
    });

    this.screenWithResult = createDOMElement({
      tag: 'div',
      classList: ['calculator__screen-result'],
    });

    this.view.append(
      this.screenWithExpression,
      this.screenWithResult,
      this.buttonsSet
    );

    this.appendControlsButtons();

    this.setScreenExpressionText('0');
    this.setScreenResultText('0');

    this.computer = new Computer({
      input: this.view,
      outputExpression: this.setScreenExpressionText,
      outputResult: this.setScreenResultText,
    });
  }

  appendChildElement(element) {
    if (element instanceof HTMLElement) {
      this.view.append(element);
      return;
    }

    throw new Error("Can't append not instance of HTMLElement");
  }

  getView() {
    return this.view;
  }

  appendControlsButtons = () => {
    buttonsSet.forEach((button) => {
      const newButton = new Button(button);
      this.buttonsSet.append(newButton.getButtonView());
      newButton.subscribe(this.view);
    });
  };

  setScreenExpressionText = (text) => {
    this.screenWithExpression.textContent = text || '0';
  };

  setScreenResultText = (text) => {
    this.screenWithResult.textContent = text;
  };

  turnProMode = () => {
    this.view.classList.toggle('pro-mode');
    this.setScreenExpressionText('0');
    this.setScreenResultText('0');
    this.computer.reset();
  };
}
