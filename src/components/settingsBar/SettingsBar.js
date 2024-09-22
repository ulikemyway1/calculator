import createDOMElement from '../../helpers/createDOMElement';
import Slider from '../slider/Slider';
import './settingsBar.scss';

export default class SettingsBar {
  constructor({ callbackProMode, callbackSwitchTheme }) {
    this.modeControl = new Slider({
      textContentBefore: 'PRO',
      callBack: callbackProMode,
    });

    this.themeControl = new Slider({
      textContentBefore: 'Dark',
      textContentAfter: 'Light',
      callBack: callbackSwitchTheme,
    });

    this._createUI();

    this.container.append(
      this.modeControl.getSlider(),
      this.themeControl.getSlider()
    );
  }

  _createUI = () => {
    this.ui = createDOMElement({ tag: 'div', classList: ['settings'] });
    this.container = createDOMElement({ tag: 'div', classList: ['container'] });
    this.ui.append(this.container);
  };

  getUI = () => this.ui;
}
