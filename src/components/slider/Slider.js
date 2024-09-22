import createDOMElement from '../../helpers/createDOMElement';
import './slider.scss';

export default class Slider {
  constructor(textContent) {
    this._createUI(textContent);
    this._addToggleListener();
  }

  _createUI = (textContent) => {
    this.container = createDOMElement({
      tag: 'div',
      classList: ['slider-container'],
    });
    this.checkbox = createDOMElement({
      tag: 'input',
      classList: ['slider-checkbox'],
    });

    this.checkbox.type = 'checkbox';
    this.checkbox.id = 'slider-checkbox';

    this.switch = createDOMElement({
      tag: 'label',
      classList: ['slider-switch'],
    });

    this.switch.htmlFor = 'slider-checkbox';

    this.slider = createDOMElement({ tag: 'span', classList: ['slider'] });
    this.switch.append(this.slider);
    this.span = createDOMElement({
      tag: 'span',
      classList: ['slider-text'],
      textContent,
    });
    this.wrapper = createDOMElement({
      tag: 'div',
      classList: ['slider-wrapper'],
    });
    this.container.append(this.checkbox, this.switch);
    this.wrapper.append(this.container, this.span);
  };

  _addToggleListener = () => {
    this.switch.addEventListener('click', () =>
      console.log(!this.checkbox.checked)
    );
  };

  getSlider = () => this.wrapper;
}
