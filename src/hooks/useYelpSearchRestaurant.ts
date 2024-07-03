import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useYelpSearchRestaurant()
{
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null as unknown);
  const [term, setTerm] = useState('restaurants');
  const [location, setLocation] = useState('brussels');

  const API_KEY = import.meta.env.VITE_YELP_API_KEY;

  useEffect(() => {
    const fetchBusinesses = async () =>
    {
      setLoading(true);
      try
      {
        const response = await axios.get(`/api/businesses/search`, {
          headers: {
            Authorization: `Bearer ${API_KEY}`
          },
          params: {
            term,
            location,
          },
        });
        setBusinesses(response.data.businesses);
      }
      catch (error)
      {
        setError(error);
      }
      finally
      {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, [term, location]);

  return {
    businesses,
    loading,
    error,
    setSearchCriteria: (newTerm:string, newLocation:string) => {
      setTerm(newTerm);
      setLocation(newLocation);
    },
  };
};