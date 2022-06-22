import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  elem;
  constructor(categories) {
    this.categories = categories;
    this.elem = this.render();
  }

  render() {
    let categorie = createCategories(this.categories);

    let rightButton = categorie.querySelector(".ribbon__arrow_right");
    let leftButton = categorie.querySelector(".ribbon__arrow_left");
    let ribbonInner = categorie.querySelector(".ribbon__inner");
    let allMenuList = Array.from(categorie.querySelectorAll(".ribbon__item"));

    let scrollStep = 350;

    leftButton.addEventListener("click", () => {
      ribbonInner.scrollBy(+`-${scrollStep}`, 0);
    });


    rightButton.addEventListener("click", () => {
      ribbonInner.scrollBy(scrollStep, 0);
    });

    ribbonInner.addEventListener("scroll", () => {
      let scrollLeft = ribbonInner.scrollLeft;
      let scrollWidth = ribbonInner.scrollWidth;
      let clientWidth = ribbonInner.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollLeft === 0) {
        leftButton.classList.remove("ribbon__arrow_visible");
      } else {
        leftButton.classList.add("ribbon__arrow_visible");
      }
      if (scrollRight < 1) {
        rightButton.classList.remove("ribbon__arrow_visible");
      } else {
        rightButton.classList.add("ribbon__arrow_visible");
      }

    });

    allMenuList.forEach((menuItem) => {

      menuItem.addEventListener("click", (event) => {
        event.preventDefault();

        allMenuList.forEach((item) => {
          item.classList.remove("ribbon__item_active");
        });

        let link = event.target.closest("a");

        if (!link) {
          return;
        }
        link.classList.add("ribbon__item_active");

        this.onclickAddEvent(link);
      });
    });

    return categorie;
  }

  onclickAddEvent = (clickedLink) => {
    let customEvent = new CustomEvent("ribbon-select", {
      detail: clickedLink.getAttribute("data-id"),
      bubbles: true
    });

    return this.elem.dispatchEvent(customEvent);
  };

}

function createCategories(arrayWithCategories) {
  let element = createElement(`
        <div class="ribbon">
          <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
            <img src="/assets/images/icons/angle-icon.svg" alt="icon">
          </button>
          <!--ссылки с категориями-->
          <nav class="ribbon__inner">` + arrayWithCategories.map(catigorie => `
            <a href="#" class="ribbon__item" data-id="${catigorie.id}">${catigorie.name}</a>
            `).join("") +
    `</nav >
          
          <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
            <img src="/assets/images/icons/angle-icon.svg" alt="icon">
          </button>
        </div >
    `);
  return element;
}
