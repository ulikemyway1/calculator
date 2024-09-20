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
    this.button = { value, role };
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
}
