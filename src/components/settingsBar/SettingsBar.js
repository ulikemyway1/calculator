import createDOMElement from '../../helpers/createDOMElement';
import Slider from '../slider/Slider';
import './settingsBar.scss';

export default class SettingsBar {
  constructor() {
    this.ui = createDOMElement({ tag: 'div', classList: ['settings'] });
    this.container = createDOMElement({ tag: 'div', classList: ['container'] });
    this.ui.append(this.container);
    this.modeControl = new Slider('PRO');

    this._createModeControl();
  }

  _createModeControl = () => {
    this.container.append(this.modeControl.getSlider());
  };

  getUI = () => this.ui;
}
