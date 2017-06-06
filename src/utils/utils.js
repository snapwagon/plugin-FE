import fetch from 'isomorphic-fetch';
// import serialize from 'serialize-javascript';

import Segment from 'load-segment';

const parseResponse = (response) => {
  if (response.ok) return response.json();
  throw new Error(response.statusText);
};

export const analytics = Segment({key: 'kfLYgloGKOIzTjzdQtb3bsMQ5LeOrraY'});

export const getOffer = (offerId) => {
  return fetch(`http://alacode.org/api/offer/${offerId}/`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
  })
  .then(parseResponse);
};

export const getToken = () => {
  return fetch('http://alacode.org/api/client_token/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(parseResponse);
};

export const postPayment = (data) => {
  return fetch('http://alacode.org/api/order/', {
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
