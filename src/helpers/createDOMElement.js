export default function createDOMElement({
  tag,
  classList,
  textContent,
  attributes,
}) {
  const element = document.createElement(tag || 'div');

  if (classList) {
    element.classList.add(...classList);
  }

  if (textContent) {
    element.textContent = textContent;
  }

  if (attributes) {
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }

  return element;
}
