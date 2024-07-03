import { useState } from 'react';
import './App.css'
import IRestaurant from './interfaces/IRestaurant';
import PageRestaurantFinder from './pages/PageRestaurantFinder'
import { RestaurantCard } from './components/RestaurantCard';

function App()
{
  const [restaurantSelected, setRestaurantSelected] = useState(undefined as IRestaurant | undefined);

  return (
    <div>
      {restaurantSelected && <RestaurantCard restaurant={restaurantSelected} />}
      <PageRestaurantFinder cardClicked={r => setRestaurantSelected(r)} onNewSearch={() => setRestaurantSelected(undefined)}/>
    </div>
  )
}

export default App
