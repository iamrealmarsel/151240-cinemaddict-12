import AbstractView from '../view/abstract.js';


export const renderDOM = (container, markup, place) => {
  container.insertAdjacentHTML(place, markup);
};


export const render = (element, parentElement, place) => {

  if (element instanceof AbstractView) {
    element = element.getElement();
  }

  switch (place) {
    case `beforebegin`:
      parentElement.before(element);
      break;
    case `afterbegin`:
      parentElement.prepend(element);
      break;
    case `beforeend`:
      parentElement.append(element);
      break;
    case `afterend`:
      parentElement.after(element);
      break;
  }
};


export const createElement = (markup) => {
  const parentElement = document.createElement(`div`);
  parentElement.innerHTML = markup;

  return parentElement.firstElementChild;
};