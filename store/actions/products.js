import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        'https://shop-app-f21a8-default-rtdb.firebaseio.com/products.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            'u1',
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }
      dispatch({ type: SET_PRODUCTS, products: loadedProducts });
    } catch (error) {
      throw error;
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    await fetch(
      `https://shop-app-f21a8-default-rtdb.firebaseio.com/products${productId}.json`,
      {
        method: 'DELETE',
      }
    );
    dispatch({ type: DELETE_PRODUCT, productId: productId });
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch) => {
    const response = await fetch(
      'https://shop-app-f21a8-default-rtdb.firebaseio.com/products.json',
      {
        method: 'POST',
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
      },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch) => {
    await fetch(
      `https://shop-app-f21a8-default-rtdb.firebaseio.com/products/${id}.json`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          title,
          description,
          imageUrl,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return {
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
      },
    };
  };
};
