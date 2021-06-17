class Product {
  constructor(id, ownerId, pushToken, title, imageUrl, description, price) {
    this.id = id;
    this.ownerId = ownerId;
    this.pushToken = pushToken;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
}

export default Product;
