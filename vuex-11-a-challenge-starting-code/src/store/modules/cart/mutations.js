export default {
  addProductToCart(state, payload) {
    const productInCartIndex = state.cart.findIndex(
      item => item.productId === payload.productData.id
    );

    if (productInCartIndex > -1) {
      state.cart[productInCartIndex].qty++;
    } else {
      const { id, title, image, price } = payload.productData;
      const newItem = {
        productId: id,
        title,
        image,
        price,
        qty: 1
      };
      state.cart.push(newItem);
    }

    state.qty++;
    state.total += payload.productData.price;
  },

  removeProductFromCart(state, payload) {
    const productInCartIndex = state.cart.findIndex(
      item => item.productId === payload.productId
    );

    const productInCart = state.cart[productInCartIndex];
    state.qty -= productInCart.qty;
    state.total -= productInCart.price * productInCart.qty;

    state.cart.splice(productInCartIndex, 1);
  }
};
