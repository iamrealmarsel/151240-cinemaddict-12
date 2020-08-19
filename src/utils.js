
const createElement = (markup) => {
  const parentElement = document.createElement(`div`);
  parentElement.innerHTML = markup;

  return parentElement.firstElementChild;
};


const renderDOM = (container, markup, place) => {
  container.insertAdjacentHTML(place, markup);
};


const render = (element, parentElement, place) => {
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


export {createElement, renderDOM, render};

