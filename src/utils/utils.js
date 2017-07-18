import fetch from 'isomorphic-fetch';

import Segment from 'load-segment';

const parseResponse = (response) => {
  if (response.ok) return response.json();
  throw new Error(response.statusText);
};

export const analytics = Segment({key: 'kfLYgloGKOIzTjzdQtb3bsMQ5LeOrraY'});

export const getOffer = (offerId) => {
  return fetch(`https://snapwagon.io/api/offer/${offerId}/`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
  })
  .then(parseResponse);
};

export const getOffers = (clientId) => {
  return fetch(`https://snapwagon.io/api/organization/${clientId}/offer/`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
  })
  .then(parseResponse);
};

export const getToken = () => {
  return fetch('https://snapwagon.io/api/client_token/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(parseResponse);
};

export const postPayment = (data) => {
  return fetch('https://snapwagon.io/api/order/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      origin: '*'
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error(response.statusText);
    });
};
