import createDOMElement from '../../helpers/createDOMElement';
import './calculatorView.scss';
import buttonsSet from '../button/buttonsSet';
import Button from '../button/Button';

export default class CalculatorView {
  constructor() {
    this.view = createDOMElement({ tag: 'main', classList: ['calculator'] });
    this.buttonsSet = createDOMElement({
      tag: 'div',
      classList: ['calculator__buttons'],
    });
    this.screen = createDOMElement({
      tag: 'div',
      classList: ['calculator__screen'],
    });
    this.view.append(this.screen, this.buttonsSet);
    this.appendControlsButtons();
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

  appendControlsButtons() {
    buttonsSet.forEach((button) =>
      this.buttonsSet.append(new Button(button).getButtonView())
    );
  }
}
