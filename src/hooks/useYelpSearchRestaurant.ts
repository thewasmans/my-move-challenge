import { useState, useEffect } from 'react';
import axios from 'axios';
import IRestaurant from '../interfaces/IRestaurant';

export type Price = '' | '1' | '2' | '3' | '4'
type SortBy = 'rating'

export default function useYelpSearchRestaurant(defaultLocation:string)
{
  const [restaurants, setRestaurants] = useState([] as IRestaurant[]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null as unknown | null);
  const [term] = useState('restaurants');
  const [location, setLocation] = useState(defaultLocation);
  const [categories, setCategories] = useState([] as string[]);
  const [prices, setPrices] = useState([] as Price[]);
  const [sortBy, setSortBy] = useState('' as SortBy | '');

  const API_KEY = import.meta.env.VITE_YELP_API_KEY;
  const API_URL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search';

  useEffect(() => {
    const fetchBusinesses = async () =>
    {
      setLoading(true);
      let params = new URLSearchParams();
      params.append('term', term)
      params.append('location', location)
      
      if(sortBy.trim().length > 0) params.append('sort_by', sortBy)

      categories.forEach(c => params.append('categories', c));

      prices.forEach(p => params.append('price', p));

      console.log('API_URL', API_URL)
      
      try
      {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${API_KEY}`
          },
          params: params,
        });
        setRestaurants(response.data.businesses);
        console.log('response.data.businesses')
      }
      catch (error)
      {
        setError(error);
        console.log('error', error)
      }
      finally
      {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, [term, location, categories, prices, sortBy]);

  return {
    restaurants,
    loading,
    error,
    setSearchCriteria: (location:string = '', categories:string[] = [], prices:Price[] = [], sortByRating:boolean = false) =>
    {
      setLocation(location)
      setCategories(categories)
      setPrices(prices)
      setSortBy(sortByRating ? 'rating' : '')
    },
  };
};