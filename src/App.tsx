import { useState } from 'react';
import IRestaurant from './interfaces/IRestaurant';
import PageRestaurantFinder from './pages/PageRestaurantFinder'
import { RestaurantCard } from './components/RestaurantCard';
import { ThemeProvider } from './components/theme-provider';

function App()
{
  const [restaurantSelected, setRestaurantSelected] = useState(undefined as IRestaurant | undefined);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col items-center justify-center h-screen">
        {restaurantSelected && <RestaurantCard restaurant={restaurantSelected} />}
        <PageRestaurantFinder cardClicked={r => setRestaurantSelected(r)} onNewSearch={() => setRestaurantSelected(undefined)}/>
      </div>
    </ThemeProvider>
  )
}

export default App
