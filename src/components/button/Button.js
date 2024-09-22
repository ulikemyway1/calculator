import createDOMElement from '../../helpers/createDOMElement';
import './button.scss';
import { textRepresentation } from './buttonsSet';

export default class Button {
  constructor({ textContent, value, role }) {
    this.buttonView = createDOMElement({
      tag: 'button',
      classList: ['calculator__button'],
      textContent,
    });

    this.buttonView.style.gridArea = `${role}${value ? `-${value}` : ''}`;

    if (role !== 'number') {
      this.buttonView.classList.add('calculator__button-special');
    }

    if (
      textContent === textRepresentation.leftParenthesis ||
      textContent === textRepresentation.rightParenthesis
    ) {
      this.buttonView.classList.add('calculator__button-parenthesis');
    }

    this.button = { value, role, textContent };
  }

  getButtonView() {
    return this.buttonView;
  }

  getRole() {
    return this.button.role;
  }

  getValue() {
    return this.button.value;
  }

  subscribe = (target) => {
    const buttonEvent = new CustomEvent('inputChanged', {
      detail: this.button,
    });
    this.buttonView.addEventListener('click', () =>
      target.dispatchEvent(buttonEvent)
    );
  };
}
