const switchThemeToLight = () => {
  document.body.classList.toggle('light-theme');
  document.documentElement.style.removeProperty('--special-button-bg-color');
  if (document.body.classList.contains('light-theme')) {
    document.documentElement.style.setProperty('--body-bg-color', '#f2f2f2');
    document.documentElement.style.setProperty(
      '--calculator-bg-color',
      '#e7e7e7'
    );
    document.documentElement.style.setProperty('--button-bg-color', '#e7e7e7');
    document.documentElement.style.setProperty(
      '--current-calc-font-color',
      '#2b2a2a'
    );
  } else {
    document.documentElement.style.removeProperty('--body-bg-color');
    document.documentElement.style.removeProperty('--calculator-bg-color');
    document.documentElement.style.removeProperty('--button-bg-color');
    document.documentElement.style.removeProperty('--current-calc-font-color');
  }
};

export default switchThemeToLight;
