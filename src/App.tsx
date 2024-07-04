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
      <div className="flex justify-center h-screen">
        <div onClick={_ => setRestaurantSelected(undefined)}
        className={`${restaurantSelected ? 'flex' : 'hidden'} fixed inset-0 bg-gray-900 bg-opacity-50 items-center justify-center z-50`}>
          {restaurantSelected && <RestaurantCard restaurant={restaurantSelected} />}
        </div>
        <PageRestaurantFinder cardClicked={r => setRestaurantSelected(r)} onNewSearch={() => setRestaurantSelected(undefined)}/>
      </div>
    </ThemeProvider>
  )
}

export default App
