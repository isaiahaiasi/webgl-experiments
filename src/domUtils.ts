export function createElement<K extends keyof HTMLElementTagNameMap>(
  htmlTag: K,
  attributes?: any,
  children?: HTMLElement[]
) {
  const element = document.createElement(htmlTag);

  if (attributes) {
    Object.entries(attributes).forEach(([k, v]) => {
      element.setAttribute(k, v as string);
    });
  }

  if (children) {
    children.forEach(element.appendChild);
  }

  return element;
}
