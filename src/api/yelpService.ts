// src/api/yelpService.js
import axios from 'axios';

const API_KEY = import.meta.env.VITE_YELP_API_KEY;
const BASE_URL = '/api';

const yelpService = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const fetchBusinesses = async (term = 'food', location = 'Brussels') => {
  try {
    const response = await yelpService.get('/businesses/search', {
      params: {
        term,
        location,
      },
    });
    return response.data.businesses;
  } catch (error) {
    console.error('Error fetching businesses from Yelp API', error);
    throw error;
  }
};
