import fetch from 'isomorphic-fetch';

import Segment from 'load-segment';

const parseResponse = (response) => {
  if (response.ok) return response.json();
  throw new Error(response.statusText);
};

export const analytics = () => {
  return Segment({key: 'kfLYgloGKOIzTjzdQtb3bsMQ5LeOrraY'});
}

export const getOffer = (offerId) => {
  return fetch(`http://8c1fb8b3.ngrok.io/api/offer/${offerId}/`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
  })
  .then(parseResponse);
}

export const getToken = () => {
  return fetch(`http://8c1fb8b3.ngrok.io/api/client_token/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(parseResponse);
}

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

export const postPayment = (data) => {
  return fetch(`http://8c1fb8b3.ngrok.io/api/order/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error(response);
    });
};
