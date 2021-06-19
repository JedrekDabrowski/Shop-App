class Product {
  constructor(
    public id: string,
    public ownerId: string,
    public pushToken: string,
    public title: string,
    public imageUrl: string,
    public description: string,
    public price: number
  ) {
    // this.id = id;
    // this.ownerId = ownerId;
    // this.pushToken = pushToken;
    // this.title = title;
    // this.imageUrl = imageUrl;
    // this.description = description;
    // this.price = price;
  }
}

export default Product;
