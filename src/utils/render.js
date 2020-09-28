import AbstractView from '../view/abstract-view.js';

export const RenderPosition = {
  BEFOREBEGIN: `beforebegin`,
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`
};

export const render = (element, parentElement, place) => {
  if (element instanceof AbstractView) {
    element = element.getElement();
  }

  if (parentElement instanceof AbstractView) {
    parentElement = parentElement.getElement();
  }

  switch (place) {
    case RenderPosition.BEFOREBEGIN:
      parentElement.before(element);
      break;
    case RenderPosition.AFTERBEGIN:
      parentElement.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      parentElement.append(element);
      break;
    case RenderPosition.AFTEREND:
      parentElement.after(element);
      break;
  }
};

export const createElement = (markup) => {
  const parentElement = document.createElement(`div`);
  parentElement.innerHTML = markup;

  return parentElement.firstElementChild;
};
