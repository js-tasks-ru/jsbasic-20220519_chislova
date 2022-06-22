import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  elem;
  cardTemplate;
  cardContainer;
  filteredProducts;

  activeFilters = {
    noNuts: false, // true/false
    vegeterianOnly: false, // true/false
    maxSpiciness: null, // числа от 0 до 4
    category: null
  };

  constructor(products) {
    this.products = products;
    this.filters = {};
    this.cardTemplate = productGridTemolate();
    this.elem = this.render(this.products);
    this.filteredProducts = this.products;
  }

  render(products) {
    let productGrid = createElement(this.cardTemplate);
    this.cardContainer = productGrid.querySelector(".products-grid__inner");
    this.createProductElem(products);

    return productGrid;
  }

  createProductElem(products) {
    products.map((product) => {
      let card = new ProductCard(product);
      this.cardContainer.append(card.elem);
    });
  }

  updateFilter(filters) {
    this.filteredProducts = this.products;
    let activeFilters = this.activeFilters;
    console.log(activeFilters)
    Object.keys(filters)
      .forEach(function eachKey(key) {
        activeFilters[key] = filters[key];
      });


    if (activeFilters.noNuts) {
      this.filteredProducts = this.filteredProducts
        .filter((product) => {
          return product.nuts === false || product.nuts === undefined
        });
    }

    if (activeFilters.vegeterianOnly) {
      this.filteredProducts = this.filteredProducts
        .filter((product) => {
          return product.vegeterian === true
        });
    }

    if (activeFilters.maxSpiciness) {
      this.filteredProducts = this.filteredProducts
        .filter((product) => {
          return product.spiciness <= activeFilters.maxSpiciness
        });
    }

    if (activeFilters.category) {
      this.filteredProducts = this.filteredProducts
        .filter((product) => {
          return product.category === activeFilters.category
        });
    }

    this.cardContainer.innerHTML = "";
    this.createProductElem(this.filteredProducts);
  };

}

function productGridTemolate() {
  let card = `
  <div class="products-grid">
    <div class="products-grid__inner">
      <!--ТУТ БУДУТ РАСПОЛОЖЕНЫ КАРТОЧКИ ТОВАРОВ-->
    </div>
  </div>`;

  return card;
}
