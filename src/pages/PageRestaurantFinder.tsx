import { useEffect, useState } from "react"
import LoadingDatas from "../components/LoadingDatas"
import { RestaurantPreviewCard } from "../components/RestaurantPreviewCard"
import useYelpSearchRestaurant, { Price } from "../hooks/useYelpSearchRestaurant"
import ICategory from "../interfaces/ICategory"
import IRestaurant from "../interfaces/IRestaurant"
import ErrorFetchDatas from "../components/ErrorFetchDatas"
import { Button } from "../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Toggle } from "../components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "../components/ui/toggle-group"

const FOODS_CATEGORIES:ICategory[] = [
    {alias:"belgian", title:"Belgian"},
    {alias:"brasseries", title:"Brasseries"},
    {alias:"italian", title:"Italian"},
    {alias:"burgers", title:"Burgers"},
    {alias:"hotdogs", title:"Fast Food"}
]

interface Props
{
    cardClicked : (restaurant:IRestaurant) => void,
    onNewSearch : () => void
}

const BRUSSELS_LOCATION = 'brussels'

export default function PageRestaurantFinder({cardClicked, onNewSearch}:Props)
{
    const {restaurants, loading, error, setSearchCriteria} = useYelpSearchRestaurant(BRUSSELS_LOCATION)

    const [location, setLocation] = useState('');
    const [category, setCategory] = useState(undefined as ICategory | undefined);
    const [filterName, setFilterName] = useState('N');
    const [price, setPrice] = useState('' as Price);
    const [rating, setRating] = useState(false);

    const restaurantsFiltered = restaurants.filter(r => r.name.includes(filterName))

    useEffect(() => newSearch(), [category, price, rating])

    const newSearch = () => {
        setSearchCriteria(`${BRUSSELS_LOCATION} ${location}`, category ? [category.alias] : [], price.trim() !== '' ? [price] : [], rating)
        onNewSearch()
    }

    return <div>
        <div>
            <Label>Find a restaurant</Label>
            <Input placeholder='Type an adress' onChange={e => setLocation(e.target.value)}/>
            <Button onClick={_ => newSearch()}> Search </Button>
            </div>
            <div>
                
            <ToggleGroup type="single">
                {FOODS_CATEGORIES.map((c, id) => <div key={id} onClick={_ => setCategory(category?.alias == c.alias ? undefined : c)}><ToggleGroupItem value={c.alias}> {c.title} </ToggleGroupItem></div>)}
            </ToggleGroup>
            
            <Select defaultValue='' onValueChange={value => setPrice(value as Price)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1">$</SelectItem>
                    <SelectItem value="2">$$</SelectItem>
                    <SelectItem value="3">$$$</SelectItem>
                    <SelectItem value="4">$$$$</SelectItem>
                </SelectContent>
            </Select>

            <Toggle onClick={_ => setRating(!rating)}>Best rating</Toggle>

            
            </div>
            <div> <Input placeholder='Filter critere' onChange={e => setFilterName(e.target.value)}/> </div>
            <div>

            <br/>
            
            {loading ? <LoadingDatas /> :
            error ? <ErrorFetchDatas /> : 
            <div>
                {restaurantsFiltered.map(r =>
                <div key={r.id}>
                    <RestaurantPreviewCard restaurant={{...r, image_url : r.image_url}} cardClicked={() => cardClicked(r)} />
                </div>)}
            </div>}
            
        </div>
    </div>
}