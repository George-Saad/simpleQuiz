'use strict';

/**
 * This function removes all the html inside the given element
 */
export const clearDOMElement = (DOMElement) => {
  DOMElement.innerHTML = '';
};

/**
 * This function creates a DOM element with the given tag.
 * In the options parameter it is possible to add some extra data to it:
 *
 *  id - the id of the element
 *  className - the CSS class of the element
 */
export const createDOMElement = (tag, options) => {
  const { id } = options || {};
  const { className } = options || {};

  const element = document.createElement(tag);

  if (id != null) {
    element.id = id;
  }
  
  if (className != null) {
    element.classList.add(className);
  }

  return element;
};

/**
 * Find and return a DOM element by its id
 */
export const getDOMElement = (id) => {
  return document.getElementById(id);
};



