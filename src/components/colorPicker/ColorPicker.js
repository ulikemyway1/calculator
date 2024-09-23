import createDOMElement from '../../helpers/createDOMElement';
import './colorPicker.scss';

export default class ColorPicker {
  constructor() {
    this.view = createDOMElement({ tag: 'div', classList: ['color-picker'] });
    this.button = createDOMElement({
      tag: 'button',
      classList: ['color-picker__button'],
      textContent: 'Choose Colors',
    });

    this.modal = this.createModal();

    this.button.addEventListener('click', this._openModal);
    this.view.append(this.button);
  }

  createModal = () => {
    const modal = createDOMElement({
      tag: 'div',
      classList: ['color-picker__modal'],
    });

    this.bodyColorInput = this.createColorInput('body');
    this.calculatorColorInput = this.createColorInput('calculator');
    this.buttonColorInput = this.createColorInput('buttons');
    this.specialButtonColorInput = this.createColorInput('special-buttons');
    this.fontColorInput = this.createColorInput('font-color');

    const closeButton = createDOMElement({
      tag: 'button',
      classList: ['modal__close-button'],
      textContent: 'Close',
    });
    closeButton.addEventListener('click', this._closeModal);

    modal.append(
      this.bodyColorInput,
      this.calculatorColorInput,
      this.buttonColorInput,
      this.specialButtonColorInput,
      this.fontColorInput,
      closeButton
    );
    document.body.append(modal);
    return modal;
  };

  createColorInput(type) {
    const label = createDOMElement({
      tag: 'label',
    });

    const description = createDOMElement({
      tag: 'span',
      classList: ['color-picker__description'],
      textContent: String(type).toLocaleUpperCase(),
    });

    const input = createDOMElement({
      tag: 'input',
      classList: ['color-input'],
      attributes: { type: 'color' },
    });

    input.addEventListener('input', (event) => {
      this.changeColor(type, event.target.value);
    });

    label.append(description, input);
    return label;
  }

  changeColor(type, color) {
    switch (type) {
      case 'body':
        document.documentElement.style.setProperty('--body-bg-color', color);
        this._saveInLocalStorage('--body-bg-color', color);
        break;
      case 'calculator':
        document.documentElement.style.setProperty(
          '--calculator-bg-color',
          color
        );
        this._saveInLocalStorage('--calculator-bg-color', color);
        break;
      case 'buttons':
        document.documentElement.style.setProperty('--button-bg-color', color);
        this._saveInLocalStorage('--button-bg-color', color);
        break;
      case 'special-buttons':
        document.documentElement.style.setProperty(
          '--special-button-bg-color',
          color
        );
        this._saveInLocalStorage('--special-button-bg-color', color);
        break;
      case 'font-color':
        document.documentElement.style.setProperty(
          '--current-calc-font-color',
          color
        );
        this._saveInLocalStorage('--current-calc-font-color', color);
        break;
      default:
        break;
    }
  }

  _openModal = () => {
    this.modal.style.display = 'block';
    [
      this.bodyColorInput,
      this.calculatorColorInput,
      this.buttonColorInput,
      this.specialButtonColorInput,
      this.fontColorInput,
    ].forEach((label) => {
      const input = label.lastElementChild;
      if (input instanceof HTMLInputElement) input.value = '#000000';
    });
  };

  _closeModal = () => {
    this.modal.style.display = 'none';
  };

  _saveInLocalStorage(name, value) {
    const savedColors = localStorage.getItem('saved-colors');
    if (savedColors) {
      const savedColorsObject = JSON.parse(savedColors);
      savedColorsObject[name] = value;
      localStorage.setItem('saved-colors', JSON.stringify(savedColorsObject));
    } else {
      localStorage.setItem('saved-colors', JSON.stringify({ [name]: value }));
    }
  }

  getView() {
    return this.view;
  }
}
