import { useEffect, useState } from 'react';
import { fetchBusinesses } from '../api/yelpService';

const BusinessList = () => {
  const [businesses, setBusinesses] = useState([] as any[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBusinesses = async () => {
      try {
        const data = await fetchBusinesses();
        setBusinesses(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getBusinesses();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Yelp Businesses</h1>
      <ul>
        {businesses.map((business) => (
          <li key={business.id}>
            {business.name} - {business.rating} stars
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BusinessList;
