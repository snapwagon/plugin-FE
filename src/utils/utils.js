import fetch from 'isomorphic-fetch';

const parseResponse = (response) => {
  if (response.ok) return response.json();
  throw new Error(response.statusText);
};

export const fetchToken = () => {

};

export const sendNonce = () => {
  
};

export const getPackages = () => {
  return fetch('/api/users/packages?filter[arrival]=upcoming', {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json'
    }
  })
    .then(parseResponse);
};

export const getOrder = (orderId, productType) => {
  return fetch(`/api/users/orders/${orderId}?include=choices,${productType}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json'
    }
  })
    .then(parseResponse)
    .then((response) => {
      const products = response.data.relationships[productType].data.map(({ id }) => id);
      const choices = response.data.relationships.choices.data.map(({ id }) => id);
      const included = response.included;

      return included.reduce((acc, curr) => {
        if (products.includes(curr.id)) {
          return Object.assign({}, acc, { [productType]: acc[productType].concat(curr) });
        }

        if (choices.includes(curr.id)) {
          return Object.assign({}, acc, { choices: acc.choices.concat(curr) });
        }

        return acc;
      }, {
        data: response.data,
        [productType]: [],
        choices: []
      });
    });
};

export const updateOrder = (orderId, products, productType) => {
  return fetch(`/api/users/orders/${orderId}/relationships/products`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json'
    },
    body: JSON.stringify({
      data: {
        type: 'order',
        id: orderId,
        relationships: {
          products: {
            data: products.map((product) => ({ id: product.id, type: productType }))
          }
        }
      }
    }),
  })
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error(response);
    });
};
