import CalculatorView from './components/calculatorView/CalculatorView';
import SettingsBar from './components/settingsBar/SettingsBar';
import './scss/style.scss';

document.body.append(new SettingsBar().getUI(), new CalculatorView().getView());
