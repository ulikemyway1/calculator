import createDOMElement from '../../helpers/createDOMElement';
import './slider.scss';

export default class Slider {
  constructor({
    textContentBefore,
    textContentAfter = textContentBefore,
    callBack,
  }) {
    this.checked = false;
    this.textContentBefore = textContentBefore;
    this.textContentAfter = textContentAfter;
    this.span = createDOMElement({
      tag: 'span',
      classList: ['slider-text'],
      textContent: this.textContentBefore,
    });

    this._createUI(textContentBefore);

    this._addToggleListener(callBack);
  }

  _createUI = (textContentBefore) => {
    this.container = createDOMElement({
      tag: 'div',
      classList: ['slider-container'],
    });
    this.checkbox = createDOMElement({
      tag: 'input',
      classList: ['slider-checkbox'],
    });

    let id;
    if (!textContentBefore) {
      id = new Date().getTime();
    }
    this.checkbox.type = 'checkbox';
    this.checkbox.id = `slider-checkbox-${textContentBefore || id}`;
    this.checkbox.setAttribute('tabindex', '1');

    this.switch = createDOMElement({
      tag: 'label',
      classList: ['slider-switch'],
    });

    this.switch.htmlFor = `slider-checkbox-${textContentBefore || id}`;

    this.slider = createDOMElement({ tag: 'span', classList: ['slider'] });
    this.switch.append(this.slider);

    this.wrapper = createDOMElement({
      tag: 'div',
      classList: ['slider-wrapper'],
    });

    this.container.append(this.checkbox, this.switch);
    this.wrapper.append(this.container, this.span);
  };

  _addToggleListener = (callback) => {
    this.checkbox.addEventListener('change', () => {
      callback(!this.checkbox.checked);
      this.checked = !this.checked;
      this.span.textContent = this.checked
        ? this.textContentAfter
        : this.textContentBefore;
    });
  };

  getSlider = () => this.wrapper;
}
