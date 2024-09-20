export default function createDOMElement({ tag, classList, textContent }) {
  const element = document.createElement(tag || 'div');

  if (classList) {
    element.classList.add(...classList);
  }

  if (textContent) {
    element.textContent = textContent;
  }

  return element;
}
