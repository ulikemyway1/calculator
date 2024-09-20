import createDOMElement from '../../helpers/createDOMElement';
import './button.scss';

export default class Button {
  constructor({ textContent, value, role }) {
    this.buttonView = createDOMElement({
      tag: 'button',
      classList: ['calculator__button'],
      textContent,
    });

    this.buttonView.style.gridArea = `${role}${value ? `-${value}` : ''}`;

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
