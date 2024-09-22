import CalculatorView from './components/calculatorView/CalculatorView';
import SettingsBar from './components/settingsBar/SettingsBar';
import './scss/style.scss';
import switchThemeToLight from './components/colorPicker/switchThemeToLight';

const calculator = new CalculatorView();

const settiingsBar = new SettingsBar({
  callbackProMode: calculator.turnProMode,
  callbackSwitchTheme: switchThemeToLight,
});
document.body.append(settiingsBar.getUI(), calculator.getView());
