import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  element;
  modalWindowElement;

  constructor() {
    this.element = createModal();
    this.modalWindowElement = this.render();
  }

  render() {
    let mdlWindow = createElement(this.element);
    console.log(mdlWindow);
    let closeBtn = mdlWindow.querySelector(".modal__close");
    closeBtn.addEventListener("click", () => {
      this.close();
    }, { once: true });

    document.addEventListener("keydown", (event) => {
      if (event.code === "Escape") this.close();

    }, { once: true });
    return mdlWindow;
  }

  open() {
    let bodyElement = document.querySelector("body");
    bodyElement.classList.add("is-modal-open");
    document.body.append(this.modalWindowElement);
  }

  close() {
    let bodyElement = document.querySelector("body");
    bodyElement.classList.remove("is-modal-open");
    bodyElement.removeChild(bodyElement.lastChild);
  }

  setTitle(title) {
    let modalTitle = this.modalWindowElement.querySelector(".modal__title");
    modalTitle.textContent = title;

    return title;
  }

  setBody(htmlElement) {
    let modalBody = this.modalWindowElement.querySelector(".modal__body");
    if (modalBody.childNodes[0]) {
      modalBody.innerHTML = "";
      modalBody.appendChild(htmlElement);
      return modalBody;
    }
    modalBody.appendChild(htmlElement);
    return modalBody;

  }

}

function createModal() {
  let modalWindow = `
    <div class="modal">
      <div class="modal__overlay"></div>
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon">
          </button>
          <h3 class="modal__title"></h3>
        </div>
        <div class="modal__body"></div>
      </div>
    </div>
  `;
  return modalWindow;
}
