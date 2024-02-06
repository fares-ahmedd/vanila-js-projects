function getElement(selection) {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  } else {
    throw new Error(`No element found for the selector: ${selection}`);
  }
}

export default getElement;
