export default class Cart {
  cartItems = []; // [product: {...}, count: N]
  cartItem = {};
  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {

    if (product) {
      const obj = this.cartItems.find((prod) => prod.product.id === product.id);
      if (obj) {
        this.cartItems.map((item) => {
          if (item.product.id === obj.product.id) {
            item.count += 1;
            this.cartItem = item;
          }
        });
      }
      else {
        this.cartItem = {
          product: product,
          count: 1
        };

        this.cartItems.push(this.cartItem);
      }
    } else {
      return;
    }
    this.onProductUpdate(this.cartItem);
  }

  updateProductCount(productId, amount) {

    this.cartItems.map((item => {
      if (item.product.id === productId) {
        item.count += amount;
        this.cartItem = item;
        if (item.count === 0) {
          this.cartItems = this.cartItems.filter((item) => item.product.id !== productId);
        }
      }
    }));


    this.onProductUpdate(this.cartItem);
  }

  isEmpty() {
    // ваш код
    return this.cartItems.length === 0;
  }

  getTotalCount() {

    let totalCount = 0;
    this.cartItems.map(item => {
      let temp = item.count;
      totalCount += temp;
    });

    return totalCount;
  }

  getTotalPrice() {

    let totalPrice = 0;
    this.cartItems.map(item => {

      totalPrice += (item.product.price * item.count);
    });

    return totalPrice;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}