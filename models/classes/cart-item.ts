class CartItem {
  constructor(
    public productId: string,
    public productTitle: string,
    public productPrice: number,
    public quantity: number,
    public sum: number,
    public pushToken: string
  ) {}
}

export default CartItem;
