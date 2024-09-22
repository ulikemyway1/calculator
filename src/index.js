import CalculatorView from './components/calculatorView/CalculatorView';
import SettingsBar from './components/settingsBar/SettingsBar';
import './scss/style.scss';

const calculator = new CalculatorView();

const switchTheme = () => {
  calculator.switchTheme();
  document.body.classList.toggle('light-theme');
};

const settiingsBar = new SettingsBar({
  callbackProMode: calculator.turnProMode,
  callbackSwitchTheme: switchTheme,
});
document.body.append(settiingsBar.getUI(), calculator.getView());
