import { memo, useCallback, useState } from 'react';
import IRestaurant from './interfaces/IRestaurant';
import PageRestaurantFinder from './pages/PageRestaurantFinder'
import { RestaurantCard } from './components/RestaurantCard';
import { ThemeProvider } from './components/theme-provider';
import { OverlayPage } from './components/OverlayModalRestaurantCard';

const PageRestaurantFinderMemo = memo(PageRestaurantFinder)

function App()
{
  const [restaurantSelected, setRestaurantSelected] = useState(undefined as IRestaurant | undefined);

  const handleSelectedRestaurant = useCallback((r:IRestaurant) => setRestaurantSelected(r), [])
  const handleResetRestaurant = useCallback(() => setRestaurantSelected(undefined), [])
  
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex justify-center h-screen">
        <OverlayPage visible={restaurantSelected !== undefined} onCloseModal={handleResetRestaurant}>
          {restaurantSelected && <RestaurantCard restaurant={restaurantSelected}/>}
        </OverlayPage>
        <PageRestaurantFinderMemo cardClicked={handleSelectedRestaurant} onNewSearch={handleResetRestaurant}/>
      </div>
    </ThemeProvider>
  )
}

export default App
