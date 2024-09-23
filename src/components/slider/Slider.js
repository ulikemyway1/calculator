import createDOMElement from '../../helpers/createDOMElement';
import './slider.scss';

export default class Slider {
  constructor({
    textContentBefore,
    textContentAfter = textContentBefore,
    callBack,
    wave = false,
  }) {
    this.checked = false;
    this.textContentBefore = textContentBefore;
    this.textContentAfter = textContentAfter;
    this.callBack = callBack;
    this.span = createDOMElement({
      tag: 'span',
      classList: ['slider-text'],
      textContent: this.textContentBefore,
    });

    this.wave = wave;

    this._createUI(textContentBefore);

    this._addToggleListener(callBack);

    this._addStateListner();

    this._loadSavedState();
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

    if (this.wave) this._addWaveEffect();
  };

  _addWaveEffect = () => {
    this.switch.addEventListener('click', (e) => {
      e.stopPropagation();
      const wave = createDOMElement({ tag: 'div', classList: ['wave-effect'] });
      document.body.appendChild(wave);

      wave.addEventListener('animationend', (ee) => {
        ee.target.remove();
      });
    });
  };

  _addStateListner = () => {
    this.checkbox.addEventListener('change', this._saveState);
  };

  _saveState = () => {
    localStorage.setItem(this.checkbox.id, this.checked);
  };

  _loadSavedState = () => {
    const savedState = localStorage.getItem(this.checkbox.id);
    const savedCustomColors = localStorage.getItem('saved-colors');
    if (
      (savedState && !savedCustomColors) ||
      (savedState && this.id !== 'slider-checkbox-PRO')
    ) {
      this.checked = savedState === 'true';
      this.span.textContent = this.checked
        ? this.textContentAfter
        : this.textContentBefore;
      this.checkbox.checked = this.checked;
      if (this.checked) this.callBack();
    }
  };

  getSlider = () => this.wrapper;
}
